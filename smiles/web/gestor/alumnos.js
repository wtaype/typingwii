// ════════════════════════════════════════════════════════════════════
// alumnos.js — TypingWii · Gestor · Alumnos
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './alumnos.css';
import $ from 'jquery';
import { getls, savels, Notificacion, avatar, formatearFechaHora } from '../../widev.js';
import { db } from '../firebase.js';
import {
  collection, query, where, getDocs, getDoc,
  doc, updateDoc, arrayUnion
} from 'firebase/firestore';

const wi = () => getls('wiSmile');

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="al_page"><div class="al_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;

  return `
  <div class="al_page">

    <!-- HERO -->
    <div class="al_hero">
      <div class="al_hero_orb"></div>
      <div class="al_hero_left">
        <div class="al_hero_badge"><i class="fas fa-users"></i> Alumnos</div>
        <h1 class="al_hero_title">Gestión de <span>Estudiantes</span></h1>
        <p class="al_hero_sub">Supervisa el progreso, asigna lecciones y envía avisos a tu clase.</p>
      </div>
      <div class="al_hero_actions">
        <button class="al_btn_primary" id="al_btn_asignar">
          <i class="fas fa-tasks"></i> Asignar Lecciones
        </button>
        <button class="al_btn_ghost" id="al_btn_aviso">
          <i class="fas fa-bullhorn"></i> Enviar Aviso
        </button>
      </div>
    </div>

    <!-- FILTROS -->
    <div class="al_filtros" id="al_filtros">
      <button class="al_filtro active" data-f="todos">Todos</button>
      <button class="al_filtro" data-f="activos">Con Actividad</button>
      <button class="al_filtro" data-f="inactivos">Sin Actividad</button>
    </div>

    <!-- TABLA DE ALUMNOS -->
    <div class="al_table_wrap">
      <table class="al_table">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Clase</th>
            <th>Progreso Global</th>
            <th>Estadísticas</th>
            <th>Última Actividad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody id="al_table_body">
          <tr><td colspan="6"><div class="al_loading"><div class="al_spinner"></div> Cargando alumnos...</div></td></tr>
        </tbody>
      </table>
    </div>

    <!-- MODALES (SE INYECTAN EN JS) -->
    <div id="al_modales"></div>

  </div>`;
};

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;

  $(document).off('.al');
  await _cargarDatos(u);

  // Filtros
  $(document).on('click.al', '.al_filtro', function () {
    $('.al_filtro').removeClass('active');
    $(this).addClass('active');
    _renderTabla();
  });

  // Modal cerrar
  $(document).on('click.al', '.al_modal_close, .al_btn_cancel', _cerrarModales);
  $(document).on('click.al', '.al_modal_bg', e => { if ($(e.target).hasClass('al_modal_bg')) _cerrarModales(); });
};

export const cleanup = () => {
  $(document).off('.al');
};

// ── ESTADO LOCAL ──────────────────────────────────────────────────────────────
let _alumnos = [];
let _clases  = [];

async function _cargarDatos(u) {
  try {
    // 1. Obtener clases del gestor
    let snapCl = await getDocs(query(collection(db, 'clases'), where('gestor_id', '==', u.usuario)));
    if (snapCl.empty) snapCl = await getDocs(query(collection(db, 'clases'), where('gestorId', '==', u.usuario)));
    _clases = snapCl.docs.map(d => ({ id: d.id, ...d.data() }));

    // 2. Obtener alumnos (lecciones con gestor_id)
    let snapAl = await getDocs(query(collection(db, 'lecciones'), where('gestor_id', '==', u.usuario)));
    if (snapAl.empty) snapAl = await getDocs(query(collection(db, 'lecciones'), where('gestorId', '==', u.usuario)));
    
    _alumnos = snapAl.docs.map(d => ({ usuario: d.id, ...d.data() }));

    // Filtrar si viene redirigido desde "Mis clases"
    const actClase = getls('gsClaseActiva');
    if (actClase) {
      _alumnos = _alumnos.filter(a => a.clase_id === actClase || a.claseId === actClase);
      localStorage.removeItem('gsClaseActiva'); // limpiar
      $('#al_filtros').prepend(`<button class="al_filtro active" data-f="clase">Clase: ${actClase}</button>`);
    }

    _renderTabla();
    _bindAcciones(u);
  } catch (err) {
    console.error('[alumnos] Error:', err);
    $('#al_table_body').html('<tr><td colspan="6"><div class="al_empty"><i class="fas fa-exclamation-triangle"></i><p>Error cargando datos.</p></div></td></tr>');
  }
}

// ── RENDER TABLA ──────────────────────────────────────────────────────────────
function _renderTabla() {
  const f = $('.al_filtro.active').data('f');
  
  let lista = _alumnos;
  if (f === 'activos')   lista = _alumnos.filter(a => (a.completadas?.length || 0) > 0);
  if (f === 'inactivos') lista = _alumnos.filter(a => !(a.completadas?.length || 0));

  if (!lista.length) {
    $('#al_table_body').html(`
      <tr><td colspan="6">
        <div class="al_empty"><i class="fas fa-user-slash"></i><p>No se encontraron alumnos.</p></div>
      </td></tr>`);
    return;
  }

  const html = lista.map(al => {
    const nom    = al.nombre || al.usuario || '—';
    const ini    = avatar(nom);
    const lecs   = al.completadas?.length || 0;
    const wpm    = al.wpmMax || 0;
    const prec   = al.precision || 0;
    const pct    = Math.round((lecs / 45) * 100);
    const fecha  = al.ultPractica?.toDate ? formatearFechaHora(al.ultPractica) : 'Sin registro';
    const clId   = al.clase_id || al.claseId || 'Sin clase';

    return `
      <tr class="al_row">
        <td>
          <div class="al_alumno_cell">
            <div class="al_av">${ini}</div>
            <div>
              <div class="al_nombre">${nom}</div>
              <div class="al_email">${al.email || al.usuario}</div>
            </div>
          </div>
        </td>
        <td>
          <span style="font-weight:700;color:var(--tx3);font-size:var(--fz_s4)">${clId}</span>
        </td>
        <td>
          <div class="al_prog">
            <div class="al_prog_bar"><div class="al_prog_fill" style="width:${pct}%"></div></div>
            <span>${lecs}/45</span>
          </div>
        </td>
        <td>
          <div style="display:flex;gap:.8vh">
            <span class="al_badge wpm"><i class="fas fa-bolt"></i> ${wpm}</span>
            <span class="al_badge prec"><i class="fas fa-bullseye"></i> ${prec}%</span>
          </div>
        </td>
        <td><span class="al_fecha">${fecha}</span></td>
        <td>
          <button class="al_btn_det al_ver_detalle" data-u="${al.usuario}" title="Ver detalle">
            <i class="fas fa-eye"></i>
          </button>
        </td>
      </tr>`;
  }).join('');

  $('#al_table_body').html(html);
}

// ── ACCIONES ──────────────────────────────────────────────────────────────────
function _bindAcciones(u) {
  // Modal Detalle
  $(document).on('click.al', '.al_ver_detalle', function () {
    const usr = $(this).data('u');
    const al  = _alumnos.find(a => a.usuario === usr);
    if (!al) return;
    _mostrarModalDetalle(al);
  });

  // Modal Asignar Lecciones
  $(document).on('click.al', '#al_btn_asignar', () => {
    if (!_clases.length) { Notificacion('No tienes clases creadas aún.', 'warning'); return; }
    _mostrarModalAsignar();
  });

  // Modal Enviar Aviso
  $(document).on('click.al', '#al_btn_aviso', () => {
    if (!_clases.length) { Notificacion('No tienes clases creadas aún.', 'warning'); return; }
    _mostrarModalAviso();
  });

  // Guardar Asignación
  $(document).on('click.al', '#al_save_asignar', async function () {
    const clId = $('#al_sel_clase').val();
    const lecs = [];
    $('.al_lec_chk input:checked').each(function () { lecs.push(Number($(this).val())); });
    
    if (!lecs.length) { Notificacion('Selecciona al menos una lección', 'warning'); return; }

    const $btn = $(this).prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i>');
    try {
      await updateDoc(doc(db, 'clases', clId), { leccionesAsignadas: lecs });
      Notificacion(`Asignadas ${lecs.length} lecciones a la clase ${clId}`, 'success');
      _cerrarModales();
    } catch (e) { Notificacion('Error al asignar', 'error'); }
    $btn.prop('disabled', false).html('Guardar Cambios');
  });

  // Guardar Aviso
  $(document).on('click.al', '#al_save_aviso', async function () {
    const clId = $('#al_aviso_clase').val();
    const tipo = $('#al_aviso_tipo').val();
    const tit  = $('#al_aviso_tit').val().trim();
    const msg  = $('#al_aviso_msg').val().trim();

    if (!tit || !msg) { Notificacion('Completa título y mensaje', 'warning'); return; }

    const aviso = {
      id: Date.now().toString(),
      tipo, titulo: tit, mensaje: msg,
      fecha: new Date().toISOString()
    };

    const $btn = $(this).prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i>');
    try {
      await updateDoc(doc(db, 'clases', clId), { avisos: arrayUnion(aviso) });
      Notificacion('Aviso enviado', 'success');
      _cerrarModales();
    } catch (e) { Notificacion('Error al enviar', 'error'); }
    $btn.prop('disabled', false).html('Enviar Aviso');
  });
}

// ── UI MODALES ────────────────────────────────────────────────────────────────
function _cerrarModales() { $('#al_modales').html(''); }

function _mostrarModalDetalle(al) {
  const nom   = al.nombre || al.usuario || '—';
  const ini   = avatar(nom);
  const lecs  = al.completadas || [];
  const wpm   = al.wpmMax || 0;
  const prec  = al.precision || 0;
  
  const chipsHtml = Array.from({ length: 45 }, (_, i) => {
    const ok = lecs.includes(i + 1);
    return `<div class="al_lec_chip ${ok ? 'ok' : 'no'}">${ok ? '<i class="fas fa-check"></i>' : ''} Lec ${i + 1}</div>`;
  }).join('');

  $('#al_modales').html(`
    <div class="al_modal_bg">
      <div class="al_modal_card">
        <div class="al_modal_hdr">
          <div class="al_modal_av">${ini}</div>
          <div style="flex:1">
            <h3 class="al_modal_nombre">${nom}</h3>
            <div class="al_modal_sub">${al.email || al.usuario} · Clase: ${al.clase_id || al.claseId || 'N/A'}</div>
          </div>
          <button class="al_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="al_modal_stats">
          <div class="al_det_kpi"><div class="al_det_kv" style="color:var(--mco)">${lecs.length}/45</div><div class="al_det_kl">Lecciones</div></div>
          <div class="al_det_kpi"><div class="al_det_kv" style="color:#f59e0b">${wpm}</div><div class="al_det_kl">WPM Max</div></div>
          <div class="al_det_kpi"><div class="al_det_kv" style="color:#22c55e">${prec}%</div><div class="al_det_kl">Precisión</div></div>
        </div>
        <div class="al_modal_lecs">
          <h4 style="margin:0 0 1vh;font-size:var(--fz_m1);color:var(--tx)">Progreso por lección</h4>
          <div class="al_lecs_chips">${chipsHtml}</div>
        </div>
      </div>
    </div>`);
}

function _mostrarModalAsignar() {
  const chkHtml = Array.from({ length: 45 }, (_, i) => `
    <label class="al_lec_chk">
      <input type="checkbox" value="${i + 1}">
      <span>Lección ${i + 1}</span>
    </label>`).join('');

  $('#al_modales').html(`
    <div class="al_modal_bg">
      <div class="al_modal_card">
        <div class="al_modal_hdr">
          <h3><i class="fas fa-tasks"></i> Asignar Lecciones</h3>
          <button class="al_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div style="padding:2.5vh">
          <div class="al_field" style="margin-bottom:2vh">
            <label>Selecciona la clase</label>
            <select class="al_input" id="al_sel_clase">
              ${_clases.map(c => `<option value="${c.id}">${c.id} - ${c.nombre}</option>`).join('')}
            </select>
          </div>
          <div class="al_field">
            <label>Selecciona las lecciones obligatorias</label>
            <div class="al_lecs_pick">${chkHtml}</div>
          </div>
        </div>
        <div class="al_modal_foot">
          <button class="al_btn_cancel">Cancelar</button>
          <button class="al_btn_save" id="al_save_asignar">Guardar Cambios</button>
        </div>
      </div>
    </div>`);
}

function _mostrarModalAviso() {
  $('#al_modales').html(`
    <div class="al_modal_bg">
      <div class="al_modal_card">
        <div class="al_modal_hdr">
          <h3><i class="fas fa-bullhorn"></i> Enviar Aviso</h3>
          <button class="al_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div style="padding:2.5vh;display:flex;flex-direction:column;gap:1.5vh">
          <div class="al_field">
            <label>Clase destino</label>
            <select class="al_input" id="al_aviso_clase">
              ${_clases.map(c => `<option value="${c.id}">${c.id} - ${c.nombre}</option>`).join('')}
            </select>
          </div>
          <div class="al_field">
            <label>Tipo de aviso</label>
            <select class="al_input" id="al_aviso_tipo">
              <option value="info">Información general</option>
              <option value="tarea">Recordatorio de tarea</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>
          <div class="al_field">
            <label>Título del aviso</label>
            <input type="text" class="al_input" id="al_aviso_tit" placeholder="Ej: Práctica obligatoria">
          </div>
          <div class="al_field">
            <label>Mensaje</label>
            <textarea class="al_input al_textarea" id="al_aviso_msg" placeholder="Escribe el mensaje detallado..."></textarea>
          </div>
        </div>
        <div class="al_modal_foot">
          <button class="al_btn_cancel">Cancelar</button>
          <button class="al_btn_save" id="al_save_aviso">Enviar Aviso</button>
        </div>
      </div>
    </div>`);
}
