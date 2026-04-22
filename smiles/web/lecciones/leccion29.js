// Lección 29 — Email Profesional
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 29,
  "nivel": 6,
  "titulo": "Email Profesional",
  "subtitulo": "Redacción de comunicados",
  "teclasPracticar": [],
  "descripcion": "El tipo de texto que más escribirás en tu trabajo diario.",
  "texto": "Estimado equipo, les informo que la reunion del viernes queda reprogramada para el lunes a las 10 de la manana. Por favor confirmen su asistencia. Gracias."
};

setData(data);
export { render, init, cleanup };
