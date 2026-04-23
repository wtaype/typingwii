// Lección 24 — Tecla N
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 24,
  "nivel": 1,
  "titulo": "Tecla N",
  "subtitulo": "Dedo índice derecho (abajo)",
  "teclasPracticar": [
    "n"
  ],
  "descripcion": "Baja ligeramente desde la J.",
  "texto": "nnnn nnnnn nnnnnnn nnnnn nnnnn nnnnnnn nnnnn"
};

setData(data);
export { render, init, cleanup };
