// Lección 25 — Frases del Día a Día
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 25,
  "nivel": 5,
  "titulo": "Frases del Día a Día",
  "subtitulo": "Comunicación cotidiana",
  "teclasPracticar": [],
  "descripcion": "Frases que usarás en trabajo y vida personal.",
  "texto": "buenos dias como estas muy bien gracias por favor disculpe hasta luego nos vemos"
};

setData(data);
export { render, init, cleanup };
