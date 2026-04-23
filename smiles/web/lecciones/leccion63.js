// Lección 63 — Palabra: mar
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 63,
  "nivel": 3,
  "titulo": "Palabra: mar",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["m"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "mar mar mar mar mar mar mar mar mar mar"
};

setData(data);
export { render, init, cleanup };
