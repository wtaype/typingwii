import './smile.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import { collection, query, where, orderBy, limit, getDocs, getDoc, doc } from 'firebase/firestore';
import {
  savels, getls, Saludar, fechaHoy,
  calcularTiempoEmpresa, calcMeses,
  NombreApellido, formatearFechasEscogidas, formatearFechaHora
} from '../../widev.js';

const wi = () => getls('wiSmile');

// ══════════════════════════════════════════════════════════════════════
// ① FRASES MOTIVACIONALES DE MECANOGRAFÍA
// ══════════════════════════════════════════════════════════════════════
const FRASES = [
  { ico: 'fa-keyboard',        txt: '¡Cada tecla que practicas te acerca a la maestría! ⌨️' },
  { ico: 'fa-bolt',            txt: '¡La velocidad viene con la constancia. Sigue tecleando! ⚡' },
  { ico: 'fa-trophy',          txt: '¡Los mejores mecanógrafos no nacen, se practican! 🏆' },
  { ico: 'fa-fire',            txt: '¡Tus dedos son más rápidos de lo que crees. Demuéstralo!' },
  { ico: 'fa-star',            txt: '¡Hoy es un gran día para romper tu récord de velocidad! 🌟' },
  { ico: 'fa-rocket',          txt: '¡De 30 a 80 WPM: es solo cuestión de práctica diaria! 🚀' },
  { ico: 'fa-brain',           txt: '¡Tu cerebro y tus dedos son el equipo perfecto! 🧠' },
  { ico: 'fa-chart-line',      txt: '¡Cada sesión de hoy es el progreso de mañana!' },
  { ico: 'fa-hands',           txt: '¡Las grandes obras se escriben tecla a tecla! ✍️' },
  { ico: 'fa-infinity',        txt: '¡Sin límites para quien practica con determinación!' },
];

// ══════════════════════════════════════════════════════════════════════
// ② NIVEL DE ANTIGÜEDAD (igual a perfil.js — consistencia visual)
// ══════════════════════════════════════════════════════════════════════
const nivelAntiguedad = (u) => {
  const ts = u.fechaIngreso?.seconds;
  if (!ts) return null;
  const m = calcMeses(new Date(ts * 1000));
  if (m >= 36) return { label: 'Veterano', color: '#FFD101', ico: 'fa-crown' };
  if (m >= 24) return { label: 'Experto',  color: '#37a1dd', ico: 'fa-gem' };
  if (m >= 12) return { label: 'Senior',   color: '#28a745', ico: 'fa-trophy' };
  if (m >= 6)  return { label: 'Avanzado', color: '#fd7e14', ico: 'fa-fire' };
  return          { label: 'Nuevo',    color: '#909090', ico: 'fa-seedling' };
};

// ══════════════════════════════════════════════════════════════════════
// ③ AVATAR: primera letra del apellido (último nombre)
// ══════════════════════════════════════════════════════════════════════
const ini = (nombres) => (nombres || 'U S').trim().split(/\s+/).reverse()[0]?.[0]?.toUpperCase() || 'U';

// ══════════════════════════════════════════════════════════════════════
// ④ RENDERS INTERNOS
// ══════════════════════════════════════════════════════════════════════
function _renderBeneficiosGrid(bens) {
  if (!bens?.length) return `<div class="sm_empty"><i class="fas fa-box-open"></i><p>Aún no tienes beneficios desbloqueados.</p></div>`;
  const DURACION = { '4horas': '4 horas libres', 'undia': '1 día libre', 'dosdias': '2 días libres' };
  const cards = bens.map((b, i) => {
    const isDark = b.banner || b.color;
    const bg = b.banner
      ? `background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.85)),url(${b.banner}) center/cover no-repeat;color:#fff;`
      : (b.color ? `background:linear-gradient(135deg,${b.color},var(--mco));color:#fff;` : 'background:#fff;border-left:5px solid #FFD101;');
    let razon = 'por ser parte de nuestro equipo';
    if (b.disponible === 'cumple') razon = 'por tu cumpleaños';
    else if (['3meses','6meses','12meses'].includes(b.disponible)) razon = 'por tu permanencia';
    const tienesStr = DURACION[b.duracion];
    const feliz = tienesStr ? `¡Felicidades, tienes ${tienesStr} al año ${razon}!` : `¡Felicidades, tienes acceso a este beneficio ${razon}!`;
    return `
      <div class="sm_hero_card sm_ben_btn" data-id="${b.id}" style="${bg} animation-delay:${i*0.1}s;" title="Solicitar ${b.nombre||b.titulo}">
        <div class="sm_hero_info" style="display:flex;flex-direction:column;justify-content:space-between;height:100%;">
          <div>
            <div class="sm_hero_badge" style="${isDark?'background:rgba(255,255,255,.2);color:#fff;border:none':''}"><i class="fas fa-gift"></i> Beneficio validado ✨</div>
            <div class="sm_hero_title" style="${isDark?'color:#fff':'color:#1B1B1B'}">${b.nombre||b.titulo}</div>
            <div class="sm_hero_desc" style="color:#FFD101;font-weight:600;margin-bottom:.8vh;font-size:14px;line-height:1.4;">${feliz}</div>
            <div class="sm_hero_desc" style="${isDark?'color:rgba(255,255,255,.85)':'color:#484848'};font-size:13px;line-height:1.5;">${b.descripcion||''}</div>
          </div>
          <div class="sm_hero_footer" style="margin-top:1.5vh;font-weight:600;font-size:14px;color:${isDark?'#fff':'var(--mco)'}">
            <i class="fas fa-paper-plane"></i> Solicitar Beneficio
          </div>
        </div>
      </div>`;
  }).join('');
  return `
    <div class="sm_ben_grid_title"><i class="fas fa-unlock-alt" style="color:var(--mco2)"></i> Beneficios Disponibles</div>
    <div class="sm_ben_grid_wrap"><div class="sm_ben_grid">${cards}</div></div>`;
}

function _renderSolicitudesHtml(items) {
  if (!items?.length) return `<div class="sm_empty"><i class="fas fa-inbox"></i><p>Aún no tienes solicitudes enviadas.</p></div>`;
  const ESTADOS = {
    pendiente: { ico: 'fa-clock', clase: 'pendiente' },
    aprobado:  { ico: 'fa-check', clase: 'aprobado'  },
    rechazado: { ico: 'fa-times', clase: 'rechazado' },
  };
  return `<div class="sm_lista">${items.map(it => {
    const est  = it.estado || 'pendiente';
    const info = ESTADOS[est] || ESTADOS.pendiente;
    const sol  = it.solicitud || {};
    const hist = it.historial || {};
    const fechas = sol.fechasEscogidos
      ? formatearFechasEscogidas(sol.fechasEscogidos, sol.tipo === '4horas')
      : hist.histCreada ? formatearFechaHora(hist.histCreada) : '—';
    return `
      <div class="sm_item sm_item__${est}">
        <div class="sm_item_icon ${est}"><i class="fas ${info.ico}"></i></div>
        <div class="sm_item_info">
          <div class="sm_item_tipo">${sol.titulo||sol.nombre||'Solicitud'}</div>
          <div class="sm_item_fecha">${fechas}</div>
        </div>
        <span class="sm_badge ${est}">${est.charAt(0).toUpperCase()+est.slice(1)}</span>
      </div>`;
  }).join('')}</div>`;
}

// ══════════════════════════════════════════════════════════════════════
// ⑤ RENDER PRINCIPAL
// ══════════════════════════════════════════════════════════════════════
export const render = async () => {
  const u = wi();
  if (!u) return `<div class="sm_bv_wrap"><div class="sm_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;

  const fechaIngreso = u.fechaIngreso?.seconds ? new Date(u.fechaIngreso.seconds * 1000) : null;
  const tiempoTexto  = fechaIngreso ? calcularTiempoEmpresa(fechaIngreso) : null;
  const fechaStr     = fechaIngreso ? fechaIngreso.toLocaleDateString('es-PE', { year:'numeric', month:'long', day:'numeric' }) : '—';
  const avatar       = ini(u.nombres);
  const nivel        = nivelAntiguedad(u);
  const frase        = FRASES[Math.floor(Math.random() * FRASES.length)];

  return `
  <div class="sm_bv_wrap">

    <!-- ── HERO BIENVENIDA ─────────────────────────────── -->
    <div class="sm_perfil_card">
      <div class="sm_avatar_lg">${avatar}</div>
      <div class="sm_perfil_info">
        <div class="sm_perfil_label">${Saludar()}</div>
        <div class="sm_perfil_nombre">${NombreApellido(u.nombres || '—')}</div>
        <div class="sm_perfil_cargo">${u.cargo || u.cargoOperaciones || '—'}</div>
        <div class="sm_perfil_sede"><i class="fas fa-map-marker-alt"></i> ${u.sede || '—'} · ${u.centroCosto || '—'}</div>
      </div>
      <div class="sm_perfil_date">
        <i class="fas fa-calendar-day"></i>
        <span>${fechaHoy()}</span>
        ${tiempoTexto ? `<span class="sm_time_badge"><i class="fas fa-star"></i> ${tiempoTexto}</span>` : ''}
        ${nivel ? `<span class="sm_nivel_badge" style="--nc:${nivel.color}"><i class="fas ${nivel.ico}"></i> ${nivel.label}</span>` : ''}
      </div>
    </div>

    <!-- ── MOTIVACIÓN MECANOGRAFÍA ────────────────────── -->
    <div class="sm_motivacion_card" id="sm_motivacion">
      <div class="sm_motivacion_ico"><i class="fas ${frase.ico}"></i></div>
      <div class="sm_motivacion_body">
        <div class="sm_motivacion_title">¡Continúa practicando hoy!</div>
        <div class="sm_motivacion_txt" id="sm_frase_txt">${frase.txt}</div>
      </div>
      <div class="sm_motivacion_actions">
        <a href="/milab" class="sm_btn_typing nv_item" data-page="milab">
          <i class="fas fa-keyboard"></i> Practicar ahora
        </a>
        <button class="sm_btn_frase" id="sm_btn_frase" title="Nueva frase">
          <i class="fas fa-arrows-rotate"></i>
        </button>
      </div>
    </div>

    <!-- ── STATS RÁPIDOS ──────────────────────────────── -->
    <div class="sm_stats_row">
      ${[
        { ico: 'fa-keyboard',   label: 'Lecciones',  val: '—',  id: 'sm_stat_lec',   color: 'var(--mco)'    },
        { ico: 'fa-bolt',       label: 'WPM Récord', val: '—',  id: 'sm_stat_wpm',   color: '#fd7e14'       },
        { ico: 'fa-bullseye',   label: 'Precisión',  val: '—',  id: 'sm_stat_prec',  color: '#28a745'       },
        { ico: 'fa-fire',       label: 'Racha días', val: '—',  id: 'sm_stat_racha', color: '#FFD101'       },
      ].map(s => `
        <div class="sm_stat_card">
          <div class="sm_stat_ico" style="color:${s.color}"><i class="fas ${s.ico}"></i></div>
          <div class="sm_stat_val" id="${s.id}">${s.val}</div>
          <div class="sm_stat_lbl">${s.label}</div>
        </div>`).join('')}
    </div>

    <!-- ── BENEFICIOS ─────────────────────────────────── -->
    <div id="sm_bv_beneficio">
      ${getls('wiBeneficiosList') ? _renderBeneficiosGrid(getls('wiBeneficiosList')) : '<div class="sm_loading"><i class="fas fa-spinner fa-spin"></i></div>'}
    </div>

    <!-- ── DATOS PERSONALES ───────────────────────────── -->
    <div class="sm_datos">
      ${[
        ['fa-id-card',     'DNI',        u.dni,        'sm_dni'    ],
        ['fa-envelope',    'Email',      u.email,      'sm_email'  ],
        ['fa-building',    'Empresa',    u.empresa,    'sm_empresa'],
        ['fa-briefcase',   'Tipo Labor', u.TipoLabor,  'sm_labor'  ],
        ['fa-users',       'Grupo',      u.grupo,      'sm_grupo'  ],
        ['fa-sign-in-alt', 'Ingreso',    fechaStr,     'sm_ingreso'],
      ].map(([ic, lb, vl, cls]) => `
        <div class="sm_dato ${cls}">
          <i class="fas ${ic} sm_dato_ico"></i>
          <span class="sm_dato_lbl">${lb}</span>
          <span class="sm_dato_val">${vl || '—'}</span>
        </div>`).join('')}
    </div>

    <!-- ── ACCIONES RÁPIDAS ───────────────────────────── -->
    <div class="sm_acciones">
      <a href="/solicitar" class="sm_accion_card nv_item" data-page="solicitar">
        <div class="sm_accion_ico" style="background:rgba(55,161,221,.12);color:var(--sm_azul)"><i class="fas fa-paper-plane"></i></div>
        <div><div class="sm_accion_title">Solicitar Beneficio</div><div class="sm_accion_sub">Envía tu solicitud fácilmente</div></div>
        <i class="fas fa-chevron-right sm_accion_arr"></i>
      </a>
      <a href="/mensajes" class="sm_accion_card nv_item" data-page="mensajes">
        <div class="sm_accion_ico" style="background:rgba(255,209,1,.15);color:#c9a800"><i class="fas fa-comments"></i></div>
        <div><div class="sm_accion_title">Mis Mensajes</div><div class="sm_accion_sub">Revisa tus notificaciones.</div></div>
        <i class="fas fa-chevron-right sm_accion_arr"></i>
      </a>
    </div>

    <!-- ── ÚLTIMAS SOLICITUDES ────────────────────────── -->
    <div class="sm_form_card" id="sm_ultimas">
      <div class="sm_form_title"><i class="fas fa-clock"></i> Últimas solicitudes</div>
      <div id="sm_ultimas_list">
        ${getls('wiSolicitar') ? _renderSolicitudesHtml(getls('wiSolicitar').slice(0,3)) : '<div class="sm_loading"><i class="fas fa-spinner fa-spin"></i></div>'}
      </div>
    </div>

  </div>`;
};

// ══════════════════════════════════════════════════════════════════════
// ⑥ INIT
// ══════════════════════════════════════════════════════════════════════
export const init = async () => {
  const u = wi();
  if (!u) return;

  $(document).off('.smben .smfrase');

  // Clic en beneficio → abrir solicitar
  $(document).on('click.smben', '.sm_ben_btn', function() {
    savels('wiBenSelected', $(this).data('id'));
    $('.nv_item[data-page="solicitar"]').first().trigger('click');
  });

  // Nueva frase motivacional
  $(document).on('click.smfrase', '#sm_btn_frase', function() {
    const nueva = FRASES[Math.floor(Math.random() * FRASES.length)];
    const $card = $('#sm_motivacion');
    $card.addClass('sm_frase_out');
    setTimeout(() => {
      $('#sm_frase_txt').text(nueva.txt);
      $card.find('.sm_motivacion_ico i').attr('class', `fas ${nueva.ico}`);
      $card.removeClass('sm_frase_out').addClass('sm_frase_in');
      setTimeout(() => $card.removeClass('sm_frase_in'), 350);
    }, 250);
  });

  await Promise.all([_revalidarBeneficio(u), _revalidarSolicitudes(u)]);
};

export const cleanup = () => {
  $(document).off('.smben .smfrase');
};

// ══════════════════════════════════════════════════════════════════════
// ⑦ REVALIDACIONES ASYNC
// ══════════════════════════════════════════════════════════════════════
async function _revalidarBeneficio(u) {
  const $el = $('#sm_bv_beneficio');
  if (!$el.length) return;
  const fechaIngreso = u.fechaIngreso?.seconds ? new Date(u.fechaIngreso.seconds * 1000) : null;
  if (!fechaIngreso) return;

  const mesActual = new Date().getMonth();
  const esCumple  = u.fechaNacimiento?.seconds
    ? new Date(u.fechaNacimiento.seconds * 1000).getMonth() === mesActual
    : false;

  try {
    const meses = calcMeses(fechaIngreso);
    const catalogoDoc = await getDoc(doc(db, 'beneficios', 'catalogo'));
    if (!catalogoDoc.exists()) return;
    const items = (catalogoDoc.data().items || []).filter(b => b.estado === 'activo');
    const hoyStr = new Date().toISOString().split('T')[0];

    let raw = items.filter(b => {
      if (b.fechaDesde && hoyStr < b.fechaDesde) return false;
      if (b.fechaHasta && hoyStr > b.fechaHasta) return false;
      const d = b.disponible;
      if (d === 'todos')   return true;
      if (d === '3meses')  return meses >= 3;
      if (d === '6meses')  return meses >= 6;
      if (d === '12meses') return meses >= 12;
      if (d === 'cumple')  return esCumple;
      return false;
    });

    // Deduplicar días libres por jerarquía
    const PESOS = { '12meses': 12, '6meses': 6, '3meses': 3, 'todos': 0 };
    const libres = [], resto = [];
    raw.forEach(b => {
      const esLibre = b.categoria === 'libre' || (!b.categoria && ['4horas','undia','dosdias'].includes(b.duracion));
      (esLibre && PESOS[b.disponible] !== undefined ? libres : resto).push(b);
    });
    if (libres.length) {
      libres.sort((a, b) => PESOS[b.disponible] - PESOS[a.disponible]);
      resto.unshift(libres[0]);
    }

    const cache = getls('wiBeneficiosList') || [];
    if (JSON.stringify(resto) !== JSON.stringify(cache)) {
      savels('wiBeneficiosList', resto, 24);
      $el.html(_renderBeneficiosGrid(resto));
    } else if (!$el.children().length) {
      $el.html(_renderBeneficiosGrid(resto));
    }
  } catch (e) {
    console.warn('[smile] beneficio:', e);
    const cache = getls('wiBeneficiosList');
    if (cache && !$el.children().length) $el.html(_renderBeneficiosGrid(cache));
  }
}

async function _revalidarSolicitudes(u) {
  const $el = $('#sm_ultimas_list');
  if (!$el.length) return;
  try {
    const snap  = await getDocs(query(
      collection(db, 'solicitudes'),
      where('smile.email', '==', u.email),
      orderBy('historial.histCreada', 'desc'),
      limit(3)
    ));
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const cache = getls('wiSolicitar');
    if (JSON.stringify(items) !== JSON.stringify(cache)) {
      savels('wiSolicitar', items, 0.5);
      $el.html(_renderSolicitudesHtml(items.slice(0, 3)));
    }
  } catch (e) {
    console.error('[smile] solicitudes:', e);
    if (!getls('wiSolicitar'))
      $el.html(`<div class="sm_empty"><i class="fas fa-exclamation-circle"></i><p>No se pudo cargar.</p></div>`);
  }
}