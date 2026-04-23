// Lección 25 — Tecla X
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 25,
  "nivel": 1,
  "titulo": "Tecla X",
  "subtitulo": "Dedo anular izquierdo (abajo)",
  "teclasPracticar": [
    "x"
  ],
  "descripcion": "Baja ligeramente desde la S.",
  "texto": "xxx xxxxxx xxxxx xxxx xxx xxxx xxxxx"
};

setData(data);
export { render, init, cleanup };
