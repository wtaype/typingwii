// Lección 13 — Tecla R
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 13,
  "nivel": 1,
  "titulo": "Tecla R",
  "subtitulo": "Dedo índice izquierdo (arriba)",
  "teclasPracticar": [
    "r"
  ],
  "descripcion": "Sube ligeramente desde la F.",
  "texto": "rrrr rrrrr rrrrrrr rrrr rrrr rrrrr rrrr"
};

setData(data);
export { render, init, cleanup };
