// Lección 10 — Fila Superior + Central
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 10,
  "nivel": 2,
  "titulo": "Fila Superior + Central",
  "subtitulo": "Q W E R T Y U I O P",
  "teclasPracticar": [
    "q",
    "p",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o"
  ],
  "descripcion": "Combinando las dos filas superiores. Practica el movimiento.",
  "texto": "quite price write types yours fruit sport story quiet proud tired first water"
};

setData(data);
export { render, init, cleanup };
