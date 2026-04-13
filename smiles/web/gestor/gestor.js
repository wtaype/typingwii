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
  formatearFechaHora, wiVista
} from '../../widev.js';
import { app } from '../../wii.js';

// ─── USUARIO ─────────────────────────────────────────────────────
const wi = () => getls('wiSmile');

// ─── CACHE KEYS ──────────────────────────────────────────────────
const K_TOTAL    = 'gsTotalEstudiantes';
const K_METRICA  = 'gsMetricas';
const K_FEED     = 'gsRecientes';
const K_REALTIME = 'gsRealTime';

// ─── ESTADO INTERNO ──────────────────────────────────────────────
const state = {
  practicasSub: null,
  feedSub: null,
};

// ─── RENDER ──────────────────────────────────────────────────────
export const render = async () => {
  const u = wi();
  if (!u) return `<div class="gs_wrap"><div class="gs_empty"><i class="fas fa-lock"></i><p>Sin sesión activa.</p></div></div>`;

  const av = avatar(u.nombres || '');

  return `
  <div class="gs_page" id="gs_root">
    
    <!-- ══ BACKGROUND ORBS ══ -->
    <div class="gs_orb gs_orb1"></div>
    <div class="gs_orb gs_orb2"></div>

    <!-- ══ HERO / HEADER ══ -->
    <div class="gs_hero">
      <div class="gs_hero_main">
        <div class="gs_user_info">
          <div class="gs_avatar">${av}</div>
          <div>
            <div class="gs_saludo">${Saludar()}</div>
            <h1 class="gs_nombre">${NombreApellido(u.nombres || 'Instructor')}</h1>
            <div class="gs_tags">
              <span class="gs_tag"><i class="fas fa-chalkboard-user"></i> Gestor de Aula</span>
              <span class="gs_tag"><i class="fas fa-school"></i> ${Capit(u.empresa || app)}</span>
            </div>
          </div>
        </div>
        <div class="gs_hero_side">
          <div class="gs_fecha">
            <i class="fas fa-calendar-day"></i>
            <span>${fechaHoy()}</span>
          </div>
          <div class="gs_rt_wrap">
             <label class="gs_switch" title="Monitoreo en tiempo real">
               <input type="checkbox" id="gs_rt_toggle">
               <span class="gs_slider"></span>
             </label>
             <span class="gs_rt_txt">En vivo</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ DASHBOARD KPIs ══ -->
    <div class="gs_kpi_grid">
      
      <div class="gs_kpi gs_kpi_blue wi_fadeUp">
        <div class="gs_kpi_ico"><i class="fas fa-users"></i></div>
        <div class="gs_kpi_data">
          <div class="gs_kpi_num" id="gs_cnt_est">
            ${getls(K_TOTAL) ?? '<i class="fas fa-spinner fa-spin"></i>'}
          </div>
          <div class="gs_kpi_lbl">Estudiantes</div>
        </div>
      </div>

      <div class="gs_kpi gs_kpi_orange wi_fadeUp" style="--d:.1s">
        <div class="gs_kpi_ico"><i class="fas fa-keyboard"></i></div>
        <div class="gs_kpi_data">
          <div class="gs_kpi_num" id="gs_cnt_prac">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div class="gs_kpi_lbl">Prácticas hoy</div>
        </div>
        <div class="gs_kpi_pulse" id="gs_pulse_prac"></div>
      </div>

      <div class="gs_kpi gs_kpi_green wi_fadeUp" style="--d:.2s">
        <div class="gs_kpi_ico"><i class="fas fa-award"></i></div>
        <div class="gs_kpi_data">
          <div class="gs_kpi_num" id="gs_cnt_cert">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div class="gs_kpi_lbl">Retos cumplidos</div>
        </div>
      </div>

      <div class="gs_kpi gs_kpi_purple wi_fadeUp" style="--d:.3s">
        <div class="gs_kpi_ico"><i class="fas fa-tachometer-alt"></i></div>
        <div class="gs_kpi_data">
          <div class="gs_kpi_num" id="gs_cnt_avg">--</div>
          <div class="gs_kpi_lbl">Promedio WPM</div>
        </div>
      </div>

    </div>

    <!-- ══ ACCIONES RÁPIDAS ══ -->
    <div class="gs_actions">
      <h2 class="gs_sec_h2">Acciones Rápidas</h2>
      <div class="gs_action_grid">
        <a href="/aprobar" class="gs_action_card nv_item" data-page="aprobar">
          <div class="gs_ac_ico ac_yellow"><i class="fas fa-user-graduate"></i></div>
          <div class="gs_ac_txt">
            <strong>Gestión de Alumnos</strong>
            <span>Control de accesos y perfiles</span>
          </div>
          <i class="fas fa-chevron-right gs_ac_arr"></i>
        </a>

        <a href="/buscar" class="gs_action_card nv_item" data-page="buscar">
          <div class="gs_ac_ico ac_blue"><i class="fas fa-magnifying-glass"></i></div>
          <div class="gs_ac_txt">
            <strong>Buscador de Notas</strong>
            <span>Historial detallado por estudiante</span>
          </div>
          <i class="fas fa-chevron-right gs_ac_arr"></i>
        </a>

        <a href="/equipo" class="gs_action_card nv_item" data-page="equipo">
          <div class="gs_ac_ico ac_green"><i class="fas fa-users-gear"></i></div>
          <div class="gs_ac_txt">
            <strong>Configuración de Aula</strong>
            <span>Docentes y grupos asignados</span>
          </div>
          <i class="fas fa-chevron-right gs_ac_arr"></i>
        </a>

        <button class="gs_action_card" id="gs_refresh">
          <div class="gs_ac_ico ac_purple"><i class="fas fa-sync-alt"></i></div>
          <div class="gs_ac_txt">
            <strong>Sincronizar Datos</strong>
            <span>Actualizar ahora desde la nube</span>
          </div>
        </button>
      </div>
    </div>

    <!-- ══ ACTIVIDAD RECIENTE ══ -->
    <div class="gs_feed_sec">
      <div class="gs_feed_hdr">
        <h2 class="gs_sec_h2"><i class="fas fa-bolt"></i> Prácticas Recientes</h2>
        <span class="gs_feed_count" id="gs_feed_num">...</span>
      </div>
      <div id="gs_feed" class="gs_feed_list">
        <div class="gs_loading"><i class="fas fa-spinner fa-spin"></i> Cargando actividad...</div>
      </div>
    </div>

  </div>`;
};

// ─── INIT ────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;

  // Animaciones
  wiVista('.wi_fadeUp', null, { anim: 'wi_fadeUp' });

  const rtActivo = getls(K_REALTIME) === true;
  $('#gs_rt_toggle').prop('checked', rtActivo);

  if (rtActivo) {
    _escucharPracticas();
    _escucharFeed();
  }
  
  await _cargarTodo();

  // Switch de tiempo real
  $(document).off('.gs').on('change.gs', '#gs_rt_toggle', function() {
    const act = $(this).is(':checked');
    savels(K_REALTIME, act, 24 * 365);
    if (act) {
      _escucharPracticas();
      _escucharFeed();
    } else {
      state.practicasSub?.(); state.practicasSub = null;
      state.feedSub?.(); state.feedSub = null;
    }
  });

  // Refrescar manual
  $(document).on('click.gs', '#gs_refresh', async function() {
    const $btn = $(this);
    $btn.find('i').addClass('fa-spin');
    localStorage.removeItem(K_METRICA);
    localStorage.removeItem(K_TOTAL);
    localStorage.removeItem(K_FEED);
    await _cargarTodo(true);
    $btn.find('i').removeClass('fa-spin');
  });
};

// ─── DATA LOADING ───────────────────────────────────────────────
async function _cargarTodo(forzar = false) {
  const p = [
    _cargarMetricas(forzar),
    _cargarTotalEstudiantes(forzar),
  ];
  if (!$('#gs_rt_toggle').is(':checked')) {
    p.push(_cargarFeedEstatico(forzar));
  }
  await Promise.all(p);
}

function _escucharPracticas() {
  state.practicasSub?.();
  const q = query(collection(db, 'solicitudes'), where('estado', '==', 'pendiente'));
  state.practicasSub = onSnapshot(q, snap => {
    const n = snap.size;
    $('#gs_cnt_prac').text(n);
    n > 0 ? $('#gs_pulse_prac').addClass('activo') : $('#gs_pulse_prac').removeClass('activo');
  });
}

async function _cargarMetricas(forzar = false) {
  if (!forzar) {
    const c = getls(K_METRICA);
    if (c) { $('#gs_cnt_cert').text(c.cert); $('#gs_cnt_avg').text(c.avg); return; }
  }
  try {
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const snap = await getDocs(query(collection(db, 'solicitudes'), where('historial.histCreada', '>=', hoy)));
    let cert = 0;
    snap.forEach(d => { if (d.data().estado === 'aprobado') cert++; });
    $('#gs_cnt_cert').text(cert);
    $('#gs_cnt_avg').text('42'); // Mock AVG si no hay data real de WPM en esta colección
    savels(K_METRICA, { cert, avg: 42 }, 1/12); // 5 min
  } catch (e) { console.error(e); }
}

async function _cargarTotalEstudiantes(forzar = false) {
  if (!forzar) {
    const c = getls(K_TOTAL);
    if (c) { $('#gs_cnt_est').text(c); return; }
  }
  try {
    const snap = await getCountFromServer(query(collection(db, 'smiles'), where('estado', '==', 'activo')));
    const count = snap.data().count;
    $('#gs_cnt_est').text(count);
    savels(K_TOTAL, count, 4);
  } catch (e) { $('#gs_cnt_est').text('—'); }
}

function _escucharFeed() {
  state.feedSub?.();
  const q = query(collection(db, 'solicitudes'), orderBy('historial.histCreada', 'desc'), limit(10));
  state.feedSub = onSnapshot(q, snap => {
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    _renderFeed(items);
  });
}

async function _cargarFeedEstatico(forzar = false) {
  if (!forzar) {
    const c = getls(K_FEED);
    if (c) { _renderFeed(c); return; }
  }
  try {
    const snap = await getDocs(query(collection(db, 'solicitudes'), orderBy('historial.histCreada', 'desc'), limit(10)));
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    _renderFeed(items);
    savels(K_FEED, items, 1/12);
  } catch (e) { console.error(e); }
}

function _renderFeed(items) {
  $('#gs_feed_num').text(`${items.length} hoy`);
  if (!items.length) {
    $('#gs_feed').html('<div class="gs_empty"><i class="fas fa-inbox"></i><p>Sin actividad reciente.</p></div>');
    return;
  }
  const html = items.map(it => {
    const s = it.smile || {};
    const pr = it.solicitud || {};
    const est = it.estado || 'pendiente';
    const av = avatar(s.nombres || 'E');
    
    // Simulación de métricas Typing para el feed
    const mockWPM = Math.floor(Math.random() * (65 - 35) + 35);
    const mockACC = Math.floor(Math.random() * (100 - 92) + 92);

    return `
      <div class="gs_feed_item gs_st_${est}">
        <div class="gs_item_av">${av}</div>
        <div class="gs_item_main">
          <div class="gs_item_top">
            <strong>${Capit(s.nombres || 'Estudiante')}</strong>
            <span class="gs_item_tag">${pr.titulo || 'Mecanografía Básica'}</span>
          </div>
          <div class="gs_item_stats">
             <span><i class="fas fa-bolt"></i> ${mockWPM} WPM</span>
             <span><i class="fas fa-bullseye"></i> ${mockACC}% Precisión</span>
             <span class="gs_item_time">${formatearFechaHora(it.historial?.histCreada)}</span>
          </div>
        </div>
        <div class="gs_item_badge ${est}">${est === 'aprobado' ? 'Cumplido' : 'En proceso'}</div>
      </div>
    `;
  }).join('');
  $('#gs_feed').html(html);
}

// ─── CLEANUP ─────────────────────────────────────────────────────
export const cleanup = () => {
  state.practicasSub?.();
  state.feedSub?.();
  $(document).off('.gs');
};
