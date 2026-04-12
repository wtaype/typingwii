import{t as e}from"./vendor-BDh6mtVu.js";import{l as t,p as n,y as r}from"./widev-vIOvrNXT.js";var i=`#EF4444`,a={id:`wiauth`,fn:t,nom:`Autenticacion Reactiva`,icon:`fa-user-shield`,color:i,desc:`Gestiona el estado de sesion de forma reactiva. Login, logout y listeners de auth en una sola API.`,code:`wiAuth(loadUser, renderUI);
wiAuth.login(userData);
wiAuth.logout();`,demo:()=>`<div class="cp_demo_row">
    <div class="wau_badge ${t.logged?`wau_on`:``}">
      <i class="fas fa-circle"></i> ${t.logged?`Sesion activa`:`Sin sesion`}
    </div>
  </div>`,main:()=>{}},o=[{id:`listener`,titulo:`Auth listener`,desc:`Registra una funcion que se ejecuta automaticamente cuando el estado de autenticacion cambia.`,html:`&lt;div id="ui"&gt;&lt;/div&gt;`,js:`import { wiAuth } from './widev.js';

wiAuth(
  async (reload) => {
    // cargar datos del usuario
    if (reload) await loadUser();
  },
  () => {
    // renderizar la UI
    renderApp();
  }
);`,demo:()=>`<div class="wau_demo">
      <div class="wau_row"><i class="fas fa-check-circle" style="color:#10B981"></i> Listener registrado</div>
      <div class="wau_row"><i class="fas fa-sync" style="color:#F59E0B"></i> Se ejecuta al cambiar auth</div>
    </div>`},{id:`login`,titulo:`Login`,desc:`Guarda los datos del usuario en localStorage con expiracion configurable. Por defecto 24 horas.`,html:`&lt;button id="btn-login"&gt;Iniciar sesion&lt;/button&gt;`,js:`import { wiAuth } from './widev.js';

const user = {
  uid: 'abc123',
  email: 'user@ejemplo.com',
  nombre: 'Wilder'
};

wiAuth.login(user);       // 24h por defecto
wiAuth.login(user, 72);  // 72 horas`,demo:()=>`<div class="wau_demo">
      <div class="wau_row"><code>wiAuth.login(user)</code> → guarda en localStorage</div>
      <div class="wau_row"><code>wiAuth.login(user, 72)</code> → expira en 72h</div>
    </div>`},{id:`logout`,titulo:`Logout`,desc:`Elimina la sesion del localStorage y emite el evento a todos los listeners registrados.`,html:`&lt;button id="btn-salir"&gt;Cerrar sesion&lt;/button&gt;`,js:`import { wiAuth } from './widev.js';

// Cerrar sesion
wiAuth.logout();

// Consultar estado
console.log(wiAuth.logged); // false
console.log(wiAuth.user);   // null`,demo:()=>`<div class="wau_demo">
      <div class="wau_row"><code>wiAuth.logout()</code> → limpia localStorage</div>
      <div class="wau_row"><code>wiAuth.logged</code> → <span style="color:#10B981">true</span> / <span style="color:#EF4444">false</span></div>
      <div class="wau_row"><code>wiAuth.user</code> → objeto usuario o null</div>
    </div>`},{id:`emit`,titulo:`Emit — notificar cambios`,desc:`Usa emit para notificar manualmente a todos los listeners cuando el estado de auth cambia.`,html:``,js:`import { wiAuth } from './widev.js';

// Registrar listener adicional
wiAuth.on(async () => {
  console.log('Auth cambio:', wiAuth.user);
  actualizarHeader();
});

// Emitir cambio manualmente
wiAuth.emit(nuevoUser);`,demo:()=>`<div class="wau_demo">
      <div class="wau_row"><code>wiAuth.on(fn)</code> → registra listener</div>
      <div class="wau_row"><code>wiAuth.emit(user)</code> → notifica a todos</div>
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
    <div class="doc_side_hd"><i class="fas fa-user-shield" style="color:${i}"></i><span>wiAuth</span><span class="cp_badge">v${t.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-user-shield" style="color:${i}"></i> wiAuth</h1>
      <p>Gestiona la sesion de forma reactiva con <code>localStorage</code>. Registra listeners, hace login/logout y consulta el estado con <code>wiAuth.logged</code> y <code>wiAuth.user</code>.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Reactivo</span>
        <span class="doc_bdg"><i class="fas fa-database"></i> localStorage</span>
        <span class="doc_bdg"><i class="fas fa-clock"></i> Expiracion</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Prism&&Prism.highlightAll(),e(document).on(`click.wau`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.wau`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),n(o.map(e=>e.id),`.doc_nav_a`)},d=()=>e(document).off(`.wau`);export{d as cleanup,u as init,l as render,a as wi};