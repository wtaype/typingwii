import { wiSmart, getls } from './widev.js';
import { rutas } from './rutas/ruta.js';

// ── RUTAS: registro automático y dispatcher raíz ─────────────────────────────
rutas.registerAll(() => getls('wiSmile')?.rol);

rutas.register('/', (isPre = false) => {
  const u = getls('wiSmile');
  if (!u) return import('./web/publico/inicio.js');
  const map = {
    smile:  { r: '/smile',  m: () => import('./web/smile/smile.js') },
    gestor: { r: '/people', m: () => import('./web/gestor/gestor.js') },
    admin:  { r: '/admin',  m: () => import('./web/admin/admin.js') }
  };
  const t = map[u.rol] || map.smile;
  if (!isPre && t.r !== '/') { rutas.navigate(t.r); return t.m(); }
  return t.m();
});

// ── BOOTSTRAP ────────────────────────────────────────────────────────────────
import('./header.js');
rutas.init();

requestAnimationFrame(() => requestAnimationFrame(() =>
  document.getElementById('loading-overlay')?.classList.add('hidden')
));

wiSmart({
  css: [
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap'
  ],
  js: [() => import('https://kit.fontawesome.com/a8c6571af4.js'), () => import('./footer.js')],
  img: { '.img_inicio': `<img src="${import.meta.env.BASE_URL}amor.webp" alt="Lovewi Home" fetchpriority="high">` }
});