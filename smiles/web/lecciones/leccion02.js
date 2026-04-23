// Lección 02 — Tecla J
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 2,
  "nivel": 1,
  "titulo": "Tecla J",
  "subtitulo": "Dedo índice derecho",
  "teclasPracticar": [
    "j"
  ],
  "descripcion": "Siente el relieve en la tecla.",
  "texto": "jjjj jjjjjj jjjjjjj jjj jjjj jjjjj jjjj"
};

setData(data);
export { render, init, cleanup };
