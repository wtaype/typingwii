import './buscar.css';
import $ from 'jquery';
import { getls, savels, Capit, avatar, abrirModal, calcularTiempoEmpresa } from '../../widev.js';
import { db } from '../firebase.js';
import { collection, query, where, getDocs, limit, startAfter, orderBy, startAt, endAt, endBefore, limitToLast } from 'firebase/firestore';

const wi = () => getls('wiSmile');
let _personas = [], _firstDoc = null, _lastDoc = null;
const st = { pagina: 1, porPagina: 10, buscando: false, hasMore: false };
const C_KEY = 'peBuscarDb';
const _getHash = () => `q:${($('#bk_q').val()||'').trim().toLowerCase()}|est:${$('#bk_estado').val()}|cc:${($('#bk_cc').val()||'').trim()}|fi:${$('#bk_fecha_ini').val()}|ff:${$('#bk_fecha_fin').val()}`;

function _readCache(h) { const c = getls(C_KEY) || {}; return c[h] ? c[h].data : null; }
function _writeCache(h, d) {
  let c = getls(C_KEY) || {};
  c[h] = { data: d, ts: Date.now() };
  const k = Object.keys(c).sort((a, b) => c[b].ts - c[a].ts);
  if (k.length > 10) k.slice(10).forEach(x => delete c[x]);
  savels(C_KEY, c, 5);
}

export const render = async () => {
  if (!wi()) return `<div class="bk_wrap"><div class="bk_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;
  return `
  <div class="bk_wrap" id="bk_root">
    <div class="bk_hero">
      <div class="bk_hero_icon"><i class="fas fa-search"></i></div>
      <div class="bk_hero_txt">
        <h2>Buscar Colaboradores</h2>
        <p>Búsqueda rápida optimizada sin consumos excesivos de base de datos.</p>
      </div>
    </div>
    <div class="bk_panel_blanco">
      <div class="bk_pb_row bk_pb_row--main">
        <div class="bk_pb_col grow-2">
          <label><i class="fas fa-search" style="color:var(--mco)"></i> Consulta Principal</label>
          <input type="text" id="bk_q" class="bk_pb_input" placeholder="Ingresa DNI, Apellido o Correo electrónico..." autocomplete="off">
        </div>
        <div class="bk_pb_action">
          <button class="bk_btn_buscar" id="bk_buscar"><i class="fas fa-search"></i> Buscar</button>
          <button class="bk_btn_limpiar" id="bk_limpiar" title="Limpiar"><i class="fas fa-eraser"></i></button>
        </div>
      </div>
      <div class="bk_pb_row bk_filtros_avanzados">
        <div class="bk_pb_col"><label>Estado</label><select id="bk_estado" class="bk_pb_select"><option value="">Cualquiera</option><option value="activo">Activo</option><option value="inactivo">Inactivo</option></select></div>
        <div class="bk_pb_col"><label>Centro Costo</label><input type="text" id="bk_cc" class="bk_pb_input" placeholder="Ej. Comercial"></div>
        <div class="bk_pb_col"><label>Desde</label><input type="date" id="bk_fecha_ini" class="bk_pb_input"></div>
        <div class="bk_pb_col"><label>Hasta</label><input type="date" id="bk_fecha_fin" class="bk_pb_input"></div>
      </div>
    </div>
    <div id="bk_resultados"><div class="bk_inicio"><i class="fas fa-users"></i><p>Pulsa buscar para iniciar.</p></div></div>
    <div class="bk_pag bk_d_none" id="bk_pag"></div>
    <div id="modal_perfil" class="wiModal"><div class="modalBody bk_modal_pro"><button class="modalX"><i class="fas fa-times"></i></button><div id="bk_modal_body"></div></div></div>
  </div>`;
};

export const init = async () => { if (wi()) _bindEvents(); };
export const cleanup = () => $(document).off('.bk');

async function _realizarConsulta(dir = 'init') {
  const qStr = ($('#bk_q').val() || '').trim().toLowerCase();
  const est = $('#bk_estado').val(), cc = ($('#bk_cc').val() || '').trim();
  const fIni = $('#bk_fecha_ini').val(), fFin = $('#bk_fecha_fin').val();
  const hash = _getHash();
  if (st.buscando) return;
  st.buscando = true;
  const $btns = $('#bk_buscar, #bk_limpiar, .bk_pag_btn').prop('disabled', true);
  
  if (dir === 'init') {
    const cached = _readCache(hash);
    if (cached) {
      _personas = cached; st.pagina = 1; _firstDoc = _lastDoc = null; st.hasMore = false; 
      _renderResultados(true); _renderPag(true);
      st.buscando = false; $btns.prop('disabled', false);
      return;
    }
  }

  $('#bk_resultados').html(`<div class="bk_loading"><i class="fas fa-spinner fa-spin"></i> Consultando...</div>`);
  try {
    let constraints = [], runLocal = false, hasName = false;
    if (qStr) {
      if (qStr.includes('@')) constraints.push(where('email', '==', qStr));
      else if (/^\d+$/.test(qStr)) constraints.push(where(qStr.length > 8 ? 'celular' : 'dni', '==', qStr));
      else { constraints.push(orderBy('nombres', 'asc'), startAt(qStr), endAt(qStr + '\uf8ff')); hasName = true; }
    }
    if (est) { if (hasName) runLocal = true; else constraints.push(where('estado', '==', est)); }
    if (cc)  { if (hasName) runLocal = true; else constraints.push(where('centroCosto', '==', cc)); }
    if (fIni || fFin) {
      if (hasName) runLocal = true;
      else {
        if (fIni) constraints.push(where('fechaIngreso', '>=', new Date(fIni + 'T00:00:00')));
        if (fFin) constraints.push(where('fechaIngreso', '<=', new Date(fFin + 'T23:59:59')));
        constraints.push(orderBy('fechaIngreso', 'desc'));
      }
    }

    let qRef = query(collection(db, 'smiles'), ...constraints);
    if (!runLocal) {
      if (dir === 'next' && _lastDoc) qRef = query(qRef, startAfter(_lastDoc), limit(st.porPagina));
      else if (dir === 'prev' && _firstDoc) qRef = query(qRef, endBefore(_firstDoc), limitToLast(st.porPagina));
      else { qRef = query(qRef, limit(st.porPagina)); st.pagina = 1; }
    } else st.pagina = 1;

    const snap = await getDocs(qRef);
    let docs = snap.docs;
    if (runLocal) {
      docs = docs.filter(d => {
        const x = d.data();
        if (est && (x.estado||'activo').toLowerCase() !== est.toLowerCase()) return false;
        if (cc && (x.centroCosto||'').toLowerCase() !== cc.toLowerCase()) return false;
        if (fIni || fFin) {
          const t = x.fechaIngreso?.seconds ? x.fechaIngreso.seconds * 1000 : 0;
          if (!t) return false;
          if (fIni && t < new Date(fIni + 'T00:00:00').getTime()) return false;
          if (fFin && t > new Date(fFin + 'T23:59:59').getTime()) return false;
        }
        if (qStr && x.nombres && !x.nombres.toLowerCase().includes(qStr)) return false;
        return true;
      });
      st.hasMore = false;
    }

    if (snap.empty && dir !== 'init') { if (dir === 'next') st.hasMore = false; _renderPag(false); return; }
    if (!runLocal) {
      st.hasMore = docs.length === st.porPagina;
      _firstDoc = docs[0] || null; _lastDoc = docs[docs.length - 1] || null;
    }

    _personas = docs.map(d => ({ id: d.id, ...d.data() }));
    if (dir === 'init') _writeCache(hash, _personas);
    _renderResultados(false); _renderPag(false);

  } catch (e) {
    let err = '<p>Error de consulta.</p>';
    if (e.message.includes('MULTIPLE_INEQUALITY')) err = '<p>Consulta muy compleja. Busca por Nombre o Fechas, no ambas a la vez.</p>';
    else if (e.message.includes('index')) err = '<p>Se requiere un índice Firestore para esta combinación.</p>';
    $('#bk_resultados').html(`<div class="bk_empty"><i class="fas fa-exclamation-circle" style="color:var(--error); font-size:4vh;"></i> ${err}</div>`);
  } finally {
    st.buscando = false; $btns.prop('disabled', false);
  }
}

function _renderResultados(cached) {
  if (!_personas.length) { $('#bk_resultados').html(`<div class="bk_empty"><i class="fas fa-search"></i><p>Sin resultados.</p></div>`); $('#bk_pag').addClass('bk_d_none'); return; }
  $('#bk_resultados').html(`<div class="bk_info">Viendo <b>${_personas.length}</b> perfiles ${cached ? '<span class="bk_cash_badge">CACHÉ ACTIVA</span>' : ''}</div><div class="bk_grid">${_personas.map(_htmlTarjeta).join('')}</div>`);
}

function _htmlTarjeta(e) {
  const av = e.avatar || (e.nombres ? avatar(e.nombres) : '??'), est = (e.estado||'activo').toLowerCase();
  const t = e.fechaIngreso?.seconds ? calcularTiempoEmpresa(new Date(e.fechaIngreso.seconds * 1000)) : null;
  return `<div class="bk_card" data-id="${e.id}"><div class="bk_card_top"><div class="bk_avatar">${av}</div><span class="bk_estado bk_estado--${est}">${est}</span></div><div class="bk_card_nombre">${Capit(e.nombres||'—')}</div><div class="bk_card_cargo">${Capit(e.cargo||e.cargoOperaciones||'—')}</div><div class="bk_card_datos"><div><i class="fas fa-id-card"></i> ${e.dni||'—'}</div><div><i class="fas fa-map-marker-alt"></i> ${Capit(e.sede||'—')}</div><div><i class="fas fa-envelope"></i> ${e.email||'—'}</div>${t ? `<div><i class="fas fa-clock"></i> ${t}</div>` : ''}</div><button class="bk_btn_ver bk_ver" data-id="${e.id}"><i class="fas fa-eye"></i> Perfil</button></div>`;
}

function _renderPag(c) {
  const $p = $('#bk_pag');
  if (st.pagina === 1 && !st.hasMore && !_personas.length) return $p.addClass('bk_d_none');
  $p.removeClass('bk_d_none').html(`<span class="bk_pag_info">Página <b>${st.pagina}</b></span><div class="bk_pag_btns"><button class="bk_pag_btn" data-p="prev" ${st.pagina <= 1 ? 'disabled' : ''}><i class="fas fa-angle-left"></i></button><button class="bk_pag_btn" data-p="next" ${!st.hasMore || c ? 'disabled' : ''}><i class="fas fa-angle-right"></i></button></div>`);
}

function _abrirPerfil(id) {
  const e = _personas.find(x => x.id === id || String(x.dni) === String(id));
  if (!e) return;
  const fi = e.fechaIngreso?.seconds ? new Date(e.fechaIngreso.seconds * 1000) : null;
  const c = [['fa-id-card','DNI',e.dni],['fa-envelope','Correo',e.email],['fa-phone','Teléfonos',e.telefono||e.celular],['fa-briefcase','Cargo',e.cargo||e.cargoOperaciones],['fa-building','Empresa',e.empresa],['fa-map-marker-alt','Sede',e.sede],['fa-tags','Centro Costo',e.centroCosto],['fa-users','Grupo',e.grupo],['fa-file-contract','Labor',e.TipoLabor],['fa-sign-in-alt','Ingreso',fi?fi.toLocaleDateString('es-PE'):'—'],...(fi?[['fa-clock','Antigüedad',calcularTiempoEmpresa(fi)]]:[]),['fa-user-tag','Rol',e.rol]].filter(x => x[2] && x[2] !== '—');
  $('#bk_modal_body').html(`<div class="bk_modal_top_accent" style="height:10vh;background:linear-gradient(135deg,var(--mco),var(--mco_dark,var(--mco)));border-radius:1vh 1vh 0 0;position:absolute;top:0;left:0;width:100%;"></div><div class="bk_modal_hero" style="position:relative;z-index:2;margin-top:2vh;"><div class="bk_avatar bk_avatar--xl" style="box-shadow:0 6px 20px rgba(0,0,0,0.15);border:4px solid var(--wb);">${e.avatar||(e.nombres?avatar(e.nombres):'??')}</div><div class="bk_modal_hero_tx"><div class="bk_modal_nombre">${Capit(e.nombres||'—')}</div><div class="bk_modal_cargo">${Capit(e.cargo||e.cargoOperaciones||'—')}</div><span class="bk_estado bk_estado--${(e.estado||'activo').toLowerCase()}" style="margin-top:.5vh;">${e.estado||'activo'}</span></div></div><div class="bk_modal_grid">${c.map(x => `<div class="bk_modal_row_pro"><div class="bk_modal_lbl_pro"><i class="fas ${x[0]}"></i> ${x[1]}</div><div class="bk_modal_val_pro">${Capit(String(x[2]))}</div></div>`).join('')}</div>`);
  abrirModal('modal_perfil');
}

function _bindEvents() {
  $(document).on('input.bk', '#bk_q, #bk_cc', function() { const s = this.selectionStart, e = this.selectionEnd; this.value = this.value.toLowerCase(); this.setSelectionRange(s, e); });
  $(document).on('keydown.bk', '#bk_q,#bk_cc,#bk_fecha_ini,#bk_fecha_fin', e => { if (e.key === 'Enter') _realizarConsulta('init'); });
  $(document).on('click.bk', '#bk_buscar', () => _realizarConsulta('init'));
  $(document).on('click.bk', '#bk_limpiar', () => { $('#bk_q,#bk_cc,#bk_fecha_ini,#bk_fecha_fin,#bk_estado').val(''); st.pagina = 1; _personas = []; $('#bk_resultados').html(`<div class="bk_inicio"><i class="fas fa-users"></i><p>Pulsa buscar para iniciar.</p></div>`); $('#bk_pag').addClass('bk_d_none'); });
  $(document).on('click.bk', '#bk_pag .bk_pag_btn:not([disabled])', function() { const p = $(this).data('p'); if (p === 'prev') { st.pagina = Math.max(1, st.pagina - 1); _realizarConsulta('prev'); } else if (p === 'next') { st.pagina++; _realizarConsulta('next'); } });
  $(document).on('click.bk', '.bk_ver', function() { _abrirPerfil(String($(this).data('id'))); });
}
