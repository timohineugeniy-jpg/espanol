// Движок спряжений: из инфинитива строит все времена.
// Нужен, чтобы варианты ответа были формами ТОГО ЖЕ глагола (tuve / tenía / tendría / tuviera),
// а не другими словами — иначе правильный ответ узнаётся по корню без знания времени.
// Формы неправильных глаголов сверены с Викисловарём (tools/check_conj.py).
window.CONJ = (() => {
  const ACC = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' };
  const E = {
    pres: { ar: ['o', 'as', 'a', 'amos', 'áis', 'an'], er: ['o', 'es', 'e', 'emos', 'éis', 'en'], ir: ['o', 'es', 'e', 'imos', 'ís', 'en'] },
    ind: { ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'], er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'] },
    imp: { ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'], er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'] },
    subj: { ar: ['e', 'es', 'e', 'emos', 'éis', 'en'], er: ['a', 'as', 'a', 'amos', 'áis', 'an'] },
    fut: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
    cond: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
  };
  const BOOT = [0, 1, 2, 5]; // лица, где меняется корень (e→ie, o→ue)
  const w = s => s.split(' ');

  const IRR = {
    ser: { pres: w('soy eres es somos sois son'), ind: w('fui fuiste fue fuimos fuisteis fueron'), imp: w('era eras era éramos erais eran'), subj: w('sea seas sea seamos seáis sean') },
    ir: { pres: w('voy vas va vamos vais van'), ind: w('fui fuiste fue fuimos fuisteis fueron'), imp: w('iba ibas iba íbamos ibais iban'), subj: w('vaya vayas vaya vayamos vayáis vayan'), ger: 'yendo' },
    estar: { pres: w('estoy estás está estamos estáis están'), indStem: 'estuv', subj: w('esté estés esté estemos estéis estén') },
    haber: { pres: w('he has ha hemos habéis han'), indStem: 'hub', fut: 'habr', subj: w('haya hayas haya hayamos hayáis hayan') },
    dar: { pres: w('doy das da damos dais dan'), ind: w('di diste dio dimos disteis dieron'), subj: w('dé des dé demos deis den') },
    ver: { pres: w('veo ves ve vemos veis ven'), imp: w('veía veías veía veíamos veíais veían'), ind: w('vi viste vio vimos visteis vieron'), part: 'visto' },
    tener: { yo: 'tengo', sc: 'ie', indStem: 'tuv', fut: 'tendr' },
    hacer: { yo: 'hago', indStem: 'hic', ind3: 'hizo', fut: 'har', part: 'hecho' },
    decir: { yo: 'digo', sc: 'i', indStem: 'dij', fut: 'dir', part: 'dicho', ger: 'diciendo' },
    venir: { yo: 'vengo', sc: 'ie', indStem: 'vin', fut: 'vendr', ger: 'viniendo' },
    poner: { yo: 'pongo', indStem: 'pus', fut: 'pondr', part: 'puesto' },
    salir: { yo: 'salgo', fut: 'saldr' },
    valer: { yo: 'valgo', fut: 'valdr' },
    poder: { sc: 'ue', indStem: 'pud', fut: 'podr', ger: 'pudiendo' },
    querer: { sc: 'ie', indStem: 'quis', fut: 'querr' },
    saber: { yo: 'sé', indStem: 'sup', fut: 'sabr', subjStem: 'sep' },
    traer: { yo: 'traigo', indStem: 'traj', part: 'traído', ger: 'trayendo' },
    conducir: { yo: 'conduzco', indStem: 'conduj' },
    leer: { y: 1, part: 'leído' },
    creer: { y: 1, part: 'creído' },
    escribir: { part: 'escrito' },
    abrir: { part: 'abierto' },
    descubrir: { part: 'descubierto' },
    romper: { part: 'roto' },
    volver: { sc: 'ue', part: 'vuelto' },
    morir: { sc: 'ue', part: 'muerto' },
    dormir: { sc: 'ue' },
    pedir: { sc: 'i' }, repetir: { sc: 'i' }, vestir: { sc: 'i' }, servir: { sc: 'i' },
    sentir: { sc: 'ie' }, preferir: { sc: 'ie' },
    pensar: { sc: 'ie' }, cerrar: { sc: 'ie' }, empezar: { sc: 'ie' }, entender: { sc: 'ie' },
    perder: { sc: 'ie' }, despertar: { sc: 'ie' }, recomendar: { sc: 'ie' },
    contar: { sc: 'ue' }, costar: { sc: 'ue' }, encontrar: { sc: 'ue' }, recordar: { sc: 'ue' },
    acostar: { sc: 'ue' }, soler: { sc: 'ue' }, llover: { sc: 'ue' }, jugar: { sc: 'ue' },
    probar: { sc: 'ue' }, aprobar: { sc: 'ue' },
    conocer: { yo: 'conozco' }, parecer: { yo: 'parezco' }, ofrecer: { yo: 'ofrezco' }, crecer: { yo: 'crezco' },
    coger: { yo: 'cojo' },
  };

  // e→ie / o→ue / e→i (u→ue у jugar) — в последнем слоге корня
  function strong(stem, sc) {
    if (sc === 'ie') return stem.replace(/e([^e]*)$/, 'ie$1');
    if (sc === 'i') return stem.replace(/e([^e]*)$/, 'i$1');
    if (sc === 'ue') return /o[^o]*$/.test(stem) ? stem.replace(/o([^o]*)$/, 'ue$1') : stem.replace(/u([^u]*)$/, 'ue$1');
    return stem;
  }
  // слабое изменение у глаголов на -ir: pidió, sintió, durmió, pidamos, durmamos
  function weak(stem, sc) {
    if (!sc) return stem;
    if (sc === 'ue') return stem.replace(/o([^o]*)$/, 'u$1');
    return stem.replace(/e([^e]*)$/, 'i$1');
  }
  // перед e: busc→busqu, lleg→llegu, empiez→empiec
  const beforeE = s => s.replace(/c$/, 'qu').replace(/g$/, 'gu').replace(/z$/, 'c');
  // перед a/o: cog→coj у -ger/-gir
  const accLast = s => s.replace(/[aeiou](?=[^aeiou]*$)/, m => ACC[m]);

  const cache = {};
  function table(inf) {
    inf = inf.replace(/se$/, '');
    if (cache[inf]) return cache[inf];
    const m = inf.match(/^(.*)(ar|er|ir|ír)$/);
    if (!m) return null;
    const base = m[1], cls = m[2] === 'ar' ? 'ar' : m[2] === 'er' ? 'er' : 'ir';
    const ec = cls === 'ar' ? 'ar' : 'er';
    const x = IRR[inf] || {};
    const sc = x.sc;
    const t = {};

    t.pres = x.pres || [0, 1, 2, 3, 4, 5].map(p => (BOOT.includes(p) ? strong(base, sc) : base) + E.pres[cls][p]);
    if (x.yo) t.pres[0] = x.yo;

    if (x.subj) t.subj = x.subj;
    else if (x.subjStem || x.yo || x.pres) {
      // ver: veo → vea (без этого выходило «va»)
      const st = x.subjStem || t.pres[0].replace(/o$/, '');
      t.subj = E.subj[ec].map(e => st + e);
    } else {
      t.subj = [0, 1, 2, 3, 4, 5].map(p => {
        let st = BOOT.includes(p) ? strong(base, sc) : (cls === 'ir' ? weak(base, sc) : base);
        if (cls === 'ar') st = beforeE(st);
        return st + E.subj[ec][p];
      });
    }

    if (x.ind) t.ind = x.ind;
    else if (x.indStem) {
      const s = x.indStem;
      t.ind = [s + 'e', s + 'iste', s + 'o', s + 'imos', s + 'isteis', s + (s.endsWith('j') ? 'eron' : 'ieron')];
      if (x.ind3) t.ind[2] = x.ind3;
    } else if (x.y) {
      t.ind = [base + 'í', base + 'íste', base + 'yó', base + 'ímos', base + 'ísteis', base + 'yeron'];
    } else if (cls === 'ar') {
      t.ind = E.ind.ar.map((e, p) => (p === 0 ? beforeE(base) : base) + e);
    } else {
      t.ind = E.ind.er.map((e, p) => ((p === 2 || p === 5) && cls === 'ir' ? weak(base, sc) : base) + e);
    }

    t.imp = x.imp || E.imp[ec].map(e => base + e);
    const fs = x.fut || inf.replace('ír', 'ir');
    t.fut = E.fut.map(e => fs + e);
    t.cond = E.cond.map(e => fs + e);
    const is = t.ind[5].replace(/ron$/, '');
    t.impsubj = ['ra', 'ras', 'ra', 'ramos', 'rais', 'ran'].map((e, p) => (p === 3 ? accLast(is) : is) + e);
    t.part = x.part || base + (cls === 'ar' ? 'ado' : 'ido');
    t.ger = x.ger || (cls === 'ar' ? base + 'ando'
      : /[aeiou]$/.test(base) ? base + 'yendo'
      : (cls === 'ir' ? weak(base, sc) : base) + 'iendo');
    t.inf = inf;
    cache[inf] = t; // до сборки составных: haber/estar/ir ссылаются сами на себя
    const hb = table('haber');
    const P6 = [0, 1, 2, 3, 4, 5];
    t.perf = P6.map(p => `${hb.pres[p]} ${t.part}`);
    t.plusc = P6.map(p => `${hb.imp[p]} ${t.part}`);
    t.futperf = P6.map(p => `${hb.fut[p]} ${t.part}`);
    t.condperf = P6.map(p => `${hb.cond[p]} ${t.part}`);
    t.subjperf = P6.map(p => `${hb.subj[p]} ${t.part}`);
    t.plusubj = P6.map(p => `${hb.impsubj[p]} ${t.part}`);
    t.prog = P6.map(p => `${table('estar').pres[p]} ${t.ger}`);
    t.ira = P6.map(p => `${table('ir').pres[p]} a ${inf}`);
    return t;
  }

  const TENSES = ['pres', 'prog', 'perf', 'ind', 'imp', 'plusc', 'ira', 'fut', 'futperf', 'cond', 'condperf', 'subj', 'subjperf', 'impsubj', 'plusubj'];
  const NAMES = {
    pres: 'Presente', prog: 'estar + gerundio', perf: 'Pretérito Perfecto', ind: 'Indefinido', imp: 'Imperfecto',
    plusc: 'Pluscuamperfecto', ira: 'ir a + infinitivo', fut: 'Futuro', futperf: 'Futuro Perfecto', cond: 'Condicional',
    condperf: 'Condicional Compuesto', subj: 'Subjuntivo', subjperf: 'Perfecto de Subjuntivo', impsubj: 'Imperfecto de Subjuntivo',
    plusubj: 'Pluscuamperf. de Subjuntivo',
  };
  // близкие времена путают чаще всего — их и подсовываем
  const FAMILY = {
    pres: ['subj', 'ind', 'prog', 'fut'], prog: ['pres', 'imp', 'perf'], perf: ['ind', 'plusc', 'subjperf', 'pres'],
    ind: ['imp', 'perf', 'impsubj', 'pres'], imp: ['ind', 'cond', 'impsubj', 'plusc'], plusc: ['perf', 'plusubj', 'condperf', 'ind'],
    ira: ['fut', 'pres'], fut: ['cond', 'pres', 'subj', 'ira'], futperf: ['condperf', 'perf', 'fut'], cond: ['fut', 'imp', 'impsubj'],
    condperf: ['plusubj', 'futperf', 'plusc'], subj: ['pres', 'impsubj', 'fut', 'subjperf'], subjperf: ['perf', 'plusubj', 'subj'],
    impsubj: ['subj', 'ind', 'cond', 'imp'], plusubj: ['condperf', 'plusc', 'impsubj', 'subjperf'],
  };

  const low = s => s.toLowerCase().trim();
  function find(inf, form) {
    const t = table(inf);
    if (!t) return [];
    const f = low(form), hits = [];
    TENSES.forEach(T => t[T].forEach((v, p) => { if (low(v) === f) hits.push([T, p]); }));
    return hits;
  }

  // Неправильный ответ того же глагола: 2 — то же лицо в соседних временах, 1 — то же время в другом лице.
  function distractors(inf, form) {
    const t = table(inf);
    if (!t) return [];
    const f = low(form);
    const out = [];
    const add = v => { if (v && low(v) !== f && !out.some(o => low(o) === low(v))) out.push(v); };
    const hits = find(inf, form);
    if (!hits.length) {
      if (f === low(t.part)) {
        // причастие: правильно-образованная подделка (hacido, escribido) + похожие формы
        const m = inf.match(/^(.*)(ar|er|ir)$/);
        if (m) add(m[1] + (m[2] === 'ar' ? 'ado' : 'ido'));
        [t.ger, t.ind[2], t.ind[0], t.inf].forEach(add);
      } else if (f === low(t.ger)) {
        [t.part, t.pres[0], t.ind[2], t.inf].forEach(add);
      } else if (f === low(t.inf)) {
        [t.ger, t.part, t.pres[0]].forEach(add);
      }
      return out.slice(0, 3);
    }
    const [T, P] = hits[Math.random() * hits.length | 0];
    const fam = FAMILY[T].slice().sort(() => Math.random() - .5);
    fam.forEach(x => add(t[x][P]));
    const near = out.slice(0, 2);
    out.length = 0; near.forEach(add);
    const others = [0, 1, 2, 3, 4, 5].filter(p => p !== P).sort(() => Math.random() - .5);
    for (const p of others) { const before = out.length; add(t[T][p]); if (out.length > before) break; }
    // «estamos habiendo», «voy a haber» — формы-уродцы, в варианты не берём
    TENSES.filter(x => x !== 'prog' && x !== 'ira').sort(() => Math.random() - .5).forEach(x => out.length < 3 && add(t[x][P]));
    return out.slice(0, 3);
  }

  return { table, find, distractors, TENSES, NAMES, IRR };
})();
