// Lección 06 — Teclas E e I
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 6,
  "nivel": 2,
  "titulo": "Teclas E e I",
  "subtitulo": "Dedos medios — fila superior",
  "teclasPracticar": [
    "e",
    "i"
  ],
  "descripcion": "Dedos medios suben de D y K a E e I.",
  "texto": "e i e i ei ie ei ie dei kei sei lei dei sei lei fei eid idk ide ike"
};

setData(data);
export { render, init, cleanup };
