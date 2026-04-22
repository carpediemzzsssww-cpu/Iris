# Learning Hub 内容源

这个文件夹是 Learning Hub 的**内容源**。每个 `.md` 文件 = 网站上的一张卡片。
`_template-*.md` 是模板，不会被发布（以下划线开头的文件会被 build 脚本跳过）。

---

## 最快添加一条内容

```bash
# 1. 从模板复制（选一个：prompt / method / note / reading）
cp content/learning/_template-note.md content/learning/my-new-insight.md

# 2. 用任意编辑器改 frontmatter + body（Obsidian / iA Writer / VS Code 都行）
#    - 不确定归到哪个 tab？先写 type: note，以后改一行就行
#    - slug 必须唯一（建议跟文件名一致）

# 3. 一条命令发布
./publish-learning.sh
```

1-2 分钟后网站上就能看到。就这。

---

## Frontmatter 字段速查

所有 type 都必填 `type`、`slug`、`title`、`tags`。其他字段按 type 不同：

| type    | 额外必填字段                                       | 正文渲染为            |
|---------|--------------------------------------------------|----------------------|
| prompt  | `useCase`, `variables: [...]`                    | 复制到剪贴板的模板    |
| method  | `appliesTo`, `steps`(数字), `summary`            | 展开后的完整说明      |
| note    | `source`, `date` (YYYY-MM-DD), `takeaways: [...]`| 展开后的完整笔记      |
| reading | `author`, `link`, `summary`                      | 可选 — 展开的个人笔记 |

### 双语支持（可选）

任何字段加 `_zh` 后缀就是中文版本。网站切换到中文时自动使用。

```yaml
title: When Models Read the Observer
title_zh: 当模型开始观察观察者
summary: "White-box analysis reveals..."
summary_zh: "白盒分析揭示了..."
```

只翻译标题和摘要就够了——正文不翻也能用（会 fallback 到英文）。

### 排序字段（可选）

默认排序：
- **notes**: 按 `date` 倒序（最新的在前）
- **prompts / methods / readings**: 按 `order` 升序（数字越小越靠前），没写就按标题字母序

想把某条钉在最前？加 `order: 1`。想空出位置插队？用 `order: 10 / 20 / 30` 这样的间隔。

---

## 增删改

| 操作 | 方法 |
|-----|------|
| 加  | 新建 `.md` 文件 → `./publish-learning.sh` |
| 改  | 编辑 `.md` 文件 → `./publish-learning.sh` |
| 删  | `rm content/learning/xxx.md` → `./publish-learning.sh` |
| 换 tab | 改 `type:` 那一行 → `./publish-learning.sh` |

---

## 本地预览（可选）

```bash
# 只 build 不 push（看看 JSON 对不对）
node scripts/build-learning.js

# 启本地服务器看效果
npx http-server . -p 8090 -c-1
# 打开 http://localhost:8090/learning.html
```

---

## 坑点

- **Frontmatter 里带冒号的字符串要用引号**: `summary: "冒号: 后面"` 不然 YAML 会把冒号当字段分隔符
- **slug 不要带空格或中文**: 用 kebab-case（`anthropic-safety-frontier`）
- **takeaways 用数组写法**:
  ```yaml
  takeaways:
    - "第一条"
    - "第二条"
  ```
  或者
  ```yaml
  takeaways: ["第一条", "第二条"]
  ```
- **验证失败 build 会退出并告诉你哪个文件、哪个字段**：修好再跑一次
