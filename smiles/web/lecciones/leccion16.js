// Lección 16 — Frases Simples
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 16,
  "nivel": 4,
  "titulo": "Frases Simples",
  "subtitulo": "Velocidad con precisión",
  "teclasPracticar": [],
  "descripcion": "Escribe frases completas con buena postura y sin prisa.",
  "texto": "el sol sale cada dia la vida es bella el trabajo es digno sigue adelante con fe"
};

setData(data);
export { render, init, cleanup };
