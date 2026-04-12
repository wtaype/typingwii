const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/login-BcW4rGK8.css"])))=>i.map(i=>d[i]);
import{n as e,t}from"./ruta-CdwgGk9K.js";import{t as n}from"./vendor-BDh6mtVu.js";import{l as r,t as i}from"./widev-vIOvrNXT.js";var a=e=>{i(`Bienvenido `+e.nombre),n(`.nv_right`).html(`
    <a href="/milab" class="nv_item" data-page="milab"><i class="fa-solid fa-graduation-cap"></i> <span>Mi Lab</span></a>
    <a href="/smile" class="nv_item" data-page="smile"><i class="fa-solid fa-comments"></i> <span>Mensajes</span></a>
    <a href="/perfil" class="nv_item" data-page="perfil"><img src="${e.imagen||`./smile.avif`}" alt="${e.nombre}"><span>${e.nombre}</span></a>
    <button class="nv_item bt_salir" data-page="inicio"><i class="fa-solid fa-sign-out-alt"></i> <span>salir</span></button>
  `)};r.on(e=>e?a(e):t.navigate(`/`));var o=r.user;o&&a(o);var s=[`wiTema`,`wiSmart`,`wiFresh`];n(document).on(`click.hdr`,`.bt_salir`,async()=>{let{salir:t}=await e(async()=>{let{salir:e}=await import(`./login-BPhpaVJv.js`);return{salir:e}},__vite__mapDeps([0]));t(s)}),e(()=>import(`./login-BPhpaVJv.js`),__vite__mapDeps([0]));export{a as personal};