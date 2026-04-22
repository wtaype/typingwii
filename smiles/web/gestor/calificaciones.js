// ════════════════════════════════════════════════════════════════════
// calificaciones.js — TypingWii · Gestor · Calificaciones
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './calificaciones.css';
import $ from 'jquery';
import { getls, avatar } from '../../widev.js';
import { db } from '../firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

const wi = () => getls('wiSmile');

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="cl_page"><div class="cl_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;

  return `
  <div class="cl_page">

    <!-- HERO -->
    <div class="cl_hero">
      <div class="cl_hero_orb"></div>
      <div class="cl_hero_left">
        <div class="cl_hero_badge"><i class="fas fa-chart-bar"></i> Calificaciones</div>
        <h1 class="cl_hero_title">Ranking <span>Académico</span></h1>
        <p class="cl_hero_sub">Visualiza el rendimiento global y el podio de tus estudiantes según su velocidad, precisión o avance.</p>
      </div>
      <div class="cl_hero_actions">
        <select id="cl_sel_clase" class="cl_select">
          <option value="all">Cargando clases...</option>
        </select>
      </div>
    </div>

    <!-- KPIs -->
    <div class="cl_kpis_row">
      <div class="cl_kpi">
        <div class="cl_kpi_ico" style="color:var(--mco)"><i class="fas fa-users"></i></div>
        <div class="cl_kpi_val" id="cl_k_total">—</div>
        <div class="cl_kpi_lbl">Total Alumnos</div>
      </div>
      <div class="cl_kpi">
        <div class="cl_kpi_ico" style="color:#f59e0b"><i class="fas fa-bolt"></i></div>
        <div class="cl_kpi_val" id="cl_k_wpm">—</div>
        <div class="cl_kpi_lbl">WPM Promedio</div>
      </div>
      <div class="cl_kpi">
        <div class="cl_kpi_ico" style="color:#22c55e"><i class="fas fa-bullseye"></i></div>
        <div class="cl_kpi_val" id="cl_k_prec">—</div>
        <div class="cl_kpi_lbl">Precisión Prom.</div>
      </div>
      <div class="cl_kpi">
        <div class="cl_kpi_ico" style="color:#ec4899"><i class="fas fa-crown"></i></div>
        <div class="cl_kpi_val" id="cl_k_top">—</div>
        <div class="cl_kpi_lbl">Top WPM</div>
      </div>
    </div>

    <!-- FILTROS ORDEN -->
    <div class="cl_filtros" id="cl_filtros">
      <button class="cl_filtro active" data-ord="wpm">Mejor WPM</button>
      <button class="cl_filtro" data-ord="lec">Más Lecciones</button>
      <button class="cl_filtro" data-ord="prec">Mejor Precisión</button>
    </div>

    <!-- LISTA RANKING -->
    <div class="cl_ranking_wrap">
      <div id="cl_ranking" class="cl_ranking_list">
        <div class="cl_loading"><div class="cl_spinner"></div> Calculando ranking...</div>
      </div>
    </div>

  </div>`;
};

// ── ESTADO ────────────────────────────────────────────────────────────────────
let _alumnos = [];
let _clases  = [];

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;

  $(document).off('.cl');
  await _cargarDatos(u);

  // Cambio de clase
  $(document).on('change.cl', '#cl_sel_clase', () => _renderRanking());

  // Cambio de orden
  $(document).on('click.cl', '.cl_filtro', function () {
    $('.cl_filtro').removeClass('active');
    $(this).addClass('active');
    _renderRanking();
  });
};

export const cleanup = () => {
  $(document).off('.cl');
};

// ── CARGAR DATOS ──────────────────────────────────────────────────────────────
async function _cargarDatos(u) {
  try {
    // Clases
    let snapCl = await getDocs(query(collection(db, 'clases'), where('gestor_id', '==', u.usuario)));
    if (snapCl.empty) snapCl = await getDocs(query(collection(db, 'clases'), where('gestorId', '==', u.usuario)));
    _clases = snapCl.docs.map(d => ({ id: d.id, ...d.data() }));

    const optClases = _clases.map(c => `<option value="${c.id}">${c.id} - ${c.nombre}</option>`).join('');
    $('#cl_sel_clase').html(`<option value="all">Todas mis clases</option>${optClases}`);

    // Alumnos (lecciones)
    let snapAl = await getDocs(query(collection(db, 'lecciones'), where('gestor_id', '==', u.usuario)));
    if (snapAl.empty) snapAl = await getDocs(query(collection(db, 'lecciones'), where('gestorId', '==', u.usuario)));
    
    _alumnos = snapAl.docs.map(d => ({
      usuario: d.id,
      ...d.data(),
      // Pre-calcular
      wpm: d.data().wpmMax || 0,
      prec: d.data().precision || 0,
      lecs: d.data().completadas?.length || 0
    }));

    _renderRanking();
  } catch (err) {
    console.error('[calificaciones] Error:', err);
    $('#cl_ranking').html('<div class="cl_empty"><i class="fas fa-exclamation-triangle"></i><p>Error cargando datos.</p></div>');
  }
}

// ── RENDER ────────────────────────────────────────────────────────────────────
function _renderRanking() {
  const claseId = $('#cl_sel_clase').val();
  const ord     = $('.cl_filtro.active').data('ord');

  // Filtrar por clase
  let lista = _alumnos;
  if (claseId !== 'all') {
    lista = lista.filter(a => a.clase_id === claseId || a.claseId === claseId);
  }

  // KPIs
  const total = lista.length;
  if (!total) {
    $('#cl_k_total').text(0);
    $('#cl_k_wpm').text('—');
    $('#cl_k_prec').text('—');
    $('#cl_k_top').text('—');
    $('#cl_ranking').html('<div class="cl_empty"><i class="fas fa-chart-line"></i><p>No hay alumnos en esta clase.</p></div>');
    return;
  }

  const avgWpm  = Math.round(lista.reduce((s, a) => s + a.wpm, 0) / total);
  const avgPrec = Math.round(lista.reduce((s, a) => s + a.prec, 0) / total);
  const topWpm  = Math.max(...lista.map(a => a.wpm), 0);

  $('#cl_k_total').text(total);
  $('#cl_k_wpm').text(avgWpm || '—');
  $('#cl_k_prec').text(avgPrec ? avgPrec + '%' : '—');
  $('#cl_k_top').text(topWpm || '—');

  // Ordenar
  lista.sort((a, b) => {
    if (ord === 'wpm')  return b.wpm - a.wpm;
    if (ord === 'lec')  return b.lecs - a.lecs;
    if (ord === 'prec') return b.prec - a.prec;
    return 0;
  });

  // Render lista con podio
  const podioColores = ['#f59e0b', '#94a3b8', '#b45309']; // Oro, plata, bronce
  
  const html = lista.map((al, idx) => {
    const isPodio = idx < 3;
    const pColor  = isPodio ? podioColores[idx] : 'transparent';
    const nom     = al.nombre || al.usuario || '—';
    const pct     = Math.round((al.lecs / 45) * 100);

    return `
      <div class="cl_rank_row ${isPodio ? 'podio' : ''}" style="--pc:${pColor}">
        <div class="cl_rank_pos ${isPodio ? 'top' : ''}" style="${isPodio ? `color:${pColor}` : ''}">
          ${isPodio ? `<i class="fas fa-${idx === 0 ? 'trophy' : 'medal'}"></i>` : idx + 1}
        </div>
        <div class="cl_rank_av" style="${isPodio ? `border-color:${pColor}` : ''}">${avatar(nom)}</div>
        <div class="cl_rank_info">
          <div class="cl_rank_nombre">${nom}</div>
          <div class="cl_rank_meta">
            ${claseId === 'all' && (al.clase_id || al.claseId) ? `<span><i class="fas fa-chalkboard"></i> ${al.clase_id || al.claseId}</span>` : ''}
            <span>${al.email || al.usuario}</span>
          </div>
        </div>
        <div class="cl_rank_prog">
          <div class="cl_prog_bar"><div class="cl_prog_fill" style="width:${pct}%"></div></div>
          <span>${al.lecs}/45</span>
        </div>
        <div class="cl_rank_stats">
          <div class="cl_rs"><div class="cl_rs_val" style="color:#f59e0b">${al.wpm}</div><div class="cl_rs_lbl">WPM</div></div>
          <div class="cl_rs"><div class="cl_rs_val" style="color:#22c55e">${al.prec}%</div><div class="cl_rs_lbl">Prec</div></div>
        </div>
      </div>`;
  }).join('');

  $('#cl_ranking').html(html);
}
