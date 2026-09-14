// Generate the opt-in, bilingual project introductions from their Markdown source.
// The main showcase build calls this; it can also run on its own.
const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('./lib/frontmatter');
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://carpediemzzsssww-cpu.github.io/Iris/';

function escapeHTML(value) {
    return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function paragraphs(markdown) {
    return markdown.trim().split(/\n\s*\n/).filter(Boolean).map(paragraph =>
        '<p>' + escapeHTML(paragraph.replace(/\n/g, ' ')).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') + '</p>'
    ).join('\n');
}

function parseStory(body, filename) {
    const match = body.match(/^## English\s*\n([\s\S]+?)\n## 中文\s*\n([\s\S]+)$/);
    if (!match || !match[1].trim() || !match[2].trim()) {
        throw new Error(`${filename}: storyPage requires non-empty "## English" and "## 中文" sections`);
    }
    return { en: paragraphs(match[1]), zh: paragraphs(match[2]) };
}

function externalLink(url, label, primary) {
    if (!url) return '';
    if (!/^https:\/\//.test(url)) throw new Error('Project story external links must use HTTPS');
    return `<a class="story-action${primary ? ' story-action-primary' : ''}" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} <span aria-hidden="true">↗</span></a>`;
}

function localizedStory(fm, story, lang) {
    const zh = lang === 'zh';
    const t = key => zh && fm[key + '_zh'] ? fm[key + '_zh'] : fm[key];
    const tags = t('tags');
    const media = fm.coverImage ? `<figure class="story-media"><img src="../../${escapeHTML(fm.coverImage)}" alt="${escapeHTML(t('coverAlt') || t('title'))}" width="${Number(fm.coverWidth) || 1600}" height="${Number(fm.coverHeight) || 1000}" decoding="async"></figure>` : '';
    return `<article data-story-language="${lang}" lang="${zh ? 'zh-CN' : 'en'}"${zh ? ' hidden' : ''}>
        <header class="story-header">
            <p class="story-eyebrow">${zh ? '项目介绍' : 'PROJECT NOTES'} <span> / ${escapeHTML(fm.time)}</span></p>
            <h1>${escapeHTML(t('title'))}</h1>
            <p class="story-intro">${escapeHTML(t('oneLiner'))}</p>
            <ul class="story-tags" aria-label="${zh ? '项目标签' : 'Project tags'}">${tags.map(tag => `<li>${escapeHTML(tag)}</li>`).join('')}</ul>
            <div class="story-actions">${externalLink(fm.linkDemo, t('demoLabel') || (zh ? '体验项目' : 'Try the project'), true)}${externalLink(fm.linkRepo, zh ? '查看源码' : 'Source on GitHub', !fm.linkDemo)}</div>
        </header>
${media}
        <div class="story-reading"><aside class="story-meta"><h2>${zh ? '我的工作' : 'My role'}</h2><p>${escapeHTML(t('role'))}</p><h2>${zh ? '体验要点' : 'Experience highlights'}</h2><p>${escapeHTML(t('outcome'))}</p></aside>
        <section class="story-body" aria-label="${zh ? '项目详情' : 'Project description'}">${story[lang]}</section></div>
        <footer class="story-end"><a href="../../projects.html">${zh ? '← 返回全部项目' : '← Back to all projects'}</a><span>Iris Zhou</span></footer>
    </article>`;
}

function renderStory(fm, story) {
    const canonical = SITE + fm.linkCaseStudy;
    const image = SITE + (fm.coverImage || 'assets/ai-lab/surreal-butterflies.png');
    return `<!DOCTYPE html>
<!-- Generated from content/projects/${fm.slug}.md. Edit the source, then run node scripts/build-showcase.js. -->
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHTML(fm.title)} — Iris Zhou</title>
<meta name="description" content="${escapeHTML(fm.oneLiner)}">
<link rel="canonical" href="${escapeHTML(canonical)}">
<meta property="og:type" content="article"><meta property="og:title" content="${escapeHTML(fm.title)} — Iris Zhou">
<meta property="og:description" content="${escapeHTML(fm.oneLiner)}"><meta property="og:url" content="${escapeHTML(canonical)}"><meta property="og:image" content="${escapeHTML(image)}">
<meta name="twitter:card" content="summary_large_image">
<script src="../../scripts/init-theme-lang.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;700&family=DM+Mono&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../styles/project-story.css">
<script src="../../scripts/project-story.js" defer></script>
</head><body class="project-story">
<a class="story-skip" href="#project-content" data-en="Skip to project" data-zh="跳转到项目内容">Skip to project</a>
<nav class="story-nav" aria-label="Project navigation"><a class="story-brand" href="../../index.html" aria-label="Iris Zhou — Home">IZ</a><a class="story-back" href="../../projects.html" data-en="← All projects" data-zh="← 全部项目">← All projects</a><div class="story-language" role="group" aria-label="Language"><button type="button" data-story-lang="en" aria-pressed="true" lang="en">EN</button><button type="button" data-story-lang="zh" aria-pressed="false" lang="zh-CN">中文</button></div></nav>
<main id="project-content" tabindex="-1">${localizedStory(fm, story, 'en')}${localizedStory(fm, story, 'zh')}</main>
<noscript><p class="story-noscript">English is shown by default. Enable JavaScript to switch to 中文.</p></noscript>
</body></html>\n`;
}

function buildProjectStories() {
    const dir = path.join(ROOT, 'content/projects');
    const outputs = [];
    for (const file of fs.readdirSync(dir).sort()) {
        if (!file.endsWith('.md') || file.startsWith('_') || file.toLowerCase() === 'readme.md') continue;
        const { frontmatter: fm, body } = parseFrontmatter(fs.readFileSync(path.join(dir, file), 'utf8'));
        if (fm.storyPage !== true) continue;
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.slug) || file !== fm.slug + '.md' || fm.linkCaseStudy !== `case-studies/${fm.slug}/index.html`) {
            throw new Error(`${file}: story slug, filename and linkCaseStudy must match`);
        }
        if (!Array.isArray(fm.tags) || (fm.tags_zh && !Array.isArray(fm.tags_zh))) throw new Error(`${file}: tags must be arrays`);
        if (fm.coverImage && (!fm.coverImage.startsWith('assets/') || fm.coverImage.includes('..') || !fs.existsSync(path.join(ROOT, fm.coverImage)))) {
            throw new Error(`${file}: missing or invalid cover image`);
        }
        outputs.push({ file: path.join(ROOT, fm.linkCaseStudy), html: renderStory(fm, parseStory(body, file)) });
    }
    // Validate every story before writing any generated page.
    for (const output of outputs) {
        fs.mkdirSync(path.dirname(output.file), { recursive: true });
        fs.writeFileSync(output.file, output.html, 'utf8');
    }
    console.log(`Built ${outputs.length} bilingual project introductions`);
}

module.exports = { buildProjectStories };
if (require.main === module) buildProjectStories();
