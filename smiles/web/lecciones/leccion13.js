// Lección 13 — Teclas C y coma
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 13,
  "nivel": 3,
  "titulo": "Teclas C y coma",
  "subtitulo": "Dedos medios fila inferior",
  "teclasPracticar": [
    "c",
    ","
  ],
  "descripcion": "Dedos medios bajan de D y K a C y coma.",
  "texto": "nice case once price place since dance face dice mice lace face nice grace since"
};

setData(data);
export { render, init, cleanup };
