// Lección 21 — Puntuación Básica
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 21,
  "nivel": 5,
  "titulo": "Puntuación Básica",
  "subtitulo": "Punto, coma y dos puntos",
  "teclasPracticar": [
    ".",
    ","
  ],
  "descripcion": "La puntuación es parte esencial de la escritura profesional.",
  "texto": "hola, mundo. esto es una prueba, de puntuacion. escribir bien: usar comas, puntos."
};

setData(data);
export { render, init, cleanup };
