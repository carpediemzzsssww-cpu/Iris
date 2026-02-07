# Iris Zhou Portfolio Website

## 项目概述

这是为 Iris Zhou 设计的个人作品集网站原型,采用 **Butterfly × Emergence** 设计主题,展现从混沌到秩序的蜕变过程。

### 设计理念

- **Butterfly (蝴蝶)**: 不直接画蝴蝶,而是通过"蜕变轨迹"表达 - 点阵粒子、细线生长、路径感
- **Emergence (涌现)**: 渐进式揭示内容 - 淡入动画、hover 浮起、从概要到详细的展开

### 核心特色

✅ 成熟专业的视觉系统  
✅ 统一的交互体验  
✅ 响应式设计 (桌面/平板/移动端)  
✅ 高性能动画与过渡效果  
✅ 可扩展的组件架构  

---

## 文件结构

```
portfolio/
├── index.html          # 首页 (Hero, Experience, Projects, Skills, Contact)
├── projects.html       # 项目列表页
├── learning.html       # 学习中心页 (待实现)
├── ai-lab.html        # AI 实验室页 (待实现)
├── about.html         # 关于页 (待实现)
├── project-detail.html # 项目详情页模板 (待实现)
├── styles.css         # 全局样式 (设计系统)
├── pages.css          # 内页专用样式
├── scripts.js         # 全局JavaScript
├── projects.js        # 项目页面逻辑
└── README.md          # 本文档
```

---

## 站点结构

### 导航层级
```
顶部导航 (固定)
├── Home
├── Projects
│   ├── 列表页 (搜索/标签/排序)
│   └── 详情页 (Problem → Insight → Solution → Result)
├── Learning
│   ├── Prompts
│   ├── Methods
│   ├── Notes
│   ├── Readings
│   └── Mini Tools
├── AI Lab
│   ├── AIGC Gallery
│   ├── Agents & Tools
│   └── Ideas & Insights
└── About
```

---

## 视觉设计系统

### 颜色变量
```css
--bg: #F8F9FB                    /* 背景色 */
--surface: rgba(255,255,255,0.75) /* 卡片底色 */
--border: rgba(20,20,30,0.10)    /* 边框 */
--text: #111318                  /* 主文本 */
--muted: rgba(17,19,24,0.62)     /* 次要文本 */
--accent: #0F766E                /* 主色调 (深绿) */
--grad: linear-gradient(120deg, rgba(15,118,110,0.22), rgba(30,58,138,0.22))
```

### 字体系统
- **Display**: Instrument Serif (标题、展示)
- **Body**: DM Sans (正文、界面)

### 间距系统
- Section 间距: 64px
- 卡片内边距: 24px
- 圆角: 12px
- 最大宽度: 1120px

### 栅格系统
- 桌面: 12 columns
- 卡片布局:
  - ≥1200px: 3列
  - ≥768px: 2列
  - <768px: 1列

---

## 核心组件

### 1. TopNav (顶部导航)
- 固定在顶部,带模糊背景
- Active 状态有下划线呼吸动画
- 移动端展开为侧边抽屉

### 2. Card (统一卡片)
- Hover: 上浮 4px + 阴影增强
- Featured 卡片: 渐变边框
- 统一 "View →" 链接

### 3. Timeline (时间线)
- 可展开/折叠详情
- 左侧点状标记
- Hover 向右平移

### 4. Toolbar (工具栏)
- 搜索框 (实时过滤)
- 标签多选
- 排序下拉

### 5. Reveal Animation (揭示动画)
- 进入视口触发
- 淡入 + 上移 6px
- 持续时间: 320ms

---

## 交互规则

### 全局交互
1. **所有内容卡片**: 点击进详情页
2. **Hover 效果**: 统一上浮 4px + 阴影
3. **CTA 按钮**: 主按钮(实心) + 次按钮(Ghost)
4. **细线生长**: Hover 时从中心向两侧扩展

### 页面特定交互

#### Projects 列表页
- 搜索: 标题 + 摘要 + 标签
- 标签: 多选过滤
- 排序: Latest / Impact / Technical
- Featured 项目置顶显示

#### Learning Hub
- 默认显示 Outline
- 点击展开 Full Content
- Copy 按钮: 点击后显示 "Copied!" toast

#### AI Lab
- Gallery: 瀑布流布局
- 点击打开 Lightbox
- 支持左右切换

---

## 页面模板

### 首页 (index.html)
1. **Hero**: 左文字 + 右视觉 + CTA
2. **Navigation Profile**: 4 张 mini card (Product/AI/Research/Build)
3. **Experience**: 可展开时间线 (3-6 条)
4. **Presentation**: 3 项精选展示
5. **Selected Projects**: 精选 6 个项目
6. **Skills**: 技能分组标签
7. **Contact**: Email + 状态条

### 项目详情页 (project-detail.html)
1. **Header**: 标题 + 价值一句话
2. **Meta**: Role / Time / Team / Stack / Links
3. **Problem**: 3-6 行问题描述
4. **Insight**: 关键洞察 (2-4 条)
5. **Solution**: 信息架构 + 交互流
6. **Result**: 指标/交付物/影响 (至少 3 条)
7. **Learnings**: 可迁移能力 (2-4 条)
8. **Related**: 3 个相关项目

---

## 数据结构

### projects.json 示例
```json
{
  "slug": "ai-design-assistant",
  "title": "AI Design Assistant",
  "oneLiner": "Intelligent tool that suggests design improvements",
  "featured": true,
  "role": "Product Designer",
  "time": "Fall 2024",
  "outcome": "34% faster design iterations",
  "tags": ["AI/ML", "Product Design"],
  "links": {
    "demo": "https://...",
    "figma": "https://...",
    "repo": "https://..."
  },
  "sections": {
    "problem": "...",
    "insight": ["...", "..."],
    "solution": "...",
    "result": ["...", "..."],
    "learnings": ["...", "..."]
  }
}
```

---

## 实现步骤

### Phase 1: 核心页面 ✅
- [x] 首页 (index.html)
- [x] 全局样式系统 (styles.css)
- [x] 项目列表页 (projects.html)
- [x] 基础交互 (scripts.js)

### Phase 2: 详情页 (待实现)
- [ ] 项目详情页模板
- [ ] Learning Hub 页面
- [ ] AI Lab 页面
- [ ] About 页面

### Phase 3: 高级功能 (待实现)
- [ ] 暗色模式切换
- [ ] 搜索优化 (模糊搜索)
- [ ] 动态数据加载 (JSON)
- [ ] Canvas 粒子效果 (替换 SVG)

### Phase 4: 优化 (待实现)
- [ ] 图片懒加载
- [ ] 代码分割
- [ ] PWA 支持
- [ ] SEO 优化

---

## 使用说明

### 本地运行

1. **克隆或下载文件**
   ```bash
   # 将所有文件放在同一目录
   portfolio/
   ```

2. **启动本地服务器**
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 或使用 Node.js
   npx serve
   ```

3. **访问网站**
   ```
   http://localhost:8000
   ```

### 部署到 GitHub Pages

1. **创建仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **推送到 GitHub**
   ```bash
   git remote add origin https://github.com/iriszhou/portfolio.git
   git push -u origin main
   ```

3. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 找到 Pages 设置
   - Source 选择 `main` 分支
   - 保存

4. **访问网站**
   ```
   https://iriszhou.github.io/portfolio
   ```

---

## 自定义指南

### 修改颜色主题
在 `styles.css` 中修改 CSS 变量:
```css
:root {
  --accent: #0F766E;  /* 改为你的主色调 */
  --grad: linear-gradient(...);  /* 改为你的渐变 */
}
```

### 添加项目
在 `projects.js` 的 `allProjects` 数组中添加:
```javascript
{
  slug: "new-project",
  title: "New Project",
  oneLiner: "Description...",
  featured: false,
  tags: ["Tag1", "Tag2"],
  // ...
}
```

### 修改字体
在 HTML `<head>` 中替换 Google Fonts 链接,然后更新 CSS:
```css
:root {
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

---

## 设计验收标准

✅ **首屏 10 秒内能回答**:
- 你是谁
- 做什么
- 最强项目
- 怎么联系

✅ **Projects 详情页**:
- 结构一致
- 可扫描
- 结果明确

✅ **Learning 模块**:
- 不像仓库
- 像可复用的输出体系

✅ **AI Lab**:
- 有实验记录格式
- 不是随手丢作品

✅ **Butterfly × Emergence**:
- 点阵背景
- 细线生长
- 渐变浮现
- 逐步展开
- 无装饰贴图

---

## 技术栈

- **HTML5**: 语义化标记
- **CSS3**: 变量、Grid、Flexbox、动画
- **Vanilla JavaScript**: 无框架依赖
- **Google Fonts**: Instrument Serif + DM Sans

### 浏览器支持
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 性能优化建议

1. **图片优化**
   - 使用 WebP 格式
   - 实现懒加载
   - 响应式图片 (`srcset`)

2. **代码优化**
   - 压缩 CSS/JS
   - 使用 CDN
   - 启用 Gzip

3. **动画优化**
   - 使用 `will-change`
   - 避免 Layout Shift
   - 使用 `requestAnimationFrame`

---

## 常见问题

### Q: 为什么导航没有下划线动画?
A: 检查是否添加了 `active` class,CSS 中的 `::after` 动画依赖这个类名。

### Q: 项目卡片 Hover 没有轨迹线效果?
A: 这个效果通过 CSS `::before` 伪元素实现,确保浏览器支持 CSS transitions。

### Q: 移动端菜单打不开?
A: 检查 JavaScript 是否正确加载,查看浏览器控制台是否有错误。

### Q: 如何添加新页面?
A: 复制现有页面 HTML,修改内容,更新导航链接即可。保持统一的 TopNav 和 Footer。

---

## 贡献指南

欢迎改进建议! 如果你想:
- 报告 Bug
- 建议新功能
- 提交代码

请访问: `https://github.com/iriszhou/portfolio/issues`

---

## 版权信息

© 2026 Iris Zhou. All rights reserved.

设计与代码遵循 MIT License。你可以自由使用此模板,但请保留原作者信息。

---

## 联系方式

- **Email**: iris@example.com
- **LinkedIn**: linkedin.com/in/iriszhou
- **GitHub**: github.com/iriszhou

---

**祝你打造出色的作品集! 🎨✨**
