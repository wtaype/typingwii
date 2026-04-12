import './wiscroll.css';
import $ from 'jquery';
import { wiScroll, wicopy } from '../../widev.js';

const COLOR = '#10B981';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'wiscroll', fn:wiScroll, nom:'Scroll Spy', icon:'fa-location-arrow', color:COLOR,
  desc:'Resalta el link de navegacion activo segun la seccion visible en pantalla. IntersectionObserver.',
  code:`wiScroll(['hero','about','contact'], '.nav-link');`,
  demo:() => `<div class="cp_demo_row wsc_demo_wrap">
    <nav class="wsc_nav">
      <a class="wsc_lnk active" href="#wsc_s1">Inicio</a>
      <a class="wsc_lnk" href="#wsc_s2">Sobre mi</a>
      <a class="wsc_lnk" href="#wsc_s3">Contacto</a>
    </nav>
    <div class="wsc_content">
      <div id="wsc_s1" class="wsc_sec">Seccion: Inicio</div>
      <div id="wsc_s2" class="wsc_sec">Seccion: Sobre mi</div>
      <div id="wsc_s3" class="wsc_sec">Seccion: Contacto</div>
    </div>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'basico', titulo:'Uso basico',
    desc:'Array de IDs de secciones + selector del nav. wiScroll activa la clase active en el link correcto.',
    html:`&lt;nav&gt;\n  &lt;a class="nav-link" href="#inicio"&gt;Inicio&lt;/a&gt;\n  &lt;a class="nav-link" href="#sobre"&gt;Sobre&lt;/a&gt;\n&lt;/nav&gt;\n&lt;section id="inicio"&gt;...&lt;/section&gt;\n&lt;section id="sobre"&gt;...&lt;/section&gt;`,
    js:`import { wiScroll } from './widev.js';\nwiScroll(['inicio', 'sobre'], '.nav-link');`,
    demo:() => `<div class="wsc_demo_inline">
      <div class="wsc_pill active">Inicio</div>
      <div class="wsc_pill">Sobre</div>
      <div class="wsc_pill">Contacto</div>
      <span style="color:var(--tx3);font-size:var(--fz_s3)">← activo segun scroll</span>
    </div>` },
  { id:'clase', titulo:'Clase personalizada',
    desc:'El tercer argumento cls cambia la clase que se aplica. Por defecto es "active".',
    html:`&lt;a class="side-item" href="#s1"&gt;Item 1&lt;/a&gt;`,
    js:`import { wiScroll } from './widev.js';\nwiScroll(['s1','s2','s3'], '.side-item', {\n  cls: 'is-visible'\n});`,
    demo:() => `<div class="wsc_demo_inline">
      <div class="wsc_pill wsc_custom">Item 1 <span class="wsc_badge">is-visible</span></div>
      <div class="wsc_pill">Item 2</div>
      <div class="wsc_pill">Item 3</div>
    </div>` },
  { id:'margin', titulo:'Margen de activacion',
    desc:'margin controla cuando se activa el observer. Util para headers fijos o layouts con padding.',
    html:`&lt;a class="nav-a" href="#s1"&gt;Seccion 1&lt;/a&gt;`,
    js:`import { wiScroll } from './widev.js';\nwiScroll(['s1','s2'], '.nav-a', {\n  margin: '-10% 0px -80% 0px'\n});`,
    demo:() => `<div style="display:flex;gap:1vh;flex-wrap:wrap">
      <div class="wvs_opt"><b>margin:</b> '-20% 0px -70% 0px'</div>
      <div class="wvs_opt"><b>cls:</b> 'active'</div>
    </div>` },
  { id:'sidebar', titulo:'Sidebar de documentacion',
    desc:'Patron clasico: sidebar con links que se resaltan al hacer scroll por las secciones del contenido.',
    html:`&lt;aside&gt;\n  &lt;a class="doc_nav_a" href="#intro"&gt;Intro&lt;/a&gt;\n  &lt;a class="doc_nav_a" href="#uso"&gt;Uso&lt;/a&gt;\n&lt;/aside&gt;`,
    js:`import { wiScroll } from './widev.js';\n\nconst secciones = ['intro','uso','api','ejemplos'];\nconst obs = wiScroll(secciones, '.doc_nav_a');\n\n// Para desconectar el observer:\nobs.disconnect();`,
    demo:() => `<div style="display:flex;gap:1vh;flex-wrap:wrap">
      <div class="wsc_pill active">Intro</div>
      <div class="wsc_pill">Uso</div>
      <div class="wsc_pill">API</div>
      <div class="wsc_pill">Ejemplos</div>
    </div>` }
];

const codeBlk = (tag, id, code) => `
  <div class="doc_code_blk">
    <div class="doc_code_lbl"><span class="doc_code_tag doc_tag_${tag}">${tag.toUpperCase()}</span></div>
    <pre id="${id}"><code class="language-${tag}">${code}</code></pre>
    <button class="doc_copy" data-pre="${id}" title="Copiar ${tag.toUpperCase()}"><i class="fas fa-copy"></i></button>
  </div>`;

const wTabs = s => `
  <section class="doc_sec" id="${s.id}">
    <h2 class="doc_h2">${s.titulo}</h2>
    <p class="doc_p">${s.desc}</p>
    ${s.html ? `<div class="doc_tabs">${codeBlk('html',`dp_h_${s.id}`,s.html)}${codeBlk('js',`dp_j_${s.id}`,s.js)}</div>` : ''}
    <div class="doc_demo">
      ${s.html ? '<div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>' : ''}
      ${s.demo()}
    </div>
  </section>`;

export const render = () => `
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-location-arrow" style="color:${COLOR}"></i><span>wiScroll</span><span class="cp_badge">v${wiScroll.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-location-arrow" style="color:${COLOR}"></i> wiScroll</h1>
      <p>Resalta automaticamente el link de navegacion segun la seccion visible. Basado en <code>IntersectionObserver</code>. Devuelve el observer para poder desconectarlo.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Una linea</span>
        <span class="doc_bdg"><i class="fas fa-sliders-h"></i> Configurable</span>
        <span class="doc_bdg"><i class="fas fa-unlink"></i> disconnect()</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.wsc', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wsc', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.wsc');
