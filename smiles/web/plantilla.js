import './plantilla.css';
import $ from 'jquery';
import { plantillas, categorias, porCategoria, nombres } from '../parametros.js';

export const render = () => {
  const cats = categorias();
  const total = nombres().length;

  return `
<div class="plantilla">
  <div class="pl_hero">
    <div class="pl_hero_contenido">
      <h1 class="pl_titulo"><i class="fas fa-palette"></i> Nuestras <span class="gradiente">Plantillas</span></h1>
      <p class="pl_subtitulo">Elige el estilo perfecto para expresar lo que sientes. Cada plantilla está diseñada para emocionar.</p>
      <div class="pl_stats">
        <div class="stat"><i class="fas fa-layer-group"></i> ${total} plantillas</div>
        <div class="stat"><i class="fas fa-tags"></i> ${cats.length} categorías</div>
        <div class="stat"><i class="fas fa-music"></i> Con música</div>
      </div>
    </div>
  </div>

  <div class="pl_galeria">
    <div class="pl_filtros">
      <button class="pl_filtro active" data-cat="Todas"><i class="fas fa-border-all"></i> Todas</button>
      ${cats.map(c => `<button class="pl_filtro" data-cat="${c}"><i class="fas fa-tag"></i> ${c}</button>`).join('')}
    </div>
    <div class="pl_grid" id="plGrid">
      ${nombres().map(n => card(n)).join('')}
    </div>
  </div>

  <div class="pl_cta">
    <div class="pl_cta_contenido">
      <div class="pl_cta_icono">💌</div>
      <h2>¿Listo para emocionar?</h2>
      <p>Elige tu plantilla favorita y crea un mensaje inolvidable en segundos</p>
      <a href="/crear" class="pl_cta_btn"><i class="fas fa-wand-magic-sparkles"></i> Crear mensaje</a>
    </div>
  </div>
</div>`;
};

const card = (n) => {
  const p = plantillas[n];
  return `
<div class="pl_card" data-cat="${p.k}" data-nombre="${n}">
  <div class="pl_card_preview" style="background:${p.b}">
    ${p.mu ? '<div class="pl_card_music"><i class="fas fa-music"></i></div>' : ''}
    <i class="fas ${p.i} pl_card_icono"></i>
    <div class="pl_card_mini">
      <span class="pl_mini_label">Para ti</span>
      <span class="pl_mini_nombre">${n}</span>
      <span class="pl_mini_emoji">${p.e}</span>
    </div>
  </div>
  <div class="pl_card_contenido">
    <div class="pl_card_header">
      <h3><i class="fas ${p.i}" style="color:${p.x}"></i> ${n}</h3>
      <span class="pl_card_badge">${p.k}</span>
    </div>
    <p class="pl_card_desc">${p.d}</p>
    <div class="pl_card_ejemplo">
      <i class="fas fa-quote-left"></i>
      <p>${p.ej}</p>
    </div>
    <div class="pl_card_footer">
      <a href="/crear" class="pl_btn_usar" data-pl="${n}"><i class="fas fa-plus"></i> Usar</a>
      <button class="pl_btn_preview" data-pl="${n}" data-tip="Vista previa"><i class="fas fa-eye"></i></button>
    </div>
  </div>
</div>`;
};

export const init = () => {
  // ✅ Animación entrada con observer
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  $('.pl_card').each((_, el) => obs.observe(el));

  // ✅ Filtros
  $(document).on('click.plg', '.pl_filtro', function () {
    const cat = $(this).data('cat');
    $('.pl_filtro').removeClass('active');
    $(this).addClass('active');

    $('.pl_card').each(function () {
      const show = cat === 'Todas' || $(this).data('cat') === cat;
      $(this).stop().animate({ opacity: 0 }, 150, function () {
        $(this).toggle(show);
        if (show) $(this).animate({ opacity: 1 }, 250);
      });
    });
  });

  // ✅ Preview - genera URL directa de ejemplo
  $(document).on('click.plg', '.pl_btn_preview', function () {
    const n = $(this).data('pl');
    const p = plantillas[n];
    const url = `${location.origin}/?${n}&de=Lovewi&para=Alguien+especial&msg=${encodeURIComponent(p.ej)}${p.mu ? `&musica=${encodeURIComponent(p.mu)}` : ''}`;
    window.open(url, '_blank');
  });

  // ✅ Usar - va a crear con plantilla preseleccionada
  $(document).on('click.plg', '.pl_btn_usar', function (e) {
    e.preventDefault();
    const pl = $(this).data('pl');
    sessionStorage.setItem('wiPlantilla', pl);
    history.pushState({}, '', '/crear');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
};

export const cleanup = () => {
  $(document).off('.plg');
};