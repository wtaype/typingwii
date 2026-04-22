// ════════════════════════════════════════════════════════════════════
// certificados.js — TypingWii · Empresa · Generador de Certificados
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './certificados.css';
import $ from 'jquery';
import { getls, Notificacion, avatar, formatearFechaHora } from '../../widev.js';
import { app } from '../../wii.js';
import { db } from '../firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

const wi = () => getls('wiSmile');
const TOTAL_LECS = 45;
const WPM_MIN    = 80;

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="ct_page"><div class="ct_empty"><i class="fas fa-lock"></i><p>Sin sesión corporativa.</p></div></div>`;

  return `
  <div class="ct_page">

    <!-- HERO CORPORATIVO PRO -->
    <div class="ct_hero">
      <div class="ct_hero_left">
        <div class="ct_hero_icon"><i class="fas fa-award"></i></div>
        <div class="ct_hero_txt">
          <div class="ct_badge"><i class="fas fa-building"></i> Panel Empresarial</div>
          <h1 class="ct_hero_title">Certificaciones</h1>
          <p class="ct_hero_sub">Genera y descarga los diplomas oficiales de mecanografía de tu equipo.</p>
        </div>
      </div>
      <div class="ct_hero_stats" id="ct_hero_stats">
        <div class="ct_h_stat"><div class="ct_h_val">-</div><div class="ct_h_lbl">Elegibles</div></div>
      </div>
    </div>

    <!-- GRID DE EMPLEADOS -->
    <div class="ct_grid" id="ct_grid">
      <div class="ct_empty" style="grid-column: 1 / -1">
        <i class="fas fa-spinner fa-spin"></i><p>Buscando candidatos...</p>
      </div>
    </div>

    <!-- CONTENEDOR MODALES -->
    <div id="ct_modales"></div>

  </div>`;
};

// ── ESTADO ────────────────────────────────────────────────────────────────────
let _empleados = [];

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;

  $(document).off('.ct');
  await _cargarDatos(u);

  // Modales
  $(document).on('click.ct', '.ct_modal_close', _cerrarModales);
  $(document).on('click.ct', '.ct_modal_bg', e => { if ($(e.target).hasClass('ct_modal_bg')) _cerrarModales(); });

  // Previsualizar / Descargar
  $(document).on('click.ct', '.ct_btn.descargar', function () {
    const usr = $(this).data('u');
    const emp = _empleados.find(e => e.usuario === usr);
    if (emp) _abrirCertificado(emp);
  });

  // Evento botón descargar desde modal
  $(document).on('click.ct', '#ct_btn_dl_canvas', function () {
    const canvas = document.getElementById('ct_canvas');
    const nom = $(this).data('nom').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Certificado_TypingWii_${nom}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    Notificacion('Descarga iniciada', 'success');
  });
};

export const cleanup = () => {
  $(document).off('.ct');
};

// ── DATOS ─────────────────────────────────────────────────────────────────────
async function _cargarDatos(u) {
  try {
    let snap = await getDocs(query(collection(db, 'lecciones'), where('empresa_id', '==', u.usuario)));
    if (snap.empty) snap = await getDocs(query(collection(db, 'lecciones'), where('gestor_id', '==', u.usuario)));
    
    _empleados = snap.docs.map(d => ({ usuario: d.id, ...d.data() }));
    _renderGrid();
  } catch (err) {
    console.error('[cert] Error:', err);
    $('#ct_grid').html('<div class="ct_empty" style="grid-column: 1 / -1"><i class="fas fa-exclamation-triangle"></i><p>Error de conexión.</p></div>');
  }
}

// ── RENDER GRID ───────────────────────────────────────────────────────────────
function _renderGrid() {
  if (!_empleados.length) {
    $('#ct_grid').html(`
      <div class="ct_empty" style="grid-column: 1 / -1">
        <i class="fas fa-folder-open"></i><p>No hay colaboradores registrados.</p>
      </div>`);
    return;
  }

  let elegibles = 0;

  const html = _empleados.map(e => {
    const nom  = e.nombre || e.usuario || '—';
    const ini  = avatar(nom);
    const dep  = e.equipo_id || e.clase_id || e.claseId || 'General';
    const lecs = e.completadas?.length || 0;
    const wpm  = e.wpmMax || 0;
    
    const pctL = Math.min((lecs / TOTAL_LECS) * 100, 100);
    const pctW = Math.min((wpm / WPM_MIN) * 100, 100);
    const pctTot = Math.round((pctL + pctW) / 2);

    const ok = (lecs >= TOTAL_LECS && wpm >= WPM_MIN);
    if (ok) elegibles++;

    return `
      <div class="ct_card ${ok ? 'ok' : 'locked'}">
        <div class="ct_card_badge ${ok ? 'ok' : 'no'}">
          ${ok ? '<i class="fas fa-check-circle"></i> Aprobado' : '<i class="fas fa-lock"></i> Entrenando'}
        </div>
        
        <div class="ct_avatar">${ok ? '🏆' : ini}</div>
        <div class="ct_nom">${nom}</div>
        <div class="ct_dep"><i class="fas fa-building"></i> ${dep}</div>

        <div class="ct_prog">
          <div class="ct_p_info"><span>Req: 45 Lecs & ${WPM_MIN} WPM</span> <span>${pctTot}%</span></div>
          <div class="ct_p_trk"><div class="ct_p_fil" style="width:${pctTot}%"></div></div>
        </div>

        <button class="ct_btn ${ok ? 'descargar' : 'bloqueado'}" data-u="${e.usuario}" ${!ok ? 'disabled' : ''}>
          ${ok ? '<i class="fas fa-print"></i> Ver Diploma' : '<i class="fas fa-times-circle"></i> No Elegible'}
        </button>
      </div>`;
  }).join('');

  $('#ct_grid').html(html);

  $('#ct_hero_stats').html(`
    <div class="ct_h_stat"><div class="ct_h_val">${elegibles}</div><div class="ct_h_lbl">Certificados</div></div>
    <div class="ct_h_stat"><div class="ct_h_val">${_empleados.length}</div><div class="ct_h_lbl">Total</div></div>
  `);
}

// ── MODAL CERTIFICADO ─────────────────────────────────────────────────────────
function _abrirCertificado(emp) {
  const nom  = emp.nombre || emp.usuario;
  const wpm  = emp.wpmMax || 0;
  let fecha  = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });

  // Si se puede, usamos la fecha de la última práctica como fecha del certificado
  if (emp.ultPractica?.toDate) {
    fecha = emp.ultPractica.toDate().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  $('#ct_modales').html(`
    <div class="ct_modal_bg">
      <div class="ct_modal_wrap">
        <div class="ct_modal_head">
          <h3><i class="fas fa-certificate"></i> Vista Previa del Certificado</h3>
          <button class="ct_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="ct_canvas_frame">
          <canvas id="ct_canvas" width="1200" height="848"></canvas>
        </div>
        <div class="ct_modal_foot">
          <button class="ct_btn_dl" id="ct_btn_dl_canvas" data-nom="${nom}">
            <i class="fas fa-download"></i> Descargar Imagen (PNG)
          </button>
        </div>
      </div>
    </div>`);

  setTimeout(() => _dibujarCertificado(nom, wpm, fecha), 100);
}

// ── CANVAS — DIBUJAR CERTIFICADO ──────────────────────────────────────────────
function _dibujarCertificado(nombre, wpm, fecha) {
  const canvas = document.getElementById('ct_canvas');
  if (!canvas) return;

  const W = 1200, H = 848;
  const ctx = canvas.getContext('2d');

  // Fondo corporativo
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0,   '#0f172a');
  bg.addColorStop(.45, '#1e1b4b');
  bg.addColorStop(1,   '#0f172a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Patrón puntos
  ctx.fillStyle = 'rgba(255,255,255,.025)';
  for (let x = 20; x < W; x += 30) {
    for (let y = 20; y < H; y += 30) {
      ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Bordes
  _borde(ctx, 20, 20, W - 40, H - 40, 18, 'rgba(245,158,11,.4)', 1.5);
  _borde(ctx, 32, 32, W - 64, H - 64, 12, 'rgba(245,158,11,.15)', 1);

  // Ornamentos
  _ornamento(ctx, 50, 50, 60);
  _ornamento(ctx, W - 50, 50, 60, true);
  _ornamento(ctx, 50, H - 50, 60, false, true);
  _ornamento(ctx, W - 50, H - 50, 60, true, true);

  // Logo
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f59e0b';
  ctx.font      = 'bold 22px "Segoe UI", Arial, sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('⌨ TYPINGWII', W / 2, 100);
  ctx.letterSpacing = '0';

  _lineaDorada(ctx, W / 2, 115, 220);

  // Título
  ctx.fillStyle = '#fff';
  ctx.font      = 'bold 58px "Georgia", serif';
  ctx.fillText('CERTIFICADO', W / 2, 195);
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  ctx.font      = 'italic 22px "Georgia", serif';
  ctx.fillText('DE MECANOGRAFÍA PROFESIONAL', W / 2, 232);

  ctx.fillStyle = 'rgba(255,255,255,.5)';
  ctx.font      = '18px "Segoe UI", Arial, sans-serif';
  ctx.fillText('Se certifica que', W / 2, 295);

  // Nombre
  const nombreGrad = ctx.createLinearGradient(W/2 - 300, 0, W/2 + 300, 0);
  nombreGrad.addColorStop(0, '#fcd34d');
  nombreGrad.addColorStop(.5, '#fff');
  nombreGrad.addColorStop(1, '#fcd34d');
  ctx.fillStyle = nombreGrad;
  
  let fz = 52;
  ctx.font = `bold ${fz}px "Georgia", serif`;
  while (ctx.measureText(nombre).width > (W - 160) && fz > 28) {
    fz -= 2; ctx.font = `bold ${fz}px "Georgia", serif`;
  }
  ctx.fillText(nombre, W / 2, 365);
  _lineaDorada(ctx, W / 2, 385, 350, 'rgba(245,158,11,.3)');

  // Descripción
  ctx.fillStyle = 'rgba(255,255,255,.6)';
  ctx.font      = '18px "Segoe UI", Arial, sans-serif';
  ctx.fillText('ha completado exitosamente el programa de mecanografía de', W / 2, 430);
  ctx.fillStyle = '#f59e0b';
  ctx.font      = 'bold 22px "Segoe UI", Arial, sans-serif';
  ctx.fillText(`${app} Empresarial — 45 Lecciones`, W / 2, 462);

  // Stats
  _stat(ctx, W / 2 - 200, 545, `${wpm}`, 'WPM Alcanzados');
  _stat(ctx, W / 2,       545, '45', 'Lecciones');
  _stat(ctx, W / 2 + 200, 545, '10', 'Niveles');

  // Separador
  ctx.strokeStyle = 'rgba(245,158,11,.2)';
  ctx.lineWidth   = 1;
  ctx.beginPath(); ctx.moveTo(80, 620); ctx.lineTo(W - 80, 620); ctx.stroke();

  // Fecha
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,.4)';
  ctx.font      = '16px "Segoe UI", Arial, sans-serif';
  ctx.fillText(`Emitido el ${fecha}`, W / 2, 660);

  // Sellos
  _sello(ctx, W / 2 - 160, 710, '🏆', 'Certificado');
  _sello(ctx, W / 2,       710, '⌨️',  'Mecanografía');
  _sello(ctx, W / 2 + 160, 710, '⭐',  '80+ WPM');

  // URL
  ctx.fillStyle = 'rgba(255,255,255,.25)';
  ctx.font      = '13px "Segoe UI", Arial, sans-serif';
  ctx.fillText('typingwii.com', W / 2, H - 28);
}

// ── HELPERS CANVAS ────────────────────────────────────────────────────────────
function _borde(ctx, x, y, w, h, r, color, lw) {
  ctx.strokeStyle = color; ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath(); ctx.stroke();
}
function _lineaDorada(ctx, cx, y, half, color = '#f59e0b') {
  const g = ctx.createLinearGradient(cx - half, y, cx + half, y);
  g.addColorStop(0, 'transparent'); g.addColorStop(.3, color);
  g.addColorStop(.7, color); g.addColorStop(1, 'transparent');
  ctx.strokeStyle = g; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx - half, y); ctx.lineTo(cx + half, y); ctx.stroke();
}
function _ornamento(ctx, x, y, size, flipX = false, flipY = false) {
  ctx.save(); ctx.translate(x, y);
  if (flipX) ctx.scale(-1, 1); if (flipY) ctx.scale(1, -1);
  ctx.strokeStyle = 'rgba(245,158,11,.45)'; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(size, 0); ctx.moveTo(0, 0); ctx.lineTo(0, size);
  ctx.moveTo(8, 8); ctx.lineTo(size * .5, 8); ctx.moveTo(8, 8); ctx.lineTo(8, size * .5);
  ctx.stroke();
  ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(8, 8, 4, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
function _stat(ctx, x, y, val, lbl) {
  ctx.textAlign = 'center';
  const valGrad = ctx.createLinearGradient(x - 40, y - 50, x + 40, y);
  valGrad.addColorStop(0, '#fcd34d'); valGrad.addColorStop(1, '#f59e0b');
  ctx.fillStyle = valGrad; ctx.font = 'bold 48px "Georgia", serif';
  ctx.fillText(val, x, y);
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '15px "Segoe UI", Arial, sans-serif';
  ctx.letterSpacing = '3px'; ctx.fillText(lbl.toUpperCase(), x, y + 28); ctx.letterSpacing = '0';
}
function _sello(ctx, x, y, emoji, lbl) {
  ctx.textAlign = 'center'; ctx.font = '26px serif'; ctx.fillText(emoji, x, y);
  ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.font = '13px "Segoe UI", Arial, sans-serif';
  ctx.fillText(lbl, x, y + 22);
}
