// Lección 18 — Tecla O
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 18,
  "nivel": 1,
  "titulo": "Tecla O",
  "subtitulo": "Dedo anular derecho (arriba)",
  "teclasPracticar": [
    "o"
  ],
  "descripcion": "Sube ligeramente desde la L.",
  "texto": "oooo ooooo ooooooo oooo oooo ooooo oooo"
};

setData(data);
export { render, init, cleanup };
