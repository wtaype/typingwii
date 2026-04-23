// Lección 10 — Tecla H
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 10,
  "nivel": 1,
  "titulo": "Tecla H",
  "subtitulo": "Dedo índice derecho (extensión)",
  "teclasPracticar": [
    "h"
  ],
  "descripcion": "Estira el índice hacia la izquierda y regresa a la J.",
  "texto": "hhhh hhhhh hhhhhhh hhh hhhh hhhhh hhhh"
};

setData(data);
export { render, init, cleanup };
