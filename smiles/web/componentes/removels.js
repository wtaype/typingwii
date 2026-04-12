import './removels.css';
import $ from 'jquery';
import { removels, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#F43F5E';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'removels', fn:removels, nom:'Limpiar localStorage', icon:'fa-trash-alt', color:COLOR,
  desc:'Elimina una o varias claves de localStorage en una sola llamada. Admite multiples argumentos.',
  code:`removels('token');\nremovel('user', 'config', 'cache'); // multiples`,
  demo:() => `<div class="cp_demo_row">
    <div class="rls_chip"><i class="fas fa-trash-alt"></i> removels('a', 'b', 'c')</div>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'una', titulo:'Eliminar una clave',
    desc:'Pasa la clave como argumento. La elimina del localStorage independientemente de su expiracion.',
    html:``,
    js:`import { removels } from './widev.js';\n\nremovel('token');\nremovel('sesion_temporal');\nremovel('cache_api');`,
    demo:() => `<div class="rls_demo">
      <div class="rls_row"><code>removels('token')</code> → eliminado</div>
      <div class="rls_row"><code>removels('cache')</code> → eliminado</div>
    </div>` },
  { id:'multiple', titulo:'Multiples claves',
    desc:'Pasa tantas claves como necesites. Todas se eliminan en una sola llamada.',
    html:``,
    js:`import { removels } from './widev.js';\n\n// Eliminar multiples a la vez\nremovel('user', 'token', 'config', 'cache');\n\n// Tipico al cerrar sesion\nremovel('user', 'sesion', 'wiAuth');`,
    demo:() => `<div class="rls_demo">
      <div class="rls_row"><code>removels('a', 'b', 'c')</code> → 3 eliminadas</div>
      <div class="rls_row"><code>removels(...array)</code> → spread compatible</div>
    </div>` },
  { id:'logout', titulo:'Patron logout',
    desc:'Patron tipico: al cerrar sesion limpiar todas las claves de autenticacion de una sola vez.',
    html:`&lt;button id="btn-logout"&gt;Cerrar sesion&lt;/button&gt;`,
    js:`import { removels, wiAuth } from './widev.js';\n\n$('#btn-logout').on('click', () => {\n  removels('user', 'token', 'config', 'wiAuth');\n  wiAuth.logout();\n  location.href = '/login';\n});`,
    demo:() => `<div class="rls_demo">
      <div class="rls_row"><i class="fas fa-sign-out-alt" style="color:#F43F5E"></i> Limpia claves de auth</div>
      <div class="rls_row"><i class="fas fa-trash" style="color:#F43F5E"></i> Limpia cache de datos</div>
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
    <div class="doc_side_hd"><i class="fas fa-trash-alt" style="color:${COLOR}"></i><span>removels</span><span class="cp_badge">v${removels.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-trash-alt" style="color:${COLOR}"></i> removels</h1>
      <p>Elimina claves de <code>localStorage</code>. Acepta multiples argumentos. Ideal para el flujo de logout.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-trash"></i> Elimina claves</span>
        <span class="doc_bdg"><i class="fas fa-layer-group"></i> Multiples args</span>
        <span class="doc_bdg"><i class="fas fa-sign-out-alt"></i> Patron logout</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.rls', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.rls', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.rls');
