// Lección 03 — Teclas S y L
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 3,
  "nivel": 1,
  "titulo": "Teclas S y L",
  "subtitulo": "Dedos anulares — fila central",
  "teclasPracticar": [
    "s",
    "l"
  ],
  "descripcion": "Dedos anulares sobre S y L. Mantén los demás en posición.",
  "texto": "s l s l s l l s l s sl ls sl ls ssl lls slsl lsls fjdk slsl fdkj"
};

setData(data);
export { render, init, cleanup };
