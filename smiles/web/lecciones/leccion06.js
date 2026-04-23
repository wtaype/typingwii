// Lección 06 — Tecla L
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 6,
  "nivel": 1,
  "titulo": "Tecla L",
  "subtitulo": "Dedo anular derecho",
  "teclasPracticar": [
    "l"
  ],
  "descripcion": "Un dedo más débil, concéntrate.",
  "texto": "llllll llllllllll lllllllll llll lllll llllllll llllll"
};

setData(data);
export { render, init, cleanup };
