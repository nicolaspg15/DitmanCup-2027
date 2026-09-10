// ======= CONFIGURACIÓN DEL TORNEO / TOURNAMENT CONFIG =======
// Única fuente de los números del torneo. Cambiá acá cuando se cierren.
// Single source of truth for the tournament numbers. Edit here once final.
const TOURNAMENT_CONFIG = {
  totalRunners: 32,
  numGroups: 8,
  groupSize: 4,
  qualifiersPerGroup: 2,   // clasificados por grupo a la llave / advance per group

  // Apertura de las clasificatorias ("qualys"). Formato ISO con offset.
  // Qualifier window opens. ISO format with UTC offset.
  qualysOpen: '2026-11-20T00:00:00-03:00',      // 20 nov 2026, 00:00 hora Argentina (UTC-3)
  qualysTimeZone: 'America/Argentina/Buenos_Aires', // solo para mostrar la fecha siempre igual

  // Modo prueba: usa datos falsos en Grupos / Clasificatorias / Brackets.
  // También se activa agregando ?mock=1 a la URL (sin tocar el código).
  // Test mode: fake data. Also enabled with ?mock=1 in the URL.
  mock: false,
};

// ======= FUENTES DE DATOS (Google Sheets) / DATA SOURCES =======
// Pegar acá el link de "Publicar en la web -> CSV" de cada hoja.
const SHEET_URLS = {
  groups: '',    // columnas: Grupo, Corredor  (gid de la hoja de grupos — pendiente)
  standings: '', // vacío a propósito: la clasificación del año pasado no va.
  // Ejemplo cuando esté la hoja nueva (hoja "Qualifiers"):
  // standings: 'https://docs.google.com/spreadsheets/d/<ID>/export?format=csv&gid=<GID>',
};

// ======= BANDERAS / FLAGS =======
// País de cada corredor. Se usa cuando la Sheet no trae la columna "Flag".
// Valor: código ISO de 2 letras ("AR", "UY", "US", "JP"...) o directamente un emoji.
// Clave: nombre del corredor en minúsculas. / Key: runner name, lowercased.
const RUNNER_FLAGS = {
  jokeruy: 'UY',
  // sawken: 'AR',
  // luis_sera: 'UY',
  // ...completar. También se puede llenar la columna "Flag" de la Sheet.
};

// ======= EDICIONES ANTERIORES / PAST EDITIONS =======
// Podio de cada Ditman Cup pasada. Dejar '' lo que falte.
const PAST_EDITIONS = [
  {
    year: 2026,
    champion: 'JokerUY',
    runnerUp: 'Sawken',
    third: 'Pochoide',
    vod: 'https://www.youtube.com/@DitmanCup',
  },
  {
    year: 2022,
    champion: '',
    runnerUp: '',
    third: '',
    vod: '',
  },
];

// ======= MEJORES CLIPS / BEST CLIPS =======
// Clips destacados de otros torneos. url: link de YouTube o Twitch (clip o video).
const CLIPS = [
  // { title: 'Clutch en la final', author: 'JokerUY', url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX' },
  // { title: 'Reset perfecto', author: 'Sawken', url: 'https://clips.twitch.tv/XXXXXXXX' },
];

// ======= RUNNERS DE RE4 EN VIVO / RE4 RUNNERS LIVE =======
// Canales de Twitch a vigilar. Se marca "EN VIVO" consultando decapi.me (sin API key).
const RE4_LIVE_CHANNELS = [
  'DitmanCup',
  // 'jokeruy', 'sawken', '4rcadan', 'nevs', ...  (handles de Twitch, en minúscula)
];

// ======= TEXTOS BILINGÜES / BILINGUAL STRINGS =======
const I18N = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.sorteo': 'Sorteo',
    'nav.grupos': 'Grupos',
    'nav.brackets': 'Brackets',
    'nav.clasificatorias': 'Clasificatorias',
    'nav.champions': 'Campeones',
    'nav.clips': 'Clips',
    'nav.live': 'En vivo',
    'nav.donaciones': 'Donaciones',
    'nav.organizadores': 'Organizadores',
    'nav.menu': 'Abrir menú',

    'hero.subtitle': 'Torneo comunitario de speedrunning de Resident Evil 4 — formato copa del mundo.',

    'countdown.label': 'Faltan para que abran las qualys',
    'countdown.days': 'días',
    'countdown.hours': 'horas',
    'countdown.mins': 'min',
    'countdown.secs': 'seg',
    'countdown.open': '¡Las qualys ya están abiertas!',
    'countdown.datePrefix': 'Apertura:',

    'facts.runners': 'corredores',
    'facts.groups': 'grupos',
    'facts.qualify': 'clasifican x grupo',

    'intro.p': 'Bienvenidos a la Ditman Cup 2027. Acá vas a encontrar el sorteo, los grupos, el cuadro de eliminación y todo lo necesario para seguir el torneo de punta a punta.',

    'sorteo.title': 'Sorteo',
    'sorteo.vod': 'VOD del sorteo — próximamente',
    'sorteo.note': 'Los resultados del sorteo se reflejan automáticamente en la pestaña Grupos.',

    'grupos.title': 'Fase de grupos',
    'grupos.loading': 'Cargando grupos…',
    'grupos.sheetError': 'No se pudo cargar la Sheet. Mostrando datos de ejemplo.',
    'group.word': 'Grupo',
    'group.tbd': 'Por definir',

    'brackets.title': 'Brackets',
    'brackets.placeholder': 'El cuadro de eliminación se arma una vez cerrada la fase de grupos.',
    'brackets.previewNote': 'Vista previa del cuadro — {n} clasificados. Los cruces reales se definen al cerrar la fase de grupos.',
    'bracket.champion': 'Campeón/a',
    'bracket.tbd': '—',
    'bracket.bye': 'BYE',
    'bracket.round.final': 'Final',
    'bracket.round.semi': 'Semifinal',
    'bracket.round.quarter': 'Cuartos',
    'bracket.round.r16': 'Octavos',
    'bracket.round.r32': '16avos',
    'bracket.round.generic': 'Ronda de {n}',

    'clas.title': 'Clasificatorias y placements',
    'clas.empty': 'Todavía no hay clasificación cargada.',
    'clas.sheetError': 'No se pudo cargar la Sheet de clasificación.',
    'clas.noData': 'Sin datos todavía.',
    'clas.col.pos': 'Pos',
    'clas.col.runner': 'Corredor',
    'clas.col.group': 'Grupo',
    'clas.col.time': 'Mejor tiempo',
    'clas.col.pts': 'Pts',

    'don.title': 'Donaciones',
    'don.body': 'La Ditman Cup se sostiene gracias a la comunidad. Si querés colaborar con los premios y los gastos del torneo, podés hacerlo acá:',
    'don.btn': 'Donar',

    'org.title': 'Organización y staff',
    'org.tier.organizers': 'Organizadores',
    'org.tier.mods': 'Moderadores',
    'org.tier.helpers': 'Helpers y casters',
    'org.tier.design': 'Diseño',
    'org.role.admin': 'Admin',
    'org.role.mod': 'Moderador',
    'org.role.helper': 'Helper',
    'org.role.helperCaster': 'Helper / Caster',
    'org.role.design': 'Diseño',

    'link.discord': 'Discord',
    'link.rules': 'Reglas',
    'link.youtube': 'YouTube',
    'link.twitch': 'Twitch',

    'champions.title': 'Campeones',
    'champions.edition': 'Ditman Cup {year}',
    'champions.champion': 'Campeón',
    'champions.runnerUp': 'Subcampeón',
    'champions.third': '3er puesto',
    'champions.tbd': 'Por confirmar',
    'champions.vod': 'Ver final',
    'champions.trophyTitle': 'El trofeo',
    'champions.trophyPending': 'El trofeo de la Ditman Cup 2027 todavía se está diseñando.',

    'clips.title': 'Mejores clips',
    'clips.intro': 'Momentos destacados de ediciones y torneos anteriores.',
    'clips.empty': 'Todavía no hay clips cargados. ¿Tenés uno? Pasálo por Discord.',

    'live.title': 'Runners de RE4 en vivo',
    'live.intro': 'Canales de la comunidad que están corriendo Resident Evil 4 ahora mismo.',
    'live.on': 'EN VIVO',
    'live.off': 'Desconectado',
    'live.none': 'Ningún canal de la lista está en vivo en este momento.',
    'live.watch': 'Ver en Twitch',
    'live.checking': 'Chequeando canales…',

    'footer.text': 'Ditman Cup 2027 · Hecho por la comunidad',

    'testmode': 'MODO PRUEBA · datos falsos',
  },
  en: {
    'nav.inicio': 'Home',
    'nav.sorteo': 'Draw',
    'nav.grupos': 'Groups',
    'nav.brackets': 'Bracket',
    'nav.clasificatorias': 'Standings',
    'nav.champions': 'Champions',
    'nav.clips': 'Clips',
    'nav.live': 'Live',
    'nav.donaciones': 'Donations',
    'nav.organizadores': 'Organizers',
    'nav.menu': 'Open menu',

    'hero.subtitle': 'Community Resident Evil 4 speedrunning tournament — World Cup format.',

    'countdown.label': 'Until the qualifiers open',
    'countdown.days': 'days',
    'countdown.hours': 'hours',
    'countdown.mins': 'min',
    'countdown.secs': 'sec',
    'countdown.open': 'Qualifiers are now open!',
    'countdown.datePrefix': 'Opens:',

    'facts.runners': 'runners',
    'facts.groups': 'groups',
    'facts.qualify': 'advance per group',

    'intro.p': "Welcome to the Ditman Cup 2027. Here you'll find the draw, the groups, the knockout bracket and everything you need to follow the tournament end to end.",

    'sorteo.title': 'Draw',
    'sorteo.vod': 'Draw VOD — coming soon',
    'sorteo.note': 'Draw results are reflected automatically in the Groups tab.',

    'grupos.title': 'Group stage',
    'grupos.loading': 'Loading groups…',
    'grupos.sheetError': 'Could not load the Sheet. Showing sample data.',
    'group.word': 'Group',
    'group.tbd': 'TBD',

    'brackets.title': 'Bracket',
    'brackets.placeholder': 'The knockout bracket goes live once the group stage is finalized.',
    'brackets.previewNote': 'Bracket preview — {n} qualifiers. Real matchups are set once the group stage is finalized.',
    'bracket.champion': 'Champion',
    'bracket.tbd': '—',
    'bracket.bye': 'BYE',
    'bracket.round.final': 'Final',
    'bracket.round.semi': 'Semifinals',
    'bracket.round.quarter': 'Quarterfinals',
    'bracket.round.r16': 'Round of 16',
    'bracket.round.r32': 'Round of 32',
    'bracket.round.generic': 'Round of {n}',

    'clas.title': 'Standings & placements',
    'clas.empty': 'No standings loaded yet.',
    'clas.sheetError': 'Could not load the standings Sheet.',
    'clas.noData': 'No data yet.',
    'clas.col.pos': 'Pos',
    'clas.col.runner': 'Runner',
    'clas.col.group': 'Group',
    'clas.col.time': 'Best time',
    'clas.col.pts': 'Pts',

    'don.title': 'Donations',
    'don.body': 'The Ditman Cup runs on community support. If you want to chip in for the prize pool and tournament costs, you can do it here:',
    'don.btn': 'Donate',

    'org.title': 'Organizers & staff',
    'org.tier.organizers': 'Organizers',
    'org.tier.mods': 'Moderators',
    'org.tier.helpers': 'Helpers & casters',
    'org.tier.design': 'Design',
    'org.role.admin': 'Admin',
    'org.role.mod': 'Moderator',
    'org.role.helper': 'Helper',
    'org.role.helperCaster': 'Helper / Caster',
    'org.role.design': 'Design',

    'link.discord': 'Discord',
    'link.rules': 'Rules',
    'link.youtube': 'YouTube',
    'link.twitch': 'Twitch',

    'champions.title': 'Champions',
    'champions.edition': 'Ditman Cup {year}',
    'champions.champion': 'Champion',
    'champions.runnerUp': 'Runner-up',
    'champions.third': '3rd place',
    'champions.tbd': 'To be confirmed',
    'champions.vod': 'Watch the final',
    'champions.trophyTitle': 'The trophy',
    'champions.trophyPending': 'The Ditman Cup 2027 trophy is still being designed.',

    'clips.title': 'Best clips',
    'clips.intro': 'Highlights from past editions and other tournaments.',
    'clips.empty': "No clips added yet. Got one? Drop it in the Discord.",

    'live.title': 'RE4 runners live',
    'live.intro': 'Community channels running Resident Evil 4 right now.',
    'live.on': 'LIVE',
    'live.off': 'Offline',
    'live.none': 'No channel from the list is live right now.',
    'live.watch': 'Watch on Twitch',
    'live.checking': 'Checking channels…',

    'footer.text': 'Ditman Cup 2027 · Made by the community',

    'testmode': 'TEST MODE · fake data',
  },
};

// Estado en memoria para poder re-renderizar al cambiar de idioma
// Idioma principal: inglés. / Primary language: English.
let currentLang = 'en';
let lastGroupsRows = null;
let lastStandingsRows = null;

function t(key, vars) {
  const dict = I18N[currentLang] || I18N.es;
  let s = dict[key] != null ? dict[key] : (I18N.es[key] != null ? I18N.es[key] : key);
  if (vars) Object.keys(vars).forEach(k => { s = s.replace('{' + k + '}', vars[k]); });
  return s;
}

// Escape básico para texto que viene de la Sheet (evita romper el HTML)
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ======= BANDERAS / FLAGS =======
const COUNTRY_CODES = {
  argentina: 'AR', uruguay: 'UY', chile: 'CL', paraguay: 'PY', bolivia: 'BO', peru: 'PE',
  'perú': 'PE', brazil: 'BR', brasil: 'BR', colombia: 'CO', venezuela: 'VE', ecuador: 'EC',
  mexico: 'MX', 'méxico': 'MX', 'united states': 'US', usa: 'US', 'estados unidos': 'US',
  canada: 'CA', 'canadá': 'CA', spain: 'ES', 'españa': 'ES', portugal: 'PT', france: 'FR',
  'francia': 'FR', germany: 'DE', alemania: 'DE', italy: 'IT', italia: 'IT',
  'united kingdom': 'GB', uk: 'GB', england: 'GB', inglaterra: 'GB', ireland: 'IE',
  netherlands: 'NL', 'países bajos': 'NL', belgium: 'BE', poland: 'PL', polonia: 'PL',
  sweden: 'SE', norway: 'NO', finland: 'FI', denmark: 'DK', 'czech republic': 'CZ',
  czechia: 'CZ', austria: 'AT', switzerland: 'CH', suiza: 'CH', greece: 'GR', turkey: 'TR',
  russia: 'RU', ukraine: 'UA', romania: 'RO', hungary: 'HU', japan: 'JP', 'japón': 'JP',
  'south korea': 'KR', korea: 'KR', corea: 'KR', china: 'CN', taiwan: 'TW', 'hong kong': 'HK',
  indonesia: 'ID', philippines: 'PH', filipinas: 'PH', malaysia: 'MY', thailand: 'TH',
  vietnam: 'VN', india: 'IN', australia: 'AU', 'new zealand': 'NZ', morocco: 'MA',
  marruecos: 'MA', algeria: 'DZ', argelia: 'DZ', egypt: 'EG', 'south africa': 'ZA', israel: 'IL',
};

let _sheetFlags = {};   // { 'nombre en minúscula': 'UY' | '🇺🇾' | 'Uruguay' }

function indexFlags(rows) {
  (rows || []).forEach(r => {
    const name = r['Corredor'] || r['Runner'] || r['Nombre'];
    const fl = r['Flag'] || r['Bandera'] || r['País'] || r['Pais'] || r['Country'];
    if (name && fl) _sheetFlags[String(name).toLowerCase().trim()] = fl;
  });
}

// Normaliza cualquier entrada (código ISO2 / emoji bandera / nombre de país) -> "uy"
function flagCode(input) {
  if (!input) return '';
  const s = String(input).trim();
  if (!s) return '';
  const ri = [...s].map(c => c.codePointAt(0)).filter(cp => cp >= 0x1F1E6 && cp <= 0x1F1FF);
  if (ri.length === 2) return String.fromCharCode(...ri.map(cp => cp - 0x1F1E6 + 97));
  if (/^[A-Za-z]{2}$/.test(s)) return s.toLowerCase();
  return (COUNTRY_CODES[s.toLowerCase()] || '').toLowerCase();
}

// <span> con la bandera SVG (flag-icons). Vacío si no hay país.
function flagSpan(code) {
  return code ? `<span class="fi fi-${code}" title="${esc(code.toUpperCase())}"></span>` : '';
}

function flagFor(name) {
  const k = String(name || '').toLowerCase().trim();
  return flagCode(_sheetFlags[k]) || flagCode(RUNNER_FLAGS[k]) || '';
}

// Devuelve HTML: "<bandera> Nombre" (nombre escapado)
function nameWithFlag(name) {
  const f = flagSpan(flagFor(name));
  return (f ? f + ' ' : '') + esc(name);
}

// ¿Modo prueba? / Test mode?
function isMock() {
  return TOURNAMENT_CONFIG.mock === true ||
    /[?&]mock=1(&|$)/.test(location.search) ||
    location.hash === '#mock';
}

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initTabs();
  initFacts();
  initCountdown();
  if (isMock()) showTestBanner();
  loadGroups();
  loadStandings();
  renderBracket();
  renderChampions();
  renderClips();
  renderLive();
});

// ======= IDIOMA / LANGUAGE =======
function initLang() {
  const saved = safeGet('dc-lang');
  // Inglés por defecto; solo recordamos si el visitante eligió español.
  applyLang(saved === 'es' || saved === 'en' ? saved : 'en');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

function applyLang(lang) {
  currentLang = I18N[lang] ? lang : 'es';
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n);
    if (val != null) el.textContent = val;
  });

  // Atributos: data-i18n-attr="aria-label:clave;title:clave2"
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s && s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
    b.setAttribute('aria-pressed', String(b.dataset.lang === currentLang));
  });

  safeSet('dc-lang', currentLang);

  // Re-render de lo dinámico
  renderCountdown();
  const tb = document.getElementById('test-banner');
  if (tb) tb.textContent = t('testmode');
  if (isMock()) {                       // en modo prueba, los datos falsos dependen del idioma
    lastGroupsRows = mockGroupsRows();
    lastStandingsRows = mockStandingsRows();
  }
  if (lastGroupsRows) renderGroups(lastGroupsRows, document.getElementById('groups-grid'));
  else document.getElementById('groups-grid').innerHTML = placeholderGroups();
  if (lastStandingsRows) renderStandings(lastStandingsRows, document.getElementById('standings-table'));
  renderBracket();
  renderChampions();
  renderClips();
  renderLive();
}

function showTestBanner() {
  if (document.getElementById('test-banner')) return;
  const b = document.createElement('div');
  b.id = 'test-banner';
  b.textContent = t('testmode');
  document.body.prepend(b);
}

// ======= NAVEGACIÓN POR PESTAÑAS / TABS =======
function initTabs() {
  const buttons = Array.from(document.querySelectorAll('.tab-btn'));
  const panels = document.querySelectorAll('.tab-panel');
  const toggle = document.getElementById('nav-toggle');
  const tabs = document.getElementById('tabs');

  function activate(btn, focusPanel) {
    buttons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.tabIndex = -1;
    });
    panels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.tabIndex = 0;

    const panel = document.getElementById(btn.dataset.tab);
    panel.classList.add('active');
    document.body.dataset.tab = btn.dataset.tab;
    tabs.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (focusPanel) panel.focus();
  }

  buttons.forEach((btn, i) => {
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
    btn.setAttribute('aria-controls', btn.dataset.tab);
    btn.tabIndex = btn.classList.contains('active') ? 0 : -1;

    btn.addEventListener('click', () => activate(btn));

    // Flechas para moverse entre pestañas (patrón ARIA tabs)
    btn.addEventListener('keydown', e => {
      let next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = buttons[(i + 1) % buttons.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = buttons[(i - 1 + buttons.length) % buttons.length];
      else if (e.key === 'Home') next = buttons[0];
      else if (e.key === 'End') next = buttons[buttons.length - 1];
      if (next) {
        e.preventDefault();
        activate(next);
        next.focus();
      }
    });
  });

  tabs.setAttribute('role', 'tablist');
  document.querySelectorAll('.tab-panel').forEach(p => p.setAttribute('role', 'tabpanel'));

  const active = document.querySelector('.tab-btn.active');
  document.body.dataset.tab = active ? active.dataset.tab : 'inicio';

  toggle.addEventListener('click', () => {
    const open = tabs.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// ======= NÚMEROS DEL HERO / HERO FACTS =======
function initFacts() {
  setText('fact-runners', TOURNAMENT_CONFIG.totalRunners);
  setText('fact-groups', TOURNAMENT_CONFIG.numGroups);
  setText('fact-qualify', TOURNAMENT_CONFIG.qualifiersPerGroup);
}

// ======= CONTADOR / COUNTDOWN =======
let _countdownTarget = null;

function initCountdown() {
  const target = new Date(TOURNAMENT_CONFIG.qualysOpen);
  _countdownTarget = isNaN(target.getTime()) ? null : target;
  renderCountdown();
  if (_countdownTarget) setInterval(renderCountdown, 1000);
}

function renderCountdown() {
  const box = document.getElementById('countdown');
  if (!box || !_countdownTarget) return;

  const dateLine = document.getElementById('countdown-date');
  const locale = currentLang === 'en' ? 'en-US' : 'es-ES';
  const fmtOpts = { day: 'numeric', month: 'long', year: 'numeric' };
  if (TOURNAMENT_CONFIG.qualysTimeZone) fmtOpts.timeZone = TOURNAMENT_CONFIG.qualysTimeZone;
  let pretty;
  try { pretty = _countdownTarget.toLocaleDateString(locale, fmtOpts); }
  catch (e) { pretty = _countdownTarget.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }); }
  if (dateLine) dateLine.textContent = t('countdown.datePrefix') + ' ' + pretty;

  let diff = _countdownTarget.getTime() - Date.now();

  if (diff <= 0) {
    box.classList.add('is-open');
    setText('cd-days', '0'); setText('cd-hours', '00'); setText('cd-mins', '00'); setText('cd-secs', '00');
    return;
  }
  box.classList.remove('is-open');

  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);

  setText('cd-days', String(d));
  setText('cd-hours', String(h).padStart(2, '0'));
  setText('cd-mins', String(m).padStart(2, '0'));
  setText('cd-secs', String(s).padStart(2, '0'));
}

// ======= GRUPOS / GROUPS =======
async function loadGroups() {
  const container = document.getElementById('groups-grid');

  if (isMock()) {
    lastGroupsRows = mockGroupsRows();
    indexFlags(lastGroupsRows);
    renderGroups(lastGroupsRows, container);
    return;
  }
  if (!SHEET_URLS.groups) {
    container.innerHTML = placeholderGroups();
    return;
  }
  try {
    const rows = await fetchCSV(SHEET_URLS.groups);
    lastGroupsRows = rows;
    indexFlags(rows);
    renderGroups(rows, container);
    renderBracket();
  } catch (err) {
    console.error('Error cargando grupos:', err);
    container.innerHTML = '<p class="loading-msg">' + esc(t('grupos.sheetError')) + '</p>' + placeholderGroups();
  }
}

function letterFor(i) { return String.fromCharCode(65 + i); }

function placeholderGroups() {
  let html = '';
  for (let g = 0; g < TOURNAMENT_CONFIG.numGroups; g++) {
    html += `<div class="group-card"><h3>${esc(t('group.word'))} ${letterFor(g)}</h3><ol>`;
    for (let i = 0; i < TOURNAMENT_CONFIG.groupSize; i++) {
      html += `<li>${esc(t('group.tbd'))}</li>`;
    }
    html += `</ol></div>`;
  }
  return html;
}

// Espera columnas en la Sheet: Grupo, Corredor (una fila por corredor)
function renderGroups(rows, container) {
  const groups = groupRows(rows);
  const keys = Object.keys(groups).sort();
  if (!keys.length) {
    container.innerHTML = placeholderGroups();
    return;
  }

  container.innerHTML = keys.map(g => `
    <div class="group-card">
      <h3>${esc(t('group.word'))} ${esc(g)}</h3>
      <ol>${groups[g].map(n => `<li>${nameWithFlag(n)}</li>`).join('')}</ol>
    </div>
  `).join('');
}

// { "A": ["nombre", ...], ... } a partir de filas {Grupo, Corredor}
function groupRows(rows) {
  const groups = {};
  (rows || []).forEach(r => {
    const g = r['Grupo'] || r['Group'];
    const name = r['Corredor'] || r['Runner'] || r['Nombre'];
    if (!g || !name) return;
    if (!groups[g]) groups[g] = [];
    groups[g].push(name);
  });
  return groups;
}

// ======= CLASIFICACIÓN / STANDINGS =======
async function loadStandings() {
  const container = document.getElementById('standings-table');

  if (isMock()) {
    lastStandingsRows = mockStandingsRows();
    indexFlags(lastStandingsRows);
    renderStandings(lastStandingsRows, container);
    return;
  }
  if (!SHEET_URLS.standings) return; // se queda con el mensaje por defecto del HTML
  try {
    const rows = await fetchCSV(SHEET_URLS.standings);
    lastStandingsRows = rows;
    indexFlags(rows);
    renderStandings(rows, container);
    renderBracket();
  } catch (err) {
    console.error('Error cargando clasificación:', err);
    container.innerHTML = '<p class="loading-msg">' + esc(t('clas.sheetError')) + '</p>';
  }
}

function renderStandings(rows, container) {
  if (!rows || !rows.length) {
    container.innerHTML = '<p class="loading-msg">' + esc(t('clas.noData')) + '</p>';
    return;
  }
  const headers = Object.keys(rows[0]);
  const isFlagCol = h => /^(flag|bandera|pa[ií]s|country)$/i.test(h);
  const isRunnerCol = h => /^(runner|corredor|nombre|player|jugador)$/i.test(h);

  const cell = (r, h) => {
    const v = r[h];
    if (isFlagCol(h)) { const c = flagCode(v); return c ? flagSpan(c) : esc(v); }
    if (isRunnerCol(h)) return nameWithFlag(v);
    return esc(v);
  };

  container.innerHTML = `
    <table>
      <thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>
        ${rows.map(r => `<tr>${headers.map(h =>
          `<td class="${!isFlagCol(h) && !isRunnerCol(h) && r[h] !== '' && !isNaN(r[h]) ? 'num' : ''}">${cell(r, h)}</td>`
        ).join('')}</tr>`).join('')}
      </tbody>
    </table>
  `;
}

// ======= BRACKET / CUADRO DE ELIMINACIÓN =======
// Se arma a partir de TOURNAMENT_CONFIG: numGroups * qualifiersPerGroup entrantes.
// Con datos (Sheet o mock) muestra nombres; sin datos, casilleros "1A / 2B".
function renderBracket() {
  const host = document.getElementById('bracket-container');
  if (!host) return;

  const G = TOURNAMENT_CONFIG.numGroups;
  const Q = TOURNAMENT_CONFIG.qualifiersPerGroup;
  const nEntrants = G * Q;
  if (nEntrants < 2) { host.innerHTML = `<p>${esc(t('brackets.placeholder'))}</p>`; return; }

  const size = 1 << Math.ceil(Math.log2(nEntrants));   // próxima potencia de 2
  const order = seedOrder(size);                        // orden de siembra 1..size

  // Etiqueta de cada semilla: 1..nEntrants -> "posº Grupo"; resto -> BYE
  const qualified = qualifiedFromData();                // {"A":["n1","n2"], ...} o null
  function seedLabel(seed) {
    if (seed > nEntrants) return { txt: t('bracket.bye'), bye: true };
    const pos = Math.floor((seed - 1) / G) + 1;         // 1 = ganador de grupo
    const letter = letterFor((seed - 1) % G);
    if (qualified && qualified[letter] && qualified[letter][pos - 1]) {
      const nm = qualified[letter][pos - 1];
      return { txt: nm, html: nameWithFlag(nm), bye: false };
    }
    return { txt: pos + (currentLang === 'en' ? '' : 'º') + ' ' + letter, bye: false, tag: pos + letter };
  }

  // Ronda 1: pares (order[0] vs order[1]), (order[2] vs order[3]), ...
  let matches = [];
  for (let i = 0; i < size; i += 2) {
    matches.push([seedLabel(order[i]), seedLabel(order[i + 1])]);
  }

  const rounds = [];
  let teams = size;
  let current = matches;
  while (true) {
    rounds.push({ name: roundName(teams), matches: current });
    if (current.length <= 1) break;
    teams = teams / 2;
    current = new Array(current.length / 2).fill(0).map(() => ([null, null]));
  }

  const html = [
    `<p class="section-note bracket-note">${esc(t('brackets.previewNote', { n: nEntrants }))}</p>`,
    `<div class="bracket-scroll"><div class="bracket" role="group" aria-label="${esc(t('brackets.title'))}">`,
  ];

  rounds.forEach((round, ri) => {
    html.push(`<div class="round" data-round="${ri}"><div class="round-title">${esc(round.name)}</div><div class="round-inner">`);
    round.matches.forEach(m => {
      const a = m[0], b = m[1];
      const slotHtml = x => x ? (x.html || esc(x.txt)) : esc(t('bracket.tbd'));
      html.push(`<div class="match">
        <span class="slot${a && a.bye ? ' is-bye' : ''}">${slotHtml(a)}</span>
        <span class="slot${b && b.bye ? ' is-bye' : ''}">${slotHtml(b)}</span>
      </div>`);
    });
    html.push(`</div></div>`);
  });

  // Columna del campeón
  html.push(`<div class="round round-champion"><div class="round-title">${esc(t('bracket.champion'))}</div><div class="round-inner">
    <div class="match match-champion"><span class="slot">${esc(t('bracket.tbd'))}</span></div>
  </div></div>`);

  html.push(`</div></div>`);
  host.innerHTML = html.join('');
}

// Orden de siembra estándar para un cuadro de `n` (potencia de 2).
function seedOrder(n) {
  let seeds = [1, 2];
  while (seeds.length < n) {
    const sum = seeds.length * 2 + 1;
    const next = [];
    seeds.forEach(s => { next.push(s); next.push(sum - s); });
    seeds = next;
  }
  return seeds;
}

// Nombre de ronda según cuántos entran a esa ronda
function roundName(teams) {
  if (teams === 2) return t('bracket.round.final');
  if (teams === 4) return t('bracket.round.semi');
  if (teams === 8) return t('bracket.round.quarter');
  if (teams === 16) return t('bracket.round.r16');
  if (teams === 32) return t('bracket.round.r32');
  return t('bracket.round.generic', { n: teams });
}

// Top Q de cada grupo, si hay datos cargados. Devuelve {"A":[...], ...} o null.
function qualifiedFromData() {
  const rows = lastStandingsRows;
  const Q = TOURNAMENT_CONFIG.qualifiersPerGroup;

  // 1) Si la clasificación trae Grupo + Corredor + (Pos), usar eso
  if (rows && rows.length) {
    const gCol = pickKey(rows[0], ['Grupo', 'Group']);
    const rCol = pickKey(rows[0], ['Corredor', 'Runner', 'Nombre']);
    if (gCol && rCol) {
      const by = {};
      rows.forEach(r => {
        const g = (r[gCol] || '').trim();
        const name = (r[rCol] || '').trim();
        if (!g || !name) return;
        (by[g] = by[g] || []).push(name);
      });
      const out = {};
      Object.keys(by).forEach(g => { out[g] = by[g].slice(0, Q); });
      if (Object.keys(out).length) return out;
    }
  }

  // 2) Si no, usar el orden de la hoja de grupos (primeros Q de cada grupo)
  const g = groupRows(lastGroupsRows);
  if (Object.keys(g).length) {
    const out = {};
    Object.keys(g).forEach(k => { out[k] = g[k].slice(0, Q); });
    return out;
  }
  return null;
}

function pickKey(obj, names) {
  for (const n of names) if (n in obj) return n;
  return null;
}

// ======= CAMPEONES / PAST CHAMPIONS =======
function renderChampions() {
  const host = document.getElementById('champions-content');
  if (!host) return;

  const podium = (labelKey, name, cls) => `
    <div class="podium-spot ${cls}">
      <div class="podium-medal" aria-hidden="true">${cls === 'gold' ? '🥇' : cls === 'silver' ? '🥈' : '🥉'}</div>
      <div class="podium-role">${esc(t(labelKey))}</div>
      <div class="podium-name">${name ? nameWithFlag(name) : '<span class="tbd">' + esc(t('champions.tbd')) + '</span>'}</div>
    </div>`;

  const editions = PAST_EDITIONS.map(e => `
    <article class="edition">
      <h3 class="edition-year">${esc(t('champions.edition', { year: e.year }))}</h3>
      <div class="podium">
        ${podium('champions.champion', e.champion, 'gold')}
        ${podium('champions.runnerUp', e.runnerUp, 'silver')}
        ${podium('champions.third', e.third, 'bronze')}
      </div>
      ${e.vod ? `<a class="edition-vod" href="${esc(e.vod)}" target="_blank" rel="noopener">${esc(t('champions.vod'))} ↗</a>` : ''}
    </article>`).join('');

  host.innerHTML = `
    <div class="trophy-card">
      <div class="trophy-emoji" aria-hidden="true">🏆</div>
      <div>
        <h3>${esc(t('champions.trophyTitle'))}</h3>
        <p>${esc(t('champions.trophyPending'))}</p>
      </div>
    </div>
    <div class="editions">${editions}</div>
  `;
}

// ======= CLIPS =======
function toEmbed(url) {
  try {
    const u = new URL(url);
    const host = location.hostname;
    if (/youtube\.com$/.test(u.hostname) && u.searchParams.get('v'))
      return 'https://www.youtube.com/embed/' + u.searchParams.get('v');
    if (u.hostname === 'youtu.be')
      return 'https://www.youtube.com/embed/' + u.pathname.slice(1);
    if (/youtube\.com$/.test(u.hostname) && u.pathname.startsWith('/embed/'))
      return url;
    if (u.hostname === 'clips.twitch.tv' && u.pathname.length > 1)
      return `https://clips.twitch.tv/embed?clip=${u.pathname.slice(1)}&parent=${host}`;
    const m = u.pathname.match(/\/clip\/([A-Za-z0-9_-]+)/);
    if (/twitch\.tv$/.test(u.hostname) && m)
      return `https://clips.twitch.tv/embed?clip=${m[1]}&parent=${host}`;
  } catch (e) {}
  return '';
}

function renderClips() {
  const host = document.getElementById('clips-grid');
  if (!host) return;
  if (!CLIPS.length) {
    host.innerHTML = `<p class="loading-msg">${esc(t('clips.empty'))}</p>`;
    return;
  }
  host.innerHTML = CLIPS.map(c => {
    const embed = toEmbed(c.url);
    const inner = embed
      ? `<div class="clip-frame"><iframe src="${esc(embed)}" allowfullscreen loading="lazy" title="${esc(c.title || 'clip')}"></iframe></div>`
      : `<a class="clip-frame clip-link" href="${esc(c.url)}" target="_blank" rel="noopener">▶ ${esc(t('champions.vod'))}</a>`;
    return `<figure class="clip">${inner}<figcaption>${esc(c.title || '')}${c.author ? ` · <span class="clip-author">${esc(c.author)}</span>` : ''}</figcaption></figure>`;
  }).join('');
}

// ======= EN VIVO / LIVE (RE4 runners) =======
async function renderLive() {
  const host = document.getElementById('live-grid');
  if (!host) return;
  const channels = RE4_LIVE_CHANNELS.filter(Boolean);
  if (!channels.length) { host.innerHTML = `<p class="loading-msg">${esc(t('live.none'))}</p>`; return; }

  host.innerHTML = `<p class="loading-msg">${esc(t('live.checking'))}</p>`;
  const parent = location.hostname;

  const results = await Promise.all(channels.map(async ch => {
    try {
      const r = await fetch('https://decapi.me/twitch/uptime/' + encodeURIComponent(ch), { cache: 'no-store' });
      const txt = (await r.text()).trim().toLowerCase();
      const live = r.ok && !/offline|not found|error|unable/.test(txt);
      return { ch, live };
    } catch (e) { return { ch, live: false }; }
  }));

  results.sort((a, b) => (b.live - a.live) || a.ch.localeCompare(b.ch));
  const anyLive = results.some(x => x.live);

  host.innerHTML = (anyLive ? '' : `<p class="loading-msg">${esc(t('live.none'))}</p>`) + results.map(({ ch, live }) => live
    ? `<div class="live-card is-live">
         <div class="live-frame"><iframe src="https://player.twitch.tv/?channel=${encodeURIComponent(ch)}&parent=${parent}&muted=true" allowfullscreen title="${esc(ch)}"></iframe></div>
         <div class="live-meta"><span class="live-badge">● ${esc(t('live.on'))}</span> <a href="https://twitch.tv/${encodeURIComponent(ch)}" target="_blank" rel="noopener">${esc(ch)}</a></div>
       </div>`
    : `<a class="live-card is-off" href="https://twitch.tv/${encodeURIComponent(ch)}" target="_blank" rel="noopener">
         <span class="live-name">${esc(ch)}</span><span class="live-status">${esc(t('live.off'))}</span>
       </a>`).join('');
}

// ======= DATOS FALSOS / MOCK DATA =======
const MOCK_NAMES = [
  'ditman', 'kael', 'v1rus', 'Noh', 'requiem', 'SlyFox', 'mercase', 'Trece',
  'Ada_W', 'Krauser', 'luisdlv', 'saddler99', 'ashley', 'wesk3r', 'HUNK', 'Salazar',
  'chris_r', 'jillsandwich', 'nemesis', 'carlos', 'sherry', 'claire', 'birkin', 'annette',
  'leon_k', 'ganado', 'plaga', 'verdugo', 'delLago', 'elGigante', 'novistador', 'regenerador',
];

function mockGroupsRows() {
  const G = TOURNAMENT_CONFIG.numGroups;
  const S = TOURNAMENT_CONFIG.groupSize;
  const rows = [];
  let k = 0;
  for (let g = 0; g < G; g++) {
    for (let i = 0; i < S; i++) {
      rows.push({ Grupo: letterFor(g), Corredor: MOCK_NAMES[k % MOCK_NAMES.length] });
      k++;
    }
  }
  return rows;
}

function mockStandingsRows() {
  const rows = mockGroupsRows();
  const groups = groupRows(rows);
  const out = [];
  Object.keys(groups).sort().forEach(g => {
    groups[g].forEach((name, i) => {
      out.push({
        [t('clas.col.pos')]: String(i + 1),
        [t('clas.col.runner')]: name,
        [t('clas.col.group')]: g,
        [t('clas.col.time')]: mockTime(),
        [t('clas.col.pts')]: String(9 - i * 2),
      });
    });
  });
  return out;
}

function mockTime() {
  const m = 5 + Math.floor(Math.random() * 3);
  const s = Math.floor(Math.random() * 60);
  const ms = Math.floor(Math.random() * 1000);
  return `${m}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

// ======= CSV: fetch + parseo robusto / robust parsing =======
// Soporta: comas dentro de comillas, comillas escapadas (""), CRLF, BOM,
// líneas vacías y salto final. / Handles quoted commas, "" escapes, CRLF, BOM, blank lines.
function parseCSV(text) {
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);   // BOM
  const rows = [];
  let row = [], field = '', inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); rows.push(row); row = []; field = '';
    } else if (c !== '\r') {
      field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function csvToObjects(text) {
  const rows = parseCSV(text).filter(r => r.some(c => c.trim() !== ''));  // sin filas vacías
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1).map(r => {
    const o = {};
    headers.forEach((h, i) => { o[h] = (r[i] != null ? r[i] : '').trim(); });
    return o;
  });
}

async function fetchCSV(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Sheet HTTP ' + res.status);
  return csvToObjects(await res.text());
}

// ======= UTILIDADES / UTILITIES =======
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
