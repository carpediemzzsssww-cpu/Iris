(function () {
    'use strict';
    function setLanguage(language, persist) {
        const lang = language === 'zh' ? 'zh' : 'en';
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        document.documentElement.dataset.lang = lang;
        document.querySelectorAll('[data-story-language]').forEach(section => {
            section.hidden = section.dataset.storyLanguage !== lang;
        });
        document.querySelectorAll('[data-story-lang]').forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.storyLang === lang));
        });
        document.querySelectorAll('[data-en][data-zh]').forEach(element => {
            element.textContent = element.dataset[lang];
        });
        const title = document.querySelector('[data-story-language="' + lang + '"] h1');
        if (title) document.title = title.textContent + ' — Iris Zhou';
        if (persist) {
            try { localStorage.setItem('langPreference', lang); } catch (error) {}
        }
    }
    let preference = 'en';
    try { preference = localStorage.getItem('langPreference') || 'en'; } catch (error) {}
    setLanguage(preference, false);
    document.querySelectorAll('[data-story-lang]').forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.storyLang, true));
    });
})();
