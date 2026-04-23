import './lecciones.css';
import $ from 'jquery';
import { wiVista, wiTip, getls } from '../../widev.js';
import { app } from '../../wii.js';

// ── 45 LECCIONES — datos del catálogo ─────────────────────────────
export const LECCIONES = [
  { id:1, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla F', sub:'Dedo índice izquierdo', meta:'25 WPM', dur:'3 min', teclas:["f"] },
  { id:2, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla J', sub:'Dedo índice derecho', meta:'25 WPM', dur:'3 min', teclas:["j"] },
  { id:3, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla D', sub:'Dedo medio izquierdo', meta:'25 WPM', dur:'3 min', teclas:["d"] },
  { id:4, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla K', sub:'Dedo medio derecho', meta:'25 WPM', dur:'3 min', teclas:["k"] },
  { id:5, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla S', sub:'Dedo anular izquierdo', meta:'25 WPM', dur:'3 min', teclas:["s"] },
  { id:6, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla L', sub:'Dedo anular derecho', meta:'25 WPM', dur:'3 min', teclas:["l"] },
  { id:7, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla A', sub:'Dedo meñique izquierdo', meta:'25 WPM', dur:'3 min', teclas:["a"] },
  { id:8, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla Ñ', sub:'Dedo meñique derecho', meta:'25 WPM', dur:'3 min', teclas:["ñ"] },
  { id:9, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla G', sub:'Dedo índice izquierdo (extensión)', meta:'25 WPM', dur:'3 min', teclas:["g"] },
  { id:10, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla H', sub:'Dedo índice derecho (extensión)', meta:'25 WPM', dur:'4 min', teclas:["h"] },
  { id:11, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla E', sub:'Dedo medio izquierdo (arriba)', meta:'25 WPM', dur:'4 min', teclas:["e"] },
  { id:12, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla I', sub:'Dedo medio derecho (arriba)', meta:'25 WPM', dur:'4 min', teclas:["i"] },
  { id:13, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla R', sub:'Dedo índice izquierdo (arriba)', meta:'25 WPM', dur:'4 min', teclas:["r"] },
  { id:14, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla U', sub:'Dedo índice derecho (arriba)', meta:'25 WPM', dur:'4 min', teclas:["u"] },
  { id:15, nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Tecla T', sub:'Dedo índice izquierdo (arriba-ext)', meta:'25 WPM', dur:'4 min', teclas:["t"] },
  { id:16, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla Y', sub:'Dedo índice derecho (arriba-ext)', meta:'30 WPM', dur:'4 min', teclas:["y"] },
  { id:17, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla W', sub:'Dedo anular izquierdo (arriba)', meta:'30 WPM', dur:'4 min', teclas:["w"] },
  { id:18, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla O', sub:'Dedo anular derecho (arriba)', meta:'30 WPM', dur:'4 min', teclas:["o"] },
  { id:19, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla Q', sub:'Dedo meñique izquierdo (arriba)', meta:'30 WPM', dur:'4 min', teclas:["q"] },
  { id:20, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla P', sub:'Dedo meñique derecho (arriba)', meta:'30 WPM', dur:'5 min', teclas:["p"] },
  { id:21, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla V', sub:'Dedo índice izquierdo (abajo)', meta:'30 WPM', dur:'5 min', teclas:["v"] },
  { id:22, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla M', sub:'Dedo índice derecho (abajo)', meta:'30 WPM', dur:'5 min', teclas:["m"] },
  { id:23, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla C', sub:'Dedo medio izquierdo (abajo)', meta:'30 WPM', dur:'5 min', teclas:["c"] },
  { id:24, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla N', sub:'Dedo índice derecho (abajo)', meta:'30 WPM', dur:'5 min', teclas:["n"] },
  { id:25, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla X', sub:'Dedo anular izquierdo (abajo)', meta:'30 WPM', dur:'5 min', teclas:["x"] },
  { id:26, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla B', sub:'Dedo índice izquierdo (abajo-ext)', meta:'30 WPM', dur:'5 min', teclas:["b"] },
  { id:27, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla Z', sub:'Dedo meñique izquierdo (abajo)', meta:'30 WPM', dur:'5 min', teclas:["z"] },
  { id:28, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla ,', sub:'Dedo medio derecho (abajo)', meta:'30 WPM', dur:'5 min', teclas:[","] },
  { id:29, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Tecla .', sub:'Dedo anular derecho (abajo)', meta:'30 WPM', dur:'5 min', teclas:["."] },
  { id:30, nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Barra Espaciadora', sub:'Pulgares', meta:'30 WPM', dur:'6 min', teclas:[" "] },
  { id:31, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Mix Índices', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'6 min', teclas:["f"] },
  { id:32, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Mix Medios', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'6 min', teclas:["d"] },
  { id:33, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Mix Anulares', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'6 min', teclas:["s"] },
  { id:34, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Mix Meñiques', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'6 min', teclas:["a"] },
  { id:35, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Escala Izquierda', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'6 min', teclas:["f"] },
  { id:36, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Escala Derecha', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'6 min', teclas:["j"] },
  { id:37, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Extensiones Centro', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'6 min', teclas:["g"] },
  { id:38, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Mitad Izquierda Total', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'6 min', teclas:["a"] },
  { id:39, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Mitad Derecha Total', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'6 min', teclas:["h"] },
  { id:40, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Fila Guía Completa', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'7 min', teclas:["a"] },
  { id:41, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Salto Vertical Medio Izq', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'7 min', teclas:["d"] },
  { id:42, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Salto Vertical Índice Der', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'7 min', teclas:["j"] },
  { id:43, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Salto Vertical Índice Izq', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'7 min', teclas:["f"] },
  { id:44, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Salto Vertical Medio Der', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'7 min', teclas:["k"] },
  { id:45, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Salto Vertical Anular Izq', sub:'Coordinación y Fluidez', meta:'35 WPM', dur:'7 min', teclas:["s"] },
  { id:46, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Salto Vertical Anular Der', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'7 min', teclas:["l"] },
  { id:47, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Salto Vertical Meñique Izq', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'7 min', teclas:["a"] },
  { id:48, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Salto Vertical Meñique Der', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'7 min', teclas:["ñ"] },
  { id:49, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Salto Extensión Izq', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'7 min', teclas:["f"] },
  { id:50, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Salto Extensión Der', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'8 min', teclas:["j"] },
  { id:51, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Bigrama Frecuente', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'8 min', teclas:["e"] },
  { id:52, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Bigrama Frecuente', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'8 min', teclas:["e"] },
  { id:53, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Bigrama Frecuente', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'8 min', teclas:["d"] },
  { id:54, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Bigrama Frecuente', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'8 min', teclas:["l"] },
  { id:55, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Bigrama Frecuente', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'8 min', teclas:["o"] },
  { id:56, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Bigrama Frecuente', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'8 min', teclas:["e"] },
  { id:57, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Bigrama Frecuente', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'8 min', teclas:["u"] },
  { id:58, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Bigrama Frecuente', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'8 min', teclas:["a"] },
  { id:59, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Bigrama Frecuente', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'8 min', teclas:["l"] },
  { id:60, nivel:4, color:'#a855f7', ico:'fa-hashtag', titulo:'Bigrama Frecuente', sub:'Coordinación y Fluidez', meta:'40 WPM', dur:'9 min', teclas:["s"] },
  { id:61, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: sol', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'9 min', teclas:["s"] },
  { id:62, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: pan', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'9 min', teclas:["p"] },
  { id:63, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: mar', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'9 min', teclas:["m"] },
  { id:64, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: luz', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'9 min', teclas:["l"] },
  { id:65, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: voz', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'9 min', teclas:["v"] },
  { id:66, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: casa', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'9 min', teclas:["c"] },
  { id:67, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: flor', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'9 min', teclas:["f"] },
  { id:68, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: pelo', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'9 min', teclas:["p"] },
  { id:69, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: mesa', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'9 min', teclas:["m"] },
  { id:70, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: vida', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'10 min', teclas:["v"] },
  { id:71, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: tiempo', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'10 min', teclas:["t"] },
  { id:72, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: camino', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'10 min', teclas:["c"] },
  { id:73, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: fuerte', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'10 min', teclas:["f"] },
  { id:74, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: ciudad', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'10 min', teclas:["c"] },
  { id:75, nivel:5, color:'#06b6d4', ico:'fa-align-left', titulo:'Palabra: tierra', sub:'Coordinación y Fluidez', meta:'45 WPM', dur:'10 min', teclas:["t"] },
  { id:76, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: puerta', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'10 min', teclas:["p"] },
  { id:77, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: blanco', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'10 min', teclas:["b"] },
  { id:78, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: fuerza', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'10 min', teclas:["f"] },
  { id:79, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: puente', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'10 min', teclas:["p"] },
  { id:80, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: viento', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'11 min', teclas:["v"] },
  { id:81, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: llave', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'11 min', teclas:["l"] },
  { id:82, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: perro', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'11 min', teclas:["p"] },
  { id:83, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: calle', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'11 min', teclas:["c"] },
  { id:84, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: lleno', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'11 min', teclas:["l"] },
  { id:85, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: valle', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'11 min', teclas:["v"] },
  { id:86, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: correr', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'11 min', teclas:["c"] },
  { id:87, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: carro', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'11 min', teclas:["c"] },
  { id:88, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: accion', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'11 min', teclas:["a"] },
  { id:89, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: leccion', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'11 min', teclas:["l"] },
  { id:90, nivel:6, color:'#ec4899', ico:'fa-align-justify', titulo:'Palabra: ficcion', sub:'Coordinación y Fluidez', meta:'50 WPM', dur:'12 min', teclas:["f"] },
  { id:91, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: A', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'12 min', teclas:["A"] },
  { id:92, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: E', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'12 min', teclas:["E"] },
  { id:93, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: I', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'12 min', teclas:["I"] },
  { id:94, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: O', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'12 min', teclas:["O"] },
  { id:95, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: U', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'12 min', teclas:["U"] },
  { id:96, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: M', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'12 min', teclas:["M"] },
  { id:97, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: S', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'12 min', teclas:["S"] },
  { id:98, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: L', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'12 min', teclas:["L"] },
  { id:99, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: C', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'12 min', teclas:["C"] },
  { id:100, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: P', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'13 min', teclas:["P"] },
  { id:101, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: á', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'13 min', teclas:["á"] },
  { id:102, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: é', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'13 min', teclas:["é"] },
  { id:103, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: í', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'13 min', teclas:["í"] },
  { id:104, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: ó', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'13 min', teclas:["ó"] },
  { id:105, nivel:7, color:'#f59e0b', ico:'fa-microchip', titulo:'Uso de: ú', sub:'Coordinación y Fluidez', meta:'55 WPM', dur:'13 min', teclas:["ú"] },
  { id:106, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: más', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'13 min', teclas:["m"] },
  { id:107, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: qué', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'13 min', teclas:["q"] },
  { id:108, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: sí', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'13 min', teclas:["s"] },
  { id:109, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: él', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'13 min', teclas:["é"] },
  { id:110, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: así', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'14 min', teclas:["a"] },
  { id:111, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: ;', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'14 min', teclas:[";"] },
  { id:112, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: :', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'14 min', teclas:[":"] },
  { id:113, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: -', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'14 min', teclas:["-"] },
  { id:114, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: _', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'14 min', teclas:["_"] },
  { id:115, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:"Uso de: \"", sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'14 min', teclas:["\""] },
  { id:116, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:"Uso de: '", sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'14 min', teclas:["'"] },
  { id:117, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: !', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'14 min', teclas:["!"] },
  { id:118, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: ?', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'14 min', teclas:["?"] },
  { id:119, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: (', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'14 min', teclas:["("] },
  { id:120, nivel:8, color:'#10b981', ico:'fa-gauge', titulo:'Uso de: )', sub:'Coordinación y Fluidez', meta:'60 WPM', dur:'15 min', teclas:[")"] },
  { id:121, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: 1...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'15 min', teclas:["1"] },
  { id:122, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: 2...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'15 min', teclas:["2"] },
  { id:123, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: 3...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'15 min', teclas:["3"] },
  { id:124, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: 4...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'15 min', teclas:["4"] },
  { id:125, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: 5...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'15 min', teclas:["5"] },
  { id:126, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: 6...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'15 min', teclas:["6"] },
  { id:127, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: 7...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'15 min', teclas:["7"] },
  { id:128, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: 8...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'15 min', teclas:["8"] },
  { id:129, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: 9...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'15 min', teclas:["9"] },
  { id:130, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: 0...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'16 min', teclas:["0"] },
  { id:131, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: @...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'16 min', teclas:["@"] },
  { id:132, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: #...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'16 min', teclas:["#"] },
  { id:133, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: $...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'16 min', teclas:["$"] },
  { id:134, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: %...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'16 min', teclas:["%"] },
  { id:135, nivel:9, color:'#ef4444', ico:'fa-book-open', titulo:'Dominio: &...', sub:'Coordinación y Fluidez', meta:'65 WPM', dur:'16 min', teclas:["&"] },
  { id:136, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: /...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'16 min', teclas:["/"] },
  { id:137, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: =...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'16 min', teclas:["="] },
  { id:138, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: {...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'16 min', teclas:["{"] },
  { id:139, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: }...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'16 min', teclas:["}"] },
  { id:140, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: [...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'17 min', teclas:["["] },
  { id:141, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: El veloz m...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'17 min', teclas:["E"] },
  { id:142, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: La vida es...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'17 min', teclas:["L"] },
  { id:143, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: function t...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'17 min', teclas:["f"] },
  { id:144, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: El exito r...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'17 min', teclas:["E"] },
  { id:145, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: console.lo...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'17 min', teclas:["c"] },
  { id:146, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: Un mar en ...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'17 min', teclas:["U"] },
  { id:147, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: En la ciud...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'17 min', teclas:["E"] },
  { id:148, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: const PI =...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'17 min', teclas:["c"] },
  { id:149, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: Nuestra ma...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'17 min', teclas:["N"] },
  { id:150, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Dominio: EL GRAN RE...', sub:'Coordinación y Fluidez', meta:'70 WPM', dur:'18 min', teclas:["E"] }
];;

// Niveles agrupados para filtro y hero
const NIVELES_INFO = [
  { n:1,  lbl:'Fila Central',    color:'#22c55e', ico:'fa-hand'        },
  { n:2,  lbl:'Fila Superior',   color:'#0ea5e9', ico:'fa-arrow-up'    },
  { n:3,  lbl:'Fila Inferior',   color:'#f97316', ico:'fa-arrow-down'  },
  { n:4,  lbl:'Frases y Números',color:'#a855f7', ico:'fa-hashtag'     },
  { n:5,  lbl:'Intermedio',      color:'#06b6d4', ico:'fa-align-left'  },
  { n:6,  lbl:'Párrafos',        color:'#ec4899', ico:'fa-align-justify'},
  { n:7,  lbl:'Avanzado',        color:'#f59e0b', ico:'fa-microchip'   },
  { n:8,  lbl:'Velocidad',       color:'#10b981', ico:'fa-gauge'       },
  { n:9,  lbl:'Experto',         color:'#ef4444', ico:'fa-book-open'   },
  { n:10, lbl:'Maestro',         color:'#7c3aed', ico:'fa-trophy'      },
];

// ── RENDER ────────────────────────────────────────────────────────
export const render = () => `
<div class="lec_page">

  <!-- ══ HERO ══ -->
  <div class="lec_hero">
    <div class="lec_hero_bg">
      <div class="lec_orb lec_orb1"></div>
      <div class="lec_orb lec_orb2"></div>
    </div>
    <div class="lec_hero_body">
      <div class="lec_hero_badge">
        <i class="fas fa-graduation-cap"></i> Plan de estudio progresivo
        <span class="lec_badge_dot"></span>
      </div>
      <h1 class="lec_hero_h1">
        150 lecciones para<br>
        <span class="lec_grad">dominar el teclado</span>
      </h1>
      <p class="lec_hero_sub">
        Desde tus primeras teclas hasta <strong>80 WPM</strong>.
        10 niveles progresivos con teclado visual y sonido.
      </p>
      <div class="lec_hero_prog">
        <div class="lec_hp_info">
          <span><i class="fas fa-check-circle" style="color:var(--success)"></i> 0 completadas</span>
          <span id="lec_global_pct">0 / 150</span>
        </div>
        <div class="lec_hp_track">
          <div class="lec_hp_fill" id="lec_hp_fill" style="width:0%"></div>
        </div>
      </div>
    </div>
    <!-- Stats rápidos -->
    <div class="lec_hero_stats">
      <div class="lec_hs">
        <div class="lec_hs_n">150</div>
        <div class="lec_hs_l"><i class="fas fa-book-open"></i> Lecciones</div>
      </div>
      <div class="lec_hs_sep"></div>
      <div class="lec_hs">
        <div class="lec_hs_n">10</div>
        <div class="lec_hs_l"><i class="fas fa-layer-group"></i> Niveles</div>
      </div>
      <div class="lec_hs_sep"></div>
      <div class="lec_hs">
        <div class="lec_hs_n">~8h</div>
        <div class="lec_hs_l"><i class="fas fa-clock"></i> Duración</div>
      </div>
      <div class="lec_hs_sep"></div>
      <div class="lec_hs">
        <div class="lec_hs_n">80</div>
        <div class="lec_hs_l"><i class="fas fa-bolt"></i> WPM meta</div>
      </div>
    </div>
  </div>

  <!-- ══ FILTROS DE NIVEL ══ -->
  <div class="lec_filtros_wrap">
    <button class="lec_filtro active" data-nv="0" style="--fc:var(--mco)">
      <i class="fas fa-th-large"></i> Todos
    </button>
    ${NIVELES_INFO.map(nv => `
      <button class="lec_filtro" data-nv="${nv.n}" style="--fc:${nv.color}">
        <i class="fas ${nv.ico}" style="color:${nv.color};font-size:.85em"></i>
        N${nv.n} · ${nv.lbl}
      </button>`).join('')}
  </div>

  <!-- ══ GRID DE LECCIONES ══ -->
  <div class="lec_grid" id="lec_grid">
    <!-- Se llena con js (paginado) -->
  </div>
  <div id="lec_more_wrap" style="text-align:center; margin: 3rem 0; display:none;">
    <button id="btn_show_more" class="lec_btn_gho" style="padding: 1rem 3rem; font-size: 1.1em; border-radius: 50px;">
      <i class="fas fa-chevron-down"></i> Mostrar más
    </button>
  </div>



</div>`;

// ── CARD HTML ─────────────────────────────────────────────────────
// lecsOk  : IDs completados (cache) — cero reads
// isAuth  : true si hay sesión activa
function _cardHTML(l, lecsOk = [], isAuth = false) {
  const num      = String(l.id).padStart(2, '0');
  const href     = `/leccion${num}`;
  const page     = `leccion${num}`;
  const nInfo    = NIVELES_INFO.find(n => n.n === l.nivel) || {};

  // Completada y desbloqueada solo aplica si hay auth
  const completada   = isAuth && lecsOk.includes(l.id);
  const desbloqueada = !isAuth || l.id === 1 || lecsOk.includes(l.id - 1) || completada;
  const prac         = completada ? (getls(`wiPrac_${l.id}`) || {}) : {};

  // Badge de estado
  const badge = completada
    ? `<span class="lec_estado lec_ok"><i class="fas fa-check"></i> ${prac.wpm || ''}${prac.wpm ? ' WPM' : 'Hecha'}</span>`
    : (!desbloqueada
      ? `<span class="lec_estado lec_lock"><i class="fas fa-lock"></i></span>`
      : '');

  // Estrellas si completada
  const stars = completada && prac.estrellas
    ? `<div class="lec_stars">${[1,2,3,4,5].map(s => `<i class="fas fa-star ${s<=prac.estrellas?'lec_son':''}"></i>`).join('')}</div>`
    : '';

  return `
    <a class="lec_card wi_fadeUp ${completada ? 'lec_done' : ''} ${!desbloqueada ? 'lec_bloqueada' : ''}" href="${href}" data-page="${page}"
      style="--lc:${l.color}" data-nv="${l.nivel}" data-id="${l.id}"
      ${!desbloqueada ? 'title="Completa la lección anterior primero"' : ''}>

      <!-- Barra superior de color -->
      <div class="lec_card_bar"></div>

      <!-- Header -->
      <div class="lec_card_head">
        <div class="lec_card_ico"><i class="fas ${!desbloqueada ? 'fa-lock' : l.ico}"></i></div>
        <div class="lec_card_tags">
          <span class="lec_tag" style="color:${l.color};border-color:${l.color}">
            N${l.nivel} · ${nInfo.lbl || ''}
          </span>
          ${badge}
        </div>
      </div>

      <!-- Número -->
      <div class="lec_card_num">Lección ${num}</div>

      <!-- Contenido -->
      <h3 class="lec_card_titulo">${l.titulo}</h3>
      <div class="lec_card_sub">${l.sub}</div>

      ${stars}

      <!-- Teclas destacadas -->
      <div class="lec_keys_row">
        ${l.teclas.slice(0, 5).map(k => `<span class="lec_key">${k}</span>`).join('')}
        ${l.teclas.length > 5 ? `<span class="lec_key lec_key_more">+${l.teclas.length - 5}</span>` : ''}
      </div>

      <!-- Footer: meta + duración -->
      <div class="lec_card_foot">
        <div class="lec_foot_meta" ${wiTip('Meta de velocidad')}>
          <i class="fas fa-bolt" style="color:${l.color}"></i>
          <span>${l.meta}</span>
        </div>
        <div class="lec_foot_dur" ${wiTip('Duración estimada')}>
          <i class="fas fa-clock"></i>
          <span>${l.dur}</span>
        </div>
        <div class="lec_foot_go">
          <i class="fas ${completada ? 'fa-redo' : 'fa-arrow-right'}"></i>
        </div>
      </div>
    </a>`;
}

// ── INIT ──────────────────────────────────────────────────────────
let _obs = null;


let currentCount = 15;
let filteredLecciones = [];

export const init = () => {
  const wi     = getls('wiSmile');
  const isAuth = !!wi?.usuario;
  const prog   = isAuth ? (getls('wiProgreso') || {}) : {};
  const lecsOk = prog.leccionesOk || [];
  const pct    = Math.round((lecsOk.length / 150) * 100);

  filteredLecciones = [...LECCIONES];

  const renderGrid = () => {
    const toShow = filteredLecciones.slice(0, currentCount);
    $('#lec_grid').html(toShow.map(l => _cardHTML(l, lecsOk, isAuth)).join(''));
    
    if (currentCount >= filteredLecciones.length) {
      $('#lec_more_wrap').hide();
    } else {
      $('#lec_more_wrap').show();
    }
  };

  renderGrid();

  if (isAuth && lecsOk.length > 0) {
    $('#lec_hp_fill').css('width', `${pct}%`);
    $('#lec_global_pct').text(`${lecsOk.length} / 150`);
    $('.lec_hp_info span:first').html(`<i class="fas fa-check-circle" style="color:var(--success)"></i> ${lecsOk.length} completadas`);
  }

  _obs = wiVista('.lec_card', null, { anim: 'wi_fadeUp', stagger: 45 });

  $(document).off('.lec');

  $(document).on('click.lec', '#btn_show_more', function() {
    currentCount += 15;
    renderGrid();
    // Re-apply observation to new cards
    _obs?.disconnect?.();
    _obs = wiVista('.lec_card:not(.wi_fadeUp_done)', null, { anim: 'wi_fadeUp', stagger: 45 });
  });

  $(document).on('click.lec', '.lec_filtro', function () {
    const nv = +$(this).data('nv');
    $('.lec_filtro').removeClass('active');
    $(this).addClass('active');
    
    if(nv === 0) {
      filteredLecciones = [...LECCIONES];
    } else {
      filteredLecciones = LECCIONES.filter(l => l.nivel === nv);
    }
    currentCount = 15;
    renderGrid();
  });

  $(document).on('click.lec', '.lec_card', function (e) {
    e.preventDefault();
    if ($(this).hasClass('lec_bloqueada')) return;
    const page = $(this).data('page');
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate(`/${page}`));
  });

  console.log(`📚 ${app} — ${LECCIONES.length} lecciones · ${lecsOk.length} completadas`);
};

export const cleanup = () => {
  _obs?.disconnect?.();
  $(document).off('.lec');
};

