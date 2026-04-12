import{t as e}from"./vendor-BDh6mtVu.js";import{v as t}from"./widev-vIOvrNXT.js";import{wi as n}from"./wicode-BsA_Kl-l.js";import{wi as r}from"./wivista-slgOYkcn.js";import{wi as i}from"./wispin-BK1T-OjI.js";import{wi as a}from"./wiscroll-DFTLk0_L.js";import{wi as o}from"./wiauth-B2e3EiC8.js";import{wi as s}from"./wismart-Bol6CsHj.js";import{wi as c}from"./saludar-CX9LRf0Z.js";import{wi as l}from"./notificacion-GsMy3qoL.js";import{wi as u}from"./mensaje-Bmk0W8Fh.js";import{wi as d}from"./savels-CSdjWd--.js";import{wi as f}from"./getls-fieoebos.js";import{wi as p}from"./removels-Bob2-CPZ.js";import{wi as m}from"./witip-B5Q9b4vX.js";import{wi as h}from"./wiip-D3pWCSlu.js";import{wi as g}from"./widate-DWQjOZ92.js";import{wi as _}from"./wicopy-hWYRtaTa.js";import{wi as v}from"./wisuma-Uck7BSsP.js";var y=[n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v],b=e=>`
  <a href="#cp_${e.id}" class="cp_side_item" data-id="${e.id}" style="--cc:${e.color}">
    <i class="fas ${e.icon}"></i>
    <span>${e.nom}</span>
    <span class="cp_side_ver">v${e.fn.v}</span>
  </a>`,x=e=>`
  <section class="cp_card" id="cp_${e.id}" style="--cc:${e.color}" data-nom="${e.nom.toLowerCase()} ${e.id}">
    <div class="cp_card_head">
      <div class="cp_card_ico"><i class="fas ${e.icon}"></i></div>
      <div class="cp_card_info"><h3>${e.nom}</h3><span class="cp_badge">v${e.fn.v}</span></div>
      <a href="/${e.id}" class="cp_card_ver">Ver docs <i class="fas fa-arrow-right"></i></a>
    </div>
    <p class="cp_card_desc">${e.desc}</p>
    <div class="cp_demo">${e.demo()}</div>
    <div class="cp_code_wrap">
      <div class="cp_code_head"><span><i class="fas fa-code"></i> Uso rápido</span><span class="cp_lang">JS</span></div>
      <pre><code class="language-js">${e.code}</code></pre>
    </div>
  </section>`,S=()=>`
<div class="cp_wrap">

  <header class="cp_header">
    <div>
      <span class="cp_hero_tag"><i class="fas fa-cube"></i> Componentes UI</span>
      <h1 class="cp_hero_tit">Componentes <span class="cp_grad">listos para usar</span></h1>
      <p class="cp_hero_sub">Demos en vivo. Clic en "Ver docs" para documentación completa.</p>
    </div>
    <div class="cp_hstat">
      <span class="cp_hstat_n">${y.length}</span>
      <span>Componentes</span>
    </div>
  </header>

  <div class="cp_layout">
    <aside class="cp_sidebar">
      <div class="cp_side_title"><i class="fas fa-layer-group"></i> Componentes</div>
      ${y.map(b).join(``)}
    </aside>

    <div class="cp_content">
      <div class="cp_search_wrap">
        <i class="fas fa-search cp_search_ico"></i>
        <input id="cp_search" class="cp_search" type="text" placeholder="Buscar componente..." autocomplete="off">
        <span class="cp_search_count">${y.length} componentes</span>
      </div>
      <div class="cp_grid" id="cp_grid">
        ${y.map(x).join(``)}
      </div>
      <p class="cp_empty" style="display:none"><i class="fas fa-search"></i> Sin resultados</p>
    </div>
  </div>

</div>`,C=()=>{y.forEach(e=>e.main?.()),window.Prism&&Prism.highlightAll(),e(document).on(`click.comp`,`.cp_side_item`,function(t){t.preventDefault(),e(`.cp_side_item`).removeClass(`active`),e(this).addClass(`active`);let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},350)});let n=()=>{let t=e(window).scrollTop()+120;e(`.cp_card`).each(function(){let n=e(this).offset().top,r=n+e(this).outerHeight();if(t>=n&&t<r){let t=e(this).attr(`id`)?.replace(`cp_`,``);e(`.cp_side_item`).removeClass(`active`),e(`.cp_side_item[data-id="${t}"]`).addClass(`active`)}})};e(window).on(`scroll.comp`,n),n(),e(document).on(`input.comp`,`#cp_search`,function(){let t=e(this).val().toLowerCase().trim(),n=0;e(`.cp_card`).each(function(){let r=!t||e(this).data(`nom`).includes(t);e(this).toggle(r),r&&n++}),e(`.cp_search_count`).text(`${n} componente${n===1?``:`s`}`),e(`.cp_empty`).toggle(n===0)}),t(`.cp_card`,null,{anim:`wi_fadeUp`,stagger:100}),e(`.cp_side_item`).first().addClass(`active`)},w=()=>{e(document).off(`.comp`),e(window).off(`.comp`)};export{w as cleanup,C as init,S as render};