// Lección 75 — Palabra: tierra
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 75,
  "nivel": 3,
  "titulo": "Palabra: tierra",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["t"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "tierra tierra tierra tierra"
};

setData(data);
export { render, init, cleanup };
