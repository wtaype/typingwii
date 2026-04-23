// Lección 03 — Tecla D
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 3,
  "nivel": 1,
  "titulo": "Tecla D",
  "subtitulo": "Dedo medio izquierdo",
  "teclasPracticar": [
    "d"
  ],
  "descripcion": "Mantén el dedo relajado.",
  "texto": "dddd ddddd ddddddd ddd dddd ddddd dddd"
};

setData(data);
export { render, init, cleanup };
