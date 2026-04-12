import{t as e}from"./vendor-BDh6mtVu.js";import{p as t,t as n,y as r}from"./widev-vIOvrNXT.js";var i=`#14B8A6`,a={id:`mensaje`,fn:n,nom:`Mensajes de Alerta`,icon:`fa-comment-alt`,color:i,desc:`Muestra un alert inline con 4 tipos. Reemplaza el anterior automaticamente. Sin apilacion.`,code:`Mensaje('Datos guardados', 'success');
Mensaje('Campos requeridos', 'error');`,demo:()=>`<div class="cp_demo_row" style="flex-direction:column;gap:.8vh">
    <div class="cp_demo_row">
      <button onclick="Mensaje('Datos guardados correctamente','success')" class="nmsj_btn nmsj_s">Success</button>
      <button onclick="Mensaje('Error al procesar el formulario','error')" class="nmsj_btn nmsj_e">Error</button>
      <button onclick="Mensaje('Revisa los campos requeridos','warning')" class="nmsj_btn nmsj_w">Warning</button>
    </div>
  </div>`,main:()=>{window.Mensaje=n}},o=[{id:`tipos`,titulo:`Tipos disponibles`,desc:`Cuatro tipos: success, error, warning, info. El mensaje anterior se elimina antes de mostrar el nuevo.`,html:`&lt;div id="contenedor"&gt;&lt;/div&gt;`,js:`import { Mensaje } from './widev.js';

Mensaje('Datos guardados',       'success');
Mensaje('Campos incompletos',    'error');
Mensaje('Revisa los datos',      'warning');
Mensaje('Cambios sin guardar',   'info');`,demo:()=>`<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="nmsj_btn nmsj_s" onclick="Mensaje('Datos guardados','success')"><i class="fas fa-check-circle"></i> Success</button>
      <button class="nmsj_btn nmsj_e" onclick="Mensaje('Error al procesar','error')"><i class="fas fa-times-circle"></i> Error</button>
      <button class="nmsj_btn nmsj_w" onclick="Mensaje('Revisa los campos','warning')"><i class="fas fa-exclamation-triangle"></i> Warning</button>
      <button class="nmsj_btn nmsj_i" onclick="Mensaje('Cambios sin guardar','info')"><i class="fas fa-info-circle"></i> Info</button>
    </div>`},{id:`formulario`,titulo:`En formularios`,desc:`Patron tipico: mostrar feedback inline justo sobre el boton submit del formulario.`,html:`&lt;form id="mi-form"&gt;
  &lt;input type="email" id="email" /&gt;
  &lt;button type="submit"&gt;Enviar&lt;/button&gt;
&lt;/form&gt;`,js:`import { Mensaje } from './widev.js';

$('#mi-form').on('submit', async function(e) {
  e.preventDefault();
  const email = $('#email').val();

  if (!email) {
    Mensaje('El email es requerido', 'error');
    return;
  }

  await guardar({ email });
  Mensaje('Guardado correctamente', 'success');
});`,demo:()=>`<div style="display:flex;flex-direction:column;gap:.8vh;width:100%;max-width:40ch">
      <input type="email" placeholder="tucorreo@ejemplo.com" id="nmsj_email">
      <button class="nmsj_btn nmsj_s" onclick="$('#nmsj_email').val() ? Mensaje('Email valido ✓','success') : Mensaje('El email es requerido','error')" style="width:fit-content">Validar</button>
    </div>`},{id:`reemplaza`,titulo:`Reemplaza el anterior`,desc:`A diferencia de Notificacion, Mensaje elimina el mensaje anterior antes de mostrar uno nuevo.`,html:``,js:`import { Mensaje } from './widev.js';

// Solo se ve el ultimo
Mensaje('Cargando...', 'info');
Mensaje('Procesando...', 'warning');
Mensaje('¡Listo!', 'success'); // ← este gana`,demo:()=>`<div class="cp_demo_row">
      <button class="nmsj_btn nmsj_i" onclick="Mensaje('Cargando...','info');setTimeout(()=>Mensaje('Procesando...','warning'),600);setTimeout(()=>Mensaje('Listo!','success'),1200)">
        <i class="fas fa-play"></i> Simular secuencia
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
    <div class="doc_side_hd"><i class="fas fa-comment-alt" style="color:${i}"></i><span>Mensaje</span><span class="cp_badge">v${n.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-comment-alt" style="color:${i}"></i> Mensaje</h1>
      <p>Alert inline que reemplaza el anterior automaticamente. Ideal para feedback de formularios. Sin apilacion, siempre un mensaje a la vez.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-exchange-alt"></i> Reemplaza</span>
        <span class="doc_bdg"><i class="fas fa-palette"></i> 4 tipos</span>
        <span class="doc_bdg"><i class="fas fa-align-left"></i> Inline</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Mensaje=n,window.Prism&&Prism.highlightAll(),e(document).on(`click.msj`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.msj`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),t(o.map(e=>e.id),`.doc_nav_a`)},d=()=>{e(document).off(`.msj`),delete window.Mensaje};export{d as cleanup,u as init,l as render,a as wi};