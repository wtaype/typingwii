// Lección 26 — Tecla B
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 26,
  "nivel": 1,
  "titulo": "Tecla B",
  "subtitulo": "Dedo índice izquierdo (abajo-ext)",
  "teclasPracticar": [
    "b"
  ],
  "descripcion": "Estira hacia abajo y al centro.",
  "texto": "bbbbbb bbbb bbbbbb bbbbbbb bbbbbbbbbbb"
};

setData(data);
export { render, init, cleanup };
