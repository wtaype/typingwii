// Lección 15 — Todas las filas
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 15,
  "nivel": 3,
  "titulo": "Todas las filas",
  "subtitulo": "QWERTY completo sin números",
  "teclasPracticar": [],
  "descripcion": "Primera vez usando todas las teclas de letras juntas.",
  "texto": "the quick brown fox jumps over the lazy dog el zorro rapido salta sobre el perro"
};

setData(data);
export { render, init, cleanup };
