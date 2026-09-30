// ================================================
// Projects Page JavaScript
// ================================================

function getLocalizedField(project, field) {
    var lang = window.i18n ? window.i18n.getLang() : 'en';
    if (lang === 'zh' && project[field + '_zh']) {
        return project[field + '_zh'];
    }
    return project[field] || '';
}

// Loaded from content/projects-data.json at boot (built from content/projects/*.md).
let allProjects = [];
let allTags = [];


function getPrimaryProjectLink(project) {
    if (!project || !project.links) return '#';
    return project.links.caseStudy || project.links.demo || project.links.figma || project.links.repo || '#';
}

// Most-used tags first, so the short visible row covers most projects.
function computeAllTags() {
    const counts = new Map();
    allProjects.forEach(p => p.tags.forEach(tag => counts.set(tag, (counts.get(tag) || 0) + 1)));
    return [...counts.keys()].sort((a, b) => (counts.get(b) - counts.get(a)) || a.localeCompare(b));
}

// Tags are stored in English; Chinese labels come from each project's tags_zh,
// then from the "tag.<name>" entries in projects-ui.json for older projects.
let tagZh = {};

function computeTagTranslations() {
    tagZh = {};
    allProjects.forEach(p => {
        if (!Array.isArray(p.tags_zh)) return;
        p.tags.forEach((tag, i) => { if (p.tags_zh[i] && !tagZh[tag]) tagZh[tag] = p.tags_zh[i]; });
    });
}

function tagLabel(tag) {
    if (!window.i18n || window.i18n.getLang() !== 'zh') return tag;
    return tagZh[tag] || window.i18n.t('tag.' + tag) || tag;
}

function escapeAttr(value) {
    return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

// State
let currentFilters = {
    search: '',
    tags: [],
    sort: 'latest'
};

function getProjectDateScore(project) {
    // Optional `date` (YYYY-MM-DD) orders projects that share a month; otherwise fall back to `time`.
    const exact = String(project.date || '').match(/^(20\d{2})-(\d{1,2})-(\d{1,2})$/);
    if (exact) {
        return Number(exact[1]) * 10000 + Number(exact[2]) * 100 + Number(exact[3]);
    }

    const time = String(project.time || '');
    const matches = Array.from(time.matchAll(/(20\d{2})(?:[.\-/](\d{1,2}))?/g));
    if (matches.length === 0) return 0;

    let latest = 0;
    matches.forEach(([, yearRaw, monthRaw]) => {
        const year = Number.parseInt(yearRaw, 10);
        const month = monthRaw ? Number.parseInt(monthRaw, 10) : 1;
        if (!Number.isFinite(year)) return;
        const safeMonth = Number.isFinite(month) ? Math.min(12, Math.max(1, month)) : 1;
        latest = Math.max(latest, year * 100 + safeMonth);
    });

    return latest * 100;
}

function getProjectImpactScore(project) {
    const outcome = String(project.outcome || '');
    let score = project.featured ? 25 : 0;

    const numberMatches = Array.from(outcome.matchAll(/(\d+(?:\.\d+)?)(%?)/g));
    numberMatches.forEach(([, valueRaw, isPercent]) => {
        const value = Number.parseFloat(valueRaw);
        if (!Number.isFinite(value)) return;
        if (isPercent) {
            score += value * 2;
            return;
        }
        score += Math.log10(value + 1) * 12;
    });

    return score;
}

function getProjectTechnicalScore(project) {
    const technicalTags = new Set([
        'AI/ML',
        'Prototyping',
        'Interaction Design',
        'Design Systems',
        'Industry Analysis',
        'Research',
        'Automation',
        'Claude Code Skill'
    ]);
    const tagScore = project.tags.reduce((score, tag) => score + (technicalTags.has(tag) ? 1 : 0), 0);
    const text = `${project.oneLiner || ''} ${project.outcome || ''}`;
    const keywordScore = (text.match(/\b(ai|agent|model|python|hashing|analysis|system|skill|automation|rpa|llm|rag|api)\b/ig) || []).length;
    return tagScore * 10 + keywordScore;
}

function sortProjects(projects, sortBy) {
    const sorted = [...projects];

    sorted.sort((a, b) => {
        // Latest is purely chronological; the other modes keep featured projects on top.
        if (sortBy !== 'latest') {
            const featuredDiff = Number(b.featured) - Number(a.featured);
            if (featuredDiff !== 0) return featuredDiff;
        }

        switch (sortBy) {
            case 'latest': {
                const dateDiff = getProjectDateScore(b) - getProjectDateScore(a);
                if (dateDiff !== 0) return dateDiff;
                return getProjectImpactScore(b) - getProjectImpactScore(a);
            }
            case 'impact': {
                const impactDiff = getProjectImpactScore(b) - getProjectImpactScore(a);
                if (impactDiff !== 0) return impactDiff;
                return getProjectDateScore(b) - getProjectDateScore(a);
            }
            case 'technical': {
                const techDiff = getProjectTechnicalScore(b) - getProjectTechnicalScore(a);
                if (techDiff !== 0) return techDiff;
                return getProjectDateScore(b) - getProjectDateScore(a);
            }
            default:
                return 0;
        }
    });

    return sorted;
}

async function loadProjectsData() {
    try {
        var response = await fetch('content/projects-data.json', { cache: 'no-cache' });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        var data = await response.json();
        allProjects = Array.isArray(data.projects) ? data.projects : [];
        allTags = computeAllTags();
        computeTagTranslations();
    } catch (err) {
        console.error('Failed to load projects-data.json:', err);
        allProjects = [];
        allTags = [];
    }
}

// Initialize page
async function initProjectsPage() {
    await loadProjectsData();
    renderTagFilters();
    setupEventListeners();
    updateProjects();
}

// Render tag filters: the most-used tags stay visible, the rest fold behind "More tags".
const VISIBLE_TAGS = 10;
let showAllTags = false;

function renderTagFilters() {
    const tagFiltersContainer = document.getElementById('tagFilters');
    if (!tagFiltersContainer) return;

    const t = key => (window.i18n && window.i18n.t(key)) || '';
    const button = tag => `<button class="tag-filter${currentFilters.tags.includes(tag) ? ' active' : ''}" type="button" data-tag="${escapeAttr(tag)}" aria-pressed="${currentFilters.tags.includes(tag)}">${tagLabel(tag)}</button>`;
    // Keep any active tag visible even when the list is folded.
    const visible = allTags.filter((tag, i) => showAllTags || i < VISIBLE_TAGS || currentFilters.tags.includes(tag));
    const hiddenCount = allTags.length - visible.length;
    const toggle = allTags.length > VISIBLE_TAGS
        ? `<button class="tag-more" type="button" aria-expanded="${showAllTags}">${showAllTags ? (t('projects.fewerTags') || 'Fewer tags') : (t('projects.moreTags') || 'More tags') + ' +' + hiddenCount}</button>`
        : '';

    tagFiltersContainer.innerHTML = visible.map(button).join('') + toggle;
}

// Render projects
function renderProjects(projects) {
    const grid = document.getElementById('allProjectsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!grid) return;
    
    if (projects.length === 0) {
        grid.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    if (noResults) noResults.style.display = 'none';

    grid.innerHTML = projects.map(project => {
        const projectLink = getPrimaryProjectLink(project);
        // Internal work with nothing public to open is shown as a plain card, not a dead link.
        const isStatic = projectLink === '#';
        const isExternal = /^https?:\/\//.test(projectLink) || /\.pdf($|[?#])/i.test(projectLink);
        const externalAttrs = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
        const hasCoverImage = Boolean(project.coverImage);
        // Covers load when the card nears the viewport (see observeCovers).
        const coverAttr = hasCoverImage ? `data-cover="${escapeAttr(project.coverImage)}"` : '';
        const tagsMarkup = project.tags.map(tag => `<span class="tag-pill">${tagLabel(tag)}</span>`).join('');
        const viewText = window.i18n && window.i18n.getLang() === 'zh' ? '\u67e5\u770b \u2192' : 'View \u2192';
        const contentMarkup = `
            <div class="project-card-content">
                <h3 class="project-title">${getLocalizedField(project, 'title')}</h3>
                <p class="project-oneliner">${getLocalizedField(project, 'oneLiner')}</p>
                <div class="project-tags">
                    ${tagsMarkup}
                </div>
                <p class="project-outcome">${getLocalizedField(project, 'outcome')}</p>
                ${isStatic ? '' : `<span class="project-view">${viewText}</span>`}
            </div>
        `;
        const tag = isStatic ? 'article' : 'a';
        const linkAttrs = isStatic ? '' : `href="${projectLink}" ${externalAttrs}`;
        const classes = `project-card ${project.featured ? 'featured' : ''} ${hasCoverImage ? 'has-cover' : ''} ${isStatic ? 'is-static' : ''} reveal`;

        if (hasCoverImage) {
            return `
        <${tag} ${linkAttrs} class="${classes}" ${coverAttr}>
            <span class="project-card-hero" aria-hidden="true">
                <span class="project-card-media"></span>
                <span class="project-card-overlay"></span>
            </span>
            <div class="project-card-body">
                ${contentMarkup}
            </div>
        </${tag}>
    `;
        }

        return `
        <${tag} ${linkAttrs} class="${classes}">
            ${contentMarkup}
        </${tag}>
    `;
    }).join('');

    observeCovers(grid);

    if (window.portfolioUtils && typeof window.portfolioUtils.setupProjectCardMicroInteractions === 'function') {
        window.portfolioUtils.setupProjectCardMicroInteractions(grid);
    }
    
    // Trigger reveal animation
    setTimeout(() => {
        grid.querySelectorAll('.reveal').forEach((el, idx) => {
            setTimeout(() => el.classList.add('active'), idx * 50);
        });
    }, 100);
}

// Load each cover once its card is within ~400px of the viewport, then fade it in.
let coverObserver = null;

function showCover(card) {
    const src = card.getAttribute('data-cover');
    if (!src) return;
    card.removeAttribute('data-cover');
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
        card.style.setProperty('--project-cover-image', `url('${src.replace(/'/g, '%27')}')`);
        card.classList.add('cover-ready');
    };
    img.src = src;
}

function observeCovers(scope) {
    const cards = scope.querySelectorAll('[data-cover]');
    if (!('IntersectionObserver' in window)) {
        cards.forEach(showCover);
        return;
    }
    if (!coverObserver) {
        coverObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                coverObserver.unobserve(entry.target);
                showCover(entry.target);
            });
        }, { rootMargin: '400px 0px' });
    }
    cards.forEach(card => coverObserver.observe(card));
}

// Filter and sort projects
function updateProjects() {
    let filtered = [...allProjects];
    
    // Apply search filter
    if (currentFilters.search) {
        const search = currentFilters.search.toLowerCase();
        filtered = filtered.filter(p =>
            (p.title || '').toLowerCase().includes(search) ||
            (p.title_zh || '').includes(search) ||
            (p.oneLiner || '').toLowerCase().includes(search) ||
            (p.oneLiner_zh || '').includes(search) ||
            p.tags.some(t => t.toLowerCase().includes(search) || tagLabel(t).includes(search))
        );
    }
    
    // Apply tag filters
    if (currentFilters.tags.length > 0) {
        filtered = filtered.filter(p => 
            currentFilters.tags.some(tag => p.tags.includes(tag))
        );
    }
    
    // Apply sorting
    filtered = sortProjects(filtered, currentFilters.sort);
    
    renderProjects(filtered);
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', window.portfolioUtils.debounce((e) => {
            currentFilters.search = e.target.value;
            updateProjects();
        }, 300));
    }
    
    // Tag filters
    const tagFilters = document.getElementById('tagFilters');
    if (tagFilters) {
        tagFilters.addEventListener('click', (e) => {
            if (e.target.closest('.tag-more')) {
                showAllTags = !showAllTags;
                renderTagFilters();
                return;
            }
            const button = e.target.closest('.tag-filter');
            if (!button) return;
            const tag = button.dataset.tag;
            if (currentFilters.tags.includes(tag)) {
                currentFilters.tags = currentFilters.tags.filter(t => t !== tag);
            } else {
                currentFilters.tags.push(tag);
            }
            renderTagFilters();
            updateProjects();
        });
    }
    
    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            updateProjects();
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectsPage);
} else {
    initProjectsPage();
}

// Tag labels and the "More tags" text live in projects-ui.json, which can arrive after the data.
// Only re-render once the data is in, so the loader never flashes "no results".
function rerenderLocalized() {
    if (!allProjects.length) return;
    renderTagFilters();
    updateProjects();
}
window.addEventListener('langChanged', rerenderLocalized);
window.addEventListener('i18nContentLoaded', rerenderLocalized);
