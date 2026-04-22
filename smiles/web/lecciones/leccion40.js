// Lección 40 — Texto Jurídico
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 40,
  "nivel": 9,
  "titulo": "Texto Jurídico",
  "subtitulo": "Redacción legal y formal",
  "teclasPracticar": [],
  "descripcion": "El lenguaje formal y preciso de documentos legales y contractuales.",
  "texto": "Por medio del presente documento, las partes acuerdan los terminos y condiciones establecidos. Cualquier modificacion debera realizarse por escrito con la firma de ambas partes contratantes."
};

setData(data);
export { render, init, cleanup };
