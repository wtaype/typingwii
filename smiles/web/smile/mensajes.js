import './mensajes.css';
import $ from 'jquery';
import { auth, db } from '../firebase.js';
import {
  collection, setDoc, doc, query, where,
  getDocs, deleteDoc, serverTimestamp, limit
} from 'firebase/firestore';
import { Notificacion, wicopy, wiTip, savels, getls, Saludar } from '../../widev.js';
import { app } from '../../wii.js';

// ── Estado ────────────────────────────────────────────────────────
let msgs = [], pendiente = null, enviando = false, refreshTimer = null, _onVis = null;
const CACHE = 'wi_mensajes_cache';
const LIMIT = 50;
const wi    = () => getls('wiSmile') || {};
const _save = d => { try { localStorage.setItem(CACHE, JSON.stringify(d)); } catch (_) {} };
const _load = () => { try { return JSON.parse(localStorage.getItem(CACHE) || '[]'); } catch (_) { return []; } };
const _scroll = () => { const el = document.getElementById('wmChat'); el && requestAnimationFrame(() => el.scrollTop = el.scrollHeight); };

// ── Render ────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u.email) { location.replace('/'); return ''; }

  const nombre  = u.nombre || u.usuario || u.email;
  const foto    = u.foto || `${import.meta.env.BASE_URL}smile.avif`;
  const [tema]  = (u.tema || 'Cielo|#0EBEFF').split('|');

  return `
  <div class="wm_wrap_outer">

    <!-- ── HEADER ────────────────────────────────────── -->
    <div class="wm_header">
      <div class="wm_header_left">
        <div class="wm_hdr_avatar_wrap">
          <img class="wm_hdr_avatar"
            src="${foto}" alt="${nombre}"
            onerror="this.src='${import.meta.env.BASE_URL}smile.avif'">
          <span class="wm_hdr_online"></span>
        </div>
        <div class="wm_hdr_info">
          <h1 class="wm_hdr_title">${app} · Mensajes</h1>
          <p class="wm_hdr_sub">${Saludar()}<strong>${nombre}</strong></p>
        </div>
      </div>
      <div class="wm_status" id="wm_status">
        <span class="wm_dot"></span>
        <span class="wm_dotxt">Conectando...</span>
      </div>
    </div>

    <!-- ── ZONA DE CHAT ──────────────────────────────── -->
    <div class="wm_chat" id="wmChat">${_htmlList(_load(), u)}</div>

    <!-- ── INPUT ─────────────────────────────────────── -->
    <div class="wm_input_bar">
      <img class="wm_input_avatar"
        src="${foto}" alt="${nombre}"
        onerror="this.src='${import.meta.env.BASE_URL}smile.avif'">
      <div class="wm_input_wrap">
        <textarea
          id="wmNuevo"
          placeholder="Escribe un mensaje... (Enter para enviar)"
          rows="1" maxlength="500"></textarea>
        <span class="wm_count" id="wmCount">0/500</span>
      </div>
      <button id="wmEnviar" disabled class="wm_send_btn" ${wiTip('Enviar (Enter)')}>
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>

    <!-- ── MODAL ELIMINAR ────────────────────────────── -->
    <div class="wm_modal" id="wmEliminar">
      <div class="wm_modal_body">
        <div class="wm_modal_ico"><i class="fas fa-trash-alt"></i></div>
        <h3>¿Eliminar mensaje?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div class="wm_modal_acts">
          <button class="wm_cancel" id="wmCancel">Cancelar</button>
          <button class="wm_confirm" id="wmConfirm">
            <i class="fas fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>

  </div>`;
};

// ── Init ──────────────────────────────────────────────────────────
export const init = () => {
  cleanup();
  const u = wi();
  if (!u.email) return;
  const email = u.email;

  $(document)
    .on('input.wm', '#wmNuevo', function () {
      const len = $(this).val().length;
      $('#wmCount').text(`${len}/500`);
      $('#wmEnviar').prop('disabled', !$(this).val().trim());
      $(this).css('height', 'auto').css('height', Math.min(this.scrollHeight, 150) + 'px');
    })
    .on('keydown.wm', '#wmNuevo', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); _enviar(email); }
    })
    .on('click.wm',  '#wmEnviar',  () => _enviar(email))
    .on('click.wm',  '.wm_item',   function (e) {
      if ($(e.target).closest('.wm_del').length) return;
      const msg = msgs.find(m => m.id === $(this).data('id'));
      if (!msg) return;
      wicopy(msg.mensaje, this, '¡Copiado!');
      $(this).addClass('copied');
      setTimeout(() => $(this).removeClass('copied'), 800);
    })
    .on('click.wm', '.wm_del', function (e) {
      e.stopPropagation();
      pendiente = $(this).data('id');
      $('#wmEliminar').addClass('show');
    })
    .on('click.wm', '#wmCancel, #wmEliminar', e => {
      if ($(e.target).is('#wmCancel, #wmEliminar')) {
        $('#wmEliminar').removeClass('show');
        pendiente = null;
      }
    })
    .on('click.wm', '#wmConfirm', _eliminar);

  // Carga inicial desde cache, luego sincroniza
  _cargar(email, true);

  // Auto-refresh cada 30s solo si tab visible
  refreshTimer = setInterval(() => !document.hidden && _cargar(email, true), 30000);
  _onVis = () => !document.hidden && _cargar(email, true);
  document.addEventListener('visibilitychange', _onVis);
  _scroll();
};

// ── Cargar mensajes ───────────────────────────────────────────────
const _cargar = async (email, silent = false) => {
  try {
    const q    = query(collection(db, 'wiMensajes'), where('email', '==', email), limit(LIMIT));
    const snap = await getDocs(q);
    msgs = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.fecha?.seconds || 0) - (b.fecha?.seconds || 0));
    _save(msgs);
    $('#wmChat').html(_htmlList(msgs, wi()));
    _status(true);
    _scroll();
  } catch (e) {
    console.error('[mensajes]', e);
    _status(false);
    if (!silent) {
      const cache = _load();
      cache.length
        ? (msgs = cache, $('#wmChat').html(_htmlList(msgs, wi())), Notificacion('Mostrando caché local 📦', 'warning', 2000))
        : $('#wmChat').html(_empty('fa-wifi-slash', 'Sin conexión', 'Verifica tu internet e intenta de nuevo.'));
    }
  }
};

// ── Enviar (optimistic UI) ────────────────────────────────────────
const _enviar = (email) => {
  if (enviando) return;
  const $ta  = $('#wmNuevo');
  const nota = $ta.val().trim();
  if (!nota) return;
  enviando = true;

  const u  = wi();
  const id = `m${Date.now()}`;
  const fake = {
    id, mensaje: nota, email,
    usuario: u.nombre || u.usuario || email,
    foto:    u.foto   || '',
    fecha:   { seconds: Date.now() / 1000 }
  };

  msgs.push(fake);
  _save(msgs);
  $('#wmChat').html(_htmlList(msgs, u));
  _scroll();
  $ta.val('').css('height', 'auto').trigger('focus');
  $('#wmCount').text('0/500');
  $('#wmEnviar').prop('disabled', true);

  setDoc(doc(db, 'wiMensajes', id), {
    id, mensaje: nota, email,
    usuario: u.nombre || u.usuario || email,
    foto:    u.foto   || '',
    fecha:   serverTimestamp()
  })
    .then(() => _status(true))
    .catch(e => {
      console.error('[mensajes] send:', e);
      msgs = msgs.filter(m => m.id !== id);
      _save(msgs);
      $('#wmChat').html(_htmlList(msgs, wi()));
      Notificacion('Error al guardar el mensaje', 'error');
    })
    .finally(() => { enviando = false; });
};

// ── Eliminar (optimistic) ─────────────────────────────────────────
const _eliminar = () => {
  if (!pendiente) return;
  const id = pendiente;
  pendiente = null;
  $('#wmEliminar').removeClass('show');

  const backup = [...msgs];
  msgs = msgs.filter(m => m.id !== id);
  _save(msgs);
  $(`.wm_item[data-id="${id}"]`).addClass('deleting');
  setTimeout(() => $('#wmChat').html(_htmlList(msgs, wi())), 280);

  deleteDoc(doc(db, 'wiMensajes', id))
    .then(() => Notificacion('Mensaje eliminado 🗑️', 'success', 1500))
    .catch(e => {
      console.error('[mensajes] delete:', e);
      msgs = backup;
      _save(msgs);
      $('#wmChat').html(_htmlList(msgs, wi()));
      Notificacion('Error al eliminar', 'error');
    });
};

// ── Helpers ───────────────────────────────────────────────────────
const _status = ok => {
  $('.wm_dot').removeClass('active error').addClass(ok ? 'active' : 'error');
  $('.wm_dotxt').text(ok ? 'Online' : 'Offline');
};

const _dateLabel = ts => {
  if (!ts) return 'Hoy';
  const d    = ts.toDate?.() || new Date((ts.seconds || 0) * 1000);
  const hoy  = new Date(); hoy.setHours(0, 0, 0, 0);
  const ayer = new Date(hoy); ayer.setDate(ayer.getDate() - 1);
  return d >= hoy ? 'Hoy' : d >= ayer ? 'Ayer'
    : d.toLocaleDateString('es-PE', { day: 'numeric', month: 'long' });
};

const _hora = ts => {
  if (!ts) return 'Ahora';
  const d = ts.toDate?.() || new Date((ts.seconds || 0) * 1000);
  return d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
};

const _esc = t => String(t || '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));

const _htmlList = (list, u = {}) => {
  if (!list?.length) return _empty('fa-comment-dots', '¡Tu buzón está vacío!', 'Escribe tu primer mensaje y aparecerá aquí 👇');
  const base = `${import.meta.env.BASE_URL}smile.avif`;
  const foto  = u.foto || base;
  let lastLabel = '';

  return list.map(m => {
    const label = _dateLabel(m.fecha);
    const sep   = label !== lastLabel
      ? `<div class="wm_sep"><span>${label}</span></div>` : '';
    lastLabel = label;
    const msgFoto = m.foto || base;

    return `${sep}
    <div class="wm_item" data-id="${m.id}" ${wiTip('Click para copiar')}>
      <img class="wm_bubble_avatar"
        src="${msgFoto}" alt="${_esc(m.usuario || '')}"
        onerror="this.src='${base}'">
      <div class="wm_bubble_wrap">
        <div class="wm_bubble">
          <p class="wm_txt">${_esc(m.mensaje).replace(/\n/g, '<br>')}</p>
          <div class="wm_foot">
            <span class="wm_time">${_hora(m.fecha)}</span>
            <i class="fas fa-check-double wm_check"></i>
          </div>
        </div>
      </div>
      <button class="wm_del" data-id="${m.id}" ${wiTip('Eliminar')}>
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
  }).join('');
};

const _empty = (ico, txt, sub) => `
  <div class="wm_empty">
    <i class="fas ${ico}"></i>
    <p>${txt}</p>
    <span>${sub}</span>
  </div>`;

// ── Cleanup ───────────────────────────────────────────────────────
export const cleanup = () => {
  clearInterval(refreshTimer); refreshTimer = null;
  if (_onVis) { document.removeEventListener('visibilitychange', _onVis); _onVis = null; }
  $(document).off('.wm');
  msgs = []; pendiente = null; enviando = false;
};