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

const allProjects = [
    {
        slug: "yunyou",
        title: "Yunyou",
        title_zh: "\u4e91\u6e38",
        oneLiner: "An AI agent that tells you when to buy flights — not just where to search",
        oneLiner_zh: "\u4e0d\u53ea\u662f\u641c\u822a\u73ed\u2014\u2014\u544a\u8bc9\u4f60\u300c\u73b0\u5728\u4e70\u4e0d\u4e70\u300d\u7684 AI",
        featured: true,
        coverImage: "assets/project-covers/projects/yunyou-cover.jpg",
        role: "Product Designer & Developer",
        role_zh: "\u4ea7\u54c1 + \u5f00\u53d1",
        time: "2026.03",
        outcome: "AI decision engine with transparent reasoning · post-purchase price guard · React + Doubao API · deployed on Vercel",
        outcome_zh: "\u63a8\u7406\u900f\u660e\u7684 AI \u51b3\u7b56\u5f15\u64ce \u00b7 \u8d2d\u540e\u4ef7\u4fdd \u00b7 React + \u8c46\u5305 API \u00b7 \u8dd1\u5728 Vercel",
        tags: ["AI/ML", "Product Design", "Prototyping"],
        links: {
            demo: "https://yunyou.vercel.app"
        }
    },
    {
        slug: "ai-prd-copilot",
        title: "AI PRD Copilot",
        title_zh: "AI PRD Copilot",
        oneLiner: "An AI Copilot that helps product managers think, not just write",
        oneLiner_zh: "\u5e2e\u4ea7\u54c1\u7ecf\u7406\u60f3\u6e05\u695a\u518d\u52a8\u7b14\u7684 AI \u526f\u9a7e",
        featured: true,
        coverImage: "assets/project-covers/projects/ai-prd-copilot-cover.webp",
        role: "Product Designer",
        role_zh: "\u4ea7\u54c1\u8bbe\u8ba1",
        time: "2026",
        outcome: "Improved overall quality by 17.5% and content specificity by 41%",
        outcome_zh: "\u6574\u4f53\u8d28\u91cf\u63d0 17.5%\uff0c\u5185\u5bb9\u5177\u4f53\u6027\u63d0 41%",
        tags: ["AI/ML", "Product Design", "Prototyping"],
        links: {
            demo: "https://prd-copilot-av8y8qmsthw7i3cay3efeq.streamlit.app"
        }
    },
    {
        slug: "delay-the-end",
        title: "Delay the End",
        title_zh: "Delay the End",
        oneLiner: "A fan-made narrative strategy web game — bargain with fate, delay what's already written",
        oneLiner_zh: "\u7c89\u4e1d\u81ea\u5236\u7684\u53d9\u4e8b\u7b56\u7565\u7f51\u9875\u6e38\u620f\u2014\u2014\u548c\u547d\u8fd0\u535a\u5f08\uff0c\u5ef6\u7f13\u5df2\u5199\u597d\u7684\u7ed3\u5c40",
        featured: true,
        coverImage: "assets/project-covers/ai-lab/delay-the-end-cover.webp",
        role: "Solo Designer & Developer",
        role_zh: "\u72ec\u7acb\u8bbe\u8ba1 + \u5f00\u53d1",
        time: "2025",
        outcome: "7 rounds \u00b7 5 endings \u00b7 18 playtesters \u00b7 bilingual \u00b7 Monte Carlo simulation \u00b7 vanilla JS",
        outcome_zh: "7 \u8f6e\u535a\u5f08 \u00b7 5 \u4e2a\u7ed3\u5c40 \u00b7 18 \u4eba\u6d4b\u8bd5 \u00b7 \u4e2d\u82f1\u53cc\u8bed \u00b7 \u8499\u7279\u5361\u6d1b\u6a21\u62df \u00b7 \u539f\u751f JS",
        tags: ["Narrative Design", "Systems Design", "Vanilla JS"],
        links: {
            demo: "https://carpediemzzsssww-cpu.github.io/delay-the-end/"
        }
    },
    {
        slug: "netease-hi-echo-research",
        title: "NetEase Hi Echo — User Research",
        title_zh: "\u7f51\u6613\u6709\u9053 Hi Echo \u2014 \u7528\u6237\u7814\u7a76",
        oneLiner: "Led a 17-person team to understand what AI English learners actually need",
        oneLiner_zh: "\u5e26 17 \u4e2a\u4eba\u505a\u7528\u7814\uff0c\u641e\u6e05\u695a\u5b66\u82f1\u8bed\u7684\u4eba\u5230\u5e95\u8981\u4ec0\u4e48",
        featured: true,
        coverImage: "assets/project-covers/projects/netease-hi-echo-research-cover.webp",
        role: "Project Lead",
        role_zh: "\u9879\u76ee\u8d1f\u8d23\u4eba",
        time: "2024.06 – 2025.03",
        outcome: "1,287 surveys · 3-city field research · 78-page report adopted by NetEase Hi Echo · University First Prize (2/18)",
        outcome_zh: "1,287 \u4efd\u95ee\u5377 \u00b7 \u4e09\u57ce\u8dd1\u7528\u6237 \u00b7 78 \u9875\u62a5\u544a\u88ab\u7f51\u6613\u6709\u9053\u4ea7\u54c1\u7ec4\u91c7\u7eb3 \u00b7 \u6821\u7ea7\u4e00\u7b49\u5956 (2/18)",
        tags: ["User Research", "Product Strategy", "AI/ML"],
        links: {
            demo: "case-studies/netease-hi-echo/index.html"
        }
    },
    {
        slug: "bionic-reading",
        title: "Bionic Reading - Interaction Concept",
        title_zh: "\u4eff\u751f\u9605\u8bfb - \u4ea4\u4e92\u6982\u5ff5",
        oneLiner: "A 151-response survey uncovered e-book UX pain points, then reimagined the future of reading.",
        oneLiner_zh: "151 \u4efd\u95ee\u5377\u6316\u51fa\u7535\u5b50\u4e66\u7684 UX \u75db\u70b9\uff0c\u91cd\u65b0\u60f3\u8c61\u300c\u9605\u8bfb\u300d",
        featured: false,
        coverImage: "assets/project-covers/projects/bionic-reading-cover.webp",
        role: "Research + Concept Design",
        role_zh: "\u7814\u7a76 + \u6982\u5ff5\u8bbe\u8ba1",
        time: "2025",
        outcome: "User research (SPSS factor analysis) -> concept proposal combining bio-typography, BCI feedback, and immersive co-reading.",
        outcome_zh: "\u7528\u7814 (SPSS \u56e0\u5b50\u5206\u6790) \u2192 \u4eff\u751f\u6392\u7248 + \u8111\u673a\u63a5\u53e3\u53cd\u9988 + \u6c89\u6d78\u5f0f\u5171\u8bfb\u7684\u6982\u5ff5\u65b9\u6848",
        tags: ["User Research", "Product Design", "Interaction Design"],
        links: {
            demo: "case-studies/bionic-reading/index.html"
        }
    },
    {
        slug: "web-design-playground",
        title: "Web Design Playground",
        title_zh: "Web Design Playground",
        oneLiner: "50+ UI case studies — exploring how visual language shapes product experience",
        oneLiner_zh: "50+ \u4e2a UI \u62c6\u89e3\u2014\u2014\u7814\u7a76\u89c6\u89c9\u8bed\u8a00\u600e\u4e48\u5f71\u54cd\u4ea7\u54c1\u4f53\u9a8c",
        featured: false,
        coverImage: "assets/project-covers/projects/web-design-playground-cover.webp",
        role: "UI Designer",
        role_zh: "UI \u8bbe\u8ba1\u5e08",
        time: "2026",
        outcome: "Built and curated 50+ UI case studies (ongoing), gradually shaping a distinctive personal design style",
        outcome_zh: "50+ \u4e2a UI \u6848\u4f8b\u62c6\u89e3\uff08\u6301\u7eed\u66f4\u65b0\u4e2d\uff09\uff0c\u6162\u6162\u957f\u51fa\u81ea\u5df1\u7684\u8bbe\u8ba1\u98ce\u683c",
        tags: ["Product Design", "Figma", "Design Systems"],
        links: {
            demo: "https://web-design-playground-nq4f.vercel.app"
        }
    },
    {
        slug: "whudo-system",
        title: "WHUDO System",
        title_zh: "WHUDO \u667a\u6167\u5bbf\u820d\u7cfb\u7edf",
        oneLiner: "A smart dormitory OS designed for four people sharing one space",
        oneLiner_zh: "\u56db\u4e2a\u4eba\u4f4f\u4e00\u95f4\u5bbf\u820d\uff0c\u600e\u4e48\u8ba9\u5b83\u66f4\u806a\u660e\u4e00\u70b9",
        featured: true,
        coverImage: "assets/project-covers/projects/whudo-system-cover.webp",
        role: "UI Designer",
        role_zh: "UI \u8bbe\u8ba1\u5e08",
        time: "Spring 2025",
        outcome: "6-module AI-powered concept: face recognition, voice assistant, multi-user device control, behavior analytics, and a graduation memoir easter egg",
        outcome_zh: "6 \u4e2a AI \u6a21\u5757\uff1a\u4eba\u8138\u8bc6\u522b\u3001\u8bed\u97f3\u52a9\u624b\u3001\u591a\u4eba\u8bbe\u5907\u63a7\u5236\u3001\u884c\u4e3a\u5206\u6790\uff0c\u8fd8\u85cf\u4e86\u4e2a\u6bd5\u4e1a\u7eaa\u5ff5\u5f69\u86cb",
        tags: ["Product Design", "AI/ML", "Prototyping"],
        links: {
            demo: "https://whudo-casestudy.vercel.app"
        }
    },
    {
        slug: "smart-photo-organizer",
        title: "Smart Photo Organizer — A Failure",
        title_zh: "\u667a\u80fd\u7167\u7247\u6574\u7406\u5668 \u2014 \u4e00\u6b21\u5931\u8d25",
        oneLiner: "Built an AI photo tool in 2 hours. A user's one question broke it.",
        oneLiner_zh: "\u4e24\u5c0f\u65f6\u5199\u4e86\u4e2a AI \u7167\u7247\u5de5\u5177\uff0c\u7528\u6237\u4e00\u4e2a\u95ee\u9898\u5c31\u628a\u5b83\u95ee\u5d29\u4e86",
        featured: false,
        coverImage: "assets/project-covers/projects/smart-photo-organizer-cover.webp",
        role: "Solo Developer",
        role_zh: "\u72ec\u7acb\u5f00\u53d1\u8005",
        time: "2026.01",
        outcome: "Python + Qwen 2.5 7B local model · perceptual hashing · full product reflection on over-engineering without user validation",
        outcome_zh: "Python + Qwen 2.5 7B \u672c\u5730\u6a21\u578b \u00b7 \u611f\u77e5\u54c8\u5e0c \u00b7 \u4e00\u6b21\u5173\u4e8e\u300c\u5148\u505a\u5b8c\u518d\u8bf4\u300d\u4e0d\u5982\u300c\u5148\u95ee\u7528\u6237\u300d\u7684\u6559\u8bad",
        tags: ["AI/ML", "Product Thinking", "Reflection"],
        links: {
            demo: "https://photo-organizer-eta.vercel.app"
        }
    },
    {
        slug: "chrysalis",
        title: "Chrysalis",
        title_zh: "Chrysalis",
        oneLiner: "A butterfly-themed mobile journaling PWA built for daily reflection — private, local-first, and AI-powered",
        oneLiner_zh: "\u7ed9\u81ea\u5df1\u505a\u7684\u65e5\u8bb0 App\u2014\u2014\u6570\u636e\u5b58\u672c\u5730\u3001\u5e26 AI \u603b\u7ed3",
        featured: false,
        coverImage: "assets/project-covers/projects/chrysalis-cover.webp",
        role: "Solo Developer",
        role_zh: "\u72ec\u7acb\u5f00\u53d1\u8005",
        time: "2026",
        outcome: "Next.js 14 + TypeScript · local-first storage · AI summaries (DeepSeek / OpenAI / Anthropic) · PWA installable on iPhone",
        outcome_zh: "Next.js 14 + TypeScript \u00b7 \u6570\u636e\u5b58\u672c\u5730 \u00b7 AI \u667a\u80fd\u603b\u7ed3 \u00b7 iPhone \u53ef\u88c5\u7684 PWA",
        tags: ["AI/ML", "Prototyping", "Product Design"],
        links: {
            demo: "https://chrysalis-pink.vercel.app",
            repo: "https://github.com/carpediemzzsssww-cpu/chrysalis"
        }
    },
    {
        slug: "bestcem-ai-journey",
        title: "AI Customer Journey Generator",
        title_zh: "AI \u5ba2\u6237\u65c5\u7a0b\u751f\u6210\u5668",
        oneLiner: "An AI feature that generates customer journey maps in 15 minutes instead of hours",
        oneLiner_zh: "\u4ee5\u524d\u505a\u51e0\u5c0f\u65f6\u7684\u5ba2\u6237\u65c5\u7a0b\u5730\u56fe\uff0c\u73b0\u5728 15 \u5206\u949f",
        featured: false,
        coverImage: "",
        role: "AI Product Intern",
        role_zh: "AI \u4ea7\u54c1\u5b9e\u4e60\u751f",
        time: "2026.02 - Present",
        outcome: "End-to-end PRD (V2.0) with 3-prompt architecture, competitive analysis, Axure prototype, and HTML demo for a B2B CEM SaaS platform",
        outcome_zh: "\u5b8c\u6574 PRD (V2.0) + 3-prompt \u67b6\u6784 + \u7ade\u54c1\u5206\u6790 + Axure \u539f\u578b + HTML \u6f14\u793a\uff0c\u670d\u52a1 B2B CEM \u5e73\u53f0",
        tags: ["AI/ML", "Product Design", "Prototyping"],
        links: {}
    },
    {
        slug: "bestcem-voc-pipeline",
        title: "VOC Data Pipeline",
        title_zh: "VOC \u6570\u636e\u7ba1\u7ebf",
        oneLiner: "Automated data collection and cleaning across 9 platforms for enterprise customer insights",
        oneLiner_zh: "9 \u4e2a\u5e73\u53f0\u7684\u7528\u6237\u58f0\u97f3\uff0c\u81ea\u52a8\u91c7\u96c6 + \u6e05\u6d17\u3002\u8ba9\u4f01\u4e1a\u542c\u5230\u7528\u6237\u5728\u8bf4\u4ec0\u4e48",
        featured: false,
        coverImage: "",
        role: "AI Product Intern",
        role_zh: "AI \u4ea7\u54c1\u5b9e\u4e60\u751f",
        time: "2026.02",
        outcome: "30,000+ data entries collected via RPA automation, 6 Python cleaning scripts handling format conversion, dual-header detection, and city mapping",
        outcome_zh: "RPA \u81ea\u52a8\u91c7\u96c6 3 \u4e07+ \u6761\u6570\u636e\uff0c6 \u4e2a Python \u811a\u672c\u5904\u7406\u683c\u5f0f\u3001\u53cc\u8868\u5934\u3001\u57ce\u5e02\u6620\u5c04\u7b49\u810f\u6d3b",
        tags: ["AI/ML", "Automation", "Research"],
        links: {}
    },
    {
        slug: "clone-me",
        title: "Clone Me — AI Digital Twin Builder",
        title_zh: "Clone Me \u2014 AI \u6570\u5b57\u5206\u8eab\u751f\u6210\u5668",
        oneLiner: "A Claude Code skill that generates personalized AI chatbots from your identity materials",
        oneLiner_zh: "\u628a\u4f60\u7684\u8eab\u4efd\u6750\u6599\u53d8\u6210\u4e00\u4e2a\u80fd\u804a\u5929\u7684 AI \u5206\u8eab",
        featured: false,
        coverImage: "",
        role: "Skill Designer",
        role_zh: "Skill \u8bbe\u8ba1\u5e08",
        time: "2026.04",
        outcome: "6-phase guided interview + system prompt generator + self-contained HTML chat widget with 10+ LLM provider support (OpenAI, Claude, Gemini, DeepSeek, Groq, etc.)",
        outcome_zh: "6 \u6b65\u5f15\u5bfc\u8bbf\u8c08 + \u63d0\u793a\u8bcd\u81ea\u52a8\u751f\u6210 + \u81ea\u5e26\u804a\u5929 Widget\uff0c\u652f\u6301 10+ \u4e2a\u6a21\u578b\u63d0\u4f9b\u5546",
        tags: ["AI/ML", "Prototyping", "Claude Code Skill"],
        links: {
            repo: "https://github.com/carpediemzzsssww-cpu/clone-me"
        }
    },
    {
        slug: "prd-skill",
        title: "AI-First PRD Generator",
        title_zh: "AI-First PRD \u751f\u6210\u5668",
        oneLiner: "A Claude Code skill that writes PRDs optimized for both humans and AI coding agents",
        oneLiner_zh: "\u5199\u51fa\u4eba\u548c AI Agent \u90fd\u80fd\u7528\u7684 PRD",
        featured: false,
        coverImage: "",
        role: "Skill Designer",
        role_zh: "Skill \u8bbe\u8ba1\u5e08",
        time: "2026.03",
        outcome: "14-section PRD structure with pre-delivery checklist preventing common AI coding pitfalls (broken links, missing states, generic copy, data silos)",
        outcome_zh: "14 \u8282 PRD + \u4ea4\u4ed8\u68c0\u67e5\u6e05\u5355\uff0c\u4e13\u95e8\u9632 AI \u7f16\u7a0b\u5e38\u89c1\u5751\uff1a\u65ad\u94fe\u3001\u6f0f\u72b6\u6001\u3001\u901a\u7528\u6587\u6848\u3001\u6570\u636e\u5b64\u5c9b",
        tags: ["AI/ML", "Product Design", "Claude Code Skill"],
        links: {}
    },
    {
        slug: "case-study-skill",
        title: "Case Study Generator",
        title_zh: "Case Study \u751f\u6210\u5668",
        oneLiner: "A Claude Code skill that creates polished, interactive case study pages from project materials",
        oneLiner_zh: "\u628a\u9879\u76ee\u6750\u6599\u53d8\u6210\u597d\u770b\u7684\u4ea4\u4e92\u5f0f\u6848\u4f8b\u9875",
        featured: false,
        coverImage: "",
        role: "Skill Designer",
        role_zh: "Skill \u8bbe\u8ba1\u5e08",
        time: "2026.03",
        outcome: "Two modes (showcase + teardown) with scroll-triggered reveals, metric cards, before/after sliders, and editorial-grade typography",
        outcome_zh: "\u5c55\u793a/\u62c6\u89e3\u4e24\u79cd\u6a21\u5f0f \u00b7 \u6eda\u52a8\u52a8\u753b \u00b7 \u6307\u6807\u5361\u7247 \u00b7 \u524d\u540e\u5bf9\u6bd4\u6ed1\u5757 \u00b7 \u7f16\u8f91\u7ea7\u6392\u7248",
        tags: ["AI/ML", "Product Design", "Claude Code Skill"],
        links: {}
    },
    {
        slug: "rpa-etl-skill",
        title: "RPA-ETL Data Pipeline Generator",
        title_zh: "RPA-ETL \u6570\u636e\u7ba1\u7ebf\u751f\u6210\u5668",
        oneLiner: "A Claude Code skill that generates production-grade data cleaning scripts for RPA workflows",
        oneLiner_zh: "\u7ed9 RPA \u5de5\u4f5c\u6d41\u81ea\u52a8\u751f\u6210\u80fd\u76f4\u63a5\u8dd1\u7684\u6e05\u6d17\u811a\u672c",
        featured: false,
        coverImage: "",
        role: "Skill Designer",
        role_zh: "Skill \u8bbe\u8ba1\u5e08",
        time: "2026.03",
        outcome: "Supports standalone scripts and RPA inline modes, multi-format file reading with 5-level fallback, fuzzy store matching, and standardized 27-field output schema",
        outcome_zh: "\u652f\u6301\u72ec\u7acb\u811a\u672c / RPA \u5185\u8054\u4e24\u79cd\u6a21\u5f0f \u00b7 5 \u7ea7\u6587\u4ef6\u8bfb\u53d6\u56de\u9000 \u00b7 \u6a21\u7cca\u95e8\u5e97\u5339\u914d \u00b7 \u6807\u51c6\u5316 27 \u5b57\u6bb5\u8f93\u51fa",
        tags: ["AI/ML", "Automation", "Claude Code Skill"],
        links: {}
    },
    {
        slug: "ai-daily-digest",
        title: "AI Daily Digest",
        title_zh: "AI Daily Digest",
        oneLiner: "Bilingual AI news email tracking 25 builders and 5 podcasts, delivered daily to your inbox",
        oneLiner_zh: "\u6bcf\u5929\u81ea\u52a8\u8ffd 25 \u4e2a AI builder + 5 \u4e2a\u64ad\u5ba2\uff0c\u53cc\u8bed\u6458\u8981\u53d1\u5230\u90ae\u7bb1",
        featured: false,
        coverImage: "",
        role: "Solo Developer",
        role_zh: "\u72ec\u7acb\u5f00\u53d1\u8005",
        time: "2026",
        outcome: "GitHub Actions automation + DeepSeek API bilingual summarization + Gmail SMTP delivery, zero-cost infrastructure, running daily",
        outcome_zh: "GitHub Actions + DeepSeek API \u53cc\u8bed\u6458\u8981 + Gmail \u53d1\u9001\uff0c\u96f6\u6210\u672c\u8dd1\u8d77\u6765\uff0c\u6bcf\u5929\u81ea\u52a8\u8fd0\u884c",
        tags: ["AI/ML", "Automation"],
        links: {
            repo: "https://github.com/carpediemzzsssww-cpu/news_follow_builders"
        }
    },
    {
        slug: "ai-agent-industry-report",
        title: "AI Agent Industry Report",
        title_zh: "AI Agent \u884c\u4e1a\u62a5\u544a",
        oneLiner: "2025–2026 AI Agent industry landscape: players, use cases, and where it's heading",
        oneLiner_zh: "2025\u20132026 AI Agent \u884c\u4e1a\u5168\u666f\uff1a\u8c01\u5728\u505a\u3001\u600e\u4e48\u7528\u3001\u5f80\u54ea\u8d70",
        featured: false,
        coverImage: "assets/project-covers/projects/ai-agent-industry-report-cover.webp",
        role: "Research & Analysis",
        role_zh: "\u7814\u7a76\u4e0e\u5206\u6790",
        time: "2026.02",
        outcome: "Covers agent architecture, key players (domestic + overseas), enterprise adoption patterns, and investment trends across 2025–2026",
        outcome_zh: "\u6574\u7406\u4e86 Agent \u67b6\u6784\u3001\u56fd\u5185\u5916\u6838\u5fc3\u73a9\u5bb6\u3001\u4f01\u4e1a\u843d\u5730\u573a\u666f\u548c\u6295\u8d44\u8d8b\u52bf",
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
