import './lecciones.css';
import $ from 'jquery';
import { wiVista, wiTip } from '../../widev.js';
import { app } from '../../wii.js';

// ── 12 LECCIONES ──────────────────────────────────────────────────
export const LECCIONES = [
  // ── NIVEL 1: FUNDAMENTOS ──────────────────────────────────────
  {
    id:      1,
    nivel:   1,
    tag:     'Nivel 1',
    color:   '#0EBEFF',
    ico:     'fa-seedling',
    titulo:  'Posición inicial',
    sub:     'Home row · A S D F J K L Ñ',
    desc:    'Aprende la posición base de tus dedos. Los índices descansan en F y J. Estas teclas son el punto de retorno de toda la mecanografía.',
    teclas:  ['A','S','D','F','J','K','L','Ñ'],
    meta:    '30 WPM · 85% precisión',
    dur:     '10 min',
    logrado: false,
  },
  {
    id:      2,
    nivel:   1,
    tag:     'Nivel 1',
    color:   '#0EBEFF',
    ico:     'fa-hand',
    titulo:  'Dedos de la mano izquierda',
    sub:     'Q W E R · Z X C V',
    desc:    'Practica con los dedos meñique, anular, medio e índice de la mano izquierda. Sin mirar el teclado.',
    teclas:  ['Q','W','E','R','Z','X','C','V'],
    meta:    '35 WPM · 88% precisión',
    dur:     '10 min',
    logrado: false,
  },
  {
    id:      3,
    nivel:   1,
    tag:     'Nivel 1',
    color:   '#0EBEFF',
    ico:     'fa-hand-back-fist',
    titulo:  'Dedos de la mano derecha',
    sub:     'U I O P · B N M',
    desc:    'Ahora la mano derecha: índice, medio, anular y meñique. Coordina ambas manos sin bajar la vista.',
    teclas:  ['U','I','O','P','B','N','M'],
    meta:    '35 WPM · 88% precisión',
    dur:     '12 min',
    logrado: false,
  },

  // ── NIVEL 2: CONSOLIDACIÓN ────────────────────────────────────
  {
    id:      4,
    nivel:   2,
    tag:     'Nivel 2',
    color:   '#28a745',
    ico:     'fa-keyboard',
    titulo:  'Letras completas',
    sub:     'Todo el alfabeto · Manos coordinadas',
    desc:    'Combina ambas manos para escribir las 27 letras del abecedario. La memoria muscular empieza a activarse.',
    teclas:  ['A–Z','Ñ'],
    meta:    '38 WPM · 90% precisión',
    dur:     '15 min',
    logrado: false,
  },
  {
    id:      5,
    nivel:   2,
    tag:     'Nivel 2',
    color:   '#28a745',
    ico:     'fa-font',
    titulo:  'Palabras comunes',
    sub:     'Las 100 palabras más usadas en español',
    desc:    'Escribe las palabras más frecuentes del español: el, la, de, en, que, y, a, los, se, no... Velocidad natural.',
    teclas:  ['Palabras','frecuentes'],
    meta:    '40 WPM · 90% precisión',
    dur:     '15 min',
    logrado: false,
  },
  {
    id:      6,
    nivel:   2,
    tag:     'Nivel 2',
    color:   '#28a745',
    ico:     'fa-align-left',
    titulo:  'Frases cortas',
    sub:     'Oraciones de 5 a 8 palabras',
    desc:    'Practica fluidez con oraciones cortas y simples. El objetivo es mantener ritmo constante sin pausas largas.',
    teclas:  ['Frases','Ritmo'],
    meta:    '42 WPM · 91% precisión',
    dur:     '15 min',
    logrado: false,
  },

  // ── NIVEL 3: SIGNOS Y NÚMEROS ─────────────────────────────────
  {
    id:      7,
    nivel:   3,
    tag:     'Nivel 3',
    color:   '#fd7e14',
    ico:     'fa-hashtag',
    titulo:  'Números del 0 al 9',
    sub:     'Fila superior · Sin mirar',
    desc:    'Aprende la fila de números. Usa los 10 dedos: los números se alcanzan estirando desde la fila base.',
    teclas:  ['1','2','3','4','5','6','7','8','9','0'],
    meta:    '38 WPM · 88% precisión',
    dur:     '15 min',
    logrado: false,
  },
  {
    id:      8,
    nivel:   3,
    tag:     'Nivel 3',
    color:   '#fd7e14',
    ico:     'fa-exclamation',
    titulo:  'Puntuación básica',
    sub:     '. , ; : ¿ ? ¡ !',
    desc:    'Domina los signos de puntuación esenciales. La coma y el punto se usan con el dedo meñique derecho.',
    teclas:  ['.', ',', ';', ':', '¿', '?'],
    meta:    '38 WPM · 89% precisión',
    dur:     '15 min',
    logrado: false,
  },
  {
    id:      9,
    nivel:   3,
    tag:     'Nivel 3',
    color:   '#fd7e14',
    ico:     'fa-at',
    titulo:  'Símbolos especiales',
    sub:     '@ # $ % & _ - + = ( )',
    desc:    'Los símbolos se usan a diario en correos, contraseñas y código. Aprende su posición exacta en el teclado.',
    teclas:  ['@','#','$','&','_','-'],
    meta:    '35 WPM · 87% precisión',
    dur:     '18 min',
    logrado: false,
  },

  // ── NIVEL 4: VELOCIDAD ────────────────────────────────────────
  {
    id:      10,
    nivel:   4,
    tag:     'Nivel 4',
    color:   '#7000FF',
    ico:     'fa-bolt',
    titulo:  'Textos continuos',
    sub:     'Párrafos de 50 a 100 palabras',
    desc:    'Escribe párrafos completos manteniendo ritmo y precisión. Aquí se construye la resistencia de escritura.',
    teclas:  ['Párrafos','Fluidez'],
    meta:    '45 WPM · 92% precisión',
    dur:     '20 min',
    logrado: false,
  },
  {
    id:      11,
    nivel:   4,
    tag:     'Nivel 4',
    color:   '#7000FF',
    ico:     'fa-gauge-high',
    titulo:  'Sprint de velocidad',
    sub:     'Tests de 1 minuto · Máximo WPM',
    desc:    'Tests cronometrados de 60 segundos. El objetivo es superar tu récord personal de WPM con cada intento.',
    teclas:  ['Sprint','60s'],
    meta:    '55 WPM · 93% precisión',
    dur:     '20 min',
    logrado: false,
  },
  {
    id:      12,
    nivel:   5,
    tag:     'Nivel 5',
    color:   '#FF5C69',
    ico:     'fa-trophy',
    titulo:  'Experto: texto libre',
    sub:     'Literatura · Artículos · Código',
    desc:    'Textos reales sin restricciones. Noticias, literatura peruana, fragmentos técnicos. El nivel final del mecanógrafo.',
    teclas:  ['Avanzado','Experto'],
    meta:    '70 WPM · 95% precisión',
    dur:     '25 min',
    logrado: false,
  },
];

// Niveles únicos para el filtro
const NIVELES_INFO = [
  { n: 1, lbl: 'Fundamentos', color: '#0EBEFF' },
  { n: 2, lbl: 'Consolidación', color: '#28a745' },
  { n: 3, lbl: 'Signos y números', color: '#fd7e14' },
  { n: 4, lbl: 'Velocidad', color: '#7000FF' },
  { n: 5, lbl: 'Experto', color: '#FF5C69' },
];

// ── RENDER ────────────────────────────────────────────────────────
export const render = () => `
<div class="lec_page">

  <!-- ══ HERO ══ -->
  <div class="lec_hero">
    <div class="lec_hero_bg">
      <div class="lec_orb lec_orb1"></div>
      <div class="lec_orb lec_orb2"></div>
    </div>
    <div class="lec_hero_body">
      <div class="lec_hero_badge">
        <i class="fas fa-graduation-cap"></i> Plan de estudio completo
        <span class="lec_badge_dot"></span>
      </div>
      <h1 class="lec_hero_h1">
        12 lecciones para<br>
        <span class="lec_grad">dominar el teclado</span>
      </h1>
      <p class="lec_hero_sub">
        Desde la posición inicial hasta textos a <strong>70 WPM</strong>.
        Un camino estructurado en 5 niveles progresivos.
      </p>
      <!-- Barra de progreso global -->
      <div class="lec_hero_prog">
        <div class="lec_hp_info">
          <span><i class="fas fa-check-circle" style="color:var(--success)"></i> 0 completadas</span>
          <span id="lec_global_pct">0 / 12</span>
        </div>
        <div class="lec_hp_track">
          <div class="lec_hp_fill" id="lec_hp_fill" style="width:0%"></div>
        </div>
      </div>
    </div>
    <!-- Stats rápidos -->
    <div class="lec_hero_stats">
      <div class="lec_hs">
        <div class="lec_hs_n">12</div>
        <div class="lec_hs_l"><i class="fas fa-book-open"></i> Lecciones</div>
      </div>
      <div class="lec_hs_sep"></div>
      <div class="lec_hs">
        <div class="lec_hs_n">5</div>
        <div class="lec_hs_l"><i class="fas fa-layer-group"></i> Niveles</div>
      </div>
      <div class="lec_hs_sep"></div>
      <div class="lec_hs">
        <div class="lec_hs_n">~3h</div>
        <div class="lec_hs_l"><i class="fas fa-clock"></i> Duración</div>
      </div>
      <div class="lec_hs_sep"></div>
      <div class="lec_hs">
        <div class="lec_hs_n">70</div>
        <div class="lec_hs_l"><i class="fas fa-bolt"></i> WPM meta</div>
      </div>
    </div>
  </div>

  <!-- ══ FILTROS DE NIVEL ══ -->
  <div class="lec_filtros_wrap">
    <button class="lec_filtro active" data-nv="0" style="--fc:var(--mco)">
      <i class="fas fa-th-large"></i> Todos
    </button>
    ${NIVELES_INFO.map(nv => `
      <button class="lec_filtro" data-nv="${nv.n}" style="--fc:${nv.color}">
        <i class="fas fa-circle" style="color:${nv.color};font-size:.8em"></i>
        N${nv.n} · ${nv.lbl}
      </button>`).join('')}
  </div>

  <!-- ══ GRID DE LECCIONES ══ -->
  <div class="lec_grid" id="lec_grid">
    ${LECCIONES.map(l => _cardHTML(l)).join('')}
  </div>

  <!-- ══ CTA ══ -->
  <div class="lec_cta_wrap wi_fadeUp">
    <div class="lec_cta_card">
      <div class="lec_cta_orb"></div>
      <div class="lec_cta_body">
        <i class="fas fa-rocket lec_cta_ico"></i>
        <div>
          <h2 class="lec_cta_h2">¿Listo para comenzar tu primera lección?</h2>
          <p class="lec_cta_p">Empieza desde el principio o prueba directamente tu velocidad actual.</p>
        </div>
        <div class="lec_cta_btns">
          <a href="/comenzar" class="lec_btn_main nv_item" data-page="comenzar">
            <i class="fas fa-play"></i> Probar ahora
          </a>
          <a href="/registrar" class="lec_btn_gho nv_item" data-page="registrar">
            <i class="fas fa-user-plus"></i> Registrarme
          </a>
        </div>
      </div>
    </div>
  </div>

</div>`;

// ── CARD HTML ─────────────────────────────────────────────────────
function _cardHTML(l) {
  const locked = l.id > 3; // primeras 3 siempre disponibles en público
  const tagCol  = NIVELES_INFO.find(n => n.n === l.nivel)?.color || l.color;
  return `
    <div class="lec_card wi_fadeUp ${locked ? 'lec_locked' : ''}"
      style="--lc:${l.color}" data-nv="${l.nivel}" data-id="${l.id}">

      <!-- Barra superior de color -->
      <div class="lec_card_bar"></div>

      <!-- Header -->
      <div class="lec_card_head">
        <div class="lec_card_ico"><i class="fas ${l.ico}"></i></div>
        <div class="lec_card_tags">
          <span class="lec_tag" style="color:${tagCol};border-color:${tagCol}">
            ${l.tag}
          </span>
          ${locked ? `<span class="lec_tag_lock"><i class="fas fa-lock"></i></span>` : ''}
        </div>
      </div>

      <!-- Número de lección -->
      <div class="lec_card_num">Lección ${String(l.id).padStart(2,'0')}</div>

      <!-- Contenido -->
      <h3 class="lec_card_titulo">${l.titulo}</h3>
      <div class="lec_card_sub">${l.sub}</div>
      <p class="lec_card_desc">${l.desc}</p>

      <!-- Teclas destacadas -->
      <div class="lec_keys_row">
        ${l.teclas.slice(0, 6).map(k => `<span class="lec_key">${k}</span>`).join('')}
        ${l.teclas.length > 6 ? `<span class="lec_key lec_key_more">+${l.teclas.length - 6}</span>` : ''}
      </div>

      <!-- Footer: meta + duración -->
      <div class="lec_card_foot">
        <div class="lec_foot_meta" ${wiTip('Meta de velocidad y precisión')}>
          <i class="fas fa-bullseye" style="color:${l.color}"></i>
          <span>${l.meta}</span>
        </div>
        <div class="lec_foot_dur" ${wiTip('Duración estimada')}>
          <i class="fas fa-clock"></i>
          <span>${l.dur}</span>
        </div>
      </div>

      <!-- Botón de acción -->
      <button class="lec_card_btn" data-id="${l.id}" ${locked ? 'disabled' : ''}>
        ${locked
          ? `<i class="fas fa-lock"></i> Registrarme`
          : `<i class="fas fa-play"></i> Comenzar lección`}
      </button>
    </div>`;
}

// ── INIT ──────────────────────────────────────────────────────────
let _obs = null;

export const init = () => {
  // Animaciones scroll
  _obs = wiVista('.lec_card', null, { anim: 'wi_fadeUp', stagger: 70 });
  wiVista('.lec_cta_wrap', null, { anim: 'wi_fadeUp' });

  $(document).off('.lec');

  // Filtro de nivel
  $(document).on('click.lec', '.lec_filtro', function () {
    const nv = +$(this).data('nv');
    $('.lec_filtro').removeClass('active');
    $(this).addClass('active');
    _filtrar(nv);
  });

  // Botón comenzar
  $(document).on('click.lec', '.lec_card_btn:not([disabled])', function () {
    const id = +$(this).data('id');
    _abrirLeccion(id);
  });

  // Click en card (si no está bloqueada)
  $(document).on('click.lec', '.lec_card:not(.lec_locked)', function (e) {
    if ($(e.target).closest('.lec_card_btn').length) return;
    const id = +$(this).data('id');
    _abrirLeccion(id);
  });

  console.log(`📚 ${app} — Lecciones cargadas`);
};

export const cleanup = () => {
  _obs?.disconnect?.();
  $(document).off('.lec');
};

// ── FILTRAR ───────────────────────────────────────────────────────
function _filtrar(nv) {
  $('.lec_card').each(function () {
    const cardNv = +$(this).data('nv');
    if (nv === 0 || cardNv === nv) {
      $(this).removeClass('lec_hidden').addClass('lec_show');
    } else {
      $(this).addClass('lec_hidden').removeClass('lec_show');
    }
  });
}

// ── ABRIR LECCIÓN ─────────────────────────────────────────────────
function _abrirLeccion(id) {
  const lec = LECCIONES.find(l => l.id === id);
  if (!lec) return;
  // Por ahora navega a /comenzar — en el futuro se puede abrir
  // una vista detallada de la lección específica
  $('.nv_item[data-page="comenzar"]').trigger('click');
}
