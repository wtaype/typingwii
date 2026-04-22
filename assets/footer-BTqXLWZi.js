import{t as e}from"./vendor-BDh6mtVu.js";import{a as t,n,o as r,t as i}from"./wii-CchEM3S9.js";function a(){let e=new Date;return`
  <footer class="foo wb txc psa">
    <span>Creado con <i class="fas fa-heart"></i> by <a class="ftx lkme" href="${r}" target="_blank">${n}</a></span>
    <span>${t} - <span class="wty">${e.getFullYear()}</span></span>
    <span class="abw"> | ${i} v14 | actualizado:
    <span class="wtu">${e.toLocaleString()}</span></span>
  </footer>
  `}e(`body`).append(a()),e(`head`).append(`<style>:root{--bgim:url("/typingwii/wpuntos.svg")}body{background: var(--bgim), var(--bg)}</style>`);var o=()=>`<div class="movil_divider"></div>${e(`.nv_right`).html()}`;e(`body`).append(`<div class="movil_overlay"></div>
<nav class="movil_drawer" role="navigation" aria-label="Menú móvil">
  <button class="movil_close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
  <div class="movil_logo"><i class="fas fa-heart"></i> ${i}</div>
  <div class="movil_nav">${e(`.winav`).html()}${o()}</div>
</nav>`),new MutationObserver(()=>{let t=e(`.movil_nav .movil_divider`);t.nextAll().remove(),t.remove(),e(`.movil_nav`).append(o())}).observe(e(`.nv_right`)[0],{childList:!0,subtree:!0});var s=()=>e(`body`).removeClass(`movil_open`);e(`.wimenu`).on(`click`,()=>e(`body`).addClass(`movil_open`)),e(`.movil_close, .movil_overlay`).on(`click`,s),e(document).on(`click`,`.movil_nav .nv_item, .movil_nav .bt_auth, .movil_nav .bt_salir`,s);export{a as footer};