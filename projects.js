// ================================================
// Projects Page JavaScript
// ================================================

const allProjects = [
    {
        slug: "ai-prd-copilot",
        title: "AI PRD Copilot",
        oneLiner: "An AI Copilot that helps product managers think, not just write",
        featured: true,
        coverImage: "assets/project-covers/projects/ai-prd-copilot-cover.webp",
        role: "Product Designer",
        time: "2026",
        outcome: "Improved overall quality by 17.5% and content specificity by 41%",
        tags: ["AI/ML", "Product Design", "Prototyping"],
        links: {
            demo: "https://prd-copilot-av8y8qmsthw7i3cay3efeq.streamlit.app"
        }
    },
    {
        slug: "netease-hi-echo-research",
        title: "NetEase Hi Echo — User Research",
        oneLiner: "Led a 17-person team to understand what AI English learners actually need",
        featured: true,
        coverImage: "assets/project-covers/projects/netease-hi-echo-research-cover.webp",
        role: "Project Lead",
        time: "2024.06 – 2025.03",
        outcome: "1,287 surveys · 3-city field research · 78-page report adopted by NetEase Hi Echo · University First Prize (2/18)",
        tags: ["User Research", "Product Strategy", "AI/ML"],
        links: {
            demo: "case-studies/netease-hi-echo/index.html"
        }
    },
    {
        slug: "bionic-reading",
        title: "Bionic Reading - Interaction Concept",
        oneLiner: "A 151-response survey uncovered e-book UX pain points, then reimagined the future of reading.",
        featured: false,
        coverImage: "assets/project-covers/projects/bionic-reading-cover.webp",
        role: "Research + Concept Design",
        time: "2025",
        outcome: "User research (SPSS factor analysis) -> concept proposal combining bio-typography, BCI feedback, and immersive co-reading.",
        tags: ["User Research", "Product Design", "Interaction Design"],
        links: {
            demo: "case-studies/bionic-reading/index.html"
        }
    },
    {
        slug: "web-design-playground",
        title: "Web Design Playground",
        oneLiner: "50+ UI case studies — exploring how visual language shapes product experience",
        featured: false,
        coverImage: "assets/project-covers/projects/web-design-playground-cover.webp",
        role: "UI Designer",
        time: "2026",
        outcome: "Built and curated 50+ UI case studies (ongoing), gradually shaping a distinctive personal design style",
        tags: ["Product Design", "Figma", "Design Systems"],
        links: {
            demo: "https://web-design-playground-nq4f.vercel.app"
        }
    },
    {
        slug: "whudo-system",
        title: "WHUDO System",
        oneLiner: "A smart dormitory OS designed for four people sharing one space",
        featured: true,
        coverImage: "assets/project-covers/projects/whudo-system-cover.webp",
        role: "UI Designer",
        time: "Spring 2025",
        outcome: "6-module AI-powered concept: face recognition, voice assistant, multi-user device control, behavior analytics, and a graduation memoir easter egg",
        tags: ["Product Design", "AI/ML", "Prototyping"],
        links: {
            demo: "https://whudo-casestudy.vercel.app"
        }
    },
    {
        slug: "smart-photo-organizer",
        title: "Smart Photo Organizer — A Failure",
        oneLiner: "Built an AI photo tool in 2 hours. A user's one question broke it.",
        featured: false,
        coverImage: "assets/project-covers/projects/smart-photo-organizer-cover.webp",
        role: "Solo Developer",
        time: "2026.01",
        outcome: "Python + Qwen 2.5 7B local model · perceptual hashing · full product reflection on over-engineering without user validation",
        tags: ["AI/ML", "Product Thinking", "Reflection"],
        links: {
            demo: "https://photo-organizer-eta.vercel.app"
        }
    },
    {
        slug: "ai-agent-industry-report",
        title: "AI Agent Industry Report",
        oneLiner: "2025–2026 AI Agent industry landscape: players, use cases, and where it's heading",
        featured: false,
        coverImage: "assets/project-covers/projects/ai-agent-industry-report-cover.webp",
        role: "Research & Analysis",
        time: "2026.02",
        outcome: "Covers agent architecture, key players (domestic + overseas), enterprise adoption patterns, and investment trends across 2025–2026",
        tags: ["Research", "AI/ML", "Industry Analysis"],
        links: {
            demo: "assets/reports/AI_Agent_Industry_Report_2025_2026.pdf"
        }
    }
];

function getPrimaryProjectLink(project) {
    if (!project || !project.links) return '#';
    return project.links.demo || project.links.figma || project.links.repo || '#';
}

// Get all unique tags
const allTags = [...new Set(allProjects.flatMap(p => p.tags))].sort();

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
        'Research'
    ]);
    const tagScore = project.tags.reduce((score, tag) => score + (technicalTags.has(tag) ? 1 : 0), 0);
    const text = `${project.oneLiner || ''} ${project.outcome || ''}`;
    const keywordScore = (text.match(/\b(ai|agent|model|python|hashing|analysis|system)\b/ig) || []).length;
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

// Initialize page
function initProjectsPage() {
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
        const contentMarkup = `
            <div class="project-card-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-oneliner">${project.oneLiner}</p>
                <div class="project-tags">
                    ${tagsMarkup}
                </div>
                <p class="project-outcome">${project.outcome}</p>
                <span class="project-view">View →</span>
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
            p.title.toLowerCase().includes(search) ||
            p.oneLiner.toLowerCase().includes(search) ||
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
