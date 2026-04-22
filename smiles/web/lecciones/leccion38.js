// Lección 38 — Velocidad Objetivo: 60 WPM
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 38,
  "nivel": 8,
  "titulo": "Velocidad Objetivo: 60 WPM",
  "subtitulo": "Nivel avanzado",
  "teclasPracticar": [],
  "descripcion": "60 WPM te sitúa entre el 30% de los mejores mecanógrafos.",
  "texto": "speed comes from accuracy not the other way around. when you type accurately your brain builds muscle memory and your fingers find the keys without thinking. that automatic response is what creates real typing speed over time."
};

setData(data);
export { render, init, cleanup };
