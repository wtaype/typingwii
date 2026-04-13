import './empresas.css';
import $ from 'jquery';
import { wiVista, wiTip } from '../../widev.js';
import { app } from '../../wii.js';

// ── DATOS ──────────────────────────────────────────────────────────
const ROI_STATS = [
  { n: '40%', l: 'Aumento de productividad',  ico: 'fa-arrow-trend-up', c: '#28a745' },
  { n: '2×',  l: 'Mayor velocidad de respuesta', ico: 'fa-bolt',       c: '#0EBEFF' },
  { n: '60%', l: 'Reducción de errores',       ico: 'fa-shield-halved', c: '#7000FF' },
  { n: '90',  l: 'WPM alcanzable en 90 días',  ico: 'fa-stopwatch',    c: '#fd7e14' },
];

const FEATURES_EMP = [
  { ico: 'fa-building-columns', c: '#0EBEFF', t: 'Panel corporativo',         d: 'Administra todos los empleados de tu empresa desde un único panel. Visualiza métricas globales y por departamento.' },
  { ico: 'fa-file-chart-column',c: '#28a745', t: 'Reportes ejecutivos',        d: 'Exporta reportes de rendimiento en PDF. Justifica la inversión en capacitación con datos concretos de WPM y precisión.' },
  { ico: 'fa-users-gear',       c: '#fd7e14', t: 'Gestión de equipos',         d: 'Organiza a tus empleados por departamento o equipo. Asigna planes de capacitación diferenciados según el área.' },
  { ico: 'fa-certificate',      c: '#7000FF', t: 'Certificaciones corporativas',d: 'Cada empleado recibe su certificado al completar el plan. Válido para registros de RRHH y auditorías internas.' },
  { ico: 'fa-headset',          c: '#FF5C69', t: 'Soporte dedicado',           d: 'Canal de atención prioritario para empresas. Respuesta en menos de 24 horas para cualquier consulta o incidencia.' },
  { ico: 'fa-lock',             c: '#FFD101', t: 'Datos privados',             d: 'Los datos de tu equipo no se comparten con terceros. Cumplimos con estándares de privacidad y seguridad empresarial.' },
];

const SECTORES = [
  { ico: 'fa-hospital',       lbl: 'Salud'         },
  { ico: 'fa-scale-balanced', lbl: 'Legal'         },
  { ico: 'fa-landmark',       lbl: 'Gobierno'      },
  { ico: 'fa-graduation-cap', lbl: 'Educación'     },
  { ico: 'fa-chart-line',     lbl: 'Finanzas'      },
  { ico: 'fa-code',           lbl: 'Tecnología'    },
  { ico: 'fa-truck',          lbl: 'Logística'     },
  { ico: 'fa-headset',        lbl: 'Call Center'   },
];

const PLANES = [
  {
    id: 'starter', lbl: 'Starter', precio: 'Gratis',
    desc: 'Para equipos pequeños',
    items: ['Hasta 10 usuarios','Lecciones estándar','Reportes básicos','Soporte por correo'],
    highlight: false,
  },
  {
    id: 'pro', lbl: 'Pro', precio: 'Consultar',
    desc: 'Para empresas medianas',
    items: ['Usuarios ilimitados','Plan personalizable','Reportes avanzados PDF','Soporte prioritario','Panel corporativo','Certificados con logo'],
    highlight: true,
  },
  {
    id: 'enterprise', lbl: 'Enterprise', precio: 'A medida',
    desc: 'Para grandes organizaciones',
    items: ['Todo lo de Pro','API de integración','SSO / Active Directory','SLA garantizado','Gerente de cuenta dedicado'],
    highlight: false,
  },
];

// ── RENDER ─────────────────────────────────────────────────────────
export const render = () => `
<div class="pu_page emp_page">

  <!-- ══ HERO ══ -->
  <section class="pu_hero emp_hero">
    <div class="pu_hero_bg">
      <div class="pu_orb pu_orb1" style="background:color-mix(in srgb,#7000FF 9%,transparent)"></div>
      <div class="pu_orb pu_orb2" style="background:color-mix(in srgb,#fd7e14 8%,transparent)"></div>
    </div>
    <div class="pu_hero_inner">
      <div class="pu_hero_left">
        <div class="pu_badge" style="color:#7000FF;border-color:color-mix(in srgb,#7000FF 30%,transparent)">
          <i class="fas fa-building"></i> Para empresas y organizaciones
        </div>
        <h1 class="pu_h1">
          Multiplica la productividad<br>
          <span class="pu_grad" style="background:linear-gradient(135deg,#7000FF,#fd7e14);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">de tu equipo</span>
        </h1>
        <p class="pu_sub">
          Un empleado que escribe a 30 WPM tarda el doble que uno a 60 WPM.
          Con ${app} capacitas a todo tu equipo en mecanografía de forma
          <strong>estructurada, medible y con certificación incluida.</strong>
        </p>
        <div class="pu_hero_cta">
          <a href="/contacto" class="pu_btn_main nv_item" data-page="contacto"
            style="background:#7000FF;box-shadow:0 6px 20px rgba(112,0,255,.3)">
            <i class="fas fa-handshake"></i> Agenda una demo
          </a>
          <a href="/contacto" class="pu_btn_gho nv_item" data-page="contacto">
            <i class="fas fa-envelope"></i> Solicitar cotización
          </a>
        </div>
      </div>
      <div class="pu_hero_right">
        <!-- ROI Stats card -->
        <div class="emp_roi_card">
          <div class="emp_roi_hdr">
            <i class="fas fa-chart-pie" style="color:#7000FF"></i>
            <span>ROI de la capacitación</span>
          </div>
          <div class="emp_roi_grid">
            ${ROI_STATS.map(s => `
              <div class="emp_roi_stat" style="--rc:${s.c}">
                <div class="emp_roi_ico"><i class="fas ${s.ico}"></i></div>
                <div class="emp_roi_n">${s.n}</div>
                <div class="emp_roi_l">${s.l}</div>
              </div>`).join('')}
          </div>
          <div class="emp_roi_note">
            <i class="fas fa-info-circle" style="color:#7000FF"></i>
            Resultados promedio en empresas con programa de 90 días
          </div>
        </div>
        <!-- Sectores floating -->
        <div class="emp_sectores_wrap">
          <div class="emp_sec_label">Sectores que nos usan:</div>
          <div class="emp_sec_grid">
            ${SECTORES.map(s => `
              <div class="emp_sector_item" ${wiTip(s.lbl)}>
                <i class="fas ${s.ico}"></i>
                <span>${s.lbl}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ FEATURES ══ -->
  <section class="pu_sec">
    <div class="pu_sec_head wi_fadeUp">
      <div class="pu_sec_badge" style="color:#7000FF"><i class="fas fa-cubes"></i> Funcionalidades empresariales</div>
      <h2 class="pu_sec_h2">Herramientas <span class="pu_grad" style="background:linear-gradient(135deg,#7000FF,#fd7e14);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">para RRHH y managers</span></h2>
      <p class="pu_sec_sub">Diseñado para gestionar programas de capacitación a escala dentro de tu organización</p>
    </div>
    <div class="pu_grid_3">
      ${FEATURES_EMP.map((f, i) => `
        <div class="pu_bene_card wi_fadeUp" style="--bc:${f.c};--d:${i*.08}s">
          <div class="pu_bene_ico"><i class="fas ${f.ico}"></i></div>
          <h3 class="pu_bene_t">${f.t}</h3>
          <p class="pu_bene_d">${f.d}</p>
        </div>`).join('')}
    </div>
  </section>

  <!-- ══ PLANES ══ -->
  <section class="pu_sec pu_sec_alt">
    <div class="pu_sec_head wi_fadeUp">
      <div class="pu_sec_badge"><i class="fas fa-tags"></i> Planes</div>
      <h2 class="pu_sec_h2">Elige el <span class="pu_grad" style="background:linear-gradient(135deg,#7000FF,#fd7e14);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">plan ideal</span></h2>
      <p class="pu_sec_sub">Escala cuando lo necesites. Siempre con soporte incluido.</p>
    </div>
    <div class="emp_planes_grid">
      ${PLANES.map((p, i) => `
        <div class="emp_plan_card wi_fadeUp ${p.highlight ? 'emp_plan_hl' : ''}" style="--d:${i*.12}s">
          ${p.highlight ? '<div class="emp_plan_popular">⭐ Más popular</div>' : ''}
          <div class="emp_plan_lbl">${p.lbl}</div>
          <div class="emp_plan_precio">${p.precio}</div>
          <div class="emp_plan_desc">${p.desc}</div>
          <ul class="emp_plan_items">
            ${p.items.map(item => `<li><i class="fas fa-check" style="color:var(--success)"></i> ${item}</li>`).join('')}
          </ul>
          <a href="/contacto" class="emp_plan_btn ${p.highlight ? 'emp_plan_btn_hl' : ''} nv_item" data-page="contacto">
            <i class="fas fa-envelope"></i> Contactar
          </a>
        </div>`).join('')}
    </div>
  </section>

  <!-- ══ CTA ══ -->
  <section class="pu_cta_sec wi_fadeUp">
    <div class="pu_cta_card" style="--cta_c:#7000FF;background:linear-gradient(135deg,#7000FF,#4a00b0)">
      <div class="pu_cta_orb"></div>
      <div class="pu_cta_inner">
        <div class="pu_cta_txt">
          <div class="pu_cta_ico"><i class="fas fa-building"></i></div>
          <h2>¿Tu empresa lista para mecanografía de alto rendimiento?</h2>
          <p>Contáctanos y agendamos una demo personalizada sin compromiso. 🚀</p>
        </div>
        <div class="pu_cta_btns">
          <a href="/contacto" class="pu_btn_main pu_btn_white nv_item" data-page="contacto">
            <i class="fas fa-calendar-check"></i> Agendar demo
          </a>
          <a href="/contacto" class="pu_btn_gho pu_btn_white_o nv_item" data-page="contacto">
            <i class="fas fa-file-invoice"></i> Pedir cotización
          </a>
        </div>
      </div>
    </div>
  </section>

</div>`;

let _obs = [];
export const init = () => {
  _obs = [
    wiVista('.pu_bene_card', null, { anim: 'wi_fadeUp', stagger: 80  }),
    wiVista('.emp_plan_card',null, { anim: 'wi_fadeUp', stagger: 120 }),
    wiVista('.wi_fadeUp',    null, { anim: 'wi_fadeUp' }),
  ];
  console.log(`🏢 ${app} — Empresas listo`);
};
export const cleanup = () => { _obs.forEach(o => o?.disconnect?.()); _obs = []; };
