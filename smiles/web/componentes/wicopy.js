import './wicopy.css';
import $ from 'jquery';
import { wicopy, wiScroll } from '../../widev.js';

const COLOR = '#22C55E';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'wicopy', fn:wicopy, nom:'Copiar al Portapapeles', icon:'fa-copy', color:COLOR,
  desc:'Copia cualquier texto al portapapeles con feedback visual opcional en el elemento clickeado.',
  code:`wicopy('Texto a copiar');\nwicopy(texto, btnElement, '¡Copiado!');`,
  demo:() => `<div class="cp_demo_row">
    <button class="wcp_btn" onclick="wicopy('¡Hola desde widev!', this, '¡Copiado!')">
      <i class="fas fa-copy"></i> Copiar texto
    </button>
    <input id="wcp_inp" value="Texto de prueba" readonly style="flex:1;max-width:20ch">
    <button class="wcp_btn" onclick="wicopy(document.getElementById('wcp_inp').value, this, '¡Listo!')">
      <i class="fas fa-clipboard"></i> Copiar input
    </button>
  </div>`,
  main:() => { window.wicopy = wicopy; }
};

const secciones = [
  { id:'basico', titulo:'Copiar texto',
    desc:'Pasa el texto como primer argumento. Se copia al portapapeles usando la Clipboard API.',
    html:`&lt;button id="btn-copiar"&gt;Copiar&lt;/button&gt;`,
    js:`import { wicopy } from './widev.js';\n\nwicopy('Texto a copiar');\n\n// Con elemento para feedback visual\n$('#btn-copiar').on('click', function() {\n  wicopy('Texto a copiar', this, '¡Copiado!');\n});`,
    demo:() => `<div class="cp_demo_row">
      <button class="wcp_btn" onclick="wicopy('Texto de ejemplo copiado!', this, '¡Copiado!')">
        <i class="fas fa-copy"></i> Copiar texto
      </button>
    </div>` },
  { id:'input', titulo:'Copiar desde input',
    desc:'Copia el valor de un input directamente. Ideal para campos de codigo, tokens o URLs.',
    html:`&lt;input id="token" value="mi-token-secreto"&gt;\n&lt;button id="btn-copy"&gt;&lt;i class="fas fa-copy"&gt;&lt;/i&gt;&lt;/button&gt;`,
    js:`import { wicopy } from './widev.js';\n\n$('#btn-copy').on('click', function() {\n  const token = $('#token').val();\n  wicopy(token, this, '¡Token copiado!');\n});`,
    demo:() => `<div class="cp_demo_row">
      <input id="wcp_token" value="wi-token-abc123xyz" readonly style="flex:1">
      <button class="wcp_btn" onclick="wicopy(document.getElementById('wcp_token').value, this, '¡Token copiado!')">
        <i class="fas fa-copy"></i> Copiar
      </button>
    </div>` },
  { id:'feedback', titulo:'Feedback visual',
    desc:'El segundo argumento es el elemento que muestra el feedback. El tercero es el mensaje. Se restaura solo.',
    html:`&lt;button id="btn"&gt;&lt;i class="fas fa-copy"&gt;&lt;/i&gt; Copiar&lt;/button&gt;`,
    js:`import { wicopy } from './widev.js';\n\n// Sin feedback\nwicopy('Texto');\n\n// Con elemento + mensaje\nwicopy('Texto', btn, '¡Copiado!');\n\n// El boton muestra '¡Copiado!' y se restaura automaticamente`,
    demo:() => `<div class="cp_demo_row" style="flex-wrap:wrap;gap:.8vh">
      <button class="wcp_btn" onclick="wicopy('Sin feedback')">Sin feedback</button>
      <button class="wcp_btn" onclick="wicopy('Con feedback', this, '¡Listo! ✓')">Con feedback</button>
      <button class="wcp_btn" onclick="wicopy('Custom msg', this, 'Guardado 🎉')">Custom msg</button>
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
    <div class="doc_side_hd"><i class="fas fa-copy" style="color:${COLOR}"></i><span>wicopy</span><span class="cp_badge">v${wicopy.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-copy" style="color:${COLOR}"></i> wicopy</h1>
      <p>Copia cualquier texto al portapapeles con <code>Clipboard API</code>. Muestra feedback visual en el elemento clickeado y se restaura automaticamente.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-clipboard"></i> Clipboard API</span>
        <span class="doc_bdg"><i class="fas fa-eye"></i> Feedback visual</span>
        <span class="doc_bdg"><i class="fas fa-undo"></i> Auto-restaura</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  window.wicopy = wicopy;
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.wcp', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wcp', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => { $(document).off('.wcp'); delete window.wicopy; };
