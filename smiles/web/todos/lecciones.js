import './lecciones.css';
import $ from 'jquery';
import { wiVista, wiTip, getls } from '../../widev.js';
import { app } from '../../wii.js';

// ── 45 LECCIONES — datos del catálogo ─────────────────────────────
export const LECCIONES = [
  // ── NIVEL 1: FILA CENTRAL BÁSICA ──────────────────────────────
  { id:1,  nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Teclas F y J',          sub:'Dedos índices · fila central',        meta:'20 WPM', dur:'5 min',  teclas:['F','J']              },
  { id:2,  nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Teclas D y K',          sub:'Dedos medios · fila central',         meta:'22 WPM', dur:'5 min',  teclas:['D','K']              },
  { id:3,  nivel:1, color:'#22c55e', ico:'fa-hand', titulo:'Teclas S y L',          sub:'Dedos anulares · fila central',       meta:'24 WPM', dur:'5 min',  teclas:['S','L']              },
  { id:4,  nivel:1, color:'#16a34a', ico:'fa-keyboard', titulo:'Fila Central Completa', sub:'A S D F J K L Ñ',               meta:'26 WPM', dur:'8 min',  teclas:['A','S','D','F','J','K','L'] },
  { id:5,  nivel:1, color:'#16a34a', ico:'fa-font',  titulo:'Primeras Palabras',    sub:'Palabras con fila central',           meta:'28 WPM', dur:'8 min',  teclas:['SAL','ALA','FAJA']   },
  // ── NIVEL 2: FILA SUPERIOR ────────────────────────────────────
  { id:6,  nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Teclas E e I',      sub:'Dedos medios · fila superior',        meta:'28 WPM', dur:'8 min',  teclas:['E','I']              },
  { id:7,  nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Teclas R y U',      sub:'Índices · fila superior',             meta:'30 WPM', dur:'8 min',  teclas:['R','U']              },
  { id:8,  nivel:2, color:'#0ea5e9', ico:'fa-arrow-up', titulo:'Teclas T e Y',      sub:'Índices al centro superior',          meta:'30 WPM', dur:'8 min',  teclas:['T','Y']              },
  { id:9,  nivel:2, color:'#0284c7', ico:'fa-arrow-up', titulo:'Teclas W y O',      sub:'Anulares · fila superior',            meta:'32 WPM', dur:'8 min',  teclas:['W','O']              },
  { id:10, nivel:2, color:'#0284c7', ico:'fa-keyboard', titulo:'Fila Superior + Central', sub:'Q W E R T Y U I O P',          meta:'34 WPM', dur:'12 min', teclas:['Q','W','E','R','T','Y','U'] },
  // ── NIVEL 3: FILA INFERIOR ────────────────────────────────────
  { id:11, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Teclas V y B',    sub:'Índices · fila inferior',             meta:'30 WPM', dur:'8 min',  teclas:['V','B']              },
  { id:12, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Teclas N y M',    sub:'Índice derecho · fila inferior',      meta:'32 WPM', dur:'8 min',  teclas:['N','M']              },
  { id:13, nivel:3, color:'#f97316', ico:'fa-arrow-down', titulo:'Teclas C y coma', sub:'Dedos medios · fila inferior',        meta:'32 WPM', dur:'8 min',  teclas:['C',',']              },
  { id:14, nivel:3, color:'#ea580c', ico:'fa-arrow-down', titulo:'Teclas Z y X',    sub:'Meñique y anular izquierdo',          meta:'30 WPM', dur:'8 min',  teclas:['Z','X']              },
  { id:15, nivel:3, color:'#ea580c', ico:'fa-keyboard',   titulo:'Todas las filas', sub:'Alfabeto QWERTY completo',            meta:'35 WPM', dur:'12 min', teclas:['A–Z']                },
  // ── NIVEL 4: FRASES Y NÚMEROS ─────────────────────────────────
  { id:16, nivel:4, color:'#a855f7', ico:'fa-align-left',  titulo:'Frases Simples', sub:'Velocidad con precisión',             meta:'36 WPM', dur:'10 min', teclas:['Frases']             },
  { id:17, nivel:4, color:'#a855f7', ico:'fa-hashtag',     titulo:'Números 1 al 5', sub:'Fila numérica · mitad izquierda',     meta:'34 WPM', dur:'10 min', teclas:['1','2','3','4','5']  },
  { id:18, nivel:4, color:'#a855f7', ico:'fa-hashtag',     titulo:'Números 6 al 0', sub:'Fila numérica · mitad derecha',       meta:'34 WPM', dur:'10 min', teclas:['6','7','8','9','0']  },
  { id:19, nivel:4, color:'#9333ea', ico:'fa-hashtag',     titulo:'Todos los números', sub:'Fila numérica completa',           meta:'36 WPM', dur:'10 min', teclas:['0–9']                },
  { id:20, nivel:4, color:'#9333ea', ico:'fa-align-left',  titulo:'Texto Real',     sub:'Práctica con texto natural',          meta:'38 WPM', dur:'12 min', teclas:['Texto']              },
  // ── NIVEL 5: INTERMEDIO ───────────────────────────────────────
  { id:21, nivel:5, color:'#06b6d4', ico:'fa-exclamation', titulo:'Puntuación Básica',   sub:'Punto, coma y dos puntos',       meta:'36 WPM', dur:'10 min', teclas:['.',',',':']          },
  { id:22, nivel:5, color:'#06b6d4', ico:'fa-font',        titulo:'Mayúsculas con Shift', sub:'Shift + tecla = mayúscula',     meta:'36 WPM', dur:'10 min', teclas:['⇧']                  },
  { id:23, nivel:5, color:'#06b6d4', ico:'fa-list',        titulo:'Palabras Comunes',     sub:'Las 50 palabras más usadas',    meta:'38 WPM', dur:'12 min', teclas:['Top 50']             },
  { id:24, nivel:5, color:'#0891b2', ico:'fa-list',        titulo:'Palabras Comunes II',  sub:'Continuación top palabras',     meta:'40 WPM', dur:'12 min', teclas:['Top 100']            },
  { id:25, nivel:5, color:'#0891b2', ico:'fa-comments',    titulo:'Frases del Día a Día', sub:'Comunicación cotidiana',        meta:'40 WPM', dur:'12 min', teclas:['Frases']             },
  // ── NIVEL 6: PÁRRAFOS ─────────────────────────────────────────
  { id:26, nivel:6, color:'#ec4899', ico:'fa-align-left',  titulo:'Párrafo Corto I',    sub:'Texto continuo sin pausas',       meta:'42 WPM', dur:'12 min', teclas:['Párrafo']            },
  { id:27, nivel:6, color:'#ec4899', ico:'fa-align-left',  titulo:'Párrafo Corto II',   sub:'Ideas conectadas',                meta:'42 WPM', dur:'12 min', teclas:['Fluidez']            },
  { id:28, nivel:6, color:'#ec4899', ico:'fa-hashtag',     titulo:'Números en Contexto', sub:'Mezcla de texto y números',     meta:'40 WPM', dur:'12 min', teclas:['Mix']                },
  { id:29, nivel:6, color:'#db2777', ico:'fa-envelope',    titulo:'Email Profesional',  sub:'Redacción de comunicados',        meta:'42 WPM', dur:'15 min', teclas:['Email']              },
  { id:30, nivel:6, color:'#db2777', ico:'fa-bolt',        titulo:'Velocidad Inicial',  sub:'Test de velocidad real',          meta:'45 WPM', dur:'15 min', teclas:['Sprint']             },
  // ── NIVEL 7: AVANZADO ─────────────────────────────────────────
  { id:31, nivel:7, color:'#f59e0b', ico:'fa-microchip',   titulo:'Texto Técnico I',    sub:'Vocabulario especializado',       meta:'45 WPM', dur:'15 min', teclas:['Técnico']            },
  { id:32, nivel:7, color:'#f59e0b', ico:'fa-microchip',   titulo:'Texto Técnico II',   sub:'Informática y tecnología',        meta:'47 WPM', dur:'15 min', teclas:['IT']                 },
  { id:33, nivel:7, color:'#d97706', ico:'fa-align-justify',titulo:'Párrafo Largo I',   sub:'Resistencia y concentración',     meta:'47 WPM', dur:'15 min', teclas:['Largo']              },
  { id:34, nivel:7, color:'#d97706', ico:'fa-a',           titulo:'Acentos y Tilde',    sub:'Español con tildes correctas',    meta:'44 WPM', dur:'15 min', teclas:['á','é','í','ó','ú']  },
  { id:35, nivel:7, color:'#b45309', ico:'fa-exclamation', titulo:'Signos de Puntuación', sub:'Puntuación avanzada',           meta:'44 WPM', dur:'15 min', teclas:['.','(',')','–','"']  },
  // ── NIVEL 8: VELOCIDAD ────────────────────────────────────────
  { id:36, nivel:8, color:'#10b981', ico:'fa-gauge',       titulo:'Objetivo: 40 WPM',   sub:'Nivel profesional básico',        meta:'40 WPM', dur:'15 min', teclas:['40 WPM']             },
  { id:37, nivel:8, color:'#10b981', ico:'fa-gauge',       titulo:'Objetivo: 50 WPM',   sub:'Mecanógrafo competente',          meta:'50 WPM', dur:'15 min', teclas:['50 WPM']             },
  { id:38, nivel:8, color:'#059669', ico:'fa-gauge-high',  titulo:'Objetivo: 60 WPM',   sub:'Nivel avanzado de escritura',     meta:'60 WPM', dur:'15 min', teclas:['60 WPM']             },
  // ── NIVEL 9: EXPERTO ──────────────────────────────────────────
  { id:39, nivel:9, color:'#ef4444', ico:'fa-book-open',   titulo:'Texto Académico',    sub:'Redacción universitaria',         meta:'50 WPM', dur:'18 min', teclas:['Académico']          },
  { id:40, nivel:9, color:'#ef4444', ico:'fa-scale-balanced', titulo:'Texto Jurídico',  sub:'Redacción legal y formal',        meta:'50 WPM', dur:'18 min', teclas:['Legal']              },
  { id:41, nivel:9, color:'#dc2626', ico:'fa-code',        titulo:'Código de Programación', sub:'Sintaxis y símbolos técnicos', meta:'45 WPM', dur:'18 min', teclas:['{}','()','[]']     },
  { id:42, nivel:9, color:'#dc2626', ico:'fa-gauge-high',  titulo:'Objetivo: 70 WPM',   sub:'Experto en mecanografía',         meta:'70 WPM', dur:'18 min', teclas:['70 WPM']             },
  // ── NIVEL 10: MAESTRO ─────────────────────────────────────────
  { id:43, nivel:10, color:'#7c3aed', ico:'fa-trophy', titulo:'Velocidad: 80 WPM',      sub:'Maestro de la mecanografía',      meta:'80 WPM', dur:'20 min', teclas:['80 WPM']             },
  { id:44, nivel:10, color:'#7c3aed', ico:'fa-star',   titulo:'Texto Mixto Complejo',   sub:'Letras, números y símbolos',      meta:'70 WPM', dur:'20 min', teclas:['Mix total']          },
  { id:45, nivel:10, color:'#6d28d9', ico:'fa-crown',  titulo:'Párrafo de Maestría',    sub:'El texto definitivo',             meta:'80 WPM', dur:'20 min', teclas:['Maestría']           },
];

// Niveles agrupados para filtro y hero
const NIVELES_INFO = [
  { n:1,  lbl:'Fila Central',    color:'#22c55e', ico:'fa-hand'        },
  { n:2,  lbl:'Fila Superior',   color:'#0ea5e9', ico:'fa-arrow-up'    },
  { n:3,  lbl:'Fila Inferior',   color:'#f97316', ico:'fa-arrow-down'  },
  { n:4,  lbl:'Frases y Números',color:'#a855f7', ico:'fa-hashtag'     },
  { n:5,  lbl:'Intermedio',      color:'#06b6d4', ico:'fa-align-left'  },
  { n:6,  lbl:'Párrafos',        color:'#ec4899', ico:'fa-align-justify'},
  { n:7,  lbl:'Avanzado',        color:'#f59e0b', ico:'fa-microchip'   },
  { n:8,  lbl:'Velocidad',       color:'#10b981', ico:'fa-gauge'       },
  { n:9,  lbl:'Experto',         color:'#ef4444', ico:'fa-book-open'   },
  { n:10, lbl:'Maestro',         color:'#7c3aed', ico:'fa-trophy'      },
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
        <i class="fas fa-graduation-cap"></i> Plan de estudio progresivo
        <span class="lec_badge_dot"></span>
      </div>
      <h1 class="lec_hero_h1">
        45 lecciones para<br>
        <span class="lec_grad">dominar el teclado</span>
      </h1>
      <p class="lec_hero_sub">
        Desde tus primeras teclas hasta <strong>80 WPM</strong>.
        10 niveles progresivos con teclado visual y sonido.
      </p>
      <div class="lec_hero_prog">
        <div class="lec_hp_info">
          <span><i class="fas fa-check-circle" style="color:var(--success)"></i> 0 completadas</span>
          <span id="lec_global_pct">0 / 45</span>
        </div>
        <div class="lec_hp_track">
          <div class="lec_hp_fill" id="lec_hp_fill" style="width:0%"></div>
        </div>
      </div>
    </div>
    <!-- Stats rápidos -->
    <div class="lec_hero_stats">
      <div class="lec_hs">
        <div class="lec_hs_n">45</div>
        <div class="lec_hs_l"><i class="fas fa-book-open"></i> Lecciones</div>
      </div>
      <div class="lec_hs_sep"></div>
      <div class="lec_hs">
        <div class="lec_hs_n">10</div>
        <div class="lec_hs_l"><i class="fas fa-layer-group"></i> Niveles</div>
      </div>
      <div class="lec_hs_sep"></div>
      <div class="lec_hs">
        <div class="lec_hs_n">~8h</div>
        <div class="lec_hs_l"><i class="fas fa-clock"></i> Duración</div>
      </div>
      <div class="lec_hs_sep"></div>
      <div class="lec_hs">
        <div class="lec_hs_n">80</div>
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
        <i class="fas ${nv.ico}" style="color:${nv.color};font-size:.85em"></i>
        N${nv.n} · ${nv.lbl}
      </button>`).join('')}
  </div>

  <!-- ══ GRID DE LECCIONES ══ -->
  <div class="lec_grid" id="lec_grid">
    ${LECCIONES.map(l => _cardHTML(l, [], false)).join('')}
  </div>

  <!-- ══ CTA ══ -->
  <div class="lec_cta_wrap wi_fadeUp">
    <div class="lec_cta_card">
      <div class="lec_cta_orb"></div>
      <div class="lec_cta_body">
        <i class="fas fa-rocket lec_cta_ico"></i>
        <div>
          <h2 class="lec_cta_h2">¿Ya practicaste hoy?</h2>
          <p class="lec_cta_p">Empieza desde la lección 01 o prueba tu velocidad actual en el modo libre.</p>
        </div>
        <div class="lec_cta_btns">
          <a href="/leccion01" class="lec_btn_main nv_item" data-page="leccion01">
            <i class="fas fa-play"></i> Empezar desde el inicio
          </a>
          <a href="/comenzar" class="lec_btn_gho nv_item" data-page="comenzar">
            <i class="fas fa-bolt"></i> Modo libre
          </a>
        </div>
      </div>
    </div>
  </div>

</div>`;

// ── CARD HTML ─────────────────────────────────────────────────────
// lecsOk  : IDs completados (cache) — cero reads
// isAuth  : true si hay sesión activa
function _cardHTML(l, lecsOk = [], isAuth = false) {
  const num      = String(l.id).padStart(2, '0');
  const href     = `/leccion${num}`;
  const page     = `leccion${num}`;
  const nInfo    = NIVELES_INFO.find(n => n.n === l.nivel) || {};

  // Completada y desbloqueada solo aplica si hay auth
  const completada   = isAuth && lecsOk.includes(l.id);
  const desbloqueada = !isAuth || l.id === 1 || lecsOk.includes(l.id - 1) || completada;
  const prac         = completada ? (getls(`wiPrac_${l.id}`) || {}) : {};

  // Badge de estado
  const badge = completada
    ? `<span class="lec_estado lec_ok"><i class="fas fa-check"></i> ${prac.wpm || ''}${prac.wpm ? ' WPM' : 'Hecha'}</span>`
    : (!desbloqueada
      ? `<span class="lec_estado lec_lock"><i class="fas fa-lock"></i></span>`
      : '');

  // Estrellas si completada
  const stars = completada && prac.estrellas
    ? `<div class="lec_stars">${[1,2,3,4,5].map(s => `<i class="fas fa-star ${s<=prac.estrellas?'lec_son':''}"></i>`).join('')}</div>`
    : '';

  return `
    <a class="lec_card wi_fadeUp ${completada ? 'lec_done' : ''} ${!desbloqueada ? 'lec_bloqueada' : ''}" href="${href}" data-page="${page}"
      style="--lc:${l.color}" data-nv="${l.nivel}" data-id="${l.id}"
      ${!desbloqueada ? 'title="Completa la lección anterior primero"' : ''}>

      <!-- Barra superior de color -->
      <div class="lec_card_bar"></div>

      <!-- Header -->
      <div class="lec_card_head">
        <div class="lec_card_ico"><i class="fas ${!desbloqueada ? 'fa-lock' : l.ico}"></i></div>
        <div class="lec_card_tags">
          <span class="lec_tag" style="color:${l.color};border-color:${l.color}">
            N${l.nivel} · ${nInfo.lbl || ''}
          </span>
          ${badge}
        </div>
      </div>

      <!-- Número -->
      <div class="lec_card_num">Lección ${num}</div>

      <!-- Contenido -->
      <h3 class="lec_card_titulo">${l.titulo}</h3>
      <div class="lec_card_sub">${l.sub}</div>

      ${stars}

      <!-- Teclas destacadas -->
      <div class="lec_keys_row">
        ${l.teclas.slice(0, 5).map(k => `<span class="lec_key">${k}</span>`).join('')}
        ${l.teclas.length > 5 ? `<span class="lec_key lec_key_more">+${l.teclas.length - 5}</span>` : ''}
      </div>

      <!-- Footer: meta + duración -->
      <div class="lec_card_foot">
        <div class="lec_foot_meta" ${wiTip('Meta de velocidad')}>
          <i class="fas fa-bolt" style="color:${l.color}"></i>
          <span>${l.meta}</span>
        </div>
        <div class="lec_foot_dur" ${wiTip('Duración estimada')}>
          <i class="fas fa-clock"></i>
          <span>${l.dur}</span>
        </div>
        <div class="lec_foot_go">
          <i class="fas ${completada ? 'fa-redo' : 'fa-arrow-right'}"></i>
        </div>
      </div>
    </a>`;
}

// ── INIT ──────────────────────────────────────────────────────────
let _obs = null;

export const init = () => {
  // ── Auth check (cache only) ─────────────────────────────────────
  const wi     = getls('wiSmile');
  const isAuth = !!wi?.usuario;
  const prog   = isAuth ? (getls('wiProgreso') || {}) : {};
  const lecsOk = prog.leccionesOk || [];
  const pct    = Math.round((lecsOk.length / 45) * 100);

  // Renderizar grid con estado correcto
  $('#lec_grid').html(LECCIONES.map(l => _cardHTML(l, lecsOk, isAuth)).join(''));

  // Actualizar hero solo si hay sesion con avances
  if (isAuth && lecsOk.length > 0) {
    $('#lec_hp_fill').css('width', `${pct}%`);
    $('#lec_global_pct').text(`${lecsOk.length} / 45`);
    $('.lec_hp_info span:first').html(`<i class="fas fa-check-circle" style="color:var(--success)"></i> ${lecsOk.length} completadas`);
  }

  // Animaciones scroll
  _obs = wiVista('.lec_card', null, { anim: 'wi_fadeUp', stagger: 45 });
  wiVista('.lec_cta_wrap', null, { anim: 'wi_fadeUp' });

  $(document).off('.lec');

  // Filtro de nivel
  $(document).on('click.lec', '.lec_filtro', function () {
    const nv = +$(this).data('nv');
    $('.lec_filtro').removeClass('active');
    $(this).addClass('active');
    _filtrar(nv);
  });

  // Click en card — bloquear si no desbloqueada, navegar si ok
  $(document).on('click.lec', '.lec_card', function (e) {
    e.preventDefault();
    if ($(this).hasClass('lec_bloqueada')) return;
    const page = $(this).data('page');
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate(`/${page}`));
  });

  console.log(`📚 ${app} — ${LECCIONES.length} lecciones · ${lecsOk.length} completadas (cache)`);
};

export const cleanup = () => {
  _obs?.disconnect?.();
  $(document).off('.lec');
};

// ── FILTRAR ───────────────────────────────────────────────────────
function _filtrar(nv) {
  $('.lec_card').each(function () {
    const cardNv = +$(this).data('nv');
    $(this).toggleClass('lec_hidden', nv !== 0 && cardNv !== nv)
           .toggleClass('lec_show',   nv === 0 || cardNv === nv);
  });
}
