// Lección 79 — Palabra: puente
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 79,
  "nivel": 3,
  "titulo": "Palabra: puente",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["p"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "puente puente puente puente"
};

setData(data);
export { render, init, cleanup };
