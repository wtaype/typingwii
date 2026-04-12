import './wicode.css';
import $ from 'jquery';
import { wiCode, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#00D4FF';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'wicode', fn:wiCode, nom:'Bloques de Codigo', icon:'fa-code', color:COLOR,
  desc:'Syntax highlight con Prism.js y boton copiar integrado. Una sola linea.',
  code:`wiCode('pre code');`,
  demo:() => `<div class="cp_demo_row"><pre><code class="language-js">const msg = 'Hola Widev!';\nconsole.log(msg);</code></pre></div>`,
  main:() => { if(window.Prism) Prism.highlightAll(); wiCode('#cp_wicode .cp_demo pre code'); }
};

const secciones = [
  { id:'simple', titulo:'Ejemplo simple',
    desc:'Un bloque JavaScript con una sola linea. wiCode le agrega el boton copiar al instante.',
    html:`&lt;pre&gt;&lt;code class="language-js"&gt;\n  const saludo = 'Hola mundo';\n  console.log(saludo);\n&lt;/code&gt;&lt;/pre&gt;`,
    js:`import { wiCode } from './widev.js';\nwiCode('pre code');`,
    demo:() => `<pre><code class="language-js">const saludo = 'Hola mundo';\nconsole.log(saludo);</code></pre>` },
  { id:'mediano', titulo:'Ejemplo mediano',
    desc:'Multiples bloques. wiCode activa el boton copiar en todos los que coincidan con el selector.',
    html:`&lt;pre&gt;&lt;code class="language-js"&gt;const suma = (a, b) =&gt; a + b;\nconsole.log(suma(3, 4)); // 7\n&lt;/code&gt;&lt;/pre&gt;\n\n&lt;pre&gt;&lt;code class="language-css"&gt;.card {\n  padding: 2vh;\n  background: var(--wb);\n}\n&lt;/code&gt;&lt;/pre&gt;\n\n&lt;pre&gt;&lt;code class="language-html"&gt;&amp;lt;button&amp;gt;Guardar&amp;lt;/button&amp;gt;\n&lt;/code&gt;&lt;/pre&gt;`,
    js:`import { wiCode } from './widev.js';\nwiCode('pre code');`,
    demo:() => `<div style="display:flex;flex-direction:column;gap:1vh;width:100%">
        <pre><code class="language-js">const suma = (a, b) => a + b;\nconsole.log(suma(3, 4)); // 7</code></pre>
        <pre><code class="language-css">.card {\n  padding: 2vh;\n  border-radius: 1.2vh;\n  background: var(--wb);\n}</code></pre>
        <pre><code class="language-html">&lt;button class="cp_btn"&gt;\n  Guardar\n&lt;/button&gt;</code></pre></div>` },
  { id:'completo', titulo:'Ejemplo completo',
    desc:'Integracion con Prism.js. Se colorea primero con highlightAll(), luego wiCode agrega el boton.',
    html:`&lt;pre&gt;&lt;code class="language-js"&gt;\n  import { wiCode, wiVista, wiSpin }\n    from './widev.js';\n\n  if (window.Prism) Prism.highlightAll();\n\n  wiCode('pre code');\n  wiVista('.card', null, { anim: 'wi_fadeUp' });\n  wiSpin('#btn', true, 'Guardando...');\n&lt;/code&gt;&lt;/pre&gt;`,
    js:`import { wiCode } from './widev.js';\nif (window.Prism) Prism.highlightAll();\nwiCode('pre code');`,
    demo:() => `<pre><code class="language-js">import { wiCode, wiVista, wiSpin }\n  from './widev.js';\n\nif (window.Prism) Prism.highlightAll();\n\nwiCode('pre code');\nwiVista('.card', null, { anim: 'wi_fadeUp' });\nwiSpin('#btn', true, 'Guardando...');</code></pre>` },
  { id:'avanzado', titulo:'Ejemplo avanzado',
    desc:'Selectores flexibles: clases, IDs y atributos. El primer argumento acepta cualquier selector CSS.',
    html:`&lt;pre class="bloque-docs"&gt;\n  &lt;code class="language-js"&gt;const config = { debug: false };&lt;/code&gt;\n&lt;/pre&gt;\n\n&lt;pre id="mi-bloque"&gt;\n  &lt;code class="language-css"&gt;.header { height: 5vh; }&lt;/code&gt;\n&lt;/pre&gt;\n\n&lt;pre data-highlight&gt;\n  &lt;code class="language-html"&gt;&amp;lt;div class="box"&amp;gt;&amp;lt;/div&amp;gt;&lt;/code&gt;\n&lt;/pre&gt;`,
    js:`import { wiCode } from './widev.js';\nwiCode('.bloque-docs code');\nwiCode('#mi-bloque code');\nwiCode('[data-highlight] code');`,
    demo:() => `<div style="display:flex;flex-direction:column;gap:1.2vh;width:100%">
        <pre class="bloque-docs"><code class="language-js">// .bloque-docs code\nconst config = { debug: false, env: 'prod' };</code></pre>
        <pre id="mi-bloque"><code class="language-css">/* #mi-bloque code */\n.header { height: 5vh; position: fixed; }</code></pre>
        <pre data-highlight><code class="language-html">&lt;!-- [data-highlight] code --&gt;\n&lt;div class="contenedor"&gt;&lt;/div&gt;</code></pre></div>` },
  { id:'superavanzado', titulo:'Personalizar — Ingresa tu codigo',
    desc:'Elige un ejemplo, escribe tu codigo, selecciona el lenguaje y presiona "Probar codigo". El resultado se renderiza en vivo.',
    demo:() => `<div style="width:100%;display:flex;flex-direction:column;gap:1.5vh">
      <div class="wcd_toolbar">
        <span class="wcd_toolbar_lbl">Ejemplos:</span>
        <button class="wcd_ej" data-ej="1">Ejemplo 1</button>
        <button class="wcd_ej" data-ej="2">Ejemplo 2</button>
        <button class="wcd_ej" data-ej="3">Ejemplo 3</button>
        <select id="wcd_lang"><option value="js">JavaScript</option><option value="css">CSS</option><option value="html">HTML</option></select>
        <button id="wcd_btn_probar" class="wcd_btn_pro"><i class="fas fa-play"></i> Probar codigo</button>
      </div>
      <textarea id="wcd_input" rows="5">const saludo = 'Hola mundo';\nconsole.log(saludo);</textarea>
      <div id="wcd_resultado"></div></div>` }
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
    ${s.html ? `<div class="doc_tabs">${codeBlk('html',`dp_h_${s.id}`,s.html)}${codeBlk('js',`dp_j_${s.id}`,s.js)}</div>` : ''}
    <div class="doc_demo">
      ${s.html ? '<div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>' : ''}
      ${s.demo()}
    </div>
  </section>`;

export const render = () => `
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-code" style="color:${COLOR}"></i><span>wiCode</span><span class="cp_badge">v${wiCode.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-code" style="color:${COLOR}"></i> wiCode</h1>
      <p>Convierte cualquier <code>&lt;pre&gt;&lt;code&gt;</code> en un bloque con syntax highlight y boton copiar. Una sola linea.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Una linea</span>
        <span class="doc_bdg"><i class="fas fa-copy"></i> Boton copiar</span>
        <span class="doc_bdg"><i class="fas fa-paint-brush"></i> Prism.js</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();

  const ejemplos = {
    1: { lang:'js',   code:`const saludo = 'Hola mundo';\nconsole.log(saludo);` },
    2: { lang:'css',  code:`.card {\n  padding: 2vh;\n  border-radius: 1.2vh;\n  background: var(--wb);\n}` },
    3: { lang:'html', code:`<button class="btn">\n  Guardar\n</button>` }
  };
  const langMap = { js:'javascript', css:'css', html:'html' };

  const renderResult = () => {
    const raw = $('#wcd_input').val().trim();
    if (!raw) return $('#wcd_resultado').empty();
    $('#wcd_resultado').html(`<pre><code class="language-${langMap[$('#wcd_lang').val()||'js']}">${esc(raw)}</code></pre>`);
    if (window.Prism) Prism.highlightAll();
  };
  renderResult();

  $(document).on('click.wcd', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wcd', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  }).on('click.wcd', '.wcd_ej', function() {
    const ej = ejemplos[$(this).data('ej')]; if (!ej) return;
    $('#wcd_input').val(ej.code); $('#wcd_lang').val(ej.lang);
    $('.wcd_ej').removeClass('active'); $(this).addClass('active');
    renderResult();
  }).on('click.wcd', '#wcd_btn_probar', renderResult);

  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.wcd');