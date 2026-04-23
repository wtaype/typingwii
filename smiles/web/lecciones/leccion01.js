// Lección 01 — Tecla F
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 1,
  "nivel": 1,
  "titulo": "Tecla F",
  "subtitulo": "Dedo índice izquierdo",
  "teclasPracticar": [
    "f"
  ],
  "descripcion": "Siente el relieve en la tecla.",
  "texto": "ffff ffff fffffff fff ffff fffff ffff"
};

setData(data);
export { render, init, cleanup };
