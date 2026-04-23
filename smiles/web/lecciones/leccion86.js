// Lección 86 — Palabra: correr
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 86,
  "nivel": 3,
  "titulo": "Palabra: correr",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["c"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "correr correr correr correr"
};

setData(data);
export { render, init, cleanup };
