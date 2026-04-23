// Lección 85 — Palabra: valle
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 85,
  "nivel": 3,
  "titulo": "Palabra: valle",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["v"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "valle valle valle valle valle valle valle valle valle valle"
};

setData(data);
export { render, init, cleanup };
