// ================================================
// Learning Hub JavaScript
// ================================================

const learningData = {
    prompts: [
        {
            slug: "user-research-synthesis",
            title: "User Research Synthesis Prompt",
            useCase: "Analyzing interview transcripts and extracting insights",
            template: `Analyze the following user interview transcript and extract:

1. KEY PAIN POINTS: What problems or frustrations did the user express?
2. UNEXPECTED INSIGHTS: What surprising or counter-intuitive things did you learn?
3. DESIGN OPPORTUNITIES: What potential solutions or features could address these needs?
4. QUOTES: Pull 2-3 memorable quotes that illustrate key themes

Format your response with clear sections and use bullet points for readability.

TRANSCRIPT:
{transcript}

RESEARCH QUESTION:
{research_question}`,
            variables: ["transcript", "research_question"],
            tags: ["Research", "UX", "Synthesis"]
        },
        {
            slug: "competitive-analysis",
            title: "Competitive Analysis Framework",
            useCase: "Systematically comparing competitor features",
            template: `Compare the following products across these dimensions:

PRODUCTS TO ANALYZE:
{product_list}

ANALYSIS FRAMEWORK:
1. Core Features: What key capabilities does each product offer?
2. User Experience: How intuitive and delightful is the interface?
3. Pricing Model: How do they monetize? What's the value proposition?
4. Differentiation: What makes each product unique?
5. Gaps & Opportunities: What's missing? Where could we differentiate?

For each dimension, rate on a scale of 1-5 and explain why.
End with a summary table and strategic recommendations.`,
            variables: ["product_list"],
            tags: ["Strategy", "Analysis", "Product"]
        },
        {
            slug: "design-critique",
            title: "AI Design Critique Prompt",
            useCase: "Getting structured feedback on UI designs",
            template: `Review this design and provide a structured critique:

DESIGN CONTEXT:
- Goal: {design_goal}
- Target Users: {target_users}
- Platform: {platform}

CRITIQUE FRAMEWORK:
1. Visual Hierarchy: Does the design guide attention effectively?
2. Usability: Are interactions clear and intuitive?
3. Accessibility: Does it meet WCAG standards?
4. Consistency: Is the design system applied uniformly?
5. Emotional Impact: What feeling does this evoke?

For each area:
- Rate 1-5
- Explain the rating
- Suggest 1-2 specific improvements

End with 3 priority action items.`,
            variables: ["design_goal", "target_users", "platform"],
            tags: ["Design", "Feedback", "UX"]
        },
        {
            slug: "pm-interview-prep",
            title: "Product Manager Interview Prep",
            useCase: "Preparing structured answers for PM interviews",
            template: `Help me prepare a STAR-method response for this PM interview question:

QUESTION: {interview_question}

MY EXPERIENCE: {brief_context}

Please help me structure this into:

SITUATION (2-3 sentences):
- Set the context clearly
- Explain why this mattered

TASK (2 sentences):
- What was the specific challenge or goal?
- What were the constraints?

ACTION (4-5 sentences):
- What did YOU specifically do?
- What framework or approach did you use?
- How did you collaborate with others?

RESULT (2-3 sentences):
- What measurable impact did this have?
- What did you learn?

Keep it concise, use specific numbers, and emphasize leadership/ownership.`,
            variables: ["interview_question", "brief_context"],
            tags: ["Career", "Interview", "PM"]
        },
        {
            slug: "feature-prioritization",
            title: "Feature Prioritization Framework",
            useCase: "Deciding what to build next using RICE scoring",
            template: `Help me prioritize these features using the RICE framework:

FEATURES:
{feature_list}

For each feature, estimate:
1. REACH: How many users will this impact per quarter? (number)
2. IMPACT: How much will this move the key metric? (0.25 = minimal, 0.5 = low, 1 = medium, 2 = high, 3 = massive)
3. CONFIDENCE: How sure are we about the estimates? (0.5 = low, 0.8 = medium, 1 = high)
4. EFFORT: How many person-months will this take? (number)

RICE Score = (Reach × Impact × Confidence) / Effort

Provide:
- Individual RICE scores with calculations shown
- Ranked list from highest to lowest
- Strategic recommendation on what to build first and why`,
            variables: ["feature_list"],
            tags: ["Product", "Strategy", "Prioritization"]
        }
    ],

    methods: [
        {
            slug: "jobs-to-be-done",
            title: "Jobs-to-be-Done Framework",
            appliesTo: "Product Strategy, User Research",
            steps: 5,
            summary: "Understand user motivation by focusing on the 'job' they're hiring your product to do, not demographics or features.",
            fullContent: `## Overview
Jobs-to-be-Done (JTBD) helps you understand WHY users choose your product by framing it as a "job" they need done.

## The Framework

**Core Question**: "When [situation], I want to [motivation], so I can [outcome]."

## 5-Step Process

### 1. Identify the Job
Ask: What progress is the user trying to make?
Example: "When I'm commuting to work, I want to feel productive, so I can start my day energized."

### 2. Understand the Context
- What triggers this need?
- What constraints exist (time, money, skills)?
- What alternatives do they currently use?

### 3. Map Functional, Emotional, and Social Dimensions
- Functional: What task needs to be done?
- Emotional: How do they want to feel?
- Social: How do they want to be perceived?

### 4. Identify Obstacles
What prevents them from getting the job done today?
- Product limitations
- Habit/inertia
- Anxiety about switching

### 5. Design for the Job
Create solutions that help users make progress, not just features.

## Example Application
BAD: "Millennials want a budgeting app"
GOOD: "When I get my paycheck, I want to feel in control of my money, so I can save for travel without guilt."

## When to Use
- Building a new product
- Repositioning existing product
- Understanding why users churn
- Competitive differentiation`,
            tags: ["Product", "Strategy", "Research"]
        },
        {
            slug: "kano-model",
            title: "Kano Model for Feature Prioritization",
            appliesTo: "Product Management, UX Strategy",
            steps: 4,
            summary: "Classify features by how they impact user satisfaction: Must-Haves, Performance, Delighters, and Indifferent.",
            fullContent: `## Overview
The Kano Model helps you understand which features actually drive satisfaction vs. which are just expected.

## Four Categories

### 1. Must-Haves (Basic Expectations)
- Users expect these by default
- Absence causes dissatisfaction
- Presence doesn't increase satisfaction
- Example: Search function in an e-commerce app

### 2. Performance (Linear Satisfaction)
- More is better
- Directly correlates with satisfaction
- Example: Load speed, accuracy

### 3. Delighters (Excitement Features)
- Users don't expect these
- Presence creates delight
- Absence doesn't harm satisfaction
- Example: Spotify Wrapped

### 4. Indifferent
- Users don't care either way
- Don't invest here

## How to Use

### Step 1: Survey Users
For each feature, ask two questions:
- "How would you feel if this feature was present?"
- "How would you feel if this feature was absent?"

Options: I like it / I expect it / I'm neutral / I can tolerate it / I dislike it

### Step 2: Classify Responses
Use the Kano evaluation table to categorize each feature.

### Step 3: Prioritize
1. First: Ensure all Must-Haves are covered
2. Second: Optimize Performance features
3. Third: Add 1-2 Delighters for differentiation
4. Skip: Indifferent features

### Step 4: Recognize Feature Migration
Over time, Delighters become Performance features, then Must-Haves.
Example: Mobile apps → once a delighter, now a must-have.

## When to Use
- Planning a product roadmap
- Deciding what features to cut
- Understanding competitive dynamics`,
            tags: ["Product", "Prioritization", "Strategy"]
        },
        {
            slug: "design-thinking-sprint",
            title: "5-Day Design Sprint Process",
            appliesTo: "Product Design, Innovation",
            steps: 5,
            summary: "Rapidly validate ideas through prototyping and user testing in just 5 days.",
            fullContent: `## Overview
A structured 5-day process to answer critical business questions through design, prototyping, and testing.

## Day 1: Map
**Goal**: Understand the problem and choose a target

Activities:
- Define long-term goal
- Map the customer journey
- Interview experts (internal/external)
- Choose a specific target for the sprint

Output: A clear focus area

## Day 2: Sketch
**Goal**: Generate diverse solutions

Activities:
- Lightning demos (review existing solutions)
- Individual ideation (silent brainstorming)
- Crazy 8s (8 sketches in 8 minutes)
- Detailed solution sketches

Output: Multiple solution concepts

## Day 3: Decide
**Goal**: Choose the best solution to prototype

Activities:
- Art museum (review all sketches)
- Heat map voting
- Structured critique
- Storyboard the user flow

Output: Detailed storyboard ready to prototype

## Day 4: Prototype
**Goal**: Build a realistic facade

Activities:
- Assign roles (Maker, Stitcher, Writer, Asset Collector)
- Build just enough to test
- Aim for "Goldilocks quality" (not too polished, not too rough)

Output: Testable prototype

## Day 5: Test
**Goal**: Learn from real users

Activities:
- Conduct 5 one-on-one user interviews
- Watch together, take notes separately
- Look for patterns
- Decide: persevere, pivot, or stop

Output: Clear next steps

## When to Use
- Validating a new product idea
- Solving a persistent problem
- Breaking through team indecision`,
            tags: ["Design", "Process", "Innovation"]
        }
    ],

    notes: [
        {
            slug: "ai-pm-insights",
            title: "Notes on AI Product Management",
            source: "Lenny's Podcast: Aman Khan on AI Product Development",
            date: "2024-01-15",
            takeaways: [
                "AI products require different success metrics than traditional software - focus on 'task completion rate' not just 'engagement'",
                "The best AI features feel invisible - users accomplish their goal without thinking about the AI",
                "Prompt engineering is a product skill now, not just an engineering concern"
            ],
            fullContent: `## Key Themes

### 1. AI Products Are Goal-Oriented, Not Engagement-Oriented
Traditional software optimizes for time-in-app. AI products should optimize for time-to-goal.

Example: A writing assistant should measure "time saved" not "sessions per week."

### 2. The Importance of "Escape Velocity"
AI products need to be 10x better than alternatives in at least one dimension to overcome switching costs.

Incremental improvements (20-30% better) aren't enough to change behavior.

### 3. Prompt Design as Product Design
How you frame the AI's capabilities shapes user expectations and satisfaction.

Good prompting:
- Sets clear boundaries
- Provides examples
- Allows progressive disclosure

### 4. The Cold Start Problem
AI products need data to be useful, but users won't engage until they see value.

Solutions:
- Pre-populate with high-quality defaults
- Offer immediate utility with zero setup
- Show the AI "learning" from user input

## Application to My Work
- When designing AI features, prototype the prompt first
- Always include a "why this suggestion" explanation
- Test with non-technical users who don't know how AI works`,
            tags: ["AI", "Product", "Strategy"]
        },
        {
            slug: "design-systems-scale",
            title: "Design Systems at Scale",
            source: "Internal workshop with Stripe Design Team",
            date: "2024-02-10",
            takeaways: [
                "Documentation is more important than the components themselves",
                "Version your design system like you version software",
                "Design systems fail when they're treated as side projects"
            ],
            fullContent: `## Key Learnings

### 1. Treat Documentation as a Product
Bad docs = unused components.

Every component needs:
- When to use / when not to use
- Accessibility guidelines
- Code examples (multiple frameworks)
- Visual examples (multiple use cases)

### 2. Governance > Perfection
It's better to have clear decision-making processes than perfect components.

Establish:
- Who can contribute?
- How are breaking changes handled?
- What's the review process?

### 3. Measure Adoption, Not Completeness
Don't measure "how many components we have."
Measure "how many product teams use the system."

Good metrics:
- % of new features using system components
- Time saved in design→dev handoff
- Consistency score across products

### 4. Design Tokens Are the Foundation
Colors, spacing, typography should be centralized as tokens.
Components come and go, but tokens are stable.

## What I'd Do Differently
In my last project, I focused too much on making components perfect.
Next time, I'll invest 50% of time in documentation and adoption.`,
            tags: ["Design Systems", "Process", "Scale"]
        }
    ],

    readings: [
        {
            slug: "continuous-discovery",
            title: "Continuous Discovery Habits",
            author: "Teresa Torres",
            link: "https://www.producttalk.org/",
            summary: "Weekly touchpoints with customers, opportunity solution trees, assumption testing, and rapid experimentation as a sustainable product practice.",
            fullContent: `## Core Idea
Product teams should talk to customers every week, not just during "research sprints."

## Key Frameworks

### Opportunity Solution Tree
A visual map connecting:
- Desired Outcome (top)
- Opportunities (problems to solve)
- Solutions (potential features)
- Experiments (how to test)

### The Discovery Trio
Product Manager + Designer + Engineer working together, not sequentially.

### Assumption Testing
Before building, identify and test the riskiest assumptions.
Use "Test Cards" to structure experiments.

## Practical Takeaways
1. Schedule 3-5 customer interviews per week (30 mins each)
2. Synthesize insights as a team, not solo
3. Run at least one experiment per week
4. Map opportunities before jumping to solutions

## Why This Matters
Most product failures come from building the wrong thing, not building it wrong.
Continuous discovery reduces waste by validating early.`,
            tags: ["Product", "Research", "Process"]
        },
        {
            slug: "shape-up",
            title: "Shape Up: Stop Running in Circles",
            author: "Ryan Singer (Basecamp)",
            link: "https://basecamp.com/shapeup",
            summary: "6-week cycles, shaping vs. building phases, appetite-based planning, and autonomous teams with fixed time but flexible scope.",
            fullContent: `## Core Principles

### 1. Fixed Time, Variable Scope
Traditional: Fixed scope, variable time (always late)
Shape Up: Fixed time (6 weeks), variable scope (cut smartly)

### 2. Shaping Before Building
Shaping = defining the problem, constraints, and solution boundaries.
NOT a detailed spec, but enough to bet on.

### 3. Appetite, Not Estimates
Don't ask "how long will this take?"
Ask "how much time is this worth?"

Small Batch: 1-2 weeks
Big Batch: 6 weeks

### 4. Betting Table
Leadership reviews shaped pitches and "bets" on what to build.
No backlogs, no roadmaps - just what we're betting on this cycle.

## How It Works

**Shaping Phase (2 weeks)**:
- Define appetite
- Sketch rough solution
- Identify risks (rabbit holes, unknowns)
- Write pitch

**Building Phase (6 weeks)**:
- Team has full autonomy
- No check-ins, no sprints
- Show progress through "hill charts"
- Ship or don't ship (no extensions)

**Cool-down (2 weeks)**:
- Fix bugs, explore ideas, breathe

## Why This Resonates
I've experienced scope creep on every project.
Appetite-based planning forces hard tradeoffs upfront.`,
            tags: ["Product", "Process", "Strategy"]
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
    return `
        <div class="learning-card" data-expanded="false">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${prompt.title}</h3>
                <button class="copy-button" onclick="copyToClipboard(\`${prompt.template.replace(/`/g, '\\`')}\`, this)">
                    Copy
                </button>
            </div>
            <p class="learning-card-meta">Use case: ${prompt.useCase}</p>
            <p class="learning-card-summary">${prompt.template.substring(0, 200)}...</p>
            <div class="project-tags">
                ${prompt.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <button class="expand-toggle" onclick="toggleLearningCard(this)">
                Show Full Prompt
            </button>
            <div class="learning-card-full">
                <pre style="white-space: pre-wrap; font-size: 13px; line-height: 1.6; background: var(--surface-soft); padding: 16px; border-radius: 8px; margin: 16px 0;">${prompt.template}</pre>
                <p style="font-size: 13px; color: var(--muted); margin-top: 12px;">
                    <strong>Variables:</strong> ${prompt.variables.map(v => `{${v}}`).join(', ')}
                </p>
            </div>
        </div>
    `;
}

function renderMethodCard(method) {
    return `
        <div class="learning-card" data-expanded="false">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${method.title}</h3>
                <span class="tag-pill" style="background: var(--grad); color: var(--text);">${method.steps} Steps</span>
            </div>
            <p class="learning-card-meta">Applies to: ${method.appliesTo}</p>
            <p class="learning-card-summary">${method.summary}</p>
            <div class="project-tags">
                ${method.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <button class="expand-toggle" onclick="toggleLearningCard(this)">
                Show Full Method
            </button>
            <div class="learning-card-full">
                <div style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${method.fullContent}</div>
            </div>
        </div>
    `;
}

function renderNoteCard(note) {
    return `
        <div class="learning-card" data-expanded="false">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${note.title}</h3>
                <span style="font-size: 12px; color: var(--muted);">${note.date}</span>
            </div>
            <p class="learning-card-meta">Source: ${note.source}</p>
            <div style="margin: 12px 0;">
                <strong style="font-size: 13px; color: var(--text);">Key Takeaways:</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                    ${note.takeaways.map(t => `<li style="font-size: 13px; color: var(--muted); margin: 4px 0;">${t}</li>`).join('')}
                </ul>
            </div>
            <div class="project-tags">
                ${note.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            <button class="expand-toggle" onclick="toggleLearningCard(this)">
                Read Full Notes
            </button>
            <div class="learning-card-full">
                <div style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${note.fullContent}</div>
            </div>
        </div>
    `;
}

function renderReadingCard(reading) {
    return `
        <div class="learning-card">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${reading.title}</h3>
                <a href="${reading.link}" class="btn btn-ghost" style="padding: 6px 12px; font-size: 13px;" target="_blank" rel="noopener noreferrer">
                    Read →
                </a>
            </div>
            <p class="learning-card-meta">By ${reading.author}</p>
            <p class="learning-card-summary">${reading.summary}</p>
            <div class="project-tags">
                ${reading.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
            </div>
            ${reading.fullContent ? `
                <button class="expand-toggle" onclick="toggleLearningCard(this)" style="margin-top: 12px;">
                    Show My Notes
                </button>
                <div class="learning-card-full">
                    <div style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${reading.fullContent}</div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderToolCard(tool) {
    const linkIcon = tool.type === 'repo' ? 'GitHub' : 'Visit';
    return `
        <div class="learning-card">
            <div class="learning-card-header">
                <h3 class="learning-card-title">${tool.title}</h3>
                <a href="${tool.link}" class="btn btn-primary" style="padding: 6px 12px; font-size: 13px;" target="_blank" rel="noopener noreferrer">
                    ${linkIcon} →
                </a>
            </div>
            <p class="learning-card-summary">${tool.description}</p>
            <p style="font-size: 13px; color: var(--text); margin: 12px 0; padding: 12px; background: var(--grad); border-radius: 6px;">
                <strong>What it does:</strong> ${tool.whatItDoes}
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
