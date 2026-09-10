// ======= CONFIGURACIÓN DEL TORNEO =======
// Cambiá estos valores cuando se definan los números finales.
const TOURNAMENT_CONFIG = {
  totalRunners: 24,
  numGroups: 6,
  groupSize: 4,
  qualifiersPerGroup: 3,
};

// ======= FUENTES DE DATOS (Google Sheets) =======
// Pegar acá el link de "Publicar en la web -> CSV" de cada hoja.
// Instrucciones completas en el README.
const SHEET_URLS = {
  groups: '',    // hoja con columnas: Grupo, Corredor
  standings: '', // hoja de clasificación / placements
};

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initFacts();
  loadGroups();
  loadStandings();
});

// --- Navegación por pestañas ---
function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  const toggle = document.getElementById('nav-toggle');
  const tabs = document.getElementById('tabs');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
      tabs.classList.remove('open');
    });
  });

  toggle.addEventListener('click', () => tabs.classList.toggle('open'));
}

// --- Números del hero (Inicio) ---
function initFacts() {
  document.getElementById('fact-runners').textContent = TOURNAMENT_CONFIG.totalRunners;
  document.getElementById('fact-groups').textContent = TOURNAMENT_CONFIG.numGroups;
  document.getElementById('fact-qualify').textContent = TOURNAMENT_CONFIG.qualifiersPerGroup;
}

// --- Carga de grupos desde la Sheet ---
async function loadGroups() {
  const container = document.getElementById('groups-grid');
  if (!SHEET_URLS.groups) {
    container.innerHTML = placeholderGroups();
    return;
  }
  try {
    const rows = await fetchCSV(SHEET_URLS.groups);
    renderGroups(rows, container);
  } catch (err) {
    console.error('Error cargando grupos:', err);
    container.innerHTML = '<p class="loading-msg">No se pudo cargar la Sheet. Mostrando datos de ejemplo.</p>' + placeholderGroups();
  }
}

function placeholderGroups() {
  let html = '';
  for (let g = 0; g < TOURNAMENT_CONFIG.numGroups; g++) {
    const letter = String.fromCharCode(65 + g);
    html += `<div class="group-card"><h3>Grupo ${letter}</h3><ol>`;
    for (let i = 0; i < TOURNAMENT_CONFIG.groupSize; i++) {
      html += `<li>Por definir</li>`;
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

  container.innerHTML = Object.keys(groups).sort().map(g => `
    <div class="group-card">
      <h3>Grupo ${g}</h3>
      <ol>${groups[g].map(n => `<li>${n}</li>`).join('')}</ol>
    </div>
  `).join('');
}

// --- Carga de clasificación desde la Sheet ---
async function loadStandings() {
  const container = document.getElementById('standings-table');
  if (!SHEET_URLS.standings) return; // se queda con el mensaje por defecto del HTML
  try {
    const rows = await fetchCSV(SHEET_URLS.standings);
    renderStandings(rows, container);
  } catch (err) {
    console.error('Error cargando clasificación:', err);
    container.innerHTML = '<p class="loading-msg">No se pudo cargar la Sheet de clasificación.</p>';
  }
}

function renderStandings(rows, container) {
  if (!rows.length) {
    container.innerHTML = '<p class="loading-msg">Sin datos todavía.</p>';
    return;
  }
  const headers = Object.keys(rows[0]);
  container.innerHTML = `
    <table>
      <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>
        ${rows.map(r => `<tr>${headers.map(h => `<td class="${isNaN(r[h]) ? '' : 'num'}">${r[h]}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  `;
}

// --- Utilidad: fetch + parseo simple de CSV ---
// Nota: este parser simple no soporta comas dentro de un campo entre comillas.
// Si algún nombre/columna tiene comas, conviene sumar PapaParse vía CDN más adelante.
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
