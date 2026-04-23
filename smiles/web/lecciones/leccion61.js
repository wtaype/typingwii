// Lección 61 — Palabra: sol
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 61,
  "nivel": 3,
  "titulo": "Palabra: sol",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["s"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "sol sol sol sol sol sol sol sol sol sol"
};

setData(data);
export { render, init, cleanup };
