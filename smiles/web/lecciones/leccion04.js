// Lección 04 — Fila Central Completa
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 4,
  "nivel": 1,
  "titulo": "Fila Central Completa",
  "subtitulo": "A S D F J K L Ñ",
  "teclasPracticar": [
    "a",
    "s",
    "d",
    "f",
    "j",
    "k",
    "l"
  ],
  "descripcion": "La posición base completa. Cada dedo en su tecla.",
  "texto": "asdf jkl asdf jkl fdsa lkj asdfjkl jklasdf fj dk sl aj sk dl fk"
};

setData(data);
export { render, init, cleanup };
