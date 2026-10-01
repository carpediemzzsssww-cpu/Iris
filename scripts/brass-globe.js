/* Footprints: a brass terrestrial globe on a turned stand (three.js r128, d3-geo, topojson).
 *
 * - The sphere's maps are drawn once on canvases from world-atlas 50m: polished land, a darker
 *   satin sea with water-lines engraved along the coasts, rose gold where she has been, the
 *   graduated equator, tropics and ecliptic, and a cartouche in the South Pacific, as old globes have.
 * - A pin stands in every city (garnet where she lingered), and red thread runs between them.
 * - Drag sideways to turn it (a flick keeps it turning, then it slows); up and down to look from
 *   above. Pinch or double-click to look closer. The city list below flies the globe to a city.
 * - Draws only while on screen and while something moves; holds still under reduced motion.
 * - Places live in content/footprints-data.json.
 */
(function () {
    'use strict';

    var wrapper = document.getElementById('globe-wrapper');
    var canvas = document.getElementById('globe-canvas');
    if (!wrapper || !canvas) return;

    var DEG = Math.PI / 180;
    var TILT = 23.44 * DEG;
    var RING_IN = 1.04;
    var RING_OUT = 1.125;
    var RING_DEPTH = 0.042;
    var BASE_Y = -1.7;
    var TOP_Y = 1.135;
    var YAW = -0.95;            // a three-quarter view: the north pole leans toward you, so Europe faces you
    var ELEV = 0.24;
    var ELEV_MIN = -0.1;
    var ELEV_MAX = 0.52;
    var ZOOM_IN = 1.75;
    var AUTO_TURN = 0.07;
    var HOME = 'Paris';
    var WORLD = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';
    var MIDDOT = String.fromCharCode(183);

    var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var coarse = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

    var tooltipEl = document.getElementById('tooltip');
    var hintEl = document.getElementById('globe-hint');
    var loadingEl = document.getElementById('globe-loading');
    var spinBtn = document.getElementById('btn-spin');
    var zoomBtn = document.getElementById('btn-zoom');
    var resetBtn = document.getElementById('btn-reset');
    var gridEl = document.getElementById('city-grid');

    // ---------- Small helpers ----------

    function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
    function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function easeOutBack(t) { var c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
    function wrapPi(a) { return Math.atan2(Math.sin(a), Math.cos(a)); }
    function seeded(seed) {
        return function () {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
        };
    }
    function lang() { return window.i18n && window.i18n.getLang ? window.i18n.getLang() : 'en'; }
    function tr(key, fallback) {
        var v = window.i18n && window.i18n.t ? window.i18n.t(key) : null;
        return v || fallback;
    }
    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function fail() {
        if (window.__globeDepsFail) window.__globeDepsFail();
    }

    // ---------- Places, and the list of destinations under the globe ----------

    var places = null;
    var cityByName = {};
    var countryByName = {};
    var pending = null;     // a city chosen in the list before the globe was ready
    var ready = false;

    function cityName(c) { return lang() === 'zh' ? c.zh : c.city; }
    function countryName(name) {
        var c = countryByName[name];
        return c ? (lang() === 'zh' ? c.zh : c.name) : name;
    }
    function flagOf(c) { return c.flag || (countryByName[c.country] || {}).flag || ''; }
    function tier(c) { return c.pins >= 20 ? 'A' : c.pins >= 5 ? 'B' : 'C'; }

    function renderGrid() {
        if (!gridEl || !places) return;
        var html = '';
        places.countries.forEach(function (country) {
            var cities = places.cities.filter(function (c) { return c.country === country.name; });
            if (!cities.length) return;
            html += '<article class="country-card"><header class="country-head">' +
                '<span class="country-flag" aria-hidden="true">' + country.flag + '</span>' +
                '<h3 class="country-name">' + esc(countryName(country.name)) + '</h3>' +
                '<span class="country-count">' + cities.length + '</span></header><div class="city-tags">';
            cities.forEach(function (c) {
                html += '<button class="city-tag' + (tier(c) === 'A' ? ' is-lingered' : '') + '" type="button" data-city="' + esc(c.city) + '">' +
                    esc(cityName(c)) + (c.pins > 0 ? '<span class="pin-count">' + c.pins + '</span>' : '') + '</button>';
            });
            html += '</div></article>';
        });
        gridEl.innerHTML = html;
    }

    if (gridEl) {
        gridEl.addEventListener('click', function (e) {
            var tag = e.target.closest ? e.target.closest('.city-tag') : null;
            if (!tag) return;
            var city = cityByName[tag.getAttribute('data-city')];
            if (!city) return;
            wrapper.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
            if (ready) flyTo(city);
            else pending = city;
        });
    }

    window.addEventListener('langChanged', function () {
        renderGrid();
        setHint();
        if (tipCity) fillTip(tipCity);
    });
    window.addEventListener('i18nContentLoaded', function () {
        renderGrid();
        setHint();
    });

    var placesLoaded = fetch('content/footprints-data.json')
        .then(function (r) { return r.json(); })
        .then(function (data) {
            places = data;
            data.countries.forEach(function (c) { countryByName[c.name] = c; });
            data.cities.forEach(function (c) { cityByName[c.city] = c; });
            renderGrid();
            return data;
        });

    // ---------- The globe needs WebGL and its three libraries ----------

    if (typeof THREE === 'undefined' || typeof d3 === 'undefined' || typeof topojson === 'undefined') {
        fail();
        return;
    }

    var renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (err) {
        fail();
        return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.physicallyCorrectLights = true;

    var maxTex = renderer.capabilities.maxTextureSize || 4096;
    var small = Math.min(window.screen ? Math.min(screen.width, screen.height) : 800, window.innerWidth) < 700;
    var MAP_W = small || maxTex < 4096 ? 2048 : 4096;
    var aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 1);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(26, 1, 0.1, 60);
    var view = { elev: ELEV, zoom: 1, fit: 7 };

    var stage = new THREE.Group();          // the whole object; the globe's centre is the origin
    var tilt = new THREE.Group();           // the axis leans like the Earth's
    var spin = new THREE.Group();           // turns about the axis
    tilt.rotation.z = -TILT;
    tilt.add(spin);
    stage.add(tilt);
    stage.rotation.y = YAW;
    scene.add(stage);

    // ---------- Light: a small studio, reflected in the brass ----------

    function studio() {
        var env = new THREE.Scene();
        var roomGeo = new THREE.SphereGeometry(10, 32, 16);
        var pos = roomGeo.attributes.position;
        var top = new THREE.Color(0x3b2d21);
        var mid = new THREE.Color(0x1d150f);
        var low = new THREE.Color(0x0a0705);
        var colors = [];
        for (var i = 0; i < pos.count; i++) {
            var y = pos.getY(i) / 10;
            var c = y > 0 ? mid.clone().lerp(top, y) : mid.clone().lerp(low, -y);
            colors.push(c.r, c.g, c.b);
        }
        roomGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        env.add(new THREE.Mesh(roomGeo, new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true })));
        function softbox(w, h, hex, power, x, y, z) {
            var m = new THREE.Mesh(
                new THREE.PlaneGeometry(w, h),
                new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(power), side: THREE.DoubleSide })
            );
            m.position.set(x, y, z);
            m.lookAt(0, 0, 0);
            env.add(m);
        }
        softbox(5, 3.2, 0xffe6c2, 9, -4.5, 5.5, 4.5);      // the spot, warm, high on the left
        softbox(1.6, 6, 0xffd9ad, 4, 6.5, 0.5, 2.5);       // a tall strip on the right
        softbox(7, 1.2, 0xfff1df, 1.4, 0, -4.5, 5);        // the plinth bouncing light back up
        softbox(3, 3, 0xbfcbe0, 0.8, -2, 1.5, -7);         // a cool window behind
        var pmrem = new THREE.PMREMGenerator(renderer);
        var tex = pmrem.fromScene(env, 0.03).texture;
        pmrem.dispose();
        return tex;
    }

    scene.environment = studio();
    var key = new THREE.DirectionalLight(0xfff0d6, 1.9);
    key.position.set(-3, 5, 4);
    scene.add(key);
    var fill = new THREE.DirectionalLight(0xffdcb4, 0.8);
    fill.position.set(5, 1, 2);
    scene.add(fill);

    // ---------- Materials ----------

    function turnedTexture() {
        // Lathe-turned brass: fine rings of slightly different polish, run round the stand
        var c = document.createElement('canvas');
        c.width = 16;
        c.height = 512;
        var g = c.getContext('2d');
        var rand = seeded(11);
        for (var y = 0; y < c.height; y++) {
            var rough = 0.22 + rand() * 0.14 + (rand() < 0.06 ? 0.12 : 0);
            g.fillStyle = 'rgb(0,' + Math.round(rough * 255) + ',255)';
            g.fillRect(0, y, c.width, 1);
        }
        var tex = new THREE.CanvasTexture(c);
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 3);
        return tex;
    }

    var turned = turnedTexture();
    var brass = new THREE.MeshStandardMaterial({ color: 0xd9b26b, metalness: 1, roughness: 1, roughnessMap: turned, metalnessMap: turned });
    var oldBrass = new THREE.MeshStandardMaterial({ color: 0xb98d4c, metalness: 1, roughness: 1, roughnessMap: turned, metalnessMap: turned });
    var steel = new THREE.MeshStandardMaterial({ color: 0xd9d3c8, metalness: 1, roughness: 0.3 });
    var garnet = new THREE.MeshPhysicalMaterial({ color: 0x86111f, metalness: 0, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.06 });
    var pearl = new THREE.MeshPhysicalMaterial({ color: 0xf2e9da, metalness: 0, roughness: 0.36, clearcoat: 0.7, clearcoatRoughness: 0.18 });
    var silk = new THREE.MeshStandardMaterial({ color: 0xa3192b, metalness: 0, roughness: 0.55 });

    // ---------- The globe's maps ----------

    function drawGlobeMaps(topo, visitedIds) {
        var W = MAP_W, H = W / 2, k = W / 4096;
        var proj = d3.geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]).precision(0);
        var land = topojson.feature(topo, topo.objects.land);
        var coast = topojson.mesh(topo, topo.objects.land);
        var borders = topojson.mesh(topo, topo.objects.countries, function (a, b) { return a !== b; });
        var visited = {
            type: 'FeatureCollection',
            features: topojson.feature(topo, topo.objects.countries).features.filter(function (f) { return visitedIds[+f.id]; })
        };

        function layer() {
            var c = document.createElement('canvas');
            c.width = W;
            c.height = H;
            return c;
        }
        function X(lng) { return (lng + 180) / 360 * W; }
        function Y(lat) { return (90 - lat) / 180 * H; }

        // 1. Every engraved mark, white on clear; tinted later for each map
        var eng = layer();
        var g = eng.getContext('2d');
        var path = d3.geoPath(proj, g);
        g.strokeStyle = g.fillStyle = '#fff';
        g.lineJoin = g.lineCap = 'round';

        // Water-lines: rings that follow the coast out to sea, fainter the further out
        [38, 27, 18, 11, 5].forEach(function (d, i) {
            g.globalCompositeOperation = 'source-over';
            g.globalAlpha = 0.16 + i * 0.1;
            g.lineWidth = (2 * d + 1.6) * k;
            g.beginPath();
            path(coast);
            g.stroke();
            g.globalCompositeOperation = 'destination-out';
            g.globalAlpha = 1;
            g.lineWidth = Math.max(0.1, (2 * d - 1.6) * k);
            g.beginPath();
            path(coast);
            g.stroke();
        });
        g.globalCompositeOperation = 'destination-out';
        g.beginPath();
        path(land);
        g.fill();
        g.globalCompositeOperation = 'source-over';

        // Coastline, cut cleanly; borders dotted
        g.globalAlpha = 0.95;
        g.lineWidth = 2.6 * k;
        g.beginPath();
        path(coast);
        g.stroke();
        g.globalAlpha = 0.75;
        g.lineWidth = 2 * k;
        g.setLineDash([0.5 * k, 5.5 * k]);
        g.beginPath();
        path(borders);
        g.stroke();
        g.setLineDash([]);

        // Meridians every fifteen degrees (an hour each), parallels, and the polar calottes
        g.globalAlpha = 0.38;
        g.lineWidth = 1.6 * k;
        g.beginPath();
        for (var lng = -180; lng <= 180; lng += 15) {
            var full = lng % 90 === 0;
            g.moveTo(X(lng), Y(full ? 90 : 80));
            g.lineTo(X(lng), Y(full ? -90 : -80));
        }
        [-60, -45, -30, -15, 15, 30, 45, 60].forEach(function (lat) {
            g.moveTo(0, Y(lat));
            g.lineTo(W, Y(lat));
        });
        g.stroke();
        g.globalAlpha = 0.6;
        [80, -80].forEach(function (lat) {
            [0, 6].forEach(function (o) {
                var y = Y(lat) + (lat > 0 ? -o : o) * k;
                g.beginPath();
                g.moveTo(0, y);
                g.lineTo(W, y);
                g.stroke();
            });
        });

        // Tropics and polar circles, dashed; the dashes lengthen toward the poles so they look even on the sphere
        g.globalAlpha = 0.5;
        [23.44, -23.44, 66.56, -66.56].forEach(function (lat) {
            var s = 1 / Math.cos(lat * DEG);
            g.setLineDash([12 * k * s, 9 * k * s]);
            g.beginPath();
            g.moveTo(0, Y(lat));
            g.lineTo(W, Y(lat));
            g.stroke();
        });
        // The ecliptic
        g.setLineDash([3 * k, 7 * k]);
        g.globalAlpha = 0.55;
        g.beginPath();
        for (var e = -180; e <= 180; e += 1) {
            var elat = Math.atan(Math.tan(TILT) * Math.sin(e * DEG)) / DEG;
            if (e === -180) g.moveTo(X(e), Y(elat));
            else g.lineTo(X(e), Y(elat));
        }
        g.stroke();
        g.setLineDash([]);

        // The graduated equator: a double rule with alternate five-degree blocks, ticks at each degree
        var ey = Y(0), eh = 7 * k;
        g.globalAlpha = 0.85;
        g.lineWidth = 1.6 * k;
        g.beginPath();
        g.moveTo(0, ey - eh);
        g.lineTo(W, ey - eh);
        g.moveTo(0, ey + eh);
        g.lineTo(W, ey + eh);
        g.stroke();
        g.globalAlpha = 0.55;
        for (var b = -180; b < 180; b += 10) g.fillRect(X(b), ey - eh, X(b + 5) - X(b), 2 * eh);
        g.globalAlpha = 0.7;
        g.lineWidth = 1.2 * k;
        g.beginPath();
        for (var d = -180; d < 180; d++) {
            var tl = (d % 5 === 0 ? 7 : 4) * k;
            g.moveTo(X(d), ey - eh);
            g.lineTo(X(d), ey - eh - tl);
            g.moveTo(X(d), ey + eh);
            g.lineTo(X(d), ey + eh + tl);
        }
        g.stroke();

        // Lettering, stretched by latitude so it reads true on the sphere
        function letter(text, lng, lat, o) {
            var size = o.size * k;
            g.save();
            g.globalAlpha = o.alpha || 0.85;
            g.font = (o.italic ? 'italic ' : '') + (o.weight || 600) + ' ' + size + 'px "Cormorant Garamond", Georgia, serif';
            g.textBaseline = 'middle';
            g.textAlign = 'left';
            g.translate(X(lng), Y(lat));
            g.scale(1 / Math.cos(lat * DEG), 1);
            if (o.rotate) g.rotate(o.rotate * DEG);
            var chars = text.split('');
            var gap = (o.spacing || 0) * size;
            var widths = chars.map(function (ch) { return g.measureText(ch).width; });
            var total = widths.reduce(function (s, w) { return s + w; }, 0) + gap * (chars.length - 1);
            var x = -total / 2;
            chars.forEach(function (ch, i) {
                g.fillText(ch, x, (o.dy || 0) * k);
                x += widths[i] + gap;
            });
            g.restore();
        }

        [['ASIA', 92, 57], ['EUROPE', 38, 54.5], ['AFRICA', 18, 9], ['NORTH AMERICA', -101, 47],
            ['SOUTH AMERICA', -59, -11], ['AUSTRALIA', 134, -25]].forEach(function (c) {
            letter(c[0], c[1], c[2], { size: 30, spacing: 0.55, alpha: 0.8 });
        });
        [['PACIFIC OCEAN', -142, 31], ['PACIFIC OCEAN', 170, 12], ['ATLANTIC OCEAN', -39, 27],
            ['INDIAN OCEAN', 79, -17], ['SOUTHERN OCEAN', 100, -58]].forEach(function (c) {
            letter(c[0], c[1], c[2], { size: 26, spacing: 0.42, italic: true, weight: 400, alpha: 0.8 });
        });
        // Longitudes along the equator, every thirty degrees
        for (var m = -150; m <= 180; m += 30) {
            letter(String(Math.abs(m)), m + 1.6, 1.9, { size: 15, alpha: 0.7 });
        }

        // The cartouche, in the Pacific, worded like the ones on old globes; the lines stop at its frame
        var CART_LNG = -135, CART_LAT = 8;
        var cx = X(CART_LNG), cy = Y(CART_LAT), rx = 280 * k, ry = 164 * k;
        function cartouchePath(ctx) {
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        }
        g.globalCompositeOperation = 'destination-out';
        cartouchePath(g);
        g.fill();
        g.globalCompositeOperation = 'source-over';
        g.globalAlpha = 0.9;
        g.lineWidth = 2.6 * k;
        g.beginPath();
        g.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        g.stroke();
        g.lineWidth = 1.3 * k;
        g.beginPath();
        g.ellipse(cx, cy, rx - 12 * k, ry - 12 * k, 0, 0, Math.PI * 2);
        g.stroke();
        for (var bead = 0; bead < 96; bead++) {
            var ba = bead / 96 * Math.PI * 2;
            g.beginPath();
            g.arc(cx + Math.cos(ba) * (rx - 6 * k), cy + Math.sin(ba) * (ry - 6 * k), 1.6 * k, 0, Math.PI * 2);
            g.fill();
        }
        letter('A NEW TERRESTRIAL GLOBE', CART_LNG, CART_LAT, { size: 17, spacing: 0.32, dy: -92 });
        letter('on which are laid down', CART_LNG, CART_LAT, { size: 23, italic: true, weight: 400, dy: -58 });
        letter('the footprints of', CART_LNG, CART_LAT, { size: 23, italic: true, weight: 400, dy: -30 });
        letter('IRIS ZHOU', CART_LNG, CART_LAT, { size: 48, spacing: 0.16, dy: 14, alpha: 0.95 });
        g.globalAlpha = 0.85;
        g.lineWidth = 1.4 * k;
        g.beginPath();
        g.moveTo(cx - 90 * k, cy + 52 * k);
        g.lineTo(cx - 10 * k, cy + 52 * k);
        g.moveTo(cx + 10 * k, cy + 52 * k);
        g.lineTo(cx + 90 * k, cy + 52 * k);
        g.stroke();
        g.beginPath();
        g.moveTo(cx, cy + 46 * k);
        g.lineTo(cx + 6 * k, cy + 52 * k);
        g.lineTo(cx, cy + 58 * k);
        g.lineTo(cx - 6 * k, cy + 52 * k);
        g.closePath();
        g.fill();
        letter('Shanghai ' + MIDDOT + ' MMXXVI', CART_LNG, CART_LAT, { size: 21, italic: true, weight: 400, dy: 84 });

        // A compass rose in the South Atlantic: eight points, one half of each cut deep
        (function rose(lng, lat, r) {
            g.save();
            g.translate(X(lng), Y(lat));
            g.scale(1 / Math.cos(lat * DEG), 1);
            g.globalAlpha = 0.85;
            g.lineWidth = 1.4 * k;
            g.beginPath();
            g.arc(0, 0, r, 0, Math.PI * 2);
            g.stroke();
            g.beginPath();
            g.arc(0, 0, r * 0.8, 0, Math.PI * 2);
            g.stroke();
            for (var i = 0; i < 8; i++) {
                var a = i * Math.PI / 4;
                var len = i % 2 ? r * 0.58 : r * 1.06;
                var wid = i % 2 ? r * 0.09 : r * 0.14;
                var tip = [Math.sin(a) * len, -Math.cos(a) * len];
                var side = [Math.cos(a) * wid, Math.sin(a) * wid];
                g.beginPath();
                g.moveTo(0, 0);
                g.lineTo(tip[0], tip[1]);
                g.lineTo(side[0], side[1]);
                g.closePath();
                g.fill();
                g.beginPath();
                g.moveTo(0, 0);
                g.lineTo(tip[0], tip[1]);
                g.lineTo(-side[0], -side[1]);
                g.closePath();
                g.stroke();
            }
            g.font = '600 ' + (r * 0.36) + 'px "Cormorant Garamond", Georgia, serif';
            g.textAlign = 'center';
            g.textBaseline = 'middle';
            g.fillText('N', 0, -r * 1.3);
            g.restore();
        })(-24, -34, 70 * k);

        // 2. A scratch canvas to tint the engraving for each map
        var tmp = layer();
        var tc = tmp.getContext('2d');
        function inlay(ctx, color) {
            tc.globalCompositeOperation = 'copy';
            tc.drawImage(eng, 0, 0);
            tc.globalCompositeOperation = 'source-in';
            tc.fillStyle = color;
            tc.fillRect(0, 0, W, H);
            ctx.drawImage(tmp, 0, 0);
        }
        // Patina: soft, uneven tarnish over the sea, the same blobs in both maps
        function patina(ctx, kind) {
            var rand = seeded(7);
            for (var i = 0; i < 280; i++) {
                var x = rand() * W, y = (0.06 + rand() * 0.88) * H, r = (50 + rand() * 230) * k;
                var green = rand() < 0.22;
                var alpha = 0.05 + rand() * 0.1;
                var col = kind === 'albedo' ? (green ? '78,92,62' : '64,44,22') : '96,200,212';
                var grad = ctx.createRadialGradient(x, y, 0, x, y, r);
                grad.addColorStop(0, 'rgba(' + col + ',' + alpha + ')');
                grad.addColorStop(1, 'rgba(' + col + ',0)');
                ctx.fillStyle = grad;
                ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
            }
        }

        // 3. Colour: darker satin sea, polished land, rose gold where she has been, dark inlay in the cuts
        var albedo = layer();
        var a = albedo.getContext('2d');
        var pa = d3.geoPath(proj, a);
        a.fillStyle = '#80603a';
        a.fillRect(0, 0, W, H);
        patina(a, 'albedo');
        a.fillStyle = '#dcb873';
        a.beginPath();
        pa(land);
        a.fill();
        a.fillStyle = '#f4b7a0';
        a.beginPath();
        pa(visited);
        a.fill();
        a.fillStyle = '#dcb873';
        cartouchePath(a);
        a.fill();
        inlay(a, '#2c1b0d');

        // 4. Surface, packed: R = height (for the bump), G = roughness, B = metalness
        var orm = layer();
        var o = orm.getContext('2d');
        var po = d3.geoPath(proj, o);
        o.fillStyle = 'rgb(100,128,232)';
        o.fillRect(0, 0, W, H);
        patina(o, 'orm');
        o.fillStyle = 'rgb(168,60,255)';
        o.beginPath();
        po(land);
        o.fill();
        o.fillStyle = 'rgb(176,96,255)';
        o.beginPath();
        po(visited);
        o.fill();
        o.fillStyle = 'rgb(168,84,255)';     // the plate a little less polished, so its lettering reads
        cartouchePath(o);
        o.fill();
        inlay(o, 'rgb(36,205,110)');

        eng.width = eng.height = 0;
        tmp.width = tmp.height = 0;

        var map = new THREE.CanvasTexture(albedo);
        map.encoding = THREE.sRGBEncoding;
        var surface = new THREE.CanvasTexture(orm);
        [map, surface].forEach(function (tex) { tex.anisotropy = aniso; });
        return { map: map, surface: surface };
    }

    function ringTexture() {
        var S = MAP_W >= 4096 ? 2048 : 1024;
        var c = document.createElement('canvas');
        c.width = c.height = S;
        var g = c.getContext('2d');
        var m = S / 2, s = m / (RING_OUT + 0.01);
        var ri = RING_IN * s, ro = RING_OUT * s, band = ro - ri;
        g.fillStyle = '#ddb874';
        g.fillRect(0, 0, S, S);
        g.strokeStyle = g.fillStyle = '#3a2611';
        g.lineWidth = S / 1500;
        var outer = ro - band * 0.1, guide = ri + band * 0.46;
        [outer, guide].forEach(function (r) {
            g.beginPath();
            g.arc(m, m, r, 0, Math.PI * 2);
            g.stroke();
        });
        g.beginPath();
        for (var d = 0; d < 360; d++) {
            var len = d % 10 === 0 ? 0.44 : d % 5 === 0 ? 0.3 : 0.18;
            var an = d * DEG;
            g.moveTo(m + Math.cos(an) * outer, m - Math.sin(an) * outer);
            g.lineTo(m + Math.cos(an) * (outer - band * len), m - Math.sin(an) * (outer - band * len));
        }
        g.stroke();
        // Degrees of latitude, from nought at the equator to ninety at each pole
        g.font = '600 ' + Math.round(band * 0.3) + 'px "Cormorant Garamond", Georgia, serif';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        for (var n = 0; n < 360; n += 10) {
            var label = n <= 90 ? n : n <= 180 ? 180 - n : n <= 270 ? n - 180 : 360 - n;
            var at = n * DEG, r = ri + band * 0.25;
            g.save();
            g.translate(m + Math.cos(at) * r, m - Math.sin(at) * r);
            g.rotate(Math.PI / 2 - at);
            g.fillText(String(label), 0, 0);
            g.restore();
        }
        var tex = new THREE.CanvasTexture(c);
        tex.encoding = THREE.sRGBEncoding;
        tex.anisotropy = aniso;
        tex.repeat.set(1 / (2 * (RING_OUT + 0.01)), 1 / (2 * (RING_OUT + 0.01)));
        tex.offset.set(0.5, 0.5);
        return tex;
    }

    // ---------- The object ----------

    var globe, pins = [], threads = [], hits = [];

    function buildObject(maps) {
        globe = new THREE.Mesh(
            new THREE.SphereGeometry(1, 192, 96),
            new THREE.MeshStandardMaterial({
                map: maps.map, roughnessMap: maps.surface, metalnessMap: maps.surface, bumpMap: maps.surface,
                bumpScale: 0.0045, roughness: 1, metalness: 1
            })
        );
        spin.add(globe);

        // The meridian ring, graduated, holding the globe at its poles
        var shape = new THREE.Shape();
        shape.absarc(0, 0, RING_OUT, 0, Math.PI * 2, false);
        var hole = new THREE.Path();
        hole.absarc(0, 0, RING_IN, 0, Math.PI * 2, true);
        shape.holes.push(hole);
        var ringGeo = new THREE.ExtrudeGeometry(shape, {
            depth: RING_DEPTH, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.003, bevelSegments: 2, curveSegments: 256
        });
        ringGeo.translate(0, 0, -RING_DEPTH / 2);
        var ringTex = ringTexture();
        var face = new THREE.MeshStandardMaterial({ map: ringTex, bumpMap: ringTex, bumpScale: 0.0025, metalness: 1, roughness: 0.27 });
        tilt.add(new THREE.Mesh(ringGeo, [face, brass]));

        // Pivots at the poles, a finial over the north
        [1, -1].forEach(function (sgn) {
            var pivot = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, RING_IN - 0.98, 16), steel);
            pivot.position.y = sgn * (0.98 + RING_IN) / 2;
            tilt.add(pivot);
        });
        var finial = new THREE.Mesh(new THREE.LatheGeometry([
            new THREE.Vector2(0.03, 0), new THREE.Vector2(0.032, 0.006), new THREE.Vector2(0.02, 0.016),
            new THREE.Vector2(0.017, 0.024), new THREE.Vector2(0.03, 0.038), new THREE.Vector2(0.027, 0.054),
            new THREE.Vector2(0.012, 0.066), new THREE.Vector2(0.004, 0.08), new THREE.Vector2(0, 0.084)
        ], 40), brass);
        finial.position.y = RING_OUT;
        tilt.add(finial);
        var nut = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.03, 0.022, 6), brass);
        nut.position.y = -RING_OUT - 0.011;
        tilt.add(nut);

        // The stand: a turned plinth, an ogee, a bead, a baluster, and a cradle the ring sits in
        var y0 = BASE_Y;
        var profile = [
            [0, 0], [0.6, 0], [0.626, 0.006], [0.632, 0.03], [0.622, 0.038], [0.588, 0.043], [0.583, 0.062],
            [0.558, 0.07], [0.5, 0.083], [0.43, 0.101], [0.36, 0.127], [0.302, 0.158], [0.258, 0.19], [0.228, 0.214],
            [0.236, 0.226], [0.236, 0.242], [0.214, 0.252], [0.12, 0.262], [0.086, 0.28], [0.079, 0.3], [0.098, 0.338],
            [0.105, 0.368], [0.093, 0.408], [0.068, 0.446], [0.054, 0.476], [0.062, 0.488], [0.077, 0.498],
            [0.077, 0.512], [0.058, 0.52], [0.062, 0.528], [0.076, 0.536], [0.076, BASE_Y * -1 - RING_OUT + 0.012],
            [0, BASE_Y * -1 - RING_OUT + 0.012]
        ].map(function (p) { return new THREE.Vector2(p[0], y0 + p[1]); });
        var stand = new THREE.Mesh(new THREE.LatheGeometry(profile, 96), oldBrass);
        stage.add(stand);

        // A soft shadow where the plinth meets the table
        var sc = document.createElement('canvas');
        sc.width = sc.height = 256;
        var sg = sc.getContext('2d');
        var grad = sg.createRadialGradient(128, 128, 0, 128, 128, 128);
        grad.addColorStop(0, 'rgba(0,0,0,0.7)');
        grad.addColorStop(0.42, 'rgba(0,0,0,0.5)');
        grad.addColorStop(0.62, 'rgba(0,0,0,0.16)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        sg.fillStyle = grad;
        sg.fillRect(0, 0, 256, 256);
        var shadow = new THREE.Mesh(
            new THREE.PlaneGeometry(2.1, 2.1),
            new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false, toneMapped: false })
        );
        shadow.rotation.x = -Math.PI / 2;
        shadow.position.y = BASE_Y + 0.001;
        stage.add(shadow);
    }

    function dirOf(c) {
        var phi = (90 - c.lat) * DEG, theta = (c.lng + 180) * DEG;
        return new THREE.Vector3(-Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta));
    }

    var UP = new THREE.Vector3(0, 1, 0);

    function buildPins() {
        var needleGeo = new THREE.CylinderGeometry(0.0016, 0.001, 1, 6);
        needleGeo.translate(0, 0.5, 0);
        var headGeo = new THREE.SphereGeometry(1, 20, 14);
        var hitGeo = new THREE.SphereGeometry(0.03, 8, 6);
        var SIZE = { A: [0.05, 0.016], B: [0.04, 0.011], C: [0.032, 0.0085] };
        places.cities.forEach(function (c) {
            var t = tier(c), size = SIZE[t];
            var dir = dirOf(c);
            var g = new THREE.Group();
            g.quaternion.setFromUnitVectors(UP, dir);
            var needle = new THREE.Mesh(needleGeo, steel);
            needle.position.y = -0.012;
            needle.scale.y = size[0] + 0.012;
            g.add(needle);
            var head = new THREE.Mesh(headGeo, t === 'A' ? garnet : pearl);
            head.position.y = size[0] + size[1] * 0.6;
            head.scale.setScalar(size[1]);
            g.add(head);
            var hit = new THREE.Mesh(hitGeo, steel);
            hit.position.copy(head.position);
            hit.visible = false;
            hit.userData.city = c;
            g.add(hit);
            g.position.copy(dir);
            spin.add(g);
            c.dir = dir;
            c.anchor = dir.clone().multiplyScalar(1 + size[0] + size[1] * 0.6);
            c.head = head;
            hits.push(hit);
            pins.push({ group: g, dir: dir, city: c });
        });
        // East to west, the way the globe turns on the first visit: Asia first, then Europe
        pins.slice().sort(function (p, q) { return q.city.lng - p.city.lng; }).forEach(function (p, i) { p.order = i; });
    }

    function buildThreads() {
        var geo = new THREE.CylinderGeometry(0.0011, 0.0011, 1, 5);
        geo.translate(0, 0.5, 0);
        places.routes.forEach(function (r) {
            var a = cityByName[r[0]], b = cityByName[r[1]];
            if (!a || !b) return;
            var dir = b.anchor.clone().sub(a.anchor);
            var len = dir.length();
            var mesh = new THREE.Mesh(geo, silk);
            mesh.position.copy(a.anchor);
            mesh.quaternion.setFromUnitVectors(UP, dir.normalize());
            mesh.scale.y = len;
            spin.add(mesh);
            threads.push({ mesh: mesh, len: len });
        });
    }

    function setPin(p, t) {
        p.group.visible = t > 0;
        p.group.position.copy(p.dir).multiplyScalar(1 + (1 - easeOutBack(clamp(t, 0, 1))) * 0.24);
    }

    function setThread(th, t) {
        th.mesh.visible = t > 0;
        th.mesh.scale.y = Math.max(0.0001, th.len * easeInOut(clamp(t, 0, 1)));
    }

    // ---------- Camera ----------

    function measure() {
        var w = wrapper.clientWidth, h = wrapper.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        var half = Math.tan(camera.fov * DEG / 2);
        var tall = (TOP_Y - BASE_Y) / 2 * 1.3 / half;
        var wide = RING_OUT * 1.16 / (half * camera.aspect);
        view.fit = Math.max(tall, wide);
        kick();
    }

    var lookAt = new THREE.Vector3();
    function placeCamera() {
        var z = clamp((view.zoom - 1) / (ZOOM_IN - 1), 0, 1);
        lookAt.set(0, ((TOP_Y + BASE_Y) / 2 - 0.1) * (1 - z), 0);
        var dist = view.fit / view.zoom;
        camera.position.set(0, lookAt.y + Math.sin(view.elev) * dist, Math.cos(view.elev) * dist);
        camera.lookAt(lookAt);
    }

    // The spin that brings a city round to face the camera
    var q = new THREE.Quaternion();
    function spinToFace(c, elev, zoom) {
        var z = clamp((zoom - 1) / (ZOOM_IN - 1), 0, 1);
        var ly = ((TOP_Y + BASE_Y) / 2 - 0.1) * (1 - z), dist = view.fit / zoom;
        var d = new THREE.Vector3(0, ly + Math.sin(elev) * dist, Math.cos(elev) * dist).normalize();
        tilt.getWorldQuaternion(q);
        d.applyQuaternion(q.invert());
        return Math.atan2(d.x, d.z) - Math.atan2(c.dir.x, c.dir.z);
    }

    // ---------- Motion ----------

    var tweens = {};
    function tween(name, from, to, ms, set) {
        if (reduced) ms = 1;
        tweens[name] = { from: from, to: to, ms: ms, start: performance.now(), set: set };
        kick();
    }
    function runTweens(now) {
        Object.keys(tweens).forEach(function (k) {
            var tw = tweens[k];
            var p = clamp((now - tw.start) / tw.ms, 0, 1);
            tw.set(tw.from + (tw.to - tw.from) * easeInOut(p));
            if (p >= 1) delete tweens[k];
        });
    }

    var autoTurn = !reduced;
    var spinVel = 0;
    var lastInput = -1e9;
    var intro = null;

    function noteInput() { lastInput = performance.now(); }

    function flyTo(c) {
        endIntro();
        var elev = clamp((c.lat - 18) * 0.5 * DEG, ELEV_MIN, ELEV_MAX - 0.12);
        var target = spinToFace(c, elev, view.zoom);
        var from = spin.rotation.y;
        var to = from + wrapPi(target - from);
        spinVel = 0;
        noteInput();
        tween('spin', from, to, 1100, function (v) { spin.rotation.y = v; });
        tween('elev', view.elev, elev, 1100, function (v) { view.elev = v; });
        showTip(c, 4800);
    }

    function setZoom(z) {
        tween('zoom', view.zoom, z, 700, function (v) { view.zoom = v; });
        if (zoomBtn) zoomBtn.setAttribute('aria-pressed', String(z > 1));
    }

    function setAutoTurn(on) {
        autoTurn = on;
        if (spinBtn) {
            spinBtn.setAttribute('aria-pressed', String(on));
            spinBtn.classList.toggle('active', on);
        }
        kick();
    }

    function startIntro() {
        var seen = true;
        try {
            seen = !!sessionStorage.getItem('globeIntroSeen');
            sessionStorage.setItem('globeIntroSeen', '1');
        } catch (err) { /* private mode: no intro */ }
        if (seen || reduced) return;
        var home = cityByName[HOME], shanghai = cityByName.Shanghai;
        var to = spinToFace(home, ELEV, 1);
        var from = spinToFace(shanghai, ELEV, 1);
        while (from > to) from -= Math.PI * 2;        // turn westward, Asia to Europe
        intro = { start: 0, from: from, to: to };
        spin.rotation.y = from;
        pins.forEach(function (p) { setPin(p, 0); });
        threads.forEach(function (th) { setThread(th, 0); });
    }

    function runIntro(now) {
        if (!intro.start) intro.start = now;
        var t = now - intro.start;
        spin.rotation.y = intro.from + (intro.to - intro.from) * easeInOut(clamp(t / 2800, 0, 1));
        pins.forEach(function (p) { setPin(p, (t - 300 - p.order * 48) / 520); });
        threads.forEach(function (th, i) { setThread(th, (t - 2500 - i * 55) / 650); });
        if (t > 2500 + threads.length * 55 + 700) endIntro();
    }

    function endIntro() {
        if (!intro) return;
        intro = null;
        pins.forEach(function (p) { setPin(p, 1); });
        threads.forEach(function (th) { setThread(th, 1); });
        noteInput();
    }

    // ---------- The label that follows a pin ----------

    var tipCity = null;
    var tipUntil = 0;
    var tipShown = false;
    var tv = new THREE.Vector3();
    var tn = new THREE.Vector3();

    function fillTip(c) {
        if (!tooltipEl) return;
        tooltipEl.querySelector('.tooltip-city').textContent = flagOf(c) + ' ' + cityName(c);
        tooltipEl.querySelector('.tooltip-country').textContent = countryName(c.country);
        var pl = tooltipEl.querySelector('.tooltip-places');
        pl.textContent = c.pins > 0 ? tr('travel.tip.saved', '{n} saved places').replace('{n}', c.pins) : tr('travel.tip.visited', 'Visited');
        pl.className = 'tooltip-places' + (tier(c) === 'A' ? ' is-lingered' : '');
    }

    function showTip(c, ms) {
        if (!tooltipEl) return;
        if (tipCity !== c) fillTip(c);
        tipCity = c;
        tipUntil = ms ? performance.now() + ms : 0;
        kick();
    }

    function hideTip() {
        tipCity = null;
        if (tooltipEl && tipShown) {
            tooltipEl.classList.remove('visible');
            tipShown = false;
        }
    }

    function placeTip(now) {
        if (!tipCity) return;
        if (tipUntil && now > tipUntil) { hideTip(); return; }
        tipCity.head.getWorldPosition(tv);
        tn.copy(tipCity.dir).applyQuaternion(spin.getWorldQuaternion(q));
        var facing = tn.dot(camera.position.clone().sub(tv).normalize()) > 0.12;
        tv.project(camera);
        var x = (tv.x + 1) / 2 * wrapper.clientWidth, y = (1 - tv.y) / 2 * wrapper.clientHeight;
        tooltipEl.style.transform = 'translate(' + Math.round(x + 14) + 'px,' + Math.round(y - 14) + 'px) translateY(-100%)';
        if (facing !== tipShown) {
            tooltipEl.classList.toggle('visible', facing);
            tipShown = facing;
        }
    }

    // ---------- Pointer ----------

    var ray = new THREE.Raycaster();
    var ndc = new THREE.Vector2();
    function pick(x, y) {
        var r = canvas.getBoundingClientRect();
        ndc.set((x - r.left) / r.width * 2 - 1, -(y - r.top) / r.height * 2 + 1);
        ray.setFromCamera(ndc, camera);
        var found = ray.intersectObjects([globe].concat(hits), false);
        if (!found.length || found[0].object === globe) return null;
        return found[0].object.userData.city || null;
    }

    var hintHidden = false;
    function setHint() {
        if (hintEl) hintEl.textContent = coarse ? tr('travel.hintTouch', 'Swipe sideways to turn it') : tr('travel.hint', 'Drag to turn the globe');
    }
    function hideHint() {
        if (!hintHidden && hintEl) {
            hintEl.classList.add('hidden');
            hintHidden = true;
        }
    }

    var drag = null;
    function bindPointer() {
        canvas.addEventListener('pointerdown', function (e) {
            if (e.button) return;
            drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), moved: 0, type: e.pointerType };
            spinVel = 0;
            delete tweens.spin;
            endIntro();
            noteInput();
            try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
            wrapper.classList.add('is-dragging');
            kick();
        });
        canvas.addEventListener('pointermove', function (e) {
            if (drag && e.pointerId === drag.id) {
                var now = performance.now();
                var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
                drag.moved += Math.abs(dx) + Math.abs(dy);
                var perPx = Math.PI / Math.max(360, wrapper.clientHeight);
                spin.rotation.y += dx * perPx;
                var dt = Math.max(8, now - drag.t) / 1000;
                spinVel = spinVel * 0.5 + dx * perPx / dt * 0.5;
                if (drag.type !== 'touch') {
                    delete tweens.elev;
                    view.elev = clamp(view.elev + dy * perPx * 0.5, ELEV_MIN, ELEV_MAX);
                }
                drag.x = e.clientX;
                drag.y = e.clientY;
                drag.t = now;
                if (drag.moved > 6) {
                    hideHint();
                    if (tipUntil) hideTip();
                }
                noteInput();
                kick();
            } else if (e.pointerType === 'mouse' && ready) {
                var c = pick(e.clientX, e.clientY);
                canvas.style.cursor = c ? 'pointer' : '';
                if (c) showTip(c, 0);
                else if (tipCity && !tipUntil) hideTip();
            }
        });
        function release(e) {
            if (!drag || e.pointerId !== drag.id) return;
            var tap = drag.moved < 6;
            if (performance.now() - drag.t > 90 || reduced) spinVel = 0;
            spinVel = clamp(spinVel, -5, 5);
            drag = null;
            wrapper.classList.remove('is-dragging');
            if (tap) {
                var c = pick(e.clientX, e.clientY);
                if (c) showTip(c, 4000);
                else hideTip();
            }
            noteInput();
            kick();
        }
        canvas.addEventListener('pointerup', release);
        canvas.addEventListener('pointercancel', function (e) {
            if (!drag || e.pointerId !== drag.id) return;
            drag = null;
            spinVel = 0;
            wrapper.classList.remove('is-dragging');
        });
        canvas.addEventListener('pointerleave', function (e) {
            if (e.pointerType === 'mouse' && !drag && tipCity && !tipUntil) hideTip();
        });
        canvas.addEventListener('dblclick', function () {
            setZoom(view.zoom > 1.2 ? 1 : ZOOM_IN);
            hideHint();
        });
        // A pinch on a trackpad arrives as a wheel with ctrl held; a plain wheel scrolls the page
        canvas.addEventListener('wheel', function (e) {
            if (!e.ctrlKey) return;
            e.preventDefault();
            delete tweens.zoom;
            view.zoom = clamp(view.zoom * Math.exp(-e.deltaY * 0.01), 1, ZOOM_IN);
            if (zoomBtn) zoomBtn.setAttribute('aria-pressed', String(view.zoom > 1.05));
            hideHint();
            kick();
        }, { passive: false });

        if (spinBtn) spinBtn.addEventListener('click', function () { setAutoTurn(!autoTurn); noteInput(); });
        if (zoomBtn) zoomBtn.addEventListener('click', function () { setZoom(view.zoom > 1.2 ? 1 : ZOOM_IN); });
        if (resetBtn) resetBtn.addEventListener('click', function () {
            setZoom(1);
            hideTip();
            var c = cityByName[HOME];
            var from = spin.rotation.y;
            spinVel = 0;
            tween('spin', from, from + wrapPi(spinToFace(c, ELEV, 1) - from), 1100, function (v) { spin.rotation.y = v; });
            tween('elev', view.elev, ELEV, 1100, function (v) { view.elev = v; });
            setAutoTurn(!reduced);
            noteInput();
        });
    }

    // ---------- The loop: only while it is on screen, and only while something moves ----------

    var onScreen = false;
    var running = false;
    var last = 0;

    function busy(now) {
        return !!drag || !!intro || Object.keys(tweens).length > 0 || spinVel !== 0 ||
            (autoTurn && !reduced) || (tipCity && tipUntil > 0) || now - lastInput < 600;
    }

    function frame(now) {
        if (!onScreen || document.hidden) {
            running = false;
            return;
        }
        var dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (intro) runIntro(now);
        runTweens(now);
        if (!drag) {
            if (spinVel !== 0) {
                spin.rotation.y += spinVel * dt;
                spinVel *= Math.exp(-dt * 1.5);         // a good bearing: it coasts a couple of seconds
                if (Math.abs(spinVel) < 0.003) spinVel = 0;
            } else if (autoTurn && !intro && !tweens.spin) {
                var ease = clamp((now - lastInput - 4000) / 1500, 0, 1);
                spin.rotation.y += AUTO_TURN * dt * ease;
            }
        }
        placeCamera();
        placeTip(now);
        renderer.render(scene, camera);
        if (busy(now)) requestAnimationFrame(frame);
        else running = false;
    }

    function kick() {
        if (running || !ready || !onScreen || document.hidden) return;
        running = true;
        last = performance.now();
        requestAnimationFrame(frame);
    }

    // ---------- Build ----------

    var fontsReady = document.fonts && document.fonts.load
        ? Promise.all([
            document.fonts.load('600 40px "Cormorant Garamond"'),
            document.fonts.load('italic 400 40px "Cormorant Garamond"')
        ]).catch(function () {})
        : Promise.resolve();

    // A slow network gets an honest message rather than a spinner forever
    window.setTimeout(function () { if (!ready) fail(); }, 15000);

    Promise.all([
        placesLoaded,
        fetch(WORLD).then(function (r) { return r.json(); }),
        Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 2500); })])
    ]).then(function (res) {
        var visitedIds = {};
        places.countries.forEach(function (c) { visitedIds[c.id] = true; });
        // Let the loading line paint before the maps are drawn
        return new Promise(function (r) { setTimeout(r, 30); }).then(function () {
            var maps = drawGlobeMaps(res[1], visitedIds);
            buildObject(maps);
            buildPins();
            buildThreads();
        });
    }).then(function () {
        measure();
        var home = cityByName[HOME];
        spin.rotation.y = spinToFace(home, ELEV, 1);
        placeCamera();
        startIntro();
        renderer.compile(scene, camera);
        bindPointer();
        setHint();
        setAutoTurn(autoTurn);
        ready = true;
        wrapper.classList.add('is-ready');
        if (loadingEl) loadingEl.classList.add('hidden');
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                onScreen = entries[0].isIntersecting;
                kick();
            }, { rootMargin: '80px' }).observe(wrapper);
        } else {
            onScreen = true;
        }
        document.addEventListener('visibilitychange', kick);
        if ('ResizeObserver' in window) new ResizeObserver(measure).observe(wrapper);
        else window.addEventListener('resize', measure);
        renderer.render(scene, camera);
        kick();
        if (pending) {
            flyTo(pending);
            pending = null;
        }
    }).catch(function (err) {
        console.warn('The globe could not be built:', err);
        fail();
    });

    canvas.addEventListener('webglcontextlost', function (e) {
        e.preventDefault();
        ready = false;
    });
    canvas.addEventListener('webglcontextrestored', function () {
        ready = true;
        kick();
    });
})();
