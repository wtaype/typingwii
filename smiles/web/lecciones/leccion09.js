// Lección 09 — Teclas W y O
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 9,
  "nivel": 2,
  "titulo": "Teclas W y O",
  "subtitulo": "Dedos anulares — fila superior",
  "teclasPracticar": [
    "w",
    "o"
  ],
  "descripcion": "Dedos anulares suben de S y L a W y O.",
  "texto": "wo ow wo ow slow flow word work wire wore soft wolf wolf word slow low row"
};

setData(data);
export { render, init, cleanup };
