// Lección 64 — Palabra: luz
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 64,
  "nivel": 3,
  "titulo": "Palabra: luz",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["l"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "luz luz luz luz luz luz luz luz luz luz"
};

setData(data);
export { render, init, cleanup };
