import './comenzar.css';
import $ from 'jquery';
import { Notificacion, wiTip } from '../../widev.js';
import { app } from '../../wii.js';

// ── TEXTOS ────────────────────────────────────────────────────────
const TEXTOS = [
  {
    id: 1, nivel: 'Fácil', color: '#22c55e', ico: 'fa-seedling',
    texto: `El sol sale por las mañanas y nos da mucha alegria. Es un dia muy bonito para caminar por el campo y ver las flores de colores. Los pajaros cantan en los arboles mientras el viento sopla suave.

Me gusta mucho leer libros de aventuras y viajes espaciales. Poder imaginar mundos diferentes es algo que me hace muy feliz. Siempre llevo una libreta para escribir mis ideas y pensamientos.

Mañana iremos a la playa con toda la familia a jugar con la arena. Llevaremos comida rica y mucha agua fresca para pasar el calor. Nada es mejor que estar juntos y pasar momentos divertidos.`,
  },
  {
    id: 2, nivel: 'Medio', color: '#0EBEFF', ico: 'fa-keyboard',
    texto: `La mecanografía es una habilidad esencial en el mundo digital actual. Escribir con fluidez y sin mirar el teclado permite que nuestras ideas fluyan directamente a la pantalla. Es cuestión de práctica y constancia diaria.

El aprendizaje de esta técnica requiere paciencia y una postura correcta frente al computador. Mantener la espalda recta y las manos en la posición base es fundamental para evitar la fatiga y mejorar la precisión a largo plazo.

Con el tiempo, notarás cómo tu velocidad aumenta significativamente y cometes menos errores. La satisfacción de completar un texto largo en pocos minutos es una gran recompensa para cualquier estudiante o profesional moderno.`,
  },
  {
    id: 3, nivel: 'Difícil', color: '#f97316', ico: 'fa-bolt',
    texto: `La exploración del cosmos ha revelado misterios inimaginables: desde agujeros negros masivos hasta exoplanetas con atmósferas complejas (H2O, CH4). El telescopio James Webb, operando a 1.5 millones de km, captura luz infrarroja ancestral.

En el ámbito de la computación cuántica, el entrelazamiento y la superposición permiten procesar algoritmos a una escala exponencial. Los "qubits" no se limitan a 0 o 1, sino que existen en estados probabilísticos altamente inestables y prometedores.

El desafío de la humanidad radica en equilibrar el progreso tecnológico con la preservación del ecosistema global. ¿Lograremos mitigar el impacto del CO2 antes de alcanzar el punto de no retorno? La ciencia y la ética deben caminar juntas.`,
  },
];

// ── TIEMPOS ───────────────────────────────────────────────────────
const TIEMPOS = [
  { id: 0,   lbl: '∞ Sin límite'  },
  { id: 30,  lbl: '30 segundos'   },
  { id: 60,  lbl: '1 minuto'      },
  { id: 120, lbl: '2 minutos'     },
  { id: 300, lbl: '5 minutos'     },
];

// ── ESTADO ────────────────────────────────────────────────────────
const S = { NEUTRAL: 0, CORRECT: 1, CORRECTED: 2, ERROR: 3 };

let tiempoSel = 60;
let E = _nuevoE(TEXTOS[0]);

function _nuevoE(t) {
  return {
    texto: t, chars: [], pos: 0,
    iniciado: false, finalizado: false,
    timerID: null,
    segundos: tiempoSel,
    elapsed: 0,
  };
}

// ── RENDER ────────────────────────────────────────────────────────
export const render = () => {
  const nivelOpts = TEXTOS.map(t =>
    `<option value="${t.id}">${t.ico.includes('seedling') ? '🌱' :
      t.ico.includes('keyboard') ? '⌨️' :
      t.ico.includes('bolt') ? '⚡' :
      t.ico.includes('fire') ? '🔥' : '🏆'} ${t.nivel}</option>`
  ).join('');
  const tiempoOpts = TIEMPOS.map(t =>
    `<option value="${t.id}"${t.id === 60 ? ' selected' : ''}>${t.lbl}</option>`
  ).join('');

  return `
<div class="cz_page">

  <!-- ══ HEADER CONTROL BAR ══ -->
  <div class="cz_ctrl_bar">
    <div class="cz_ctrl_brand">
      <div class="cz_ctrl_icon"><i class="fas fa-keyboard"></i></div>
      <div>
        <div class="cz_ctrl_title">Práctica de Mecanografía</div>
        <div class="cz_ctrl_sub">${app}</div>
      </div>
    </div>

    <!-- SELECTS -->
    <div class="cz_ctrl_selects">
      <div class="cz_sel_wrap">
        <i class="fas fa-layer-group cz_sel_ico"></i>
        <select id="cz_sel_nivel" class="cz_select">${nivelOpts}</select>
      </div>
      <div class="cz_sel_wrap">
        <i class="fas fa-clock cz_sel_ico"></i>
        <select id="cz_sel_tiempo" class="cz_select">${tiempoOpts}</select>
      </div>
    </div>

    <!-- LIVE STATS -->
    <div class="cz_ctrl_stats">
      <div class="cz_stat_pill cz_sp_wpm" ${wiTip('Palabras por minuto')}>
        <i class="fas fa-bolt"></i>
        <span id="cz_wpm">0</span>
        <small>WPM</small>
      </div>
      <div class="cz_stat_pill cz_sp_prec" ${wiTip('Precisión')}>
        <i class="fas fa-bullseye"></i>
        <span id="cz_prec">100</span>
        <small>%</small>
      </div>
      <div class="cz_stat_pill cz_sp_timer cz_hstat_timer" id="cz_timer_box" ${wiTip('Tiempo restante')}>
        <i class="fas fa-clock" id="cz_timer_ico"></i>
        <span id="cz_secs">—</span>
        <small id="cz_secs_lbl">seg</small>
      </div>
      <button class="cz_btn_restart" id="cz_btn_restart" ${wiTip('Reiniciar · Esc')}>
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>
  </div>

  <!-- ══ PROGRESS INDICATORS ══ -->
  <div class="cz_progress_bar_wrap">
    <div class="cz_pb_label">
      <div class="cz_nivel_chip" id="cz_nivel_chip">
        <i class="fas ${TEXTOS[0].ico}"></i>
        <span>${TEXTOS[0].nivel}</span>
      </div>
      <div class="cz_pb_mini_stats">
        <span class="cz_pb_ms cz_pb_suc" ${wiTip('Aciertos')}><i class="fas fa-check"></i> <b id="cz_cnt_suc">0</b></span>
        <span class="cz_pb_ms cz_pb_cor" ${wiTip('Corregidos')}><i class="fas fa-rotate-right"></i> <b id="cz_cnt_inf">0</b></span>
        <span class="cz_pb_ms cz_pb_war" ${wiTip('Pendientes de corregir')}><i class="fas fa-triangle-exclamation"></i> <b id="cz_cnt_war">0</b></span>
        <span class="cz_pb_ms cz_pb_err" ${wiTip('Errores sin corregir')}><i class="fas fa-xmark"></i> <b id="cz_cnt_err">0</b></span>
      </div>
      <div class="cz_char_count">
        <span id="cz_pos">0</span><span class="cz_char_sep">/</span><span id="cz_total">${TEXTOS[0].texto.length}</span>
        <small>chars</small>
      </div>
    </div>
    <div class="cz_prog_track">
      <div class="cz_prog_fill" id="cz_prog_fill" style="width:0%;background:${TEXTOS[0].color}"></div>
    </div>
  </div>

  <!-- ══ TYPING AREA ══ -->
  <div class="cz_typing_wrap">
    <div class="cz_texto_area" id="cz_texto_display" tabindex="0">
      <!-- Hint overlay -->
      <div class="cz_hint_overlay" id="cz_hint">
        <div class="cz_hint_inner">
          <i class="fas fa-hand-pointer cz_hint_ico"></i>
          <p>Haz clic aquí o comienza a escribir</p>
          <p><strong>para iniciar el test</strong></p>
          <div class="cz_hint_keys">
            <kbd>Esc</kbd> <span>reiniciar</span>
            <span class="cz_hk_sep">·</span>
            <kbd>↑↓</kbd> <span>cambiar nivel</span>
          </div>
        </div>
      </div>
      <!-- Chars -->
      <div class="cz_texto_inner" id="cz_texto_inner"></div>
    </div>

    <!-- RESULT PANEL (absoluto sobre el área) -->
    <div class="cz_result_panel" id="cz_result_panel">
      <div class="cz_result_header" id="cz_res_header">
        <div class="cz_res_emoji" id="cz_res_emoji">🏆</div>
        <div>
          <h2 class="cz_res_titulo" id="cz_res_titulo">¡Excelente!</h2>
          <p class="cz_res_msg" id="cz_res_msg"></p>
        </div>
      </div>

      <div class="cz_res_grid">
        <div class="cz_res_stat cz_rs_wpm">
          <div class="cz_rs_n" id="cz_r_wpm">0</div>
          <div class="cz_rs_l"><i class="fas fa-bolt"></i> WPM</div>
        </div>
        <div class="cz_res_stat cz_rs_prec">
          <div class="cz_rs_n" id="cz_r_prec">0%</div>
          <div class="cz_rs_l"><i class="fas fa-bullseye"></i> Precisión</div>
        </div>
        <div class="cz_res_stat cz_rs_tiempo">
          <div class="cz_rs_n" id="cz_r_tiempo">0s</div>
          <div class="cz_rs_l"><i class="fas fa-stopwatch"></i> Tiempo</div>
        </div>
        <div class="cz_res_stat cz_rs_suc">
          <div class="cz_rs_n" id="cz_r_suc">0</div>
          <div class="cz_rs_l"><i class="fas fa-check"></i> Aciertos</div>
        </div>
        <div class="cz_res_stat cz_rs_inf">
          <div class="cz_rs_n" id="cz_r_inf">0</div>
          <div class="cz_rs_l"><i class="fas fa-rotate-right"></i> Corregidos</div>
        </div>
        <div class="cz_res_stat cz_rs_err">
          <div class="cz_rs_n" id="cz_r_err">0</div>
          <div class="cz_rs_l"><i class="fas fa-xmark"></i> Errores</div>
        </div>
      </div>

      <div class="cz_res_btns">
        <button class="cz_btn_pri" id="cz_btn_reintentar">
          <i class="fas fa-rotate-right"></i> Intentar de nuevo
        </button>
        <button class="cz_btn_gho" id="cz_btn_siguiente">
          <i class="fas fa-forward-step"></i> Siguiente nivel
        </button>
      </div>
    </div>
  </div>

</div>`;
};

// ── INIT / CLEANUP ────────────────────────────────────────────────
export const init = () => {
  _reset(TEXTOS[0]);
  $(document).off('.czk');

  // Select nivel
  $(document).on('change.czk', '#cz_sel_nivel', function () {
    const t = TEXTOS.find(x => x.id === +$(this).val());
    if (t) _reset(t);
  });

  // Select tiempo
  $(document).on('change.czk', '#cz_sel_tiempo', function () {
    if (E.iniciado) return;
    tiempoSel = +$(this).val();
    _updateTimerHUD();
    _reset(E.texto);
  });

  // Reiniciar
  $(document).on('click.czk', '#cz_btn_restart, #cz_btn_reintentar', () => _reset(E.texto));

  // Siguiente nivel
  $(document).on('click.czk', '#cz_btn_siguiente', () => {
    const sig = TEXTOS.find(t => t.id === E.texto.id + 1) || TEXTOS[0];
    _reset(sig);
  });

  // Click en área → foco + arrancar
  $(document).on('click.czk', '#cz_texto_display', () => {
    $('#cz_texto_display').trigger('focus');
    if (!E.iniciado && !E.finalizado) _arrancar();
  });

  // Escape = reiniciar
  $(document).on('keydown.czk', e => {
    if (e.key === 'Escape') { e.preventDefault(); _reset(E.texto); }
    // Cambiar nivel con flechas arriba/abajo
    if (!E.iniciado && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      const idx = TEXTOS.findIndex(t => t.id === E.texto.id);
      const next = e.key === 'ArrowDown'
        ? TEXTOS[Math.min(idx + 1, TEXTOS.length - 1)]
        : TEXTOS[Math.max(idx - 1, 0)];
      if (next && next.id !== E.texto.id) {
        $('#cz_sel_nivel').val(next.id);
        _reset(next);
      }
    }
  });

  // Input del área
  $(document).on('keydown.czk', '#cz_texto_display', _onKey);
};

export const cleanup = () => {
  _clearTimer();
  $(document).off('.czk');
};

// ── RESET ─────────────────────────────────────────────────────────
function _reset(textoObj) {
  _clearTimer();
  E = _nuevoE(textoObj);

  // Sync selects
  $('#cz_sel_nivel').val(textoObj.id);

  // Chip de nivel
  const c = textoObj.color;
  $('#cz_nivel_chip')
    .html(`<i class="fas ${textoObj.ico}"></i> <span>${textoObj.nivel}</span>`)
    .css({ color: c, borderColor: c });

  // Progress bar
  $('#cz_prog_fill').css({ width: '0%', background: c });
  $('#cz_pos').text(0);
  $('#cz_total').text(textoObj.texto.length);

  // HUD
  $('#cz_wpm').text(0);
  $('#cz_prec').text(100);
  $('#cz_timer_box').removeClass('cz_warn');
  _updateTimerHUD();

  // Chars
  _renderChars(textoObj.texto);

  // Ocultar resultado, mostrar hint
  $('#cz_result_panel').removeClass('cz_result_visible');
  $('#cz_hint').show();

  _updateLiveBar();
  setTimeout(() => $('#cz_texto_display').trigger('focus'), 60);
}

// ── HUD TIMER ─────────────────────────────────────────────────────
function _updateTimerHUD(elap = null) {
  if (tiempoSel === 0) {
    $('#cz_timer_ico').attr('class', 'fas fa-infinity');
    $('#cz_secs').text(elap !== null ? elap : 0);
    $('#cz_secs_lbl').text('seg');
  } else {
    $('#cz_timer_ico').attr('class', 'fas fa-clock');
    const restante = elap !== null ? elap : tiempoSel;
    $('#cz_secs').text(restante);
    $('#cz_secs_lbl').text('seg');
  }
}

// ── RENDER CHARS ─────────────────────────────────────────────────
function _renderChars(texto) {
  const $inner = $('#cz_texto_inner').empty();
  E.chars = [];
  [...texto].forEach((ch, i) => {
    const disp = ch === ' ' ? '\u00a0' : ch;
    const $sp = $(`<span class="cz_ch" data-i="${i}">${disp}</span>`);
    $inner.append($sp);
    E.chars.push({ char: ch, $sp, state: S.NEUTRAL, hadError: false });
  });
  _setCursor(0);
}

function _setCursor(pos) {
  E.chars.forEach(c => c.$sp.removeClass('cz_ch_cursor'));
  if (pos < E.chars.length) E.chars[pos].$sp.addClass('cz_ch_cursor');
}

// ── ARRANCAR ──────────────────────────────────────────────────────
function _arrancar() {
  if (E.iniciado || E.finalizado) return;
  E.iniciado = true;
  $('#cz_hint').hide();

  E.timerID = setInterval(() => {
    E.elapsed++;
    if (tiempoSel === 0) {
      _updateTimerHUD(E.elapsed);
    } else {
      E.segundos--;
      _updateTimerHUD(E.segundos);
      if (E.segundos <= 10) $('#cz_timer_box').addClass('cz_warn');
      if (E.segundos <= 0)  _terminar('tiempo');
    }
    _recalculate();
  }, 1000);
}

// ── TECLADO ───────────────────────────────────────────────────────
const IGNORE = new Set([
  'Shift','CapsLock','Tab','ArrowLeft','ArrowRight','ArrowUp','ArrowDown',
  'Home','End','PageUp','PageDown','Insert','Delete','ContextMenu',
  'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',
]);

function _onKey(e) {
  if (E.finalizado) return;
  if (IGNORE.has(e.key) || e.ctrlKey || e.altKey || e.metaKey) return;
  e.preventDefault();

  if (!E.iniciado) _arrancar();
  if (e.key === 'Backspace') { _doBackspace(); return; }
  if (E.pos >= E.chars.length) return;

  const c  = E.chars[E.pos];
  const charToMatch = c.char === '\n' ? 'Enter' : c.char;
  const ok = e.key === charToMatch;

  c.$sp.removeClass('cz_ch_cursor cz_ch_correct cz_ch_corrected cz_ch_error cz_ch_had_error cz_ch_shake');

  if (ok) {
    c.state = c.hadError ? S.CORRECTED : S.CORRECT;
    c.$sp.addClass(c.state === S.CORRECT ? 'cz_ch_correct' : 'cz_ch_corrected');
  } else {
    c.state    = S.ERROR;
    c.hadError = true;
    c.$sp.addClass('cz_ch_error cz_ch_shake');
    setTimeout(() => c.$sp.removeClass('cz_ch_shake'), 350);
  }

  E.pos++;
  _setCursor(E.pos);
  if (E.pos < E.chars.length) _scrollToCursor();
  $('#cz_prog_fill').css('width', `${(E.pos / E.chars.length) * 100}%`);
  $('#cz_pos').text(E.pos);
  _recalculate();
  if (E.pos >= E.chars.length) _terminar('completado');
}

function _doBackspace() {
  if (E.pos <= 0) return;
  E.pos--;
  const c = E.chars[E.pos];
  c.$sp.removeClass('cz_ch_cursor cz_ch_correct cz_ch_corrected cz_ch_error cz_ch_had_error');
  c.state = S.NEUTRAL;
  if (c.hadError) c.$sp.addClass('cz_ch_had_error');
  _setCursor(E.pos);
  $('#cz_prog_fill').css('width', `${(E.pos / E.chars.length) * 100}%`);
  $('#cz_pos').text(E.pos);
  _recalculate();
}

// ── CÁLCULOS ─────────────────────────────────────────────────────
function _getCounts() {
  let suc = 0, inf = 0, war = 0, err = 0;
  E.chars.forEach(c => {
    if      (c.state === S.CORRECT)              suc++;
    else if (c.state === S.CORRECTED)            inf++;
    else if (c.state === S.ERROR)                err++;
    else if (c.hadError && c.state === S.NEUTRAL) war++;
  });
  return { suc, inf, war, err };
}

function _recalculate() {
  const cnt  = _getCounts();
  const t    = tiempoSel === 0 ? E.elapsed : (tiempoSel - E.segundos);
  const corr = cnt.suc + cnt.inf;
  const tot  = corr + cnt.err;
  const wpm  = t > 0 ? Math.round((corr / 5) / (t / 60)) : 0;
  const prec = tot > 0 ? Math.round((corr / tot) * 100) : 100;
  $('#cz_wpm').text(wpm);
  $('#cz_prec').text(prec);
  _updateLiveBar(cnt);
}

function _updateLiveBar(cnt = null) {
  const c = cnt || _getCounts();
  $('#cz_cnt_suc').text(c.suc);
  $('#cz_cnt_inf').text(c.inf);
  $('#cz_cnt_war').text(c.war);
  $('#cz_cnt_err').text(c.err);
}

// ── TERMINAR ─────────────────────────────────────────────────────
function _terminar(causa) {
  if (E.finalizado) return;
  E.finalizado = true;
  _clearTimer();

  const cnt  = _getCounts();
  const t    = tiempoSel === 0 ? E.elapsed : (tiempoSel - E.segundos);
  const corr = cnt.suc + cnt.inf;
  const tot  = corr + cnt.err;
  const wpm  = t > 0 ? Math.round((corr / 5) / (t / 60)) : corr;
  const prec = tot > 0 ? Math.round((corr / tot) * 100) : 100;

  let emoji = '🌱', titulo = '¡Sigue practicando!';
  if (wpm >= 60)      { emoji = '🚀'; titulo = '¡Velocidad de experto!'; }
  else if (wpm >= 40) { emoji = '⭐'; titulo = '¡Muy buen resultado!'; }
  else if (wpm >= 25) { emoji = '💪'; titulo = '¡Vas muy bien!'; }

  const msg = causa === 'completado'
    ? `¡Completaste el texto en ${t} segundos! 🎉`
    : `Tiempo agotado · Llegaste al carácter ${E.pos}/${E.chars.length}`;

  const col = E.texto.color;
  $('#cz_res_header').css('background', `linear-gradient(135deg, ${col}dd, ${col}88)`);
  $('#cz_res_emoji').text(emoji);
  $('#cz_res_titulo').text(titulo);
  $('#cz_res_msg').text(msg);

  _animN($('#cz_r_wpm'), wpm);
  _animN($('#cz_r_prec'), prec, '%');
  $('#cz_r_tiempo').text(`${t}s`);
  _animN($('#cz_r_suc'), cnt.suc);
  _animN($('#cz_r_inf'), cnt.inf);
  $('#cz_r_err').text(cnt.err);

  $('#cz_result_panel').addClass('cz_result_visible');

  if (wpm >= 40) Notificacion(`¡${wpm} WPM! 🚀 ¡Excelente!`, 'success', 3000);
}

// ── HELPERS ──────────────────────────────────────────────────────
function _clearTimer() {
  if (E.timerID) { clearInterval(E.timerID); E.timerID = null; }
}

function _scrollToCursor() {
  const area = document.getElementById('cz_texto_display');
  const cur  = area?.querySelector('.cz_ch_cursor');
  if (!area || !cur) return;
  const ar = area.getBoundingClientRect();
  const cr = cur.getBoundingClientRect();
  if (cr.bottom > ar.bottom - 20) area.scrollTop += cr.bottom - ar.bottom + 40;
}

function _animN($el, to, suf = '') {
  let v = 0;
  const step = Math.max(1, Math.ceil(to / 30));
  const t = setInterval(() => {
    v = Math.min(v + step, to);
    $el.text(v + suf);
    if (v >= to) clearInterval(t);
  }, 28);
}
