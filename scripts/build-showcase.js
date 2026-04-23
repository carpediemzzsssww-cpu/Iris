#!/usr/bin/env node
// ================================================
// Build projects + AI Lab JSON from markdown files
// Zero dependencies. Run: node scripts/build-showcase.js
//
// Sources:
//   content/projects/*.md         type: project
//   content/ai-lab/*.md           type: gallery | idea
//
// Outputs:
//   content/projects-data.json    { projects: [...] }
//   content/ai-lab-data.json      { gallery: [...], ideas: [...] }
// ================================================

const fs = require('fs');
const path = require('path');
const { parseFrontmatter, withZh } = require('./lib/frontmatter');

const ROOT = path.resolve(__dirname, '..');
const PROJECTS_SRC = path.join(ROOT, 'content', 'projects');
const AI_LAB_SRC = path.join(ROOT, 'content', 'ai-lab');
const PROJECTS_OUT = path.join(ROOT, 'content', 'projects-data.json');
const AI_LAB_OUT = path.join(ROOT, 'content', 'ai-lab-data.json');

const REQUIRED = {
    project: ['slug', 'title', 'oneLiner', 'role', 'time', 'outcome', 'tags'],
    gallery: ['id', 'title', 'goal', 'prompt', 'model', 'date', 'image'],
    idea:    ['id', 'title', 'content', 'tags', 'date'],
};

function validate(fm, file) {
    if (!fm.type) {
        throw new Error(`${file}: missing required field "type"`);
    }
    if (!REQUIRED[fm.type]) {
        throw new Error(`${file}: unknown type "${fm.type}" (must be project|gallery|idea)`);
    }
    for (const field of REQUIRED[fm.type]) {
        const value = fm[field];
        if (value === undefined || value === null || value === '' ||
            (Array.isArray(value) && value.length === 0)) {
            throw new Error(`${file}: missing required field "${field}" for type "${fm.type}"`);
        }
    }
}

// Flat keys like linkDemo/linkRepo/linkFigma become nested { demo, repo, figma }.
const LINK_KEYS = ['demo', 'repo', 'figma', 'game', 'caseStudy'];

function collectLinks(fm) {
    const links = {};
    for (const key of LINK_KEYS) {
        const flatKey = 'link' + key.charAt(0).toUpperCase() + key.slice(1);
        if (fm[flatKey]) links[key] = fm[flatKey];
    }
    return links;
}

function shapeProject(fm) {
    const out = withZh(fm, {
        slug: fm.slug,
        title: fm.title,
        oneLiner: fm.oneLiner,
        featured: Boolean(fm.featured),
        coverImage: fm.coverImage || '',
        role: fm.role,
        time: fm.time,
        outcome: fm.outcome,
        tags: fm.tags,
        links: collectLinks(fm),
    });
    return out;
}

function shapeGallery(fm) {
    const out = withZh(fm, {
        id: fm.id,
        title: fm.title,
        goal: fm.goal,
        prompt: fm.prompt,
        model: fm.model,
        date: fm.date,
        image: fm.image,
    });
    if (fm.thumbnail) out.thumbnail = fm.thumbnail;
    return out;
}

function shapeIdea(fm) {
    return withZh(fm, {
        id: fm.id,
        title: fm.title,
        content: fm.content,
        tags: fm.tags,
        pinned: Boolean(fm.pinned),
        date: fm.date,
    });
}

function readDir(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => f.endsWith('.md'))
        .filter(f => !f.startsWith('_'))
        .filter(f => f.toLowerCase() !== 'readme.md')
        .sort();
}

function parseFile(dir, file) {
    const source = fs.readFileSync(path.join(dir, file), 'utf8');
    const { frontmatter } = parseFrontmatter(source);
    return frontmatter;
}

function buildProjects(errors) {
    const projects = [];
    for (const file of readDir(PROJECTS_SRC)) {
        try {
            const fm = parseFile(PROJECTS_SRC, file);
            if (fm.type !== 'project') {
                throw new Error(`${file}: content/projects/ expects type: project (got "${fm.type}")`);
            }
            validate(fm, file);
            projects.push({ shape: shapeProject(fm), order: typeof fm.order === 'number' ? fm.order : Infinity });
        } catch (err) {
            errors.push('  - ' + err.message);
        }
    }
    // Sort by explicit order then by slug for stability. Render-time sorting
    // (latest/impact/technical) still happens in projects.js.
    projects.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.shape.slug.localeCompare(b.shape.slug);
    });
    return projects.map(e => e.shape);
}

function buildAiLab(errors) {
    const gallery = [];
    const ideas = [];
    for (const file of readDir(AI_LAB_SRC)) {
        try {
            const fm = parseFile(AI_LAB_SRC, file);
            validate(fm, file);
            if (fm.type === 'gallery') {
                gallery.push({ shape: shapeGallery(fm), date: fm.date || '' });
            } else if (fm.type === 'idea') {
                ideas.push({ shape: shapeIdea(fm), pinned: Boolean(fm.pinned), date: fm.date || '' });
            } else {
                throw new Error(`${file}: content/ai-lab/ expects type: gallery|idea (got "${fm.type}")`);
            }
        } catch (err) {
            errors.push('  - ' + err.message);
        }
    }
    // Gallery: reverse chronological by date, newest first
    gallery.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    // Ideas: pinned first, then reverse chronological
    ideas.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    return {
        gallery: gallery.map(e => e.shape),
        ideas: ideas.map(e => e.shape),
    };
}

function main() {
    const errors = [];
    const projects = buildProjects(errors);
    const aiLab = buildAiLab(errors);

    if (errors.length) {
        console.error('Build failed:\n' + errors.join('\n'));
        process.exit(1);
    }

    fs.writeFileSync(PROJECTS_OUT, JSON.stringify({ projects }, null, 2) + '\n', 'utf8');
    fs.writeFileSync(AI_LAB_OUT, JSON.stringify(aiLab, null, 2) + '\n', 'utf8');

    console.log(`Built ${PROJECTS_OUT}`);
    console.log(`  ${projects.length} projects`);
    console.log(`Built ${AI_LAB_OUT}`);
    console.log(`  ${aiLab.gallery.length} gallery, ${aiLab.ideas.length} ideas`);
}

main();
