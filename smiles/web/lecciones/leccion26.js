// Lección 26 — Párrafo Corto I
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 26,
  "nivel": 6,
  "titulo": "Párrafo Corto I",
  "subtitulo": "Texto continuo sin pausas",
  "teclasPracticar": [],
  "descripcion": "Escribe el párrafo completo sin detenerte. Fluidez es la clave.",
  "texto": "El aprendizaje de la mecanografia requiere practica diaria. Comienza despacio y gana velocidad con el tiempo. La paciencia es tu mejor aliada en este proceso."
};

setData(data);
export { render, init, cleanup };
