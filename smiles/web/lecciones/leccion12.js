// Lección 12 — Teclas N y M
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 12,
  "nivel": 3,
  "titulo": "Teclas N y M",
  "subtitulo": "Índices derechos fila inferior",
  "teclasPracticar": [
    "n",
    "m"
  ],
  "descripcion": "El índice derecho cubre N y M en la fila inferior.",
  "texto": "nm mn nm mn man name main mean mine name mind mine main man name mine mean"
};

setData(data);
export { render, init, cleanup };
