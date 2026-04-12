import './wivista.css';
import $ from 'jquery';
import { wiVista, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#7C3AED';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'wivista', fn:wiVista, nom:'Animaciones al Scroll', icon:'fa-eye', color:COLOR,
  desc:'Activa clases CSS cuando un elemento entra al viewport. IntersectionObserver listo en una linea.',
  code:`wiVista('.card', null, { anim: 'wi_fadeUp', stagger: 100 });`,
  demo:() => `<div class="cp_demo_row">
    <div class="wvs_box">Box 1</div>
    <div class="wvs_box" style="animation-delay:.12s">Box 2</div>
    <div class="wvs_box" style="animation-delay:.24s">Box 3</div>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'basico', titulo:'Uso basico',
    desc:'Selector + clase de animacion. wiVista observa cada elemento y activa la clase cuando entra en pantalla.',
    html:`&lt;div class="card"&gt;Contenido&lt;/div&gt;\n&lt;div class="card"&gt;Contenido&lt;/div&gt;`,
    js:`import { wiVista } from './widev.js';\nwiVista('.card', null, { anim: 'wi_fadeUp' });`,
    demo:() => `<div style="display:flex;gap:1vh">
      <div class="wvs_card">Card 1</div>
      <div class="wvs_card">Card 2</div>
      <div class="wvs_card">Card 3</div>
    </div>` },
  { id:'stagger', titulo:'Stagger — entrada escalonada',
    desc:'Cada elemento recibe un retardo incremental creando un efecto de cascada visual elegante.',
    html:`&lt;div class="item"&gt;Item 1&lt;/div&gt;\n&lt;div class="item"&gt;Item 2&lt;/div&gt;\n&lt;div class="item"&gt;Item 3&lt;/div&gt;`,
    js:`import { wiVista } from './widev.js';\nwiVista('.item', null, { anim: 'wi_fadeUp', stagger: 150 });`,
    demo:() => `<div style="display:flex;flex-direction:column;gap:.8vh;width:100%">
      <div class="wvs_item" style="animation-delay:0ms">Elemento 1</div>
      <div class="wvs_item" style="animation-delay:150ms">Elemento 2</div>
      <div class="wvs_item" style="animation-delay:300ms">Elemento 3</div>
    </div>` },
  { id:'callback', titulo:'Con callback',
    desc:'Segundo argumento: funcion que se ejecuta por cada elemento al entrar en pantalla.',
    html:`&lt;div class="seccion" id="s1"&gt;Seccion 1&lt;/div&gt;`,
    js:`import { wiVista } from './widev.js';\nwiVista('.seccion', el => {\n  console.log('visible:', el.id);\n  el.classList.add('destacado');\n});`,
    demo:() => `<div style="display:flex;gap:1vh">
      <div class="wvs_card wvs_click" onclick="this.classList.toggle('wvs_on')">Clic → toggle clase</div>
      <div class="wvs_card wvs_click" onclick="this.classList.toggle('wvs_on')">Clic → toggle clase</div>
    </div>` },
  { id:'opciones', titulo:'Opciones avanzadas',
    desc:'threshold controla cuanto del elemento debe ser visible. once:false reactiva al salir y volver a entrar.',
    html:`&lt;div class="elemento"&gt;...&lt;/div&gt;`,
    js:`import { wiVista } from './widev.js';\nwiVista('.elemento', null, {\n  anim: 'wi_fadeUp',\n  threshold: 0.3,\n  once: false,\n  stagger: 80\n});`,
    demo:() => `<div style="display:flex;gap:1vh;flex-wrap:wrap">
      <div class="wvs_opt"><b>threshold:</b> 0.3</div>
      <div class="wvs_opt"><b>once:</b> false</div>
      <div class="wvs_opt"><b>stagger:</b> 80ms</div>
      <div class="wvs_opt"><b>anim:</b> wi_fadeUp</div>
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
    <div class="doc_side_hd"><i class="fas fa-eye" style="color:${COLOR}"></i><span>wiVista</span><span class="cp_badge">v${wiVista.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-eye" style="color:${COLOR}"></i> wiVista</h1>
      <p>Activa clases CSS cuando un elemento entra en pantalla. Basado en <code>IntersectionObserver</code>. Sin dependencias extra.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Una linea</span>
        <span class="doc_bdg"><i class="fas fa-layer-group"></i> Stagger</span>
        <span class="doc_bdg"><i class="fas fa-code"></i> Callback</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.wvs', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wvs', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.wvs');
