// Lección 84 — Palabra: lleno
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 84,
  "nivel": 3,
  "titulo": "Palabra: lleno",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["l"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "lleno lleno lleno lleno lleno lleno lleno lleno lleno lleno"
};

setData(data);
export { render, init, cleanup };
