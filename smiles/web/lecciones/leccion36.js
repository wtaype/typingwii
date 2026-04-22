// Lección 36 — Velocidad Objetivo: 40 WPM
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 36,
  "nivel": 8,
  "titulo": "Velocidad Objetivo: 40 WPM",
  "subtitulo": "Nivel profesional básico",
  "teclasPracticar": [],
  "descripcion": "Objetivo: completar este texto alcanzando 40 WPM con 95% de precisión.",
  "texto": "la productividad en el trabajo aumenta significativamente cuando dominas la mecanografia. los profesionales que escriben rapido ahorran horas cada semana y pueden enfocarse en tareas de mayor valor para su empresa y su desarrollo personal."
};

setData(data);
export { render, init, cleanup };
