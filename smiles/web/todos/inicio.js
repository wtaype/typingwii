import './inicio.css';
import $ from 'jquery';
import { app, version, by, linkme, desc } from '../../wii.js';
import {
  wiVista, wiTip, wiSuma, wiScroll,
  Saludar, fechaHoy, year,
  savels, getls,
  Notificacion, Mensaje,
  avatar, Capi,
} from '../../widev.js';

// ── DATOS ─────────────────────────────────────────────────────────

const STATS = [
  { n: '500+', lbl: 'Lecciones',       ico: 'fa-keyboard'   },
  { n: '10+',  lbl: 'Niveles',          ico: 'fa-layer-group'},
  { n: '99%',  lbl: 'Precisión posible',ico: 'fa-bullseye'   },
  { n: '5',    lbl: 'Temas de color',   ico: 'fa-palette'    },
];

const FEATURES = [
  {
    ico: 'fa-keyboard',     color: '#0EBEFF',
    titulo: 'Lecciones interactivas',
    desc: 'Desde home row hasta velocidad avanzada. Cada lección te guía paso a paso con feedback en tiempo real.',
    items: [
      { ico: 'fa-play',          txt: 'Practica a tu ritmo' },
      { ico: 'fa-chart-line',    txt: 'Métricas por lección' },
      { ico: 'fa-rotate-right',  txt: 'Reintentos ilimitados' },
    ],
  },
  {
    ico: 'fa-bolt',         color: '#fd7e14',
    titulo: 'Velocidad & WPM',
    desc: 'Mide tu velocidad en palabras por minuto. El sistema registra tu récord y lo compara con tu avance histórico.',
    items: [
      { ico: 'fa-stopwatch',     txt: 'Temporizador en vivo' },
      { ico: 'fa-trophy',        txt: 'Récord personal' },
      { ico: 'fa-fire',          txt: 'Racha de práctica diaria' },
    ],
  },
  {
    ico: 'fa-bullseye',     color: '#28a745',
    titulo: 'Precisión & Errores',
    desc: 'Analiza qué teclas fallas más. El sistema detecta patrones de error y te propone ejercicios correctivos.',
    items: [
      { ico: 'fa-magnifying-glass', txt: 'Análisis de teclas débiles' },
      { ico: 'fa-circle-dot',    txt: 'Precisión por lección (%)' },
      { ico: 'fa-ban',           txt: 'Control de errores' },
    ],
  },
  {
    ico: 'fa-certificate',  color: '#FFD101',
    titulo: 'Certificado digital',
    desc: 'Al completar los niveles, descarga tu certificado personalizado. Comparte tu logro y demuestra tu habilidad.',
    items: [
      { ico: 'fa-download',      txt: 'Descarga en PDF' },
      { ico: 'fa-user',          txt: 'Con nombre y fecha' },
      { ico: 'fa-star',          txt: 'Nivel y WPM incluidos' },
    ],
  },
  {
    ico: 'fa-palette',      color: '#7000FF',
    titulo: 'Temas & Personalización',
    desc: 'Elige tu tema favorito al instante: Cielo, Dulce, Paz, Oro, Mora o Futuro. Sin recargar, sin compilar.',
    items: [
      { ico: 'fa-sun',           txt: '6 temas dinámicos' },
      { ico: 'fa-moon',          txt: 'Modo oscuro incluido' },
      { ico: 'fa-image',         txt: 'Foto de perfil propia' },
    ],
  },
  {
    ico: 'fa-envelope',     color: '#FF5C69',
    titulo: 'Mensajes & Contacto',
    desc: 'Comunícate con tu instructor directamente desde la plataforma. Tu progreso también se comparte automáticamente.',
    items: [
      { ico: 'fa-comments',      txt: 'Chat con instructor' },
      { ico: 'fa-bell',          txt: 'Notificaciones en app' },
      { ico: 'fa-paper-plane',   txt: 'Mensajes en tiempo real' },
    ],
  },
];

const NIVELES = [
  { n: '01', titulo: 'Teclas Base',      desc: 'Fila home: A S D F J K L Ñ. El punto de partida de todo mecanógrafo.', color: '#0EBEFF' },
  { n: '02', titulo: 'Fila Superior',    desc: 'Q W E R T Y U I O P. Amplía tu alcance sin mirar el teclado.', color: '#28a745' },
  { n: '03', titulo: 'Fila Inferior',    desc: 'Z X C V B N M. Completa el mapa de tu teclado con confianza.', color: '#fd7e14' },
  { n: '04', titulo: 'Números y Signos', desc: '1 2 3 4 5 y más. Domina la fila superior y los signos de puntuación.', color: '#FFD101' },
  { n: '05', titulo: 'Velocidad Avanzada',desc: 'Textos completos a máxima velocidad. Rompe tu récord de WPM.', color: '#7000FF' },
];

const CONSEJOS = [
  { ico: 'fa-hand-point-up', titulo: 'Dedos en posición', desc: 'Coloca los índices en F y J. Las callosidades te guiarán sin mirar.' },
  { ico: 'fa-eye-slash',     titulo: 'Sin mirar el teclado', desc: 'La memoria muscular llega rápido. Confía en tus dedos desde el primer día.' },
  { ico: 'fa-clock',         titulo: 'Practica 15 min/día',  desc: 'La constancia supera a la intensidad. 15 minutos diarios son suficientes.' },
  { ico: 'fa-chair',         titulo: 'Postura correcta',     desc: 'Espalda recta, codos a 90°, muñecas levemente elevadas sobre el teclado.' },
];

const TEMAS = [
  { n: 'Cielo',  c: '#0EBEFF' }, { n: 'Dulce',  c: '#FF5C69' },
  { n: 'Paz',    c: '#29C72E' }, { n: 'Oro',    c: '#FFDA34' },
  { n: 'Mora',   c: '#7000FF' }, { n: 'Futuro', c: '#21273B' },
];

const FRASES_HERO = [
  '¡Escribe más rápido cada día! ⌨️',
  '¡De 30 a 80 WPM con constancia! 🚀',
  '¡Tu récord está esperando ser roto! 🏆',
  '¡Precisión primero, velocidad después! 🎯',
  '¡Domina el teclado, domina el mundo! 🌟',
];

// ── RENDER ────────────────────────────────────────────────────────
export const render = () => `
<div class="ini_page" id="ini_top">

  <!-- ══ HERO ══════════════════════════════════════════ -->
  <section class="ini_hero" id="sec_hero">
    <div class="ini_hero_bg">
      <div class="ini_hero_orb ini_orb1"></div>
      <div class="ini_hero_orb ini_orb2"></div>
      <div class="ini_hero_orb ini_orb3"></div>
      <div class="ini_hero_keys" id="ini_keys_fx"></div>
    </div>

    <div class="ini_hero_body">
      <div class="ini_hero_left">

        <div class="ini_badge_top" style="--d:.05s">
          <i class="fas fa-keyboard"></i>
          <span>Plataforma de mecanografía #1</span>
          <span class="ini_badge_dot"></span>
        </div>

        <h1 class="ini_h1" style="--d:.2s">
          Aprende a teclear<br>
          <span class="ini_grad">rápido y preciso</span>
        </h1>

        <div class="ini_frase_wrap" style="--d:.36s">
          <i class="fas fa-quote-left ini_qi"></i>
          <span class="ini_frase_txt" id="ini_frase"></span>
          <span class="ini_cursor_blink">|</span>
        </div>

        <p class="ini_sub" style="--d:.52s">
          ${app} es la plataforma interactiva de mecanografía para estudiantes.
          Practica lecciones, mide tu WPM, mejora tu precisión y
          obtén tu certificado digital. <strong>¡Todo en un solo lugar!</strong>
        </p>

        <div class="ini_hero_cta" style="--d:.68s">
          <a href="/registrar" class="ini_btn_main nv_item" data-page="registrar">
            <i class="fas fa-rocket"></i> Empezar gratis
          </a>
          <a href="/login" class="ini_btn_ghost nv_item" data-page="login">
            <i class="fas fa-sign-in-alt"></i> Iniciar sesión
          </a>
        </div>

        <div class="ini_hero_stats" style="--d:.84s">
          ${STATS.map(s => `
            <div class="ini_hstat">
              <div class="ini_hstat_n">${s.n}</div>
              <div class="ini_hstat_l">${s.lbl}</div>
            </div>`).join('<div class="ini_hstat_sep"></div>')}
        </div>

      </div>

      <div class="ini_hero_right" style="--d:.3s">

        <!-- Teclado visual animado -->
        <div class="ini_keyboard_card">
          <div class="ini_kb_header">
            <div class="ini_kb_dots">
              <span style="background:#FF5F57"></span>
              <span style="background:#FFBD2E"></span>
              <span style="background:#28CA41"></span>
            </div>
            <span class="ini_kb_title"><i class="fas fa-keyboard"></i> ${app} · Live</span>
            <span class="ini_kb_wpm" id="ini_wpm_live">0 WPM</span>
          </div>
          <div class="ini_kb_demo">
            <div class="ini_kb_line" id="ini_kb_text">
              <span class="ini_kb_done" id="ini_done"></span><span class="ini_kb_cursor"></span><span class="ini_kb_pending" id="ini_pend">hola mundo desde typingwii</span>
            </div>
            <div class="ini_kb_meter">
              <div class="ini_kb_bar" id="ini_progress_bar" style="width:0%"></div>
            </div>
          </div>
          <div class="ini_kb_footer">
            ${TEMAS.map(t => `
              <div class="ini_tm_dot ini_tm_btn" data-tema="${t.n}" data-color="${t.c}"
                style="background:${t.c}" ${wiTip(t.n)}></div>`).join('')}
          </div>
        </div>

        <!-- Floating stat cards -->
        <div class="ini_float_card ini_fc1">
          <i class="fas fa-bolt" style="color:#fd7e14"></i>
          <div><strong id="ini_fc_wpm">42</strong><span>WPM</span></div>
        </div>
        <div class="ini_float_card ini_fc2">
          <i class="fas fa-bullseye" style="color:#28a745"></i>
          <div><strong id="ini_fc_prec">96%</strong><span>Precisión</span></div>
        </div>
        <div class="ini_float_card ini_fc3">
          <i class="fas fa-fire" style="color:#FFD101"></i>
          <div><strong id="ini_fc_racha">7</strong><span>días racha</span></div>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="ini_scroll_ind">
      <i class="fas fa-chevron-down"></i>
    </div>
  </section>

  <!-- ══ NIVELES ════════════════════════════════════════ -->
  <section class="ini_sec ini_niveles_sec" id="sec_niveles">
    <div class="ini_sec_head">
      <div class="ini_sec_badge"><i class="fas fa-layer-group"></i> Ruta de aprendizaje</div>
      <h2 class="ini_sec_tit">5 niveles para <span class="ini_grad">dominar</span> el teclado</h2>
      <p class="ini_sec_sub">Avanza de forma estructurada, desde las teclas base hasta textos a máxima velocidad</p>
    </div>
    <div class="ini_niveles_list">
      ${NIVELES.map((nv, i) => `
        <div class="ini_nivel_card" style="--nc:${nv.color}; --d:${i * .12}s">
          <div class="ini_nivel_num">${nv.n}</div>
          <div class="ini_nivel_body">
            <div class="ini_nivel_titulo">${nv.titulo}</div>
            <div class="ini_nivel_desc">${nv.desc}</div>
          </div>
          <div class="ini_nivel_bar"></div>
          <i class="fas fa-arrow-right ini_nivel_arr"></i>
        </div>`).join('')}
    </div>
  </section>

  <!-- ══ FEATURES ══════════════════════════════════════ -->
  <section class="ini_sec ini_feat_sec" id="sec_features">
    <div class="ini_sec_head">
      <div class="ini_sec_badge"><i class="fas fa-cubes"></i> Funcionalidades</div>
      <h2 class="ini_sec_tit">Todo lo que <span class="ini_grad">necesitas</span></h2>
      <p class="ini_sec_sub">Una plataforma completa diseñada para que el aprendizaje sea efectivo y motivador</p>
    </div>
    <div class="ini_feat_grid">
      ${FEATURES.map(f => `
        <div class="ini_feat_card" style="--fc:${f.color}">
          <div class="ini_feat_ico"><i class="fas ${f.ico}"></i></div>
          <h3 class="ini_feat_titulo">${f.titulo}</h3>
          <p class="ini_feat_desc">${f.desc}</p>
          <ul class="ini_feat_items">
            ${f.items.map(it => `
              <li><i class="fas ${it.ico}"></i> <span>${it.txt}</span></li>`).join('')}
          </ul>
          <div class="ini_feat_hover_bar"></div>
        </div>`).join('')}
    </div>
  </section>

  <!-- ══ CONSEJOS ══════════════════════════════════════ -->
  <section class="ini_sec ini_tips_sec" id="sec_consejos">
    <div class="ini_tips_inner">
      <div class="ini_tips_left">
        <div class="ini_sec_badge"><i class="fas fa-lightbulb"></i> Buenas prácticas</div>
        <h2 class="ini_sec_tit" style="text-align:left">Consejos de <span class="ini_grad">experto</span></h2>
        <p class="ini_sec_sub" style="text-align:left; max-width:420px">
          Aprende a teclear correctamente desde el inicio.
          Los malos hábitos son difíciles de corregir después.
        </p>
        <a href="/registrar" class="ini_btn_main nv_item" data-page="registrar" style="margin-top:2vh;width:fit-content">
          <i class="fas fa-keyboard"></i> Empezar ahora
        </a>
      </div>
      <div class="ini_tips_grid">
        ${CONSEJOS.map((c, i) => `
          <div class="ini_tip_card" style="--d:${i * .1}s">
            <div class="ini_tip_ico"><i class="fas ${c.ico}"></i></div>
            <div>
              <div class="ini_tip_titulo">${c.titulo}</div>
              <div class="ini_tip_desc">${c.desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ══ TEMAS ════════════════════════════════════════ -->
  <section class="ini_sec ini_temas_sec" id="sec_temas">
    <div class="ini_sec_head">
      <div class="ini_sec_badge"><i class="fas fa-palette"></i> Personalización</div>
      <h2 class="ini_sec_tit"><span class="ini_grad">6 temas</span> de color a tu gusto</h2>
      <p class="ini_sec_sub">Cambia el look de la plataforma al instante. Sin recargar, sin configurar.</p>
    </div>
    <div class="ini_temas_grid">
      ${TEMAS.map(t => `
        <div class="ini_tema_card" style="--tc:${t.c}">
          <div class="ini_tema_preview">
            <div class="ini_tema_hdr" style="background:${t.c}">
              <span>${app}</span>
              <div class="ini_tema_dots"></div>
            </div>
            <div class="ini_tema_body">
              <div class="ini_tp_block" style="background:${t.c}44"></div>
              <div class="ini_tp_block ini_tp_b2"></div>
              <div class="ini_tp_block ini_tp_b3"></div>
            </div>
          </div>
          <div class="ini_tema_name">
            <span class="ini_tema_dot" style="background:${t.c}"></span>
            ${t.n}
          </div>
        </div>`).join('')}
    </div>
  </section>

  <!-- ══ CTA FINAL ══════════════════════════════════════ -->
  <section class="ini_sec ini_cta_sec" id="sec_cta">
    <div class="ini_cta_wrap">
      <div class="ini_cta_orb"></div>
      <div class="ini_cta_body">
        <div class="ini_cta_ico"><i class="fas fa-keyboard"></i></div>
        <h2>¿Listo para convertirte en un<br><span class="ini_grad">mecanógrafo experto?</span></h2>
        <p>Únete a ${app} y comienza tu camino desde cero. <br>Es gratis, es divertido, y tu progreso queda registrado. 🚀</p>
        <div class="ini_cta_btns">
          <a href="/registrar" class="ini_btn_main nv_item" data-page="registrar">
            <i class="fas fa-user-plus"></i> Crear cuenta gratis
          </a>
          <a href="/login" class="ini_btn_ghost nv_item" data-page="login">
            <i class="fas fa-sign-in-alt"></i> Ya tengo cuenta
          </a>
        </div>
        <p class="ini_cta_legal">
          Sin tarjeta de crédito · Sin spam · 100% gratuito
        </p>
      </div>
    </div>
  </section>

  <!-- ══ FOOTER MINI ════════════════════════════════════ -->
  <footer class="ini_footer">
    <div class="ini_footer_brand">
      <img src="${import.meta.env.BASE_URL}smile.avif" alt="${app}" class="ini_footer_logo">
      <div>
        <div class="ini_footer_app">${app} <span class="ini_footer_v">${version}</span></div>
        <div class="ini_footer_desc">${desc}</div>
      </div>
    </div>
    <div class="ini_footer_info">
      <span>${fechaHoy()}</span>
      <span>Hecho con ❤️ por <a href="${linkme}" target="_blank" rel="noopener">${by}</a></span>
      <span>© ${year()}</span>
    </div>
  </footer>

</div>`;

// ── INIT ──────────────────────────────────────────────────────────
let _timers = [];

export const init = () => {
  _timers.forEach(clearInterval);
  _timers.forEach(clearTimeout);
  _timers = [];

  // ① Frases rotativas del hero (typewriter suave)
  _iniciarFrase();

  // ② Demo de teclado animado
  _demoTeclado();

  // ③ Floating stat cards — números animados
  _animarFloatCards();

  // ④ Teclas flotantes decorativas en el hero
  _generarTeclasHero();

  // ⑤ Scroll animations con wiVista
  wiVista('.ini_feat_card',  null, { anim: 'wi_fadeUp', stagger: 80  });
  wiVista('.ini_nivel_card', null, { anim: 'wi_fadeUp', stagger: 100 });
  wiVista('.ini_tip_card',   null, { anim: 'wi_fadeUp', stagger: 120 });
  wiVista('.ini_tema_card',  null, { anim: 'wi_fadeUp', stagger: 90  });
  wiVista('.ini_cta_wrap',   null, { anim: 'wi_fadeUp' });
  wiVista('.ini_sec_head',   null, { anim: 'wi_fadeUp' });

  // ⑥ Scroll spy para secciones (si hay nav interno)
  wiScroll(['sec_hero','sec_niveles','sec_features','sec_consejos','sec_temas','sec_cta'],
    '.ini_nav_lnk');

  // ⑦ Easter egg: click 7 veces en el logo footer → confetti tip
  wiSuma('.ini_footer_logo', () => Mensaje('¡Eres curioso! Así se domina la mecanografía 🎉', 'success'), 7);

  // ⑧ Selector de tema decorativo en keyboard card
  $(document).off('click.ini_tm').on('click.ini_tm', '.ini_tm_btn', function () {
    const color = $(this).data('color');
    const tema  = $(this).data('tema');
    $('.ini_kb_bar').css('background', color);
    $('.ini_kb_cursor').css('border-color', color);
    Notificacion(`Tema <strong>${tema}</strong> seleccionado ✨`, 'info', 1800);
  });

  console.log(`⌨️ ${app} ${version} — Inicio listo`);
};

export const cleanup = () => {
  _timers.forEach(clearInterval);
  _timers.forEach(clearTimeout);
  _timers = [];
  $(document).off('click.ini_tm');
};

// ── HELPERS ───────────────────────────────────────────────────────

function _iniciarFrase() {
  let fi = 0, ci = 0, borrando = false;
  const $el = $('#ini_frase');
  if (!$el.length) return;

  function tick() {
    const frase = FRASES_HERO[fi];
    if (!borrando) {
      $el.text(frase.slice(0, ++ci));
      if (ci >= frase.length) {
        borrando = true;
        _timers.push(setTimeout(tick, 2200));
        return;
      }
    } else {
      $el.text(frase.slice(0, --ci));
      if (ci <= 0) {
        borrando = false;
        fi = (fi + 1) % FRASES_HERO.length;
      }
    }
    _timers.push(setTimeout(tick, borrando ? 38 : 60));
  }
  _timers.push(setTimeout(tick, 600));
}

function _demoTeclado() {
  const DEMO_TEXT = 'mecanografía con typingwii';
  let pos = 0, dir = 1;
  const $done = $('#ini_done');
  const $pend = $('#ini_pend');
  const $wpm  = $('#ini_wpm_live');
  const $bar  = $('#ini_progress_bar');
  if (!$done.length) return;

  $pend.text(DEMO_TEXT);
  let wpm = 0;

  const t = setInterval(() => {
    pos += dir;
    if (pos >= DEMO_TEXT.length) { dir = -1; }
    if (pos <= 0)                { dir =  1; }
    $done.text(DEMO_TEXT.slice(0, pos));
    $pend.text(DEMO_TEXT.slice(pos));
    const pct = (pos / DEMO_TEXT.length) * 100;
    $bar.css('width', `${pct}%`);
    wpm = Math.round(28 + pos * 1.4);
    $wpm.text(`${wpm} WPM`);
  }, 160);
  _timers.push(t);
}

function _animarFloatCards() {
  // Anima los números de las float cards
  const animar = ($el, from, to, suffix = '') => {
    let v = from, step = (to - from) / 40;
    const t = setInterval(() => {
      v += step;
      if ((step > 0 && v >= to) || (step < 0 && v <= to)) {
        $el.text(to + suffix);
        clearInterval(t);
      } else {
        $el.text(Math.round(v) + suffix);
      }
    }, 40);
    _timers.push(t);
  };

  setTimeout(() => {
    animar($('#ini_fc_wpm'),  10, 42);
    animar($('#ini_fc_prec'), 80, 96, '%');
    animar($('#ini_fc_racha'), 1,  7);
  }, 800);
}

function _generarTeclasHero() {
  const KEYS = ['A','S','D','F','J','K','L','Q','W','E','R','T','Y','U',
                'I','O','P','Z','X','C','V','B','N','M','↑','↓','⌫','⌨'];
  const $c = $('#ini_keys_fx');
  if (!$c.length) return;
  KEYS.slice(0, 20).forEach((k, i) => {
    const x = Math.random() * 90 + 5;
    const y = Math.random() * 90 + 5;
    const d = (Math.random() * 4 + 2).toFixed(1);
    const delay = (Math.random() * 3).toFixed(1);
    $c.append(`<div class="ini_key_fx" style="left:${x}%;top:${y}%;animation-duration:${d}s;animation-delay:${delay}s">${k}</div>`);
  });
}