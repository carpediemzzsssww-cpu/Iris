---
type: project
slug: shigu
title: "Shigu: Ancient Script Flashcards"
title_zh: 识古｜古文字识读记忆
oneLiner: An offline iPhone flashcard app for reading ancient Chinese script before the exam
oneLiner_zh: 文字学考前自用的古文字识读 PWA：看甲骨金文，回忆简体字
featured: false
coverImage: assets/project-covers/projects/shigu-cover.webp
coverAlt: Two phone screens, the home page with 126 key characters and a card showing an ancient glyph
coverAlt_zh: 两张手机截图：126 个课堂重点字的首页，和一张古文字识读卡
coverWidth: 1600
coverHeight: 1000
role: Design & Development
role_zh: 设计与开发
time: "2026.06"
outcome: 1,218 characters · 126 key characters with offline glyphs from oracle bone to seal script · Leitner spaced repetition · works offline on iPhone
outcome_zh: 1,218 字 · 126 个课堂重点字带甲骨到篆书的离线字形 · Leitner 间隔重复 · iPhone 离线可用
tags: [Product Design, Prototyping, Local-first]
tags_zh: [产品设计, 原型设计, 本地优先]
storyPage: true
linkCaseStudy: case-studies/shigu/index.html
linkDemo: https://learn-ancient-character.vercel.app
linkRepo: https://github.com/carpediemzzsssww-cpu/learn-ancient-character
demoLabel: Start reviewing
demoLabel_zh: 开始识古
---
## English

Shigu started as exam prep. My Chinese philology course asked us to read ancient characters, from oracle bone and bronze inscriptions to seal script, and name the modern character each one became. I wanted to practice on my phone in spare minutes, even without a signal.

So the app does one thing: it shows an ancient glyph and asks which character it is. The 126 characters stressed in class come first, each with offline glyphs from up to four eras. Anything I miss goes into a review queue and keeps coming back within the round until I get it right, while Leitner-style spacing decides when each card returns.

When I want to go wider, the full table of 1,218 characters is there to browse by radical. It is a statically exported Next.js app with progress stored in IndexedDB. It installs on the iPhone home screen and makes no network requests once it has loaded.

## 中文

识古是我为文字学考试做的。考试要看甲骨、金文、战国文字和篆书，认出它对应的简体字；我想在手机上随手刷，没信号也能刷。

所以它只做一件事：给你一个古文字字形，问「这是哪个字？」。课堂上讲过的 126 个重点字优先出现，每个字带着最多四个时代的离线字形。答错的字进「不会」队列，同一组里答不对就一直回来；Leitner 间隔重复决定它下一次什么时候出现。

想看得更广，就去「探索」按部首翻全部 1,218 个字。它是一个静态导出的 Next.js 应用，进度存在 IndexedDB 里，可以装到 iPhone 主屏，打开以后不再发任何网络请求。
