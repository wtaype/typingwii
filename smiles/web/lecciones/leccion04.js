// Lección 04 — Tecla K
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 4,
  "nivel": 1,
  "titulo": "Tecla K",
  "subtitulo": "Dedo medio derecho",
  "teclasPracticar": [
    "k"
  ],
  "descripcion": "Mantén el dedo relajado.",
  "texto": "kkkk kkkkk kkkkkkk kkk kkkk kkkkk kkkk"
};

setData(data);
export { render, init, cleanup };
