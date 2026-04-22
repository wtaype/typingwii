import './progreso.css';
import $ from 'jquery';
import { getls, savels, wiVista } from '../../widev.js';
import { app } from '../../wii.js';
import { db } from '../firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

// ── DATOS DE LECCIONES (mismo catálogo que lecciones.js) ─────────────────────
const NIVELES_INFO = [
  { n:1,  lbl:'Fila Central',    color:'#22c55e' },
  { n:2,  lbl:'Fila Superior',   color:'#0ea5e9' },
  { n:3,  lbl:'Fila Inferior',   color:'#f97316' },
  { n:4,  lbl:'Frases y Números',color:'#a855f7' },
  { n:5,  lbl:'Intermedio',      color:'#06b6d4' },
  { n:6,  lbl:'Párrafos',        color:'#ec4899' },
  { n:7,  lbl:'Avanzado',        color:'#f59e0b' },
  { n:8,  lbl:'Velocidad',       color:'#10b981' },
  { n:9,  lbl:'Experto',         color:'#ef4444' },
  { n:10, lbl:'Maestro',         color:'#7c3aed' },
];

// Metadatos básicos para las 45 lecciones (id, nivel, titulo, sub)
const LECS_META = [
  {id:1, n:1,  t:'Teclas F y J',         s:'Índices · fila central'},
  {id:2, n:1,  t:'Teclas D y K',         s:'Dedos medios · fila central'},
  {id:3, n:1,  t:'Teclas S y L',         s:'Dedos anulares · fila central'},
  {id:4, n:1,  t:'Fila Central Completa',s:'A S D F J K L Ñ'},
  {id:5, n:1,  t:'Primeras Palabras',    s:'Palabras con fila central'},
  {id:6, n:2,  t:'Teclas E e I',         s:'Dedos medios · fila superior'},
  {id:7, n:2,  t:'Teclas R y U',         s:'Índices · fila superior'},
  {id:8, n:2,  t:'Teclas T e Y',         s:'Índices al centro superior'},
  {id:9, n:2,  t:'Teclas W y O',         s:'Anulares · fila superior'},
  {id:10,n:2,  t:'Fila Superior + Central',s:'Q W E R T Y U I O P'},
  {id:11,n:3,  t:'Teclas V y B',         s:'Índices · fila inferior'},
  {id:12,n:3,  t:'Teclas N y M',         s:'Índice derecho · fila inferior'},
  {id:13,n:3,  t:'Teclas C y coma',      s:'Dedos medios · fila inferior'},
  {id:14,n:3,  t:'Teclas Z y X',         s:'Meñique y anular izquierdo'},
  {id:15,n:3,  t:'Todas las filas',      s:'Alfabeto QWERTY completo'},
  {id:16,n:4,  t:'Frases Simples',       s:'Velocidad con precisión'},
  {id:17,n:4,  t:'Números 1 al 5',       s:'Fila numérica · mitad izquierda'},
  {id:18,n:4,  t:'Números 6 al 0',       s:'Fila numérica · mitad derecha'},
  {id:19,n:4,  t:'Todos los números',    s:'Fila numérica completa'},
  {id:20,n:4,  t:'Texto Real',           s:'Práctica con texto natural'},
  {id:21,n:5,  t:'Puntuación Básica',    s:'Punto, coma y dos puntos'},
  {id:22,n:5,  t:'Mayúsculas con Shift', s:'Shift + tecla = mayúscula'},
  {id:23,n:5,  t:'Palabras Comunes',     s:'Las 50 palabras más usadas'},
  {id:24,n:5,  t:'Palabras Comunes II',  s:'Continuación top palabras'},
  {id:25,n:5,  t:'Frases del Día a Día', s:'Comunicación cotidiana'},
  {id:26,n:6,  t:'Párrafo Corto I',      s:'Texto continuo sin pausas'},
  {id:27,n:6,  t:'Párrafo Corto II',     s:'Ideas conectadas'},
  {id:28,n:6,  t:'Números en Contexto',  s:'Mezcla de texto y números'},
  {id:29,n:6,  t:'Email Profesional',    s:'Redacción de comunicados'},
  {id:30,n:6,  t:'Velocidad Inicial',    s:'Test de velocidad real'},
  {id:31,n:7,  t:'Texto Técnico I',      s:'Vocabulario especializado'},
  {id:32,n:7,  t:'Texto Técnico II',     s:'Informática y tecnología'},
  {id:33,n:7,  t:'Párrafo Largo I',      s:'Resistencia y concentración'},
  {id:34,n:7,  t:'Acentos y Tilde',      s:'Español con tildes correctas'},
  {id:35,n:7,  t:'Signos de Puntuación', s:'Puntuación avanzada'},
  {id:36,n:8,  t:'Objetivo: 40 WPM',    s:'Nivel profesional básico'},
  {id:37,n:8,  t:'Objetivo: 50 WPM',    s:'Mecanógrafo competente'},
  {id:38,n:8,  t:'Objetivo: 60 WPM',    s:'Nivel avanzado de escritura'},
  {id:39,n:9,  t:'Texto Académico',      s:'Redacción universitaria'},
  {id:40,n:9,  t:'Texto Jurídico',       s:'Redacción legal y formal'},
  {id:41,n:9,  t:'Código de Programación',s:'Sintaxis y símbolos técnicos'},
  {id:42,n:9,  t:'Objetivo: 70 WPM',    s:'Experto en mecanografía'},
  {id:43,n:10, t:'Velocidad: 80 WPM',   s:'Maestro de la mecanografía'},
  {id:44,n:10, t:'Texto Mixto Complejo', s:'Letras, números y símbolos'},
  {id:45,n:10, t:'Párrafo de Maestría',  s:'El texto definitivo'},
];

const wi = () => getls('wiSmile');
const K_PRAC = 'wiProgresoDetalle';

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="pg_wrap"><div class="pg_empty"><i class="fas fa-lock pg_empty_ico"></i><h3>Sin sesión</h3></div></div>`;

  const prog = getls('wiProgreso') || {};
  const lecsOk = prog.leccionesOk || [];
  const wpm    = prog.wpmRecord   || 0;
  const prec   = prog.precisionPct != null ? prog.precisionPct : '—';
  const racha  = prog.rachaDias   != null ? prog.rachaDias : 0;
  const pct    = Math.round((lecsOk.length / 45) * 100);

  // Niveles completados (todos los ids del nivel están en lecsOk)
  const nivelesDone = NIVELES_INFO.map(nv => {
    const idsDeNivel = LECS_META.filter(l => l.n === nv.n).map(l => l.id);
    const done = idsDeNivel.every(id => lecsOk.includes(id));
    return { ...nv, done };
  });

  return `
  <div class="pg_wrap">

    <!-- ══ HERO KPIs ══ -->
    <div class="pg_hero wi_fadeUp">
      <div class="pg_hero_left">
        <div class="pg_hero_badge"><i class="fas fa-chart-line"></i> Mi Progreso</div>
        <h1 class="pg_hero_title">Tu camino a <span>80 WPM</span></h1>
        <p class="pg_hero_sub">${u.nombre || u.usuario} · ${app}</p>
      </div>
      <div class="pg_hero_right">
        ${[
          { ico: 'fa-graduation-cap', val: lecsOk.length, lbl: 'Completadas', color: 'var(--mco)' },
          { ico: 'fa-bolt',           val: wpm || '—',    lbl: 'WPM Récord',  color: '#f59e0b'    },
          { ico: 'fa-bullseye',       val: prec !== '—' ? `${prec}%` : '—', lbl: 'Precisión',  color: '#22c55e' },
          { ico: 'fa-fire',           val: racha,         lbl: 'Racha días',  color: '#ef4444'    },
        ].map(k => `
          <div class="pg_kpi">
            <div class="pg_kpi_ico" style="color:${k.color}"><i class="fas ${k.ico}"></i></div>
            <div class="pg_kpi_val" id="pg_kpi_${k.lbl.replace(/\s/g,'_').toLowerCase()}">${k.val}</div>
            <div class="pg_kpi_lbl">${k.lbl}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- ══ BARRA GLOBAL ══ -->
    <div class="pg_global_card wi_fadeUp">
      <div class="pg_gbar_info">
        <span><i class="fas fa-list-check" style="color:var(--mco)"></i> Progreso general</span>
        <span class="pg_gbar_pct">${lecsOk.length} / 45 · <b>${pct}%</b></span>
      </div>
      <div class="pg_gbar_track">
        <div class="pg_gbar_fill" id="pg_gbar" style="width:0%"></div>
      </div>
      <div class="pg_nivel_tags">
        ${nivelesDone.map(nv => `
          <span class="pg_nivel_tag ${nv.done ? 'done' : ''}"
            style="color:${nv.color};border-color:${nv.color}">
            N${nv.n} ${nv.done ? '✓' : ''}
          </span>`).join('')}
      </div>
    </div>

    <!-- ══ HISTORIAL DE LECCIONES ══ -->
    <div class="pg_sec_hdr wi_fadeUp">
      <div class="pg_sec_title"><i class="fas fa-book-open"></i> Historial de lecciones</div>
      <div class="pg_sec_sub" id="pg_hist_sub">Cargando...</div>
    </div>

    <div class="pg_hist_grid" id="pg_hist_grid">
      ${LECS_META.map((l, i) => _cardHTML(l, lecsOk, i)).join('')}
    </div>

  </div>`;
};

// ── CARD HTML ─────────────────────────────────────────────────────────────────
function _cardHTML(l, lecsOk, i) {
  const num    = String(l.id).padStart(2, '0');
  const nInfo  = NIVELES_INFO.find(n => n.n === l.n) || {};
  const col    = nInfo.color || 'var(--mco)';

  // Lógica de desbloqueo: disponible si es la 1ª o la anterior está completada
  const desbloqueada = l.id === 1 || lecsOk.includes(l.id - 1) || lecsOk.includes(l.id);
  const completada   = lecsOk.includes(l.id);
  const estadoCls    = completada ? 'completada' : (desbloqueada ? 'disponible' : 'bloqueada');
  const estadoTxt    = completada ? '✓ Hecha' : (desbloqueada ? 'Disponible' : '🔒');

  // Stats desde cache local
  const prac   = getls(`wiPrac_${l.id}`) || {};
  const wpm    = prac.wpm   || 0;
  const prec   = prac.precision || 0;
  const stars  = prac.estrellas || 0;

  const starsHtml = completada
    ? `<div class="pg_hc_stars">${[1,2,3,4,5].map(s => `<i class="fas fa-star ${s<=stars?'on':''}"></i>`).join('')}</div>`
    : '';

  return `
    <div class="pg_hist_card ${completada ? '' : (desbloqueada ? '' : 'bloqueada')} wi_fadeUp"
      style="--hc:${col};--d:${i * .02}s"
      data-id="${l.id}" data-page="leccion${num}"
      ${desbloqueada && !completada ? `title="Ir a lección ${num}"` : ''}
      ${completada ? `title="${l.t} · ${wpm} WPM"` : ''}>

      <div class="pg_hc_top">
        <span class="pg_hc_num">Lección ${num}</span>
        <span class="pg_hc_badge ${estadoCls}">${estadoTxt}</span>
      </div>

      <div class="pg_hc_title">${l.t}</div>
      <div class="pg_hc_sub">${l.s}</div>

      ${completada ? `
        <div class="pg_hc_stats">
          <span class="pg_hc_stat" style="color:${col}"><i class="fas fa-bolt"></i> ${wpm} WPM</span>
          <span class="pg_hc_stat" style="color:#22c55e"><i class="fas fa-bullseye"></i> ${prec}%</span>
        </div>
        ${starsHtml}
      ` : (desbloqueada ? `
        <div class="pg_hc_stats">
          <span class="pg_hc_stat"><i class="fas fa-play"></i> Practicar</span>
        </div>
      ` : `
        <div class="pg_hc_stats">
          <span class="pg_hc_stat"><i class="fas fa-lock"></i> Completa la anterior primero</span>
        </div>
      `)}
    </div>`;
}

// ── INIT ──────────────────────────────────────────────────────────────────────
let _obs = null;
export const init = () => {
  const u = wi();
  if (!u) return;

  // Animar barra con RAF para que la transición CSS funcione
  requestAnimationFrame(() => {
    const prog = getls('wiProgreso') || {};
    const pct  = Math.round(((prog.leccionesOk?.length || 0) / 45) * 100);
    $('#pg_gbar').css('width', `${pct}%`);
  });

  // Animaciones scroll
  _obs = wiVista('.wi_fadeUp', null, { anim: 'wi_fadeUp', stagger: 25 });

  // Actualizar sub con cantidad
  const prog   = getls('wiProgreso') || {};
  const lecsOk = prog.leccionesOk || [];
  const hecho  = lecsOk.length;
  $('#pg_hist_sub').text(`${hecho} de 45 completadas`);

  // Click en card desbloqueada → navegar a lección
  $(document).off('.pg').on('click.pg', '.pg_hist_card:not(.bloqueada)', function () {
    const page = $(this).data('page');
    if (!page) return;
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate(`/${page}`));
  });

  // Cargar datos reales de Firestore en background (no bloquea UI)
  _cargarDesdeFirestore(u.usuario);
};

export const cleanup = () => {
  _obs?.disconnect?.();
  $(document).off('.pg');
};

// ── CARGAR DESDE FIRESTORE (background) ──────────────────────────────────────
async function _cargarDesdeFirestore(usuario) {
  try {
    const snap = await getDocs(
      query(collection(db, 'lecciones', usuario, 'detalle'), orderBy('leccionId'))
    );
    if (snap.empty) return;

    const prog    = getls('wiProgreso') || {};
    const lecsOk  = new Set(prog.leccionesOk || []);
    let totalWpm  = 0, totalPrec = 0, count = 0;

    snap.forEach(d => {
      const data = d.data();
      const id   = data.leccionId;
      lecsOk.add(id);
      savels(`wiPrac_${id}`, {
        wpm:       data.wpm       || 0,
        precision: data.precision || 0,
        estrellas: data.estrellas || 0,
        intentos:  data.intentos  || 1,
      }, 24 * 30);
      totalWpm  += data.wpm       || 0;
      totalPrec += data.precision || 0;
      count++;
    });

    const newProg = {
      ...prog,
      leccionesOk:  [...lecsOk],
      wpmRecord:    prog.wpmRecord || 0,
      precisionPct: count > 0 ? Math.round(totalPrec / count) : 0,
    };
    savels('wiProgreso', newProg, 24);

    const lecsArr  = [...lecsOk];
    const gridHtml = LECS_META.map((l, i) => _cardHTML(l, lecsArr, i)).join('');
    $('#pg_hist_grid').html(gridHtml);
    const pct = Math.round((lecsArr.length / 45) * 100);
    $('#pg_gbar').css('width', `${pct}%`);
    $('#pg_hist_sub').text(`${lecsArr.length} de 45 completadas`);
    $(`#pg_kpi_completadas`).text(lecsArr.length);
    $(`#pg_kpi_precisión`).text(newProg.precisionPct ? `${newProg.precisionPct}%` : '—');

    $(document).off('.pg').on('click.pg', '.pg_hist_card:not(.bloqueada)', function () {
      const page = $(this).data('page');
      if (!page) return;
      import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate(`/${page}`));
    });

    console.log(`📊 [progreso] ${lecsArr.length} lecciones cargadas de lecciones/${usuario}/detalle`);
  } catch (err) {
    console.error('[progreso] Error cargando:', err);
  }
}
