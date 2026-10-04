'use strict';

// Повторение испанского по темам из тетради.
// Каждый элемент (слово, форма глагола, фраза, вопрос) живёт в «коробке» 0..6:
// верный ответ двигает выше и отодвигает следующий показ, ошибка — на две вниз.
// Процент темы = средняя коробка её элементов (выше 5 не считаем).

const PERSONS = ['yo', 'tú', 'él / ella', 'nosotros', 'vosotros', 'ellos'];
const INTERVALS = [0, 1, 2, 4, 8, 16, 35]; // дни до следующего показа по коробке
const DAY = 864e5;
const STORE = 'es-progress-v1';
const LESSON_SIZE = 12;

// ---------- данные ----------

const lines = s => (s || '').split('\n').map(x => x.trim()).filter(Boolean);

function buildItems(t) {
  const items = [];
  lines(t.words).forEach(l => {
    const [es, ua] = l.split('|');
    items.push({ key: `${t.id}|w|${es}`, type: 'word', es, ua });
  });
  (t.conj || []).forEach(c => lines(c.v).forEach(l => {
    const i = l.indexOf(':');
    const verb = l.slice(0, i).trim();
    l.slice(i + 1).split(',').map(s => s.trim()).forEach((f, k) => items.push({
      key: `${t.id}|c|${verb}|${c.t}|${k}`, type: 'form',
      prompt: verb, label: `${c.t} · ${PERSONS[k]}`, answer: f, group: verb + c.t,
    }));
  }));
  (t.drills || []).forEach(d => lines(d.v).forEach(l => {
    const [p, a] = l.split('|');
    items.push({ key: `${t.id}|d|${d.t}|${p}`, type: 'form', prompt: p, label: d.t, answer: a, group: d.t });
  }));
  lines(t.sents).forEach(l => {
    const [text, ua] = l.split('|');
    items.push({ key: `${t.id}|s|${text}`, type: 'sent', text, ua });
  });
  (t.quiz || []).forEach(q => items.push({ key: `${t.id}|q|${q.q}`, type: 'quiz', q: q.q, o: q.o, e: q.e }));
  items.forEach(it => { it.topic = t; });
  return items;
}

const TOPICS = window.TOPICS;
TOPICS.forEach(t => { t.items = buildItems(t); });
const TOPIC = Object.fromEntries(TOPICS.map(t => [t.id, t]));
const ALL = TOPICS.flatMap(t => t.items);
const ALL_WORDS = ALL.filter(i => i.type === 'word');

// ---------- прогресс ----------

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE));
    if (s && s.items) return Object.assign({ days: {}, xp: 0, voice: true }, s);
  } catch (e) {}
  return { items: {}, days: {}, xp: 0, voice: true };
}
let S = load();
function save() { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} }

const st = it => S.items[it.key];
const today = () => new Date().toLocaleDateString('sv'); // YYYY-MM-DD

function effBox(it, now = Date.now()) {
  const s = st(it);
  if (!s) return 0;
  // давно не повторял — знание подтаивает
  const late = s.d && now > s.d + INTERVALS[s.b] * DAY + DAY;
  return Math.max(0, s.b - (late ? 1 : 0));
}
function mastery(items) {
  if (!items.length) return 0;
  const sum = items.reduce((a, it) => a + Math.min(effBox(it), 5) / 5, 0);
  return Math.round(sum / items.length * 100);
}
function counts(items) {
  let fresh = 0, learning = 0, known = 0;
  items.forEach(it => {
    const s = st(it);
    if (!s) fresh++; else if (s.b >= 4) known++; else learning++;
  });
  return { fresh, learning, known };
}
function dueItems(items, now = Date.now()) {
  return items.filter(it => { const s = st(it); return s && s.d <= now; });
}
function mistakeItems() {
  return ALL.filter(it => { const s = st(it); return s && s.w > 0 && s.b <= 3; })
    .sort((a, b) => (st(b).w - st(b).c * .5) - (st(a).w - st(a).c * .5));
}
function streak() {
  let n = 0;
  const d = new Date();
  if (!S.days[today()]) d.setDate(d.getDate() - 1); // сегодня ещё не занимался — серия не сгорела
  while (S.days[d.toLocaleDateString('sv')]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

// ---------- утилиты ----------

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const uniq = a => [...new Set(a)];
const stripAcc = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const norm = s => s.toLowerCase().replace(/[¿¡?!.,;:«»"…→]/g, ' ').replace(/\s+/g, ' ').trim();
const clean = s => s.replace(/\([^)]*\)/g, '').trim();
const variants = ans => ans.split(' / ').map(v => norm(clean(v))).filter(Boolean);
const ARTICLE = /^(el|la|los|las|un|una) /;

function lev(a, b) {
  if (Math.abs(a.length - b.length) > 1) return 2;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

// Проверка набранного ответа: ударения, артикль и одна опечатка прощаются, но с пометкой.
function checkTyped(input, answer) {
  const u = norm(input);
  if (!u) return { ok: false };
  const vs = variants(answer);
  for (const v of vs) if (u === v) return { ok: true };
  for (const v of vs) if (stripAcc(u) === stripAcc(v)) return { ok: true, note: `Внимание на ударения: <b>${esc(v)}</b>` };
  for (const v of vs) if (ARTICLE.test(v) && stripAcc(u) === stripAcc(v.replace(ARTICLE, '')))
    return { ok: true, note: `Не забывай артикль: <b>${esc(v)}</b>` };
  for (const v of vs) if (v.length >= 5 && lev(stripAcc(u), stripAcc(v)) <= 1) return { ok: true, note: `Опечатка, правильно: <b>${esc(v)}</b>` };
  return { ok: false };
}

// ---------- озвучка ----------

let esVoice = null;
const hasTTS = 'speechSynthesis' in window;
const esVoices = () => hasTTS ? speechSynthesis.getVoices().filter(v => v.lang.replace('_', '-').startsWith('es')) : [];
// Базовые голоса iOS звучат роботом; улучшенные/премиум, если скачаны, берём первыми.
const voiceScore = v => (/premium|enhanced|улучш|высок|neural/i.test(v.name + v.voiceURI) ? 4 : 0)
  + (/es-ES/i.test(v.lang.replace('_', '-')) ? 2 : 0) + (/compact|eloquence/i.test(v.voiceURI) ? -3 : 0);
function pickVoice() {
  const vs = esVoices();
  esVoice = vs.find(v => v.voiceURI === S.voiceURI)
    || vs.slice().sort((a, b) => voiceScore(b) - voiceScore(a))[0] || null;
}
if (hasTTS) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(text) {
  if (!hasTTS) return;
  const u = new SpeechSynthesisUtterance(clean(text).replace(/\[|\]/g, '').replace(/ \/ /g, ', '));
  u.lang = 'es-ES';
  if (esVoice) u.voice = esVoice;
  u.rate = .9;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// ---------- упражнения ----------

function pickDistractors(correct, pool, n = 3) {
  return shuffle(uniq(pool.filter(x => x && norm(x) !== norm(correct)))).slice(0, n);
}

function wordMC(it, dir) {
  const pool = it.topic.items.filter(i => i.type === 'word').length >= 4
    ? it.topic.items.filter(i => i.type === 'word') : ALL_WORDS;
  if (dir === 'es2ua') {
    return { kind: 'mc', item: it, label: 'Что это значит?', prompt: it.es, speakPrompt: it.es, answer: it.ua,
      options: shuffle([it.ua, ...pickDistractors(it.ua, pool.map(i => i.ua))]) };
  }
  return { kind: 'mc', item: it, label: 'Выбери перевод', prompt: it.ua, answer: it.es, speakAnswer: it.es,
    options: shuffle([it.es, ...pickDistractors(it.es, pool.map(i => i.es))]) };
}

function makeExercise(it) {
  const s = st(it);
  const b = s ? s.b : 0;
  const r = Math.random();

  if (it.type === 'quiz') {
    return { kind: 'mc', item: it, label: 'Выбери правильный вариант', prompt: it.q, answer: it.o[0],
      options: shuffle(it.o.slice()), explain: it.e };
  }

  if (it.type === 'word') {
    if (b === 0) return wordMC(it, 'es2ua');
    if (b === 1) return wordMC(it, r < .5 ? 'ua2es' : 'es2ua');
    if (hasTTS && r < .25) return { kind: 'listen', item: it, label: 'Напиши, что услышал', answer: it.es, after: it.ua, speakPrompt: it.es };
    if (r < .8) return { kind: 'type', item: it, label: 'Переведи на испанский', prompt: it.ua, answer: it.es, speakAnswer: it.es };
    return wordMC(it, 'ua2es');
  }

  if (it.type === 'form') {
    if (b <= 1) {
      const same = it.topic.items.filter(i => i.type === 'form');
      let ds = pickDistractors(it.answer, same.filter(i => i.group === it.group).map(i => i.answer));
      if (ds.length < 3) ds = uniq([...ds, ...pickDistractors(it.answer, same.map(i => i.answer))]).slice(0, 3);
      return { kind: 'mc', item: it, label: it.label, prompt: it.prompt, answer: it.answer, speakAnswer: it.answer,
        options: shuffle([it.answer, ...ds]) };
    }
    return { kind: 'type', item: it, label: it.label, prompt: it.prompt, answer: it.answer, speakAnswer: it.answer };
  }

  // фраза с пропуском
  const gap = it.text.match(/\[(.+?)\]/)[1];
  const full = it.text.replace(/[[\]]/g, '');
  const shown = esc(it.text.replace(/\[.+?\]/, '§')).replace('§', '<span class="gap">&nbsp;</span>');
  const order = { kind: 'order', item: it, label: 'Собери фразу', prompt: it.ua, answer: full, speakAnswer: full,
    tiles: shuffle(full.split(' ')) };
  const gaps = it.topic.items.filter(i => i.type === 'sent').map(i => i.text.match(/\[(.+?)\]/)[1]);
  const clozeMC = { kind: 'mc', item: it, label: 'Вставь пропущенное', promptHTML: shown, hint: it.ua, answer: gap,
    speakAnswer: full, options: shuffle([gap, ...pickDistractors(gap, gaps)]) };
  const clozeType = { kind: 'type', item: it, label: 'Впиши пропущенное', promptHTML: shown, hint: it.ua, answer: gap, speakAnswer: full };
  if (b === 0) return r < .5 ? order : clozeMC;
  if (b === 1) return r < .5 ? clozeMC : order;
  return r < .6 ? clozeType : order;
}

// ---------- набор урока ----------

function buildSession(items, n = LESSON_SIZE, maxNew = 6) {
  const now = Date.now();
  const due = [], fresh = [], rest = [];
  items.forEach(it => { const s = st(it); if (!s) fresh.push(it); else if (s.d <= now) due.push(it); else rest.push(it); });
  due.sort((a, b) => st(a).b - st(b).b || st(a).d - st(b).d);
  rest.sort((a, b) => st(a).b - st(b).b || Math.random() - .5);
  shuffle(fresh);
  const out = due.slice(0, n);
  while (out.length < n && fresh.length && out.filter(i => !st(i)).length < maxNew) out.push(fresh.shift());
  while (out.length < n && rest.length) out.push(rest.shift());
  while (out.length < n && fresh.length) out.push(fresh.shift());
  return shuffle(out);
}

function reviewSession() {
  const seen = ALL.filter(it => st(it));
  if (!seen.length) return buildSession(ALL, LESSON_SIZE, LESSON_SIZE);
  const due = dueItems(seen).sort((a, b) => st(a).b - st(b).b || st(a).d - st(b).d).slice(0, 15);
  if (due.length >= 8) return shuffle(due);
  const weak = seen.filter(it => !due.includes(it)).sort((a, b) => st(a).b - st(b).b || Math.random() - .5);
  return shuffle([...due, ...weak.slice(0, 10 - due.length)]);
}

// ---------- урок ----------

let L = null; // текущий урок

function startLesson(items, title, back) {
  if (!items.length) return;
  L = { queue: items.slice(), total: items.length, done: 0, right: 0, first: new Set(), retried: new Set(),
        title, back, ex: null, answered: false, startedXp: S.xp };
  nextExercise();
}

function nextExercise() {
  if (!L.queue.length) return renderResult();
  L.ex = makeExercise(L.queue[0]);
  L.answered = false;
  L.sel = null;
  L.built = [];
  renderLesson();
  if (L.ex.kind === 'listen') setTimeout(() => speak(L.ex.speakPrompt), 250);
}

function grade(ok, note) {
  const it = L.ex.item;
  const now = Date.now();
  const s = S.items[it.key] || { b: 0, d: 0, c: 0, w: 0 };
  if (!L.first.has(it.key)) {
    // коробку двигает только первая попытка в уроке, повтор после ошибки лишь тренирует
    L.first.add(it.key);
    s.b = ok ? Math.min(s.b + 1, 6) : Math.max(0, s.b - 2);
    s.d = now + INTERVALS[s.b] * DAY;
  }
  if (ok) { s.c++; L.right++; S.xp += 10; } else s.w++;
  S.items[it.key] = s;
  S.days[today()] = (S.days[today()] || 0) + 1;
  save();

  L.queue.shift();
  L.done++;
  if (!ok && !L.retried.has(it.key)) { L.retried.add(it.key); L.queue.push(it); L.total++; }
  L.answered = true;
  if (ok && S.voice && L.ex.speakAnswer) speak(L.ex.speakAnswer);
  showFeedback(ok, note);
}

function showFeedback(ok, note) {
  const ex = L.ex;
  const right = ex.kind === 'mc' && ex.item.type === 'word' && ex.label === 'Что это значит?'
    ? `${esc(ex.prompt)} — ${esc(ex.answer)}` : esc(ex.speakAnswer || ex.answer);
  const extra = [];
  if (note) extra.push(note);
  if (!ok) extra.push(`Правильно: <b>${right}</b>`);
  if (ex.after) extra.push(esc(ex.after));
  if (ex.explain) extra.push(esc(ex.explain));
  const fb = document.createElement('div');
  fb.className = 'feedback ' + (ok ? 'ok' : 'no');
  fb.innerHTML = `<div class="in">
    <h3>${ok ? pick(['Отлично!', '¡Muy bien!', 'Верно!', '¡Perfecto!']) : 'Не совсем'}</h3>
    ${extra.map(x => `<div class="note">${x}</div>`).join('')}
    <button class="btn ${ok ? '' : 'bad'}" id="next">Дальше</button></div>`;
  document.body.appendChild(fb);
  document.getElementById('next').onclick = () => { fb.remove(); nextExercise(); };
  document.getElementById('next').focus();
}
const pick = a => a[Math.random() * a.length | 0];

// ---------- экраны ----------

const $app = document.getElementById('app');
function render(html) { document.querySelectorAll('.feedback').forEach(e => e.remove()); $app.innerHTML = html; window.scrollTo(0, 0); }

function topicRow(t) {
  const p = mastery(t.items);
  return `<button class="card topic" data-topic="${t.id}">
    <span class="ic">${t.icon}</span>
    <span class="meta"><span class="name">${esc(t.title)}</span>
      <div class="bar"><i style="width:${p}%"></i></div></span>
    <span class="pct">${p}%</span></button>`;
}

function renderHome() {
  L = null;
  const due = dueItems(ALL).length;
  const mist = mistakeItems().length;
  const total = mastery(ALL);
  const todayN = S.days[today()] || 0;
  render(`
    <div class="top">
      <h1>Español</h1><span class="spacer"></span>
      <span class="stat-pill">🔥 ${streak()}</span>
      <button class="icon-btn" id="settings" aria-label="Настройки">⚙️</button>
    </div>
    <p class="muted small">Сегодня ответов: ${todayN} · всего знаний: ${total}%</p>
    <div class="hero">
      <button class="card primary" id="review">
        <span class="big">🔁</span>
        <span><b>Повторение на сегодня</b><span class="muted small">${due ? `Ждут повторения: ${due}` : 'Всё повторено — можно закрепить слабые места'}</span></span>
      </button>
      <button class="card" id="mistakes" ${mist ? '' : 'disabled style="opacity:.55"'}>
        <span class="big">🎯</span>
        <span><b>Мои ошибки</b><span class="muted small">${mist ? `Слабых мест: ${mist}` : 'Пока ошибок нет'}</span></span>
      </button>
    </div>
    <h2>Грамматика</h2>
    ${TOPICS.filter(t => t.group === 'grammar').map(topicRow).join('')}
    <h2>Слова</h2>
    ${TOPICS.filter(t => t.group === 'vocab').map(topicRow).join('')}
  `);
  document.getElementById('review').onclick = () => startLesson(reviewSession(), 'Повторение', renderHome);
  document.getElementById('mistakes').onclick = () => startLesson(shuffle(mistakeItems().slice(0, LESSON_SIZE)), 'Ошибки', renderHome);
  document.getElementById('settings').onclick = renderSettings;
  $app.querySelectorAll('[data-topic]').forEach(b => b.onclick = () => renderTopic(b.dataset.topic));
}

function renderTopic(id) {
  const t = TOPIC[id];
  const p = mastery(t.items);
  const c = counts(t.items);
  const due = dueItems(t.items).length;
  render(`
    <div class="top"><button class="icon-btn" id="back">←</button><span class="spacer"></span></div>
    <div style="font-size:44px">${t.icon}</div>
    <h1>${esc(t.title)}</h1>
    <div class="card" style="margin-top:14px">
      <div class="row"><b>Знание темы</b><span class="spacer"></span><b>${p}%</b></div>
      <div class="bar big"><i style="width:${p}%"></i></div>
      <div class="stats3">
        <div><b>${c.fresh}</b><span>новые</span></div>
        <div><b>${c.learning}</b><span>учу</span></div>
        <div><b>${c.known}</b><span>знаю</span></div>
      </div>
      ${due ? `<p class="small muted" style="margin-top:10px">Пора повторить: ${due}</p>` : ''}
    </div>
    <button class="btn" id="start">${c.fresh === t.items.length ? 'Начать' : 'Урок'}</button>
    ${t.notes ? '<button class="btn ghost" id="notes">📖 Конспект</button>' : ''}
    <button class="btn ghost" id="list">📋 Все элементы (${t.items.length})</button>
  `);
  document.getElementById('back').onclick = renderHome;
  document.getElementById('start').onclick = () => startLesson(buildSession(t.items), t.title, () => renderTopic(id));
  if (t.notes) document.getElementById('notes').onclick = () => renderNotes(id);
  document.getElementById('list').onclick = () => renderList(id);
}

function renderNotes(id) {
  const t = TOPIC[id];
  render(`
    <div class="top"><button class="icon-btn" id="back">←</button><h1 style="font-size:22px">${esc(t.title)}</h1></div>
    <div class="card notes">${t.notes}</div>
    <button class="btn" id="start">Тренировать</button>`);
  document.getElementById('back').onclick = () => renderTopic(id);
  document.getElementById('start').onclick = () => startLesson(buildSession(t.items), t.title, () => renderTopic(id));
}

function itemLine(it) {
  const s = st(it);
  const lvl = !s ? '' : s.b >= 4 ? 'l4' : s.b >= 3 ? 'l3' : s.b >= 1 ? 'l2' : 'l1';
  let es, ru;
  if (it.type === 'word') { es = it.es; ru = it.ua; }
  else if (it.type === 'form') { es = it.answer; ru = `${it.prompt} · ${it.label}`; }
  else if (it.type === 'sent') { es = it.text.replace(/[[\]]/g, ''); ru = it.ua; }
  else { es = it.o[0]; ru = it.q; }
  return `<div class="list-item"><span class="dot ${lvl}"></span>
    <div style="flex:1;min-width:0"><div class="es">${esc(es)}</div><div class="small muted">${esc(ru)}</div></div>
    ${it.type !== 'quiz' && hasTTS ? `<button class="speak" data-say="${esc(es)}">🔊</button>` : ''}</div>`;
}

function renderList(id) {
  const t = TOPIC[id];
  render(`
    <div class="top"><button class="icon-btn" id="back">←</button><h1 style="font-size:22px">${esc(t.title)}</h1></div>
    <p class="small muted">⚪ не встречалось · 🔴 ошибаюсь · 🟡 учу · 🟢 знаю</p>
    <div class="card">${t.items.map(itemLine).join('')}</div>`);
  document.getElementById('back').onclick = () => renderTopic(id);
  $app.querySelectorAll('[data-say]').forEach(b => b.onclick = () => speak(b.dataset.say));
}

function lessonHeader() {
  const p = Math.round(L.done / L.total * 100);
  return `<div class="lesson-top"><button class="icon-btn" id="quit">✕</button>
    <div class="bar"><i style="width:${p}%"></i></div></div>`;
}

function renderLesson() {
  const ex = L.ex;
  const promptBlock = ex.promptHTML
    ? `<div class="prompt">${ex.promptHTML}</div>`
    : ex.prompt ? `<div class="prompt">${esc(ex.prompt)}${ex.speakPrompt && hasTTS ? ` <button class="speak" id="say">🔊</button>` : ''}</div>` : '';
  const hint = ex.hint ? `<div class="hint">${esc(ex.hint)}</div>` : '';
  let body = '';
  if (ex.kind === 'mc') {
    body = `<div class="options">${ex.options.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join('')}</div>`;
  } else if (ex.kind === 'type' || ex.kind === 'listen') {
    body = `${ex.kind === 'listen' ? '<button class="big-speak" id="say">🔊</button>' : ''}
      <input class="input" id="ans" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Ответ по-испански">
      <div class="accents">${['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(c => `<button data-ch="${c}">${c}</button>`).join('')}</div>
      <button class="btn" id="check">Проверить</button>`;
  } else if (ex.kind === 'order') {
    body = `<div class="answer-line" id="line"></div>
      <div class="tiles">${ex.tiles.map((w, i) => `<button class="tile" data-t="${i}">${esc(w)}</button>`).join('')}</div>
      <button class="btn" id="check" disabled>Проверить</button>`;
  }
  render(`${lessonHeader()}
    <div class="task-label">${esc(ex.label)}</div>
    ${promptBlock}${hint}${body}<div class="pad-bottom"></div>`);

  document.getElementById('quit').onclick = () => { if (L.done === 0 || confirm('Закончить урок? Прогресс по отвеченному сохранён.')) L.back(); };
  const say = document.getElementById('say');
  if (say) say.onclick = () => speak(ex.speakPrompt);

  if (ex.kind === 'mc') {
    $app.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (L.answered) return;
      const choice = ex.options[+b.dataset.i];
      const ok = choice === ex.answer;
      $app.querySelectorAll('.opt').forEach(x => { if (ex.options[+x.dataset.i] === ex.answer) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      grade(ok);
    });
  } else if (ex.kind === 'type' || ex.kind === 'listen') {
    const inp = document.getElementById('ans');
    const submit = () => {
      if (L.answered || !inp.value.trim()) return;
      const r = checkTyped(inp.value, ex.answer);
      inp.disabled = true;
      grade(r.ok, r.note);
    };
    document.getElementById('check').onclick = submit;
    inp.onkeydown = e => { if (e.key === 'Enter') submit(); };
    $app.querySelectorAll('[data-ch]').forEach(b => b.onclick = () => {
      const p = inp.selectionStart ?? inp.value.length;
      inp.value = inp.value.slice(0, p) + b.dataset.ch + inp.value.slice(inp.selectionEnd ?? p);
      inp.focus();
      inp.setSelectionRange(p + 1, p + 1);
    });
    if (ex.kind === 'type') setTimeout(() => inp.focus(), 50);
  } else if (ex.kind === 'order') {
    const line = document.getElementById('line');
    const check = document.getElementById('check');
    const draw = () => {
      line.innerHTML = L.built.map((ti, k) => `<button class="tile" data-k="${k}">${esc(ex.tiles[ti])}</button>`).join('');
      $app.querySelectorAll('.tiles .tile').forEach(t => t.classList.toggle('used', L.built.includes(+t.dataset.t)));
      check.disabled = L.built.length !== ex.tiles.length;
      line.querySelectorAll('[data-k]').forEach(t => t.onclick = () => { if (L.answered) return; L.built.splice(+t.dataset.k, 1); draw(); });
    };
    $app.querySelectorAll('.tiles .tile').forEach(t => t.onclick = () => {
      if (L.answered || L.built.includes(+t.dataset.t)) return;
      L.built.push(+t.dataset.t); draw();
    });
    check.onclick = () => {
      if (L.answered) return;
      const got = L.built.map(i => ex.tiles[i]).join(' ');
      grade(norm(got) === norm(ex.answer));
    };
  }
}

function renderResult() {
  const acc = L.done ? Math.round(L.right / L.done * 100) : 0;
  const xp = S.xp - L.startedXp;
  const emoji = acc >= 90 ? '🏆' : acc >= 70 ? '🎉' : acc >= 50 ? '💪' : '📚';
  const back = L.back;
  render(`<div class="result">
    <div class="emoji">${emoji}</div>
    <h1>${acc >= 70 ? 'Урок пройден!' : 'Есть над чем поработать'}</h1>
    <p class="muted">${esc(L.title)}</p>
    <div class="stats3" style="margin:22px 0">
      <div><b>${acc}%</b><span>точность</span></div>
      <div><b>+${xp}</b><span>XP</span></div>
      <div><b>🔥 ${streak()}</b><span>дней подряд</span></div>
    </div>
    <button class="btn" id="cont">Продолжить</button></div>`);
  L = null;
  document.getElementById('cont').onclick = back;
}

function renderSettings() {
  render(`
    <div class="top"><button class="icon-btn" id="back">←</button><h1 style="font-size:22px">Настройки</h1></div>
    <div class="card">
      <label class="row"><span style="flex:1">Озвучивать правильные ответы</span>
        <input type="checkbox" id="voice" ${S.voice ? 'checked' : ''} style="width:24px;height:24px"></label>
      ${esVoices().length ? `<p class="small muted" style="margin-top:12px">Голос</p>
      <select class="input" id="voicesel">${esVoices().map(v => `<option value="${esc(v.voiceURI)}" ${esVoice && v.voiceURI === esVoice.voiceURI ? 'selected' : ''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('')}</select>` : ''}
      <p class="small muted">${hasTTS ? 'Голоса получше скачиваются в iPhone: Настройки → Универсальный доступ → Устный контент → Голоса → Español → выбери голос и скачай версию «Улучшенный» или «Премиум». Потом перезапусти приложение и выбери его здесь.' : 'Озвучка в этом браузере недоступна.'}</p>
      <button class="btn ghost" id="test">🔊 Проверить голос</button>
    </div>
    <h2>Резервная копия</h2>
    <div class="card">
      <p class="small muted">Прогресс хранится на этом телефоне. Скопируй код и сохрани в Заметки — по нему всё восстановится.</p>
      <button class="btn ghost" id="export">Скопировать код прогресса</button>
      <textarea class="input" id="data" placeholder="Сюда вставить код для восстановления" style="margin-top:12px"></textarea>
      <button class="btn ghost" id="import">Восстановить из кода</button>
    </div>
    <h2>Опасно</h2>
    <button class="btn bad" id="reset">Сбросить весь прогресс</button>
    <p class="small muted" style="margin-top:20px">Тем: ${TOPICS.length} · элементов: ${ALL.length}</p>`);
  document.getElementById('back').onclick = renderHome;
  document.getElementById('voice').onchange = e => { S.voice = e.target.checked; save(); };
  const vsel = document.getElementById('voicesel');
  if (vsel) vsel.onchange = () => { S.voiceURI = vsel.value; save(); pickVoice(); speak('Hola, ¿qué tal?'); };
  document.getElementById('test').onclick =() => speak('Hola, ¿qué tal? Vamos a repasar español.');
  document.getElementById('export').onclick = async () => {
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
    document.getElementById('data').value = code;
    try { await navigator.clipboard.writeText(code); alert('Код скопирован'); } catch (e) { alert('Выдели код в поле и скопируй вручную'); }
  };
  document.getElementById('import').onclick = () => {
    try {
      const s = JSON.parse(decodeURIComponent(escape(atob(document.getElementById('data').value.trim()))));
      if (!s.items) throw 0;
      S = Object.assign({ days: {}, xp: 0, voice: true }, s); save(); alert('Прогресс восстановлен'); renderHome();
    } catch (e) { alert('Код не подходит'); }
  };
  document.getElementById('reset').onclick = () => {
    if (confirm('Точно стереть весь прогресс?')) { S = { items: {}, days: {}, xp: 0, voice: S.voice }; save(); renderHome(); }
  };
}

renderHome();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
