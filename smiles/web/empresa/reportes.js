// ════════════════════════════════════════════════════════════════════
// reportes.js — TypingWii · Empresa · Analítica
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './reportes.css';
import $ from 'jquery';
import { getls, Notificacion } from '../../widev.js';
import { db } from '../firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

const wi = () => getls('wiSmile');

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="rp_page"><div class="rp_empty"><i class="fas fa-lock"></i><p>Sin sesión corporativa.</p></div></div>`;

  return `
  <div class="rp_page">

    <!-- HERO CORPORATIVO PRO -->
    <div class="rp_hero">
      <div class="rp_hero_left">
        <div class="rp_hero_icon"><i class="fas fa-chart-pie"></i></div>
        <div class="rp_hero_txt">
          <div class="rp_badge"><i class="fas fa-building"></i> Analítica Empresarial</div>
          <h1 class="rp_hero_title">Reportes de Rendimiento</h1>
          <p class="rp_hero_sub">Visualiza el impacto del entrenamiento en tiempo real.</p>
        </div>
      </div>
      <div class="rp_hero_actions">
        <button class="rp_btn_export" id="rp_btn_exportar">
          <i class="fas fa-file-csv"></i> Descargar CSV
        </button>
      </div>
    </div>

    <!-- MAIN DASHBOARD (Manejado por JS) -->
    <div id="rp_dashboard">
      <div class="rp_empty" style="padding:15vh 0"><i class="fas fa-spinner fa-spin"></i><p>Procesando métricas...</p></div>
    </div>

  </div>`;
};

// ── ESTADO ────────────────────────────────────────────────────────────────────
let _empleados = [];
let _equipos   = [];

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;

  $(document).off('.rp');
  await _cargarDatos(u);

  // Exportar CSV
  $(document).on('click.rp', '#rp_btn_exportar', () => _exportarCSV());
};

export const cleanup = () => {
  $(document).off('.rp');
};

// ── DATOS ─────────────────────────────────────────────────────────────────────
async function _cargarDatos(u) {
  try {
    let snap = await getDocs(query(collection(db, 'lecciones'), where('empresa_id', '==', u.usuario)));
    if (snap.empty) snap = await getDocs(query(collection(db, 'lecciones'), where('gestor_id', '==', u.usuario)));
    _empleados = snap.docs.map(d => ({ usuario: d.id, ...d.data() }));

    let snapEq = await getDocs(query(collection(db, 'clases'), where('empresa_id', '==', u.usuario)));
    if (snapEq.empty) snapEq = await getDocs(query(collection(db, 'clases'), where('gestor_id', '==', u.usuario)));
    _equipos = snapEq.docs.map(d => ({ id: d.id, ...d.data() }));

    _renderDashboard();
  } catch (err) {
    console.error('[reportes] Error:', err);
    $('#rp_dashboard').html('<div class="rp_empty"><i class="fas fa-exclamation-triangle"></i><p>Error procesando datos analíticos.</p></div>');
  }
}

// ── CONSTRUIR DASHBOARD ───────────────────────────────────────────────────────
function _renderDashboard() {
  const tot = _empleados.length;
  if (!tot) {
    $('#rp_dashboard').html(`
      <div class="rp_empty">
        <i class="fas fa-chart-bar"></i><p>No hay datos suficientes para generar reportes.</p>
        <small>Agrega colaboradores a tu panel.</small>
      </div>`);
    return;
  }

  // 1. KPIs Globales
  const activos   = _empleados.filter(e => (e.completadas?.length || 0) > 0);
  const wpms      = activos.map(e => e.wpmMax || 0);
  const precs     = activos.map(e => e.precision || 0);
  const avgWpm    = activos.length ? Math.round(wpms.reduce((a,b)=>a+b,0) / activos.length) : 0;
  const avgPrec   = activos.length ? Math.round(precs.reduce((a,b)=>a+b,0) / activos.length) : 0;
  const totalLecs = activos.reduce((a, e) => a + (e.completadas?.length || 0), 0);

  // 2. Rendimiento por Departamento (Agrupando por clase_id)
  const depMap = {};
  activos.forEach(e => {
    const dId = e.equipo_id || e.clase_id || e.claseId || 'General';
    if (!depMap[dId]) depMap[dId] = { wpm:0, c:0 };
    depMap[dId].wpm += (e.wpmMax || 0);
    depMap[dId].c++;
  });
  
  const deps = Object.keys(depMap).map(k => ({
    nombre: k, avg: Math.round(depMap[k].wpm / depMap[k].c)
  })).sort((a,b) => b.avg - a.avg).slice(0, 5); // Top 5 dep

  const maxDepAvg = deps.length ? Math.max(...deps.map(d => d.avg)) : 1;
  const coloresDep = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  const depsHtml = deps.length ? deps.map((d, i) => {
    const pct = Math.round((d.avg / maxDepAvg) * 100);
    const col = coloresDep[i % coloresDep.length];
    return `
      <div class="rp_bar_row">
        <div class="rp_bar_info"><span>${d.nombre}</span> <span class="rp_bar_val" style="color:${col}">${d.avg} WPM</span></div>
        <div class="rp_bar_track"><div class="rp_bar_fill" style="width:${pct}%;background:linear-gradient(90deg, ${col}, color-mix(in srgb, ${col} 60%, transparent))"></div></div>
      </div>`;
  }).join('') : '<div class="rp_empty" style="padding:2vh"><p>Sin actividad registrada</p></div>';

  // 3. Top Talent (Mejores 5)
  const topTalent = [...activos].sort((a,b) => (b.wpmMax || 0) - (a.wpmMax || 0)).slice(0, 5);
  const topHtml = topTalent.length ? topTalent.map((e, i) => {
    let medalla = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    const pos = medalla ? '' : i + 1;
    return `
      <div class="rp_rank_item">
        <div class="rp_rank_pos ${medalla}">${medalla ? '<i class="fas fa-medal"></i>' : pos}</div>
        <div class="rp_rank_info">
          <div class="rp_rank_nom">${e.nombre || e.usuario}</div>
          <div class="rp_rank_meta">${e.equipo_id || e.clase_id || e.claseId || 'General'}</div>
        </div>
        <div class="rp_rank_stat">${e.wpmMax || 0} WPM</div>
      </div>`;
  }).join('') : '<div class="rp_empty" style="padding:2vh"><p>Sin actividad registrada</p></div>';


  // RENDER FINAL
  $('#rp_dashboard').html(`
    
    <!-- KPIs -->
    <div class="rp_kpi_grid" style="margin-bottom:3vh">
      <div class="rp_kpi_card" style="--kc:#0ea5e9">
        <div class="rp_kpi_icon"><i class="fas fa-users"></i></div>
        <div class="rp_kpi_val">${tot}</div>
        <div class="rp_kpi_lbl">Total Colaboradores</div>
      </div>
      <div class="rp_kpi_card" style="--kc:#f59e0b">
        <div class="rp_kpi_icon"><i class="fas fa-bolt"></i></div>
        <div class="rp_kpi_val">${avgWpm}</div>
        <div class="rp_kpi_lbl">WPM Promedio</div>
      </div>
      <div class="rp_kpi_card" style="--kc:#22c55e">
        <div class="rp_kpi_icon"><i class="fas fa-bullseye"></i></div>
        <div class="rp_kpi_val">${avgPrec}%</div>
        <div class="rp_kpi_lbl">Precisión Media</div>
      </div>
      <div class="rp_kpi_card" style="--kc:#8b5cf6">
        <div class="rp_kpi_icon"><i class="fas fa-check-circle"></i></div>
        <div class="rp_kpi_val">${totalLecs}</div>
        <div class="rp_kpi_lbl">Lecciones Completadas</div>
      </div>
    </div>

    <!-- CHARTS -->
    <div class="rp_dash_grid">
      
      <!-- Chart: Velocidad por Equipo -->
      <div class="rp_panel">
        <div class="rp_panel_hdr">
          <h2 class="rp_panel_title"><i class="fas fa-chart-bar"></i> Rendimiento por Departamento</h2>
        </div>
        <div class="rp_bars">${depsHtml}</div>
      </div>

      <!-- Ranking: Top Talent -->
      <div class="rp_panel">
        <div class="rp_panel_hdr">
          <h2 class="rp_panel_title"><i class="fas fa-crown"></i> Top Talent (WPM)</h2>
        </div>
        <div class="rp_rank_list">${topHtml}</div>
      </div>

    </div>
  `);
}

// ── EXPORTACIÓN CSV ───────────────────────────────────────────────────────────
function _exportarCSV() {
  if (!_empleados.length) { Notificacion('No hay datos para exportar', 'warning'); return; }
  
  const headers = ['Usuario', 'Nombre', 'Email', 'Departamento', 'Lecciones_Completadas', 'WPM_Max', 'Precision'];
  const rows = _empleados.map(e => [
    e.usuario,
    e.nombre || '',
    e.email || '',
    e.equipo_id || e.clase_id || e.claseId || 'General',
    e.completadas?.length || 0,
    e.wpmMax || 0,
    e.precision || 0
  ]);

  const csvContent = "data:text/csv;charset=utf-8," 
    + [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Reporte_TypingWii_${new Date().getTime()}.csv`);
  document.body.appendChild(link); 
  link.click();
  document.body.removeChild(link);

  Notificacion('Reporte exportado exitosamente', 'success');
}
