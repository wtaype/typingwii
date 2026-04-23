// Lección 22 — Tecla M
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 22,
  "nivel": 1,
  "titulo": "Tecla M",
  "subtitulo": "Dedo índice derecho (abajo)",
  "teclasPracticar": [
    "m"
  ],
  "descripcion": "Baja y estira ligeramente desde la J.",
  "texto": "mmmm mmmmm mmmmmm mmmmmm mmmmm mmmm mmmmmm"
};

setData(data);
export { render, init, cleanup };
