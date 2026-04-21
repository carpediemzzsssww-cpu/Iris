// ================================================
// Shared Components: Nav + Footer
// Loads config from content/config.json
// ================================================

(function () {
    "use strict";

    var siteConfig = null;

    // SVG icon templates
    var icons = {
        email: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
        github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
        linkedin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
        moon: '<svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
        sun: '<svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="7" y2="7"/><line x1="17" y1="17" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="7" y2="17"/><line x1="17" y1="7" x2="19.1" y2="4.9"/></svg>'
    };

    // Detect current page for active nav highlighting
    function getCurrentPage() {
        var path = window.location.pathname;
        var page = path.split('/').pop() || 'index.html';
        if (page === '' || page === 'Iris' || page === 'Iris/') page = 'index.html';
        return page;
    }

    function isActive(href) {
        return getCurrentPage() === href ? ' active' : '';
    }

    // ---- Nav Component ----

    function renderNav(config) {
        var c = config.site;
        return '<div class="container">' +
            '<div class="nav-brand"><span class="brand-mark">IZ</span></div>' +
            '<div class="nav-links">' +
                '<a href="index.html" class="nav-link' + isActive('index.html') + '" data-i18n="nav.home">Home</a>' +
                '<a href="projects.html" class="nav-link' + isActive('projects.html') + '" data-i18n="nav.projects">Projects</a>' +
                '<a href="learning.html" class="nav-link' + isActive('learning.html') + '" data-i18n="nav.learning">Learning</a>' +
                '<a href="ai-lab.html" class="nav-link' + isActive('ai-lab.html') + '" data-i18n="nav.ailab">AI Lab</a>' +
                '<a href="travel.html" class="nav-link' + isActive('travel.html') + '" data-i18n="nav.footprints">Footprints</a>' +
                '<a href="about.html" class="nav-link' + isActive('about.html') + '" data-i18n="nav.about">About</a>' +
            '</div>' +
            '<div class="nav-actions">' +
                '<a href="mailto:' + c.email + '" class="nav-action" title="Email" aria-label="Send email">' + icons.email + '</a>' +
                '<a href="' + c.github + '" class="nav-action" title="GitHub" aria-label="Open GitHub profile" target="_blank" rel="noopener noreferrer">' + icons.github + '</a>' +
                '<a href="' + c.linkedin + '" class="nav-action" title="LinkedIn" aria-label="Open LinkedIn profile" target="_blank" rel="noopener noreferrer">' + icons.linkedin + '</a>' +
                '<button class="nav-action lang-toggle" type="button" data-lang-toggle aria-label="Switch to Chinese"><span class="lang-label">EN</span></button>' +
                '<button class="nav-action theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark mode" title="Switch to dark mode">' + icons.moon + icons.sun + '</button>' +
            '</div>' +
            '<button class="mobile-menu-toggle" id="mobileMenuToggle" type="button" aria-label="Open mobile menu" aria-controls="mobileDrawer" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '</div>';
    }

    function renderMobileDrawer() {
        return '<div class="mobile-drawer-links">' +
            '<a href="index.html" class="mobile-link' + isActive('index.html') + '" data-i18n="nav.home">Home</a>' +
            '<a href="projects.html" class="mobile-link' + isActive('projects.html') + '" data-i18n="nav.projects">Projects</a>' +
            '<a href="learning.html" class="mobile-link' + isActive('learning.html') + '" data-i18n="nav.learning">Learning</a>' +
            '<a href="ai-lab.html" class="mobile-link' + isActive('ai-lab.html') + '" data-i18n="nav.ailab">AI Lab</a>' +
            '<a href="travel.html" class="mobile-link' + isActive('travel.html') + '" data-i18n="nav.footprints">Footprints</a>' +
            '<a href="about.html" class="mobile-link' + isActive('about.html') + '" data-i18n="nav.about">About</a>' +
            '<button class="mobile-lang-toggle" type="button" data-lang-toggle><span data-lang-toggle-text>Switch to Chinese</span></button>' +
            '<button class="mobile-theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark mode"><span data-theme-toggle-text>Switch to dark mode</span></button>' +
        '</div>';
    }

    // ---- Footer Component ----

    function renderFooter(config) {
        var c = config.site;
        var page = getCurrentPage();
        var linksHtml;

        if (page === 'resume.html') {
            // Resume page has resume download links instead of GitHub
            linksHtml =
                '<a href="mailto:' + c.email + '" class="footer-link" data-i18n="footer.contact">Contact</a>' +
                '<a href="' + c.resumeEn + '" class="footer-link" target="_blank" rel="noopener noreferrer" data-i18n="footer.resumeEn">Resume EN</a>' +
                '<a href="' + c.resumeCn + '" class="footer-link" target="_blank" rel="noopener noreferrer" data-i18n="footer.resumeCn">Resume CN</a>';
        } else {
            linksHtml =
                '<a href="mailto:' + c.email + '" class="footer-link" data-i18n="footer.contact">Contact</a>' +
                '<a href="' + c.github + '" class="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>';
        }

        return '<div class="container"><div class="footer-content">' +
            '<p class="footer-text" data-i18n="footer.copyright">&copy; ' + c.copyright + ' Iris Zhou. Designed &amp; built with intention.</p>' +
            '<div class="footer-links">' + linksHtml + '</div>' +
            '</div></div>';
    }

    // ---- Contact Section (index.html only) ----

    function renderContactLinks(config) {
        var c = config.site;
        var el = document.getElementById('contact-links');
        if (!el) return;
        el.innerHTML =
            '<a href="mailto:' + c.email + '" class="contact-link">' + icons.email + ' ' + c.email + '</a>' +
            '<a href="' + c.linkedin + '" class="contact-link" target="_blank" rel="noopener noreferrer">' + icons.linkedin + ' LinkedIn</a>' +
            '<a href="' + c.github + '" class="contact-link" target="_blank" rel="noopener noreferrer">' + icons.github + ' GitHub</a>';
    }

    // ---- Boot ----

    function init(config) {
        siteConfig = config;

        var navEl = document.getElementById('site-nav');
        if (navEl) {
            navEl.className = 'top-nav';
            navEl.innerHTML = renderNav(config);
        }

        var drawerEl = document.getElementById('site-mobile-drawer');
        if (drawerEl) {
            drawerEl.className = 'mobile-drawer';
            drawerEl.setAttribute('aria-hidden', 'true');
            drawerEl.innerHTML = renderMobileDrawer();
        }

        var footerEl = document.getElementById('site-footer');
        if (footerEl) {
            footerEl.className = 'footer';
            footerEl.innerHTML = renderFooter(config);
        }

        renderContactLinks(config);

        // Re-apply i18n translations to dynamically injected elements
        if (window.i18n && window.i18n.applyTranslations) {
            window.i18n.applyTranslations();
        }
    }

    // Load config and initialize
    fetch('content/config.json')
        .then(function (r) { return r.json(); })
        .then(init)
        .catch(function (err) { console.error('components.js: Failed to load config', err); });

    // Expose for external use
    window.siteComponents = { getConfig: function () { return siteConfig; } };
})();
