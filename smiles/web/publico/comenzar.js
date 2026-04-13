import './comenzar.css';
import $ from 'jquery';
import { Notificacion, wiTip } from '../../widev.js';
import { app } from '../../wii.js';

// ── TEXTOS ────────────────────────────────────────────────────────
const TEXTOS = [
  {
    id: 1, nivel: 'Fácil',      color: '#28a745', ico: 'fa-seedling',
    texto: 'El sol sale cada mañana y nos da luz y calor. El agua del mar es azul y fría. Los niños van a la escuela a aprender y jugar con sus amigos. La vida es bella cuando tienes salud y amor en el corazón.',
  },
  {
    id: 2, nivel: 'Básico',     color: '#0EBEFF', ico: 'fa-keyboard',
    texto: 'La tecnología ha cambiado la forma en que vivimos y trabajamos. Las computadoras nos permiten comunicarnos con personas de todo el mundo en cuestión de segundos. El internet es una herramienta poderosa para el conocimiento.',
  },
  {
    id: 3, nivel: 'Intermedio', color: '#fd7e14', ico: 'fa-bolt',
    texto: 'La mecanografía es una habilidad esencial en el mundo moderno. Escribir rápido y con precisión te permite ser más productivo en tu trabajo diario. Practica todos los días y verás cómo mejoras tu velocidad notablemente.',
  },
  {
    id: 4, nivel: 'Avanzado',   color: '#7000FF', ico: 'fa-fire',
    texto: 'El universo se expande a una velocidad asombrosa desde el Big Bang hace aproximadamente trece mil millones de años. Los científicos estudian las galaxias, los planetas y las estrellas para comprender mejor el cosmos y nuestra existencia.',
  },
  {
    id: 5, nivel: 'Experto',    color: '#FF5C69', ico: 'fa-trophy',
    texto: 'César Vallejo, nacido en Santiago de Chuco en 1892, es considerado uno de los más grandes poetas de la lengua española. Su obra Trilce revolucionó la poesía vanguardista latinoamericana con versos de profunda emotividad humana.',
  },
];

// ── OPCIONES DE TIEMPO ────────────────────────────────────────────
const TIEMPOS = [
  { id: 0,   ico: 'fa-infinity', lbl: '∞',  sub: 'Sin límite' },
  { id: 60,  ico: 'fa-clock',   lbl: '1',  sub: '1 minuto'   },
  { id: 120, ico: 'fa-clock',   lbl: '2',  sub: '2 minutos'  },
  { id: 300, ico: 'fa-clock',   lbl: '5',  sub: '5 minutos'  },
];

// ── ESTADO ────────────────────────────────────────────────────────
const S = { NEUTRAL: 0, CORRECT: 1, CORRECTED: 2, ERROR: 3 };

let tiempoSel = 60; // duración seleccionada (0 = sin límite)
let E = _nuevoE(TEXTOS[0]);

function _nuevoE(t) {
  return {
    texto: t, chars: [], pos: 0,
    iniciado: false, finalizado: false,
    timerID: null,
    // Si sin límite: cuenta hacia arriba; si con límite: countdown
    segundos: tiempoSel,
    elapsed:  0,
  };
}

// ── RENDER ────────────────────────────────────────────────────────
export const render = () => `
<div class="cz_page">

  <!-- HUD BAR -->
  <div class="cz_hud_bar">
    <div class="cz_hud_brand">
      <div class="cz_hud_logo"><i class="fas fa-keyboard"></i></div>
      <div>
        <div class="cz_hud_title">Práctica de Mecanografía</div>
        <div class="cz_hud_sub">${app}</div>
      </div>
    </div>
    <div class="cz_hud_stats">
      <div class="cz_hstat" id="cz_wpm_box" ${wiTip('Palabras por minuto')}>
        <i class="fas fa-bolt"></i>
        <span id="cz_wpm">0</span><small>WPM</small>
      </div>
      <div class="cz_hstat" id="cz_prec_box" ${wiTip('Precisión')}>
        <i class="fas fa-bullseye"></i>
        <span id="cz_prec">100</span><small>%</small>
      </div>
      <div class="cz_hstat cz_hstat_timer" id="cz_timer_box" ${wiTip('Tiempo')}>
        <i class="fas fa-clock" id="cz_timer_ico"></i>
        <span id="cz_secs">—</span><small id="cz_secs_lbl">seg</small>
      </div>
      <button class="cz_btn_restart" id="cz_btn_restart" ${wiTip('Reiniciar · Esc')}>
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>
  </div>

  <!-- LAYOUT 2 COLUMNAS -->
  <div class="cz_layout">

    <!-- ── SIDEBAR ── -->
    <aside class="cz_sidebar">

      <!-- NIVELES -->
      <div class="cz_side_label"><i class="fas fa-layer-group"></i> Nivel</div>
      <div class="cz_modos_list">
        ${TEXTOS.map(t => `
          <button class="cz_modo_btn${t.id === 1 ? ' active' : ''}"
            data-id="${t.id}" style="--tc:${t.color}">
            <span class="cz_modo_ico"><i class="fas ${t.ico}"></i></span>
            <span class="cz_modo_txt">${t.nivel}</span>
            <span class="cz_modo_arr"><i class="fas fa-chevron-right"></i></span>
          </button>`).join('')}
      </div>

      <div class="cz_side_divider"></div>

      <!-- TIEMPO -->
      <div class="cz_side_label"><i class="fas fa-clock"></i> Tiempo</div>
      <div class="cz_tiempos_list">
        ${TIEMPOS.map(t => `
          <button class="cz_tiempo_btn${t.id === 60 ? ' active' : ''}"
            data-dur="${t.id}">
            <i class="fas ${t.ico} cz_tpo_ico"></i>
            <span class="cz_tpo_n">${t.lbl}</span>
            <span class="cz_tpo_sub">${t.sub}</span>
          </button>`).join('')}
      </div>

      <div class="cz_side_divider"></div>

      <!-- LEYENDA -->
      <div class="cz_side_label"><i class="fas fa-circle-info"></i> Leyenda</div>
      <div class="cz_legend">
        <div class="cz_leg_item">
          <span class="cz_leg_dot" style="background:var(--success)"></span>
          <span>Aciertos</span>
        </div>
        <div class="cz_leg_item">
          <span class="cz_leg_dot" style="background:var(--info,#37a1dd)"></span>
          <span>Corregidos</span>
        </div>
        <div class="cz_leg_item">
          <span class="cz_leg_dot" style="background:var(--warning)"></span>
          <span>Error corregido</span>
        </div>
        <div class="cz_leg_item">
          <span class="cz_leg_dot" style="background:var(--error)"></span>
          <span>Sin corregir</span>
        </div>
      </div>

      <div class="cz_side_divider"></div>
      <div class="cz_side_tip">
        <i class="fas fa-lightbulb"></i>
        <span>Presiona <kbd>Esc</kbd> para reiniciar</span>
      </div>
    </aside>

    <!-- ── ÁREA PRINCIPAL ── -->
    <div class="cz_main">

      <!-- Info bar -->
      <div class="cz_text_bar">
        <div class="cz_nivel_badge" id="cz_nivel_badge"
          style="color:${TEXTOS[0].color};border-color:${TEXTOS[0].color}">
          <i class="fas ${TEXTOS[0].ico}"></i> ${TEXTOS[0].nivel}
        </div>
        <div class="cz_prog_track">
          <div class="cz_prog_fill" id="cz_prog_fill"
            style="width:0%;background:${TEXTOS[0].color}"></div>
        </div>
        <div class="cz_char_count">
          <span id="cz_pos">0</span><span class="cz_char_sep">/</span><span id="cz_total">${TEXTOS[0].texto.length}</span>
        </div>
      </div>

      <!-- Zona de typing (con overlay de resultado encima) -->
      <div class="cz_typing_wrap">
        <!-- Área de texto -->
        <div class="cz_texto_area" id="cz_texto_display" tabindex="0">
          <div class="cz_hint_overlay" id="cz_hint">
            <div class="cz_hint_inner">
              <i class="fas fa-hand-pointer cz_hint_ico"></i>
              <p>Haz clic aquí o comienza a escribir</p>
              <p><strong>para iniciar el test</strong></p>
            </div>
          </div>
          <div class="cz_texto_inner" id="cz_texto_inner"></div>
        </div>

        <!-- ═══ RESULTADO ═══ (se muestra sobre el área cuando termina) -->
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
        </div><!-- /cz_result_panel -->
      </div><!-- /cz_typing_wrap -->

      <!-- Live bar stats -->
      <div class="cz_live_bar">
        <div class="cz_lv cz_lv_suc" ${wiTip('Aciertos — correcto a la primera')}>
          <i class="fas fa-check"></i>
          <span id="cz_cnt_suc">0</span>
          <small>Aciertos</small>
        </div>
        <div class="cz_lv cz_lv_inf" ${wiTip('Corregidos — error corregido con backspace')}>
          <i class="fas fa-rotate-right"></i>
          <span id="cz_cnt_inf">0</span>
          <small>Corregidos</small>
        </div>
        <div class="cz_lv cz_lv_war" ${wiTip('Error corregido — borrado pendiente de reescribir')}>
          <i class="fas fa-triangle-exclamation"></i>
          <span id="cz_cnt_war">0</span>
          <small>Pendientes</small>
        </div>
        <div class="cz_lv cz_lv_err" ${wiTip('Errores sin corregir aún')}>
          <i class="fas fa-xmark"></i>
          <span id="cz_cnt_err">0</span>
          <small>Sin corregir</small>
        </div>
      </div>

    </div><!-- /cz_main -->
  </div><!-- /cz_layout -->
</div>`;

// ── INIT / CLEANUP ────────────────────────────────────────────────
export const init = () => {
  _reset(TEXTOS[0]);
  $(document).off('.czk');

  // Nivel
  $(document).on('click.czk', '.cz_modo_btn', function () {
    const t = TEXTOS.find(x => x.id === +$(this).data('id'));
    if (t) _reset(t);
  });

  // Tiempo
  $(document).on('click.czk', '.cz_tiempo_btn', function () {
    if (E.iniciado) return; // no cambiar mientras corre
    tiempoSel = +$(this).data('dur');
    $('.cz_tiempo_btn').removeClass('active');
    $(this).addClass('active');
    _updateTimerHUD();
    _reset(E.texto); // reiniciar con nuevo tiempo
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
    if (e.key === 'Escape') _reset(E.texto);
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

  // Sidebar activo
  $('.cz_modo_btn').removeClass('active');
  $(`.cz_modo_btn[data-id="${textoObj.id}"]`).addClass('active');

  // Badge
  const c = textoObj.color;
  $('#cz_nivel_badge')
    .html(`<i class="fas ${textoObj.ico}"></i> ${textoObj.nivel}`)
    .css({ color: c, borderColor: c });
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
    // Sin límite → muestra tiempo transcurrido
    $('#cz_timer_ico').attr('class', 'fas fa-infinity');
    $('#cz_secs').text(elap !== null ? elap : 0);
    $('#cz_secs_lbl').text('seg');
  } else {
    // Countdown
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
      // Sin límite: muestra tiempo que lleva
      _updateTimerHUD(E.elapsed);
    } else {
      // Countdown
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
  'Shift','CapsLock','Tab','Enter','ArrowLeft','ArrowRight','ArrowUp','ArrowDown',
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
  const ok = e.key === c.char;

  c.$sp.removeClass('cz_ch_cursor cz_ch_correct cz_ch_corrected cz_ch_error cz_ch_had_error cz_ch_shake');

  if (ok) {
    c.state = c.hadError ? S.CORRECTED : S.CORRECT;
    c.$sp.addClass(c.state === S.CORRECT ? 'cz_ch_correct' : 'cz_ch_corrected');
  } else {
    c.state   = S.ERROR;
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
  // Tiempo transcurrido: si countdown, usamos (tiempoSel - segundos); si sin límite, usamos elapsed
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

  // Color del nivel actual para el header del resultado
  const col = E.texto.color;
  $('#cz_res_header').css('background', col);
  $('#cz_res_emoji').text(emoji);
  $('#cz_res_titulo').text(titulo);
  $('#cz_res_msg').text(msg);

  // Animar stats
  _animN($('#cz_r_wpm'), wpm);
  _animN($('#cz_r_prec'), prec, '%');
  $('#cz_r_tiempo').text(`${t}s`);
  _animN($('#cz_r_suc'), cnt.suc);
  _animN($('#cz_r_inf'), cnt.inf);
  $('#cz_r_err').text(cnt.err);

  // Mostrar panel de resultado
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
