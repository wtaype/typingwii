import{t as e}from"./vendor-BDh6mtVu.js";import{p as t,u as n,y as r}from"./widev-vIOvrNXT.js";var i=`#00D4FF`,a=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`),o={id:`wicode`,fn:n,nom:`Bloques de Codigo`,icon:`fa-code`,color:i,desc:`Syntax highlight con Prism.js y boton copiar integrado. Una sola linea.`,code:`wiCode('pre code');`,demo:()=>`<div class="cp_demo_row"><pre><code class="language-js">const msg = 'Hola Widev!';
console.log(msg);</code></pre></div>`,main:()=>{window.Prism&&Prism.highlightAll(),n(`#cp_wicode .cp_demo pre code`)}},s=[{id:`simple`,titulo:`Ejemplo simple`,desc:`Un bloque JavaScript con una sola linea. wiCode le agrega el boton copiar al instante.`,html:`&lt;pre&gt;&lt;code class="language-js"&gt;
  const saludo = 'Hola mundo';
  console.log(saludo);
&lt;/code&gt;&lt;/pre&gt;`,js:`import { wiCode } from './widev.js';
wiCode('pre code');`,demo:()=>`<pre><code class="language-js">const saludo = 'Hola mundo';
console.log(saludo);</code></pre>`},{id:`mediano`,titulo:`Ejemplo mediano`,desc:`Multiples bloques. wiCode activa el boton copiar en todos los que coincidan con el selector.`,html:`&lt;pre&gt;&lt;code class="language-js"&gt;const suma = (a, b) =&gt; a + b;
console.log(suma(3, 4)); // 7
&lt;/code&gt;&lt;/pre&gt;

&lt;pre&gt;&lt;code class="language-css"&gt;.card {
  padding: 2vh;
  background: var(--wb);
}
&lt;/code&gt;&lt;/pre&gt;

&lt;pre&gt;&lt;code class="language-html"&gt;&amp;lt;button&amp;gt;Guardar&amp;lt;/button&amp;gt;
&lt;/code&gt;&lt;/pre&gt;`,js:`import { wiCode } from './widev.js';
wiCode('pre code');`,demo:()=>`<div style="display:flex;flex-direction:column;gap:1vh;width:100%">
        <pre><code class="language-js">const suma = (a, b) => a + b;
console.log(suma(3, 4)); // 7</code></pre>
        <pre><code class="language-css">.card {
  padding: 2vh;
  border-radius: 1.2vh;
  background: var(--wb);
}</code></pre>
        <pre><code class="language-html">&lt;button class="cp_btn"&gt;
  Guardar
&lt;/button&gt;</code></pre></div>`},{id:`completo`,titulo:`Ejemplo completo`,desc:`Integracion con Prism.js. Se colorea primero con highlightAll(), luego wiCode agrega el boton.`,html:`&lt;pre&gt;&lt;code class="language-js"&gt;
  import { wiCode, wiVista, wiSpin }
    from './widev.js';

  if (window.Prism) Prism.highlightAll();

  wiCode('pre code');
  wiVista('.card', null, { anim: 'wi_fadeUp' });
  wiSpin('#btn', true, 'Guardando...');
&lt;/code&gt;&lt;/pre&gt;`,js:`import { wiCode } from './widev.js';
if (window.Prism) Prism.highlightAll();
wiCode('pre code');`,demo:()=>`<pre><code class="language-js">import { wiCode, wiVista, wiSpin }
  from './widev.js';

if (window.Prism) Prism.highlightAll();

wiCode('pre code');
wiVista('.card', null, { anim: 'wi_fadeUp' });
wiSpin('#btn', true, 'Guardando...');</code></pre>`},{id:`avanzado`,titulo:`Ejemplo avanzado`,desc:`Selectores flexibles: clases, IDs y atributos. El primer argumento acepta cualquier selector CSS.`,html:`&lt;pre class="bloque-docs"&gt;
  &lt;code class="language-js"&gt;const config = { debug: false };&lt;/code&gt;
&lt;/pre&gt;

&lt;pre id="mi-bloque"&gt;
  &lt;code class="language-css"&gt;.header { height: 5vh; }&lt;/code&gt;
&lt;/pre&gt;

&lt;pre data-highlight&gt;
  &lt;code class="language-html"&gt;&amp;lt;div class="box"&amp;gt;&amp;lt;/div&amp;gt;&lt;/code&gt;
&lt;/pre&gt;`,js:`import { wiCode } from './widev.js';
wiCode('.bloque-docs code');
wiCode('#mi-bloque code');
wiCode('[data-highlight] code');`,demo:()=>`<div style="display:flex;flex-direction:column;gap:1.2vh;width:100%">
        <pre class="bloque-docs"><code class="language-js">// .bloque-docs code
const config = { debug: false, env: 'prod' };</code></pre>
        <pre id="mi-bloque"><code class="language-css">/* #mi-bloque code */
.header { height: 5vh; position: fixed; }</code></pre>
        <pre data-highlight><code class="language-html">&lt;!-- [data-highlight] code --&gt;
&lt;div class="contenedor"&gt;&lt;/div&gt;</code></pre></div>`},{id:`superavanzado`,titulo:`Personalizar — Ingresa tu codigo`,desc:`Elige un ejemplo, escribe tu codigo, selecciona el lenguaje y presiona "Probar codigo". El resultado se renderiza en vivo.`,demo:()=>`<div style="width:100%;display:flex;flex-direction:column;gap:1.5vh">
      <div class="wcd_toolbar">
        <span class="wcd_toolbar_lbl">Ejemplos:</span>
        <button class="wcd_ej" data-ej="1">Ejemplo 1</button>
        <button class="wcd_ej" data-ej="2">Ejemplo 2</button>
        <button class="wcd_ej" data-ej="3">Ejemplo 3</button>
        <select id="wcd_lang"><option value="js">JavaScript</option><option value="css">CSS</option><option value="html">HTML</option></select>
        <button id="wcd_btn_probar" class="wcd_btn_pro"><i class="fas fa-play"></i> Probar codigo</button>
      </div>
      <textarea id="wcd_input" rows="5">const saludo = 'Hola mundo';
console.log(saludo);</textarea>
      <div id="wcd_resultado"></div></div>`}],c=(e,t,n)=>`
  <div class="doc_code_blk">
    <div class="doc_code_lbl"><span class="doc_code_tag doc_tag_${e}">${e.toUpperCase()}</span></div>
    <pre id="${t}"><code class="language-${e}">${n}</code></pre>
    <button class="doc_copy" data-pre="${t}" title="Copiar ${e.toUpperCase()}"><i class="fas fa-copy"></i></button>
  </div>`,l=e=>`
  <section class="doc_sec" id="${e.id}">
    <h2 class="doc_h2">${e.titulo}</h2>
    <p class="doc_p">${e.desc}</p>
    ${e.html?`<div class="doc_tabs">${c(`html`,`dp_h_${e.id}`,e.html)}${c(`js`,`dp_j_${e.id}`,e.js)}</div>`:``}
    <div class="doc_demo">
      ${e.html?`<div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>`:``}
      ${e.demo()}
    </div>
  </section>`,u=()=>`
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-code" style="color:${i}"></i><span>wiCode</span><span class="cp_badge">v${n.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${o.nom}</p><p class="doc_side_desc">${o.desc}</p></div>
    <nav class="doc_nav">${s.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-code" style="color:${i}"></i> wiCode</h1>
      <p>Convierte cualquier <code>&lt;pre&gt;&lt;code&gt;</code> en un bloque con syntax highlight y boton copiar. Una sola linea.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Una linea</span>
        <span class="doc_bdg"><i class="fas fa-copy"></i> Boton copiar</span>
        <span class="doc_bdg"><i class="fas fa-paint-brush"></i> Prism.js</span>
      </div>
    </div>
    ${s.map(l).join(``)}
  </main>
</div>`,d=()=>{window.Prism&&Prism.highlightAll();let n={1:{lang:`js`,code:`const saludo = 'Hola mundo';
console.log(saludo);`},2:{lang:`css`,code:`.card {
  padding: 2vh;
  border-radius: 1.2vh;
  background: var(--wb);
}`},3:{lang:`html`,code:`<button class="btn">
  Guardar
</button>`}},i={js:`javascript`,css:`css`,html:`html`},o=()=>{let t=e(`#wcd_input`).val().trim();if(!t)return e(`#wcd_resultado`).empty();e(`#wcd_resultado`).html(`<pre><code class="language-${i[e(`#wcd_lang`).val()||`js`]}">${a(t)}</code></pre>`),window.Prism&&Prism.highlightAll()};o(),e(document).on(`click.wcd`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.wcd`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}).on(`click.wcd`,`.wcd_ej`,function(){let t=n[e(this).data(`ej`)];t&&(e(`#wcd_input`).val(t.code),e(`#wcd_lang`).val(t.lang),e(`.wcd_ej`).removeClass(`active`),e(this).addClass(`active`),o())}).on(`click.wcd`,`#wcd_btn_probar`,o),t(s.map(e=>e.id),`.doc_nav_a`)},f=()=>e(document).off(`.wcd`);export{f as cleanup,d as init,u as render,o as wi};