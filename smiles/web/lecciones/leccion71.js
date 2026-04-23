// Lección 71 — Palabra: tiempo
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 71,
  "nivel": 3,
  "titulo": "Palabra: tiempo",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["t"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "tiempo tiempo tiempo tiempo"
};

setData(data);
export { render, init, cleanup };
