// Lección 56 — Bigrama Frecuente
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 56,
  "nivel": 2,
  "titulo": "Bigrama Frecuente",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["e"],
  "descripcion": "Practica la transición entre estas letras.",
  "texto": "el el el elel elel el el elel el"
};

setData(data);
export { render, init, cleanup };
