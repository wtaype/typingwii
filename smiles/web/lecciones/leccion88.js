// Lección 88 — Palabra: accion
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 88,
  "nivel": 3,
  "titulo": "Palabra: accion",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["a"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "accion accion accion accion"
};

setData(data);
export { render, init, cleanup };
