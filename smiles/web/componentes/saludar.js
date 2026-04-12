import './saludar.css';
import $ from 'jquery';
import { Saludar, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#F97316';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'saludar', fn:Saludar, nom:'Saludo Dinamico', icon:'fa-hand-spock', color:COLOR,
  desc:'Devuelve el saludo correcto segun la hora del dia. Buenos dias, tardes o noches automatico.',
  code:`const saludo = Saludar();\n// "Buenos días, " / "Buenas tardes, " / "Buenas noches, "`,
  demo:() => `<div class="cp_demo_row">
    <div class="sal_badge"><i class="fas fa-clock"></i> ${Saludar()}<b>Widev</b></div>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'basico', titulo:'Uso basico',
    desc:'Llama a Saludar() y concatena el nombre. Devuelve el saludo adecuado segun la hora actual.',
    html:`&lt;p id="saludo"&gt;&lt;/p&gt;`,
    js:`import { Saludar } from './widev.js';\n\nconst nombre = 'Wilder';\ndocument.getElementById('saludo').textContent = Saludar() + nombre;`,
    demo:() => `<div class="sal_demo">
      <p class="sal_text"><span class="sal_hora">${Saludar()}</span><span class="sal_nombre">Wilder</span> 👋</p>
    </div>` },
  { id:'dinamico', titulo:'Con nombre dinamico',
    desc:'Combina Saludar() con el nombre del usuario autenticado para un saludo personalizado.',
    html:`&lt;h2 id="bienvenida"&gt;&lt;/h2&gt;`,
    js:`import { Saludar, wiAuth } from './widev.js';\n\nconst user = wiAuth.user;\nconst nombre = user?.nombre || 'visitante';\n\ndocument.getElementById('bienvenida').textContent =\n  Saludar() + nombre + '!';`,
    demo:() => `<div class="sal_demo">
      <p class="sal_text"><span class="sal_hora">${Saludar()}</span><span class="sal_nombre">usuario!</span></p>
    </div>` },
  { id:'rangos', titulo:'Rangos de hora',
    desc:'La funcion evalua la hora actual y devuelve el saludo correspondiente segun tres rangos del dia.',
    html:``,
    js:`// Logica interna de Saludar():\nconst hrs = new Date().getHours();\n\nif (hrs >= 5  && hrs < 12) return 'Buenos días, ';\nif (hrs >= 12 && hrs < 18) return 'Buenas tardes, ';\nreturn 'Buenas noches, ';`,
    demo:() => `<div style="display:flex;gap:1vh;flex-wrap:wrap">
      <div class="sal_rng"><b>5:00 - 11:59</b> Buenos días</div>
      <div class="sal_rng"><b>12:00 - 17:59</b> Buenas tardes</div>
      <div class="sal_rng"><b>18:00 - 4:59</b> Buenas noches</div>
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
    <div class="doc_side_hd"><i class="fas fa-hand-wave" style="color:${COLOR}"></i><span>Saludar</span><span class="cp_badge">v${Saludar.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-hand-wave" style="color:${COLOR}"></i> Saludar</h1>
      <p>Devuelve el saludo correcto segun la hora del dia. Concatena con el nombre del usuario para mensajes de bienvenida dinamicos.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-clock"></i> Hora automatica</span>
        <span class="doc_bdg"><i class="fas fa-user"></i> Nombre custom</span>
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Puro JS</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.sal', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.sal', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.sal');
