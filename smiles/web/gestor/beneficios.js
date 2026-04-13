/**
 * beneficios.js — Módulo Gestionar Beneficios (People)
 * Catálogo de beneficios: crear, editar, activar/desactivar, eliminar
 * Firestore: doc('beneficios/catalogo') → { items: [...] }
 * Exports: render | init | cleanup
 */

import './beneficios.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getls, savels, Mensaje, formatearFechaParaInput } from '../../widev.js';

const wi = () => getls('wiSmile');
const K_LISTA = 'peBeneficios';

// ─── CONSTANTES ───────────────────────────────────────────────────
const CATALOGO_REF = () => doc(db, 'beneficios', 'catalogo');

const ETIQUETAS = {
  categoria: {
    libre: 'Tiempo Libre',
    salud: 'Salud y Bienestar',
    cumple: 'Cumpleaños',
    otros: 'Otros',
  },
  disponible: {
    'todos':    'Todos los empleados',
    '3meses':   '+3 meses de antigüedad',
    '6meses':   '+6 meses de antigüedad',
    '12meses':  '+1 año de antigüedad',
    'cumple':   'En mes de cumpleaños',
  },
  duracion: {
    '4horas': '4 horas al año',
    'undia':  'Un día al año',
    'dosdias':'Dos días al año',
  },
  iconos: {
    'libre':  'fa-umbrella-beach',
    'salud':  'fa-notes-medical',
    'cumple': 'fa-birthday-cake',
    'otros':  'fa-gift',
  },
};

// ─── ESTADO ──────────────────────────────────────────────────────
const st = {
  items:    [],   // caché local
  filtrados:[],
  modalId:  null, // id beneficio en edición (null = nuevo)
};

// ─── RENDER ──────────────────────────────────────────────────────
export const render = async () => {
  const u = wi();
  if (!u) return `<div class="bn_wrap"><div class="bn_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;

  return `
  <div class="bn_wrap" id="bn_root">

    <!-- HERO -->
    <div class="bn_hero">
      <div class="bn_hero_icon"><i class="fas fa-gift"></i></div>
      <div class="bn_hero_txt">
        <h2>Gestionar Beneficios</h2>
        <p>Administra el catálogo de beneficios disponibles para tu equipo</p>
      </div>
      <div class="bn_hero_badge" id="bn_cnt_activos">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </div>

    <!-- KPIs -->
    <div class="bn_kpis">
      <div class="bn_kpi bn_kpi--total">
        <div class="bn_kpi_icon"><i class="fas fa-list"></i></div>
        <div class="bn_kpi_body">
          <div class="bn_kpi_num" id="bn_cnt_total">—</div>
          <div class="bn_kpi_label">Total de beneficios</div>
        </div>
      </div>
      <div class="bn_kpi bn_kpi--activo">
        <div class="bn_kpi_icon"><i class="fas fa-check-circle"></i></div>
        <div class="bn_kpi_body">
          <div class="bn_kpi_num" id="bn_cnt_act">—</div>
          <div class="bn_kpi_label">Activos</div>
        </div>
      </div>
      <div class="bn_kpi bn_kpi--inactivo">
        <div class="bn_kpi_icon"><i class="fas fa-pause-circle"></i></div>
        <div class="bn_kpi_body">
          <div class="bn_kpi_num" id="bn_cnt_ina">—</div>
          <div class="bn_kpi_label">Inactivos</div>
        </div>
      </div>
    </div>

    <!-- CONTROLES -->
    <div class="bn_controles">
      <div class="bn_busqueda">
        <i class="fas fa-search"></i>
        <input type="text" id="bn_q" placeholder="Buscar por nombre o descripción…">
      </div>
      <select class="bn_sel" id="bn_filtro_estado">
        <option value="">Todos los estados</option>
        <option value="activo">Activos</option>
        <option value="inactivo">Inactivos</option>
      </select>
      <button class="bn_btn_refresh" id="bn_refresh">
        <i class="fas fa-sync-alt"></i> Actualizar
      </button>
      <button class="bn_btn_nuevo" id="bn_nuevo">
        <i class="fas fa-plus"></i> Nuevo Beneficio
      </button>
    </div>

    <!-- TABLA -->
    <div class="bn_table_wrap">
      <table class="bn_table">
        <thead>
          <tr>
            <th>Categoría & Beneficio</th>
            <th>Descripción</th>
            <th>Regla de Acceso</th>
            <th>Duración</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="bn_tbody">
          <tr><td colspan="6" class="bn_loading"><i class="fas fa-spinner fa-spin"></i></td></tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL CREAR / EDITAR -->
    <div id="bn_overlay" class="bn_overlay" style="display:none">
      <div class="bn_modal">
        <div class="bn_modal_head">
          <span id="bn_modal_titulo"><i class="fas fa-gift"></i> Nuevo Beneficio</span>
          <button class="bn_modal_close" id="bn_modal_cerrar"><i class="fas fa-times"></i></button>
        </div>
        <div class="bn_modal_split">
          <div class="bn_form" id="bn_form">

            <div class="bn_form_row_full">
              <div class="bn_field">
                <label class="bn_label" for="bn_nombre">Nombre del beneficio *</label>
                <input type="text" class="bn_input" id="bn_nombre" placeholder="Ej: Día libre por cumpleaños">
              </div>
            </div>

            <div class="bn_form_row_full">
              <div class="bn_field">
                <label class="bn_label" for="bn_descripcion">Descripción *</label>
                <textarea class="bn_textarea" id="bn_descripcion" style="min-height:7vh" placeholder="Describe el beneficio…"></textarea>
              </div>
            </div>

            <div class="bn_form_row3">
              <div class="bn_field">
                <label class="bn_label" for="bn_categoria">Categoría</label>
                <select class="bn_select" id="bn_categoria">
                  <option value="libre">Tiempo Libre</option>
                  <option value="salud">Salud y Bienestar</option>
                  <option value="cumple">Cumpleaños / Celeb.</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
              <div class="bn_field">
                <label class="bn_label" for="bn_disponible">Regla de Acceso</label>
                <select class="bn_select" id="bn_disponible">
                  <option value="todos">Todos (Día 1)</option>
                  <option value="3meses">+3 meses ant.</option>
                  <option value="6meses">+6 meses ant.</option>
                  <option value="12meses">+1 año ant.</option>
                  <option value="cumple">Solo Cumpleaños</option>
                </select>
              </div>
              <div class="bn_field">
                <label class="bn_label" for="bn_duracion">Duración</label>
                <select class="bn_select" id="bn_duracion">
                  <option value="4horas">4 horas al año</option>
                  <option value="undia">Un día al año</option>
                  <option value="dosdias">Dos días al año</option>
                </select>
              </div>
            </div>

            <div class="bn_form_row3">
              <div class="bn_field">
                <label class="bn_label" for="bn_fecha_desde">Beneficio Desde (Opc)</label>
                <input type="date" class="bn_input" id="bn_fecha_desde" style="padding:1vh">
              </div>
              <div class="bn_field">
                <label class="bn_label" for="bn_fecha_hasta">Beneficio Hasta (Opc)</label>
                <input type="date" class="bn_input" id="bn_fecha_hasta" style="padding:1vh">
              </div>
              <div class="bn_field">
                <label class="bn_label" for="bn_limite">Límite Anual</label>
                <input type="number" class="bn_input" id="bn_limite" min="1" max="30" value="1">
              </div>
            </div>

            <div class="bn_form_row3">
              <div class="bn_field">
                <label class="bn_label" for="bn_img">Icono Card (URL)</label>
                <input type="text" class="bn_input" id="bn_img" placeholder="https://..." value="https://smilebeneficio.com/smile.avif" />
              </div>
              <div class="bn_field">
                <label class="bn_label" for="bn_banner">Banner HD para Cover (URL Opc)</label>
                <input type="text" class="bn_input" id="bn_banner" placeholder="https://...">
              </div>
              <div class="bn_field">
                <label class="bn_label" for="bn_color">Color HEX</label>
                <div style="display:flex; gap:1vh; align-items:center; height:100%; margin-top:.5vh">
                  <input type="color" id="bn_color" value="#005B96" style="padding:0; height:3.5vh; width:4vh; border:none; cursor:pointer; background:transparent">
                  <span id="bn_color_p" style="font-size:0.8rem;font-weight:700;color:var(--tx2)">#005B96</span>
                </div>
              </div>
            </div>

            <div class="bn_form_row_full">
              <div class="bn_field">
                <label class="bn_label" for="bn_estado_sel">Estado</label>
                <select class="bn_select" id="bn_estado_sel" style="width:32%">
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
            </div>

          </div>
          
          <div class="bn_preview_side">
            <label class="bn_label" style="text-align:center; display:block; margin-bottom: 2vh;"><i class="fas fa-eye"></i> Render de Trabajador</label>
            <div id="bn_live_preview"></div>
          </div>
        </div>
        <div class="bn_modal_footer">
          <button class="bn_modal_cancel" id="bn_modal_cancelar">Cancelar</button>
          <button class="bn_modal_save" id="bn_modal_guardar">
            <i class="fas fa-save"></i> Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL CONFIRMAR ELIMINAR -->
    <div id="bn_confirm_overlay" class="bn_overlay" style="display:none">
      <div class="bn_confirm">
        <div class="bn_confirm_ico"><i class="fas fa-trash-alt"></i></div>
        <h3>¿Eliminar beneficio?</h3>
        <p id="bn_confirm_txt">Esta acción no se puede deshacer.</p>
        <div class="bn_confirm_btns">
          <button class="bn_confirm_cancel" id="bn_confirm_no">Cancelar</button>
          <button class="bn_confirm_delete" id="bn_confirm_si">
            <i class="fas fa-trash-alt"></i> Eliminar
          </button>
        </div>
      </div>
    </div>

  </div>`;
};

// ─── INIT ─────────────────────────────────────────────────────────
export const init = async () => {
  const u = wi();
  if (!u) return;
  await _cargarDatos();
  _bindEvents();
};

// ─── CLEANUP ──────────────────────────────────────────────────────
export const cleanup = () => {
  $(document).off('.bn');
};

// ─── CARGAR DATOS ─────────────────────────────────────────────────
async function _cargarDatos(forzar = false) {
  try {
    if (!forzar) {
      const cache = getls(K_LISTA);
      if (cache) {
        st.items = cache;
        _actualizarKpis();
        _aplicarFiltros();
        return;
      }
    }

    $('#bn_refresh').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i>');
    const snap = await getDoc(CATALOGO_REF());
    st.items = snap.exists() ? (snap.data().items || []) : [];
    
    savels(K_LISTA, st.items, 4); // caché de 4 horas

    _actualizarKpis();
    _aplicarFiltros();
  } catch (e) {
    console.error('[beneficios] cargar:', e);
    $('#bn_tbody').html(`<tr><td colspan="6"><div class="bn_empty"><i class="fas fa-exclamation-circle"></i><p>Error al cargar beneficios.</p></div></td></tr>`);
  } finally {
    $('#bn_refresh').prop('disabled', false).html('<i class="fas fa-sync-alt"></i> Actualizar');
  }
}

// ─── KPIs ─────────────────────────────────────────────────────────
function _actualizarKpis() {
  const total   = st.items.length;
  const activos = st.items.filter(b => b.estado === 'activo').length;
  const inact   = total - activos;

  $('#bn_cnt_total').text(total);
  $('#bn_cnt_act').text(activos);
  $('#bn_cnt_ina').text(inact);
  $('#bn_cnt_activos').html(`<i class="fas fa-gift"></i> ${activos} activo${activos !== 1 ? 's' : ''}`);
}

// ─── FILTRAR ──────────────────────────────────────────────────────
function _aplicarFiltros() {
  const txt    = ($('#bn_q').val() || '').toLowerCase();
  const estado = $('#bn_filtro_estado').val() || '';

  st.filtrados = st.items.filter(b => {
    if (estado && b.estado !== estado) return false;
    if (txt) {
      const hay = `${b.nombre||''} ${b.descripcion||''}`.toLowerCase();
      if (!hay.includes(txt)) return false;
    }
    return true;
  });

  _renderTabla();
}

// ─── TABLA ────────────────────────────────────────────────────────
function _renderTabla() {
  if (!st.filtrados.length) {
    $('#bn_tbody').html(`<tr><td colspan="6"><div class="bn_empty"><i class="fas fa-inbox"></i><p>Sin beneficios${$('#bn_q').val() ? ' con ese filtro' : '. Crea el primero con "+ Nuevo Beneficio"'}.</p></div></td></tr>`);
    return;
  }

  $('#bn_tbody').html(st.filtrados.map(b => {
    const isCat = b.categoria || 'otros';
    const rawIco = ETIQUETAS.iconos[isCat] || ETIQUETAS.iconos.otros;
    const catLabel = ETIQUETAS.categoria[isCat] || 'Otros';
    const disp = ETIQUETAS.disponible[b.disponible] || b.disponible || '—';
    const dur  = ETIQUETAS.duracion[b.duracion]    || b.duracion    || '—';
    const est  = b.estado === 'activo' ? 'activo' : 'inactivo';

    const colCode = b.color ? `color:${b.color};` : '';
    const icoHtml = b.img ? `<img src="${b.img}" style="width:2.4vh;height:2.4vh;object-fit:contain;border-radius:2px" onerror="this.outerHTML='<i class=\\\'fas ${rawIco}\\\' ></i>'">` : `<i class="fas ${rawIco}"></i>`;

    return `
      <tr data-id="${b.id}">
        <td>
          <div style="display:flex;align-items:center;gap:1.2vh">
            <div class="bn_tipo_ico" style="${colCode}">${icoHtml}</div>
            <div style="display:flex;flex-direction:column;gap:0.2vh;">
              <span style="font-weight:700;color:var(--tx);font-size:clamp(0.9rem,1.2vw,0.95rem)">${b.nombre || '—'}</span>
              <span style="font-size:0.75rem;color:var(--tx3);text-transform:uppercase;font-weight:600;letter-spacing:0.5px">${catLabel}</span>
            </div>
          </div>
        </td>
        <td style="max-width:22vh;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${b.descripcion||''}">${b.descripcion || '—'}</td>
        <td>${disp}</td>
        <td>${dur}</td>
        <td><span class="bn_badge ${est}">${est === 'activo' ? 'Activo' : 'Inactivo'}</span></td>
        <td>
          <div class="bn_acciones">
            <button class="bn_btn bn_btn--ver bn_ver" data-id="${b.id}" title="Ver detalles"><i class="fas fa-eye"></i></button>
            <button class="bn_btn bn_btn--edit bn_editar" data-id="${b.id}" title="Editar"><i class="fas fa-edit"></i></button>
            <button class="bn_btn bn_btn--delete bn_eliminar" data-id="${b.id}" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
          </div>
        </td>
      </tr>`;
  }).join(''));
}

// ─── MODAL: ABRIR ─────────────────────────────────────────────────
function _abrirModal(b = null, soloLectura = false) {
  st.modalId = b?.id || null;

  // Título
  const titulo = b
    ? (soloLectura ? 'Detalles del Beneficio' : 'Editar Beneficio')
    : 'Nuevo Beneficio';
  $('#bn_modal_titulo').html(`<i class="fas fa-gift"></i> ${titulo}`);

  // Llenar campos
  $('#bn_nombre').val(b?.nombre || '');
  $('#bn_descripcion').val(b?.descripcion || '');
  $('#bn_categoria').val(b?.categoria || 'libre');
  $('#bn_disponible').val(b?.disponible || 'todos');
  $('#bn_duracion').val(b?.duracion || 'undia');
  $('#bn_limite').val(b?.limiteAnual ?? 1);
  $('#bn_estado_sel').val(b?.estado || 'activo');
  $('#bn_img').val(b ? (b.img || '') : 'https://smilebeneficio.com/smile.avif');
  $('#bn_banner').val(b?.banner || '');
  $('#bn_color').val(b?.color || '#37A1DD');
  $('#bn_fecha_desde').val(b ? (b.fechaDesde || '') : formatearFechaParaInput(new Date()));
  $('#bn_fecha_hasta').val(b?.fechaHasta || '');

  _renderPreview();

  // Modo lectura
  $('#bn_form input, #bn_form select, #bn_form textarea').prop('disabled', soloLectura);
  $('#bn_modal_guardar').toggle(!soloLectura);

  $('#bn_overlay').fadeIn(150);
  if (!soloLectura) setTimeout(() => $('#bn_nombre').focus(), 200);
}

function _cerrarModal() {
  $('#bn_overlay').fadeOut(150);
  st.modalId = null;
}

// ─── GUARDAR ──────────────────────────────────────────────────────
async function _guardar() {
  const nombre = $('#bn_nombre').val().trim();
  const desc   = $('#bn_descripcion').val().trim();

  if (!nombre) { $('#bn_nombre').addClass('bn_input--error').focus(); Mensaje('El nombre es obligatorio', 'warning'); return; }
  if (!desc)   { $('#bn_descripcion').addClass('bn_input--error').focus(); Mensaje('La descripción es obligatoria', 'warning'); return; }
  $('#bn_nombre, #bn_descripcion').removeClass('bn_input--error');

  const $btn = $('#bn_modal_guardar').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i>');

  try {
    const snap = await getDoc(CATALOGO_REF());
    const items = snap.exists() ? (snap.data().items || []) : [];

    const isNew = !st.modalId;
    const id    = st.modalId || `ben_${Date.now()}`;

    const data = {
      id,
      nombre,
      descripcion: desc,
      categoria:   $('#bn_categoria').val(),
      disponible:  $('#bn_disponible').val(),
      duracion:    $('#bn_duracion').val(),
      limiteAnual: parseInt($('#bn_limite').val()) || 1,
      estado:      $('#bn_estado_sel').val(),
      img:         $('#bn_img').val().trim(),
      banner:      $('#bn_banner').val().trim(),
      color:       $('#bn_color').val(),
      fechaDesde:  $('#bn_fecha_desde').val(),
      fechaHasta:  $('#bn_fecha_hasta').val(),
      updatedAt:   new Date().toISOString(),
    };

    if (isNew) {
      data.createdAt = new Date().toISOString();
      items.push(data);
    } else {
      const idx = items.findIndex(b => b.id === id);
      if (idx >= 0) items[idx] = { ...items[idx], ...data };
      else items.push(data);
    }

    if (snap.exists()) {
      await updateDoc(CATALOGO_REF(), { items, ultimaActualizacion: new Date().toISOString() });
    } else {
      await setDoc(CATALOGO_REF(), { items, ultimaActualizacion: new Date().toISOString() });
    }

    st.items = items;
    savels(K_LISTA, st.items, 4);
    _actualizarKpis();
    _aplicarFiltros();
    _cerrarModal();
    Mensaje(`Beneficio ${isNew ? 'creado' : 'actualizado'} correctamente`, 'success');

  } catch (e) {
    console.error('[beneficios] guardar:', e);
    Mensaje('Error al guardar el beneficio', 'error');
  } finally {
    $btn.prop('disabled', false).html('<i class="fas fa-save"></i> Guardar');
  }
}

// ─── ELIMINAR ─────────────────────────────────────────────────────
let _pendingDeleteId = null;

function _confirmarEliminar(id) {
  const b = st.items.find(x => x.id === id);
  if (!b) return;
  _pendingDeleteId = id;
  $('#bn_confirm_txt').text(`¿Eliminar "${b.nombre}"? Esta acción no se puede deshacer.`);
  $('#bn_confirm_overlay').fadeIn(150);
}

async function _eliminar() {
  const id = _pendingDeleteId;
  if (!id) return;

  const $btn = $('#bn_confirm_si').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i>');

  try {
    const snap = await getDoc(CATALOGO_REF());
    const items = (snap.data()?.items || []).filter(b => b.id !== id);
    await updateDoc(CATALOGO_REF(), { items, ultimaActualizacion: new Date().toISOString() });

    st.items = items;
    savels(K_LISTA, st.items, 4);
    _actualizarKpis();
    _aplicarFiltros();
    $('#bn_confirm_overlay').fadeOut(150);
    _pendingDeleteId = null;
    Mensaje('Beneficio eliminado', 'success');

  } catch (e) {
    console.error('[beneficios] eliminar:', e);
    Mensaje('Error al eliminar el beneficio', 'error');
  } finally {
    $btn.prop('disabled', false).html('<i class="fas fa-trash-alt"></i> Eliminar');
  }
}

// ─── EVENTOS ──────────────────────────────────────────────────────
function _bindEvents() {
  // Render en vivo
  $(document).on('input.bn change.bn', '#bn_form input, #bn_form select, #bn_form textarea', _renderPreview);

  // Filtros
  let t;
  $(document).on('input.bn', '#bn_q', () => { clearTimeout(t); t = setTimeout(_aplicarFiltros, 280); });
  $(document).on('change.bn', '#bn_filtro_estado', _aplicarFiltros);

  // Actualizar manual fuerza la BD
  $(document).on('click.bn', '#bn_refresh', () => _cargarDatos(true));

  // Nuevo beneficio
  $(document).on('click.bn', '#bn_nuevo', () => _abrirModal(null, false));

  // Ver / Editar desde tabla
  $(document).on('click.bn', '.bn_ver', function() {
    const b = st.items.find(x => x.id === $(this).data('id'));
    _abrirModal(b, true);
  });
  $(document).on('click.bn', '.bn_editar', function() {
    const b = st.items.find(x => x.id === $(this).data('id'));
    _abrirModal(b, false);
  });

  // Eliminar
  $(document).on('click.bn', '.bn_eliminar', function() { _confirmarEliminar($(this).data('id')); });

  // Cerrar modales
  $(document).on('click.bn', '#bn_modal_cerrar, #bn_modal_cancelar', _cerrarModal);
  $(document).on('click.bn', '#bn_overlay', function(e) { if (e.target === this) _cerrarModal(); });
  $(document).on('click.bn', '#bn_confirm_no', () => { $('#bn_confirm_overlay').fadeOut(150); _pendingDeleteId = null; });
  $(document).on('click.bn', '#bn_confirm_overlay', function(e) { if (e.target === this) { $('#bn_confirm_overlay').fadeOut(150); _pendingDeleteId = null; } });

  // Guardar
  $(document).on('click.bn', '#bn_modal_guardar', _guardar);

  // Confirmar eliminar
  $(document).on('click.bn', '#bn_confirm_si', _eliminar);

  // Limpiar error al escribir
  $(document).on('input.bn', '#bn_nombre, #bn_descripcion', function() { $(this).removeClass('bn_input--error'); });
}

// ─── LIVE PREVIEW ─────────────────────────────────────────────────
function _renderPreview() {
  const cat    = $('#bn_categoria').val();
  const colHex = $('#bn_color').val() || '#37a1dd';
  const imgUrl = $('#bn_img').val();
  const banUrl = $('#bn_banner').val();
  const nombre = $('#bn_nombre').val() || 'Título del Beneficio';
  const desc   = $('#bn_descripcion').val() || 'Corta descripción amigable para el trabajador...';

  const rawIco = ETIQUETAS.iconos[cat] || ETIQUETAS.iconos.otros;
  const bgBg   = colHex + '20';

  const baseSvg = imgUrl 
    ? `<img src="${imgUrl}" style="width:2.6vh;height:2.6vh;object-fit:contain" onerror="this.outerHTML='<i class=\\\'fas ${rawIco}\\\' ></i>'">`
    : `<i class="fas ${rawIco}"></i>`;

  const bannerHtml = banUrl 
    ? `<div style="height:9vh; width:100%; border-radius:1.5vh 1.5vh 0 0; background:linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,.7)), url('${banUrl}') center/cover no-repeat; display:flex; align-items:flex-end; padding:1vh 1.5vh;"><span style="color:#fff; font-size:.75rem; font-weight:700"><i class="fas fa-camera"></i> Cover Mode</span></div>` 
    : '';

  $('#bn_live_preview').html(`
    <div style="background:var(--wb); border-radius:1.5vh; display:flex; flex-direction:column; border-left:5px solid ${colHex}; position:relative; overflow:hidden;">
      ${bannerHtml}
      <div style="padding: ${banUrl ? '1.5vh 2vh 2.5vh' : '2.5vh'}; flex:1; display:flex; flex-direction:column; gap:1.5vh;">
        <div style="display:flex; align-items:center; gap:1.5vh;">
          <div style="width:5vh; height:5vh; border-radius:1.2vh; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:2.2vh; background:${bgBg}; color:${colHex};">${baseSvg}</div>
          <div style="font-size:1.05rem; font-weight:700; color:var(--tx1); line-height:1.2;">${nombre}</div>
        </div>
        <p style="font-size:0.88rem; color:var(--tx2); line-height:1.5; margin:0 flex-grow:1;">${desc}</p>
        <button style="width:100%; margin-top:2vh; background:transparent; border:2px solid ${bgBg}; border-radius:1vh; padding:1.2vh; font-weight:700; color:${colHex}; cursor:not-allowed; display:flex; justify-content:space-between; align-items:center; transition:all .2s; font-size:.85rem;">
          Solicitar Beneficio <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `);

  $('#bn_color_p').text(colHex.toUpperCase());
}
