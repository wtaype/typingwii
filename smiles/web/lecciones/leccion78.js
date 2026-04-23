// Lección 78 — Palabra: fuerza
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 78,
  "nivel": 3,
  "titulo": "Palabra: fuerza",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["f"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "fuerza fuerza fuerza fuerza"
};

setData(data);
export { render, init, cleanup };
