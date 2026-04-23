// Lección 89 — Palabra: leccion
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 89,
  "nivel": 3,
  "titulo": "Palabra: leccion",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["l"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "leccion leccion leccion leccion"
};

setData(data);
export { render, init, cleanup };
