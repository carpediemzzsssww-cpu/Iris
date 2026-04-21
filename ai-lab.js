// ================================================
// AI Lab JavaScript
// ================================================

const aiLabData = {
    gallery: [
        {
            id: 1,
            title: "Surreal Butterfly Dream",
            title_zh: "\u8d85\u73b0\u5b9e\u8776\u68a6",
            goal: "Dream-like symbolic visual narrative",
            goal_zh: "\u68a6\u4e00\u6837\u7684\u89c6\u89c9\u53d9\u4e8b",
            prompt: "Create a surreal dream sequence where butterflies burst outward in a particle dispersion bloom, now infused with dream logic, dopamine color styling, Y2K glitch aesthetics, vaporwave atmosphere, and acid-surreal painterly textures.",
            model: "Midjourney v7",
            date: "2026-02-10",
            image: "./assets/ai-lab/surreal-butterflies.png"
        },
        {
            id: 2,
            title: "Multi-layer Architecture",
            title_zh: "\u591a\u5c42\u5efa\u7b51",
            goal: "Complex spatial imagination",
            goal_zh: "\u590d\u6742\u7a7a\u95f4\u7684\u60f3\u8c61\u529b\u5b9e\u9a8c",
            prompt: "An extraordinarily complex multi-level architectural greenhouse, a colossal glass sunroom transformed into a living ecosystem palace. Intricate layered structure with floating walkways, split-level conservatories, spiral ramps, suspended gardens, and vertical water channels. Curved low-iron glass facades interwoven with delicate metal ribs, casting prismatic sunlight patterns across stone floors. A monumental central mother tree rises through multiple stories, fused with steel framework, supporting translucent platforms covered in moss, ferns, orchids, climbing vines, and lush tropical foliage. Indoor microclimates with soft mist, rain chains, cascading water walls, mirror pools, and thin waterfalls connecting different heights. Hyper-detailed interior objects: botanical specimen cabinets, handwritten plant labels, brass mist valves, antique astronomical clocks, ceramic pots, woven lanterns, reclaimed wood benches. Atmosphere of biophilic futurism + Victorian conservatory + subtle steampunk craftsmanship. Golden volumetric daylight, rich green reflections, cinematic depth, ultra-detailed textures, grand scale, elegant spatial hierarchy, immersive composition, architectural visualization, 8k, photoreal, masterpiece. --ar 2:3 --profile o2dyims",
            model: "Midjourney v7",
            date: "2026-02-10",
            image: "./assets/ai-lab/complex-architecture.png"
        },
        {
            id: 3,
            title: "Young Girl Portrait",
            title_zh: "\u5c11\u5973\u7684\u50cf",
            goal: "Character portrait study",
            goal_zh: "\u4eba\u7269\u8096\u50cf\u7ec3\u4e60",
            prompt: "A young girl with auburn curly hair, soft freckles, and luminous eyes, wearing an enchanted forest-inspired outfit: layered moss-green and earthy brown fabrics, leaf embroidery, delicate lace, tiny floral details, and handmade leather accessories. She has an ethereal, elf-like presence--graceful, playful, and mysterious. Standing in a misty woodland with filtered golden light through tall trees, floating dust particles, wildflowers, mushrooms, and glowing fireflies. Cinematic fantasy style, whimsical mood, ultra-detailed textures, natural skin, soft volumetric lighting, shallow depth of field, magical realism, dreamy color grading. --profile o2dyims",
            model: "Midjourney v7",
            date: "2026-02-01",
            image: "./assets/ai-lab/young-girl-portrait.png"
        },
        {
            id: 4,
            title: "Yellow Cottage in Forest",
            title_zh: "\u68ee\u6797\u4e2d\u7684\u9ec4\u8272\u5c0f\u5c4b",
            goal: "Fairy-tale environment concept",
            goal_zh: "\u7ae5\u8bdd\u611f\u7684\u573a\u666f\u6982\u5ff5",
            prompt: "A warm yellow cottage hidden in a dark green forest, dense canopy blocking most of the sky, only scattered light rays filtering through leaves onto moss-covered ground. The cottage has weathered wooden walls, textured details, glowing honey-colored windows, and a cozy golden light spilling from the doorway. Around the stone steps: ferns, tiny white wildflowers, mushrooms, damp soil, thin mist, floating dust particles. A girl is playing with her kitten at the front door, crouching with a gentle smile as the kitten jumps toward a ribbon toy, tail raised. Her dress edge touches grass, slight mud on her shoes, natural candid motion. Strong cool-warm contrast: deep emerald and teal shadows in the forest, soft amber glow around the cottage and characters. Whimsical, fairy-tale, cinematic, atmospheric, ultra-detailed, storybook realism, volumetric light, shallow depth of field. --ar 3:2 --profile pxm2t38",
            model: "Midjourney v7",
            date: "2026-02-10",
            image: "./assets/ai-lab/yellow-cottage-forest.png"
        },
        {
            id: 5,
            title: "Floating Cloud House",
            title_zh: "\u6d6e\u4e91\u5c0f\u5c4b",
            goal: "Whimsical sky-home concept",
            goal_zh: "\u5947\u5e7b\u98ce\u683c\u7684\u7a7a\u4e2d\u5c0f\u5c4b",
            prompt: "A tiny cozy house floating above the clouds, suspended by many colorful balloons in different sizes, bright rainbow palette, soft sunlight, dreamy sky, whimsical fairy-tale mood, fluffy clouds, gentle wind, magical atmosphere, cinematic composition, highly detailed, storybook style. --ar 3:4 --profile pxm2t38",
            model: "Midjourney v7",
            date: "2026-02-05",
            image: "./assets/ai-lab/floating-cloud-house.png"
        },
        {
            id: 6,
            title: "Whimsical Park Walk",
            title_zh: "\u68a6\u5e7b\u516c\u56ed\u6f2b\u6b65",
            goal: "Gentle surreal daily scene",
            goal_zh: "\u6e29\u67d4\u7684\u3001\u5e26\u70b9\u8d85\u73b0\u5b9e\u7684\u65e5\u5e38",
            prompt: "A girl walking in a park, whimsical and slightly surreal yet warm, fairy-tale atmosphere. Lush vivid green grass like velvet, subtly distorted storybook trees, soft golden-peach sunset light, tiny floating light particles in the air. A Ferris wheel in the background, slowly turning, with glowing candy-like cabins and a gentle vintage touch. Cozy magical mood, dreamy but comforting, cinematic composition, soft volumetric light, rich details, storybook realism. --ar 16:9 --profile o2hm7ab",
            model: "Midjourney v7",
            date: "2026-02-09",
            image: "./assets/ai-lab/whimsical-park-walk.png"
        },
        {
            id: 7,
            title: "Love",
            title_zh: "\u7231",
            goal: "In a fixed stylistic framework, the interpretation and visualization of abstract concepts",
            goal_zh: "\u5728\u56fa\u5b9a\u98ce\u683c\u91cc\u770b\u770b\u62bd\u8c61\u6982\u5ff5\u80fd\u53d8\u6210\u4ec0\u4e48",
            prompt: "love --chaos 5 --ar 2:3 --profile kktzzkb",
            model: "Midjourney v7",
            date: "2026-02-09",
            image: "./assets/ai-lab/love.png"
        }
    ],

    featuredExperiment: {
        label: "Featured Project",
        label_zh: "\u4ee3\u8868\u9879\u76ee",
        title: "DELAY THE END",
        title_zh: "DELAY THE END",
        subtitle: "A Fan-made Narrative Strategy Web Game",
        subtitle_zh: "\u7c89\u4e1d\u81ea\u5236\u7684\u53d9\u4e8b\u7b56\u7565\u7f51\u9875\u6e38\u620f",
        stats: "7 rounds \u00b7 5 endings \u00b7 18 playtesters \u00b7 Bilingual",
        stats_zh: "7 \u8f6e\u535a\u5f08 \u00b7 5 \u4e2a\u7ed3\u5c40 \u00b7 18 \u4eba\u6d4b\u8bd5 \u00b7 \u4e2d\u82f1\u53cc\u8bed",
        quote: "\"You cannot stop what is written. You can only delay it.\"",
        quote_zh: "\"\u5df2\u5199\u597d\u7684\u547d\u8fd0\u65e0\u6cd5\u963b\u6b62\uff0c\u4f60\u53ea\u80fd\u5ef6\u7f13\u5b83\u3002\"",
        gameLinkText: "Play the Game \u2192",
        gameLinkText_zh: "\u53bb\u73a9 \u2192",
        caseLinkText: "View Case Study \u2192",
        caseLinkText_zh: "\u770b\u6848\u4f8b \u2192",
        coverImage: "assets/project-covers/ai-lab/delay-the-end-cover.webp",
        tags: ["Narrative Design", "Systems Design", "Monte Carlo", "Vanilla JS", "Bilingual"],
        links: {
            game: "https://carpediemzzsssww-cpu.github.io/delay-the-end/",
            caseStudy: "https://delay-the-end-website.vercel.app"
        }
    },

    experiments: [
        {
            slug: "cgec-error-analysis",
            title: "CGEC Error Analysis Agent",
            title_zh: "CGEC \u9519\u8bef\u5206\u6790 Agent",
            goal: "Verify whether LLMs can detect and correct Chinese L2 learner grammatical errors at scale",
            goal_zh: "\u8bd5\u8bd5 LLM \u80fd\u4e0d\u80fd\u6279\u91cf\u627e\u51fa\u5e76\u7ea0\u6b63\u4e2d\u6587\u4e8c\u8bed\u5b66\u4e60\u8005\u7684\u8bed\u6cd5\u9519\u8bef",
            setup: "Python + DeepSeek API on MuCGEC benchmark dataset. Two-step pipeline: (1) detect error type and location, (2) generate correction with explanation. Evaluated against ChERRANT metrics.",
            setup_zh: "Python + DeepSeek API\uff0c\u8dd1\u5728 MuCGEC \u57fa\u51c6\u6570\u636e\u96c6\u4e0a\u3002\u4e24\u6b65\u8d70\uff1a\u5148\u627e\u9519\u8bef\u7c7b\u578b\u548c\u4f4d\u7f6e\uff0c\u518d\u751f\u6210\u7ea0\u6b63 + \u89e3\u91ca\u3002\u7528 ChERRANT \u6307\u6807\u8bc4\u4f30\u3002",
            result: "Detection F1 ~80-90%, Correction F0.5 ~30-50%. Strong at word-order and missing-word errors, weaker on subtle collocation mistakes. Proved LLMs can augment — not replace — human annotators.",
            result_zh: "\u68c0\u6d4b F1 ~80-90%\uff0c\u7ea0\u6b63 F0.5 ~30-50%\u3002\u8bed\u5e8f\u548c\u7f3a\u8bcd\u95ee\u9898\u627e\u5f97\u51c6\uff0c\u7ec6\u5fae\u642d\u914d\u8fd8\u5dee\u4e9b\u3002\u7ed3\u8bba\uff1aLLM \u80fd\u8f85\u52a9\u4eba\u5de5\u6807\u6ce8\uff0c\u4f46\u66ff\u4ee3\u4e0d\u4e86\u3002",
            next: "Add RAG with HSK grammar corpus for context-aware correction. Build error source analysis (L1 transfer vs. developmental).",
            next_zh: "\u52a0 HSK \u8bed\u6cd5\u8bed\u6599\u5e93\u505a RAG\uff0c\u8ba9\u7ea0\u6b63\u66f4\u61c2\u4e0a\u4e0b\u6587\u3002\u518d\u505a\u9519\u8bef\u6765\u6e90\u5206\u6790\uff1a\u662f\u6bcd\u8bed\u8fc1\u79fb\u8fd8\u662f\u53d1\u5c55\u6027\u9519\u8bef\uff1f",
            tags: ["NLP", "DeepSeek API", "Linguistics"],
            githubLink: ""
        },
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
        {
            id: 1,
            title: "Progressive Disclosure in AI Interfaces",
            title_zh: "AI \u754c\u9762\u7684\u6e10\u8fdb\u62ab\u9732",
            content: "Most AI tools dump all capabilities upfront ('I can do X, Y, Z...'). What if interfaces revealed capabilities progressively based on user expertise? Beginners see 3 core actions. Power users unlock advanced features through use.",
            content_zh: "\u5927\u591a\u6570 AI \u5de5\u5177\u4e00\u6253\u5f00\u5c31\u628a\u6240\u6709\u529f\u80fd\u5806\u5728\u4f60\u9762\u524d\u3002\u5982\u679c\u754c\u9762\u80fd\u6839\u636e\u4f60\u7684\u719f\u7ec3\u5ea6\u6162\u6162\u5c55\u5f00\u5462\uff1f\u65b0\u624b\u53ea\u770b\u5230 3 \u4e2a\u6838\u5fc3\u52a8\u4f5c\uff0c\u7528\u5f97\u591a\u4e86\u81ea\u7136\u89e3\u9501\u66f4\u591a\u3002",
            tags: ["UX", "AI", "Design Patterns"],
            pinned: true,
            date: "2024-02-20"
        },
        {
            id: 2,
            title: "The 'Undo' Problem for AI Actions",
            title_zh: "AI \u64cd\u4f5c\u7684\u300c\u64a4\u9500\u300d\u96be\u9898",
            content: "Traditional software: Undo is trivial. AI agents: How do you undo an email sent, a calendar invite accepted, a file deleted? We need new interaction patterns for AI that acts on your behalf. Maybe: preview mode by default, confirmation for irreversible actions.",
            content_zh: "\u4f20\u7edf\u8f6f\u4ef6\u7684\u64a4\u9500\u5f88\u7b80\u5355\u3002\u4f46 AI Agent \u5462\uff1f\u5b83\u5e2e\u4f60\u53d1\u7684\u90ae\u4ef6\u3001\u63a5\u7684\u65e5\u5386\u9080\u8bf7\u3001\u5220\u7684\u6587\u4ef6\uff0c\u600e\u4e48\u64a4\uff1f\u9700\u8981\u65b0\u7684\u4ea4\u4e92\u6a21\u5f0f\u3002\u4e5f\u8bb8\uff1a\u9ed8\u8ba4\u9884\u89c8\u6a21\u5f0f\uff0c\u4e0d\u53ef\u9006\u7684\u64cd\u4f5c\u5fc5\u987b\u786e\u8ba4\u3002",
            tags: ["AI", "UX", "Trust"],
            pinned: true,
            date: "2024-02-18"
        },
        {
            id: 3,
            title: "AI Confidence as a Design Material",
            title_zh: "AI \u7f6e\u4fe1\u5ea6\u4f5c\u4e3a\u8bbe\u8ba1\u6750\u6599",
            content: "AI systems have varying confidence in their outputs. Most UIs hide this. What if we designed with confidence as a first-class element? High confidence = direct answer. Medium = show alternatives. Low = 'I'm not sure, here's my reasoning.'",
            content_zh: "AI \u7cfb\u7edf\u5bf9\u81ea\u5df1\u7684\u56de\u7b54\u6709\u591a\u6709\u5c11\u628a\u63e1\uff0c\u4f46\u5927\u591a\u6570 UI \u628a\u8fd9\u4e2a\u4fe1\u606f\u85cf\u4e86\u3002\u5982\u679c\u628a\u7f6e\u4fe1\u5ea6\u5f53\u6210\u4e00\u7b49\u8bbe\u8ba1\u5143\u7d20\u5462\uff1f\u5f88\u786e\u5b9a=\u76f4\u63a5\u7ed9\u7b54\u6848\uff0c\u6709\u70b9\u62ff\u4e0d\u51c6=\u5c55\u793a\u5907\u9009\uff0c\u4e0d\u786e\u5b9a=\u300c\u6211\u4e0d\u786e\u5b9a\uff0c\u8fd9\u662f\u6211\u7684\u63a8\u7406\u300d\u3002",
            tags: ["AI", "Design", "Trust"],
            pinned: false,
            date: "2024-02-15"
        },
        {
            id: 4,
            title: "Prompt Engineering as Product Design",
            title_zh: "\u63d0\u793a\u8bcd\u5de5\u7a0b\u5373\u4ea7\u54c1\u8bbe\u8ba1",
            content: "Writing prompts isn't just engineering—it's UX design. The prompt shapes user expectations, defines interaction patterns, and sets boundaries. Good prompts: set clear scope, provide examples, allow progressive complexity.",
            content_zh: "\u5199\u63d0\u793a\u8bcd\u4e0d\u53ea\u662f\u5de5\u7a0b\u6d3b\uff0c\u5b83\u672c\u8d28\u4e0a\u662f UX \u8bbe\u8ba1\u3002\u63d0\u793a\u8bcd\u5851\u9020\u7528\u6237\u671f\u671b\u3001\u5b9a\u4e49\u4ea4\u4e92\u89c4\u5219\u3001\u753b\u597d\u8fb9\u754c\u3002\u597d\u7684\u63d0\u793a\u8bcd\uff1a\u8303\u56f4\u6e05\u6670\u3001\u5e26\u793a\u4f8b\u3001\u5141\u8bb8\u6e10\u8fdb\u53d8\u590d\u6742\u3002",
            tags: ["AI", "Product", "UX"],
            pinned: false,
            date: "2024-02-10"
        },
        {
            id: 5,
            title: "Designing for 'AI Surprise'",
            title_zh: "\u4e3a\u300cAI \u60ca\u559c\u300d\u800c\u8bbe\u8ba1",
            content: "Sometimes AI outputs surprise us positively (novel insight). Sometimes negatively (hallucination). How do we design systems that maximize good surprise while minimizing bad? Maybe: sandbox mode for exploration, validation layer for production.",
            content_zh: "AI \u7684\u8f93\u51fa\u6709\u65f6\u662f\u597d\u60ca\u559c\uff08\u65b0\u89d2\u5ea6\uff09\uff0c\u6709\u65f6\u662f\u574f\u60ca\u559c\uff08\u80e1\u8bf4\u516b\u9053\uff09\u3002\u600e\u4e48\u8ba9\u7cfb\u7edf\u591a\u7ed9\u597d\u7684\u3001\u5c11\u7ed9\u574f\u7684\uff1f\u4e5f\u8bb8\uff1a\u63a2\u7d22\u7528\u6c99\u7bb1\u6a21\u5f0f\uff0c\u751f\u4ea7\u52a0\u9a8c\u8bc1\u5c42\u3002",
            tags: ["AI", "Design", "Trust"],
            pinned: false,
            date: "2024-02-05"
        },
        {
            id: 6,
            title: "The Portfolio Problem for AI Products",
            title_zh: "AI \u4ea7\u54c1\u7684\u4f5c\u54c1\u96c6\u96be\u9898",
            content: "How do you showcase AI product work when outputs are non-deterministic? Traditional portfolios show 'the design.' AI portfolios need to show: prompt evolution, failure modes, edge cases, how you tuned behavior. New format needed.",
            content_zh: "AI \u4ea7\u54c1\u7684\u8f93\u51fa\u6bcf\u6b21\u90fd\u4e0d\u4e00\u6837\uff0c\u4f5c\u54c1\u96c6\u8be5\u600e\u4e48\u505a\uff1f\u4f20\u7edf\u4f5c\u54c1\u96c6\u5c55\u793a\u300c\u8bbe\u8ba1\u7a3f\u300d\u3002AI \u4f5c\u54c1\u96c6\u5f97\u5c55\u793a\uff1a\u63d0\u793a\u8bcd\u8fed\u4ee3\u8fc7\u7a0b\u3001\u5931\u8d25\u6a21\u5f0f\u3001\u8fb9\u7f18\u6848\u4f8b\u3001\u884c\u4e3a\u8c03\u4f18\u600e\u4e48\u505a\u3002\u8fd9\u4e2a\u9886\u57df\u9700\u8981\u65b0\u683c\u5f0f\u3002",
            tags: ["Career", "AI", "Portfolio"],
            pinned: false,
            date: "2024-01-30"
        },
        {
            id: 7,
            title: "Multi-Agent Collaboration Patterns",
            title_zh: "\u591a Agent \u534f\u4f5c\u6a21\u5f0f",
            content: "Future: Multiple AI agents working together. Design challenge: How do users understand agent relationships? Who's responsible when things go wrong? Potential pattern: Agent 'introduction' flow showing roles and capabilities upfront.",
            content_zh: "\u672a\u6765\u4f1a\u6709\u591a\u4e2a AI Agent \u4e00\u8d77\u5e72\u6d3b\u3002\u8bbe\u8ba1\u96be\u9898\uff1a\u7528\u6237\u600e\u4e48\u7406\u89e3\u5b83\u4eec\u7684\u5173\u7cfb\uff1f\u51fa\u4e86\u9519\u8c01\u8d1f\u8d23\uff1f\u4e5f\u8bb8\u53ef\u4ee5\u8bbe\u8ba1\u4e00\u4e2a Agent\u300c\u81ea\u6211\u4ecb\u7ecd\u300d\u6d41\u7a0b\uff0c\u5148\u8ba9\u7528\u6237\u77e5\u9053\u8c01\u662f\u8c01\u3001\u80fd\u505a\u4ec0\u4e48\u3002",
            tags: ["AI", "Systems", "Future"],
            pinned: false,
            date: "2024-01-25"
        },
        {
            id: 8,
            title: "Voice as the New Wireframe",
            title_zh: "\u8bed\u97f3\u662f\u65b0\u7684\u7ebf\u6846\u56fe",
            content: "With AI, you can prototype interactions through conversation before building UI. 'Show me a dashboard for this data' → iterate through voice → only then design visual interface. Voice-first prototyping could be huge for speed.",
            content_zh: "\u6709\u4e86 AI\uff0c\u53ef\u4ee5\u5148\u7528\u5bf9\u8bdd\u539f\u578b\u4ea4\u4e92\uff0c\u518d\u505a UI\u3002\u300c\u7ed9\u6211\u770b\u8fd9\u4e2a\u6570\u636e\u7684\u770b\u677f\u300d\u2192 \u8bed\u97f3\u8fed\u4ee3 \u2192 \u7136\u540e\u624d\u753b\u754c\u9762\u3002\u8bed\u97f3\u4f18\u5148\u539f\u578b\u53ef\u80fd\u4f1a\u6781\u5927\u63d0\u901f\u3002",
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
                <a href="${item.links.game}" class="featured-experiment-action" target="_blank" rel="noopener noreferrer">${gameText}</a>
                <a href="${item.links.caseStudy}" class="featured-experiment-action" target="_blank" rel="noopener noreferrer">${caseText}</a>
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

window.addEventListener('langChanged', function() { initAILabPage(); });
