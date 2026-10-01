// ================================================
// Home: A museum of small worlds
// - № 01 gallery: it opens like an iris (an aperture, an eye, and a name), under a beam of
//   light with dust drifting in it. Works marked `exhibit: true` in content/projects/*.md
//   stand on an arc; scrolling turns the arc, one lot at a time. The last lot opens the archive.
//   Small details: colour fades away from the light, shadows fall away from the
//   pointer's lantern, the lit lot leans toward the pointer, the spot settles on a
//   lot when the walk stops there, and the lot counter rolls like a mechanical one.
//   Opening a lot carries its cover into the work's page (cross-document view
//   transition, where the browser supports it).
// - Threshold: the quote shifts from night to paper while scripts/sky.js paints the sky behind it.
// - № 02 the path so far; № 03 specimens count up once, get a pencil underline, and open their
//   notes behind a plus.
// Motion follows the scroll with frame-rate independent easing; with
// prefers-reduced-motion the gallery becomes a still grid.
// ================================================

(function () {
    'use strict';

    var gallery = document.getElementById('gallery');
    if (!gallery) return;

    var stage = document.getElementById('galleryStage');
    var ring = document.getElementById('galleryRing');
    var casts = document.getElementById('galleryShadows');
    var spot = document.getElementById('gallerySpot');
    var intro = document.getElementById('galleryIntro');
    var roomTag = document.getElementById('galleryRoom');
    var label = document.getElementById('galleryLabel');
    var index = document.getElementById('galleryIndex');
    var count = document.getElementById('galleryCount');
    var rail = document.getElementById('galleryRail');
    var railTip = document.getElementById('galleryRailTip');
    var loader = document.getElementById('galleryLoader');
    var hint = stage.querySelector('.gallery-hint');
    var threshold = document.getElementById('threshold');
    var irisEl = document.getElementById('galleryIris');
    var dust = document.getElementById('galleryDust');

    var reducedQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var reduced = !!(reducedQuery && reducedQuery.matches);
    var finePointer = !!(window.matchMedia && window.matchMedia('(pointer: fine)').matches);
    // Cross-document view transitions (Chrome 126+, Safari 18.2+): the cover flies into the work's page.
    var crossDocTransitions = 'onpagereveal' in window && !!(window.CSS && CSS.supports && CSS.supports('view-transition-name', 'none'));

    var FALLBACK = {
        'home.lot': 'Lot',
        'home.enter': 'Enter the work',
        'home.archive.title': 'The full archive',
        'home.archive.desc': 'All {n} works, from research reports to small worlds, newest first.',
        'home.archive.cta': 'Open the archive',
        'home.archive.card': 'works in the archive',
        'home.closed': 'The gallery is closed for a moment.',
        'home.closed.link': 'See all projects'
    };

    function t(key) {
        return (window.i18n && window.i18n.t(key)) || FALLBACK[key] || '';
    }

    function isZh() {
        return !!(window.i18n && window.i18n.getLang() === 'zh');
    }

    function field(item, name) {
        return (isZh() && item[name + '_zh']) || item[name] || '';
    }

    function escapeHTML(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
    function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
    function smooth(x) { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); }
    // Frame-rate independent easing: the same feel at 60 Hz and 120 Hz.
    function ease(rate, dt) { return 1 - Math.pow(1 - rate, dt / 16.7); }
    function easeInOutCubic(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

    // True the first time a key is asked for in this browser session.
    function firstTime(key) {
        try {
            if (sessionStorage.getItem(key)) return false;
            sessionStorage.setItem(key, '1');
        } catch (e) { /* storage blocked: treat every visit as the first */ }
        return true;
    }

    // ---------- Data ----------

    var lots = [];          // { item, el, art, shade, cast, tick, h, sat, isArchive }
    var totalWorks = 0;
    var archivePeek = [];   // a few works that are not on display, shown in the archive lot

    // Same ordering as the archive: `date` (YYYY-MM-DD) when present, else the latest year.month in `time`.
    function dateKey(item) {
        var exact = String(item.date || '').match(/^(20\d{2})-(\d{1,2})-(\d{1,2})$/);
        if (exact) return Number(exact[1]) * 10000 + Number(exact[2]) * 100 + Number(exact[3]);
        var latest = 0;
        String(item.time || '').replace(/(20\d{2})(?:[.\-/](\d{1,2}))?/g, function (m, y, mo) {
            latest = Math.max(latest, Number(y) * 100 + Math.min(12, Number(mo) || 1));
            return m;
        });
        return latest * 100;
    }

    function linkFor(item) {
        var links = item.links || {};
        return links.caseStudy || links.demo || links.repo || 'projects.html';
    }

    // A title may wrap after its separator, never before it:
    // "Lot 665 ·" / "歌剧魅影音乐盒", "Sound Vending Machine｜" / "音乐自动贩卖机".
    function titleText(item) {
        return field(item, 'title')
            .replace(/ \u00b7 /g, '\u00a0\u00b7 ')
            .replace(/\s*\uff5c\s*/g, '\u2060\uff5c\u200b');
    }

    function lotNumber(i) {
        return String(i + 1).padStart(2, '0');
    }

    function lotName(i) {
        var entry = lots[i];
        if (!entry) return '';
        return t('home.lot') + ' ' + lotNumber(i) + ' · ' + (entry.isArchive ? t('home.archive.title') : field(entry.item, 'title'));
    }

    function renderLot(entry, i) {
        var el = entry.el;
        if (entry.isArchive) {
            el.innerHTML =
                '<div class="lot-no"><span>' + escapeHTML(t('home.lot')) + ' ' + lotNumber(i) + '</span><span>&rarr;</span></div>' +
                '<div class="archive-stack" aria-hidden="true">' + archivePeek.map(function (p) {
                    return '<img src="' + escapeHTML(p.coverImage) + '" alt="" loading="lazy" decoding="async" width="160" height="120">';
                }).join('') + '</div>' +
                '<div><div class="lot-archive-count">' + totalWorks + '</div>' +
                '<div class="lot-medium">' + escapeHTML(t('home.archive.card')) + '</div></div>' +
                '<span class="lot-shade" aria-hidden="true"></span>' +
                '<span class="lot-sheen" aria-hidden="true"></span>';
        } else {
            var item = entry.item;
            el.innerHTML =
                '<img src="' + escapeHTML(item.coverImage) + '" alt="' + escapeHTML(field(item, 'coverAlt') || field(item, 'title')) + '" decoding="async"' + (i < 4 ? ' fetchpriority="high"' : ' loading="lazy"') + ' width="400" height="300">' +
                '<div class="lot-no"><span>' + escapeHTML(t('home.lot')) + ' ' + lotNumber(i) + '</span><span>' + escapeHTML(item.time) + '</span></div>' +
                '<div class="lot-title">' + escapeHTML(titleText(item)) + '</div>' +
                '<div class="lot-medium">' + escapeHTML(field(item, 'medium')) + '</div>' +
                '<span class="lot-shade" aria-hidden="true"></span>' +
                '<span class="lot-sheen" aria-hidden="true"></span>';
        }
        entry.shade = el.querySelector('.lot-shade');
        entry.art = el.querySelector(entry.isArchive ? '.archive-stack' : 'img');
        entry.sat = -1;
    }

    function buildLots(items) {
        ring.innerHTML = '';
        if (casts) casts.innerHTML = '';
        lots = items.map(function (item) {
            var a = document.createElement('a');
            a.className = 'lot';
            a.href = linkFor(item);
            return { item: item, el: a, isArchive: false };
        });
        var archive = document.createElement('a');
        archive.className = 'lot lot--archive';
        archive.href = 'projects.html';
        lots.push({ item: null, el: archive, isArchive: true });

        lots.forEach(function (entry, i) {
            entry.h = 0;
            renderLot(entry, i);
            if (casts) {
                entry.cast = document.createElement('span');
                entry.cast.className = 'lot-cast';
                casts.appendChild(entry.cast);
            }
            entry.el.addEventListener('click', function (e) { onLotClick(e, i); });
            entry.el.addEventListener('focus', function () {
                if (!reduced && entry.el.matches(':focus-visible')) scrollToLot(i, 'auto');
            });
            ring.appendChild(entry.el);
        });
        buildIndex();
    }

    // ---------- Wall label ----------

    function renderLabel(i) {
        var entry = lots[i];
        if (!entry) return '';
        if (entry.isArchive) {
            return '<div class="label-no">' + escapeHTML(t('home.lot')) + ' ' + lotNumber(i) + '</div>' +
                '<h2>' + escapeHTML(t('home.archive.title')) + '</h2>' +
                '<p>' + escapeHTML(t('home.archive.desc').replace('{n}', totalWorks)) + '</p>' +
                '<a href="projects.html">' + escapeHTML(t('home.archive.cta')) + '</a>';
        }
        var item = entry.item;
        return '<div class="label-no">' + escapeHTML(t('home.lot')) + ' ' + lotNumber(i) + ' &middot; ' + escapeHTML(item.time) + '</div>' +
            '<h2>' + escapeHTML(titleText(item)) + '</h2>' +
            '<p>' + escapeHTML(field(item, 'oneLiner')) + '</p>' +
            '<a href="' + escapeHTML(linkFor(item)) + '">' + escapeHTML(t('home.enter')) + '</a>';
    }

    // Swap the label with a short fade so it reads as a new wall label, not flicker.
    var swapTimer = 0;
    function showLabel(i) {
        label.classList.add('is-swapping');
        window.clearTimeout(swapTimer);
        swapTimer = window.setTimeout(function () {
            label.innerHTML = renderLabel(i);
            label.classList.remove('is-swapping');
        }, 140);
    }

    // ---------- Index: a rolling lot counter and a rail of ticks, one per lot ----------

    var odoColumns = [];

    function buildIndex() {
        if (count) {
            var column = '<span class="odo-digit"><span class="odo-col">' +
                '0123456789'.split('').map(function (d) { return '<span>' + d + '</span>'; }).join('') +
                '</span></span>';
            count.innerHTML = '<span class="odo">' + column + column + '</span><span class="odo-total">&nbsp;/ ' + lotNumber(lots.length - 1) + '</span>';
            odoColumns = Array.prototype.slice.call(count.querySelectorAll('.odo-col'));
        }
        if (rail) {
            rail.innerHTML = lots.map(function (entry, i) {
                return '<button class="rail-tick" type="button" tabindex="-1" data-lot="' + i + '"><span></span></button>';
            }).join('');
            Array.prototype.forEach.call(rail.querySelectorAll('.rail-tick'), function (tick, i) {
                lots[i].tick = tick;
                lots[i].tickLine = tick.firstChild;
            });
        }
    }

    function setCount(i) {
        var n = lotNumber(i);
        odoColumns.forEach(function (col, k) {
            col.style.transform = 'translateY(' + (-Number(n.charAt(k))) + 'em)';
        });
    }

    function updateRail() {
        for (var i = 0; i < lots.length; i++) {
            var line = lots[i].tickLine;
            if (!line) continue;
            var near = Math.max(0, 1 - Math.abs(i - state.walk));
            var key = near.toFixed(3);
            if (line.dataset.near === key) continue;
            line.dataset.near = key;
            line.style.transform = 'scaleY(' + (1 + near * 1.5).toFixed(3) + ')';
            line.style.opacity = (0.4 + 0.6 * near).toFixed(3);
        }
    }

    if (rail) {
        rail.addEventListener('click', function (e) {
            var tick = e.target.closest('.rail-tick');
            if (tick) scrollToLot(Number(tick.getAttribute('data-lot')), 'smooth');
        });
        rail.addEventListener('pointerover', function (e) {
            var tick = e.target.closest('.rail-tick');
            if (!tick || !railTip) return;
            railTip.textContent = lotName(Number(tick.getAttribute('data-lot')));
            railTip.classList.add('is-shown');
        });
        rail.addEventListener('pointerleave', function () {
            if (railTip) railTip.classList.remove('is-shown');
        });
    }

    function relocalize() {
        if (!lots.length) return;
        lots.forEach(renderLot);
        measure();
        if (state.active >= 0) {
            label.innerHTML = renderLabel(state.active);
            lots[state.active].el.classList.add('is-active');
        }
        kick();
    }

    // ---------- Layout ----------

    var geo = { vw: 0, vh: 0, cw: 220, R: 1000, step: 16, top: 0, introLen: 1, perLot: 1, activeY: 0, drop: 0, mobile: false };
    var state = {
        target: 0, walk: 0, introT: 0, intro: 0, active: -1, boot: -1, running: false, last: 0,
        leaving: false, zooming: -1, galleryVisible: true, spotOn: false, irisOpen: 0,
        // The light that casts the shadows: the ceiling lamp, leaning toward the pointer's lantern.
        lightX: 0, lightY: 0, pointerIn: false, px: 0, py: 0,
        // The lit lot leans toward the pointer; its box is kept from the last frame.
        tiltX: 0, tiltY: 0, tiltTX: 0, tiltTY: 0, hover: false, box: null
    };

    function ceilingLight() {
        return { x: geo.vw / 2, y: -geo.vh * 0.3 };
    }

    function measure() {
        var nav = document.querySelector('.top-nav');
        if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');

        var first = !geo.vw;
        geo.vw = window.innerWidth;
        geo.vh = window.innerHeight;
        geo.mobile = geo.vw < 720;
        geo.cw = geo.mobile ? 150 : clamp(geo.vw * 0.16, 180, 240);
        geo.R = geo.mobile ? geo.vw * 1.25 : Math.max(900, geo.vw * 0.78);
        geo.step = geo.mobile ? 21 : 16;
        geo.introLen = geo.vh * 0.6;
        geo.perLot = geo.vh * 0.5;
        geo.activeY = geo.vh * (geo.mobile ? 0.46 : 0.42);
        stage.style.setProperty('--cw', geo.cw + 'px');
        stage.style.setProperty('--active-y', geo.activeY + 'px');
        if (first) {
            var lamp = ceilingLight();
            state.lightX = lamp.x;
            state.lightY = lamp.y;
        }

        if (!reduced && lots.length) {
            gallery.style.height = (geo.vh + geo.introLen + (lots.length - 1) * geo.perLot + geo.vh * 0.25) + 'px';
        }
        lots.forEach(function (entry) {
            entry.h = entry.el.offsetHeight || geo.cw * 1.3;
            if (entry.cast) entry.cast.style.height = entry.h + 'px';
        });
        // Before the walk starts, the lit lot waits low enough to clear the title and its line
        // (layout boxes, so the intro's own drift does not count).
        var introBottom = intro.offsetTop + intro.offsetHeight;
        var firstH = lots.length ? lots[0].h : geo.cw * 1.3;
        geo.drop = Math.max(geo.vh * 0.36, introBottom + 28 - geo.activeY + firstH / 2);
        geo.top = gallery.getBoundingClientRect().top + window.scrollY;
        readScroll();
        if (irisEl && !irisEl.classList.contains('is-done')) {
            irisEl.setAttribute('viewBox', '0 0 ' + geo.vw + ' ' + geo.vh);
            drawIris(state.irisOpen || 0);
        }
        sizeDust();
    }

    function readScroll() {
        var s = window.scrollY - geo.top;
        state.introT = clamp(s / geo.introLen, 0, 1);
        state.target = clamp((s - geo.introLen) / geo.perLot, 0, Math.max(0, lots.length - 1));
    }

    function scrollToLot(i, behavior) {
        var y = geo.top + geo.introLen + i * geo.perLot;
        window.scrollTo({ top: Math.round(y), behavior: behavior || 'smooth' });
    }

    // ---------- The lit lot: hover, tilt and sheen ----------

    function setHover(on) {
        if (on === state.hover) return;
        state.hover = on;
        var entry = lots[state.active];
        if (entry) entry.el.classList.toggle('is-hovered', on);
        label.classList.toggle('is-armed', on);
    }

    // Uses the lot's box from the last frame, so hovering never forces a layout.
    function aim(px, py) {
        var box = state.box;
        var entry = lots[state.active];
        if (!box || !entry || state.leaving || !finePointer) return;
        var u = (px - box.cx) / box.hw, v = (py - box.cy) / box.hh;
        var inside = Math.abs(u) <= 1 && Math.abs(v) <= 1;
        setHover(inside);
        if (!inside) {
            state.tiltTX = state.tiltTY = 0;
            return;
        }
        state.tiltTY = u * 6;
        state.tiltTX = -v * 5;
        entry.el.style.setProperty('--gx', ((u + 1) * 50).toFixed(1) + '%');
        entry.el.style.setProperty('--gy', ((v + 1) * 50).toFixed(1) + '%');
    }

    function setActive(i) {
        var prev = lots[state.active];
        if (prev) {
            prev.el.classList.remove('is-active', 'is-hovered');
            if (prev.tick) prev.tick.classList.remove('is-active');
        }
        state.hover = false;
        label.classList.remove('is-armed');
        state.tiltTX = state.tiltTY = 0;
        state.active = i;
        var entry = lots[i];
        entry.el.classList.add('is-active');
        if (entry.tick) entry.tick.classList.add('is-active');
        showLabel(i);
        setCount(i);
    }

    // ---------- Frame ----------

    function frame(now) {
        var dt = state.last ? Math.min(64, now - state.last) : 16.7;
        state.last = now;
        var k = ease(0.1, dt);
        state.walk += (state.target - state.walk) * k;
        state.intro += (state.introT - state.intro) * k;
        if (Math.abs(state.target - state.walk) < 0.0005) state.walk = state.target;

        var lamp = ceilingLight();
        var lightTX = lamp.x, lightTY = lamp.y;
        if (state.pointerIn) {
            lightTX += (state.px - lightTX) * 0.75;
            lightTY += (state.py - lightTY) * 0.6;
        }
        var kl = ease(0.07, dt);
        state.lightX += (lightTX - state.lightX) * kl;
        state.lightY += (lightTY - state.lightY) * kl;

        var kt = ease(0.14, dt);
        state.tiltX += (state.tiltTX - state.tiltX) * kt;
        state.tiltY += (state.tiltTY - state.tiltY) * kt;

        var w = geo.vw, h = geo.vh, introP = smooth(state.intro);
        var boot = state.boot < 0 ? 0 : clamp((now - state.boot) / 1600, 0, 1);

        intro.style.opacity = String(1 - smooth(state.intro * 1.5));
        intro.style.transform = 'translate3d(0,' + (-state.intro * 42) + 'px,0)';
        var roomIn = String(smooth((state.intro - 0.5) * 2));
        roomTag.style.opacity = roomIn;
        if (index) index.style.opacity = roomIn;
        if (hint) hint.style.opacity = String(1 - smooth(state.walk * 1.5));

        var drop = (1 - introP) * geo.drop;

        for (var i = 0; state.galleryVisible && i < lots.length; i++) {
            if (i === state.zooming) continue;
            var entry = lots[i];
            var th = (i - state.walk) * geo.step;
            var d = Math.abs(th);
            var rad = th * Math.PI / 180;
            var x = w / 2 + geo.R * Math.sin(rad) - geo.cw / 2;
            var y = geo.activeY + geo.R * (1 - Math.cos(rad)) - entry.h / 2 + drop;
            // Lights-on: lots rise from the plinth one after another.
            var rise = easeOutCubic(clamp((now - state.boot - i * 70) / 900, 0, 1));
            if (state.boot < 0) rise = 0;
            y += (1 - rise) * h * 0.45;
            var near = Math.max(0, 1 - d / geo.step);
            var scale = 1 + near * 0.26 * introP;
            var hidden = d > 78;

            var tilt = '';
            if (i === state.active) {
                state.box = { cx: x + geo.cw / 2, cy: y + entry.h / 2, hw: geo.cw * scale / 2, hh: entry.h * scale / 2 };
                if (Math.abs(state.tiltX) > 0.01 || Math.abs(state.tiltY) > 0.01) {
                    tilt = ' perspective(900px) rotateX(' + state.tiltX.toFixed(2) + 'deg) rotateY(' + state.tiltY.toFixed(2) + 'deg)';
                }
            }
            entry.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)' + tilt + ' rotate(' + th.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
            entry.el.style.opacity = hidden ? '0' : String(rise);
            entry.el.style.zIndex = String(100 - Math.round(d));
            if (entry.shade) entry.shade.style.opacity = String(Math.min(0.72, (d / geo.step) * 0.3 + (1 - introP) * 0.18));

            // Colour fades away from the light, as it does for our eyes in a dim room.
            var lit = clamp(1 - d / (geo.step * 2.2), 0, 1);
            var sat = 0.3 + 0.7 * smooth(lit) * (0.35 + 0.65 * boot);
            if (entry.art && Math.abs(sat - entry.sat) > 0.008) {
                entry.sat = sat;
                entry.art.style.filter = 'saturate(' + sat.toFixed(3) + ')';
            }

            // The shadow falls away from the light, and grows as the lot moves away from it.
            if (entry.cast) {
                var vx = x + geo.cw / 2 - state.lightX, vy = y + entry.h / 2 - state.lightY;
                var len = Math.sqrt(vx * vx + vy * vy) || 1;
                var reach = clamp(len / (h * 1.1), 0, 1);
                var off = (6 + 30 * reach) * clamp(len / 220, 0, 1);
                entry.cast.style.transform = 'translate3d(' + (x + vx / len * off).toFixed(1) + 'px,' + (y + vy / len * off).toFixed(1) + 'px,0) rotate(' + th.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
                entry.cast.style.opacity = hidden ? '0' : ((0.82 - 0.3 * reach) * rise).toFixed(3);
            }
        }

        var idx = Math.round(clamp(state.walk, 0, lots.length - 1));
        if (introP > 0.55 && boot > 0.5) {
            if (idx !== state.active) setActive(idx);
            label.classList.add('is-shown');
        } else {
            label.classList.remove('is-shown');
        }
        if (state.pointerIn) aim(state.px, state.py);

        updateRail();

        // When the walk stops on a lot, the spot settles on it (touch scrolling stops less precisely).
        var tolerance = finePointer ? 0.03 : 0.12;
        var onLot = introP > 0.9 && !state.leaving && Math.abs(state.target - state.walk) < 0.02 &&
            Math.abs(state.walk - Math.round(state.walk)) < tolerance;
        if (spot && onLot !== state.spotOn) {
            state.spotOn = onLot;
            spot.classList.toggle('is-on', onLot);
        }

        updateThreshold();

        var settling = Math.abs(state.target - state.walk) > 0.0005 || Math.abs(state.introT - state.intro) > 0.0005 || boot < 1 ||
            Math.abs(lightTX - state.lightX) > 0.5 || Math.abs(lightTY - state.lightY) > 0.5 ||
            Math.abs(state.tiltTX - state.tiltX) > 0.02 || Math.abs(state.tiltTY - state.tiltY) > 0.02;
        if (settling) {
            state.running = true;
            window.requestAnimationFrame(frame);
        } else {
            state.running = false;
            state.last = 0;
        }
    }

    function kick() {
        if (!state.running && !reduced) {
            state.running = true;
            window.requestAnimationFrame(frame);
        }
    }

    // ---------- Threshold and nav ----------

    var quote = threshold ? threshold.querySelector('.threshold-quote') : null;
    function updateThreshold() {
        if (!threshold || !quote) return;
        var r = threshold.getBoundingClientRect();
        // How far through the threshold the visitor is (0 = it fills the screen, 1 = it is leaving).
        // The sky (scripts/sky.js) turns light behind the quote around the middle of the walk,
        // so the ink of the quote turns dark there; the top of the sky turns last.
        var walk = clamp(-r.top / Math.max(1, r.height - (geo.vh || window.innerHeight)), 0, 1);
        // The ink turns once dawn has passed behind the quote: a short timed fade between two
        // readable states, with a little slack so it does not flicker back and forth.
        // While the sky is drawn, scripts/sky.js reads the light behind the quote instead.
        if (threshold.getAttribute('data-sky') !== 'live') {
            var day = threshold.classList.contains('is-day');
            if (!day && walk > 0.6) threshold.classList.add('is-day');
            else if (day && walk < 0.56) threshold.classList.remove('is-day');
        }
        // Keep the nav on dark glass until the light reaches the top of the screen.
        if (!reduced) document.body.classList.toggle('nav-over-hero', walk < 0.86);
    }

    // ---------- Input ----------

    var scrollEndTimer = 0;
    function onScroll() {
        readScroll();
        kick();
        if (reduced) updateThreshold();
        if (!reduced && finePointer) {
            window.clearTimeout(scrollEndTimer);
            scrollEndTimer = window.setTimeout(magnet, 170);
        }
    }

    // On desktop, settle on the nearest lot once scrolling stops.
    function magnet() {
        var s = window.scrollY - geo.top;
        if (s < geo.introLen * 0.85 || state.target >= lots.length - 1 || state.leaving) return;
        var nearest = Math.round(state.target);
        var off = Math.abs(state.target - nearest);
        if (off > 0.04 && off < 0.46) scrollToLot(nearest, 'smooth');
    }

    function onKey(e) {
        if (!state.galleryVisible || window.scrollY > geo.top + gallery.offsetHeight - geo.vh || e.defaultPrevented || e.altKey || e.metaKey || e.ctrlKey) return;
        var tag = (e.target && e.target.tagName) || '';
        if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            var next = clamp(Math.round(state.target) + (e.key === 'ArrowRight' ? 1 : -1), 0, lots.length - 1);
            scrollToLot(next, 'smooth');
        }
    }

    function onLotClick(e, i) {
        if (reduced) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        if (i !== state.active || state.intro < 0.55) {
            scrollToLot(i, 'smooth');
            return;
        }
        enter(i);
    }

    // Opening the lit lot. With cross-document view transitions the room dims and the cover
    // itself flies into the work's page; otherwise the lot grows toward the visitor first.
    function enter(i) {
        if (state.leaving) return;
        var entry = lots[i], el = entry.el;
        state.leaving = true;
        setHover(false);
        state.tiltTX = state.tiltTY = 0;
        if (spot) spot.classList.remove('is-on');
        lots.forEach(function (other) { if (other.art) other.art.style.viewTransitionName = ''; });
        el.classList.add('is-entering');
        if (entry.cast) entry.cast.classList.add('is-entering');
        stage.classList.add('is-leaving');

        if (crossDocTransitions && !entry.isArchive && entry.art) {
            entry.art.style.viewTransitionName = 'lot-cover';
            window.setTimeout(function () { window.location.assign(el.href); }, 320);
            return;
        }

        var box = state.box || { cx: geo.vw / 2, cy: geo.vh / 2, hw: geo.cw / 2 };
        var sx = (geo.vw * 0.62) / (box.hw * 2 || 1);
        var dx = geo.vw / 2 - box.cx;
        var dy = geo.vh / 2 - box.cy;
        var base = el.style.transform.replace(/perspective\([^)]*\) rotateX\([^)]*\) rotateY\([^)]*\) ?/, '');
        state.zooming = i;
        if (entry.cast) entry.cast.style.opacity = '0';
        el.classList.add('is-zooming');
        window.requestAnimationFrame(function () {
            el.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0) ' + base.replace(/rotate\([^)]*\)/, 'rotate(0deg)').replace(/scale\([^)]*\)/, 'scale(' + sx.toFixed(3) + ')');
        });
        window.setTimeout(function () { window.location.assign(el.href); }, 520);
    }

    // Coming back from a work (bfcache): reset the room. The cover keeps its transition
    // name, so the way back flies it home too.
    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) return;
        state.leaving = false;
        state.zooming = -1;
        stage.classList.remove('is-leaving');
        lots.forEach(function (entry) {
            entry.el.classList.remove('is-entering', 'is-zooming');
            if (entry.cast) entry.cast.classList.remove('is-entering');
        });
        state.last = 0;
        kick();
    });

    // Lantern: the light follows the pointer; the lit lot leans toward it.
    var lanternQueued = false;
    stage.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        state.px = e.clientX;
        state.py = e.clientY;
        state.pointerIn = true;
        aim(state.px, state.py);
        kick();
        if (lanternQueued) return;
        lanternQueued = true;
        window.requestAnimationFrame(function () {
            lanternQueued = false;
            stage.style.setProperty('--mx', state.px + 'px');
            stage.style.setProperty('--my', state.py + 'px');
        });
    });
    stage.addEventListener('pointerleave', function (e) {
        if (e.pointerType !== 'mouse') return;
        state.pointerIn = false;
        state.tiltTX = state.tiltTY = 0;
        setHover(false);
        kick();
    });

    // ---------- Specimens: count up once, then a pencil underline ----------

    // Three hand-drawn strokes, so no two neighbours are underlined the same way.
    var PENCIL = [
        'M2 8 C 22 4, 48 10, 70 7 S 108 5, 118 8',
        'M3 7 C 30 10, 55 3, 82 7 S 110 9, 117 5',
        'M2 9 C 26 6, 60 9, 90 6 S 112 7, 118 9'
    ];

    function formatCount(value, template) {
        var decimals = (template.split('.')[1] || '').length;
        var n = decimals ? value.toFixed(decimals) : Math.round(value).toString();
        return Number(template) >= 1000 ? Number(n).toLocaleString('en-US') : n;
    }

    function countUp(el, done) {
        var template = el.getAttribute('data-count');
        var endValue = parseFloat(template);
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        if (!isFinite(endValue) || reduced || endValue <= 1) {
            window.setTimeout(done, reduced ? 0 : 250);
            return;
        }
        var start = performance.now();
        (function tick(now) {
            var p = easeOutCubic(clamp((now - start) / 1300, 0, 1));
            el.textContent = prefix + formatCount(endValue * p, template) + suffix;
            if (p < 1) window.requestAnimationFrame(tick);
            else done();
        })(start);
    }

    function setupSpecimens() {
        var specimens = document.querySelectorAll('.specimen');
        Array.prototype.forEach.call(specimens, function (li, n) {
            var num = li.querySelector('.specimen-number');
            if (!num) return;
            var mark = document.createElement('span');
            mark.className = 'specimen-mark';
            num.parentNode.insertBefore(mark, num);
            mark.appendChild(num);
            mark.insertAdjacentHTML('beforeend', '<svg class="pencil" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path pathLength="1" d="' + PENCIL[n % PENCIL.length] + '"/></svg>');
            if (!reduced && parseFloat(num.getAttribute('data-count')) > 1) {
                num.textContent = (num.getAttribute('data-prefix') || '') + '0' + (num.getAttribute('data-suffix') || '');
            }
        });
        Array.prototype.forEach.call(document.querySelectorAll('.specimen-toggle'), function (button) {
            button.addEventListener('click', function () {
                var li = button.closest('.specimen');
                var open = !li.classList.contains('is-open');
                li.classList.toggle('is-open', open);
                button.setAttribute('aria-expanded', String(open));
            });
        });
        var annotate = function (li) { li.classList.add('is-annotated'); };
        if (!('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(specimens, annotate);
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                io.unobserve(entry.target);
                var li = entry.target;
                var num = li.querySelector('.specimen-number');
                if (num) countUp(num, function () { annotate(li); });
                else annotate(li);
            });
        }, { threshold: 0.6 });
        Array.prototype.forEach.call(specimens, function (li) { io.observe(li); });
    }

    // ---------- The aperture: the gallery opens like an iris ----------

    var IRIS_BLADES = 9;
    var irisShutter = irisEl ? irisEl.querySelector('.iris-shutter') : null;
    var irisBlades = irisEl ? irisEl.querySelector('.iris-blades') : null;

    // open: 0 shut, 1 clear of the screen. The hole is a turning nine-sided polygon, and each
    // blade's edge runs on past its corner, as the leaves of a lens diaphragm do.
    function drawIris(open) {
        if (!irisShutter || !geo.vw) return;
        var w = geo.vw, h = geo.vh, cx = w / 2, cy = h / 2;
        var reach = Math.sqrt(w * w + h * h) * 0.62;
        var r = Math.max(0.5, open * reach);
        var turn = 0.35 + (1 - open) * 1.15;
        var step = Math.PI * 2 / IRIS_BLADES;
        var hole = '', blades = '';
        for (var i = 0; i < IRIS_BLADES; i++) {
            var a = turn + i * step;
            var x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
            var dx = x - (cx + r * Math.cos(a + step)), dy = y - (cy + r * Math.sin(a + step));
            var len = Math.sqrt(dx * dx + dy * dy) || 1;
            hole += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
            blades += 'M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'L' + (x + dx / len * reach * 2).toFixed(1) + ' ' + (y + dy / len * reach * 2).toFixed(1);
        }
        irisShutter.setAttribute('d', 'M0 0H' + w + 'V' + h + 'H0Z' + hole + 'Z');
        irisBlades.setAttribute('d', blades);
        irisBlades.style.opacity = String(1 - open);
    }

    function openIris(duration, onHalfway) {
        if (!irisEl || !irisEl.classList.contains('is-armed') || irisEl.classList.contains('is-done')) {
            onHalfway();
            return;
        }
        var start = performance.now(), half = false;
        drawIris(0);
        irisEl.classList.add('is-drawn');
        (function step(now) {
            var p = clamp((now - start) / duration, 0, 1);
            state.irisOpen = easeInOutCubic(p);
            drawIris(state.irisOpen);
            if (!half && p > 0.4) {
                half = true;
                onHalfway();
            }
            if (p < 1) window.requestAnimationFrame(step);
            else irisEl.classList.add('is-done');
        })(start);
    }

    function dropIris() {
        if (irisEl) irisEl.classList.add('is-done');
    }

    // ---------- Dust drifting in the beam ----------

    var dustCtx = dust && dust.getContext ? dust.getContext('2d') : null;
    var motes = [], dustRunning = false, dustLast = 0;

    function beamWidth() { return Math.min(1100, geo.vw * 0.92); }

    function newMote(anywhere) {
        return {
            x: anywhere ? Math.random() * geo.vw : geo.vw / 2 + (Math.random() - 0.5) * beamWidth() * 0.5,
            y: anywhere ? Math.random() * geo.vh : -6,
            vx: (Math.random() - 0.5) * 7,
            vy: 2 + Math.random() * 7,
            r: 0.5 + Math.random() * 1.3,
            phase: Math.random() * 6.283,
            rate: 0.4 + Math.random() * 1.2
        };
    }

    function sizeDust() {
        if (!dustCtx || reduced) return;
        var ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        dust.width = Math.round(geo.vw * ratio);
        dust.height = Math.round(geo.vh * ratio);
        dustCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
        dustCtx.fillStyle = '#fff0d8';
        var n = geo.mobile ? 36 : 72;
        while (motes.length < n) motes.push(newMote(true));
        motes.length = n;
    }

    // How much of the ceiling beam reaches a point (the same trapezoid as .gallery-beam's clip-path)
    function beamAt(x, y) {
        var bottom = geo.activeY + geo.cw * 0.9;
        if (y < 0 || y > bottom) return 0;
        var t = y / bottom;
        var half = beamWidth() * (0.05 + 0.23 * t);
        var off = Math.abs(x - geo.vw / 2);
        return (1 - smooth((off - half * 0.7) / (half * 0.6))) * (1 - 0.5 * t);
    }

    function dustFrame(now) {
        if (!dustRunning) return;
        var dt = dustLast ? Math.min(50, now - dustLast) / 1000 : 0.016;
        dustLast = now;
        var w = geo.vw, h = geo.vh;
        var lanternReach = Math.min(w, h) * 0.2;
        dustCtx.clearRect(0, 0, w, h);
        for (var i = 0; i < motes.length; i++) {
            var m = motes[i];
            m.x += m.vx * dt + Math.sin(now * 0.0004 + m.phase) * 0.06;
            m.y += m.vy * dt;
            if (m.y > h + 6 || m.x < -6 || m.x > w + 6) {
                motes[i] = newMote(false);
                continue;
            }
            var light = beamAt(m.x, m.y);
            if (state.pointerIn) {
                var dx = m.x - state.px, dy = m.y - state.py;
                light = Math.max(light, 1 - Math.sqrt(dx * dx + dy * dy) / lanternReach);
            }
            if (light <= 0.02) continue;
            dustCtx.globalAlpha = Math.min(1, light * (0.55 + 0.45 * Math.sin(now * 0.001 * m.rate + m.phase)) * 0.9);
            dustCtx.beginPath();
            dustCtx.arc(m.x, m.y, m.r, 0, 6.283);
            dustCtx.fill();
        }
        window.requestAnimationFrame(dustFrame);
    }

    function startDust() {
        if (!dustCtx || reduced || dustRunning || !stage.classList.contains('lights-on')) return;
        dustRunning = true;
        dustLast = 0;
        window.requestAnimationFrame(dustFrame);
    }

    function stopDust() {
        dustRunning = false;
    }

    // ---------- Boot ----------

    function lightsOn() {
        if (stage.classList.contains('lights-on')) return;
        stage.classList.add('lights-on');
        // The first visit in a session gets the slow aperture, later ones a quick one;
        // the lots rise once it is partly open.
        openIris(firstTime('izIrisOpened') ? 1700 : 750, function () {
            state.boot = performance.now();
            kick();
        });
        startDust();
    }

    function waitForCovers(timeout) {
        var imgs = Array.prototype.slice.call(ring.querySelectorAll('img'), 0, 3);
        var done = false;
        var finish = function () { if (!done) { done = true; lightsOn(); } };
        window.setTimeout(finish, timeout);
        // The title's face too, so the aperture never opens on a fallback font.
        var face = document.fonts && document.fonts.load ? Promise.all([
            document.fonts.load('italic 300 100px "Cormorant Garamond"'),
            document.fonts.load('italic 400 24px "Cormorant Garamond"')
        ]).catch(function () {}) : Promise.resolve();
        Promise.all(imgs.map(function (img) {
            return img.decode ? img.decode().catch(function () {}) : Promise.resolve();
        }).concat([face])).then(finish);
    }

    function showClosed() {
        loader.innerHTML = '<span class="iz-loader-text">' + escapeHTML(t('home.closed')) + ' <a href="projects.html" style="color:inherit">' + escapeHTML(t('home.closed.link')) + ' &rarr;</a></span>';
        loader.style.pointerEvents = 'auto';
        dropIris();
        stage.classList.add('lights-on');
        loader.style.opacity = '1';
    }

    function init(items) {
        buildLots(items);
        if (reduced) {
            dropIris();
            gallery.classList.add('is-reduced');
            stage.classList.add('lights-on');
            document.body.classList.remove('nav-over-hero');
            measure();
            return;
        }
        measure();
        waitForCovers(1400);
        kick();
    }

    var visibilityIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.target === gallery) state.galleryVisible = entry.isIntersecting;
        });
        if (state.galleryVisible) startDust();
        else stopDust();
        kick();
    }, { rootMargin: '0px 0px 30% 0px' }) : null;

    fetch('content/projects-data.json')
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (data) {
            var projects = Array.isArray(data.projects) ? data.projects : [];
            totalWorks = projects.length;
            var byDate = function (a, b) { return dateKey(b) - dateKey(a); };
            var exhibits = projects.filter(function (p) { return p.exhibit && p.coverImage; }).sort(byDate);
            archivePeek = projects.filter(function (p) { return !p.exhibit && p.coverImage; }).sort(byDate).slice(0, 3);
            init(exhibits);
        })
        .catch(function (err) {
            console.error('home.js: could not load the gallery', err);
            showClosed();
        });

    if (visibilityIO) visibilityIO.observe(gallery);
    window.addEventListener('scroll', onScroll, { passive: true });
    var resizeTimer = 0;
    window.addEventListener('resize', function () {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function () { measure(); kick(); }, 120);
    });
    document.addEventListener('keydown', onKey);
    document.addEventListener('site-components:ready', function () { measure(); kick(); });
    window.addEventListener('langChanged', relocalize);
    window.addEventListener('i18nContentLoaded', relocalize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); kick(); });
    document.body.classList.add('nav-over-hero');
    setupSpecimens();

    var askIrisy = document.getElementById('askIrisy');
    if (askIrisy) {
        askIrisy.addEventListener('click', function () {
            var bubble = document.getElementById('alterBubble');
            if (bubble) bubble.click();
        });
    }

    if (reducedQuery && typeof reducedQuery.addEventListener === 'function') {
        reducedQuery.addEventListener('change', function () { window.location.reload(); });
    }
})();
