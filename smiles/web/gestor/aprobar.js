/**
 * aprobar.js — Módulo Aprobar Solicitudes (People)
 * Lógica: tarjetas pendientes + tabla filtrable + modal detalle + Excel
 * Exports: render | init | cleanup
 */

import './aprobar.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import {
  collection, query, where, orderBy, limit,
  getDocs, getDoc, doc, updateDoc, onSnapshot, serverTimestamp, getCountFromServer
} from 'firebase/firestore';
import * as ExcelJS from 'exceljs';
import {
  getls, savels, Mensaje, abrirModal, cerrarTodos,
  Capit, avatar, formatearFechaHora, formatearFechasEscogidas, getNombre, getRangoFechas, 
  getTiempoEmpresa, getCelular, getCumpleanos, fnToDate
} from '../../widev.js';

const wi = () => getls('wiSmile');
const K_METRICA  = 'peMetricas';
const K_REALTIME = 'peRealTime';
const K_LISTA    = 'peSolicitudes';

// ─── ESTADO ──────────────────────────────────────────────────────
const st = {
  datos:       [],       // caché local
  filtrados:   [],       // resultado tras filtros
  pagina:      1,
  porPagina:   10,
  datosSub:    null,     // onSnapshot listar 50 
  pendSub:     null,     // onSnapshot conteo pendientes
  modalId:     null,     // id de solicitud abierta en modal
};

// ─── RENDER ──────────────────────────────────────────────────────
export const render = async () => {
  const u = wi();
  if (!u) return `<div class="ap_wrap"><div class="ap_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;

  return `
  <div class="ap_wrap" id="ap_root">

    <!-- HERO -->
    <div class="ap_hero">
      <div class="ap_hero_icon"><i class="fas fa-clipboard-check"></i></div>
      <div class="ap_hero_txt">
        <h2>Bienvenido ${getNombre(u)}</h2>
        <p>Revisa, aprueba o rechaza las solicitudes de tu equipo</p>
      </div>
      <div class="ap_hero_actions">
        <label class="ap_toggle_wrap" title="Activar para recibir cambios sin recargar">
          <span class="ap_toggle_label">Tiempo Real</span>
          <div class="ap_toggle">
            <input type="checkbox" id="ap_realtime_toggle">
            <span class="ap_toggle_slider"></span>
          </div>
        </label>
        <button class="ap_hero_refresh" id="ap_hero_refresh" title="Actualizar datos">
          <i class="fas fa-sync-alt"></i> Actualizar
        </button>
      </div>
    </div>

    <!-- KPIs -->
    <div class="ap_kpis">
      <div class="ap_kpi ap_kpi--pend">
        <div class="ap_kpi_icon"><i class="fas fa-clock"></i></div>
        <div class="ap_kpi_body">
          <div class="ap_kpi_num" id="ap_kpi_pend"><i class="fas fa-spinner fa-spin"></i></div>
          <div class="ap_kpi_label">Pendientes</div>
        </div>
      </div>
      <div class="ap_kpi ap_kpi--apro">
        <div class="ap_kpi_icon"><i class="fas fa-check-circle"></i></div>
        <div class="ap_kpi_body">
          <div class="ap_kpi_num" id="ap_kpi_apro"><i class="fas fa-spinner fa-spin"></i></div>
          <div class="ap_kpi_label">Aprobadas hoy</div>
        </div>
      </div>
      <div class="ap_kpi ap_kpi--rech">
        <div class="ap_kpi_icon"><i class="fas fa-times-circle"></i></div>
        <div class="ap_kpi_body">
          <div class="ap_kpi_num" id="ap_kpi_rech"><i class="fas fa-spinner fa-spin"></i></div>
          <div class="ap_kpi_label">Rechazadas hoy</div>
        </div>
      </div>
      <div class="ap_kpi ap_kpi--total">
        <div class="ap_kpi_icon"><i class="fas fa-layer-group"></i></div>
        <div class="ap_kpi_body">
          <div class="ap_kpi_num" id="ap_kpi_total"><i class="fas fa-spinner fa-spin"></i></div>
          <div class="ap_kpi_label">Total Solicitudes</div>
        </div>
      </div>
    </div>

    <!-- TARJETAS PENDIENTES -->
    <div class="ap_section_title">
      <i class="fas fa-clock"></i> Pendientes de revisión
    </div>
    <div id="ap_cards">
      <div class="ap_loading"><i class="fas fa-spinner fa-spin"></i></div>
    </div>

    <!-- CONTROLES / FILTROS -->
    <div class="ap_controles">
      <div class="ap_controles_grp">
        <div class="ap_busqueda">
          <i class="fas fa-search"></i>
          <input type="text" id="ap_q" placeholder="Buscar por nombre, DNI, cargo…">
        </div>
      </div>
      <div class="ap_controles_grp">
        <select class="ap_sel ap_w_full" id="ap_filtro_estado">
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendientes</option>
          <option value="aprobado">Aprobados</option>
          <option value="rechazado">Rechazados</option>
        </select>
      </div>
      <div class="ap_controles_grp ap_grp_end">
        <input type="date" class="ap_sel" id="ap_fecha_ini" title="Desde">
        <input type="date" class="ap_sel" id="ap_fecha_fin" title="Hasta">
        <button class="ap_btn_export" id="ap_excel" title="Exportar a Excel">
          <i class="fas fa-file-excel"></i> <span>Exportar Excel</span>
        </button>
      </div>
    </div>

    <!-- TABLA -->
    <div class="ap_table_wrap">
      <table class="ap_table" id="ap_tabla">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Empleado</th>
            <th>CORREO ELECTRÓNICO</th>
            <th>Beneficio</th>
            <th>Solicitado</th>
            <th>Fecha Respuesta</th>
            <th>Respuesta People</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="ap_tbody">
          <tr><td colspan="9" class="ap_loading"><i class="fas fa-spinner fa-spin"></i></td></tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINACIÓN -->
    <div class="ap_pag" id="ap_pag"></div>

    <!-- MODAL DETALLE -->
    <div id="ap_modal_overlay" class="ap_overlay">
      <div class="ap_modal" id="ap_modal">
        <div class="ap_modal_head" id="ap_modal_titulo">
          <i class="fas fa-clipboard-check"></i> Detalle de solicitud
        </div>
        <div class="ap_modal_body" id="ap_modal_body"></div>
        <div class="ap_modal_footer">
          <button class="ap_modal_cancel" id="ap_modal_cerrar">Cerrar</button>
          <button class="ap_modal_confirm rechazar" id="ap_modal_rechazar">
             Rechazar y Enviar
          </button>
          <button class="ap_modal_confirm aprobar" id="ap_modal_aprobar">
             Aprobar y Enviar
          </button>
        </div>
      </div>
    </div>

  </div>`;
};

// ─── INIT ─────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;

  const r = getRangoFechas(7);
  $('#ap_fecha_ini').val(r.ini);
  $('#ap_fecha_fin').val(r.fin);

  const isRT = getls(K_REALTIME) === true;
  $('#ap_realtime_toggle').prop('checked', isRT);
  _aplicarModoRT(isRT);

  await _cargarMetricasHoy();
  _bindEvents();
};

// ─── CLEANUP ──────────────────────────────────────────────────────
export const cleanup = () => {
  if (st.pendSub) { st.pendSub(); st.pendSub = null; }
  if (st.datosSub) { st.datosSub(); st.datosSub = null; }
  $(document).off('.ap');
};

// ─── ASIGNACIÓN DE MODOS ──────────────────────────────────────────
function _aplicarModoRT(isRT) {
  if (isRT) {
    if (st.pendSub) st.pendSub();
    st.pendSub = onSnapshot(query(collection(db, 'solicitudes'), where('estado', '==', 'pendiente')), snap => {
      $('#ap_kpi_pend').text(snap.size);
    });
    // Obtener total independiente con caché para ahorrar lecturas globales
    const cacheTotal = getls('peTotalSolicitudes');
    if (cacheTotal != null) {
      $('#ap_kpi_total').text(cacheTotal);
    } else {
      getCountFromServer(collection(db, 'solicitudes'))
        .then(t => { 
          const count = t.data().count;
          $('#ap_kpi_total').text(count);
          savels('peTotalSolicitudes', count, 5/60); // 5 minutos
        })
        .catch(() => $('#ap_kpi_total').text('—'));
    }
  } else {
    if (st.pendSub) { st.pendSub(); st.pendSub = null; }
  }
  _cargarDatos();
}

// ─── MÉTRICAS DEL DÍA ─────────────────────────────────────────────
async function _cargarMetricasHoy(forzar = false) {
  if (!forzar) {
    const cache = getls(K_METRICA);
    if (cache) { $('#ap_kpi_apro').text(cache.apro); $('#ap_kpi_rech').text(cache.rech); return; }
  }
  try {
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const snap = await getDocs(query(collection(db, 'solicitudes'), where('historial.histCreada', '>=', hoy)));
    let apro = 0, rech = 0;
    snap.forEach(d => {
      const e = d.data().estado;
      if (e === 'aprobado') apro++;
      if (e === 'rechazado') rech++;
    });
    $('#ap_kpi_apro').text(apro);
    $('#ap_kpi_rech').text(rech);
    savels(K_METRICA, { apro, rech }, 5/60);
  } catch(e) { $('#ap_kpi_apro, #ap_kpi_rech').text('—'); }
}

async function _cargarPendientesEstatico() {
  try {
    let pendCount = getls('pePendientes');
    let totalCount = getls('peTotalSolicitudes');

    const fetches = [];
    if (pendCount == null) {
      fetches.push(
        getCountFromServer(query(collection(db, 'solicitudes'), where('estado', '==', 'pendiente')))
          .then(r => { pendCount = r.data().count; savels('pePendientes', pendCount, 5/60); })
      );
    }
    if (totalCount == null) {
      fetches.push(
        getCountFromServer(collection(db, 'solicitudes'))
          .then(r => { totalCount = r.data().count; savels('peTotalSolicitudes', totalCount, 5/60); })
      );
    }

    if (fetches.length > 0) await Promise.all(fetches);

    $('#ap_kpi_pend').text(pendCount);
    $('#ap_kpi_total').text(totalCount);
  } catch (e) {
    $('#ap_kpi_pend, #ap_kpi_total').text('—');
  }
}

// ─── CARGAR DATOS (TR vs ESTÁTICO) ────────────────────────────────
async function _cargarDatos(forzar = false) {
  if (st.datosSub) { st.datosSub(); st.datosSub = null; }
  const isRT = $('#ap_realtime_toggle').is(':checked');

  if (!forzar && !isRT) {
    const cache = getls(K_LISTA);
    if (cache) {
      _procesarSnapArray(cache);
      return _cargarPendientesEstatico(); // update counts from server
    }
  }

  $('#ap_hero_refresh').prop('disabled', true).find('i').addClass('fa-spin');
  try {
    const q = query(collection(db, 'solicitudes'), orderBy('historial.histCreada', 'desc'), limit(50));
    
    if (isRT) {
      st.datosSub = onSnapshot(q, snap => {
        const datos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        savels(K_LISTA, datos, 5 / 60); // 5 min
        _procesarSnapArray(datos);
      });
    } else {
      const snap = await getDocs(q);
      const datos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      savels(K_LISTA, datos, 5 / 60); // 5 min
      _procesarSnapArray(datos);
      _cargarPendientesEstatico(); // actualiza la cajita sola en estático
    }
  } catch (e) {
    console.error('[aprobar] cargar:', e);
    $('#ap_tbody').html(`<tr><td colspan="7" class="ap_empty"><p>Error al cargar datos.</p></td></tr>`);
  } finally {
    $('#ap_hero_refresh').prop('disabled', false).find('i').removeClass('fa-spin');
  }
}

function _procesarSnapArray(arr) {
  st.datos = arr;
  st.pagina = 1;
  _aplicarFiltros();
  _renderCards();
}

// ─── FILTRAR ──────────────────────────────────────────────────────
function _aplicarFiltros() {
  const txt    = ($('#ap_q').val() || '').toLowerCase();
  const estado = $('#ap_filtro_estado').val() || '';
  const fIni   = $('#ap_fecha_ini').val() ? new Date($('#ap_fecha_ini').val()) : null;
  const fFin   = $('#ap_fecha_fin').val() ? new Date($('#ap_fecha_fin').val() + 'T23:59:59') : null;

  st.filtrados = st.datos.filter(s => {
    const sm   = s.smile || {};
    const hist = s.historial || {};
    if (estado && s.estado !== estado) return false;
    if (txt) {
      const hay = `${sm.nombres||''} ${sm.dni||''} ${sm.cargo||''} ${sm.email||''}`.toLowerCase();
      if (!hay.includes(txt)) return false;
    }
    const fcObj = hist.histCreada;
    let fc = null;
    if (fcObj) {
      fc = fcObj.toDate ? fcObj.toDate() : new Date(fcObj.seconds ? fcObj.seconds * 1000 : fcObj);
    }
    if (fc) {
      if (fIni && fc < fIni) return false;
      if (fFin && fc > fFin) return false;
    }
    return true;
  });

  _renderTabla();
  _renderPaginacion();
}

// ─── TARJETAS PENDIENTES ──────────────────────────────────────────
function _renderCards() {
  const pendientes = st.datos.filter(s => s.estado === 'pendiente');
  if (!pendientes.length) {
    $('#ap_cards').html(`<div class="ap_empty"><i class="fas fa-check-circle"></i><p>¡Sin pendientes! Todo al día.</p></div>`);
    return;
  }
  $('#ap_cards').html(`<div class="ap_cards_grid">${pendientes.map(_htmlCard).join('')}</div>`);
}

function _htmlCard(s) {
  const sm   = s.smile     || {};
  const sol  = s.solicitud || {};
  const hist = s.historial || {};
  const av   = sm.avatar || (sm.nombres ? avatar(sm.nombres) : 'SM');
  const fcObj = hist.histCreada;
  const fc = fcObj ? (fcObj.toDate ? fcObj.toDate() : new Date(fcObj.seconds ? fcObj.seconds * 1000 : fcObj)) : null;
  const fechas = sol.fechasEscogidos ? formatearFechasEscogidas(sol.fechasEscogidos, sol.tipo === '4horas') : '—';

  return `
    <div class="ap_card" data-id="${s.id}">
      <div class="ap_card_top">
        <div class="ap_avatar">${av}</div>
        <div class="ap_nombre_info">
          <strong>${Capit(sm.nombres || 'Empleado')}</strong>
          <span>${sm.cargo || sm.cargoOperaciones || '—'}</span>
        </div>
        <span class="ap_badge pendiente"><i class="fas fa-clock"></i> Pendiente</span>
      </div>
      <div class="ap_card_detail">
        <div><i class="fas fa-id-card"></i> ${sm.dni || '—'}</div>
        <div><i class="fas fa-map-marker-alt"></i> ${sm.centroCosto || '—'}</div>
        <div><i class="fas fa-gift"></i> ${sol.nombre || sol.titulo || 'Beneficio'}</div>
        <div><i class="far fa-calendar-alt"></i> ${fechas}</div>
        ${sol.comentarios ? `<div class="ap_card_comentario"><i class="fas fa-comment"></i> ${sol.comentarios}</div>` : ''}
        <div class="ap_card_envio"><i class="far fa-clock"></i> ${fc ? formatearFechaHora(hist.histCreada) : '—'}</div>
      </div>
      <div class="ap_card_footer">
        <button class="ap_btn ap_btn--responder ap_accion" data-id="${s.id}" data-accion="responder">
          <i class="fas fa-reply"></i> Responder Solicitud
        </button>
      </div>
    </div>`;
}

// ─── TABLA ────────────────────────────────────────────────────────
function _renderTabla() {
  const total  = st.filtrados.length;
  const inicio = (st.pagina - 1) * st.porPagina;
  const pagina = st.filtrados.slice(inicio, inicio + st.porPagina);

  if (!pagina.length) {
    $('#ap_tbody').html(`<tr><td colspan="9"><div class="ap_empty"><i class="fas fa-inbox"></i><p>Sin resultados.</p></div></td></tr>`);
    return;
  }

  $('#ap_tbody').html(pagina.map(s => {
    const sm   = s.smile     || {};
    const sol  = s.solicitud || {};
    const hist = s.historial || {};
    const av   = sm.avatar || (sm.nombres ? avatar(sm.nombres) : 'SM');
    const fc   = fnToDate(hist.histCreada);
    const fu   = fnToDate(hist.histActualizado);
    const cfg  = { pendiente: 'pendiente', aprobado: 'aprobado', rechazado: 'rechazado' };
    const est  = s.estado || 'pendiente';
    const fechas = sol.fechasEscogidos ? formatearFechasEscogidas(sol.fechasEscogidos, sol.tipo === '4horas') : '—';

    return `
      <tr data-id="${s.id}">
        <td>${sm.dni || '—'}</td>
        <td>
          <div class="ap_nombre_cell">
            <div class="ap_avatar">${av}</div>
            <div class="ap_nombre_info">
              <strong>${Capit(sm.nombres || '—')}</strong>
              <span>${sm.cargo || sm.cargoOperaciones || '—'}</span>
            </div>
          </div>
        </td>
        <td class="ap_truncate">${hist.histPeople || sm.email || '—'}</td>
        <td>${sol.nombre || sol.titulo || '—'}</td>
        <td>${fc ? fc.toLocaleDateString('es-PE') : '—'}</td>
        <td>${fu ? fu.toLocaleDateString('es-PE') : '—'}</td>
        <td class="ap_table_comment" title="${hist.histPeopleComment || ''}">${hist.histPeopleComment ? (hist.histPeopleComment.split(/\\s+/).length > 10 ? hist.histPeopleComment.split(/\\s+/).slice(0, 10).join(' ') + '...' : hist.histPeopleComment) : '—'}</td>
        <td><span class="ap_badge ${cfg[est] || est}">${est.charAt(0).toUpperCase() + est.slice(1)}</span></td>
        <td>
          <div class="ap_acciones">
            ${est === 'pendiente' ? `
              <button class="ap_btn ap_btn--responder ap_accion" data-id="${s.id}" data-accion="responder" title="Responder Solicitud"><i class="fas fa-reply"></i></button>
            ` : `
              <button class="ap_btn ap_btn--ver ap_ver" data-id="${s.id}" title="Ver detalle"><i class="fas fa-eye"></i></button>
            `}
          </div>
        </td>
      </tr>`;
  }).join(''));
}

// ─── PAGINACIÓN ───────────────────────────────────────────────────
function _renderPaginacion() {
  const total = st.filtrados.length;
  const pages = Math.ceil(total / st.porPagina);
  const $pag  = $('#ap_pag');

  if (pages <= 1) { $pag.hide(); return; }

  const ini = (st.pagina - 1) * st.porPagina + 1;
  const fin = Math.min(st.pagina * st.porPagina, total);

  $pag.css('display', 'flex').hide().show().html(`
    <span class="ap_pag_info">Mostrando ${ini}–${fin} de ${total}</span>
    <div class="ap_pag_btns">
      <button class="ap_pag_btn" data-p="prev" ${st.pagina <= 1 ? 'disabled' : ''}><i class="fas fa-angle-left"></i></button>
      ${Array.from({ length: pages }, (_, i) => i + 1)
        .filter(p => Math.abs(p - st.pagina) <= 2)
        .map(p => `<button class="ap_pag_btn ${p === st.pagina ? 'active' : ''}" data-p="${p}">${p}</button>`)
        .join('')}
      <button class="ap_pag_btn" data-p="next" ${st.pagina >= pages ? 'disabled' : ''}><i class="fas fa-angle-right"></i></button>
    </div>
  `);
}

// ─── MODAL DETALLE ────────────────────────────────────────────────
async function _abrirModal(id, accion = 'ver') {
  const s = st.datos.find(x => x.id === id);
  if (!s) return;
  st.modalId = id;

  let sm     = s.smile     || {};
  const sol  = s.solicitud || {};
  const hist = s.historial || {};
  const est  = s.estado || 'pendiente';
  const esPend = est === 'pendiente' && accion === 'responder';

  $('#ap_modal_titulo').attr('class', 'ap_modal_head responder').html(
    esPend ? `<i class="fas fa-reply"></i> Responder Solicitud` : `<i class="fas fa-clipboard-check"></i> Detalle de solicitud`
  );

  // Ampliar modal si es responder
  if (esPend) {
    $('#ap_modal').addClass('ap_modal--wide');
  } else {
    $('#ap_modal').removeClass('ap_modal--wide');
  }

  let cachedData = null;
  if (sm.dni) {
    cachedData = getls(`peSmile_${sm.dni}`);
  }

  // 1. Mostrar skeleton si NO estaba en caché
  if (!cachedData) {
    $('#ap_modal_rechazar').hide();
    $('#ap_modal_aprobar').hide();
    $('#ap_modal_body').html(_getModalSkeleton(esPend));
  } else {
    sm = { ...sm, ...cachedData };
  }

  $('#ap_modal_overlay').css('display', 'flex').hide().fadeIn(150);

  // 2. Traer datos faltantes de manera asíncrona si NO hubo caché
  if (!cachedData && sm.dni) {
    try {
      const ms = await getDoc(doc(db, 'smiles', sm.dni));
      if (ms.exists()) {
        const data = ms.data();
        sm = { ...sm, ...data };
        savels(`peSmile_${sm.dni}`, data, 24); // Guardamos la info en caché por 24 horas usando peSmile_DNI
      }
    } catch(e) { console.warn('Error al traer smile master', e); }
  }

  // 3. Renderizar el HTML Final
  _renderModalBodyContent(sm, sol, hist, est, esPend, s);
  
  if (esPend) {
    $('#ap_modal_rechazar').show();
    $('#ap_modal_aprobar').show();
  }
}

function _getModalSkeleton(esPend) {
  const leftCol = `
    <div class="ap_modal_info ap_op_60_no_events">
      <div class="shimmer_bg ap_skel_h10"></div>
      <div class="ap_modal_split_grid">
        <div class="shimmer_bg ap_skel_h35"></div>
        <div class="shimmer_bg ap_skel_h35"></div>
      </div>
    </div>
  `;
  let rightCol = '';
  if (esPend) {
    rightCol = `<div class="shimmer_bg ap_skel_h80"></div>`;
  }
  return `
    <div class="ap_modal_split ${!esPend ? 'ap_modal_split--single' : ''} ap_modal_split_skel">
      ${leftCol}
      ${rightCol}
    </div>
  `;
}

function _renderModalBodyContent(sm, sol, hist, est, esPend, s) {
  const av   = sm.avatar || (sm.nombres ? avatar(sm.nombres) : 'SM');
  const fc   = fnToDate(hist.histCreada);
  const fu   = fnToDate(hist.histActualizado);
  const fechas = sol.fechasEscogidos ? formatearFechasEscogidas(sol.fechasEscogidos, sol.tipo === '4horas') : '—';
  
  const tiempoEmp = getTiempoEmpresa(sm, sol);
  const cumple = getCumpleanos(sm);
  const cel = getCelular(sm);

  const leftCol = `
    <div class="ap_modal_info ap_anim_fade_up">
      <!-- HEADER EMPLEADO -->
      <div class="ap_modal_emp_pro">
        <div class="ap_avatar ap_avatar--xl">${av}</div>
        <div class="ap_modal_emp_txt">
          <div class="ap_modal_nombre">${Capit(sm.nombres || '—')}</div>
          <div class="ap_modal_cargo">${sm.cargo || sm.cargoOperaciones || '—'}</div>
        </div>
      </div>
      
      <!-- WRAPPER DOS COLUMNAS -->
      <div class="ap_modal_split_grid">
        <!-- PERFIL -->
        <div class="ap_modal_section">
          <div class="ap_modal_section_head"><i class="fas fa-id-badge"></i> Perfil del Trabajador</div>
          <div class="ap_modal_section_body">
            <div class="ap_modal_info_item"><span>DNI</span><b>${sm.dni || '—'}</b></div>
            <div class="ap_modal_info_item"><span>Email</span><b class="ap_word_break">${sm.email || '—'}</b></div>
            <div class="ap_modal_info_item"><span>Celular</span><b>${cel}</b></div>
            <div class="ap_modal_info_item"><span>Cumpleaños</span><b>${cumple}</b></div>
            <div class="ap_modal_info_item"><span>Centro Costo</span><b>${sm.centroCosto || '—'}</b></div>
            <div class="ap_modal_info_item"><span>Tiempo en Empresa</span><b>${tiempoEmp}</b></div>
            <div class="ap_modal_info_item"><span>Fecha Ingreso</span><b>${sm.fechaIngreso && !isNaN(fnToDate(sm.fechaIngreso)) ? fnToDate(sm.fechaIngreso).toLocaleDateString('es-PE') : '—'}</b></div>
          </div>
        </div>

        <!-- SOLICITUD -->
        <div class="ap_modal_section">
          <div class="ap_modal_section_head"><i class="fas fa-gift"></i> Detalles de la Solicitud</div>
          <div class="ap_modal_section_body">
            <div class="ap_modal_info_item"><span>Beneficio</span><b class="ap_highlight_text">${sol.nombre || sol.titulo || '—'}</b></div>
            <div class="ap_modal_info_item"><span>Fechas Escogidas</span><b>${fechas}</b></div>
            <div class="ap_modal_info_item"><span>Solicitado el</span><b>${fc ? fc.toLocaleDateString('es-PE') : '—'}</b></div>
            <div class="ap_modal_info_item"><span>Id Interno</span><b><small class="ap_op_70">${sol.idSoli || sol.beneficioId || s.id}</small></b></div>
            <div class="ap_modal_info_item"><span>Tipo / Duración</span><b>${sol.tipo || '—'} / ${sol.duracion || '—'}</b></div>
            <div class="ap_modal_info_item"><span>Estado de Ticket</span><b><span class="ap_badge ${est}">${est}</span></b></div>
            ${sol.comentarios ? `<div class="ap_modal_info_item full"><span>Comentario Empleado</span><b class="ap_italic">"${sol.comentarios}"</b></div>` : ''}
          </div>
        </div>
      </div>

      <!-- SEGUIMIENTO PEOPLE -->
      ${hist.histPeople ? `
      <div class="ap_modal_section">
        <div class="ap_modal_section_head"><i class="fas fa-history"></i> Gestión Interna People</div>
        <div class="ap_modal_section_body ap_bg_light_blue">
          <div class="ap_modal_info_item full"><span>Gestionado Por Correo</span><b>${hist.histPeople}</b></div>
          <div class="ap_modal_info_item"><span>Decisión Emitida</span><b>${hist.histEstado || est}</b></div>
          <div class="ap_modal_info_item"><span>Fecha Resolución</span><b>${fu ? fu.toLocaleDateString('es-PE') + ' ' + fu.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit'}) : '—'}</b></div>
          ${hist.histPeopleComment ? `<div class="ap_modal_info_item full"><span>Mensaje Notificado al Empleado</span><b class="ap_tx1">"${hist.histPeopleComment}"</b></div>` : ''}
        </div>
      </div>
      ` : ''}
    </div>
  `;

  let rightCol = '';
  if (esPend) {
    rightCol = `
      <div class="ap_modal_email--pro ap_anim_fade_up_delay">
        <div class="ap_email_heading">
          <i class="fas fa-paper-plane"></i>
          <div>
            <h4>Responder Solicitud</h4>
            <p>Se enviará un correo de decisión al empleado.</p>
          </div>
        </div>
        <div class="ap_email_fields_pro">
          <div class="ap_email_row">
            <div class="ap_email_field ap_email_field--half">
              <label>Para</label>
              <input type="text" id="ap_email_to" value="${sm.email || ''}" readonly>
            </div>
            <div class="ap_email_field ap_email_field--half">
              <label>CC</label>
              <input type="text" id="ap_email_cc" placeholder="ej: rrhh@empresa.com">
            </div>
          </div>
          <div class="ap_email_field">
            <label>Asunto</label>
            <input type="text" id="ap_email_subj" value="Respuesta a su solicitud de ${sol.nombre || sol.titulo || 'Beneficio'}">
          </div>
          <div class="ap_email_field">
            <label>Mensaje Corporativo</label>
            <textarea id="ap_comentario" placeholder="Escribe la respuesta detallada para el trabajador..." rows="7" class="ap_mb_05"></textarea>
            <div class="ap_quick_replies_wrap">
              <span class="ap_quick_replies_title">Plantillas de respuestas:</span>
              <div class="ap_quick_replies">
                <button class="ap_btn_reply aprobar" data-tipo="aprobar1"><i class="fas fa-check"></i> Respuesta 1</button>
                <button class="ap_btn_reply aprobar" data-tipo="aprobar2"><i class="fas fa-check-double"></i> Respuesta 2</button>
                <button class="ap_btn_reply rechazar" data-tipo="rechazar1"><i class="fas fa-times"></i> Rechazo 1</button>
                <button class="ap_btn_reply rechazar" data-tipo="rechazar2"><i class="fas fa-ban"></i> Rechazo 2</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  $('#ap_modal_body').html(`
    <div class="ap_modal_split ${!esPend ? 'ap_modal_split--single' : ''}">
      ${leftCol}
      ${rightCol}
    </div>
  `);
}

function _cerrarModal() {
  $('#ap_modal_overlay').fadeOut(150);
  st.modalId = null;
}

// ─── PROCESAR SOLICITUD ───────────────────────────────────────────
async function _procesar(accion) {
  const id         = st.modalId;
  const s          = st.datos.find(x => x.id === id);
  if (!s) return;
  const comentario = ($('#ap_comentario').val() || '').trim();
  const emailTo    = ($('#ap_email_to').val() || '').trim();
  const emailCcStr = ($('#ap_email_cc').val() || '').trim();
  const emailSubj  = ($('#ap_email_subj').val() || '').trim();
  const u          = wi();

  if (!comentario) {
    $('#ap_comentario').addClass('ap_error').focus();
    Mensaje('Ingresa el mensaje para enviar en el correo', 'warning');
    return;
  }
  if (!emailTo) {
    Mensaje('El empleado no tiene un correo válido registrado.', 'warning');
    return;
  }

  const isAprobar = accion === 'aprobar';
  const $btnClick = isAprobar ? $('#ap_modal_aprobar') : $('#ap_modal_rechazar');
  const $btnOther = isAprobar ? $('#ap_modal_rechazar') : $('#ap_modal_aprobar');
  const strOriginalBtn = isAprobar ? 'Aprobar y Enviar' : 'Rechazar y Enviar';
  
  $btnClick.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Procesando...');
  $btnOther.prop('disabled', true);

  try {
    const nuevoEstado = isAprobar ? 'aprobado' : 'rechazado';
    const baseUrl = window.location.hostname === 'localhost' ? window.location.origin : 'https://smilebeneficio.com';
    const logoUrl = `${baseUrl}/logo1.png`;
    const colorHeader = isAprobar ? '#37A1DD' : '#fe413b';
    const txtEstado = isAprobar ? 'APROBADA' : 'RECHAZADA';
    
    // Plantilla de correo HTML Súper Pro
    const htmlCorreo = `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 8px; overflow: hidden;">
        <div style="padding: 20px; background-color: white; border-bottom: 3px solid ${colorHeader}; text-align: center;">
          <div style="display:flex; align-items:center; justify-content: center;">
            <img src="${logoUrl}" alt="Logo" style="height: 50px; width: 50px; margin-right: 12px;">
            <span style="font-size: 24px; color: #1B1B1B; font-weight: bold;">Smile Beneficios</span>
          </div>
        </div>
        <div style="padding: 30px; background-color: white; margin: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">
          <div style="margin-bottom: 20px; color: #202124; font-size: 16px;">
            Hola <strong>${s.smile?.nombres?.toUpperCase() || 'TRABAJADOR'}</strong>,
          </div>
          <div style="margin-bottom: 20px; font-size: 15px; color: #5f6368; line-height: 1.5;">
            Te notificamos que tu solicitud del beneficio <strong>${s.solicitud?.nombre || s.solicitud?.titulo || ''}</strong> ha sido <strong style="color: ${colorHeader};">${txtEstado}</strong>.
          </div>
          <div style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid ${colorHeader}; border-radius: 4px; font-size: 15px; color: #1b1b1b; white-space: pre-wrap;">${comentario}</div>
          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #eaeaea; color: #5f6368; font-size: 14px;">
            <p>Saludos cordiales,</p>
            <p style="font-weight: 500;">Equipo People - Smile Beneficios</p>
          </div>
        </div>
        <div style="padding: 15px; text-align: center; font-size: 12px; color: #80868b; background-color: #f5f5f5;">
          <p>© ${new Date().getFullYear()} Smile Beneficios</p>
        </div>
      </div>
    `;

    // 1) Enviar correo por Netlify Function (Resend)
    const emailPayload = {
      to: [emailTo],
      subject: emailSubj,
      html: htmlCorreo,
      tipo: 'respuesta_solicitud',
      beneficioId: s.solicitud?.id || 'none'
    };
    if (emailCcStr) {
      emailPayload.cc = emailCcStr.split(',').map(e => e.trim()).filter(e => e.length > 0);
    }

    const emailResp = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload)
    });
    const emailResult = await emailResp.json();
    if (!emailResp.ok) throw new Error(emailResult.error?.message || emailResult.error || 'Error al enviar correo. Firebase no se modificó.');

    // 2) Actualizar Firestore si el correo salió bien
    await updateDoc(doc(db, 'solicitudes', id), {
      estado:                         nuevoEstado,
      'historial.histActualizado':    serverTimestamp(),
      'historial.histEstado':         nuevoEstado,
      'historial.histPeople':         u?.email || 'sistema',
      'historial.histPeopleComment':  comentario,
    });

    // 3) Actualizar Caché y UI local
    const idx = st.datos.findIndex(x => x.id === id);
    if (idx >= 0) {
      st.datos[idx].estado = nuevoEstado;
      st.datos[idx].historial = {
        ...st.datos[idx].historial,
        histEstado: nuevoEstado,
        histPeople: u?.email || 'sistema',
        histPeopleComment: comentario,
        histActualizado: new Date()
      };
    }

    _cerrarModal();
    _aplicarFiltros();
    _renderCards();
    Mensaje(`¡Respondido por correo y solicitud ${nuevoEstado}!`, 'success');

  } catch (e) {
    console.error('[aprobar] procesar:', e);
    Mensaje(e.message || `Error al ${accion} la solicitud`, 'error');
  } finally {
    $btnClick.prop('disabled', false).html(strOriginalBtn);
    $btnOther.prop('disabled', false);
  }
}

// ─── EXPORTAR EXCEL ───────────────────────────────────────────────
async function _exportarExcel() {
  const $btn = $('#ap_excel');
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i>');
  try {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Solicitudes');

    ws.columns = [
      { header: 'DNI',              key: 'dni',        width: 13 },
      { header: 'Empleado',         key: 'empleado',   width: 28 },
      { header: 'Cargo',            key: 'cargo',      width: 22 },
      { header: 'Centro Costo',     key: 'centro',     width: 28 },
      { header: 'Beneficio',        key: 'beneficio',  width: 22 },
      { header: 'Fechas Escogidas', key: 'fechas',     width: 25 },
      { header: 'Comentario',       key: 'comentario', width: 35 },
      { header: 'Solicitado',       key: 'solicitado', width: 20 },
      { header: 'Procesado',        key: 'procesado',  width: 20 },
      { header: 'Por (people)',     key: 'people',     width: 25 },
      { header: 'Estado',           key: 'estado',     width: 13 },
    ];

    ws.addRows(st.datos.map(s => ({
      dni:         s.smile?.dni         || '',
      empleado:    s.smile?.nombres     || '',
      cargo:       s.smile?.cargo       || s.smile?.cargoOperaciones || '',
      centro:      s.smile?.centroCosto || '',
      beneficio:   s.solicitud?.nombre  || s.solicitud?.titulo || '',
      fechas:      formatearFechasEscogidas(s.solicitud?.fechasEscogidos, s.solicitud?.tipo === '4horas'),
      comentario:  s.solicitud?.comentarios || '',
      solicitado:  s.historial?.histCreada  ? formatearFechaHora(s.historial.histCreada) : '',
      procesado:   s.historial?.histActualizado ? formatearFechaHora(s.historial.histActualizado) : '',
      people:      s.historial?.histPeople   || '',
      estado:      s.estado || 'pendiente',
    })));

    // Estilo cabecera
    ws.getRow(1).eachCell(c => {
      c.font = { bold: true, color: { argb: 'FF5A4000' } };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFD101' } };
    });

    const buf  = await wb.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = `Solicitudes_${new Date().toISOString().split('T')[0]}.xlsx`;
    a.click();
    URL.revokeObjectURL(a.href);
    Mensaje(`${st.datos.length} registros exportados`, 'success');

  } catch (e) {
    console.error('[aprobar] excel:', e);
    Mensaje('Error al generar Excel', 'error');
  } finally {
    $btn.prop('disabled', false).html('<i class="fas fa-file-excel"></i> Excel');
  }
}

// ─── EVENTOS ──────────────────────────────────────────────────────
function _bindEvents() {
  // Filtros (debounce en texto)
  let t;
  $(document).on('input.ap', '#ap_q', () => { clearTimeout(t); t = setTimeout(() => { st.pagina = 1; _aplicarFiltros(); }, 280); });
  $(document).on('change.ap', '#ap_filtro_estado, #ap_fecha_ini, #ap_fecha_fin', () => { st.pagina = 1; _aplicarFiltros(); });

  // Actualizar manual / Hero Refresh
  $(document).on('click.ap', '#ap_hero_refresh', () => {
    localStorage.removeItem(K_METRICA);
    localStorage.removeItem(K_LISTA);
    localStorage.removeItem('pePendientes');
    localStorage.removeItem('peTotalSolicitudes');
    _cargarMetricasHoy(true);
    _cargarDatos(true);
  });

  // Evento del Toggle RealTime
  $(document).on('change.ap', '#ap_realtime_toggle', function() {
    const isChecked = $(this).is(':checked');
    savels(K_REALTIME, isChecked, 24 * 365);
    _aplicarModoRT(isChecked);
  });

  // Excel
  $(document).on('click.ap', '#ap_excel', _exportarExcel);

  // Paginación
  $(document).on('click.ap', '#ap_pag .ap_pag_btn:not([disabled])', function() {
    const p = $(this).data('p');
    const pages = Math.ceil(st.filtrados.length / st.porPagina);
    if (p === 'prev') st.pagina = Math.max(1, st.pagina - 1);
    else if (p === 'next') st.pagina = Math.min(pages, st.pagina + 1);
    else st.pagina = +p;
    _renderTabla();
    _renderPaginacion();
  });

  // Abrir modal ver
  $(document).on('click.ap', '.ap_ver', function() {
    _abrirModal($(this).data('id'), 'ver');
  });

  // Acción directa (aprobar / rechazar) desde cards o tabla
  $(document).on('click.ap', '.ap_accion', function() {
    _abrirModal($(this).data('id'), $(this).data('accion'));
  });

  // Plantillas de respuesta rápida
  $(document).on('click.ap', '.ap_btn_reply', function() {
    const tipo = $(this).data('tipo');
    const s = st.datos.find(x => x.id === st.modalId);
    let nombre = 'Estimado/a';
    if (s && s.smile) {
      nombre = getNombre(s.smile);
    }

    let texto = '';
    if (tipo === 'aprobar1') {
      texto = `Hola ${nombre}, hemos revisado detalladamente tu solicitud y nos complace informarte que ha sido APROBADA con éxito. En breve, el área encargada estará coordinando la generación del beneficio con el equipo. ¡Que lo disfrutes!\n\nSaludos cordiales, Equipo People.`;
    } else if (tipo === 'aprobar2') {
      texto = `¡Excelente noticia ${nombre}! Queremos confirmarte que tu solicitud fue aprobada, ya que cuentas con los requisitos necesarios de acuerdo con las políticas de la empresa. Quedamos a tu disposición para cualquier consulta.\n\nSaludos cordiales, Equipo People.`;
    } else if (tipo === 'rechazar1') {
      texto = `Hola ${nombre}, después de analizar tu solicitud, lamentamos comunicarte que no ha sido posible aprobarla en esta ocasión, ya que la petición no se ajusta a las políticas vigentes de beneficios. Agradecemos mucho tu comprensión.\n\nSaludos cordiales, Equipo People.`;
    } else if (tipo === 'rechazar2') {
      texto = `Estimado/a ${nombre}, hemos revisado cuidadosamente el requerimiento y debemos informarte que tu solicitud ha sido rechazada debido a motivos de planificación o límites de cupo en las fechas seleccionadas. Te invitamos a consultar con RRHH para encontrar una alternativa.\n\nSaludos cordiales, Equipo People.`;
    }
    
    $('#ap_comentario').val(texto).focus();
  });

  // Botones modal
  $(document).on('click.ap', '#ap_modal_cerrar',   _cerrarModal);
  $(document).on('click.ap', '#ap_modal_overlay',  function(e) { if (e.target === this) _cerrarModal(); });
  $(document).on('click.ap', '#ap_modal_aprobar',  () => _procesar('aprobar'));
  $(document).on('click.ap', '#ap_modal_rechazar', () => _procesar('rechazar'));
}
