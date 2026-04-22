// Lección 01 — Teclas F y J
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 1,
  "nivel": 1,
  "titulo": "Teclas F y J",
  "subtitulo": "Dedos índices — fila central",
  "teclasPracticar": [
    "f",
    "j"
  ],
  "descripcion": "Los dedos índices descansan sobre F y J. Siente el punto táctil.",
  "texto": "fj fj fj fjfj jfj ffjfj fjfjf jjjjj fffjf fjfj jfjf fffff fjfj jfjfff jfjfjf fff jjjj jfjfjf jfjf"
};

setData(data);
export { render, init, cleanup };
