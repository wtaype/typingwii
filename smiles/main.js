import $ from 'jquery';
import { getls, wiSmart} from './widev.js';
import { rutas } from './rutas/ruta.js';

['inicio','componentes','utilidades','modales','guias','acerca'].forEach(pg => rutas.register(`/${pg}`, () => import(`./web/${pg}.js`)));
['wicode','wivista','wispin','wiscroll','wiauth','wismart','saludar','notificacion','mensaje','savels','getls','removels','witip','wiip','widate','wicopy','wisuma'].forEach(pg => rutas.register(`/${pg}`, () => import(`./web/componentes/${pg}.js`)));
['descubre','login','smile','perfil','milab'].forEach(pg => rutas.register(`/${pg}`, () => import(`./smile/${pg}.js`)));
import('./header.js');
rutas.init();

wiSmart({
css: [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css'
],
js: [() => import('https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js'), () => import('./footer.js')]
});