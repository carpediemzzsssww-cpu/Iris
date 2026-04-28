---
type: project
slug: ancient-char-lookup
title: Ancient Char Lookup
title_zh: 古文字字源工具
oneLiner: "CLI + Web tool for ancient Chinese script lookup — printable Oracle/Bronze/Seal comparison tables"
oneLiner_zh: 古文字字源查询工具：粘贴汉字 → 一键生成「甲骨/金文/战国/篆书」可打印对照表
featured: false
role: Solo Designer-Developer
role_zh: 独立设计开发
time: "2026.04"
outcome: "Local CLI: 1.7s on 1,233 chars at 99.6%. Web hit anti-bot CAPTCHA mid-build, shipped a graceful source-link fallback first. Returned 24h later — discovered the anti-bot is window-based, not permanent — and rebuilt with a 5-layer resilience stack (server cache · CN↔TW fallback · silent-failure detection · per-char singleflight · auto-degrade) plus a form-ancient/voice-modern UI inversion."
outcome_zh: 本地 CLI 1.7 秒命中 1,233 字 99.6%。Web 开发途中撞上 ccamc.org 反爬 → 先紧急降级为「字源链接表」上线。24 小时后回测发现反爬是窗口性惩罚而非永久封禁，遂重建：叠加 5 层韧性（30 天缓存 · 简↔繁回退 · 静默失败检测 · 同字 singleflight · 自动降级）+「视觉古籍 · 文字现代」反向 UI。
tags: [Automation, Prototyping, Product Thinking]
linkDemo: "case-studies/ancient-char-lookup/index.html"
linkRepo: "https://github.com/carpediemzzsssww-cpu/ancient-char-lookup"
---
