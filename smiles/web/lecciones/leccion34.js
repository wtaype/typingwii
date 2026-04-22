// Lección 34 — Acentos y Tilde
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 34,
  "nivel": 7,
  "titulo": "Acentos y Tilde",
  "subtitulo": "Español con tildes correctas",
  "teclasPracticar": [],
  "descripcion": "La tilde es parte del español. Practica ubicarla correctamente.",
  "texto": "el café estaba caliente. la música sonaba fuerte. él llegó tarde a la reunión. ¿cómo estás? ¡muy bien, gracias! la dirección es correcta según el mapa."
};

setData(data);
export { render, init, cleanup };
