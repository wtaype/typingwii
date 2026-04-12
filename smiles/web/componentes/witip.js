import './witip.css';
import $ from 'jquery';
import { wiTip, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#8B5CF6';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'witip', fn:wiTip, nom:'Tooltips', icon:'fa-comment-dots', color:COLOR,
  desc:'Muestra tooltips contextuales en 4 posiciones. Texto directo o sobre cualquier elemento.',
  code:`wiTip('#btn', 'Guardar cambios', 'top');\nwiTip('Guardado!', 'success');`,
  demo:() => `<div class="cp_demo_row">
    <button onmouseenter="wiTip(this,'Tooltip arriba','top')" class="wtp_btn">Hover top</button>
    <button onmouseenter="wiTip(this,'Tooltip abajo','bottom')" class="wtp_btn">Hover bottom</button>
    <button onmouseenter="wiTip(this,'Tooltip izquierda','left')" class="wtp_btn">Hover left</button>
    <button onmouseenter="wiTip(this,'Tooltip derecha','right')" class="wtp_btn">Hover right</button>
  </div>`,
  main:() => { window.wiTip = wiTip; }
};

const secciones = [
  { id:'posiciones', titulo:'Posiciones',
    desc:'Cuatro posiciones disponibles: top, bottom, left, right. El tooltip aparece y desaparece automaticamente.',
    html:`&lt;button id="mi-btn"&gt;Hover me&lt;/button&gt;`,
    js:`import { wiTip } from './widev.js';\n\n// Segun posicion\nwiTip('#btn-top',    'Tooltip arriba',    'top');\nwiTip('#btn-bottom', 'Tooltip abajo',     'bottom');\nwiTip('#btn-left',   'Tooltip izquierda', 'left');\nwiTip('#btn-right',  'Tooltip derecha',   'right');`,
    demo:() => `<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="wtp_btn" onmouseenter="wiTip(this,'Arriba ↑','top')">top</button>
      <button class="wtp_btn" onmouseenter="wiTip(this,'Abajo ↓','bottom')">bottom</button>
      <button class="wtp_btn" onmouseenter="wiTip(this,'← Izquierda','left')">left</button>
      <button class="wtp_btn" onmouseenter="wiTip(this,'Derecha →','right')">right</button>
    </div>` },
  { id:'tiempo', titulo:'Duracion personalizada',
    desc:'El cuarto argumento controla cuantos ms dura el tooltip. Por defecto 1800ms.',
    html:``,
    js:`import { wiTip } from './widev.js';\n\nwiTip('#btn', 'Rapido',    'top', 800);\nwiTip('#btn', 'Normal',    'top', 1800);\nwiTip('#btn', 'Lento',     'top', 3500);\nwiTip('#btn', 'Muy lento', 'top', 6000);`,
    demo:() => `<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="wtp_btn" onmouseenter="wiTip(this,'800ms','top',800)">800ms</button>
      <button class="wtp_btn" onmouseenter="wiTip(this,'1800ms (default)','top',1800)">1800ms</button>
      <button class="wtp_btn" onmouseenter="wiTip(this,'4000ms','top',4000)">4000ms</button>
    </div>` },
  { id:'mensaje', titulo:'Tooltip de mensaje',
    desc:'Primer argumento como texto: muestra un tooltip flotante global sin necesidad de un elemento.',
    html:``,
    js:`import { wiTip } from './widev.js';\n\n// Tooltip sin elemento de referencia\nwiTip('¡Copiado al portapapeles!', null, 'top', 2000);\nwiTip('Sesion iniciada', null, 'top', 3000);`,
    demo:() => `<div class="cp_demo_row">
      <button class="wtp_btn" onmouseenter="wiTip('¡Aparezco como tooltip flotante!',null,'top',2000)">
        <i class="fas fa-comment-dots"></i> Tooltip flotante
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
    <div class="doc_side_hd"><i class="fas fa-comment-dots" style="color:${COLOR}"></i><span>wiTip</span><span class="cp_badge">v${wiTip.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-comment-dots" style="color:${COLOR}"></i> wiTip</h1>
      <p>Tooltips contextuales en 4 posiciones. Se muestran sobre cualquier elemento o como mensaje flotante. Auto-desaparecen configurables.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-arrows-alt"></i> 4 posiciones</span>
        <span class="doc_bdg"><i class="fas fa-clock"></i> Duracion custom</span>
        <span class="doc_bdg"><i class="fas fa-comment"></i> Flotante</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  window.wiTip = wiTip;
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.wtp', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wtp', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => { $(document).off('.wtp'); delete window.wiTip; };
