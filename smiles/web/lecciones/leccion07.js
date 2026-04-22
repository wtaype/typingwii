// Lección 07 — Teclas R y U
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 7,
  "nivel": 2,
  "titulo": "Teclas R y U",
  "subtitulo": "Dedos índices — fila superior",
  "teclasPracticar": [
    "r",
    "u"
  ],
  "descripcion": "Los índices suben de F y J a R y U.",
  "texto": "r u r u ru ur ru ur fur ruf sur rus dru jur kur fru rud iru rudi ful"
};

setData(data);
export { render, init, cleanup };
