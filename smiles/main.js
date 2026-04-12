import $ from 'jquery';
import { wiSmart } from './widev.js';

const [, { rutas }] = await Promise.all([import('./header.js'), import('./rutas/ruta.js')]);
['inicio','crear','enviar','plantilla','ejemplos','acerca'].forEach(pg => rutas.register(`/${pg}`, () => import(`./web/${pg}.js`)));
['agregar','smile', 'descubre','perfil', 'milab','mensajes'].forEach(pg => rutas.register(`/${pg}`, () => import(`./smile/${pg}.js`)));
rutas.init();




wiSmart({
  css: ['https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap',
  ],
  js: [() => import('https://kit.fontawesome.com/a8c6571af4.js'), () => import('./footer.js')],
  img: {
    '.img_inicio': `<img src="${import.meta.env.BASE_URL}amor.webp" alt="Lovewi Home">`,
  }
});