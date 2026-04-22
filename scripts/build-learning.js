#!/usr/bin/env node
// ================================================
// Build Learning Hub JSON from markdown files
// Zero dependencies. Run: node scripts/build-learning.js
// ================================================

const fs = require('fs');
const path = require('path');

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

// ---- Minimal YAML frontmatter parser ---------------------------------------
// Supports: scalar values, quoted strings, inline arrays [a, b], block lists
// (key:\n  - item\n  - item), and numbers. That's enough for our schema.

function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) {
        throw new Error('No frontmatter block found (must start with ---)');
    }
    const yamlBlock = match[1];
    const body = match[2];

    const lines = yamlBlock.split(/\r?\n/);
    const data = {};
    let currentKey = null;
    let currentList = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        // Block list item: `  - value`
        const listItemMatch = line.match(/^\s{2,}-\s+(.*)$/);
        if (listItemMatch && currentList) {
            currentList.push(unquote(listItemMatch[1].trim()));
            continue;
        }

        // Top-level `key: value` or `key:` (start of block list)
        const kvMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
        if (!kvMatch) continue;

        const key = kvMatch[1];
        const rawValue = kvMatch[2].trim();

        if (rawValue === '') {
            // Block list starts on next line(s)
            currentKey = key;
            currentList = [];
            data[key] = currentList;
            continue;
        }

        // Inline array: [a, b, c]
        if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
            data[key] = rawValue.slice(1, -1)
                .split(',')
                .map(s => unquote(s.trim()))
                .filter(s => s !== '');
            currentList = null;
            continue;
        }

        // Number
        if (/^-?\d+(\.\d+)?$/.test(rawValue)) {
            data[key] = Number(rawValue);
            currentList = null;
            continue;
        }

        // Scalar string (strip quotes if present)
        data[key] = unquote(rawValue);
        currentList = null;
    }

    return { frontmatter: data, body: body.trimEnd() };
}

function unquote(s) {
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
        return s.slice(1, -1);
    }
    return s;
}

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

// Copy any `<key>_zh` fields from frontmatter into the output object. The site's
// _t() helper (learning.js) falls back to the bilingual Chinese variant when lang=zh.
function withZh(fm, out) {
    for (const key in fm) {
        if (key.endsWith('_zh') && fm[key]) out[key] = fm[key];
    }
    return out;
}

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
