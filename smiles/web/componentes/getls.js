import './getls.css';
import $ from 'jquery';
import { getls, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#06B6D4';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'getls', fn:getls, nom:'Leer de localStorage', icon:'fa-download', color:COLOR,
  desc:'Lee un valor guardado con savels. Si expiro o no existe devuelve null automaticamente.',
  code:`const user = getls('usuario');\nif (user) mostrarPerfil(user);`,
  demo:() => `<div class="cp_demo_row">
    <div class="gls_chip"><i class="fas fa-check"></i> Valida expiracion automaticamente</div>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'basico', titulo:'Leer un valor',
    desc:'Pasa la clave y devuelve el valor original. Si expiro o no existe devuelve null.',
    html:``,
    js:`import { getls } from './widev.js';\n\nconst usuario = getls('usuario');\n\nif (usuario) {\n  console.log(usuario.nombre); // 'Wilder'\n} else {\n  // No existe o expiro\n  redirigirALogin();\n}`,
    demo:() => `<div class="gls_demo">
      <div class="gls_row"><code>getls('existe')</code> → valor original</div>
      <div class="gls_row"><code>getls('expirado')</code> → null (auto-elimina)</div>
      <div class="gls_row"><code>getls('noexiste')</code> → null</div>
    </div>` },
  { id:'tipos', titulo:'Tipos preservados',
    desc:'getls deserializa automaticamente. Recuperas exactamente el mismo tipo que guardaste con savels.',
    html:``,
    js:`import { savels, getls } from './widev.js';\n\nsavels('config', { tema: 'Cielo', puntos: 42 });\n\nconst config = getls('config');\nconsole.log(config.tema);   // 'Cielo'\nconsole.log(config.puntos); // 42 (number, no string)`,
    demo:() => `<div class="gls_demo">
      <div class="gls_row"><code>objeto.campo</code> → acceso directo</div>
      <div class="gls_row"><code>array[0]</code> → indexable</div>
      <div class="gls_row"><code>typeof num === 'number'</code> → tipado correcto</div>
    </div>` },
  { id:'patron', titulo:'Patron comun',
    desc:'Verificar sesion, cargar preferencias o cachear datos de API con una sola linea.',
    html:``,
    js:`import { getls, savels } from './widev.js';\n\n// Cargar usuario o redirigir\nconst user = getls('user') ?? redirect('/login');\n\n// Cache de API\nlet datos = getls('datos_api');\nif (!datos) {\n  datos = await fetchAPI();\n  savels('datos_api', datos, 1);\n}`,
    demo:() => `<div class="gls_demo">
      <div class="gls_row"><i class="fas fa-user" style="color:#06B6D4"></i> Verificar sesion</div>
      <div class="gls_row"><i class="fas fa-palette" style="color:#06B6D4"></i> Cargar preferencias</div>
      <div class="gls_row"><i class="fas fa-database" style="color:#06B6D4"></i> Cache de API</div>
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
    <div class="doc_side_hd"><i class="fas fa-download" style="color:${COLOR}"></i><span>getls</span><span class="cp_badge">v${getls.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-download" style="color:${COLOR}"></i> getls</h1>
      <p>Lee valores guardados con <code>savels</code>. Valida expiracion automaticamente. Devuelve <code>null</code> si no existe o ya expiro.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-check"></i> Valida expiracion</span>
        <span class="doc_bdg"><i class="fas fa-code"></i> Tipos preservados</span>
        <span class="doc_bdg"><i class="fas fa-trash"></i> Auto-limpia</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.gls', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.gls', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.gls');
