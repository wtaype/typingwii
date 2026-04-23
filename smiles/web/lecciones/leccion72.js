// Lección 72 — Palabra: camino
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 72,
  "nivel": 3,
  "titulo": "Palabra: camino",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["c"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "camino camino camino camino"
};

setData(data);
export { render, init, cleanup };
