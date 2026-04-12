import{t as e}from"./vendor-BDh6mtVu.js";import{p as t,y as n}from"./widev-vIOvrNXT.js";var r=`#22C55E`,i={id:`wicopy`,fn:n,nom:`Copiar al Portapapeles`,icon:`fa-copy`,color:r,desc:`Copia cualquier texto al portapapeles con feedback visual opcional en el elemento clickeado.`,code:`wicopy('Texto a copiar');
wicopy(texto, btnElement, '¡Copiado!');`,demo:()=>`<div class="cp_demo_row">
    <button class="wcp_btn" onclick="wicopy('¡Hola desde widev!', this, '¡Copiado!')">
      <i class="fas fa-copy"></i> Copiar texto
    </button>
    <input id="wcp_inp" value="Texto de prueba" readonly style="flex:1;max-width:20ch">
    <button class="wcp_btn" onclick="wicopy(document.getElementById('wcp_inp').value, this, '¡Listo!')">
      <i class="fas fa-clipboard"></i> Copiar input
    </button>
  </div>`,main:()=>{window.wicopy=n}},a=[{id:`basico`,titulo:`Copiar texto`,desc:`Pasa el texto como primer argumento. Se copia al portapapeles usando la Clipboard API.`,html:`&lt;button id="btn-copiar"&gt;Copiar&lt;/button&gt;`,js:`import { wicopy } from './widev.js';

wicopy('Texto a copiar');

// Con elemento para feedback visual
$('#btn-copiar').on('click', function() {
  wicopy('Texto a copiar', this, '¡Copiado!');
});`,demo:()=>`<div class="cp_demo_row">
      <button class="wcp_btn" onclick="wicopy('Texto de ejemplo copiado!', this, '¡Copiado!')">
        <i class="fas fa-copy"></i> Copiar texto
      </button>
    </div>`},{id:`input`,titulo:`Copiar desde input`,desc:`Copia el valor de un input directamente. Ideal para campos de codigo, tokens o URLs.`,html:`&lt;input id="token" value="mi-token-secreto"&gt;
&lt;button id="btn-copy"&gt;&lt;i class="fas fa-copy"&gt;&lt;/i&gt;&lt;/button&gt;`,js:`import { wicopy } from './widev.js';

$('#btn-copy').on('click', function() {
  const token = $('#token').val();
  wicopy(token, this, '¡Token copiado!');
});`,demo:()=>`<div class="cp_demo_row">
      <input id="wcp_token" value="wi-token-abc123xyz" readonly style="flex:1">
      <button class="wcp_btn" onclick="wicopy(document.getElementById('wcp_token').value, this, '¡Token copiado!')">
        <i class="fas fa-copy"></i> Copiar
      </button>
    </div>`},{id:`feedback`,titulo:`Feedback visual`,desc:`El segundo argumento es el elemento que muestra el feedback. El tercero es el mensaje. Se restaura solo.`,html:`&lt;button id="btn"&gt;&lt;i class="fas fa-copy"&gt;&lt;/i&gt; Copiar&lt;/button&gt;`,js:`import { wicopy } from './widev.js';

// Sin feedback
wicopy('Texto');

// Con elemento + mensaje
wicopy('Texto', btn, '¡Copiado!');

// El boton muestra '¡Copiado!' y se restaura automaticamente`,demo:()=>`<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="wcp_btn" onclick="wicopy('Sin feedback')">Sin feedback</button>
      <button class="wcp_btn" onclick="wicopy('Con feedback', this, '¡Listo! ✓')">Con feedback</button>
      <button class="wcp_btn" onclick="wicopy('Custom msg', this, 'Guardado 🎉')">Custom msg</button>
    </div>`}],o=(e,t,n)=>`
  <div class="doc_code_blk">
    <div class="doc_code_lbl"><span class="doc_code_tag doc_tag_${e}">${e.toUpperCase()}</span></div>
    <pre id="${t}"><code class="language-${e}">${n}</code></pre>
    <button class="doc_copy" data-pre="${t}" title="Copiar ${e.toUpperCase()}"><i class="fas fa-copy"></i></button>
  </div>`,s=e=>`
  <section class="doc_sec" id="${e.id}">
    <h2 class="doc_h2">${e.titulo}</h2>
    <p class="doc_p">${e.desc}</p>
    ${e.html?`<div class="doc_tabs">${o(`html`,`dp_h_${e.id}`,e.html)}${o(`js`,`dp_j_${e.id}`,e.js)}</div>`:`<div class="doc_tabs">${o(`js`,`dp_j_${e.id}`,e.js)}</div>`}
    <div class="doc_demo">
      <div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>
      ${e.demo()}
    </div>
  </section>`,c=()=>`
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-copy" style="color:${r}"></i><span>wicopy</span><span class="cp_badge">v${n.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${i.nom}</p><p class="doc_side_desc">${i.desc}</p></div>
    <nav class="doc_nav">${a.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-copy" style="color:${r}"></i> wicopy</h1>
      <p>Copia cualquier texto al portapapeles con <code>Clipboard API</code>. Muestra feedback visual en el elemento clickeado y se restaura automaticamente.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-clipboard"></i> Clipboard API</span>
        <span class="doc_bdg"><i class="fas fa-eye"></i> Feedback visual</span>
        <span class="doc_bdg"><i class="fas fa-undo"></i> Auto-restaura</span>
      </div>
    </div>
    ${a.map(s).join(``)}
  </main>
</div>`,l=()=>{window.wicopy=n,window.Prism&&Prism.highlightAll(),e(document).on(`click.wcp`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.wcp`,`.doc_copy`,function(){n(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),t(a.map(e=>e.id),`.doc_nav_a`)},u=()=>{e(document).off(`.wcp`),delete window.wicopy};export{u as cleanup,l as init,c as render,i as wi};