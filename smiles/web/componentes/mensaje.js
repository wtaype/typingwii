import './mensaje.css';
import $ from 'jquery';
import { Mensaje, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#14B8A6';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'mensaje', fn:Mensaje, nom:'Mensajes de Alerta', icon:'fa-comment-alt', color:COLOR,
  desc:'Muestra un alert inline con 4 tipos. Reemplaza el anterior automaticamente. Sin apilacion.',
  code:`Mensaje('Datos guardados', 'success');\nMensaje('Campos requeridos', 'error');`,
  demo:() => `<div class="cp_demo_row" style="flex-direction:column;gap:.8vh">
    <div class="cp_demo_row">
      <button onclick="Mensaje('Datos guardados correctamente','success')" class="nmsj_btn nmsj_s">Success</button>
      <button onclick="Mensaje('Error al procesar el formulario','error')" class="nmsj_btn nmsj_e">Error</button>
      <button onclick="Mensaje('Revisa los campos requeridos','warning')" class="nmsj_btn nmsj_w">Warning</button>
    </div>
  </div>`,
  main:() => { window.Mensaje = Mensaje; }
};

const secciones = [
  { id:'tipos', titulo:'Tipos disponibles',
    desc:'Cuatro tipos: success, error, warning, info. El mensaje anterior se elimina antes de mostrar el nuevo.',
    html:`&lt;div id="contenedor"&gt;&lt;/div&gt;`,
    js:`import { Mensaje } from './widev.js';\n\nMensaje('Datos guardados',       'success');\nMensaje('Campos incompletos',    'error');\nMensaje('Revisa los datos',      'warning');\nMensaje('Cambios sin guardar',   'info');`,
    demo:() => `<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="nmsj_btn nmsj_s" onclick="Mensaje('Datos guardados','success')"><i class="fas fa-check-circle"></i> Success</button>
      <button class="nmsj_btn nmsj_e" onclick="Mensaje('Error al procesar','error')"><i class="fas fa-times-circle"></i> Error</button>
      <button class="nmsj_btn nmsj_w" onclick="Mensaje('Revisa los campos','warning')"><i class="fas fa-exclamation-triangle"></i> Warning</button>
      <button class="nmsj_btn nmsj_i" onclick="Mensaje('Cambios sin guardar','info')"><i class="fas fa-info-circle"></i> Info</button>
    </div>` },
  { id:'formulario', titulo:'En formularios',
    desc:'Patron tipico: mostrar feedback inline justo sobre el boton submit del formulario.',
    html:`&lt;form id="mi-form"&gt;\n  &lt;input type="email" id="email" /&gt;\n  &lt;button type="submit"&gt;Enviar&lt;/button&gt;\n&lt;/form&gt;`,
    js:`import { Mensaje } from './widev.js';\n\n$('#mi-form').on('submit', async function(e) {\n  e.preventDefault();\n  const email = $('#email').val();\n\n  if (!email) {\n    Mensaje('El email es requerido', 'error');\n    return;\n  }\n\n  await guardar({ email });\n  Mensaje('Guardado correctamente', 'success');\n});`,
    demo:() => `<div style="display:flex;flex-direction:column;gap:.8vh;width:100%;max-width:40ch">
      <input type="email" placeholder="tucorreo@ejemplo.com" id="nmsj_email">
      <button class="nmsj_btn nmsj_s" onclick="$('#nmsj_email').val() ? Mensaje('Email valido ✓','success') : Mensaje('El email es requerido','error')" style="width:fit-content">Validar</button>
    </div>` },
  { id:'reemplaza', titulo:'Reemplaza el anterior',
    desc:'A diferencia de Notificacion, Mensaje elimina el mensaje anterior antes de mostrar uno nuevo.',
    html:``,
    js:`import { Mensaje } from './widev.js';\n\n// Solo se ve el ultimo\nMensaje('Cargando...', 'info');\nMensaje('Procesando...', 'warning');\nMensaje('¡Listo!', 'success'); // ← este gana`,
    demo:() => `<div class="cp_demo_row">
      <button class="nmsj_btn nmsj_i" onclick="Mensaje('Cargando...','info');setTimeout(()=>Mensaje('Procesando...','warning'),600);setTimeout(()=>Mensaje('Listo!','success'),1200)">
        <i class="fas fa-play"></i> Simular secuencia
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
    <div class="doc_side_hd"><i class="fas fa-comment-alt" style="color:${COLOR}"></i><span>Mensaje</span><span class="cp_badge">v${Mensaje.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-comment-alt" style="color:${COLOR}"></i> Mensaje</h1>
      <p>Alert inline que reemplaza el anterior automaticamente. Ideal para feedback de formularios. Sin apilacion, siempre un mensaje a la vez.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-exchange-alt"></i> Reemplaza</span>
        <span class="doc_bdg"><i class="fas fa-palette"></i> 4 tipos</span>
        <span class="doc_bdg"><i class="fas fa-align-left"></i> Inline</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  window.Mensaje = Mensaje;
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.msj', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.msj', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => { $(document).off('.msj'); delete window.Mensaje; };
