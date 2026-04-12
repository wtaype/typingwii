import{t as e}from"./vendor-BDh6mtVu.js";import{p as t,v as n,y as r}from"./widev-vIOvrNXT.js";var i=`#7C3AED`,a={id:`wivista`,fn:n,nom:`Animaciones al Scroll`,icon:`fa-eye`,color:i,desc:`Activa clases CSS cuando un elemento entra al viewport. IntersectionObserver listo en una linea.`,code:`wiVista('.card', null, { anim: 'wi_fadeUp', stagger: 100 });`,demo:()=>`<div class="cp_demo_row">
    <div class="wvs_box">Box 1</div>
    <div class="wvs_box" style="animation-delay:.12s">Box 2</div>
    <div class="wvs_box" style="animation-delay:.24s">Box 3</div>
  </div>`,main:()=>{}},o=[{id:`basico`,titulo:`Uso basico`,desc:`Selector + clase de animacion. wiVista observa cada elemento y activa la clase cuando entra en pantalla.`,html:`&lt;div class="card"&gt;Contenido&lt;/div&gt;
&lt;div class="card"&gt;Contenido&lt;/div&gt;`,js:`import { wiVista } from './widev.js';
wiVista('.card', null, { anim: 'wi_fadeUp' });`,demo:()=>`<div style="display:flex;gap:1vh">
      <div class="wvs_card">Card 1</div>
      <div class="wvs_card">Card 2</div>
      <div class="wvs_card">Card 3</div>
    </div>`},{id:`stagger`,titulo:`Stagger — entrada escalonada`,desc:`Cada elemento recibe un retardo incremental creando un efecto de cascada visual elegante.`,html:`&lt;div class="item"&gt;Item 1&lt;/div&gt;
&lt;div class="item"&gt;Item 2&lt;/div&gt;
&lt;div class="item"&gt;Item 3&lt;/div&gt;`,js:`import { wiVista } from './widev.js';
wiVista('.item', null, { anim: 'wi_fadeUp', stagger: 150 });`,demo:()=>`<div style="display:flex;flex-direction:column;gap:.8vh;width:100%">
      <div class="wvs_item" style="animation-delay:0ms">Elemento 1</div>
      <div class="wvs_item" style="animation-delay:150ms">Elemento 2</div>
      <div class="wvs_item" style="animation-delay:300ms">Elemento 3</div>
    </div>`},{id:`callback`,titulo:`Con callback`,desc:`Segundo argumento: funcion que se ejecuta por cada elemento al entrar en pantalla.`,html:`&lt;div class="seccion" id="s1"&gt;Seccion 1&lt;/div&gt;`,js:`import { wiVista } from './widev.js';
wiVista('.seccion', el => {
  console.log('visible:', el.id);
  el.classList.add('destacado');
});`,demo:()=>`<div style="display:flex;gap:1vh">
      <div class="wvs_card wvs_click" onclick="this.classList.toggle('wvs_on')">Clic → toggle clase</div>
      <div class="wvs_card wvs_click" onclick="this.classList.toggle('wvs_on')">Clic → toggle clase</div>
    </div>`},{id:`opciones`,titulo:`Opciones avanzadas`,desc:`threshold controla cuanto del elemento debe ser visible. once:false reactiva al salir y volver a entrar.`,html:`&lt;div class="elemento"&gt;...&lt;/div&gt;`,js:`import { wiVista } from './widev.js';
wiVista('.elemento', null, {
  anim: 'wi_fadeUp',
  threshold: 0.3,
  once: false,
  stagger: 80
});`,demo:()=>`<div style="display:flex;gap:1vh;flex-wrap:wrap">
      <div class="wvs_opt"><b>threshold:</b> 0.3</div>
      <div class="wvs_opt"><b>once:</b> false</div>
      <div class="wvs_opt"><b>stagger:</b> 80ms</div>
      <div class="wvs_opt"><b>anim:</b> wi_fadeUp</div>
    </div>`}],s=(e,t,n)=>`
  <div class="doc_code_blk">
    <div class="doc_code_lbl"><span class="doc_code_tag doc_tag_${e}">${e.toUpperCase()}</span></div>
    <pre id="${t}"><code class="language-${e}">${n}</code></pre>
    <button class="doc_copy" data-pre="${t}" title="Copiar ${e.toUpperCase()}"><i class="fas fa-copy"></i></button>
  </div>`,c=e=>`
  <section class="doc_sec" id="${e.id}">
    <h2 class="doc_h2">${e.titulo}</h2>
    <p class="doc_p">${e.desc}</p>
    ${e.html?`<div class="doc_tabs">${s(`html`,`dp_h_${e.id}`,e.html)}${s(`js`,`dp_j_${e.id}`,e.js)}</div>`:``}
    <div class="doc_demo">
      ${e.html?`<div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>`:``}
      ${e.demo()}
    </div>
  </section>`,l=()=>`
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-eye" style="color:${i}"></i><span>wiVista</span><span class="cp_badge">v${n.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-eye" style="color:${i}"></i> wiVista</h1>
      <p>Activa clases CSS cuando un elemento entra en pantalla. Basado en <code>IntersectionObserver</code>. Sin dependencias extra.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Una linea</span>
        <span class="doc_bdg"><i class="fas fa-layer-group"></i> Stagger</span>
        <span class="doc_bdg"><i class="fas fa-code"></i> Callback</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Prism&&Prism.highlightAll(),e(document).on(`click.wvs`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.wvs`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),t(o.map(e=>e.id),`.doc_nav_a`)},d=()=>e(document).off(`.wvs`);export{d as cleanup,u as init,l as render,a as wi};