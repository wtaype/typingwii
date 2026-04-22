// Lección 28 — Números en Contexto
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 28,
  "nivel": 6,
  "titulo": "Números en Contexto",
  "subtitulo": "Mezcla de texto y números",
  "teclasPracticar": [],
  "descripcion": "Números integrados en texto real, como en documentos reales.",
  "texto": "En 2024 se registraron 1500 estudiantes. El 75 por ciento logro superar los 40 WPM. Solo 120 alumnos alcanzaron los 80 WPM en menos de 30 dias."
};

setData(data);
export { render, init, cleanup };
