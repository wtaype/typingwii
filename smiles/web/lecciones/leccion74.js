// Lección 74 — Palabra: ciudad
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 74,
  "nivel": 3,
  "titulo": "Palabra: ciudad",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["c"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "ciudad ciudad ciudad ciudad"
};

setData(data);
export { render, init, cleanup };
