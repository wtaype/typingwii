import './wiauth.css';
import $ from 'jquery';
import { wiAuth, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#EF4444';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'wiauth', fn:wiAuth, nom:'Autenticacion Reactiva', icon:'fa-user-shield', color:COLOR,
  desc:'Gestiona el estado de sesion de forma reactiva. Login, logout y listeners de auth en una sola API.',
  code:`wiAuth(loadUser, renderUI);\nwiAuth.login(userData);\nwiAuth.logout();`,
  demo:() => `<div class="cp_demo_row">
    <div class="wau_badge ${wiAuth.logged ? 'wau_on' : ''}">
      <i class="fas fa-circle"></i> ${wiAuth.logged ? 'Sesion activa' : 'Sin sesion'}
    </div>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'listener', titulo:'Auth listener',
    desc:'Registra una funcion que se ejecuta automaticamente cuando el estado de autenticacion cambia.',
    html:`&lt;div id="ui"&gt;&lt;/div&gt;`,
    js:`import { wiAuth } from './widev.js';\n\nwiAuth(\n  async (reload) => {\n    // cargar datos del usuario\n    if (reload) await loadUser();\n  },\n  () => {\n    // renderizar la UI\n    renderApp();\n  }\n);`,
    demo:() => `<div class="wau_demo">
      <div class="wau_row"><i class="fas fa-check-circle" style="color:#10B981"></i> Listener registrado</div>
      <div class="wau_row"><i class="fas fa-sync" style="color:#F59E0B"></i> Se ejecuta al cambiar auth</div>
    </div>` },
  { id:'login', titulo:'Login',
    desc:'Guarda los datos del usuario en localStorage con expiracion configurable. Por defecto 24 horas.',
    html:`&lt;button id="btn-login"&gt;Iniciar sesion&lt;/button&gt;`,
    js:`import { wiAuth } from './widev.js';\n\nconst user = {\n  uid: 'abc123',\n  email: 'user@ejemplo.com',\n  nombre: 'Wilder'\n};\n\nwiAuth.login(user);       // 24h por defecto\nwiAuth.login(user, 72);  // 72 horas`,
    demo:() => `<div class="wau_demo">
      <div class="wau_row"><code>wiAuth.login(user)</code> → guarda en localStorage</div>
      <div class="wau_row"><code>wiAuth.login(user, 72)</code> → expira en 72h</div>
    </div>` },
  { id:'logout', titulo:'Logout',
    desc:'Elimina la sesion del localStorage y emite el evento a todos los listeners registrados.',
    html:`&lt;button id="btn-salir"&gt;Cerrar sesion&lt;/button&gt;`,
    js:`import { wiAuth } from './widev.js';\n\n// Cerrar sesion\nwiAuth.logout();\n\n// Consultar estado\nconsole.log(wiAuth.logged); // false\nconsole.log(wiAuth.user);   // null`,
    demo:() => `<div class="wau_demo">
      <div class="wau_row"><code>wiAuth.logout()</code> → limpia localStorage</div>
      <div class="wau_row"><code>wiAuth.logged</code> → <span style="color:#10B981">true</span> / <span style="color:#EF4444">false</span></div>
      <div class="wau_row"><code>wiAuth.user</code> → objeto usuario o null</div>
    </div>` },
  { id:'emit', titulo:'Emit — notificar cambios',
    desc:'Usa emit para notificar manualmente a todos los listeners cuando el estado de auth cambia.',
    html:``,
    js:`import { wiAuth } from './widev.js';\n\n// Registrar listener adicional\nwiAuth.on(async () => {\n  console.log('Auth cambio:', wiAuth.user);\n  actualizarHeader();\n});\n\n// Emitir cambio manualmente\nwiAuth.emit(nuevoUser);`,
    demo:() => `<div class="wau_demo">
      <div class="wau_row"><code>wiAuth.on(fn)</code> → registra listener</div>
      <div class="wau_row"><code>wiAuth.emit(user)</code> → notifica a todos</div>
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
    <div class="doc_side_hd"><i class="fas fa-user-shield" style="color:${COLOR}"></i><span>wiAuth</span><span class="cp_badge">v${wiAuth.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-user-shield" style="color:${COLOR}"></i> wiAuth</h1>
      <p>Gestiona la sesion de forma reactiva con <code>localStorage</code>. Registra listeners, hace login/logout y consulta el estado con <code>wiAuth.logged</code> y <code>wiAuth.user</code>.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Reactivo</span>
        <span class="doc_bdg"><i class="fas fa-database"></i> localStorage</span>
        <span class="doc_bdg"><i class="fas fa-clock"></i> Expiracion</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.wau', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wau', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.wau');
