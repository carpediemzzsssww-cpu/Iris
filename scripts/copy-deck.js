#!/usr/bin/env node
// ================================================
// Copy deck: the site's copy in one Markdown file, in page order, for editing by hand.
//
//   node scripts/copy-deck.js export [file]   write the deck (default: 文案清单.md, git-ignored)
//   node scripts/copy-deck.js apply [file]    write the edits back to content/*.json and
//                                             content/projects/*.md, and list what changed
//
// After apply: node scripts/build-showcase.js (project fields feed the generated pages), and
// python3 scripts/subset-fonts.py when Chinese display copy changed.
// Entries edited in the deck are matched by their `#id`, so labels and order can change freely.
// ================================================

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const DEFAULT_FILE = path.join(ROOT, '文案清单.md');

// ---------- What goes in the deck, in page order ----------
// An item is [key, label, options]; options: enOnly (Chinese mode shows the English too),
// zhOnly (the English side is data, not copy), html (the value is HTML: *x* stands for <em>x</em>),
// fixed (read-only note shown with the entry).

const ex = (list) => list.map(([key, label, opts]) => ({ key, label, ...(opts || {}) }));

const DECK = [
    {
        page: '首页',
        sections: [
            { title: '开场（第一屏）', note: '最大的名字 Iris Zhou 写在页面代码里，不在清单中。', items: ex([
                ['home.kicker', '名字上方的小字（{n} 会换成作品总数）', { enOnly: true }],
                ['home.title', '名字下面的展名', { enOnly: true }],
                ['home.sub', '一句话介绍自己'],
                ['home.fact.school', '事实 1：学校'],
                ['home.fact.now', '事实 2：现在在哪'],
                ['home.fact.ask', '找数字分身聊天的按钮'],
                ['home.hint', '左下角的滚动提示'],
            ]) },
            { title: '展线 № 01', items: ex([
                ['home.room1', '左上角的展厅名（№ 01 后面）'],
                ['home.lot', '展品编号前的词（Lot 04 / 展品 04）'],
                ['home.enter', '墙上说明底部的链接'],
            ]) },
            { title: '展线上的作品', works: true,
              note: '每件作品三条：标题（卡片和墙上说明都用）、墙上说明的一句话、卡片上的材质行。顺序就是展线顺序，按时间从新到旧。' },
            { title: '展线最后一件：全部作品档案', items: ex([
                ['home.archive.card', '档案卡片上数字下面的字'],
                ['home.archive.title', '墙上说明的标题'],
                ['home.archive.desc', '墙上说明的一句话（{n} 会换成作品总数）'],
                ['home.archive.cta', '墙上说明底部的链接'],
            ]) },
            { title: '门厅引言（展厅和阅读室之间）', items: ex([
                ['home.quote', '灯亮起来时那句话（*星号* 包住的词是紫色强调）', { html: true }],
            ]) },
            { title: '№ 02 The path so far', items: ex([
                ['home.room3', '展室标题', { enOnly: true }],
                ['home.path.lead', '标题下的一句话（取自 About 页你写的副标题）'],
                ['home.room3.sub', '那句话下面的小字'],
                ['home.now', '经历里标在「现在」那一段的小标签'],
                ['home.curator', '照片下的小标签'],
                ['home.curator.note', '照片下的一句话'],
                ['section.experience', '小标题：经历'],
                ['exp.xiaohongshu.name', '小红书 · 名称'],
                ['exp.xiaohongshu.role', '小红书 · 职位'],
                ['exp.xiaohongshu.date', '小红书 · 时间'],
                ['exp.xiaohongshu.impact', '小红书 · 一句话'],
                ['exp.xiaohongshu.d1', '小红书 · 展开后 1'],
                ['exp.xiaohongshu.d2', '小红书 · 展开后 2'],
                ['exp.xiaohongshu.d3', '小红书 · 展开后 3'],
                ['exp.xiaohongshu.d4', '小红书 · 展开后 4'],
                ['exp.bestcem.name', '倍市得 · 名称', { fixed: '时间 2026.02 - 2026.05 写在页面代码里' }],
                ['exp.bestcem.role', '倍市得 · 职位'],
                ['exp.bestcem.impact', '倍市得 · 一句话'],
                ['exp.bestcem.d1', '倍市得 · 展开后 1'],
                ['exp.bestcem.d2', '倍市得 · 展开后 2'],
                ['exp.bestcem.d3', '倍市得 · 展开后 3'],
                ['exp.bestcem.d4', '倍市得 · 展开后 4'],
                ['section.education', '小标题：教育'],
                ['edu.whu.name', '武大 · 名称', { fixed: '时间 2023.9-2027.6 写在页面代码里' }],
                ['edu.whu.degree', '武大 · 学位'],
                ['edu.whu.impact', '武大 · 一句话'],
                ['edu.whu.d1', '武大 · 展开后 1'],
                ['edu.whu.d2', '武大 · 展开后 2'],
                ['edu.paris.name', '巴黎 · 名称', { fixed: '时间 2025.9-2026.1 写在页面代码里' }],
                ['edu.paris.role', '巴黎 · 身份'],
                ['edu.paris.impact', '巴黎 · 一句话'],
                ['edu.paris.d1', '巴黎 · 展开后 1'],
                ['edu.paris.d2', '巴黎 · 展开后 2'],
                ['edu.sjtu.name', '上海交大 · 名称', { fixed: '时间 2025.6-7 写在页面代码里' }],
                ['edu.sjtu.role', '上海交大 · 身份'],
                ['edu.sjtu.impact', '上海交大 · 一句话'],
                ['edu.sjtu.d1', '上海交大 · 展开后 1'],
                ['edu.sjtu.d2', '上海交大 · 展开后 2'],
                ['edu.sjtu.d3', '上海交大 · 展开后 3'],
                ['section.skills', '小标题：技能与工具', { fixed: '各组里的工具名（Prompt Engineering、RAG…）写在页面代码里，只有英文' }],
                ['skills.ai', '分组名 1'],
                ['skills.product', '分组名 2'],
                ['skills.technical', '分组名 3'],
                ['skills.language', '分组名 4'],
                ['skills.lang.en', '语言 · 英语'],
                ['skills.lang.fr', '语言 · 法语'],
                ['skills.lang.ja', '语言 · 日语'],
                ['skills.lang.zh', '语言 · 中文'],
            ]) },
            { title: '№ 03 Things that think（4 个数字，说明收在「+」里）', items: ex([
                ['home.room2', '展室标题', { enOnly: true }],
                ['hero.subtitle', '标题下的一句话'],
                ['home.spec.xhs.meta', '① 400 / 40（旁边手写批注 ×10）· 小字', { fixed: '数字 400 / 40 写在页面代码里，要改直接告诉我' }],
                ['home.spec.xhs.title', '① 标题'],
                ['home.spec.xhs.desc', '① 说明'],
                ['home.spec.yili.unit', '② 19 · 数字后的单位', { fixed: '数字 19 写在页面代码里' }],
                ['home.spec.yili.meta', '② 小字'],
                ['home.spec.yili.title', '② 标题'],
                ['home.spec.yili.desc', '② 说明'],
                ['home.spec.prd.unit', '③ +17.5% · 数字后的单位', { fixed: '数字 +17.5% 写在页面代码里' }],
                ['home.spec.prd.meta', '③ 小字'],
                ['home.spec.prd.title', '③ 标题'],
                ['home.spec.prd.desc', '③ 说明'],
                ['home.spec.echo.unit', '④ 1,287 · 数字后的单位', { fixed: '数字 1,287 写在页面代码里' }],
                ['home.spec.echo.meta', '④ 小字'],
                ['home.spec.echo.title', '④ 标题'],
                ['home.spec.echo.desc', '④ 说明'],
                ['home.spec.open', '链接文字：② 一粒'],
                ['home.spec.more', '「+」按钮的读屏文字'],
                ['home.spec.try', '链接文字：③ PRD Copilot'],
                ['home.spec.read', '链接文字：④ 网易 Hi Echo'],
            ]) },
            { title: '出口（联系）', items: ex([
                ['home.exit', '标题上方的小字'],
                ['contact.title', '标题', { enOnly: true }],
                ['contact.subtitle', '标题下的一句话'],
                ['contact.status', '绿点旁边的状态'],
                ['home.askIrisy', '最下面找 Irisy 的链接'],
            ]) },
            { title: '平时看不到的', items: ex([
                ['home.closed', '作品数据加载失败时的提示'],
                ['home.closed.link', '加载失败时的链接'],
                ['home.showDetails', '展开按钮的读屏文字'],
            ]) },
        ],
    },
    {
        page: '全站',
        sections: [
            { title: '加载提示和页脚', items: ex([
                ['loader.text', '加载时月亮旁边的字'],
                ['footer.tagline', '页脚名字下的一句话'],
                ['footer.walked', '页脚的步数（{m} 会换成米数）'],
                ['footer.contact', '页脚链接：联系'],
                ['footer.colophon', '页脚链接：本站说明'],
                ['social.xhs', '小红书的名字（首页最后的联系方式和每页页脚；中文模式下排在联系方式第一个）'],
                ['footer.setIn', '页脚最底下的字体说明'],
                ['footer.copyright', '版权'],
            ]) },
        ],
    },
    {
        page: '本站说明（colophon.html）',
        sections: [
            { title: '开头', items: ex([
                ['colophon.title', '大标题', { enOnly: true }],
                ['colophon.subtitle', '大标题下的一句话'],
                ['colophon.idea.title', '小标题'],
                ['colophon.idea.body', '想法'],
            ]) },
            { title: '字体', items: ex([
                ['colophon.type.title', '小标题'],
                ['colophon.type.intro', '开头一句'],
                ['colophon.type.moniqa', 'Moniqa（首页名字）的用途'],
                ['colophon.type.cormorant', 'Cormorant Garamond 的用途'],
                ['colophon.type.dmsans', 'DM Sans 的用途'],
                ['colophon.type.compagnon', 'Compagnon 的用途'],
                ['colophon.type.dmmono', 'DM Mono 的用途'],
                ['colophon.type.xiangcui', '香萃刻宋的用途'],
                ['colophon.type.noto', 'Noto Serif SC 的用途'],
            ]) },
            { title: '颜色', items: ex([
                ['colophon.color.title', '小标题'],
                ['colophon.color.night', '色块 1'],
                ['colophon.color.label', '色块 2'],
                ['colophon.color.cream', '色块 3'],
                ['colophon.color.ink', '色块 4'],
                ['colophon.color.plum', '色块 5'],
                ['colophon.color.sage', '色块 6'],
            ]) },
            { title: '小细节', items: ex([
                ['colophon.details.title', '小标题'],
                ['colophon.details.iris', ''],
                ['colophon.details.lantern', ''],
                ['colophon.details.dust', ''],
                ['colophon.details.shadow', ''],
                ['colophon.details.color', ''],
                ['colophon.details.spot', ''],
                ['colophon.details.counter', ''],
                ['colophon.details.marginalia', ''],
                ['colophon.details.cover', ''],
                ['colophon.details.lots', ''],
                ['colophon.details.lights', ''],
                ['colophon.details.moon', ''],
                ['colophon.details.walk', ''],
                ['colophon.details.irisy', ''],
                ['colophon.details.globe', ''],
                ['colophon.details.spin', ''],
            ]) },
            { title: '怎么做的、致谢', items: ex([
                ['colophon.built.title', '小标题'],
                ['colophon.built.body', ''],
                ['colophon.credits.title', '小标题'],
                ['colophon.credits.body', ''],
                ['colophon.credits.license', '链接：字体授权'],
                ['colophon.back', '链接：回首页'],
            ]) },
        ],
    },
    {
        page: '404 页',
        sections: [
            { title: '空展台', items: ex([
                ['nf.no', '展品编号'],
                ['nf.title', '大标题', { enOnly: true }],
                ['nf.medium', '材质行'],
                ['nf.body', '说明'],
                ['nf.home', '链接：回首页'],
                ['nf.archive', '链接：看全部作品'],
            ]) },
        ],
    },
    {
        page: '足迹（travel.html）',
        sections: [
            { title: '黄铜地球仪', note: '地球仪上刻的字（大洲、海洋、题签上的 IRIS ZHOU）是英文，刻在黄铜上，不在清单里。城市和国家的中文名在 content/footprints-data.json。', items: ex([
                ['travel.globe.kicker', '左上角展签：小字'],
                ['travel.legend.lingered', '图例 1：石榴红图钉（收藏 20 个以上的城市）'],
                ['travel.legend.city', '图例 2：珍珠图钉'],
                ['travel.legend.country', '图例 3：玫瑰金的国家'],
                ['travel.hint', '底部提示（电脑）'],
                ['travel.hintTouch', '底部提示（手机）'],
                ['travel.loading', '加载时的字'],
                ['travel.tip.saved', '图钉标签：收藏数（{n} 会换成数字）'],
                ['travel.tip.visited', '图钉标签：没有收藏的城市'],
                ['travel.btn.turn', '按钮 1：慢慢转（读屏文字和悬停提示）'],
                ['travel.btn.zoom', '按钮 2：凑近看'],
                ['travel.btn.reset', '按钮 3：回到巴黎'],
            ]) },
        ],
    },
    {
        page: '其他页面这次改过的',
        sections: [
            { title: 'About、Resume、Projects', items: ex([
                ['about.intro2', 'About · 第二段'],
                ['about.connectDesc', 'About · 联系那一段'],
                ['resume.subtitle', 'Resume · 标题下的一句话（简历先隐藏了）'],
                ['projects.moreTags', 'Projects · 展开更多标签的按钮'],
                ['projects.fewerTags', 'Projects · 收起标签的按钮'],
            ]) },
            { title: 'Projects 页的标签（中文模式下显示）', tags: true,
              note: '英文就是标签名本身（也用来筛选），这里只改中文。' },
        ],
    },
];

// ---------- Content access ----------

function listJsonFiles() {
    return fs.readdirSync(CONTENT).filter(f => f.endsWith('.json') && !/-data\.json$/.test(f) && f !== 'config.json');
}

function readTranslations(file) {
    const data = JSON.parse(fs.readFileSync(path.join(CONTENT, file), 'utf8'));
    return data.translations || data;
}

function buildKeyIndex() {
    const index = {};
    for (const file of listJsonFiles()) {
        const t = readTranslations(file);
        for (const key of Object.keys(t)) {
            if (t[key] && typeof t[key] === 'object' && 'en' in t[key]) index[key] = { file, value: t[key] };
        }
    }
    return index;
}

function projectsData() {
    return JSON.parse(fs.readFileSync(path.join(CONTENT, 'projects-data.json'), 'utf8')).projects || [];
}

// Newest first, as in the gallery (scripts/home.js).
function dateKey(item) {
    const exact = String(item.date || '').match(/^(20\d{2})-(\d{1,2})-(\d{1,2})$/);
    if (exact) return Number(exact[1]) * 10000 + Number(exact[2]) * 100 + Number(exact[3]);
    let latest = 0;
    String(item.time || '').replace(/(20\d{2})(?:[.\-/](\d{1,2}))?/g, (m, y, mo) => {
        latest = Math.max(latest, Number(y) * 100 + Math.min(12, Number(mo) || 1));
        return m;
    });
    return latest * 100;
}

function exhibits() {
    return projectsData().filter(p => p.exhibit && p.coverImage).sort((a, b) => dateKey(b) - dateKey(a));
}

const WORK_FIELDS = [
    ['title', '标题'],
    ['oneLiner', '墙上说明的一句话'],
    ['medium', '卡片上的材质行'],
];

function readProjectFields(slug) {
    const raw = fs.readFileSync(path.join(CONTENT, 'projects', slug + '.md'), 'utf8');
    const block = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const fields = {};
    for (const line of (block ? block[1] : '').split(/\r?\n/)) {
        const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
        if (m) fields[m[1]] = unquote(m[2].trim());
    }
    return fields;
}

function unquote(s) {
    if (s.length > 1 && ((s[0] === '"' && s.endsWith('"')) || (s[0] === "'" && s.endsWith("'")))) return s.slice(1, -1);
    return s;
}

// What is live: the same files at origin/main, to mark copy that changed since.
function liveFile(relPath) {
    try {
        return execFileSync('git', ['show', 'origin/main:' + relPath], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    } catch (e) {
        return null;
    }
}

function liveTranslations() {
    const out = {};
    for (const file of listJsonFiles()) {
        const raw = liveFile('content/' + file);
        if (!raw) continue;
        try {
            const data = JSON.parse(raw);
            Object.assign(out, data.translations || data);
        } catch (e) { /* skip */ }
    }
    return out;
}

// ---------- Display <-> stored text ----------

const ENTITIES = { '&mdash;': '—', '&ndash;': '–', '&middot;': '·', '&rarr;': '→', '&hellip;': '…', '&nbsp;': '\u00a0', '&amp;': '&', '&times;': '×', '&eacute;': 'é', '&egrave;': 'è', '&agrave;': 'à', '&ccedil;': 'ç', '&ouml;': 'ö', '&uuml;': 'ü', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' };

function toDeck(value, html) {
    let s = String(value);
    if (html) {
        s = s.replace(/<em>([\s\S]*?)<\/em>/g, '*$1*');
        s = s.replace(/&[a-z]+;/g, e => ENTITIES[e] || e);
    }
    return s.replace(/\s*\n\s*/g, ' ').trim();
}

function fromDeck(text, html) {
    let s = text.trim();
    if (html) {
        s = s.replace(/&(?![a-z]+;|#\d+;)/g, '&amp;').replace(/\u00a0/g, '&nbsp;');
        s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    }
    return s;
}

// ---------- Export ----------

function exportDeck(file) {
    const keys = buildKeyIndex();
    const live = liveTranslations();
    const hasLive = Object.keys(live).length > 0;
    const out = [];
    let count = 0;
    const today = new Date().toISOString().slice(0, 10);

    out.push('# Iris 个人网站 · 文案清单', '');
    out.push(`生成于 ${today}。改完告诉我「文案改好了」，我把它写回网站、重新生成页面，你看过再上线。`, '');
    out.push('## 怎么改', '');
    out.push('- 只改 `EN:` 和 `中文:` 后面的文字，每条保持一行。');
    out.push('- 每条标题后面 # 开头的那串编号，是它在网站里的位置，别改也别删。');
    out.push('- 标着「只显示英文」的条目，中文模式下也显示这行英文，所以只有 EN。');
    out.push('- 用 `*星号*` 包住的词是强调，页面上显示成紫色；`{n}`、`{m}` 会被换成数字，保留它们。');
    out.push('- 不想改的就不动。想删掉某条、加新的，或者对某条有想法，直接在旁边写备注，我来处理。');
    if (hasLive) out.push('- 标 🆕 的是这次新写或改过、还没上线的，建议先看这些。');
    out.push('- 括号里的说明（数字、时间这些）写在页面代码里，只供核对，要改直接告诉我。', '');

    const tocAt = out.length;
    const toc = [];

    const entry = (item, value, liveValue) => {
        const isNew = hasLive && (!liveValue || liveValue.en !== value.en || liveValue.zh !== value.zh);
        const label = item.label ? `**${item.label}**` : '';
        const tags = [item.enOnly ? '（只显示英文）' : '', isNew ? ' 🆕' : ''].join('');
        out.push(`${label}${label ? ' ' : ''}\`#${item.key}\`${tags}`);
        if (!item.zhOnly) out.push(`- EN: ${toDeck(value.en, item.html)}`);
        if (!item.enOnly) out.push(`- 中文: ${toDeck(value.zh, item.html)}`);
        if (item.fixed) out.push(`- （${item.fixed}）`);
        out.push('');
        count++;
    };

    DECK.forEach((page, pi) => {
        const num = '一二三四五六七八九'[pi];
        out.push('---', '', `## ${num}、${page.page}`, '');
        toc.push(`- ${num}、${page.page}`);
        page.sections.forEach((section, si) => {
            out.push(`### ${si + 1}. ${section.title}`, '');
            if (section.note) out.push(`> ${section.note}`, '');
            if (section.works) {
                exhibits().forEach((p, i) => {
                    const fields = readProjectFields(p.slug);
                    out.push(`#### 展品 ${String(i + 1).padStart(2, '0')} · ${fields.title || p.title}`, '');
                    const liveRaw = liveFile(`content/projects/${p.slug}.md`);
                    const liveFields = {};
                    if (liveRaw) {
                        const block = liveRaw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
                        for (const line of (block ? block[1] : '').split(/\r?\n/)) {
                            const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
                            if (m) liveFields[m[1]] = unquote(m[2].trim());
                        }
                    }
                    WORK_FIELDS.forEach(([field, label]) => {
                        const value = { en: fields[field] || '', zh: fields[field + '_zh'] || '' };
                        const liveValue = liveRaw ? { en: liveFields[field] || '', zh: liveFields[field + '_zh'] || '' } : null;
                        entry({ key: `work:${p.slug}:${field}`, label }, value, liveValue);
                    });
                });
                return;
            }
            if (section.tags) {
                Object.keys(keys).filter(k => k.startsWith('tag.')).sort().forEach(k => {
                    entry({ key: k, label: k.slice(4), zhOnly: true }, keys[k].value, live[k]);
                });
                return;
            }
            section.items.forEach(item => {
                const found = keys[item.key];
                if (!found) throw new Error(`Deck lists ${item.key}, but no content file has it`);
                entry(item, found.value, live[item.key]);
            });
        });
    });

    out.splice(tocAt, 0, '## 目录', '', ...toc, '');
    fs.writeFileSync(file, out.join('\n').replace(/\n{3,}/g, '\n\n'));
    console.log(`Wrote ${count} entries to ${path.relative(process.cwd(), file) || file}`);
}

// ---------- Apply ----------

function parseDeck(text) {
    const entries = {};
    let current = null;
    for (const rawLine of text.split(/\r?\n/)) {
        const line = rawLine.trim();
        const id = line.match(/`#([^`]+)`/);
        if (id) {
            current = entries[id[1]] = {};
            continue;
        }
        if (!current) continue;
        const en = line.match(/^(?:[-*]\s*)?EN\s*[:：]\s?(.*)$/);
        const zh = line.match(/^(?:[-*]\s*)?中文\s*[:：]\s?(.*)$/);
        if (en) current.en = en[1];
        else if (zh) current.zh = zh[1];
    }
    return entries;
}

function deckItems() {
    const items = {};
    DECK.forEach(page => page.sections.forEach(section => (section.items || []).forEach(item => { items[item.key] = item; })));
    return items;
}

function writeJsonValue(file, key, value) {
    const full = path.join(CONTENT, file);
    let raw = fs.readFileSync(full, 'utf8');
    const pattern = new RegExp('^(\\s*)"' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '":\\s*\\{.*\\}(,?)[ \\t]*$', 'm');
    const m = raw.match(pattern);
    if (!m) throw new Error(`${file}: could not find a one-line entry for ${key}`);
    const line = `${m[1]}"${key}": { "en": ${JSON.stringify(value.en)}, "zh": ${JSON.stringify(value.zh)} }${m[2]}`;
    raw = raw.slice(0, m.index) + line + raw.slice(m.index + m[0].length);
    JSON.parse(raw);
    fs.writeFileSync(full, raw);
}

function frontmatterValue(value) {
    const plain = value.trim();
    const risky = plain === '' || /^-?\d+(\.\d+)?$/.test(plain) || plain === 'true' || plain === 'false' ||
        (plain.startsWith('[') && plain.endsWith(']')) || /^["']/.test(plain) && /["']$/.test(plain);
    return risky ? JSON.stringify(plain) : plain;
}

function writeProjectField(slug, field, value) {
    const full = path.join(CONTENT, 'projects', slug + '.md');
    let raw = fs.readFileSync(full, 'utf8');
    const end = raw.indexOf('\n---', 4);
    let head = raw.slice(0, end), tail = raw.slice(end);
    const line = `${field}: ${frontmatterValue(value)}`;
    const pattern = new RegExp('^' + field + '\\s*:.*$', 'm');
    if (pattern.test(head)) head = head.replace(pattern, () => line);
    else {
        const base = field.replace(/_zh$/, '');
        const basePattern = new RegExp('^' + base + '\\s*:.*$', 'm');
        const bm = head.match(basePattern);
        head = bm ? head.slice(0, bm.index + bm[0].length) + '\n' + line + head.slice(bm.index + bm[0].length) : head + '\n' + line;
    }
    fs.writeFileSync(full, head + tail);
}

function applyDeck(file) {
    const edits = parseDeck(fs.readFileSync(file, 'utf8'));
    const keys = buildKeyIndex();
    const items = deckItems();
    const changes = [], warnings = [], englishEdits = [];
    const SMART = /[\u2018\u2019\u201c\u201d]/;

    for (const [id, edit] of Object.entries(edits)) {
        const work = id.match(/^work:([a-z0-9-]+):(title|oneLiner|medium)$/);
        if (work) {
            const [, slug, field] = work;
            if (!fs.existsSync(path.join(CONTENT, 'projects', slug + '.md'))) { warnings.push(`#${id}: no such project`); continue; }
            const current = readProjectFields(slug);
            for (const [side, name] of [['en', field], ['zh', field + '_zh']]) {
                if (edit[side] === undefined) continue;
                const next = edit[side].trim();
                if (!next) { warnings.push(`#${id} ${side}: left empty, kept the old text`); continue; }
                if (next !== (current[name] || '')) {
                    writeProjectField(slug, name, next);
                    changes.push(`#${id} ${side}: ${current[name] || '(none)'}  →  ${next}`);
                    if (SMART.test(next)) warnings.push(`#${id} ${side}: has curly quotes`);
                }
            }
            continue;
        }
        const found = keys[id];
        if (!found) { warnings.push(`#${id}: not a known key, skipped`); continue; }
        const item = items[id] || (id.startsWith('tag.') ? { zhOnly: true } : {});
        const now = found.value;
        const next = { en: now.en, zh: now.zh };
        // Text that reads the same as before (an entity shown as its character) is not an edit.
        const edited = (side, label) => {
            const text = edit[side];
            if (text === undefined || text.trim() === toDeck(now[side], item.html)) return;
            if (text.trim()) next[side] = fromDeck(text, item.html);
            else warnings.push(`#${id} ${label}: left empty, kept the old text`);
        };
        if (!item.zhOnly) edited('en', 'EN');
        if (item.enOnly) next.zh = next.en;
        else edited('zh', '中文');
        if (next.en !== now.en || next.zh !== now.zh) {
            writeJsonValue(found.file, id, next);
            if (next.en !== now.en) englishEdits.push({ key: id, before: now.en, after: next.en });
            if (next.en !== now.en) changes.push(`#${id} en: ${now.en}  →  ${next.en}`);
            if (next.zh !== now.zh && !item.enOnly) changes.push(`#${id} zh: ${now.zh}  →  ${next.zh}`);
            if (SMART.test(next.en + next.zh)) warnings.push(`#${id}: has curly quotes`);
        }
    }

    const fallbacks = syncMarkupFallbacks(englishEdits, warnings);
    console.log(changes.length ? `Changed ${changes.length}:\n  ` + changes.join('\n  ') : 'No changes.');
    if (fallbacks.length) console.log(`\nEnglish in the page markup updated in: ${fallbacks.join(', ')}`);
    if (warnings.length) console.log(`\nNotes:\n  ` + warnings.join('\n  '));
    if (changes.some(c => c.startsWith('#work:'))) console.log('\nProject fields changed: run node scripts/build-showcase.js');
}

// ---------- English in the page markup ----------
// Elements carry their English as fallback text: `<p data-i18n="key">English</p>`. When a key's English
// changes, the fallback follows, but only where it still reads like the old English.

const MARKUP_FILES = () => fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).concat(['components.js']);

function plainText(html) {
    return String(html).replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, e => ENTITIES[e] || e).replace(/\s+/g, ' ').trim();
}

function escapeMarkup(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function syncMarkupFallbacks(edits, warnings) {
    const touched = [];
    if (!edits.length) return touched;
    for (const file of MARKUP_FILES()) {
        const full = path.join(ROOT, file);
        if (!fs.existsSync(full)) continue;
        const raw = fs.readFileSync(full, 'utf8');
        let out = raw;
        for (const edit of edits) {
            const key = edit.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp('(<([a-z0-9]+)\\b[^>]*\\bdata-i18n(-html)?="' + key + '"[^>]*>)([\\s\\S]*?)(</\\2>)', 'g');
            out = out.replace(pattern, (match, open, tag, isHtml, inner, close) => {
                if (plainText(inner) !== plainText(edit.before)) {
                    warnings.push(`${file}: fallback for ${edit.key} differs from the old English, left as is`);
                    return match;
                }
                let text = isHtml ? edit.after : escapeMarkup(edit.after);
                if (file.endsWith('.js')) text = text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                const lead = inner.match(/^\s*/)[0], trail = inner.match(/\s*$/)[0];
                return open + lead + text + trail + close;
            });
        }
        if (out !== raw) {
            fs.writeFileSync(full, out);
            touched.push(file);
        }
    }
    return touched;
}

// ---------- CLI ----------

const [command, fileArg] = process.argv.slice(2);
const file = fileArg ? path.resolve(fileArg) : DEFAULT_FILE;
if (command === 'export') exportDeck(file);
else if (command === 'apply') applyDeck(file);
else {
    console.log('Usage: node scripts/copy-deck.js export|apply [file]');
    process.exit(1);
}
