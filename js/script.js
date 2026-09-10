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
};

// ======= FUENTES DE DATOS (Google Sheets) / DATA SOURCES =======
// Pegar acá el link de "Publicar en la web -> CSV" de cada hoja.
const SHEET_URLS = {
  groups: '',    // columnas: Grupo, Corredor
  standings: '', // clasificación / placements
};

// ======= TEXTOS BILINGÜES / BILINGUAL STRINGS =======
const I18N = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.sorteo': 'Sorteo',
    'nav.grupos': 'Grupos',
    'nav.brackets': 'Brackets',
    'nav.clasificatorias': 'Clasificatorias',
    'nav.donaciones': 'Donaciones',
    'nav.organizadores': 'Organizadores',
    'nav.menu': 'Abrir menú',

    'hero.subtitle': 'Torneo comunitario de speedrunning, formato copa del mundo.',

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

    'clas.title': 'Clasificatorias y placements',
    'clas.empty': 'Todavía no hay clasificación cargada.',
    'clas.sheetError': 'No se pudo cargar la Sheet de clasificación.',
    'clas.noData': 'Sin datos todavía.',

    'don.title': 'Donaciones',
    'don.body': 'La Ditman Cup se sostiene gracias a la comunidad. Si querés colaborar con los premios y los gastos del torneo, podés hacerlo acá:',
    'don.btn': 'Donar',

    'org.title': 'Organizadores',
    'org.tbd': 'Por definir',
    'org.role.org': 'Organización',
    'org.role.cast': 'Casting',
    'org.role.web': 'Diseño / Web',

    'footer.text': 'Ditman Cup 2027 · Hecho por la comunidad',
  },
  en: {
    'nav.inicio': 'Home',
    'nav.sorteo': 'Draw',
    'nav.grupos': 'Groups',
    'nav.brackets': 'Bracket',
    'nav.clasificatorias': 'Standings',
    'nav.donaciones': 'Donations',
    'nav.organizadores': 'Organizers',
    'nav.menu': 'Open menu',

    'hero.subtitle': 'Community speedrunning tournament, World Cup format.',

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

    'clas.title': 'Standings & placements',
    'clas.empty': 'No standings loaded yet.',
    'clas.sheetError': 'Could not load the standings Sheet.',
    'clas.noData': 'No data yet.',

    'don.title': 'Donations',
    'don.body': 'The Ditman Cup runs on community support. If you want to chip in for the prize pool and tournament costs, you can do it here:',
    'don.btn': 'Donate',

    'org.title': 'Organizers',
    'org.tbd': 'TBD',
    'org.role.org': 'Organization',
    'org.role.cast': 'Casting',
    'org.role.web': 'Design / Web',

    'footer.text': 'Ditman Cup 2027 · Made by the community',
  },
};

// Estado en memoria para poder re-renderizar al cambiar de idioma
let currentLang = 'es';
let lastGroupsRows = null;
let lastStandingsRows = null;

function t(key) {
  const dict = I18N[currentLang] || I18N.es;
  return dict[key] != null ? dict[key] : (I18N.es[key] != null ? I18N.es[key] : key);
}

// Escape básico para texto que viene de la Sheet (evita romper el HTML)
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initTabs();
  initFacts();
  initCountdown();
  loadGroups();
  loadStandings();
});

// ======= IDIOMA / LANGUAGE =======
function initLang() {
  const saved = safeGet('dc-lang');
  const guess = (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  applyLang(saved === 'en' || saved === 'es' ? saved : guess);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

function applyLang(lang) {
  currentLang = I18N[lang] ? lang : 'es';
  document.documentElement.lang = currentLang;

  // Nodos de texto
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
  if (lastGroupsRows) renderGroups(lastGroupsRows, document.getElementById('groups-grid'));
  else document.getElementById('groups-grid').innerHTML = placeholderGroups();
  if (lastStandingsRows) renderStandings(lastStandingsRows, document.getElementById('standings-table'));
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
  if (!SHEET_URLS.groups) {
    container.innerHTML = placeholderGroups();
    return;
  }
  try {
    const rows = await fetchCSV(SHEET_URLS.groups);
    lastGroupsRows = rows;
    renderGroups(rows, container);
  } catch (err) {
    console.error('Error cargando grupos:', err);
    container.innerHTML = '<p class="loading-msg">' + esc(t('grupos.sheetError')) + '</p>' + placeholderGroups();
  }
}

function placeholderGroups() {
  let html = '';
  for (let g = 0; g < TOURNAMENT_CONFIG.numGroups; g++) {
    const letter = String.fromCharCode(65 + g);
    html += `<div class="group-card"><h3>${esc(t('group.word'))} ${letter}</h3><ol>`;
    for (let i = 0; i < TOURNAMENT_CONFIG.groupSize; i++) {
      html += `<li>${esc(t('group.tbd'))}</li>`;
    }
    html += `</ol></div>`;
  }
  return html;
}

// Espera columnas en la Sheet: Grupo, Corredor (una fila por corredor)
function renderGroups(rows, container) {
  const groups = {};
  rows.forEach(r => {
    const g = r['Grupo'] || r['Group'];
    const name = r['Corredor'] || r['Runner'] || r['Nombre'];
    if (!g || !name) return;
    if (!groups[g]) groups[g] = [];
    groups[g].push(name);
  });

  const keys = Object.keys(groups).sort();
  if (!keys.length) {
    container.innerHTML = placeholderGroups();
    return;
  }

  container.innerHTML = keys.map(g => `
    <div class="group-card">
      <h3>${esc(t('group.word'))} ${esc(g)}</h3>
      <ol>${groups[g].map(n => `<li>${esc(n)}</li>`).join('')}</ol>
    </div>
  `).join('');
}

// ======= CLASIFICACIÓN / STANDINGS =======
async function loadStandings() {
  const container = document.getElementById('standings-table');
  if (!SHEET_URLS.standings) return; // se queda con el mensaje por defecto del HTML
  try {
    const rows = await fetchCSV(SHEET_URLS.standings);
    lastStandingsRows = rows;
    renderStandings(rows, container);
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
  container.innerHTML = `
    <table>
      <thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>
        ${rows.map(r => `<tr>${headers.map(h => `<td class="${isNaN(r[h]) || r[h] === '' ? '' : 'num'}">${esc(r[h])}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  `;
}

// ======= UTILIDADES / UTILITIES =======
// Parser simple de CSV. Nota: no soporta comas dentro de campos entre comillas.
// (Se robustece en un paso siguiente del review.)
async function fetchCSV(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('No se pudo obtener la Sheet');
  const text = await res.text();
  const lines = text.trim().split('\n').map(l => l.split(','));
  const headers = lines[0].map(h => h.trim());
  return lines.slice(1).map(line => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = (line[i] || '').trim());
    return obj;
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
