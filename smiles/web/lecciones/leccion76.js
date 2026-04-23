// Lección 76 — Palabra: puerta
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 76,
  "nivel": 3,
  "titulo": "Palabra: puerta",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["p"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "puerta puerta puerta puerta"
};

setData(data);
export { render, init, cleanup };
