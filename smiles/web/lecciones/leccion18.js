// Lección 18 — Números 6 al 0
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 18,
  "nivel": 4,
  "titulo": "Números 6 al 0",
  "subtitulo": "Fila numérica — mitad derecha",
  "teclasPracticar": [
    "6",
    "7",
    "8",
    "9",
    "0"
  ],
  "descripcion": "La mano derecha cubre los números del 6 al 0.",
  "texto": "6 7 8 9 0 67 78 89 90 06 678 789 890 906 067 6789 7890 8906 9067 0678"
};

setData(data);
export { render, init, cleanup };
