// Lección 81 — Palabra: llave
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 81,
  "nivel": 3,
  "titulo": "Palabra: llave",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["l"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "llave llave llave llave llave llave llave llave llave llave"
};

setData(data);
export { render, init, cleanup };
