# Projects 内容源

这个文件夹是 Projects 页的**内容源**。每个 `.md` 文件 = 网站上的一张项目卡。
`_template-*.md` 是模板，不会被发布（以下划线开头的文件会被 build 脚本跳过）。

---

## 最快添加一个项目

```bash
# 1. 从模板复制
cp content/projects/_template-project.md content/projects/my-new-thing.md

# 2. 改 frontmatter（slug 必须唯一，建议跟文件名一致）

# 3. 一条命令发布
./publish-content.sh
```

1–2 分钟后网站上就能看到。

---

## Frontmatter 字段速查

| 字段 | 必填 | 说明 |
|------|------|------|
| `type` | ✓ | 固定写 `project` |
| `slug` | ✓ | 唯一 ID，跟文件名一致 |
| `title` | ✓ | 项目名 |
| `oneLiner` | ✓ | 一句话简介（<= 90 字符最好） |
| `role` | ✓ | 你的角色 |
| `time` | ✓ | 项目时间。格式建议 `2026.03` 或 `2024.06 – 2025.03`（影响排序） |
| `date` |  | 精确到日，eg `2026-09-27`。只用于排序（同一个月的项目靠它分先后），页面上不显示 |
| `outcome` | ✓ | 成果/数据。包含数字时会被 impact 排序识别 |
| `tags` | ✓ | 标签数组，eg `[AI/ML, Product Design]`（决定 tag filter 出现项） |
| `featured` |  | `true` 在 Impact / Technical 排序里置顶，并带高亮边框；默认的 Latest 不置顶 |
| `coverImage` |  | 封面路径，eg `assets/project-covers/projects/xxx.webp`，留空则用无图样式 |
| `linkDemo` |  | 主链接（demo/case study/PDF） |
| `linkRepo` |  | GitHub 链接 |
| `linkFigma` |  | Figma 链接 |
| `linkCaseStudy` |  | 站内项目介绍；有值时卡片优先进入这里，介绍页再提供 demo / GitHub 链接 |
| `storyPage` |  | `true` 从此 Markdown 的双语正文生成项目介绍页 |

### 项目介绍页

新增项目可设置 `storyPage: true` 和 `linkCaseStudy: case-studies/<slug>/index.html`，文件名必须为 `<slug>.md`。
在 frontmatter 之后依次填写 `## English` 和 `## 中文` 两节完整介绍；支持分段与 `**加粗**`。
`node scripts/build-showcase.js` 同时生成卡片 JSON 和双语静态介绍页，英文默认展示；生成后的 HTML 不直接编辑。
`demoLabel` / `demoLabel_zh` 可自定义体验按钮，`tags_zh` 可提供中文标签。
没有真实 demo 地址时省略 `linkDemo`，介绍页不显示虚假体验按钮。

`publish-content.sh` 只暂存 `content/` 内容。更新介绍页时，还需在运行它之前执行
`node scripts/build-showcase.js`，并用 `git add case-studies/<slug>/index.html` 暂存对应生成页；
若新增或更换封面，也要暂存对应的 `assets/` 图片，确保正文、卡片与图片一起发布。

### 双语（可选）

任何字段加 `_zh` 后缀就是中文版本：
`title_zh`、`oneLiner_zh`、`role_zh`、`outcome_zh`。
网站切换到中文时自动使用；缺失则 fallback 英文。

---

## 常见坑

- **YAML 里有冒号**：值用双引号包起来，eg `outcome: "React + Doubao API · deployed"`
- **slug 冲突**：会悄悄覆盖前一个，build 不会报错——请自己保证唯一
- **tags 写法**：内联数组 `[a, b]` 或块列表（下划线缩进 2 空格开头）。避免引号嵌套
- **cover 图格式**：优先 WebP，退化用 JPG。图片大小控制在 500 KB 以内

---

## 排序规则

Projects 页的排序（Latest / Impact / Technical）在浏览器端算，跟文件顺序无关。
默认的 Latest 只看时间，越新越前：有 `date` 的按日期排，没有的按 `time` 里最晚的年月排；同一时间再按 impact 分。
Impact / Technical 会先把 `featured` 项目放在最前。
Build 脚本只保证 JSON 输出稳定——按 `slug` 字母序或显式 `order` 字段。
