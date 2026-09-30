// ================================================
// Home: A museum of small worlds
// - № 01 gallery: works marked `exhibit: true` in content/projects/*.md stand on an arc;
//   scrolling turns the arc, one lot at a time. The last lot opens the archive.
// - Threshold: the lights come up and the quote shifts from night to paper.
// - № 02 specimens count up once, when they come into view.
// Motion follows the scroll with frame-rate independent easing; with
// prefers-reduced-motion the gallery becomes a still grid.
// ================================================

(function () {
    'use strict';

    var gallery = document.getElementById('gallery');
    if (!gallery) return;

    var stage = document.getElementById('galleryStage');
    var ring = document.getElementById('galleryRing');
    var intro = document.getElementById('galleryIntro');
    var roomTag = document.getElementById('galleryRoom');
    var label = document.getElementById('galleryLabel');
    var count = document.getElementById('galleryCount');
    var loader = document.getElementById('galleryLoader');
    var hint = stage.querySelector('.gallery-hint');
    var threshold = document.getElementById('threshold');

    var reducedQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var reduced = !!(reducedQuery && reducedQuery.matches);
    var finePointer = !!(window.matchMedia && window.matchMedia('(pointer: fine)').matches);

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

    // ---------- Data ----------

    var lots = [];          // { item, el, shade, h, isArchive }
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
                '<span class="lot-shade" aria-hidden="true"></span>';
        } else {
            var item = entry.item;
            el.innerHTML =
                '<img src="' + escapeHTML(item.coverImage) + '" alt="' + escapeHTML(field(item, 'coverAlt') || field(item, 'title')) + '" decoding="async"' + (i < 4 ? ' fetchpriority="high"' : ' loading="lazy"') + ' width="400" height="300">' +
                '<div class="lot-no"><span>' + escapeHTML(t('home.lot')) + ' ' + lotNumber(i) + '</span><span>' + escapeHTML(item.time) + '</span></div>' +
                '<div class="lot-title">' + escapeHTML(titleText(item)) + '</div>' +
                '<div class="lot-medium">' + escapeHTML(field(item, 'medium')) + '</div>' +
                '<span class="lot-shade" aria-hidden="true"></span>';
        }
        entry.shade = el.querySelector('.lot-shade');
    }

    function buildLots(items) {
        ring.innerHTML = '';
        lots = items.map(function (item) {
            var a = document.createElement('a');
            a.className = 'lot';
            a.href = linkFor(item);
            return { item: item, el: a, shade: null, h: 0, isArchive: false };
        });
        var archive = document.createElement('a');
        archive.className = 'lot lot--archive';
        archive.href = 'projects.html';
        lots.push({ item: null, el: archive, shade: null, h: 0, isArchive: true });

        lots.forEach(function (entry, i) {
            renderLot(entry, i);
            entry.el.addEventListener('click', function (e) { onLotClick(e, i); });
            entry.el.addEventListener('focus', function () {
                if (!reduced && entry.el.matches(':focus-visible')) scrollToLot(i, 'auto');
            });
            ring.appendChild(entry.el);
        });
    }

    function renderLabel(i) {
        var entry = lots[i];
        if (!entry) return;
        var html;
        if (entry.isArchive) {
            html = '<div class="label-no">' + escapeHTML(t('home.lot')) + ' ' + lotNumber(i) + '</div>' +
                '<h2>' + escapeHTML(t('home.archive.title')) + '</h2>' +
                '<p>' + escapeHTML(t('home.archive.desc').replace('{n}', totalWorks)) + '</p>' +
                '<a href="projects.html">' + escapeHTML(t('home.archive.cta')) + '</a>';
        } else {
            var item = entry.item;
            html = '<div class="label-no">' + escapeHTML(t('home.lot')) + ' ' + lotNumber(i) + ' &middot; ' + escapeHTML(item.time) + '</div>' +
                '<h2>' + escapeHTML(titleText(item)) + '</h2>' +
                '<p>' + escapeHTML(field(item, 'oneLiner')) + '</p>' +
                '<a href="' + escapeHTML(linkFor(item)) + '">' + escapeHTML(t('home.enter')) + '</a>';
        }
        count.textContent = lotNumber(i) + ' / ' + lotNumber(lots.length - 1);
        return html;
    }

    // Swap the label with a short fade so it reads as a new wall label, not flicker.
    var swapTimer = 0;
    function showLabel(i) {
        label.classList.add('is-swapping');
        window.clearTimeout(swapTimer);
        swapTimer = window.setTimeout(function () {
            label.innerHTML = renderLabel(i) || '';
            label.classList.remove('is-swapping');
        }, 140);
    }

    function relocalize() {
        if (!lots.length) return;
        lots.forEach(renderLot);
        measure();
        if (state.active >= 0) label.innerHTML = renderLabel(state.active) || '';
    }

    // ---------- Layout ----------

    var geo = { vw: 0, vh: 0, cw: 220, R: 1000, step: 16, top: 0, introLen: 1, perLot: 1, mobile: false };
    var state = { target: 0, walk: 0, introT: 0, intro: 0, active: -1, boot: -1, running: false, last: 0, leaving: false, galleryVisible: true };

    function measure() {
        var nav = document.querySelector('.top-nav');
        if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');

        geo.vw = window.innerWidth;
        geo.vh = window.innerHeight;
        geo.mobile = geo.vw < 720;
        geo.cw = geo.mobile ? 150 : clamp(geo.vw * 0.16, 180, 240);
        geo.R = geo.mobile ? geo.vw * 1.25 : Math.max(900, geo.vw * 0.78);
        geo.step = geo.mobile ? 21 : 16;
        geo.introLen = geo.vh * 0.6;
        geo.perLot = geo.vh * 0.5;
        stage.style.setProperty('--cw', geo.cw + 'px');

        if (!reduced && lots.length) {
            gallery.style.height = (geo.vh + geo.introLen + (lots.length - 1) * geo.perLot + geo.vh * 0.25) + 'px';
        }
        lots.forEach(function (entry) { entry.h = entry.el.offsetHeight || geo.cw * 1.3; });
        geo.top = gallery.getBoundingClientRect().top + window.scrollY;
        readScroll();
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

    // ---------- Frame ----------

    function frame(now) {
        var dt = state.last ? Math.min(64, now - state.last) : 16.7;
        state.last = now;
        // Frame-rate independent easing: the same feel at 60 Hz and 120 Hz.
        var k = 1 - Math.pow(1 - 0.1, dt / 16.7);
        state.walk += (state.target - state.walk) * k;
        state.intro += (state.introT - state.intro) * k;
        if (Math.abs(state.target - state.walk) < 0.0005) state.walk = state.target;

        var w = geo.vw, h = geo.vh, introP = smooth(state.intro);
        var boot = state.boot < 0 ? 0 : clamp((now - state.boot) / 1600, 0, 1);

        intro.style.opacity = String(1 - smooth(state.intro * 1.5));
        intro.style.transform = 'translate3d(0,' + (-state.intro * 42) + 'px,0)';
        roomTag.style.opacity = String(smooth((state.intro - 0.5) * 2));
        if (hint) hint.style.opacity = String(1 - smooth(state.walk * 1.5));

        var activeY = h * (geo.mobile ? 0.46 : 0.42);
        var drop = (1 - introP) * h * 0.36;

        for (var i = 0; state.galleryVisible && i < lots.length; i++) {
            var entry = lots[i];
            var th = (i - state.walk) * geo.step;
            var d = Math.abs(th);
            var rad = th * Math.PI / 180;
            var x = w / 2 + geo.R * Math.sin(rad) - geo.cw / 2;
            var y = activeY + geo.R * (1 - Math.cos(rad)) - entry.h / 2 + drop;
            // Lights-on: lots rise from the plinth one after another.
            var rise = easeOutCubic(clamp((now - state.boot - i * 70) / 900, 0, 1));
            if (state.boot < 0) rise = 0;
            y += (1 - rise) * h * 0.45;
            var near = Math.max(0, 1 - d / geo.step);
            var scale = 1 + near * 0.26 * introP;
            entry.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + th.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
            entry.el.style.opacity = d > 78 ? '0' : String(rise);
            entry.el.style.zIndex = String(100 - Math.round(d));
            if (entry.shade) entry.shade.style.opacity = String(Math.min(0.72, (d / geo.step) * 0.3 + (1 - introP) * 0.18));
        }

        var idx = Math.round(clamp(state.walk, 0, lots.length - 1));
        if (introP > 0.55 && boot > 0.5) {
            if (idx !== state.active) {
                state.active = idx;
                showLabel(idx);
            }
            label.classList.add('is-shown');
        } else {
            label.classList.remove('is-shown');
        }

        updateThreshold();

        var settling = Math.abs(state.target - state.walk) > 0.0005 || Math.abs(state.introT - state.intro) > 0.0005 || boot < 1;
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
        var q = quote.getBoundingClientRect();
        // Where the quote sits in the gradient behind it (0 = night, 1 = paper): ink follows the light.
        var behind = (q.top + q.height / 2 - r.top) / r.height;
        threshold.style.setProperty('--lift', smooth((behind - 0.46) / 0.16).toFixed(3));
        // Keep the nav on dark glass until the light reaches the top of the screen.
        document.body.classList.toggle('nav-over-hero', -r.top / r.height < 0.52);
    }

    // ---------- Input ----------

    var scrollEndTimer = 0;
    function onScroll() {
        readScroll();
        kick();
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
        enter(lots[i].el);
    }

    // The lit lot grows toward the visitor while the room dims, then the work opens.
    function enter(el) {
        if (state.leaving) return;
        state.leaving = true;
        var r = el.getBoundingClientRect();
        var sx = (geo.vw * 0.62) / r.width;
        var dx = geo.vw / 2 - (r.left + r.width / 2);
        var dy = geo.vh / 2 - (r.top + r.height / 2);
        el.classList.add('is-entering');
        stage.classList.add('is-leaving');
        var base = el.style.transform;
        window.requestAnimationFrame(function () {
            el.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0) ' + base.replace(/rotate\([^)]*\)/, 'rotate(0deg)').replace(/scale\([^)]*\)/, 'scale(' + sx.toFixed(3) + ')');
        });
        window.setTimeout(function () { window.location.assign(el.href); }, 520);
    }

    // Coming back from a work (bfcache): reset the room.
    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) return;
        state.leaving = false;
        stage.classList.remove('is-leaving');
        lots.forEach(function (entry) { entry.el.classList.remove('is-entering'); });
        state.last = 0;
        kick();
    });

    // Lantern: the light follows the pointer.
    var lanternQueued = false, lx = 0, ly = 0;
    stage.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        lx = e.clientX; ly = e.clientY;
        if (lanternQueued) return;
        lanternQueued = true;
        window.requestAnimationFrame(function () {
            lanternQueued = false;
            stage.style.setProperty('--mx', lx + 'px');
            stage.style.setProperty('--my', ly + 'px');
        });
    });

    // ---------- Specimens count up ----------

    function formatCount(value, template) {
        var decimals = (template.split('.')[1] || '').length;
        var n = decimals ? value.toFixed(decimals) : Math.round(value).toString();
        return Number(template) >= 1000 ? Number(n).toLocaleString('en-US') : n;
    }

    function countUp(el) {
        var template = el.getAttribute('data-count');
        var endValue = parseFloat(template);
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        if (!isFinite(endValue) || reduced || endValue <= 1) return;
        var start = performance.now();
        (function tick(now) {
            var p = easeOutCubic(clamp((now - start) / 1300, 0, 1));
            el.textContent = prefix + formatCount(endValue * p, template) + suffix;
            if (p < 1) window.requestAnimationFrame(tick);
        })(start);
    }

    function setupSpecimens() {
        var numbers = document.querySelectorAll('.specimen-number[data-count]');
        if (!numbers.length || !('IntersectionObserver' in window)) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                io.unobserve(entry.target);
                countUp(entry.target);
            });
        }, { threshold: 0.6 });
        numbers.forEach(function (el) {
            if (!reduced && parseFloat(el.getAttribute('data-count')) > 1) {
                el.textContent = (el.getAttribute('data-prefix') || '') + '0' + (el.getAttribute('data-suffix') || '');
            }
            io.observe(el);
        });
    }

    // ---------- Boot ----------

    function lightsOn() {
        if (stage.classList.contains('lights-on')) return;
        stage.classList.add('lights-on');
        state.boot = performance.now();
        kick();
    }

    function waitForCovers(timeout) {
        var imgs = Array.prototype.slice.call(ring.querySelectorAll('img'), 0, 3);
        var done = false;
        var finish = function () { if (!done) { done = true; lightsOn(); } };
        window.setTimeout(finish, timeout);
        Promise.all(imgs.map(function (img) {
            return img.decode ? img.decode().catch(function () {}) : Promise.resolve();
        })).then(finish);
    }

    function showClosed() {
        loader.innerHTML = '<span class="iz-loader-text">' + escapeHTML(t('home.closed')) + ' <a href="projects.html" style="color:inherit">' + escapeHTML(t('home.closed.link')) + ' &rarr;</a></span>';
        loader.style.pointerEvents = 'auto';
        stage.classList.add('lights-on');
        loader.style.opacity = '1';
    }

    function init(items) {
        buildLots(items);
        if (reduced) {
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
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); });
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
