// Lección 20 — Texto Real
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 20,
  "nivel": 4,
  "titulo": "Texto Real",
  "subtitulo": "Práctica con texto natural",
  "teclasPracticar": [],
  "descripcion": "Texto real para medir tu velocidad y precisión actuales.",
  "texto": "La mecanografia es una habilidad esencial hoy en dia. Practicar cada dia mejora la velocidad y la precision. Con dedicacion puedes alcanzar 60 palabras por minuto o mas."
};

setData(data);
export { render, init, cleanup };
