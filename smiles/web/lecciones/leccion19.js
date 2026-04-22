// Lección 19 — Todos los números
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 19,
  "nivel": 4,
  "titulo": "Todos los números",
  "subtitulo": "Fila numérica completa",
  "teclasPracticar": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0"
  ],
  "descripcion": "Números completos con palabras mezcladas.",
  "texto": "hay 12 meses en 1 año son 365 dias o 8760 horas en 2025 hubo 100 lecciones"
};

setData(data);
export { render, init, cleanup };
