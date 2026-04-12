import './wiip.css';
import $ from 'jquery';
import { wiIp, wicopy, wiScroll } from '../../widev.js';

const COLOR = '#0EA5E9';
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export const wi = {
  id:'wiip', fn:wiIp, nom:'Sistema de IP', icon:'fa-globe', color:COLOR,
  desc:'Obtiene la IP y datos geograficos del usuario. Cache con localStorage para evitar llamadas extras.',
  code:`const ip = await wiIp();\nconsole.log(ip.query); // '190.x.x.x'\n\nconst geo = await wiIp(true); // con geolocation`,
  demo:() => `<div class="cp_demo_row">
    <div class="wip_chip"><i class="fas fa-globe"></i> IP + GeoData bajo demanda</div>
  </div>`,
  main:() => {}
};

const secciones = [
  { id:'basico', titulo:'Obtener IP',
    desc:'Sin argumentos devuelve la IP publica del usuario. El resultado se cachea en localStorage 1 hora.',
    html:``,
    js:`import { wiIp } from './widev.js';\n\nconst data = await wiIp();\nconsole.log(data.query);   // IP: '142.250.80.46'\nconsole.log(data.country); // 'United States'\nconsole.log(data.city);    // 'Mountain View'`,
    demo:() => `<div class="wip_demo">
      <div class="wip_row"><code>data.query</code> → IP publica</div>
      <div class="wip_row"><code>data.country</code> → pais</div>
      <div class="wip_row"><code>data.city</code> → ciudad</div>
    </div>` },
  { id:'geolocalizacion', titulo:'Con geolocalizacion',
    desc:'Pasa true para obtener los datos geograficos completos: pais, ciudad, latitud, longitud, zona horaria, etc.',
    html:``,
    js:`import { wiIp } from './widev.js';\n\nconst geo = await wiIp(true);\n\nconsole.log(geo.country);  // 'United States'\nconsole.log(geo.city);     // 'Mountain View'\nconsole.log(geo.lat);      // 37.422\nconsole.log(geo.lon);      // -122.084\nconsole.log(geo.timezone); // 'America/Los_Angeles'`,
    demo:() => `<div class="wip_demo">
      <div class="wip_row"><code>geo.lat / geo.lon</code> → coordenadas</div>
      <div class="wip_row"><code>geo.timezone</code> → zona horaria</div>
      <div class="wip_row"><code>geo.isp</code> → proveedor internet</div>
    </div>` },
  { id:'cache', titulo:'Cache automatico',
    desc:'wiIp cachea el resultado en localStorage. La segunda llamada es instantanea sin costo de red.',
    html:``,
    js:`import { wiIp } from './widev.js';\n\n// Primera vez: llama a la API (1 request)\nconst ip1 = await wiIp();\n\n// Segunda vez: desde cache (0 requests)\nconst ip2 = await wiIp();\n\n// ip1.query === ip2.query → true`,
    demo:() => `<div class="wip_demo">
      <div class="wip_row"><i class="fas fa-wifi" style="color:#0EA5E9"></i> Primera vez: 1 request HTTP</div>
      <div class="wip_row"><i class="fas fa-bolt" style="color:#F59E0B"></i> Siguiente vez: desde cache</div>
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
    <div class="doc_side_hd"><i class="fas fa-globe" style="color:${COLOR}"></i><span>wiIp</span><span class="cp_badge">v${wiIp.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${wi.nom}</p><p class="doc_side_desc">${wi.desc}</p></div>
    <nav class="doc_nav">${secciones.map((s,i) => `<a href="#${s.id}" class="doc_nav_a"><span class="doc_nav_num">${i+1}</span>${s.titulo}</a>`).join('')}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-globe" style="color:${COLOR}"></i> wiIp</h1>
      <p>Obtiene la IP publica y datos geograficos del usuario. Cache automatico en <code>localStorage</code> para evitar requests innecesarios.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-map-marker-alt"></i> Geolocalizacion</span>
        <span class="doc_bdg"><i class="fas fa-database"></i> Cache auto</span>
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Async/await</span>
      </div>
    </div>
    ${secciones.map(wTabs).join('')}
  </main>
</div>`;

export const init = () => {
  if (window.Prism) Prism.highlightAll();
  $(document).on('click.wip', '.doc_nav_a', function(e) {
    e.preventDefault();
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 300);
    $('.doc_nav_a').removeClass('active'); $(this).addClass('active');
  }).on('click.wip', '.doc_copy', function() {
    wicopy($(`#${$(this).data('pre')}`).text(), this, '¡Copiado!');
  });
  wiScroll(secciones.map(s => s.id), '.doc_nav_a');
};

export const cleanup = () => $(document).off('.wip');
