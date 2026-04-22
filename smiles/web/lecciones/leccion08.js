// Lección 08 — Teclas T e Y
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 8,
  "nivel": 2,
  "titulo": "Teclas T e Y",
  "subtitulo": "Índices al centro superior",
  "teclasPracticar": [
    "t",
    "y"
  ],
  "descripcion": "T e Y son teclas de índice que se extienden al centro.",
  "texto": "ty yt ty yt fat data tidy style fruit dirty thirty sixty dusty try yet"
};

setData(data);
export { render, init, cleanup };
