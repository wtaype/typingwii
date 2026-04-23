// Lección 145 — Dominio: console.lo...
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 145,
  "nivel": 5,
  "titulo": "Dominio: console.lo...",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["c"],
  "descripcion": "Velocidad y precisión extrema.",
  "texto": "console.log(\"Hola Mundo\"); console.log(\"Hola Mundo\"); console.log(\"Hola Mundo\"); console.log(\"Hola Mundo\");"
};

setData(data);
export { render, init, cleanup };
