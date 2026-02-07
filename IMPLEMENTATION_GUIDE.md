# Iris Zhou Portfolio - 实现指南

## 项目现状

### ✅ 已完成
1. **核心页面**
   - index.html (首页 - 完整)
   - projects.html (项目列表 - 完整)
   - about.html (关于页 - 完整)

2. **样式系统**
   - styles.css (全局设计系统)
   - pages.css (内页专用样式)

3. **交互逻辑**
   - scripts.js (全局功能)
   - projects.js (项目页面逻辑)

4. **设计系统**
   - 颜色变量
   - 字体系统
   - 间距规范
   - 组件库基础

### 🚧 待完成
1. project-detail.html (项目详情页)
2. learning.html (学习中心)
3. ai-lab.html (AI 实验室)
4. 暗色模式
5. 更多交互细节

---

## 详情页实现指南

### 项目详情页 (project-detail.html)

#### 模板结构
```html
<!-- Header Section -->
<section class="project-detail-header">
  <div class="container">
    <h1 class="detail-title">项目标题</h1>
    <p class="detail-value">核心价值一句话</p>
    
    <div class="detail-meta">
      <div class="meta-item">
        <span class="meta-label">Role</span>
        <span class="meta-value">Product Designer</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Time</span>
        <span class="meta-value">Fall 2024</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Team</span>
        <span class="meta-value">2 Designers, 3 Engineers</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Stack</span>
        <span class="meta-value">React, Python, Figma</span>
      </div>
    </div>
    
    <div class="detail-links">
      <a href="#" class="btn btn-primary">View Demo</a>
      <a href="#" class="btn btn-ghost">Figma File</a>
      <a href="#" class="btn btn-ghost">GitHub</a>
    </div>
  </div>
</section>

<!-- Content Sections -->
<section class="detail-content">
  <div class="container" style="max-width: 800px;">
    
    <!-- Problem -->
    <div class="content-section">
      <h2 class="section-heading">Problem</h2>
      <p class="content-text">
        问题描述,包括用户痛点、市场背景、设计挑战等...
      </p>
    </div>
    
    <!-- Insight -->
    <div class="content-section">
      <h2 class="section-heading">Key Insights</h2>
      <ul class="insight-list">
        <li>洞察1: 从研究中发现的关键发现</li>
        <li>洞察2: 数据驱动的用户行为模式</li>
        <li>洞察3: 竞品分析得出的机会点</li>
      </ul>
    </div>
    
    <!-- Solution -->
    <div class="content-section">
      <h2 class="section-heading">Solution</h2>
      <h3 style="font-size: 20px; margin: 24px 0 12px;">Information Architecture</h3>
      <p class="content-text">
        描述信息架构的设计思路...
      </p>
      
      <h3 style="font-size: 20px; margin: 24px 0 12px;">Interaction Flow</h3>
      <p class="content-text">
        描述核心交互流程...
      </p>
      
      <h3 style="font-size: 20px; margin: 24px 0 12px;">Visual Design</h3>
      <p class="content-text">
        描述视觉设计决策...
      </p>
    </div>
    
    <!-- Result -->
    <div class="content-section">
      <h2 class="section-heading">Results & Impact</h2>
      <ul class="insight-list">
        <li>指标1: 用户激活率提升 34%</li>
        <li>指标2: 5,000+ 周活跃用户</li>
        <li>指标3: 4.8/5 用户满意度评分</li>
        <li>交付物: 完整设计系统,8 个核心组件</li>
      </ul>
    </div>
    
    <!-- Learnings -->
    <div class="content-section">
      <h2 class="section-heading">Key Learnings</h2>
      <ul class="learning-list">
        <li>学习1: 如何在有限时间内权衡设计质量与速度</li>
        <li>学习2: 跨职能协作中的沟通技巧</li>
        <li>学习3: 数据驱动决策的最佳实践</li>
      </ul>
    </div>
  </div>
</section>

<!-- Related Projects -->
<section class="related-section">
  <h2 class="section-heading">Related Projects</h2>
  <div class="container">
    <div class="related-grid">
      <!-- 3 个相关项目卡片 -->
    </div>
  </div>
</section>
```

#### JavaScript 加载逻辑
```javascript
// project-detail.js
const urlParams = new URLSearchParams(window.location.search);
const projectSlug = urlParams.get('slug');

// 从 allProjects 找到对应项目
const project = allProjects.find(p => p.slug === projectSlug);

if (project) {
  // 填充页面内容
  document.querySelector('.detail-title').textContent = project.title;
  document.querySelector('.detail-value').textContent = project.oneLiner;
  // ... 其他字段
  
  // 加载相关项目
  const relatedProjects = allProjects
    .filter(p => p.slug !== projectSlug)
    .filter(p => p.tags.some(tag => project.tags.includes(tag)))
    .slice(0, 3);
  
  renderRelatedProjects(relatedProjects);
}
```

---

## Learning Hub 实现指南

### learning.html 结构

```html
<!-- Tabs Navigation -->
<section class="tabs-container">
  <div class="container">
    <div class="tabs-nav">
      <button class="tab-button active" data-tab="prompts">Prompts</button>
      <button class="tab-button" data-tab="methods">Methods</button>
      <button class="tab-button" data-tab="notes">Notes</button>
      <button class="tab-button" data-tab="readings">Readings</button>
      <button class="tab-button" data-tab="tools">Mini Tools</button>
    </div>
    
    <!-- Prompts Tab -->
    <div class="tab-content active" id="prompts-tab">
      <div class="learning-cards" id="promptsList"></div>
    </div>
    
    <!-- Methods Tab -->
    <div class="tab-content" id="methods-tab">
      <div class="learning-cards" id="methodsList"></div>
    </div>
    
    <!-- 其他 Tabs... -->
  </div>
</section>
```

### 数据结构示例
```javascript
// learning-data.js
const learningData = {
  prompts: [
    {
      slug: "user-research-synthesis",
      title: "User Research Synthesis Prompt",
      useCase: "Analyzing interview transcripts",
      template: "Analyze the following user interview transcript and extract: 1) Key pain points, 2) Unexpected insights, 3) Design opportunities...",
      variables: ["transcript", "research_question"],
      tags: ["Research", "UX"]
    }
  ],
  methods: [
    {
      slug: "jobs-to-be-done",
      title: "Jobs-to-be-Done Framework",
      appliesTo: "Product Strategy, User Research",
      steps: 5,
      summary: "Framework for understanding user motivation...",
      fullContent: "详细步骤..."
    }
  ],
  // ... 其他类别
};
```

### 卡片组件
```javascript
function renderPromptCard(prompt) {
  return `
    <div class="learning-card">
      <div class="learning-card-header">
        <h3 class="learning-card-title">${prompt.title}</h3>
        <button class="copy-button" onclick="copyPrompt('${prompt.slug}')">
          Copy
        </button>
      </div>
      <p class="learning-card-meta">Use case: ${prompt.useCase}</p>
      <p class="learning-card-summary">${prompt.template.substring(0, 150)}...</p>
      <div class="project-tags">
        ${prompt.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
      </div>
      <button class="expand-toggle" onclick="toggleExpand(this)">
        Show Full Prompt
      </button>
      <div class="learning-card-full">
        <pre>${prompt.template}</pre>
        <p><strong>Variables:</strong> ${prompt.variables.join(', ')}</p>
      </div>
    </div>
  `;
}

function copyPrompt(slug) {
  const prompt = learningData.prompts.find(p => p.slug === slug);
  navigator.clipboard.writeText(prompt.template);
  // 显示 toast 提示
}
```

---

## AI Lab 实现指南

### ai-lab.html 结构

```html
<main class="main-content">
  <!-- AIGC Gallery -->
  <section class="gallery-section">
    <div class="container">
      <h2 class="section-title">AIGC Gallery</h2>
      <div class="gallery-grid" id="galleryGrid"></div>
    </div>
  </section>
  
  <!-- Agents & Tools -->
  <section class="experiments-section">
    <div class="container">
      <h2 class="section-title">Agents & Tools</h2>
      <div class="learning-cards" id="experimentsList"></div>
    </div>
  </section>
  
  <!-- Ideas & Insights -->
  <section class="ideas-section">
    <div class="container">
      <h2 class="section-title">Ideas & Insights</h2>
      <div class="ideas-list" id="ideasList"></div>
    </div>
  </section>
</main>

<!-- Lightbox -->
<div class="lightbox" id="lightbox">
  <button class="lightbox-close" onclick="closeLightbox()">×</button>
  <div class="lightbox-content">
    <div class="lightbox-image" id="lightboxImage"></div>
    <div class="lightbox-info" id="lightboxInfo"></div>
  </div>
</div>
```

### 数据结构
```javascript
const aiLabData = {
  gallery: [
    {
      id: 1,
      title: "Abstract Landscape",
      goal: "Explore AI-generated art styles",
      prompt: "A surreal landscape blending organic and geometric forms...",
      model: "Midjourney v6",
      date: "2024-01-15",
      imageUrl: "placeholder.jpg"
    }
  ],
  experiments: [
    {
      slug: "design-agent",
      title: "AI Design Critique Agent",
      goal: "Build an agent that provides design feedback",
      setup: "Using Claude API + custom prompts",
      result: "70% accuracy in identifying UI issues",
      next: "Add multi-modal analysis (screenshots)"
    }
  ],
  ideas: [
    {
      id: 1,
      title: "Progressive Disclosure in AI Interfaces",
      content: "Most AI tools dump all options upfront. What if we revealed capabilities gradually based on user expertise?",
      tags: ["UX", "AI"],
      pinned: true
    }
  ]
};
```

---

## 暗色模式实现

### CSS 变量扩展
```css
/* 在 styles.css 添加 */
[data-theme="dark"] {
  --bg: #0D1117;
  --surface: rgba(22, 27, 34, 0.75);
  --border: rgba(240, 246, 252, 0.1);
  --text: #E6EDF3;
  --muted: rgba(230, 237, 243, 0.62);
  --accent: #3FB950;
  --grad: linear-gradient(120deg, rgba(63, 185, 80, 0.22), rgba(56, 139, 253, 0.22));
}
```

### JavaScript 切换
```javascript
// 添加到 scripts.js
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// 页面加载时应用保存的主题
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
```

### UI 切换按钮
```html
<!-- 在 TopNav 添加 -->
<button class="nav-action" onclick="toggleTheme()" title="Toggle Theme">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
</button>
```

---

## 性能优化建议

### 1. 图片优化
```html
<!-- 使用响应式图片 -->
<img 
  src="image-small.jpg" 
  srcset="image-small.jpg 400w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="Description"
  loading="lazy"
>
```

### 2. 代码分割
```javascript
// 只在需要时加载项目数据
async function loadProjects() {
  const { allProjects } = await import('./data/projects.js');
  return allProjects;
}
```

### 3. CSS 优化
```css
/* 使用 will-change 提示浏览器优化 */
.project-card {
  will-change: transform;
}

/* 只在 hover 时应用复杂动画 */
.project-card:hover {
  animation: complexEffect 0.3s ease-out;
}
```

---

## 部署清单

### GitHub Pages 部署步骤

1. **准备文件**
   ```bash
   # 确保所有文件在根目录
   portfolio/
   ├── index.html
   ├── projects.html
   ├── about.html
   ├── styles.css
   ├── scripts.js
   └── README.md
   ```

2. **初始化仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio website"
   ```

3. **推送到 GitHub**
   ```bash
   git remote add origin https://github.com/iriszhou/portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **启用 Pages**
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main / (root)
   - Save

5. **自定义域名 (可选)**
   - 添加 CNAME 文件: `iriszhou.com`
   - 在域名提供商配置 DNS

---

## 测试清单

### 功能测试
- [ ] 所有导航链接正常工作
- [ ] 搜索功能正确过滤
- [ ] 标签过滤可多选
- [ ] 排序功能生效
- [ ] 时间线可展开/折叠
- [ ] 移动端菜单正常
- [ ] 表单验证正常

### 视觉测试
- [ ] 所有断点响应正常 (Desktop/Tablet/Mobile)
- [ ] 动画流畅 (60fps)
- [ ] 颜色对比度符合 WCAG AA
- [ ] 字体加载正常
- [ ] 图标显示正确

### 性能测试
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] 无 Layout Shift

### 浏览器兼容性
- [ ] Chrome (最新)
- [ ] Firefox (最新)
- [ ] Safari (最新)
- [ ] Edge (最新)
- [ ] 移动端 Safari
- [ ] 移动端 Chrome

---

## 下一步行动

### 立即可做
1. 创建 project-detail.html
2. 准备真实项目内容
3. 添加项目截图/视频
4. 完善 About 页面文案

### 短期目标 (1-2 周)
1. 实现 Learning Hub
2. 实现 AI Lab
3. 添加暗色模式
4. 优化移动端体验

### 中期目标 (1 个月)
1. 撰写博客文章
2. 制作项目演示视频
3. SEO 优化
4. 添加 Analytics

### 长期目标
1. 定期更新内容
2. A/B 测试优化
3. 收集用户反馈
4. 持续迭代改进

---

**祝实现顺利! 有问题随时参考这份指南 📋**
