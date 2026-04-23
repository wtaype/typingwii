// Lección 09 — Tecla G
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 9,
  "nivel": 1,
  "titulo": "Tecla G",
  "subtitulo": "Dedo índice izquierdo (extensión)",
  "teclasPracticar": [
    "g"
  ],
  "descripcion": "Estira el índice hacia la derecha y regresa a la F.",
  "texto": "gggg ggggg ggggggg ggg gggg ggggg gggg"
};

setData(data);
export { render, init, cleanup };
