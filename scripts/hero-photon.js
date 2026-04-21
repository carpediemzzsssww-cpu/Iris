/* ============================================================
   Photon-Butterfly Hero — boids + butterfly attractor + terminal
   Scoped inside .hero-photon container.
   ============================================================ */
(function () {
    'use strict';

    const root = document.querySelector('.hero-photon');
    if (!root) return;

    const canvas = root.querySelector('#c');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, DPR;

    function resize() {
        const hero = root.querySelector('.hero');
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        W = hero.clientWidth;
        H = hero.clientHeight;
        canvas.width = W * DPR;
        canvas.height = H * DPR;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(DPR, DPR);
    }
    resize();

    const palette = [
        [168, 156, 178],
        [184, 172, 194],
        [148, 138, 158],
        [196, 184, 200],
        [210, 200, 210],
    ];

    let butterflyPoints = [];
    function butterflyPoint(t, side) {
        const scale = Math.min(W, H) * 0.30;
        const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5);
        let x = Math.sin(t) * r * scale * 0.18;
        let y = -Math.cos(t) * r * scale * 0.18;
        if (side === 'r') { x *= 1.12; y *= 0.93; }
        else { x *= 0.95; y *= 1.04; }
        return { x, y };
    }
    function buildButterflyField() {
        butterflyPoints = [];
        const cx = W * 0.62, cy = H * 0.55;
        const samples = 200;
        for (let i = 0; i < samples; i++) {
            const t = (i / samples) * Math.PI * 2;
            const lp = butterflyPoint(t, 'l');
            const rp = butterflyPoint(t, 'r');
            butterflyPoints.push({ x: cx + lp.x, y: cy + lp.y, side: 'l' });
            butterflyPoints.push({ x: cx + rp.x, y: cy + rp.y, side: 'r' });
        }
    }
    buildButterflyField();

    const TARGET_DENSITY = 800;
    const N = Math.min(2000, Math.floor((W * H) / TARGET_DENSITY));
    const particles = [];

    for (let i = 0; i < N; i++) {
        const sizeRoll = Math.pow(Math.random(), 1.8);
        let size, alpha, blur;
        if (sizeRoll < 0.7) { size = 0.4 + sizeRoll * 1.0; alpha = 0.45 + Math.random() * 0.25; blur = 0; }
        else if (sizeRoll < 0.93) { size = 1.2 + Math.random() * 1.1; alpha = 0.25 + Math.random() * 0.20; blur = 1; }
        else { size = 2.2 + Math.random() * 2.2; alpha = 0.10 + Math.random() * 0.12; blur = 3; }

        const colorRoll = Math.random();
        let colorIdx;
        if (colorRoll < 0.4) colorIdx = 0;
        else if (colorRoll < 0.75) colorIdx = 1;
        else if (colorRoll < 0.92) colorIdx = 2;
        else if (colorRoll < 0.99) colorIdx = 3;
        else colorIdx = 4;

        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size, alpha, blur,
            color: palette[colorIdx],
            sepWeight: 0.9 + Math.random() * 0.3,
            aliWeight: 0.7 + Math.random() * 0.4,
            cohWeight: 0.5 + Math.random() * 0.3,
            attractWeight: 0.4 + Math.random() * 0.4,
        });
    }

    const NEIGHBOR_RADIUS = 36;
    const CELL = NEIGHBOR_RADIUS;
    let cols, rows, grid;
    function buildGrid() {
        cols = Math.ceil(W / CELL) + 1;
        rows = Math.ceil(H / CELL) + 1;
        grid = new Array(cols * rows);
    }
    buildGrid();

    window.addEventListener('resize', () => { resize(); buildButterflyField(); buildGrid(); });

    function hashAt(cx, cy) { return cy * cols + cx; }

    function rebuildGrid() {
        for (let i = 0; i < grid.length; i++) grid[i] = null;
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const cx = Math.max(0, Math.min(cols - 1, (p.x / CELL) | 0));
            const cy = Math.max(0, Math.min(rows - 1, (p.y / CELL) | 0));
            const h = hashAt(cx, cy);
            if (!grid[h]) grid[h] = [];
            grid[h].push(i);
            p._cx = cx; p._cy = cy;
        }
    }

    const mouse = { x: -9999, y: -9999, active: false };
    const heroEl = root.querySelector('.hero');
    heroEl.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    });
    heroEl.addEventListener('mouseleave', () => { mouse.active = false; });

    const termRect = { x: 0, y: 0, w: 0, h: 0, active: false };
    const TERM_AVOID_PADDING = 24;
    function updateTermRect() {
        const el = root.querySelector('.terminal');
        if (!el) { termRect.active = false; return; }
        const heroRect = heroEl.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        termRect.x = r.left - heroRect.left - TERM_AVOID_PADDING;
        termRect.y = r.top - heroRect.top - TERM_AVOID_PADDING;
        termRect.w = r.width + TERM_AVOID_PADDING * 2;
        termRect.h = r.height + TERM_AVOID_PADDING * 2;
        termRect.active = window.innerWidth > 820;
    }
    updateTermRect();
    window.addEventListener('resize', updateTermRect);
    setTimeout(updateTermRect, 4800);

    const SEP_RADIUS = 12;
    const SEP_RADIUS_SQ = SEP_RADIUS * SEP_RADIUS;
    const NEIGHBOR_RADIUS_SQ = NEIGHBOR_RADIUS * NEIGHBOR_RADIUS;
    const MAX_SPEED = 1.4;
    const MAX_FORCE = 0.04;
    const LINK_RADIUS = 22;
    const LINK_RADIUS_SQ = LINK_RADIUS * LINK_RADIUS;

    function limit(vx, vy, max) {
        const sq = vx * vx + vy * vy;
        if (sq > max * max) {
            const m = max / Math.sqrt(sq);
            return [vx * m, vy * m];
        }
        return [vx, vy];
    }

    const CYCLE_MS = 14000;
    const SLOW_CYCLE_MS = 37000;
    const startTime = performance.now();
    const WING_OFFSET_MS = 800;

    function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    function wingStrength(now, phaseOffsetMs) {
        const offset = ((now - startTime) - phaseOffsetMs) % CYCLE_MS;
        const t = (offset < 0 ? offset + CYCLE_MS : offset) / CYCLE_MS;
        if (t < 0.32) return easeInOut(t / 0.32) * 0.85;
        if (t < 0.55) return 0.85;
        if (t < 0.85) return 0.85 - easeInOut((t - 0.55) / 0.30) * 0.85;
        return 0;
    }

    function ambientBrightness(now) {
        const t = ((now - startTime) % SLOW_CYCLE_MS) / SLOW_CYCLE_MS;
        return 1.0 + 0.15 * Math.sin(t * Math.PI * 2);
    }

    function nearestAttractor(px, py) {
        let bestDx = 0, bestDy = 0, bestDistSq = Infinity, bestSide = 'l';
        for (let i = 0; i < butterflyPoints.length; i++) {
            const a = butterflyPoints[i];
            const dx = a.x - px, dy = a.y - py;
            const d = dx * dx + dy * dy;
            if (d < bestDistSq) { bestDistSq = d; bestDx = dx; bestDy = dy; bestSide = a.side; }
        }
        return [bestDx, bestDy, bestDistSq, bestSide];
    }

    const grainCanvas = document.createElement('canvas');
    const grainCtx = grainCanvas.getContext('2d');
    const GRAIN_SIZE = 256;
    grainCanvas.width = GRAIN_SIZE;
    grainCanvas.height = GRAIN_SIZE;

    function regenerateGrain() {
        const img = grainCtx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
        for (let i = 0; i < img.data.length; i += 4) {
            const v = Math.random() * 255;
            img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v;
            img.data[i+3] = Math.random() < 0.5 ? 8 : 0;
        }
        grainCtx.putImageData(img, 0, 0);
    }
    regenerateGrain();
    let grainFrame = 0;

    function drawGrain() {
        if (grainFrame++ % 3 === 0) regenerateGrain();
        ctx.globalCompositeOperation = 'overlay';
        const tilesX = Math.ceil(W / GRAIN_SIZE) + 1;
        const tilesY = Math.ceil(H / GRAIN_SIZE) + 1;
        const ox = -Math.random() * GRAIN_SIZE;
        const oy = -Math.random() * GRAIN_SIZE;
        for (let y = 0; y < tilesY; y++) {
            for (let x = 0; x < tilesX; x++) {
                ctx.drawImage(grainCanvas, ox + x * GRAIN_SIZE, oy + y * GRAIN_SIZE);
            }
        }
        ctx.globalCompositeOperation = 'source-over';
    }

    let running = true;

    function tick() {
        if (!running) return;
        const now = performance.now();
        const attrLeft = wingStrength(now, 0);
        const attrRight = wingStrength(now, WING_OFFSET_MS);
        const attrMax = Math.max(attrLeft, attrRight);
        const ambient = ambientBrightness(now);

        ctx.fillStyle = 'rgba(26, 22, 32, 0.18)';
        ctx.fillRect(0, 0, W, H);

        rebuildGrid();

        ctx.globalCompositeOperation = 'screen';
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            for (let oy = -1; oy <= 1; oy++) {
                for (let ox = -1; ox <= 1; ox++) {
                    const ncx = p._cx + ox, ncy = p._cy + oy;
                    if (ncx < 0 || ncy < 0 || ncx >= cols || ncy >= rows) continue;
                    const cell = grid[hashAt(ncx, ncy)];
                    if (!cell) continue;
                    for (let k = 0; k < cell.length; k++) {
                        const j = cell[k];
                        if (j <= i) continue;
                        const q = particles[j];
                        const dx = q.x - p.x, dy = q.y - p.y;
                        const d = dx * dx + dy * dy;
                        if (d < LINK_RADIUS_SQ && d > 1) {
                            const a = (1 - d / LINK_RADIUS_SQ) * 0.08 * ambient;
                            ctx.strokeStyle = `rgba(184, 164, 201, ${a})`;
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(q.x, q.y);
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            let sepX = 0, sepY = 0, sepCount = 0;
            let aliX = 0, aliY = 0, aliCount = 0;
            let cohX = 0, cohY = 0, cohCount = 0;

            for (let oy = -1; oy <= 1; oy++) {
                for (let ox = -1; ox <= 1; ox++) {
                    const ncx = p._cx + ox, ncy = p._cy + oy;
                    if (ncx < 0 || ncy < 0 || ncx >= cols || ncy >= rows) continue;
                    const cell = grid[hashAt(ncx, ncy)];
                    if (!cell) continue;
                    for (let k = 0; k < cell.length; k++) {
                        const j = cell[k];
                        if (j === i) continue;
                        const q = particles[j];
                        const dx = q.x - p.x, dy = q.y - p.y;
                        const d = dx * dx + dy * dy;
                        if (d < NEIGHBOR_RADIUS_SQ && d > 0) {
                            aliX += q.vx; aliY += q.vy; aliCount++;
                            cohX += q.x; cohY += q.y; cohCount++;
                            if (d < SEP_RADIUS_SQ) {
                                const dist = Math.sqrt(d);
                                sepX -= dx / dist; sepY -= dy / dist;
                                sepCount++;
                            }
                        }
                    }
                }
            }

            let ax = 0, ay = 0;

            if (sepCount > 0) {
                sepX /= sepCount; sepY /= sepCount;
                const [sx, sy] = limit(sepX, sepY, MAX_FORCE);
                ax += sx * 1.5 * p.sepWeight;
                ay += sy * 1.5 * p.sepWeight;
            }
            if (aliCount > 0) {
                aliX /= aliCount; aliY /= aliCount;
                const [sx, sy] = limit(aliX - p.vx, aliY - p.vy, MAX_FORCE);
                ax += sx * p.aliWeight;
                ay += sy * p.aliWeight;
            }
            if (cohCount > 0) {
                cohX = cohX / cohCount - p.x;
                cohY = cohY / cohCount - p.y;
                const m = Math.sqrt(cohX * cohX + cohY * cohY);
                if (m > 0) { cohX = (cohX / m) * MAX_SPEED - p.vx; cohY = (cohY / m) * MAX_SPEED - p.vy; }
                const [sx, sy] = limit(cohX, cohY, MAX_FORCE);
                ax += sx * p.cohWeight;
                ay += sy * p.cohWeight;
            }

            if (attrMax > 0.01) {
                const [dx, dy, dSq, side] = nearestAttractor(p.x, p.y);
                const dist = Math.sqrt(dSq);
                const sideAttr = (side === 'r') ? attrRight : attrLeft;
                const pullStrength = Math.min(0.6, dist / 200) * sideAttr * p.attractWeight;
                if (dist > 1) {
                    ax += (dx / dist) * pullStrength * MAX_FORCE * 1.8;
                    ay += (dy / dist) * pullStrength * MAX_FORCE * 1.8;
                }
            }

            if (mouse.active) {
                const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
                const mdSq = mdx * mdx + mdy * mdy;
                if (mdSq < 12000) {
                    const dist = Math.sqrt(mdSq);
                    const force = (Math.sqrt(12000) - dist) / Math.sqrt(12000);
                    const f = force * force * 0.15;
                    ax += (mdx / dist) * f;
                    ay += (mdy / dist) * f;
                }
            }

            if (termRect.active) {
                const rcx = termRect.x + termRect.w / 2;
                const rcy = termRect.y + termRect.h / 2;
                const qx = Math.abs(p.x - rcx) - termRect.w / 2;
                const qy = Math.abs(p.y - rcy) - termRect.h / 2;

                if (qx < 0 && qy < 0) {
                    if (qx > qy) {
                        const push = (p.x > rcx) ? 1 : -1;
                        ax += push * MAX_FORCE * 2.0;
                    } else {
                        const push = (p.y > rcy) ? 1 : -1;
                        ay += push * MAX_FORCE * 2.0;
                    }
                } else if (qx < 30 && qy < 30) {
                    const edgeDist = Math.max(qx, qy);
                    const falloff = 1 - edgeDist / 30;
                    const dx = p.x - rcx, dy = p.y - rcy;
                    const m = Math.sqrt(dx * dx + dy * dy) || 1;
                    ax += (dx / m) * falloff * falloff * MAX_FORCE * 0.8;
                    ay += (dy / m) * falloff * falloff * MAX_FORCE * 0.8;
                }
            }

            p.vx += ax; p.vy += ay;
            [p.vx, p.vy] = limit(p.vx, p.vy, MAX_SPEED);
            p.x += p.vx; p.y += p.vy;

            if (p.x < -10) p.x = W + 10;
            if (p.x > W + 10) p.x = -10;
            if (p.y < -10) p.y = H + 10;
            if (p.y > H + 10) p.y = -10;
        }

        ctx.globalCompositeOperation = 'screen';
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const [r, g, b] = p.color;
            const a = p.alpha * ambient;
            if (p.blur > 0) {
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
                grd.addColorStop(0, `rgba(${r},${g},${b},${a})`);
                grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.fillStyle = grd;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2); ctx.fill();
            } else {
                ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
            }
        }

        drawGrain();

        ctx.globalCompositeOperation = 'source-over';
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Pause canvas when hero scrolled off to save CPU
    const heroIO = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            if (!running) {
                running = true;
                requestAnimationFrame(tick);
            }
        } else {
            running = false;
        }
    }, { threshold: 0 });
    heroIO.observe(heroEl);

    // Toggle nav style based on how far scroll has advanced into the hero.
    // Flip once the user has scrolled past ~55% of the viewport — before the
    // warm transition starts to dominate. Avoids the nav being unreadable
    // mid-way through the fade.
    let navFlip = -1;
    function updateNavState() {
        const vh = window.innerHeight;
        const flip = window.scrollY < vh * 0.55 ? 1 : 0;
        if (flip !== navFlip) {
            navFlip = flip;
            document.body.classList.toggle('nav-over-hero', flip === 1);
        }
    }
    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState);

    /* ============================================================
       Terminal typewriter + idle surprises
       ============================================================ */
    const term = root.querySelector('#term');
    if (!term) return;

    const lines = [
        { html: '<span class="dim">[ booting ./iris.sh ]</span>', speed: 6, delay: 240 },
        { html: '<span class="dim">> identity ......... </span><span class="ok">ok</span>', speed: 5, delay: 120 },
        { html: '<span class="dim">> langs [zh,fr,en] . </span><span class="ok">ok</span>', speed: 5, delay: 120 },
        { html: '<span class="dim">> traces loaded .... </span><span class="ok">ok</span>', speed: 5, delay: 500 },
        { html: '', speed: 0, delay: 200 },
        { html: '<span class="prompt">$</span> <span class="cmd">whoami</span>', speed: 30, delay: 300 },
        { html: '  Iris Zhou &mdash; AI product builder.', speed: 22, delay: 140 },
        { html: '  <span class="dim">Wuhan Univ &middot; Paris Nanterre &middot; class of 2027</span>', speed: 18, delay: 500 },
        { html: '', speed: 0, delay: 0 },
        { html: '<span class="prompt">$</span> <span class="cmd">cat highlights.txt</span>', speed: 30, delay: 300 },
        { html: '  &middot; 1,287 surveys &rarr; NetEase Hi Echo', speed: 14, delay: 110 },
        { html: '  &middot; 17-person team &middot; 9 months &middot; 1st prize (2/18)', speed: 14, delay: 110 },
        { html: '  &middot; RAG quality +17.5% &middot; specificity +41%', speed: 14, delay: 110 },
        { html: '  &middot; 30k+ VOC entries across 9 platforms', speed: 14, delay: 110 },
        { html: '  &middot; 16 countries &middot; 49 cities &middot; 182 places', speed: 14, delay: 500 },
        { html: '', speed: 0, delay: 0 },
        { html: '<span class="prompt">$</span> <span class="cmd">ls ./built</span>', speed: 30, delay: 300 },
        { html: '  <a class="link" href="https://yunyou.vercel.app" target="_blank">yunyou/</a>         <span class="dim">AI flight decision agent</span>', speed: 14, delay: 100 },
        { html: '  <a class="link" href="https://prd-copilot-av8y8qmsthw7i3cay3efeq.streamlit.app" target="_blank">prd-copilot/</a>    <span class="dim">local RAG, 0 &rarr; 1</span>', speed: 14, delay: 100 },
        { html: '  <a class="link" href="https://chrysalis-pink.vercel.app" target="_blank">chrysalis/</a>      <span class="dim">journaling PWA, daily use</span>', speed: 14, delay: 100 },
        { html: '  <a class="link" href="projects.html">more &rarr;</a>', speed: 14, delay: 500 },
        { html: '', speed: 0, delay: 0 },
        { html: '<span class="prompt">$</span> <span class="cmd">cat contact.txt</span>', speed: 30, delay: 300 },
        { html: '  <a class="link" href="mailto:carpediemzzsssww@gmail.com">carpediemzzsssww@gmail.com</a>', speed: 14, delay: 100 },
        { html: '  <a class="link" href="https://www.linkedin.com/in/iris-zhou-a181013a8/" target="_blank">linkedin.com/in/iris-zhou</a>', speed: 14, delay: 100 },
        { html: '  <a class="link" href="https://github.com/carpediemzzsssww-cpu" target="_blank">github.com/carpediemzzsssww-cpu</a>', speed: 14, delay: 500 },
        { html: '', speed: 0, delay: 0 },
        { html: '<span class="prompt">$</span> ', speed: 0, delay: 0, keepCursor: true },
    ];

    const idleSurprises = [
        '<span class="dim">// 16 countries, 49 cities, 182 saved places.</span>',
        '<span class="dim">// reading: Ishiguro, "Klara and the Sun"</span>',
        '<span class="dim">// Klara says: "I observed carefully."</span>',
        '<span class="dim">// wrote 600 words today. deleted 400.</span>',
        '<span class="dim">// rain in Paris &middot; sun in Shanghai</span>',
        '<span class="dim">// still thinking about it.</span>',
        '<span class="dim">// the flock does not know it is a system.</span>',
        '<span class="dim">// somewhere a particle just turned around.</span>',
    ];

    let lineIdx = 0;
    let charIdx = 0;
    let currentLineEl = null;
    let currentRaw = '';
    let mainCursor = null;

    function renderHtmlUpTo(html, n) {
        let out = '';
        let visible = 0;
        let i = 0;
        while (i < html.length && visible < n) {
            if (html[i] === '<') {
                const close = html.indexOf('>', i);
                if (close === -1) break;
                out += html.slice(i, close + 1);
                i = close + 1;
            } else {
                out += html[i];
                visible++;
                i++;
            }
        }
        const openTags = [];
        const tagRe = /<\/?([a-zA-Z]+)[^>]*>/g;
        let m;
        while ((m = tagRe.exec(out)) !== null) {
            if (m[0].startsWith('</')) openTags.pop();
            else if (!m[0].endsWith('/>')) openTags.push(m[1]);
        }
        while (openTags.length) out += `</${openTags.pop()}>`;
        return out;
    }

    function visibleLength(html) { return html.replace(/<[^>]+>/g, '').length; }

    function typeNext() {
        if (lineIdx >= lines.length) {
            scheduleIdleSurprise();
            return;
        }
        const line = lines[lineIdx];

        if (charIdx === 0) {
            currentLineEl = document.createElement('div');
            currentLineEl.className = 'line';
            term.appendChild(currentLineEl);
            currentRaw = line.html;
            if (line.html === '') {
                currentLineEl.innerHTML = '&nbsp;';
                lineIdx++;
                setTimeout(typeNext, line.delay || 0);
                return;
            }
        }

        const total = visibleLength(currentRaw);
        if (charIdx <= total) {
            currentLineEl.innerHTML = renderHtmlUpTo(currentRaw, charIdx);
            term.scrollTop = term.scrollHeight;
            charIdx++;
            if (charIdx <= total) {
                setTimeout(typeNext, line.speed);
            } else {
                if (line.keepCursor) {
                    mainCursor = document.createElement('span');
                    mainCursor.className = 'cursor';
                    currentLineEl.appendChild(mainCursor);
                }
                lineIdx++;
                charIdx = 0;
                setTimeout(typeNext, line.delay || 0);
            }
        }
    }

    let surpriseIdx = 0;
    function scheduleIdleSurprise() {
        const wait = 23000 + Math.random() * 14000;
        setTimeout(() => {
            if (surpriseIdx >= idleSurprises.length) return;
            if (mainCursor && mainCursor.parentNode) mainCursor.remove();

            const surpriseLine = document.createElement('div');
            surpriseLine.className = 'line';
            surpriseLine.style.opacity = '0';
            surpriseLine.style.transition = 'opacity 1.6s';
            surpriseLine.innerHTML = idleSurprises[surpriseIdx++];
            term.appendChild(surpriseLine);
            requestAnimationFrame(() => { surpriseLine.style.opacity = '1'; });

            const newPrompt = document.createElement('div');
            newPrompt.className = 'line';
            newPrompt.innerHTML = '<span class="prompt">$</span> ';
            mainCursor = document.createElement('span');
            mainCursor.className = 'cursor';
            newPrompt.appendChild(mainCursor);
            term.appendChild(newPrompt);
            term.scrollTop = term.scrollHeight;

            scheduleIdleSurprise();
        }, wait);
    }

    setTimeout(typeNext, 3400);
})();
