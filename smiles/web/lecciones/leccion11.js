// Lección 11 — Teclas V y B
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 11,
  "nivel": 3,
  "titulo": "Teclas V y B",
  "subtitulo": "Índices bajan a la fila inferior",
  "teclasPracticar": [
    "v",
    "b"
  ],
  "descripcion": "Los índices bajan de F y J a V y B.",
  "texto": "vb bv vb bv verb brave brave value five above brave verb drive verb above five"
};

setData(data);
export { render, init, cleanup };
