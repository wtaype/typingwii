// Lección 05 — Tecla S
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 5,
  "nivel": 1,
  "titulo": "Tecla S",
  "subtitulo": "Dedo anular izquierdo",
  "teclasPracticar": [
    "s"
  ],
  "descripcion": "Un dedo más débil, requiere paciencia.",
  "texto": "ssss sssss sssssss sss ssss sssss ssss"
};

setData(data);
export { render, init, cleanup };
