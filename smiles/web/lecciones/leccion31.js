// Lección 31 — Texto Técnico I
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 31,
  "nivel": 7,
  "titulo": "Texto Técnico I",
  "subtitulo": "Vocabulario especializado",
  "teclasPracticar": [],
  "descripcion": "Textos técnicos que aparecen en documentos profesionales.",
  "texto": "El sistema operativo gestiona los recursos del hardware y software. La memoria RAM permite ejecutar multiples procesos de forma simultanea y eficiente."
};

setData(data);
export { render, init, cleanup };
