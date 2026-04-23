// Lección 14 — Tecla U
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 14,
  "nivel": 1,
  "titulo": "Tecla U",
  "subtitulo": "Dedo índice derecho (arriba)",
  "teclasPracticar": [
    "u"
  ],
  "descripcion": "Sube ligeramente desde la J.",
  "texto": "uuuu uuuuu uuuuuuu uuu uuuu uuuuu uuuu"
};

setData(data);
export { render, init, cleanup };
