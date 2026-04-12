import './wismart.css';
import $ from 'jquery';
import { wiSmart, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#6366F1';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'wismart', fn:wiSmart, nom:'Carga Inteligente', icon:'fa-brain', color:COLOR,
  desc:'Carga CSS y JS solo cuando el usuario interactua. Evita bloquear el primer render.',
  code:`wiSmart({\n  css: ['https://fonts.googleapis.com/...'],\n  js:  [() => import('https://cdn.../prism.js')]\n});`,
  demo:() => `<div class="cp_demo_row">
    <div class="wsm_chip"><i class="fas fa-check-circle"></i> CSS lazy loaded</div>
    <div class="wsm_chip"><i class="fas fa-check-circle"></i> JS on interaction</div>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'basico', titulo:'Uso basico',
    desc:'Pasa un objeto con arrays css y js. wiSmart los carga cuando el usuario toca, hace scroll o hace clic.',
    html:``,
    js:`import { wiSmart } from './widev.js';\n\nwiSmart({\n  css: [\n    'https://fonts.googleapis.com/css2?family=Poppins&display=swap',\n    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css'\n  ],\n  js: [\n    () => import('https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js')\n  ]\n});`,
    demo:() => `<div class="wsm_demo">
      <div class="wsm_row"><i class="fas fa-file-code" style="color:#6366F1"></i> Fonts cargadas lazy</div>
      <div class="wsm_row"><i class="fas fa-file-code" style="color:#6366F1"></i> Font Awesome lazy</div>
      <div class="wsm_row"><i class="fas fa-file-alt" style="color:#F59E0B"></i> Prism.js on demand</div>
    </div>` },
  { id:'cache', titulo:'Cache inteligente',
    desc:'wiSmart recuerda si los recursos ya se cargaron (via localStorage). No los carga dos veces.',
    html:``,
    js:`import { wiSmart } from './widev.js';\n\n// Primera visita: espera interaccion\n// Segunda visita: carga inmediatamente\n// La clave 'wiSmart' en localStorage controla esto\nwiSmart({ css: [...], js: [...] });`,
    demo:() => `<div class="wsm_demo">
      <div class="wsm_row"><i class="fas fa-database" style="color:#10B981"></i> Primera visita: lazy</div>
      <div class="wsm_row"><i class="fas fa-bolt" style="color:#F59E0B"></i> Segunda visita: inmediato</div>
    </div>` },
  { id:'eventos', titulo:'Eventos de activacion',
    desc:'Se activa en cualquiera de estos eventos del usuario: touchstart, scroll, click, mousemove.',
    html:``,
    js:`import { wiSmart } from './widev.js';\n\n// Se activa al primer:\n// - touchstart (movil)\n// - scroll\n// - click\n// - mousemove\nwiSmart({ css: [...], js: [...] });`,
    demo:() => `<div style="display:flex;gap:1vh;flex-wrap:wrap">
      <div class="wsm_event"><i class="fas fa-hand-pointer"></i> touchstart</div>
      <div class="wsm_event"><i class="fas fa-mouse"></i> scroll</div>
      <div class="wsm_event"><i class="fas fa-hand-pointer"></i> click</div>
      <div class="wsm_event"><i class="fas fa-arrows-alt"></i> mousemove</div>
    </div>` },
  { id:'modulos', titulo:'Dynamic imports',
    desc:'El array js acepta funciones que devuelven import(). Permite cargar modulos ES6 de forma diferida.',
    html:``,
    js:`import { wiSmart } from './widev.js';\n\nwiSmart({\n  js: [\n    () => import('https://cdn.../prism.min.js'),\n    () => import('https://cdn.../chart.min.js'),\n    async () => {\n      const m = await import('./mi-modulo.js');\n      m.init();\n    }\n  ]\n});`,
    demo:() => `<div class="wsm_demo">
      <div class="wsm_row"><i class="fas fa-code" style="color:#6366F1"></i> () =&gt; import('prism.js')</div>
      <div class="wsm_row"><i class="fas fa-code" style="color:#6366F1"></i> () =&gt; import('chart.js')</div>
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
    <div class="doc_tabs">${codeBlk('js',`dp_j_${s.id}`,s.js)}</div>
    <div class="doc_demo">
      <div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>
      ${s.demo()}
    </div>
  </section>`;

export const render = () => `
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-brain" style="color:${COLOR}"></i><span>wiSmart</span><span class="cp_badge">v${wiSmart.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-brain" style="color:${COLOR}"></i> wiSmart</h1>
      <p>Carga CSS y JS solo cuando el usuario interactua con la pagina. Mejora el tiempo de primer render sin sacrificar funcionalidad.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-rocket"></i> Primer render rapido</span>
        <span class="doc_bdg"><i class="fas fa-database"></i> Cache integrado</span>
        <span class="doc_bdg"><i class="fas fa-code"></i> Dynamic imports</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.wsm', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wsm', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.wsm');
