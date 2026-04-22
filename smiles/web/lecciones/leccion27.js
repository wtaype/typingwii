// Lección 27 — Párrafo Corto II
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 27,
  "nivel": 6,
  "titulo": "Párrafo Corto II",
  "subtitulo": "Texto con ideas conectadas",
  "teclasPracticar": [],
  "descripcion": "Ideas más complejas conectadas en un párrafo fluido.",
  "texto": "La tecnologia ha transformado la manera en que trabajamos y nos comunicamos. Hoy en dia, saber escribir rapidamente en el teclado es una ventaja competitiva real."
};

setData(data);
export { render, init, cleanup };
