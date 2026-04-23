// Lección 87 — Palabra: carro
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 87,
  "nivel": 3,
  "titulo": "Palabra: carro",
  "subtitulo": "Coordinación y Fluidez",
  "teclasPracticar": ["c"],
  "descripcion": "Escribe la palabra completa sin pausas.",
  "texto": "carro carro carro carro carro carro carro carro carro carro"
};

setData(data);
export { render, init, cleanup };
