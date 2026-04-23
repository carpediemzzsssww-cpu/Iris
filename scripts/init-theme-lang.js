(function () {
    try {
        var stored = localStorage.getItem('themePreference');
        var preference = stored ? JSON.parse(stored) : null;
        var isDark = preference ? preference === 'dark' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } catch (error) {}
})();
(function () {
    try {
        var lang = localStorage.getItem('langPreference') || 'en';
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    } catch (e) {}
})();
