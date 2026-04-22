// Lección 02 — Teclas D y K
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 2,
  "nivel": 1,
  "titulo": "Teclas D y K",
  "subtitulo": "Dedos medios — fila central",
  "teclasPracticar": [
    "d",
    "k"
  ],
  "descripcion": "Dedos medios sobre D y K, índices en F y J.",
  "texto": "d k d k d k k d k d dk kd dk kd ddk kkd dkdk kdkd fdjk kjdf dfkj"
};

setData(data);
export { render, init, cleanup };
