import{t as e}from"./vendor-BDh6mtVu.js";import{_ as t,p as n,y as r}from"./widev-vIOvrNXT.js";var i=`#8B5CF6`,a={id:`witip`,fn:t,nom:`Tooltips`,icon:`fa-comment-dots`,color:i,desc:`Muestra tooltips contextuales en 4 posiciones. Texto directo o sobre cualquier elemento.`,code:`wiTip('#btn', 'Guardar cambios', 'top');
wiTip('Guardado!', 'success');`,demo:()=>`<div class="cp_demo_row">
    <button onmouseenter="wiTip(this,'Tooltip arriba','top')" class="wtp_btn">Hover top</button>
    <button onmouseenter="wiTip(this,'Tooltip abajo','bottom')" class="wtp_btn">Hover bottom</button>
    <button onmouseenter="wiTip(this,'Tooltip izquierda','left')" class="wtp_btn">Hover left</button>
    <button onmouseenter="wiTip(this,'Tooltip derecha','right')" class="wtp_btn">Hover right</button>
  </div>`,main:()=>{window.wiTip=t}},o=[{id:`posiciones`,titulo:`Posiciones`,desc:`Cuatro posiciones disponibles: top, bottom, left, right. El tooltip aparece y desaparece automaticamente.`,html:`&lt;button id="mi-btn"&gt;Hover me&lt;/button&gt;`,js:`import { wiTip } from './widev.js';

// Segun posicion
wiTip('#btn-top',    'Tooltip arriba',    'top');
wiTip('#btn-bottom', 'Tooltip abajo',     'bottom');
wiTip('#btn-left',   'Tooltip izquierda', 'left');
wiTip('#btn-right',  'Tooltip derecha',   'right');`,demo:()=>`<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="wtp_btn" onmouseenter="wiTip(this,'Arriba ↑','top')">top</button>
      <button class="wtp_btn" onmouseenter="wiTip(this,'Abajo ↓','bottom')">bottom</button>
      <button class="wtp_btn" onmouseenter="wiTip(this,'← Izquierda','left')">left</button>
      <button class="wtp_btn" onmouseenter="wiTip(this,'Derecha →','right')">right</button>
    </div>`},{id:`tiempo`,titulo:`Duracion personalizada`,desc:`El cuarto argumento controla cuantos ms dura el tooltip. Por defecto 1800ms.`,html:``,js:`import { wiTip } from './widev.js';

wiTip('#btn', 'Rapido',    'top', 800);
wiTip('#btn', 'Normal',    'top', 1800);
wiTip('#btn', 'Lento',     'top', 3500);
wiTip('#btn', 'Muy lento', 'top', 6000);`,demo:()=>`<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="wtp_btn" onmouseenter="wiTip(this,'800ms','top',800)">800ms</button>
      <button class="wtp_btn" onmouseenter="wiTip(this,'1800ms (default)','top',1800)">1800ms</button>
      <button class="wtp_btn" onmouseenter="wiTip(this,'4000ms','top',4000)">4000ms</button>
    </div>`},{id:`mensaje`,titulo:`Tooltip de mensaje`,desc:`Primer argumento como texto: muestra un tooltip flotante global sin necesidad de un elemento.`,html:``,js:`import { wiTip } from './widev.js';

// Tooltip sin elemento de referencia
wiTip('¡Copiado al portapapeles!', null, 'top', 2000);
wiTip('Sesion iniciada', null, 'top', 3000);`,demo:()=>`<div class="cp_demo_row">
      <button class="wtp_btn" onmouseenter="wiTip('¡Aparezco como tooltip flotante!',null,'top',2000)">
        <i class="fas fa-comment-dots"></i> Tooltip flotante
      </button>
    </div>`}],s=(e,t,n)=>`
  <div class="doc_code_blk">
    <div class="doc_code_lbl"><span class="doc_code_tag doc_tag_${e}">${e.toUpperCase()}</span></div>
    <pre id="${t}"><code class="language-${e}">${n}</code></pre>
    <button class="doc_copy" data-pre="${t}" title="Copiar ${e.toUpperCase()}"><i class="fas fa-copy"></i></button>
  </div>`,c=e=>`
  <section class="doc_sec" id="${e.id}">
    <h2 class="doc_h2">${e.titulo}</h2>
    <p class="doc_p">${e.desc}</p>
    ${e.html?`<div class="doc_tabs">${s(`html`,`dp_h_${e.id}`,e.html)}${s(`js`,`dp_j_${e.id}`,e.js)}</div>`:`<div class="doc_tabs">${s(`js`,`dp_j_${e.id}`,e.js)}</div>`}
    <div class="doc_demo">
      <div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>
      ${e.demo()}
    </div>
  </section>`,l=()=>`
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-comment-dots" style="color:${i}"></i><span>wiTip</span><span class="cp_badge">v${t.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-comment-dots" style="color:${i}"></i> wiTip</h1>
      <p>Tooltips contextuales en 4 posiciones. Se muestran sobre cualquier elemento o como mensaje flotante. Auto-desaparecen configurables.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-arrows-alt"></i> 4 posiciones</span>
        <span class="doc_bdg"><i class="fas fa-clock"></i> Duracion custom</span>
        <span class="doc_bdg"><i class="fas fa-comment"></i> Flotante</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.wiTip=t,window.Prism&&Prism.highlightAll(),e(document).on(`click.wtp`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.wtp`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),n(o.map(e=>e.id),`.doc_nav_a`)},d=()=>{e(document).off(`.wtp`),delete window.wiTip};export{d as cleanup,u as init,l as render,a as wi};