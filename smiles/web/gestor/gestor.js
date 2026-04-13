/**
 * people.js — Dashboard principal del módulo /people (RRHH)
 *
 * Estrategia de lectura Firestore (plan gratuito):
 *  ► onSnapshot        → contador de pendientes en tiempo real
 *  ► getDocs           → feed de solicitudes recientes (caché SWR 5 min)
 *  ► getCountFromServer → total de empleados activos (caché 4 h)
 *
 * Exports: render | init | cleanup
 */

import './gestor.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import {
  collection, query, where, orderBy, limit,
  getDocs, getCountFromServer, onSnapshot
} from 'firebase/firestore';
import {
  savels, getls,
  Saludar, fechaHoy,
  NombreApellido, avatar, Capit,
  formatearFechaHora, formatearFechasEscogidas,
} from '../../widev.js';

// ─── USUARIO ─────────────────────────────────────────────────────
const wi = () => getls('wiSmile');

// ─── CACHE KEYS ──────────────────────────────────────────────────
const K_TOTAL    = 'peTotalSmiles';  // TTL 4 h   — total de empleados activos
const K_METRICA  = 'peMetricas';     // TTL 5 min — conteo de hoy
const K_FEED     = 'peRecientes';    // TTL 5 min — para el modo offline/estático
const K_REALTIME = 'peRealTime';     // boolean  — preferencia de usuario

// ─── ESTADO INTERNO ──────────────────────────────────────────────
const state = {
  pendientesSub: null,
  feedSub: null,
};

// ─── RENDER ──────────────────────────────────────────────────────
export const render = async () => {
  const u = wi();
  if (!u) return `<div class="pp_wrap"><div class="pp_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;

  const av = avatar(u.nombres || '');

  return `
  <div class="pp_wrap" id="pp_root">

    <!-- ── HERO BIENVENIDA ── -->
    <div class="pp_bv_hero">
      <div class="pp_bv_avatar">${av}</div>
      <div class="pp_bv_info">
        <div class="pp_bv_saludo">${Saludar()}</div>
        <div class="pp_bv_nombre">${NombreApellido(u.nombres || '—')}</div>
        <div class="pp_bv_sub">
          <span class="pp_bv_tag"><i class="fas fa-shield-alt"></i> Panel de People</span>
          <span class="pp_bv_tag"><i class="fas fa-building"></i> ${Capit(u.empresa || 'Empresa')}</span>
          <span class="pp_bv_tag"><i class="fas fa-map-marker-alt"></i> ${Capit(u.sede || 'Sede Principal')}</span>
        </div>
      </div>
      <div class="pp_bv_actions">
        <div class="pp_bv_fecha">
          <i class="fas fa-calendar-alt"></i>
          <span>${fechaHoy()}</span>
        </div>
        <div class="pp_bv_actions_bottom">
          <label class="pp_toggle_wrap" title="Activar para recibir solicitudes sin recargar">
            <span class="pp_toggle_label">Tiempo Real</span>
            <div class="pp_toggle">
              <input type="checkbox" id="pp_realtime_toggle">
              <span class="pp_toggle_slider"></span>
            </div>
          </label>
          <button class="pp_hero_refresh" id="pp_hero_refresh" title="Actualizar tablero">
            <i class="fas fa-sync-alt"></i> Actualizar
          </button>
        </div>
      </div>
    </div>

    <!-- ── KPIs / CONTADORES ── -->
    <div class="pp_kpis">

      <div class="pp_kpi pp_kpi--pend" id="pp_kpi_pend">
        <div class="pp_kpi_icon"><i class="fas fa-clock"></i></div>
        <div class="pp_kpi_body">
          <div class="pp_kpi_num" id="pp_cnt_pend">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div class="pp_kpi_label">Pendientes</div>
        </div>
        <div class="pp_kpi_pulse" id="pp_pulse_pend"></div>
      </div>

      <div class="pp_kpi pp_kpi--apro">
        <div class="pp_kpi_icon"><i class="fas fa-check-circle"></i></div>
        <div class="pp_kpi_body">
          <div class="pp_kpi_num" id="pp_cnt_apro">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div class="pp_kpi_label">Aprobadas hoy</div>
        </div>
      </div>

      <div class="pp_kpi pp_kpi--rech">
        <div class="pp_kpi_icon"><i class="fas fa-times-circle"></i></div>
        <div class="pp_kpi_body">
          <div class="pp_kpi_num" id="pp_cnt_rech">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div class="pp_kpi_label">Rechazadas hoy</div>
        </div>
      </div>

      <div class="pp_kpi pp_kpi--emp">
        <div class="pp_kpi_icon"><i class="fas fa-users"></i></div>
        <div class="pp_kpi_body">
          <div class="pp_kpi_num" id="pp_cnt_emp">
            ${getls(K_TOTAL) ?? '<i class="fas fa-spinner fa-spin"></i>'}
          </div>
          <div class="pp_kpi_label">Empleados activos</div>
        </div>
      </div>

    </div>

    <!-- ── ACCIONES RÁPIDAS ── -->
    <div class="pp_acciones_rapidas">
      <a href="/aprobar" class="pp_accion_card nv_item" data-page="aprobar">
        <div class="pp_accion_ico pp_accion_ico--amarillo">
          <i class="fas fa-clipboard-check"></i>
        </div>
        <div class="pp_accion_txt">
          <div class="pp_accion_title">Aprobar Solicitudes</div>
          <div class="pp_accion_sub">Gestiona las solicitudes pendientes</div>
        </div>
        <i class="fas fa-chevron-right pp_accion_arr"></i>
      </a>

      <a href="/buscar" class="pp_accion_card nv_item" data-page="buscar">
        <div class="pp_accion_ico pp_accion_ico--azul">
          <i class="fas fa-search"></i>
        </div>
        <div class="pp_accion_txt">
          <div class="pp_accion_title">Buscar Empleados</div>
          <div class="pp_accion_sub">Consulta perfiles y datos del equipo</div>
        </div>
        <i class="fas fa-chevron-right pp_accion_arr"></i>
      </a>

      <a href="/equipo" class="pp_accion_card nv_item" data-page="equipo">
        <div class="pp_accion_ico pp_accion_ico--verde">
          <i class="fas fa-users-cog"></i>
        </div>
        <div class="pp_accion_txt">
          <div class="pp_accion_title">Mi Equipo People</div>
          <div class="pp_accion_sub">Gestores RRHH con acceso al sistema</div>
        </div>
        <i class="fas fa-chevron-right pp_accion_arr"></i>
      </a>
    </div>

    <!-- ── FEED: ÚLTIMAS SOLICITUDES ── -->
    <div class="pp_section_title">
      <i class="fas fa-stream"></i> Solicitudes recientes
      <button class="pp_refresh_btn" id="pp_refresh" title="Actualizar">
        <i class="fas fa-sync-alt"></i>
      </button>
    </div>

    <div id="pp_feed">
      <div class="pp_loading"><i class="fas fa-spinner fa-spin"></i></div>
    </div>

  </div>`;
};

// ─── INIT ────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;

  const rtActivo = getls(K_REALTIME) === true;
  $('#pp_realtime_toggle').prop('checked', rtActivo);

  if (rtActivo) {
    _escucharPendientes();
    _escucharFeed();
  }
  
  await _cargarTodo();

  // Toggle de Tiempo Real
  $(document).on('change.pp', '#pp_realtime_toggle', function() {
    const isChecked = $(this).is(':checked');
    savels(K_REALTIME, isChecked, 24 * 365); // Guarda prefe por un año
    
    if (isChecked) {
      _escucharPendientes();
      _escucharFeed();
    } else {
      if (state.pendientesSub) { state.pendientesSub(); state.pendientesSub = null; }
      if (state.feedSub) { state.feedSub(); state.feedSub = null; }
      // Al apagarlo, no borramos interfaz, simplemente la pausamos y queda como estática.
    }
  });

  // Botones de actualizar
  $(document).on('click.pp', '#pp_refresh, #pp_hero_refresh', async function() {
    const $btn = $(this);
    const htmlOld = $btn.html();
    $btn.html('<i class="fas fa-spinner fa-spin"></i>').prop('disabled', true);
    
    // Limpiar cachés dinámicas
    localStorage.removeItem(K_METRICA);
    localStorage.removeItem(K_TOTAL);
    localStorage.removeItem(K_FEED);
    
    await _cargarTodo(true);
    
    $btn.html(htmlOld).prop('disabled', false);
  });
};

// ─── ORQUESTADOR DE CARGA ────────────────────────────────────────
async function _cargarTodo(forzar = false) {
  if (forzar) {
    $('#pp_cnt_apro, #pp_cnt_rech, #pp_cnt_emp').html('<i class="fas fa-spinner fa-spin"></i>');
    if (!$('#pp_realtime_toggle').is(':checked')) {
       $('#pp_cnt_pend').html('<i class="fas fa-spinner fa-spin"></i>');
    }
  }
  
  const promesas = [
    _cargarMetricasHoy(forzar),
    _cargarTotalEmpleados(forzar),
  ];
  
  if (!$('#pp_realtime_toggle').is(':checked')) {
    promesas.push(_cargarPendientesEstatico());
    promesas.push(_cargarFeedEstatico(forzar));
  }
  
  await Promise.all(promesas);
}

// ─── CLEANUP ─────────────────────────────────────────────────────
export const cleanup = () => {
  if (state.pendientesSub) state.pendientesSub();
  if (state.feedSub) state.feedSub();
  $(document).off('.pp');
};

// ─── HELPERS ─────────────────────────────────────────────────────
function _renderizarPends(n) {
  $('#pp_cnt_pend').text(n);
  if (n > 0) {
    $('#pp_pulse_pend').addClass('activo');
    $('#pp_cnt_pend').addClass('pp_kpi_num--alerta');
  } else {
    $('#pp_pulse_pend').removeClass('activo');
    $('#pp_cnt_pend').removeClass('pp_kpi_num--alerta');
  }
}

// ─── PENDIENTES (TIEMPO REAL vs ESTÁTICO) ────────────────────────
function _escucharPendientes() {
  if (state.pendientesSub) state.pendientesSub();
  
  const q = query(collection(db, 'solicitudes'), where('estado', '==', 'pendiente'));
  state.pendientesSub = onSnapshot(q, snap => {
    _renderizarPends(snap.size);
  }, err => {
    console.error('[people] pendientes error:', err);
    $('#pp_cnt_pend').text('—');
  });
}

async function _cargarPendientesEstatico() {
  try {
    const snap = await getCountFromServer(query(collection(db, 'solicitudes'), where('estado', '==', 'pendiente')));
    _renderizarPends(snap.data().count);
  } catch(e) { $('#pp_cnt_pend').text('—'); }
}

// ─── MÉTRICAS DEL DÍA (CACHÉ 5 MIN) ──────────────────────────────
async function _cargarMetricasHoy(forzar = false) {
  if (!forzar) {
    const cache = getls(K_METRICA);
    if (cache) {
      $('#pp_cnt_apro').text(cache.apro);
      $('#pp_cnt_rech').text(cache.rech);
      return;
    }
  }

  try {
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    
    // Consulta simple (1 solo campo) para EVITAR requerir crear índices compuestos en Firebase.
    // Solo descargamos las solicitudes hechas "hoy" (usualmente pocas) y contamos en velocidad RAM.
    const snap = await getDocs(query(
      collection(db, 'solicitudes'), 
      where('historial.histCreada', '>=', hoy)
    ));
    
    let apro = 0, rech = 0;
    snap.forEach(d => {
      const e = d.data().estado;
      if (e === 'aprobado') apro++;
      if (e === 'rechazado') rech++;
    });
    
    $('#pp_cnt_apro').text(apro);
    $('#pp_cnt_rech').text(rech);
    
    savels(K_METRICA, { apro, rech }, 5/60); // 5 minutos
  } catch (err) {
    console.error('[people] metricas:', err);
    $('#pp_cnt_apro, #pp_cnt_rech').text('—');
  }
}

// ─── TOTAL EMPLEADOS (caché 4h) ───────────────────────────────────
async function _cargarTotalEmpleados(forzar = false) {
  if (!forzar) {
    const cached = getls(K_TOTAL);
    if (cached) { $('#pp_cnt_emp').text(cached); return; }
  }
  try {
    const snap = await getCountFromServer(
      query(collection(db, 'smiles'), where('estado', '==', 'activo'))
    );
    const total = snap.data().count;
    $('#pp_cnt_emp').text(total);
    savels(K_TOTAL, total, 4);
  } catch {
    try {
      const snap2 = await getCountFromServer(collection(db, 'smiles'));
      const total2 = snap2.data().count;
      $('#pp_cnt_emp').text(total2);
      savels(K_TOTAL, total2, 4);
    } catch { $('#pp_cnt_emp').text('—'); }
  }
}

// ─── FEED RECIENTE (TIEMPO REAL vs ESTÁTICO) ─────────────────────
function _escucharFeed() {
  if (state.feedSub) state.feedSub();
  
  const q = query(
    collection(db, 'solicitudes'),
    orderBy('historial.histCreada', 'desc'),
    limit(8)
  );
  
  state.feedSub = onSnapshot(q, snap => {
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const html = !items.length
      ? `<div class="pp_empty"><i class="fas fa-inbox"></i><p>No hay solicitudes aún.</p></div>`
      : `<div class="pp_feed_lista">${items.map(_renderFeedItem).join('')}</div>`;
    $('#pp_feed').html(html);
  }, err => {
    console.error('[people] feed error:', err);
    $('#pp_feed').html(`<div class="pp_empty"><i class="fas fa-exclamation-circle"></i><p>Error al cargar.</p></div>`);
  });
}

async function _cargarFeedEstatico(forzar = false) {
  if (!forzar) {
    const cache = getls(K_FEED);
    if (cache) { $('#pp_feed').html(cache.html); return; }
  }
  try {
    const snap = await getDocs(query(
      collection(db, 'solicitudes'),
      orderBy('historial.histCreada', 'desc'),
      limit(8)
    ));
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const html = !items.length
      ? `<div class="pp_empty"><i class="fas fa-inbox"></i><p>No hay solicitudes aún.</p></div>`
      : `<div class="pp_feed_lista">${items.map(_renderFeedItem).join('')}</div>`;
    $('#pp_feed').html(html);
    savels(K_FEED, { html }, 5/60); // Cachear feed estático 5 min
  } catch(e) {
    console.warn(e);
    if (!getls(K_FEED)) $('#pp_feed').html(`<div class="pp_empty"><i class="fas fa-exclamation-circle"></i><p>Error.</p></div>`);
  }
}


// ─── RENDER ITEM FEED ────────────────────────────────────────────
const ESTADO_CFG = {
  pendiente: { cls: 'pendiente', ico: 'fa-clock',        txt: 'Pendiente' },
  aprobado:  { cls: 'aprobado',  ico: 'fa-check-circle', txt: 'Aprobado'  },
  rechazado: { cls: 'rechazado', ico: 'fa-times-circle', txt: 'Rechazado' },
};

function _renderFeedItem(sol) {
  const smile = sol.smile     || {};
  const soli  = sol.solicitud || {};
  const hist  = sol.historial || {};
  const est   = sol.estado    || 'pendiente';
  const cfg   = ESTADO_CFG[est] || ESTADO_CFG.pendiente;
  const av    = smile.avatar || (smile.nombres ? avatar(smile.nombres) : 'SM');
  const fechas = soli.fechasEscogidos
    ? formatearFechasEscogidas(soli.fechasEscogidos, soli.tipo === '4horas') : '—';
  const fEnvio = hist.histCreada ? formatearFechaHora(hist.histCreada) : '—';

  return `
    <div class="pp_feed_item pp_feed_item--${est}">
      <div class="pp_feed_avatar">${av}</div>
      <div class="pp_feed_info">
        <div class="pp_feed_nombre">${Capit(smile.nombres || 'Empleado')}</div>
        <div class="pp_feed_detalle">
          <span class="pp_feed_tipo"><i class="fas fa-gift"></i> ${soli.titulo || soli.nombre || 'Beneficio'}</span>
          <span class="pp_feed_fecha"><i class="far fa-calendar-alt"></i> ${fechas}</span>
        </div>
        <div class="pp_feed_envio">${fEnvio}</div>
      </div>
      <div class="pp_feed_estado">
        <span class="pp_badge ${cfg.cls}"><i class="fas ${cfg.ico}"></i> ${cfg.txt}</span>
      </div>
    </div>`;
}
