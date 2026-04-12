import{t as e}from"./vendor-BDh6mtVu.js";import{h as t,p as n,y as r}from"./widev-vIOvrNXT.js";var i=`#F59E0B`,a={id:`wispin`,fn:t,nom:`Spinner de Carga`,icon:`fa-spinner`,color:i,desc:`Bloquea botones con spinner y texto personalizado. Restaura con false. Una sola funcion.`,code:`wiSpin('#btn', true, 'Guardando...');
// restaurar:
wiSpin('#btn', false);`,demo:()=>`<div class="cp_demo_row">
    <button id="wsp_card_btn" onclick="this._t&&clearTimeout(this._t);wiSpin(this,true,'Guardando...');this._t=setTimeout(()=>wiSpin(this,false),2000)">
      <i class="fas fa-save"></i> Guardar
    </button>
  </div>`,main:()=>{}},o=[{id:`activar`,titulo:`Activar spinner`,desc:`Pasa el selector del boton, true y el texto que se mostrara durante la carga.`,html:`&lt;button id="btn-guardar"&gt;Guardar&lt;/button&gt;`,js:`import { wiSpin } from './widev.js';
wiSpin('#btn-guardar', true, 'Guardando...');`,demo:()=>`<div class="cp_demo_row">
      <button id="wsp_d1"><i class="fas fa-save"></i> Guardar</button>
      <button class="wsp_trigger" data-target="#wsp_d1" data-msg="Guardando...">Activar</button>
      <button class="wsp_off" data-target="#wsp_d1">Restaurar</button>
    </div>`},{id:`desactivar`,titulo:`Desactivar spinner`,desc:`Patron tipico: activar antes del await, desactivar en finally para garantizar restauracion.`,html:`&lt;button id="btn-enviar"&gt;Enviar&lt;/button&gt;`,js:`import { wiSpin } from './widev.js';

async function enviar() {
  wiSpin('#btn-enviar', true, 'Enviando...');
  try {
    await fetch('/api/datos');
  } finally {
    wiSpin('#btn-enviar', false);
  }
}`,demo:()=>`<div class="cp_demo_row">
      <button id="wsp_d2">Enviar formulario</button>
      <button class="wsp_trigger" data-target="#wsp_d2" data-msg="Enviando..." data-delay="2000">Simular envio</button>
    </div>`},{id:`texto`,titulo:`Texto personalizado`,desc:`El tercer argumento adapta el mensaje al contexto de cada accion.`,html:`&lt;button id="btn"&gt;Accion&lt;/button&gt;`,js:`import { wiSpin } from './widev.js';
wiSpin('#btn', true, 'Cargando datos...');
wiSpin('#btn', true, 'Subiendo archivo...');
wiSpin('#btn', true, 'Procesando pago...');`,demo:()=>`<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button id="wsp_d3">Accion</button>
      <button class="wsp_trigger" data-target="#wsp_d3" data-msg="Cargando datos...">Datos</button>
      <button class="wsp_trigger" data-target="#wsp_d3" data-msg="Subiendo archivo...">Archivo</button>
      <button class="wsp_trigger" data-target="#wsp_d3" data-msg="Procesando pago...">Pago</button>
    </div>`},{id:`multiple`,titulo:`Multiples botones`,desc:`Cada boton se gestiona de forma independiente. Puedes tener varios activos al mismo tiempo.`,html:`&lt;button id="a"&gt;A&lt;/button&gt;
&lt;button id="b"&gt;B&lt;/button&gt;`,js:`import { wiSpin } from './widev.js';
wiSpin('#a', true, 'Cargando A...');
wiSpin('#b', true, 'Cargando B...');
// Se restauran de forma independiente
wiSpin('#a', false);
wiSpin('#b', false);`,demo:()=>`<div class="cp_demo_row">
      <button id="wsp_ma">Boton A</button>
      <button id="wsp_mb">Boton B</button>
      <button class="wsp_trigger" data-target="#wsp_ma" data-msg="Procesando A...">Spin A</button>
      <button class="wsp_trigger" data-target="#wsp_mb" data-msg="Procesando B...">Spin B</button>
      <button class="wsp_off" data-target="#wsp_ma,#wsp_mb">Reset</button>
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
    <div class="doc_side_hd"><i class="fas fa-spinner" style="color:${i}"></i><span>wiSpin</span><span class="cp_badge">v${t.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-spinner" style="color:${i}"></i> wiSpin</h1>
      <p>Bloquea botones con un spinner y texto de carga. Restaura el estado original con <code>false</code>. Ideal para formularios y peticiones async.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-lock"></i> Bloquea boton</span>
        <span class="doc_bdg"><i class="fas fa-spinner fa-spin"></i> Spinner</span>
        <span class="doc_bdg"><i class="fas fa-font"></i> Texto custom</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Prism&&Prism.highlightAll(),e(document).on(`click.wsp`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.wsp`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}).on(`click.wsp`,`.wsp_trigger`,function(){let n=e(e(this).data(`target`)),r=+e(this).data(`delay`)||2e3;n.each(function(){t(this,!0,(e(this).closest(`[data-msg]`).length,``))}),t(n[0],!0,e(this).data(`msg`)),setTimeout(()=>n.each(function(){t(this,!1)}),r)}).on(`click.wsp`,`.wsp_off`,function(){e(e(this).data(`target`).split(`,`)).each(function(){t(this,!1)})}),n(o.map(e=>e.id),`.doc_nav_a`)},d=()=>e(document).off(`.wsp`);export{d as cleanup,u as init,l as render,a as wi};