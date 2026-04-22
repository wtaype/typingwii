// Lección 39 — Texto Académico
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 39,
  "nivel": 9,
  "titulo": "Texto Académico",
  "subtitulo": "Redacción universitaria",
  "teclasPracticar": [],
  "descripcion": "El tipo de texto que se escribe en tesis, informes y ensayos.",
  "texto": "La hipotesis planteada en esta investigacion sostiene que la practica deliberada de mecanografia durante 21 dias consecutivos produce una mejora estadisticamente significativa en la velocidad de escritura de los participantes."
};

setData(data);
export { render, init, cleanup };
