// Lección 19 — Tecla Q
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 19,
  "nivel": 1,
  "titulo": "Tecla Q",
  "subtitulo": "Dedo meñique izquierdo (arriba)",
  "teclasPracticar": [
    "q"
  ],
  "descripcion": "Sube ligeramente desde la A.",
  "texto": "qqqq qqqqq qqqqqqq qqq qqqq qqqqq qqqq"
};

setData(data);
export { render, init, cleanup };
