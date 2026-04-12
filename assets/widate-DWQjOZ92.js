import{t as e}from"./vendor-BDh6mtVu.js";import{d as t,p as n,y as r}from"./widev-vIOvrNXT.js";var i=`#D97706`,a={id:`widate`,fn:t,nom:`Fechas Firebase`,icon:`fa-calendar-alt`,color:i,desc:`Formatea timestamps de Firebase Firestore. Guarda y lee fechas con cache en localStorage.`,code:`const f = wiDate(timestamp);
f.get(doc.fecha, 'DD/MM/YYYY');
f.save(doc);`,demo:()=>`<div class="cp_demo_row">
    <div class="wdt_chip"><i class="fas fa-calendar-alt"></i> ${new Date().toLocaleDateString(`es-PE`,{day:`2-digit`,month:`short`,year:`numeric`})}</div>
  </div>`,main:()=>{}},o=[{id:`formato`,titulo:`Formatear fecha`,desc:`Pasa el timestamp de Firestore y el formato deseado. devuelve una cadena de texto formateada.`,html:``,js:`import { wiDate } from './widev.js';

const f = wiDate(doc.timestamp);

f.get(doc.createdAt, 'DD/MM/YYYY');     // '08/03/2026'
f.get(doc.createdAt, 'YYYY-MM-DD');     // '2026-03-08'
f.get(doc.createdAt, 'DD MMM YYYY');    // '08 mar 2026'
f.get(doc.createdAt, 'HH:mm');          // '14:32'`,demo:()=>`<div class="wdt_demo">
      <div class="wdt_row"><code>'DD/MM/YYYY'</code> → 08/03/2026</div>
      <div class="wdt_row"><code>'DD MMM YYYY'</code> → 08 mar 2026</div>
      <div class="wdt_row"><code>'HH:mm'</code> → 14:32</div>
    </div>`},{id:`guardar`,titulo:`Guardar con cache`,desc:`save() guarda el documento con la fecha actual y lo cachea en localStorage para acceso rapido.`,html:``,js:`import { wiDate } from './widev.js';

// Al guardar un documento
const f = wiDate(serverTimestamp());
f.save(docData);

// Al leer (con cache)
const data = f.get(docSnap, 'DD/MM/YYYY');`,demo:()=>`<div class="wdt_demo">
      <div class="wdt_row"><i class="fas fa-save" style="color:#D97706"></i> f.save() → guarda + cachea</div>
      <div class="wdt_row"><i class="fas fa-bolt" style="color:#F59E0B"></i> f.get() → desde cache</div>
    </div>`},{id:`formatos`,titulo:`Formatos disponibles`,desc:`Soporta los formatos mas comunes para mostrar fechas en interfaces en espanol.`,html:``,js:`// Formatos de fecha
'DD/MM/YYYY'     → 08/03/2026
'YYYY-MM-DD'     → 2026-03-08
'DD MMM YYYY'    → 08 mar 2026
'DD MMMM YYYY'   → 08 marzo 2026
'HH:mm'          → 14:32
'DD/MM/YYYY HH:mm' → 08/03/2026 14:32`,demo:()=>`<div style="display:flex;gap:.8vh;flex-wrap:wrap">
      <div class="wdt_fmt">DD/MM/YYYY</div>
      <div class="wdt_fmt">YYYY-MM-DD</div>
      <div class="wdt_fmt">DD MMM YYYY</div>
      <div class="wdt_fmt">HH:mm</div>
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
    <div class="doc_side_hd"><i class="fas fa-calendar-alt" style="color:${i}"></i><span>wiDate</span><span class="cp_badge">v${t.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-calendar-alt" style="color:${i}"></i> wiDate</h1>
      <p>Formatea timestamps de Firebase Firestore. Cachea resultados y soporta multiples formatos de fecha para interfaces en espanol.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-fire"></i> Firebase ready</span>
        <span class="doc_bdg"><i class="fas fa-database"></i> Cache auto</span>
        <span class="doc_bdg"><i class="fas fa-calendar"></i> Multi-formato</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Prism&&Prism.highlightAll(),e(document).on(`click.wdt`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.wdt`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),n(o.map(e=>e.id),`.doc_nav_a`)},d=()=>e(document).off(`.wdt`);export{d as cleanup,u as init,l as render,a as wi};