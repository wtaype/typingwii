// Lección 80 — Palabra: viento
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 80,
  "nivel": 3,
  "titulo": "Palabra: viento",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["v"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "viento viento viento viento"
};

setData(data);
export { render, init, cleanup };
