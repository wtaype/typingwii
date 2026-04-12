import './acerca.css';
import $ from 'jquery';
import { wiVista, wicopy } from '../widev.js';
import { app, version, autor, linkme, lanzamiento } from '../wii.js';

// ── DATA ──────────────────────────────────────────────────────
const secciones = [
  { id:'intro',     icon:'fa-rocket',              color:'#0EBEFF', nombre:'¿Qué es Widev?' },
  { id:'stack',     icon:'fa-layer-group',          color:'#FFB800', nombre:'Stack Técnico'  },
  { id:'filosofia', icon:'fa-lightbulb',            color:'#29C72E', nombre:'Filosofía'      },
  { id:'version',   icon:'fa-code-branch',          color:'#7000FF', nombre:'Versiones'      },
  { id:'contacto',  icon:'fa-satellite-dish',       color:'#FF5C69', nombre:'Contacto'       },
];

const stack = [
  { icon:'fa-bolt',         color:'#FFB800', nombre:'Vite',       ver:'6.x',    desc:'Build tool ultrarrápido con HMR instantáneo y bundling optimizado para producción.' },
  { icon:'fa-database',     color:'#FF5C69', nombre:'jQuery',     ver:'3.x',    desc:'Manipulación DOM expresiva y elegante. Base del sistema de eventos y las utilidades.' },
  { icon:'fa-fire',         color:'#ff6d00', nombre:'Firebase',   ver:'11.x',   desc:'Auth, Firestore y Hosting. Backend completo sin servidor propio.' },
  { icon:'fa-palette',      color:'#0EBEFF', nombre:'CSS Vars',   ver:'nativo', desc:'5 temas de color con variables CSS. Sin frameworks, puro estándar web.' },
  { icon:'fa-code',         color:'#29C72E', nombre:'Prism.js',   ver:'1.x',    desc:'Syntax highlighting para los bloques de código en toda la documentación.' },
  { icon:'fa-star',         color:'#7000FF', nombre:'FontAwesome',ver:'7.x',    desc:'Iconografía completa con más de 2000 iconos sólidos y de marcas.' },
];

const principios = [
  { icon:'fa-feather',       color:'#0EBEFF', titulo:'Ligero',       desc:'Sin CSS frameworks ni librerías pesadas. Solo lo necesario para cada proyecto.' },
  { icon:'fa-puzzle-piece',  color:'#FFB800', titulo:'Modular',      desc:'Cada utilidad funciona de forma independiente. Importa solo lo que uses.' },
  { icon:'fa-eye',           color:'#29C72E', titulo:'Legible',      desc:'Código expresivo y documentado. Fácil de entender, mantener y extender.' },
  { icon:'fa-bolt',          color:'#FF5C69', titulo:'Performante',  desc:'Lazy loading, cache inteligente y animaciones por GPU para máxima fluidez.' },
  { icon:'fa-shield-halved', color:'#7000FF', titulo:'Seguro',       desc:'Auth con expiración, variables de entorno y prácticas Firebase recomendadas.' },
  { icon:'fa-heart',         color:'#00D4FF', titulo:'Con propósito',desc:'Creado para proyectos reales con amor al detalle y el diseño consciente.' },
];

const changelog = [
  { ver:'v9',  fecha:'Mar 2026', hito:true,  items:['FontAwesome 7.x integrado','wiCode con copy + highlight','Página Acerca completa','Optimizaciones de rendimiento'] },
  { ver:'v8',  fecha:'Ene 2026', hito:false, items:['Sistema de modales v10.4','wiTip con posición inteligente','Página de Guías completa'] },
  { ver:'v7',  fecha:'Nov 2025', hito:false, items:['wiAuth Signal v2.0','wiDate v12 con Firebase Timestamps','wiVista con stagger y threshold'] },
  { ver:'v6',  fecha:'Sep 2025', hito:false, items:['wiSmart v14 lazy loading','Sistema de temas 5 colores','Router SPA WiRutas sin hash'] },
];

// ── PLANTILLAS ────────────────────────────────────────────────
const tplSidebar = s => `
  <a href="#ac_${s.id}" class="ac_side_item" data-cat="${s.id}" style="--cc:${s.color}">
    <i class="fas ${s.icon}"></i>
    <span>${s.nombre}</span>
  </a>`;

const tplStack = s => `
  <div class="ac_stack_card" style="--sc:${s.color}">
    <div class="ac_stack_ico"><i class="fas ${s.icon}"></i></div>
    <div class="ac_stack_info">
      <div class="ac_stack_top">
        <strong>${s.nombre}</strong>
        <span class="ac_stack_ver">${s.ver}</span>
      </div>
      <p>${s.desc}</p>
    </div>
  </div>`;

const tplPrincipio = p => `
  <div class="ac_prin_card" style="--pc:${p.color}">
    <div class="ac_prin_ico"><i class="fas ${p.icon}"></i></div>
    <strong>${p.titulo}</strong>
    <p>${p.desc}</p>
  </div>`;

const tplVersion = v => `
  <div class="ac_ver_item ${v.hito ? 'ac_ver_hito' : ''}">
    <div class="ac_ver_dot"></div>
    <div class="ac_ver_body">
      <div class="ac_ver_head">
        <span class="ac_ver_tag">${v.ver}</span>
        <span class="ac_ver_fecha">${v.fecha}</span>
        ${v.hito ? '<span class="ac_ver_badge"><i class="fas fa-star"></i> Actual</span>' : ''}
      </div>
      <ul class="ac_ver_list">
        ${v.items.map(i => `<li><i class="fas fa-circle-check"></i> ${i}</li>`).join('')}
      </ul>
    </div>
  </div>`;

// ── RENDER ────────────────────────────────────────────────────
export const render = () => `
<div class="ac_wrap">

  <header class="ac_header">
    <div>
      <span class="ac_tag"><i class="fas fa-circle-info"></i> Acerca de</span>
      <h1 class="ac_title"><span class="ac_grad">${app}</span> — el framework</h1>
      <p class="ac_sub">Ecosistema de utilidades JS + sistema de temas + SPA router. Todo lo que necesitas para construir apps web rápidas y hermosas.</p>
    </div>
    <div class="ac_header_stats">
      <div class="ac_hstat"><span class="ac_hstat_n">${version}</span><span>Versión</span></div>
      <div class="ac_hstat"><span class="ac_hstat_n">${lanzamiento}</span><span>Año</span></div>
      <div class="ac_hstat"><span class="ac_hstat_n">${stack.length}</span><span>Tecnologías</span></div>
    </div>
  </header>

  <div class="ac_layout">
    <aside class="ac_sidebar">
      <div class="ac_side_title"><i class="fas fa-circle-info"></i> Acerca</div>
      ${secciones.map(tplSidebar).join('')}
    </aside>
    <div class="ac_content">

      <!-- INTRO -->
      <section class="ac_section" id="ac_intro">
        <div class="ac_sec_head" style="--cc:#0EBEFF">
          <div class="ac_sec_ico"><i class="fas fa-rocket"></i></div>
          <div>
            <h2 class="ac_sec_tit">¿Qué es Widev?</h2>
            <span class="ac_sec_meta">Framework minimalista · SPA · Utilidades JS</span>
          </div>
        </div>
        <div class="ac_intro_body">
          <div class="ac_intro_txt">
            <p><strong>${app}</strong> es un framework web minimalista creado para construir aplicaciones SPA (Single Page Application) rápidas, hermosas y mantenibles sin la sobrecarga de frameworks pesados.</p>
            <p>Nació de la necesidad de tener un stack personal limpio: un router SPA propio, utilidades JS reutilizables, un sistema de temas por variables CSS y una arquitectura modular donde cada página es un módulo independiente.</p>
            <div class="ac_intro_features">
              <div class="ac_if"><i class="fas fa-route" style="color:#0EBEFF"></i><span>Router SPA sin hash</span></div>
              <div class="ac_if"><i class="fas fa-palette" style="color:#7000FF"></i><span>5 temas de color</span></div>
              <div class="ac_if"><i class="fas fa-bolt" style="color:#FFB800"></i><span>Lazy loading inteligente</span></div>
              <div class="ac_if"><i class="fas fa-fire" style="color:#ff6d00"></i><span>Firebase integrado</span></div>
              <div class="ac_if"><i class="fas fa-mobile-screen" style="color:#29C72E"></i><span>100% responsive</span></div>
              <div class="ac_if"><i class="fas fa-wand-magic-sparkles" style="color:#FF5C69"></i><span>Animaciones suaves</span></div>
            </div>
          </div>
          <div class="ac_dev_card">
            <div class="ac_dev_avatar"><i class="fas fa-user-tie"></i></div>
            <div class="ac_dev_info">
              <strong>Wilder Taype</strong>
              <span>${autor}</span>
              <a href="${linkme}" target="_blank" rel="noopener" class="ac_dev_link">
                <i class="fas fa-globe"></i> Portfolio
              </a>
            </div>
            <div class="ac_dev_stats">
              <div><span>${version}</span><small>versión</small></div>
              <div><span>${lanzamiento}</span><small>desde</small></div>
            </div>
          </div>
        </div>
      </section>

      <!-- STACK -->
      <section class="ac_section" id="ac_stack">
        <div class="ac_sec_head" style="--cc:#FFB800">
          <div class="ac_sec_ico"><i class="fas fa-layer-group"></i></div>
          <div>
            <h2 class="ac_sec_tit">Stack Técnico</h2>
            <span class="ac_sec_meta">${stack.length} tecnologías · sin frameworks CSS</span>
          </div>
        </div>
        <div class="ac_stack_grid">
          ${stack.map(tplStack).join('')}
        </div>
      </section>

      <!-- FILOSOFIA -->
      <section class="ac_section" id="ac_filosofia">
        <div class="ac_sec_head" style="--cc:#29C72E">
          <div class="ac_sec_ico"><i class="fas fa-lightbulb"></i></div>
          <div>
            <h2 class="ac_sec_tit">Filosofía</h2>
            <span class="ac_sec_meta">Los ${principios.length} principios detrás de Widev</span>
          </div>
        </div>
        <div class="ac_prin_grid">
          ${principios.map(tplPrincipio).join('')}
        </div>
      </section>

      <!-- VERSION -->
      <section class="ac_section" id="ac_version">
        <div class="ac_sec_head" style="--cc:#7000FF">
          <div class="ac_sec_ico"><i class="fas fa-code-branch"></i></div>
          <div>
            <h2 class="ac_sec_tit">Versiones</h2>
            <span class="ac_sec_meta">Historial de cambios · versión actual ${version}</span>
          </div>
        </div>
        <div class="ac_timeline">
          ${changelog.map(tplVersion).join('')}
        </div>
      </section>

      <!-- CONTACTO -->
      <section class="ac_section" id="ac_contacto">
        <div class="ac_sec_head" style="--cc:#FF5C69">
          <div class="ac_sec_ico"><i class="fas fa-satellite-dish"></i></div>
          <div>
            <h2 class="ac_sec_tit">Contacto</h2>
            <span class="ac_sec_meta">Recursos y links del proyecto</span>
          </div>
        </div>
        <div class="ac_links_grid">
          <a href="${linkme}" target="_blank" rel="noopener" class="ac_link_card" style="--lc:#0EBEFF">
            <i class="fas fa-globe"></i>
            <strong>Portfolio</strong>
            <span>wtaype.github.io</span>
          </a>
          <div class="ac_link_card ac_link_copy" style="--lc:#FF5C69" data-copy="${autor}">
            <i class="fab fa-instagram"></i>
            <strong>Instagram</strong>
            <span>${autor}</span>
          </div>
          <div class="ac_link_card ac_link_copy" style="--lc:#29C72E" data-copy="${app.toLowerCase()}">
            <i class="fas fa-code"></i>
            <strong>App ID</strong>
            <span>${app.toLowerCase()}</span>
          </div>
          <div class="ac_link_card" style="--lc:#7000FF">
            <i class="fas fa-scale-balanced"></i>
            <strong>Licencia</strong>
            <span>MIT · Uso libre</span>
          </div>
        </div>
        <div class="ac_cta">
          <i class="fas fa-heart ac_cta_heart"></i>
          <h3>Hecho con amor y código</h3>
          <p>Widev es un proyecto personal creado para explorar, aprender y construir experiencias web de calidad. Si te sirve, úsalo, adáptalo y hazlo tuyo.</p>
          <button class="ac_cta_btn" id="ac_copiarRepo"><i class="fas fa-copy"></i> Copiar nombre del proyecto</button>
        </div>
      </section>

    </div>
  </div>

</div>`;

// ── INIT ──────────────────────────────────────────────────────
export const init = () => {
  // Sidebar nav
  $(document).on('click.ac', '.ac_side_item', function(e) {
    e.preventDefault();
    $('.ac_side_item').removeClass('active');
    $(this).addClass('active');
    const target = $($(this).attr('href'));
    if (target.length) $('html,body').animate({ scrollTop: target.offset().top - 80 }, 400);
  });

  // Scroll spy
  const sections = $('.ac_section');
  const spy = () => {
    const st = $(window).scrollTop() + 120;
    sections.each(function() {
      const $s = $(this), top = $s.offset().top, bot = top + $s.outerHeight();
      if (st >= top && st < bot) {
        const id = $s.attr('id')?.replace('ac_', '');
        $('.ac_side_item').removeClass('active');
        $(`.ac_side_item[data-cat="${id}"]`).addClass('active');
      }
    });
  };
  $(window).on('scroll.ac', spy);
  spy();
  $('.ac_side_item').first().addClass('active');

  // Copy links
  $(document).on('click.ac', '.ac_link_copy', function() {
    wicopy($(this).data('copy'), this, '¡Copiado!');
  });

  // CTA copy
  $(document).on('click.ac', '#ac_copiarRepo', function() {
    wicopy(app.toLowerCase(), this, `¡${app} copiado!`);
  });

  // Animations
  wiVista('.ac_section',    null, { anim:'wi_fadeUp', stagger:120 });
  wiVista('.ac_stack_card', null, { anim:'wi_fadeUp', stagger:80  });
  wiVista('.ac_prin_card',  null, { anim:'wi_fadeUp', stagger:60  });
  wiVista('.ac_ver_item',   null, { anim:'wi_fadeUp', stagger:100 });
  wiVista('.ac_link_card',  null, { anim:'wi_fadeUp', stagger:80  });

  console.log(`⚡ ${app} ${version} · Acerca OK`);
};

export const cleanup = () => {
  $(document).off('.ac');
  $(window).off('.ac');
};