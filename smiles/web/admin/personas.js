/**
 * personas.js — Módulo Personas (Admin)
 * Búsqueda Inteligente Clon Buscar.js (Cache 10 consultas) + Permisos Administrador (Estado Múltiple)
 * Exports: render | init | cleanup
 */

import './admin.css';
import './personas.css';
import $ from 'jquery';
import { getls, savels, Capit, avatar, abrirModal, cerrarTodos, Mensaje, calcularTiempoEmpresa } from '../../widev.js';
import { db } from '../firebase.js';
import { collection, query, where, getDocs, limit, startAfter, orderBy, startAt, endAt, doc, updateDoc, serverTimestamp, endBefore, limitToLast } from 'firebase/firestore';

const wi = () => getls('wiSmile');
const guard = () => wi()?.rol === 'admin';

let _personas = [];
let _firstDoc = null;
let _lastDoc = null;

const st = {
  pagina:     1,
  porPagina:  10,
  buscando:   false,
  hasMore:    false
};

// ─── CACHE LOCAL ───────────
const C_KEY = 'amPersonas';
const _getHash = () => `q:${($('#ps_q').val() || '').trim().toLowerCase()}|est:${$('#ps_estado').val()}|cc:${($('#ps_cc').val() || '').trim()}|fi:${$('#ps_fecha_ini').val()}|ff:${$('#ps_fecha_fin').val()}`;

function _readCache(hash) {
  const c = getls(C_KEY) || {};
  return c[hash] ? c[hash].data : null;
}
function _writeCache(hash, data) {
  let c = getls(C_KEY) || {};
  c[hash] = { data, ts: Date.now() };
  const keys = Object.keys(c).sort((a, b) => c[b].ts - c[a].ts);
  if (keys.length > 10) keys.slice(10).forEach(k => delete c[k]);
  savels(C_KEY, c, 5);
}
function _updateMutationInCache(dni, attrs) {
  let c = getls(C_KEY) || {};
  let changed = false;
  Object.keys(c).forEach(k => {
    let item = c[k].data.find(x => x.dni === dni);
    if (item) { Object.assign(item, attrs); changed = true; }
  });
  if (changed) savels(C_KEY, c, 5);
}

// ─── RENDER ──────────────────────────────────────────────────────
export const render = async () => {
  if (!guard()) return `<div class="ps_wrap"><div class="ps_empty"><i class="fas fa-lock"></i><p>Sin acceso.</p></div></div>`;

  return `
  <div class="ps_wrap" id="ps_root">

    <!-- HERO -->
    <div class="ps_hero">
      <div class="ps_hero_icon"><i class="fas fa-search"></i></div>
      <div class="ps_hero_txt">
        <h2>Directorio Administrativo</h2>
        <p>Búsqueda inteligente con bajo consumo de datos y panel de control.</p>
      </div>
    </div>

    <!-- PANEL DE BÚSQUEDA BLANCO -->
    <div class="ps_panel_blanco">
      
      <!-- Fila Principal: Buscador Inteligente -->
      <div class="ps_pb_row ps_pb_row--main">
        <div class="ps_pb_col grow-2">
          <label><i class="fas fa-search ps_ico_mco"></i> Consulta General</label>
          <input type="text" id="ps_q" class="ps_pb_input" placeholder="Ingresa Nombre, DNI o Correo electrónico..." autocomplete="off">
        </div>
        <div class="ps_pb_action">
          <button class="ps_btn_buscar" id="ps_buscar"><i class="fas fa-search"></i> Buscar</button>
          <button class="ps_btn_limpiar" id="ps_limpiar" title="Limpiar y reiniciar"><i class="fas fa-eraser"></i></button>
        </div>
      </div>

      <!-- Fila de Filtros Avanzados -->
      <div class="ps_pb_row ps_filtros_avanzados">
        <div class="ps_pb_col">
          <label>Estado</label>
          <select id="ps_estado" class="ps_pb_select">
            <option value="">Cualquiera</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div class="ps_pb_col">
          <label>Centro de Costo</label>
          <input type="text" id="ps_cc" class="ps_pb_input" placeholder="Ej. Comercial">
        </div>
        <div class="ps_pb_col">
          <label>Ingreso Desde</label>
          <input type="date" id="ps_fecha_ini" class="ps_pb_input">
        </div>
        <div class="ps_pb_col">
          <label>Ingreso Hasta</label>
          <input type="date" id="ps_fecha_fin" class="ps_pb_input">
        </div>
      </div>

    </div>

    <!-- RESULTADOS -->
    <div id="ps_resultados">
      <div class="ps_inicio">
        <i class="fas fa-users"></i>
        <p>Pulsa buscar o usa los filtros para traer los registros.</p>
      </div>
    </div>

    <!-- PAGINACIÓN -->
    <div class="ps_pag ps_d_none" id="ps_pag"></div>

    <!-- MODAL PERFIL PRO (Utilizando wiModal) -->
    <div id="modal_perfil" class="wiModal">
      <div class="modalBody ps_modal_pro">
        <button class="modalX" title="Cerrar"><i class="fas fa-times"></i></button>
        <div id="ps_modal_body"></div>
      </div>
    </div>

  </div>`;
};

// ─── INIT ─────────────────────────────────────────────────────────
export const init = async () => {
  if (!guard()) return;
  _bindEvents();
};

export const cleanup = () => {
  $(document).off('.ps');
};

// ─── BÚSQUEDA INTELIGENTE Y CACHÉ ──────────────────────────────────
async function _realizarConsulta(dir = 'init') {
  const qStr = ($('#ps_q').val() || '').trim().toLowerCase();
  const est  = $('#ps_estado').val();
  const cc   = ($('#ps_cc').val() || '').trim();
  const fIni = $('#ps_fecha_ini').val();
  const fFin = $('#ps_fecha_fin').val();
  const hash = _getHash();

  if (st.buscando) return;
  st.buscando = true;

  const $btns = $('#ps_buscar, #ps_limpiar, .ps_pag_btn').prop('disabled', true);
  
  if (dir === 'init') {
    const cachedData = _readCache(hash);
    if (cachedData) {
      _personas = cachedData;
      st.pagina = 1;
      _firstDoc = null; _lastDoc = null; 
      st.hasMore = false; 
      _renderResultados(true);
      _renderPag(true);
      st.buscando = false;
      $btns.prop('disabled', false);
      return;
    }
  }

  $('#ps_resultados').html(`<div class="am_loading"><i class="fas fa-spinner fa-spin"></i> Consultando registros...</div>`);

  try {
    let constraints = [];
    let hasNamePrefix = false;

    // 1. INPUT CENTRAL (DNI vs Email vs Nombres)
    if (qStr) {
      if (qStr.includes('@')) {
        constraints.push(where('email', '==', qStr));
      } else if (/^\d+$/.test(qStr)) {
        if (qStr.length === 9) constraints.push(where('celular', '==', qStr));
        else constraints.push(where('dni', '==', qStr));
      } else {
        constraints.push(orderBy('nombres', 'asc'), startAt(qStr), endAt(qStr + '\uf8ff'));
        hasNamePrefix = true;
      }
    }

    // ESTRATEGIA "NO-INDEX": Si se busca por Nombre, Firestore pedirá index compuesto
    // al combinar con where(). Para evitarlo, si hay nombre NO enviamos el where() a Firebase,
    // extraemos todo ese nodo y filtramos en RAM (JS) ya que las coincidencias de nombre son pocas.
    
    let runLocalFilters = false;

    // 2. FILTROS EXTRAS
    if (est) {
      if (hasNamePrefix) runLocalFilters = true;
      else constraints.push(where('estado', '==', est));
    }
    if (cc) {
      if (hasNamePrefix) runLocalFilters = true;
      else constraints.push(where('centroCosto', '==', cc));
    }

    // 3. RANGOS DE FECHA
    if (fIni || fFin) {
      if (hasNamePrefix) {
        runLocalFilters = true;
      } else {
        if (fIni) constraints.push(where('fechaIngreso', '>=', new Date(fIni + 'T00:00:00')));
        if (fFin) constraints.push(where('fechaIngreso', '<=', new Date(fFin + 'T23:59:59')));
        constraints.push(orderBy('fechaIngreso', 'desc'));
      }
    }

    let qRef = query(collection(db, 'smiles'), ...constraints);

    // Paginación Manual Server-side (Firebase) -> Solo si NO filtramos localmente
    if (!runLocalFilters) {
      if (dir === 'next' && _lastDoc) {
        qRef = query(qRef, startAfter(_lastDoc), limit(st.porPagina));
      } else if (dir === 'prev' && _firstDoc) {
        qRef = query(qRef, endBefore(_firstDoc), limitToLast(st.porPagina));
      } else {
        qRef = query(qRef, limit(st.porPagina));
        st.pagina = 1;
      }
    } else {
      // Si la búsqueda es por Nombre + Filtros:
      // Forzamos "reset" visual a página 1 (no usaremos la meta-paginación nativa ya que filtramos en RAM)
      st.pagina = 1;
    }

    const snap = await getDocs(qRef);
    let docs = snap.docs;

    // APLICACIÓN DE ESTRATEGIA R.A.M. (No-Index Compatibility)
    if (runLocalFilters) {
      docs = docs.filter(d => {
         const data = d.data();
         if (est && (data.estado || 'activo').toLowerCase() !== est.toLowerCase()) return false;
         if (cc && (data.centroCosto || '').toLowerCase() !== cc.toLowerCase()) return false;
         if (fIni || fFin) {
           const time = data.fechaIngreso?.seconds ? data.fechaIngreso.seconds * 1000 : 0;
           if (!time) return false;
           if (fIni && time < new Date(fIni + 'T00:00:00').getTime()) return false;
           if (fFin && time > new Date(fFin + 'T23:59:59').getTime()) return false;
         }
         return true;
      });
      st.hasMore = false; // Los traemos todos de golpe
    } else {
      if (snap.empty && dir !== 'init') {
        if (dir === 'next') st.hasMore = false;
        _renderPag(false);
        return;
      }
      st.hasMore = docs.length === st.porPagina;
      _firstDoc = docs[0] || null;
      _lastDoc = docs[docs.length - 1] || null;
    }

    _personas = docs.map(d => ({ id: d.id, ...d.data() }));

    if (dir === 'init') _writeCache(hash, _personas);

    _renderResultados(false);
    _renderPag(false);

  } catch (e) {
    let errHTML = `<p>Error de consulta.</p>`;
    if (e.message === 'MULTIPLE_INEQUALITY') {
      errHTML = `<p><b>Restricción de Búsqueda:</b> Consulta demasiado compleja. Por favor, realiza la búsqueda solo por Nombre o solo por Fechas, no ambas a la vez.</p>`;
    } else if (e.message && e.message.includes('index')) {
      errHTML = `<p><b>Requiere índice:</b> Esta combinación de filtros necesita un índice compuesto en Firestore.</p>`;
    }
    $('#ps_resultados').html(`<div class="ps_empty"><i class="fas fa-exclamation-circle ps_ico_err"></i>${errHTML}</div>`);
  } finally {
    st.buscando = false;
    $btns.prop('disabled', false);
  }
}

// ─── RENDER RESULTADOS ────────────────────────────────────────────
function _renderResultados(isCached) {
  if (!_personas.length) {
    $('#ps_resultados').html(`<div class="ps_empty"><i class="fas fa-search"></i><p>Sin resultados en esta búsqueda.</p></div>`);
    $('#ps_pag').addClass('ps_d_none');
    return;
  }
  const grid = `<div class="ps_info">Viendo <b>${_personas.length}</b> perfiles ${isCached ? '<span class="ps_cash_badge">CACHÉ ACTIVA</span>' : ''}</div>
                <div class="ps_grid">${_personas.map(_htmlTarjeta).join('')}</div>`;
  $('#ps_resultados').html(grid);
}

function _htmlTarjeta(e) {
  const av   = e.avatar || (e.nombres ? avatar(e.nombres) : '??');
  const est  = (e.estado || 'activo').toLowerCase();
  
  return `
    <div class="ps_card" data-id="${e.id}">
      <div class="ps_card_top">
        <div class="ps_avatar ps_avatar--${est}">${av}</div>
        <span class="ps_estado ps_estado--${est}">${est}</span>
      </div>
      <div class="ps_card_nombre">${Capit(e.nombres || '—')}</div>
      <div class="ps_card_cargo">${Capit(e.cargo || e.cargoOperaciones || '—')}</div>
      <div class="ps_card_datos">
        <div><i class="fas fa-id-card"></i> ${e.dni || '—'}</div>
        <div><i class="fas fa-map-marker-alt"></i> ${Capit(e.sede || '—')}</div>
        <div><i class="fas fa-envelope"></i> ${e.email || '—'}</div>
      </div>
      <button class="ps_btn_ver" data-id="${e.id}">
        <i class="fas fa-eye"></i> Ver perfil
      </button>
    </div>`;
}

// ─── PAGINACIÓN ───────────────────────────────────────────────────
function _renderPag(isCached) {
  const $pag = $('#ps_pag');
  if (st.pagina === 1 && !st.hasMore && _personas.length === 0) { $pag.addClass('ps_d_none'); return; }
  
  $pag.removeClass('ps_d_none').html(`
    <span class="ps_pag_info">Página <b>${st.pagina}</b></span>
    <div class="ps_pag_btns">
      <button class="ps_pag_btn" data-p="prev" ${st.pagina <= 1 ? 'disabled' : ''}><i class="fas fa-angle-left"></i> Anterior</button>
      <button class="ps_pag_btn" data-p="next" ${!st.hasMore || isCached ? 'disabled' : ''}>Siguiente <i class="fas fa-angle-right"></i></button>
    </div>
  `);
}

// ─── MODAL PERFIL + ADMIN SOLO ESTADO ─────────────────────────────
function _abrirPerfil(dniId) {
  const e = _personas.find(x => String(x.dni) === String(dniId) || String(x.id) === String(dniId));
  if (!e) return;

  const av  = e.avatar || (e.nombres ? avatar(e.nombres) : '??');
  const fi  = e.fechaIngreso?.seconds ? new Date(e.fechaIngreso.seconds * 1000) : null;
  const fiStr = fi ? fi.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }) : '—';
  const tiempo = fi ? calcularTiempoEmpresa(fi) : null;
  const est  = (e.estado || 'activo').toLowerCase();
  const act  = est === 'activo';

  const campos = [
    ['fa-id-card',       'DNI',             e.dni],
    ['fa-envelope',      'Correo',          e.email],
    ['fa-phone',         'Teléfono',        e.celular || e.telefono],
    ['fa-briefcase',     'Cargo',           e.cargo || e.cargoOperaciones],
    ['fa-building',      'Empresa',         e.empresa],
    ['fa-map-marker-alt','Sede',            e.sede],
    ['fa-tags',          'Centro C.',       e.centroCosto],
    ['fa-sign-in-alt',   'F. Ingreso',      fiStr],
    ...(tiempo ? [['fa-clock', 'Tiempo', tiempo]] : []),
  ].filter(([, , v]) => v && v !== '—');

  $('#ps_modal_body').html(`
    <div class="ps_modal_top_accent ps_modal_top_accent--${est}"></div>
    
    <div class="ps_modal_hero">
      <div class="ps_avatar--xl">${av}</div>
      <div class="ps_modal_hero_tx">
        <div class="ps_modal_nombre">${Capit(e.nombres || '—')}</div>
        <div class="ps_modal_cargo">${Capit(e.cargo || e.cargoOperaciones || '—')}</div>
        <span class="ps_estado ps_estado--${est} ps_estado_modal">${est}</span>
      </div>
    </div>

    <!-- SECCIÓN: DATOS DE LECTURA DE COLABORADOR EN 3 COLUMNAS -->
    <div class="ps_modal_grid">
      ${campos.map(([ico, lbl, val]) => `
        <div class="ps_modal_row_pro">
          <div class="ps_modal_lbl_pro"><i class="fas ${ico}"></i> ${lbl}</div>
          <div class="ps_modal_val_pro">${Capit(String(val))}</div>
        </div>`).join('')}
    </div>

    <!-- SECCIÓN: CONTROL DE ESTADO ADMINISTRATIVO -->
    <div class="ps_admin_sec">
      <div class="ps_admin_title"><i class="fas fa-shield-alt"></i> Control de Acceso</div>
      <div class="ps_admin_grid">
        <div class="ps_admin_form_state">
          <div>
             <label class="ps_admin_form_lbl">Estado del Trabajador</label>
             <span id="mo_est_lbl" class="ps_admin_form_val ps_admin_form_val--${est}">${act ? 'Acceso Permitido (Activo)' : 'Acceso Suspendido (Inactivo)'}</span>
          </div>
          <div class="ps_mo_toggle_container">
            <label class="ps_mo_switch">
              <input type="checkbox" id="mo_estado" ${act ? 'checked' : ''}>
              <span class="ps_mo_slider"></span>
            </label>
          </div>
        </div>
      </div>
      <button class="ps_btn_save" id="btn_guardar_acc" data-dni="${e.id}">
        <i class="fas fa-check-double"></i> Guardar Estado
      </button>
    </div>
  `);
  abrirModal('modal_perfil');
}

// ─── EVENTOS ──────────────────────────────────────────────────────
function _bindEvents() {
  // Disparar consulta también al darle Enter a los nuevos inputs
  $(document).on('keydown.ps', '#ps_q, #ps_cc, #ps_fecha_ini, #ps_fecha_fin', e => { if (e.key === 'Enter') _realizarConsulta('init'); });
  $(document).on('click.ps', '#ps_buscar', () => _realizarConsulta('init'));

  $(document).on('click.ps', '#ps_limpiar', () => {
    $('#ps_q, #ps_estado, #ps_cc, #ps_fecha_ini, #ps_fecha_fin').val('');
    st.pagina = 1;
    _personas = [];
    $('#ps_resultados').html(`<div class="ps_inicio"><i class="fas fa-users"></i><p>Pulsa buscar o usa los filtros para traer los registros.</p></div>`);
    $('#ps_pag').addClass('ps_d_none');
  });

  $(document).on('click.ps', '#ps_pag .ps_pag_btn:not([disabled])', function() {
    const p = $(this).data('p');
    if (p === 'prev') { st.pagina = Math.max(1, st.pagina - 1); _realizarConsulta('prev'); } 
    else if (p === 'next') { st.pagina++; _realizarConsulta('next'); }
  });

  $(document).on('click.ps', '.ps_btn_ver', function() { _abrirPerfil(String($(this).data('id'))); });

  // Toggles de Admin en Modal
  $(document).on('change', '#mo_estado', function() {
    const act = this.checked;
    $('#mo_est_lbl')
      .text(act ? 'Acceso Permitido (Activo)' : 'Acceso Suspendido (Inactivo)')
      .removeClass('ps_admin_form_val--activo ps_admin_form_val--inactivo')
      .addClass(act ? 'ps_admin_form_val--activo' : 'ps_admin_form_val--inactivo');
  });

  // Guardar Cambios de Estado en Firebase
  $(document).on('click.ps', '#btn_guardar_acc', async function() {
    const dniId = $(this).data('dni'); // Este es el ID del documento en firebase
    const nvoEst = $('#mo_estado').is(':checked') ? 'activo' : 'inactivo';
    const $btn = $(this);
    
    const user = _personas.find(p => String(p.id) === String(dniId));
    if(!user) return; // Parche si no se encuentra el doc

    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Grabando en Sistema...');
    
    try {
      await updateDoc(doc(db, 'smiles', user.id), { estado: nvoEst, actualizadoEn: serverTimestamp() });
      _updateMutationInCache(user.dni, { estado: nvoEst });
      
      user.estado = nvoEst;

      // Actualizar tarjeta en UI de manera instantánea
      const $card = $(`.ps_card[data-id="${user.id}"]`);
      $card.find('.ps_avatar').removeClass('ps_avatar--activo ps_avatar--inactivo').addClass('ps_avatar--' + nvoEst);
      $card.find('.ps_estado').attr('class', 'ps_estado ps_estado--' + nvoEst).text(nvoEst);
      
      localStorage.removeItem('amTotalActivos');
      localStorage.removeItem('amTotalInactivos');
      Mensaje('Estado del trabajador actualizado.', 'success');
      cerrarTodos();
    } catch(e) {
      console.error(e);
      Mensaje('Fallo de conexión al guardar cambios.', 'error');
      $btn.prop('disabled', false).html('<i class="fas fa-check-double"></i> Reintentar Guardado');
    }
  });
}
