import $ from 'jquery';
import { app } from '../wii.js';
import { wiPath, wiFade } from './rutadev.js';
import { Notificacion } from '../widev.js';

// ── NAV — Config visual por rol ────────────────────────────────────────────────
export const NAV = {
  todos: {
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
      { href: '/descubre',  page: 'descubre',  ico: 'fa-gauge',       txt: 'Descubre'  },
      { isBtn: true, cls: 'bt_auth registrar', ico: 'fa-user-plus',   txt: 'Registrar' },
      { isBtn: true, cls: 'bt_auth login',     ico: 'fa-sign-in-alt', txt: 'Login'     },
    ]
  },
  smile: {
    winav: [
      { href: '/smile',       page: 'smile',       ico: 'fa-dashboard',      txt: 'Dashboard'   },
      { href: '/lecciones',   page: 'lecciones',   ico: 'fa-graduation-cap', txt: 'Lecciones'   },
      { href: '/progreso',    page: 'progreso',    ico: 'fa-chart-line',     txt: 'Progreso'    },
      { href: '/certificado', page: 'certificado', ico: 'fa-certificate',    txt: 'Certificado' },
      { href: '/contacto',    page: 'contacto',    ico: 'fa-envelope',       txt: 'Contacto'    },
    ],
    nvrig: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true }
    ]
  },
  gestor: {
    winav: [
      { href: '/gestor',          page: 'gestor',          ico: 'fa-home',              txt: 'Bienvenido'      },
      { href: '/estudiantes',     page: 'estudiantes',     ico: 'fa-user-graduate',     txt: 'Estudiantes'     },
      { href: '/clases',          page: 'clases',          ico: 'fa-book',              txt: 'Clases'          },
      { href: '/calificaciones',  page: 'calificaciones',  ico: 'fa-search',            txt: 'Calificaciones'  },
      { href: '/tareas',          page: 'tareas',          ico: 'fa-chart-line',        txt: 'Tareas'          },
      { href: '/contacto',        page: 'contacto',        ico: 'fa-envelope',          txt: 'Contacto'        },
    ],
    nvrig: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true }
    ]
  },
  empresa: {
    winav: [
      { href: '/empresa',      page: 'empresa',      ico: 'fa-building',             txt: 'Panel'        },
      { href: '/equipos',      page: 'equipos',      ico: 'fa-users-gear',            txt: 'Equipos'      },
      { href: '/empleados',    page: 'empleados',    ico: 'fa-id-badge',              txt: 'Empleados'    },
      { href: '/reportes',     page: 'reportes',     ico: 'fa-file-chart-column',     txt: 'Reportes'     },
      { href: '/certificados', page: 'certificados', ico: 'fa-certificate',           txt: 'Certificados' },
    ],
    nvrig: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true }
    ]
  },
  admin: {
    winav: [
      { href: '/admin',        page: 'admin',        ico: 'fa-home',              txt: 'Bienvenido'  },
      { href: '/estudiantes',  page: 'estudiantes',  ico: 'fa-user-graduate',     txt: 'Estudiantes' },
      { href: '/profesores',   page: 'profesores',   ico: 'fa-chalkboard-teacher',txt: 'Profesores'  },
      { href: '/administrar',  page: 'administrar',  ico: 'fa-upload',            txt: 'Administrar' },
    ],
    nvrig: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true }
    ]
  }
};

// ── RUTAS — Fuente única de verdad ─────────────────────────────────────────────
// roles: null = público · ['rol',...] = protegido · area = subcarpeta en web/
export const RUTAS = [
  // PÚBLICAS — web/todos/
  { path: '/inicio',      area: 'todos/' },
  { path: '/comenzar',    area: 'todos/' },
  { path: '/lecciones',   area: 'todos/' },
  { path: '/estudiantes', area: 'todos/' },
  { path: '/profesores',  area: 'todos/' },
  { path: '/empresas',    area: 'todos/' },
  { path: '/precios',     area: 'todos/' },
  { path: '/contacto',    area: 'todos/' },
  { path: '/acerca',      area: 'todos/' },
  { path: '/login',       area: 'todos/' },
  { path: '/descubre',    area: 'todos/' },

  // SMILE — web/smile/  → tiene su propio /lecciones autenticado
  { path: '/smile',        area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/lecciones',    area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/progreso',     area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/certificado',  area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/perfil',       area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/mensajes',     area: 'smile/', roles: ['smile','gestor','admin'] },

  // GESTOR — web/gestor/
  { path: '/gestor',          area: 'gestor/', roles: ['gestor','admin'], mod: 'gestor' },
  { path: '/estudiantes',     area: 'gestor/', roles: ['gestor','admin'] },
  { path: '/clases',          area: 'gestor/', roles: ['gestor','admin'] },
  { path: '/calificaciones',  area: 'gestor/', roles: ['gestor','admin'] },
  { path: '/tareas',          area: 'gestor/', roles: ['gestor','admin'] },

  // EMPRESA — web/empresa/
  { path: '/empresa',      area: 'empresa/', roles: ['empresa','admin'], mod: 'empresa' },
  { path: '/equipos',      area: 'empresa/', roles: ['empresa','admin'] },
  { path: '/empleados',    area: 'empresa/', roles: ['empresa','admin'] },
  { path: '/reportes',     area: 'empresa/', roles: ['empresa','admin'] },
  { path: '/certificados', area: 'empresa/', roles: ['empresa','admin'] },

  // ADMIN — web/admin/
  { path: '/admin',       area: 'admin/', roles: ['admin'] },
  { path: '/estudiantes', area: 'admin/', roles: ['admin'] },
  { path: '/profesores',  area: 'admin/', roles: ['admin'] },
  { path: '/administrar', area: 'admin/', roles: ['admin'] },

  // LECCIONES — web/lecciones/ (públicas)
  ...Array.from({ length: 45 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return { path: `/leccion${num}`, area: 'lecciones/' };
  }),
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

  // Registra rutas con manejo inteligente de paths duplicados:
  // Si una ruta existe en público Y en área protegida, se crea un handler unificado
  // que sirve el módulo protegido si el rol aplica, si no el público.
  registerAll(getRol) {
    const pub  = {};  // path → imp()   (rutas públicas)
    const priv = {};  // path → [{ roles, imp }]  (rutas protegidas)

    RUTAS.forEach(({ path, area, roles = null, mod }) => {
      const page = mod ?? path.slice(1);
      const imp  = mod$(area, page);
      if (!imp) { console.warn(`[ruta] no encontrado: ../web/${area}${page}.js`); return; }
      if (roles === null) {
        pub[path] = imp;
      } else {
        (priv[path] = priv[path] || []).push({ roles, imp });
      }
    });

    const noAuth = () => Promise.resolve({
      render: () => '',
      init:   () => setTimeout(() => this.navigate('/login'), 0)
    });

    const allPaths = new Set([...Object.keys(pub), ...Object.keys(priv)]);
    allPaths.forEach(path => {
      const pubImp    = pub[path];
      const privList  = priv[path] || [];

      if (!privList.length) {
        // Solo pública
        this.register(path, pubImp);
      } else if (!pubImp) {
        // Solo protegida
        this.register(path, () => {
          const rol   = getRol?.();
          const entry = privList.find(e => e.roles.includes(rol));
          return entry ? entry.imp() : noAuth();
        });
      } else {
        // Pública + protegida: el rol decide cuál sirve
        this.register(path, () => {
          const rol   = getRol?.();
          const entry = privList.find(e => e.roles.includes(rol));
          return entry ? entry.imp() : pubImp();
        });
      }
    });
  }

  async navigate(ruta, historial = true) {
    if (this.cargand) return;
    this.cargand = true;
    let norm = wiPath.limpiar(ruta);
    if (norm === '/') norm = `/${this.HOME}`;
    const cargar = this.rutas[norm] ?? mod$('todos/', '404');
    try {
      this.modActual?.cleanup?.();
      const mod    = typeof cargar === 'function' ? await cargar() : cargar;
      if (typeof cargar === 'function') this.rutas[norm] = mod;
      const html   = await mod.render();
      const titulo = `${norm.slice(1).replace(/^\w/, c => c.toUpperCase()) || 'Inicio'} - ${app}`;
      this.marcarNav(norm);
      await wiFade(this.main, html);
      window.scrollTo(0, 0);
      document.title = titulo;
      mod.init?.();
      if (historial) wiPath.poner(norm === `/${this.HOME}` ? '/' : norm, titulo);
      this.modActual = mod;
      // Prefetch inicio tras carga inicial para tenerlo listo
      if (norm !== `/${this.HOME}`) setTimeout(() => this.prefetch('/'), 800);
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