/**
 * equipo.js — Módulo Equipo People (usuarios con rol 'people')
 * Lista del equipo RRHH con su info y estado
 * Exports: render | init | cleanup
 */

import './equipo.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getls, savels, Capit, avatar, calcularTiempoEmpresa, abrirModal } from '../../widev.js';

const wi = () => getls('wiSmile');

// ─── CONSTANTES Y ESTADO ─────────────────────────────────────────
const K_EQUIPO = 'peEquipo';
const st = { equipo: [] };

// ─── RENDER ──────────────────────────────────────────────────────
export const render = async () => {
  if (!wi()) return `<div class="eq_wrap"><div class="eq_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;

  return `
  <div class="eq_wrap" id="eq_root">

    <!-- HERO -->
    <div class="eq_hero">
      <div class="eq_hero_icon"><i class="fas fa-users-cog"></i></div>
      <div class="eq_hero_txt">
        <h2>Equipo People</h2>
        <p>Gestores de RRHH con acceso al sistema</p>
      </div>
      <div class="eq_hero_badge" id="eq_count">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </div>

    <!-- BUSCADOR LOCAL -->
    <div class="eq_controles">
      <div class="eq_busqueda">
        <i class="fas fa-search"></i>
        <input type="text" id="eq_q" placeholder="Buscar en el equipo…">
      </div>
      <button class="eq_btn_refresh" id="eq_refresh">
        <i class="fas fa-sync-alt"></i> Actualizar
      </button>
    </div>

    <!-- LISTA -->
    <div id="eq_lista">
      <div class="eq_loading"><i class="fas fa-spinner fa-spin"></i></div>
    </div>

    <!-- MODAL PERFIL PRO -->
    <div id="modal_equipo" class="wiModal">
      <div class="modalBody eq_modal_pro">
        <button class="modalX" title="Cerrar"><i class="fas fa-times"></i></button>
        <div id="eq_modal_body"></div>
      </div>
    </div>

  </div>`;
};

// ─── INIT ─────────────────────────────────────────────────────────
export const init = async () => {
  if (!wi()) return;
  await _cargarEquipo();
  _bindEvents();
};

// ─── CLEANUP ──────────────────────────────────────────────────────
export const cleanup = () => {
  $(document).off('.eq');
};

// ─── CARGAR EQUIPO ────────────────────────────────────────────────
async function _cargarEquipo(forzar = false) {
  if (!forzar) {
    const cache = getls(K_EQUIPO);
    if (cache && cache.length) {
      st.equipo = cache;
      _dibujarResumen();
      return;
    }
  }

  $('#eq_refresh').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i>');
  if (forzar) $('#eq_lista').html(`<div class="eq_loading"><i class="fas fa-spinner fa-spin"></i></div>`);

  try {
    const snap = await getDocs(query(
      collection(db, 'smiles'),
      where('rol', '==', 'people')
    ));
    st.equipo = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.nombres || '').localeCompare(b.nombres || ''));

    savels(K_EQUIPO, st.equipo, 4); // Cache 4 hrs
    _dibujarResumen();
  } catch (e) {
    console.error('[equipo]', e);
    $('#eq_lista').html(`<div class="eq_empty"><i class="fas fa-exclamation-circle" style="color:var(--error); font-size:4vh; margin-bottom:1vh;"></i><p>Error al cargar el equipo.</p></div>`);
  } finally {
    $('#eq_refresh').prop('disabled', false).html('<i class="fas fa-sync-alt"></i> Actualizar');
  }
}

function _dibujarResumen() {
  $('#eq_count').html(`<i class="fas fa-users"></i> ${st.equipo.length} miembro${st.equipo.length !== 1 ? 's' : ''}`);
  _renderLista(st.equipo);
}

// ─── RENDER LISTA ─────────────────────────────────────────────────
function _renderLista(datos) {
  if (!datos.length) {
    $('#eq_lista').html(`<div class="eq_empty"><i class="fas fa-user-slash"></i><p>No hay miembros en el equipo People.</p></div>`);
    return;
  }
  $('#eq_lista').html(`<div class="eq_grid">${datos.map(_htmlCard).join('')}</div>`);
}

function _htmlCard(e) {
  const av  = e.avatar || (e.nombres ? avatar(e.nombres) : '??');
  const est = (e.estado || 'activo').toLowerCase();
  const fi  = e.fechaIngreso?.seconds ? new Date(e.fechaIngreso.seconds * 1000) : null;
  const tiempo = fi ? calcularTiempoEmpresa(fi) : null;

  return `
    <div class="eq_card" data-id="${e.id}">
      <div class="eq_card_badge eq_badge--${est}">${est}</div>
      <div class="eq_avatar">${av}</div>
      <div class="eq_card_nombre">${Capit(e.nombres || '—')}</div>
      <div class="eq_card_cargo">${Capit(e.cargo || e.cargoOperaciones || 'People')}</div>
      <div class="eq_card_info">
        ${e.email    ? `<div><i class="fas fa-envelope"></i> ${e.email}</div>` : ''}
        ${e.sede     ? `<div><i class="fas fa-map-marker-alt"></i> ${Capit(e.sede)}</div>` : ''}
        ${tiempo     ? `<div><i class="fas fa-clock"></i> ${tiempo}</div>` : ''}
      </div>
      <button class="eq_btn_ver eq_ver" data-id="${e.id}">
        <i class="fas fa-eye"></i> Ver perfil
      </button>
    </div>`;
}

// ─── MODAL PERFIL ─────────────────────────────────────────────────
function _abrirPerfil(id) {
  const e = st.equipo.find(x => x.id === id);
  if (!e) return;

  const av  = e.avatar || (e.nombres ? avatar(e.nombres) : '??');
  const fi  = e.fechaIngreso?.seconds ? new Date(e.fechaIngreso.seconds * 1000) : null;
  const fiStr = fi ? fi.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }) : '—';
  const est  = (e.estado || 'activo').toLowerCase();

  const campos = [
    ['fa-id-card',       'DNI',             e.dni],
    ['fa-envelope',      'Correo',          e.email],
    ['fa-phone',         'Teléfono',        e.telefono],
    ['fa-briefcase',     'Cargo',           e.cargo || e.cargoOperaciones],
    ['fa-building',      'Empresa',         e.empresa],
    ['fa-map-marker-alt','Sede',            e.sede],
    ['fa-tags',          'Centro de Costo', e.centroCosto],
    ['fa-file-contract', 'Tipo Labor',      e.TipoLabor],
    ['fa-sign-in-alt',   'Fecha Ingreso',   fiStr],
    ['fa-user-shield',   'Rol',             e.rol],
  ].filter(([,, v]) => v && v !== '—');

  $('#eq_modal_body').html(`
    <div class="eq_modal_top_accent" style="height: 10vh; background: linear-gradient(135deg, var(--mco), var(--mco_dark, var(--mco))); border-radius: 1vh 1vh 0 0; position: absolute; top:0; left:0; width:100%;"></div>
    
    <div class="eq_modal_hero" style="position:relative; z-index:2; margin-top: 2vh;">
      <div class="eq_avatar eq_avatar--xl" style="box-shadow: 0 6px 20px rgba(0,0,0,0.15); border: 4px solid var(--wb);">${av}</div>
      <div class="eq_modal_hero_tx">
        <div class="eq_modal_nombre">${Capit(e.nombres || '—')}</div>
        <div class="eq_modal_cargo">${Capit(e.cargo || e.cargoOperaciones || 'People')}</div>
        <span class="eq_badge eq_badge--${est}" style="margin-top: 0.5vh;">${est}</span>
      </div>
    </div>

    <div class="eq_modal_grid">
      ${campos.map(([ico, lbl, val]) => `
        <div class="eq_modal_row_pro">
          <div class="eq_modal_lbl_pro"><i class="fas ${ico}"></i> ${lbl}</div>
          <div class="eq_modal_val_pro">${Capit(String(val))}</div>
        </div>`).join('')}
    </div>
  `);
  abrirModal('modal_equipo');
}

// ─── BÚSQUEDA LOCAL ───────────────────────────────────────────────
function _filtrarLocal() {
  const t = ($('#eq_q').val() || '').toLowerCase();
  if (!t) { _renderLista(st.equipo); return; }
  _renderLista(st.equipo.filter(e =>
    (e.nombres || '').toLowerCase().includes(t) ||
    (e.email   || '').toLowerCase().includes(t) ||
    (e.cargo   || '').toLowerCase().includes(t)
  ));
}

function _bindEvents() {
  let t;
  $(document).on('input.eq', '#eq_q', () => { clearTimeout(t); t = setTimeout(_filtrarLocal, 250); });
  $(document).on('click.eq', '#eq_refresh', () => _cargarEquipo(true));
  $(document).on('click.eq', '.eq_ver', function() { _abrirPerfil(String($(this).data('id'))); });
}
