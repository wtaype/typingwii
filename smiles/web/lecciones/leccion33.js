// Lección 33 — Párrafo Largo I
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 33,
  "nivel": 7,
  "titulo": "Párrafo Largo I",
  "subtitulo": "Resistencia y concentración",
  "teclasPracticar": [],
  "descripcion": "Un texto más largo para entrenar resistencia. No te detengas.",
  "texto": "Uno de los secretos de los mecanografos expertos es la constancia. Practican cada dia, aunque sea por 15 minutos. Con el tiempo, sus dedos aprenden los movimientos y ya no necesitan pensar en donde esta cada tecla. Eso se llama memoria muscular."
};

setData(data);
export { render, init, cleanup };
