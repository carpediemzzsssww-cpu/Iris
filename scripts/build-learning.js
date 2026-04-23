#!/usr/bin/env node
// ================================================
// Build Learning Hub JSON from markdown files
// Zero dependencies. Run: node scripts/build-learning.js
// ================================================

const fs = require('fs');
const path = require('path');
const { parseFrontmatter, withZh } = require('./lib/frontmatter');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'content', 'learning');
const OUT_FILE = path.join(ROOT, 'content', 'learning-data.json');

// Fields required per type. If any are missing, build fails with a clear error.
const REQUIRED = {
    prompt:  ['slug', 'title', 'useCase', 'tags', 'variables'],
    method:  ['slug', 'title', 'appliesTo', 'steps', 'summary', 'tags'],
    note:    ['slug', 'title', 'source', 'date', 'takeaways', 'tags'],
    reading: ['slug', 'title', 'author', 'link', 'summary', 'tags'],
};

// ---- Validation ------------------------------------------------------------

function validate(fm, file) {
    if (!fm.type) {
        throw new Error(`${file}: missing required field "type"`);
    }
    if (!REQUIRED[fm.type]) {
        throw new Error(`${file}: unknown type "${fm.type}" (must be prompt|method|note|reading)`);
    }
    for (const field of REQUIRED[fm.type]) {
        const value = fm[field];
        if (value === undefined || value === null || value === '' ||
            (Array.isArray(value) && value.length === 0)) {
            throw new Error(`${file}: missing required field "${field}" for type "${fm.type}"`);
        }
    }
}

// ---- Entry shapers (match the existing rendering-function contracts) -------

function shapePrompt(fm, body) {
    return withZh(fm, {
        slug: fm.slug,
        title: fm.title,
        useCase: fm.useCase,
        template: body,
        variables: fm.variables,
        tags: fm.tags,
    });
}

function shapeMethod(fm, body) {
    return withZh(fm, {
        slug: fm.slug,
        title: fm.title,
        appliesTo: fm.appliesTo,
        steps: fm.steps,
        summary: fm.summary,
        fullContent: body,
        tags: fm.tags,
    });
}

function shapeNote(fm, body) {
    return withZh(fm, {
        slug: fm.slug,
        title: fm.title,
        source: fm.source,
        date: fm.date,
        takeaways: fm.takeaways,
        fullContent: body,
        tags: fm.tags,
    });
}

function shapeReading(fm, body) {
    const out = withZh(fm, {
        slug: fm.slug,
        title: fm.title,
        author: fm.author,
        link: fm.link,
        summary: fm.summary,
        tags: fm.tags,
    });
    if (body && body.trim()) out.fullContent = body;
    return out;
}

const SHAPERS = { prompt: shapePrompt, method: shapeMethod, note: shapeNote, reading: shapeReading };
const BUCKETS = { prompt: 'prompts', method: 'methods', note: 'notes', reading: 'readings' };

// ---- Main ------------------------------------------------------------------

function main() {
    if (!fs.existsSync(SRC_DIR)) {
        console.error(`Source directory not found: ${SRC_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(SRC_DIR)
        .filter(f => f.endsWith('.md'))
        .filter(f => !f.startsWith('_'))   // skip _template-*.md
        .filter(f => f.toLowerCase() !== 'readme.md')
        .sort();

    const output = { prompts: [], methods: [], notes: [], readings: [], tools: [] };
    // Track raw entries with sort keys per bucket so we can order before serializing.
    const raw = { prompts: [], methods: [], notes: [], readings: [] };
    const errors = [];

    for (const file of files) {
        const fullPath = path.join(SRC_DIR, file);
        try {
            const source = fs.readFileSync(fullPath, 'utf8');
            const { frontmatter, body } = parseFrontmatter(source);
            validate(frontmatter, file);
            const bucket = BUCKETS[frontmatter.type];
            const shape = SHAPERS[frontmatter.type](frontmatter, body);
            raw[bucket].push({
                shape,
                order: typeof frontmatter.order === 'number' ? frontmatter.order : Infinity,
                date: frontmatter.date || '',
                title: frontmatter.title || '',
            });
        } catch (err) {
            errors.push(`  - ${err.message}`);
        }
    }

    if (errors.length) {
        console.error('Build failed:\n' + errors.join('\n'));
        process.exit(1);
    }

    // Sorting rules:
    //   - notes: newest date first (reverse chronological), ties broken by title
    //   - others: explicit `order` ascending first, then title ascending
    const byOrderThenTitle = (a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.title.localeCompare(b.title);
    };
    const byDateDescThenTitle = (a, b) => {
        if (a.date !== b.date) return a.date < b.date ? 1 : -1;
        return a.title.localeCompare(b.title);
    };

    output.prompts  = raw.prompts.sort(byOrderThenTitle).map(e => e.shape);
    output.methods  = raw.methods.sort(byOrderThenTitle).map(e => e.shape);
    output.readings = raw.readings.sort(byOrderThenTitle).map(e => e.shape);
    output.notes    = raw.notes.sort(byDateDescThenTitle).map(e => e.shape);

    fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2) + '\n', 'utf8');

    const counts = Object.keys(output)
        .filter(k => k !== 'tools')
        .map(k => `${output[k].length} ${k}`)
        .join(', ');
    console.log(`Built ${OUT_FILE}`);
    console.log(`  ${counts}`);
}

main();
