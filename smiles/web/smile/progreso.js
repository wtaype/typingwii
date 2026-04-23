// ════════════════════════════════════════════════════════════════════
// progreso.js — TypingWii · Mi Progreso (Estudiante)
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './progreso.css';
import $ from 'jquery';
import { getls, savels } from '../../widev.js';
import { app } from '../../wii.js';
import { db } from '../firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

// ── CATÁLOGO ──────────────────────────────────────────────────────────────────
const NIVELES = [
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

const LECS = [
  {id:1, n:1, t:'Tecla F', s:'Dedo índice izquierdo'},
  {id:2, n:1, t:'Tecla J', s:'Dedo índice derecho'},
  {id:3, n:1, t:'Tecla D', s:'Dedo medio izquierdo'},
  {id:4, n:1, t:'Tecla K', s:'Dedo medio derecho'},
  {id:5, n:1, t:'Tecla S', s:'Dedo anular izquierdo'},
  {id:6, n:1, t:'Tecla L', s:'Dedo anular derecho'},
  {id:7, n:1, t:'Tecla A', s:'Dedo meñique izquierdo'},
  {id:8, n:1, t:'Tecla Ñ', s:'Dedo meñique derecho'},
  {id:9, n:1, t:'Tecla G', s:'Dedo índice izquierdo (extensión)'},
  {id:10, n:1, t:'Tecla H', s:'Dedo índice derecho (extensión)'},
  {id:11, n:1, t:'Tecla E', s:'Dedo medio izquierdo (arriba)'},
  {id:12, n:1, t:'Tecla I', s:'Dedo medio derecho (arriba)'},
  {id:13, n:1, t:'Tecla R', s:'Dedo índice izquierdo (arriba)'},
  {id:14, n:1, t:'Tecla U', s:'Dedo índice derecho (arriba)'},
  {id:15, n:1, t:'Tecla T', s:'Dedo índice izquierdo (arriba-ext)'},
  {id:16, n:2, t:'Tecla Y', s:'Dedo índice derecho (arriba-ext)'},
  {id:17, n:2, t:'Tecla W', s:'Dedo anular izquierdo (arriba)'},
  {id:18, n:2, t:'Tecla O', s:'Dedo anular derecho (arriba)'},
  {id:19, n:2, t:'Tecla Q', s:'Dedo meñique izquierdo (arriba)'},
  {id:20, n:2, t:'Tecla P', s:'Dedo meñique derecho (arriba)'},
  {id:21, n:2, t:'Tecla V', s:'Dedo índice izquierdo (abajo)'},
  {id:22, n:2, t:'Tecla M', s:'Dedo índice derecho (abajo)'},
  {id:23, n:2, t:'Tecla C', s:'Dedo medio izquierdo (abajo)'},
  {id:24, n:2, t:'Tecla N', s:'Dedo índice derecho (abajo)'},
  {id:25, n:2, t:'Tecla X', s:'Dedo anular izquierdo (abajo)'},
  {id:26, n:2, t:'Tecla B', s:'Dedo índice izquierdo (abajo-ext)'},
  {id:27, n:2, t:'Tecla Z', s:'Dedo meñique izquierdo (abajo)'},
  {id:28, n:2, t:'Tecla ,', s:'Dedo medio derecho (abajo)'},
  {id:29, n:2, t:'Tecla .', s:'Dedo anular derecho (abajo)'},
  {id:30, n:2, t:'Barra Espaciadora', s:'Pulgares'},
  {id:31, n:3, t:'Mix Índices', s:'Coordinación y Fluidez'},
  {id:32, n:3, t:'Mix Medios', s:'Coordinación y Fluidez'},
  {id:33, n:3, t:'Mix Anulares', s:'Coordinación y Fluidez'},
  {id:34, n:3, t:'Mix Meñiques', s:'Coordinación y Fluidez'},
  {id:35, n:3, t:'Escala Izquierda', s:'Coordinación y Fluidez'},
  {id:36, n:3, t:'Escala Derecha', s:'Coordinación y Fluidez'},
  {id:37, n:3, t:'Extensiones Centro', s:'Coordinación y Fluidez'},
  {id:38, n:3, t:'Mitad Izquierda Total', s:'Coordinación y Fluidez'},
  {id:39, n:3, t:'Mitad Derecha Total', s:'Coordinación y Fluidez'},
  {id:40, n:3, t:'Fila Guía Completa', s:'Coordinación y Fluidez'},
  {id:41, n:3, t:'Salto Vertical Medio Izq', s:'Coordinación y Fluidez'},
  {id:42, n:3, t:'Salto Vertical Índice Der', s:'Coordinación y Fluidez'},
  {id:43, n:3, t:'Salto Vertical Índice Izq', s:'Coordinación y Fluidez'},
  {id:44, n:3, t:'Salto Vertical Medio Der', s:'Coordinación y Fluidez'},
  {id:45, n:3, t:'Salto Vertical Anular Izq', s:'Coordinación y Fluidez'},
  {id:46, n:4, t:'Salto Vertical Anular Der', s:'Coordinación y Fluidez'},
  {id:47, n:4, t:'Salto Vertical Meñique Izq', s:'Coordinación y Fluidez'},
  {id:48, n:4, t:'Salto Vertical Meñique Der', s:'Coordinación y Fluidez'},
  {id:49, n:4, t:'Salto Extensión Izq', s:'Coordinación y Fluidez'},
  {id:50, n:4, t:'Salto Extensión Der', s:'Coordinación y Fluidez'},
  {id:51, n:4, t:'Bigrama Frecuente', s:'Coordinación y Fluidez'},
  {id:52, n:4, t:'Bigrama Frecuente', s:'Coordinación y Fluidez'},
  {id:53, n:4, t:'Bigrama Frecuente', s:'Coordinación y Fluidez'},
  {id:54, n:4, t:'Bigrama Frecuente', s:'Coordinación y Fluidez'},
  {id:55, n:4, t:'Bigrama Frecuente', s:'Coordinación y Fluidez'},
  {id:56, n:4, t:'Bigrama Frecuente', s:'Coordinación y Fluidez'},
  {id:57, n:4, t:'Bigrama Frecuente', s:'Coordinación y Fluidez'},
  {id:58, n:4, t:'Bigrama Frecuente', s:'Coordinación y Fluidez'},
  {id:59, n:4, t:'Bigrama Frecuente', s:'Coordinación y Fluidez'},
  {id:60, n:4, t:'Bigrama Frecuente', s:'Coordinación y Fluidez'},
  {id:61, n:5, t:'Palabra: sol', s:'Coordinación y Fluidez'},
  {id:62, n:5, t:'Palabra: pan', s:'Coordinación y Fluidez'},
  {id:63, n:5, t:'Palabra: mar', s:'Coordinación y Fluidez'},
  {id:64, n:5, t:'Palabra: luz', s:'Coordinación y Fluidez'},
  {id:65, n:5, t:'Palabra: voz', s:'Coordinación y Fluidez'},
  {id:66, n:5, t:'Palabra: casa', s:'Coordinación y Fluidez'},
  {id:67, n:5, t:'Palabra: flor', s:'Coordinación y Fluidez'},
  {id:68, n:5, t:'Palabra: pelo', s:'Coordinación y Fluidez'},
  {id:69, n:5, t:'Palabra: mesa', s:'Coordinación y Fluidez'},
  {id:70, n:5, t:'Palabra: vida', s:'Coordinación y Fluidez'},
  {id:71, n:5, t:'Palabra: tiempo', s:'Coordinación y Fluidez'},
  {id:72, n:5, t:'Palabra: camino', s:'Coordinación y Fluidez'},
  {id:73, n:5, t:'Palabra: fuerte', s:'Coordinación y Fluidez'},
  {id:74, n:5, t:'Palabra: ciudad', s:'Coordinación y Fluidez'},
  {id:75, n:5, t:'Palabra: tierra', s:'Coordinación y Fluidez'},
  {id:76, n:6, t:'Palabra: puerta', s:'Coordinación y Fluidez'},
  {id:77, n:6, t:'Palabra: blanco', s:'Coordinación y Fluidez'},
  {id:78, n:6, t:'Palabra: fuerza', s:'Coordinación y Fluidez'},
  {id:79, n:6, t:'Palabra: puente', s:'Coordinación y Fluidez'},
  {id:80, n:6, t:'Palabra: viento', s:'Coordinación y Fluidez'},
  {id:81, n:6, t:'Palabra: llave', s:'Coordinación y Fluidez'},
  {id:82, n:6, t:'Palabra: perro', s:'Coordinación y Fluidez'},
  {id:83, n:6, t:'Palabra: calle', s:'Coordinación y Fluidez'},
  {id:84, n:6, t:'Palabra: lleno', s:'Coordinación y Fluidez'},
  {id:85, n:6, t:'Palabra: valle', s:'Coordinación y Fluidez'},
  {id:86, n:6, t:'Palabra: correr', s:'Coordinación y Fluidez'},
  {id:87, n:6, t:'Palabra: carro', s:'Coordinación y Fluidez'},
  {id:88, n:6, t:'Palabra: accion', s:'Coordinación y Fluidez'},
  {id:89, n:6, t:'Palabra: leccion', s:'Coordinación y Fluidez'},
  {id:90, n:6, t:'Palabra: ficcion', s:'Coordinación y Fluidez'},
  {id:91, n:7, t:'Uso de: A', s:'Coordinación y Fluidez'},
  {id:92, n:7, t:'Uso de: E', s:'Coordinación y Fluidez'},
  {id:93, n:7, t:'Uso de: I', s:'Coordinación y Fluidez'},
  {id:94, n:7, t:'Uso de: O', s:'Coordinación y Fluidez'},
  {id:95, n:7, t:'Uso de: U', s:'Coordinación y Fluidez'},
  {id:96, n:7, t:'Uso de: M', s:'Coordinación y Fluidez'},
  {id:97, n:7, t:'Uso de: S', s:'Coordinación y Fluidez'},
  {id:98, n:7, t:'Uso de: L', s:'Coordinación y Fluidez'},
  {id:99, n:7, t:'Uso de: C', s:'Coordinación y Fluidez'},
  {id:100, n:7, t:'Uso de: P', s:'Coordinación y Fluidez'},
  {id:101, n:7, t:'Uso de: á', s:'Coordinación y Fluidez'},
  {id:102, n:7, t:'Uso de: é', s:'Coordinación y Fluidez'},
  {id:103, n:7, t:'Uso de: í', s:'Coordinación y Fluidez'},
  {id:104, n:7, t:'Uso de: ó', s:'Coordinación y Fluidez'},
  {id:105, n:7, t:'Uso de: ú', s:'Coordinación y Fluidez'},
  {id:106, n:8, t:'Uso de: más', s:'Coordinación y Fluidez'},
  {id:107, n:8, t:'Uso de: qué', s:'Coordinación y Fluidez'},
  {id:108, n:8, t:'Uso de: sí', s:'Coordinación y Fluidez'},
  {id:109, n:8, t:'Uso de: él', s:'Coordinación y Fluidez'},
  {id:110, n:8, t:'Uso de: así', s:'Coordinación y Fluidez'},
  {id:111, n:8, t:'Uso de: ;', s:'Coordinación y Fluidez'},
  {id:112, n:8, t:'Uso de: :', s:'Coordinación y Fluidez'},
  {id:113, n:8, t:'Uso de: -', s:'Coordinación y Fluidez'},
  {id:114, n:8, t:'Uso de: _', s:'Coordinación y Fluidez'},
  {id:115, n:8, t:"Uso de: ", s:'Coordinación y Fluidez'},
  {id:116, n:8, t:"Uso de: '", s:'Coordinación y Fluidez'},
  {id:117, n:8, t:'Uso de: !', s:'Coordinación y Fluidez'},
  {id:118, n:8, t:'Uso de: ?', s:'Coordinación y Fluidez'},
  {id:119, n:8, t:'Uso de: (', s:'Coordinación y Fluidez'},
  {id:120, n:8, t:'Uso de: )', s:'Coordinación y Fluidez'},
  {id:121, n:9, t:'Dominio: 1...', s:'Coordinación y Fluidez'},
  {id:122, n:9, t:'Dominio: 2...', s:'Coordinación y Fluidez'},
  {id:123, n:9, t:'Dominio: 3...', s:'Coordinación y Fluidez'},
  {id:124, n:9, t:'Dominio: 4...', s:'Coordinación y Fluidez'},
  {id:125, n:9, t:'Dominio: 5...', s:'Coordinación y Fluidez'},
  {id:126, n:9, t:'Dominio: 6...', s:'Coordinación y Fluidez'},
  {id:127, n:9, t:'Dominio: 7...', s:'Coordinación y Fluidez'},
  {id:128, n:9, t:'Dominio: 8...', s:'Coordinación y Fluidez'},
  {id:129, n:9, t:'Dominio: 9...', s:'Coordinación y Fluidez'},
  {id:130, n:9, t:'Dominio: 0...', s:'Coordinación y Fluidez'},
  {id:131, n:9, t:'Dominio: @...', s:'Coordinación y Fluidez'},
  {id:132, n:9, t:'Dominio: #...', s:'Coordinación y Fluidez'},
  {id:133, n:9, t:'Dominio: $...', s:'Coordinación y Fluidez'},
  {id:134, n:9, t:'Dominio: %...', s:'Coordinación y Fluidez'},
  {id:135, n:9, t:'Dominio: &...', s:'Coordinación y Fluidez'},
  {id:136, n:10, t:'Dominio: /...', s:'Coordinación y Fluidez'},
  {id:137, n:10, t:'Dominio: =...', s:'Coordinación y Fluidez'},
  {id:138, n:10, t:'Dominio: {...', s:'Coordinación y Fluidez'},
  {id:139, n:10, t:'Dominio: }...', s:'Coordinación y Fluidez'},
  {id:140, n:10, t:'Dominio: [...', s:'Coordinación y Fluidez'},
  {id:141, n:10, t:'Dominio: El veloz m...', s:'Coordinación y Fluidez'},
  {id:142, n:10, t:'Dominio: La vida es...', s:'Coordinación y Fluidez'},
  {id:143, n:10, t:'Dominio: function t...', s:'Coordinación y Fluidez'},
  {id:144, n:10, t:'Dominio: El exito r...', s:'Coordinación y Fluidez'},
  {id:145, n:10, t:'Dominio: console.lo...', s:'Coordinación y Fluidez'},
  {id:146, n:10, t:'Dominio: Un mar en ...', s:'Coordinación y Fluidez'},
  {id:147, n:10, t:'Dominio: En la ciud...', s:'Coordinación y Fluidez'},
  {id:148, n:10, t:'Dominio: const PI =...', s:'Coordinación y Fluidez'},
  {id:149, n:10, t:'Dominio: Nuestra ma...', s:'Coordinación y Fluidez'},
  {id:150, n:10, t:'Dominio: EL GRAN RE...', s:'Coordinación y Fluidez'}
];

const wi = () => getls('wiSmile');

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `
    <div class="pg_wrap">
      <div class="pg_empty">
        <i class="fas fa-lock pg_empty_ico"></i>
        <h3>Sin sesión activa</h3>
        <p>Inicia sesión para ver tu progreso.</p>
      </div>
    </div>`;

  const prog   = getls('wiProgreso') || {};
  const lecsOk = prog.leccionesOk  || [];
  const wpm    = prog.wpmRecord    || 0;
  const prec   = prog.precisionPct != null ? prog.precisionPct : null;
  const racha  = prog.rachaDias   != null ? prog.rachaDias : 0;
  const pct    = Math.round((lecsOk.length / 150) * 100);

  const nivelesDone = NIVELES.map(nv => {
    const ids  = LECS.filter(l => l.n === nv.n).map(l => l.id);
    const done = ids.length > 0 && ids.every(id => lecsOk.includes(id));
    return { ...nv, done };
  });

  const kpis = [
    { id:'pg_k_lec',  ico:'fa-graduation-cap', val: lecsOk.length,          lbl:'Completadas', col:'var(--mco)'  },
    { id:'pg_k_wpm',  ico:'fa-bolt',           val: wpm  || '—',            lbl:'WPM Récord',  col:'#f59e0b'     },
    { id:'pg_k_prec', ico:'fa-bullseye',        val: prec != null ? `${prec}%` : '—', lbl:'Precisión', col:'#22c55e' },
    { id:'pg_k_dia',  ico:'fa-fire',            val: racha,                  lbl:'Racha días',  col:'#ef4444'     },
  ];

  return `
  <div class="pg_wrap">

    <!-- ══ HERO ══ -->
    <div class="pg_hero">
      <div class="pg_hero_left">
        <div class="pg_hero_badge"><i class="fas fa-chart-line"></i> Mi Progreso</div>
        <h1 class="pg_hero_title">Tu camino a <span>80 WPM</span></h1>
        <p class="pg_hero_sub">${u.nombre || u.usuario} · ${app}</p>
      </div>
      <div class="pg_hero_kpis">
        ${kpis.map(k => `
          <div class="pg_kpi">
            <div class="pg_kpi_ico" style="color:${k.col}"><i class="fas ${k.ico}"></i></div>
            <div class="pg_kpi_val" id="${k.id}">${k.val}</div>
            <div class="pg_kpi_lbl">${k.lbl}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- ══ BARRA GLOBAL ══ -->
    <div class="pg_global_card">
      <div class="pg_gbar_info">
        <span><i class="fas fa-list-check" style="color:var(--mco)"></i> Progreso general</span>
        <span class="pg_gbar_pct" id="pg_gbar_txt">${lecsOk.length} / 150 · <b>${pct}%</b></span>
      </div>
      <div class="pg_gbar_track">
        <div class="pg_gbar_fill" id="pg_gbar" style="width:0%"></div>
      </div>
      <div class="pg_nivel_tags">
        ${nivelesDone.map(nv => `
          <span class="pg_nivel_tag ${nv.done ? 'done' : ''}"
            style="color:${nv.color};border-color:${nv.color}">
            N${nv.n}${nv.done ? ' ✓' : ''}
          </span>`).join('')}
      </div>
    </div>

    <!-- ══ HISTORIAL ══ -->
    <div class="pg_sec_hdr">
      <div class="pg_sec_title"><i class="fas fa-book-open"></i> Historial de lecciones</div>
      <div class="pg_sec_sub" id="pg_sub">${lecsOk.length} de 150 completadas</div>
    </div>

    <div class="pg_hist_grid" id="pg_hist_grid">
      ${LECS.map(l => _card(l, lecsOk)).join('')}
    </div>

  </div>`;
};

// ── CARD ──────────────────────────────────────────────────────────────────────
function _card(l, lecsOk) {
  const num  = String(l.id).padStart(2, '0');
  const nv   = NIVELES.find(n => n.n === l.n) || {};
  const col  = nv.color || 'var(--mco)';

  const completada   = lecsOk.includes(l.id);
  const desbloqueada = l.id === 1 || lecsOk.includes(l.id - 1) || completada;
  const prac         = completada ? (getls(`wiPrac_${l.id}`) || {}) : {};
  const wpm          = prac.wpm       || 0;
  const prec         = prac.precision || 0;
  const stars        = prac.estrellas || 0;

  let estadoTxt = completada ? `<i class="fas fa-check"></i> ${wpm ? wpm + ' WPM' : 'Hecha'}`
                : (desbloqueada ? '<i class="fas fa-play"></i> Practicar'
                : '<i class="fas fa-lock"></i> Bloqueada');
  let estadoCls = completada ? 'completada' : (desbloqueada ? 'disponible' : 'bloqueada');

  const starsHtml = completada && stars > 0
    ? `<div class="pg_hc_stars">${[1,2,3,4,5].map(s =>
        `<i class="fas fa-star ${s <= stars ? 'on' : ''}"></i>`).join('')}</div>`
    : '';

  return `
    <div class="pg_hist_card ${completada ? 'pg_done' : ''} ${!desbloqueada ? 'pg_lock' : ''}"
      style="--hc:${col}"
      data-page="leccion${num}"
      ${!desbloqueada ? 'title="Completa la lección anterior primero"' : `title="Ir a lección ${num}"`}>

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
      ` : `
        <div class="pg_hc_stats">
          <span class="pg_hc_stat" style="color:var(--tx3)">${estadoTxt}</span>
        </div>
      `}
    </div>`;
}

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = () => {
  const u = wi();
  if (!u) return;

  // Animar barra (RAF para que la transición CSS se active después del paint)
  requestAnimationFrame(() => {
    setTimeout(() => {
      const prog = getls('wiProgreso') || {};
      const pct  = Math.round(((prog.leccionesOk?.length || 0) / 150) * 100);
      $('#pg_gbar').css('width', `${pct}%`);
    }, 50);
  });

  $(document).off('.pg');

  // Click en card desbloqueada
  $(document).on('click.pg', '.pg_hist_card:not(.pg_lock)', function () {
    const page = $(this).data('page');
    if (!page) return;
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate(`/${page}`));
  });

  // Sync Firestore en background — sin bloquear UI
  _syncFirestore(u.usuario);
};

export const cleanup = () => {
  $(document).off('.pg');
};

// ── SYNC FIRESTORE (background) ───────────────────────────────────────────────
async function _syncFirestore(usuario) {
  try {
    const snap = await getDocs(
      query(collection(db, 'lecciones', usuario, 'detalle'), orderBy('leccionId'))
    );
    if (snap.empty) return;

    const prog   = getls('wiProgreso') || {};
    const lecsOk = new Set(prog.leccionesOk || []);
    let totalWpm = 0, totalPrec = 0, count = 0, wpmMax = prog.wpmRecord || 0;

    snap.forEach(d => {
      const data = d.data();
      const id   = data.leccionId;
      if (!id) return;
      lecsOk.add(id);
      const wpmVal = data.wpm || 0;
      if (wpmVal > wpmMax) wpmMax = wpmVal;
      savels(`wiPrac_${id}`, {
        wpm:       wpmVal,
        precision: data.precision || 0,
        estrellas: data.estrellas || 0,
        intentos:  data.intentos  || 1,
      }, 24 * 30);
      totalWpm  += wpmVal;
      totalPrec += data.precision || 0;
      count++;
    });

    const lecsArr = [...lecsOk];
    const newPrec = count > 0 ? Math.round(totalPrec / count) : 0;
    const newProg = { ...prog, leccionesOk: lecsArr, wpmRecord: wpmMax, precisionPct: newPrec };
    savels('wiProgreso', newProg, 24);

    // Actualizar UI
    const pct = Math.round((lecsArr.length / 150) * 100);
    $('#pg_gbar').css('width', `${pct}%`);
    $('#pg_gbar_txt').html(`${lecsArr.length} / 150 · <b>${pct}%</b>`);
    $('#pg_sub').text(`${lecsArr.length} de 150 completadas`);
    $('#pg_k_lec').text(lecsArr.length);
    $('#pg_k_wpm').text(wpmMax || '—');
    $('#pg_k_prec').text(newPrec ? `${newPrec}%` : '—');

    // Re-render grid con datos frescos
    $('#pg_hist_grid').html(LECS.map(l => _card(l, lecsArr)).join(''));

    // Re-bind clicks
    $(document).off('.pg').on('click.pg', '.pg_hist_card:not(.pg_lock)', function () {
      const page = $(this).data('page');
      if (!page) return;
      import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate(`/${page}`));
    });

    console.log(`📊 [progreso] ${lecsArr.length} lecciones · WPM max ${wpmMax}`);
  } catch (err) {
    console.error('[progreso] Error sync:', err);
  }
}
