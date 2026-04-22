// Lección 44 — Texto Mixto Complejo
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 44,
  "nivel": 10,
  "titulo": "Texto Mixto Complejo",
  "subtitulo": "Letras, números y símbolos",
  "teclasPracticar": [],
  "descripcion": "El reto final: texto con toda variedad de caracteres.",
  "texto": "En 2024, el 87% de los trabajos requieren habilidades digitales. Un buen mecanografo (60+ WPM) gana hasta 25% mas. La formula: 30 minutos/dia durante 90 dias = transformacion total."
};

setData(data);
export { render, init, cleanup };
