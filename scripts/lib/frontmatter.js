// Shared frontmatter parser used by build-learning.js and build-showcase.js.
// Supports: scalar values, quoted strings, inline arrays [a, b], block lists
// (key:\n  - item\n  - item), numbers, and booleans.

function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) {
        throw new Error('No frontmatter block found (must start with ---)');
    }
    const yamlBlock = match[1];
    const body = match[2];

    const lines = yamlBlock.split(/\r?\n/);
    const data = {};
    let currentList = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        const listItemMatch = line.match(/^\s{2,}-\s+(.*)$/);
        if (listItemMatch && currentList) {
            currentList.push(unquote(listItemMatch[1].trim()));
            continue;
        }

        const kvMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
        if (!kvMatch) continue;

        const key = kvMatch[1];
        const rawValue = kvMatch[2].trim();

        if (rawValue === '') {
            currentList = [];
            data[key] = currentList;
            continue;
        }

        if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
            data[key] = rawValue.slice(1, -1)
                .split(',')
                .map(s => unquote(s.trim()))
                .filter(s => s !== '');
            currentList = null;
            continue;
        }

        if (/^-?\d+(\.\d+)?$/.test(rawValue)) {
            data[key] = Number(rawValue);
            currentList = null;
            continue;
        }

        if (rawValue === 'true' || rawValue === 'false') {
            data[key] = rawValue === 'true';
            currentList = null;
            continue;
        }

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

// Copy any `<key>_zh` fields from frontmatter into the output object.
// The site's _t() / getLocalizedField() helpers fall back to the _zh
// variant when lang=zh.
function withZh(fm, out) {
    for (const key in fm) {
        if (key.endsWith('_zh') && fm[key]) out[key] = fm[key];
    }
    return out;
}

module.exports = { parseFrontmatter, unquote, withZh };
