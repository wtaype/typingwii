// Lección 70 — Palabra: vida
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 70,
  "nivel": 3,
  "titulo": "Palabra: vida",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["v"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "vida vida vida vida vida vida vida vida vida vida"
};

setData(data);
export { render, init, cleanup };
