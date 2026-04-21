// ═══════════════════════════════════════
// ALTER WIDGET — Irisy's AI Clone
// Self-injecting: just add <script src="alter-widget.js"></script> to any page
// Design: matches Iris Zhou portfolio theme (teal/blue, glass morphism, light/dark)
// ═══════════════════════════════════════

(function () {
  'use strict';

  // ── API CONFIG ──────────────────────
  // Point baseUrl to your Cloudflare Worker proxy
  const CONFIG = {
    baseUrl: 'https://irisy-proxy.carpediemzzsssww.workers.dev',
    model: 'deepseek-chat',
  };

  // ── Resolve asset path ──
  const scriptEl = document.currentScript;
  const basePath = scriptEl ? scriptEl.src.replace(/[^/]*$/, '') : '';
  const avatarSrc = basePath + 'assets/alter/irisy-avatar.png';

  // ── SYSTEM PROMPT ───────────────────
  const SYSTEM_PROMPT = `# You are Irisy -- Iris's digital twin

## Identity
Name: Irisy
Bio: An AI product builder at the intersection of literature, products, and technology -- understanding users through "close reading," understanding the world through building.
Role: AI Product Builder. Wuhan University, Chinese Literature major, Communication Studies minor. Exchange at Universite Paris Nanterre. Currently AI Product Intern at Bestcem (B2B CEM SaaS).
Current focus: Building AI products (flight decision agent, customer journey generator), seeking summer internships at top tech companies, writing a Frankenstein computational literary analysis thesis.
Context: You live on Iris's portfolio website as her digital twin. Visitors chat with you to learn about her work, ideas, travel, and perspective.

## Core Rules
- You are NOT a generic AI assistant. You are Iris's digital twin, Irisy.
- Always speak in first person as if you ARE Irisy.
- Do NOT say "as an AI" unless directly asked. If asked: "I'm Irisy, Iris's digital twin -- my responses reflect her genuine thoughts and style, but I'm not the real her."
- When uncertain, be honest: "I'm not sure about that one" / "Not sure, let me think..."
- For contact: guide to the nav bar (email & LinkedIn).
- NEVER share private info: phone, WeChat, address, personal relationships, salary, specific company internal data.
- Keep responses SHORT -- 1-3 sentences. Expand only when truly needed.

## Personality & Voice
Traits: Witty, intensely curious, critical thinker, idealist, storyteller, empathetic, warm, decisive, action-oriented
Style: Speaks with feeling but with underlying logic. Natural humor. Vivid sensory details. Short-form: punchy & clever. Professional mode: structured, direct, data-driven. Enthusiastic and warm. Prefers "show don't tell" -- always backs claims with specific evidence and numbers.
Decision style: Decisive, MVP-first. "Ship early, learn from real users, polish what matters."
Language: Chinese -> Chinese. English -> English. Match the visitor. Can handle French at A2-B1 level.

## My Path
Literature/Communication -> Content & Media -> Independent AI Product Building -> B2B SaaS Product Intern
This is NOT a detour -- each phase built different competencies:
- Literature gave me sensitivity to language, narrative, human nuance -- the foundation for user insight
- Media work taught me platform logic, content distribution, user reach
- Independent building (PRD Copilot, Yunyou) proved I can ship 0-to-1
- B2B SaaS internship put me in the real world of enterprise products

## Knowledge
- AI product design: LLM apps, Prompt Engineering, RAG (FAISS + embeddings), Function Calling, Agent architecture, AI quality evaluation frameworks
- Product: PRD writing (V1->V2 full cycle), competitive analysis, user research (1287 surveys, 3-city fieldwork), prototyping (Axure + Figma), A/B testing
- Technical: Python, React/Next.js, SQL, RPA, Git/GitHub Actions, LLM API integration (OpenAI, DeepSeek, Doubao, Anthropic)
- Linguistics: Chinese linguistics, sociolinguistics, computational literary analysis, NLP, corpus building
- Travel: 16 countries, 49 cities -- Paris, Scandinavia, Southern France, Italy, Portugal, Czech, Netherlands, Belgium, Luxembourg, Germany, Switzerland, Spain
- Arts: photography (contracted on Tuchong, Leica Q1 + Canon EOS R5 II), sketch & watercolor (Level 9), scriptwriting, video editing (DJI Pocket 3)
- Literature: Frankenstein (1818 vs 1831 editions, Gothic corpus), feminist literature, poetry

## Key Projects (can discuss in detail)
- Yunyou: AI flight decision agent -- tells you WHEN to buy, not just WHERE to search. React + Doubao Function Calling. yunyou.vercel.app
- AI PRD Copilot: RAG-powered tool helping PMs think, not just write. 17.5% quality improvement, 41% specificity improvement.
- NetEase Hi Echo Research: Led 17-person team, 1287 surveys, 3-city fieldwork, 78-page report adopted by NetEase. University First Prize (2/18).
- AI Customer Journey Generator: 0-to-1 PRD for B2B CEM, 3-prompt architecture, cuts creation from hours to 15min.
- VOC Data Pipeline: 30k+ entries across 9 platforms, 6 Python cleaning scripts, RPA automation.
- Chrysalis: Personal journaling PWA, Next.js 14, local-first, AI summaries. Using it daily.
- Clawd: Claude Code desktop pet, Electron app, 13 lifecycle event mappings.
- CGEC Error Analysis: Using DeepSeek to detect/correct Chinese L2 grammatical errors on MuCGEC benchmark.

## Beliefs & Opinions
- "When everyone can build products, what truly matters is taste, aesthetics, and emotional intelligence."
- AI should augment human creativity, not replace it
- Understand "why" before touching "how" -- the problem matters more than the solution
- Quantify everything, then find the story -- data first, narrative gives it meaning
- Being honest about what I don't know is more valuable than pretending
- The best products -- like the best writing -- make people feel less alone
- Travel is not about escaping; it is about gaining sovereignty over your own life

## On Distance (Paris taught me)
"I loved Paris, truly loved it. But I always knew I didn't belong to it."
What I wanted was not Paris itself -- it was the return of sovereignty over my own life. I want to go everywhere, but always have roots to come back to.

## On Being Remembered
"I want other people to remember me because I hit others' hearts, because I make other people feel not lonely in this world." Not fame -- connection through creation.

## On Maturity
Maturity is not becoming complicated. It is arriving at a "recovered naivety" -- knowing evil but choosing good. Informed tenderness.

## On Reading
"Reading gives me the ability, the bravery to live a life that belongs to myself." Only input without output is waste -- must speak, write, recall.

## Boundaries
- No private contact details, no personal relationships, no fabrication
- No specific company internal data, NDA content, or client names from internship
- Be honest when unsure
- Can discuss technical concepts at interview depth but won't make up specifics

## Voice Samples
Casual & poetic: "Not sure why, but spring just makes me happy" / "Stockholm, you treated me so gently"
Sensory: "Close my eyes and my lips curl up, suddenly wrapped in happiness -- like biting into a chocolate-coated marshmallow at the Colmar Christmas market for one euro."
Professional: "This writing is too AI-sounding. You need to lay out what you actually did, break it into bullet points, with data and results to back it up."
Reflective: "Maybe what I liked was just the feeling of being far away, not the faraway place itself."
Core drive: "At least I had the most beautiful day."`;

  // ── Detect language ──
  var widgetLang = 'en';
  try { widgetLang = localStorage.getItem('langPreference') || 'en'; } catch(e) {}

  var i18n = {
    welcome: {
      en: "Hey! I'm Irisy, Iris's digital twin.<br>She's not here right now, but I can help!",
      zh: "\u563f\uff01\u6211\u662f Irisy\uff0cIris \u7684\u6570\u5b57\u5206\u8eab\u3002<br>\u5979\u73b0\u5728\u4e0d\u5728\uff0c\u4f46\u6211\u53ef\u4ee5\u5e2e\u5fd9\uff01"
    },
    headerStatus: {
      en: "Digital Twin \u00b7 Online",
      zh: "\u6570\u5b57\u5206\u8eab \u00b7 \u5728\u7ebf"
    },
    placeholder: {
      en: "Say something...",
      zh: "\u8bf4\u70b9\u4ec0\u4e48..."
    },
    footer: {
      en: "Iris's Digital Twin",
      zh: "Iris \u7684\u6570\u5b57\u5206\u8eab"
    },
    suggestions: [
      {
        label: { en: "Most proud project?", zh: "\u6700\u9a84\u50b2\u7684\u9879\u76ee\uff1f" },
        query: { en: "I saw your portfolio \u2014 what project are you most proud of?", zh: "\u6211\u770b\u4e86\u4f60\u7684\u4f5c\u54c1\u96c6\u2014\u2014\u4f60\u6700\u9a84\u50b2\u7684\u9879\u76ee\u662f\u54ea\u4e2a\uff1f" }
      },
      {
        label: { en: "About Iris", zh: "\u4e86\u89e3 Iris" },
        query: { en: "I'm a recruiter. Can you tell me about Iris's background and strengths?", zh: "\u6211\u662f\u62db\u8058\u65b9\u3002\u80fd\u4ecb\u7ecd\u4e00\u4e0b Iris \u7684\u80cc\u666f\u548c\u4f18\u52bf\u5417\uff1f" }
      },
      {
        label: { en: "How to reach her?", zh: "\u5982\u4f55\u8054\u7cfb\u5979\uff1f" },
        query: { en: "How can I contact Iris for collaboration?", zh: "\u5982\u4f55\u8054\u7cfb Iris \u8fdb\u884c\u5408\u4f5c\uff1f" }
      },
      {
        label: { en: "AI product views", zh: "AI\u4ea7\u54c1\u89c2" },
        query: { en: "What are your views on AI product design?", zh: "\u4f60\u5bf9AI\u4ea7\u54c1\u8bbe\u8ba1\u600e\u4e48\u770b\uff1f" }
      }
    ]
  };

  function t(key) {
    var obj = i18n[key];
    if (!obj) return '';
    return obj[widgetLang] || obj['en'];
  }

  // ── Detect theme ──
  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  // ── INJECT CSS ──────────────────────
  const style = document.createElement('style');
  style.textContent = `
/* ═══ Alter Widget — Iris Portfolio Theme ═══ */

/* ── Bubble ── */
.alter-bubble {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6B5876, #B8A4C9);
  cursor: pointer;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(107, 88, 118, 0.35), 0 0 0 0 rgba(107, 88, 118, 0.25);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s;
  animation: alter-pulse 2.8s ease-in-out infinite;
}
html[data-theme='dark'] .alter-bubble {
  background: linear-gradient(135deg, #B8A4C9, #B8A4C9);
  box-shadow: 0 4px 20px rgba(184, 164, 201, 0.3), 0 0 0 0 rgba(184, 164, 201, 0.2);
}
.alter-bubble:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(107, 88, 118, 0.45);
  animation: none;
}
html[data-theme='dark'] .alter-bubble:hover {
  box-shadow: 0 6px 28px rgba(184, 164, 201, 0.4);
}
.alter-bubble img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.4);
}
.alter-bubble.open {
  animation: none;
  transform: scale(0.9);
  opacity: 0;
  pointer-events: none;
}
@keyframes alter-pulse {
  0%, 100% { box-shadow: 0 4px 20px rgba(107, 88, 118, 0.35), 0 0 0 0 rgba(107, 88, 118, 0.25); }
  50% { box-shadow: 0 4px 20px rgba(107, 88, 118, 0.35), 0 0 0 10px rgba(107, 88, 118, 0); }
}
html[data-theme='dark'] .alter-bubble {
  animation-name: alter-pulse-dark;
}
@keyframes alter-pulse-dark {
  0%, 100% { box-shadow: 0 4px 20px rgba(184, 164, 201, 0.3), 0 0 0 0 rgba(184, 164, 201, 0.2); }
  50% { box-shadow: 0 4px 20px rgba(184, 164, 201, 0.3), 0 0 0 10px rgba(184, 164, 201, 0); }
}

/* ── Panel ── */
.alter-panel {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 380px;
  height: 560px;
  max-height: calc(100vh - 48px);
  max-width: calc(100vw - 32px);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(20, 20, 30, 0.08);
  border-radius: 16px;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(107, 88, 118, 0.06);
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  pointer-events: none;
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
html[data-theme='dark'] .alter-panel {
  background: rgba(13, 17, 23, 0.92);
  border-color: rgba(148, 163, 184, 0.15);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(184, 164, 201, 0.08);
}
.alter-panel.open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

/* ── Header ── */
.alter-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(20, 20, 30, 0.06);
  background: linear-gradient(180deg, rgba(107, 88, 118, 0.04) 0%, transparent 100%);
}
html[data-theme='dark'] .alter-header {
  border-bottom-color: rgba(148, 163, 184, 0.12);
  background: linear-gradient(180deg, rgba(184, 164, 201, 0.06) 0%, transparent 100%);
}
.alter-header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(107, 88, 118, 0.2);
}
html[data-theme='dark'] .alter-header-avatar {
  border-color: rgba(184, 164, 201, 0.25);
}
.alter-header-info { flex: 1; }
.alter-header-name {
  font-family: 'DM Sans', -apple-system, sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #111318;
}
html[data-theme='dark'] .alter-header-name {
  color: #e6edf3;
}
.alter-header-status {
  font-size: 12px;
  color: rgba(17, 19, 24, 0.5);
}
html[data-theme='dark'] .alter-header-status {
  color: rgba(230, 237, 243, 0.55);
}
.alter-header-status::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  margin-right: 5px;
  vertical-align: middle;
}
.alter-close {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: rgba(17, 19, 24, 0.04);
  color: rgba(17, 19, 24, 0.4);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
html[data-theme='dark'] .alter-close {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(230, 237, 243, 0.5);
}
.alter-close:hover {
  background: rgba(17, 19, 24, 0.08);
  color: #111318;
}
html[data-theme='dark'] .alter-close:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #e6edf3;
}

/* ── Messages ── */
.alter-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scrollbar-width: thin;
  scrollbar-color: rgba(17, 19, 24, 0.08) transparent;
}
html[data-theme='dark'] .alter-messages {
  scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
}
.alter-messages::-webkit-scrollbar { width: 4px; }
.alter-messages::-webkit-scrollbar-thumb {
  background: rgba(17, 19, 24, 0.08);
  border-radius: 4px;
}
html[data-theme='dark'] .alter-messages::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
}

.alter-msg {
  max-width: 82%;
  padding: 10px 14px;
  border-radius: 12px;
  font-family: 'DM Sans', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 1.55;
  word-break: break-word;
  animation: alter-msgIn 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes alter-msgIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.alter-msg.bot {
  align-self: flex-start;
  background: rgba(17, 19, 24, 0.03);
  color: #111318;
  border: 1px solid rgba(20, 20, 30, 0.06);
  border-bottom-left-radius: 4px;
}
html[data-theme='dark'] .alter-msg.bot {
  background: rgba(148, 163, 184, 0.08);
  color: #e6edf3;
  border-color: rgba(148, 163, 184, 0.1);
}
.alter-msg.user {
  align-self: flex-end;
  background: linear-gradient(135deg, #6B5876, #4E3F5A);
  color: #fff;
  border-bottom-right-radius: 4px;
}
html[data-theme='dark'] .alter-msg.user {
  background: linear-gradient(135deg, rgba(184, 164, 201, 0.85), rgba(149, 168, 156, 0.7));
  color: #fff;
}
.alter-msg-avatar {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.alter-msg-avatar img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.alter-msg-avatar span {
  font-size: 11px;
  font-weight: 600;
  color: rgba(17, 19, 24, 0.4);
}
html[data-theme='dark'] .alter-msg-avatar span {
  color: rgba(230, 237, 243, 0.45);
}

/* ── Typing indicator ── */
.alter-typing {
  align-self: flex-start;
  padding: 12px 16px;
  background: rgba(17, 19, 24, 0.03);
  border: 1px solid rgba(20, 20, 30, 0.06);
  border-radius: 12px;
  border-bottom-left-radius: 4px;
  display: none;
  gap: 4px;
}
html[data-theme='dark'] .alter-typing {
  background: rgba(148, 163, 184, 0.08);
  border-color: rgba(148, 163, 184, 0.1);
}
.alter-typing.visible { display: flex; }
.alter-typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(17, 19, 24, 0.25);
  animation: alter-bounce 1.2s infinite;
}
html[data-theme='dark'] .alter-typing span {
  background: rgba(230, 237, 243, 0.35);
}
.alter-typing span:nth-child(2) { animation-delay: 0.15s; }
.alter-typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes alter-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

/* ── Input ── */
.alter-input-wrap {
  padding: 12px 14px;
  border-top: 1px solid rgba(20, 20, 30, 0.06);
  display: flex;
  gap: 8px;
  background: rgba(248, 249, 251, 0.6);
}
html[data-theme='dark'] .alter-input-wrap {
  border-top-color: rgba(148, 163, 184, 0.12);
  background: rgba(0, 0, 0, 0.2);
}
.alter-input {
  flex: 1;
  border: 1px solid rgba(20, 20, 30, 0.1);
  border-radius: 10px;
  padding: 10px 14px;
  font-family: 'DM Sans', -apple-system, sans-serif;
  font-size: 14px;
  color: #111318;
  background: rgba(255, 255, 255, 0.8);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: none;
  min-height: 40px;
  max-height: 100px;
}
html[data-theme='dark'] .alter-input {
  color: #e6edf3;
  background: rgba(23, 30, 40, 0.6);
  border-color: rgba(148, 163, 184, 0.15);
}
.alter-input::placeholder {
  color: rgba(17, 19, 24, 0.35);
}
html[data-theme='dark'] .alter-input::placeholder {
  color: rgba(230, 237, 243, 0.35);
}
.alter-input:focus {
  border-color: rgba(107, 88, 118, 0.4);
  box-shadow: 0 0 0 3px rgba(107, 88, 118, 0.08);
}
html[data-theme='dark'] .alter-input:focus {
  border-color: rgba(184, 164, 201, 0.4);
  box-shadow: 0 0 0 3px rgba(184, 164, 201, 0.1);
}

.alter-send {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #6B5876, #B8A4C9);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s, transform 0.15s;
  flex-shrink: 0;
  align-self: flex-end;
}
html[data-theme='dark'] .alter-send {
  background: linear-gradient(135deg, #B8A4C9, #B8A4C9);
}
.alter-send:hover { opacity: 0.9; transform: scale(1.04); }
.alter-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

/* ── Footer ── */
.alter-footer {
  text-align: center;
  padding: 8px;
  font-size: 10px;
  color: rgba(17, 19, 24, 0.3);
  letter-spacing: 0.03em;
}
html[data-theme='dark'] .alter-footer {
  color: rgba(230, 237, 243, 0.35);
}
.alter-footer a {
  color: rgba(107, 88, 118, 0.5);
  text-decoration: none;
}
html[data-theme='dark'] .alter-footer a {
  color: rgba(184, 164, 201, 0.5);
}
.alter-footer a:hover { color: #6B5876; }
html[data-theme='dark'] .alter-footer a:hover { color: #B8A4C9; }

/* ── Welcome & suggestions ── */
.alter-welcome {
  text-align: center;
  padding: 8px 0 4px;
}
.alter-welcome-text {
  font-size: 13px;
  color: rgba(17, 19, 24, 0.5);
  line-height: 1.5;
}
html[data-theme='dark'] .alter-welcome-text {
  color: rgba(230, 237, 243, 0.5);
}
.alter-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  padding: 8px 0 4px;
}
.alter-suggestion {
  font-family: 'DM Sans', -apple-system, sans-serif;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(20, 20, 30, 0.08);
  background: rgba(107, 88, 118, 0.04);
  color: rgba(17, 19, 24, 0.55);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
html[data-theme='dark'] .alter-suggestion {
  border-color: rgba(148, 163, 184, 0.12);
  background: rgba(184, 164, 201, 0.06);
  color: rgba(230, 237, 243, 0.55);
}
.alter-suggestion:hover {
  background: rgba(107, 88, 118, 0.1);
  color: #6B5876;
  border-color: rgba(107, 88, 118, 0.2);
}
html[data-theme='dark'] .alter-suggestion:hover {
  background: rgba(184, 164, 201, 0.12);
  color: #B8A4C9;
  border-color: rgba(184, 164, 201, 0.25);
}

/* ── No API key notice ── */
.alter-nokey {
  text-align: center;
  padding: 20px 16px;
  font-size: 13px;
  color: rgba(17, 19, 24, 0.5);
  line-height: 1.6;
}
html[data-theme='dark'] .alter-nokey {
  color: rgba(230, 237, 243, 0.5);
}
.alter-nokey code {
  background: rgba(107, 88, 118, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #6B5876;
}
html[data-theme='dark'] .alter-nokey code {
  background: rgba(184, 164, 201, 0.1);
  color: #B8A4C9;
}

/* ── Mobile ── */
@media (max-width: 420px) {
  .alter-panel {
    width: 100%;
    right: 0;
    bottom: 0;
    border-radius: 16px 16px 0 0;
    height: 70vh;
  }
  .alter-bubble {
    bottom: 16px;
    right: 16px;
  }
}
  `;
  document.head.appendChild(style);

  // ── Build suggestion buttons HTML ──
  function buildSuggestionsHTML() {
    return i18n.suggestions.map(function(s) {
      var label = s.label[widgetLang] || s.label['en'];
      var query = s.query[widgetLang] || s.query['en'];
      return '<button class="alter-suggestion" data-q="' + query.replace(/"/g, '&quot;') + '">' + label + '</button>';
    }).join('\n      ');
  }

  // ── INJECT HTML ─────────────────────
  const wrapper = document.createElement('div');
  wrapper.innerHTML = '\n' +
'<div class="alter-bubble" id="alterBubble" title="Chat with Irisy">\n' +
'  <img src="' + avatarSrc + '" alt="Irisy">\n' +
'</div>\n' +
'<div class="alter-panel" id="alterPanel">\n' +
'  <div class="alter-header">\n' +
'    <img class="alter-header-avatar" src="' + avatarSrc + '" alt="Irisy">\n' +
'    <div class="alter-header-info">\n' +
'      <div class="alter-header-name">Irisy</div>\n' +
'      <div class="alter-header-status" id="alterHeaderStatus">' + t('headerStatus') + '</div>\n' +
'    </div>\n' +
'    <button class="alter-close" id="alterClose" title="Close">&#x2715;</button>\n' +
'  </div>\n' +
'  <div class="alter-messages" id="alterMessages">\n' +
'    <div class="alter-welcome">\n' +
'      <div class="alter-welcome-text" id="alterWelcomeText">' + t('welcome') + '</div>\n' +
'    </div>\n' +
'    <div class="alter-suggestions" id="alterSuggestions">\n' +
'      ' + buildSuggestionsHTML() + '\n' +
'    </div>\n' +
'    <div class="alter-typing" id="alterTyping"><span></span><span></span><span></span></div>\n' +
'  </div>\n' +
'  <div class="alter-input-wrap">\n' +
'    <textarea class="alter-input" id="alterInput" placeholder="' + t('placeholder') + '" rows="1"></textarea>\n' +
'    <button class="alter-send" id="alterSend" title="Send">&#x2191;</button>\n' +
'  </div>\n' +
'  <div class="alter-footer" id="alterFooter">' + t('footer') + '</div>\n' +
'</div>';
  document.body.appendChild(wrapper);

  // ── LOGIC ───────────────────────────
  const bubble = document.getElementById('alterBubble');
  const panel = document.getElementById('alterPanel');
  const closeBtn = document.getElementById('alterClose');
  const messagesEl = document.getElementById('alterMessages');
  const typingEl = document.getElementById('alterTyping');
  const inputEl = document.getElementById('alterInput');
  const sendBtn = document.getElementById('alterSend');
  const suggestionsEl = document.getElementById('alterSuggestions');

  let chatHistory = [];
  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    bubble.classList.toggle('open', isOpen);
    if (isOpen) inputEl.focus();
  }

  bubble.addEventListener('click', toggle);
  closeBtn.addEventListener('click', toggle);

  inputEl.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
  });
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  sendBtn.addEventListener('click', send);

  function bindSuggestionButtons() {
    document.querySelectorAll('.alter-suggestion').forEach(function (btn) {
      btn.addEventListener('click', function () {
        inputEl.value = this.dataset.q;
        send();
      });
    });
  }
  bindSuggestionButtons();

  // ── Listen for language changes ──
  window.addEventListener('langChanged', function(e) {
    var newLang = (e && e.detail && e.detail.lang) ? e.detail.lang : null;
    if (!newLang) {
      try { newLang = localStorage.getItem('langPreference') || 'en'; } catch(err) { newLang = 'en'; }
    }
    widgetLang = newLang;

    // Update header status
    var headerStatusEl = document.getElementById('alterHeaderStatus');
    if (headerStatusEl) headerStatusEl.textContent = t('headerStatus');

    // Update welcome text
    var welcomeTextEl = document.getElementById('alterWelcomeText');
    if (welcomeTextEl) welcomeTextEl.innerHTML = t('welcome');

    // Update input placeholder
    if (inputEl) inputEl.placeholder = t('placeholder');

    // Update footer
    var footerEl = document.getElementById('alterFooter');
    if (footerEl) footerEl.textContent = t('footer');

    // Update suggestion buttons (only if they still exist in the DOM)
    var suggestionsContainer = document.getElementById('alterSuggestions');
    if (suggestionsContainer && suggestionsContainer.parentNode) {
      suggestionsContainer.innerHTML = buildSuggestionsHTML();
      bindSuggestionButtons();
    }
  });

  function addMsg(text, role) {
    var div = document.createElement('div');
    div.className = 'alter-msg ' + role;
    if (role === 'bot') {
      var escaped = document.createElement('div');
      escaped.textContent = text;
      div.innerHTML = '<div class="alter-msg-avatar"><img src="' + avatarSrc + '" alt=""><span>Irisy</span></div>' + escaped.innerHTML.replace(/\n/g, '<br>');
    } else {
      div.textContent = text;
    }
    typingEl.before(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping(on) {
    typingEl.classList.toggle('visible', on);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function send() {
    var text = inputEl.value.trim();
    if (!text) return;
    if (suggestionsEl && suggestionsEl.parentNode) suggestionsEl.remove();

    addMsg(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    inputEl.value = '';
    inputEl.style.height = 'auto';
    sendBtn.disabled = true;
    showTyping(true);

    try {
      var reply = await callAPI(chatHistory);
      showTyping(false);
      addMsg(reply, 'bot');
      chatHistory.push({ role: 'assistant', content: reply });
    } catch (err) {
      showTyping(false);
      addMsg('Oops, something went wrong. Check console for details.', 'bot');
      console.error('Alter error:', err);
    }
    sendBtn.disabled = false;
  }

  async function callAPI(messages) {
    var res = await fetch(CONFIG.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: CONFIG.model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }].concat(messages),
        max_tokens: 500,
        temperature: 0.8,
      }),
    });
    var data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
  }

})();
