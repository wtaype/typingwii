// Lección 08 — Tecla Ñ
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 8,
  "nivel": 1,
  "titulo": "Tecla Ñ",
  "subtitulo": "Dedo meñique derecho",
  "teclasPracticar": [
    "ñ"
  ],
  "descripcion": "Alcanza el extremo derecho de la fila guía.",
  "texto": "ññññ ñññññ ñññññññ ñññ ññññ ñññññ ññññ"
};

setData(data);
export { render, init, cleanup };
