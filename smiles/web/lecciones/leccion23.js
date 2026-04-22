// Lección 23 — Palabras Comunes
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 23,
  "nivel": 5,
  "titulo": "Palabras Comunes",
  "subtitulo": "Las 50 palabras más usadas",
  "teclasPracticar": [],
  "descripcion": "Domina estas palabras y tendrás el 50% del español cubierto.",
  "texto": "de la que el en y a los se del las un por con no una su para es al lo como mas"
};

setData(data);
export { render, init, cleanup };
