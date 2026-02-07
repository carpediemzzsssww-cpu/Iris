// ================================================
// Projects Page JavaScript
// ================================================

const allProjects = [
    {
        slug: "ai-design-assistant",
        title: "AI Design Assistant",
        oneLiner: "Intelligent tool that suggests design improvements in real-time",
        featured: true,
        role: "Product Designer",
        time: "Fall 2024",
        outcome: "34% faster design iterations, 5,000+ weekly users",
        tags: ["AI/ML", "Product Design", "Prototyping"],
        links: {
            demo: "https://demo.example.com",
            figma: "https://figma.com/@iris",
            repo: "https://github.com/iris/ai-assistant"
        }
    },
    {
        slug: "healthcare-dashboard",
        title: "Healthcare Analytics Dashboard",
        oneLiner: "Data visualization system for medical professionals",
        featured: true,
        role: "UX Designer & Researcher",
        time: "Summer 2024",
        outcome: "Reduced diagnosis time by 22%, deployed in 3 hospitals",
        tags: ["Data Viz", "Healthcare", "Research"],
        links: {
            figma: "https://figma.com/@iris"
        }
    },
    {
        slug: "student-scheduling",
        title: "Smart Course Scheduler",
        oneLiner: "ML-powered scheduling assistant for college students",
        featured: true,
        role: "Founder & Designer",
        time: "Spring 2024",
        outcome: "2,000+ students onboarded, 4.8/5 rating",
        tags: ["Mobile", "AI/ML", "Startup"],
        links: {
            demo: "https://scheduler.example.com"
        }
    },
    {
        slug: "design-system",
        title: "Component Design System",
        oneLiner: "Scalable design system with accessibility guidelines",
        featured: false,
        role: "Design Lead",
        time: "Winter 2024",
        outcome: "Adopted by 6 product teams, 50% faster prototyping",
        tags: ["Design Systems", "Figma", "Documentation"],
        links: {
            figma: "https://figma.com/@iris"
        }
    },
    {
        slug: "voice-interface",
        title: "Voice Navigation Prototype",
        oneLiner: "Hands-free interface for accessibility",
        featured: false,
        role: "Interaction Designer",
        time: "Fall 2023",
        outcome: "Improved accessibility score by 45%",
        tags: ["Accessibility", "Voice UI", "Prototyping"],
        links: {
            demo: "https://voice.example.com"
        }
    },
    {
        slug: "community-platform",
        title: "Student Community Hub",
        oneLiner: "Social platform connecting students across campus",
        featured: false,
        role: "Product Designer",
        time: "Spring 2023",
        outcome: "800+ active users, 60% monthly retention",
        tags: ["Social", "Mobile", "Community"],
        links: {
            demo: "https://community.example.com"
        }
    },
    {
        slug: "research-tool",
        title: "User Research Repository",
        oneLiner: "Centralized system for storing and analyzing user insights",
        featured: false,
        role: "UX Researcher",
        time: "Winter 2023",
        outcome: "50+ studies documented, adopted by research team",
        tags: ["Research", "Data", "Documentation"],
        links: {}
    },
    {
        slug: "mobile-app",
        title: "Fitness Tracking App",
        oneLiner: "Gamified fitness app with social challenges",
        featured: false,
        role: "Product Designer",
        time: "Summer 2023",
        outcome: "1,200+ downloads, 4.6 App Store rating",
        tags: ["Mobile", "Health", "Gamification"],
        links: {
            demo: "https://fitness.example.com"
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
