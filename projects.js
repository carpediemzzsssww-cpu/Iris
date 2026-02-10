// ================================================
// Projects Page JavaScript
// ================================================

const allProjects = [
    {
        slug: "ai-prd-copilot",
        title: "AI PRD Copilot",
        oneLiner: "An AI Copilot that helps product managers think, not just write",
        featured: true,
        role: "Product Designer",
        time: "2026",
        outcome: "Improved overall quality by 17.5% and content specificity by 41%",
        tags: ["AI/ML", "Product Design", "Prototyping"],
        links: {
            demo: "https://prd-copilot-av8y8qmsthw7i3cay3efeq.streamlit.app"
        }
    },
    {
        slug: "web-design-playground",
        title: "Web Design Playground",
        oneLiner: "Where visual ideas become interactive web design experiments",
        featured: true,
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
        oneLiner: "AI-Powered Smart Dormitory System",
        featured: true,
        role: "Designer",
        time: "Spring 2025",
        outcome: "a scenario-driven smart dormitory product concept focused on campus housing pain points",
        tags: ["Prototyping", "AI/ML", "Product Design"],
        links: {
            demo: "https://www.canva.cn/design/DAGmeSztBwA/l51ub7KSROZJwPpLytOTfw/view?utm_content=DAGmeSztBwA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h03dfc7eeff"
        }
    }
];

// Get all unique tags
const allTags = [...new Set(allProjects.flatMap(p => p.tags))].sort();

// State
let currentFilters = {
    search: '',
    tags: [],
    sort: 'latest'
};

// Initialize page
function initProjectsPage() {
    renderTagFilters();
    renderProjects(allProjects);
    setupEventListeners();
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
    
    grid.innerHTML = projects.map(project => `
        <a href="project-detail.html?slug=${project.slug}" class="project-card ${project.featured ? 'featured' : ''} reveal">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-oneliner">${project.oneLiner}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <p class="project-outcome">${project.outcome}</p>
            <span class="project-view">View →</span>
        </a>
    `).join('');
    
    // Trigger reveal animation
    setTimeout(() => {
        grid.querySelectorAll('.reveal').forEach((el, idx) => {
            setTimeout(() => el.classList.add('active'), idx * 50);
        });
    }, 100);
}

// Filter and sort projects
function updateProjects() {
    let filtered = allProjects;
    
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
    switch(currentFilters.sort) {
        case 'latest':
            // Featured first, then by time
            filtered.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return 0;
            });
            break;
        case 'impact':
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
        case 'technical':
            filtered.sort((a, b) => {
                const techTags = ['AI/ML', 'Data Viz', 'Prototyping'];
                const aScore = a.tags.filter(t => techTags.includes(t)).length;
                const bScore = b.tags.filter(t => techTags.includes(t)).length;
                return bScore - aScore;
            });
            break;
    }
    
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
