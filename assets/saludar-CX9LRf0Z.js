import{t as e}from"./vendor-BDh6mtVu.js";import{p as t,r as n,y as r}from"./widev-vIOvrNXT.js";var i=`#F97316`,a={id:`saludar`,fn:n,nom:`Saludo Dinamico`,icon:`fa-hand-spock`,color:i,desc:`Devuelve el saludo correcto segun la hora del dia. Buenos dias, tardes o noches automatico.`,code:`const saludo = Saludar();
// "Buenos días, " / "Buenas tardes, " / "Buenas noches, "`,demo:()=>`<div class="cp_demo_row">
    <div class="sal_badge"><i class="fas fa-clock"></i> ${n()}<b>Widev</b></div>
  </div>`,main:()=>{}},o=[{id:`basico`,titulo:`Uso basico`,desc:`Llama a Saludar() y concatena el nombre. Devuelve el saludo adecuado segun la hora actual.`,html:`&lt;p id="saludo"&gt;&lt;/p&gt;`,js:`import { Saludar } from './widev.js';

const nombre = 'Wilder';
document.getElementById('saludo').textContent = Saludar() + nombre;`,demo:()=>`<div class="sal_demo">
      <p class="sal_text"><span class="sal_hora">${n()}</span><span class="sal_nombre">Wilder</span> 👋</p>
    </div>`},{id:`dinamico`,titulo:`Con nombre dinamico`,desc:`Combina Saludar() con el nombre del usuario autenticado para un saludo personalizado.`,html:`&lt;h2 id="bienvenida"&gt;&lt;/h2&gt;`,js:`import { Saludar, wiAuth } from './widev.js';

const user = wiAuth.user;
const nombre = user?.nombre || 'visitante';

document.getElementById('bienvenida').textContent =
  Saludar() + nombre + '!';`,demo:()=>`<div class="sal_demo">
      <p class="sal_text"><span class="sal_hora">${n()}</span><span class="sal_nombre">usuario!</span></p>
    </div>`},{id:`rangos`,titulo:`Rangos de hora`,desc:`La funcion evalua la hora actual y devuelve el saludo correspondiente segun tres rangos del dia.`,html:``,js:`// Logica interna de Saludar():
const hrs = new Date().getHours();

if (hrs >= 5  && hrs < 12) return 'Buenos días, ';
if (hrs >= 12 && hrs < 18) return 'Buenas tardes, ';
return 'Buenas noches, ';`,demo:()=>`<div style="display:flex;gap:1vh;flex-wrap:wrap">
      <div class="sal_rng"><b>5:00 - 11:59</b> Buenos días</div>
      <div class="sal_rng"><b>12:00 - 17:59</b> Buenas tardes</div>
      <div class="sal_rng"><b>18:00 - 4:59</b> Buenas noches</div>
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
    <div class="doc_side_hd"><i class="fas fa-hand-wave" style="color:${i}"></i><span>Saludar</span><span class="cp_badge">v${n.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-hand-wave" style="color:${i}"></i> Saludar</h1>
      <p>Devuelve el saludo correcto segun la hora del dia. Concatena con el nombre del usuario para mensajes de bienvenida dinamicos.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-clock"></i> Hora automatica</span>
        <span class="doc_bdg"><i class="fas fa-user"></i> Nombre custom</span>
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Puro JS</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Prism&&Prism.highlightAll(),e(document).on(`click.sal`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.sal`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),t(o.map(e=>e.id),`.doc_nav_a`)},d=()=>e(document).off(`.sal`);export{d as cleanup,u as init,l as render,a as wi};