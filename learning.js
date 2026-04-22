// ================================================
// Learning Hub JavaScript
// ================================================

function _lang() {
    return (window.i18n && window.i18n.getLang) ? window.i18n.getLang() : 'en';
}

function _t(obj, field) {
    if (_lang() === 'zh' && obj[field + '_zh']) return obj[field + '_zh'];
    return obj[field];
}

// learningData is populated at runtime by loadLearningData().
// Source of truth: content/learning/*.md files + scripts/build-learning.js
let learningData = { prompts: [], methods: [], notes: [], readings: [], tools: [] };

async function loadLearningData() {
    try {
        const response = await fetch("./content/learning-data.json", { cache: "no-cache" });
        if (!response.ok) throw new Error("HTTP " + response.status);
        const data = await response.json();
        learningData = Object.assign({ prompts: [], methods: [], notes: [], readings: [], tools: [] }, data);
    } catch (err) {
        console.error("Failed to load learning-data.json:", err);
    }
}

// ================================================
// Rendering Functions
// ================================================

function renderPromptCard(prompt) {
    var isZh = _lang() === 'zh';
    var useCaseLabel = isZh ? '\u7528\u4f8b: ' : 'Use case: ';
    var copyLabel = isZh ? '\u590d\u5236' : 'Copy';
    var showLabel = isZh ? '\u5c55\u5f00\u5b8c\u6574\u63d0\u793a\u8bcd' : 'Show Full Prompt';
    var varsLabel = isZh ? '\u53d8\u91cf: ' : 'Variables: ';
    return `
        <div class="learning-card" data-expanded="false">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${_t(prompt, 'title')}</h3>
                <button class="copy-button" onclick="copyToClipboard(\`${prompt.template.replace(/`/g, '\\`')}\`, this)">
                    ${copyLabel}
                </button>
            </div>
            <p class="learning-card-meta">${useCaseLabel}${_t(prompt, 'useCase')}</p>
            <p class="learning-card-summary">${prompt.template.substring(0, 200)}...</p>
            <div class="project-tags">
                ${prompt.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <button class="expand-toggle" onclick="toggleLearningCard(this)">
                ${showLabel}
            </button>
            <div class="learning-card-full">
                <pre style="white-space: pre-wrap; font-size: 13px; line-height: 1.6; background: var(--surface-soft); padding: 16px; border-radius: 8px; margin: 16px 0;">${prompt.template}</pre>
                <p style="font-size: 13px; color: var(--muted); margin-top: 12px;">
                    <strong>${varsLabel}</strong> ${prompt.variables.map(v => `{${v}}`).join(', ')}
                </p>
            </div>
        </div>
    `;
}

function renderMethodCard(method) {
    var isZh = _lang() === 'zh';
    var stepsLabel = isZh ? (method.steps + ' \u6b65') : (method.steps + ' Steps');
    var appliesToLabel = isZh ? '\u9002\u7528\u4e8e: ' : 'Applies to: ';
    var showLabel = isZh ? '\u5c55\u5f00\u5b8c\u6574\u65b9\u6cd5' : 'Show Full Method';
    return `
        <div class="learning-card" data-expanded="false">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${_t(method, 'title')}</h3>
                <span class="tag-pill" style="background: var(--grad); color: var(--text);">${stepsLabel}</span>
            </div>
            <p class="learning-card-meta">${appliesToLabel}${_t(method, 'appliesTo')}</p>
            <p class="learning-card-summary">${_t(method, 'summary')}</p>
            <div class="project-tags">
                ${method.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <button class="expand-toggle" onclick="toggleLearningCard(this)">
                ${showLabel}
            </button>
            <div class="learning-card-full">
                <div style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${method.fullContent}</div>
            </div>
        </div>
    `;
}

function renderNoteCard(note) {
    var isZh = _lang() === 'zh';
    var sourceLabel = isZh ? '\u6765\u6e90: ' : 'Source: ';
    var takeawaysLabel = isZh ? '\u6838\u5fc3\u8981\u70b9:' : 'Key Takeaways:';
    var showLabel = isZh ? '\u9605\u8bfb\u5b8c\u6574\u7b14\u8bb0' : 'Read Full Notes';
    return `
        <div class="learning-card" data-expanded="false">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${_t(note, 'title')}</h3>
                <span style="font-size: 12px; color: var(--muted);">${note.date}</span>
            </div>
            <p class="learning-card-meta">${sourceLabel}${_t(note, 'source')}</p>
            <div style="margin: 12px 0;">
                <strong style="font-size: 13px; color: var(--text);">${takeawaysLabel}</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                    ${note.takeaways.map(t => `<li style="font-size: 13px; color: var(--muted); margin: 4px 0;">${t}</li>`).join('')}
                </ul>
            </div>
            <div class="project-tags">
                ${note.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <button class="expand-toggle" onclick="toggleLearningCard(this)">
                ${showLabel}
            </button>
            <div class="learning-card-full">
                <div style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${note.fullContent}</div>
            </div>
        </div>
    `;
}

function renderReadingCard(reading) {
    var isZh = _lang() === 'zh';
    var readLabel = isZh ? '\u9605\u8bfb \u2192' : 'Read \u2192';
    var byLabel = isZh ? '\u4f5c\u8005: ' : 'By ';
    var showNotesLabel = isZh ? '\u5c55\u5f00\u6211\u7684\u7b14\u8bb0' : 'Show My Notes';
    return `
        <div class="learning-card">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${_t(reading, 'title')}</h3>
                <a href="${reading.link}" class="btn btn-ghost" style="padding: 6px 12px; font-size: 13px;" target="_blank" rel="noopener noreferrer">
                    ${readLabel}
                </a>
            </div>
            <p class="learning-card-meta">${byLabel}${reading.author}</p>
            <p class="learning-card-summary">${_t(reading, 'summary')}</p>
            <div class="project-tags">
                ${reading.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            ${reading.fullContent ? `
                <button class="expand-toggle" onclick="toggleLearningCard(this)" style="margin-top: 12px;">
                    ${showNotesLabel}
                </button>
                <div class="learning-card-full">
                    <div style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${reading.fullContent}</div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderToolCard(tool) {
    var isZh = _lang() === 'zh';
    var linkIcon = tool.type === 'repo' ? 'GitHub' : (isZh ? '\u8bbf\u95ee' : 'Visit');
    var whatLabel = isZh ? '\u529f\u80fd: ' : 'What it does: ';
    return `
        <div class="learning-card">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${_t(tool, 'title')}</h3>
                <a href="${tool.link}" class="btn btn-primary" style="padding: 6px 12px; font-size: 13px;" target="_blank" rel="noopener noreferrer">
                    ${linkIcon} \u2192
                </a>
            </div>
            <p class="learning-card-summary">${_t(tool, 'description')}</p>
            <p style="font-size: 13px; color: var(--text); margin: 12px 0; padding: 12px; background: var(--grad); border-radius: 6px;">
                <strong>${whatLabel}</strong> ${_t(tool, 'whatItDoes')}
            </p>
            <div class="project-tags">
                ${tool.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

// ================================================
// Initialize Page
// ================================================

async function initLearningPage() {
    await loadLearningData();

    // Render all tabs
    document.getElementById('promptsList').innerHTML = learningData.prompts.map(renderPromptCard).join('');
    document.getElementById('methodsList').innerHTML = learningData.methods.map(renderMethodCard).join('');
    document.getElementById('notesList').innerHTML = learningData.notes.map(renderNoteCard).join('');
    document.getElementById('readingsList').innerHTML = learningData.readings.map(renderReadingCard).join('');
    document.getElementById('toolsList').innerHTML = learningData.tools.map(renderToolCard).join('');
    
    // Setup tab switching
    setupTabs();
    
    // Trigger reveal animations
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 100);
}

// ================================================
// Tab Switching
// ================================================

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

// ================================================
// Expand/Collapse Cards
// ================================================

function toggleLearningCard(button) {
    const card = button.closest('.learning-card');
    const isExpanded = card.getAttribute('data-expanded') === 'true';
    
    card.setAttribute('data-expanded', !isExpanded);
    button.textContent = isExpanded ? button.textContent.replace('Hide', 'Show') : button.textContent.replace('Show', 'Hide');
    
    if (!isExpanded) {
        card.classList.add('expanded');
    } else {
        card.classList.remove('expanded');
    }
}

// ================================================
// Copy to Clipboard
// ================================================

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Show toast
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        
        // Update button
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = 'var(--success)';
        
        setTimeout(() => {
            toast.classList.remove('show');
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

// ================================================
// Initialize
// ================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLearningPage);
} else {
    initLearningPage();
}

// ================================================
// Language Change — Re-render Active Tab
// ================================================

window.addEventListener('langChanged', function () {
    document.getElementById('promptsList').innerHTML = learningData.prompts.map(renderPromptCard).join('');
    document.getElementById('methodsList').innerHTML = learningData.methods.map(renderMethodCard).join('');
    document.getElementById('notesList').innerHTML = learningData.notes.map(renderNoteCard).join('');
    document.getElementById('readingsList').innerHTML = learningData.readings.map(renderReadingCard).join('');
    document.getElementById('toolsList').innerHTML = learningData.tools.map(renderToolCard).join('');
});
