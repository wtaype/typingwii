// Lección 17 — Números 1 al 5
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 17,
  "nivel": 4,
  "titulo": "Números 1 al 5",
  "subtitulo": "Fila numérica — mitad izquierda",
  "teclasPracticar": [
    "1",
    "2",
    "3",
    "4",
    "5"
  ],
  "descripcion": "Los números se escriben con la misma mano que las letras debajo.",
  "texto": "1 2 3 4 5 12 23 34 45 51 123 234 345 451 512 1234 2345 3451 12345 54321"
};

setData(data);
export { render, init, cleanup };
