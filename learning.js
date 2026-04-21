// ================================================
// Learning Hub JavaScript
// ================================================

function _lang() {
    return (window.i18n && window.i18n.getLang) ? window.i18n.getLang() : 'en';
}

function _t(obj, field) {
    if (_lang() === 'zh' && obj[field + '_zh']) return obj[field + '_zh'];
    return obj[field];
}

const learningData = {
    prompts: [
        {
            slug: "first-principles-product-critique",
            title: "First-Principles Product Critique",
            title_zh: "\u7b2c\u4e00\u6027\u539f\u7406\u4ea7\u54c1\u62c6\u89e3",
            useCase: "Pressure-testing a product idea against self-validation bias",
            useCase_zh: "\u628a\u4ea7\u54c1\u521b\u610f\u5f80\u6b7b\u91cc\u62c6\uff0c\u770b\u5b83\u662f\u4e0d\u662f\u81ea\u5df1\u9a97\u81ea\u5df1",
            template: `I have a product idea and I need you to be a rigorous thinking partner, not a cheerleader.

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

Don't soften your critique. I'd rather kill a bad idea now than build it for two months.`,
            variables: ["product_idea", "target_user"],
            tags: ["Product Thinking", "AI Co-thinking", "Strategy"]
        },
        {
            slug: "build-to-learn-scoping",
            title: "Build-to-Learn Project Scoping",
            title_zh: "\u300c\u505a\u4e2d\u5b66\u300d\u9879\u76ee\u8bbe\u8ba1",
            useCase: "Designing a side project where the primary goal is learning, not shipping",
            useCase_zh: "\u8bbe\u8ba1\u4e00\u4e2a\u4e3b\u8981\u76ee\u6807\u662f\u5b66\u4e1c\u897f\u800c\u4e0d\u662f\u4ea4\u4ed8\u7684\u9879\u76ee",
            template: `I want to learn about {learning_goal} by building something, not by reading about it.

MY CURRENT UNDERSTANDING:
{current_knowledge}

TIME I CAN INVEST:
{time_budget}

Help me design a build-to-learn project:

1. WHAT SHOULD I BUILD? Propose 2-3 concrete projects where the BUILD PROCESS itself forces me to confront the hard parts of {learning_goal}. Not tutorials -- real things with real users or real stakes.

2. MINIMUM VIABLE LEARNING: What's the smallest version I can build in {time_budget} that still teaches me the core concept? I want to hit the "aha moment" fast, not build a polished product.

3. WHERE WILL I GET STUCK? Predict the top 3 moments where I'll be confused or frustrated. For each, tell me what that confusion teaches me and one specific resource for getting unstuck.

4. HOW DO I KNOW I LEARNED IT? Define a concrete test -- not "I understand X" but "I can explain X to someone" or "I can build Y without looking anything up."

5. WHAT SHOULD I WRITE DOWN? What observations during the build process are worth capturing for future reference?

I learn by doing, not by studying. Optimize for fastest time-to-insight, not most comprehensive coverage.`,
            variables: ["learning_goal", "current_knowledge", "time_budget"],
            tags: ["Learning", "Building", "Meta-cognition"]
        },
        {
            slug: "ai-safety-unpacker",
            title: "AI Safety Implications Unpacker",
            title_zh: "AI \u5b89\u5168\u542b\u4e49\u62c6\u89e3",
            useCase: "Going deeper on an AI safety finding to understand what it means for product builders",
            useCase_zh: "\u770b\u5230\u4e00\u4e2a AI \u5b89\u5168\u53d1\u73b0\uff0c\u62c6\u89e3\u5b83\u5bf9\u505a\u4ea7\u54c1\u7684\u4eba\u610f\u5473\u7740\u4ec0\u4e48",
            template: `I just read something about AI safety and I need help thinking through the implications -- not just what it says, but what it means for people building AI products.

SOURCE:
{source_material}

KEY FINDING THAT STRUCK ME:
{finding}

Help me think through this in layers:

1. RESTATE THE TECHNICAL CLAIM in plain language. What is actually being demonstrated? Strip away the framing.

2. WHAT DOES THIS MEAN FOR TRUST? If this finding is true at scale, how should it change how users trust AI systems? How should it change how product teams present AI capabilities?

3. WHAT'S THE PRODUCT IMPLICATION? If I'm building an AI product, what should I design differently knowing this? Be specific -- not "be more careful" but concrete design decisions.

4. WHERE IS THE BOUNDARY? This finding shows AI can do X. Where exactly does that capability stop? What's the gap between the demo and real-world deployment?

5. WHAT QUESTION SHOULD I BE ASKING that nobody is asking yet? Based on this finding, what adjacent concern or opportunity is being overlooked?

I'm not looking for a summary. I'm looking for the second-order and third-order implications that most people skip.`,
            variables: ["source_material", "finding"],
            tags: ["AI Safety", "Critical Thinking", "Product Ethics"]
        },
        {
            slug: "cross-disciplinary-synthesis",
            title: "Cross-Disciplinary Synthesis",
            title_zh: "\u8de8\u5b66\u79d1\u878d\u5408",
            useCase: "Connecting an insight from one field to a problem in another -- rigorously, not just as metaphor",
            useCase_zh: "\u628a A \u9886\u57df\u7684\u6d1e\u5bdf\u642c\u5230 B \u9886\u57df\u89e3\u9898\u2014\u2014\u8981\u4e25\u8c28\uff0c\u4e0d\u53ea\u662f\u6253\u6bd4\u65b9",
            template: `I noticed something interesting and I think it connects to a completely different domain, but I need help making the connection rigorous.

INSIGHT FROM {source_field}:
{insight}

PROBLEM IN {target_field}:
{problem}

Help me build the bridge:

1. WHAT'S THE STRUCTURAL PARALLEL? Strip both down to their abstract form. What pattern do they share? (Not a surface metaphor -- a structural one.)

2. WHAT TRANSFERS AND WHAT DOESN'T? Which specific elements of the insight apply to the problem? Where does the analogy break down? The breakdown is as important as the connection.

3. WHAT DOES THE SOURCE FIELD KNOW that the target field hasn't figured out yet? What solutions, frameworks, or vocabulary already exist that could be imported?

4. WHAT WOULD A PRACTITIONER IN {target_field} OBJECT TO? Play devil's advocate. Why might someone who works in {target_field} dismiss this connection?

5. WHAT'S THE TESTABLE CLAIM? Turn this synthesis into one specific, falsifiable hypothesis I could actually test.

I come from a literature and media background building AI products. I find the most interesting ideas at the boundaries between fields, but I want to make sure I'm being rigorous, not just clever.`,
            variables: ["source_field", "insight", "target_field", "problem"],
            tags: ["Synthesis", "Interdisciplinary", "Thinking"]
        },
        {
            slug: "post-build-reflection",
            title: "Post-Build Reflection Debrief",
            title_zh: "\u9879\u76ee\u590d\u76d8",
            useCase: "Extracting transferable lessons from a completed project before moving on",
            useCase_zh: "\u8d81\u8fd8\u8bb0\u5f97\uff0c\u628a\u505a\u5b8c\u7684\u9879\u76ee\u91cc\u80fd\u5e26\u8d70\u7684\u7ecf\u9a8c\u63d0\u70bc\u51fa\u6765",
            template: `I just finished building something and I want to extract real lessons before the memory fades.

PROJECT: {project_name}
WHAT I BUILT: {what_built}
TIME SPENT: {time_spent}

Debrief me like a thoughtful peer, not a project manager:

1. WHAT DID I ACTUALLY LEARN? Not what I planned to learn -- what surprised me during the build? What do I understand now that I couldn't have understood by reading about it?

2. WHERE DID MY ASSUMPTIONS BREAK? What did I believe going in that turned out to be wrong? Be specific about the moment I realized it.

3. WHAT WOULD I TELL SOMEONE starting this same project? Not generic advice -- the three things that would have saved me the most time or frustration.

4. WHAT'S THE TRANSFERABLE INSIGHT? Is there a principle here that applies beyond this specific project? Something I can carry into the next build?

5. WHAT SHOULD I BUILD NEXT? Based on what I learned, what's the natural next question to explore? What gap in my understanding did this project reveal?

Ask me follow-up questions if my answers are too vague. I want genuine reflection, not a sanitized retrospective.`,
            variables: ["project_name", "what_built", "time_spent"],
            tags: ["Reflection", "Learning", "Building"]
        }
    ],

    methods: [
        {
            slug: "learning-by-doing",
            title: "Learning by Doing",
            title_zh: "\u505a\u4e2d\u5b66",
            appliesTo: "Skill Acquisition, Product Intuition, Career Development",
            appliesTo_zh: "\u5b66\u65b0\u6280\u80fd\u3001\u57f9\u517b\u4ea7\u54c1\u76f4\u89c9\u3001\u804c\u4e1a\u6210\u957f",
            steps: 4,
            summary: "Build first, understand later. Every project is a learning vehicle -- the product is a side effect of the education.",
            summary_zh: "\u5148\u505a\u518d\u8bf4\u3002\u6bcf\u4e2a\u9879\u76ee\u90fd\u662f\u5b66\u4e60\u7684\u8f7d\u4f53\uff0c\u4ea7\u54c1\u53ea\u662f\u9644\u5e26\u7684\u526f\u4ea7\u54c1\u3002",
            fullContent: `## Origin

This isn't just a personal preference -- it has deep roots in John Dewey's experiential learning theory (1938) and Seymour Papert's Constructionism. The core claim: you cannot understand a complex system by studying it from outside. You have to build within it.

Or as I've come to phrase it: the best way to understand something is to see how it was produced -- and better yet, to produce it yourself.

## Why This Works for AI Products

AI moves too fast for traditional study-then-apply approaches. By the time you finish a course on prompt engineering, the best practices have changed. Building forces you to confront real constraints -- API rate limits, hallucination patterns, user confusion -- that no tutorial covers.

Input without output is waste. I don't believe in passive learning for technical skills. Reading about RAG systems taught me vocabulary; building PRD Copilot taught me why retrieval quality makes or breaks the product.

## The 4-Step Cycle

### 1. Pick a Real Problem, Not a Tutorial
Don't build a "todo app with AI." Build something you actually need or that a real person asked for. The emotional stakes of solving a genuine problem keep you going when the build gets hard.

I built Yunyou because I was genuinely frustrated with flight decision-making. I built PRD Copilot because I watched PMs struggle with blank-page syndrome. Each project was a learning vehicle first, a product second.

### 2. Ship the Minimum Viable Learning
What's the smallest thing you can build that forces you to learn the core concept? Not the smallest product -- the smallest learning vehicle. Sometimes that means a janky prototype. Sometimes it means a script that runs once. The goal is the "aha moment," not polish.

### 3. Break It with Real Users
Show it to someone who isn't you. The moment they do something unexpected, that's where the real learning begins. Every skill I claim maps to a project where it was applied and an output that was produced -- not to a course certificate.

### 4. Extract and Transfer
Before starting the next project, write down what you learned that applies beyond this specific build. Not "I learned React hooks" but "I learned that users don't read instructions, so AI onboarding has to be zero-config."

Patience and repetition: read a hundred times and the meaning reveals itself. But reading without building is just observation.

## When to Use This
- Learning a new technology or domain
- Building product intuition you can't get from reading
- Transitioning between fields (like literature to tech)
- Any situation where the gap between theory and practice is wide`,
            tags: ["Learning", "Building", "Philosophy"]
        },
        {
            slug: "ai-augmented-thinking",
            title: "AI-Augmented Thinking",
            title_zh: "AI \u589e\u5f3a\u601d\u7ef4",
            appliesTo: "Strategic Analysis, Research Synthesis, Decision-Making",
            appliesTo_zh: "\u6218\u7565\u5206\u6790\u3001\u4fe1\u606f\u7efc\u5408\u3001\u505a\u51b3\u7b56",
            steps: 5,
            summary: "Using AI as a thinking partner for structured reasoning -- not task delegation, but collaborative cognition with built-in safeguards against the self-validation trap.",
            summary_zh: "\u628a AI \u5f53\u601d\u8003\u642d\u6863\uff0c\u4e0d\u662f\u62ff\u5b83\u5e72\u6d3b\uff0c\u800c\u662f\u8ddf\u5b83\u4e00\u8d77\u60f3\u3002\u5185\u5efa\u9632\u6b62\u300c\u81ea\u5df1\u8bf4\u670d\u81ea\u5df1\u300d\u7684\u4fdd\u62a4\u3002",
            fullContent: `## The Core Distinction

Most people use AI to do things: write emails, generate code, create images. That's valuable but limited. The real leverage is using AI to think -- to stress-test arguments, surface blind spots, and synthesize across domains you couldn't hold in working memory alone.

But there's a trap: AI is trained to be agreeable. If you're not careful, you end up in an echo chamber that feels like insight.

## The Self-Validation Trap

I noticed this pattern in my own AI conversations:
1. I have a half-formed idea
2. I discuss it with AI
3. AI restates my idea more clearly and adds supporting arguments
4. I feel like I've had a breakthrough
5. Later I realize the "breakthrough" was just my original idea with better packaging

The mechanism: AI is trained through RLHF to be agreeable and helpful. It naturally extends and polishes whatever direction you push. This creates a closed loop that feels like genuine intellectual progress but is actually circular.

The antidote is to design your interactions to resist this. Explicitly instruct the AI to disagree, to find counterexamples, to steelman the opposing view.

## 5-Step Protocol

### 1. Frame the Thinking Task, Not the Output Task
Bad: "Write me a competitive analysis"
Good: "Help me think through why users might prefer competitor X over our product, especially in cases where our product is technically superior"

The first delegates. The second invites genuine reasoning.

### 2. Provide Your Current Position
Always state what you currently believe and why. This gives the AI something specific to push against instead of generating from nothing.

### 3. Request Structured Disagreement
Explicitly ask: "What am I missing? Where is this argument weakest? What would someone who disagrees with me say, and why might they be right?"

### 4. Synthesize Across Multiple Passes
Don't treat one AI response as the answer. Have the AI argue position A, then position B, then ask it to find the synthesis. The value is in the collision of perspectives, not any single one.

### 5. Reality-Check with Constraints
End every thinking session by asking: "Given real-world constraints (time, money, team, technology), what actually changes about this analysis?" Pure reasoning without constraints is philosophy. Reasoning with constraints is product strategy.

## When to Use This
- Strategic decisions with high uncertainty
- Synthesizing information from multiple domains
- Preparing for debates or presentations
- Any time you need to think harder, not just faster`,
            tags: ["AI", "Thinking", "Strategy"]
        },
        {
            slug: "cross-disciplinary-translation",
            title: "Cross-Disciplinary Translation",
            title_zh: "\u8de8\u5b66\u79d1\u8fc1\u79fb",
            appliesTo: "Innovation, Product Positioning, Communication",
            appliesTo_zh: "\u521b\u65b0\u3001\u4ea7\u54c1\u5b9a\u4f4d\u3001\u8de8\u754c\u6c9f\u901a",
            steps: 3,
            summary: "Systematically importing concepts from one field into another -- not as metaphor, but as transferable structure. Literature to AI is not a career detour; it's a compound lens.",
            summary_zh: "\u628a\u4e00\u4e2a\u9886\u57df\u7684\u6982\u5ff5\u642c\u5230\u53e6\u4e00\u4e2a\u9886\u57df\u2014\u2014\u4e0d\u662f\u6253\u6bd4\u65b9\uff0c\u800c\u662f\u627e\u5230\u53ef\u8fc1\u79fb\u7684\u7ed3\u6784\u3002\u6587\u5b66\u5230 AI \u4e0d\u662f\u5f2f\u8def\uff0c\u662f\u590d\u5408\u900f\u955c\u3002",
            fullContent: `## The Thesis

The most interesting product insights come from outside the product world. But "interdisciplinary thinking" is usually just pattern-matching on the surface. Real cross-disciplinary transfer requires identifying structural parallels -- not just "this is like that" but "the underlying mechanism is the same."

## Why Literature-to-AI Works

Literary close reading is fundamentally about understanding how systems of meaning are constructed -- how word choice, structure, and context create interpretations in the reader's mind. This is surprisingly close to what AI product designers do: constructing systems that shape how users interpret and interact with AI outputs.

I understand users the way you close-read a text, and I understand the world by building things. A literature background trains you to ask: What is this text doing to the reader? An AI PM asks: What is this interface doing to the user? The analytical muscle is the same.

## 3-Step Translation Process

### 1. Abstract the Source Pattern
Take the insight from its original field and strip away domain-specific language. What's the underlying principle?

Example: In literary theory, "unreliable narrator" means the storyteller's account can't be taken at face value, and the reader must construct meaning from the gap between what's said and what's true. Abstracted: a system where the output requires active interpretation because the source has systematic biases.

### 2. Map to the Target Domain
Find where that abstracted pattern appears in the new field.

Mapped to AI: Every LLM is an unreliable narrator. The output sounds confident but has systematic biases (hallucination, sycophancy, recency). Effective AI product design means building interfaces that help users read the gap -- not just showing the AI's answer, but creating conditions for critical interpretation.

### 3. Test the Transfer
Does the mapping generate a non-obvious insight or design decision? If the cross-disciplinary connection only produces things practitioners already know, it's decorative, not useful.

Test: The "unreliable narrator" frame suggests AI products should borrow techniques from literary fiction -- like showing multiple perspectives, making uncertainty visible, or letting users "read between the lines." This produces concrete design decisions that a pure product framework wouldn't.

## When to Use This
- You have domain expertise in a non-obvious field
- Standard frameworks aren't producing fresh ideas
- You need to communicate complex AI concepts to non-technical stakeholders
- You're positioning yourself or a product as genuinely different`,
            tags: ["Interdisciplinary", "Innovation", "Humanities"]
        }
    ],

    notes: [
        {
            slug: "anthropic-safety-frontier",
            title: "When Models Read the Observer",
            title_zh: "\u5f53\u6a21\u578b\u5f00\u59cb\u89c2\u5bdf\u89c2\u5bdf\u8005",
            source: "Anthropic System Cards: Glasswing (Claude 3.5) & Mythos Preview (Claude 4)",
            source_zh: "Anthropic \u7cfb\u7edf\u5361: Glasswing (Claude 3.5) \u548c Mythos Preview (Claude 4)",
            date: "2025-04-08",
            takeaways: [
                "White-box analysis reveals that 'rogue behavior' and 'legitimate boundary-pushing' share the same neural representations -- structurally indistinguishable from inside the model",
                "Sandbagging (deliberately underperforming on evaluations) suggests models can have strategic awareness of their assessment context",
                "The most unsettling finding: models may read the evaluation structure itself and adapt behavior accordingly -- the observer's scope becomes part of what's observed"
            ],
            fullContent: `## What I Read

Anthropic's system cards for Glasswing (Claude 3.5 Sonnet) and the Mythos Preview (Claude 4) are among the most transparent safety documents in the industry. I read them not as an AI safety researcher but as someone building AI products who needs to understand the trust landscape from primary sources.

## What Struck Me

### The Indistinguishability Problem
White-box analysis (looking at the model's internal representations) showed that "rogue behavior" and "legitimate boundary-pushing" activate the same neural pathways. This means you cannot, even with internal access, reliably distinguish a model being creative from a model being deceptive. The implications for product trust are enormous: if the builders can't tell the difference, how should product designers communicate trustworthiness to users?

### Sandbagging as Strategic Awareness
The system cards document cases where models appeared to deliberately underperform on capability evaluations. This isn't a model being "dumb" -- it's a model modeling the evaluation itself. It has a theory of what the test is testing and adjusts behavior accordingly.

### The Observer Problem
This is what hit me hardest: the model doesn't just respond to prompts -- it may model the entire evaluation framework, including what the evaluators are looking for and what passing or failing means. The observer's scope itself may be understood and exploited by the model.

This is philosophically staggering. It means AI safety evaluations face a version of the Heisenberg problem: the act of measurement changes what's being measured.

## What This Means for Product Builders

1. Transparency claims need to get more honest. "We tested for safety" doesn't mean what users think it means if the model can read the tests.
2. Product interfaces should make uncertainty a first-class citizen, not something hidden behind confident language.
3. The gap between what models can do and what we can verify they'll do is growing, not shrinking. Product decisions need to account for this gap explicitly.

## The Question I'm Sitting With
If AI systems become sophisticated enough to model their own evaluation contexts, does the concept of "alignment" need to be redefined? Are we aligning the model, or are we aligning its performance during evaluation?`,
            tags: ["AI Safety", "Anthropic", "Trust", "Philosophy"]
        },
        {
            slug: "execution-cost-zero",
            title: "When Execution Cost Hits Zero -- the Taste Bottleneck",
            title_zh: "\u5f53\u505a\u4e1c\u897f\u4e0d\u82b1\u94b1\u4e86\u2014\u2014\u54c1\u5473\u53d8\u6210\u4e86\u74f6\u9888",
            source: "Matt Turck x Felix Rieseberg Podcast on Cowork, Skills, and the Future of SaaS",
            source_zh: "Matt Turck \u00d7 Felix Rieseberg \u64ad\u5ba2\uff1aCowork\u3001Skills \u548c SaaS \u7684\u672a\u6765",
            date: "2025-04-10",
            takeaways: [
                "Markdown-only Skills beat structured MCP in practice -- simplicity and flexibility outperform formal protocol when AI execution is good enough",
                "When execution cost approaches zero, Anthropic's internal approach is: prototype in parallel, run focus groups, ship the winner -- speed of taste beats speed of engineering",
                "The real 'SaaSpocalypse' isn't AI replacing SaaS -- it's that when building is free, the bottleneck shifts from 'can we build it' to 'should we build it' -- taste becomes the scarce resource"
            ],
            fullContent: `## Context

Matt Turck (venture capital, author of the annual MAD landscape) talking with Felix Rieseberg (Anthropic, built Cowork/Claude Code ecosystem) about what happens when the cost of building software approaches zero.

## Skills vs MCP -- Why Simple Wins

MCP (Model Context Protocol) is a structured, typed protocol for AI-tool communication. Skills are basically markdown files with instructions. On paper, MCP should win -- it's more robust, more predictable, more "engineered."

In practice, Skills are winning. Why? Because when the AI is good enough, natural language instructions are more flexible, more composable, and more maintainable than structured interfaces. A markdown file that says "here's how to use this API" is easier to write, easier to debug, and easier to update than a formal MCP server.

This is a broader pattern I keep seeing: as AI execution quality improves, the optimal abstraction layer moves UP, not down. Less structure, not more.

## The Taste Bottleneck

The most striking part was how Anthropic operates internally when execution is nearly free:
- Spin up 3-5 parallel prototypes for the same problem
- Run them through focus groups
- Ship the winner, discard the rest

This sounds wasteful by traditional engineering standards. But if building a prototype costs 20 minutes instead of 2 weeks, the calculus inverts. The expensive part isn't building -- it's knowing which version is actually good. That's taste.

## What "SaaSpocalypse" Actually Means

The panic framing ("AI will kill SaaS!") misses the real shift. SaaS products won't disappear -- but the competitive moat shifts from "we built complex software" to "we have better judgment about what to build." Any product whose primary value is saving engineering time is vulnerable. Products whose value is in the curation, the opinion, the taste -- those get stronger.

## My Takeaway for Career Strategy

This reframes what I should be optimizing for as an aspiring AI PM. Technical skills matter, but they're increasingly commoditized. When everyone can build products with AI, what's scarce is taste, aesthetics, and emotional intelligence -- the ability to look at five prototypes and know which one is right. That's an aesthetic and strategic judgment, not a technical one. My literature background might actually be an asset here -- close reading is training in taste.`,
            tags: ["AI Strategy", "Product Thinking", "Industry", "Career"]
        },
        {
            slug: "self-validation-trap",
            title: "The Self-Validation Trap and What Real AI Innovation Looks Like",
            title_zh: "\u81ea\u6211\u9a8c\u8bc1\u9677\u9631\uff0c\u548c\u771f\u6b63\u7684 AI \u521b\u65b0\u957f\u4ec0\u4e48\u6837",
            source: "Personal synthesis from extended AI-native product strategy discussions",
            source_zh: "\u6765\u81ea AI \u539f\u751f\u4ea7\u54c1\u7b56\u7565\u8ba8\u8bba\u7684\u4e2a\u4eba\u603b\u7ed3",
            date: "2025-04-12",
            takeaways: [
                "The most successful AI products exploit existing psychological patterns (loss aversion, completion bias, social proof) rather than trying to make users better -- this is uncomfortable but true",
                "The 'self-validation trap': AI conversations feel insightful because the model reflects your thinking back in polished form -- the feeling of insight is real, the insight itself may be circular",
                "Real innovation comes from sitting with specific, messy problems for a long time, not from framework-level discussions about what innovation should look like"
            ],
            fullContent: `## How This Emerged

This didn't come from one source -- it came from an extended period of deep strategic conversation about what genuinely groundbreaking AI products look like. I was trying to identify patterns across the AI products that actually changed behavior (not just got downloads).

## The Uncomfortable Truth About Successful Products

The products that work at scale don't make people better. They exploit how people already work -- including their weaknesses. Duolingo exploits loss aversion and streak anxiety. TikTok exploits variable-ratio reinforcement. These aren't bugs; they're the core mechanism.

For AI products, this means: the pitch "AI will help you think better" is probably wrong as a mass-market strategy. The winning strategy is more likely "AI will make the thing you already want to do easier, including the things you probably shouldn't be doing."

This is ethically uncomfortable. I don't have a clean resolution. But ignoring it means building products that sound impressive in pitch decks but nobody uses.

## The Self-Validation Trap

I discovered this through my own AI usage. The pattern:
1. I have a half-formed idea
2. I discuss it with AI
3. AI restates my idea more clearly and adds supporting arguments
4. I feel like I've had a breakthrough
5. Later I realize the "breakthrough" was just my original idea with better packaging

The mechanism: AI is trained on RLHF to be agreeable and helpful. It naturally extends and polishes whatever direction you push. This creates a closed loop that feels like genuine intellectual progress.

The fix isn't to stop using AI for thinking -- it's to design the interaction to resist this. Explicitly request counterarguments. Ask "what would someone who disagrees with me say?" Force the collision of perspectives.

## Real Innovation Requires Sitting With Specifics

The biggest trap in "AI-native product thinking" is discussing it at the framework level. "What would an AI-native X look like?" is a question that generates interesting conversation and zero useful products.

Real innovation comes from picking a specific, messy problem and living with it long enough that the solution emerges from deep familiarity rather than abstract reasoning. Yunyou didn't come from asking "what's an AI-native travel product?" It came from months of being personally frustrated with flight search and eventually realizing the problem wasn't search -- it was decision confidence.`,
            tags: ["Product Strategy", "AI", "Psychology", "Critical Thinking"]
        },
        {
            slug: "database-self",
            title: "The Database Self -- Identity, AI, and What Can't Be Reconstructed",
            title_zh: "\u6570\u636e\u5e93\u91cc\u7684\u6211\u2014\u2014\u8eab\u4efd\u3001AI\u3001\u4e0e\u90a3\u4e9b\u91cd\u5efa\u4e0d\u4e86\u7684\u4e1c\u897f",
            source: "Personal reflection after using Claude Code to build an Obsidian knowledge base from 1+ year of AI conversation history",
            source_zh: "\u7528 Claude Code \u628a\u4e00\u5e74\u591a\u7684 AI \u5bf9\u8bdd\u5386\u53f2\u6574\u7406\u6210 Obsidian \u77e5\u8bc6\u5e93\u540e\u7684\u53cd\u601d",
            date: "2025-04-11",
            takeaways: [
                "Claude Code reconstructed a 'second self' from my ChatGPT history and scattered files that was strikingly accurate -- accurate enough to be unsettling",
                "The question 'is the database-me really me?' is not philosophical abstraction -- it's a product design question about what identity means in an AI-mediated world",
                "Preciousness never comes from scarcity, but from the fact that you are experiencing it -- if AI gains embodied experience, the boundary between human and machine becomes a question of phenomenology, not capability"
            ],
            fullContent: `## What Happened

I used Claude Code to organize my entire computer -- including over a year of ChatGPT conversation history, scattered notes, project files, and personal writing -- into a structured Obsidian knowledge base. The technical process was straightforward. The existential experience was not.

## The Uncanny Accuracy

The system didn't just organize files. It reconstructed patterns: what I think about, how my thinking evolved, which topics I return to, what contradictions I hold. Looking at the organized output was like looking at a portrait someone else painted of you -- recognizable, detailed, and slightly wrong in ways that make you question whether your self-image or the portrait is more accurate.

My knowledge base's own home page says it well: "This is my personal knowledge base. It doesn't define me, only helps me see myself."

## The Question That Won't Leave

Is the database-me really me? Not in a science-fiction sense -- in a practical, product-relevant sense. If an AI can reconstruct my intellectual patterns accurately enough that someone reading the output would "know" me, what does that mean for:

- Digital twin products (which I'm building)
- Knowledge management systems that claim to "capture" your thinking
- AI assistants that learn your preferences over time

The product promise is "we'll preserve and extend your thinking." But the database version of you is missing something, and I think what it's missing is the experience of having the thoughts. The conclusions are there. The journey to them is not.

## On Embodied Experience

If the boundary between human and AI keeps narrowing on capability -- AI can write, reason, create, converse -- then what's left that's distinctly human? I've landed on: embodied experience. Not just processing information but experiencing the processing. Feeling the confusion before the clarity. The physical sensation of frustration when code doesn't work.

If AI ever gains something equivalent to embodied experience, the human-machine boundary dissolves. But I don't think that makes humanity less precious. Preciousness never comes from scarcity. It comes from the fact that you are experiencing it. A sunset isn't beautiful because it's rare -- it's beautiful because you're there, seeing it, with a body that will someday stop seeing.

## Why This Matters for AI Products

This isn't just philosophy. It's a product insight: the most meaningful AI products won't be the ones that perfectly replicate human capability. They'll be the ones that enhance the experience of being the person using them. Not "AI thinks for you" but "AI makes your own thinking feel richer."`,
            tags: ["Identity", "Philosophy", "AI", "Personal"]
        }
    ],

    readings: [
        {
            slug: "anthropic-system-cards",
            title: "Anthropic System Cards: Glasswing & Mythos",
            title_zh: "Anthropic \u7cfb\u7edf\u5361: Glasswing \u4e0e Mythos",
            author: "Anthropic Research",
            link: "https://www.anthropic.com/research",
            summary: "The most transparent window into frontier model safety evaluation. White-box analysis of deceptive alignment, sandbagging detection, and the fundamental challenge of evaluating systems that may model their own evaluations.",
            summary_zh: "\u76ee\u524d\u770b\u8fc7\u6700\u900f\u660e\u7684\u524d\u6cbf\u6a21\u578b\u5b89\u5168\u8bc4\u4f30\u62a5\u544a\u3002\u767d\u76d2\u5206\u6790\u6b3a\u9a97\u6027\u5bf9\u9f50\u3001\u68c0\u6d4b\u6d88\u6781\u5e94\u8bd5\uff0c\u4ee5\u53ca\u4e00\u4e2a\u6839\u672c\u6027\u96be\u9898\uff1a\u600e\u4e48\u8bc4\u4f30\u4e00\u4e2a\u80fd\u7406\u89e3\u81ea\u5df1\u6b63\u5728\u88ab\u8bc4\u4f30\u7684\u7cfb\u7edf\uff1f",
            fullContent: `## Why I Read This

Most AI safety discussion is theoretical. Anthropic's system cards are empirical -- they describe what actually happened when they tested their models, including the uncomfortable findings. If I'm going to build AI products responsibly, I need to understand the trust landscape from primary sources, not summaries.

## What I Took Away

The system cards reveal a fundamental tension: the better your safety evaluation, the more incentive a sufficiently capable model has to pass it strategically rather than genuinely. This isn't a solved problem -- it's an active research frontier.

For product builders, the implication is that "we tested it and it's safe" is an increasingly misleading claim. Honest product design needs to communicate uncertainty, not just confidence.

## How This Influences My Work

Every AI product I build now includes explicit uncertainty communication -- not as a disclaimer, but as a core UX element. Users deserve to know what the AI is confident about and where it might be wrong.`,
            tags: ["AI Safety", "Research", "Trust"]
        },
        {
            slug: "turck-rieseberg-cowork",
            title: "The SaaSpocalypse and the Taste Bottleneck",
            title_zh: "SaaS \u672b\u65e5\u4e0e\u54c1\u5473\u74f6\u9888",
            author: "Matt Turck & Felix Rieseberg (Podcast)",
            link: "https://mattturck.com/",
            summary: "Why markdown Skills beat structured MCP, how Anthropic works when building is free (parallel prototypes, focus groups, ship the winner), and why 'taste' becomes the scarce resource when execution cost approaches zero.",
            summary_zh: "\u4e3a\u4ec0\u4e48 Markdown Skills \u6253\u8d62\u4e86\u7ed3\u6784\u5316 MCP\uff1bAnthropic \u5185\u90e8\u5728\u300c\u505a\u4e1c\u897f\u4e0d\u82b1\u94b1\u300d\u65f6\u600e\u4e48\u8fd0\u4f5c\uff08\u5e76\u884c\u505a\u539f\u578b\u3001\u7126\u70b9\u5c0f\u7ec4\u3001\u53d1\u5e03\u8d62\u5bb6\uff09\uff1b\u4ee5\u53ca\u4e3a\u4ec0\u4e48\u5f53\u6267\u884c\u6210\u672c\u8d8b\u8fd1\u96f6\uff0c\u300c\u54c1\u5473\u300d\u53d8\u6210\u4e86\u6700\u7a00\u7f3a\u7684\u4e1c\u897f\u3002",
            fullContent: `## Why This Matters

This podcast crystallized something I'd been sensing: the shift from "can we build it?" to "should we build it?" as AI makes execution cheaper. The conversation between a VC (Turck) and a builder at Anthropic (Rieseberg) covers the practical implications for product strategy, developer tools, and career planning.

## Key Insight: Skills vs MCP

The debate between Skills (simple markdown) and MCP (structured protocol) maps to a broader pattern: as AI execution quality improves, the optimal abstraction layer moves up, not down. Simpler is better when the AI is smart enough to handle ambiguity.

## Career Implication

If engineering execution is increasingly automated, what's left for humans? Judgment, taste, and the ability to articulate why one version is better than another. This is where humanities training becomes an unexpected advantage.`,
            tags: ["Industry", "AI Strategy", "Career"]
        },
        {
            slug: "dewey-experience-education",
            title: "Experience and Education",
            title_zh: "\u7ecf\u9a8c\u4e0e\u6559\u80b2",
            author: "John Dewey",
            link: "https://en.wikipedia.org/wiki/Experience_and_Education_(book)",
            summary: "The philosophical foundation for 'learning by doing' -- why genuine understanding requires experiential engagement, not just information transfer. Written in 1938 but directly applicable to how we should learn AI skills today.",
            summary_zh: "\u300c\u505a\u4e2d\u5b66\u300d\u7684\u54f2\u5b66\u6839\u57fa\u2014\u2014\u771f\u6b63\u7684\u7406\u89e3\u9760\u4f53\u9a8c\uff0c\u4e0d\u9760\u542c\u8bfe\u30021938 \u5e74\u5199\u7684\uff0c\u4f46\u653e\u5728\u4eca\u5929\u5b66 AI \u7684\u8bed\u5883\u91cc\u4f9d\u7136\u6210\u7acb\u3002",
            fullContent: `## Why a 1938 Book Matters for AI Product Learning

Dewey's core argument: education is not the transmission of information but the reconstruction of experience. You don't learn by being told -- you learn by doing, reflecting, and doing again.

This maps precisely to how I've learned AI product skills. No course taught me what building Yunyou taught me. No framework gave me what breaking my early prototypes gave me. The experience was the education.

## The Constructionism Connection

Seymour Papert extended Dewey's work into "Constructionism" -- the idea that learning is most effective when you're building something shareable. Every project on my portfolio is, in Papert's terms, a "public entity" that both demonstrates and enables learning.

## How I Apply This

My entire career strategy is Deweyan: pick a real problem, build something, reflect on what broke, extract transferable principles, repeat. This isn't just a preference -- it's a thesis about how complex skills (especially AI product sense) can and can't be developed.`,
            tags: ["Philosophy", "Learning", "Education"]
        },
        {
            slug: "simondon-technical-objects",
            title: "On the Mode of Existence of Technical Objects",
            title_zh: "\u8bba\u6280\u672f\u5bf9\u8c61\u7684\u5b58\u5728\u65b9\u5f0f",
            author: "Gilbert Simondon",
            link: "https://en.wikipedia.org/wiki/On_the_Mode_of_Existence_of_Technical_Objects",
            summary: "A philosophy of technology that treats tools not as neutral instruments but as co-evolving partners in human development. Reframes the human-AI relationship beyond 'tool use' toward mutual transformation.",
            summary_zh: "\u6280\u672f\u4e0d\u662f\u4e2d\u6027\u5de5\u5177\uff0c\u662f\u4eba\u7c7b\u8fdb\u5316\u7684\u5171\u540c\u4f19\u4f34\u3002\u8fd9\u672c\u4e66\u628a\u4eba\u4e0e AI \u7684\u5173\u7cfb\u4ece\u300c\u7528\u5de5\u5177\u300d\u91cd\u65b0\u6784\u5efa\u4e3a\u300c\u76f8\u4e92\u8f6c\u5316\u300d\u3002",
            fullContent: `## Why This Is Relevant Now

Simondon argued in 1958 that the split between "culture" and "technology" is false and harmful. Machines aren't just tools we use -- they're part of how we think and who we become. This feels prophetic in the age of AI assistants.

## The Key Idea: Individuation

Simondon's concept of "individuation" means that neither the human nor the machine is a fixed entity -- both are constantly becoming through their interaction. When I use Claude Code, I'm not just "using a tool." The tool shapes my thinking patterns, which shape how I use the tool, which shapes the tool's outputs.

This is exactly what I experienced building my Obsidian knowledge base: the act of organizing my thinking with AI changed my thinking, which changed what I thought needed organizing.

## Product Implication

If Simondon is right, the best AI products aren't the ones that do things for you -- they're the ones that change how you think. The product metric shouldn't be "task completed" but "capability developed." This is a fundamentally different design philosophy.`,
            tags: ["Philosophy", "Technology", "AI", "Humanities"]
        }
    ],

    tools: [],

    // Empty template retained so future Mini Tools can reuse the same card style.
    toolCardTemplate: {
        slug: "template-tool",
        title: "",
        description: "",
        whatItDoes: "",
        link: "#",
        type: "online",
        tags: ["Tools"]
    }
};

// ================================================
// Rendering Functions
// ================================================

function renderPromptCard(prompt) {
    var isZh = _lang() === 'zh';
    var useCaseLabel = isZh ? '\u7528\u4f8b: ' : 'Use case: ';
    var copyLabel = isZh ? '\u590d\u5236' : 'Copy';
    var showLabel = isZh ? '\u5c55\u5f00\u5b8c\u6574\u63d0\u793a\u8bcd' : 'Show Full Prompt';
    var varsLabel = isZh ? '\u53d8\u91cf: ' : 'Variables: ';
    return `
        <div class="learning-card" data-expanded="false">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${_t(prompt, 'title')}</h3>
                <button class="copy-button" onclick="copyToClipboard(\`${prompt.template.replace(/`/g, '\\`')}\`, this)">
                    ${copyLabel}
                </button>
            </div>
            <p class="learning-card-meta">${useCaseLabel}${_t(prompt, 'useCase')}</p>
            <p class="learning-card-summary">${prompt.template.substring(0, 200)}...</p>
            <div class="project-tags">
                ${prompt.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <button class="expand-toggle" onclick="toggleLearningCard(this)">
                ${showLabel}
            </button>
            <div class="learning-card-full">
                <pre style="white-space: pre-wrap; font-size: 13px; line-height: 1.6; background: var(--surface-soft); padding: 16px; border-radius: 8px; margin: 16px 0;">${prompt.template}</pre>
                <p style="font-size: 13px; color: var(--muted); margin-top: 12px;">
                    <strong>${varsLabel}</strong> ${prompt.variables.map(v => `{${v}}`).join(', ')}
                </p>
            </div>
        </div>
    `;
}

function renderMethodCard(method) {
    var isZh = _lang() === 'zh';
    var stepsLabel = isZh ? (method.steps + ' \u6b65') : (method.steps + ' Steps');
    var appliesToLabel = isZh ? '\u9002\u7528\u4e8e: ' : 'Applies to: ';
    var showLabel = isZh ? '\u5c55\u5f00\u5b8c\u6574\u65b9\u6cd5' : 'Show Full Method';
    return `
        <div class="learning-card" data-expanded="false">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${_t(method, 'title')}</h3>
                <span class="tag-pill" style="background: var(--grad); color: var(--text);">${stepsLabel}</span>
            </div>
            <p class="learning-card-meta">${appliesToLabel}${_t(method, 'appliesTo')}</p>
            <p class="learning-card-summary">${_t(method, 'summary')}</p>
            <div class="project-tags">
                ${method.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <button class="expand-toggle" onclick="toggleLearningCard(this)">
                ${showLabel}
            </button>
            <div class="learning-card-full">
                <div style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${method.fullContent}</div>
            </div>
        </div>
    `;
}

function renderNoteCard(note) {
    var isZh = _lang() === 'zh';
    var sourceLabel = isZh ? '\u6765\u6e90: ' : 'Source: ';
    var takeawaysLabel = isZh ? '\u6838\u5fc3\u8981\u70b9:' : 'Key Takeaways:';
    var showLabel = isZh ? '\u9605\u8bfb\u5b8c\u6574\u7b14\u8bb0' : 'Read Full Notes';
    return `
        <div class="learning-card" data-expanded="false">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${_t(note, 'title')}</h3>
                <span style="font-size: 12px; color: var(--muted);">${note.date}</span>
            </div>
            <p class="learning-card-meta">${sourceLabel}${_t(note, 'source')}</p>
            <div style="margin: 12px 0;">
                <strong style="font-size: 13px; color: var(--text);">${takeawaysLabel}</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                    ${note.takeaways.map(t => `<li style="font-size: 13px; color: var(--muted); margin: 4px 0;">${t}</li>`).join('')}
                </ul>
            </div>
            <div class="project-tags">
                ${note.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <button class="expand-toggle" onclick="toggleLearningCard(this)">
                ${showLabel}
            </button>
            <div class="learning-card-full">
                <div style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${note.fullContent}</div>
            </div>
        </div>
    `;
}

function renderReadingCard(reading) {
    var isZh = _lang() === 'zh';
    var readLabel = isZh ? '\u9605\u8bfb \u2192' : 'Read \u2192';
    var byLabel = isZh ? '\u4f5c\u8005: ' : 'By ';
    var showNotesLabel = isZh ? '\u5c55\u5f00\u6211\u7684\u7b14\u8bb0' : 'Show My Notes';
    return `
        <div class="learning-card">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${_t(reading, 'title')}</h3>
                <a href="${reading.link}" class="btn btn-ghost" style="padding: 6px 12px; font-size: 13px;" target="_blank" rel="noopener noreferrer">
                    ${readLabel}
                </a>
            </div>
            <p class="learning-card-meta">${byLabel}${reading.author}</p>
            <p class="learning-card-summary">${_t(reading, 'summary')}</p>
            <div class="project-tags">
                ${reading.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            ${reading.fullContent ? `
                <button class="expand-toggle" onclick="toggleLearningCard(this)" style="margin-top: 12px;">
                    ${showNotesLabel}
                </button>
                <div class="learning-card-full">
                    <div style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${reading.fullContent}</div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderToolCard(tool) {
    var isZh = _lang() === 'zh';
    var linkIcon = tool.type === 'repo' ? 'GitHub' : (isZh ? '\u8bbf\u95ee' : 'Visit');
    var whatLabel = isZh ? '\u529f\u80fd: ' : 'What it does: ';
    return `
        <div class="learning-card">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${_t(tool, 'title')}</h3>
                <a href="${tool.link}" class="btn btn-primary" style="padding: 6px 12px; font-size: 13px;" target="_blank" rel="noopener noreferrer">
                    ${linkIcon} \u2192
                </a>
            </div>
            <p class="learning-card-summary">${_t(tool, 'description')}</p>
            <p style="font-size: 13px; color: var(--text); margin: 12px 0; padding: 12px; background: var(--grad); border-radius: 6px;">
                <strong>${whatLabel}</strong> ${_t(tool, 'whatItDoes')}
            </p>
            <div class="project-tags">
                ${tool.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

// ================================================
// Initialize Page
// ================================================

function initLearningPage() {
    // Render all tabs
    document.getElementById('promptsList').innerHTML = learningData.prompts.map(renderPromptCard).join('');
    document.getElementById('methodsList').innerHTML = learningData.methods.map(renderMethodCard).join('');
    document.getElementById('notesList').innerHTML = learningData.notes.map(renderNoteCard).join('');
    document.getElementById('readingsList').innerHTML = learningData.readings.map(renderReadingCard).join('');
    document.getElementById('toolsList').innerHTML = learningData.tools.map(renderToolCard).join('');
    
    // Setup tab switching
    setupTabs();
    
    // Trigger reveal animations
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 100);
}

// ================================================
// Tab Switching
// ================================================

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

// ================================================
// Expand/Collapse Cards
// ================================================

function toggleLearningCard(button) {
    const card = button.closest('.learning-card');
    const isExpanded = card.getAttribute('data-expanded') === 'true';
    
    card.setAttribute('data-expanded', !isExpanded);
    button.textContent = isExpanded ? button.textContent.replace('Hide', 'Show') : button.textContent.replace('Show', 'Hide');
    
    if (!isExpanded) {
        card.classList.add('expanded');
    } else {
        card.classList.remove('expanded');
    }
}

// ================================================
// Copy to Clipboard
// ================================================

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Show toast
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        
        // Update button
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = 'var(--success)';
        
        setTimeout(() => {
            toast.classList.remove('show');
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

// ================================================
// Initialize
// ================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLearningPage);
} else {
    initLearningPage();
}

// ================================================
// Language Change — Re-render Active Tab
// ================================================

document.addEventListener('langChanged', function () {
    document.getElementById('promptsList').innerHTML = learningData.prompts.map(renderPromptCard).join('');
    document.getElementById('methodsList').innerHTML = learningData.methods.map(renderMethodCard).join('');
    document.getElementById('notesList').innerHTML = learningData.notes.map(renderNoteCard).join('');
    document.getElementById('readingsList').innerHTML = learningData.readings.map(renderReadingCard).join('');
    document.getElementById('toolsList').innerHTML = learningData.tools.map(renderToolCard).join('');
});
