// ════════════════════════════════════════════════════════════════════
// leccion.js — TypingWii · Motor de Lecciones Reutilizable v2.0
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './leccion.css';
import $ from 'jquery';
import { wiTip, Notificacion } from '../../widev.js';
import { app } from '../../wii.js';
import { wiTeclado } from './teclado.js';
import { adLeft, adRight } from './wiad.js';
// ── ESTADO INTERNO ─────────────────────────────────────────────────
const ST = { NEUTRAL: 0, OK: 1, ERR: 3 };
let E = null;
let _data = null;

function _nuevoE(texto) {
  return {
    chars: [], pos: 0,
    iniciado: false, finalizado: false,
    timerID: null, elapsed: 0,
    lastTime: null,
  };
}

// ── HELPERS ─────────────────────────────────────────────────────────
const _getLecNum = (id) => String(id).padStart(2, '0');

// Colores por nivel (1-10)
const NIVEL_COLORS = {
  1:  '#22c55e',  // verde    — Principiante
  2:  '#16a34a',  // verde osc
  3:  '#0ea5e9',  // celeste  — Elemental
  4:  '#0284c7',  // azul
  5:  '#f97316',  // naranja  — Intermedio
  6:  '#ea580c',  // naranja osc
  7:  '#a855f7',  // violeta  — Avanzado
  8:  '#9333ea',  // violeta osc
  9:  '#ef4444',  // rojo     — Experto
  10: '#dc2626',  // rojo osc — Maestro
};
const NIVEL_NOMBRES = {
  1:'Principiante', 2:'Principiante+',
  3:'Elemental',    4:'Elemental+',
  5:'Intermedio',   6:'Intermedio+',
  7:'Avanzado',     8:'Avanzado+',
  9:'Experto',      10:'Maestro',
};

// ── RENDER ──────────────────────────────────────────────────────────
export const render = () => {
  if (!_data) return `<div class="ad_empty"><i class="fas fa-book-open"></i><p>Lección no encontrada.</p></div>`;

  const { id, titulo, subtitulo = '', nivel = 1, teclasPracticar = [], descripcion = '' } = _data;
  const num   = _getLecNum(id);
  const col   = NIVEL_COLORS[nivel] || NIVEL_COLORS[1];
  const nmb   = NIVEL_NOMBRES[nivel] || 'Principiante';
  const total = id < 100 ? id + 1 : null;


  return `
<div class="lc_page">

  <!-- LAYOUT: AD | CONTENT | AD -->
  <div class="lc_layout">
    ${adLeft}

    <div class="lc_content">


      <!-- PROGRESS -->
      <div class="lc_prog_track"><div class="lc_prog_fill" id="lc_pr_fill" style="background:${col}"></div></div>


      <!-- TEXT AREA -->
      <div class="lc_texto_area" id="lc_texto_display" tabindex="0">

        <!-- Texto -->
        <div class="lc_texto_inner" id="lc_texto_inner"></div>
      </div>

      <!-- BOTTOM: KEYBOARD + STATS -->
      <div class="lc_bottom">
        <div class="lc_kbd_col">
          <div id="lc_teclado"></div>
        </div>
        <div class="lc_side_panel">
          <div class="lc_sp_info" style="text-align:center; margin-bottom:1vh; background:var(--bg4); border:1px solid var(--brd); border-radius:1.2vh; padding:1.2vh;">
            <div style="font-size:var(--fz_s4); color:var(--tx3); text-transform:uppercase; font-weight:800; letter-spacing:.1em; margin-bottom:.4vh;">Lección ${num}</div>
            <div style="font-size:var(--fz_m2); font-weight:800; color:var(--tx1); line-height:1.2;">${titulo}</div>
          </div>
          <div class="lc_sp_block lc_sp_wpm" ${wiTip('Palabras por minuto')}>
            <div class="lc_sp_n" id="lc_wpm">0</div>
            <div class="lc_sp_l"><i class="fas fa-bolt"></i> WPM</div>
          </div>
          <div class="lc_sp_block lc_sp_prec" ${wiTip('Precisión')}>
            <div class="lc_sp_n" id="lc_prec">100</div>
            <div class="lc_sp_l"><i class="fas fa-bullseye"></i> %</div>
          </div>
          <div class="lc_sp_block lc_sp_time" id="lc_timer_box" ${wiTip('Tiempo transcurrido')}>
            <div class="lc_sp_n" id="lc_secs">0</div>
            <div class="lc_sp_l"><i class="fas fa-stopwatch"></i> seg</div>
          </div>
          <div class="lc_sp_sep"></div>
          <div class="lc_sp_mini">
            <span class="lcm ok" ${wiTip('Aciertos')}><i class="fas fa-check"></i> <b id="lc_cnt_ok">0</b></span>
            <span class="lcm er" ${wiTip('Errores')}><i class="fas fa-xmark"></i> <b id="lc_cnt_err">0</b></span>
          </div>
          <div class="lc_sp_sep"></div>
          <div class="lc_sp_sel" style="display:flex;justify-content:center;cursor:default;">
             <span id="lc_pos">0</span><span style="opacity:.4;margin:0 .25vh">/</span><span id="lc_total">0</span><small style="margin-left:5px">chars</small>
          </div>
          <div style="display:flex; gap: .5vh; margin-top: auto;">
             <button class="lc_sp_btn" id="lc_btn_ant" style="flex:1; padding:1vh 0; font-size:var(--fz_m1); margin-top:0; border-radius:1vh; box-shadow:none; background:var(--bg4); border:1px solid var(--brd); color:var(--tx1);" ${id <= 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>
             <button class="lc_sp_btn" id="lc_btn_restart" style="flex:2; padding:1vh 0; font-size:var(--fz_m1); margin-top:0; border-radius:1vh;"><i class="fas fa-rotate-right"></i> Reiniciar</button>
             <button class="lc_sp_btn" id="lc_btn_sig" style="flex:1; padding:1vh 0; font-size:var(--fz_m1); margin-top:0; border-radius:1vh; box-shadow:none; background:var(--bg4); border:1px solid var(--brd); color:var(--tx1);" ${!total ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>
          </div>
          <button class="lc_sp_btn" id="lc_btn_volver" style="background:var(--bg4); border:1px solid var(--brd); color:var(--tx1); box-shadow:none; padding:1vh 0; margin-top:.5vh; font-size:var(--fz_m1); border-radius:1vh;"><i class="fas fa-th-list"></i> Todas las lecciones</button>
        </div>
      </div>
    </div>

    ${adRight}
  </div>

</div>
`;
};

// ── INIT ────────────────────────────────────────────────────────────
export const init = () => {
  if (!_data) return;
  const col = NIVEL_COLORS[_data.nivel] || NIVEL_COLORS[1];

  // Render keyboard
  wiTeclado.render('#lc_teclado');

  // Highlight las teclas de práctica en el teclado
  if (_data.teclasPracticar?.length) {
    setTimeout(() => {
      _data.teclasPracticar.forEach(k => {
        document.querySelectorAll(`[data-wk="${k.toLowerCase()}"]`)
          .forEach(el => el.style.cssText += ';outline:2px solid var(--mco);outline-offset:1px;');
      });
    }, 200);
  }

  _reset();
  $(document).off('.lck');

  // Restart btn
  $(document).on('click.lck', '#lc_btn_restart, #lc_btn_reintentar', () => _reset());

  $(document).on('click.lck', '#lc_btn_sig', () => {
    const sig = String(_data.id + 1).padStart(2, '0');
    import(`./leccion${sig}.js`).then(m => {
      _data = m.data;
      _cambiarLeccion();
    }).catch(() => Notificacion('Lección no disponible aún', 'info'));
  });

  // Anterior
  $(document).on('click.lck', '#lc_btn_ant', () => {
    if (_data.id <= 1) return;
    const ant = String(_data.id - 1).padStart(2, '0');
    import(`./leccion${ant}.js`).then(m => {
      _data = m.data;
      _cambiarLeccion();
    }).catch(() => Notificacion('Lección no disponible', 'warning'));
  });

  // Volver a lista de lecciones
  $(document).on('click.lck', '#lc_btn_volver', () => {
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate('/lecciones'));
  });

  // Click en área
  $(document).on('click.lck', '#lc_texto_display', () => {
    $('#lc_texto_display').trigger('focus');
    if (!E.iniciado && !E.finalizado) _arrancar();
  });

  // Escape = restart
  $(document).on('keydown.lck', e => {
    if (e.key === 'Escape') { e.preventDefault(); _reset(); }
  });

  // Teclado
  $(document).on('keydown.lck', '#lc_texto_display', _onKey);

  // Actualizar color topbar
  $('#lc_pr_fill').css('background', col);
};

export const cleanup = () => {
  _clearTimer();
  wiTeclado.clear();
  $(document).off('.lck');
  E = null;
};

// ── CAMBIAR LECCIÓN (sin recargar página) ───────────────────────────
function _cambiarLeccion() {
  cleanup();
  const html = render();
  import('../../rutas/rutadev.js').then(({ wiFade }) => {
    wiFade('#wimain', html).then(() => {
      init();
      const num = _getLecNum(_data.id);
      document.title = `Lección ${num} — ${_data.titulo} · TypingWii`;
      history.pushState({ ruta: `/leccion${num}` }, '', `/leccion${num}`);
    });
  });
}

// ── RESET ───────────────────────────────────────────────────────────
function _reset() {
  _clearTimer();
  E = _nuevoE(_data.texto);
  $('#lc_wpm').text(0);
  $('#lc_prec').text(100);
  $('#lc_secs').text(0);
  $('#lc_timer_box').removeClass('lc_warn');
  $('#lc_pr_fill').css('width', '0%');
  $('#lc_pos').text(0);
  $('#lc_total').text(_data.texto.length);
  $('#lc_results_ui').remove();
  $('.lc_sp_info').show();
  _updateBar({ok:0,err:0});
  _renderChars(_data.texto);

  wiTeclado.clear();
  // Hint de primera tecla
  const first = _data.texto[0];
  if (first) wiTeclado.hint(first === '\n' ? 'Enter' : first);
  setTimeout(() => $('#lc_texto_display').trigger('focus'), 60);
}

// ── RENDER CHARS ─────────────────────────────────────────────────────
function _renderChars(texto) {
  const $in = $('#lc_texto_inner').empty();
  E.chars = [];
  const parts = texto.split(/( )/);
  let $word = null;
  parts.forEach(p => {
    if (p === ' ') {
      const $s=$(`<span class="lc_ch lc_space"> </span>`);
      $in.append($s); E.chars.push({char:' ',$s,state:ST.NEUTRAL,hadErr:false});
      $word = null;
    } else if (p.length > 0) {
      $word = $('<span class="lc_word"></span>');
      [...p].forEach(ch => {
        const $s=$(`<span class="lc_ch">${ch}</span>`);
        $word.append($s); E.chars.push({char:ch,$s,state:ST.NEUTRAL,hadErr:false});
      });
      $in.append($word);
    }
  });
  _setCur(0);
}
function _setCur(pos) {
  E.chars.forEach(c => c.$s.removeClass('lc_ch_cur'));
  if (pos < E.chars.length) E.chars[pos].$s.addClass('lc_ch_cur');
}

// ── ARRANCAR ─────────────────────────────────────────────────────────
function _arrancar() {
  if (E.iniciado || E.finalizado) return;
  E.iniciado = true;
  E.lastTime = performance.now();

  E.timerID = setInterval(() => {
    E.elapsed++;
    $('#lc_secs').text(E.elapsed);
    _recalc();
  }, 1000);
}

// ── KEYDOWN ──────────────────────────────────────────────────────────
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
  if (e.key === 'Backspace') { _backspace(); return; }
  if (E.pos >= E.chars.length) return;

  const now = performance.now();
  const dt = E.lastTime ? now - E.lastTime : 0;
  E.lastTime = now;

  const c   = E.chars[E.pos];
  c.dt      = dt;
  const key = c.char === '\n' ? 'Enter' : c.char;
  const ok  = e.key === key;

  // Keyboard feedback + sound
  wiTeclado.press(key, ok);

  c.$s.removeClass('lc_ch_cur lc_ch_ok lc_ch_warn lc_ch_err lc_ch_shake');
  if (ok) {
    c.state = ST.OK;
    if (c.hadErr) c.$s.addClass('lc_ch_warn');
    else c.$s.addClass('lc_ch_ok');
  } else {
    c.state = ST.ERR; c.hadErr = true;
    c.$s.addClass('lc_ch_err lc_ch_shake');
    setTimeout(() => c.$s.removeClass('lc_ch_shake'), 300);
  }

  E.pos++;
  _setCur(E.pos);
  if (E.pos < E.chars.length) {
    _scrollCur();
    const next = E.chars[E.pos]?.char;
    if (next) wiTeclado.hint(next === '\n' ? 'Enter' : next);
  }
  $('#lc_pr_fill').css('width', `${(E.pos / E.chars.length) * 100}%`);
  $('#lc_pos').text(E.pos);
  _recalc();
  if (E.pos >= E.chars.length) _terminar();
}

function _backspace() {
  if (E.pos <= 0) return;
  E.pos--;
  const c = E.chars[E.pos];
  c.$s.removeClass('lc_ch_cur lc_ch_ok lc_ch_warn lc_ch_err');
  c.state = ST.NEUTRAL;
  _setCur(E.pos);
  $('#lc_pr_fill').css('width', `${(E.pos / E.chars.length) * 100}%`);
  $('#lc_pos').text(E.pos);
  _recalc();
}

// ── CÁLCULOS ─────────────────────────────────────────────────────────
function _counts() {
  let ok=0,err=0;
  E.chars.forEach(c => {
    if      (c.state===ST.OK) ok++;
    else if (c.state===ST.ERR) err++;
  });
  return {ok,err};
}
function _recalc() {
  const {ok,err} = _counts();
  const t    = E.elapsed;
  const good = ok;
  const tot  = good+err;
  const wpm  = t>0 ? Math.round((good/5)/(t/60)) : 0;
  const prec = tot>0 ? Math.round((good/tot)*100) : 100;
  $('#lc_wpm').text(wpm);
  $('#lc_prec').text(prec);
  _updateBar({ok,err});
}
function _updateBar(c=null) {
  const {ok,err} = c||_counts();
  $('#lc_cnt_ok').text(ok);
  $('#lc_cnt_err').text(err);
}

// ── TERMINAR ─────────────────────────────────────────────────────────
function _terminar() {
  if (E.finalizado) return;
  E.finalizado = true;
  _clearTimer();
  const {ok,err} = _counts();
  const t    = E.elapsed;
  const good = ok;
  const tot  = good + err;
  const wpm  = t>0 ? Math.round((good/5)/(t/60)) : good;
  const prec = tot>0 ? Math.round((good/tot)*100) : 100;

  wiTeclado.clear();

  // Resaltar teclas fallidas en el teclado
  const failed = [...new Set(E.chars.filter(c => c.hadErr && c.char !== ' ' && c.char !== '\n').map(c => c.char))];
  if (failed.length > 0) wiTeclado.markErrors(failed);

  // Calcular Estrellas (1 a 5)
  let stars = 1;
  if (wpm >= 50 && prec >= 95) stars = 5;
  else if (wpm >= 40 && prec >= 90) stars = 4;
  else if (wpm >= 30 && prec >= 85) stars = 3;
  else if (wpm >= 20 && prec >= 80) stars = 2;

  // Confetti para buen puntaje
  if (stars >= 4) _fireConfetti();

  // Mostrar Panel de Resultados
  _renderResults(wpm, prec, stars);

  // Mensaje dinámico de resultado
  let msg = '';
  if (stars === 5) msg = `¡Perfecto! ${wpm} WPM. ¡Eres un maestro! 🚀`;
  else if (stars >= 3) msg = `¡Muy bien! ${wpm} WPM. ¡Sigue así! 👏`;
  else msg = `Completado: ${wpm} WPM. ¡A practicar más! 🐢`;

  Notificacion(msg, stars >= 4 ? 'success' : (stars >= 3 ? 'info' : 'warning'), 5000);
}

function _renderResults(wpm, prec, stars) {
  const stHtml = [1,2,3,4,5].map(i => `<i class="fas fa-star ${i<=stars ? 'lc_star_on' : 'lc_star_off'}"></i>`).join('');
  
  const html = `
    <div class="lc_res_panel" id="lc_results_ui">
      <div class="lc_stars">${stHtml}</div>
    </div>
  `;
  $('#lc_results_ui').remove();
  $('.lc_sp_info').hide();
  $('.lc_side_panel').prepend(html);
}

function _fireConfetti() {
  if (document.getElementById('wi_confetti')) return;
  const $c = $('<canvas id="wi_confetti" style="position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;"></canvas>').appendTo('body');
  const ctx = $c[0].getContext('2d');
  $c[0].width = window.innerWidth; $c[0].height = window.innerHeight;
  
  const particles = Array.from({length: 120}, () => ({
    x: window.innerWidth/2, y: window.innerHeight/2 + 50,
    vx: (Math.random()-0.5)*25, vy: (Math.random()-1)*25 - 5,
    size: Math.random()*8+5, color: ['#f59e0b','#10b981','#3b82f6','#f97316','#a855f7','#ec4899'][Math.floor(Math.random()*6)],
    rot: Math.random()*360, rotS: (Math.random()-0.5)*15
  }));
  
  let req;
  const draw = () => {
    ctx.clearRect(0,0,$c[0].width,$c[0].height);
    let active = false;
    particles.forEach(p => {
      p.vy += 0.5; p.x += p.vx; p.y += p.vy; p.rot += p.rotS;
      if (p.y < $c[0].height + 50) active = true;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle = p.color; ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
      ctx.restore();
    });
    if (active) req = requestAnimationFrame(draw);
    else $c.remove();
  };
  req = requestAnimationFrame(draw);
  setTimeout(() => { cancelAnimationFrame(req); $c.remove(); }, 5000);
}

// ── HELPERS ───────────────────────────────────────────────────────────
function _clearTimer() {
  if (E?.timerID) { clearInterval(E.timerID); E.timerID = null; }
}
function _scrollCur() {
  const area = document.getElementById('lc_texto_display');
  const cur  = area?.querySelector('.lc_ch_cur');
  if (!area||!cur) return;
  const ar = area.getBoundingClientRect(), cr = cur.getBoundingClientRect();
  if (cr.bottom > ar.bottom-20) area.scrollTop += cr.bottom-ar.bottom+40;
}

// Obtener color de dedo para chip visual
const FINGER_MAP = {
  a:'lp',s:'lr',d:'lm',f:'li',g:'li',h:'ri',j:'ri',k:'rm',l:'rr',ñ:'rp',
  q:'lp',w:'lr',e:'lm',r:'li',t:'li',y:'ri',u:'ri',i:'rm',o:'rr',p:'rp',
  z:'lp',x:'lr',c:'lm',v:'li',b:'li',n:'ri',m:'ri',
  '1':'lp','2':'lr','3':'lm','4':'li','5':'li',
  '6':'ri','7':'ri','8':'rm','9':'rr','0':'rp',
  ' ':'th',
};
const FINGER_COLORS = {
  lp:'#f59e0b',lr:'#3b82f6',lm:'#10b981',li:'#f97316',
  ri:'#f97316',rm:'#10b981',rr:'#3b82f6',rp:'#f59e0b',th:'#ef4444',
};
function _getFingerColor(key) {
  const zone = FINGER_MAP[key.toLowerCase()] || 'lp';
  return FINGER_COLORS[zone];
}

// ── LOADER — cargado desde ruta.js ──────────────────────────────────
// Cada leccionXX.js importa leccion.js y llama setData(data) antes de exportar render/init
export const setData = (leccionData) => { _data = leccionData; };
