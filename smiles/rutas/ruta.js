import $ from 'jquery';
import { app } from '../wii.js';
import { wiPath, wiFade } from './rutadev.js';
import { Notificacion } from '../widev.js';

// ── NAV — Config visual por rol ────────────────────────────────────────────────
export const NAV = {
  publico: {
    winav: [
      { href: '/',            page: 'inicio',      ico: 'fa-house',               txt: 'Inicio'      },
      { href: '/comenzar',    page: 'comenzar',    ico: 'fa-play',                txt: 'Comenzar'    },
      { href: '/lecciones',   page: 'lecciones',   ico: 'fa-book',                txt: 'Lecciones'   },
      { href: '/estudiantes', page: 'estudiantes', ico: 'fa-user-graduate',       txt: 'Estudiantes' },
      { href: '/profesores',  page: 'profesores',  ico: 'fa-chalkboard-teacher',  txt: 'Profesores'  },
      { href: '/empresas',    page: 'empresas',    ico: 'fa-building',            txt: 'Empresas'    },
      { href: '/precios',     page: 'precios',     ico: 'fa-tags',                txt: 'Precios'     },
      { href: '/contacto',    page: 'contacto',    ico: 'fa-envelope',            txt: 'Contacto'    },
      { href: '/acerca',      page: 'acerca',      ico: 'fa-info-circle',         txt: 'Acerca'      },
    ],
    nvrig: [
      { href: '/descubre',  page: 'descubre',  ico: 'fa-gauge',      txt: 'Descubre'  },
      { isBtn: true, cls: 'bt_auth registrar', ico: 'fa-user-plus',  txt: 'Registrar' },
      { isBtn: true, cls: 'bt_auth login',     ico: 'fa-sign-in-alt',txt: 'Login'     },
    ]
  },
  smile: {
    winav: [
      { href: '/smile',     page: 'smile',     ico: 'fa-dashboard',  txt: 'Dashboard'          },
      { href: '/lecciones', page: 'lecciones', ico: 'fa-graduation-cap', txt: 'Lecciones'          },
      { href: '/progreso',  page: 'progreso',  ico: 'fa-chart-line', txt: 'Progreso'           },
      { href: '/certificado',  page: 'certificado',  ico: 'fa-certificate', txt: 'Certificado'        },
      { href: '/contacto',  page: 'contacto',  ico: 'fa-envelope',   txt: 'Contacto'           },
    ],
    nvrig: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true }
    ]
  },
  gestor: {
    winav: [
      { href: '/gestor',     page: 'gestor',     ico: 'fa-home',        txt: 'Bienvenido'          },
      { href: '/estudiantes',    page: 'estudiantes',    ico: 'fa-user-graduate',txt: 'Estudiantes' },
      { href: '/clases',     page: 'clases',     ico: 'fa-book',        txt: 'Clases'},
      { href: '/calificaciones',     page: 'calificaciones',     ico: 'fa-search',      txt: 'Calificaciones'            },
      { href: '/tareas',     page: 'tareas',     ico: 'fa-chart-line',      txt: 'Tareas'            },
      { href: '/contacto',  page: 'contacto',  ico: 'fa-envelope', txt: 'Contacto' },
    ],
    nvrig: [{ isPerfil: true }, { isSalir: true }]
  },
  admin: {
    winav: [
      { href: '/admin',    page: 'admin',    ico: 'fa-home',       txt: 'Bienvenido'        },
      { href: '/estudiantes', page: 'estudiantes', ico: 'fa-user-graduate',   txt: 'Estudiantes'},
      { href: '/profesores',    page: 'profesores',    ico: 'fa-chalkboard-teacher', txt: 'Profesores'   },
      { href: '/administrar',    page: 'administrar',    ico: 'fa-upload',     txt: 'Administrar'       },
    ],
    nvrig: [{ isPerfil: true }, { isSalir: true }]
  }
};

// ── RUTAS — Fuente única de verdad ─────────────────────────────────────────────
//   roles: null = público · ['rol',...] = protegido
//   area:  subcarpeta dentro de web/ incluyendo slash final
// ──────────────────────────────────────────────────────────────────────────────
export const RUTAS = [
  // PÚBLICAS — web/publico/
  { path: '/inicio',      area: 'publico/' },
  { path: '/comenzar',    area: 'publico/' },
  { path: '/lecciones',   area: 'publico/' },
  { path: '/estudiantes', area: 'publico/' },
  { path: '/profesores',  area: 'publico/' },
  { path: '/empresas',    area: 'publico/' },
  { path: '/precios',     area: 'publico/' },
  { path: '/contacto',    area: 'publico/' },
  { path: '/acerca',      area: 'publico/' },
  { path: '/login',       area: 'publico/' },
  { path: '/descubre',    area: 'publico/' },

  // SMILE — web/smile/     roles: ['smile','gestor','admin']
  { path: '/smile',     area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/lecciones',  area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/progreso',    area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/certificado',   area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/perfil',  area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/mensajes',  area: 'smile/', roles: ['smile','gestor','admin'] },

  // GESTOR — web/gestor/   roles: ['gestor','admin']
  { path: '/gestor',     area: 'gestor/', roles: ['gestor','admin'], mod: 'gestor' },
  { path: '/estudiantes',    area: 'gestor/', roles: ['gestor','admin'] },
  { path: '/clases', area: 'gestor/', roles: ['gestor','admin'] },
  { path: '/calificaciones',     area: 'gestor/', roles: ['gestor','admin'] },
  { path: '/tareas',     area: 'gestor/', roles: ['gestor','admin'] },

  // ADMIN — web/admin/     roles: ['admin']
  { path: '/admin',    area: 'admin/', roles: ['admin'] },
  { path: '/estudiantes', area: 'admin/', roles: ['admin'] },
  { path: '/profesores',    area: 'admin/', roles: ['admin'] },
  { path: '/administrar',    area: 'admin/', roles: ['admin'] },
];

// ── GLOB — Vite mapea todos los módulos en build time ─────────────────────────
const MODS = import.meta.glob('../web/**/*.js');
const mod$ = (area, page) => MODS[`../web/${area}${page}.js`];

// ── MOTOR ──────────────────────────────────────────────────────────────────────
class WiRutas {
  constructor() {
    this.rutas     = {};
    this.modActual = null;
    this.cargand   = false;
    this.precach   = new Set();
    this.HOME      = 'inicio';
    this.main      = '#wimain';
  }

  register(ruta, mod) { this.rutas[ruta] = mod; }

  registerAll(getRol) {
    const noAuth = () => Promise.resolve({
      render : () => '',
      init   : () => setTimeout(() => this.navigate('/'), 0)
    });
    RUTAS.forEach(({ path, area, roles = null, mod }) => {
      const page = mod ?? path.slice(1);
      const imp  = mod$(area, page);
      if (!imp) { console.warn(`[ruta] no encontrado: ../web/${area}${page}.js`); return; }
      this.register(path, roles === null ? imp : () => {
        const rol = getRol?.();
        return roles.includes(rol) ? imp() : noAuth();
      });
    });
  }

  async navigate(ruta, historial = true) {
    if (this.cargand) return;
    this.cargand = true;
    let norm = wiPath.limpiar(ruta);
    if (norm === '/') norm = `/${this.HOME}`;
    const cargar = this.rutas[norm] ?? mod$('publico/', '404');
    try {
      this.modActual?.cleanup?.();
      const mod    = typeof cargar === 'function' ? await cargar() : cargar;
      if (typeof cargar === 'function') this.rutas[norm] = mod;
      const html   = await mod.render();
      const titulo = `${norm.slice(1).replace(/^\w/, c => c.toUpperCase()) || 'Inicio'} - ${app}`;
      this.marcarNav(norm);
      await wiFade(this.main, html);
      document.title = titulo;
      mod.init?.();
      if (historial) wiPath.poner(norm === `/${this.HOME}` ? '/' : norm, titulo);
      this.modActual = mod;
    } catch (err) {
      Notificacion('Error en la ruta');
      console.error('[ruta] navigate:', err);
    } finally {
      this.cargand = false;
    }
  }

  marcarNav(norm) {
    const pag = norm.slice(1) || this.HOME;
    $('.nv_item').removeClass('active');
    $(`.nv_item[data-page="${pag}"]`).addClass('active');
  }

  async prefetch(ruta) {
    let norm = wiPath.limpiar(ruta);
    if (norm === '/') norm = `/${this.HOME}`;
    if (this.precach.has(norm) || typeof this.rutas[norm] !== 'function') return;
    try { this.rutas[norm] = await this.rutas[norm](); this.precach.add(norm); }
    catch { console.warn('[ruta] prefetch:', norm); }
  }

  init() {
    const rActual = wiPath.actual === '/' ? `/${this.HOME}` : wiPath.limpiar(wiPath.actual);
    this.marcarNav(rActual);

    $(document)
      .on('click', '.nv_item', (e) => {
        e.preventDefault();
        const pag = $(e.currentTarget).data('page');
        this.navigate(pag === this.HOME ? '/' : `/${pag}`);
      })
      .on('mouseenter', '.nv_item[data-page]', (e) => {
        const pag = $(e.currentTarget).data('page');
        this.prefetch(pag === this.HOME ? '/' : `/${pag}`);
      });

    window.addEventListener('popstate', (e) =>
      this.navigate(e.state?.ruta || wiPath.actual, false)
    );
    this.navigate(wiPath.actual, false);
  }
}

export const rutas = new WiRutas();