---
type: project
slug: yili-selection-agent
title: "Yili: Product Selection Agent"
title_zh: 一粒 · 选品 Agent
oneLiner: An e-commerce selection agent that reads Xiaohongshu demand and 1688 supply
oneLiner_zh: 电商选品 Agent：读小红书的需求、看 1688 的供给，写一份选品报告
featured: false
coverImage: assets/project-covers/projects/yili-selection-agent-cover.webp
coverAlt: The Yili home page, with the name above a search box and suggested categories
coverAlt_zh: 一粒首页：品牌名、搜索框和推荐品类
coverWidth: 1600
coverHeight: 600
role: Product Design & Development
role_zh: 产品设计与开发
time: "2026.05 – 2026.06"
date: 2026-06-07
outcome: 19-node LangGraph agent · 290 Xiaohongshu notes and 344 1688 listings across 5 categories · 181 tests · reports stream in over SSE
outcome_zh: 19 节点 LangGraph Agent · 5 个品类、290 条小红书笔记与 344 条 1688 货源 · 181 个测试 · 报告经 SSE 流式生成
tags: [AI/ML, Automation, Systems Design, Product Design]
tags_zh: [AI/ML, 自动化, 系统设计, 产品设计]
storyPage: true
linkCaseStudy: case-studies/yili-selection-agent/index.html
---
## English

Yili is a product-selection agent for e-commerce sellers. Type a direction, such as desk storage or camping gear, and it reads both sides of the market: what people are asking for in Xiaohongshu notes, and what suppliers on 1688 already sell. Then it scores the gaps between the two and writes a selection report.

Behind the page is a 19-node LangGraph workflow. It first checks whether the category holds up and who it is for, then plans which steps and weights fit the data at hand. If the gap analysis or the rule filter leaves too little to work with, it can re-plan once instead of forcing an answer. DeepSeek handles extraction, planning and scoring, and Doubao evaluates the direction and writes the recommendations. I ran it end to end on 5 categories, with 290 notes and 344 listings, and the backend has 181 tests.

The report streams in over SSE while the agent works. On screen it looks like a stack of warm paper, and each sheet turns from pencil to ink as its step finishes. The live demo is offline for now, so this page shares the design and the thinking instead of a working link.

## 中文

一粒是一个电商选品 Agent。输入一个方向，比如「桌面收纳」或「露营装备」，它会看市场的两头：小红书笔记里大家在要什么，1688 上的供应商已经在卖什么；再给两者之间的空档打分，写成一份选品报告。

页面背后是一张 19 个节点的 LangGraph。它先判断这个品类成不成立、是给谁的，再根据手上的数据决定走哪些步骤、权重怎么配；如果缺口分析或规则筛选之后剩下的太少，它可以重新规划一次，而不是硬凑一个答案。DeepSeek 负责信号提取、规划和评分，豆包负责方向评估和写建议。我用 5 个品类、290 条笔记和 344 条货源把整条链路跑通，后端有 181 个测试。

报告通过 SSE 边跑边出。界面是一叠暖色的纸：每完成一步，那一页就从铅笔稿变成墨水字。线上体验暂时下线了，所以这里只放设计和思路，没有体验链接。
