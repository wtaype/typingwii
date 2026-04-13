/**
 * solicitar.js — Módulo de solicitud de días libres / beneficios
 *
 * Flujo:
 *  1. Carga datos del usuario + catálogo de beneficios en paralelo
 *  2. Muestra el hero-card con el beneficio disponible
 *  3. Si hay beneficio → form + calendario visibles de inmediato
 *  4. Historial en tiempo real via onSnapshot (colección `solicitudes`)
 */

import './solicitar.css';
import $ from 'jquery';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin   from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getls }       from '../../widev.js';
import { db, auth }    from '../firebase.js';
import {
  collection, query, where, orderBy, limit,
  getDoc, setDoc, deleteDoc,
  doc, onSnapshot, serverTimestamp, Timestamp
} from 'firebase/firestore';
import {
  calcularTiempoEmpresa, calcMeses,
  Mayu, avatar,
  Mensaje, abrirModal, cerrarTodos,
  formatearFechaHora, formatearFechasEscogidas,
  simulateProcess, removels, savels
} from '../../widev.js';

const wi = () => getls('wiSmile');

// ─── ESTADO DEL MÓDULO ────────────────────────────────────────────
const state = {
  calendario:  null,   
  histSub:     null,   
  beneficio:   null,   
  unlockedBens: [],
  claseForm:   '',     
};

// ─── CONSTANTES ───────────────────────────────────────────────────
const ICONOS = {
  salud: 'fa-heartbeat', libre: 'fa-umbrella-beach', formacion: 'fa-graduation-cap', 
  familia: 'fa-baby', descuentos: 'fa-tags', otros: 'fa-gift'
};
const COLORES = {
  salud: '#FF4B4B', libre: '#00D1B2', formacion: '#3273DC',
  familia: '#FF3860', descuentos: '#FFDD57', otros: '#B86BFF'
};

const DURACION_LABEL = {
  '4horas':  '4 horas libres',
  'undia':   '1 día libre',
  'dosdias': '2 días libres',
};
const TIPO_POR_CLASE = {
  bhoras: '4horas',
  dias1:  'undia',
  dias2:  'dosdias',
};
const ESTADO_UI = {
  pendiente: { clase: 'pendiente', texto: 'Pendiente'  },
  aprobado:  { clase: 'aprobado',  texto: 'Aprobado'   },
  rechazado: { clase: 'rechazado', texto: 'Rechazado'  },
};

const esFechaPasada = d => new Date().setHours(0,0,0,0) > d;

// ─── RENDER (esqueleto estático) ──────────────────────────────────
export const render = async () => {
  const u = wi();
  if (!u) return `
    <div class="sol_wrap">
      <div class="sol_empty">
        <i class="fas fa-lock"></i>
        <p>Sin sesión activa.</p>
      </div>
    </div>`;

  return `
  <div class="sol_wrap" id="sol_root">

    <!-- Hero: beneficio disponible (se rellena en init) -->
    <div id="sol_hero_area">
      <div class="sol_empty"><i class="fas fa-spinner fa-spin"></i></div>
    </div>

    <!-- Form + Calendario (visible sólo si hay beneficio) -->
    <div id="sol_main_grid" class="sol_grid" style="display:none">

      <!-- ── Formulario ── -->
      <div class="sol_card">
        <div class="sol_card_title">
          <i class="fas fa-paper-plane"></i> Solicitar beneficio
        </div>

        <form id="sol_form" novalidate>

          <!-- Beneficio seleccionado -->
          <div class="sol_campo">
            <label class="sol_label">Beneficio a solicitar</label>
            <select class="sol_control" id="sol_ben_select" style="font-weight:600; color:var(--mco); cursor:pointer">
              <option value="" disabled selected>Cargando beneficios disponibles...</option>
            </select>
          </div>

          <!-- 4 horas — datetime-local -->
          <div class="sol_campo" id="sol_campo_h" style="display:none">
            <label class="sol_label">
              <i class="fas fa-clock" style="color:var(--sm_azul)"></i>
              Fecha y hora
            </label>
            <input type="datetime-local" class="sol_control" id="sol_fecha_h">
          </div>

          <!-- 1 día — date -->
          <div class="sol_campo" id="sol_campo_1" style="display:none">
            <label class="sol_label">
              <i class="fas fa-calendar-day" style="color:var(--sm_azul)"></i>
              Fecha del día libre
            </label>
            <input type="date" class="sol_control" id="sol_fecha_1">
          </div>

          <!-- 2 días — dos dates -->
          <div class="sol_campo" id="sol_campo_2a" style="display:none">
            <label class="sol_label">
              <i class="fas fa-calendar-day" style="color:var(--sm_azul)"></i>
              Primera fecha
            </label>
            <input type="date" class="sol_control" id="sol_fecha_2a">
          </div>
          <div class="sol_campo" id="sol_campo_2b" style="display:none">
            <label class="sol_label">
              <i class="fas fa-calendar-check" style="color:var(--sm_azul)"></i>
              Segunda fecha
            </label>
            <input type="date" class="sol_control" id="sol_fecha_2b">
          </div>

          <!-- Comentarios -->
          <div class="sol_campo">
            <label class="sol_label">Comentarios adicionales</label>
            <textarea class="sol_control" id="sol_comentario"
              placeholder="Cuéntanos algo sobre tu solicitud…"></textarea>
          </div>

          <!-- Submit -->
          <button type="submit" class="sol_submit_btn" id="sol_submit">
            <i class="fas fa-paper-plane"></i> Enviar solicitud
          </button>
        </form>
      </div>

      <!-- ── Calendario ── -->
      <div class="sol_card">
        <div class="sol_card_title">
          <i class="far fa-calendar-alt"></i> Selecciona tu(s) fecha(s)
        </div>
        <div id="sol_calendar"></div>
      </div>

    </div>

    <!-- Historial en tiempo real -->
    <div class="sol_card sol_hist_card">
      <div class="sol_hist_head">
        <div class="sol_hist_title">
          <i class="fas fa-history"></i> Historial de solicitudes
        </div>
        <button class="sol_refresh_btn" id="sol_refresh" title="Actualizar">
          <i class="fas fa-sync-alt"></i>
        </button>
      </div>
      <div class="sol_table_wrap">
        <table class="sol_table" id="sol_hist_table">
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombres</th>
              <th>Beneficio</th>
              <th>Fecha(s)</th>
              <th>Comentario</th>
              <th>Enviado</th>
              <th>Respuesta</th>
              <th>Comentario RESPUESTA</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="sol_hist_body">
            <tr><td colspan="10" class="sol_empty">
              <i class="fas fa-spinner fa-spin"></i>
            </td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div class="wiModal" id="sol_modal">
      <div class="modalBody sol_modal_body">
        <button class="modalX">&times;</button>
        <div class="sol_modal_head">
          <i class="fas fa-exclamation-triangle"></i>
          Eliminar solicitud
        </div>
        <div class="sol_modal_msg">
          ¿Estás seguro? Esta acción es irreversible y eliminará la solicitud permanentemente.
        </div>
        <div class="sol_modal_footer">
          <button class="sol_btn_sec" id="sol_cancel">Cancelar</button>
          <button class="sol_btn_danger" id="sol_confirmar">
            <i class="fas fa-trash-alt"></i> Sí, eliminar
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

  _bindEventos();

  const cacheBens = getls('wiBeneficiosList');
  if (cacheBens && cacheBens.length > 0) {
    _setupMenuBeneficios(u, cacheBens);
  }

  Promise.all([
    _cargarBeneficio(u, cacheBens),
    _cargarHistorial()
  ]);
};

function _setupMenuBeneficios(u, unlocked) {
  state.unlockedBens = unlocked;

  // Ocultar dropdown clásico, usaremos las Cards
  $('#sol_ben_select').closest('.sol_campo').hide();

  _renderHeroGrid();
  _mostrarGrid();
  _initCalendario();

  const reqId = getls('wiBenSelected');
  if (reqId && unlocked.find(b => b.id === reqId)) {
    _seleccionarBeneficio(reqId);
    removels('wiBenSelected');
  } else {
    _seleccionarBeneficio(unlocked[0].id);
  }
}

function _renderHeroGrid() {
  const u = wi();
  const fechaIngreso = u.fechaIngreso?.seconds ? new Date(u.fechaIngreso.seconds * 1000) : new Date();
  const tiempoTxt = calcularTiempoEmpresa(fechaIngreso);

  const html = state.unlockedBens.map((b, i) => {
    const isDark = b.banner || b.color;
    const bgStyle = b.banner 
      ? `background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url(${b.banner}) center/cover no-repeat; color: #fff;` 
      : (b.color ? `background: linear-gradient(135deg, ${b.color}, var(--mco)); color: #fff;` : '');
    
    // Mensaje de felicitaciones dinámico
    let razon = 'por ser parte de nuestro equipo';
    if (b.disponible === 'cumple') razon = 'por tu cumpleaños';
    else if (['3meses', '6meses', '12meses'].includes(b.disponible)) razon = 'por tu permanencia';

    let tienesStr = DURACION_LABEL[b.duracion];
    let mensajeFelicidad = tienesStr 
      ? `¡Felicidades, tienes ${tienesStr} al año ${razon}!`
      : `¡Felicidades, tienes acceso a este beneficio ${razon}!`;

    return `
      <div class="sol_hero sol_hero_card sol_ben_card" data-id="${b.id}" style="${bgStyle}" title="${b.nombre || b.titulo}">
        <div class="sol_hero_info" style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
          <div>
            <div class="sol_hero_badge" style="${isDark ? 'background:rgba(255,255,255,0.2);color:#fff;border:none' : ''}">
              <i class="fas fa-gift"></i> Beneficio validado ✨
            </div>
            <div class="sol_hero_title" style="${isDark ? 'color:#fff' : 'color:#1B1B1B'}">${b.nombre || b.titulo}</div>
            <div class="sol_hero_desc" style="color:#FFD101; font-weight:600; margin-bottom: 0.8vh; font-size:14px; line-height:1.4;">${mensajeFelicidad}</div>
            <div class="sol_hero_desc" style="${isDark ? 'color:rgba(255,255,255,0.85)' : 'color:#484848'}; font-size:13px; line-height:1.5;">${b.descripcion || ''}</div>
          </div>
          <div class="sol_card_check_hero"><i class="fas fa-check-circle"></i> Seleccionado</div>
        </div>
      </div>
    `;
  }).join('');

  $('#sol_hero_area').html(`
    <style>
      .sol_ben_grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 2.5vh; margin-bottom: 2vh; }
      .sol_hero_card { height: 195px; padding: 2.5vh; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0.9; }
      .sol_hero_card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); opacity: 1; }
      .sol_hero_card.active { border-radius: 1.4vh; box-shadow: 0 0 0 3px #FFD101, 0 8px 25px rgba(0,0,0,0.2); opacity: 1; transform: translateY(-4px); }
      .sol_card_check_hero { display: none; margin-top: 1.5vh; font-weight: 700; color: #FFD101; font-size: var(--fz_sm); animation: fadeIn 0.3s; }
      .sol_hero_card.active .sol_card_check_hero { display: block; }
    </style>
    <div class="sol_ben_grid">
      ${html}
    </div>
  `);
}

function _seleccionarBeneficio(id) {
  $('.sol_ben_card').removeClass('active');
  $(`.sol_ben_card[data-id="${id}"]`).addClass('active');

  const b = state.unlockedBens?.find(x => x.id === id);
  if (!b) return;

  state.beneficio = b;
  state.claseForm = { '4horas':'bhoras', 'undia':'dias1', 'dosdias':'dias2' }[b.duracion] || 'dias1';

  $('#sol_campo_h, #sol_campo_1, #sol_campo_2a, #sol_campo_2b').hide();
  const campos = { bhoras:'h', dias1:'1', dias2:'2a,2b' };
  (campos[state.claseForm] || '').split(',').forEach(idc => $(`#sol_campo_${idc}`).show());

  // Actualizar UI
  _marcarCalendario();
}

async function _cargarBeneficio(u, cacheBens = null) {
  const $area = $('#sol_hero_area');
  try {
    const fechaIngreso = u.fechaIngreso?.seconds ? new Date(u.fechaIngreso.seconds * 1000) : null;
    if (!fechaIngreso) throw new Error('Sin fecha de ingreso');

    const dNac = u.fechaNacimiento?.seconds ? new Date(u.fechaNacimiento.seconds * 1000) : null;
    const esCumple = dNac ? dNac.getMonth() === new Date().getMonth() : false;

    const meses = calcMeses(fechaIngreso);
    const snap  = await getDoc(doc(db, 'beneficios', 'catalogo'));
    if (!snap.exists()) throw new Error('Catálogo no disponible');

    const items = (snap.data().items || []).filter(b => b.estado === 'activo');
    
    // Filtro Smart Recompensas V2 (Deduplicación + Vigencia)
    const hoyStr = new Date().toISOString().split('T')[0];
    let rawUnlocked = items.filter(b => {
       // Vigencia
       if (b.fechaDesde && hoyStr < b.fechaDesde) return false;
       if (b.fechaHasta && hoyStr > b.fechaHasta) return false;

       const disp = b.disponible;
       if (disp === 'todos')   return true;
       if (disp === '3meses')  return meses >= 3;
       if (disp === '6meses')  return meses >= 6;
       if (disp === '12meses') return meses >= 12;
       if (disp === 'cumple')  return esCumple;
       return false;
    });

    const PESOS = { '12meses': 12, '6meses': 6, '3meses': 3, 'todos': 0 };
    const libresRegla = [];
    const restoBens = [];

    rawUnlocked.forEach(b => {
      // Detectar si es tiempo libre (con soporte para registros antiguos sin categoría)
      const esLibre = b.categoria === 'libre' || (!b.categoria && ['4horas', 'undia', 'dosdias'].includes(b.duracion));
      if (esLibre && PESOS[b.disponible] !== undefined) {
        libresRegla.push(b);
      } else {
        restoBens.push(b);
      }
    });

    if (libresRegla.length > 0) {
      libresRegla.sort((a, b) => PESOS[b.disponible] - PESOS[a.disponible]);
      restoBens.unshift(libresRegla[0]);
    }
    const unlocked = restoBens;

    if (unlocked.length > 0) {
      if (JSON.stringify(cacheBens) !== JSON.stringify(unlocked)) {
        savels('wiBeneficiosList', unlocked, 24);
        _setupMenuBeneficios(u, unlocked);
      }
      return true;
    }

    // Sin beneficio
    if (getls('wiBeneficiosList')) removels('wiBeneficiosList');
    const msg = meses < 3
      ? `Solo llevas ${meses} ${meses === 1 ? 'mes' : 'meses'}. ¡Ánimo! Con 3 meses ya accedes a tus primeros beneficios.`
      : 'No encontramos beneficios disponibles para ti en este momento. Comunícate con Recursos Humanos.';
    
    $area.html(`
      <div class="sol_hero_empty">
        <div class="sol_hero_empty_ico"><i class="fas fa-hourglass-half"></i></div>
        <div>
          <div class="sol_hero_empty_title">Aún no accedes a los beneficios</div>
          <div class="sol_hero_empty_msg">${msg}</div>
        </div>
      </div>`);
    $('#sol_main_grid').hide();
    return false;

  } catch (e) {
    console.error('[solicitar] cargarBeneficio:', e);
    if (!cacheBens) {
      $area.html(`
        <div class="sol_hero_empty">
          <div class="sol_hero_empty_ico"><i class="fas fa-exclamation-circle"></i></div>
          <div>
            <div class="sol_hero_empty_title">Error al cargar beneficios</div>
            <div class="sol_hero_empty_msg">No pudimos verificar tu estado. Intenta recargar o contacta a RRHH.</div>
          </div>
        </div>`);
    }
  }
}

// ─── MOSTRAR GRID ─────────────────────────────────────────────────
function _mostrarGrid() {
  $('#sol_main_grid').css('display', 'grid');
}

// ─── CALENDARIO ───────────────────────────────────────────────────
function _initCalendario() {
  if (state.calendario) { state.calendario.destroy(); state.calendario = null; }
  const el = document.getElementById('sol_calendar');
  if (!el) return;

  state.calendario = new Calendar(el, {
    plugins:     [dayGridPlugin, interactionPlugin],
    locale:      'es',
    firstDay:    1,
    initialView: 'dayGridMonth',
    height:      'auto',   // renderiza todas las filas sin scroll ni colapso
    headerToolbar: {
      left:   'today',
      center: 'title',
      right:  'prev,next'
    },
    buttonText: { today: 'Hoy' },
    dayMaxEvents: false,   // no ocultar eventos con "+more"
    datesSet:   _marcarCalendario,
    dateClick:  ({ date, dateStr }) => {
      if (esFechaPasada(date)) return;
      _seleccionarFecha(dateStr);
      _marcarCalendario();
    },
  });

  state.calendario.render();

  // Actualizar marcas cuando cambia un input
  $(document).on('change.sol', '#sol_fecha_h, #sol_fecha_1, #sol_fecha_2a, #sol_fecha_2b',
    _marcarCalendario);
}

function _marcarCalendario() {
  // Limpiar marcas anteriores
  document.querySelectorAll('.fc-daygrid-day').forEach(d => {
    const date = new Date(d.dataset.date);
    d.classList.toggle('sol_day_pasado', esFechaPasada(date));
    d.classList.remove('sol_day_gold');
  });

  // Dorar fecha(s) seleccionada(s)
  const dorar = sel => {
    const v = $(sel).val()?.split('T')[0];
    if (v) document.querySelector(`.fc-daygrid-day[data-date="${v}"]`)
              ?.classList.add('sol_day_gold');
  };

  const c = state.claseForm;
  if (c === 'bhoras') dorar('#sol_fecha_h');
  if (c === 'dias1')  dorar('#sol_fecha_1');
  if (c === 'dias2')  { dorar('#sol_fecha_2a'); dorar('#sol_fecha_2b'); }
}

function _seleccionarFecha(dateStr) {
  const c      = state.claseForm;
  const active = document.activeElement?.id;

  if (c === 'bhoras') {
    $('#sol_fecha_h').val(`${dateStr}T09:00`).trigger('change');
  } else if (c === 'dias1') {
    $('#sol_fecha_1').val(dateStr).trigger('change');
  } else if (c === 'dias2') {
    if      (active === 'sol_fecha_2a') { $('#sol_fecha_2a').val(dateStr); }
    else if (active === 'sol_fecha_2b') { $('#sol_fecha_2b').val(dateStr); }
    else if (!$('#sol_fecha_2a').val())  { $('#sol_fecha_2a').val(dateStr).focus(); }
    else if (!$('#sol_fecha_2b').val())  { $('#sol_fecha_2b').val(dateStr).focus(); }
    else { $('#sol_fecha_2a').val(dateStr); $('#sol_fecha_2b').val('').focus(); }
    $('#sol_fecha_2a, #sol_fecha_2b').trigger('change');
  }
}

// ─── HISTORIAL TIEMPO REAL ────────────────────────────────────────
function _renderTablaHistorial(datos) {
  const $tbody = $('#sol_hist_body');
  if (!datos || datos.length === 0) {
    $tbody.html(`
      <tr><td colspan="10" class="sol_empty" style="padding:4vh">
        <i class="fas fa-inbox"></i>
        <p>Aún no tienes solicitudes registradas.</p>
      </td></tr>`);
    return;
  }

  $tbody.html(datos.map(d => {
    const sol   = d.solicitud  || {};
    const smile = d.smile      || {};
    const hist  = d.historial  || {};
    const est   = d.estado     || 'pendiente';
    const ui    = ESTADO_UI[est] || ESTADO_UI.pendiente;
    const es4h  = sol.tipo === '4horas';

    const fechas  = sol.fechasEscogidos
      ? formatearFechasEscogidas(sol.fechasEscogidos, es4h) : '—';
    const fEnvio  = hist.histCreada       ? formatearFechaHora(hist.histCreada)     : '—';
    const fResp   = est !== 'pendiente'   ? formatearFechaHora(hist.histActualizado) : '—';

    const btnDel = est === 'aprobado'
      ? `<span title="No se puede eliminar una solicitud aprobada" style="color:var(--tx3)">
           <i class="fas fa-lock"></i>
         </span>`
      : `<button class="sol_del_btn" data-id="${d.id}" title="Eliminar solicitud">
           <i class="fas fa-trash-alt"></i>
         </button>`;

    return `
      <tr>
        <td>${smile.dni     || '—'}</td>
        <td>${smile.nombres  ? Mayu(smile.nombres) : '—'}</td>
        <td>${sol.titulo    || sol.nombre || '—'}</td>
        <td><strong>${fechas}</strong></td>
        <td>${sol.comentarios || '—'}</td>
        <td style="white-space:nowrap">${fEnvio}</td>
        <td style="white-space:nowrap">${fResp}</td>
        <td>${hist.histPeopleComment || '—'}</td>
        <td><span class="sol_badge ${ui.clase}">${ui.texto}</span></td>
        <td>${btnDel}</td>
      </tr>`;
  }).join(''));
}

function _cargarHistorial() {
  const email = wi()?.email;
  if (!email) return;

  const cacheSol = getls('wiSolicitar');
  if (cacheSol) _renderTablaHistorial(cacheSol);

  _cancelarHistorial();

  const $btn = $('#sol_refresh').html('<i class="fas fa-spinner fa-spin"></i>').prop('disabled', true);
  const q = query(
    collection(db, 'solicitudes'),
    where('smile.email', '==', email),
    orderBy('historial.histCreada', 'desc'),
    limit(50)
  );

  state.histSub = onSnapshot(q,
    snap => {
      $btn.html('<i class="fas fa-sync-alt"></i>').prop('disabled', false);
      const mapped = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      savels('wiSolicitar', mapped);
      _renderTablaHistorial(mapped);
    },
    err => {
      console.error('[solicitar] onSnapshot:', err);
      $btn.html('<i class="fas fa-sync-alt"></i>').prop('disabled', false);
      if (!cacheSol) Mensaje('Error al cargar historial', 'error');
    }
  );
}

function _cancelarHistorial() {
  if (state.histSub) { state.histSub(); state.histSub = null; }
}

// ─── VALIDAR Y ENVIAR SOLICITUD ───────────────────────────────────
async function _procesarSolicitud(e) {
  e.preventDefault();

  const u       = wi();
  const usuario = auth?.currentUser;
  if (!u || !usuario || !state.beneficio) return Mensaje('Sesión no válida', 'error');

  const comentario = $('#sol_comentario').val().trim();
  if (!comentario) {
    $('#sol_comentario').addClass('error').focus();
    return Mensaje('Añade un comentario sobre tu solicitud', 'error');
  }
  $('#sol_comentario').removeClass('error');

  // Validar fecha(s) según tipo
  let fechasProcesadas;
  const c = state.claseForm;

  if (c === 'bhoras') {
    const v = $('#sol_fecha_h').val();
    if (!v) { $('#sol_fecha_h').addClass('error').focus(); return Mensaje('Selecciona fecha y hora', 'error'); }
    if (esFechaPasada(new Date(v))) return Mensaje('No puedes seleccionar una fecha pasada', 'error');
    $('#sol_fecha_h').removeClass('error');
    fechasProcesadas = new Date(v);
  }
  else if (c === 'dias1') {
    const v = $('#sol_fecha_1').val();
    if (!v) { $('#sol_fecha_1').addClass('error').focus(); return Mensaje('Selecciona una fecha', 'error'); }
    if (esFechaPasada(new Date(v))) return Mensaje('No puedes seleccionar una fecha pasada', 'error');
    $('#sol_fecha_1').removeClass('error');
    fechasProcesadas = new Date(v);
  }
  else if (c === 'dias2') {
    const v1 = $('#sol_fecha_2a').val(), v2 = $('#sol_fecha_2b').val();
    if (!v1) { $('#sol_fecha_2a').addClass('error').focus(); return Mensaje('Selecciona la primera fecha', 'error'); }
    if (!v2) { $('#sol_fecha_2b').addClass('error').focus(); return Mensaje('Selecciona la segunda fecha', 'error'); }
    const d1 = new Date(v1), d2 = new Date(v2);
    if (esFechaPasada(d1) || esFechaPasada(d2)) return Mensaje('No puedes seleccionar fechas pasadas', 'error');
    if (d2 <= d1)           return Mensaje('La segunda fecha debe ser posterior a la primera', 'error');
    if (d1.toDateString() === d2.toDateString()) return Mensaje('No puedes seleccionar el mismo día dos veces', 'error');
    $('#sol_fecha_2a, #sol_fecha_2b').removeClass('error');
    fechasProcesadas = [d1, d2];
  }
  else return Mensaje('Tipo de beneficio no reconocido', 'error');

  const $btn = $('#sol_submit').prop('disabled', true)
    .html('<i class="fas fa-spinner fa-spin"></i>&nbsp; Procesando...');

  try {
    const ben          = state.beneficio;
    const tipo         = TIPO_POR_CLASE[c];
    const fechaIngreso = u.fechaIngreso?.seconds
      ? new Date(u.fechaIngreso.seconds * 1000) : new Date();

    const solicitudId = `${u.dni || 'x'}_${Date.now()}`;
    const ahora       = serverTimestamp();
    const fechasTs    = Array.isArray(fechasProcesadas)
      ? fechasProcesadas.map(f => Timestamp.fromDate(f))
      : Timestamp.fromDate(fechasProcesadas);

    // Re-verificar que el beneficio sigue activo en Firestore
    const catSnap = await getDoc(doc(db, 'beneficios', 'catalogo'));
    if (catSnap.exists()) {
      const b = (catSnap.data().items || []).find(x => x.id === ben.id);
      if (!b)                  throw new Error('El beneficio seleccionado ya no existe');
      if (b.estado !== 'activo') throw new Error('Este beneficio ya no está disponible');
    }

    await setDoc(doc(db, 'solicitudes', solicitudId), {
      smile: {
        dni:          u.dni                   || '',
        nombres:      u.nombres               || '',
        cargo:        u.cargo || u.cargoOperaciones || '',
        centroCosto:  u.centroCosto           || '',
        fechaIngreso: u.fechaIngreso          || null,
        avatar:       avatar(u.nombres        || ''),
        email:        usuario.email,
        antiguedad:   calcularTiempoEmpresa(fechaIngreso),
      },
      solicitud: {
        idSoli:          solicitudId,
        titulo:          ben.titulo || ben.nombre,
        nombre:          ben.nombre,
        tipo,
        duracion:        DURACION_LABEL[tipo]  || tipo,
        comentarios:     comentario,
        fechasEscogidos: fechasTs,
        beneficioId:     ben.id || null,
      },
      estado: 'pendiente',
      historial: {
        histCreada:        ahora,
        histActualizado:   '',
        histEstado:        'pendiente',
        histPeople:        '',
        histPeopleComment: '',
      },
    });

    Mensaje('¡Solicitud enviada correctamente!', 'success');
    $('#sol_form')[0].reset();
    _marcarCalendario();
    // Invalidar caché de historial
    removels('wiSolicitar');
    simulateProcess(() => _cargarHistorial(), 800);

  } catch (err) {
    console.error('[solicitar] procesarSolicitud:', err);
    Mensaje(err.message || 'Error al enviar la solicitud', 'error');
  } finally {
    $btn.prop('disabled', false).html('<i class="fas fa-paper-plane"></i> Enviar solicitud');
  }
}

// ─── ELIMINAR SOLICITUD ───────────────────────────────────────────
async function _eliminarSolicitud(id) {
  const $btn = $('#sol_confirmar').prop('disabled', true)
    .html('<i class="fas fa-spinner fa-spin"></i>');
  try {
    const snap = await getDoc(doc(db, 'solicitudes', id));
    if (!snap.exists()) throw new Error('La solicitud ya no existe');

    const data    = snap.data();
    const usuario = auth?.currentUser;

    if (data.smile?.email !== usuario?.email)
      throw new Error('Sin permiso para eliminar esta solicitud');
    if (data.estado === 'aprobado')
      throw new Error('No se pueden eliminar solicitudes ya aprobadas');

    await deleteDoc(doc(db, 'solicitudes', id));
    cerrarTodos();
    Mensaje('Solicitud eliminada correctamente', 'success');
  } catch (err) {
    Mensaje(err.message || 'Error al eliminar', 'error');
  } finally {
    $btn.prop('disabled', false).html('<i class="fas fa-trash-alt"></i> Sí, eliminar');
  }
}

function _bindEventos() {
  // Eliminar el change clásico en favo de las Cards
  $(document).on('click.sol', '.sol_ben_card', function() {
    _seleccionarBeneficio($(this).data('id'));
  });

  // Submit del form
  $(document).on('submit.sol', '#sol_form', _procesarSolicitud);

  // Refresh del historial
  $(document).on('click.sol', '#sol_refresh', () => {
    removels('wiSolicitar');
    $('#sol_hist_body').html(`
      <tr><td colspan="10" class="sol_empty" style="padding:4vh">
        <i class="fas fa-spinner fa-spin"></i>
      </td></tr>`);
    _cargarHistorial();
    setTimeout(() => Mensaje('Historial actualizado', 'info'), 200);
  });

  // Botón eliminar → abrir modal
  $(document).on('click.sol', '.sol_del_btn', function () {
    const id = $(this).data('id');
    abrirModal('sol_modal');
    $('#sol_confirmar').data('id', id);
  });

  // Cancelar en modal
  $(document).on('click.sol', '#sol_cancel', cerrarTodos);

  // Confirmar eliminación
  $(document).on('click.sol', '#sol_confirmar', function () {
    const id = $(this).data('id');
    if (id) _eliminarSolicitud(id);
  });

  // Quitar clase error al corregir
  $(document).on('input.sol', '.sol_control.error', function () {
    $(this).removeClass('error');
  });
}

export const cleanup = () => {
  _cancelarHistorial();
  if (state.calendario) { state.calendario.destroy(); state.calendario = null; }
  state.beneficio = null;
  state.unlockedBens = [];
  state.claseForm = '';
  // Desregistrar todos los listeners con namespace .sol
  $(document).off('.sol');
  $(document).off('change.sol');
};
