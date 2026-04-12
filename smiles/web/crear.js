import './crear.css';
import $ from 'jquery';
import { wicopy, wiSpin, wiTip, getls, Notificacion } from '../widev.js';
import { genURL, genPublica, genPrivada, plantillas, pls, bg } from '../parametros.js';

const esAuth = () => !!getls('wiSmile');
const cache = new Map();

const renderChips = (pl) => {
  const m = plantillas[pl]?.musicas || [];
  if (!m.length) return '';
  return `<div class="cr_chips">
    ${m.map(s => `<label class="cr_chip" style="--chip:${plantillas[pl].x}"><input type="radio" name="crMusChip" value="${s.u}"><span><i class="fas fa-music"></i> ${s.n}</span></label>`).join('')}
  </div>`;
};

const renderMisChips = (items, name, icon) => {
  if (!items.length) return '';
  return `<div class="cr_chips cr_mis">
    ${items.map(s => `<label class="cr_chip" style="--chip:var(--mco)"><input type="radio" name="${name}" value="${s.src}"><span><i class="fas fa-${icon}"></i> ${s.titulo}</span></label>`).join('')}
  </div>`;
};

export const render = () => `
<div class="crear">
  <div class="cr_izq">
    <div class="cr_sec">
      <h3 class="cr_stit"><i class="fas fa-pen-fancy"></i> Personaliza tu mensaje</h3>
      <div class="cr_form">
        <div class="cr_row">
          <div class="cr_campo">
            <label>Para <small>¿A quién va?</small></label>
            <div class="cr_inp"><i class="fas fa-heart"></i><input id="cPara" maxlength="30" placeholder="Para"></div>
          </div>
          <div class="cr_campo">
            <label>De <small>Tu nombre</small></label>
            <div class="cr_inp"><i class="fas fa-user"></i><input id="cDe" maxlength="30" placeholder="De ti"></div>
          </div>
        </div>
        <div class="cr_campo">
          <label>Mensaje <small id="cCont">0/200</small></label>
          <textarea id="cMsg" maxlength="200" rows="3" placeholder="Algo desde el corazón..."></textarea>
        </div>
        <div class="cr_row">
          <div class="cr_campo">
            <label>Música <small>URL opcional</small></label>
            <div id="crChipsWrap">${renderChips('Amor')}</div>
            <div id="crMisAudios"></div>
            <div class="cr_inp"><i class="fas fa-music"></i><input id="cMusica" maxlength="200" placeholder="URL de música..."></div>
          </div>
          <div class="cr_campo">
            <label>Imagen <small>URL opcional</small></label>
            <div id="crMisImgs"></div>
            <div class="cr_inp"><i class="fas fa-image"></i><input id="cImg" maxlength="300" placeholder="URL de imagen..."></div>
          </div>
        </div>
        <div class="cr_row">
          <div class="cr_campo">
            <label>Plantilla</label>
            <div class="cr_select">
              <select id="selPlantilla">
                ${Object.keys(plantillas).map((k, i) => `<option value="${k}"${!i ? ' selected' : ''}>${plantillas[k].e} ${k}</option>`).join('')}
              </select>
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div class="cr_campo">
            <label>Link <small>Mín. 3 caracteres</small></label>
            <div class="cr_inp cr_inp_link">
              <span class="cr_pre">${location.origin}/${esAuth() ? '?' : '?ver='}</span>
              <input id="cLink" maxlength="30" placeholder="auto" spellcheck="false">
              <span class="cr_st" id="linkStatus"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cr_sec cr_save">
      <button class="cr_gbtn ${esAuth() ? '' : 'cr_gbtn_pub'}" id="guardarNube">
        <i class="fas fa-cloud-arrow-up"></i> ${esAuth() ? 'Guardar en nube' : 'Generar enlace'}
      </button>
      <div class="cr_url_row">
        <label>Corto</label>
        <div class="cr_url_box cr_url_corta">
          <input id="urlCorta" readonly placeholder="Se generará al guardar">
          <button class="cr_ubtn" id="copCorta" ${wiTip('Copiar')}><i class="fas fa-copy"></i></button>
          <button class="cr_ubtn" id="abrCorta" ${wiTip('Abrir')}><i class="fas fa-arrow-up-right-from-square"></i></button>
        </div>
      </div>
      <div class="cr_url_row">
        <label>Completo</label>
        <div class="cr_url_box">
          <input id="urlLarga" readonly placeholder="Se genera al escribir">
          <button class="cr_ubtn" id="copLarga" ${wiTip('Copiar')}><i class="fas fa-copy"></i></button>
          <button class="cr_ubtn" id="abrLarga" ${wiTip('Abrir')}><i class="fas fa-arrow-up-right-from-square"></i></button>
        </div>
      </div>
      ${esAuth() ? '' : '<p class="cr_nota"><i class="fas fa-triangle-exclamation"></i> Sin cuenta expiran en 30 días. <a href="/smile">Crear cuenta →</a></p>'}
    </div>
  </div>

  <div class="cr_der">
    <div class="cr_prev">
      <div class="cr_prev_cab">
        <h3><i class="fas fa-eye"></i> Vista previa</h3>
        <div class="cr_disps">
          <button class="cr_disp active" data-disp="movil" ${wiTip('Móvil')}><i class="fas fa-mobile-screen"></i></button>
          <button class="cr_disp" data-disp="escritorio" ${wiTip('Escritorio')}><i class="fas fa-desktop"></i></button>
        </div>
      </div>
      <div class="cr_marco" id="marco">
        <div class="cr_mini" id="miniVista">
          <p class="pv_lbl">Para ti</p>
          <h2 class="pv_nom" id="pvPara">___</h2>
          <span class="pv_cor">❤️</span>
          <p class="pv_msg" id="pvMsg">Tu mensaje aquí...</p>
          <p class="pv_de">Con amor, <span id="pvDe">Amigo</span></p>
        </div>
      </div>
    </div>
    <div class="cr_share">
      <div class="cr_url_row">
        <label><i class="fas fa-share-nodes"></i> Compartir</label>
        <div class="cr_share_btns">
          <a class="cr_sbtn cr_wa" id="compWA" href="#" target="_blank" ${wiTip('WhatsApp')}><i class="fab fa-whatsapp"></i></a>
          <a class="cr_sbtn cr_tg" id="compTG" href="#" target="_blank" ${wiTip('Telegram')}><i class="fab fa-telegram"></i></a>
          <button class="cr_sbtn cr_nt" id="compNat" ${wiTip('Copiar Link')}><i class="fa-solid fa-link"></i></button>
        </div>
      </div>
    </div>
  </div>
</div>`;

export const init = () => {
  let pl = 'Amor', linkTimer = null, autoTimer = null, autoInProgress = false;
  const auth = esAuth();

  // Cargar audios/imágenes del usuario
  if (auth) {
    import('../smile/agregar.js').then(async (mod) => {
      try {
        const [audios, imgs] = await Promise.all([mod.misAudios(), mod.misImagenes()]);
        $('#crMisAudios').html(renderMisChips(audios, 'crMisAud', 'headphones'));
        $('#crMisImgs').html(renderMisChips(imgs, 'crMisImg', 'image'));
      } catch (e) { console.error('Error cargando recursos:', e); }
    });
  }

  const getMusica = () => {
    const chip = $('input[name="crMusChip"]:checked');
    if (chip.length) return chip.val();
    const mis = $('input[name="crMisAud"]:checked');
    if (mis.length) return mis.val();
    return $('#cMusica').val().trim();
  };

  const getImg = () => {
    const mis = $('input[name="crMisImg"]:checked');
    if (mis.length) return mis.val();
    return $('#cImg').val().trim();
  };

  const vals = () => ({
    link: $('#cLink').val().trim().replace(/[^a-záéíóúñA-Z0-9]/gi, ''),
    de: $('#cDe').val().trim() || 'Amigo',
    para: $('#cPara').val().trim(),
    msg: $('#cMsg').val().trim(),
    musica: getMusica(),
    img: getImg()
  });

  const validarLink = async (id) => {
    if (!id || id.length < 3) return $('#linkStatus').html('<i class="fas fa-minus" style="color:var(--tx3)"></i>'), false;
    if (cache.has(id)) {
      const exists = cache.get(id);
      $('#linkStatus').html(exists ? '<i class="fas fa-circle-xmark" style="color:var(--error)"></i>' : '<i class="fas fa-circle-check" style="color:var(--success)"></i>');
      return !exists;
    }
    $('#linkStatus').html('<i class="fas fa-spinner fa-spin" style="color:var(--tx3)"></i>');
    try {
      const mod = auth ? await import('../smile/wiloves.js') : await import('../smile/publico.js');
      const exists = await mod.existe(id);
      cache.set(id, exists);
      $('#linkStatus').html(exists ? '<i class="fas fa-circle-xmark" style="color:var(--error)"></i>' : '<i class="fas fa-circle-check" style="color:var(--success)"></i>');
      return !exists;
    } catch {
      $('#linkStatus').html('<i class="fas fa-triangle-exclamation" style="color:var(--warning)"></i>');
      return false;
    }
  };

  const generarLinkAuto = async () => {
    if (autoInProgress || $('#cLink').val()) return;
    const { para } = vals();
    if (!para) return;
    autoInProgress = true;
    const base = para.toLowerCase().replace(/[^a-záéíóúñ0-9]/gi, '').substring(0, 12);
    if (base.length < 3) return autoInProgress = false;
    const hash = Date.now().toString(36).slice(-3);
    let link = base, cnt = 1;
    for (let i = 0; i < 30; i++) {
      if (await validarLink(link)) { $('#cLink').val(link).trigger('input'); autoInProgress = false; return; }
      link = i < 10 ? `${base}${cnt++}` : `${base}${hash}${cnt++}`;
    }
    Notificacion('Prueba otro nombre base 🙏', 'warning');
    autoInProgress = false;
  };

  const actVista = () => {
    const v = vals();
    const m = plantillas[pl] || plantillas.Amor;
    $('#pvDe').text(v.de);
    $('#pvPara').text(v.para || '___');
    $('#pvMsg').text(v.msg || 'Tu mensaje aquí...');
    $('#cCont').text(`${v.msg.length}/200`);
    $('#miniVista').css('background', m.b);
    $('#pvCor, .pv_cor').text(m.e);
    $('#urlLarga').val(v.para ? genURL(pl, v.de, v.para, v.msg, v.musica, v.img) : '');
  };

  const actShare = (url) => {
    const txt = encodeURIComponent(`💌 Mensaje especial: ${url}`);
    $('#compWA').attr('href', `https://wa.me/?text=${txt}`);
    $('#compTG').attr('href', `https://t.me/share/url?url=${encodeURIComponent(url)}&text=💌`);
  };

  const mejor = () => $('#urlCorta').val() || $('#urlLarga').val();

  // ✅ EVENTOS
  $(document).on('change.cr', '#selPlantilla', function () {
    pl = $(this).val();
    $('#crChipsWrap').html(renderChips(pl));
    $('input[name="crMusChip"]').prop('checked', false);
    $('#cMusica').val('');
    actVista();
  });

  // Music chips (predefinidos)
  $(document).on('change.cr', 'input[name="crMusChip"]', function () {
    $('#cMusica').val('');
    $('input[name="crMisAud"]').prop('checked', false);
    actVista();
  });

  // Mis audios (guardados)
  $(document).on('change.cr', 'input[name="crMisAud"]', function () {
    $('#cMusica').val('');
    $('input[name="crMusChip"]').prop('checked', false);
    actVista();
  });

  // Mis imágenes (guardadas)
  $(document).on('change.cr', 'input[name="crMisImg"]', function () {
    $('#cImg').val('');
    actVista();
  });

  $(document).on('input.cr', '#cMusica', function () {
    if ($(this).val().trim()) {
      $('input[name="crMusChip"]').prop('checked', false);
      $('input[name="crMisAud"]').prop('checked', false);
    }
    actVista();
  });

  $(document).on('input.cr', '#cImg', function () {
    if ($(this).val().trim()) $('input[name="crMisImg"]').prop('checked', false);
    actVista();
  });

  $(document).on('input.cr', '#cLink', function () {
    const v = $(this).val().replace(/[^a-záéíóúñA-Z0-9]/gi, '');
    $(this).val(v);
    clearTimeout(linkTimer);
    linkTimer = setTimeout(() => validarLink(v), 600);
  });

  $(document).on('input.cr', '#cPara', function () { actVista(); clearTimeout(autoTimer); autoTimer = setTimeout(() => generarLinkAuto(), 1000); });
  $(document).on('input.cr', '#cDe, #cMsg', actVista);

  $(document).on('click.cr', '.cr_disp', function () {
    $('.cr_disp').removeClass('active');
    $(this).addClass('active');
    $('#marco').toggleClass('escritorio', $(this).data('disp') === 'escritorio');
  });

  $(document).on('click.cr', '#copLarga, #abrLarga', function (e) {
    const url = $('#urlLarga').val();
    if (!url) return Notificacion('No hay enlace', 'warning');
    e.currentTarget.id === 'copLarga' ? wicopy(url, this, '¡Copiado!') : window.open(url, '_blank');
  });

  $(document).on('click.cr', '#guardarNube', async function () {
    const v = vals();
    if (!v.para) return Notificacion('Completa el nombre 💕', 'warning');

    if (!v.link) {
      await generarLinkAuto();
      v.link = $('#cLink').val().trim();
      if (!v.link) return Notificacion('No se pudo generar link', 'error');
    }

    if ($('#linkStatus').find('.fa-circle-xmark').length) {
      return Notificacion('Link ocupado, generando otro...', 'warning'), setTimeout(() => { $('#cLink').val(''); generarLinkAuto(); }, 500);
    }

    wiSpin(this, true);
    try {
      const mod = auth ? await import('../smile/wiloves.js') : await import('../smile/publico.js');
      const id = await mod.guardar(v.link, {
        plantilla: pls[pl],
        nombre: pl,
        de: v.de,
        para: v.para,
        msg: v.msg,
        musica: v.musica,
        img: v.img,
        emoji: plantillas[pl].e
      });

      if (!id) throw new Error('Link ocupado');

      cache.set(id, true);
      const url = auth ? genPrivada(id) : genPublica(id);
      $('#urlCorta').val(url);
      actShare(url);

      wicopy(url, this, '¡Copiado! ☁️');
      Notificacion('¡Enlace generado! 💌', 'success');
    } catch (e) {
      console.error(e);
      Notificacion(e.message || 'Error al guardar', 'error');
    } finally { wiSpin(this, false); }
  });

  $(document).on('click.cr', '#copCorta, #abrCorta', function (e) {
    const url = $('#urlCorta').val();
    if (!url) return Notificacion('Genera el enlace primero', 'warning');
    e.currentTarget.id === 'copCorta' ? wicopy(url, this, '¡Copiado!') : window.open(url, '_blank');
  });

  $(document).on('click.cr', '#compNat', (e) => {
    e.preventDefault();
    const url = mejor();
    if (!url) return Notificacion('Completa los campos 💕', 'warning');
    navigator.share ? navigator.share({ title: 'Lovewi 💌', text: 'Mensaje especial', url }) : wicopy(url, '#compNat', '¡Copiado!');
  });

  actVista();
};

export const cleanup = () => {
  $(document).off('.cr');
  cache.clear();
};