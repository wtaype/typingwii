import './perfil.css';
import $ from 'jquery';
import {
  getls, Saludar, fechaHoy,
  calcularTiempoEmpresa, calcMeses,
  NombreApellido, avatar
} from '../../widev.js';

const wi = () => getls('wiSmile');

// ─── MENSAJES POSITIVOS ALEATORIOS ────────────────────────────────
const MENSAJES = [
  { ico: 'fa-star',          txt: '¡Tu esfuerzo diario marca la diferencia! 🌟' },
  { ico: 'fa-heart',         txt: '¡Gracias por ser parte de este gran equipo! ❤️' },
  { ico: 'fa-rocket',        txt: '¡Cada día eres una versión mejor de ti mismo!' },
  { ico: 'fa-sun',           txt: '¡Tu energía ilumina el ambiente de trabajo! ☀️' },
  { ico: 'fa-trophy',        txt: '¡Los grandes resultados vienen de tu dedicación!' },
  { ico: 'fa-seedling',      txt: '¡Sigues creciendo y eso nos enorgullece!' },
  { ico: 'fa-hands-clapping',txt: '¡Tu compromiso es un ejemplo para todos!' },
  { ico: 'fa-gem',           txt: '¡Eres una pieza clave en nuestra misión!' },
  { ico: 'fa-fire',          txt: '¡Tu pasión por lo que haces se nota siempre!' },
  { ico: 'fa-lightbulb',     txt: '¡Tus ideas y actitud hacen la diferencia cada día!' },
  { ico: 'fa-shield-halved', txt: '¡Tu constancia construye cosas extraordinarias!' },
  { ico: 'fa-leaf',          txt: '¡Seguir adelante con determinación siempre vale la pena!' },
  { ico: 'fa-bolt',          txt: '¡Tu actitud positiva contagia a quienes te rodean!' },
  { ico: 'fa-compass',       txt: '¡Vas por el camino correcto, sigue adelante!' },
  { ico: 'fa-infinity',      txt: '¡Tu potencial no tiene límites. ¡Sigue brillando!' },
];

const msgAleatorio = () => MENSAJES[Math.floor(Math.random() * MENSAJES.length)];

// ─── HELPER: tiempo en empresa visual ─────────────────────────────
const tiempoBadge = (u) => {
  const ts = u.fechaIngreso?.seconds;
  if (!ts) return '';
  const fi = new Date(ts * 1000);
  const meses = calcMeses(fi);
  const texto  = calcularTiempoEmpresa(fi);
  const color  = meses >= 24 ? '#FFD101' : meses >= 12 ? '#37a1dd' : meses >= 6 ? '#28a745' : '#909090';
  return `
    <div class="pf_tiempo_badge" style="--badge-color:${color}">
      <i class="fas fa-calendar-check"></i>
      <span>${texto}</span>
    </div>`;
};

// ─── HELPER: nivel de antigüedad ──────────────────────────────────
const nivelAntiguedad = (u) => {
  const ts = u.fechaIngreso?.seconds;
  if (!ts) return null;
  const meses = calcMeses(new Date(ts * 1000));
  if (meses >= 36) return { label: 'Veterano', color: '#FFD101', ico: 'fa-crown' };
  if (meses >= 24) return { label: 'Experto',  color: '#37a1dd', ico: 'fa-gem' };
  if (meses >= 12) return { label: 'Senior',   color: '#28a745', ico: 'fa-trophy' };
  if (meses >= 6)  return { label: 'Avanzado', color: '#fd7e14', ico: 'fa-fire' };
  return                  { label: 'Nuevo',    color: '#909090', ico: 'fa-seedling' };
};

// ─── RENDER ───────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `
    <div class="pf_wrap">
      <div class="sm_empty">
        <i class="fas fa-user-lock"></i>
        <p>Sin sesión activa.</p>
      </div>
    </div>`;

  const msg    = msgAleatorio();
  const ini    = avatar(u.nombres || 'U S');
  const nivel  = nivelAntiguedad(u);
  const tiempo = tiempoBadge(u);

  const fechaStr = u.fechaIngreso?.seconds
    ? new Date(u.fechaIngreso.seconds * 1000)
        .toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  const campos = [
    { ico: 'fa-id-card',       lbl: 'DNI / Documento',  val: u.dni },
    { ico: 'fa-envelope',      lbl: 'Correo',            val: u.email },
    { ico: 'fa-building',      lbl: 'Empresa',           val: u.empresa },
    { ico: 'fa-briefcase',     lbl: 'Cargo',             val: u.cargo || u.cargoOperaciones },
    { ico: 'fa-diagram-project',lbl: 'Tipo de Labor',   val: u.TipoLabor },
    { ico: 'fa-users',         lbl: 'Grupo / Área',      val: u.grupo },
    { ico: 'fa-map-marker-alt',lbl: 'Sede',              val: u.sede },
    { ico: 'fa-tags',          lbl: 'Centro de Costo',   val: u.centroCosto },
    { ico: 'fa-sign-in-alt',   lbl: 'Fecha de Ingreso',  val: fechaStr },
    { ico: 'fa-user-tag',      lbl: 'Usuario',           val: u.usuario },
  ].filter(c => c.val && c.val !== '—');

  return `
  <div class="pf_wrap">

    <!-- ── HERO ───────────────────────────────── -->
    <div class="pf_hero">
      <div class="pf_hero_bg"></div>

      <div class="pf_hero_left">
        <div class="pf_avatar_ring">
          <div class="pf_avatar">${ini}</div>
          ${nivel ? `<div class="pf_nivel_dot" style="background:${nivel.color}" title="${nivel.label}"><i class="fas ${nivel.ico}"></i></div>` : ''}
        </div>
        <div class="pf_hero_info">
          <div class="pf_saludo">${Saludar()}</div>
          <div class="pf_nombre">${NombreApellido(u.nombres || '—')}</div>
          <div class="pf_cargo">${u.cargo || u.cargoOperaciones || '—'}</div>
          <div class="pf_sede">
            <i class="fas fa-location-dot"></i>
            ${u.sede || '—'}
            ${u.centroCosto ? `· <span>${u.centroCosto}</span>` : ''}
          </div>
          ${nivel ? `<div class="pf_nivel_badge" style="--nc:${nivel.color}"><i class="fas ${nivel.ico}"></i> ${nivel.label}</div>` : ''}
        </div>
      </div>

      <div class="pf_hero_right">
        <div class="pf_fecha_hoy">
          <i class="fas fa-calendar-day"></i>
          <span>${fechaHoy()}</span>
        </div>
        ${tiempo}
      </div>
    </div>

    <!-- ── DATOS DEL PERFIL ────────────────────── -->
    <div class="pf_section_title">
      <div class="pf_section_ico"><i class="fas fa-user"></i></div>
      <span>Información de perfil</span>
      <div class="pf_readonly_badge"><i class="fas fa-lock"></i> Solo lectura</div>
    </div>

    <div class="pf_datos_grid">
      ${campos.map(c => `
        <div class="pf_dato_card">
          <div class="pf_dato_ico"><i class="fas ${c.ico}"></i></div>
          <div class="pf_dato_body">
            <div class="pf_dato_lbl">${c.lbl}</div>
            <div class="pf_dato_val">${c.val}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- ── MENSAJE POSITIVO ────────────────────── -->
    <div class="pf_mensaje">
      <div class="pf_mensaje_ico"><i class="fas ${msg.ico}"></i></div>
      <div class="pf_mensaje_txt">${msg.txt}</div>
      <button class="pf_refresh_msg" id="pf_refresh_msg" title="Otro mensaje">
        <i class="fas fa-arrows-rotate"></i>
      </button>
    </div>
    
    </div>

  </div>`;
};

// ─── INIT ─────────────────────────────────────────────────────────
export const init = () => {
  // Botón "nuevo mensaje"
  $(document).off('click.pfmsg').on('click.pfmsg', '#pf_refresh_msg', function() {
    const msg = msgAleatorio();
    const $btn = $(this);
    $btn.addClass('spinning');
    const $wrap = $btn.closest('.pf_mensaje');
    $wrap.addClass('pf_fade_out');
    setTimeout(() => {
      $wrap.find('.pf_mensaje_ico i').attr('class', `fas ${msg.ico}`);
      $wrap.find('.pf_mensaje_txt').text(msg.txt);
      $wrap.removeClass('pf_fade_out').addClass('pf_fade_in');
      $btn.removeClass('spinning');
      setTimeout(() => $wrap.removeClass('pf_fade_in'), 400);
    }, 300);
  });
};

export const cleanup = () => {
  $(document).off('click.pfmsg');
};
