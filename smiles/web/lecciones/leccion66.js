// Lección 66 — Palabra: casa
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 66,
  "nivel": 3,
  "titulo": "Palabra: casa",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["c"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "casa casa casa casa casa casa casa casa casa casa"
};

setData(data);
export { render, init, cleanup };
