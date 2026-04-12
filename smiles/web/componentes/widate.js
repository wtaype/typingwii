import './widate.css';
import $ from 'jquery';
import { wiDate, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#D97706';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'widate', fn:wiDate, nom:'Fechas Firebase', icon:'fa-calendar-alt', color:COLOR,
  desc:'Formatea timestamps de Firebase Firestore. Guarda y lee fechas con cache en localStorage.',
  code:`const f = wiDate(timestamp);\nf.get(doc.fecha, 'DD/MM/YYYY');\nf.save(doc);`,
  demo:() => `<div class="cp_demo_row">
    <div class="wdt_chip"><i class="fas fa-calendar-alt"></i> ${new Date().toLocaleDateString('es-PE', {day:'2-digit',month:'short',year:'numeric'})}</div>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'formato', titulo:'Formatear fecha',
    desc:'Pasa el timestamp de Firestore y el formato deseado. devuelve una cadena de texto formateada.',
    html:``,
    js:`import { wiDate } from './widev.js';\n\nconst f = wiDate(doc.timestamp);\n\nf.get(doc.createdAt, 'DD/MM/YYYY');     // '08/03/2026'\nf.get(doc.createdAt, 'YYYY-MM-DD');     // '2026-03-08'\nf.get(doc.createdAt, 'DD MMM YYYY');    // '08 mar 2026'\nf.get(doc.createdAt, 'HH:mm');          // '14:32'`,
    demo:() => `<div class="wdt_demo">
      <div class="wdt_row"><code>'DD/MM/YYYY'</code> → 08/03/2026</div>
      <div class="wdt_row"><code>'DD MMM YYYY'</code> → 08 mar 2026</div>
      <div class="wdt_row"><code>'HH:mm'</code> → 14:32</div>
    </div>` },
  { id:'guardar', titulo:'Guardar con cache',
    desc:'save() guarda el documento con la fecha actual y lo cachea en localStorage para acceso rapido.',
    html:``,
    js:`import { wiDate } from './widev.js';\n\n// Al guardar un documento\nconst f = wiDate(serverTimestamp());\nf.save(docData);\n\n// Al leer (con cache)\nconst data = f.get(docSnap, 'DD/MM/YYYY');`,
    demo:() => `<div class="wdt_demo">
      <div class="wdt_row"><i class="fas fa-save" style="color:#D97706"></i> f.save() → guarda + cachea</div>
      <div class="wdt_row"><i class="fas fa-bolt" style="color:#F59E0B"></i> f.get() → desde cache</div>
    </div>` },
  { id:'formatos', titulo:'Formatos disponibles',
    desc:'Soporta los formatos mas comunes para mostrar fechas en interfaces en espanol.',
    html:``,
    js:`// Formatos de fecha\n'DD/MM/YYYY'     → 08/03/2026\n'YYYY-MM-DD'     → 2026-03-08\n'DD MMM YYYY'    → 08 mar 2026\n'DD MMMM YYYY'   → 08 marzo 2026\n'HH:mm'          → 14:32\n'DD/MM/YYYY HH:mm' → 08/03/2026 14:32`,
    demo:() => `<div style="display:flex;gap:.8vh;flex-wrap:wrap">
      <div class="wdt_fmt">DD/MM/YYYY</div>
      <div class="wdt_fmt">YYYY-MM-DD</div>
      <div class="wdt_fmt">DD MMM YYYY</div>
      <div class="wdt_fmt">HH:mm</div>
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
    <div class="doc_side_hd"><i class="fas fa-calendar-alt" style="color:${COLOR}"></i><span>wiDate</span><span class="cp_badge">v${wiDate.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-calendar-alt" style="color:${COLOR}"></i> wiDate</h1>
      <p>Formatea timestamps de Firebase Firestore. Cachea resultados y soporta multiples formatos de fecha para interfaces en espanol.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-fire"></i> Firebase ready</span>
        <span class="doc_bdg"><i class="fas fa-database"></i> Cache auto</span>
        <span class="doc_bdg"><i class="fas fa-calendar"></i> Multi-formato</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.wdt', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wdt', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.wdt');
