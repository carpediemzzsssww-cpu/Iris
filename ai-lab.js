// ================================================
// AI Lab JavaScript
// ================================================

const aiLabData = {
    gallery: [
        {
            id: 1,
            title: "Surreal Butterfly Dream",
            goal: "Dream-like symbolic visual narrative",
            prompt: "Create a surreal dream sequence where butterflies burst outward in a particle dispersion bloom, now infused with dream logic, dopamine color styling, Y2K glitch aesthetics, vaporwave atmosphere, and acid-surreal painterly textures.",
            model: "Midjourney v7",
            date: "2026-02-10",
            image: "./assets/ai-lab/surreal-butterflies.png"
        },
        {
            id: 2,
            title: "Multi-layer Architecture",
            goal: "Complex spatial imagination",
            prompt: "An extraordinarily complex multi-level architectural greenhouse, a colossal glass sunroom transformed into a living ecosystem palace. Intricate layered structure with floating walkways, split-level conservatories, spiral ramps, suspended gardens, and vertical water channels. Curved low-iron glass facades interwoven with delicate metal ribs, casting prismatic sunlight patterns across stone floors. A monumental central mother tree rises through multiple stories, fused with steel framework, supporting translucent platforms covered in moss, ferns, orchids, climbing vines, and lush tropical foliage. Indoor microclimates with soft mist, rain chains, cascading water walls, mirror pools, and thin waterfalls connecting different heights. Hyper-detailed interior objects: botanical specimen cabinets, handwritten plant labels, brass mist valves, antique astronomical clocks, ceramic pots, woven lanterns, reclaimed wood benches. Atmosphere of biophilic futurism + Victorian conservatory + subtle steampunk craftsmanship. Golden volumetric daylight, rich green reflections, cinematic depth, ultra-detailed textures, grand scale, elegant spatial hierarchy, immersive composition, architectural visualization, 8k, photoreal, masterpiece. --ar 2:3 --profile o2dyims",
            model: "Midjourney v7",
            date: "2026-02-10",
            image: "./assets/ai-lab/complex-architecture.png"
        },
        {
            id: 3,
            title: "Young Girl Portrait",
            goal: "Character portrait study",
            prompt: "A young girl with auburn curly hair, soft freckles, and luminous eyes, wearing an enchanted forest-inspired outfit: layered moss-green and earthy brown fabrics, leaf embroidery, delicate lace, tiny floral details, and handmade leather accessories. She has an ethereal, elf-like presence--graceful, playful, and mysterious. Standing in a misty woodland with filtered golden light through tall trees, floating dust particles, wildflowers, mushrooms, and glowing fireflies. Cinematic fantasy style, whimsical mood, ultra-detailed textures, natural skin, soft volumetric lighting, shallow depth of field, magical realism, dreamy color grading. --profile o2dyims",
            model: "Midjourney v7",
            date: "2026-02-01",
            image: "./assets/ai-lab/young-girl-portrait.png"
        },
        {
            id: 4,
            title: "Yellow Cottage in Forest",
            goal: "Fairy-tale environment concept",
            prompt: "A warm yellow cottage hidden in a dark green forest, dense canopy blocking most of the sky, only scattered light rays filtering through leaves onto moss-covered ground. The cottage has weathered wooden walls, textured details, glowing honey-colored windows, and a cozy golden light spilling from the doorway. Around the stone steps: ferns, tiny white wildflowers, mushrooms, damp soil, thin mist, floating dust particles. A girl is playing with her kitten at the front door, crouching with a gentle smile as the kitten jumps toward a ribbon toy, tail raised. Her dress edge touches grass, slight mud on her shoes, natural candid motion. Strong cool-warm contrast: deep emerald and teal shadows in the forest, soft amber glow around the cottage and characters. Whimsical, fairy-tale, cinematic, atmospheric, ultra-detailed, storybook realism, volumetric light, shallow depth of field. --ar 3:2 --profile pxm2t38",
            model: "Midjourney v7",
            date: "2026-02-10",
            image: "./assets/ai-lab/yellow-cottage-forest.png"
        },
        {
            id: 5,
            title: "Floating Cloud House",
            goal: "Whimsical sky-home concept",
            prompt: "A tiny cozy house floating above the clouds, suspended by many colorful balloons in different sizes, bright rainbow palette, soft sunlight, dreamy sky, whimsical fairy-tale mood, fluffy clouds, gentle wind, magical atmosphere, cinematic composition, highly detailed, storybook style. --ar 3:4 --profile pxm2t38",
            model: "Midjourney v7",
            date: "2026-02-05",
            image: "./assets/ai-lab/floating-cloud-house.png"
        },
        {
            id: 6,
            title: "Whimsical Park Walk",
            goal: "Gentle surreal daily scene",
            prompt: "A girl walking in a park, whimsical and slightly surreal yet warm, fairy-tale atmosphere. Lush vivid green grass like velvet, subtly distorted storybook trees, soft golden-peach sunset light, tiny floating light particles in the air. A Ferris wheel in the background, slowly turning, with glowing candy-like cabins and a gentle vintage touch. Cozy magical mood, dreamy but comforting, cinematic composition, soft volumetric light, rich details, storybook realism. --ar 16:9 --profile o2hm7ab",
            model: "Midjourney v7",
            date: "2026-02-09",
            image: "./assets/ai-lab/whimsical-park-walk.png"
        },
        {
            id: 7,
            title: "Love",
            goal: "In a fixed stylistic framework, the interpretation and visualization of abstract concepts",
            prompt: "love --chaos 5 --ar 2:3 --profile kktzzkb",
            model: "Midjourney v7",
            date: "2026-02-09",
            image: "./assets/ai-lab/love.png"
        }
    ],

    featuredExperiment: {
        label: "Featured Project",
        title: "DELAY THE END",
        subtitle: "A Fan-made Narrative Strategy Web Game",
        stats: "7 rounds · 5 endings · 18 playtesters · Bilingual",
        quote: "\"You cannot stop what is written. You can only delay it.\"",
        coverImage: "assets/project-covers/ai-lab/delay-the-end-cover.webp",
        tags: ["Narrative Design", "Systems Design", "Monte Carlo", "Vanilla JS", "Bilingual"],
        links: {
            game: "https://carpediemzzsssww-cpu.github.io/delay-the-end/",
            caseStudy: "https://delay-the-end-website.vercel.app"
        }
    },

    experiments: [
        {
            slug: "design-critique-agent",
            title: "AI Design Critique Agent",
            goal: "Build an agent that provides structured feedback on UI designs",
            setup: "Using Claude API with custom prompt engineering. Fed with design principles, WCAG guidelines, and examples of good/bad design patterns.",
            result: "70% accuracy in identifying usability issues. Particularly good at catching accessibility violations and inconsistent spacing. Struggles with subjective aesthetic judgments.",
            next: "Add multi-modal analysis (screenshots + Figma API). Train on my past design critiques to match my voice.",
            tags: ["Design", "Claude API", "Automation"],
            githubLink: "https://github.com/iriszhou/design-critique-agent"
        },
        {
            slug: "user-interview-synthesizer",
            title: "Interview Transcript Synthesizer",
            goal: "Automatically extract insights from user research transcripts",
            setup: "RAG pipeline: Transcripts → Embeddings (OpenAI) → Vector DB (FAISS) → Synthesis prompt (Claude). Queries: pain points, quotes, opportunities.",
            result: "Saves ~2 hours per interview synthesis. Maintains 85% accuracy vs. manual analysis. Great at finding cross-interview patterns.",
            next: "Add sentiment analysis. Integrate with Dovetail for seamless workflow.",
            tags: ["Research", "RAG", "NLP"],
            githubLink: "https://github.com/iriszhou/interview-synthesizer"
        },
        {
            slug: "competitive-analysis-dashboard",
            title: "AI-Powered Competitive Analysis",
            goal: "Track competitor product updates automatically",
            setup: "Web scraper + Claude for summarization. Monitors changelogs, release notes, blog posts. Generates weekly digest with categorized updates.",
            result: "Monitors 12 competitors. Catches 90% of significant updates. Reduced manual monitoring from 5 hours/week to 30 min review.",
            next: "Add visual diff for UI changes. Email alerts for high-priority updates.",
            tags: ["Strategy", "Automation", "Web Scraping"],
            githubLink: "https://github.com/iriszhou/comp-tracker"
        },
        {
            slug: "figma-variable-generator",
            title: "Design Token Generator",
            goal: "Convert Figma variables to code (CSS, Swift, Kotlin)",
            setup: "Figma Plugin API → LLM for format conversion → Multi-platform output. Uses Claude to intelligently map design tokens to platform conventions.",
            result: "Supports 5 platforms. Reduces token setup from 2 days to 15 minutes. Adopted by 3 teams at my company.",
            next: "Add validation layer. Generate type definitions for TypeScript.",
            tags: ["Design Systems", "Tooling", "Figma"],
            githubLink: "https://github.com/iriszhou/token-generator"
        },
        {
            slug: "context-aware-search",
            title: "Context-Aware Project Search",
            goal: "Semantic search across all my design files, notes, and docs",
            setup: "Embeddings for all content (Figma descriptions, Notion pages, code comments). Hybrid search: keyword + semantic similarity.",
            result: "10x faster than manual searching. Surfaces connections I didn't know existed. Helps with 'I saw something like this before...' moments.",
            next: "Add temporal context (when did I work on this?). Integrate with browser history.",
            tags: ["Search", "Embeddings", "Productivity"],
            githubLink: "https://github.com/iriszhou/semantic-search"
        },
        {
            slug: "prp-generator",
            title: "PRD Generator from Sketches",
            goal: "Convert whiteboard sketches into structured PRDs",
            setup: "GPT-4 Vision to interpret hand-drawn diagrams. Extracts user flows, features, edge cases. Generates Markdown PRD with placeholders for details.",
            result: "Great for rapid ideation → documentation. 60% complete PRD from a 10-minute sketch. Still requires human editing.",
            next: "Add voice input for context. Generate technical requirements section.",
            tags: ["Product", "GPT-4V", "Documentation"],
            githubLink: "https://github.com/iriszhou/prd-generator"
        }
    ],

    ideas: [
        {
            id: 1,
            title: "Progressive Disclosure in AI Interfaces",
            content: "Most AI tools dump all capabilities upfront ('I can do X, Y, Z...'). What if interfaces revealed capabilities progressively based on user expertise? Beginners see 3 core actions. Power users unlock advanced features through use.",
            tags: ["UX", "AI", "Design Patterns"],
            pinned: true,
            date: "2024-02-20"
        },
        {
            id: 2,
            title: "The 'Undo' Problem for AI Actions",
            content: "Traditional software: Undo is trivial. AI agents: How do you undo an email sent, a calendar invite accepted, a file deleted? We need new interaction patterns for AI that acts on your behalf. Maybe: preview mode by default, confirmation for irreversible actions.",
            tags: ["AI", "UX", "Trust"],
            pinned: true,
            date: "2024-02-18"
        },
        {
            id: 3,
            title: "AI Confidence as a Design Material",
            content: "AI systems have varying confidence in their outputs. Most UIs hide this. What if we designed with confidence as a first-class element? High confidence = direct answer. Medium = show alternatives. Low = 'I'm not sure, here's my reasoning.'",
            tags: ["AI", "Design", "Trust"],
            pinned: false,
            date: "2024-02-15"
        },
        {
            id: 4,
            title: "Prompt Engineering as Product Design",
            content: "Writing prompts isn't just engineering—it's UX design. The prompt shapes user expectations, defines interaction patterns, and sets boundaries. Good prompts: set clear scope, provide examples, allow progressive complexity.",
            tags: ["AI", "Product", "UX"],
            pinned: false,
            date: "2024-02-10"
        },
        {
            id: 5,
            title: "Designing for 'AI Surprise'",
            content: "Sometimes AI outputs surprise us positively (novel insight). Sometimes negatively (hallucination). How do we design systems that maximize good surprise while minimizing bad? Maybe: sandbox mode for exploration, validation layer for production.",
            tags: ["AI", "Design", "Trust"],
            pinned: false,
            date: "2024-02-05"
        },
        {
            id: 6,
            title: "The Portfolio Problem for AI Products",
            content: "How do you showcase AI product work when outputs are non-deterministic? Traditional portfolios show 'the design.' AI portfolios need to show: prompt evolution, failure modes, edge cases, how you tuned behavior. New format needed.",
            tags: ["Career", "AI", "Portfolio"],
            pinned: false,
            date: "2024-01-30"
        },
        {
            id: 7,
            title: "Multi-Agent Collaboration Patterns",
            content: "Future: Multiple AI agents working together. Design challenge: How do users understand agent relationships? Who's responsible when things go wrong? Potential pattern: Agent 'introduction' flow showing roles and capabilities upfront.",
            tags: ["AI", "Systems", "Future"],
            pinned: false,
            date: "2024-01-25"
        },
        {
            id: 8,
            title: "Voice as the New Wireframe",
            content: "With AI, you can prototype interactions through conversation before building UI. 'Show me a dashboard for this data' → iterate through voice → only then design visual interface. Voice-first prototyping could be huge for speed.",
            tags: ["Voice", "Prototyping", "Process"],
            pinned: false,
            date: "2024-01-20"
        }
    ]
};

// ================================================
// Rendering Functions
// ================================================

function renderGalleryItem(item) {
    const thumbImage = item.thumbnail || item.image;
    return `
        <button class="gallery-item" type="button" data-gallery-id="${item.id}" aria-label="Open ${item.title} in lightbox">
            <div class="gallery-placeholder">
                <img src="${thumbImage}" alt="${item.title}" class="gallery-img" loading="lazy" decoding="async" />
            </div>
            <div class="gallery-overlay">
                <div class="gallery-overlay-title">${item.title}</div>
                <div class="gallery-overlay-desc">${item.model} • ${item.date}</div>
            </div>
        </button>
    `;
}

function renderExperimentCard(exp) {
    return `
        <div class="learning-card">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${exp.title}</h3>
                ${exp.githubLink ? `
                    <a href="${exp.githubLink}" class="btn btn-ghost" style="padding: 6px 12px; font-size: 13px;" target="_blank" rel="noopener noreferrer">
                        GitHub →
                    </a>
                ` : ''}
            </div>
            
            <div style="margin: 16px 0;">
                <p style="font-size: 13px; color: var(--muted); margin-bottom: 4px;"><strong>Goal:</strong></p>
                <p style="font-size: 14px; color: var(--text); margin-bottom: 12px;">${exp.goal}</p>
                
                <p style="font-size: 13px; color: var(--muted); margin-bottom: 4px;"><strong>Setup:</strong></p>
                <p style="font-size: 14px; color: var(--text); margin-bottom: 12px;">${exp.setup}</p>
                
                <p style="font-size: 13px; color: var(--muted); margin-bottom: 4px;"><strong>Result:</strong></p>
                <p style="font-size: 14px; color: var(--text); margin-bottom: 12px; padding: 12px; background: var(--accent-soft); border-radius: 6px;">${exp.result}</p>
                
                <p style="font-size: 13px; color: var(--muted); margin-bottom: 4px;"><strong>Next Steps:</strong></p>
                <p style="font-size: 14px; color: var(--muted);">${exp.next}</p>
            </div>
            
            <div class="project-tags">
                ${exp.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

function renderFeaturedExperimentCard(item) {
    const hasCoverImage = Boolean(item.coverImage);
    const safeCoverImage = hasCoverImage ? item.coverImage.replace(/'/g, '%27') : '';
    const cardStyle = hasCoverImage ? `style="--featured-cover-image: url('${safeCoverImage}');"` : '';

    return `
        <article class="learning-card featured-experiment-card ${hasCoverImage ? 'has-cover' : ''}" ${cardStyle}>
            <span class="featured-experiment-media" aria-hidden="true"></span>
            <span class="featured-experiment-overlay" aria-hidden="true"></span>
            <div class="featured-experiment-label">★ ${item.label}</div>
            <h3 class="featured-experiment-title">${item.title}</h3>
            <p class="featured-experiment-subtitle">${item.subtitle}</p>
            <p class="featured-experiment-stats">${item.stats}</p>
            <blockquote class="featured-experiment-quote">${item.quote}</blockquote>
            <div class="featured-experiment-actions">
                <a href="${item.links.game}" class="featured-experiment-action" target="_blank" rel="noopener noreferrer">Play the Game →</a>
                <a href="${item.links.caseStudy}" class="featured-experiment-action" target="_blank" rel="noopener noreferrer">View Case Study →</a>
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
    return `
        <div class="learning-card" style="${idea.pinned ? 'border: 2px solid var(--accent);' : ''}">
            <div class="learning-card-header">
                <h3 class="learning-card-title">
                    ${idea.pinned ? '📌 ' : ''}${idea.title}
                </h3>
                <span style="font-size: 12px; color: var(--muted);">${idea.date}</span>
            </div>
            <p class="learning-card-summary" style="font-size: 14px; line-height: 1.6; margin: 12px 0;">
                ${idea.content}
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

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxInfo = document.getElementById('lightboxInfo');
    if (!lightbox || !lightboxImage || !lightboxInfo) return;

    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    lightboxImage.innerHTML = `
  <img src="${fullImage}" alt="${item.title}" class="lightbox-img" />
`;

    lightboxInfo.innerHTML = `
        <h3 id="lightboxTitle" style="font-family: var(--font-display); font-size: 24px; margin-bottom: 12px;">${item.title}</h3>
        <p style="font-size: 14px; color: var(--muted); margin-bottom: 16px;">
            <strong>Model:</strong> ${item.model}<br>
            <strong>Date:</strong> ${item.date}
        </p>
        <div style="margin-bottom: 16px;">
            <p style="font-size: 13px; color: var(--muted); margin-bottom: 8px;"><strong>Goal:</strong></p>
            <p style="font-size: 14px; line-height: 1.6;">${item.goal || ''}</p>
        </div>
        <div style="margin-bottom: 16px;">
            <p style="font-size: 13px; color: var(--muted); margin-bottom: 8px;"><strong>Prompt:</strong></p>
            <div style="background: var(--surface-soft); padding: 12px; border-radius: 6px; font-size: 13px; line-height: 1.6;">
                ${item.prompt || ''}
            </div>
        </div>
        <button class="copy-button" onclick="copyPromptFromLightbox(\`${(item.prompt || '').replace(/`/g, '\\`')}\`, this)" style="width: 100%; margin-top: 16px;">
            Copy Prompt
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

function initAILabPage() {
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
