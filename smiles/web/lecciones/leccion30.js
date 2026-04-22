// Lección 30 — Velocidad Inicial
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 30,
  "nivel": 6,
  "titulo": "Velocidad Inicial",
  "subtitulo": "Test de velocidad real",
  "teclasPracticar": [],
  "descripcion": "Escribe lo más rápido que puedas sin sacrificar precisión.",
  "texto": "the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs how vexingly quick daft zebras jump"
};

setData(data);
export { render, init, cleanup };
