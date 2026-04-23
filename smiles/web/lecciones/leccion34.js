// Lección 34 — Mix Meñiques
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 34,
  "nivel": 2,
  "titulo": "Mix Meñiques",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["a"],
  "descripcion": "Practica la transición entre estas letras.",
  "texto": "aaaaa ñññññ añañañañañ añañañañañ añaaaaañañañañañ"
};

setData(data);
export { render, init, cleanup };
