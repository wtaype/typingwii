import './admin.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import {
  savels, getls,
  Saludar, getNombre,
  wiVista, Mensaje
} from '../../widev.js';
import { app } from '../../wii.js';

// ─── USUARIO ─────────────────────────────────────────────────────
const wi = () => getls('wiSmile');

// ─── CACHE KEYS (Compactas) ──────────────────────────────────────
const K_TOT = 'amUsersTotal';
const K_PRO = 'amUsersPro';
const K_LES = 'amLessonsTotal';
const K_ORG = 'amOrgsTotal';

// ─── RENDER ──────────────────────────────────────────────────────
export const render = () => {
  const u = wi();
  if (!u) return `<div class="am_empty">Sin sesión administrativa.</div>`;

  return `
  <div class="am_page" id="am_root">
    
    <!-- ══ BACKGROUND ══ -->
    <div class="am_orb am_orb1"></div>
    <div class="am_orb am_orb2"></div>

    <!-- ══ COMPACT HERO ══ -->
    <div class="am_hero">
      <div class="am_hero_inner wi_fadeUp">
        <div class="am_hero_ico"><i class="fas fa-crown"></i></div>
        <div class="am_hero_txt">
          <div class="am_hero_top">${Saludar()} 👋</div>
          <h1 class="am_h1">Centro de Control</h1>
          <p class="am_sub">Administración maestra de la plataforma ${app}.</p>
        </div>
        <div class="am_hero_btn_wrap">
          <button class="am_btn_sync" id="am_btn_refresh">
            <i class="fas fa-rotate"></i> <span>Consultar Ahora</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ══ MASTER KPIs ══ -->
    <div class="am_grid_4">
      <div class="am_kpi wi_fadeUp" style="--d:.05s">
        <div class="am_kpi_head">
          <div class="am_ki_ico" style="--c:#0EBEFF"><i class="fas fa-users"></i></div>
          <span class="am_ki_label">Usuarios</span>
        </div>
        <div class="am_ki_val" id="am_n_total">—</div>
        <div class="am_ki_trend"><i class="fas fa-arrow-trend-up"></i> Total registrados</div>
      </div>

      <div class="am_kpi wi_fadeUp" style="--d:.1s">
        <div class="am_kpi_head">
          <div class="am_ki_ico" style="--c:#37dd7a"><i class="fas fa-star"></i></div>
          <span class="am_ki_label">Suscripciones</span>
        </div>
        <div class="am_ki_val" id="am_n_pro">—</div>
        <div class="am_ki_trend"><i class="fas fa-circle-check"></i> Planes Pro con acceso</div>
      </div>

      <div class="am_kpi wi_fadeUp" style="--d:.15s">
        <div class="am_kpi_head">
          <div class="am_ki_ico" style="--c:#fd7e14"><i class="fas fa-book-open"></i></div>
          <span class="am_ki_label">Lecciones</span>
        </div>
        <div class="am_ki_val" id="am_n_les">—</div>
        <div class="am_ki_trend"><i class="fas fa-layer-group"></i> Contenido publicado</div>
      </div>

      <div class="am_kpi wi_fadeUp" style="--d:.2s">
        <div class="am_kpi_head">
          <div class="am_ki_ico" style="--c:#7000FF"><i class="fas fa-school"></i></div>
          <span class="am_ki_label">Escuelas</span>
        </div>
        <div class="am_ki_val" id="am_n_org">—</div>
        <div class="am_ki_trend"><i class="fas fa-building-columns"></i> Organizaciones B2B</div>
      </div>
    </div>

    <!-- ══ ACCIONES MAESTRAS ══ -->
    <div class="am_section_header wi_fadeUp" style="--d:.25s">
      <h2 class="am_sec_h2">Gestión de Plataforma</h2>
    </div>

    <div class="am_actions_grid">
      <a href="/personas" class="am_act_card nv_item wi_fadeUp" data-page="personas" style="--d:.3s">
        <div class="am_act_ico" style="--bc:rgba(254,65,59,.1);--c:#fe413b"><i class="fas fa-user-gear"></i></div>
        <div class="am_act_info">
          <strong>Usuarios Globales</strong>
          <span>Moderación y perfiles de usuario</span>
        </div>
        <i class="fas fa-arrow-right am_act_arr"></i>
      </a>

      <a href="/roles" class="am_act_card nv_item wi_fadeUp" data-page="roles" style="--d:.35s">
        <div class="am_act_ico" style="--bc:rgba(255,200,0,.12);--c:#d4a700"><i class="fas fa-pen-nib"></i></div>
        <div class="am_act_info">
          <strong>Editor de Contenido</strong>
          <span>Gestionar lecciones y niveles</span>
        </div>
        <i class="fas fa-arrow-right am_act_arr"></i>
      </a>

      <a href="/subir" class="am_act_card nv_item wi_fadeUp" data-page="subir" style="--d:.4s">
        <div class="am_act_ico" style="--bc:rgba(55,161,221,.1);--c:#37A1DD"><i class="fas fa-file-contract"></i></div>
        <div class="am_act_info">
          <strong>Contratos B2B</strong>
          <span>Gestión de escuelas y licencias</span>
        </div>
        <i class="fas fa-arrow-right am_act_arr"></i>
      </a>
      
      <div class="am_act_card wi_fadeUp" style="--d:.45s">
         <div class="am_act_ico" style="--bc:rgba(112,0,255,.1);--c:#7000FF"><i class="fas fa-terminal"></i></div>
         <div class="am_act_info">
           <strong>Caché de Sistema</strong>
           <span>Estado de las consultas manuales</span>
         </div>
      </div>
    </div>

    <!-- ══ INFO COMPACTA ══ -->
    <div class="am_banner wi_fadeUp" style="--d:.5s">
      <div class="am_banner_ico"><i class="fas fa-shield-halved"></i></div>
      <div class="am_banner_txt">
        <strong>Seguridad & Eficiencia Firestore</strong>
        <p>Los indicadores usan caché manual infinita para optimizar recursos. Actualiza solo si es estrictamente necesario.</p>
      </div>
    </div>

  </div>`;
};

// ─── INIT ─────────────────────────────────────────────────────────
export const init = () => {
  wiVista('.wi_fadeUp', null, { anim: 'wi_fadeUp' });
  _cargarKpis(false);
  _bindEvents();
};

function _bindEvents() {
  $(document).off('.am').on('click.am', '#am_btn_refresh', function() {
    _cargarKpis(true);
  });
}

async function _cargarKpis(forzar = false) {
  let u_total = getls(K_TOT);
  let u_pro   = getls(K_PRO);
  let l_total = getls(K_LES);
  let o_total = getls(K_ORG);

  const cacheOk = !forzar && (Number.isFinite(u_total));

  if (cacheOk) {
    _anim('#am_n_total', u_total);
    _anim('#am_n_pro',   u_pro);
    _anim('#am_n_les',   l_total);
    _anim('#am_n_org',   o_total);
    return;
  }

  const $btn = $('#am_btn_refresh');
  const oldH = $btn.html();
  $btn.html('<i class="fas fa-spinner fa-spin"></i>').prop('disabled', true);

  try {
    const [cT, cP, cO] = await Promise.all([
      getCountFromServer(collection(db, 'smiles')),
      getCountFromServer(query(collection(db, 'smiles'), where('estado', '==', 'activo'))),
      getCountFromServer(collection(db, 'empresas'))
    ]);

    u_total = cT.data().count;
    u_pro   = cP.data().count;
    l_total = 12; // Cantidad de lecciones estáticas actuales
    o_total = cO.data().count;

    savels(K_TOT, u_total, 87600);
    savels(K_PRO, u_pro, 87600);
    savels(K_LES, l_total, 87600);
    savels(K_ORG, o_total, 87600);

    _anim('#am_n_total', u_total);
    _anim('#am_n_pro',   u_pro);
    _anim('#am_n_les',   l_total);
    _anim('#am_n_org',   o_total);

    if (forzar) Mensaje('Base de datos sincronizada', 'success');
  } catch(e) {
    console.warn(e);
    Mensaje('Error al sincronizar', 'error');
  } finally {
    $btn.html(oldH).prop('disabled', false);
  }
}

function _anim(sel, t) {
  const el = $(sel);
  if (!el.length) return;
  const target = parseInt(t, 10) || 0;
  el.text('0');
  let n = 0;
  const s = Math.max(1, Math.ceil(target / 40));
  const i = setInterval(() => {
    n = Math.min(n + s, target);
    el.text(n);
    if (n >= target) clearInterval(i);
  }, 25);
}

// ─── CLEANUP ──────────────────────────────────────────────────────
export const cleanup = () => {
  $(document).off('.am');
};
