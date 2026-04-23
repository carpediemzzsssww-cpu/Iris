# AI Lab 内容源

这个文件夹存两类 AI Lab 内容：

- **Gallery**：AIGC 画廊作品（Midjourney 等）——前缀 `gallery-*.md`，`type: gallery`
- **Ideas**：随想笔记（AI / UX / 产品思考）——前缀 `idea-*.md`，`type: idea`

`_template-*.md` 和下划线开头的文件不会被发布。

> **注意**：AI Lab 的 `featuredExperiment` 和 `experiments` 暂时还在 `ai-lab.js` 里硬编码，
> 因为内容稀少（各 1 条）。等到真的要加第 2、3 条时再迁过来。

---

## 最快添加一条

```bash
# 加一张 Midjourney 图
cp content/ai-lab/_template-gallery.md content/ai-lab/gallery-my-new-work.md

# 加一条 idea
cp content/ai-lab/_template-idea.md content/ai-lab/idea-my-thought.md

# 发布
./publish-content.sh
```

---

## Gallery frontmatter

| 字段 | 必填 | 说明 |
|------|------|------|
| `type` | ✓ | `gallery` |
| `id` | ✓ | 唯一数字 id（决定 lightbox 打开哪张） |
| `title` | ✓ | 作品名 |
| `goal` | ✓ | 做这张想探索什么 |
| `prompt` | ✓ | 完整 prompt（含参数） |
| `model` | ✓ | `Midjourney v7` 等 |
| `date` | ✓ | `YYYY-MM-DD`（决定排序：新→旧） |
| `image` | ✓ | 图片路径，eg `./assets/ai-lab/xxx.png` |
| `thumbnail` |  | 缩略图路径（没有就用 image） |
| `title_zh`, `goal_zh` |  | 中文版本 |

## Idea frontmatter

| 字段 | 必填 | 说明 |
|------|------|------|
| `type` | ✓ | `idea` |
| `id` | ✓ | 唯一数字 id |
| `title` | ✓ | 标题 |
| `content` | ✓ | 正文（写在 frontmatter 里，一段话） |
| `tags` | ✓ | 标签数组 |
| `date` | ✓ | `YYYY-MM-DD` |
| `pinned` |  | `true` 会置顶 |
| `title_zh`, `content_zh` |  | 中文版本 |

---

## 常见坑

- **prompt 字段里有冒号**：整段用双引号包起来
- **id 必须唯一**：gallery 和 idea 各自维护一套 id 空间
- **图片路径**：相对 `ai-lab.html` 的路径，通常是 `./assets/ai-lab/xxx.png`
