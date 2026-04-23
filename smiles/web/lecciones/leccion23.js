// Lección 23 — Tecla C
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 23,
  "nivel": 1,
  "titulo": "Tecla C",
  "subtitulo": "Dedo medio izquierdo (abajo)",
  "teclasPracticar": [
    "c"
  ],
  "descripcion": "Baja ligeramente desde la D.",
  "texto": "cccc ccccc ccccccc ccccc ccccc ccccccc ccccc"
};

setData(data);
export { render, init, cleanup };
