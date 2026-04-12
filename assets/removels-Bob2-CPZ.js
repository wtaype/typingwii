import{t as e}from"./vendor-BDh6mtVu.js";import{p as t,s as n,y as r}from"./widev-vIOvrNXT.js";var i=`#F43F5E`,a={id:`removels`,fn:n,nom:`Limpiar localStorage`,icon:`fa-trash-alt`,color:i,desc:`Elimina una o varias claves de localStorage en una sola llamada. Admite multiples argumentos.`,code:`removels('token');
removel('user', 'config', 'cache'); // multiples`,demo:()=>`<div class="cp_demo_row">
    <div class="rls_chip"><i class="fas fa-trash-alt"></i> removels('a', 'b', 'c')</div>
  </div>`,main:()=>{}},o=[{id:`una`,titulo:`Eliminar una clave`,desc:`Pasa la clave como argumento. La elimina del localStorage independientemente de su expiracion.`,html:``,js:`import { removels } from './widev.js';

removel('token');
removel('sesion_temporal');
removel('cache_api');`,demo:()=>`<div class="rls_demo">
      <div class="rls_row"><code>removels('token')</code> → eliminado</div>
      <div class="rls_row"><code>removels('cache')</code> → eliminado</div>
    </div>`},{id:`multiple`,titulo:`Multiples claves`,desc:`Pasa tantas claves como necesites. Todas se eliminan en una sola llamada.`,html:``,js:`import { removels } from './widev.js';

// Eliminar multiples a la vez
removel('user', 'token', 'config', 'cache');

// Tipico al cerrar sesion
removel('user', 'sesion', 'wiAuth');`,demo:()=>`<div class="rls_demo">
      <div class="rls_row"><code>removels('a', 'b', 'c')</code> → 3 eliminadas</div>
      <div class="rls_row"><code>removels(...array)</code> → spread compatible</div>
    </div>`},{id:`logout`,titulo:`Patron logout`,desc:`Patron tipico: al cerrar sesion limpiar todas las claves de autenticacion de una sola vez.`,html:`&lt;button id="btn-logout"&gt;Cerrar sesion&lt;/button&gt;`,js:`import { removels, wiAuth } from './widev.js';

$('#btn-logout').on('click', () => {
  removels('user', 'token', 'config', 'wiAuth');
  wiAuth.logout();
  location.href = '/login';
});`,demo:()=>`<div class="rls_demo">
      <div class="rls_row"><i class="fas fa-sign-out-alt" style="color:#F43F5E"></i> Limpia claves de auth</div>
      <div class="rls_row"><i class="fas fa-trash" style="color:#F43F5E"></i> Limpia cache de datos</div>
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
    <div class="doc_side_hd"><i class="fas fa-trash-alt" style="color:${i}"></i><span>removels</span><span class="cp_badge">v${n.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-trash-alt" style="color:${i}"></i> removels</h1>
      <p>Elimina claves de <code>localStorage</code>. Acepta multiples argumentos. Ideal para el flujo de logout.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-trash"></i> Elimina claves</span>
        <span class="doc_bdg"><i class="fas fa-layer-group"></i> Multiples args</span>
        <span class="doc_bdg"><i class="fas fa-sign-out-alt"></i> Patron logout</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Prism&&Prism.highlightAll(),e(document).on(`click.rls`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.rls`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),t(o.map(e=>e.id),`.doc_nav_a`)},d=()=>e(document).off(`.rls`);export{d as cleanup,u as init,l as render,a as wi};