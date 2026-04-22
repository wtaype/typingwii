// ════════════════════════════════════════════════════════════════════
// misclases.js — TypingWii · Gestor · Mis Clases
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './misclases.css';
import $ from 'jquery';
import { getls, savels, Notificacion } from '../../widev.js';
import { db } from '../firebase.js';
import {
  collection, query, where, getDocs,
  doc, setDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore';

const wi    = () => getls('wiSmile');
const K_CLS = 'gsClases';

// Colores para clases
const COLORES = ['#6366f1','#0ea5e9','#22c55e','#f59e0b','#ec4899','#a855f7','#ef4444','#06b6d4'];

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="mc_page"><div class="mc_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;

  return `
  <div class="mc_page">

    <!-- HERO -->
    <div class="mc_hero">
      <div class="mc_hero_orb"></div>
      <div class="mc_hero_left">
        <div class="mc_hero_badge"><i class="fas fa-chalkboard-teacher"></i> Gestión de Clases</div>
        <h1 class="mc_hero_title">Mis <span>Clases</span></h1>
        <p class="mc_hero_sub">Crea y administra tus aulas. Asigna lecciones y monitorea el avance de tus alumnos.</p>
      </div>
      <button class="mc_btn_new" id="mc_btn_nueva">
        <i class="fas fa-plus"></i> Nueva Clase
      </button>
    </div>

    <!-- KPIs -->
    <div class="mc_kpis_row" id="mc_kpis">
      ${[
        { id:'mc_k_clases',  ico:'fa-chalkboard', col:'var(--mco)',  lbl:'Mis Clases',    val:'—' },
        { id:'mc_k_alumnos', ico:'fa-users',       col:'#22c55e',    lbl:'Total Alumnos', val:'—' },
        { id:'mc_k_activas', ico:'fa-circle',      col:'#f59e0b',    lbl:'Clases Activas',val:'—' },
      ].map(k => `
        <div class="mc_kpi_card">
          <div class="mc_kpi_ico" style="color:${k.col}"><i class="fas ${k.ico}"></i></div>
          <div class="mc_kpi_val" id="${k.id}">${k.val}</div>
          <div class="mc_kpi_lbl">${k.lbl}</div>
        </div>`).join('')}
    </div>

    <!-- LISTA DE CLASES -->
    <div class="mc_sec_hdr">
      <i class="fas fa-chalkboard"></i> Mis clases
      <span class="mc_sec_count" id="mc_count">—</span>
    </div>
    <div class="mc_clases_grid" id="mc_grid">
      ${_skeletons(3)}
    </div>

    <!-- MODAL NUEVA CLASE -->
    <div class="mc_modal_bg" id="mc_modal" style="display:none">
      <div class="mc_modal_card">
        <div class="mc_modal_hdr">
          <h3 id="mc_modal_title"><i class="fas fa-plus"></i> Nueva Clase</h3>
          <button class="mc_modal_close" id="mc_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="mc_modal_body">
          <div class="mc_field">
            <label>Nombre de la clase</label>
            <input id="mc_inp_nombre" type="text" class="mc_input" placeholder="Ej: Computación 3ro A">
          </div>
          <div class="mc_field">
            <label>Descripción (opcional)</label>
            <input id="mc_inp_desc" type="text" class="mc_input" placeholder="Ej: Turno mañana">
          </div>
          <div class="mc_field">
            <label>Código de clase</label>
            <div class="mc_code_row">
              <input id="mc_inp_codigo" type="text" class="mc_input mono" maxlength="6" placeholder="AUTO">
              <button class="mc_code_gen" id="mc_gen_codigo"><i class="fas fa-dice"></i></button>
            </div>
            <small style="color:var(--tx3);margin-top:.4vh;display:block">El alumno usará este código para unirse</small>
          </div>
        </div>
        <div class="mc_modal_foot">
          <button class="mc_btn_cancel" id="mc_modal_cancel">Cancelar</button>
          <button class="mc_btn_save" id="mc_modal_save"><i class="fas fa-save"></i> Guardar Clase</button>
        </div>
      </div>
    </div>

  </div>`;
};

// ── SKELETONS ─────────────────────────────────────────────────────────────────
function _skeletons(n) {
  return Array.from({ length: n }, () => `
    <div class="mc_clase_card mc_skeleton">
      <div class="mc_sk_head"></div>
      <div class="mc_sk_line"></div>
      <div class="mc_sk_line mc_sk_sm"></div>
    </div>`).join('');
}

// ── RENDER CLASE CARD ─────────────────────────────────────────────────────────
function _claseCard(cl, idx) {
  const color    = COLORES[idx % COLORES.length];
  const alumnos  = cl._countAlumnos || 0; // Calculado cruzando con lecciones
  const lecs     = cl.leccionesAsignadas?.length || 0;
  const avisos   = cl.avisos?.length || 0;

  return `
    <div class="mc_clase_card" style="--cc:${color}" data-id="${cl.id}">
      <div class="mc_clase_bar"></div>
      <div class="mc_clase_top">
        <div class="mc_clase_ico"><i class="fas fa-chalkboard-teacher"></i></div>
        <div class="mc_clase_cod">${cl.id}</div>
      </div>
      <div class="mc_clase_nombre">${cl.nombre || 'Sin nombre'}</div>
      ${cl.descripcion ? `<div class="mc_clase_desc">${cl.descripcion}</div>` : ''}
      <div class="mc_clase_stats">
        <span><i class="fas fa-users"></i> ${alumnos} Alumnos</span>
        <span><i class="fas fa-graduation-cap"></i> ${lecs} Asignadas</span>
        <span><i class="fas fa-bell"></i> ${avisos} Avisos</span>
      </div>
      <div class="mc_clase_foot">
        <button class="mc_cl_btn primary mc_ir_clase" data-id="${cl.id}" title="Ver alumnos">
          <i class="fas fa-users"></i> Ver alumnos
        </button>
        <button class="mc_cl_btn ghost mc_edit_clase" data-id="${cl.id}" title="Editar">
          <i class="fas fa-pen"></i>
        </button>
        <button class="mc_cl_btn danger mc_del_clase" data-id="${cl.id}" title="Eliminar">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`;
}

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;

  $(document).off('.mc');
  await _cargarClases(u);
  _bindModal(u);
};

export const cleanup = () => {
  $(document).off('.mc');
};

// ── CARGAR CLASES ─────────────────────────────────────────────────────────────
async function _cargarClases(u) {
  try {
    // 1. Obtener clases del gestor (soporta gestor_id)
    let snapCl = await getDocs(query(collection(db, 'clases'), where('gestor_id', '==', u.usuario)));
    if (snapCl.empty) {
      // Fallback a gestorId por si acaso hay datos antiguos
      snapCl = await getDocs(query(collection(db, 'clases'), where('gestorId', '==', u.usuario)));
    }
    const clases = snapCl.docs.map(d => ({ id: d.id, ...d.data() }));

    // 2. Obtener lecciones (alumnos reales) del gestor
    let snapLec = await getDocs(query(collection(db, 'lecciones'), where('gestor_id', '==', u.usuario)));
    if (snapLec.empty) {
      snapLec = await getDocs(query(collection(db, 'lecciones'), where('gestorId', '==', u.usuario)));
    }
    const lecciones = snapLec.docs.map(d => d.data());

    // 3. Contar alumnos reales en la clase cruzando con clase_id
    clases.forEach(cl => {
      cl._countAlumnos = lecciones.filter(l => l.clase_id === cl.id || l.claseId === cl.id).length;
    });

    savels(K_CLS, clases, 1);
    _renderGrid(clases);
  } catch (err) {
    console.error('[misclases] Error:', err);
    $('#mc_grid').html('<div class="mc_empty_card"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar clases.</p></div>');
  }
}

function _renderGrid(clases) {
  const total   = clases.length;
  const alumnos = clases.reduce((a, c) => a + (c._countAlumnos || 0), 0);
  const activas = clases.filter(c => c.activa !== false).length;

  $('#mc_k_clases').text(total);
  $('#mc_k_alumnos').text(alumnos);
  $('#mc_k_activas').text(activas);
  $('#mc_count').text(total);

  if (!total) {
    $('#mc_grid').html(`
      <div class="mc_empty_card">
        <i class="fas fa-chalkboard"></i>
        <p>Aún no tienes clases. ¡Crea la primera!</p>
      </div>`);
    return;
  }
  $('#mc_grid').html(clases.map((cl, i) => _claseCard(cl, i)).join(''));
}

// ── BIND MODAL ────────────────────────────────────────────────────────────────
function _bindModal(u) {
  const $modal = $('#mc_modal');

  const abrirModal = () => {
    $('#mc_inp_nombre,#mc_inp_desc').val('');
    $('#mc_inp_codigo').val(_genCodigo());
    $modal.fadeIn(200);
  };
  const cerrarModal = () => $modal.fadeOut(180);

  $(document).on('click.mc', '#mc_btn_nueva', abrirModal);
  $(document).on('click.mc', '#mc_modal_close, #mc_modal_cancel', cerrarModal);
  $(document).on('click.mc', '#mc_modal_bg', e => { if ($(e.target).is('#mc_modal')) cerrarModal(); });

  // Generar código random
  $(document).on('click.mc', '#mc_gen_codigo', () => $('#mc_inp_codigo').val(_genCodigo()));

  // Guardar nueva clase
  $(document).on('click.mc', '#mc_modal_save', async () => {
    const nombre = $('#mc_inp_nombre').val().trim();
    const desc   = $('#mc_inp_desc').val().trim();
    const codigo = $('#mc_inp_codigo').val().trim().toUpperCase();
    if (!nombre) { Notificacion('Ingresa un nombre para la clase', 'warning'); return; }
    if (codigo.length < 4) { Notificacion('El código debe tener al menos 4 caracteres', 'warning'); return; }

    const $btn = $('#mc_modal_save').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Guardando...');
    try {
      await setDoc(doc(db, 'clases', codigo), {
        nombre,
        descripcion: desc || '',
        gestor_id:    u.usuario,     // NUEVO SCHEMA
        gestorId:     u.usuario,     // Retrocompatibilidad
        gestorEmail:  u.email || '',
        gestorNombre: u.nombre || u.nombres || u.usuario,
        leccionesAsignadas: [],
        avisos: [],
        activa: true,
        creadoAt: serverTimestamp(),
      });
      Notificacion(`Clase "${nombre}" creada con código ${codigo}`, 'success');
      cerrarModal();
      await _cargarClases(u);
    } catch (err) {
      console.error('[misclases] Error creando:', err);
      Notificacion('Error al crear la clase', 'error');
    }
    $btn.prop('disabled', false).html('<i class="fas fa-save"></i> Guardar Clase');
  });

  // Ver alumnos de la clase
  $(document).on('click.mc', '.mc_ir_clase', function () {
    const claseId = $(this).data('id');
    savels('gsClaseActiva', claseId, 1);
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate('/alumnos'));
  });

  // Eliminar clase
  $(document).on('click.mc', '.mc_del_clase', async function () {
    const id = $(this).data('id');
    if (!confirm(`¿Eliminar la clase "${id}"? Esta acción no se puede deshacer y desvinculará a los alumnos de esta clase.`)) return;
    try {
      await deleteDoc(doc(db, 'clases', id));
      Notificacion('Clase eliminada', 'info');
      await _cargarClases(u);
    } catch { Notificacion('Error al eliminar', 'error'); }
  });
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function _genCodigo() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
