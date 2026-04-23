// Lección 11 — Tecla E
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 11,
  "nivel": 1,
  "titulo": "Tecla E",
  "subtitulo": "Dedo medio izquierdo (arriba)",
  "teclasPracticar": [
    "e"
  ],
  "descripcion": "Sube ligeramente desde la D.",
  "texto": "eeee eeeeee eeeeeee eeee eeee eeeeee eeee"
};

setData(data);
export { render, init, cleanup };
