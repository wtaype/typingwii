import './guias.css';
import $ from 'jquery';
import { wiVista, wiCode, wicopy } from '../widev.js';
import { app, version } from '../wii.js';

// ── DATA ──────────────────────────────────────────────────────
const secciones = [
  { id:'instalacion',  icon:'fa-download',            color:'#0EBEFF', nombre:'Instalación' },
  { id:'estructura',   icon:'fa-folder-tree',          color:'#FFB800', nombre:'Estructura' },
  { id:'temas',        icon:'fa-palette',              color:'#7000FF', nombre:'Temas' },
  { id:'rutas',        icon:'fa-route',                color:'#29C72E', nombre:'Rutas SPA' },
  { id:'paginas',      icon:'fa-file-code',            color:'#FF5C69', nombre:'Crear Páginas' },
  { id:'firebase',     icon:'fa-fire',                 color:'#ff6d00', nombre:'Firebase' },
  { id:'deploy',       icon:'fa-rocket',               color:'#00D4FF', nombre:'Deploy' },
  { id:'tips',         icon:'fa-lightbulb',            color:'#FFB800', nombre:'Tips & Trucos' },
];

// ── CODE EXAMPLES ─────────────────────────────────────────────
const code = {
instalacion: `# 1. Clona el proyecto
git clone https://github.com/wtaype/widevv.git
cd widevv

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev`,

estructura: `widevv/
├── index.html          # Shell principal + CSS variables
├── vite.config.js      # Configuración Vite
├── .env                # Credenciales Firebase
└── smiles/
    ├── main.js         # Entry point + routes
    ├── widev.js        # Librería de utilidades
    ├── wii.js          # Info del app (id, version)
    ├── header.js       # Header + auth UI
    ├── footer.js       # Footer
    ├── rutas/
    │   └── ruta.js     # Router SPA (WiRutas)
    ├── auth/
    │   └── wiauth.js   # Firebase Auth config
    └── web/
        ├── inicio.js / .css
        ├── componentes.js / .css
        ├── utilidades.js / .css
        ├── modales.js / .css
        ├── guias.js / .css
        └── acerca.js / .css`,

temas: `/* Cada tema define sus variables en index.html */
:root[data-theme="Cielo"] {
  --mco: #0EBEFF;    /* Color principal */
  --bg:  #0a1628;    /* Fondo */
  --wb:  #111d32;    /* Fondo card */
  --tx:  #e2e8f0;    /* Texto */
  --brd: #1e3a5f;    /* Bordes */
  /* ... más variables */
}

/* 5 temas disponibles:
   Cielo  → Azul brillante
   Dulce  → Rosa coral
   Paz    → Verde natural
   Mora   → Morado intenso
   Futuro → Gris oscuro elegante */`,

rutas: `// main.js — Registro de rutas
import { rutas } from './rutas/ruta.js';

// Registrar páginas públicas
['inicio','componentes','utilidades','modales','guias','acerca']
  .forEach(pg => rutas.register(
    \'/\${pg}\', () => import(\`./web/\${pg}.js\`)
  ));

// Iniciar router
rutas.init();

// Navegar programáticamente
rutas.navigate('/componentes');`,

paginas: `// mi-pagina.js — Estructura mínima de una página

import $ from 'jquery';
import { wiVista } from '../widev.js';

export const render = () => \`
  <link rel="stylesheet" href="./smiles/web/mi-pagina.css">
  <div class="mi_wrap">
    <h1>Mi Página</h1>
    <p>Contenido aquí...</p>
  </div>
\`;

export const init = () => {
  // Setup: eventos, animaciones, etc.
  wiVista('.mi_wrap', null, { anim: 'wi_fadeUp' });
  console.log('Página cargada');
};

export const cleanup = () => {
  // Limpiar eventos al salir
  $(document).off('.mipagina');
};`,

firebase: `// 1. Configura .env con tus credenciales
VITE_API=tu-api-key
VITE_AUTH=tu-auth-domain
VITE_PRO=tu-project-id
VITE_STO=tu-storage-bucket
VITE_MES=tu-messaging-id
VITE_APP=tu-app-id

// 2. Usa wiAuth para autenticación
import { wiAuth } from './widev.js';

// Escuchar cambios de sesión
wiAuth.on(user => {
  if (user) console.log('Logueado:', user.nombre);
  else console.log('Sin sesión');
});

// Login manual
wiAuth.login({ nombre: 'Wilder', email: 'wi@dev.com' });

// Logout
wiAuth.logout();`,

deploy: `# Firebase Hosting

# 1. Instala Firebase CLI
npm install -g firebase-tools

# 2. Inicia sesión
firebase login

# 3. Build de producción
npm run build

# 4. Deploy
firebase deploy

# ── Git Tags (versionado) ──
# Crear tag de versión
git tag v9 -m "Version v9"
git push origin v9

# Actualizar tag existente
git tag -d v9
git tag v9 -m "Version v9 actualizada"
git push origin v9 --force`,

tips: `// ── Lazy loading de recursos ──
wiSmart({
  css: ['https://cdn.../font-awesome.css'],
  js:  [() => import('https://cdn.../prism.js')]
});

// ── Copiar con feedback ──
wicopy('texto', '#btn', '¡Copiado!');

// ── Easter egg con clicks ──
wiSuma('.logo', () => alert('🎉'), 7);

// ── Tooltip en atributo HTML ──
<button \${wiTip('Info rápida')}>Hover</button>

// ── Saludo automático por hora ──
Saludar(); // "Buenos días, "

// ── Fecha Firebase ──
wiDate(Timestamp).save('2026-03-07');
wiDate(Timestamp).get(doc.fecha, 'full');`,
};

// ── PLANTILLAS ────────────────────────────────────────────────
const tplSidebar = s => `
  <a href="#gu_${s.id}" class="gu_side_item" data-cat="${s.id}" style="--cc:${s.color}">
    <i class="fas ${s.icon}"></i>
    <span>${s.nombre}</span>
  </a>`;

const tplSection = s => {
  const lang = ['instalacion','estructura','deploy'].includes(s.id) ? 'bash'
    : ['temas'].includes(s.id) ? 'css' : 'js';
  const metas = {
    instalacion: 'npm · Vite · 3 comandos y listo',
    estructura:  'Organización del proyecto completo',
    temas:       '5 temas de color con CSS variables',
    rutas:       'Router SPA personalizado — WiRutas',
    paginas:     'render() + init() + cleanup()',
    firebase:    'Auth + Firestore + Hosting',
    deploy:      'Build + Firebase deploy + Git tags',
    tips:        'Atajos y funciones útiles del día a día',
  };
  return `
  <section class="gu_section" id="gu_${s.id}">
    <div class="gu_sec_head" style="--cc:${s.color}">
      <div class="gu_sec_ico"><i class="fas ${s.icon}"></i></div>
      <div>
        <h2 class="gu_sec_tit">${s.nombre}</h2>
        <span class="gu_sec_meta">${metas[s.id] || ''}</span>
      </div>
    </div>
    <div class="gu_sec_body">
      ${s.id === 'instalacion' ? `
        <div class="gu_steps">
          <div class="gu_step"><div class="gu_step_num">1</div><div><strong>Clona el repo</strong><p>Descarga el proyecto desde GitHub</p></div></div>
          <div class="gu_step"><div class="gu_step_num">2</div><div><strong>npm install</strong><p>Instala jQuery, Vite y Firebase</p></div></div>
          <div class="gu_step"><div class="gu_step_num">3</div><div><strong>npm run dev</strong><p>Servidor local con hot reload</p></div></div>
        </div>` : ''}
      ${s.id === 'estructura' ? `
        <div class="gu_info_box">
          <i class="fas fa-circle-info"></i>
          <p>Toda la lógica vive en <code>smiles/</code>. Cada página tiene su <code>.js</code> y <code>.css</code> independiente con carga dinámica.</p>
        </div>` : ''}
      ${s.id === 'temas' ? `
        <div class="gu_theme_grid">
          <div class="gu_theme_card" style="--tc:#0EBEFF"><div class="gu_theme_dot"></div><span>Cielo</span></div>
          <div class="gu_theme_card" style="--tc:#FF5C69"><div class="gu_theme_dot"></div><span>Dulce</span></div>
          <div class="gu_theme_card" style="--tc:#29C72E"><div class="gu_theme_dot"></div><span>Paz</span></div>
          <div class="gu_theme_card" style="--tc:#7000FF"><div class="gu_theme_dot"></div><span>Mora</span></div>
          <div class="gu_theme_card" style="--tc:#21273B"><div class="gu_theme_dot"></div><span>Futuro</span></div>
        </div>` : ''}
      ${s.id === 'paginas' ? `
        <div class="gu_info_box gu_info_warn">
          <i class="fas fa-triangle-exclamation"></i>
          <p>Cada página <strong>debe</strong> exportar <code>render()</code>. Las funciones <code>init()</code> y <code>cleanup()</code> son opcionales pero recomendadas.</p>
        </div>` : ''}
      ${s.id === 'rutas' ? `
        <div class="gu_info_box">
          <i class="fas fa-circle-info"></i>
          <p>El router usa <code>history.pushState</code>. No necesitas hash (#). Las rutas se registran en <code>main.js</code>.</p>
        </div>` : ''}
      ${s.id === 'firebase' ? `
        <div class="gu_info_box gu_info_warn">
          <i class="fas fa-shield-halved"></i>
          <p>Las credenciales van en <code>.env</code> y nunca se suben al repo. Agrega <code>.env</code> a tu <code>.gitignore</code>.</p>
        </div>` : ''}
      ${s.id === 'deploy' ? `
        <div class="gu_info_box">
          <i class="fas fa-rocket"></i>
          <p>Vite genera el build en <code>dist/</code>. Firebase Hosting sirve desde ahí con cache automático.</p>
        </div>` : ''}
      ${s.id === 'tips' ? `
        <div class="gu_tips_grid">
          <div class="gu_tip_card" style="--tc:#0EBEFF"><i class="fas fa-bolt"></i><strong>wiSmart</strong><p>Carga CSS/JS solo cuando el usuario interactúa</p></div>
          <div class="gu_tip_card" style="--tc:#FF5C69"><i class="fas fa-copy"></i><strong>wicopy</strong><p>Copia al portapapeles con tooltip automático</p></div>
          <div class="gu_tip_card" style="--tc:#29C72E"><i class="fas fa-eye"></i><strong>wiVista</strong><p>Animaciones al scroll con stagger</p></div>
          <div class="gu_tip_card" style="--tc:#7000FF"><i class="fas fa-comment-dots"></i><strong>wiTip</strong><p>Tooltips por JS o atributo HTML</p></div>
          <div class="gu_tip_card" style="--tc:#FFB800"><i class="fas fa-calendar"></i><strong>wiDate</strong><p>Convierte fechas Firebase fácilmente</p></div>
          <div class="gu_tip_card" style="--tc:#00D4FF"><i class="fas fa-globe"></i><strong>wiIp</strong><p>IP, ciudad, navegador y OS del visitante</p></div>
        </div>` : ''}
    </div>
    <div class="gu_code_wrap">
      <div class="gu_code_head"><span><i class="fas fa-code"></i> ${s.id === 'estructura' ? 'Árbol' : 'Código'}</span><span class="gu_lang">${lang.toUpperCase()}</span></div>
      <pre><code class="language-${lang}">${code[s.id]}</code></pre>
    </div>
  </section>`;
};

// ── RENDER ────────────────────────────────────────────────────
export const render = () => `
<div class="gu_wrap">

  <header class="gu_header">
    <div>
      <span class="gu_tag"><i class="fas fa-book"></i> Guías de Uso</span>
      <h1 class="gu_title">Aprende <span class="gu_grad">Widev</span></h1>
      <p class="gu_sub">Guía paso a paso para instalar, configurar y dominar <strong>widev.js</strong> en tus proyectos web.</p>
    </div>
    <div class="gu_header_stats">
      <div class="gu_hstat"><span class="gu_hstat_n">${secciones.length}</span><span>Guías</span></div>
      <div class="gu_hstat"><span class="gu_hstat_n">3</span><span>Comandos</span></div>
      <div class="gu_hstat"><span class="gu_hstat_n">${version}</span><span>Versión</span></div>
    </div>
  </header>

  <div class="gu_layout">
    <aside class="gu_sidebar">
      <div class="gu_side_title"><i class="fas fa-book-open"></i> Guías</div>
      ${secciones.map(tplSidebar).join('')}
    </aside>
    <div class="gu_content">
      ${secciones.map(tplSection).join('')}
    </div>
  </div>

</div>`;

// ── INIT ──────────────────────────────────────────────────────
export const init = () => {
  if (window.Prism) Prism.highlightAll();
  wiCode('pre code');

  // Sidebar nav
  $(document).on('click.gu', '.gu_side_item', function(e) {
    e.preventDefault();
    $('.gu_side_item').removeClass('active');
    $(this).addClass('active');
    const target = $($(this).attr('href'));
    if (target.length) $('html,body').animate({ scrollTop: target.offset().top - 80 }, 400);
  });

  // Scroll spy
  const sections = $('.gu_section');
  const spy = () => {
    const st = $(window).scrollTop() + 120;
    sections.each(function() {
      const $s = $(this), top = $s.offset().top, bot = top + $s.outerHeight();
      if (st >= top && st < bot) {
        const id = $s.attr('id')?.replace('gu_','');
        $('.gu_side_item').removeClass('active');
        $(`.gu_side_item[data-cat="${id}"]`).addClass('active');
      }
    });
  };
  $(window).on('scroll.gu', spy);
  spy();
  $('.gu_side_item').first().addClass('active');

  // Animations
  wiVista('.gu_section', null, { anim:'wi_fadeUp', stagger:120 });
  wiVista('.gu_step', null, { anim:'wi_fadeUp', stagger:80 });
  wiVista('.gu_theme_card', null, { anim:'wi_fadeUp', stagger:60 });
  wiVista('.gu_tip_card', null, { anim:'wi_fadeUp', stagger:60 });

  console.log(`⚡ ${app} ${version} · Guías OK`);
};

export const cleanup = () => {
  $(document).off('.gu');
  $(window).off('.gu');
};
