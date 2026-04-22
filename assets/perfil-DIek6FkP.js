import{t as e}from"./vendor-BDh6mtVu.js";import{a as t,d as n,f as r,l as i,n as a,s as o}from"./widev-BFyzE1uG.js";import{m as s,u as c}from"./firebase-sojJ90-r.js";import{n as l}from"./firebase-BVXQ9QC5.js";var u=()=>n(`wiSmile`),d=[{n:`Cielo`,c:`#0EBEFF`},{n:`Dulce`,c:`#FF5C69`},{n:`Paz`,c:`#29C72E`},{n:`Oro`,c:`#FFDA34`},{n:`Mora`,c:`#7000FF`},{n:`Futuro`,c:`#21273B`}],f=[{v:`masculino`,lbl:`👨 Masculino`},{v:`femenino`,lbl:`👩 Femenino`},{v:`otro`,lbl:`⚧ Otro`}],p=[{ico:`fa-keyboard`,txt:`¡Cada tecla que pulsas te acerca a ser un experto! ⌨️`},{ico:`fa-bolt`,txt:`¡Tu velocidad mejora con cada práctica. Sigue así! 🚀`},{ico:`fa-bullseye`,txt:`¡La precisión es tu mejor herramienta. Sin errores! 🎯`},{ico:`fa-star`,txt:`¡Los mejores mecanógrafos empezaron como tú. Persevera! 🌟`},{ico:`fa-trophy`,txt:`¡Practica 15 minutos hoy y notarás la diferencia! 🏆`},{ico:`fa-fire`,txt:`¡Tu racha de práctica es imparable. Mantén el ritmo! 🔥`},{ico:`fa-hands-clapping`,txt:`¡Dedos ágiles, mente brillante. ¡Tú puedes! 👏`},{ico:`fa-rocket`,txt:`¡Más WPM cada día. La velocidad llega con constancia! 🚀`}],m=()=>p[Math.floor(Math.random()*p.length)],h=e=>o(`${e.nombre||``} ${e.apellidos||``}`.trim()||e.usuario||`U`),g=e=>e?.seconds?new Date(e.seconds*1e3).toISOString().split(`T`)[0]:``,_=()=>{let e=u();if(!e)return`
    <div class="pf_wrap">
      <div class="pf_empty">
        <i class="fas fa-user-lock"></i>
        <p>Sin sesión activa.</p>
      </div>
    </div>`;let n=m(),r=h(e),a=e.foto||`/typingwii/smile.avif`,[o]=(e.tema||`Cielo|#0EBEFF`).split(`|`),s=e.creado?.seconds?new Date(e.creado.seconds*1e3).toLocaleDateString(`es-PE`,{year:`numeric`,month:`long`,day:`numeric`}):`—`,c=g(e.fechaNacimiento);return`
  <div class="pf_wrap">

    <!-- ── HERO ─────────────────────────────────────────── -->
    <div class="pf_hero">
      <div class="pf_hero_bg"></div>
      <div class="pf_hero_content">

        <!-- Avatar con foto o inicial -->
        <div class="pf_avatar_wrap">
          <div class="pf_avatar_ring_pulse"></div>
          <div class="pf_avatar" id="pf_avatar_preview">
            ${e.foto?`<img src="${e.foto}" alt="Foto de perfil" class="pf_avatar_img"
                      onerror="this.parentElement.innerHTML='${r}'">`:`<img src="/typingwii/smile.avif" alt="Perfil" class="pf_avatar_img">`}
          </div>
        </div>

        <!-- Info principal -->
        <div class="pf_hero_info">
          <p class="pf_saludo">${t()}</p>
          <h1 class="pf_nombre">${e.nombre||`—`} ${e.apellidos||``}</h1>
          <div class="pf_tags">
            <span class="pf_tag"><i class="fas fa-at"></i> ${e.usuario||`—`}</span>
            <span class="pf_tag"><i class="fas fa-shield-halved"></i> ${e.rol||`smile`}</span>
            ${e.genero?`<span class="pf_tag"><i class="fas fa-venus-mars"></i> ${e.genero}</span>`:``}
            <span class="pf_tag pf_tag_tema" style="--tc: var(--${o}, #0EBEFF)">
              <i class="fas fa-circle"></i> ${o}
            </span>
          </div>
        </div>

        <!-- Meta -->
        <div class="pf_hero_meta">
          <div class="pf_meta_item"><i class="fas fa-calendar-day"></i><span>${i()}</span></div>
          <div class="pf_meta_item"><i class="fas fa-clock"></i><span>Desde ${s}</span></div>
          <div class="pf_meta_item"><i class="fas fa-envelope"></i><span>${e.email||`—`}</span></div>
        </div>

      </div>
    </div>

    <!-- ── MOTIVACIÓN ────────────────────────────────────── -->
    <div class="pf_motivacion" id="pf_motivacion">
      <div class="pf_mot_ico"><i class="fas ${n.ico}"></i></div>
      <p class="pf_mot_txt">${n.txt}</p>
      <button class="pf_mot_refresh" id="pf_refresh_msg" title="Nuevo mensaje">
        <i class="fas fa-arrows-rotate"></i>
      </button>
    </div>

    <!-- ── FORMULARIO INLINE ─────────────────────────────── -->
    <form class="pf_edit_form" id="pf_form_edit" novalidate>

      <div class="pf_form_header">
        <div class="pf_form_title_wrap">
          <div class="pf_form_ico"><i class="fas fa-user-pen"></i></div>
          <div>
            <div class="pf_form_title">Mis datos</div>
            <div class="pf_form_sub">Personaliza tu perfil de estudiante</div>
          </div>
        </div>
        <button type="submit" class="pf_save_btn" id="pf_btn_save">
          <i class="fas fa-check"></i> Guardar cambios
        </button>
      </div>

      <!-- Fila 1: Nombre + Apellidos -->
      <div class="pf_row">
        <div class="pf_field">
          <label class="pf_label" for="pf_nombre">
            <i class="fas fa-user"></i> Nombre
          </label>
          <input type="text" id="pf_nombre" name="nombre"
            class="pf_input" value="${e.nombre||``}"
            placeholder="Tu nombre" autocomplete="given-name" required>
        </div>
        <div class="pf_field">
          <label class="pf_label" for="pf_apellidos">
            <i class="fas fa-user"></i> Apellidos
          </label>
          <input type="text" id="pf_apellidos" name="apellidos"
            class="pf_input" value="${e.apellidos||``}"
            placeholder="Tus apellidos" autocomplete="family-name" required>
        </div>
      </div>

      <!-- Fila 2: Fecha nacimiento + Género -->
      <div class="pf_row">
        <div class="pf_field">
          <label class="pf_label" for="pf_fnac">
            <i class="fas fa-cake-candles"></i> Fecha de nacimiento
          </label>
          <input type="date" id="pf_fnac" name="fechaNacimiento"
            class="pf_input" value="${c}">
        </div>
        <div class="pf_field">
          <label class="pf_label" for="pf_genero">
            <i class="fas fa-venus-mars"></i> Género
          </label>
          <select id="pf_genero" name="genero" class="pf_input">
            <option value="">— Seleccionar —</option>
            ${f.map(t=>`
              <option value="${t.v}" ${e.genero===t.v?`selected`:``}>${t.lbl}</option>
            `).join(``)}
          </select>
        </div>
      </div>

      <!-- Fila 3: Foto + preview live -->
      <div class="pf_field">
        <label class="pf_label" for="pf_foto">
          <i class="fas fa-image"></i> URL de foto de perfil
        </label>
        <div class="pf_foto_row">
          <img class="pf_foto_preview" id="pf_foto_preview"
            src="${a}" alt="Preview"
            onerror="this.src='/typingwii/smile.avif'">
          <input type="url" id="pf_foto" name="foto"
            class="pf_input" value="${e.foto||``}"
            placeholder="https://... (opcional)">
        </div>
      </div>

      <!-- Fila 4: Solo lectura -->
      <div class="pf_row">
        <div class="pf_field">
          <label class="pf_label"><i class="fas fa-at"></i> Usuario</label>
          <input type="text" class="pf_input pf_readonly" value="${e.usuario||`—`}" readonly>
        </div>
        <div class="pf_field">
          <label class="pf_label"><i class="fas fa-envelope"></i> Correo</label>
          <input type="email" class="pf_input pf_readonly" value="${e.email||`—`}" readonly>
        </div>
      </div>

      <!-- Selector de temas -->
      <div class="pf_field">
        <label class="pf_label"><i class="fas fa-palette"></i> Tema de color</label>
        <div class="pf_temas_row">
          ${d.map(e=>`
            <label class="pf_tema_btn ${o===e.n?`pf_tema_active`:``}" title="${e.n}">
              <input type="radio" name="tema" value="${e.n}|${e.c}" ${o===e.n?`checked`:``}>
              <span class="pf_tema_dot" style="background:${e.c}"></span>
              <span class="pf_tema_txt">${e.n}</span>
            </label>
          `).join(``)}
        </div>
      </div>

    </form>

  </div>`},v=()=>{e(document).off(`click.pfmsg`).on(`click.pfmsg`,`#pf_refresh_msg`,function(){let t=m(),n=e(`#pf_motivacion`);n.addClass(`pf_fade_out`),setTimeout(()=>{n.find(`.pf_mot_ico i`).attr(`class`,`fas ${t.ico}`),n.find(`.pf_mot_txt`).text(t.txt),n.removeClass(`pf_fade_out`).addClass(`pf_fade_in`),setTimeout(()=>n.removeClass(`pf_fade_in`),400)},280)}),e(document).off(`input.pffoto`).on(`input.pffoto`,`#pf_foto`,function(){let t=e(this).val().trim(),n=`/typingwii/smile.avif`,r=e(`#pf_foto_preview`);t?r.attr(`src`,t).on(`error`,function(){e(this).attr(`src`,n)}):r.attr(`src`,n)}),e(document).off(`change.pftheme`).on(`change.pftheme`,`input[name="tema"]`,function(){e(`.pf_tema_btn`).removeClass(`pf_tema_active`),e(this).closest(`.pf_tema_btn`).addClass(`pf_tema_active`)}),e(document).off(`submit.pfsave`).on(`submit.pfsave`,`#pf_form_edit`,async function(t){t.preventDefault();let n=e(`#pf_btn_save`),i=u();if(!i)return;let o=new FormData(this),d=o.get(`nombre`)?.trim(),f=o.get(`apellidos`)?.trim(),p=o.get(`tema`),m=o.get(`foto`)?.trim()||``,h=o.get(`genero`)||``,g=o.get(`fechaNacimiento`);if(!d)return a(`Por favor ingresa tu nombre.`,`warning`);if(!f)return a(`Por favor ingresa tus apellidos.`,`warning`);if(!p)return a(`Selecciona un tema de color.`,`warning`);let y=g?{seconds:Math.floor(new Date(g).getTime()/1e3),nanoseconds:0}:i.fechaNacimiento||null;n.prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Guardando...`);try{let t={nombre:d,apellidos:f,tema:p,foto:m,genero:h,fechaNacimiento:y};await c(s(l,`smiles`,i.usuario),t),r(`wiSmile`,{...i,...t},24),a(`¡Perfil actualizado! 🎉`,`success`),setTimeout(()=>{let t=e(`#perfil`);t.length&&(t.html(_()),v())},500)}catch(e){console.error(`[perfil] Error:`,e),a(`No se pudo guardar. Intenta de nuevo.`,`error`)}finally{n.prop(`disabled`,!1).html(`<i class="fas fa-check"></i> Guardar cambios`)}})},y=()=>{e(document).off(`click.pfmsg input.pffoto change.pftheme submit.pfsave`)};export{y as cleanup,v as init,_ as render};