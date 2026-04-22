// Lección 22 — Mayúsculas con Shift
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 22,
  "nivel": 5,
  "titulo": "Mayúsculas con Shift",
  "subtitulo": "Shift + tecla = mayúscula",
  "teclasPracticar": [],
  "descripcion": "Usa el Shift opuesto: mayúscula derecha con Shift izquierdo y viceversa.",
  "texto": "Peru Lima Arequipa Cusco Trujillo Piura Iquitos Tacna Lima Peru America Latina"
};

setData(data);
export { render, init, cleanup };
