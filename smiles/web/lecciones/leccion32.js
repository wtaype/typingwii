// Lección 32 — Texto Técnico II
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 32,
  "nivel": 7,
  "titulo": "Texto Técnico II",
  "subtitulo": "Informática y tecnología",
  "teclasPracticar": [],
  "descripcion": "Términos de tecnología que todo profesional moderno debe conocer.",
  "texto": "La inteligencia artificial y el aprendizaje automatico son tecnologias que estan redefiniendo industrias como la medicina, finanzas, educacion y manufactura."
};

setData(data);
export { render, init, cleanup };
