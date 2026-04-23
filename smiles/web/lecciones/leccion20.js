// Lección 20 — Tecla P
// TypingWii · Jesús es mi Señor 🙏
import { setData, render, init, cleanup } from './leccion.js';

export const data = {
  "id": 20,
  "nivel": 1,
  "titulo": "Tecla P",
  "subtitulo": "Dedo meñique derecho (arriba)",
  "teclasPracticar": [
    "p"
  ],
  "descripcion": "Sube ligeramente desde la Ñ.",
  "texto": "pppppp ppppppp ppppp pppppp ppppppp ppppppp"
};

setData(data);
export { render, init, cleanup };
