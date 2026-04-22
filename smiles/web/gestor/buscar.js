// ════════════════════════════════════════════════════════════════════
// buscar.js — TypingWii · Gestor · Buscar Alumno
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './buscar.css';
import $ from 'jquery';
import { getls, Notificacion, avatar, formatearFechaHora } from '../../widev.js';
import { db } from '../firebase.js';
import {
  collection, query, where, getDocs,
  doc, getDoc, orderBy, limit
} from 'firebase/firestore';

const wi = () => getls('wiSmile');

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="bq_page"><div class="bq_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;

  return `
  <div class="bq_page">

    <!-- HERO -->
    <div class="bq_hero">
      <div class="bq_hero_orb"></div>
      <div class="bq_hero_left">
        <div class="bq_hero_badge"><i class="fas fa-search"></i> Buscar</div>
        <h1 class="bq_hero_title">Buscar <span>Alumno</span></h1>
        <p class="bq_hero_sub">Encuentra cualquier estudiante por nombre, usuario o email y consulta su progreso completo.</p>
      </div>
    </div>

    <!-- BUSCADOR PRINCIPAL -->
    <div class="bq_search_card">
      <div class="bq_search_row">
        <div class="bq_search_ico"><i class="fas fa-search"></i></div>
        <input id="bq_input" class="bq_search_input" type="text"
          placeholder="Nombre, usuario o email del alumno..."
          autocomplete="off" autocorrect="off" spellcheck="false">
        <button class="bq_search_btn" id="bq_btn_buscar">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <div class="bq_search_tips">
        <span><i class="fas fa-lightbulb"></i> Escribe mínimo 3 caracteres</span>
        <span>·</span>
        <span>Busca por <b>nombre</b>, <b>usuario</b> o <b>email</b></span>
      </div>
    </div>

    <!-- RESULTADOS -->
    <div id="bq_resultados" class="bq_resultados" style="display:none"></div>

    <!-- DETALLE ALUMNO -->
    <div id="bq_detalle" class="bq_detalle" style="display:none"></div>

  </div>`;
};

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = () => {
  const u = wi();
  if (!u) return;
  $(document).off('.bq');

  let _debounceT = null;

  // Si viene desde gestor feed
  const initTerm = getls('gsBuscarTerm');
  if (initTerm) {
    $('#bq_input').val(initTerm);
    _buscar(initTerm, u);
    localStorage.removeItem('gsBuscarTerm');
  }

  // Búsqueda al escribir (debounce 500ms)
  $(document).on('input.bq', '#bq_input', function () {
    clearTimeout(_debounceT);
    const q = $(this).val().trim();
    if (q.length < 3) {
      $('#bq_resultados, #bq_detalle').hide().html('');
      return;
    }
    _debounceT = setTimeout(() => _buscar(q, u), 500);
  });

  // Buscar al presionar Enter
  $(document).on('keydown.bq', '#bq_input', function (e) {
    if (e.key === 'Enter') {
      const q = $(this).val().trim();
      if (q.length >= 3) _buscar(q, u);
    }
  });

  // Click botón buscar
  $(document).on('click.bq', '#bq_btn_buscar', function () {
    const q = $('#bq_input').val().trim();
    if (q.length >= 3) _buscar(q, u);
  });

  // Click resultado → ver detalle
  $(document).on('click.bq', '.bq_result_row', function () {
    const usuario = $(this).data('usuario');
    _verDetalle(usuario, u);
  });

  // Ir a clase del alumno
  $(document).on('click.bq', '.bq_btn_ir_clase', function () {
    const claseId = $(this).data('id');
    if (!claseId) return;
    const { savels } = getls;
    import('../../widev.js').then(({ savels: sl }) => sl('gsClaseActiva', claseId, 1));
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate('/alumnos'));
  });
};

export const cleanup = () => {
  $(document).off('.bq');
};

// ── BUSCAR EN FIRESTORE ───────────────────────────────────────────────────────
async function _buscar(termino, u) {
  const $res = $('#bq_resultados').show().html(`
    <div class="bq_loading"><div class="bq_spinner"></div> Buscando...</div>`);
  $('#bq_detalle').hide().html('');

  try {
    const term = termino.toLowerCase();

    // Obtener lecciones del gestor actual
    let snap = await getDocs(query(collection(db, 'lecciones'), where('gestor_id', '==', u.usuario)));
    if (snap.empty) snap = await getDocs(query(collection(db, 'lecciones'), where('gestorId', '==', u.usuario)));

    const todos = snap.docs.map(d => ({ usuario: d.id, ...d.data() }));

    // Filtrar localmente por término
    const res = todos.filter(a => {
      const nom = (a.nombre   || '').toLowerCase();
      const usr = (a.usuario  || '').toLowerCase();
      const eml = (a.email    || '').toLowerCase();
      return nom.includes(term) || usr.includes(term) || eml.includes(term);
    });

    if (!res.length) {
      $res.html(`
        <div class="bq_empty">
          <i class="fas fa-user-slash"></i>
          <p>No encontramos alumnos con "<b>${termino}</b>".</p>
          <small>Solo aparecen alumnos vinculados a tus clases.</small>
        </div>`);
      return;
    }

    $res.html(`
      <div class="bq_result_hdr">
        <i class="fas fa-users"></i> ${res.length} resultado${res.length !== 1 ? 's' : ''} encontrado${res.length !== 1 ? 's' : ''}
      </div>
      <div class="bq_result_list">
        ${res.map(al => {
          const ini  = avatar(al.nombre || al.usuario || 'U');
          const lecs = al.completadas?.length || 0;
          const wpm  = al.wpmMax || 0;
          const clId = al.clase_id || al.claseId || null;
          return `
            <div class="bq_result_row" data-usuario="${al.usuario}">
              <div class="bq_res_av">${ini}</div>
              <div class="bq_res_info">
                <div class="bq_res_nombre">${al.nombre || al.usuario || '—'}</div>
                <div class="bq_res_meta">${al.email || ''} ${clId ? `· Clase: ${clId}` : ''}</div>
              </div>
              <div class="bq_res_stats">
                <span class="bq_chip wpm"><i class="fas fa-bolt"></i> ${wpm} WPM</span>
                <span class="bq_chip lec"><i class="fas fa-graduation-cap"></i> ${lecs}/45 Lec</span>
              </div>
              <i class="fas fa-chevron-right bq_res_arr"></i>
            </div>`;
        }).join('')}
      </div>`);
  } catch (err) {
    console.error('[buscar] error:', err);
    $res.html(`<div class="bq_empty"><i class="fas fa-exclamation-triangle"></i><p>Error al buscar.</p></div>`);
  }
}

// ── VER DETALLE ───────────────────────────────────────────────────────────────
async function _verDetalle(usuario, u) {
  $('#bq_detalle').show().html(`
    <div class="bq_loading"><div class="bq_spinner"></div> Cargando detalle...</div>`);

  try {
    // 1. Obtener documento principal del alumno en `lecciones`
    const lSnap = await getDoc(doc(db, 'lecciones', usuario));
    const al    = lSnap.exists() ? { usuario, ...lSnap.data() } : { usuario };

    // 2. Obtener subcolección `detalle`
    // Como las keys son "1", "2" o IDs generados, traemos toda la subcolección
    let detalles = [];
    try {
      const dSnap = await getDocs(collection(db, 'lecciones', usuario, 'detalle'));
      detalles = dSnap.docs.map(d => d.data());
      // Ordenamos en local por fecha descendente
      detalles.sort((a, b) => {
        const fa = a.fecha?.toDate ? a.fecha.toDate().getTime() : 0;
        const fb = b.fecha?.toDate ? b.fecha.toDate().getTime() : 0;
        return fb - fa;
      });
    } catch(e) { console.warn('[buscar] Sin acceso a subcolección detalle', e); }

    const ini      = avatar(al.nombre || usuario || 'U');
    const wpm      = al.wpmMax   || 0;
    const prec     = al.precision || 0;
    const lecs     = al.completadas?.length || 0;
    const pct      = Math.round((lecs / 45) * 100);
    const claseId  = al.clase_id || al.claseId || null;

    // Historial HTML
    const histHtml = detalles.length > 0
      ? detalles.map(d => {
          const lNum = d.leccionId || d.nivel || '?';
          const fecha= d.fecha?.toDate ? formatearFechaHora(d.fecha) : '—';
          return `
            <div class="bq_his_row">
              <span class="bq_his_num">L${String(lNum).padStart(2,'0')}</span>
              <span class="bq_his_wpm"><i class="fas fa-bolt"></i> ${d.wpm || 0} WPM</span>
              <span class="bq_his_prec"><i class="fas fa-bullseye"></i> ${d.precision || 0}%</span>
              <span class="bq_his_stars">${d.estrellas ? '★'.repeat(d.estrellas) : ''}</span>
              <span style="margin-left:auto;color:var(--tx3);font-size:var(--fz_s4)">${fecha}</span>
            </div>`;
        }).join('')
      : '<div style="color:var(--tx3);padding:2vh">Sin historial registrado en la subcolección.</div>';

    $('#bq_detalle').html(`
      <div class="bq_det_card">

        <!-- Header alumno -->
        <div class="bq_det_hdr">
          <div class="bq_det_av">${ini}</div>
          <div class="bq_det_info">
            <div class="bq_det_nombre">${al.nombre || usuario}</div>
            <div class="bq_det_meta">${al.email || usuario} · ${al.rol || 'smile'}</div>
            ${claseId ? `
              <div class="bq_det_clase">
                <i class="fas fa-chalkboard"></i> Clase: <b>${claseId}</b>
                <button class="bq_btn_mini bq_btn_ir_clase" data-id="${claseId}">
                  <i class="fas fa-arrow-right"></i> Ver clase
                </button>
              </div>` : '<div class="bq_det_clase" style="color:var(--tx3)"><i class="fas fa-user"></i> Sin clase asignada</div>'}
          </div>
        </div>

        <!-- KPIs -->
        <div class="bq_det_kpis">
          <div class="bq_det_kpi"><div class="bq_dk_val" style="color:var(--mco)">${lecs}</div><div class="bq_dk_lbl">Lecciones</div></div>
          <div class="bq_det_kpi"><div class="bq_dk_val" style="color:#f59e0b">${wpm}</div><div class="bq_dk_lbl">WPM Max</div></div>
          <div class="bq_det_kpi"><div class="bq_dk_val" style="color:#22c55e">${prec}%</div><div class="bq_dk_lbl">Precisión</div></div>
          <div class="bq_det_kpi"><div class="bq_dk_val">${pct}%</div><div class="bq_dk_lbl">Avance</div></div>
        </div>

        <!-- Barra de progreso -->
        <div class="bq_det_prog">
          <div class="bq_prog_track">
            <div class="bq_prog_fill" style="width:${pct}%"></div>
          </div>
          <span>${lecs} de 45 lecciones completadas</span>
        </div>

        <!-- Historial reciente (Subcolección) -->
        <div class="bq_det_sec"><i class="fas fa-clock-rotate-left"></i> Historial detallado de lecciones</div>
        <div class="bq_his_list">${histHtml}</div>

      </div>`);
  } catch (err) {
    console.error('[buscar] detalle:', err);
    $('#bq_detalle').html(`<div class="bq_empty"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar detalle.</p></div>`);
  }
}
