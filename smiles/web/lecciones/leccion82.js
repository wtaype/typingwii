// Lección 82 — Palabra: perro
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 82,
  "nivel": 3,
  "titulo": "Palabra: perro",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["p"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "perro perro perro perro perro perro perro perro perro perro"
};

setData(data);
export { render, init, cleanup };
