import{t as e}from"./vendor-BDh6mtVu.js";import{f as t,p as n,y as r}from"./widev-vIOvrNXT.js";var i=`#0EA5E9`,a={id:`wiip`,fn:t,nom:`Sistema de IP`,icon:`fa-globe`,color:i,desc:`Obtiene la IP y datos geograficos del usuario. Cache con localStorage para evitar llamadas extras.`,code:`const ip = await wiIp();
console.log(ip.query); // '190.x.x.x'

const geo = await wiIp(true); // con geolocation`,demo:()=>`<div class="cp_demo_row">
    <div class="wip_chip"><i class="fas fa-globe"></i> IP + GeoData bajo demanda</div>
  </div>`,main:()=>{}},o=[{id:`basico`,titulo:`Obtener IP`,desc:`Sin argumentos devuelve la IP publica del usuario. El resultado se cachea en localStorage 1 hora.`,html:``,js:`import { wiIp } from './widev.js';

const data = await wiIp();
console.log(data.query);   // IP: '142.250.80.46'
console.log(data.country); // 'United States'
console.log(data.city);    // 'Mountain View'`,demo:()=>`<div class="wip_demo">
      <div class="wip_row"><code>data.query</code> → IP publica</div>
      <div class="wip_row"><code>data.country</code> → pais</div>
      <div class="wip_row"><code>data.city</code> → ciudad</div>
    </div>`},{id:`geolocalizacion`,titulo:`Con geolocalizacion`,desc:`Pasa true para obtener los datos geograficos completos: pais, ciudad, latitud, longitud, zona horaria, etc.`,html:``,js:`import { wiIp } from './widev.js';

const geo = await wiIp(true);

console.log(geo.country);  // 'United States'
console.log(geo.city);     // 'Mountain View'
console.log(geo.lat);      // 37.422
console.log(geo.lon);      // -122.084
console.log(geo.timezone); // 'America/Los_Angeles'`,demo:()=>`<div class="wip_demo">
      <div class="wip_row"><code>geo.lat / geo.lon</code> → coordenadas</div>
      <div class="wip_row"><code>geo.timezone</code> → zona horaria</div>
      <div class="wip_row"><code>geo.isp</code> → proveedor internet</div>
    </div>`},{id:`cache`,titulo:`Cache automatico`,desc:`wiIp cachea el resultado en localStorage. La segunda llamada es instantanea sin costo de red.`,html:``,js:`import { wiIp } from './widev.js';

// Primera vez: llama a la API (1 request)
const ip1 = await wiIp();

// Segunda vez: desde cache (0 requests)
const ip2 = await wiIp();

// ip1.query === ip2.query → true`,demo:()=>`<div class="wip_demo">
      <div class="wip_row"><i class="fas fa-wifi" style="color:#0EA5E9"></i> Primera vez: 1 request HTTP</div>
      <div class="wip_row"><i class="fas fa-bolt" style="color:#F59E0B"></i> Siguiente vez: desde cache</div>
    </div>`}],s=(e,t,n)=>`
  <div class="doc_code_blk">
    <div class="doc_code_lbl"><span class="doc_code_tag doc_tag_${e}">${e.toUpperCase()}</span></div>
    <pre id="${t}"><code class="language-${e}">${n}</code></pre>
    <button class="doc_copy" data-pre="${t}" title="Copiar ${e.toUpperCase()}"><i class="fas fa-copy"></i></button>
  </div>`,c=e=>`
  <section class="doc_sec" id="${e.id}">
    <h2 class="doc_h2">${e.titulo}</h2>
    <p class="doc_p">${e.desc}</p>
    <div class="doc_tabs">${s(`js`,`dp_j_${e.id}`,e.js)}</div>
    <div class="doc_demo">
      <div class="doc_demo_res"><i class="fas fa-eye"></i> Resultado</div>
      ${e.demo()}
    </div>
  </section>`,l=()=>`
<div class="doc_wrap">
  <aside class="doc_side">
    <div class="doc_side_hd"><i class="fas fa-globe" style="color:${i}"></i><span>wiIp</span><span class="cp_badge">v${t.v}</span></div>
    <div class="doc_side_info"><p class="doc_side_tit">${a.nom}</p><p class="doc_side_desc">${a.desc}</p></div>
    <nav class="doc_nav">${o.map((e,t)=>`<a href="#${e.id}" class="doc_nav_a"><span class="doc_nav_num">${t+1}</span>${e.titulo}</a>`).join(``)}</nav>
  </aside>
  <main class="doc_main">
    <div class="doc_hero">
      <h1><i class="fas fa-globe" style="color:${i}"></i> wiIp</h1>
      <p>Obtiene la IP publica y datos geograficos del usuario. Cache automatico en <code>localStorage</code> para evitar requests innecesarios.</p>
      <div class="doc_badges">
        <span class="doc_bdg"><i class="fas fa-map-marker-alt"></i> Geolocalizacion</span>
        <span class="doc_bdg"><i class="fas fa-database"></i> Cache auto</span>
        <span class="doc_bdg"><i class="fas fa-bolt"></i> Async/await</span>
      </div>
    </div>
    ${o.map(c).join(``)}
  </main>
</div>`,u=()=>{window.Prism&&Prism.highlightAll(),e(document).on(`click.wip`,`.doc_nav_a`,function(t){t.preventDefault();let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},300),e(`.doc_nav_a`).removeClass(`active`),e(this).addClass(`active`)}).on(`click.wip`,`.doc_copy`,function(){r(e(`#${e(this).data(`pre`)}`).text(),this,`¡Copiado!`)}),n(o.map(e=>e.id),`.doc_nav_a`)},d=()=>e(document).off(`.wip`);export{d as cleanup,u as init,l as render,a as wi};