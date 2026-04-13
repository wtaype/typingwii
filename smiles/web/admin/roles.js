/**
 * roles.js — Módulo Roles (Admin)
 * Búsqueda Inteligente (Cache 10 consultas) + Permisos Administrador (Rol de Sistema)
 * Exports: render | init | cleanup
 */

import './admin.css';
import './roles.css';
import $ from 'jquery';
import { getls, savels, Capit, avatar, abrirModal, cerrarTodos, Mensaje } from '../../widev.js';
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
const C_KEY = 'amRoles';
const _getHash = () => `q:${($('#rl_q').val() || '').trim().toLowerCase()}|rol:${$('#rl_filtro_rol').val()}`;

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
    let item = c[k].data.find(x => x.dni === dni || x.id === dni);
    if (item) { Object.assign(item, attrs); changed = true; }
  });
  if (changed) savels(C_KEY, c, 5);
}

// ─── RENDER ──────────────────────────────────────────────────────
export const render = async () => {
  if (!guard()) return `<div class="rl_wrap"><div class="rl_empty"><i class="fas fa-lock"></i><p>Sin acceso.</p></div></div>`;

  return `
  <div class="rl_wrap" id="rl_root">

    <!-- HERO -->
    <div class="rl_hero">
      <div class="rl_hero_icon"><i class="fas fa-shield-alt"></i></div>
      <div class="rl_hero_txt">
        <h2>Gestión de Roles</h2>
        <p>Edita jerarquías y privilegios de acceso del sistema.</p>
      </div>
    </div>

    <!-- PANEL DE BÚSQUEDA BLANCO -->
    <div class="rl_panel_blanco">
      
      <!-- Fila Principal: Buscador Inteligente -->
      <div class="rl_pb_row rl_pb_row--main">
        <div class="rl_pb_col grow-2">
          <label><i class="fas fa-search rl_ico_mco"></i> Consulta de Roles</label>
          <input type="text" id="rl_q" class="rl_pb_input" placeholder="Ingresa Nombre, DNI o Correo electrónico..." autocomplete="off">
        </div>
        <div class="rl_pb_col">
          <label>Filtro por Rol</label>
          <select id="rl_filtro_rol" class="rl_pb_select">
            <option value="">Todos los Roles</option>
            <option value="smile">Smile (Empleado)</option>
            <option value="people">People (Recursos Humanos)</option>
            <option value="admin">Admin (Administrador)</option>
          </select>
        </div>
        <div class="rl_pb_action">
          <button class="rl_btn_buscar" id="rl_buscar"><i class="fas fa-search"></i> Buscar</button>
          <button class="rl_btn_limpiar" id="rl_limpiar" title="Limpiar y reiniciar"><i class="fas fa-eraser"></i></button>
        </div>
      </div>

    </div>

    <!-- RESULTADOS -->
    <div id="rl_resultados">
      <div class="rl_inicio">
        <i class="fas fa-user-tag"></i>
        <p>Busca un colaborador o selecciona un rol para listar.</p>
      </div>
    </div>

    <!-- PAGINACIÓN -->
    <div class="rl_pag rl_d_none" id="rl_pag"></div>

    <!-- MODAL PERFIL PRO (Utilizando wiModal) -->
    <div id="modal_roles" class="wiModal">
      <div class="modalBody rl_modal_pro">
        <button class="modalX" title="Cerrar"><i class="fas fa-times"></i></button>
        <div id="rl_modal_body"></div>
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
  $(document).off('.rl');
};

// ─── BÚSQUEDA INTELIGENTE Y CACHÉ ──────────────────────────────────
async function _realizarConsulta(dir = 'init') {
  const qStr = ($('#rl_q').val() || '').trim().toLowerCase();
  const rolFil = $('#rl_filtro_rol').val();
  const hash = _getHash();

  if (st.buscando) return;
  st.buscando = true;

  const $btns = $('#rl_buscar, #rl_limpiar, .rl_pag_btn').prop('disabled', true);
  
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

  $('#rl_resultados').html(`<div class="rl_loading"><i class="fas fa-spinner fa-spin"></i> Obteniendo perfiles...</div>`);

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

    // ESTRATEGIA "NO-INDEX": Evitamos Firebase crash al cruzar un texto y una igualdad
    let runLocalFilters = false;

    // 2. FILTRO ROL
    if (rolFil) {
      if (hasNamePrefix) runLocalFilters = true;
      else constraints.push(where('rol', '==', rolFil));
    }

    let qRef = query(collection(db, 'smiles'), ...constraints);

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
      st.pagina = 1;
    }

    const snap = await getDocs(qRef);
    let docs = snap.docs;

    // ESTRATEGIA R.A.M. (No-Index Compatibility)
    if (runLocalFilters) {
      docs = docs.filter(d => {
         const data = d.data();
         if (rolFil && (data.rol || 'smile').toLowerCase() !== rolFil.toLowerCase()) return false;
         return true;
      });
      st.hasMore = false; 
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
    if (e.message && e.message.includes('index')) {
      errHTML = `<p><b>Requiere índice:</b> Esta combinación de filtros necesita un índice compuesto en Firestore.</p>`;
    }
    $('#rl_resultados').html(`<div class="rl_empty"><i class="fas fa-exclamation-circle rl_ico_err"></i>${errHTML}</div>`);
  } finally {
    st.buscando = false;
    $btns.prop('disabled', false);
  }
}

// ─── RENDER RESULTADOS ────────────────────────────────────────────
function _renderResultados(isCached) {
  if (!_personas.length) {
    $('#rl_resultados').html(`<div class="rl_empty"><i class="fas fa-search"></i><p>No se encontraron perfiles.</p></div>`);
    $('#rl_pag').addClass('rl_d_none');
    return;
  }
  const grid = `<div class="rl_info">Mostrando <b>${_personas.length}</b> perfiles detectados ${isCached ? '<span class="rl_cash_badge">CACHÉ ACTIVA</span>' : ''}</div>
                <div class="rl_grid">${_personas.map(_htmlTarjeta).join('')}</div>`;
  $('#rl_resultados').html(grid);
}

function _htmlTarjeta(e) {
  const av   = e.avatar || (e.nombres ? avatar(e.nombres) : '??');
  const rol  = (e.rol || 'smile').toLowerCase();
  
  return `
    <div class="rl_card" data-id="${e.id}">
      <div class="rl_avatar">${av}</div>
      <span class="rl_rol_badge rl_rol_badge--${rol}">${rol}</span>
      <div class="rl_card_nombre">${Capit(e.nombres || '—')}</div>
      <div class="rl_card_cargo">${Capit(e.cargo || e.cargoOperaciones || '—')}</div>
      <div class="rl_card_datos">
        <div><i class="fas fa-id-card"></i> ${e.dni || '—'}</div>
        <div><i class="fas fa-envelope"></i> ${e.email || '—'}</div>
      </div>
      <button class="rl_btn_edit" data-id="${e.id}">
        <i class="fas fa-user-shield"></i> Ver Accesos
      </button>
    </div>`;
}

// ─── PAGINACIÓN ───────────────────────────────────────────────────
function _renderPag(isCached) {
  const $pag = $('#rl_pag');
  if (st.pagina === 1 && !st.hasMore && _personas.length === 0) { $pag.addClass('rl_d_none'); return; }
  
  $pag.removeClass('rl_d_none').html(`
    <span class="rl_pag_info">Página <b>${st.pagina}</b></span>
    <div class="rl_pag_btns">
      <button class="rl_pag_btn" data-p="prev" ${st.pagina <= 1 ? 'disabled' : ''}><i class="fas fa-angle-left"></i> Anterior</button>
      <button class="rl_pag_btn" data-p="next" ${!st.hasMore || isCached ? 'disabled' : ''}>Siguiente <i class="fas fa-angle-right"></i></button>
    </div>
  `);
}

// ─── MODAL PERFIL + ADMIN SOLO ROLES ─────────────────────────────
function _abrirPerfil(dniId) {
  const e = _personas.find(x => String(x.dni) === String(dniId) || String(x.id) === String(dniId));
  if (!e) return;

  const av  = e.avatar || (e.nombres ? avatar(e.nombres) : '??');
  const rol = (e.rol || 'smile').toLowerCase();

  const campos = [
    ['fa-id-card',       'DNI',             e.dni],
    ['fa-envelope',      'Correo',          e.email],
    ['fa-phone',         'Teléfono',        e.celular || e.telefono],
    ['fa-briefcase',     'Cargo',           e.cargo || e.cargoOperaciones],
    ['fa-building',      'Empresa',         e.empresa],
    ['fa-map-marker-alt','Sede',            e.sede]
  ].filter(([, , v]) => v && v !== '—');

  $('#rl_modal_body').html(`
    <div class="rl_modal_top_accent rl_modal_top_accent--${rol}"></div>
    
    <div class="rl_modal_hero">
      <div class="rl_avatar--xl">${av}</div>
      <div class="rl_modal_hero_tx">
        <div class="rl_modal_nombre">${Capit(e.nombres || '—')}</div>
        <div class="rl_modal_cargo">${Capit(e.cargo || e.cargoOperaciones || '—')}</div>
      </div>
    </div>

    <!-- SECCIÓN: LECTURA EN 3 COLUMNAS -->
    <div class="rl_modal_grid">
      ${campos.map(([ico, lbl, val]) => `
        <div class="rl_modal_row_pro">
          <div class="rl_modal_lbl_pro"><i class="fas ${ico}"></i> ${lbl}</div>
          <div class="rl_modal_val_pro">${Capit(String(val))}</div>
        </div>`).join('')}
    </div>

    <!-- SECCIÓN: CONTROL ADMINISTRADOR JERÁRQUICO -->
    <div class="rl_admin_sec">
      <div class="rl_admin_title"><i class="fas fa-cogs"></i> Privilegios de Sistema</div>
      <div class="rl_admin_form">
         <label>Jerarquía Asignada</label>
         <select id="mo_rol_select" class="rl_admin_select">
            <option value="smile" ${rol === 'smile' ? 'selected' : ''}>Smile (Empleado regular)</option>
            <option value="people" ${rol === 'people' ? 'selected' : ''}>People (Recursos Humanos)</option>
            <option value="admin" ${rol === 'admin' ? 'selected' : ''}>Admin (Administrador Total)</option>
         </select>
      </div>
      <button class="rl_btn_save" id="btn_guardar_rol" data-id="${e.id}">
        <i class="fas fa-save"></i> Guardar Rol de Usuario
      </button>
    </div>
  `);
  abrirModal('modal_roles');
}

// ─── EVENTOS ──────────────────────────────────────────────────────
function _bindEvents() {
  $(document).on('keydown.rl', '#rl_q', e => { if (e.key === 'Enter') _realizarConsulta('init'); });
  $(document).on('change.rl', '#rl_filtro_rol', () => _realizarConsulta('init'));
  $(document).on('click.rl', '#rl_buscar', () => _realizarConsulta('init'));

  $(document).on('click.rl', '#rl_limpiar', () => {
    $('#rl_q, #rl_filtro_rol').val('');
    st.pagina = 1;
    _personas = [];
    $('#rl_resultados').html(`<div class="rl_inicio"><i class="fas fa-user-tag"></i><p>Busca un colaborador o selecciona un rol para listar.</p></div>`);
    $('#rl_pag').addClass('rl_d_none');
  });

  $(document).on('click.rl', '#rl_pag .rl_pag_btn:not([disabled])', function() {
    const p = $(this).data('p');
    if (p === 'prev') { st.pagina = Math.max(1, st.pagina - 1); _realizarConsulta('prev'); } 
    else if (p === 'next') { st.pagina++; _realizarConsulta('next'); }
  });

  $(document).on('click.rl', '.rl_btn_edit', function() { _abrirPerfil(String($(this).data('id'))); });

  // Guardar Cambios de Rol en Firebase
  $(document).on('click.rl', '#btn_guardar_rol', async function() {
    const docId = $(this).data('id');
    const nvoRol = $('#mo_rol_select').val();
    const $btn = $(this);
    
    const user = _personas.find(p => String(p.id) === String(docId));
    if(!user) return; 
    
    if ((user.rol || 'smile') === nvoRol) {
        Mensaje('El usuario ya cuenta con ese rol asignado.', 'info');
        cerrarTodos();
        return;
    }

    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Procesando...');
    
    try {
      await updateDoc(doc(db, 'smiles', user.id), { rol: nvoRol, actualizadoEn: serverTimestamp() });
      _updateMutationInCache(user.id, { rol: nvoRol });
      user.rol = nvoRol;

      // Actualizar tarjeta en UI de manera instantánea
      const $card = $(`.rl_card[data-id="${user.id}"]`);
      $card.find('.rl_rol_badge')
        .removeClass('rl_rol_badge--admin rl_rol_badge--people rl_rol_badge--smile')
        .addClass('rl_rol_badge--' + nvoRol).text(nvoRol);
      
      Mensaje('Rol del sistema actualizado correctamente.', 'success');
      cerrarTodos();
    } catch(e) {
      console.error(e);
      Mensaje('Fallo de conexión al guardar cambios.', 'error');
      $btn.prop('disabled', false).html('<i class="fas fa-save"></i> Reintentar Guardado');
    }
  });
}
