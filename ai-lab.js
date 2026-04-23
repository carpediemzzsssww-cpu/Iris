// ================================================
// AI Lab JavaScript
// ================================================

const aiLabData = {
    gallery: [
    ],

    featuredExperiment: {
        label: "Featured Tool",
        label_zh: "\u4ee3\u8868\u5de5\u5177",
        title: "Markdown Converter",
        title_zh: "Markdown \u8f6c\u6362\u5668",
        subtitle: "What AI writes best \u2192 what humans read best",
        subtitle_zh: "AI \u6700\u64c5\u957f\u7684\u8bed\u8a00 \u2192 \u4eba\u7c7b\u6700\u80fd\u8bfb\u61c2\u7684\u8bed\u8a00",
        stats: "Markdown \u2192 docx \u00b7 pdf \u00b7 xlsx \u00b7 Local-first \u00b7 One click",
        stats_zh: "Markdown \u2192 docx \u00b7 pdf \u00b7 xlsx \u00b7 \u5168\u672c\u5730 \u00b7 \u4e00\u952e\u8f6c\u6362",
        quote: "\"AI speaks Markdown. The world reads Word. This is the bridge.\"",
        quote_zh: "\"AI \u8bb2 Markdown\uff0c\u8fd9\u4e2a\u4e16\u754c\u8bfb Word\u3002\u8fd9\u662f\u90a3\u5ea7\u6865\u3002\"",
        gameLinkText: "Source on GitHub \u2192",
        gameLinkText_zh: "GitHub \u6e90\u7801 \u2192",
        caseLinkText: "",
        caseLinkText_zh: "",
        coverImage: "",
        tags: ["Local-first", "File Format", "DX", "TypeScript", "Open Source"],
        links: {
            game: "https://github.com/carpediemzzsssww-cpu/markdown--converter",
            caseStudy: ""
        }
    },

    experiments: [
        {
            slug: "yunyou-flight-agent",
            title: "Yunyou Flight Decision Agent",
            title_zh: "\u4e91\u6e38\u822a\u73ed\u51b3\u7b56 Agent",
            goal: "Build an AI agent that answers 'should I buy now?' — not just 'what flights exist?'",
            goal_zh: "\u505a\u4e00\u4e2a\u80fd\u56de\u7b54\u300c\u73b0\u5728\u8be5\u4e0d\u8be5\u4e70\uff1f\u300d\u800c\u4e0d\u53ea\u662f\u300c\u6709\u4ec0\u4e48\u822a\u73ed\uff1f\u300d\u7684 AI Agent",
            setup: "Doubao (Volcano Engine) Pro model with real Function Calling. 6 tool definitions for price history, trend analysis, route comparison, and market context. SSE streaming via Vercel Serverless. React + TypeScript frontend with transparent step-by-step reasoning UI.",
            setup_zh: "\u8c46\u5305 Pro + \u771f\u5b9e Function Calling\u30026 \u4e2a\u5de5\u5177\uff1a\u4ef7\u683c\u5386\u53f2\u3001\u8d8b\u52bf\u5206\u6790\u3001\u822a\u7ebf\u5bf9\u6bd4\u3001\u5e02\u573a\u4e0a\u4e0b\u6587\u3002SSE \u6d41\u5f0f\u8f93\u51fa + Vercel Serverless\u3002React + TypeScript \u524d\u7aef\uff0c\u63a8\u7406\u6b65\u9aa4\u5168\u900f\u660e\u3002",
            result: "AI genuinely selects and calls tools (5-8 steps per query). Transparent reasoning chain builds user trust. Post-purchase price guard with automatic rebooking calculations. Deployed at yunyou.vercel.app.",
            result_zh: "AI \u771f\u7684\u4f1a\u81ea\u5df1\u9009\u5de5\u5177\u548c\u8c03\u7528\uff08\u6bcf\u6b21 5-8 \u6b65\uff09\u3002\u63a8\u7406\u8fc7\u7a0b\u5168\u900f\u660e\uff0c\u7528\u6237\u4fe1\u4efb\u611f\u660e\u663e\u63d0\u5347\u3002\u5e26\u8d2d\u540e\u4ef7\u683c\u4fdd\u62a4 + \u81ea\u52a8\u8ba1\u7b97\u8981\u4e0d\u8981\u91cd\u65b0\u8ba2\u3002\u5df2\u4e0a\u7ebf\u3002",
            next: "Connect to real flight APIs (mock data currently). Add push notifications for price drops. Mobile-first redesign.",
            next_zh: "\u63a5\u771f\u5b9e\u822a\u73ed API\uff08\u73b0\u5728\u8fd8\u662f mock \u6570\u636e\uff09\u3002\u52a0\u964d\u4ef7\u63a8\u9001\u3002\u505a\u79fb\u52a8\u7aef\u4f18\u5148\u7684\u91cd\u8bbe\u8ba1\u3002",
            tags: ["AI Agent", "Function Calling", "Doubao API", "React"],
            githubLink: ""
        }
    ],

    ideas: [
    ]
};

// ================================================
// Rendering Functions
// ================================================

function renderGalleryItem(item) {
    var lang = window.i18n ? window.i18n.getLang() : 'en';
    var title = (lang === 'zh' && item.title_zh) ? item.title_zh : item.title;
    const thumbImage = item.thumbnail || item.image;
    return `
        <button class="gallery-item" type="button" data-gallery-id="${item.id}" aria-label="Open ${item.title} in lightbox">
            <div class="gallery-placeholder">
                <img src="${thumbImage}" alt="${title}" class="gallery-img" loading="lazy" decoding="async" />
            </div>
            <div class="gallery-overlay">
                <div class="gallery-overlay-title">${title}</div>
                <div class="gallery-overlay-desc">${item.model} • ${item.date}</div>
            </div>
        </button>
    `;
}

function renderExperimentCard(exp) {
    var lang = window.i18n ? window.i18n.getLang() : 'en';
    var title = (lang === 'zh' && exp.title_zh) ? exp.title_zh : exp.title;
    var goal = (lang === 'zh' && exp.goal_zh) ? exp.goal_zh : exp.goal;
    var setup = (lang === 'zh' && exp.setup_zh) ? exp.setup_zh : exp.setup;
    var result = (lang === 'zh' && exp.result_zh) ? exp.result_zh : exp.result;
    var next = (lang === 'zh' && exp.next_zh) ? exp.next_zh : exp.next;
    var goalLabel = lang === 'zh' ? '\u76ee\u6807\uff1a' : 'Goal:';
    var setupLabel = lang === 'zh' ? '\u8bbe\u7f6e\uff1a' : 'Setup:';
    var resultLabel = lang === 'zh' ? '\u7ed3\u679c\uff1a' : 'Result:';
    var nextLabel = lang === 'zh' ? '\u4e0b\u4e00\u6b65\uff1a' : 'Next Steps:';
    return `
        <div class="learning-card">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${title}</h3>
                ${exp.githubLink ? `
                    <a href="${exp.githubLink}" class="btn btn-ghost" style="padding: 6px 12px; font-size: 13px;" target="_blank" rel="noopener noreferrer">
                        GitHub →
                    </a>
                ` : ''}
            </div>

            <div style="margin: 16px 0;">
                <p style="font-size: 13px; color: var(--muted); margin-bottom: 4px;"><strong>${goalLabel}</strong></p>
                <p style="font-size: 14px; color: var(--text); margin-bottom: 12px;">${goal}</p>

                <p style="font-size: 13px; color: var(--muted); margin-bottom: 4px;"><strong>${setupLabel}</strong></p>
                <p style="font-size: 14px; color: var(--text); margin-bottom: 12px;">${setup}</p>

                <p style="font-size: 13px; color: var(--muted); margin-bottom: 4px;"><strong>${resultLabel}</strong></p>
                <p style="font-size: 14px; color: var(--text); margin-bottom: 12px; padding: 12px; background: var(--accent-soft); border-radius: 6px;">${result}</p>

                <p style="font-size: 13px; color: var(--muted); margin-bottom: 4px;"><strong>${nextLabel}</strong></p>
                <p style="font-size: 14px; color: var(--muted);">${next}</p>
            </div>

            <div class="project-tags">
                ${exp.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

function renderFeaturedExperimentCard(item) {
    var lang = window.i18n ? window.i18n.getLang() : 'en';
    var label = (lang === 'zh' && item.label_zh) ? item.label_zh : item.label;
    var title = (lang === 'zh' && item.title_zh) ? item.title_zh : item.title;
    var subtitle = (lang === 'zh' && item.subtitle_zh) ? item.subtitle_zh : item.subtitle;
    var stats = (lang === 'zh' && item.stats_zh) ? item.stats_zh : item.stats;
    var quote = (lang === 'zh' && item.quote_zh) ? item.quote_zh : item.quote;
    var gameText = (lang === 'zh' && item.gameLinkText_zh) ? item.gameLinkText_zh : (item.gameLinkText || 'Play the Game \u2192');
    var caseText = (lang === 'zh' && item.caseLinkText_zh) ? item.caseLinkText_zh : (item.caseLinkText || 'View Case Study \u2192');
    const hasCoverImage = Boolean(item.coverImage);
    const safeCoverImage = hasCoverImage ? item.coverImage.replace(/'/g, '%27') : '';
    const cardStyle = hasCoverImage ? `style="--featured-cover-image: url('${safeCoverImage}');"` : '';

    return `
        <article class="learning-card featured-experiment-card ${hasCoverImage ? 'has-cover' : ''}" ${cardStyle}>
            <span class="featured-experiment-media" aria-hidden="true"></span>
            <span class="featured-experiment-overlay" aria-hidden="true"></span>
            <div class="featured-experiment-label">\u2605 ${label}</div>
            <h3 class="featured-experiment-title">${title}</h3>
            <p class="featured-experiment-subtitle">${subtitle}</p>
            <p class="featured-experiment-stats">${stats}</p>
            <blockquote class="featured-experiment-quote">${quote}</blockquote>
            <div class="featured-experiment-actions">
                ${item.links.game ? `<a href="${item.links.game}" class="featured-experiment-action" target="_blank" rel="noopener noreferrer">${gameText}</a>` : ''}
                ${item.links.caseStudy ? `<a href="${item.links.caseStudy}" class="featured-experiment-action" target="_blank" rel="noopener noreferrer">${caseText}</a>` : ''}
            </div>
            <div class="featured-experiment-tag-row">
                <span class="featured-experiment-tag-label">Tags:</span>
                <div class="project-tags">
                    ${item.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `;
}

function renderIdeaCard(idea) {
    var lang = window.i18n ? window.i18n.getLang() : 'en';
    var title = (lang === 'zh' && idea.title_zh) ? idea.title_zh : idea.title;
    var content = (lang === 'zh' && idea.content_zh) ? idea.content_zh : idea.content;
    return `
        <div class="learning-card" style="${idea.pinned ? 'border: 2px solid var(--accent);' : ''}">
            <div class="learning-card-header">
                <h3 class="learning-card-title">
                    ${idea.pinned ? '\ud83d\udccc ' : ''}${title}
                </h3>
                <span style="font-size: 12px; color: var(--muted);">${idea.date}</span>
            </div>
            <p class="learning-card-summary" style="font-size: 14px; line-height: 1.6; margin: 12px 0;">
                ${content}
            </p>
            <div class="project-tags">
                ${idea.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

// ================================================
// Lightbox Functions
// ================================================

let lastFocusedElement = null;

function getLightboxFocusableElements(lightbox) {
    if (!lightbox) return [];
    const selectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return Array.from(lightbox.querySelectorAll(selectors)).filter(element => {
        if (element.getAttribute('aria-hidden') === 'true') return false;
        return element.getClientRects().length > 0;
    });
}

function handleLightboxTabKey(event) {
    if (event.key !== 'Tab') return;
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    const focusable = getLightboxFocusableElements(lightbox);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey) {
        if (activeElement === first || !lightbox.contains(activeElement)) {
            event.preventDefault();
            last.focus();
        }
        return;
    }

    if (activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function openLightbox(itemId) {
    const item = aiLabData.gallery.find(g => g.id === itemId);
    if (!item) return;
    const fullImage = item.fullImage || item.image || item.thumbnail;

    var lang = window.i18n ? window.i18n.getLang() : 'en';
    var title = (lang === 'zh' && item.title_zh) ? item.title_zh : item.title;
    var goal = (lang === 'zh' && item.goal_zh) ? item.goal_zh : (item.goal || '');
    var modelLabel = lang === 'zh' ? '\u6a21\u578b' : 'Model';
    var dateLabel = lang === 'zh' ? '\u65e5\u671f' : 'Date';
    var goalLabel = lang === 'zh' ? '\u76ee\u6807' : 'Goal';
    var promptLabel = lang === 'zh' ? '\u63d0\u793a\u8bcd' : 'Prompt';
    var copyText = lang === 'zh' ? '\u590d\u5236\u63d0\u793a\u8bcd' : 'Copy Prompt';

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxInfo = document.getElementById('lightboxInfo');
    if (!lightbox || !lightboxImage || !lightboxInfo) return;

    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    lightboxImage.innerHTML = `
  <img src="${fullImage}" alt="${title}" class="lightbox-img" />
`;

    lightboxInfo.innerHTML = `
        <h3 id="lightboxTitle" style="font-family: var(--font-display); font-size: 24px; margin-bottom: 12px;">${title}</h3>
        <p style="font-size: 14px; color: var(--muted); margin-bottom: 16px;">
            <strong>${modelLabel}:</strong> ${item.model}<br>
            <strong>${dateLabel}:</strong> ${item.date}
        </p>
        <div style="margin-bottom: 16px;">
            <p style="font-size: 13px; color: var(--muted); margin-bottom: 8px;"><strong>${goalLabel}:</strong></p>
            <p style="font-size: 14px; line-height: 1.6;">${goal}</p>
        </div>
        <div style="margin-bottom: 16px;">
            <p style="font-size: 13px; color: var(--muted); margin-bottom: 8px;"><strong>${promptLabel}:</strong></p>
            <div style="background: var(--surface-soft); padding: 12px; border-radius: 6px; font-size: 13px; line-height: 1.6;">
                ${item.prompt || ''}
            </div>
        </div>
        <button class="copy-button" onclick="copyPromptFromLightbox(\`${(item.prompt || '').replace(/`/g, '\\`')}\`, this)" style="width: 100%; margin-top: 16px;">
            ${copyText}
        </button>
    `;

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.removeEventListener('keydown', handleLightboxTabKey);
    document.addEventListener('keydown', handleLightboxTabKey);

    const closeButton = document.getElementById('lightboxClose');
    if (closeButton) {
        closeButton.focus();
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleLightboxTabKey);

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
    }
    lastFocusedElement = null;
}

function copyPromptFromLightbox(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = 'var(--success)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    });
}

// Close lightbox on background click
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active') && e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ================================================
// Initialize Page
// ================================================

// ================================================
// Chronicle (AI session receipts)
// ================================================

function fmtCurrency(n) {
    if (n == null) return '$0';
    if (n < 0.01) return '<$0.01';
    if (n < 100) return '$' + n.toFixed(2);
    return '$' + Math.round(n).toLocaleString();
}

function fmtCompact(n) {
    if (n == null) return '0';
    if (n < 1000) return String(n);
    if (n < 1_000_000) return (n / 1000).toFixed(n < 10_000 ? 1 : 0) + 'k';
    return (n / 1_000_000).toFixed(1) + 'M';
}

function renderChronicleSpark(tokens) {
    const vals = [tokens.input || 0, tokens.output || 0, tokens.cache_create || 0, tokens.cache_read || 0];
    const max = Math.max(1, ...vals);
    const labels = ['IN', 'OUT', 'CC', 'CR'];
    const bars = vals.map((v, i) => {
        const h = Math.max(2, Math.round((v / max) * 24));
        const cls = i === 1 ? 'bar plum' : 'bar';
        return '<div class="' + cls + '" style="height:' + h + 'px" title="' + labels[i] + ': ' + v.toLocaleString() + '"></div>';
    }).join('');
    const legend = labels.map(l => '<span>' + l + '</span>').join('');
    return '<div class="chronicle-spark" aria-hidden="true">' + bars + '</div>'
         + '<div class="chronicle-spark-labels">' + legend + '</div>';
}

function renderChronicleCard(entry) {
    const lang = window.i18n ? window.i18n.getLang() : 'en';
    const projName = (lang === 'zh' && entry.project?.name_zh) ? entry.project.name_zh : (entry.project?.name_en || '—');
    const dateStr = entry.date || '';
    const num = 'Nº ' + String(entry.number || 0).padStart(3, '0');
    const kModel = lang === 'zh' ? '\u6a21\u578b' : 'Model';
    const kTurns = lang === 'zh' ? '\u8f6e\u6b21' : 'Turns';
    const kCost  = lang === 'zh' ? '\u4f30\u7b97' : 'Est.';
    const caption = (entry.summary && entry.summary[lang]) || entry.topic || '';
    const href = './chronicles/' + (entry.file || '');
    return (
        '<a class="chronicle-card" href="' + href + '" target="_blank" rel="noopener">' +
          '<div class="chronicle-card-head">' +
            '<span class="chronicle-card-num">' + num + '</span>' +
            '<span class="chronicle-card-date">' + dateStr + '</span>' +
          '</div>' +
          '<div class="chronicle-card-project">' + projName + '</div>' +
          (caption ? '<div class="chronicle-card-topic">' + caption + '</div>' : '') +
          '<div class="chronicle-card-meta">' +
            '<div class="cell"><span class="k">' + kModel + '</span><span class="v">' + (entry.model_display || '—') + '</span></div>' +
            '<div class="cell"><span class="k">' + kTurns + '</span><span class="v">' + (entry.turns || 0) + '</span></div>' +
            '<div class="cell"><span class="k">' + kCost + '</span><span class="v cost">' + fmtCurrency(entry.cost_usd) + '</span></div>' +
          '</div>' +
          renderChronicleSpark(entry.tokens || {}) +
        '</a>'
    );
}

function renderChronicleStats(entries) {
    const lang = window.i18n ? window.i18n.getLang() : 'en';
    const lReceipts = lang === 'zh' ? '\u5f20\u624b\u672d' : 'receipts';
    const lSpent    = lang === 'zh' ? 'API \u7b49\u4ef7' : 'est. API cost';
    const lProjects = lang === 'zh' ? '\u4e2a\u9879\u76ee' : 'projects';
    const totalCost = entries.reduce((s, e) => s + (e.cost_usd || 0), 0);
    const projectSlugs = new Set(entries.map(e => e.project?.slug).filter(Boolean));
    return (
        '<div class="chronicle-stat"><span class="num">' + entries.length + '</span><span class="label">' + lReceipts + '</span></div>' +
        '<div class="chronicle-stat"><span class="num">' + fmtCurrency(totalCost) + '</span><span class="label">' + lSpent + '</span></div>' +
        '<div class="chronicle-stat"><span class="num">' + projectSlugs.size + '</span><span class="label">' + lProjects + '</span></div>'
    );
}

async function renderChronicles() {
    const grid = document.getElementById('chronicleGrid');
    const stats = document.getElementById('chronicleStats');
    if (!grid || !stats) return;
    const lang = window.i18n ? window.i18n.getLang() : 'en';
    const emptyMsg = lang === 'zh'
        ? '\u6863\u6848\u8fd8\u662f\u7a7a\u7684\u2014\u2014\u7b2c\u4e00\u5f20\u624b\u672d\u4f1a\u51fa\u73b0\u5728\u8fd9\u91cc\u3002'
        : 'The archive is empty \u2014 the first chronicle will land here.';

    let data;
    try {
        const res = await fetch('./chronicles/index.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error('index not found');
        data = await res.json();
    } catch (e) {
        grid.innerHTML = '<div class="chronicle-empty">' + emptyMsg + '</div>';
        stats.innerHTML = '';
        return;
    }
    const entries = Array.isArray(data.entries) ? data.entries : [];
    if (entries.length === 0) {
        grid.innerHTML = '<div class="chronicle-empty">' + emptyMsg + '</div>';
        stats.innerHTML = '';
        return;
    }
    stats.innerHTML = renderChronicleStats(entries);
    grid.innerHTML = entries.slice(0, 12).map(renderChronicleCard).join('');
}

async function loadAILabData() {
    try {
        var response = await fetch('content/ai-lab-data.json', { cache: 'no-cache' });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        var data = await response.json();
        aiLabData.gallery = Array.isArray(data.gallery) ? data.gallery : [];
        aiLabData.ideas = Array.isArray(data.ideas) ? data.ideas : [];
    } catch (err) {
        console.error('Failed to load ai-lab-data.json:', err);
        aiLabData.gallery = [];
        aiLabData.ideas = [];
    }
}

async function initAILabPage() {
    await loadAILabData();

    // Render chronicle archive
    renderChronicles();

    // Render gallery
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = aiLabData.gallery.map(renderGalleryItem).join('');
    if (!galleryGrid.dataset.boundEvents) {
        galleryGrid.addEventListener('click', (event) => {
            const trigger = event.target.closest('.gallery-item');
            if (!trigger || !galleryGrid.contains(trigger)) return;
            const itemId = Number(trigger.dataset.galleryId);
            if (Number.isNaN(itemId)) return;
            openLightbox(itemId);
        });
        galleryGrid.dataset.boundEvents = 'true';
    }
    
    // Render experiments
    const featuredExperiment = document.getElementById('featuredExperiment');
    if (featuredExperiment) {
        featuredExperiment.innerHTML = renderFeaturedExperimentCard(aiLabData.featuredExperiment);
    }

    document.getElementById('experimentsList').innerHTML = aiLabData.experiments.map(renderExperimentCard).join('');
    
    // Render ideas (pinned first, then by date)
    const sortedIdeas = [...aiLabData.ideas].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.date) - new Date(a.date);
    });
    document.getElementById('ideasList').innerHTML = sortedIdeas.map(renderIdeaCard).join('');
    
    // Trigger reveal animations
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 100);
}

// ================================================
// Initialize
// ================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAILabPage);
} else {
    initAILabPage();
}

window.addEventListener('langChanged', function() { initAILabPage(); });
