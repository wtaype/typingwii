// Lección 90 — Palabra: ficcion
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 90,
  "nivel": 3,
  "titulo": "Palabra: ficcion",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["f"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "ficcion ficcion ficcion ficcion"
};

setData(data);
export { render, init, cleanup };
