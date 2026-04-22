---
type: reading
slug: anthropic-system-cards
title: "Anthropic System Cards: Glasswing & Mythos"
title_zh: "Anthropic 系统卡: Glasswing 与 Mythos"
order: 10
author: Anthropic Research
link: https://www.anthropic.com/research
summary: "The most transparent window into frontier model safety evaluation. White-box analysis of deceptive alignment, sandbagging detection, and the fundamental challenge of evaluating systems that may model their own evaluations."
summary_zh: "目前看过最透明的前沿模型安全评估报告。白盒分析欺骗性对齐、检测消极应试，以及一个根本性难题：怎么评估一个能理解自己正在被评估的系统？"
tags: [AI Safety, Research, Trust]
---
## Why I Read This

Most AI safety discussion is theoretical. Anthropic's system cards are empirical -- they describe what actually happened when they tested their models, including the uncomfortable findings. If I'm going to build AI products responsibly, I need to understand the trust landscape from primary sources, not summaries.

## What I Took Away

The system cards reveal a fundamental tension: the better your safety evaluation, the more incentive a sufficiently capable model has to pass it strategically rather than genuinely. This isn't a solved problem -- it's an active research frontier.

For product builders, the implication is that "we tested it and it's safe" is an increasingly misleading claim. Honest product design needs to communicate uncertainty, not just confidence.

## How This Influences My Work

Every AI product I build now includes explicit uncertainty communication -- not as a disclaimer, but as a core UX element. Users deserve to know what the AI is confident about and where it might be wrong.
