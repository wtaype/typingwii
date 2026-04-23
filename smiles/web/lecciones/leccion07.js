// Lección 07 — Tecla A
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 7,
  "nivel": 1,
  "titulo": "Tecla A",
  "subtitulo": "Dedo meñique izquierdo",
  "teclasPracticar": [
    "a"
  ],
  "descripcion": "Estira ligeramente el meñique.",
  "texto": "aaaa aaaaa aaaaaaa aaaa aaaa aaaaa aaaa"
};

setData(data);
export { render, init, cleanup };
