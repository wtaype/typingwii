import './inicio.css';
import $ from 'jquery';
import { app, version, autor, linkme } from '../wii.js';
import { wiVista, year, wiTip, Saludar } from '../widev.js';

// ── DATA ──────────────────────────────────────────────────────
const roles = [
  'SPA Router nativo, sin hash ✅',
  'Animaciones con wiVista 🎬',
  'Auth + Blog + Chat integrados 🔥',
  'Temas dinámicos al instante 🎨',
];

const stats = [
  { valor:17, label:'Componentes',    sufijo:''  },
  { valor:20, label:'Utilidades',     sufijo:'+' },
  { valor:5,  label:'Temas',          sufijo:''  },
  { valor:3,  label:'Apps incluidas', sufijo:''  },
];

const features = [
  { id:'componentes', icon:'fa-cubes',              color:'#FF5C69', nombre:'Componentes',
    desc:'Sistema completo de UI: notificaciones, tooltips, spinner y más',
    items:[
      { icon:'fa-bell',            name:'Notificaciones', desc:'Toasts elegantes con 4 tipos' },
      { icon:'fa-comment-dots',    name:'Tooltips',       desc:'Dinámicos con posición inteligente' },
      { icon:'fa-spinner',         name:'Spinner',        desc:'Loading en botones con estado' },
    ]},
  { id:'utilidades',  icon:'fa-wand-magic-sparkles', color:'#FFB800', nombre:'Utilidades JS',
    desc:'Funciones listas para auth, storage, fechas, IP y más',
    items:[
      { icon:'fa-shield-halved',   name:'Auth Signal',    desc:'Sistema de sesión reactivo v2.0' },
      { icon:'fa-hard-drive',      name:'LocalStorage',   desc:'Cache con expiración automática' },
      { icon:'fa-globe',           name:'Sistema IP',     desc:'Geolocalización del visitante' },
    ]},
  { id:'modales',     icon:'fa-window-restore',       color:'#7000FF', nombre:'Modales',
    desc:'Sistema completo: básico, formulario, confirmación, wizard',
    items:[
      { icon:'fa-circle-check',    name:'Confirmación',   desc:'Flujos de decisión elegantes' },
      { icon:'fa-list-ol',         name:'Wizard',         desc:'Modales por pasos interactivos' },
      { icon:'fa-images',          name:'Galería',        desc:'Visualizador de imágenes modal' },
    ]},
  { id:'guias',       icon:'fa-book-open',             color:'#29C72E', nombre:'Guías',
    desc:'Aprende a instalar, configurar y dominar Widev paso a paso',
    items:[
      { icon:'fa-download',        name:'Instalación',    desc:'3 comandos y listo para producir' },
      { icon:'fa-route',           name:'Rutas SPA',      desc:'Router sin hash, historia nativa' },
      { icon:'fa-rocket',          name:'Deploy',         desc:'Firebase Hosting + Git tags' },
    ]},
  { id:'acerca',      icon:'fa-circle-info',           color:'#0EBEFF', nombre:'Acerca',
    desc:'Stack técnico, filosofía y el historial de versiones del proyecto',
    items:[
      { icon:'fa-layer-group',     name:'Stack',          desc:'Vite, jQuery, Firebase, CSS Vars' },
      { icon:'fa-lightbulb',       name:'Filosofía',      desc:'Ligero, modular, legible y rápido' },
      { icon:'fa-code-branch',     name:'Versiones',      desc:'Historial de cambios desde v6' },
    ]},
];

const beneficios = [
  { icon:'fa-bolt',         titulo:'Ligero y rápido',   desc:'Sin CSS frameworks. Vite + jQuery + CSS variables puro. Bundle mínimo, HMR instantáneo.' },
  { icon:'fa-puzzle-piece', titulo:'Modular al 100%',   desc:'Cada página es un módulo con su propio CSS. Importa solo lo que necesitas, cuando lo necesitas.' },
  { icon:'fa-palette',      titulo:'5 temas dinámicos', desc:'Cielo, Dulce, Paz, Mora y Futuro. Cambia de tema con CSS variables sin recargar ni compilar.' },
];

const ecosistema = [
  { icon:'fa-book-open', color:'#0EBEFF', nombre:'Widev Docs',  desc:'Framework · Componentes · Guías', ruta:'/componentes' },
  { icon:'fa-newspaper', color:'#29C72E', nombre:'Historiawi',  desc:'Blog técnico con Firestore',       ruta:'/blog'        },
  { icon:'fa-comments',  color:'#7000FF', nombre:'Smile',       desc:'Chat en tiempo real + Auth',       ruta:'/smile'       },
];

// Code card (pre-built para evitar escaping en render)
const codeHTML = [
  `<b class="c_imp">import</b> { wiVista, wiAuth,`,
  `  Notificacion } <b class="c_imp">from</b> <b class="c_str">'./widev.js'</b>`,
  ``,
  `<b class="c_cmt">// Animación al scroll</b>`,
  `<b class="c_fn">wiVista</b>(<b class="c_str">'.card'</b>, null, {`,
  `  anim: <b class="c_str">'wi_fadeUp'</b>, stagger: <b class="c_num">120</b>`,
  `})`,
  ``,
  `<b class="c_cmt">// Auth reactivo</b>`,
  `<b class="c_kw">if</b> (wiAuth.<b class="c_prop">logged</b>) {`,
  `  <b class="c_fn">Notificacion</b>(<b class="c_str">'¡Listo! 🚀'</b>,`,
  `    <b class="c_str">'success'</b>)`,
  `}`,
].join('\n');

// ── PLANTILLAS ────────────────────────────────────────────────
const tplStat = s => `
  <div class="ini_stat">
    <div class="ini_stat_n" data-target="${s.valor}" data-sufijo="${s.sufijo}">0</div>
    <div class="ini_stat_l">${s.label}</div>
  </div>`;

const tplEco = e => `
  <a href="${e.ruta}" class="ini_eco_card" style="--ec:${e.color}">
    <div class="ini_eco_ico"><i class="fas ${e.icon}"></i></div>
    <div class="ini_eco_info">
      <strong>${e.nombre}</strong>
      <span>${e.desc}</span>
    </div>
    <i class="fas fa-arrow-right ini_eco_arr"></i>
  </a>`;

const tplFeature = f => `
  <div class="ini_cat_card" style="--cc:${f.color}">
    <div class="ini_cat_bar"></div>
    <div class="ini_cat_top">
      <div class="ini_cat_ico"><i class="fas ${f.icon}"></i></div>
      <div class="ini_cat_info"><h3>${f.nombre}</h3><p>${f.desc}</p></div>
    </div>
    <ul class="ini_cat_tools">
      ${f.items.map(it=>`
        <li><a href="/${f.id}" class="ini_tool_a">
          <i class="fas ${it.icon}"></i>
          <div><strong>${it.name}</strong><span>${it.desc}</span></div>
          <i class="fas fa-arrow-right ini_ext"></i>
        </a></li>`).join('')}
    </ul>
  </div>`;

const tplBeneficio = (b, i) => `
  <div class="ini_about_card" style="--d:${i*.15}s">
    <div class="ini_card_ico"><i class="fas ${b.icon}"></i></div>
    <h3>${b.titulo}</h3>
    <p>${b.desc}</p>
  </div>`;

// ── RENDER ────────────────────────────────────────────────────
export const render = () => `
<div class="ini_wrap">

  <!-- ===== HERO ===== -->
  <section class="ini_hero">
    <div class="ini_hero_content">

      <div class="ini_saludo" style="--d:0s">
        <span>${Saludar()} </span><span class="ini_wave">👋</span>
      </div>

      <h1 class="ini_titulo" style="--d:.18s">
        Tu framework web <span class="ini_grad">minimalista</span>
      </h1>

      <div class="ini_roles" style="--d:.36s">
        ${roles.map((r,i)=>`<span class="ini_role${i===0?' active':''}">${r}</span>`).join('')}
      </div>

      <p class="ini_sub" style="--d:.54s">
        ${app} es un ecosistema completo: utilidades JS + SPA router + temas + auth + blog.
        Todo lo que necesitas para construir apps web rápidas sin frameworks pesados.
      </p>

      <div class="ini_stats" id="in_stats" style="--d:.72s">
        ${stats.map(tplStat).join('')}
      </div>

      <div class="ini_btns" style="--d:.9s">
        <a href="/componentes" class="ini_btn_p"><i class="fas fa-rocket"></i> Ver componentes</a>
        <a href="/guias" class="ini_btn_s"><i class="fas fa-book-open"></i> Guía de inicio</a>
      </div>

    </div>

    <!-- Derecha: code card -->
    <div class="ini_hero_visual">
      <div class="ini_code_card" style="--d:.3s">
        <div class="ini_code_hd">
          <div class="ini_code_dots">
            <span style="background:#FF5F57"></span>
            <span style="background:#FFBD2E"></span>
            <span style="background:#28CA41"></span>
          </div>
          <span class="ini_code_fname"><i class="fas fa-code"></i> widev.js</span>
          <span class="ini_code_live"><i class="fas fa-circle"></i> Activo</span>
        </div>
        <pre class="ini_code_pre">${codeHTML}<span class="ini_cursor"></span></pre>
        <div class="ini_code_footer">
          <span ${wiTip('Vite 7')}><i class="fas fa-bolt"></i> Vite</span>
          <span ${wiTip('Firebase 12')}><i class="fas fa-fire"></i> Firebase</span>
          <span ${wiTip('jQuery 4')}><i class="fab fa-js"></i> jQuery</span>
        </div>
      </div>
      <div class="ini_ftech ini_ft1" style="--d:.5s"  ${wiTip('Componentes')}><i class="fas fa-cubes"></i></div>
      <div class="ini_ftech ini_ft2" style="--d:.65s" ${wiTip('Utilidades')}><i class="fas fa-wand-magic-sparkles"></i></div>
      <div class="ini_ftech ini_ft3" style="--d:.8s"  ${wiTip('Modales')}><i class="fas fa-window-restore"></i></div>
      <div class="ini_ftech ini_ft4" style="--d:.95s" ${wiTip('Temas')}><i class="fas fa-palette"></i></div>
    </div>
  </section>

  <!-- ===== ECOSISTEMA ===== -->
  <section class="ini_eco_sec">
    <div class="ini_eco_label">Ecosistema <span class="ini_grad">incluido</span></div>
    <div class="ini_eco_grid">${ecosistema.map(tplEco).join('')}</div>
  </section>

  <!-- ===== MÓDULOS ===== -->
  <section class="ini_cats_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">Todo lo que <span class="ini_grad">necesitas</span></h2>
      <div class="ini_sec_line"></div>
      <p class="ini_sec_desc">5 secciones documentadas para dominar el framework</p>
    </div>
    <div class="ini_cats_grid">${features.map(tplFeature).join('')}</div>
  </section>

  <!-- ===== ¿POR QUÉ? ===== -->
  <section class="ini_about_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">¿Por qué <span class="ini_grad">${app}?</span></h2>
      <div class="ini_sec_line"></div>
    </div>
    <div class="ini_about_grid">${beneficios.map(tplBeneficio).join('')}</div>
  </section>

  <!-- ===== CTA ===== -->
  <section class="ini_cta_sec">
    <div class="ini_cta_wrap">
      <i class="fas fa-rocket ini_cta_ico"></i>
      <h2>¿Listo para construir con ${app}? 🚀</h2>
      <p>Explora la documentación y domina el framework ✨</p>
      <div class="ini_cta_chips">
        ${features.map(f=>`<a href="/${f.id}" class="ini_chip" style="--cc:${f.color}" ${wiTip(f.desc)}><i class="fas ${f.icon}"></i> ${f.nombre}</a>`).join('')}
      </div>
      <p class="ini_cta_autor">Hecho con ❤️ por <a href="${linkme}" target="_blank" rel="noopener">${autor}</a> © ${year()}</p>
    </div>
  </section>

</div>`;

// ── INIT ──────────────────────────────────────────────────────
let rolesTimer = null;

export const init = () => {

  // Roles rotantes
  let ri = 0;
  const $r = $('.ini_role');
  rolesTimer = setInterval(() => {
    $r.removeClass('active');
    $r.eq(ri = (ri + 1) % $r.length).addClass('active');
  }, 2800);

  // Stats contador — al entrar en viewport
  wiVista('#in_stats', () => {
    $('.ini_stat_n').each(function() {
      const $n = $(this), obj = +$n.data('target'), suf = $n.data('sufijo') || '';
      let v = 0;
      const t = setInterval(() => {
        v += obj / 50;
        if (v >= obj) { $n.text(obj + suf); clearInterval(t); }
        else $n.text(Math.floor(v));
      }, 28);
    });
  });

  // Scroll animations
  wiVista('.ini_cat_card',   null, { anim:'wi_fadeUp', stagger:80  });
  wiVista('.ini_about_card', null, { anim:'wi_fadeUp', stagger:140 });
  wiVista('.ini_cta_wrap',   null, { anim:'wi_fadeUp' });
  wiVista('.ini_sec_head',   null, { anim:'wi_fadeUp' });
  wiVista('.ini_eco_card',   null, { anim:'wi_fadeUp', stagger:100 });

  console.log(`🚀 ${app} ${version} · Inicio OK`);
};

export const cleanup = () => {
  clearInterval(rolesTimer);
  $(document).off('.inicio');
};
