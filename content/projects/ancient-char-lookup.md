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
outcome: "Local CLI: 1.7s end-to-end on 1,233 chars, 99.6% match rate against 13,714-char EVOBC dataset. Mid-build discovered ccamc.org anti-bot CAPTCHA blocking the Web data source — re-architected the Web product from “fetch-and-render comparison table” to “navigation table with 4 authoritative source links”, kept CLI as the recommended path. Documented the architectural pivot in README."
outcome_zh: 本地 CLI 1.7 秒处理 1,233 字，命中 EVOBC 13,714 字数据集 99.6%。开发途中实测发现 ccamc.org 对密集请求触发验证码反爬 → 主动重构 Web 端定位（从「在线抓取对照表」改为「四大字源库导航表」），CLI 作为主推交付。架构决策完整写入 README。
tags: [Automation, Prototyping, Product Thinking]
linkDemo: "https://ancient-char-lookup.vercel.app"
linkRepo: "https://github.com/carpediemzzsssww-cpu/ancient-char-lookup"
---
