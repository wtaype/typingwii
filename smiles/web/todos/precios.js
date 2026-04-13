import './precios.css';
import $ from 'jquery';
import { wiVista, wiTip } from '../../widev.js';
import { app } from '../../wii.js';

// ── PLANES ────────────────────────────────────────────────────────
const PLANES = [
  {
    id:        'free',
    ico:       'fa-seedling',
    lbl:       'Gratis',
    precio:    '$0',
    periodo:   'para siempre',
    desc:      'Perfecto para estudiantes que quieren aprender mecanografía sin ningún compromiso.',
    color:     '#28a745',
    highlight: false,
    cta_txt:   'Empezar gratis',
    cta_ico:   'fa-rocket',
    cta_href:  '/registrar',
    cta_page:  'registrar',
    items: [
      { ok: true,  txt: '12 lecciones completas'         },
      { ok: true,  txt: 'Test de mecanografía libre'      },
      { ok: true,  txt: 'Estadísticas básicas (WPM, %)'  },
      { ok: true,  txt: 'Certificado digital por nivel'  },
      { ok: true,  txt: '6 temas de color'               },
      { ok: true,  txt: 'Acceso desde cualquier dispositivo' },
      { ok: false, txt: 'Panel de gestor'                },
      { ok: false, txt: 'Soporte prioritario'            },
      { ok: false, txt: 'Historial avanzado (90 días)'   },
      { ok: false, txt: 'Módulo de mensajes'             },
    ],
  },
  {
    id:        'pro',
    ico:       'fa-bolt',
    lbl:       'Pro',
    precio:    '$9',
    periodo:   'por mes',
    desc:      'Para estudiantes y profesores que quieren sacar el máximo provecho de la plataforma.',
    color:     '#0EBEFF',
    highlight: true,
    badge:     'Más popular',
    cta_txt:   'Obtener Pro',
    cta_ico:   'fa-star',
    cta_href:  '/registrar',
    cta_page:  'registrar',
    items: [
      { ok: true,  txt: 'Todo lo del plan Gratis'         },
      { ok: true,  txt: 'Panel de gestor de estudiantes'  },
      { ok: true,  txt: 'Historial avanzado de 90 días'   },
      { ok: true,  txt: 'Módulo de mensajes con alumnos'  },
      { ok: true,  txt: 'Reportes de progreso en PDF'     },
      { ok: true,  txt: 'Soporte por correo (24h)'        },
      { ok: true,  txt: 'Hasta 30 estudiantes por cuenta' },
      { ok: true,  txt: 'Lecciones personalizadas'        },
      { ok: true,  txt: 'Certificado con logo propio'     },
      { ok: false, txt: 'API empresarial'                 },
    ],
  },
  {
    id:        'enterprise',
    ico:       'fa-building',
    lbl:       'Empresas',
    precio:    'A medida',
    periodo:   'contactar',
    desc:      'Para instituciones educativas, empresas y organizaciones con necesidades a escala.',
    color:     '#7000FF',
    highlight: false,
    cta_txt:   'Contactar ahora',
    cta_ico:   'fa-envelope',
    cta_href:  '/contacto',
    cta_page:  'contacto',
    items: [
      { ok: true, txt: 'Todo lo del plan Pro'             },
      { ok: true, txt: 'Usuarios y estudiantes ilimitados'},
      { ok: true, txt: 'API de integración empresarial'  },
      { ok: true, txt: 'SSO / Active Directory'          },
      { ok: true, txt: 'Panel corporativo multigrupo'    },
      { ok: true, txt: 'SLA garantizado'                 },
      { ok: true, txt: 'Gerente de cuenta dedicado'      },
      { ok: true, txt: 'Capacitación inicial incluida'   },
      { ok: true, txt: 'Reportes ejecutivos avanzados'   },
      { ok: true, txt: 'Soporte prioritario 24/7'        },
    ],
  },
];

// ── FAQ ───────────────────────────────────────────────────────────
const FAQ = [
  { q: '¿El plan gratis tiene algún límite de tiempo?',       a: 'No. El plan Gratis es para siempre. Puedes acceder a las 12 lecciones, el test de mecanografía y los certificados sin límite de tiempo ni tarjeta de crédito.' },
  { q: '¿Puedo cambiar de plan en cualquier momento?',        a: 'Sí. Puedes pasar al plan Pro cuando quieras y volver al plan Gratis si lo deseas. No hay penalidades ni contratos mínimos.' },
  { q: '¿El plan Pro es por alumno o por cuenta?',            a: 'El plan Pro es por cuenta de instructor. Con $9/mes puedes gestionar hasta 30 estudiantes desde un solo panel.' },
  { q: '¿Qué métodos de pago aceptan?',                      a: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, Amex) y PayPal. Para el plan Empresas también aceptamos transferencia bancaria.' },
  { q: '¿Cómo funciona el plan Empresas?',                   a: 'Contáctanos y te preparamos una propuesta personalizada según el número de usuarios, integraciones requeridas y SLA que necesites.' },
];

// ── RENDER ────────────────────────────────────────────────────────
export const render = () => `
<div class="prc_page">

  <!-- ══ HERO ══ -->
  <div class="prc_hero">
    <div class="prc_hero_bg">
      <div class="prc_orb prc_orb1"></div>
      <div class="prc_orb prc_orb2"></div>
    </div>
    <div class="prc_hero_body">
      <div class="prc_badge"><i class="fas fa-tags"></i> Planes y precios</div>
      <h1 class="prc_h1">
        Elige el plan que<br>
        <span class="prc_grad">mejor te funciona</span>
      </h1>
      <p class="prc_sub">
        Comienza gratis. Actualiza cuando lo necesites.
        Sin contratos, sin sorpresas. <strong>Cancela cuando quieras.</strong>
      </p>
      <!-- Toggle mensual/anual (visual decorativo) -->
      <div class="prc_toggle_wrap">
        <span class="prc_tog_lbl prc_tog_act">Mensual</span>
        <div class="prc_toggle" id="prc_toggle">
          <div class="prc_tog_ball" id="prc_tog_ball"></div>
        </div>
        <span class="prc_tog_lbl" id="prc_tog_anual">
          Anual <span class="prc_save_badge">Ahorra 20%</span>
        </span>
      </div>
    </div>
  </div>

  <!-- ══ PLANES GRID ══ -->
  <div class="prc_planes_grid">
    ${PLANES.map((p, i) => `
      <div class="prc_plan wi_fadeUp ${p.highlight ? 'prc_plan_hl' : ''}"
        style="--pc:${p.color};--d:${i * .13}s">

        <!-- Popular badge -->
        ${p.badge ? `<div class="prc_popular_badge">${p.badge}</div>` : ''}

        <!-- Header -->
        <div class="prc_plan_hdr">
          <div class="prc_plan_ico"><i class="fas ${p.ico}"></i></div>
          <div class="prc_plan_lbl">${p.lbl}</div>
        </div>

        <!-- Precio -->
        <div class="prc_precio_wrap">
          <div class="prc_precio" id="prc_precio_${p.id}">${p.precio}</div>
          <div class="prc_periodo">${p.periodo}</div>
        </div>
        <p class="prc_plan_desc">${p.desc}</p>

        <!-- CTA -->
        <a href="${p.cta_href}" class="prc_cta_btn nv_item" data-page="${p.cta_page}"
          ${p.highlight ? '' : 'style="background:var(--bg4);color:var(--tx1);border:2px solid var(--brd)"'}>
          <i class="fas ${p.cta_ico}"></i> ${p.cta_txt}
        </a>

        <!-- Features -->
        <div class="prc_divider"></div>
        <ul class="prc_features">
          ${p.items.map(it => `
            <li class="prc_feat_item ${it.ok ? '' : 'prc_feat_off'}">
              <i class="fas ${it.ok ? 'fa-check' : 'fa-minus'}"></i>
              <span>${it.txt}</span>
            </li>`).join('')}
        </ul>
      </div>`).join('')}
  </div>

  <!-- ══ GARANTÍA ══ -->
  <div class="prc_garantia_strip wi_fadeUp">
    <div class="prc_garantia_item">
      <i class="fas fa-shield-halved"></i>
      <div><strong>Sin riesgos</strong><span>Cancela cuando quieras</span></div>
    </div>
    <div class="prc_garantia_sep"></div>
    <div class="prc_garantia_item">
      <i class="fas fa-credit-card"></i>
      <div><strong>Sin tarjeta</strong><span>El plan gratis no requiere datos de pago</span></div>
    </div>
    <div class="prc_garantia_sep"></div>
    <div class="prc_garantia_item">
      <i class="fas fa-lock"></i>
      <div><strong>Datos seguros</strong><span>SSL · Pagos encriptados</span></div>
    </div>
    <div class="prc_garantia_sep"></div>
    <div class="prc_garantia_item">
      <i class="fas fa-headset"></i>
      <div><strong>Soporte real</strong><span>Respondemos en menos de 24 horas</span></div>
    </div>
  </div>

  <!-- ══ COMPARACIÓN (tabla) ══ -->
  <div class="prc_compare_sec wi_fadeUp">
    <div class="prc_sec_head">
      <div class="prc_sec_badge"><i class="fas fa-table"></i> Comparación detallada</div>
      <h2 class="prc_sec_h2">¿Qué incluye <span class="prc_grad">cada plan?</span></h2>
    </div>
    <div class="prc_table_wrap">
      <table class="prc_table">
        <thead>
          <tr>
            <th class="prc_th_feat">Característica</th>
            <th style="--thc:#28a745"><i class="fas fa-seedling"></i> Gratis</th>
            <th class="prc_th_hl" style="--thc:#0EBEFF"><i class="fas fa-bolt"></i> Pro</th>
            <th style="--thc:#7000FF"><i class="fas fa-building"></i> Empresas</th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['Lecciones completas',       '✅','✅','✅'],
            ['Test de mecanografía',      '✅','✅','✅'],
            ['Certificados digitales',    '✅','✅','✅'],
            ['Estadísticas WPM / %',      '✅','✅','✅'],
            ['Historial de resultados',   '7 días','90 días','Ilimitado'],
            ['Estudiantes por cuenta',    '—','30','Ilimitado'],
            ['Panel de gestor',           '❌','✅','✅'],
            ['Mensajes con alumnos',      '❌','✅','✅'],
            ['Reportes PDF',              '❌','✅','✅'],
            ['Soporte',                   '—','Email 24h','Prioritario 24/7'],
            ['Certificado con logo propio','❌','✅','✅'],
            ['API empresarial',           '❌','❌','✅'],
            ['SLA garantizado',           '❌','❌','✅'],
          ].map((row, i) => `
            <tr class="${i % 2 === 0 ? 'prc_tr_even' : ''}">
              <td class="prc_td_feat">${row[0]}</td>
              <td class="prc_td">${row[1]}</td>
              <td class="prc_td prc_td_hl">${row[2]}</td>
              <td class="prc_td">${row[3]}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- ══ FAQ ══ -->
  <div class="prc_faq_sec">
    <div class="prc_sec_head wi_fadeUp">
      <div class="prc_sec_badge"><i class="fas fa-circle-question"></i> Preguntas frecuentes</div>
      <h2 class="prc_sec_h2">Todo lo que debes <span class="prc_grad">saber</span></h2>
    </div>
    <div class="prc_faq_list">
      ${FAQ.map((f, i) => `
        <div class="prc_faq_item wi_fadeUp" style="--d:${i * .07}s" data-faq="${i}">
          <div class="prc_faq_q">
            <span>${f.q}</span>
            <i class="fas fa-chevron-down prc_faq_arr"></i>
          </div>
          <div class="prc_faq_a">${f.a}</div>
        </div>`).join('')}
    </div>
  </div>

  <!-- ══ CTA FINAL ══ -->
  <div class="prc_cta_final wi_fadeUp">
    <div class="prc_cta_card">
      <div class="prc_cta_orb"></div>
      <div class="prc_cta_inner">
        <div class="prc_cta_ico"><i class="fas fa-rocket"></i></div>
        <div class="prc_cta_txt">
          <h2>¿Sigues con dudas? Hablemos.</h2>
          <p>Contáctanos y te ayudamos a elegir el plan ideal para ti o tu institución. Sin presión.</p>
        </div>
        <div class="prc_cta_btns">
          <a href="/registrar" class="prc_btn_pri nv_item" data-page="registrar">
            <i class="fas fa-rocket"></i> Empezar gratis
          </a>
          <a href="/contacto" class="prc_btn_gho nv_item" data-page="contacto">
            <i class="fas fa-envelope"></i> Contactar
          </a>
        </div>
      </div>
    </div>
  </div>

</div>`;

// ── INIT / CLEANUP ────────────────────────────────────────────────
let _obs = [], _anual = false;

export const init = () => {
  _obs = [
    wiVista('.prc_plan',     null, { anim: 'wi_fadeUp', stagger: 130 }),
    wiVista('.prc_faq_item', null, { anim: 'wi_fadeUp', stagger: 70  }),
    wiVista('.wi_fadeUp',    null, { anim: 'wi_fadeUp' }),
  ];

  $(document).off('.prc');

  // Toggle mensual/anual
  $(document).on('click.prc', '#prc_toggle, .prc_tog_lbl', () => {
    _anual = !_anual;
    $('#prc_tog_ball').toggleClass('prc_tog_on', _anual);
    $('#prc_tog_anual').toggleClass('prc_tog_act', _anual);
    $('.prc_tog_lbl').first().toggleClass('prc_tog_act', !_anual);

    // Actualizar precio Pro
    const precioProEl = $('#prc_precio_pro');
    precioProEl
      .addClass('prc_precio_flip')
      .text(_anual ? '$7.20' : '$9')
      .one('animationend', () => precioProEl.removeClass('prc_precio_flip'));
  });

  // FAQ accordion
  $(document).on('click.prc', '.prc_faq_item', function () {
    const $faq  = $(this);
    const abierto = $faq.hasClass('prc_faq_open');
    $('.prc_faq_item').removeClass('prc_faq_open');
    if (!abierto) $faq.addClass('prc_faq_open');
  });

  console.log(`💳 ${app} — Precios listo`);
};

export const cleanup = () => {
  _obs.forEach(o => o?.disconnect?.());
  _obs = [];
  $(document).off('.prc');
};
