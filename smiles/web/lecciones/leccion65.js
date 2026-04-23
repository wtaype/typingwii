// Lección 65 — Palabra: voz
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 65,
  "nivel": 3,
  "titulo": "Palabra: voz",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["v"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "voz voz voz voz voz voz voz voz voz voz"
};

setData(data);
export { render, init, cleanup };
