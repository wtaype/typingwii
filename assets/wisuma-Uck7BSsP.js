import{t as e}from"./vendor-BDh6mtVu.js";import{g as t,p as n,y as r}from"./widev-vIOvrNXT.js";var i=`#A855F7`,a={id:`wisuma`,fn:t,nom:`Click Counter`,icon:`fa-plus-circle`,color:i,desc:`Ejecuta una funcion cada N clics. Ideal para easter eggs, combos o acciones ocultas.`,code:`wiSuma('#logo', () => activarModoSeceto(), 7);
wiSuma('#btn', () => Notificacion('Combo!'), 5);`,demo:()=>`<div class="cp_demo_row">
    <button id="wsu_demo_btn" class="wsu_btn">Clic x5 = sorpresa</button>
    <span id="wsu_count" class="wsu_count">0 / 5</span>
  </div>`,main:()=>{let t=0;e(`#wsu_demo_btn`).off(`click`).on(`click`,()=>{t++,e(`#wsu_count`).text(`${t} / 5`),t>=5&&(t=0,e(`#wsu_count`).text(`🎉 Combo!`),setTimeout(()=>e(`#wsu_count`).text(`0 / 5`),1500))})}},o=[{id:`basico`,titulo:`Uso basico`,desc:`Selector + callback + numero de clics. El callback se ejecuta cada N clics acumulados.`,html:`&lt;button id="mi-btn"&gt;Clic!&lt;/button&gt;`,js:`import { wiSuma } from './widev.js';

// Ejecutar cada 5 clics
wiSuma('#mi-btn', () => {
  console.log('¡5 clics alcanzados!');
}, 5);`,demo:()=>`<div class="cp_demo_row">
      <button id="wsu_d1" class="wsu_btn">Clic aqui <span id="wsu_c1" class="wsu_badge">0/5</span></button>
    </div>`},{id:`easter`,titulo:`Easter egg`,desc:`Patron tipico: accion secreta al clicar el logo varias veces. Sin que el usuario lo sepa.`,html:`&lt;div id="logo"&gt;Mi Logo&lt;/div&gt;`,js:`import { wiSuma, Notificacion } from './widev.js';

// Easter egg: 7 clics en el logo
wiSuma('#logo', () => {
  Notificacion('🎉 ¡Encontraste el easter egg!', 'success', 5000);
  activarAnimacion();
}, 7);`,demo:()=>`<div class="cp_demo_row">
      <button id="wsu_easter" class="wsu_btn wsu_secret">
        <i class="fas fa-bug"></i> Logo secreto <span id="wsu_ec" class="wsu_badge">0/7</span>
      </button>
    </div>`},{id:`combo`,titulo:`Sistema de combos`,desc:`Implementa un sistema de combos para juegos o interfaces gamificadas. Reaccion inmediata.`,html:`&lt;button id="btn-combo"&gt;COMBO!&lt;/button&gt;`,js:`import { wiSuma, Notificacion } from './widev.js';

wiSuma('#btn-combo', () => {
  Notificacion('¡COMBO x10! 🔥', 'success');
  sumarPuntos(100);
}, 10);

wiSuma('#btn-combo', () => {
  Notificacion('¡MEGA COMBO! 💥', 'warning');
}, 20);`,demo:()=>`<div class="cp_demo_row">
      <button id="wsu_combo" class="wsu_btn" style="background:color-mix(in srgb,#A855F7 15%,var(--bg));border-color:#A855F7;color:#A855F7">
        <i class="fas fa-fire"></i> COMBO! <span id="wsu_cc" class="wsu_badge">0/5</span>
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
    <div class="doc_side_hd"><i class="fas fa-plus-circle" style="color:${i}"></i><span>wiSuma</span><span class="cp_badge">v${t.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-plus-circle" style="color:${i}"></i> wiSuma</h1>
      <p>Ejecuta un callback cada N clics en un elemento. Ideal para easter eggs, combos en juegos e interfaces gamificadas.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-mouse-pointer"></i> N clics</span>
        <span class="doc_bdg"><i class="fas fa-egg"></i> Easter eggs</span>
        <span class="doc_bdg"><i class="fas fa-fire"></i> Combos</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Prism&&Prism.highlightAll(),e(document).on(`click.wsu`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.wsu`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)});let t=0,i=0,a=0;e(document).on(`click.wsu`,`#wsu_d1`,()=>{t++,e(`#wsu_c1`).text(`${t}/5`),t>=5&&(t=0,e(`#wsu_c1`).text(`🎉`),setTimeout(()=>e(`#wsu_c1`).text(`0/5`),1500))}),e(document).on(`click.wsu`,`#wsu_easter`,()=>{i++,e(`#wsu_ec`).text(`${i}/7`),i>=7&&(i=0,e(`#wsu_ec`).text(`🔥`),setTimeout(()=>e(`#wsu_ec`).text(`0/7`),2e3))}),e(document).on(`click.wsu`,`#wsu_combo`,()=>{a++,e(`#wsu_cc`).text(`${a}/5`),a>=5&&(a=0,e(`#wsu_cc`).text(`💥`),setTimeout(()=>e(`#wsu_cc`).text(`0/5`),1500))}),n(o.map(e=>e.id),`.doc_nav_a`)},d=()=>e(document).off(`.wsu`);export{d as cleanup,u as init,l as render,a as wi};