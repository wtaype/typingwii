// Lección 73 — Palabra: fuerte
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 73,
  "nivel": 3,
  "titulo": "Palabra: fuerte",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["f"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "fuerte fuerte fuerte fuerte"
};

setData(data);
export { render, init, cleanup };
