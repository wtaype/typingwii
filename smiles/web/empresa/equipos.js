// ════════════════════════════════════════════════════════════════════
// equipos.js — TypingWii · Empresa · Departamentos / Equipos
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './equipos.css';
import $ from 'jquery';
import { getls, savels, Notificacion } from '../../widev.js';
import { db } from '../firebase.js';
import {
  collection, query, where, getDocs,
  doc, setDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore';

const wi = () => getls('wiSmile');
const COLORES = ['#38bdf8', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#f43f5e', '#14b8a6'];

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="eqp_page"><div class="eqp_empty"><i class="fas fa-lock"></i><p>Sin sesión corporativa.</p></div></div>`;

  return `
  <div class="eqp_page">

    <!-- HERO CORPORATIVO PRO -->
    <div class="eqp_hero">
      <div class="eqp_hero_left">
        <div class="eqp_hero_icon"><i class="fas fa-sitemap"></i></div>
        <div class="eqp_hero_txt">
          <div class="eqp_badge"><i class="fas fa-building"></i> Panel Empresarial</div>
          <h1 class="eqp_hero_title">Departamentos</h1>
          <p class="eqp_hero_sub">Organiza a tus colaboradores en equipos y gestiona su entrenamiento.</p>
        </div>
      </div>
      <div class="eqp_hero_actions">
        <button class="eqp_btn_primary" id="eqp_btn_nuevo">
          <i class="fas fa-plus"></i> Nuevo Departamento
        </button>
      </div>
    </div>

    <!-- GRID DE EQUIPOS -->
    <div class="eqp_grid" id="eqp_grid">
      <div class="eqp_empty" style="grid-column: 1 / -1">
        <i class="fas fa-spinner fa-spin"></i><p>Cargando departamentos...</p>
      </div>
    </div>

    <!-- CONTENEDOR MODALES -->
    <div id="eqp_modales"></div>

  </div>`;
};

// ── ESTADO ────────────────────────────────────────────────────────────────────
let _equipos   = [];
let _empleados = [];

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;

  $(document).off('.eqp');
  await _cargarDatos(u);

  // Modales
  $(document).on('click.eqp', '.eqp_modal_close, .eqp_btn_cancel', _cerrarModales);
  $(document).on('click.eqp', '.eqp_modal_bg', e => { if ($(e.target).hasClass('eqp_modal_bg')) _cerrarModales(); });

  // Acciones
  $(document).on('click.eqp', '#eqp_btn_nuevo', () => _modalFormulario(u));
  
  // Eliminar Equipo
  $(document).on('click.eqp', '.eqp_btn_del', async function () {
    const id = $(this).data('id');
    if (!confirm(`¿Eliminar el departamento "${id}"? Los colaboradores quedarán sin asignar.`)) return;
    try {
      await deleteDoc(doc(db, 'clases', id));
      Notificacion('Departamento eliminado', 'info');
      await _cargarDatos(u);
    } catch { Notificacion('Error al eliminar', 'error'); }
  });

  // Ver colaboradores (redirección)
  $(document).on('click.eqp', '.eqp_btn_ver', function () {
    const id = $(this).data('id');
    savels('gsClaseActiva', id, 1);
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate('/empleados'));
  });
};

export const cleanup = () => {
  $(document).off('.eqp');
};

// ── DATOS ─────────────────────────────────────────────────────────────────────
async function _cargarDatos(u) {
  try {
    // Buscar equipos (colección clases)
    let snapEq = await getDocs(query(collection(db, 'clases'), where('empresa_id', '==', u.usuario)));
    if (snapEq.empty) snapEq = await getDocs(query(collection(db, 'clases'), where('gestor_id', '==', u.usuario)));
    _equipos = snapEq.docs.map(d => ({ id: d.id, ...d.data() }));

    // Buscar empleados para contar (colección lecciones)
    let snapEm = await getDocs(query(collection(db, 'lecciones'), where('empresa_id', '==', u.usuario)));
    if (snapEm.empty) snapEm = await getDocs(query(collection(db, 'lecciones'), where('gestor_id', '==', u.usuario)));
    _empleados = snapEm.docs.map(d => d.data());

    // Cruzar datos
    _equipos.forEach(eq => {
      const emps = _empleados.filter(e => e.equipo_id === eq.id || e.clase_id === eq.id || e.claseId === eq.id);
      eq._totales = emps.length;
      eq._activos = emps.filter(e => (e.completadas?.length || 0) > 0).length;
    });

    _renderGrid();
  } catch (err) {
    console.error('[equipos] Error:', err);
    $('#eqp_grid').html('<div class="eqp_empty" style="grid-column: 1 / -1"><i class="fas fa-exclamation-triangle"></i><p>Error de conexión.</p></div>');
  }
}

// ── RENDER GRID ───────────────────────────────────────────────────────────────
function _renderGrid() {
  if (!_equipos.length) {
    $('#eqp_grid').html(`
      <div class="eqp_empty" style="grid-column: 1 / -1">
        <i class="fas fa-layer-group"></i><p>No has creado ningún departamento aún.</p>
      </div>`);
    return;
  }

  const html = _equipos.map((eq, i) => {
    const color = COLORES[i % COLORES.length];
    
    return `
      <div class="eqp_card" style="--cc:${color}">
        <div class="eqp_card_top">
          <div class="eqp_card_icon"><i class="fas fa-users"></i></div>
          <div class="eqp_card_cod">${eq.id}</div>
        </div>
        <h3 class="eqp_card_nombre">${eq.nombre || 'Departamento'}</h3>
        <div class="eqp_card_desc">${eq.descripcion || 'Sin descripción corporativa asignada.'}</div>
        
        <div class="eqp_card_stats">
          <div class="eqp_stat">
            <i class="fas fa-user-tie"></i>
            <div>${eq._totales} <span>Miembros</span></div>
          </div>
          <div class="eqp_stat">
            <i class="fas fa-bolt"></i>
            <div>${eq._activos} <span>Activos</span></div>
          </div>
        </div>

        <div class="eqp_card_foot">
          <button class="eqp_btn_sec eqp_btn_ver" data-id="${eq.id}">
            <i class="fas fa-eye"></i> Colaboradores
          </button>
          <button class="eqp_btn_ico danger eqp_btn_del" data-id="${eq.id}" title="Eliminar departamento">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`;
  }).join('');

  $('#eqp_grid').html(html);
}

// ── MODALES ───────────────────────────────────────────────────────────────────
function _cerrarModales() { $('#eqp_modales').html(''); }

function _modalFormulario(u) {
  const code = _genCodigo();

  $('#eqp_modales').html(`
    <div class="eqp_modal_bg">
      <div class="eqp_modal_card">
        <div class="eqp_modal_hdr">
          <h3 class="eqp_modal_title"><i class="fas fa-sitemap"></i> Nuevo Departamento</h3>
          <button class="eqp_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="eqp_modal_body">
          <div class="eqp_field">
            <label>Nombre del Departamento</label>
            <input type="text" id="eqp_inp_nom" class="eqp_input" placeholder="Ej: Ventas, Soporte, IT...">
          </div>
          <div class="eqp_field">
            <label>Descripción / Responsable</label>
            <input type="text" id="eqp_inp_desc" class="eqp_input" placeholder="Ej: Equipo de atención al cliente">
          </div>
          <div class="eqp_field">
            <label>Código Interno de Acceso</label>
            <div class="eqp_code_row">
              <input type="text" id="eqp_inp_cod" class="eqp_input mono" maxlength="6" value="${code}">
              <button class="eqp_btn_gen" id="eqp_gen_cod" title="Generar código aleatorio"><i class="fas fa-dice"></i></button>
            </div>
            <small style="color:var(--tx3);margin-top:0.4vh">Con este código los colaboradores podrán auto-asignarse.</small>
          </div>
        </div>
        <div class="eqp_modal_foot">
          <button class="eqp_btn_cancel">Cancelar</button>
          <button class="eqp_btn_save" id="eqp_save_nuevo"><i class="fas fa-save"></i> Guardar Departamento</button>
        </div>
      </div>
    </div>`);

  $(document).off('click.eqp2', '#eqp_gen_cod').on('click.eqp2', '#eqp_gen_cod', () => {
    $('#eqp_inp_cod').val(_genCodigo());
  });

  $(document).off('click.eqp2', '#eqp_save_nuevo').on('click.eqp2', '#eqp_save_nuevo', async function() {
    const nom = $('#eqp_inp_nom').val().trim();
    const des = $('#eqp_inp_desc').val().trim();
    const cod = $('#eqp_inp_cod').val().trim().toUpperCase();

    if (!nom) { Notificacion('El nombre es requerido', 'warning'); return; }
    if (cod.length < 4) { Notificacion('El código debe tener 4 caracteres o más', 'warning'); return; }

    const $btn = $(this).prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Guardando...');
    try {
      await setDoc(doc(db, 'clases', cod), {
        nombre: nom,
        descripcion: des,
        empresa_id: u.usuario, // Nuevo schema
        gestor_id: u.usuario,  // Fallback
        creadoAt: serverTimestamp(),
        activa: true
      });
      Notificacion('Departamento registrado con éxito', 'success');
      _cerrarModales();
      await _cargarDatos(u);
    } catch (e) {
      Notificacion('Error al guardar', 'error');
      $btn.prop('disabled', false).html('<i class="fas fa-save"></i> Guardar Departamento');
    }
  });
}

function _genCodigo() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
