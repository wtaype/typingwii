import './notificacion.css';
import $ from 'jquery';
import { Notificacion, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#EC4899';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'notificacion', fn:Notificacion, nom:'Notificaciones Toast', icon:'fa-bell', color:COLOR,
  desc:'Toasts animados en esquina con 4 tipos: success, error, warning, info. Se cierran solos.',
  code:`Notificacion('Guardado correctamente', 'success');\nNotificacion('Error al conectar', 'error', 5000);`,
  demo:() => `<div class="cp_demo_row">
    <button onclick="Notificacion('¡Guardado!','success')" class="not_btn not_success">Success</button>
    <button onclick="Notificacion('Error al guardar','error')" class="not_btn not_error">Error</button>
    <button onclick="Notificacion('Revisa los datos','warning')" class="not_btn not_warning">Warning</button>
    <button onclick="Notificacion('Nuevo mensaje','info')" class="not_btn not_info">Info</button>
  </div>`,
  main:() => { window.Notificacion = Notificacion; }
};

const secciones = [
  { id:'tipos', titulo:'Tipos de notificacion',
    desc:'Cuatro tipos disponibles: success, error, warning, info. Cada uno tiene icono y color propio.',
    html:``,
    js:`import { Notificacion } from './widev.js';\n\nNotificacion('Guardado correctamente', 'success');\nNotificacion('Error al conectar',       'error');\nNotificacion('Revisa los datos',        'warning');\nNotificacion('Nuevo mensaje recibido',  'info');`,
    demo:() => `<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="not_btn not_success" onclick="Notificacion('Guardado correctamente','success')"><i class="fas fa-check-circle"></i> Success</button>
      <button class="not_btn not_error"   onclick="Notificacion('Error al conectar','error')"><i class="fas fa-times-circle"></i> Error</button>
      <button class="not_btn not_warning" onclick="Notificacion('Revisa los datos','warning')"><i class="fas fa-exclamation-triangle"></i> Warning</button>
      <button class="not_btn not_info"    onclick="Notificacion('Nuevo mensaje','info')"><i class="fas fa-info-circle"></i> Info</button>
    </div>` },
  { id:'tiempo', titulo:'Tiempo personalizado',
    desc:'El tercer argumento controla cuantos milisegundos dura la notificacion. Por defecto 3000ms.',
    html:``,
    js:`import { Notificacion } from './widev.js';\n\nNotificacion('Rapida',   'info',    1500);\nNotificacion('Normal',   'success', 3000);\nNotificacion('Lenta',    'warning', 6000);\nNotificacion('Muy lenta','error',   10000);`,
    demo:() => `<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="not_btn not_info"    onclick="Notificacion('Rapida 1.5s','info',1500)">1.5s</button>
      <button class="not_btn not_success" onclick="Notificacion('Normal 3s','success',3000)">3s</button>
      <button class="not_btn not_warning" onclick="Notificacion('Lenta 6s','warning',6000)">6s</button>
    </div>` },
  { id:'multiple', titulo:'Multiples notificaciones',
    desc:'Cada llamada apila una nueva notificacion. Se cierran individualmente o al hacer clic en X.',
    html:``,
    js:`import { Notificacion } from './widev.js';\n\n// Se apilan automaticamente\nNotificacion('Cargando datos...', 'info', 2000);\nNotificacion('Procesando...',     'warning', 3000);\nNotificacion('¡Listo!',           'success', 4000);`,
    demo:() => `<div class="cp_demo_row">
      <button class="not_btn not_info" onclick="setTimeout(()=>Notificacion('Cargando...','info',2000),0);setTimeout(()=>Notificacion('Procesando...','warning',2500),300);setTimeout(()=>Notificacion('Listo!','success',3000),600)">
        <i class="fas fa-layer-group"></i> Apilar 3
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
    <div class="doc_tabs">${codeBlk('js',`dp_j_${s.id}`,s.js)}</div>
    <div class="doc_demo">
      <div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>
      ${s.demo()}
    </div>
  </section>`;

export const render = () => `
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-bell" style="color:${COLOR}"></i><span>Notificacion</span><span class="cp_badge">v${Notificacion.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-bell" style="color:${COLOR}"></i> Notificacion</h1>
      <p>Toasts animados que aparecen en la esquina y se cierran solos. Cuatro tipos con icono y color. Se apilan automaticamente.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-layer-group"></i> Se apilan</span>
        <span class="doc_bdg"><i class="fas fa-clock"></i> Auto-cierre</span>
        <span class="doc_bdg"><i class="fas fa-palette"></i> 4 tipos</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  window.Notificacion = Notificacion;
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.not', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.not', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => { $(document).off('.not'); delete window.Notificacion; };
