import{t as e}from"./vendor-BDh6mtVu.js";import{o as t,p as n,y as r}from"./widev-vIOvrNXT.js";var i=`#06B6D4`,a={id:`getls`,fn:t,nom:`Leer de localStorage`,icon:`fa-download`,color:i,desc:`Lee un valor guardado con savels. Si expiro o no existe devuelve null automaticamente.`,code:`const user = getls('usuario');
if (user) mostrarPerfil(user);`,demo:()=>`<div class="cp_demo_row">
    <div class="gls_chip"><i class="fas fa-check"></i> Valida expiracion automaticamente</div>
  </div>`,main:()=>{}},o=[{id:`basico`,titulo:`Leer un valor`,desc:`Pasa la clave y devuelve el valor original. Si expiro o no existe devuelve null.`,html:``,js:`import { getls } from './widev.js';

const usuario = getls('usuario');

if (usuario) {
  console.log(usuario.nombre); // 'Wilder'
} else {
  // No existe o expiro
  redirigirALogin();
}`,demo:()=>`<div class="gls_demo">
      <div class="gls_row"><code>getls('existe')</code> → valor original</div>
      <div class="gls_row"><code>getls('expirado')</code> → null (auto-elimina)</div>
      <div class="gls_row"><code>getls('noexiste')</code> → null</div>
    </div>`},{id:`tipos`,titulo:`Tipos preservados`,desc:`getls deserializa automaticamente. Recuperas exactamente el mismo tipo que guardaste con savels.`,html:``,js:`import { savels, getls } from './widev.js';

savels('config', { tema: 'Cielo', puntos: 42 });

const config = getls('config');
console.log(config.tema);   // 'Cielo'
console.log(config.puntos); // 42 (number, no string)`,demo:()=>`<div class="gls_demo">
      <div class="gls_row"><code>objeto.campo</code> → acceso directo</div>
      <div class="gls_row"><code>array[0]</code> → indexable</div>
      <div class="gls_row"><code>typeof num === 'number'</code> → tipado correcto</div>
    </div>`},{id:`patron`,titulo:`Patron comun`,desc:`Verificar sesion, cargar preferencias o cachear datos de API con una sola linea.`,html:``,js:`import { getls, savels } from './widev.js';

// Cargar usuario o redirigir
const user = getls('user') ?? redirect('/login');

// Cache de API
let datos = getls('datos_api');
if (!datos) {
  datos = await fetchAPI();
  savels('datos_api', datos, 1);
}`,demo:()=>`<div class="gls_demo">
      <div class="gls_row"><i class="fas fa-user" style="color:#06B6D4"></i> Verificar sesion</div>
      <div class="gls_row"><i class="fas fa-palette" style="color:#06B6D4"></i> Cargar preferencias</div>
      <div class="gls_row"><i class="fas fa-database" style="color:#06B6D4"></i> Cache de API</div>
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
    <div class="doc_side_hd"><i class="fas fa-download" style="color:${i}"></i><span>getls</span><span class="cp_badge">v${t.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-download" style="color:${i}"></i> getls</h1>
      <p>Lee valores guardados con <code>savels</code>. Valida expiracion automaticamente. Devuelve <code>null</code> si no existe o ya expiro.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-check"></i> Valida expiracion</span>
        <span class="doc_bdg"><i class="fas fa-code"></i> Tipos preservados</span>
        <span class="doc_bdg"><i class="fas fa-trash"></i> Auto-limpia</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Prism&&Prism.highlightAll(),e(document).on(`click.gls`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.gls`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),n(o.map(e=>e.id),`.doc_nav_a`)},d=()=>e(document).off(`.gls`);export{d as cleanup,u as init,l as render,a as wi};