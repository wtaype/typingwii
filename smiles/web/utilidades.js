import './utilidades.css';
import $ from 'jquery';
import { wiVista, wiCode, wicopy } from '../widev.js';
import { app, version } from '../wii.js';

// ── DATA ──────────────────────────────────────────────────────
const categorias = [
  { id:'auth',      icon:'fa-shield-halved',       color:'#FF5C69', nombre:'Auth Signal',       ver:'v2.0' },
  { id:'smart',     icon:'fa-bolt',                color:'#FFB800', nombre:'Carga Inteligente', ver:'v14'  },
  { id:'storage',   icon:'fa-hard-drive',           color:'#0EBEFF', nombre:'LocalStorage',     ver:'v11'  },
  { id:'fecha',     icon:'fa-calendar-clock',       color:'#7000FF', nombre:'Fechas Firebase',  ver:'v12'  },
  { id:'ip',        icon:'fa-globe',                color:'#29C72E', nombre:'Sistema IP',       ver:'v10.1'},
  { id:'observer',  icon:'fa-eye',                  color:'#00D4FF', nombre:'Observer',          ver:'v12'  },
  { id:'copiar',    icon:'fa-copy',                 color:'#FF5C69', nombre:'Copiar Texto',     ver:'v10.2'},
  { id:'helpers',   icon:'fa-wand-magic-sparkles',  color:'#FFB800', nombre:'Helpers',           ver:'v10.1'},
];

const utilidades = {
auth: [
  { nombre:'wiAuth.login()', desc:'Guarda sesión y emite evento a todos los listeners',
    params:[{n:'wi',t:'object',d:'Datos del usuario'},{n:'h',t:'number',d:'Horas de expiración (default: 24)'}],
    retorno:'void', ejemplo:`wiAuth.login({ nombre:'Wilder', usuario:'wtaype' }, 48);` },
  { nombre:'wiAuth.logout()', desc:'Limpia sesión conservando preferencias (tema, flash)',
    params:[], retorno:'void', ejemplo:`wiAuth.logout();` },
  { nombre:'wiAuth.user', desc:'Getter que retorna el usuario actual desde localStorage',
    params:[], retorno:'object | null', ejemplo:`const user = wiAuth.user;\nconsole.log(user?.nombre);` },
  { nombre:'wiAuth.logged', desc:'Getter booleano — ¿hay sesión activa?',
    params:[], retorno:'boolean', ejemplo:`if (wiAuth.logged) { /* sesión activa */ }` },
  { nombre:'wiAuth.on(fn)', desc:'Registra un listener que se ejecuta en login/logout',
    params:[{n:'fn',t:'function',d:'Callback que recibe el usuario o null'}],
    retorno:'void', ejemplo:`wiAuth.on(wi => wi ? mostrarPerfil(wi) : mostrarLogin());` },
  { nombre:'wiAuth.emit(wi)', desc:'Emite manualmente a todos los listeners',
    params:[{n:'wi',t:'object|null',d:'Datos del usuario o null'}],
    retorno:'void', ejemplo:`wiAuth.emit(miUsuario);` },
],
smart: [
  { nombre:'wiSmart(config)', desc:'Carga CSS y JS de forma inteligente. En primera visita espera interacción, después carga inmediato',
    params:[{n:'config',t:'object',d:'{ css: [...urls], js: [...fns] }'}],
    retorno:'void', ejemplo:`wiSmart({\n  css: ['https://cdn.../style.css'],\n  js: [() => import('./modulo.js')]\n});` },
],
storage: [
  { nombre:'savels(clave, valor, horas)', desc:'Guarda en localStorage con expiración automática en horas',
    params:[{n:'clave',t:'string',d:'Nombre de la clave'},{n:'valor',t:'any',d:'Valor a guardar (se serializa)'},{n:'horas',t:'number',d:'Tiempo de vida (default: 24)'}],
    retorno:'boolean', ejemplo:`savels('miDato', { nombre:'Wilder' }, 48);` },
  { nombre:'getls(clave)', desc:'Obtiene valor de localStorage. Retorna null si expiró o no existe',
    params:[{n:'clave',t:'string',d:'Nombre de la clave'}],
    retorno:'any | null', ejemplo:`const dato = getls('miDato');\nif (dato) console.log(dato.nombre);` },
  { nombre:'removels(...claves)', desc:'Elimina una o varias claves. Acepta strings separados por coma o espacios',
    params:[{n:'claves',t:'...string',d:'Claves a eliminar'}],
    retorno:'void', ejemplo:`removels('clave1', 'clave2');\nremovels('a, b, c');` },
],
fecha: [
  { nombre:'wiDate(tm).save(val)', desc:'Convierte string de fecha a Timestamp de Firebase',
    params:[{n:'tm',t:'Timestamp',d:'firebase/firestore Timestamp'},{n:'val',t:'string',d:'Fecha "YYYY-MM-DD" o datetime'}],
    retorno:'Timestamp', ejemplo:`import { Timestamp } from 'firebase/firestore';\nconst fecha = wiDate(Timestamp);\nfecha.save('2026-03-07');` },
  { nombre:'wiDate(tm).get(val, fmt)', desc:'Convierte Timestamp de Firebase a string legible',
    params:[{n:'val',t:'Timestamp',d:'Valor de Firestore'},{n:'fmt',t:'string',d:'"full" | "local" | default ISO'}],
    retorno:'string', ejemplo:`wiDate(Timestamp).get(doc.fecha);        // "2026-03-07"\nwiDate(Timestamp).get(doc.fecha, 'full');  // "2026-03-07T22:30"\nwiDate(Timestamp).get(doc.fecha, 'local'); // "7/3/2026"` },
],
ip: [
  { nombre:'wiIp(geo)', desc:'Obtiene información del visitante: IP, ubicación, navegador, dispositivo y más',
    params:[{n:'geo',t:'string|function',d:'"ciudad" para resumen, callback(data) para todo, o key específica'}],
    retorno:'Promise', ejemplo:`// Obtener ciudad\nwiIp('ciudad'); // "Lima, PE"\n\n// Callback completo\nwiIp(data => {\n  console.log(data.ip, data.browser, data.os);\n});\n\n// Key específica\nwiIp('browser'); // "Chrome"` },
],
observer: [
  { nombre:'wiVista(sel, fn, opts)', desc:'IntersectionObserver inteligente con animaciones y stagger',
    params:[{n:'sel',t:'string',d:'Selector CSS'},{n:'fn',t:'function|null',d:'Callback(el, index)'},{n:'opts',t:'object',d:'{ stagger, anim, threshold, once }'}],
    retorno:'void', ejemplo:`// Solo animación\nwiVista('.cards', null, {\n  anim: 'wi_fadeUp',\n  stagger: 100\n});\n\n// Con callback\nwiVista('.item', (el, i) => {\n  el.style.opacity = 1;\n}, { threshold: 0.3 });` },
],
copiar: [
  { nombre:'wicopy(txt, elm, msg)', desc:'Copia texto al portapapeles con feedback visual via tooltip',
    params:[{n:'txt',t:'string|$|Element',d:'Texto, selector, nodo o jQuery'},{n:'elm',t:'Element|null',d:'Elemento para tooltip'},{n:'msg',t:'string',d:'Mensaje (default: ¡Copiado!)'}],
    retorno:'void', ejemplo:`wicopy('Hola mundo');\nwicopy('.mi-parrafo', '#btnCopy', '¡Listo!');` },
],
helpers: [
  { nombre:'Saludar()', desc:'Retorna saludo según la hora: Buenos días/tardes/noches',
    params:[], retorno:'string', ejemplo:`Saludar(); // "Buenas noches, "` },
  { nombre:'year()', desc:'Retorna el año actual',
    params:[], retorno:'number', ejemplo:`year(); // 2026` },
  { nombre:'Mayu(str)', desc:'Convierte texto a mayúsculas',
    params:[{n:'str',t:'string',d:'Texto'}], retorno:'string', ejemplo:`Mayu('hola'); // "HOLA"` },
  { nombre:'Capi(str)', desc:'Primera letra en mayúscula',
    params:[{n:'str',t:'string',d:'Texto'}], retorno:'string', ejemplo:`Capi('hola'); // "Hola"` },
  { nombre:'mis10(txt)', desc:'Trunca texto a 10 caracteres con "..."',
    params:[{n:'txt',t:'string',d:'Texto'}], retorno:'string', ejemplo:`mis10('Texto muy largo'); // "Texto muy ..."` },
  { nombre:'wiSuma(sel, fn, num)', desc:'Ejecuta función tras N clicks en un elemento',
    params:[{n:'sel',t:'string',d:'Selector'},{n:'fn',t:'function',d:'Callback'},{n:'num',t:'number',d:'Clicks (default: 5)'}],
    retorno:'void', ejemplo:`wiSuma('.logo', () => alert('Easter egg!'), 7);` },
],
};

// ── PLANTILLAS ────────────────────────────────────────────────
const tplSidebar = c => `
  <a href="#ut_${c.id}" class="ut_side_item" data-cat="${c.id}" style="--cc:${c.color}">
    <i class="fas ${c.icon}"></i>
    <span>${c.nombre}</span>
    <span class="ut_side_ver">${c.ver}</span>
  </a>`;

const tplParam = p => `<span class="ut_param"><code>${p.n}</code><em>${p.t}</em>${p.d}</span>`;

const tplFn = f => `
  <div class="ut_fn">
    <div class="ut_fn_head">
      <code class="ut_fn_name">${f.nombre}</code>
      <span class="ut_fn_ret"><i class="fas fa-arrow-right"></i> ${f.retorno}</span>
    </div>
    <p class="ut_fn_desc">${f.desc}</p>
    ${f.params.length ? `<div class="ut_params"><div class="ut_params_tit"><i class="fas fa-sliders"></i> Parámetros</div>${f.params.map(tplParam).join('')}</div>` : ''}
    <div class="ut_code_wrap">
      <div class="ut_code_head"><span><i class="fas fa-code"></i> Ejemplo</span><span class="ut_lang">JS</span></div>
      <pre><code class="language-js">${f.ejemplo}</code></pre>
    </div>
  </div>`;

const tplCat = c => {
  const fns = utilidades[c.id] || [];
  return `
  <section class="ut_section" id="ut_${c.id}">
    <div class="ut_sec_head" style="--cc:${c.color}">
      <div class="ut_sec_ico"><i class="fas ${c.icon}"></i></div>
      <div>
        <h2 class="ut_sec_tit">${c.nombre}</h2>
        <span class="ut_sec_meta">${c.ver} · ${fns.length} función${fns.length > 1 ? 'es' : ''}</span>
      </div>
    </div>
    <div class="ut_fns">${fns.map(tplFn).join('')}</div>
  </section>`;
};

// ── RENDER ────────────────────────────────────────────────────
export const render = () => `
<div class="ut_wrap">

  <header class="ut_header">
    <div>
      <span class="ut_tag"><i class="fas fa-wand-magic-sparkles"></i> Utilidades JS</span>
      <h1 class="ut_title">Funciones <span class="ut_grad">inteligentes</span></h1>
      <p class="ut_sub">Documentación completa de cada utilidad de <strong>widev.js</strong>. Parámetros, retornos y ejemplos listos para copiar.</p>
    </div>
    <div class="ut_header_stats">
      <div class="ut_hstat"><span class="ut_hstat_n">${categorias.length}</span><span>Módulos</span></div>
      <div class="ut_hstat"><span class="ut_hstat_n">${Object.values(utilidades).flat().length}</span><span>Funciones</span></div>
    </div>
  </header>

  <div class="ut_layout">
    <aside class="ut_sidebar">
      <div class="ut_side_title"><i class="fas fa-layer-group"></i> Módulos</div>
      ${categorias.map(tplSidebar).join('')}
    </aside>
    <div class="ut_content">
      ${categorias.map(tplCat).join('')}
    </div>
  </div>

</div>`;

// ── INIT ──────────────────────────────────────────────────────
export const init = () => {
  if (window.Prism) Prism.highlightAll();
  wiCode('pre code');

  // Sidebar nav
  $(document).on('click.util', '.ut_side_item', function(e) {
    e.preventDefault();
    $('.ut_side_item').removeClass('active');
    $(this).addClass('active');
    const target = $($(this).attr('href'));
    if (target.length) $('html,body').animate({ scrollTop: target.offset().top - 80 }, 400);
  });

  // Scroll spy — highlight sidebar on scroll
  const sections = $('.ut_section');
  const spy = () => {
    const st = $(window).scrollTop() + 120;
    sections.each(function() {
      const $s = $(this), top = $s.offset().top, bot = top + $s.outerHeight();
      if (st >= top && st < bot) {
        const id = $s.attr('id')?.replace('ut_','');
        $('.ut_side_item').removeClass('active');
        $(`.ut_side_item[data-cat="${id}"]`).addClass('active');
      }
    });
  };
  $(window).on('scroll.util', spy);
  spy();

  // Animations
  wiVista('.ut_section', null, { anim:'wi_fadeUp', stagger:120 });
  wiVista('.ut_fn', null, { anim:'wi_fadeUp', stagger:60 });

  // Activate first
  $('.ut_side_item').first().addClass('active');

  console.log(`⚡ ${app} ${version} · Utilidades OK`);
};

export const cleanup = () => {
  $(document).off('.util');
  $(window).off('.util');
  console.log('🧹 Utilidades limpiado');
};