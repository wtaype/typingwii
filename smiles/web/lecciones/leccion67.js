// Lección 67 — Palabra: flor
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 67,
  "nivel": 3,
  "titulo": "Palabra: flor",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["f"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "flor flor flor flor flor flor flor flor flor flor"
};

setData(data);
export { render, init, cleanup };
