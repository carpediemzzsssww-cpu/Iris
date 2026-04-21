// ================================================
// i18n Engine - Bilingual Support (EN/ZH)
// Loads translations from JSON content files
// ================================================

(function () {
    "use strict";

    // ---- Translation registries ----
    var commonTranslations = {};
    var pageTranslations = {};

    // ---- State ----
    var currentLang = "en";
    var contentLoaded = false;

    // ---- Core API ----

    function getLang() {
        return currentLang;
    }

    function t(key) {
        var entry = pageTranslations[key] || commonTranslations[key];
        if (!entry) return null;
        return entry[currentLang] || entry.en || null;
    }

    function registerTranslations(dict) {
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                pageTranslations[key] = dict[key];
            }
        }
    }

    function applyTranslations() {
        // Text content
        var elements = document.querySelectorAll("[data-i18n]");
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var key = el.getAttribute("data-i18n");
            var val = t(key);
            if (val !== null) {
                el.textContent = val;
            }
        }

        // HTML content
        var htmlElements = document.querySelectorAll("[data-i18n-html]");
        for (var j = 0; j < htmlElements.length; j++) {
            var hel = htmlElements[j];
            var hkey = hel.getAttribute("data-i18n-html");
            var hval = t(hkey);
            if (hval !== null) {
                hel.innerHTML = hval;
            }
        }

        // Placeholders
        var phElements = document.querySelectorAll("[data-i18n-placeholder]");
        for (var k = 0; k < phElements.length; k++) {
            var pel = phElements[k];
            var pkey = pel.getAttribute("data-i18n-placeholder");
            var pval = t(pkey);
            if (pval !== null) {
                pel.setAttribute("placeholder", pval);
            }
        }

        // Aria-labels
        var ariaElements = document.querySelectorAll("[data-i18n-aria]");
        for (var m = 0; m < ariaElements.length; m++) {
            var ael = ariaElements[m];
            var akey = ael.getAttribute("data-i18n-aria");
            var aval = t(akey);
            if (aval !== null) {
                ael.setAttribute("aria-label", aval);
            }
        }

        // Title attributes
        var titleElements = document.querySelectorAll("[data-i18n-title]");
        for (var n = 0; n < titleElements.length; n++) {
            var tel = titleElements[n];
            var tkey = tel.getAttribute("data-i18n-title");
            var tval = t(tkey);
            if (tval !== null) {
                tel.setAttribute("title", tval);
            }
        }
    }

    function updateToggleButtons() {
        var toggles = document.querySelectorAll("[data-lang-toggle]");
        for (var i = 0; i < toggles.length; i++) {
            var btn = toggles[i];
            var label = btn.querySelector(".lang-label");
            if (label) {
                label.textContent = currentLang === "en" ? "EN" : "\u4e2d\u6587";
            }
            var mobileText = btn.querySelector("[data-lang-toggle-text]");
            if (mobileText) {
                mobileText.textContent = currentLang === "en" ? "Switch to Chinese" : "Switch to English";
            }
        }
    }

    function setLang(lang) {
        if (lang !== "en" && lang !== "zh") return;
        currentLang = lang;
        try {
            localStorage.setItem("langPreference", lang);
        } catch (e) {}
        document.documentElement.setAttribute("data-lang", lang);
        document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
        applyTranslations();
        updateToggleButtons();
        window.dispatchEvent(new CustomEvent("langChanged", { detail: { lang: lang } }));
    }

    function initLang() {
        var stored = "en";
        try {
            stored = localStorage.getItem("langPreference") || "en";
        } catch (e) {}
        currentLang = stored === "zh" ? "zh" : "en";
        document.documentElement.setAttribute("data-lang", currentLang);
        document.documentElement.setAttribute("lang", currentLang === "zh" ? "zh-CN" : "en");
    }

    // ---- JSON content loading ----

    function resolveContentPath(filename) {
        // Detect if we're in a subdirectory (e.g. case-studies/xxx/)
        var depth = 0;
        var path = window.location.pathname;
        // Count directory segments after the base
        var segments = path.split('/').filter(function(s) { return s.length > 0; });
        // Remove the filename segment
        segments.pop();
        // Find how deep we are relative to the root
        // For GitHub Pages, the root might have the repo name
        // Simple heuristic: look for 'content' folder relative to current page
        var prefix = '';
        for (var i = 0; i < segments.length; i++) {
            prefix += '../';
        }
        // If we're at root, no prefix needed
        if (prefix === '') prefix = './';
        return prefix + 'content/' + filename;
    }

    function loadJSON(url) {
        return fetch(url).then(function(response) {
            if (!response.ok) throw new Error('Failed to load ' + url);
            return response.json();
        });
    }

    function loadContent(pageJsonFiles) {
        // pageJsonFiles: array of filenames like ['index.json']
        // Always load common.json + specified page files
        var files = ['common.json'].concat(pageJsonFiles || []);
        var promises = files.map(function(f) {
            return loadJSON(resolveContentPath(f)).catch(function(err) {
                console.warn('i18n: Could not load ' + f, err);
                return null;
            });
        });

        return Promise.all(promises).then(function(results) {
            results.forEach(function(data) {
                if (!data) return;
                // Support both flat format and { translations: {...} } format
                var translations = data.translations || data;
                registerTranslations(translations);
            });
            contentLoaded = true;
            applyTranslations();
            updateToggleButtons();
            window.dispatchEvent(new CustomEvent("i18nContentLoaded"));
        });
    }

    // ---- Toggle handler ----

    function setupToggleListeners() {
        document.addEventListener("click", function (e) {
            var btn = e.target.closest("[data-lang-toggle]");
            if (!btn) return;
            e.preventDefault();
            setLang(currentLang === "en" ? "zh" : "en");
        });
    }

    // ---- Boot sequence ----

    initLang();

    function onReady() {
        applyTranslations();
        updateToggleButtons();
        setupToggleListeners();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", onReady);
    } else {
        onReady();
    }

    // ---- Public API ----
    window.i18n = {
        getLang: getLang,
        setLang: setLang,
        t: t,
        registerTranslations: registerTranslations,
        applyTranslations: applyTranslations,
        loadContent: loadContent
    };
})();
