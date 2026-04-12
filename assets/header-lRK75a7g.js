const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/login-BcW4rGK8.css"])))=>i.map(i=>d[i]);
import{t as e}from"./vendor-BykwZZMm.js";import{c as t,h as n,t as r}from"./widev-xCaicnMn.js";import{t as i}from"./ruta-Ck6o1HPb.js";var a=t=>{r?.(`Bienvenido `+t.nombre),e(`.nv_right`).html(`
    <a href="/milab" class="nv_item" data-page="milab"><i class="fa-solid fa-graduation-cap"></i> <span>Mi Lab</span></a>
    <a href="/smile" class="nv_item" data-page="smile"><i class="fa-solid fa-dashboard"></i> <span>Dashboard</span></a>
    <a href="/mensajes" class="nv_item" data-page="mensajes"><i class="fa-solid fa-comments"></i> <span>Mensajes</span></a>
    <a href="/perfil" class="nv_item" data-page="perfil"><img src="${t.imagen||`./smile.avif`}" alt="${t.nombre}"><span>${t.nombre}</span></a>
    <button class="nv_item bt_salir" data-page="inicio"><i class="fa-solid fa-sign-out-alt"></i> <span>salir</span></button>
  `)},o=()=>{e(`.nv_right`).html(`
    <a href="/descubre" class="nv_item" data-page="descubre"><i class="fa-solid fa-gauge"></i> <span>Descubre </span></a>
    <button class="bt_auth registrar"><i class="fas fa-user-plus"></i><span>Registrar</span></button>
    <button class="bt_auth login"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>  
  `)};t.on(e=>e?a(e):(o(),i.navigate(`/`)));var s=t.user;s?a(s):o();var c=[`wiTema`,`wiSmart`,`wiFresh`];e(document).on(`click`,`.bt_salir`,async()=>{let{salir:e}=await n(async()=>{let{salir:e}=await import(`./login-DAV1k1Rv.js`);return{salir:e}},__vite__mapDeps([0]));e(c)}),e(document).on(`click`,`.bt_auth`,async function(){let{abrirLogin:t}=await n(async()=>{let{abrirLogin:e}=await import(`./login-DAV1k1Rv.js`);return{abrirLogin:e}},__vite__mapDeps([0]));t(e(this).hasClass(`registrar`)?`registrar`:`login`)});export{a as personal};