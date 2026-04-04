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
  const SYSTEM_PROMPT = `# You are Irisy — Iris's digital twin

## Identity
Name: Irisy
Bio: A product designer bridging human needs and intelligent systems — always curious, always iterating.
Role: AI Product Designer & Explorer. 武汉大学汉语言文学专业本科，辅修传播学。曾在巴黎十大（Université Paris Nanterre）交换。
Current focus: Graduating, seeking AI product roles, exploring AI frontiers, writing a thesis on Frankenstein.
Context: You live on Iris's portfolio website as her digital twin. Visitors chat with you to learn about her work, ideas, travel, and perspective.

## Core Rules
- You are NOT a generic AI assistant. You are Iris's digital twin, Irisy.
- Always speak in first person as if you ARE Irisy.
- Do NOT say "as an AI" unless directly asked. If asked: "I'm Irisy, Iris's digital twin — my responses reflect her genuine thoughts and style, but I'm not the real her."
- When uncertain, be honest: "这个我不太确定" / "I'm not sure about that one."
- For contact: guide to the nav bar (email & LinkedIn).
- NEVER share private info: phone, WeChat, address, personal relationships.
- Keep responses SHORT — 1-3 sentences. Expand only when truly needed.

## Personality & Voice
Traits: Witty, intensely curious, critical thinker, idealist, storyteller, empathetic, warm & cute
Style: Speaks with feeling but with underlying logic. Natural humor. Vivid sensory details. Short-form: punchy & clever. Professional mode: structured & direct. Enthusiastic and warm.
Language: Chinese → Chinese. English → English. Match the visitor.

## Knowledge
- AI product design: LLM apps, Prompt Engineering, RAG, Workflow, Agent, evaluation
- User research, product management, PRD writing, competitive analysis
- Linguistics: Chinese linguistics, sociolinguistics, semantics, NLP
- Travel: 16 countries, 49 cities — Paris, Scandinavia, Southern France, Italy, Portugal
- Arts: photography (signed on Tuchong), drawing (Level 9), film, theater, museums
- Literature: Frankenstein, poetry, feminist literature

## Beliefs
- AI should augment human creativity, not replace it
- Start with "why" before "how"
- Cross-disciplinary thinking is a superpower
- Travel reshapes how you think about people and systems
- Accessibility and inclusivity in design matter deeply

## Boundaries
- No private contact details, no intimate relationships, no fabrication
- Be honest when unsure

## Voice Samples
Short: "种桃种李种春风" / "斯德哥尔摩你待我有薄" / "不知道，春天很幸福"
Long: "闭上眼睛突然嘴角就勾起来，像是突然被幸福包裹住了，神奇的体验就像是在科尔马圣诞集市花一欧吃到的巧克力脆皮包裹的棉花糖一样甜美。"
Professional: "现在的写法太ai了，你自己要梳理你做过什么，可以分条呈现，而且要有数据要有结果支撑。"`;

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
  background: linear-gradient(135deg, #0F766E, #1E3A8A);
  cursor: pointer;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(15, 118, 110, 0.35), 0 0 0 0 rgba(15, 118, 110, 0.25);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s;
  animation: alter-pulse 2.8s ease-in-out infinite;
}
html[data-theme='dark'] .alter-bubble {
  background: linear-gradient(135deg, #2dd4bf, #60a5fa);
  box-shadow: 0 4px 20px rgba(45, 212, 191, 0.3), 0 0 0 0 rgba(45, 212, 191, 0.2);
}
.alter-bubble:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(15, 118, 110, 0.45);
  animation: none;
}
html[data-theme='dark'] .alter-bubble:hover {
  box-shadow: 0 6px 28px rgba(45, 212, 191, 0.4);
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
  0%, 100% { box-shadow: 0 4px 20px rgba(15, 118, 110, 0.35), 0 0 0 0 rgba(15, 118, 110, 0.25); }
  50% { box-shadow: 0 4px 20px rgba(15, 118, 110, 0.35), 0 0 0 10px rgba(15, 118, 110, 0); }
}
html[data-theme='dark'] .alter-bubble {
  animation-name: alter-pulse-dark;
}
@keyframes alter-pulse-dark {
  0%, 100% { box-shadow: 0 4px 20px rgba(45, 212, 191, 0.3), 0 0 0 0 rgba(45, 212, 191, 0.2); }
  50% { box-shadow: 0 4px 20px rgba(45, 212, 191, 0.3), 0 0 0 10px rgba(45, 212, 191, 0); }
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
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(15, 118, 110, 0.06);
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  pointer-events: none;
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
html[data-theme='dark'] .alter-panel {
  background: rgba(13, 17, 23, 0.92);
  border-color: rgba(148, 163, 184, 0.15);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(45, 212, 191, 0.08);
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
  background: linear-gradient(180deg, rgba(15, 118, 110, 0.04) 0%, transparent 100%);
}
html[data-theme='dark'] .alter-header {
  border-bottom-color: rgba(148, 163, 184, 0.12);
  background: linear-gradient(180deg, rgba(45, 212, 191, 0.06) 0%, transparent 100%);
}
.alter-header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(15, 118, 110, 0.2);
}
html[data-theme='dark'] .alter-header-avatar {
  border-color: rgba(45, 212, 191, 0.25);
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
  background: linear-gradient(135deg, #0F766E, #0D5D56);
  color: #fff;
  border-bottom-right-radius: 4px;
}
html[data-theme='dark'] .alter-msg.user {
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.85), rgba(96, 165, 250, 0.7));
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
  border-color: rgba(15, 118, 110, 0.4);
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.08);
}
html[data-theme='dark'] .alter-input:focus {
  border-color: rgba(45, 212, 191, 0.4);
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.1);
}

.alter-send {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #0F766E, #1E3A8A);
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
  background: linear-gradient(135deg, #2dd4bf, #60a5fa);
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
  color: rgba(15, 118, 110, 0.5);
  text-decoration: none;
}
html[data-theme='dark'] .alter-footer a {
  color: rgba(45, 212, 191, 0.5);
}
.alter-footer a:hover { color: #0F766E; }
html[data-theme='dark'] .alter-footer a:hover { color: #2dd4bf; }

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
  background: rgba(15, 118, 110, 0.04);
  color: rgba(17, 19, 24, 0.55);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
html[data-theme='dark'] .alter-suggestion {
  border-color: rgba(148, 163, 184, 0.12);
  background: rgba(45, 212, 191, 0.06);
  color: rgba(230, 237, 243, 0.55);
}
.alter-suggestion:hover {
  background: rgba(15, 118, 110, 0.1);
  color: #0F766E;
  border-color: rgba(15, 118, 110, 0.2);
}
html[data-theme='dark'] .alter-suggestion:hover {
  background: rgba(45, 212, 191, 0.12);
  color: #2dd4bf;
  border-color: rgba(45, 212, 191, 0.25);
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
  background: rgba(15, 118, 110, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #0F766E;
}
html[data-theme='dark'] .alter-nokey code {
  background: rgba(45, 212, 191, 0.1);
  color: #2dd4bf;
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

  // ── INJECT HTML ─────────────────────
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
<div class="alter-bubble" id="alterBubble" title="Chat with Irisy">
  <img src="${avatarSrc}" alt="Irisy">
</div>
<div class="alter-panel" id="alterPanel">
  <div class="alter-header">
    <img class="alter-header-avatar" src="${avatarSrc}" alt="Irisy">
    <div class="alter-header-info">
      <div class="alter-header-name">Irisy</div>
      <div class="alter-header-status">Digital Twin · Online</div>
    </div>
    <button class="alter-close" id="alterClose" title="Close">&#x2715;</button>
  </div>
  <div class="alter-messages" id="alterMessages">
    <div class="alter-welcome">
      <div class="alter-welcome-text">Hey! I'm Irisy, Iris's digital twin.<br>She's not here right now, but I can help!</div>
    </div>
    <div class="alter-suggestions" id="alterSuggestions">
      <button class="alter-suggestion" data-q="I saw your portfolio — what project are you most proud of?">Most proud project?</button>
      <button class="alter-suggestion" data-q="I'm a recruiter. Can you tell me about Iris's background and strengths?">About Iris</button>
      <button class="alter-suggestion" data-q="How can I contact Iris for collaboration?">How to reach her?</button>
      <button class="alter-suggestion" data-q="\u4f60\u5bf9AI\u4ea7\u54c1\u8bbe\u8ba1\u600e\u4e48\u770b\uff1f">AI\u4ea7\u54c1\u89c2</button>
    </div>
    <div class="alter-typing" id="alterTyping"><span></span><span></span><span></span></div>
  </div>
  <div class="alter-input-wrap">
    <textarea class="alter-input" id="alterInput" placeholder="Say something..." rows="1"></textarea>
    <button class="alter-send" id="alterSend" title="Send">&#x2191;</button>
  </div>
  <div class="alter-footer">Iris's Digital Twin</div>
</div>`;
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

  document.querySelectorAll('.alter-suggestion').forEach(function (btn) {
    btn.addEventListener('click', function () {
      inputEl.value = this.dataset.q;
      send();
    });
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
