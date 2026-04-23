// Lección 12 — Tecla I
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 12,
  "nivel": 1,
  "titulo": "Tecla I",
  "subtitulo": "Dedo medio derecho (arriba)",
  "teclasPracticar": [
    "i"
  ],
  "descripcion": "Sube ligeramente desde la K.",
  "texto": "iiii iiiii iiiiiii iii iiii iiiii iiiiiiii"
};

setData(data);
export { render, init, cleanup };
