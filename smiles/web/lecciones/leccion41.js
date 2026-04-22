// Lección 41 — Código de Programación
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 41,
  "nivel": 9,
  "titulo": "Código de Programación",
  "subtitulo": "Sintaxis y símbolos técnicos",
  "teclasPracticar": [
    "[",
    "]",
    "{",
    "}",
    "(",
    ")"
  ],
  "descripcion": "Los programadores escriben caracteres especiales constantemente.",
  "texto": "function calcular(a, b) { return a + b; } const resultado = calcular(10, 20); console.log(resultado); if (resultado > 25) { alert(\"mayor\"); }"
};

setData(data);
export { render, init, cleanup };
