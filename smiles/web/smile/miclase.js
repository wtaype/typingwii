// ════════════════════════════════════════════════════════════════════
// miclase.js — TypingWii · Mi Clase (Estudiante)
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './miclase.css';
import $ from 'jquery';
import { getls, savels, Notificacion } from '../../widev.js';
import { db } from '../firebase.js';
import {
  doc, getDoc, updateDoc, arrayUnion, serverTimestamp
} from 'firebase/firestore';

const wi     = () => getls('wiSmile');
const K_CLASE = 'wiClaseData';

// Catálogo mínimo para mostrar nombre de lección por id
const LEC_NOMBRES = {
  1:'Teclas F y J', 2:'Teclas D y K', 3:'Teclas S y L',
  4:'Fila Central Completa', 5:'Primeras Palabras',
  6:'Teclas E e I', 7:'Teclas R y U', 8:'Teclas T e Y',
  9:'Teclas W y O', 10:'Fila Superior + Central',
  11:'Teclas V y B', 12:'Teclas N y M', 13:'Teclas C y coma',
  14:'Teclas Z y X', 15:'Todas las filas',
  16:'Frases Simples', 17:'Números 1 al 5', 18:'Números 6 al 0',
  19:'Todos los números', 20:'Texto Real',
  21:'Puntuación Básica', 22:'Mayúsculas con Shift', 23:'Palabras Comunes',
  24:'Palabras Comunes II', 25:'Frases del Día a Día',
  26:'Párrafo Corto I', 27:'Párrafo Corto II', 28:'Números en Contexto',
  29:'Email Profesional', 30:'Velocidad Inicial',
  31:'Texto Técnico I', 32:'Texto Técnico II', 33:'Párrafo Largo I',
  34:'Acentos y Tilde', 35:'Signos de Puntuación',
  36:'Objetivo: 40 WPM', 37:'Objetivo: 50 WPM', 38:'Objetivo: 60 WPM',
  39:'Texto Académico', 40:'Texto Jurídico', 41:'Código de Programación',
  42:'Objetivo: 70 WPM', 43:'Velocidad: 80 WPM',
  44:'Texto Mixto Complejo', 45:'Párrafo de Maestría',
};

const NIVEL_COLORS = {
  1:'#22c55e',2:'#22c55e',3:'#22c55e',4:'#16a34a',5:'#16a34a',
  6:'#0ea5e9',7:'#0ea5e9',8:'#0ea5e9',9:'#0284c7',10:'#0284c7',
  11:'#f97316',12:'#f97316',13:'#f97316',14:'#ea580c',15:'#ea580c',
  16:'#a855f7',17:'#a855f7',18:'#a855f7',19:'#9333ea',20:'#9333ea',
  21:'#06b6d4',22:'#06b6d4',23:'#06b6d4',24:'#0891b2',25:'#0891b2',
  26:'#ec4899',27:'#ec4899',28:'#ec4899',29:'#db2777',30:'#db2777',
  31:'#f59e0b',32:'#f59e0b',33:'#d97706',34:'#d97706',35:'#b45309',
  36:'#10b981',37:'#10b981',38:'#059669',
  39:'#ef4444',40:'#ef4444',41:'#dc2626',42:'#dc2626',
  43:'#7c3aed',44:'#7c3aed',45:'#6d28d9',
};

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="mc_page"><div class="mc_loading">
    <div class="mc_loading_spinner"></div></div></div>`;

  const claseId = u.claseId || null;

  if (!claseId) return _renderSinClase();

  // Con clase — mostrar loading mientras carga Firestore
  return `
  <div class="mc_page" id="mc_page">
    <div class="mc_loading" id="mc_main_content">
      <div class="mc_loading_spinner"></div>
      <span>Cargando tu clase...</span>
    </div>
  </div>`;
};

// ── RENDER SIN CLASE ──────────────────────────────────────────────────────────
function _renderSinClase() {
  return `
  <div class="mc_page">

    <!-- HERO -->
    <div class="mc_hero">
      <div class="mc_hero_orb"></div>
      <div class="mc_hero_left">
        <div class="mc_hero_badge"><i class="fas fa-users"></i> Mi Clase</div>
        <h1 class="mc_hero_title">Únete a una <span>clase</span></h1>
        <p class="mc_hero_sub">Conecta con tu instructor para acceder a lecciones asignadas, avisos y seguimiento de tu progreso.</p>
      </div>
    </div>

    <!-- JOIN WIDGET -->
    <div class="mc_join_wrap">
      <div class="mc_join_hero">
        <div class="mc_join_ico"><i class="fas fa-chalkboard-teacher"></i></div>
        <h2 class="mc_join_title">¿Tienes un código de clase?</h2>
        <p class="mc_join_sub">Tu instructor te habrá dado un código de 6 caracteres. Ingrésalo para unirte y acceder a tus lecciones asignadas.</p>
      </div>

      <!-- Input código -->
      <div class="mc_code_form">
        <div class="mc_code_label"><i class="fas fa-key" style="color:var(--mco)"></i> Código de clase</div>
        <div class="mc_code_row">
          <input id="mc_code_input" class="mc_code_input"
            type="text" maxlength="6" placeholder="ABC123"
            autocomplete="off" spellcheck="false">
          <button id="mc_btn_join" class="mc_code_btn" disabled>
            <i class="fas fa-arrow-right"></i> Unirme
          </button>
        </div>
        <div class="mc_code_msg" id="mc_code_msg"></div>
      </div>

      <!-- Divider -->
      <div class="mc_or_div" style="max-width:480px;width:100%">— o continúa —</div>

      <!-- Modo personal -->
      <div class="mc_personal_card">
        <div class="mc_personal_ico"><i class="fas fa-user-check"></i></div>
        <div class="mc_personal_info">
          <div class="mc_personal_title">Modo personal</div>
          <div class="mc_personal_sub">Practica sin clase. Accede a todas las 45 lecciones a tu ritmo sin instructor.</div>
        </div>
      </div>
    </div>

  </div>`;
}

// ── RENDER CON CLASE ──────────────────────────────────────────────────────────
function _renderConClase(clase, lecsOk) {
  const u          = wi();
  const nombre     = u?.nombre || u?.usuario || '—';
  const codigo     = clase.id || '—';
  const claseNombre = clase.nombre || `Clase ${codigo}`;
  const gestorNombre = clase.gestorNombre || clase.gestorId || 'Instructor';
  const gestorIni  = gestorNombre.charAt(0).toUpperCase();
  const lecsAsig   = clase.leccionesAsignadas || [];
  const avisos     = clase.avisos || [];
  const miembros   = clase.estudiantes || [];
  const totalAsig  = lecsAsig.length;
  const okCount    = lecsAsig.filter(id => lecsOk.includes(id)).length;
  const pct        = totalAsig > 0 ? Math.round((okCount / totalAsig) * 100) : 0;

  return `
  <div class="mc_page">

    <!-- HERO -->
    <div class="mc_hero">
      <div class="mc_hero_orb"></div>
      <div class="mc_hero_left">
        <div class="mc_hero_badge"><i class="fas fa-users"></i> Mi Clase</div>
        <h1 class="mc_hero_title">${claseNombre}</h1>
        <p class="mc_hero_sub">${okCount} de ${totalAsig} lecciones completadas · ${pct}% avance</p>
      </div>
      <div class="mc_code_badge">
        <div class="mc_code_big" id="mc_copy_code" title="Copiar código">${codigo}</div>
        <div class="mc_code_lbl"><i class="fas fa-copy"></i> Copiar código</div>
      </div>
    </div>

    <!-- INFO ROW -->
    <div class="mc_info_row">
      ${[
        { ico:'fa-graduation-cap', color:'var(--mco)',  bg:'color-mix(in srgb,var(--mco) 12%,transparent)', lbl:'Lecciones asignadas', val:`${totalAsig}` },
        { ico:'fa-check-circle',   color:'#22c55e',     bg:'color-mix(in srgb,#22c55e 12%,transparent)',    lbl:'Completadas',         val:`${okCount}` },
        { ico:'fa-users',          color:'#a855f7',     bg:'color-mix(in srgb,#a855f7 12%,transparent)',    lbl:'Compañeros',          val:`${miembros.length}` },
      ].map(c => `
        <div class="mc_info_card">
          <div class="mc_ic_ico" style="background:${c.bg};color:${c.color}"><i class="fas ${c.ico}"></i></div>
          <div class="mc_ic_body">
            <div class="mc_ic_lbl">${c.lbl}</div>
            <div class="mc_ic_val">${c.val}</div>
          </div>
        </div>`).join('')}
    </div>

    <!-- GESTOR -->
    <div class="mc_sec_hdr"><i class="fas fa-chalkboard-teacher"></i> Instructor</div>
    <div class="mc_gestor_card">
      <div class="mc_gestor_av">${gestorIni}</div>
      <div class="mc_gestor_info">
        <div class="mc_gestor_nombre">${gestorNombre}</div>
        <div class="mc_gestor_sub"><i class="fas fa-envelope"></i> ${clase.gestorEmail || 'Instructor registrado'}</div>
      </div>
      <div class="mc_gestor_badge"><i class="fas fa-star"></i> Instructor</div>
    </div>

    <!-- AVISOS -->
    <div class="mc_sec_hdr">
      <i class="fas fa-bell"></i> Avisos de clase
      <span class="mc_sec_count">${avisos.length}</span>
    </div>
    ${avisos.length > 0 ? `
      <div class="mc_avisos_list">
        ${avisos.slice().reverse().map(av => `
          <div class="mc_aviso_card ${av.tipo || 'info'}">
            <div class="mc_aviso_ico">
              <i class="fas ${av.tipo === 'urgente' ? 'fa-exclamation-triangle' : av.tipo === 'tarea' ? 'fa-tasks' : 'fa-info-circle'}"></i>
            </div>
            <div class="mc_aviso_body">
              <div class="mc_aviso_tit">${av.titulo || 'Aviso'}</div>
              <div class="mc_aviso_txt">${av.mensaje || ''}</div>
              ${av.fecha ? `<div class="mc_aviso_fecha"><i class="fas fa-clock"></i> ${_fmtFecha(av.fecha)}</div>` : ''}
            </div>
          </div>`).join('')}
      </div>
    ` : `
      <div class="mc_avisos_empty">
        <i class="fas fa-bell-slash"></i>
        <p>Sin avisos por ahora. Tu instructor publicará novedades aquí.</p>
      </div>
    `}

    <!-- LECCIONES ASIGNADAS -->
    <div class="mc_sec_hdr">
      <i class="fas fa-graduation-cap"></i> Lecciones asignadas
      <span class="mc_sec_count">${okCount}/${totalAsig}</span>
    </div>
    ${lecsAsig.length > 0 ? `
      <div class="mc_lecs_grid">
        ${lecsAsig.map(id => {
          const num  = String(id).padStart(2,'0');
          const ok   = lecsOk.includes(id);
          const prac = getls(`wiPrac_${id}`) || {};
          const col  = NIVEL_COLORS[id] || 'var(--mco)';
          return `
            <a class="mc_lec_card nv_item" data-page="leccion${num}" href="/leccion${num}"
              style="--lc:${col}">
              <div class="mc_lec_top">
                <span class="mc_lec_num">Lección ${num}</span>
                ${ok ? `<span class="mc_lec_ok"><i class="fas fa-check"></i> Hecha</span>` : ''}
              </div>
              <div class="mc_lec_name">${LEC_NOMBRES[id] || `Lección ${num}`}</div>
              ${ok && prac.wpm ? `<div class="mc_lec_wpm"><i class="fas fa-bolt"></i> ${prac.wpm} WPM</div>` : ''}
            </a>`;
        }).join('')}
      </div>
    ` : `
      <div class="mc_avisos_empty">
        <i class="fas fa-list"></i>
        <p>Tu instructor aún no ha asignado lecciones.</p>
      </div>
    `}

    <!-- COMPAÑEROS -->
    ${miembros.length > 1 ? `
      <div class="mc_sec_hdr">
        <i class="fas fa-user-friends"></i> Compañeros
        <span class="mc_sec_count">${miembros.length}</span>
      </div>
      <div class="mc_members_grid">
        ${miembros.slice(0, 20).map((m, i) => {
          const ini  = (m.nombre || m).charAt(0).toUpperCase();
          const cols = ['#22c55e','#0ea5e9','#f97316','#a855f7','#ec4899','#f59e0b','#06b6d4'];
          const col  = cols[i % cols.length];
          return `
            <div class="mc_member_chip">
              <div class="mc_member_av" style="background:${col}">${ini}</div>
              ${m.nombre || m}
            </div>`;
        }).join('')}
        ${miembros.length > 20 ? `<div class="mc_member_chip" style="color:var(--tx3)">+${miembros.length - 20} más</div>` : ''}
      </div>
    ` : ''}

    <!-- SALIR CLASE -->
    <div style="display:flex;justify-content:flex-end;padding-top:1vh">
      <button id="mc_btn_salir" class="mc_code_btn" style="background:var(--bg4);color:var(--tx3);padding:1.1vh 2vw;font-size:var(--fz_m1)">
        <i class="fas fa-sign-out-alt"></i> Salir de esta clase
      </button>
    </div>

  </div>`;
}

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;

  $(document).off('.mc');

  if (!u.claseId) {
    _initJoin();
    return;
  }

  // Cargar datos de la clase
  await _cargarClase(u.claseId);
};

export const cleanup = () => {
  $(document).off('.mc');
};

// ── INIT JOIN (sin clase) ─────────────────────────────────────────────────────
function _initJoin() {
  const $inp = $('#mc_code_input');
  const $btn = $('#mc_btn_join');
  const $msg = $('#mc_code_msg');

  $inp.on('input.mc', function () {
    const v = $(this).val().toUpperCase().replace(/[^A-Z0-9]/g, '');
    $(this).val(v);
    $btn.prop('disabled', v.length < 6);
    $msg.text('').removeClass('ok error');
    $inp.removeClass('ok error');
  });

  $btn.on('click.mc', async function () {
    const codigo = $inp.val().toUpperCase().trim();
    if (codigo.length < 6) return;

    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Verificando...');
    $msg.text('').removeClass('ok error');

    try {
      // Verificar que la clase existe
      const claseSnap = await getDoc(doc(db, 'clases', codigo));
      if (!claseSnap.exists()) {
        $inp.addClass('error');
        $msg.addClass('error').html('<i class="fas fa-times-circle"></i> Código incorrecto. Verifica con tu instructor.');
        $btn.prop('disabled', false).html('<i class="fas fa-arrow-right"></i> Unirme');
        return;
      }

      const u = wi();
      // Actualizar smiles/{usuario}
      await updateDoc(doc(db, 'smiles', u.usuario), {
        claseId:  codigo,
        gestorId: claseSnap.data().gestorId || null,
      });
      // Actualizar lecciones/{usuario}
      await updateDoc(doc(db, 'lecciones', u.usuario), {
        clase_id:  codigo,
        gestor_id: claseSnap.data().gestorId || null,
      }).catch(() => {}); // puede no existir aún

      // Agregar estudiante a la clase
      await updateDoc(doc(db, 'clases', codigo), {
        estudiantes: arrayUnion({
          usuario: u.usuario,
          nombre:  u.nombre || u.usuario,
          email:   u.email  || '',
        }),
        updatedAt: serverTimestamp(),
      });

      // Actualizar cache local
      const nuevoU = { ...u, claseId: codigo, gestorId: claseSnap.data().gestorId || null };
      savels('wiSmile', nuevoU, 7);

      $inp.addClass('ok');
      $msg.addClass('ok').html('<i class="fas fa-check-circle"></i> ¡Bienvenido a la clase!');

      setTimeout(() => {
        import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate('/miclase'));
      }, 1200);

    } catch (err) {
      console.error('[miclase] Error al unirse:', err);
      $msg.addClass('error').html('<i class="fas fa-exclamation-triangle"></i> Error al conectar. Intenta de nuevo.');
      $btn.prop('disabled', false).html('<i class="fas fa-arrow-right"></i> Unirme');
    }
  });

  // Enter en input
  $inp.on('keydown.mc', function (e) {
    if (e.key === 'Enter' && !$btn.prop('disabled')) $btn.trigger('click');
  });

  // Click en cards navegables
  $(document).on('click.mc', '.nv_item', function (e) {
    e.preventDefault();
    const page = $(this).data('page');
    if (!page) return;
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate(`/${page}`));
  });
}

// ── CARGAR CLASE DESDE FIRESTORE ──────────────────────────────────────────────
async function _cargarClase(codigo) {
  try {
    // Intentar desde cache primero
    const cached = getls(K_CLASE);

    // Siempre hacer fetch para tener avisos actualizados
    const snap = await getDoc(doc(db, 'clases', codigo));

    if (!snap.exists()) {
      // La clase ya no existe — limpiar
      const u = wi();
      savels('wiSmile', { ...u, claseId: null, gestorId: null }, 7);
      $('#mc_main_content').html(_renderSinClase().replace('<div class="mc_page">', ''));
      return;
    }

    const claseData = { id: codigo, ...snap.data() };
    savels(K_CLASE, claseData, 1); // cache 1h (avisos cambian seguido)

    const prog   = getls('wiProgreso') || {};
    const lecsOk = prog.leccionesOk || [];

    // Inyectar HTML con clase
    const html = _renderConClase(claseData, lecsOk);
    import('../../rutas/rutadev.js').then(({ wiFade }) => {
      wiFade('#mc_page', html.replace('<div class="mc_page">', '').replace('</div>', ''));
    }).catch(() => {
      document.getElementById('mc_page').innerHTML = html;
    });

    // Bind events después de render
    _bindConClase(claseData);

  } catch (err) {
    console.error('[miclase] Error cargando clase:', err);
    Notificacion('Error al cargar tu clase', 'warning');
  }
}

// ── BIND EVENTOS CON CLASE ────────────────────────────────────────────────────
function _bindConClase(clase) {
  // Copiar código al clipboard
  $(document).on('click.mc', '#mc_copy_code', async function () {
    try {
      await navigator.clipboard.writeText(clase.id);
      Notificacion(`Código ${clase.id} copiado`, 'success', 2500);
    } catch { Notificacion(`Tu código: ${clase.id}`, 'info', 3000); }
  });

  // Click en lecciones
  $(document).on('click.mc', '.mc_lec_card, .nv_item', function (e) {
    e.preventDefault();
    const page = $(this).data('page');
    if (!page) return;
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate(`/${page}`));
  });

  // Salir de clase
  $(document).on('click.mc', '#mc_btn_salir', async function () {
    const ok = confirm('¿Seguro que quieres salir de esta clase? Perderás acceso a las lecciones asignadas.');
    if (!ok) return;
    const u = wi();
    try {
      await updateDoc(doc(db, 'smiles', u.usuario), { claseId: null, gestorId: null });
      await updateDoc(doc(db, 'lecciones', u.usuario), { clase_id: null, gestor_id: null }).catch(() => {});
      savels('wiSmile', { ...u, claseId: null, gestorId: null }, 7);
      Notificacion('Has salido de la clase', 'info');
      import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate('/miclase'));
    } catch (err) {
      Notificacion('Error al salir. Intenta de nuevo.', 'warning');
    }
  });
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function _fmtFecha(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
}
