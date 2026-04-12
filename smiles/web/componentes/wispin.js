import './wispin.css';
import $ from 'jquery';
import { wiSpin, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#F59E0B';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'wispin', fn:wiSpin, nom:'Spinner de Carga', icon:'fa-spinner', color:COLOR,
  desc:'Bloquea botones con spinner y texto personalizado. Restaura con false. Una sola funcion.',
  code:`wiSpin('#btn', true, 'Guardando...');\n// restaurar:\nwiSpin('#btn', false);`,
  demo:() => `<div class="cp_demo_row">
    <button id="wsp_card_btn" onclick="this._t&&clearTimeout(this._t);wiSpin(this,true,'Guardando...');this._t=setTimeout(()=>wiSpin(this,false),2000)">
      <i class="fas fa-save"></i> Guardar
    </button>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'activar', titulo:'Activar spinner',
    desc:'Pasa el selector del boton, true y el texto que se mostrara durante la carga.',
    html:`&lt;button id="btn-guardar"&gt;Guardar&lt;/button&gt;`,
    js:`import { wiSpin } from './widev.js';\nwiSpin('#btn-guardar', true, 'Guardando...');`,
    demo:() => `<div class="cp_demo_row">
      <button id="wsp_d1"><i class="fas fa-save"></i> Guardar</button>
      <button class="wsp_trigger" data-target="#wsp_d1" data-msg="Guardando...">Activar</button>
      <button class="wsp_off" data-target="#wsp_d1">Restaurar</button>
    </div>` },
  { id:'desactivar', titulo:'Desactivar spinner',
    desc:'Patron tipico: activar antes del await, desactivar en finally para garantizar restauracion.',
    html:`&lt;button id="btn-enviar"&gt;Enviar&lt;/button&gt;`,
    js:`import { wiSpin } from './widev.js';\n\nasync function enviar() {\n  wiSpin('#btn-enviar', true, 'Enviando...');\n  try {\n    await fetch('/api/datos');\n  } finally {\n    wiSpin('#btn-enviar', false);\n  }\n}`,
    demo:() => `<div class="cp_demo_row">
      <button id="wsp_d2">Enviar formulario</button>
      <button class="wsp_trigger" data-target="#wsp_d2" data-msg="Enviando..." data-delay="2000">Simular envio</button>
    </div>` },
  { id:'texto', titulo:'Texto personalizado',
    desc:'El tercer argumento adapta el mensaje al contexto de cada accion.',
    html:`&lt;button id="btn"&gt;Accion&lt;/button&gt;`,
    js:`import { wiSpin } from './widev.js';\nwiSpin('#btn', true, 'Cargando datos...');\nwiSpin('#btn', true, 'Subiendo archivo...');\nwiSpin('#btn', true, 'Procesando pago...');`,
    demo:() => `<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button id="wsp_d3">Accion</button>
      <button class="wsp_trigger" data-target="#wsp_d3" data-msg="Cargando datos...">Datos</button>
      <button class="wsp_trigger" data-target="#wsp_d3" data-msg="Subiendo archivo...">Archivo</button>
      <button class="wsp_trigger" data-target="#wsp_d3" data-msg="Procesando pago...">Pago</button>
    </div>` },
  { id:'multiple', titulo:'Multiples botones',
    desc:'Cada boton se gestiona de forma independiente. Puedes tener varios activos al mismo tiempo.',
    html:`&lt;button id="a"&gt;A&lt;/button&gt;\n&lt;button id="b"&gt;B&lt;/button&gt;`,
    js:`import { wiSpin } from './widev.js';\nwiSpin('#a', true, 'Cargando A...');\nwiSpin('#b', true, 'Cargando B...');\n// Se restauran de forma independiente\nwiSpin('#a', false);\nwiSpin('#b', false);`,
    demo:() => `<div class="cp_demo_row">
      <button id="wsp_ma">Boton A</button>
      <button id="wsp_mb">Boton B</button>
      <button class="wsp_trigger" data-target="#wsp_ma" data-msg="Procesando A...">Spin A</button>
      <button class="wsp_trigger" data-target="#wsp_mb" data-msg="Procesando B...">Spin B</button>
      <button class="wsp_off" data-target="#wsp_ma,#wsp_mb">Reset</button>
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
    ${s.html ? `<div class="doc_tabs">${codeBlk('html',`dp_h_${s.id}`,s.html)}${codeBlk('js',`dp_j_${s.id}`,s.js)}</div>` : ''}
    <div class="doc_demo">
      ${s.html ? '<div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>' : ''}
      ${s.demo()}
    </div>
  </section>`;

export const render = () => `
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-spinner" style="color:${COLOR}"></i><span>wiSpin</span><span class="cp_badge">v${wiSpin.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-spinner" style="color:${COLOR}"></i> wiSpin</h1>
      <p>Bloquea botones con un spinner y texto de carga. Restaura el estado original con <code>false</code>. Ideal para formularios y peticiones async.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-lock"></i> Bloquea boton</span>
        <span class="doc_bdg"><i class="fas fa-spinner fa-spin"></i> Spinner</span>
        <span class="doc_bdg"><i class="fas fa-font"></i> Texto custom</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.wsp', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wsp', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  }).on('click.wsp', '.wsp_trigger', function() {
    const $t = $($(this).data('target'));
    const delay = +$(this).data('delay') || 2000;
    $t.each(function() { wiSpin(this, true, $(this).closest('[data-msg]').length ? '' : ''); });
    wiSpin($t[0], true, $(this).data('msg'));
    setTimeout(() => $t.each(function() { wiSpin(this, false); }), delay);
  }).on('click.wsp', '.wsp_off', function() {
    $($(this).data('target').split(',')).each(function() { wiSpin(this, false); });
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.wsp');
