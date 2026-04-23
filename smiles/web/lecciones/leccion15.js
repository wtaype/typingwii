// Lección 15 — Tecla T
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 15,
  "nivel": 1,
  "titulo": "Tecla T",
  "subtitulo": "Dedo índice izquierdo (arriba-ext)",
  "teclasPracticar": [
    "t"
  ],
  "descripcion": "Sube y estira hacia la derecha desde la F.",
  "texto": "ttttt tttttt ttttttt ttttt ttttt tttttt ttttt"
};

setData(data);
export { render, init, cleanup };
