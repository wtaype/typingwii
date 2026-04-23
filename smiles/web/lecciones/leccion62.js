// Lección 62 — Palabra: pan
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 62,
  "nivel": 3,
  "titulo": "Palabra: pan",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["p"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "pan pan pan pan pan pan pan pan pan pan"
};

setData(data);
export { render, init, cleanup };
