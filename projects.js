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
    return project.links.demo || project.links.figma || project.links.repo || '#';
}

function computeAllTags() {
    return [...new Set(allProjects.flatMap(p => p.tags))].sort();
}

// State
let currentFilters = {
    search: '',
    tags: [],
    sort: 'latest'
};

function getProjectDateScore(project) {
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

    return latest;
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
        // Keep featured projects at the top regardless of the selected sort mode.
        const featuredDiff = Number(b.featured) - Number(a.featured);
        if (featuredDiff !== 0) return featuredDiff;

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

// Render tag filters
function renderTagFilters() {
    const tagFiltersContainer = document.getElementById('tagFilters');
    if (!tagFiltersContainer) return;
    
    tagFiltersContainer.innerHTML = allTags.map(tag => `
        <button class="tag-filter" data-tag="${tag}">${tag}</button>
    `).join('');
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
        const isExternal = /^https?:\/\//.test(projectLink) || /\.pdf($|[?#])/i.test(projectLink);
        const externalAttrs = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
        const hasCoverImage = Boolean(project.coverImage);
        const safeCoverImage = hasCoverImage ? project.coverImage.replace(/'/g, '%27') : '';
        const cardStyle = hasCoverImage
            ? `style="--project-cover-image: url('${safeCoverImage}');"`
            : '';
        const tagsMarkup = project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');
        const viewText = window.i18n && window.i18n.getLang() === 'zh' ? '\u67e5\u770b \u2192' : 'View \u2192';
        const contentMarkup = `
            <div class="project-card-content">
                <h3 class="project-title">${getLocalizedField(project, 'title')}</h3>
                <p class="project-oneliner">${getLocalizedField(project, 'oneLiner')}</p>
                <div class="project-tags">
                    ${tagsMarkup}
                </div>
                <p class="project-outcome">${getLocalizedField(project, 'outcome')}</p>
                <span class="project-view">${viewText}</span>
            </div>
        `;

        if (hasCoverImage) {
            return `
        <a href="${projectLink}" class="project-card ${project.featured ? 'featured' : ''} has-cover reveal" ${externalAttrs} ${cardStyle}>
            <span class="project-card-hero" aria-hidden="true">
                <span class="project-card-media"></span>
                <span class="project-card-overlay"></span>
            </span>
            <div class="project-card-body">
                ${contentMarkup}
            </div>
        </a>
    `;
        }

        return `
        <a href="${projectLink}" class="project-card ${project.featured ? 'featured' : ''} reveal" ${externalAttrs}>
            ${contentMarkup}
        </a>
    `;
    }).join('');

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
            p.tags.some(t => t.toLowerCase().includes(search))
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
            if (e.target.classList.contains('tag-filter')) {
                const tag = e.target.dataset.tag;
                
                if (currentFilters.tags.includes(tag)) {
                    currentFilters.tags = currentFilters.tags.filter(t => t !== tag);
                    e.target.classList.remove('active');
                } else {
                    currentFilters.tags.push(tag);
                    e.target.classList.add('active');
                }
                
                updateProjects();
            }
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

window.addEventListener('langChanged', function () { updateProjects(); });
