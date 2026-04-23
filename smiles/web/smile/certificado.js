// ════════════════════════════════════════════════════════════════════
// certificado.js — TypingWii · Certificado del Estudiante
// Canvas 100% client-side, sin server, sin Cloud Functions
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './certificado.css';
import $ from 'jquery';
import { getls } from '../../widev.js';
import { app } from '../../wii.js';

// ── CONDICIONES ───────────────────────────────────────────────────────────────
const TOTAL_LECS = 150;
const WPM_MIN    = 80;

const wi = () => getls('wiSmile');

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="cert_page">
    <div class="cert_hero"><div class="cert_hero_orb"></div>
      <div class="cert_hero_left">
        <div class="cert_hero_badge"><i class="fas fa-certificate"></i> Certificado</div>
        <h1 class="cert_hero_title">Tu <span>Certificado</span></h1>
        <p class="cert_hero_sub">Inicia sesión para ver tu estado.</p>
      </div>
    </div></div>`;

  const prog    = getls('wiProgreso') || {};
  const lecsOk  = prog.leccionesOk || [];
  const wpmMax  = prog.wpmRecord   || 0;
  const lecsOkN = lecsOk.length;
  const lecsOk100 = lecsOkN >= TOTAL_LECS;
  const wpmOk     = wpmMax  >= WPM_MIN;
  const habilitado = lecsOk100 && wpmOk;

  const nombre = `${u.nombre || ''} ${u.apellidos || ''}`.trim() || u.usuario || 'Estudiante';

  return `
  <div class="cert_page">

    <!-- HERO -->
    <div class="cert_hero">
      <div class="cert_hero_orb"></div>
      <div class="cert_hero_left">
        <div class="cert_hero_badge"><i class="fas fa-certificate"></i> Certificado</div>
        <h1 class="cert_hero_title">Tu <span>Certificado</span> de Mecanografía</h1>
        <p class="cert_hero_sub">${habilitado
          ? '🎉 ¡Felicitaciones! Has cumplido todos los requisitos.'
          : 'Completa los requisitos para desbloquear tu certificado.'}</p>
      </div>
      <div class="cert_hero_ico">
        <i class="fas ${habilitado ? 'fa-award' : 'fa-lock'}"></i>
      </div>
    </div>

    <!-- REQUISITOS -->
    <div class="cert_req_card">
      <div class="cert_req_title"><i class="fas fa-clipboard-check"></i> Requisitos para certificar</div>
      <div class="cert_req_list">

        <!-- Requisito 1: Lecciones -->
        <div class="cert_req_item ${lecsOk100 ? 'ok' : 'no'}">
          <div class="cert_req_ico">
            <i class="fas ${lecsOk100 ? 'fa-check' : 'fa-graduation-cap'}"></i>
          </div>
          <div class="cert_req_body">
            <div class="cert_req_lbl">Completar las 150 lecciones</div>
            <div class="cert_req_sub">${lecsOk100
              ? '¡Todas las lecciones completadas!'
              : `Te faltan ${TOTAL_LECS - lecsOkN} lección${TOTAL_LECS - lecsOkN !== 1 ? 'es' : ''} por completar.`}</div>
            <div class="cert_req_bar_wrap">
              <div class="cert_req_bar_fill" id="cert_bar_lec"
                style="width:${Math.min((lecsOkN / TOTAL_LECS) * 100, 100)}%"></div>
            </div>
          </div>
          <div class="cert_req_val">
            ${lecsOkN}<small>/ ${TOTAL_LECS}</small>
          </div>
        </div>

        <!-- Requisito 2: WPM -->
        <div class="cert_req_item ${wpmOk ? 'ok' : 'no'}">
          <div class="cert_req_ico">
            <i class="fas ${wpmOk ? 'fa-check' : 'fa-bolt'}"></i>
          </div>
          <div class="cert_req_body">
            <div class="cert_req_lbl">Alcanzar mínimo ${WPM_MIN} WPM</div>
            <div class="cert_req_sub">${wpmOk
              ? `¡Excelente! Tu récord es de ${wpmMax} WPM. 🚀`
              : `Tu récord actual es ${wpmMax || 0} WPM. Te faltan ${WPM_MIN - wpmMax} WPM más.`}</div>
            <div class="cert_req_bar_wrap">
              <div class="cert_req_bar_fill" id="cert_bar_wpm"
                style="width:${Math.min((wpmMax / WPM_MIN) * 100, 100)}%"></div>
            </div>
          </div>
          <div class="cert_req_val">
            ${wpmMax || 0}<small>WPM</small>
          </div>
        </div>

      </div>
    </div>

    <!-- MENSAJE ORIENTADOR o VISTA PREVIA -->
    ${habilitado ? `
      <div class="cert_preview_wrap">
        <div class="cert_canvas_frame">
          <canvas id="cert_canvas" width="1200" height="848"></canvas>
        </div>
        <div class="cert_download_row">
          <button class="cert_dl_btn primary" id="cert_dl_png">
            <i class="fas fa-download"></i> Descargar PNG
          </button>
          <button class="cert_dl_btn ghost" id="cert_compartir">
            <i class="fas fa-share-alt"></i> Compartir
          </button>
        </div>
      </div>
    ` : `
      <div class="cert_tip">
        <i class="fas fa-lightbulb"></i>
        <span>
          ${!lecsOk100
            ? `Practica más lecciones en <a class="nv_item" href="/lecciones" data-page="lecciones">Lecciones</a> para avanzar.`
            : `Practica en modo libre para mejorar tu WPM en <a class="nv_item" href="/comenzar" data-page="comenzar">Comenzar</a>.`}
        </span>
      </div>
    `}

  </div>`;
};

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = () => {
  const u = wi();
  if (!u) return;

  const prog    = getls('wiProgreso') || {};
  const lecsOk  = prog.leccionesOk || [];
  const wpmMax  = prog.wpmRecord   || 0;
  const habilitado = lecsOk.length >= TOTAL_LECS && wpmMax >= WPM_MIN;

  $(document).off('.cert');

  // Links nav
  $(document).on('click.cert', '.nv_item', function (e) {
    e.preventDefault();
    const page = $(this).data('page');
    if (!page) return;
    import('../../rutas/ruta.js').then(({ rutas }) => rutas.navigate(`/${page}`));
  });

  if (!habilitado) return;

  // Dibujar certificado en canvas
  const nombre = `${u.nombre || ''} ${u.apellidos || ''}`.trim() || u.usuario || 'Estudiante';
  const fecha  = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });

  _dibujarCertificado(nombre, wpmMax, fecha);

  // Descargar PNG
  $(document).on('click.cert', '#cert_dl_png', () => {
    const canvas = document.getElementById('cert_canvas');
    if (!canvas) return;
    const link  = document.createElement('a');
    link.download = `certificado-typingwii-${u.usuario}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  // Compartir (Web Share API o fallback)
  $(document).on('click.cert', '#cert_compartir', async () => {
    const canvas = document.getElementById('cert_canvas');
    if (!canvas) return;
    try {
      canvas.toBlob(async blob => {
        const file = new File([blob], 'certificado-typingwii.png', { type: 'image/png' });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ title: `Mi certificado de ${app}`, files: [file] });
        } else {
          // Fallback: descargar
          document.getElementById('cert_dl_png')?.click();
        }
      }, 'image/png');
    } catch (err) {
      if (err.name !== 'AbortError') console.error('[cert] Error compartir:', err);
    }
  });
};

export const cleanup = () => {
  $(document).off('.cert');
};

// ── CANVAS — DIBUJAR CERTIFICADO ──────────────────────────────────────────────
function _dibujarCertificado(nombre, wpm, fecha) {
  const canvas = document.getElementById('cert_canvas');
  if (!canvas) return;

  const W = 1200, H = 848;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // ── Fondo degradado premium ────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0,   '#0f172a');
  bg.addColorStop(.45, '#1e1b4b');
  bg.addColorStop(1,   '#0f172a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── Patrón de puntos de fondo ──────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,.025)';
  for (let x = 20; x < W; x += 30) {
    for (let y = 20; y < H; y += 30) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ── Bordes decorativos exteriores ─────────────────────
  _borde(ctx, 20, 20, W - 40, H - 40, 18, 'rgba(245,158,11,.4)', 1.5);
  _borde(ctx, 32, 32, W - 64, H - 64, 12, 'rgba(245,158,11,.15)', 1);

  // ── Ornamentos de esquina ──────────────────────────────
  _ornamento(ctx, 50, 50, 60);
  _ornamento(ctx, W - 50, 50, 60, true);
  _ornamento(ctx, 50, H - 50, 60, false, true);
  _ornamento(ctx, W - 50, H - 50, 60, true, true);

  // ── Logo / Branding superior ───────────────────────────
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f59e0b';
  ctx.font      = 'bold 22px "Segoe UI", Arial, sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('⌨ TYPINGWII', W / 2, 100);
  ctx.letterSpacing = '0';

  // ── Línea dorada decorativa ────────────────────────────
  _lineaDorada(ctx, W / 2, 115, 220);

  // ── Título CERTIFICADO ─────────────────────────────────
  ctx.fillStyle = '#fff';
  ctx.font      = 'bold 58px "Georgia", serif';
  ctx.fillText('CERTIFICADO', W / 2, 195);

  ctx.fillStyle = 'rgba(255,255,255,.55)';
  ctx.font      = 'italic 22px "Georgia", serif';
  ctx.fillText('DE MECANOGRAFÍA PROFESIONAL', W / 2, 232);

  // ── Se certifica que ──────────────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,.5)';
  ctx.font      = '18px "Segoe UI", Arial, sans-serif';
  ctx.fillText('Se certifica que', W / 2, 295);

  // ── Nombre del estudiante ──────────────────────────────
  const nombreGrad = ctx.createLinearGradient(W/2 - 300, 0, W/2 + 300, 0);
  nombreGrad.addColorStop(0, '#fcd34d');
  nombreGrad.addColorStop(.5, '#fff');
  nombreGrad.addColorStop(1, '#fcd34d');
  ctx.fillStyle = nombreGrad;
  ctx.font      = `bold 52px "Georgia", serif`;
  // Ajustar tamaño si el nombre es muy largo
  const maxW = W - 160;
  let fz = 52;
  while (ctx.measureText(nombre).width > maxW && fz > 28) {
    fz -= 2;
    ctx.font = `bold ${fz}px "Georgia", serif`;
  }
  ctx.fillText(nombre, W / 2, 365);

  // ── Línea bajo el nombre ──────────────────────────────
  _lineaDorada(ctx, W / 2, 385, 350, 'rgba(245,158,11,.3)');

  // ── Texto de logro ─────────────────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,.6)';
  ctx.font      = '18px "Segoe UI", Arial, sans-serif';
  ctx.fillText('ha completado exitosamente el programa de mecanografía de', W / 2, 430);

  ctx.fillStyle = '#f59e0b';
  ctx.font      = 'bold 22px "Segoe UI", Arial, sans-serif';
  ctx.fillText(`${app} — ${TOTAL_LECS} Lecciones Progresivas`, W / 2, 462);

  // ── Estadísticas en 3 columnas ────────────────────────
  const statsY  = 545;
  const col1 = W / 2 - 200;
  const col2 = W / 2;
  const col3 = W / 2 + 200;

  _stat(ctx, col1, statsY, `${wpm}`, 'WPM Alcanzados');
  _stat(ctx, col2, statsY, `${TOTAL_LECS}`, 'Lecciones');
  _stat(ctx, col3, statsY, '10', 'Niveles');

  // ── Separador ─────────────────────────────────────────
  ctx.strokeStyle = 'rgba(245,158,11,.2)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(80, 620); ctx.lineTo(W - 80, 620);
  ctx.stroke();

  // ── Fecha ─────────────────────────────────────────────
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,.4)';
  ctx.font      = '16px "Segoe UI", Arial, sans-serif';
  ctx.fillText(`Emitido el ${fecha}`, W / 2, 660);

  // ── Sellos / insignias ────────────────────────────────
  _sello(ctx, W / 2 - 160, 710, '🏆', 'Maestro');
  _sello(ctx, W / 2,       710, '⌨️',  'Mecanografía');
  _sello(ctx, W / 2 + 160, 710, '⭐',  '80+ WPM');

  // ── URL web ───────────────────────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,.25)';
  ctx.font      = '13px "Segoe UI", Arial, sans-serif';
  ctx.fillText('typingwii.com', W / 2, H - 28);
}

// ── HELPER: borde redondeado ─────────────────────────────────────────────────
function _borde(ctx, x, y, w, h, r, color, lw) {
  ctx.strokeStyle = color;
  ctx.lineWidth   = lw;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.stroke();
}

// ── HELPER: línea dorada ─────────────────────────────────────────────────────
function _lineaDorada(ctx, cx, y, half, color = '#f59e0b') {
  const g = ctx.createLinearGradient(cx - half, y, cx + half, y);
  g.addColorStop(0,   'transparent');
  g.addColorStop(.3,  color);
  g.addColorStop(.7,  color);
  g.addColorStop(1,   'transparent');
  ctx.strokeStyle = g;
  ctx.lineWidth   = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - half, y);
  ctx.lineTo(cx + half, y);
  ctx.stroke();
}

// ── HELPER: ornamento de esquina ──────────────────────────────────────────────
function _ornamento(ctx, x, y, size, flipX = false, flipY = false) {
  ctx.save();
  ctx.translate(x, y);
  if (flipX) ctx.scale(-1, 1);
  if (flipY) ctx.scale(1, -1);
  ctx.strokeStyle = 'rgba(245,158,11,.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(size, 0);
  ctx.moveTo(0, 0); ctx.lineTo(0, size);
  ctx.moveTo(8, 8); ctx.lineTo(size * .5, 8);
  ctx.moveTo(8, 8); ctx.lineTo(8, size * .5);
  ctx.stroke();
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(8, 8, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// ── HELPER: stat columna ────────────────────────────────────────────────────
function _stat(ctx, x, y, val, lbl) {
  ctx.textAlign = 'center';
  const valGrad = ctx.createLinearGradient(x - 40, y - 50, x + 40, y);
  valGrad.addColorStop(0, '#fcd34d');
  valGrad.addColorStop(1, '#f59e0b');
  ctx.fillStyle = valGrad;
  ctx.font      = 'bold 48px "Georgia", serif';
  ctx.fillText(val, x, y);
  ctx.fillStyle = 'rgba(255,255,255,.5)';
  ctx.font      = '15px "Segoe UI", Arial, sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText(lbl.toUpperCase(), x, y + 28);
  ctx.letterSpacing = '0';
}

// ── HELPER: sello inferior ───────────────────────────────────────────────────
function _sello(ctx, x, y, emoji, lbl) {
  ctx.textAlign = 'center';
  ctx.font      = '26px serif';
  ctx.fillText(emoji, x, y);
  ctx.fillStyle = 'rgba(255,255,255,.35)';
  ctx.font      = '13px "Segoe UI", Arial, sans-serif';
  ctx.fillText(lbl, x, y + 22);
}
