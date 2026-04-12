import './componentes.css';
import $ from 'jquery';
import { wiVista } from '../widev.js';

import { wi as wicode }       from './componentes/wicode.js';
import { wi as wivista }      from './componentes/wivista.js';
import { wi as wispin }       from './componentes/wispin.js';
import { wi as wiscroll }     from './componentes/wiscroll.js';
import { wi as wiauth }       from './componentes/wiauth.js';
import { wi as wismart }      from './componentes/wismart.js';
import { wi as saludar }      from './componentes/saludar.js';
import { wi as notificacion } from './componentes/notificacion.js';
import { wi as mensaje }      from './componentes/mensaje.js';
import { wi as savels }       from './componentes/savels.js';
import { wi as getls }        from './componentes/getls.js';
import { wi as removels }     from './componentes/removels.js';
import { wi as witip }        from './componentes/witip.js';
import { wi as wiip }         from './componentes/wiip.js';
import { wi as widate }       from './componentes/widate.js';
import { wi as wicopy }       from './componentes/wicopy.js';
import { wi as wisuma }       from './componentes/wisuma.js';

const WI = [wicode,wivista,wispin,wiscroll,wiauth,wismart,saludar,notificacion,mensaje,savels,getls,removels,witip,wiip,widate,wicopy,wisuma];


const compSide = w => `
  <a href="#cp_${w.id}" class="cp_side_item" data-id="${w.id}" style="--cc:${w.color}">
    <i class="fas ${w.icon}"></i>
    <span>${w.nom}</span>
    <span class="cp_side_ver">v${w.fn.v}</span>
  </a>`;

const compCard = w => `
  <section class="cp_card" id="cp_${w.id}" style="--cc:${w.color}" data-nom="${w.nom.toLowerCase()} ${w.id}">
    <div class="cp_card_head">
      <div class="cp_card_ico"><i class="fas ${w.icon}"></i></div>
      <div class="cp_card_info"><h3>${w.nom}</h3><span class="cp_badge">v${w.fn.v}</span></div>
      <a href="/${w.id}" class="cp_card_ver">Ver docs <i class="fas fa-arrow-right"></i></a>
    </div>
    <p class="cp_card_desc">${w.desc}</p>
    <div class="cp_demo">${w.demo()}</div>
    <div class="cp_code_wrap">
      <div class="cp_code_head"><span><i class="fas fa-code"></i> Uso rápido</span><span class="cp_lang">JS</span></div>
      <pre><code class="language-js">${w.code}</code></pre>
    </div>
  </section>`;

export const render = () => `
<div class="cp_wrap">

  <header class="cp_header">
    <div>
      <span class="cp_hero_tag"><i class="fas fa-cube"></i> Componentes UI</span>
      <h1 class="cp_hero_tit">Componentes <span class="cp_grad">listos para usar</span></h1>
      <p class="cp_hero_sub">Demos en vivo. Clic en "Ver docs" para documentación completa.</p>
    </div>
    <div class="cp_hstat">
      <span class="cp_hstat_n">${WI.length}</span>
      <span>Componentes</span>
    </div>
  </header>

  <div class="cp_layout">
    <aside class="cp_sidebar">
      <div class="cp_side_title"><i class="fas fa-layer-group"></i> Componentes</div>
      ${WI.map(compSide).join('')}
    </aside>

    <div class="cp_content">
      <div class="cp_search_wrap">
        <i class="fas fa-search cp_search_ico"></i>
        <input id="cp_search" class="cp_search" type="text" placeholder="Buscar componente..." autocomplete="off">
        <span class="cp_search_count">${WI.length} componentes</span>
      </div>
      <div class="cp_grid" id="cp_grid">
        ${WI.map(compCard).join('')}
      </div>
      <p class="cp_empty" style="display:none"><i class="fas fa-search"></i> Sin resultados</p>
    </div>
  </div>

</div>`;

export const init = () => {
  WI.forEach(w => w.main?.());
  if (window.Prism) Prism.highlightAll();

  // Sidebar nav
  $(document).on('click.comp', '.cp_side_item', function(e) {
    e.preventDefault();
    $('.cp_side_item').removeClass('active');
    $(this).addClass('active');
    const t = $($(this).attr('href'));
    if (t.length) $('html,body').animate({ scrollTop: t.offset().top - 80 }, 350);
  });

  // Scroll spy
  const spy = () => {
    const st = $(window).scrollTop() + 120;
    $('.cp_card').each(function() {
      const top = $(this).offset().top, bot = top + $(this).outerHeight();
      if (st >= top && st < bot) {
        const id = $(this).attr('id')?.replace('cp_','');
        $('.cp_side_item').removeClass('active');
        $(`.cp_side_item[data-id="${id}"]`).addClass('active');
      }
    });
  };
  $(window).on('scroll.comp', spy); spy();

  // Buscador
  $(document).on('input.comp', '#cp_search', function() {
    const q = $(this).val().toLowerCase().trim();
    let vis = 0;
    $('.cp_card').each(function() {
      const match = !q || $(this).data('nom').includes(q);
      $(this).toggle(match);
      if (match) vis++;
    });
    $('.cp_search_count').text(`${vis} componente${vis !== 1 ? 's' : ''}`);
    $('.cp_empty').toggle(vis === 0);
  });

  wiVista('.cp_card', null, { anim: 'wi_fadeUp', stagger: 100 });
  $('.cp_side_item').first().addClass('active');
};

export const cleanup = () => {
  $(document).off('.comp');
  $(window).off('.comp');
};