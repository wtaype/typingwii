import{t as e}from"./vendor-BDh6mtVu.js";import{c as t,d as n,f as r,g as i,n as a,o,p as s,v as c}from"./widev-C_asVASQ.js";import{r as l}from"./ruta-BxlEyP66.js";import{C as u,S as d,_ as f,b as p,c as m,d as h,g,i as _,l as v,m as y,p as b,r as x,x as S,y as C}from"./firebase-sojJ90-r.js";import{n as w,t as T}from"./firebase-IxF1L4zF.js";var E={db:`smiles`,pagina:`rol`},D=`si`,O=`si`,k=`si`,A=`si`,j={smile:`/smile`,gestor:`/gestor`,empresa:`/empresa`,admin:`/admin`},M={"auth/email-already-in-use":`Email ya registrado`,"auth/weak-password":`Contraseña débil (mín. 6)`,"auth/invalid-credential":`Contraseña incorrecta`,"auth/invalid-email":`Email no válido`,"auth/missing-email":`Usuario no registrado`,"auth/too-many-requests":`Demasiados intentos`},N={regEmail:[e=>e.toLowerCase().trim(),e=>/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e)||`Email inválido`],regUsuario:[e=>e.toLowerCase().replace(/[^a-z0-9_]/g,``).trim(),e=>e.length>=4||`Mínimo 4 caracteres`],regNombre:[e=>e.trim(),e=>e.length>0||`Ingresa tu nombre`],regApellidos:[e=>e.trim(),e=>e.length>0||`Ingresa tus apellidos`],regPassword:[e=>e,e=>e.length>=6||`Mínimo 6 caracteres`],regPassword1:[e=>e,t=>t===e(`#regPassword`).val()||`No coinciden`]},P=(e,t,n,r,i=!1)=>`<div class="wilg_grupo"><i class="fas fa-${e}"></i><input type="${t}" id="${n}" placeholder="${r}" autocomplete="off">${i?`<i class="fas fa-eye wilg_ojo"></i>`:``}</div>`,F=(e=`smile`)=>e===`smile`?`
    <div class="wilg_rol_extra" id="rolExtra">
      <div class="wilg_extra_label"><i class="fas fa-users"></i> ¿Tienes un código de clase?</div>
      <div class="wilg_extra_opts">
        <label class="wilg_extra_opt active" data-opt="personal">
          <input type="radio" name="regExtra" value="personal" checked>
          <i class="fas fa-user"></i> Personal
        </label>
        <label class="wilg_extra_opt" data-opt="clase">
          <input type="radio" name="regExtra" value="clase">
          <i class="fas fa-users"></i> Unirme a clase
        </label>
      </div>
      <div class="wilg_extra_field hidden" id="extraField">
        ${P(`key`,`text`,`regCodigo`,`Código de clase (ej: ABC123)`)}
      </div>
    </div>`:e===`gestor`?`
    <div class="wilg_rol_extra" id="rolExtra">
      <div class="wilg_extra_label"><i class="fas fa-chalkboard-teacher"></i> ¿Cómo quieres empezar?</div>
      <div class="wilg_extra_opts">
        <label class="wilg_extra_opt active" data-opt="crear">
          <input type="radio" name="regExtra" value="crear" checked>
          <i class="fas fa-plus-circle"></i> Crear mi grupo
        </label>
        <label class="wilg_extra_opt" data-opt="unir">
          <input type="radio" name="regExtra" value="unir">
          <i class="fas fa-building"></i> Unirme a empresa
        </label>
      </div>
      <div class="wilg_extra_field hidden" id="extraField">
        ${P(`building`,`text`,`regRuc`,`RUC de la empresa`)}
      </div>
      <div class="wilg_info_badge"><i class="fas fa-info-circle"></i> Tu cuenta de gestor será activada por el administrador.</div>
    </div>`:e===`empresa`?`
    <div class="wilg_rol_extra" id="rolExtra">
      <div class="wilg_extra_label"><i class="fas fa-building"></i> Datos de tu empresa</div>
      <div class="wilg_extra_field wilg_extra_2col" id="extraField">
        ${P(`id-card`,`text`,`regRuc`,`RUC (11 dígitos)`)}
        ${P(`building`,`text`,`regEmpresaNombre`,`Nombre de la empresa`)}
      </div>
      <div class="wilg_info_badge"><i class="fas fa-info-circle"></i> Tu cuenta empresarial será verificada y activada en 24h.</div>
    </div>`:``,I={login:()=>`
    <div class="wilg_head">
      <div class="wilg_logo"><img src="./smile.avif" alt="TypingWii"></div>
      <h2>Bienvenido</h2><p>Inicia sesión en tu cuenta</p>
    </div>
    ${P(`envelope`,`text`,`email`,`Email o usuario`)}
    ${P(`lock`,`password`,`password`,`Contraseña`,!0)}
    <button type="button" id="Login" class="wilg_btn inactivo"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</button>
    ${k===`si`||A===`si`?`<div class="wilg_links">
      ${k===`si`?`<span class="wilg_rec"><i class="fas fa-key"></i> ¿Olvidaste tu contraseña?</span>`:``}
      ${A===`si`?`<span class="wilg_reg">Crear cuenta <i class="fas fa-arrow-right"></i></span>`:``}
    </div>`:``}`,registrar:()=>`
    <div class="wilg_head">
      <div class="wilg_logo"><img src="./smile.avif" alt="TypingWii"></div>
      <h2>Crear Cuenta</h2><p>Únete a la comunidad</p>
    </div>
    <div class="wilg_grid">
      ${[[`envelope`,`email`,`regEmail`,`Email`],[`user`,`text`,`regUsuario`,`Usuario`],[`user-tie`,`text`,`regNombre`,`Nombre`],[`user-tie`,`text`,`regApellidos`,`Apellidos`]].map(([e,t,n,r])=>P(e,t,n,r)).join(``)}
      ${P(`lock`,`password`,`regPassword`,`Contraseña`,!0)}
      ${P(`lock`,`password`,`regPassword1`,`Confirmar contraseña`,!0)}
    </div>

    <!-- ── SELECTOR DE ROL ─────────────────── -->
    <div class="wilg_rol_selector">
      <div class="wilg_rol_label"><i class="fas fa-id-badge"></i> Tipo de cuenta</div>
      <div class="wilg_rol_tabs">
        <button type="button" class="wilg_rol_tab active" data-rol="smile">
          <i class="fas fa-graduation-cap"></i>
          <span>Estudiante</span>
        </button>
        <button type="button" class="wilg_rol_tab" data-rol="gestor">
          <i class="fas fa-chalkboard-teacher"></i>
          <span>Profesor</span>
        </button>
        <button type="button" class="wilg_rol_tab" data-rol="empresa">
          <i class="fas fa-building"></i>
          <span>Empresa</span>
        </button>
      </div>
    </div>
    ${F(`smile`)}
    <!-- ─────────────────────────────────────── -->

    <div class="wilg_check">
      <label><input type="checkbox" id="regTerminos">
      <span>Acepto los <a href="/terminos.html" target="_blank">términos y condiciones</a></span></label>
    </div>
    <button type="button" id="Registrar" class="wilg_btn inactivo"><i class="fas fa-user-plus"></i> Registrarme</button>
    <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Ya tengo cuenta</span></div>`,restablecer:()=>`
    <div class="wilg_head">
      <div class="wilg_logo wilg_logo_sm"><img src="./smile.avif" alt="TypingWii"></div>
      <h2>Recuperar</h2><p>Te enviaremos un enlace a tu email</p>
    </div>
    ${P(`envelope`,`text`,`recEmail`,`Email o usuario`)}
    <button type="button" id="Recuperar" class="wilg_btn"><i class="fas fa-paper-plane"></i> Enviar enlace</button>
    <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Volver</span></div>`},L=(e,t=``)=>`<div id="wilg_modal" class="wiModal wilg_mod ${t}"><div class="modalBody"><button class="modalX">&times;</button>
   <form id="liForm">${I[e]()}</form></div></div>`,R=(t=`login`)=>{e(`#wilg_modal`).remove();let n=t===`registrar`?`wilg_mod_reg`:``;e(`body`).append(L(t,n)),setTimeout(()=>{o(`wilg_modal`),e(`#liForm input:first`).focus()},50)},z=t=>{let n=t===`registrar`?`wilg_mod_reg`:``;e(`#wilg_modal`).toggleClass(`wilg_mod_reg`,n===`wilg_mod_reg`),e(`#liForm`).html(I[t]()).attr(`data-vista`,t),setTimeout(()=>e(`#liForm input:first`).focus(),30)},B=()=>O!==`si`||s.user?``:`<div class="wilg_wrap"><div class="wilg_card"><form id="liForm"></form></div></div>`,V=()=>{if(O!==`si`){setTimeout(()=>l.navigate(`/`),0);return}let e=s.user;if(e){setTimeout(()=>l.navigate(j[e.rol]||`/`),0);return}H(`login`)},H=t=>{e(`#liForm`).html(I[t]()).attr(`data-vista`,t),setTimeout(()=>e(`#liForm input:first`).focus(),30)},U=t=>e(`#${t}`).val().trim(),W=()=>e(`#wilg_modal.active`).length>0,G=e=>W()?z(e):H(e),K=async(e,t,n)=>{i(e,!0,t);try{await n()}catch(e){a(M[e.code]||e.message,`error`)}finally{i(e,!1)}},q=async e=>{if(e.includes(`@`))return{email:e,wi:null};let t=await x(y(w,`smiles`,e));if(!t.exists())throw Error(`Usuario no encontrado`);return{email:t.data().email,wi:t.data()}},J=t=>{if(!t)return;let[n,r]=t.split(`|`);document.documentElement.dataset.theme=n,e(`meta[name="theme-color"]`).attr(`content`,r),e(`.tema`).removeClass(`mtha`).filter(`[data-ths="${t}"]`).addClass(`mtha`)},Y=e=>{if(E.pagina===`actual`)return;let t=E.pagina===`rol`?j[e?.rol]||`/`:E.pagina;l.navigate(t)},X=e=>{s.login(e,7),e?.tema&&(localStorage.wiTema=e.tema,J(e.tema)),W()&&t(),Y(e)};e(document).on(`submit.wi`,`#liForm`,e=>e.preventDefault()).on(`click.wi`,`.wilg_ojo`,function(){let t=e(this).siblings(`input`);t.attr(`type`,t.attr(`type`)===`password`?`text`:`password`),e(this).toggleClass(`fa-eye fa-eye-slash`)}).on(`input.wi`,`#email,#recEmail,#regEmail,#regUsuario`,function(){e(this).val(e(this).val().toLowerCase())}).on(`click.wi`,`.wilg_reg`,()=>{A===`si`&&G(`registrar`)}).on(`click.wi`,`.wilg_rec`,()=>{k===`si`&&G(`restablecer`)}).on(`click.wi`,`.wilg_log`,()=>G(`login`)).on(`input.wi keyup.wi`,`#password`,t=>{e(`#Login`).removeClass(`inactivo`),t.key===`Enter`&&e(`#Login`).click()}).on(`input.wi keyup.wi`,`#regPassword1`,t=>{e(`#Registrar`).removeClass(`inactivo`),t.key===`Enter`&&e(`#Registrar`).click()}).on(`input.wi keyup.wi`,`#recEmail`,t=>{t.key===`Enter`&&e(`#Recuperar`).trigger(`click`)}).on(`blur.wi`,Object.keys(N).map(e=>`#${e}`).join(`,`),function(){let t=e(this).val();if(!t)return;let[n,r]=N[this.id],i=n(t);e(this).val(i);let a=r(i);a!==!0&&c(this,a,`error`,2500)}).on(`blur.wi`,`#regUsuario`,async function(){let t=U(`regUsuario`);if(!t||t.length<3)return;if(t.includes(`@`))return e(this).data(`ok`,!1),c(this,`No puede contener @`,`error`,2500);let n=!(await x(y(w,`smiles`,t))).exists();e(this).data(`ok`,n),c(this,`Usuario ${n?`disponible <i class="fa-solid fa-check-circle"></i>`:`no disponible <i class="fa-solid fa-times-circle"></i>`}`,n?`success`:`error`,3e3)}).on(`blur.wi`,`#regEmail`,async function(){let t=U(`regEmail`);if(!t||!t.includes(`@`))return;let n=(await _(m(b(w,`smiles`),h(`email`,`==`,t)))).empty;e(this).data(`ok`,n),c(this,`Email ${n?`disponible <i class="fa-solid fa-check-circle"></i>`:`no disponible <i class="fa-solid fa-times-circle"></i>`}`,n?`success`:`error`,3e3)}).on(`click.wi`,`.wilg_rol_tab`,function(){let t=e(this).data(`rol`);e(`.wilg_rol_tab`).removeClass(`active`),e(this).addClass(`active`),e(`#rolExtra`).replaceWith(F(t)),Z()}).on(`change.wi`,`input[name="regExtra"]`,function(){let t=e(this).val();e(`.wilg_extra_opt`).removeClass(`active`),e(this).closest(`.wilg_extra_opt`).addClass(`active`);let n=e(`#extraField`);t===`personal`||t===`crear`?n.addClass(`hidden`):(n.removeClass(`hidden`),n.find(`input:first`).focus())}).on(`click.wi`,`#Login`,async function(){await K(this,`Iniciando`,async()=>{let e=U(`email`),t=U(`password`),{email:n,wi:r}=await q(e);await S(T,n,t);let i=r??(await x(y(w,`smiles`,T.currentUser.displayName||e))).data();if(i.status===`pendiente`)throw await d(T),Error(`Tu cuenta está pendiente de activación. Te notificaremos por email.`);X(i)})}).on(`click.wi`,`#Registrar`,async function(){if(e(this).data(`busy`))return;let t=e(`.wilg_rol_tab.active`).data(`rol`)||`smile`,n=e(`input[name="regExtra"]:checked`).val()||`personal`,r=[[!e(`#regTerminos`).is(`:checked`),`#regTerminos`,`Acepta los términos`],[!e(`#regUsuario`).data(`ok`),`#regUsuario`,`Verifica el usuario`],[!e(`#regEmail`).data(`ok`),`#regEmail`,`Verifica el email`]];if(t===`empresa`){let t=U(`regRuc`);if(!/^\d{11}$/.test(t))return c(e(`#regRuc`)[0],`El RUC debe tener 11 dígitos`,`error`,2500)}let i=r.find(([e])=>e);if(i)return c(e(i[1])[0],i[2],`error`,2500);e(this).data(`busy`,!0),await K(this,`Registrando`,async()=>{let e={email:U(`regEmail`),usuario:U(`regUsuario`),nombre:U(`regNombre`),apellidos:U(`regApellidos`),password:U(`regPassword`)},{user:r}=await f(T,e.email,e.password);await Promise.all([u(r,{displayName:e.usuario}),C(r)]);let i=t===`gestor`||t===`empresa`,o=i?t:`smile`,s=i?`pendiente`:`activo`,c={usuario:e.usuario,email:e.email,nombre:e.nombre,apellidos:e.apellidos,rol:o,status:s,uid:r.uid,terminos:!0,tema:localStorage.wiTema||`Cielo|#0EBEFF`,...t===`empresa`&&{ruc:U(`regRuc`),empresaNombre:U(`regEmpresaNombre`)},...t===`gestor`&&n===`unir`&&{empresaRuc:U(`regRuc`)},...t===`smile`&&n===`clase`&&{claseIdSolicitud:U(`regCodigo`)}};await v(y(w,`smiles`,e.usuario),{...c,creado:g()}),i?(await d(T),a(`<i class="fa-solid fa-clock"></i> Registro enviado. Tu cuenta será activada pronto.`,`success`),setTimeout(()=>G(`login`),2500)):(X(c),a(`<i class="fa-solid fa-check-circle"></i> ¡Cuenta creada! Verifica tu email`,`success`))}),e(this).data(`busy`,!1)}).on(`click.wi`,`#Recuperar`,async function(){let e=U(`recEmail`);if(!e)return c(this,`Ingresa tu email o usuario`,`error`,2500);await K(this,`Enviando`,async()=>{let{email:t}=await q(e);await p(T,t),a(`<i class="fa-solid fa-check-circle"></i> Email enviado, revisa tu bandeja`,`success`),setTimeout(()=>G(`login`),2e3)})}).on(`click.wi`,`.tema`,async function(){let e=n(`wiSmile`);e?.usuario&&setTimeout(async()=>{let t=localStorage.wiTema;if(t)try{await v(y(w,`smiles`,e.usuario),{tema:t,actualizado:g()},{merge:!0}),r(`wiSmile`,{...e,tema:t},7),a(`Tema ${t.split(`|`)[0]} guardado <i class="fas fa-check-circle"></i>`,`success`)}catch(e){console.error(`tema:`,e)}},0)});function Z(){let t=e(`input[name="regExtra"]:checked`).val();(t===`personal`||t===`crear`)&&e(`#extraField`).addClass(`hidden`)}var Q=(e=`login`)=>{D===`si`?R(e===`registrar`&&A===`si`?`registrar`:`login`):l.navigate(`/login`)},$=async(e=[])=>{try{await d(T)}catch(e){console.error(`signOut:`,e)}s.logout(e)},ee=()=>{e(document).off(`.wi`)};export{Q as abrirLogin,T as auth,ee as cleanup,V as init,B as render,$ as salir,d as signOut};