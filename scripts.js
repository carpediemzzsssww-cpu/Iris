// ================================================
// Iris Zhou Portfolio - Main JavaScript
// ================================================
document.documentElement.classList.add('js');

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

function getPrimaryProjectLink(project) {
    if (!project || !project.links) return '#';
    return project.links.demo || project.links.figma || project.links.repo || '#';
}

const themePreferenceKey = 'themePreference';
const themeMediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
let manualThemePreference = getPreference(themePreferenceKey, null);
let activeTheme = resolveTheme(manualThemePreference);

function resolveTheme(preference) {
    if (preference === 'dark' || preference === 'light') {
        return preference;
    }
    return themeMediaQuery && themeMediaQuery.matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeToggleButtons(theme) {
    const themeButtons = document.querySelectorAll('[data-theme-toggle]');
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const label = `Switch to ${nextTheme} mode`;

    themeButtons.forEach(button => {
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
        button.setAttribute('aria-pressed', String(theme === 'dark'));

        const text = button.querySelector('[data-theme-toggle-text]');
        if (text) {
            text.textContent = label;
        }
    });
}

function setThemePreference(preference) {
    manualThemePreference = preference;
    savePreference(themePreferenceKey, preference);
    activeTheme = resolveTheme(preference);
    applyTheme(activeTheme);
    updateThemeToggleButtons(activeTheme);
}

function handleSystemThemeChange(event) {
    if (manualThemePreference === 'dark' || manualThemePreference === 'light') {
        return;
    }
    activeTheme = event.matches ? 'dark' : 'light';
    applyTheme(activeTheme);
    updateThemeToggleButtons(activeTheme);
}

applyTheme(activeTheme);
document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('[data-theme-toggle]');
    updateThemeToggleButtons(activeTheme);

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const next = activeTheme === 'dark' ? 'light' : 'dark';
            setThemePreference(next);
        });
    });
});

if (themeMediaQuery) {
    if (typeof themeMediaQuery.addEventListener === 'function') {
        themeMediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (typeof themeMediaQuery.addListener === 'function') {
        themeMediaQuery.addListener(handleSystemThemeChange);
    }
}

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
// Scroll Narrative: Hero Emergence Bloom
// ================================================
function setupHeroScrollNarrative() {
    const emergenceBlock = document.querySelector('.emergence-block');
    if (!emergenceBlock) return;

    const reducedMotionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    let isReducedMotion = reducedMotionQuery ? reducedMotionQuery.matches : false;
    let ticking = false;
    let rafId = 0;

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const applyNarrativeFrame = () => {
        if (isReducedMotion) return;

        const viewportHeight = Math.max(1, window.innerHeight || 1);
        const scrollProgress = clamp(window.scrollY / viewportHeight, 0, 1);
        const scale = 1 + scrollProgress * 0.5;
        const rotate = scrollProgress * 45;
        const opacity = 1 - scrollProgress;

        emergenceBlock.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
        emergenceBlock.style.opacity = String(opacity);
    };

    const queueNarrativeFrame = () => {
        if (isReducedMotion || ticking) return;
        ticking = true;
        rafId = window.requestAnimationFrame(() => {
            ticking = false;
            applyNarrativeFrame();
        });
    };

    const resetNarrativeStyles = () => {
        emergenceBlock.style.transform = '';
        emergenceBlock.style.opacity = '';
    };

    const handleReducedMotionChange = (event) => {
        isReducedMotion = event.matches;
        if (isReducedMotion) {
            window.cancelAnimationFrame(rafId);
            ticking = false;
            resetNarrativeStyles();
            return;
        }
        queueNarrativeFrame();
    };

    window.addEventListener('scroll', queueNarrativeFrame, { passive: true });
    window.addEventListener('resize', queueNarrativeFrame, { passive: true });

    if (reducedMotionQuery) {
        if (typeof reducedMotionQuery.addEventListener === 'function') {
            reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
        } else if (typeof reducedMotionQuery.addListener === 'function') {
            reducedMotionQuery.addListener(handleReducedMotionChange);
        }
    }

    queueNarrativeFrame();
}

document.addEventListener('DOMContentLoaded', setupHeroScrollNarrative);

// ================================================
// Butterfly Metaphor: Cursor Trail Particle Field
// ================================================
function setupButterflyTrail() {
    const particleField = document.querySelector('.particle-field');
    if (!particleField) return;

    const reducedMotionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const finePointerQuery = window.matchMedia ? window.matchMedia('(pointer: fine)') : null;
    if ((reducedMotionQuery && reducedMotionQuery.matches) || (finePointerQuery && !finePointerQuery.matches)) {
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.className = 'particle-trail-canvas';
    particleField.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let rafId = 0;
    let lastSpawnTime = 0;
    let lastX = null;
    let lastY = null;
    const maxParticles = 260;
    const particles = [];
    const moveEventName = 'PointerEvent' in window ? 'pointermove' : 'mousemove';

    const readAccentColor = () => {
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#0F766E';
        const normalized = accent.replace('#', '');
        if (!/^[0-9a-fA-F]{6}$/.test(normalized) && !/^[0-9a-fA-F]{3}$/.test(normalized)) {
            return { r: 15, g: 118, b: 110 };
        }
        const hex = normalized.length === 3
            ? normalized.split('').map(ch => ch + ch).join('')
            : normalized;
        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16)
        };
    };

    let accentRgb = readAccentColor();

    const resizeCanvas = () => {
        dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pushParticle = (x, y, vx, vy, drift) => {
        if (particles.length >= maxParticles) {
            particles.splice(0, particles.length - maxParticles + 1);
        }
        particles.push({
            x,
            y,
            vx,
            vy,
            drift,
            life: 1,
            decay: 0.016 + Math.random() * 0.014,
            size: 1.2 + Math.random() * 2.6
        });
    };

    const spawnTrail = (x, y, time) => {
        if (time - lastSpawnTime < 12) return;

        if (lastX !== null && lastY !== null) {
            const dx = x - lastX;
            const dy = y - lastY;
            if ((dx * dx + dy * dy) < 16) return;
        }

        lastSpawnTime = time;
        lastX = x;
        lastY = y;

        const wing = Math.sin(time * 0.02) * 6;
        pushParticle(
            x - wing,
            y + Math.cos(time * 0.015) * 3,
            -0.45 - Math.random() * 0.9,
            -0.4 - Math.random() * 1.3,
            -0.018 - Math.random() * 0.01
        );
        pushParticle(
            x + wing,
            y - Math.cos(time * 0.015) * 3,
            0.45 + Math.random() * 0.9,
            -0.4 - Math.random() * 1.3,
            0.018 + Math.random() * 0.01
        );
        pushParticle(
            x + (Math.random() - 0.5) * 2,
            y + (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 0.4,
            -0.2 - Math.random() * 0.6,
            (Math.random() - 0.5) * 0.006
        );
    };

    const drawParticle = (particle) => {
        const alpha = Math.max(0, particle.life) * 0.5;
        const radius = particle.size * (0.4 + particle.life * 1.1);
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, radius * 2.2);
        gradient.addColorStop(0, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${Math.min(0.9, alpha + 0.18)})`);
        gradient.addColorStop(1, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, radius * 2.2, 0, Math.PI * 2);
        ctx.fill();
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i -= 1) {
            const p = particles[i];
            p.life -= p.decay;
            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            p.x += p.vx;
            p.y += p.vy;
            p.vx = p.vx * 0.982 + p.drift;
            p.vy = p.vy * 0.982 + 0.006;

            drawParticle(p);
        }

        for (let i = 1; i < particles.length; i += 1) {
            const p1 = particles[i - 1];
            const p2 = particles[i];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distSq = dx * dx + dy * dy;
            if (distSq > 95 * 95) continue;

            const linkAlpha = Math.min(p1.life, p2.life) * 0.12;
            ctx.strokeStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${linkAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }

        rafId = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
        if (moveEventName === 'pointermove' && event.pointerType !== 'mouse') return;
        spawnTrail(event.clientX, event.clientY, performance.now());
    };

    const handleThemeMutation = () => {
        accentRgb = readAccentColor();
    };

    const mutationObserver = new MutationObserver(handleThemeMutation);
    mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener(moveEventName, handleMouseMove, { passive: true });
    rafId = window.requestAnimationFrame(animate);

    if (reducedMotionQuery) {
        const stopTrail = () => {
            if (!reducedMotionQuery.matches) return;
            window.removeEventListener(moveEventName, handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            mutationObserver.disconnect();
            window.cancelAnimationFrame(rafId);
            particles.length = 0;
            ctx.clearRect(0, 0, width, height);
            canvas.remove();
        };

        if (typeof reducedMotionQuery.addEventListener === 'function') {
            reducedMotionQuery.addEventListener('change', stopTrail);
        } else if (typeof reducedMotionQuery.addListener === 'function') {
            reducedMotionQuery.addListener(stopTrail);
        }
    }
}

document.addEventListener('DOMContentLoaded', setupButterflyTrail);

// ================================================
// Mobile Menu Toggle
// ================================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileDrawer = document.getElementById('mobileDrawer');

if (mobileMenuToggle && mobileDrawer) {
    const drawerOverlay = document.createElement('div');
    drawerOverlay.className = 'mobile-drawer-overlay';
    drawerOverlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(drawerOverlay);

    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');

    const closeMobileDrawer = () => {
        mobileDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('mobile-nav-open');
    };

    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('active');
        drawerOverlay.classList.toggle('active', isOpen);
        mobileMenuToggle.classList.toggle('active', isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
        mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
        document.body.classList.toggle('mobile-nav-open', isOpen);
    });

    drawerOverlay.addEventListener('click', closeMobileDrawer);

    mobileDrawer.addEventListener('click', (e) => {
        if (e.target.closest('.mobile-link')) {
            closeMobileDrawer();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileDrawer();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileDrawer();
        }
    }, { passive: true });
}

// ================================================
// Timeline Accordion
// ================================================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    const toggle = item.querySelector('.timeline-toggle');
    const details = item.querySelector('.timeline-details');

    if (toggle && details && !details.id) {
        details.id = `timeline-details-${index + 1}`;
    }

    if (toggle) {
        toggle.setAttribute('type', 'button');
        toggle.setAttribute('aria-expanded', 'false');
        if (details) {
            toggle.setAttribute('aria-controls', details.id);
            details.setAttribute('aria-hidden', 'true');
        }

        toggle.addEventListener('click', () => {
            const isExpanded = item.getAttribute('data-expanded') === 'true';
            item.setAttribute('data-expanded', !isExpanded);
            toggle.setAttribute('aria-expanded', String(!isExpanded));
            if (details) {
                details.setAttribute('aria-hidden', String(isExpanded));
            }
        });
    }
});

// ================================================
// Load Projects Grid
// ================================================
const projectsGrid = document.getElementById('projectsGrid');

if (projectsGrid) {
    const projectsToShow = projectsData.slice(0, 6);
    
    projectsGrid.innerHTML = projectsToShow.map(project => {
        const projectLink = getPrimaryProjectLink(project);
        const isExternal = /^https?:\/\//.test(projectLink);
        const externalAttrs = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';

        return `
        <a href="${projectLink}" class="project-card ${project.featured ? 'featured' : ''}" ${externalAttrs}>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-oneliner">${project.oneLiner}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <p class="project-outcome">${project.outcome}</p>
            <span class="project-view">View →</span>
        </a>
    `;
    }).join('');
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
    const normalizePath = (path) => {
        if (!path) return '/';
        const normalizedIndex = path.replace(/\/index\.html$/, '/');
        const normalizedTrailing = normalizedIndex.replace(/\/+$/, '');
        return normalizedTrailing || '/';
    };

    const currentPath = normalizePath(window.location.pathname);
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    navLinks.forEach(link => {
        const linkPath = normalizePath(new URL(link.href).pathname);
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

updateActiveNav();

// ================================================
// Project Card Micro Interactions
// ================================================
let immersiveProjectTransitionInProgress = false;

function resetProjectTransitionState() {
    immersiveProjectTransitionInProgress = false;
    document.body.classList.remove('project-transitioning');

    document.querySelectorAll('.project-card.is-fading-out, .project-card.is-transition-source').forEach(card => {
        card.classList.remove('is-fading-out', 'is-transition-source');
    });

    document.querySelectorAll('.project-transition-overlay, .project-transition-clone').forEach(node => {
        node.remove();
    });
}

function setupProjectCardMicroInteractions(scope = document) {
    const cards = scope.querySelectorAll('.project-card');
    const reducedMotionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

    const createProjectCardRipple = (card, clientX, clientY) => {
        const rect = card.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'card-ripple';

        const maxDiameter = Math.max(rect.width, rect.height) * 2.2;
        ripple.style.width = `${maxDiameter}px`;
        ripple.style.height = `${maxDiameter}px`;

        const originX = typeof clientX === 'number' ? clientX - rect.left : rect.width / 2;
        const originY = typeof clientY === 'number' ? clientY - rect.top : rect.height / 2;
        ripple.style.left = `${originX}px`;
        ripple.style.top = `${originY}px`;

        card.appendChild(ripple);
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        }, { once: true });
    };

    const startImmersiveProjectTransition = (card, href) => {
        if (!href || immersiveProjectTransitionInProgress) return;

        if (reducedMotionQuery && reducedMotionQuery.matches) {
            window.location.assign(href);
            return;
        }

        immersiveProjectTransitionInProgress = true;
        document.body.classList.add('project-transitioning');

        const allCards = Array.from(document.querySelectorAll('.project-card'));
        allCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.add('is-fading-out');
            }
        });
        card.classList.add('is-transition-source');

        const sourceRect = card.getBoundingClientRect();
        const clone = card.cloneNode(true);
        clone.classList.add('project-transition-clone');
        clone.setAttribute('aria-hidden', 'true');
        clone.style.left = `${sourceRect.left}px`;
        clone.style.top = `${sourceRect.top}px`;
        clone.style.width = `${sourceRect.width}px`;
        clone.style.height = `${sourceRect.height}px`;

        const overlay = document.createElement('div');
        overlay.className = 'project-transition-overlay';
        overlay.setAttribute('aria-hidden', 'true');

        document.body.appendChild(overlay);
        document.body.appendChild(clone);

        window.requestAnimationFrame(() => {
            overlay.classList.add('active');
            clone.classList.add('expanding');
            clone.style.left = '0px';
            clone.style.top = '0px';
            clone.style.width = '100vw';
            clone.style.height = '100vh';
        });

        const emergenceTimer = window.setTimeout(() => {
            overlay.classList.add('emerging');
            clone.classList.add('emerging');
        }, 600);

        const navigateTimer = window.setTimeout(() => {
            window.location.assign(href);
        }, 920);

        window.addEventListener('pagehide', () => {
            window.clearTimeout(emergenceTimer);
            window.clearTimeout(navigateTimer);
        }, { once: true });
    };

    cards.forEach(card => {
        if (card.dataset.microReady === 'true') return;
        card.dataset.microReady = 'true';

        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
        });

        card.addEventListener('pointerleave', () => {
            card.style.removeProperty('--glow-x');
            card.style.removeProperty('--glow-y');
        });

        card.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            createProjectCardRipple(card, e.clientX, e.clientY);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            createProjectCardRipple(card);
        });

        card.addEventListener('click', (e) => {
            const href = card.getAttribute('href');
            if (!href) return;
            const target = (card.getAttribute('target') || '').toLowerCase();

            const isHash = href.startsWith('#') || href.toLowerCase().startsWith('javascript:');
            const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
            const isPrimaryButton = e.button === 0;
            const isExplicitNewTab = target === '_blank';

            let resolvedUrl;
            try {
                resolvedUrl = new URL(href, window.location.href);
            } catch (error) {
                return;
            }

            const isWebProtocol = resolvedUrl.protocol === 'http:' || resolvedUrl.protocol === 'https:';
            const isSameOrigin = resolvedUrl.origin === window.location.origin;

            if (
                isHash ||
                isModified ||
                !isPrimaryButton ||
                isExplicitNewTab ||
                !isWebProtocol ||
                !isSameOrigin ||
                immersiveProjectTransitionInProgress
            ) {
                return;
            }

            e.preventDefault();
            startImmersiveProjectTransition(card, resolvedUrl.href);
        });
    });
}

window.addEventListener('pageshow', () => {
    if (
        immersiveProjectTransitionInProgress ||
        document.body.classList.contains('project-transitioning') ||
        document.querySelector('.project-transition-overlay') ||
        document.querySelector('.project-transition-clone')
    ) {
        resetProjectTransitionState();
    }
});

setupProjectCardMicroInteractions();

// ================================================
// Copy to Clipboard Helper (for future use in Learning page)
// ================================================
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = 'var(--accent-soft)';
        button.style.color = 'var(--success)';
        
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
    getPreference,
    setupProjectCardMicroInteractions
};

// ================================================
// Console Easter Egg
// ================================================
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #0F766E;');
console.log('%cInterested in how this site was built?', 'font-size: 14px; color: #666;');
console.log('%cCheck out the code: https://github.com/iriszhou/portfolio', 'font-size: 14px; color: #0F766E;');
