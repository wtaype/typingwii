/**
 * admin.js — Dashboard principal Admin
 * Optimización extrema: Caché infinito (Solo lectura manual).
 * Exports: render | init | cleanup
 */

import './admin.css';
import $ from 'jquery';
import { getls, savels, Mensaje, Saludar, getNombre } from '../../widev.js';
import { db } from '../firebase.js';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';

const wi = () => getls('wiSmile');

// ─── CACHE KEYS (No expiran nunca automáticamente) ────────────────
const K_TOT = 'amTotalSmiles';
const K_ACT = 'amTotalActivos';
const K_INA = 'amTotalInactivos';
const K_ROL = 'amqRoles';

// ─── RENDER ───────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  return `
  <div class="am_wrap" id="am_root">

    <!-- HERO PROFILE -->
    <div class="am_hero">
      <div class="am_hero_bg_decor"></div>
      <div class="am_hero_icon"><i class="fas fa-crown"></i></div>
      <div class="am_hero_txt">
        <div class="am_hero_saludo">${Saludar()} <strong>${getNombre(u)}</strong></div>
        <h2>Centro de Control</h2>
        <p>Administración general del sistema Smile</p>
      </div>
    </div>

    <div class="am_section_title"><i class="fas fa-chart-pie" style="color:var(--mco)"></i> Resumen de Talento</div>

    <!-- KPIs -->
    <div class="am_kpis" id="am_kpis">
      <div class="am_kpi am_kpi--total">
        <div class="am_kpi_icon"><i class="fas fa-users"></i></div>
        <div class="am_kpi_body"><div class="am_kpi_num" id="am_n_total">—</div><div class="am_kpi_lbl">Total personas</div></div>
      </div>
      <div class="am_kpi am_kpi--activo">
        <div class="am_kpi_icon"><i class="fas fa-circle-check"></i></div>
        <div class="am_kpi_body"><div class="am_kpi_num" id="am_n_activo">—</div><div class="am_kpi_lbl">Activos</div></div>
      </div>
      <div class="am_kpi am_kpi--inact">
        <div class="am_kpi_icon"><i class="fas fa-user-slash"></i></div>
        <div class="am_kpi_body"><div class="am_kpi_num" id="am_n_inact">—</div><div class="am_kpi_lbl">Inactivos</div></div>
      </div>
      <div class="am_kpi am_kpi--roles">
        <div class="am_kpi_icon"><i class="fas fa-id-card-clip"></i></div>
        <div class="am_kpi_body"><div class="am_kpi_num" id="am_n_roles">—</div><div class="am_kpi_lbl">Roles de acceso</div></div>
      </div>
    </div>

    <!-- ACCESOS RÁPIDOS -->
    <div class="am_section_title"><i class="fas fa-bolt" style="color:var(--mco)"></i> Gestión Rápida</div>
    <div class="am_acciones_rapidas">
      <a href="/personas" class="am_accion_card nv_item" data-page="personas">
        <div class="am_accion_ico" style="background:rgba(254,65,59,.12);color:#c43030"><i class="fas fa-user-edit"></i></div>
        <div class="am_accion_txt">
          <div class="am_accion_title">Personas</div>
          <div class="am_accion_sub">Activar, desactivar o modificar perfiles</div>
        </div>
        <i class="fas fa-chevron-right am_accion_arr"></i>
      </a>
      <a href="/roles" class="am_accion_card nv_item" data-page="roles">
        <div class="am_accion_ico" style="background:rgba(255,209,1,.15);color:#9a7c00"><i class="fas fa-shield-alt"></i></div>
        <div class="am_accion_txt">
          <div class="am_accion_title">Permisos</div>
          <div class="am_accion_sub">Designar jerarquía y roles del sistema</div>
        </div>
        <i class="fas fa-chevron-right am_accion_arr"></i>
      </a>
      <a href="/subir" class="am_accion_card nv_item" data-page="subir">
        <div class="am_accion_ico" style="background:rgba(55,161,221,.12);color:#1d7fb8"><i class="fas fa-file-import"></i></div>
        <div class="am_accion_txt">
          <div class="am_accion_title">Importar Excel</div>
          <div class="am_accion_sub">Alta masiva en la base de datos</div>
        </div>
        <i class="fas fa-chevron-right am_accion_arr"></i>
      </a>
    </div>

    <!-- FOOTER INFORMATIVO & ACTUALIZACIÓN MANUAL (AL FINAL) -->
    <div class="am_sys_banner">
      <div class="am_sys_icon"><i class="fas fa-piggy-bank"></i></div>
      <div class="am_sys_info">
        <strong>Modo Ahorro Firebase (Caché Manual)</strong>
        <span>Los indicadores no se recargan automáticamente para cuidar las lecturas y prevenir cobros.</span>
      </div>
      <button class="am_sys_refresh" id="am_btn_refresh" title="Pulsar solo si necesitas ver datos exactos de ahora">
        <i class="fas fa-cloud-download-alt"></i> Consultar Ahora
      </button>
    </div>

  </div>`;
};

// ─── INIT ─────────────────────────────────────────────────────────
export const init = () => {
  _cargarKpis(false);
  _bindEvents();
};

function _bindEvents() {
  $(document).on('click.am', '#am_btn_refresh', function() {
    _cargarKpis(true);
  });
}

// ─── LÓGICA DE CACHÉ Y KPIs (Infinito Automático) ─────────────────
async function _cargarKpis(forzar = false) {
  let total   = getls(K_TOT);
  let activos = getls(K_ACT);
  let inact   = getls(K_INA);
  let roles   = 3; // admin, people, smile (fijo)

  const usarCache = !forzar && (Number.isFinite(total) && Number.isFinite(activos) && Number.isFinite(inact));

  if (usarCache) {
    _animNum('#am_n_total',  total);
    _animNum('#am_n_activo', activos);
    _animNum('#am_n_inact',  inact);
    _animNum('#am_n_roles',  roles);
    return;
  }

  // Descarga real de BD
  const $btn = $('#am_btn_refresh');
  $btn.html('<i class="fas fa-spinner fa-spin"></i> Sincronizando...').prop('disabled', true);

  try {
    const [cTotal, cActivos, cInact] = await Promise.all([
      getCountFromServer(query(collection(db, 'smiles'))),
      getCountFromServer(query(collection(db, 'smiles'), where('estado', '==', 'activo'))),
      getCountFromServer(query(collection(db, 'smiles'), where('estado', '==', 'inactivo')))
    ]);

    total   = cTotal.data().count;
    activos = cActivos.data().count;
    inact   = cInact.data().count;

    // Guardar para la eternidad (10 años = 87600 horas)
    savels(K_TOT, total, 87600);
    savels(K_ACT, activos, 87600);
    savels(K_INA, inact, 87600);

    // Resetear valor DOM antes de la animación para dar feedback visual de actualización
    document.querySelector('#am_n_total').textContent = '—';
    document.querySelector('#am_n_activo').textContent = '—';
    document.querySelector('#am_n_inact').textContent = '—';

    setTimeout(() => {
      _animNum('#am_n_total',  total);
      _animNum('#am_n_activo', activos);
      _animNum('#am_n_inact',  inact);
      _animNum('#am_n_roles',  roles);
    }, 100);

    if (forzar) Mensaje('Base de datos consultada con éxito.', 'success');
  } catch(e) {
    console.error('[admin] kpis:', e);
    Mensaje('Error al obtener datos.', 'error');
  } finally {
    $btn.html('<i class="fas fa-cloud-download-alt"></i> Consultar Ahora').prop('disabled', false);
  }
}

// Contador animado fluido
function _animNum(sel, target) {
  const el = document.querySelector(sel);
  if (!el) return;
  const tNum = parseInt(target, 10);
  if (isNaN(tNum)) { el.textContent = '—'; return; }
  
  el.textContent = '0';
  let n = 0;
  const step = Math.max(1, Math.ceil(tNum / 20));
  const t = setInterval(() => {
    n = Math.min(n + step, tNum);
    el.textContent = n;
    if (n >= tNum) clearInterval(t);
  }, 30);
}

// ─── CLEANUP ──────────────────────────────────────────────────────
export const cleanup = () => {
  $(document).off('.am');
};
