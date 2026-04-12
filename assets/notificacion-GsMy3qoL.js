import{t as e}from"./vendor-BDh6mtVu.js";import{n as t,p as n,y as r}from"./widev-vIOvrNXT.js";var i=`#EC4899`,a={id:`notificacion`,fn:t,nom:`Notificaciones Toast`,icon:`fa-bell`,color:i,desc:`Toasts animados en esquina con 4 tipos: success, error, warning, info. Se cierran solos.`,code:`Notificacion('Guardado correctamente', 'success');
Notificacion('Error al conectar', 'error', 5000);`,demo:()=>`<div class="cp_demo_row">
    <button onclick="Notificacion('¡Guardado!','success')" class="not_btn not_success">Success</button>
    <button onclick="Notificacion('Error al guardar','error')" class="not_btn not_error">Error</button>
    <button onclick="Notificacion('Revisa los datos','warning')" class="not_btn not_warning">Warning</button>
    <button onclick="Notificacion('Nuevo mensaje','info')" class="not_btn not_info">Info</button>
  </div>`,main:()=>{window.Notificacion=t}},o=[{id:`tipos`,titulo:`Tipos de notificacion`,desc:`Cuatro tipos disponibles: success, error, warning, info. Cada uno tiene icono y color propio.`,html:``,js:`import { Notificacion } from './widev.js';

Notificacion('Guardado correctamente', 'success');
Notificacion('Error al conectar',       'error');
Notificacion('Revisa los datos',        'warning');
Notificacion('Nuevo mensaje recibido',  'info');`,demo:()=>`<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="not_btn not_success" onclick="Notificacion('Guardado correctamente','success')"><i class="fas fa-check-circle"></i> Success</button>
      <button class="not_btn not_error"   onclick="Notificacion('Error al conectar','error')"><i class="fas fa-times-circle"></i> Error</button>
      <button class="not_btn not_warning" onclick="Notificacion('Revisa los datos','warning')"><i class="fas fa-exclamation-triangle"></i> Warning</button>
      <button class="not_btn not_info"    onclick="Notificacion('Nuevo mensaje','info')"><i class="fas fa-info-circle"></i> Info</button>
    </div>`},{id:`tiempo`,titulo:`Tiempo personalizado`,desc:`El tercer argumento controla cuantos milisegundos dura la notificacion. Por defecto 3000ms.`,html:``,js:`import { Notificacion } from './widev.js';

Notificacion('Rapida',   'info',    1500);
Notificacion('Normal',   'success', 3000);
Notificacion('Lenta',    'warning', 6000);
Notificacion('Muy lenta','error',   10000);`,demo:()=>`<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="not_btn not_info"    onclick="Notificacion('Rapida 1.5s','info',1500)">1.5s</button>
      <button class="not_btn not_success" onclick="Notificacion('Normal 3s','success',3000)">3s</button>
      <button class="not_btn not_warning" onclick="Notificacion('Lenta 6s','warning',6000)">6s</button>
    </div>`},{id:`multiple`,titulo:`Multiples notificaciones`,desc:`Cada llamada apila una nueva notificacion. Se cierran individualmente o al hacer clic en X.`,html:``,js:`import { Notificacion } from './widev.js';

// Se apilan automaticamente
Notificacion('Cargando datos...', 'info', 2000);
Notificacion('Procesando...',     'warning', 3000);
Notificacion('¡Listo!',           'success', 4000);`,demo:()=>`<div class="cp_demo_row">
      <button class="not_btn not_info" onclick="setTimeout(()=>Notificacion('Cargando...','info',2000),0);setTimeout(()=>Notificacion('Procesando...','warning',2500),300);setTimeout(()=>Notificacion('Listo!','success',3000),600)">
        <i class="fas fa-layer-group"></i> Apilar 3
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
    <div class="doc_tabs">${s(`js`,`dp_j_${e.id}`,e.js)}</div>
    <div class="doc_demo">
      <div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>
      ${e.demo()}
    </div>
  </section>`,l=()=>`
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-bell" style="color:${i}"></i><span>Notificacion</span><span class="cp_badge">v${t.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-bell" style="color:${i}"></i> Notificacion</h1>
      <p>Toasts animados que aparecen en la esquina y se cierran solos. Cuatro tipos con icono y color. Se apilan automaticamente.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-layer-group"></i> Se apilan</span>
        <span class="doc_bdg"><i class="fas fa-clock"></i> Auto-cierre</span>
        <span class="doc_bdg"><i class="fas fa-palette"></i> 4 tipos</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Notificacion=t,window.Prism&&Prism.highlightAll(),e(document).on(`click.not`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.not`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),n(o.map(e=>e.id),`.doc_nav_a`)},d=()=>{e(document).off(`.not`),delete window.Notificacion};export{d as cleanup,u as init,l as render,a as wi};