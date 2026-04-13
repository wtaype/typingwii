import './perfil.css';
import $ from 'jquery';
import {
  getls, savels, Saludar, fechaHoy,
  avatar, Mensaje,
} from '../../widev.js';
import { db } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

const wi = () => getls('wiSmile');

// ─── TEMAS exactos de index.html ──────────────────────────────────
const TEMAS = [
  { n: 'Cielo',  c: '#0EBEFF' },
  { n: 'Dulce',  c: '#FF5C69' },
  { n: 'Paz',    c: '#29C72E' },
  { n: 'Oro',    c: '#FFDA34' },
  { n: 'Mora',   c: '#7000FF' },
  { n: 'Futuro', c: '#21273B' },
];

// ─── GÉNEROS ──────────────────────────────────────────────────────
const GENEROS = [
  { v: 'masculino', lbl: '👨 Masculino' },
  { v: 'femenino',  lbl: '👩 Femenino'  },
  { v: 'otro',      lbl: '⚧ Otro'       },
];

// ─── MENSAJES MECANOGRAFÍA ────────────────────────────────────────
const MENSAJES = [
  { ico: 'fa-keyboard',       txt: '¡Cada tecla que pulsas te acerca a ser un experto! ⌨️' },
  { ico: 'fa-bolt',           txt: '¡Tu velocidad mejora con cada práctica. Sigue así! 🚀' },
  { ico: 'fa-bullseye',       txt: '¡La precisión es tu mejor herramienta. Sin errores! 🎯' },
  { ico: 'fa-star',           txt: '¡Los mejores mecanógrafos empezaron como tú. Persevera! 🌟' },
  { ico: 'fa-trophy',         txt: '¡Practica 15 minutos hoy y notarás la diferencia! 🏆' },
  { ico: 'fa-fire',           txt: '¡Tu racha de práctica es imparable. Mantén el ritmo! 🔥' },
  { ico: 'fa-hands-clapping', txt: '¡Dedos ágiles, mente brillante. ¡Tú puedes! 👏' },
  { ico: 'fa-rocket',         txt: '¡Más WPM cada día. La velocidad llega con constancia! 🚀' },
];
const msgAleatorio = () => MENSAJES[Math.floor(Math.random() * MENSAJES.length)];

// ─── HELPERS ──────────────────────────────────────────────────────
const getIni = (u) => {
  const full = `${u.nombre || ''} ${u.apellidos || ''}`.trim();
  return avatar(full || u.usuario || 'U');
};

// Timestamp Firestore → "YYYY-MM-DD" para input[type=date]
const tsToInput = (ts) => {
  if (!ts?.seconds) return '';
  return new Date(ts.seconds * 1000).toISOString().split('T')[0];
};

// ─── RENDER ───────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `
    <div class="pf_wrap">
      <div class="pf_empty">
        <i class="fas fa-user-lock"></i>
        <p>Sin sesión activa.</p>
      </div>
    </div>`;

  const msg  = msgAleatorio();
  const ini  = getIni(u);
  const foto = u.foto || `${import.meta.env.BASE_URL}smile.avif`;
  const [temaNombre] = (u.tema || 'Cielo|#0EBEFF').split('|');

  const creadoStr = u.creado?.seconds
    ? new Date(u.creado.seconds * 1000)
        .toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  const fnacInput = tsToInput(u.fechaNacimiento);

  return `
  <div class="pf_wrap">

    <!-- ── HERO ─────────────────────────────────────────── -->
    <div class="pf_hero">
      <div class="pf_hero_bg"></div>
      <div class="pf_hero_content">

        <!-- Avatar con foto o inicial -->
        <div class="pf_avatar_wrap">
          <div class="pf_avatar_ring_pulse"></div>
          <div class="pf_avatar" id="pf_avatar_preview">
            ${u.foto
              ? `<img src="${u.foto}" alt="Foto de perfil" class="pf_avatar_img"
                      onerror="this.parentElement.innerHTML='${ini}'">`
              : `<img src="${import.meta.env.BASE_URL}smile.avif" alt="Perfil" class="pf_avatar_img">`
            }
          </div>
        </div>

        <!-- Info principal -->
        <div class="pf_hero_info">
          <p class="pf_saludo">${Saludar()}</p>
          <h1 class="pf_nombre">${u.nombre || '—'} ${u.apellidos || ''}</h1>
          <div class="pf_tags">
            <span class="pf_tag"><i class="fas fa-at"></i> ${u.usuario || '—'}</span>
            <span class="pf_tag"><i class="fas fa-shield-halved"></i> ${u.rol || 'smile'}</span>
            ${u.genero ? `<span class="pf_tag"><i class="fas fa-venus-mars"></i> ${u.genero}</span>` : ''}
            <span class="pf_tag pf_tag_tema" style="--tc: var(--${temaNombre}, #0EBEFF)">
              <i class="fas fa-circle"></i> ${temaNombre}
            </span>
          </div>
        </div>

        <!-- Meta -->
        <div class="pf_hero_meta">
          <div class="pf_meta_item"><i class="fas fa-calendar-day"></i><span>${fechaHoy()}</span></div>
          <div class="pf_meta_item"><i class="fas fa-clock"></i><span>Desde ${creadoStr}</span></div>
          <div class="pf_meta_item"><i class="fas fa-envelope"></i><span>${u.email || '—'}</span></div>
        </div>

      </div>
    </div>

    <!-- ── MOTIVACIÓN ────────────────────────────────────── -->
    <div class="pf_motivacion" id="pf_motivacion">
      <div class="pf_mot_ico"><i class="fas ${msg.ico}"></i></div>
      <p class="pf_mot_txt">${msg.txt}</p>
      <button class="pf_mot_refresh" id="pf_refresh_msg" title="Nuevo mensaje">
        <i class="fas fa-arrows-rotate"></i>
      </button>
    </div>

    <!-- ── FORMULARIO INLINE ─────────────────────────────── -->
    <form class="pf_edit_form" id="pf_form_edit" novalidate>

      <div class="pf_form_header">
        <div class="pf_form_title_wrap">
          <div class="pf_form_ico"><i class="fas fa-user-pen"></i></div>
          <div>
            <div class="pf_form_title">Mis datos</div>
            <div class="pf_form_sub">Personaliza tu perfil de estudiante</div>
          </div>
        </div>
        <button type="submit" class="pf_save_btn" id="pf_btn_save">
          <i class="fas fa-check"></i> Guardar cambios
        </button>
      </div>

      <!-- Fila 1: Nombre + Apellidos -->
      <div class="pf_row">
        <div class="pf_field">
          <label class="pf_label" for="pf_nombre">
            <i class="fas fa-user"></i> Nombre
          </label>
          <input type="text" id="pf_nombre" name="nombre"
            class="pf_input" value="${u.nombre || ''}"
            placeholder="Tu nombre" autocomplete="given-name" required>
        </div>
        <div class="pf_field">
          <label class="pf_label" for="pf_apellidos">
            <i class="fas fa-user"></i> Apellidos
          </label>
          <input type="text" id="pf_apellidos" name="apellidos"
            class="pf_input" value="${u.apellidos || ''}"
            placeholder="Tus apellidos" autocomplete="family-name" required>
        </div>
      </div>

      <!-- Fila 2: Fecha nacimiento + Género -->
      <div class="pf_row">
        <div class="pf_field">
          <label class="pf_label" for="pf_fnac">
            <i class="fas fa-cake-candles"></i> Fecha de nacimiento
          </label>
          <input type="date" id="pf_fnac" name="fechaNacimiento"
            class="pf_input" value="${fnacInput}">
        </div>
        <div class="pf_field">
          <label class="pf_label" for="pf_genero">
            <i class="fas fa-venus-mars"></i> Género
          </label>
          <select id="pf_genero" name="genero" class="pf_input">
            <option value="">— Seleccionar —</option>
            ${GENEROS.map(g => `
              <option value="${g.v}" ${u.genero === g.v ? 'selected' : ''}>${g.lbl}</option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Fila 3: Foto + preview live -->
      <div class="pf_field">
        <label class="pf_label" for="pf_foto">
          <i class="fas fa-image"></i> URL de foto de perfil
        </label>
        <div class="pf_foto_row">
          <img class="pf_foto_preview" id="pf_foto_preview"
            src="${foto}" alt="Preview"
            onerror="this.src='${import.meta.env.BASE_URL}smile.avif'">
          <input type="url" id="pf_foto" name="foto"
            class="pf_input" value="${u.foto || ''}"
            placeholder="https://... (opcional)">
        </div>
      </div>

      <!-- Fila 4: Solo lectura -->
      <div class="pf_row">
        <div class="pf_field">
          <label class="pf_label"><i class="fas fa-at"></i> Usuario</label>
          <input type="text" class="pf_input pf_readonly" value="${u.usuario || '—'}" readonly>
        </div>
        <div class="pf_field">
          <label class="pf_label"><i class="fas fa-envelope"></i> Correo</label>
          <input type="email" class="pf_input pf_readonly" value="${u.email || '—'}" readonly>
        </div>
      </div>

      <!-- Selector de temas -->
      <div class="pf_field">
        <label class="pf_label"><i class="fas fa-palette"></i> Tema de color</label>
        <div class="pf_temas_row">
          ${TEMAS.map(t => `
            <label class="pf_tema_btn ${temaNombre === t.n ? 'pf_tema_active' : ''}" title="${t.n}">
              <input type="radio" name="tema" value="${t.n}|${t.c}" ${temaNombre === t.n ? 'checked' : ''}>
              <span class="pf_tema_dot" style="background:${t.c}"></span>
              <span class="pf_tema_txt">${t.n}</span>
            </label>
          `).join('')}
        </div>
      </div>

    </form>

  </div>`;
};

// ─── INIT ─────────────────────────────────────────────────────────
export const init = () => {

  // Mensaje motivacional rotativo
  $(document).off('click.pfmsg').on('click.pfmsg', '#pf_refresh_msg', function () {
    const msg  = msgAleatorio();
    const $w   = $('#pf_motivacion');
    $w.addClass('pf_fade_out');
    setTimeout(() => {
      $w.find('.pf_mot_ico i').attr('class', `fas ${msg.ico}`);
      $w.find('.pf_mot_txt').text(msg.txt);
      $w.removeClass('pf_fade_out').addClass('pf_fade_in');
      setTimeout(() => $w.removeClass('pf_fade_in'), 400);
    }, 280);
  });

  // Preview live de imagen de foto
  $(document).off('input.pffoto').on('input.pffoto', '#pf_foto', function () {
    const url  = $(this).val().trim();
    const base = `${import.meta.env.BASE_URL}smile.avif`;
    const $img = $('#pf_foto_preview');
    if (url) {
      $img.attr('src', url).on('error', function () { $(this).attr('src', base); });
    } else {
      $img.attr('src', base);
    }
  });

  // Selector de temas visual
  $(document).off('change.pftheme').on('change.pftheme', 'input[name="tema"]', function () {
    $('.pf_tema_btn').removeClass('pf_tema_active');
    $(this).closest('.pf_tema_btn').addClass('pf_tema_active');
  });

  // Guardar
  $(document).off('submit.pfsave').on('submit.pfsave', '#pf_form_edit', async function (e) {
    e.preventDefault();
    const $btn = $('#pf_btn_save');
    const u    = wi();
    if (!u) return;

    const fd        = new FormData(this);
    const nombre    = fd.get('nombre')?.trim();
    const apellidos = fd.get('apellidos')?.trim();
    const tema      = fd.get('tema');
    const foto      = fd.get('foto')?.trim() || '';
    const genero    = fd.get('genero') || '';
    const fnacRaw   = fd.get('fechaNacimiento');

    if (!nombre)    return Mensaje('Por favor ingresa tu nombre.', 'warning');
    if (!apellidos) return Mensaje('Por favor ingresa tus apellidos.', 'warning');
    if (!tema)      return Mensaje('Selecciona un tema de color.', 'warning');

    // Convertir fecha de nacimiento a Timestamp compatible (objeto simple)
    const fechaNacimiento = fnacRaw
      ? { seconds: Math.floor(new Date(fnacRaw).getTime() / 1000), nanoseconds: 0 }
      : u.fechaNacimiento || null;

    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Guardando...');

    try {
      const data = { nombre, apellidos, tema, foto, genero, fechaNacimiento };
      await updateDoc(doc(db, 'smiles', u.usuario), data);

      // Super Pro Cache — actualizar wiSmile de inmediato
      savels('wiSmile', { ...u, ...data }, 24);

      Mensaje('¡Perfil actualizado! 🎉', 'success');

      // Re-render suave
      setTimeout(() => {
        const $c = $('#perfil');
        if ($c.length) { $c.html(render()); init(); }
      }, 500);

    } catch (err) {
      console.error('[perfil] Error:', err);
      Mensaje('No se pudo guardar. Intenta de nuevo.', 'error');
    } finally {
      $btn.prop('disabled', false).html('<i class="fas fa-check"></i> Guardar cambios');
    }
  });
};

export const cleanup = () => {
  $(document).off('click.pfmsg input.pffoto change.pftheme submit.pfsave');
};
