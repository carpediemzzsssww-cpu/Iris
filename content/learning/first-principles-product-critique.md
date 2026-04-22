---
type: prompt
slug: first-principles-product-critique
title: First-Principles Product Critique
title_zh: 第一性原理产品拆解
order: 10
useCase: Pressure-testing a product idea against self-validation bias
useCase_zh: 把产品创意往死里拆，看它是不是自己骗自己
variables:
  - product_idea
  - target_user
tags: [Product Thinking, AI Co-thinking, Strategy]
---
I have a product idea and I need you to be a rigorous thinking partner, not a cheerleader.

PRODUCT IDEA:
{product_idea}

TARGET USER:
{target_user}

Walk me through this critique in order:

1. WHAT EXISTING BEHAVIOR does this replace? If the answer is "nothing" -- that's a red flag, not a feature. Most products that claim to create new behavior are actually exploiting an unmet need within an existing one.

2. IS THIS GENUINELY 10x BETTER at the core job, or just 2x better with AI sprinkled on top? Be brutally honest. "It uses AI" is not a value proposition.

3. WHAT PSYCHOLOGICAL MECHANISM does this tap into? The most successful products exploit how people already think (loss aversion, social proof, completion bias) rather than asking them to think differently.

4. WHERE DOES THIS BREAK? Describe the scenario where a real user tries this and gives up. What's the friction point? What's the "I'll just do it the old way" moment?

5. WHAT WOULD MAKE ME WRONG? If this idea is actually good, what evidence would I need to see in the first 100 users?

Don't soften your critique. I'd rather kill a bad idea now than build it for two months.
