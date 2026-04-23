// Lección 69 — Palabra: mesa
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 69,
  "nivel": 3,
  "titulo": "Palabra: mesa",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["m"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "mesa mesa mesa mesa mesa mesa mesa mesa mesa mesa"
};

setData(data);
export { render, init, cleanup };
