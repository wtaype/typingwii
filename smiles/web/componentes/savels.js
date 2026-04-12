import './savels.css';
import $ from 'jquery';
import { savels, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#84CC16';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'savels', fn:savels, nom:'Guardar en localStorage', icon:'fa-save', color:COLOR,
  desc:'Guarda cualquier valor en localStorage con expiracion automatica configurable en horas.',
  code:`savels('usuario', { nombre: 'Wilder' });\nsavels('config', datos, 72); // dura 72h`,
  demo:() => `<div class="cp_demo_row">
    <div class="sls_chip"><i class="fas fa-database"></i> key + valor + expiracion</div>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'basico', titulo:'Guardar un valor',
    desc:'Pasa la clave, el valor (cualquier tipo) y las horas de expiracion. Por defecto 24 horas.',
    html:``,
    js:`import { savels } from './widev.js';\n\nsavels('usuario', { nombre: 'Wilder', rol: 'admin' });\nsavels('config',  { tema: 'Cielo', idioma: 'es' });\nsavels('token',   'abc123xyz', 1); // expira en 1 hora`,
    demo:() => `<div class="sls_demo">
      <div class="sls_row"><code>savels('usuario', obj)</code> → 24h</div>
      <div class="sls_row"><code>savels('token', '...', 1)</code> → 1h</div>
      <div class="sls_row"><code>savels('config', obj, 168)</code> → 7 dias</div>
    </div>` },
  { id:'tipos', titulo:'Tipos de valor',
    desc:'savels serializa automaticamente. Guarda strings, numeros, objetos, arrays, booleanos.',
    html:``,
    js:`import { savels } from './widev.js';\n\nsavels('nombre',   'Wilder');          // string\nsavels('edad',     25);                 // numero\nsavels('activo',   true);               // boolean\nsavels('colores',  ['rojo','azul']);     // array\nsavels('usuario',  { id:1, rol:'dev' }); // objeto`,
    demo:() => `<div style="display:flex;gap:.8vh;flex-wrap:wrap">
      <div class="sls_chip">String</div>
      <div class="sls_chip">Number</div>
      <div class="sls_chip">Boolean</div>
      <div class="sls_chip">Array</div>
      <div class="sls_chip">Object</div>
    </div>` },
  { id:'expiracion', titulo:'Expiracion configurable',
    desc:'El tercer argumento define las horas que durara el dato. Al expirar, getls devuelve null.',
    html:``,
    js:`import { savels } from './widev.js';\n\nsavels('sesion',   datos, 8);    // 8 horas\nsavels('cache',    datos, 0.5);  // 30 minutos\nsavels('prefs',    datos, 720);  // 30 dias\nsavels('token',    datos, 24);   // 1 dia (default)`,
    demo:() => `<div class="sls_demo">
      <div class="sls_row"><b>0.5h</b> → 30 minutos</div>
      <div class="sls_row"><b>1h</b> → 1 hora</div>
      <div class="sls_row"><b>24h</b> → 1 dia (default)</div>
      <div class="sls_row"><b>720h</b> → 30 dias</div>
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
    <div class="doc_side_hd"><i class="fas fa-save" style="color:${COLOR}"></i><span>savels</span><span class="cp_badge">v${savels.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-save" style="color:${COLOR}"></i> savels</h1>
      <p>Guarda cualquier tipo de valor en <code>localStorage</code> con expiracion automatica. Compatible con <code>getls</code> y <code>removels</code>.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-database"></i> localStorage</span>
        <span class="doc_bdg"><i class="fas fa-clock"></i> Expiracion</span>
        <span class="doc_bdg"><i class="fas fa-code"></i> Cualquier tipo</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.sls', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.sls', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.sls');
