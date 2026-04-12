import{t as e}from"./ruta-36YAVysF.js";import{t}from"./vendor-BDh6mtVu.js";import{_ as n,c as r,o as i,t as a,y as o}from"./widev-vIOvrNXT.js";import{s,u as c}from"./firebase-D6Mg1KLq.js";import{db as l}from"./firebase-C6ZXw370.js";var u=()=>i(`wiSmile`)||{},d=()=>{let e=u();if(!e.email)return location.replace(`/`),``;let t=e.nombre||``,r=e.apellidos||``,i=e.usuario||``,a=e.email||``,o=e.rol||`smile`,s=e.uid||``,c=e.imagen||`./smile.avif`;return((t[0]||``)+(r[0]||``)).toUpperCase(),`
  <div class="prf_wrap">

    <div class="prf_hero">
      <div class="prf_av_wrap">
        <img src="${c}" alt="${t}" class="prf_av" onerror="this.src='./smile.avif'">
        <div class="prf_av_ring"></div>
      </div>
      <div class="prf_hero_info">
        <h1 class="prf_fullname">${t} ${r}</h1>
        <p class="prf_username"><i class="fas fa-at"></i> ${i}</p>
        <span class="prf_rol_chip"><i class="fas fa-shield-alt"></i> ${o}</span>
      </div>
    </div>

    <div class="prf_grid">

      <div class="prf_card">
        <h2 class="prf_card_tit"><i class="fas fa-user-edit"></i> Editar perfil</h2>
        <label>Nombre</label>
        <input id="prf_nombre"    value="${t}"    placeholder="Tu nombre">
        <label>Apellidos</label>
        <input id="prf_apellidos" value="${r}" placeholder="Tus apellidos">
        <button id="prf_guardar" class="prf_btn"><i class="fas fa-save"></i> Guardar cambios</button>
      </div>

      <div class="prf_card">
        <h2 class="prf_card_tit"><i class="fas fa-info-circle"></i> Datos de cuenta</h2>
        <div class="prf_row">
          <span class="prf_lbl"><i class="fas fa-envelope"></i> Email</span>
          <span class="prf_val">${a}</span>
        </div>
        <div class="prf_row">
          <span class="prf_lbl"><i class="fas fa-user"></i> Usuario</span>
          <span class="prf_val">@${i}</span>
        </div>
        <div class="prf_row">
          <span class="prf_lbl"><i class="fas fa-shield-alt"></i> Rol</span>
          <span class="prf_val prf_rol_val">${o}</span>
        </div>
        <div class="prf_row prf_uid_row">
          <span class="prf_lbl"><i class="fas fa-fingerprint"></i> UID</span>
          <span class="prf_uid_val">${s}</span>
          <button class="prf_copy" id="prf_copy_uid" ${n(`Copiar UID`)}><i class="fas fa-copy"></i></button>
        </div>
      </div>

    </div>
  </div>`},f=()=>{if(!u().email)return e.navigate(`/`);t(document).on(`click.prf`,`#prf_guardar`,async function(){let e=u(),i=t(`#prf_nombre`).val().trim(),o=t(`#prf_apellidos`).val().trim();if(!i)return n(document.getElementById(`prf_nombre`),`Ingresa tu nombre`,`error`);t(this).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Guardando`);try{await s(c(l,`smiles`,e.usuario),{nombre:i,apellidos:o}),r(`wiSmile`,{...e,nombre:i,apellidos:o},24),t(`.prf_fullname`).text(`${i} ${o}`),a(`Perfil actualizado ✅`,`success`)}catch{a(`Error al guardar`,`error`)}finally{t(this).prop(`disabled`,!1).html(`<i class="fas fa-save"></i> Guardar cambios`)}}).on(`click.prf`,`#prf_copy_uid`,function(){o(u().uid||``,this,`¡UID copiado!`)})},p=()=>t(document).off(`.prf`);export{p as cleanup,f as init,d as render};