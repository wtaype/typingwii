import{a as e,n as t,o as n,t as r}from"./wii-CZYUy4T7.js";import{t as i}from"./vendor-BDh6mtVu.js";function a(){let i=new Date;return`
  <footer class="foo wb txc psa">
    <span>Creado con <i class="fas fa-heart"></i> by <a class="ftx lkme" href="${n}" target="_blank">${t}</a></span>
    <span>${e} - <span class="wty">${i.getFullYear()}</span></span>
    <span class="abw"> | ${r} v11 | actualizado:
    <span class="wtu">${i.toLocaleString()}</span></span>
  </footer>
  `}i(`body`).append(a()),i(`head`).append(`<style>:root{--bgim:url("/typingwii/v11/wpuntos.svg")}body{background: var(--bgim), var(--bg)}</style>`);var o=()=>`<div class="movil_divider"></div>${i(`.nv_right`).html()}`;i(`body`).append(`<div class="movil_overlay"></div>
<nav class="movil_drawer" role="navigation" aria-label="Menú móvil">
  <button class="movil_close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
  <div class="movil_logo"><i class="fas fa-heart"></i> ${r}</div>
  <div class="movil_nav">${i(`.winav`).html()}${o()}</div>
</nav>`),new MutationObserver(()=>{let e=i(`.movil_nav .movil_divider`);e.nextAll().remove(),e.remove(),i(`.movil_nav`).append(o())}).observe(i(`.nv_right`)[0],{childList:!0,subtree:!0});var s=()=>i(`body`).removeClass(`movil_open`);i(`.wimenu`).on(`click`,()=>i(`body`).addClass(`movil_open`)),i(`.movil_close, .movil_overlay`).on(`click`,s),i(document).on(`click`,`.movil_nav .nv_item, .movil_nav .bt_auth, .movil_nav .bt_salir`,s);export{a as footer};