// ================================================
// Iris Zhou Portfolio - Main JavaScript
// ================================================

// ================================================
// Sample Data (In production, load from JSON files)
// ================================================
const projectsData = [
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
    }
];

// ================================================
// Intersection Observer for Reveal Animation
// ================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with reveal class
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});

// ================================================
// Mobile Menu Toggle
// ================================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileDrawer = document.getElementById('mobileDrawer');

if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileDrawer.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileDrawer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileDrawer.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ================================================
// Timeline Accordion
// ================================================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    const toggle = item.querySelector('.timeline-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const isExpanded = item.getAttribute('data-expanded') === 'true';
            item.setAttribute('data-expanded', !isExpanded);
        });
    }
});

// ================================================
// Load Projects Grid
// ================================================
const projectsGrid = document.getElementById('projectsGrid');

if (projectsGrid) {
    const projectsToShow = projectsData.slice(0, 6);
    
    projectsGrid.innerHTML = projectsToShow.map(project => `
        <a href="project-detail.html?slug=${project.slug}" class="project-card ${project.featured ? 'featured' : ''}">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-oneliner">${project.oneLiner}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <p class="project-outcome">${project.outcome}</p>
            <span class="project-view">View →</span>
        </a>
    `).join('');
}

// ================================================
// Profile Card Hover Effects
// ================================================
const profileCards = document.querySelectorAll('.profile-card');

profileCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Create subtle path line effect
        const paths = createPathEffect(card);
        card.appendChild(paths);
    });
    
    card.addEventListener('mouseleave', () => {
        const paths = card.querySelector('.hover-paths');
        if (paths) paths.remove();
    });
});

function createPathEffect(element) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'hover-paths');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.opacity = '0.3';
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '10%');
    line.setAttribute('y1', '90%');
    line.setAttribute('x2', '90%');
    line.setAttribute('y2', '10%');
    line.setAttribute('stroke', 'rgba(15, 118, 110, 0.6)');
    line.setAttribute('stroke-width', '1');
    
    svg.appendChild(line);
    
    // Animate the line
    setTimeout(() => {
        line.style.transition = 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
        line.setAttribute('x1', '5%');
        line.setAttribute('y1', '95%');
        line.setAttribute('x2', '95%');
        line.setAttribute('y2', '5%');
    }, 10);
    
    return svg;
}

// ================================================
// Smooth Scroll for Anchor Links
// ================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================================
// Active Navigation Highlight
// ================================================
function updateActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath.endsWith('index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

updateActiveNav();

// ================================================
// Project Card Hover Trail Effect
// ================================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        // The trail effect is handled by CSS ::before pseudo-element
        // This just ensures the animation triggers
        this.style.setProperty('--mouse-x', e.offsetX + 'px');
        this.style.setProperty('--mouse-y', e.offsetY + 'px');
    });
});

// ================================================
// Copy to Clipboard Helper (for future use in Learning page)
// ================================================
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = 'rgba(16, 185, 129, 0.1)';
        button.style.color = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ================================================
// Form Validation Helper (for future contact forms)
// ================================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ================================================
// Local Storage Helper (for theme preferences)
// ================================================
function savePreference(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('LocalStorage not available');
    }
}

function getPreference(key, defaultValue) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

// ================================================
// Search and Filter Helpers (for Projects/Learning/AI Lab pages)
// ================================================
function filterItems(items, searchTerm, selectedTags) {
    return items.filter(item => {
        const matchesSearch = !searchTerm || 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.oneLiner.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesTags = selectedTags.length === 0 || 
            selectedTags.some(tag => item.tags.includes(tag));
        
        return matchesSearch && matchesTags;
    });
}

function sortItems(items, sortBy) {
    const sorted = [...items];
    
    switch(sortBy) {
        case 'latest':
            // Assuming items have a date field
            return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'impact':
            // Sort by featured status or custom impact score
            return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        case 'technical':
            // Custom sorting logic
            return sorted;
        default:
            return sorted;
    }
}

// ================================================
// Debounce Helper for Search Input
// ================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ================================================
// Performance: Lazy Load Images
// ================================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ================================================
// Analytics Helper (placeholder for future integration)
// ================================================
function trackEvent(eventName, properties = {}) {
    // Integration with analytics service
    console.log('Event tracked:', eventName, properties);
}

// Track page view
trackEvent('page_view', {
    page: window.location.pathname,
    title: document.title
});

// ================================================
// Export for use in other modules
// ================================================
window.portfolioUtils = {
    copyToClipboard,
    validateEmail,
    filterItems,
    sortItems,
    debounce,
    trackEvent,
    savePreference,
    getPreference
};

// ================================================
// Console Easter Egg
// ================================================
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #0F766E;');
console.log('%cInterested in how this site was built?', 'font-size: 14px; color: #666;');
console.log('%cCheck out the code: https://github.com/iriszhou/portfolio', 'font-size: 14px; color: #0F766E;');
