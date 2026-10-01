// ================================================
// The night sky behind the homepage, between the dark gallery and the paper rooms.
// One canvas is fixed behind everything: at the end of the walk the gallery's room
// fades into it (scripts/home.js), the threshold slides over it with the quote, and
// as the visitor walks on, ink drifts, small lights rise, and dawn climbs from below
// until the sky is paper, the colour of the rooms that slide over it next.
// One fragment shader at half resolution; it draws only while it can be seen.
// Without WebGL, or with reduced motion, `data-sky` never appears on <main>, and the
// gallery's wall and the CSS gradient on .museum-threshold stay as they are.
// While it runs, the sky also decides the quote's ink: the same noise, worked
// out in JS at a few points behind the quote, says whether the sky there is
// light yet (`is-day` on the section; scripts/home.js does it by scroll otherwise).
// ================================================

(function () {
    'use strict';

    var museum = document.getElementById('museum');
    var gallery = document.getElementById('gallery');
    var section = document.getElementById('threshold');
    var canvas = document.getElementById('museumSky');
    if (!museum || !section || !canvas) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var gl = canvas.getContext('webgl', {
        alpha: false, antialias: false, depth: false, stencil: false,
        premultipliedAlpha: false, preserveDrawingBuffer: false, powerPreference: 'low-power'
    });
    if (!gl) return;

    var VERTEX = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}';

    var FRAGMENT = [
        'precision highp float;',
        'uniform vec2 uRes;',
        'uniform float uTime;',
        'uniform float uEnter;',   // 0 when the threshold first shows at the bottom, 1 once it fills the screen
        'uniform float uLift;',    // 0 night .. 1 paper, as the visitor walks through
        'uniform vec3 uNight;',
        'uniform vec3 uEmber;',
        'uniform vec3 uGlow;',
        'uniform vec3 uPaper;',
        '',
        'float hash(vec2 p) {',
        '    p = fract(p * vec2(123.34, 456.21));',
        '    p += dot(p, p + 45.32);',
        '    return fract(p.x * p.y);',
        '}',
        '',
        'float noise(vec2 p) {',
        '    vec2 i = floor(p);',
        '    vec2 f = fract(p);',
        '    vec2 u = f * f * (3.0 - 2.0 * f);',
        '    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),',
        '               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);',
        '}',
        '',
        'float fbm(vec2 p) {',
        '    float v = 0.0;',
        '    float a = 0.5;',
        '    mat2 turn = mat2(0.8, -0.6, 0.6, 0.8);',
        '    for (int i = 0; i < 5; i++) {',
        '        v += a * noise(p);',
        '        p = turn * p * 2.03;',
        '        a *= 0.5;',
        '    }',
        '    return v;',
        '}',
        '',
        'void main() {',
        '    vec2 uv = gl_FragCoord.xy / uRes;',
        '    vec2 p = vec2(uv.x * uRes.x / uRes.y, uv.y);',
        '    float t = uTime * 0.035;',
        '',
        // Ink: slow, folded clouds
        '    vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, -t)), fbm(p * 1.3 + vec2(4.7, t * 0.8)));',
        '    float ink = fbm(p * 1.8 + q * 1.9 + vec2(t * 0.4, -t * 0.9));',
        '',
        // Dawn climbs from the bottom; its edge is torn by the ink
        '    float horizon = -0.45 + uLift * 2.1;',
        '    float edge = horizon - uv.y + (ink - 0.5) * 0.8;',
        '    float dawn = smoothstep(-0.35, 0.25, edge);',
        '    float day = smoothstep(0.05, 0.6, edge);',
        '',
        '    vec3 col = mix(uNight, uEmber, smoothstep(0.38, 0.9, ink) * 0.7);',
        '    col = mix(col, uGlow, dawn * 0.8);',
        '    col = mix(col, uPaper, day);',
        '',
        // Small lights rising in three layers; the near ones are larger and quicker
        '    float glow = 0.0;',
        '    for (int k = 0; k < 3; k++) {',
        '        float fk = float(k);',
        '        float density = 4.0 + fk * 3.0;',
        '        vec2 g = vec2(p.x * density, (uv.y - uTime * (0.016 + 0.008 * (2.0 - fk))) * density * 1.2);',
        '        vec2 cell = floor(g);',
        '        vec2 f = fract(g) - 0.5;',
        '        float r = hash(cell + fk * 19.7);',
        '        if (r > 0.62) {',
        // Each light stays well inside its cell, so no glow is cut at a cell edge
        '            vec2 c = vec2((hash(cell + 7.3) - 0.5) * 0.4 + sin(uTime * 0.5 + r * 30.0) * 0.05, (hash(cell + 2.1) - 0.5) * 0.24);',
        '            vec2 d = (f - c) * vec2(1.0, 0.8);',
        '            float size = 0.03 + 0.03 * hash(cell + 5.5);',
        '            float core = exp(-dot(d, d) / (size * size));',
        '            float halo = exp(-dot(d, d) / (size * size * 5.0)) * 0.32;',
        '            float flicker = 0.8 + 0.2 * sin(uTime * (1.5 + r * 2.5) + r * 40.0);',
        '            glow += (core + halo) * flicker * (1.0 - fk * 0.25);',
        '        }',
        '    }',
        '    float lights = smoothstep(0.15, 0.9, uEnter) * (1.0 - smoothstep(0.62, 0.9, uLift)) * (1.0 - day);',
        '    col += vec3(1.0, 0.74, 0.46) * glow * lights * 0.7;',
        '',
        '    gl_FragColor = vec4(col, 1.0);',
        '}'
    ].join('\n');

    function compile(type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn('sky.js: shader did not compile', gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    var vs = compile(gl.VERTEX_SHADER, VERTEX);
    var fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn('sky.js: shader did not link', gl.getProgramInfoLog(program));
        return;
    }
    gl.useProgram(program);

    // One triangle that covers the screen
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var attr = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0);

    var u = {};
    ['uRes', 'uTime', 'uEnter', 'uLift', 'uNight', 'uEmber', 'uGlow', 'uPaper'].forEach(function (name) {
        u[name] = gl.getUniformLocation(program, name);
    });

    function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

    function toRgb(value, fallback) {
        var s = String(value || '').trim();
        var hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (hex) {
            var h = hex[1].length === 3 ? hex[1].replace(/./g, '$&$&') : hex[1];
            return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
        }
        var rgb = s.match(/rgba?\(([^)]+)\)/i);
        if (rgb) {
            var parts = rgb[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
            if (parts.length >= 3) return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
        }
        return fallback;
    }

    // Night and dawn are fixed; the paper the sky turns into is the page's own background.
    var colors = {};
    function readColors() {
        var dark = document.documentElement.getAttribute('data-theme') === 'dark';
        var bg = getComputedStyle(document.documentElement).getPropertyValue('--bg');
        colors.night = [0.105, 0.078, 0.063];          // #1b1410, the gallery floor
        colors.ember = [0.227, 0.153, 0.106];          // #3a271b
        colors.glow = dark ? [0.48, 0.32, 0.22] : [0.80, 0.56, 0.38];
        colors.paper = toRgb(bg, dark ? [0.09, 0.075, 0.1] : [0.96, 0.94, 0.91]);
    }

    var SCALE = 0.5; // the sky is soft; half resolution is plenty
    function resize() {
        var ratio = Math.min(window.devicePixelRatio || 1, 2) * SCALE;
        var w = Math.max(1, Math.round(canvas.clientWidth * ratio));
        var h = Math.max(1, Math.round(canvas.clientHeight * ratio));
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
        }
    }

    // ---------- The same sky, worked out on the CPU at a few points ----------

    function fract(x) { return x - Math.floor(x); }

    function hash(x, y) {
        x = fract(x * 123.34);
        y = fract(y * 456.21);
        var d = x * (x + 45.32) + y * (y + 45.32);
        return fract((x + d) * (y + d));
    }

    function noise(x, y) {
        var ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
        var ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
        var a = hash(ix, iy), b = hash(ix + 1, iy), c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
        return (a + (b - a) * ux) + ((c + (d - c) * ux) - (a + (b - a) * ux)) * uy;
    }

    function fbm(x, y) {
        var v = 0, a = 0.5;
        for (var i = 0; i < 5; i++) {
            v += a * noise(x, y);
            var nx = (0.8 * x + 0.6 * y) * 2.03, ny = (-0.6 * x + 0.8 * y) * 2.03;
            x = nx;
            y = ny;
            a *= 0.5;
        }
        return v;
    }

    function smoothstep(e0, e1, x) {
        var t = clamp((x - e0) / (e1 - e0), 0, 1);
        return t * t * (3 - 2 * t);
    }

    // Brightness of the sky (0 night .. 1 paper) at a point, as the shader paints it
    function skyLight(u, v, aspect, time, lift) {
        var px = u * aspect, py = v, t = time * 0.035;
        var qx = fbm(px * 1.3, py * 1.3 - t), qy = fbm(px * 1.3 + 4.7, py * 1.3 + t * 0.8);
        var ink = fbm(px * 1.8 + qx * 1.9 + t * 0.4, py * 1.8 + qy * 1.9 - t * 0.9);
        var edge = -0.45 + lift * 2.1 - v + (ink - 0.5) * 0.8;
        var dawn = smoothstep(-0.35, 0.25, edge), day = smoothstep(0.05, 0.6, edge);
        return (0.12 + (0.6 - 0.12) * dawn * 0.8) * (1 - day) + 0.94 * day;
    }

    var quote = section.querySelector('.threshold-quote');
    var inkFrame = 0;
    function decideInk(time, lift) {
        if (!quote || (inkFrame++ % 6)) return;
        var r = quote.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var vw = window.innerWidth, vh = window.innerHeight;
        var v = 1 - (r.top + r.height / 2) / vh;   // the shader's y runs up
        var light = 0;
        [0.2, 0.5, 0.8].forEach(function (k) {
            light += skyLight((r.left + r.width * k) / vw, v, vw / vh, time, lift) / 3;
        });
        var day = section.classList.contains('is-day');
        if (!day && light > 0.56) section.classList.add('is-day');
        else if (day && light < 0.48) section.classList.remove('is-day');
    }

    // The gallery's last stretch, after its final lot: 0 before it, 1 once the room has gone
    function galleryTail(vh) {
        if (!gallery) return 0;
        var g = gallery.getBoundingClientRect();
        var span = parseFloat(gallery.getAttribute('data-tail-px')) || vh;
        if (g.bottom <= 0) return 1;
        return clamp(1 - (g.bottom - vh) / span, 0, 1);
    }

    // Seen while the gallery's room fades, and while the threshold is on screen
    function needed() {
        var vh = window.innerHeight;
        var r = section.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) return true;
        return galleryTail(vh) > 0 && r.bottom > 0;
    }

    var started = performance.now();
    function draw(now) {
        var r = section.getBoundingClientRect();
        var vh = window.innerHeight;
        var enter = Math.max(galleryTail(vh), clamp(1 - r.top / vh, 0, 1));
        var lift = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
        resize();
        gl.uniform2f(u.uRes, canvas.width, canvas.height);
        var time = ((now - started) / 1000) % 1000;
        gl.uniform1f(u.uTime, time);
        gl.uniform1f(u.uEnter, enter);
        gl.uniform1f(u.uLift, lift);
        gl.uniform3fv(u.uNight, colors.night);
        gl.uniform3fv(u.uEmber, colors.ember);
        gl.uniform3fv(u.uGlow, colors.glow);
        gl.uniform3fv(u.uPaper, colors.paper);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        decideInk(time, lift);
    }

    var running = false, lost = false;
    function loop(now) {
        if (lost || !needed()) {
            running = false;
            canvas.classList.remove('is-on');
            return;
        }
        draw(now);
        canvas.classList.add('is-on');
        window.requestAnimationFrame(loop);
    }

    function wake() {
        if (!running && !lost && needed()) {
            running = true;
            window.requestAnimationFrame(loop);
        }
    }

    readColors();
    // From here on the gallery fades into this sky and the threshold lets it through (styles/home.css)
    museum.setAttribute('data-sky', 'live');
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', wake);
    wake();

    // The theme toggle repaints the paper the sky turns into
    new MutationObserver(readColors).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    canvas.addEventListener('webglcontextlost', function (e) {
        e.preventDefault();
        lost = true;
        canvas.classList.remove('is-on');
        museum.removeAttribute('data-sky');
    });
})();
