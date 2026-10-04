// Грамматические темы из тетради.
// conj — спряжения (6 форм: yo, tú, él, nosotros, vosotros, ellos);
// drills — "вопрос|ответ"; sents — "фраза с [пропуском]|перевод";
// quiz — первый вариант в o всегда правильный, перемешивается при показе.
window.TOPICS = window.TOPICS || [];
window.TOPICS.push(

{ id: 'g_presente', group: 'grammar', icon: '🟢', title: 'Presente — теперішній час',
notes: `
<p>Закінчення:<br><b>-AR</b>: o, as, a, amos, áis, an<br><b>-ER</b>: o, es, e, emos, éis, en<br><b>-IR</b>: o, es, e, imos, ís, en</p>
<p>Неправильні: <b>ser</b> soy, <b>estar</b> estoy, <b>ir</b> voy, <b>hacer</b> hago, <b>tener</b> tengo, <b>venir</b> vengo, <b>decir</b> digo, <b>saber</b> sé, <b>dar</b> doy, <b>ver</b> veo, <b>salir</b> salgo.</p>
<p>Presente також для запланованого найближчого майбутнього: <i>Mañana voy al cine. Esta noche cenamos fuera.</i> Маркери: mañana, esta noche, el lunes, luego.</p>
<p class="warn">У тетраді «decir → yo dijo» — це помилка. Правильно <b>digo</b> (dijo = він сказав, Indefinido).</p>
<p><b>Доповнення — дієслова зі зміною кореня</b> (змінюється в усіх особах, крім nosotros і vosotros):<br>
e → ie: querer — quiero, pensar — pienso, empezar — empiezo, entender — entiendo, preferir — prefiero<br>
o → ue: poder — puedo, volver — vuelvo, dormir — duermo, contar — cuento; jugar — juego<br>
e → i: pedir — pido, repetir — repito, decir — digo/dices<br>
-cer → -zco: conocer — conozco, parecer — parezco, ofrecer — ofrezco</p>
<p><b>Hace + час + que + presente</b> — дія триває досі: <i>Hace dos años que vivo aquí.</i></p>`,
conj: [{ t: 'Presente', v: `
hablar: hablo, hablas, habla, hablamos, habláis, hablan
comer: como, comes, come, comemos, coméis, comen
vivir: vivo, vives, vive, vivimos, vivís, viven
trabajar: trabajo, trabajas, trabaja, trabajamos, trabajáis, trabajan
ser: soy, eres, es, somos, sois, son
estar: estoy, estás, está, estamos, estáis, están
tener: tengo, tienes, tiene, tenemos, tenéis, tienen
hacer: hago, haces, hace, hacemos, hacéis, hacen
ir: voy, vas, va, vamos, vais, van
venir: vengo, vienes, viene, venimos, venís, vienen
ver: veo, ves, ve, vemos, veis, ven
dar: doy, das, da, damos, dais, dan
decir: digo, dices, dice, decimos, decís, dicen
saber: sé, sabes, sabe, sabemos, sabéis, saben
poder: puedo, puedes, puede, podemos, podéis, pueden
querer: quiero, quieres, quiere, queremos, queréis, quieren
salir: salgo, sales, sale, salimos, salís, salen` }],
sents: `
Yo [hablo] español con mis amigos.|Я розмовляю іспанською з друзями.
Nosotros [vivimos] en Madrid.|Ми живемо в Мадриді.
¿De dónde [eres]?|Звідки ти?
Mañana [voy] al cine.|Завтра я йду в кіно.
Esta noche [cenamos] fuera.|Сьогодні ввечері ми вечеряємо не вдома.
No [sé] la respuesta.|Я не знаю відповіді.
Ellos [vienen] a las cinco.|Вони приходять о п'ятій.
¿Qué [haces] el fin de semana?|Що ти робиш на вихідних?
Normalmente [salgo] de casa a las ocho.|Зазвичай я виходжу з дому о восьмій.
Siempre te [digo] la verdad.|Я завжди кажу тобі правду.
Hace dos años que [vivo] aquí.|Я живу тут уже два роки.
¿A qué hora [empieza=empezar] la clase?|О котрій починається урок?
[Prefiero=preferir] el té al café.|Я віддаю перевагу чаю, а не каві.
No [entiendo=entender] esta palabra.|Я не розумію цього слова.
Mi hijo [duerme=dormir] ocho horas.|Мій син спить вісім годин.
[Conozco=conocer] a tu hermano.|Я знайомий з твоїм братом.
¿[Puedes=poder] ayudarme?|Можеш мені допомогти?
Los domingos [juego=jugar] al fútbol.|По неділях я граю у футбол.`,
quiz: [
 { q: 'Закінчення «nosotros» у дієсловах на -IR (vivir):', o: ['-imos', '-emos', '-amos', '-ís'] },
 { q: 'decir, yo → ?', o: ['digo', 'dijo', 'dico', 'dije'], e: 'dijo — «він сказав» (Indefinido), dije — «я сказав».' },
 { q: 'ser, tú → ?', o: ['eres', 'es', 'estás', 'sois'] },
 { q: '«Esta noche cenamos fuera» — про який час?', o: ['найближче заплановане майбутнє', 'минуле', 'звичку в минулому', 'умову'] }
]},

{ id: 'g_perfecto', group: 'grammar', icon: '🔵', title: 'Pretérito Perfecto — he hablado',
notes: `
<p><b>haber</b> (he, has, ha, hemos, habéis, han) + <b>participio</b>.<br>-AR → <b>-ado</b> (hablado), -ER/-IR → <b>-ido</b> (comido, vivido).</p>
<p>Коли: період ще не скінчився або результат важливий зараз. Маркери: <i>hoy, esta semana, este mes, este año, ya, todavía no, nunca, alguna vez</i>.</p>
<p>Неправильні participio: escribir → <b>escrito</b>, abrir → <b>abierto</b>, decir → <b>dicho</b>, hacer → <b>hecho</b>, ver → <b>visto</b>, volver → <b>vuelto</b>, poner → <b>puesto</b>, romper → <b>roto</b>, morir → <b>muerto</b>. Наголос: leer → leído, traer → traído.</p>
<p><i>He comido. Ya he terminado.</i></p>`,
conj: [{ t: 'haber (Presente)', v: `haber: he, has, ha, hemos, habéis, han` }],
drills: [{ t: 'Participio', v: `
hablar|hablado
comer|comido
vivir|vivido
trabajar|trabajado
estudiar|estudiado
cerrar|cerrado
beber|bebido
leer|leído
escribir|escrito
abrir|abierto
decir|dicho
hacer|hecho
ver|visto
volver|vuelto
poner|puesto
romper|roto
morir|muerto
ser|sido
ir|ido
traer|traído` }],
sents: `
Hoy [he comido] pizza.|Сьогодні я їв піцу.
Ya [he terminado] el trabajo.|Я вже закінчив роботу.
Esta semana [hemos trabajado] mucho.|Цього тижня ми багато працювали.
¿[Has estado] alguna vez en España?|Ти коли-небудь був в Іспанії?
Nunca [he estado] en Japón.|Я ніколи не був у Японії.
Todavía no [he visto] esa película.|Я ще не бачив цей фільм.
¿Quién [ha abierto] la ventana?|Хто відчинив вікно?
Ella me [ha dicho] la verdad.|Вона сказала мені правду.
Este año [hemos viajado] mucho.|Цього року ми багато подорожували.
¿Qué [has hecho] hoy?|Що ти сьогодні робив?
¿Dónde [has puesto=poner] mis gafas?|Куди ти поклав мої окуляри?
Ya [hemos vuelto=volver] de vacaciones.|Ми вже повернулися з відпустки.
Este mes no [he escrito=escribir] a mis padres.|Цього місяця я не писав батькам.`,
quiz: [
 { q: 'Який маркер вимагає Pretérito Perfecto?', o: ['esta semana', 'ayer', 'el año pasado', 'en 2023'], e: 'Perfecto — коли період (цей тиждень) ще не скінчився.' },
 { q: 'Participio від «hacer»:', o: ['hecho', 'hacido', 'hizo', 'haciendo'] },
 { q: 'Participio від «volver»:', o: ['vuelto', 'volvido', 'volvió', 'vuelvo'] },
 { q: 'nosotros + haber → ?', o: ['hemos', 'habemos', 'han', 'habéis'] }
]},

{ id: 'g_indefinido', group: 'grammar', icon: '🟣', title: 'Pretérito Indefinido — hablé',
notes: `
<p>Завершена дія в минулому.</p>
<p><b>-AR</b>: é, aste, ó, amos, asteis, aron<br><b>-ER/-IR</b>: í, iste, ió, imos, isteis, ieron</p>
<p>Маркери: <i>ayer, anoche, el lunes, hace dos días, el año pasado, en 2023</i>.</p>
<p>Неправильні: <b>ser/ir</b> — fui, fuiste, fue, fuimos, fuisteis, fueron (однакові!); tener — tuve; estar — estuve; hacer — hice (él hizo); dar — di; poder — pude; poner — puse; saber — supe; querer — quise; venir — vine; decir — dije; traer — traje; conducir — conduje.</p>
<p><i>Ayer comí pizza. Fui al cine. Compré un coche.</i></p>`,
conj: [{ t: 'Indefinido', v: `
hablar: hablé, hablaste, habló, hablamos, hablasteis, hablaron
comer: comí, comiste, comió, comimos, comisteis, comieron
vivir: viví, viviste, vivió, vivimos, vivisteis, vivieron
ser / ir: fui, fuiste, fue, fuimos, fuisteis, fueron
tener: tuve, tuviste, tuvo, tuvimos, tuvisteis, tuvieron
estar: estuve, estuviste, estuvo, estuvimos, estuvisteis, estuvieron
hacer: hice, hiciste, hizo, hicimos, hicisteis, hicieron
dar: di, diste, dio, dimos, disteis, dieron
poder: pude, pudiste, pudo, pudimos, pudisteis, pudieron
poner: puse, pusiste, puso, pusimos, pusisteis, pusieron
saber: supe, supiste, supo, supimos, supisteis, supieron
querer: quise, quisiste, quiso, quisimos, quisisteis, quisieron
venir: vine, viniste, vino, vinimos, vinisteis, vinieron
decir: dije, dijiste, dijo, dijimos, dijisteis, dijeron
traer: traje, trajiste, trajo, trajimos, trajisteis, trajeron
conducir: conduje, condujiste, condujo, condujimos, condujisteis, condujeron` }],
sents: `
Ayer [compré] un libro.|Вчора я купив книгу.
Ayer [comí] pizza.|Вчора я їв піцу.
El sábado [fui=ir] al cine.|У суботу я ходив у кіно.
El año pasado [compré] un coche.|Минулого року я купив машину.
En 2024 [viajé] a España.|У 2024 я їздив до Іспанії.
[Viví] en Madrid durante dos años.|Я жив у Мадриді два роки.
Anoche [tuvimos] una cena con amigos.|Учора ввечері ми вечеряли з друзями.
¿Qué [hiciste] el fin de semana?|Що ти робив на вихідних?
Ella no [pudo] venir.|Вона не змогла прийти.
De repente [empezó] a llover.|Раптом почався дощ.
Cuando [llegué=llegar] a casa, empezó a llover.|Коли я прийшов додому, почався дощ.
¿Por qué no me lo [dijiste=decir]?|Чому ти мені цього не сказав?
Ellos [trajeron=traer] vino a la fiesta.|Вони принесли вино на вечірку.
El año pasado [empecé=empezar] a estudiar español.|Минулого року я почав вчити іспанську.
Mi abuelo [murió=morir] en 2010.|Мій дідусь помер у 2010 році.
¿Dónde [pusiste=poner] las llaves?|Куди ти поклав ключі?`,
quiz: [
 { q: 'Який маркер — для Indefinido?', o: ['ayer', 'siempre', 'mientras', 'normalmente'] },
 { q: 'hacer, él → ?', o: ['hizo', 'hació', 'hice', 'hacía'] },
 { q: '«Fui» може означати…', o: ['я був / я ходив (ser і ir)', 'тільки «я ходив»', 'я буду', 'я був би'], e: 'Ser та ir в Indefinido мають однакові форми.' },
 { q: 'tener, yo → ?', o: ['tuve', 'tení', 'tenía', 'tuvo'] }
]},

{ id: 'g_imperfecto', group: 'grammar', icon: '🟤', title: 'Pretérito Imperfecto — hablaba',
notes: `
<p>Як було, що відбувалося, звички в минулому, фон.</p>
<p><b>-AR</b>: aba, abas, aba, ábamos, abais, aban<br><b>-ER/-IR</b>: ía, ías, ía, íamos, íais, ían</p>
<p>Неправильні лише три: <b>ser</b> — era; <b>ir</b> — iba; <b>ver</b> — veía.</p>
<p>Маркери: <i>siempre, antes, cuando era niño, cada día, normalmente, mientras</i>.</p>
<p><b>Imperfecto vs Indefinido</b>: <i>Yo estudiaba</i> (фон, процес) <i>cuando llamaste</i> (подія).</p>
<p><b>Доповнення — як обрати:</b><br>
Imperfecto: опис (<i>La casa era grande</i>), вік і час (<i>Tenía 20 años. Eran las tres</i>), звичка (<i>Siempre íbamos a la playa</i>), фон, процес (<i>Mientras esperaba…</i>).<br>
Indefinido: завершена подія (<i>Ayer compré…</i>), послідовність подій (<i>Llegué, cené y me acosté</i>), подія, що перервала фон (<i>…cuando sonó el teléfono</i>), дія з точною тривалістю (<i>Viví dos años en Madrid</i>).</p>`,
conj: [{ t: 'Imperfecto', v: `
hablar: hablaba, hablabas, hablaba, hablábamos, hablabais, hablaban
comer: comía, comías, comía, comíamos, comíais, comían
vivir: vivía, vivías, vivía, vivíamos, vivíais, vivían
ser: era, eras, era, éramos, erais, eran
ir: iba, ibas, iba, íbamos, ibais, iban
ver: veía, veías, veía, veíamos, veíais, veían
tener: tenía, tenías, tenía, teníamos, teníais, tenían` }],
sents: `
Cuando era niño [jugaba] al fútbol.|Коли я був дитиною, я грав у футбол.
La casa [era] grande.|Будинок був великий.
Yo [estudiaba] cuando llamaste.|Я вчився, коли ти подзвонив.
[Tenía] 20 años.|Мені було 20 років.
[Eran] las tres.|Була третя година.
[Hacía] frío.|Було холодно.
Mi abuelo [fumaba].|Мій дідусь курив.
[Vivíamos] cerca del mar.|Ми жили біля моря.
Antes siempre [íbamos] a la playa.|Раніше ми завжди ходили на пляж.
Mientras [esperaba=esperar] el autobús, leía el periódico.|Поки я чекав на автобус, я читав газету.
[Estaba=estar] en la ducha cuando sonó el teléfono.|Я був у душі, коли задзвонив телефон.
De pequeños [veíamos=ver] dibujos todas las mañanas.|У дитинстві ми щоранку дивилися мультики.
Mi abuela siempre nos [contaba=contar] historias.|Бабуся завжди розповідала нам історії.
Antes no me [gustaba=gustar] el café.|Раніше я не любив каву.`,
quiz: [
 { q: 'Yo ___ cuando llamaste.', o: ['estudiaba', 'estudié', 'estudiaré', 'estudio'], e: 'Процес-фон → Imperfecto, подія, що його перервала → Indefinido.' },
 { q: 'ser, nosotros (Imperfecto):', o: ['éramos', 'fuimos', 'seríamos', 'somos'] },
 { q: 'Маркер Imperfecto:', o: ['cuando era niño', 'ayer', 'anoche', 'hace dos días'] },
 { q: 'ir, yo (Imperfecto):', o: ['iba', 'fui', 'ía', 'voy'] }
]},

{ id: 'g_plusc', group: 'grammar', icon: '⏪', title: 'Pluscuamperfecto — había hablado',
notes: `
<p>Дія в минулому, що сталася <b>перед</b> іншою минулою подією.</p>
<p><b>había, habías, había, habíamos, habíais, habían</b> + participio</p>
<p><i>Cuando llegué, la película ya había empezado.</i></p>`,
conj: [{ t: 'haber (Imperfecto)', v: `haber: había, habías, había, habíamos, habíais, habían` }],
sents: `
Cuando llegué, la película ya [había empezado].|Коли я прийшов, фільм уже почався.
Nunca [había visto] el mar antes.|Я ніколи раніше не бачив моря.
Cuando llegamos, ellos ya [habían comido].|Коли ми прийшли, вони вже поїли.
Me dijo que [había ido] al médico.|Він сказав, що ходив до лікаря.
Ella [había tenido] un día difícil.|У неї був важкий день (до того).
Nunca antes [había probado=probar] la paella.|Я ніколи раніше не куштував паельї.
Cuando llegó la policía, el ladrón ya [había escapado=escapar].|Коли приїхала поліція, злодій уже втік.
No sabía que [habías vuelto=volver].|Я не знав, що ти повернувся.`,
quiz: [
 { q: 'Pluscuamperfecto описує…', o: ['дію, що була перед іншою минулою', 'звичку в минулому', 'майбутню дію', 'дію зараз'] },
 { q: 'ellos + haber (Imperfecto):', o: ['habían', 'habrán', 'han', 'hubieron'] }
]},

{ id: 'g_futuro', group: 'grammar', icon: '🔮', title: 'Майбутнє: ir a + inf. і Futuro Simple',
notes: `
<p><b>1. ir a + infinitivo</b> — план, намір, «ось-ось»: <i>Voy a estudiar. ¡Va a llover!</i></p>
<p><b>2. Futuro Simple</b> — infinitivo + <b>é, ás, á, emos, éis, án</b>: comeré, viviré.<br>Вживання: формальне/далеке майбутнє (<i>Estudiaré medicina</i>), обіцянки (<i>Te llamaré mañana</i>), припущення (<i>Será Juan</i> — це, мабуть, Хуан; <i>Tendrá 20 años</i>).</p>
<p><b>3. Presente</b> — вже заплановане найближче: <i>Mañana estudio.</i></p>
<p>Неправильні основи: tener → <b>tendr</b>, poner → <b>pondr</b>, salir → <b>saldr</b>, venir → <b>vendr</b>, decir → <b>dir</b>, hacer → <b>har</b>, poder → <b>podr</b>, querer → <b>querr</b>, saber → <b>sabr</b>, haber → <b>habr</b>, valer → <b>valdr</b>. Ser, ir — правильні (seré, iré).</p>`,
conj: [{ t: 'Futuro', v: `
hablar: hablaré, hablarás, hablará, hablaremos, hablaréis, hablarán
comer: comeré, comerás, comerá, comeremos, comeréis, comerán
vivir: viviré, vivirás, vivirá, viviremos, viviréis, vivirán
tener: tendré, tendrás, tendrá, tendremos, tendréis, tendrán
poner: pondré, pondrás, pondrá, pondremos, pondréis, pondrán
salir: saldré, saldrás, saldrá, saldremos, saldréis, saldrán
venir: vendré, vendrás, vendrá, vendremos, vendréis, vendrán
decir: diré, dirás, dirá, diremos, diréis, dirán
hacer: haré, harás, hará, haremos, haréis, harán
poder: podré, podrás, podrá, podremos, podréis, podrán
querer: querré, querrás, querrá, querremos, querréis, querrán
saber: sabré, sabrás, sabrá, sabremos, sabréis, sabrán
ir: iré, irás, irá, iremos, iréis, irán` }],
sents: `
[Voy a estudiar] esta tarde.|Я збираюся вчитися сьогодні ввечері.
[Vamos a salir] ahora.|Ми зараз виходимо.
¿[Vas a venir] a la fiesta?|Ти прийдеш на вечірку?
¡[Va a llover]!|Зараз піде дощ!
[Estudiaré] medicina.|Я вивчатиму медицину.
Te [llamaré] mañana.|Я подзвоню тобі завтра.
[Será] Juan.|Це, мабуть, Хуан.
[Tendrá] 20 años.|Йому, мабуть, 20 років.
Mañana [trabajaré].|Завтра я працюватиму.
[Viviremos] en España.|Ми житимемо в Іспанії.
[Saldremos=salir] a las siete.|Ми вийдемо о сьомій.
¿[Podrás=poder] venir el sábado?|Ти зможеш прийти в суботу?
No sé dónde está Ana; [estará=estar] en casa.|Не знаю, де Ана; мабуть, удома.
¿Qué hora es? — No sé, [serán=ser] las diez.|Котра година? — Не знаю, мабуть, десята.
Mañana [hará=hacer] buen tiempo.|Завтра буде гарна погода.`,
quiz: [
 { q: 'Що виражає «Tendrá 20 años»?', o: ['припущення', 'план', 'минуле', 'умову'] },
 { q: 'Основа Futuro від «tener»:', o: ['tendr-', 'tener-', 'tuv-', 'teng-'] },
 { q: '«ir a + infinitivo» — це…', o: ['намір, план', 'припущення', 'минуле', 'ввічливе прохання'] },
 { q: 'hacer, yo (Futuro):', o: ['haré', 'haceré', 'hice', 'haría'] }
]},

{ id: 'g_futperf', group: 'grammar', icon: '🏁', title: 'Futuro Perfecto — habré hablado',
notes: `
<p><b>habré, habrás, habrá, habremos, habréis, habrán</b> + participio</p>
<p>Дія, яка завершиться до певного моменту в майбутньому: <i>A las ocho ya habré terminado.</i></p>
<p>Також припущення про минуле: <i>No contesta, habrá salido</i> — мабуть, вийшов.</p>`,
conj: [{ t: 'haber (Futuro)', v: `haber: habré, habrás, habrá, habremos, habréis, habrán` }],
sents: `
A las ocho ya [habré terminado].|О восьмій я вже закінчу.
Para el lunes [habremos llegado].|До понеділка ми вже приїдемо.
En 2030 [habré aprendido] español.|До 2030 я вже вивчу іспанську.
No contesta, [habrá salido].|Не відповідає — мабуть, вийшов.`,
quiz: [
 { q: '«Habré terminado» означає…', o: ['я вже закінчу (до моменту)', 'я закінчив би', 'я закінчив', 'я закінчую'] }
]},

{ id: 'g_cond', group: 'grammar', icon: '🤔', title: 'Condicional — hablaría / habría hablado',
notes: `
<p><b>Condicional Simple</b> — «зробив би»: infinitivo + <b>ía, ías, ía, íamos, íais, ían</b>.<br>Ті самі неправильні основи, що й у Futuro: tendría, haría, diría, podría, saldría, vendría, pondría, querría, sabría.</p>
<p><i>Me gustaría viajar. Sería perfecto. Si tuviera dinero, viajaría más.</i></p>
<p><b>Condicional Compuesto</b> — «зробив би в минулому, але не зробив»: <b>habría, habrías, habría, habríamos, habríais, habrían</b> + participio.</p>
<p><i>Si hubiera tenido dinero, habría viajado.</i></p>
<p><b>Доповнення:</b> Condicional ще й для ввічливих прохань (<i>¿Podrías ayudarme?</i>) і порад (<i>Deberías descansar. Yo en tu lugar…</i>).</p>`,
conj: [{ t: 'Condicional', v: `
hablar: hablaría, hablarías, hablaría, hablaríamos, hablaríais, hablarían
tener: tendría, tendrías, tendría, tendríamos, tendríais, tendrían
hacer: haría, harías, haría, haríamos, haríais, harían
ir: iría, irías, iría, iríamos, iríais, irían
poder: podría, podrías, podría, podríamos, podríais, podrían
haber: habría, habrías, habría, habríamos, habríais, habrían` }],
sents: `
Me [gustaría] viajar.|Я б хотів подорожувати.
[Sería] perfecto.|Було б ідеально.
Si tuviera dinero, [viajaría] más.|Якби в мене були гроші, я б більше подорожував.
Yo no [iría] allí.|Я б туди не пішов.
Si hubiera tenido dinero, [habría viajado].|Якби в мене були гроші, я б поїхав.
Si hubiera sabido, no [habría ido].|Якби я знав, я б не пішов.
¿[Podrías] ayudarme?|Ти б міг мені допомогти?
¿Qué [harías=hacer] tú en mi lugar?|А що б ти зробив на моєму місці?
[Deberías=deber] dormir más.|Тобі варто більше спати.
Yo en tu lugar [habría aceptado=aceptar] la oferta.|Я на твоєму місці прийняв би пропозицію.
Con más dinero, [viajaría=viajar] por todo el mundo.|Якби було більше грошей, я б подорожував усім світом.`,
quiz: [
 { q: '«Iría» — це…', o: ['я пішов би', 'я йшов', 'я піду', 'я пішов'] },
 { q: '«Habría ido» — це…', o: ['я пішов би (в минулому)', 'я піду', 'я вже пішов', 'я ходив'] },
 { q: 'tener, yo (Condicional):', o: ['tendría', 'tenería', 'tuviera', 'tendré'] }
]},

{ id: 'g_subj', group: 'grammar', icon: '💭', title: 'Presente de Subjuntivo',
notes: `
<p><b>Факт</b> → Indicativo. <b>Бажання, сумнів, можливість, емоції</b> → Subjuntivo.</p>
<p>Тригери: <i>Quiero que, Espero que, No creo que, Es posible que, Es importante que, Me alegro de que, Ojalá</i>.</p>
<p>Закінчення «навпаки»: -AR → <b>e, es, e, emos, éis, en</b> (hable); -ER/-IR → <b>a, as, a, amos, áis, an</b> (coma, viva).</p>
<p>Неправильні: ser — <b>sea</b>, estar — <b>esté</b>, ir — <b>vaya</b>, tener — <b>tenga</b>, hacer — <b>haga</b>, decir — <b>diga</b>, venir — <b>venga</b>, haber — <b>haya</b>, saber — <b>sepa</b>.</p>
<p><i>Creo que es verdad</i> (факт), але <i>No creo que sea verdad</i> (сумнів).</p>
<p><b>Доповнення — ще випадки Subjuntivo:</b><br>
<b>cuando</b> + майбутнє: <i>Cuando llegues, llámame</i> (але про звичку — Indicativo: <i>Cuando llego, ceno</i>)<br>
<b>para que</b>, <b>antes de que</b>, <b>sin que</b> — завжди: <i>Te lo explico para que lo entiendas</i><br>
<b>aunque</b> про гіпотезу: <i>Aunque llueva, iremos</i> (= навіть якщо піде)<br>
невідомий предмет: <i>Busco a alguien que hable chino</i><br>
побажання: <i>¡Que tengas un buen día!</i><br>
Перехід: головне речення в минулому → Imperfecto de Subjuntivo: <i>Quiero que vengas → Quería que vinieras</i>.</p>`,
conj: [{ t: 'Subjuntivo', v: `
hablar: hable, hables, hable, hablemos, habléis, hablen
comer: coma, comas, coma, comamos, comáis, coman
vivir: viva, vivas, viva, vivamos, viváis, vivan
ser: sea, seas, sea, seamos, seáis, sean
estar: esté, estés, esté, estemos, estéis, estén
ir: vaya, vayas, vaya, vayamos, vayáis, vayan
tener: tenga, tengas, tenga, tengamos, tengáis, tengan
hacer: haga, hagas, haga, hagamos, hagáis, hagan
decir: diga, digas, diga, digamos, digáis, digan
venir: venga, vengas, venga, vengamos, vengáis, vengan
haber: haya, hayas, haya, hayamos, hayáis, hayan
saber: sepa, sepas, sepa, sepamos, sepáis, sepan` }],
sents: `
Quiero que [vengas].|Я хочу, щоб ти прийшов.
Espero que [estés] bien.|Сподіваюся, що в тебе все добре.
No creo que [sea] verdad.|Не думаю, що це правда.
Es posible que [llueva] mañana.|Можливо, завтра піде дощ.
Es importante que [hables] con ella.|Важливо, щоб ти поговорив з нею.
Ojalá [tengamos] suerte.|Хоч би нам пощастило.
Me alegro de que [hayas venido].|Я радий, що ти прийшов.
Espero que los demás me [entiendan].|Сподіваюся, що інші мене зрозуміють.
Cuando [llegues=llegar] a casa, llámame.|Коли прийдеш додому, подзвони мені.
Te lo explico para que lo [entiendas=entender].|Я тобі пояснюю, щоб ти зрозумів.
Antes de que [salgas=salir], cierra la ventana.|Перш ніж вийдеш, зачини вікно.
Aunque [llueva=llover] mañana, iremos a la playa.|Навіть якщо завтра буде дощ, ми підемо на пляж.
Busco a alguien que [hable=hablar] chino.|Шукаю когось, хто розмовляє китайською.
¡Que [tengas=tener] un buen día!|Гарного тобі дня!
Dudo que [sea=ser] tan fácil.|Сумніваюся, що це так просто.
Es necesario que [hagamos=hacer] algo.|Треба, щоб ми щось зробили.`,
quiz: [
 { q: 'Що вимагає Subjuntivo?', o: ['Espero que…', 'Sé que…', 'Creo que…', 'Es verdad que…'] },
 { q: 'Quiero que tú ___ (venir).', o: ['vengas', 'vienes', 'vendrás', 'venir'] },
 { q: 'Creo que ___ verdad.', o: ['es', 'sea', 'fuera', 'esté'], e: '«Creo que» — впевненість → Indicativo. Але «No creo que sea».' },
 { q: 'ir → Subjuntivo (yo):', o: ['vaya', 'voy', 'iba', 'fuera'] }
]},

{ id: 'g_impsubj', group: 'grammar', icon: '🌀', title: 'Imperfecto de Subjuntivo · «Si tuviera…»',
notes: `
<p><b>Imperfecto de Subjuntivo</b>: беремо «ellos» з Indefinido, відкидаємо -ron, додаємо <b>ra, ras, ra, ramos, rais, ran</b>: hablaron → hablara.</p>
<p>tener → <b>tuviera</b>, estar → estuviera, poder → pudiera, poner → pusiera, saber → supiera, querer → quisiera, venir → viniera, hacer → hiciera, decir → dijera, traer → trajera, conducir → condujera, ser/ir → <b>fuera</b>, haber → <b>hubiera</b>.</p>
<p><b>Pluscuamperfecto de Subjuntivo</b>: hubiera, hubieras, hubiera, hubiéramos, hubierais, hubieran + participio.</p>
<p>Умовні речення:<br>нереально зараз — <i>Si tuviera dinero, viajaría.</i><br>нереально в минулому — <i>Si hubiera tenido dinero, habría viajado.</i></p>
<p>Який Subjuntivo брати:<br>зараз / майбутнє → <b>hable</b><br>вже відбулося → <b>haya hablado</b><br>минуле → <b>hablara</b><br>дія перед іншою в минулому → <b>hubiera hablado</b></p>
<p>Ланцюжок <b>ir</b>: voy, fui, iba, había ido, iré, iría, habría ido.<br><b>tener</b>: tengo, tuve, tenía, tendré, tendría, tenga, tuviera, haya tenido, hubiera tenido.</p>`,
conj: [{ t: 'Imperf. Subjuntivo', v: `
hablar: hablara, hablaras, hablara, habláramos, hablarais, hablaran
tener: tuviera, tuvieras, tuviera, tuviéramos, tuvierais, tuvieran
hacer: hiciera, hicieras, hiciera, hiciéramos, hicierais, hicieran
ser / ir: fuera, fueras, fuera, fuéramos, fuerais, fueran
haber: hubiera, hubieras, hubiera, hubiéramos, hubierais, hubieran` }],
drills: [{ t: 'Imperf. Subjuntivo (yo)', v: `
tener|tuviera
estar|estuviera
poder|pudiera
poner|pusiera
saber|supiera
querer|quisiera
venir|viniera
hacer|hiciera
decir|dijera
traer|trajera
conducir|condujera
ser|fuera
ir|fuera
haber|hubiera` }],
sents: `
Si [tuviera] dinero, viajaría más.|Якби в мене були гроші, я б більше подорожував.
Quería que [vinieras].|Я хотів, щоб ти прийшов.
Si [hubiera sabido], no habría ido.|Якби я знав, я б не пішов.
Si [hubiera tenido] dinero, habría viajado.|Якби в мене були гроші, я б поїхав.
Si [pudiera], te ayudaría.|Якби я міг, я б тобі допоміг.
Me pidió que [hiciera] la cena.|Він попросив мене приготувати вечерю.
Si [fuera=ser] tú, no lo haría.|Якби я був тобою, я б цього не робив.
Te lo expliqué para que lo [entendieras=entender].|Я тобі пояснив, щоб ти зрозумів.
Me pidió que le [ayudara=ayudar].|Він попросив, щоб я йому допоміг.
Ojalá [tuviera=tener] más tiempo.|Якби ж у мене було більше часу.
Quería que me [dijeras=decir] la verdad.|Я хотів, щоб ти сказав мені правду.
Si [hubiéramos salido=salir] antes, no habríamos perdido el tren.|Якби ми вийшли раніше, ми б не спізнилися на потяг.`,
quiz: [
 { q: 'Si ___ tiempo, iría contigo.', o: ['tuviera', 'tengo', 'tendría', 'tuve'] },
 { q: 'Me alegro de que ___ (venir, ya відбулося).', o: ['hayas venido', 'vinieras', 'vengas', 'viniste'] },
 { q: 'Si hubiera sabido, no ___ ido.', o: ['habría', 'había', 'hubiera', 'habré'] },
 { q: 'decir → Imperfecto de Subjuntivo:', o: ['dijera', 'diciera', 'diría', 'dijiera'] }
]},

{ id: 'g_progr', group: 'grammar', icon: '🔄', title: 'Estar + gerundio і конструкції',
notes: `
<p><b>Presente Progresivo</b>: estar + gerundio (-AR → <b>-ando</b>, -ER/-IR → <b>-iendo</b>; leer → leyendo). <i>Estoy leyendo.</i></p>
<p><b>soler + infinitivo</b> — зазвичай: <i>Suelo levantarme temprano.</i></p>
<p><b>disfrutar + gerundio</b>: <i>Disfruto visitando museos.</i></p>
<p><b>llevar + час + sin + inf.</b>: <i>Llevo dos años sin fumar.</i></p>
<p><b>después de + infinitivo</b>: <i>después de cenar</i>. <b>acabar de + inf.</b> — щойно. <b>hay que + inf.</b> — треба. <b>tener ganas de + inf.</b> — хотіти.</p>`,
drills: [{ t: 'Gerundio', v: `
hablar|hablando
comer|comiendo
vivir|viviendo
leer|leyendo
trabajar|trabajando
escribir|escribiendo
estudiar|estudiando
dormir|durmiendo
decir|diciendo
ir|yendo` }],
sents: `
[Estoy leyendo] un libro.|Я зараз читаю книгу.
¿Qué [estás haciendo]?|Що ти робиш?
Disfruto [visitando] museos.|Мені подобається відвідувати музеї.
[Suelo] levantarme temprano.|Зазвичай я встаю рано.
[Llevo] dos años sin fumar.|Я вже два роки не курю.
Después de [cenar] veo una serie.|Після вечері я дивлюся серіал.
[Acabo de] llegar.|Я щойно прийшов.
[Hay que] estudiar cada día.|Треба вчитися щодня.
Tengo ganas [de] viajar.|Мені хочеться подорожувати.`,
quiz: [
 { q: 'Gerundio від «leer»:', o: ['leyendo', 'leiendo', 'leando', 'leído'] },
 { q: 'Disfruto ___ música.', o: ['escuchando', 'escuchar', 'escuchado', 'escucho'] },
 { q: '«Suelo + infinitivo» означає…', o: ['зазвичай роблю', 'щойно зробив', 'мушу зробити', 'хочу зробити'] }
]},

{ id: 'g_pron', group: 'grammar', icon: '👉', title: 'Займенники lo / le / se lo',
notes: `
<p><b>Що? Кого?</b> → lo, la, los, las<br><b>Кому?</b> → me, te, le, nos, os, les</p>
<p>Порядок: <b>кому + що</b>: <i>Te lo doy.</i></p>
<p><b>le/les + lo/la/los/las → se lo / se la / se los / se las</b><br>lo + le → se lo · la + le → <b>se la</b> · los + le → se los · las + le → se las · lo + les → se lo · las + les → se las</p>
<p class="warn">У тетраді «la + le → se lo» — описка, правильно <b>se la</b>.</p>
<p><b>Доповнення — де ставити займенник:</b> перед дієсловом (<i>Te lo doy</i>) або в кінці інфінітива / герундія разом з ним (<i>Te lo quiero dar = Quiero dártelo</i>; <i>Lo estoy haciendo = Estoy haciéndolo</i>). У стверджувальному наказі — тільки в кінці: <i>¡Dámelo!</i> Коли приєднуємо, з'являється наголос: dártelo, haciéndolo.</p>`,
gapPool: ['lo', 'la', 'los', 'las', 'le', 'les', 'se lo', 'se la', 'se los', 'se las', 'te lo', 'te la', 'te las', 'me lo'],
drills: [{ t: 'Разом', v: `
le + lo|se lo
le + la|se la
le + los|se los
le + las|se las
les + lo|se lo
les + las|se las
me + lo|me lo
te + la|te la
nos + los|nos los` }, { t: 'Приєднай до кінця', v: `
dar + te + lo (quiero …)|dártelo
decir + me + lo (puedes …)|decírmelo
hacer + lo (estoy …)|haciéndolo
dar + me + lo (¡…!)|dámelo` }],
sents: `
Compro el libro → [Lo] compro.|Купую книгу → Купую її.
Veo a María → [La] veo.|Бачу Марію → Бачу її.
Doy el libro a Juan → [Se lo] doy.|Даю книгу Хуанові → Даю її йому.
Digo la verdad a mi madre → [Se la] digo.|Кажу мамі правду → Кажу її їй.
¿Me das las llaves? Sí, [te las] doy.|Даси мені ключі? Так, даю їх тобі.
Escribo a mis padres → [Les] escribo.|Пишу батькам → Пишу їм.`,
quiz: [
 { q: 'le + la = ?', o: ['se la', 'le la', 'se lo', 'la le'] },
 { q: 'Кому? (йому) →', o: ['le', 'lo', 'la', 'se'] },
 { q: 'Doy las flores a Ana → ___ doy.', o: ['Se las', 'Le las', 'Las le', 'Se la'] }
]},

{ id: 'g_prep', group: 'grammar', icon: '🧭', title: 'Прийменники a, en, de, por, para',
notes: `
<p><b>A</b> — куди? кого? о котрій: <i>Voy al café. Veo a María. A las cinco.</i></p>
<p><b>EN</b> — де? яким транспортом: <i>Estoy en el parque. Vivo en USA. Voy en coche. Pensar en.</i></p>
<p><b>DE</b> — звідки, з чого, чиє: <i>Soy de Ucrania. Mesa de madera. La ciudad de Madrid. Salir de.</i></p>
<p><b>POR</b> — через, по, причина: <i>Paso por el puente. Pasamos por Madrid. Lo hice por amor. Por persona.</i></p>
<p><b>PARA</b> — для, мета: <i>Trabajo para Apple. Es para ti.</i></p>
<p>sobre — на, про · hasta — до · hacia — у напрямку, приблизно · según — згідно з · contra — проти · bajo — під · ante — перед (кимось)</p>
<p class="warn"><b>antes de</b> = до, перед (а не «після»). Після = <b>después de</b>.</p>
<p>Куди → a, де → en, звідки → de. Ir a, llegar a, entrar en/a, salir de.</p>
<p><b>Доповнення — por чи para:</b><br>
<b>POR</b>: причина (<i>por amor, gracias por tu ayuda</i>), через / по місцю (<i>por el parque</i>), засіб (<i>por teléfono</i>), обмін і ціна (<i>lo compré por diez euros</i>), частина доби (<i>por la mañana</i>), «за, на кожного» (<i>por persona</i>).<br>
<b>PARA</b>: мета (<i>para aprender</i>), адресат (<i>para ti</i>), термін (<i>para el lunes</i>), напрямок поїздки (<i>salgo para Madrid</i>), думка (<i>para mí…</i>), робота на когось (<i>trabajo para Apple</i>).</p>`,
gapPool: ['a', 'al', 'en', 'de', 'del', 'por', 'para', 'con', 'sobre', 'hacia', 'hasta', 'según', 'desde'],
words: `
sobre|на, над; про
hasta|до
hacia|у напрямку; приблизно
según|згідно з
contra|проти
bajo|під
antes de|перед, до
después de|після
ante|перед (кимось)`,
sents: `
Voy [al] café.|Я йду в кафе.
Veo [a] María.|Я бачу Марію.
La clase empieza [a] las cinco.|Урок починається о п'ятій.
Estoy [en] el parque.|Я в парку.
Voy [en] coche.|Я їду машиною.
Siempre pienso [en] ti.|Я завжди думаю про тебе.
Soy [de] Ucrania.|Я з України.
Es una mesa [de] madera.|Це дерев'яний стіл.
Salgo [de] casa a las ocho.|Я виходжу з дому о восьмій.
Paso [por] el puente.|Я проходжу через міст.
Lo hice [por] amor.|Я зробив це з любові.
Este regalo es [para] ti.|Цей подарунок для тебе.
El libro está [sobre] la mesa.|Книга на столі.
Camino [hacia] el centro.|Я йду в бік центру.
[Según] el profesor, es fácil.|За словами вчителя, це легко.
Te llamo [por] teléfono.|Я подзвоню тобі телефоном.
Gracias [por] tu ayuda.|Дякую за допомогу.
Estudio español [para] trabajar en España.|Я вчу іспанську, щоб працювати в Іспанії.
Necesito el informe [para] el lunes.|Мені потрібен звіт до понеділка.
Lo compré [por] diez euros.|Я купив це за десять євро.
[Para] mí, es la mejor ciudad.|Як на мене, це найкраще місто.
Mañana salgo [para] Madrid.|Завтра я їду до Мадрида.
Siempre corro [por] la mañana.|Я завжди бігаю вранці.`,
quiz: [
 { q: 'Vivo ___ Madrid.', o: ['en', 'a', 'de', 'por'] },
 { q: 'Este regalo es ___ ti.', o: ['para', 'por', 'a', 'en'] },
 { q: 'Lo hice ___ amor.', o: ['por', 'para', 'de', 'con'] },
 { q: 'Pasamos ___ Madrid (через).', o: ['por', 'para', 'en', 'a'] },
 { q: '«antes de» означає…', o: ['до, перед', 'після', 'під час', 'замість'] }
]},

{ id: 'g_art', group: 'grammar', icon: '🔤', title: 'Артиклі і рід',
notes: `
<p><b>el / la / los / las</b> — конкретне, відоме. <b>un / una / unos / unas</b> — неконкретне, згадане вперше.</p>
<p><b>a + el = al</b>, <b>de + el = del</b>.</p>
<p>Після <b>hay</b> — un/una (не el/la): <i>Hay un banco cerca.</i></p>
<p>Жіночі слова на ударне a- беруть <b>el</b>: el agua, el águila, el aula.</p>
<p>Увага на рід: <b>la</b> gente (однина!), <b>el</b> día, <b>las</b> vacaciones, <b>el</b> problema, <b>la</b> mano, <b>el</b> mapa.</p>
<p>Незлічуване в загальному сенсі — без артикля: <i>Bebo agua.</i> Заклад з конкретною назвою — можна без артикля.</p>
<p><b>Доповнення:</b> з частинами тіла й одягом — артикль, а не «мій»: <i>Me duele la cabeza. Me pongo el abrigo.</i> Середній <b>lo</b> + прикметник = «те, що…»: <i>Lo importante es practicar.</i> Дні тижня — з артиклем: <i>El lunes voy al médico.</i></p>`,
gapPool: ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'al', 'del', 'uno', 'lo'],
sents: `
Voy [al] supermercado.|Я йду в супермаркет.
Vengo [del] trabajo.|Я йду з роботи.
Hay [un] banco cerca.|Поруч є банк.
[El] agua está fría.|Вода холодна.
[La] gente es amable.|Люди привітні.
[El] día es largo.|День довгий.
Me gustan [las] vacaciones.|Я люблю відпустку.
Es [uno] de los mejores restaurantes.|Це один з найкращих ресторанів.
[El] problema es grave.|Проблема серйозна.
Me duele [la] cabeza.|У мене болить голова.
[Lo] importante es practicar.|Головне — практикуватися.
[El] lunes voy al médico.|У понеділок я йду до лікаря.
Me pongo [el] abrigo.|Я надягаю пальто.`,
quiz: [
 { q: 'Hay ___ farmacia en la esquina.', o: ['una', 'la', 'el', 'un'] },
 { q: '___ agua', o: ['el', 'la', 'lo', 'los'], e: 'Agua — жіночого роду, але перед ударним a- пишемо el.' },
 { q: 'Рід слова «día»:', o: ['чоловічий (el día)', 'жіночий (la día)'] },
 { q: '«gente» узгоджується як…', o: ['однина: la gente es', 'множина: la gente son'] },
 { q: 'de + el = ?', o: ['del', 'de el', 'dél', 'dl'] }
]},

{ id: 'g_tiempos', group: 'grammar', icon: '🧠', title: 'Всі часи в контексті',
notes: `
<p>Час обираємо за змістом і маркерами. Огляд на прикладі <b>hablar</b>:</p>
<p><b>Presente</b> hablo — зараз, звичка (<i>normalmente, siempre</i>)<br>
<b>estar + gerundio</b> estoy hablando — саме зараз (<i>ahora mismo</i>)<br>
<b>Perfecto</b> he hablado — період не скінчився, досвід (<i>hoy, esta semana, ya, nunca, alguna vez</i>)<br>
<b>Indefinido</b> hablé — завершене в минулому (<i>ayer, el año pasado, en 2019</i>)<br>
<b>Imperfecto</b> hablaba — опис, звичка, фон (<i>antes, de pequeño, mientras</i>)<br>
<b>Pluscuamperfecto</b> había hablado — раніше за іншу минулу дію (<i>ya, cuando llegué…</i>)<br>
<b>ir a + inf.</b> voy a hablar — план, намір<br>
<b>Futuro</b> hablaré — майбутнє, обіцянка, припущення про зараз (<i>estará en casa</i>)<br>
<b>Futuro Perfecto</b> habré hablado — завершиться до моменту (<i>para el viernes</i>)<br>
<b>Condicional</b> hablaría — зробив би, ввічливість, порада<br>
<b>Condicional Compuesto</b> habría hablado — зробив би тоді, але не зробив</p>
<p><b>Subjuntivo</b> (бажання, сумнів, емоція, мета):<br>
hable — зараз / майбутнє (<i>Quiero que…, Cuando llegues…</i>)<br>
haya hablado — вже сталося (<i>Me alegro de que hayas…</i>)<br>
hablara — минуле або нереальне (<i>Quería que…, Si tuviera…</i>)<br>
hubiera hablado — нереальне в минулому (<i>Si hubiera sabido…</i>)</p>
<p><b>Умовні речення:</b> Si tengo → tendré · Si tuviera → tendría · Si hubiera tenido → habría tenido</p>`,
sents: `
Normalmente [desayuno=desayunar] a las ocho.|Зазвичай я снідаю о восьмій.
Ahora mismo [estoy leyendo=leer] un libro.|Саме зараз я читаю книгу.
Esta mañana [he desayunado=desayunar] muy poco.|Сьогодні зранку я мало поснідав.
Ayer [desayuné=desayunar] en un café.|Вчора я снідав у кафе.
De pequeño siempre [desayunaba=desayunar] cereales.|У дитинстві я завжди снідав пластівцями.
Cuando llegué, mi hermano ya [había desayunado=desayunar].|Коли я прийшов, брат уже поснідав.
Mañana [voy a visitar=visitar] a mis abuelos.|Завтра я збираюся провідати бабусю й дідуся.
El año que viene [viajaremos=viajar] a México.|Наступного року ми поїдемо до Мексики.
Para el viernes ya [habré terminado=terminar] el proyecto.|До п'ятниці я вже закінчу проєкт.
Yo en tu lugar no [habría dicho=decir] nada.|Я на твоєму місці нічого б не сказав.
Espero que [tengas=tener] un buen viaje.|Сподіваюся, у тебе буде гарна подорож.
Me alegro de que [hayas aprobado=aprobar] el examen.|Я радий, що ти склав іспит.
Mi madre quería que [estudiara=estudiar] medicina.|Мама хотіла, щоб я вивчав медицину.
Si [hubiera estudiado=estudiar] más, habría aprobado.|Якби я більше вчився, я б склав.
La semana pasada [fuimos=ir] a la playa.|Минулого тижня ми їздили на пляж.
Este verano [hemos ido=ir] a la playa tres veces.|Цього літа ми тричі їздили на пляж.
¿[Has visto=ver] alguna vez una ballena?|Ти коли-небудь бачив кита?
En 2019 [vi=ver] una ballena en Canarias.|У 2019 я бачив кита на Канарах.
Antes [veía=ver] la tele todas las noches.|Раніше я дивився телевізор щовечора.
No contesta; [estará=estar] ocupado.|Не відповідає — мабуть, зайнятий.
¿Me [podrías=poder] ayudar con esto?|Ти не міг би допомогти мені з цим?
Ojalá [haga=hacer] buen tiempo el sábado.|Хоч би в суботу була гарна погода.
No creo que Juan [venga=venir] hoy.|Не думаю, що Хуан сьогодні прийде.
Creo que Juan [viene=venir] hoy.|Думаю, що Хуан сьогодні прийде.
Si [tengo=tener] tiempo mañana, te llamaré.|Якщо завтра матиму час, подзвоню тобі.
Si [tuviera=tener] tiempo, te llamaría.|Якби я мав час, я б тобі подзвонив.
Si hubiera tenido tiempo, te [habría llamado=llamar].|Якби в мене тоді був час, я б тобі подзвонив.
Cuando era niño, mi padre me [leía=leer] cuentos.|Коли я був дитиною, тато читав мені казки.
Anoche [leí=leer] tres capítulos.|Учора ввечері я прочитав три розділи.
Todavía no [he leído=leer] ese libro.|Я ще не читав ту книгу.
[Viví=vivir] en Lviv de 2015 a 2020.|Я жив у Львові з 2015 до 2020 року.
Es importante que [duermas=dormir] ocho horas.|Важливо, щоб ти спав вісім годин.
Anoche [dormí=dormir] muy mal.|Учора вночі я дуже погано спав.
Cuando [era=ser] joven, vivía en Kiev.|Коли я був молодим, я жив у Києві.
Mañana a estas horas [estaré=estar] en el avión.|Завтра в цей час я буду в літаку.
Te prometo que mañana te lo [diré=decir].|Обіцяю, що завтра тобі це скажу.
Me dijo que [había perdido=perder] las llaves.|Він сказав, що загубив ключі.
Mientras yo cocinaba, él [puso=poner] la mesa.|Поки я готував, він накрив на стіл.
Si yo [fuera=ser] rico, compraría una casa en la costa.|Якби я був багатий, купив би будинок на узбережжі.
Cuando [llegue=llegar] el verano, iremos al mar.|Коли настане літо, ми поїдемо на море.`,
quiz: [
 { q: 'Ayer ___ (ir, nosotros) al cine.', o: ['fuimos', 'hemos ido', 'íbamos', 'iremos'], e: '«ayer» — завершений період → Indefinido.' },
 { q: 'Hoy ___ (comer, yo) muy bien.', o: ['he comido', 'comí', 'comía', 'había comido'], e: '«hoy» — період ще не скінчився → Perfecto.' },
 { q: 'Cuando era pequeño, ___ (jugar) en la calle.', o: ['jugaba', 'jugué', 'he jugado', 'jugaría'], e: 'Звичка в минулому → Imperfecto.' },
 { q: 'Si ___ (saber) la verdad, te la habría dicho.', o: ['hubiera sabido', 'supiera', 'había sabido', 'sabría'], e: 'Нереальне в минулому: Si + hubiera + participio → habría + participio.' },
 { q: 'Cuando ___ (terminar, tú), avísame.', o: ['termines', 'terminas', 'terminarás', 'terminaste'], e: 'cuando + майбутнє → Subjuntivo.' },
 { q: 'Quería que me ___ (llamar, tú).', o: ['llamaras', 'llames', 'llamaste', 'llamarías'], e: 'Головне речення в минулому → Imperfecto de Subjuntivo.' },
 { q: 'No está en la oficina; ___ (estar) enfermo.', o: ['estará', 'estaría', 'esté', 'estuvo'], e: 'Припущення про теперішнє → Futuro.' },
 { q: 'Cuando llegamos, el tren ya ___ (salir).', o: ['había salido', 'salió', 'ha salido', 'salía'], e: 'Дія раніше за іншу минулу → Pluscuamperfecto.' }
]},

{ id: 'g_dim', group: 'grammar', icon: '🔍', title: 'Зменшувальні і збільшувальні',
notes: `
<p><b>Diminutivos</b> (зменшувальні):<br>1) <b>-ito / -ita</b>: pequeño → pequeñito, perro → perrito, casa → casita, chico → chiquito, niño → niñito, café → cafecito, momento → momentito, mujer → mujercita, corazón → corazoncito, canción → cancioncita, flor → florecita<br>2) <b>-illo / -illa</b>: casa → casilla, poco → poquillo (c → qu)<br>3) <b>-ín / -ina</b>: chico → chiquitín, pequeño → pequeñín</p>
<p><b>Aumentativos</b> (збільшувальні): <b>-ón/-ona, -azo/-aza, -ote/-ota</b>: casa → casota, gol → golazo, problema → problemazo, amigo → amigote</p>`,
drills: [{ t: 'Зменшувальне (-ito/-ita)', v: `
pequeño|pequeñito
perro|perrito
casa|casita
chico|chiquito
niño|niñito
café|cafecito
momento|momentito
flor|florecita
mujer|mujercita
corazón|corazoncito
canción|cancioncita` }, { t: 'Збільшувальне', v: `
gol (-azo)|golazo
problema (-azo)|problemazo
casa (-ota)|casota
amigo (-ote)|amigote` }],
quiz: [
 { q: 'Суфікси -azo, -ón, -ote означають…', o: ['збільшення', 'зменшення', 'множину', 'жіночий рід'] },
 { q: 'chico → ?', o: ['chiquito', 'chicito', 'chicoito', 'chiquillito'], e: 'c → qu перед i: chiquito.' }
]},

{ id: 'g_pref', group: 'grammar', icon: '🧩', title: 'Префікси',
notes: `
<p><b>des-</b> протилежність, скасування · <b>in-/im-/il-/ir-</b> не · <b>re-</b> знову · <b>pre-</b> перед · <b>post-</b> після · <b>super-</b> над, дуже · <b>sub-</b> під · <b>sobre-</b> понад, надмірно · <b>inter-</b> між · <b>trans-</b> через, за межі · <b>co-</b> разом · <b>auto-</b> сам · <b>multi-</b> багато</p>`,
words: `
des-|протилежність, скасування
in- / im- / il- / ir-|не (заперечення)
re-|знову
pre-|перед
post-|після
super-|над, дуже
sub-|під
sobre-|понад, надмірно
inter-|між
trans-|через, за межі
co-|разом
auto-|сам
multi-|багато
desconocido|невідомий
deshacer|розібрати, скасувати
imprevisible|непередбачуваний
ilegal|незаконний
irregular|неправильний
rehacer|переробити
prever|передбачити
posponer|відкласти
subterráneo|підземний
internacional|міжнародний
cooperar|співпрацювати
multicultural|багатокультурний`
}

);
