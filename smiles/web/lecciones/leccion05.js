// Lección 05 — Primeras Palabras
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 5,
  "nivel": 1,
  "titulo": "Primeras Palabras",
  "subtitulo": "Palabras con fila central",
  "teclasPracticar": [
    "a",
    "s",
    "d",
    "f",
    "j",
    "k",
    "l"
  ],
  "descripcion": "Las primeras palabras reales usando solo la fila central.",
  "texto": "sal sal ala faja jala deja laja falda salsa flask flask salsa deja faja ala sal"
};

setData(data);
export { render, init, cleanup };
