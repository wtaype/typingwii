// Lección 21 — Tecla V
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 21,
  "nivel": 1,
  "titulo": "Tecla V",
  "subtitulo": "Dedo índice izquierdo (abajo)",
  "teclasPracticar": [
    "v"
  ],
  "descripcion": "Baja y estira ligeramente desde la F.",
  "texto": "vvvv vvvvv vvvvvvv vvvvvvvv vvvv vvvvv vvvv"
};

setData(data);
export { render, init, cleanup };
