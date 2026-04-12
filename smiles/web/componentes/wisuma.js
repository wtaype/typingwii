import './wisuma.css';
import $ from 'jquery';
import { wiSuma, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#A855F7';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'wisuma', fn:wiSuma, nom:'Click Counter', icon:'fa-plus-circle', color:COLOR,
  desc:'Ejecuta una funcion cada N clics. Ideal para easter eggs, combos o acciones ocultas.',
  code:`wiSuma('#logo', () => activarModoSeceto(), 7);\nwiSuma('#btn', () => Notificacion('Combo!'), 5);`,
  demo:() => `<div class="cp_demo_row">
    <button id="wsu_demo_btn" class="wsu_btn">Clic x5 = sorpresa</button>
    <span id="wsu_count" class="wsu_count">0 / 5</span>
  </div>`,
  main:() => {
    let c = 0;
    $('#wsu_demo_btn').off('click').on('click', () => {
      c++;
      $('#wsu_count').text(`${c} / 5`);
      if (c >= 5) { c = 0; $('#wsu_count').text('🎉 Combo!'); setTimeout(() => $('#wsu_count').text('0 / 5'), 1500); }
    });
  }
};

const secciones = [
  { id:'basico', titulo:'Uso basico',
    desc:'Selector + callback + numero de clics. El callback se ejecuta cada N clics acumulados.',
    html:`&lt;button id="mi-btn"&gt;Clic!&lt;/button&gt;`,
    js:`import { wiSuma } from './widev.js';\n\n// Ejecutar cada 5 clics\nwiSuma('#mi-btn', () => {\n  console.log('¡5 clics alcanzados!');\n}, 5);`,
    demo:() => `<div class="cp_demo_row">
      <button id="wsu_d1" class="wsu_btn">Clic aqui <span id="wsu_c1" class="wsu_badge">0/5</span></button>
    </div>` },
  { id:'easter', titulo:'Easter egg',
    desc:'Patron tipico: accion secreta al clicar el logo varias veces. Sin que el usuario lo sepa.',
    html:`&lt;div id="logo"&gt;Mi Logo&lt;/div&gt;`,
    js:`import { wiSuma, Notificacion } from './widev.js';\n\n// Easter egg: 7 clics en el logo\nwiSuma('#logo', () => {\n  Notificacion('🎉 ¡Encontraste el easter egg!', 'success', 5000);\n  activarAnimacion();\n}, 7);`,
    demo:() => `<div class="cp_demo_row">
      <button id="wsu_easter" class="wsu_btn wsu_secret">
        <i class="fas fa-bug"></i> Logo secreto <span id="wsu_ec" class="wsu_badge">0/7</span>
      </button>
    </div>` },
  { id:'combo', titulo:'Sistema de combos',
    desc:'Implementa un sistema de combos para juegos o interfaces gamificadas. Reaccion inmediata.',
    html:`&lt;button id="btn-combo"&gt;COMBO!&lt;/button&gt;`,
    js:`import { wiSuma, Notificacion } from './widev.js';\n\nwiSuma('#btn-combo', () => {\n  Notificacion('¡COMBO x10! 🔥', 'success');\n  sumarPuntos(100);\n}, 10);\n\nwiSuma('#btn-combo', () => {\n  Notificacion('¡MEGA COMBO! 💥', 'warning');\n}, 20);`,
    demo:() => `<div class="cp_demo_row">
      <button id="wsu_combo" class="wsu_btn" style="background:color-mix(in srgb,#A855F7 15%,var(--bg));border-color:#A855F7;color:#A855F7">
        <i class="fas fa-fire"></i> COMBO! <span id="wsu_cc" class="wsu_badge">0/5</span>
      </button>
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
    ${s.html ? `<div class="doc_tabs">${codeBlk('html',`dp_h_${s.id}`,s.html)}${codeBlk('js',`dp_j_${s.id}`,s.js)}</div>` : `<div class="doc_tabs">${codeBlk('js',`dp_j_${s.id}`,s.js)}</div>`}
    <div class="doc_demo">
      <div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>
      ${s.demo()}
    </div>
  </section>`;

export const render = () => `
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-plus-circle" style="color:${COLOR}"></i><span>wiSuma</span><span class="cp_badge">v${wiSuma.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-plus-circle" style="color:${COLOR}"></i> wiSuma</h1>
      <p>Ejecuta un callback cada N clics en un elemento. Ideal para easter eggs, combos en juegos e interfaces gamificadas.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-mouse-pointer"></i> N clics</span>
        <span class="doc_bdg"><i class="fas fa-egg"></i> Easter eggs</span>
        <span class="doc_bdg"><i class="fas fa-fire"></i> Combos</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.wsu', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wsu', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });

  // Demo counters
  let c1 = 0, ce = 0, cc = 0;
  $(document).on('click.wsu', '#wsu_d1', () => { c1++; $('#wsu_c1').text(`${c1}/5`); if(c1>=5){c1=0;$('#wsu_c1').text('🎉');setTimeout(()=>$('#wsu_c1').text('0/5'),1500);} });
  $(document).on('click.wsu', '#wsu_easter', () => { ce++; $('#wsu_ec').text(`${ce}/7`); if(ce>=7){ce=0;$('#wsu_ec').text('🔥');setTimeout(()=>$('#wsu_ec').text('0/7'),2000);} });
  $(document).on('click.wsu', '#wsu_combo', () => { cc++; $('#wsu_cc').text(`${cc}/5`); if(cc>=5){cc=0;$('#wsu_cc').text('💥');setTimeout(()=>$('#wsu_cc').text('0/5'),1500);} });

  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.wsu');
