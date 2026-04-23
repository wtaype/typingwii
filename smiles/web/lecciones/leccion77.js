// Lección 77 — Palabra: blanco
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 77,
  "nivel": 3,
  "titulo": "Palabra: blanco",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["b"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "blanco blanco blanco blanco"
};

setData(data);
export { render, init, cleanup };
