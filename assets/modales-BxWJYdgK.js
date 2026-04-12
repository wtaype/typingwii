import{t as e}from"./vendor-BDh6mtVu.js";import{a as t,h as n,i as r,n as i,t as a,u as o,v as s}from"./widev-vIOvrNXT.js";import{t as c}from"./wii-DpME_MqB.js";var l=[{id:`basico`,icon:`fa-window-restore`,color:`#7000FF`,nombre:`Modal Básico`},{id:`formulario`,icon:`fa-pen-to-square`,color:`#0EBEFF`,nombre:`Modal Formulario`},{id:`confirmacion`,icon:`fa-circle-question`,color:`#FF5C69`,nombre:`Modal Confirmación`},{id:`galeria`,icon:`fa-images`,color:`#29C72E`,nombre:`Modal Galería`},{id:`pasos`,icon:`fa-list-ol`,color:`#FFB800`,nombre:`Modal por Pasos`},{id:`sizes`,icon:`fa-expand`,color:`#00D4FF`,nombre:`Tamaños`},{id:`posiciones`,icon:`fa-arrows-up-down-left-right`,color:`#FF5C69`,nombre:`Posiciones`},{id:`animados`,icon:`fa-wand-magic-sparkles`,color:`#7000FF`,nombre:`Animaciones`},{id:`api`,icon:`fa-code`,color:`#0EBEFF`,nombre:`API Referencia`}],u=[{nombre:`abrirModal(id)`,desc:`Abre un modal por su ID. Agrega clase .active y bloquea scroll del body. Hace focus al primer input/botón visible.`,params:[{n:`id`,t:`string`,d:`ID del modal (sin #)`}],retorno:`void`,ejemplo:`abrirModal('miModal');`},{nombre:`cerrarModal(id)`,desc:`Cierra un modal específico. Si no quedan modales abiertos, restaura el scroll del body.`,params:[{n:`id`,t:`string`,d:`ID del modal (sin #)`}],retorno:`void`,ejemplo:`cerrarModal('miModal');`},{nombre:`cerrarTodos()`,desc:`Cierra todos los modales abiertos de una vez y restaura el scroll.`,params:[],retorno:`void`,ejemplo:`cerrarTodos();`}],d={basico:`<!-- HTML del modal -->
<div id="miModal" class="wiModal">
  <div class="modalBody" style="background:var(--wb);padding:3vh">
    <button class="modalX"><i class="fas fa-xmark"></i></button>
    <h3>Título del Modal</h3>
    <p>Contenido aquí...</p>
  </div>
</div>

// Abrir
abrirModal('miModal');

// Cerrar
cerrarModal('miModal');`,formulario:`<div id="formModal" class="wiModal">
  <div class="modalBody" style="background:var(--wb);padding:3vh">
    <button class="modalX"><i class="fas fa-xmark"></i></button>
    <h3><i class="fas fa-user-plus"></i> Registro</h3>
    <label>Nombre</label>
    <input type="text" placeholder="Tu nombre">
    <label>Email</label>
    <input type="email" placeholder="correo@ejemplo.com">
    <label>Mensaje</label>
    <textarea placeholder="Escribe aquí..."></textarea>
    <button id="btnEnviar">Enviar</button>
  </div>
</div>

abrirModal('formModal');`,confirmacion:`<div id="confirmModal" class="wiModal">
  <div class="modalBody" style="background:var(--wb);padding:3vh;text-align:center">
    <button class="modalX"><i class="fas fa-xmark"></i></button>
    <i class="fas fa-trash" style="font-size:3rem;color:#FF5C69"></i>
    <h3>¿Eliminar elemento?</h3>
    <p>Esta acción no se puede deshacer</p>
    <div style="display:flex;gap:1vh;justify-content:center;margin-top:2vh">
      <button class="modalX">Cancelar</button>
      <button id="btnConfirmar">Eliminar</button>
    </div>
  </div>
</div>

$('#btnConfirmar').on('click', () => {
  // tu lógica aquí
  cerrarModal('confirmModal');
  Notificacion('Eliminado', 'success');
});`,galeria:`<div id="galeriaModal" class="wiModal">
  <div class="modalBody" style="max-width:90vw;background:transparent">
    <button class="modalX"><i class="fas fa-xmark"></i></button>
    <img src="./imagen.webp" style="width:100%;border-radius:1vh">
    <p style="text-align:center;margin-top:1vh;color:var(--F)">
      Descripción de la imagen
    </p>
  </div>
</div>`,pasos:`// Wizard de 3 pasos con navegación
<div id="wizardModal" class="wiModal">
  <div class="modalBody" style="background:var(--wb);padding:3vh">
    <button class="modalX"><i class="fas fa-xmark"></i></button>
    <div class="mod_steps">
      <div class="mod_step active">1</div>
      <div class="mod_step">2</div>
      <div class="mod_step">3</div>
    </div>
    <div class="mod_step_content" data-step="1">
      <h3>Paso 1: Datos personales</h3>
      <input placeholder="Nombre completo">
    </div>
    <div class="mod_step_content" data-step="2" style="display:none">
      <h3>Paso 2: Preferencias</h3>
      <select><option>Tema Cielo</option></select>
    </div>
    <div class="mod_step_content" data-step="3" style="display:none">
      <h3>Paso 3: Confirmar</h3>
      <p>Todo listo para continuar</p>
    </div>
    <div style="display:flex;gap:1vh;justify-content:flex-end;margin-top:2vh">
      <button class="mod_prev">Anterior</button>
      <button class="mod_next">Siguiente</button>
    </div>
  </div>
</div>`,sizes:`// Cambiar max-width del .modalBody

/* Pequeño */
.modalBody { max-width: 400px; }

/* Mediano (default) */
.modalBody { max-width: 600px; }

/* Grande */
.modalBody { max-width: 900px; }

/* Full screen */
.modalBody { max-width: 100vw; width: 100%; 
             height: 100vh; border-radius: 0; }`,posiciones:`/* Centro (default) */
.wiModal { justify-content: center; align-items: center; }

/* Arriba */
.wiModal.mod_top { align-items: flex-start; padding-top: 5vh; }

/* Abajo */
.wiModal.mod_bottom { align-items: flex-end; padding-bottom: 5vh; }

/* Derecha (sidebar) */
.wiModal.mod_right { justify-content: flex-end; }
.wiModal.mod_right .modalBody { 
  height: 100vh; max-width: 400px; 
  border-radius: 0; margin: 0; 
}

/* Izquierda (sidebar) */
.wiModal.mod_left { justify-content: flex-start; }
.wiModal.mod_left .modalBody { 
  height: 100vh; max-width: 400px; 
  border-radius: 0; margin: 0; 
}`,animados:`/* Fade (default) */
@keyframes mf { from { opacity: 0 } to { opacity: 1 } }

/* Slide up */
@keyframes mod_slideUp {
  from { transform: translateY(30px); opacity: 0 }
  to   { transform: translateY(0); opacity: 1 }
}

/* Scale bounce */
@keyframes mod_bounce {
  0%   { transform: scale(0.5); opacity: 0 }
  70%  { transform: scale(1.05) }
  100% { transform: scale(1); opacity: 1 }
}

/* Flip */
@keyframes mod_flip {
  from { transform: perspective(600px) rotateX(90deg); opacity: 0 }
  to   { transform: perspective(600px) rotateX(0); opacity: 1 }
}

.modalBody { animation: mod_bounce 0.35s ease; }`,atajos:`// Cerrar con ESC (ya incluido en widev.js)
$(document).on('keydown', e => {
  if (e.key === 'Escape') cerrarTodos();
});

// Cerrar al hacer click en el backdrop
$('.wiModal.active').on('click', function(e) {
  if (e.target === this) cerrarTodos();
});

// Cerrar con botón .modalX
$('.modalX').on('click', cerrarTodos);

// Todo esto ya viene integrado automáticamente`},f=e=>`
  <a href="#mod_${e.id}" class="mod_side_item" data-cat="${e.id}" style="--cc:${e.color}">
    <i class="fas ${e.icon}"></i>
    <span>${e.nombre}</span>
  </a>`,p=e=>`<span class="mod_param"><code>${e.n}</code><em>${e.t}</em>${e.d}</span>`,m=e=>`
  <div class="mod_fn">
    <div class="mod_fn_head">
      <code class="mod_fn_name">${e.nombre}</code>
      <span class="mod_fn_ret"><i class="fas fa-arrow-right"></i> ${e.retorno}</span>
    </div>
    <p class="mod_fn_desc">${e.desc}</p>
    ${e.params.length?`<div class="mod_params"><div class="mod_params_tit"><i class="fas fa-sliders"></i> Parámetros</div>${e.params.map(p).join(``)}</div>`:``}
    <div class="mod_code_wrap">
      <div class="mod_code_head"><span><i class="fas fa-code"></i> Ejemplo</span><span class="mod_lang">JS</span></div>
      <pre><code class="language-js">${e.ejemplo}</code></pre>
    </div>
  </div>`,h=()=>`
<div class="mod_wrap">

  <header class="mod_header">
    <div>
      <span class="mod_tag"><i class="fas fa-window-restore"></i> Sistema de Modales</span>
      <h1 class="mod_title">Modales <span class="mod_grad">poderosos</span></h1>
      <p class="mod_sub">Explora todos los tipos de modales, posiciones, animaciones y casos de uso. Todo con <strong>3 funciones</strong> simples.</p>
    </div>
    <div class="mod_header_stats">
      <div class="mod_hstat"><span class="mod_hstat_n">3</span><span>Funciones</span></div>
      <div class="mod_hstat"><span class="mod_hstat_n">${l.length}</span><span>Ejemplos</span></div>
      <div class="mod_hstat"><span class="mod_hstat_n">v10.4</span><span>Versión</span></div>
    </div>
  </header>

  <!-- ── FEATURES RÁPIDAS ── -->
  <section class="mod_features">
    <div class="mod_feat"><i class="fas fa-keyboard"></i><strong>ESC</strong> para cerrar</div>
    <div class="mod_feat"><i class="fas fa-hand-pointer"></i>Click backdrop cierra</div>
    <div class="mod_feat"><i class="fas fa-crosshairs"></i>Auto-focus al abrir</div>
    <div class="mod_feat"><i class="fas fa-lock"></i>Body scroll bloqueado</div>
    <div class="mod_feat"><i class="fas fa-layer-group"></i>Múltiples modales</div>
    <div class="mod_feat"><i class="fas fa-feather"></i>CSS inyectado auto</div>
  </section>

  <div class="mod_layout">
    <aside class="mod_sidebar">
      <div class="mod_side_title"><i class="fas fa-layer-group"></i> Secciones</div>
      ${l.map(f).join(``)}
    </aside>
    <div class="mod_content">

  <!-- 1. BÁSICO -->
  <section class="mod_section" id="mod_basico">
    <div class="mod_sec_head" style="--cc:#7000FF">
      <div class="mod_sec_ico"><i class="fas fa-window-restore"></i></div>
      <div><h2 class="mod_sec_tit">Modal Básico</h2><span class="mod_sec_meta">El modal más simple — Título, texto y botón cerrar</span></div>
    </div>
    <div class="mod_demo_area">
      <div class="mod_demo_btns">
        <button class="mod_btn" data-open="demoBasico"><i class="fas fa-play"></i> Abrir Modal Básico</button>
      </div>
      <div id="demoBasico" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx);margin-bottom:1vh"><i class="fas fa-rocket" style="color:var(--Mora)"></i> ¡Hola desde Widev!</h3>
          <p>Este es el modal más básico. Se cierra con <strong>ESC</strong>, click afuera o el botón <strong>X</strong>.</p>
          <p style="margin-top:1vh;color:var(--tx2)">El CSS se inyecta automáticamente desde <code style="color:var(--mco)">widev.js</code>. Solo necesitas la estructura HTML y las funciones.</p>
          <button class="mod_btn modalX" style="margin-top:2vh"><i class="fas fa-check"></i> Entendido</button>
        </div>
      </div>
    </div>
    <div class="mod_code_wrap">
      <div class="mod_code_head"><span><i class="fas fa-code"></i> Código</span><span class="mod_lang">HTML + JS</span></div>
      <pre><code class="language-markup">${d.basico}</code></pre>
    </div>
  </section>

  <!-- 2. FORMULARIO -->
  <section class="mod_section" id="mod_formulario">
    <div class="mod_sec_head" style="--cc:#0EBEFF">
      <div class="mod_sec_ico"><i class="fas fa-pen-to-square"></i></div>
      <div><h2 class="mod_sec_tit">Modal Formulario</h2><span class="mod_sec_meta">Inputs, selects, textarea con auto-focus</span></div>
    </div>
    <div class="mod_demo_area">
      <div class="mod_demo_btns">
        <button class="mod_btn" data-open="demoForm"><i class="fas fa-pen-to-square"></i> Abrir Formulario</button>
        <button class="mod_btn mod_btn_alt" data-open="demoContact"><i class="fas fa-envelope"></i> Contacto</button>
        <button class="mod_btn mod_btn_alt" data-open="demoLogin"><i class="fas fa-right-to-bracket"></i> Login</button>
      </div>
      <!-- Modal Formulario de Registro -->
      <div id="demoForm" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx);margin-bottom:1.5vh"><i class="fas fa-user-plus" style="color:var(--Cielo)"></i> Nuevo Registro</h3>
          <label>Nombre completo</label>
          <input type="text" placeholder="Ej: Wilder Taype">
          <label>Correo electrónico</label>
          <input type="email" placeholder="correo@ejemplo.com">
          <label>Contraseña</label>
          <input type="password" placeholder="Mínimo 8 caracteres">
          <label>Bio</label>
          <textarea placeholder="Cuéntanos sobre ti..." rows="3"></textarea>
          <div style="display:flex;gap:1vh;margin-top:2vh">
            <button class="mod_btn" id="btnRegDemo"><i class="fas fa-check"></i> Registrar</button>
            <button class="mod_btn mod_btn_alt modalX"><i class="fas fa-xmark"></i> Cancelar</button>
          </div>
        </div>
      </div>
      <!-- Modal Contacto -->
      <div id="demoContact" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx);margin-bottom:1.5vh"><i class="fas fa-paper-plane" style="color:var(--Cielo)"></i> Contáctanos</h3>
          <label>Asunto</label>
          <select><option>Soporte técnico</option><option>Sugerencia</option><option>Bug report</option><option>Otro</option></select>
          <label>Mensaje</label>
          <textarea placeholder="Describe tu consulta..." rows="4"></textarea>
          <button class="mod_btn" id="btnContactDemo" style="margin-top:2vh;width:100%"><i class="fas fa-paper-plane"></i> Enviar</button>
        </div>
      </div>
      <!-- Modal Login -->
      <div id="demoLogin" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:420px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <div style="text-align:center;margin-bottom:2vh">
            <i class="fas fa-code" style="font-size:2.5rem;color:var(--mco)"></i>
            <h3 style="color:var(--tx);margin-top:1vh">Iniciar Sesión</h3>
            <p style="color:var(--tx2);font-size:var(--fz_s4)">Accede a tu cuenta Widev</p>
          </div>
          <label>Email</label>
          <input type="email" placeholder="tu@email.com">
          <label>Contraseña</label>
          <input type="password" placeholder="••••••••">
          <div style="display:flex;justify-content:space-between;align-items:center;margin:1.5vh 0">
            <label style="display:flex;align-items:center;gap:.5vh;margin:0"><input type="checkbox"> Recordarme</label>
            <a href="#" style="font-size:var(--fz_s4)">¿Olvidaste tu clave?</a>
          </div>
          <button class="mod_btn" id="btnLoginDemo" style="width:100%"><i class="fas fa-right-to-bracket"></i> Entrar</button>
          <p style="text-align:center;margin-top:1.5vh;color:var(--tx2);font-size:var(--fz_s4)">¿No tienes cuenta? <a href="#">Regístrate</a></p>
        </div>
      </div>
    </div>
    <div class="mod_code_wrap">
      <div class="mod_code_head"><span><i class="fas fa-code"></i> Código</span><span class="mod_lang">HTML + JS</span></div>
      <pre><code class="language-markup">${d.formulario}</code></pre>
    </div>
  </section>

  <!-- 3. CONFIRMACIÓN -->
  <section class="mod_section" id="mod_confirmacion">
    <div class="mod_sec_head" style="--cc:#FF5C69">
      <div class="mod_sec_ico"><i class="fas fa-circle-question"></i></div>
      <div><h2 class="mod_sec_tit">Modal Confirmación</h2><span class="mod_sec_meta">Confirmar acciones peligrosas o irreversibles</span></div>
    </div>
    <div class="mod_demo_area">
      <div class="mod_demo_btns">
        <button class="mod_btn mod_btn_danger" data-open="demoDelete"><i class="fas fa-trash"></i> Eliminar</button>
        <button class="mod_btn mod_btn_warning" data-open="demoLogout"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</button>
        <button class="mod_btn" data-open="demoSuccess"><i class="fas fa-circle-check"></i> Acción Exitosa</button>
      </div>
      <!-- Modal Eliminar -->
      <div id="demoDelete" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:450px;text-align:center">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <div class="mod_confirm_icon mod_confirm_danger"><i class="fas fa-trash"></i></div>
          <h3 style="color:var(--tx);margin:1.5vh 0 .5vh">¿Eliminar este elemento?</h3>
          <p style="color:var(--tx2)">Esta acción es permanente y no se puede deshacer. Todos los datos asociados se perderán.</p>
          <div style="display:flex;gap:1vh;justify-content:center;margin-top:2.5vh">
            <button class="mod_btn mod_btn_alt modalX"><i class="fas fa-xmark"></i> Cancelar</button>
            <button class="mod_btn mod_btn_danger" id="btnDeleteConfirm"><i class="fas fa-trash"></i> Sí, eliminar</button>
          </div>
        </div>
      </div>
      <!-- Modal Logout -->
      <div id="demoLogout" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:450px;text-align:center">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <div class="mod_confirm_icon mod_confirm_warn"><i class="fas fa-sign-out-alt"></i></div>
          <h3 style="color:var(--tx);margin:1.5vh 0 .5vh">¿Cerrar sesión?</h3>
          <p style="color:var(--tx2)">Tendrás que iniciar sesión nuevamente para acceder a tu cuenta.</p>
          <div style="display:flex;gap:1vh;justify-content:center;margin-top:2.5vh">
            <button class="mod_btn mod_btn_alt modalX"><i class="fas fa-xmark"></i> Quedarme</button>
            <button class="mod_btn mod_btn_warning" id="btnLogoutConfirm"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button>
          </div>
        </div>
      </div>
      <!-- Modal Success -->
      <div id="demoSuccess" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:450px;text-align:center">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <div class="mod_confirm_icon mod_confirm_ok"><i class="fas fa-check"></i></div>
          <h3 style="color:var(--tx);margin:1.5vh 0 .5vh">¡Operación exitosa!</h3>
          <p style="color:var(--tx2)">Tu archivo se ha guardado correctamente en la nube.</p>
          <button class="mod_btn modalX" style="margin-top:2.5vh"><i class="fas fa-thumbs-up"></i> Perfecto</button>
        </div>
      </div>
    </div>
    <div class="mod_code_wrap">
      <div class="mod_code_head"><span><i class="fas fa-code"></i> Código</span><span class="mod_lang">HTML + JS</span></div>
      <pre><code class="language-markup">${d.confirmacion}</code></pre>
    </div>
  </section>

  <!-- 4. GALERÍA -->
  <section class="mod_section" id="mod_galeria">
    <div class="mod_sec_head" style="--cc:#29C72E">
      <div class="mod_sec_ico"><i class="fas fa-images"></i></div>
      <div><h2 class="mod_sec_tit">Modal Galería</h2><span class="mod_sec_meta">Visor de imágenes y contenido multimedia</span></div>
    </div>
    <div class="mod_demo_area">
      <div class="mod_demo_btns">
        <button class="mod_btn" data-open="demoGallery"><i class="fas fa-image"></i> Ver Imagen</button>
        <button class="mod_btn mod_btn_alt" data-open="demoVideo"><i class="fas fa-play"></i> Ver Video</button>
        <button class="mod_btn mod_btn_alt" data-open="demoProfile"><i class="fas fa-user"></i> Perfil</button>
      </div>
      <!-- Modal Imagen -->
      <div id="demoGallery" class="wiModal">
        <div class="modalBody" style="background:transparent;max-width:80vw;box-shadow:none">
          <button class="modalX" style="color:var(--F);font-size:1.8rem;top:1vh;right:1vh"><i class="fas fa-xmark"></i></button>
          <div class="mod_gallery_img">
            <div style="width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,var(--Cielo),var(--Mora));border-radius:1vh;display:flex;align-items:center;justify-content:center">
              <i class="fas fa-image" style="font-size:5rem;color:rgba(255,255,255,.3)"></i>
            </div>
          </div>
          <p style="text-align:center;margin-top:1.5vh;color:var(--F);font-size:var(--fz_m3)"><i class="fas fa-camera" style="color:var(--Paz)"></i> Fotografía de ejemplo — Widev Gallery</p>
        </div>
      </div>
      <!-- Modal Video -->
      <div id="demoVideo" class="wiModal">
        <div class="modalBody" style="background:var(--0);max-width:80vw;padding:0;overflow:hidden;border-radius:1vh">
          <button class="modalX" style="color:var(--F);font-size:1.8rem;z-index:10"><i class="fas fa-xmark"></i></button>
          <div style="width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,#1a1a2e,#16213e);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1vh">
            <i class="fas fa-circle-play" style="font-size:5rem;color:var(--Dulce);opacity:.8"></i>
            <span style="color:var(--F);opacity:.6">Video placeholder</span>
          </div>
        </div>
      </div>
      <!-- Modal Perfil -->
      <div id="demoProfile" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:0;max-width:400px;overflow:hidden">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <div style="height:12vh;background:linear-gradient(135deg,var(--mco),var(--Mora))"></div>
          <div style="padding:0 3vh 3vh;text-align:center;margin-top:-4vh">
            <div style="width:8vh;height:8vh;border-radius:50%;background:var(--wb);border:3px solid var(--wb);margin:0 auto;display:flex;align-items:center;justify-content:center">
              <i class="fas fa-user" style="font-size:3vh;color:var(--mco)"></i>
            </div>
            <h3 style="color:var(--tx);margin-top:1vh">Wilder Taype</h3>
            <p style="color:var(--tx2);font-size:var(--fz_s4)">@wilder.taype · Full Stack Dev</p>
            <div style="display:flex;justify-content:center;gap:3vh;margin:2vh 0;color:var(--tx)">
              <div><strong>142</strong><br><span style="font-size:var(--fz_s3);color:var(--tx2)">Posts</span></div>
              <div><strong>2.4k</strong><br><span style="font-size:var(--fz_s3);color:var(--tx2)">Seguidores</span></div>
              <div><strong>387</strong><br><span style="font-size:var(--fz_s3);color:var(--tx2)">Siguiendo</span></div>
            </div>
            <button class="mod_btn" style="width:100%"><i class="fas fa-user-plus"></i> Seguir</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mod_code_wrap">
      <div class="mod_code_head"><span><i class="fas fa-code"></i> Código</span><span class="mod_lang">HTML</span></div>
      <pre><code class="language-markup">${d.galeria}</code></pre>
    </div>
  </section>

  <!-- 5. POR PASOS (WIZARD) -->
  <section class="mod_section" id="mod_pasos">
    <div class="mod_sec_head" style="--cc:#FFB800">
      <div class="mod_sec_ico"><i class="fas fa-list-ol"></i></div>
      <div><h2 class="mod_sec_tit">Modal por Pasos</h2><span class="mod_sec_meta">Wizard multi-step con progreso visual</span></div>
    </div>
    <div class="mod_demo_area">
      <div class="mod_demo_btns">
        <button class="mod_btn" data-open="demoWizard"><i class="fas fa-wand-magic-sparkles"></i> Iniciar Wizard</button>
      </div>
      <div id="demoWizard" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:550px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <div class="mod_steps_bar">
            <div class="mod_step_dot active" data-s="1"><span>1</span><small>Datos</small></div>
            <div class="mod_step_line"></div>
            <div class="mod_step_dot" data-s="2"><span>2</span><small>Preferencias</small></div>
            <div class="mod_step_line"></div>
            <div class="mod_step_dot" data-s="3"><span>3</span><small>Confirmar</small></div>
          </div>
          <div class="mod_step_panel active" data-panel="1">
            <h3 style="color:var(--tx);margin-bottom:1.5vh"><i class="fas fa-user" style="color:var(--warning)"></i> Datos Personales</h3>
            <label>Nombre</label>
            <input type="text" placeholder="Tu nombre completo">
            <label>Fecha de nacimiento</label>
            <input type="date">
            <label>Ocupación</label>
            <select><option>Desarrollador</option><option>Diseñador</option><option>Estudiante</option><option>Otro</option></select>
          </div>
          <div class="mod_step_panel" data-panel="2">
            <h3 style="color:var(--tx);margin-bottom:1.5vh"><i class="fas fa-palette" style="color:var(--warning)"></i> Preferencias</h3>
            <label>Tema favorito</label>
            <div style="display:flex;gap:1vh;flex-wrap:wrap;margin:.5vh 0 1vh">
              <label style="display:flex;align-items:center;gap:.5vh;margin:0"><input type="radio" name="tema" checked> Cielo</label>
              <label style="display:flex;align-items:center;gap:.5vh;margin:0"><input type="radio" name="tema"> Dulce</label>
              <label style="display:flex;align-items:center;gap:.5vh;margin:0"><input type="radio" name="tema"> Paz</label>
              <label style="display:flex;align-items:center;gap:.5vh;margin:0"><input type="radio" name="tema"> Mora</label>
              <label style="display:flex;align-items:center;gap:.5vh;margin:0"><input type="radio" name="tema"> Futuro</label>
            </div>
            <label>Notificaciones</label>
            <label style="display:flex;align-items:center;gap:.5vh;margin:.5vh 0"><input type="checkbox" checked> Email</label>
            <label style="display:flex;align-items:center;gap:.5vh;margin:.5vh 0"><input type="checkbox"> Push</label>
          </div>
          <div class="mod_step_panel" data-panel="3">
            <div style="text-align:center;padding:2vh 0">
              <div class="mod_confirm_icon mod_confirm_ok"><i class="fas fa-check"></i></div>
              <h3 style="color:var(--tx);margin:1.5vh 0 .5vh">¡Todo listo!</h3>
              <p style="color:var(--tx2)">Revisa tus datos y confirma para completar el registro.</p>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:2vh">
            <button class="mod_btn mod_btn_alt mod_wiz_prev" style="visibility:hidden"><i class="fas fa-arrow-left"></i> Anterior</button>
            <button class="mod_btn mod_wiz_next"><i class="fas fa-arrow-right"></i> Siguiente</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mod_code_wrap">
      <div class="mod_code_head"><span><i class="fas fa-code"></i> Código</span><span class="mod_lang">HTML + JS</span></div>
      <pre><code class="language-markup">${d.pasos}</code></pre>
    </div>
  </section>

  <!-- 6. TAMAÑOS -->
  <section class="mod_section" id="mod_sizes">
    <div class="mod_sec_head" style="--cc:#00D4FF">
      <div class="mod_sec_ico"><i class="fas fa-expand"></i></div>
      <div><h2 class="mod_sec_tit">Tamaños</h2><span class="mod_sec_meta">Desde modales pequeños hasta fullscreen</span></div>
    </div>
    <div class="mod_demo_area">
      <div class="mod_demo_btns">
        <button class="mod_btn" data-open="demoSmall"><i class="fas fa-compress"></i> Pequeño</button>
        <button class="mod_btn mod_btn_alt" data-open="demoMedium"><i class="fas fa-maximize"></i> Mediano</button>
        <button class="mod_btn mod_btn_alt" data-open="demoLarge"><i class="fas fa-expand"></i> Grande</button>
        <button class="mod_btn mod_btn_alt" data-open="demoFull"><i class="fas fa-up-right-and-down-left-from-center"></i> Fullscreen</button>
      </div>
      <div id="demoSmall" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:350px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-compress" style="color:var(--info)"></i> Modal Pequeño</h3>
          <p style="color:var(--tx2);margin-top:1vh">Max-width: <strong>350px</strong>. Ideal para alertas rápidas y confirmaciones.</p>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> OK</button>
        </div>
      </div>
      <div id="demoMedium" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:600px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-maximize" style="color:var(--info)"></i> Modal Mediano</h3>
          <p style="color:var(--tx2);margin-top:1vh">Max-width: <strong>600px</strong>. El tamaño por defecto. Perfecto para formularios y contenido general.</p>
          <p style="color:var(--tx2)">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> Cerrar</button>
        </div>
      </div>
      <div id="demoLarge" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:900px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-expand" style="color:var(--info)"></i> Modal Grande</h3>
          <p style="color:var(--tx2);margin-top:1vh">Max-width: <strong>900px</strong>. Ideal para tablas, dashboards y contenido complejo.</p>
          <table style="margin-top:1.5vh">
            <thead><tr><th>Función</th><th>Versión</th><th>Descripción</th></tr></thead>
            <tbody>
              <tr><td>abrirModal()</td><td>v10.4</td><td>Abre un modal por ID</td></tr>
              <tr><td>cerrarModal()</td><td>v10.4</td><td>Cierra un modal específico</td></tr>
              <tr><td>cerrarTodos()</td><td>v10.4</td><td>Cierra todos los modales</td></tr>
            </tbody>
          </table>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> Cerrar</button>
        </div>
      </div>
      <div id="demoFull" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:100vw;width:100%;height:100vh;border-radius:0;display:flex;flex-direction:column">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1.5vh">
            <i class="fas fa-up-right-and-down-left-from-center" style="font-size:4rem;color:var(--mco);opacity:.5"></i>
            <h2 style="color:var(--tx)">Modal Fullscreen</h2>
            <p style="color:var(--tx2);max-width:500px;text-align:center">100vw × 100vh — Sin border-radius. Ocupa toda la pantalla. Perfecto para editores, previewers y experiencias inmersivas.</p>
            <button class="mod_btn modalX" style="margin-top:1vh"><i class="fas fa-compress"></i> Salir</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mod_code_wrap">
      <div class="mod_code_head"><span><i class="fas fa-code"></i> Código</span><span class="mod_lang">CSS</span></div>
      <pre><code class="language-css">${d.sizes}</code></pre>
    </div>
  </section>

  <!-- 7. POSICIONES -->
  <section class="mod_section" id="mod_posiciones">
    <div class="mod_sec_head" style="--cc:#FF5C69">
      <div class="mod_sec_ico"><i class="fas fa-arrows-up-down-left-right"></i></div>
      <div><h2 class="mod_sec_tit">Posiciones</h2><span class="mod_sec_meta">Centro, arriba, abajo, sidebar derecha e izquierda</span></div>
    </div>
    <div class="mod_demo_area">
      <div class="mod_demo_btns">
        <button class="mod_btn" data-open="demoPosCenter"><i class="fas fa-crosshairs"></i> Centro</button>
        <button class="mod_btn mod_btn_alt" data-open="demoPosTop"><i class="fas fa-arrow-up"></i> Arriba</button>
        <button class="mod_btn mod_btn_alt" data-open="demoPosBottom"><i class="fas fa-arrow-down"></i> Abajo</button>
        <button class="mod_btn mod_btn_alt" data-open="demoPosRight"><i class="fas fa-arrow-right"></i> Sidebar Der.</button>
        <button class="mod_btn mod_btn_alt" data-open="demoPosLeft"><i class="fas fa-arrow-left"></i> Sidebar Izq.</button>
      </div>
      <div id="demoPosCenter" class="wiModal">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:450px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-crosshairs" style="color:var(--Dulce)"></i> Posición Centro</h3>
          <p style="color:var(--tx2);margin-top:1vh">La posición por defecto. El modal aparece centrado vertical y horizontalmente.</p>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> OK</button>
        </div>
      </div>
      <div id="demoPosTop" class="wiModal" style="align-items:flex-start;padding-top:5vh">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:450px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-arrow-up" style="color:var(--Dulce)"></i> Posición Arriba</h3>
          <p style="color:var(--tx2);margin-top:1vh">El modal aparece en la parte superior con un padding-top.</p>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> OK</button>
        </div>
      </div>
      <div id="demoPosBottom" class="wiModal" style="align-items:flex-end;padding-bottom:5vh">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:450px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-arrow-down" style="color:var(--Dulce)"></i> Posición Abajo</h3>
          <p style="color:var(--tx2);margin-top:1vh">El modal aparece en la parte inferior. Ideal para mobile.</p>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> OK</button>
        </div>
      </div>
      <div id="demoPosRight" class="wiModal" style="justify-content:flex-end">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:380px;height:100vh;border-radius:0;margin:0;overflow-y:auto">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx);margin-bottom:1.5vh"><i class="fas fa-arrow-right" style="color:var(--Dulce)"></i> Sidebar Derecha</h3>
          <p style="color:var(--tx2)">Panel lateral que ocupa toda la altura. Perfecto para carritos de compra, filtros y menús.</p>
          <div style="margin-top:2vh;padding:2vh;background:var(--bg4);border-radius:.8vh">
            <h4 style="color:var(--tx);margin-bottom:1vh"><i class="fas fa-shopping-cart" style="color:var(--mco)"></i> Mi Carrito (3)</h4>
            <div style="display:flex;gap:1vh;align-items:center;padding:1vh 0;border-bottom:1px solid var(--brd)"><div style="width:5vh;height:5vh;background:var(--bg5);border-radius:.5vh"></div><div><strong style="color:var(--tx)">Producto 1</strong><p style="color:var(--mco);font-size:var(--fz_s4)">$29.99</p></div></div>
            <div style="display:flex;gap:1vh;align-items:center;padding:1vh 0;border-bottom:1px solid var(--brd)"><div style="width:5vh;height:5vh;background:var(--bg5);border-radius:.5vh"></div><div><strong style="color:var(--tx)">Producto 2</strong><p style="color:var(--mco);font-size:var(--fz_s4)">$49.99</p></div></div>
            <div style="display:flex;gap:1vh;align-items:center;padding:1vh 0"><div style="width:5vh;height:5vh;background:var(--bg5);border-radius:.5vh"></div><div><strong style="color:var(--tx)">Producto 3</strong><p style="color:var(--mco);font-size:var(--fz_s4)">$19.99</p></div></div>
          </div>
          <button class="mod_btn" style="width:100%;margin-top:2vh"><i class="fas fa-credit-card"></i> Pagar $99.97</button>
        </div>
      </div>
      <div id="demoPosLeft" class="wiModal" style="justify-content:flex-start">
        <div class="modalBody" style="background:var(--wb);padding:3vh;max-width:320px;height:100vh;border-radius:0;margin:0;overflow-y:auto">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx);margin-bottom:2vh"><i class="fas fa-bars" style="color:var(--Dulce)"></i> Menú</h3>
          <nav style="display:flex;flex-direction:column;gap:.5vh">
            <a href="#" class="mod_menu_link"><i class="fas fa-home"></i> Inicio</a>
            <a href="#" class="mod_menu_link"><i class="fas fa-cube"></i> Componentes</a>
            <a href="#" class="mod_menu_link"><i class="fas fa-wand-magic-sparkles"></i> Utilidades</a>
            <a href="#" class="mod_menu_link active"><i class="fas fa-window-restore"></i> Modales</a>
            <a href="#" class="mod_menu_link"><i class="fas fa-book"></i> Guías</a>
            <a href="#" class="mod_menu_link"><i class="fas fa-circle-info"></i> Acerca</a>
          </nav>
          <div style="position:absolute;bottom:3vh;left:3vh;right:3vh">
            <button class="mod_btn mod_btn_alt modalX" style="width:100%"><i class="fas fa-xmark"></i> Cerrar menú</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mod_code_wrap">
      <div class="mod_code_head"><span><i class="fas fa-code"></i> Código</span><span class="mod_lang">CSS</span></div>
      <pre><code class="language-css">${d.posiciones}</code></pre>
    </div>
  </section>

  <!-- 8. ANIMACIONES -->
  <section class="mod_section" id="mod_animados">
    <div class="mod_sec_head" style="--cc:#7000FF">
      <div class="mod_sec_ico"><i class="fas fa-wand-magic-sparkles"></i></div>
      <div><h2 class="mod_sec_tit">Animaciones</h2><span class="mod_sec_meta">Fade, slide, bounce, flip y más</span></div>
    </div>
    <div class="mod_demo_area">
      <div class="mod_demo_btns">
        <button class="mod_btn" data-open="demoAnimFade"><i class="fas fa-eye"></i> Fade</button>
        <button class="mod_btn mod_btn_alt" data-open="demoAnimSlide"><i class="fas fa-arrow-up"></i> Slide Up</button>
        <button class="mod_btn mod_btn_alt" data-open="demoAnimBounce"><i class="fas fa-basketball"></i> Bounce</button>
        <button class="mod_btn mod_btn_alt" data-open="demoAnimFlip"><i class="fas fa-rotate"></i> Flip</button>
        <button class="mod_btn mod_btn_alt" data-open="demoAnimZoom"><i class="fas fa-magnifying-glass-plus"></i> Zoom</button>
      </div>
      <div id="demoAnimFade" class="wiModal">
        <div class="modalBody mod_anim_fade" style="background:var(--wb);padding:3vh;max-width:450px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-eye" style="color:var(--Mora)"></i> Animación Fade</h3>
          <p style="color:var(--tx2);margin-top:1vh">La animación por defecto. Aparición suave con opacity.</p>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> OK</button>
        </div>
      </div>
      <div id="demoAnimSlide" class="wiModal">
        <div class="modalBody mod_anim_slide" style="background:var(--wb);padding:3vh;max-width:450px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-arrow-up" style="color:var(--Mora)"></i> Animación Slide Up</h3>
          <p style="color:var(--tx2);margin-top:1vh">El modal sube desde abajo con un movimiento elegante.</p>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> OK</button>
        </div>
      </div>
      <div id="demoAnimBounce" class="wiModal">
        <div class="modalBody mod_anim_bounce" style="background:var(--wb);padding:3vh;max-width:450px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-basketball" style="color:var(--Mora)"></i> Animación Bounce</h3>
          <p style="color:var(--tx2);margin-top:1vh">Efecto rebote que llama la atención. Ideal para alertas importantes.</p>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> OK</button>
        </div>
      </div>
      <div id="demoAnimFlip" class="wiModal">
        <div class="modalBody mod_anim_flip" style="background:var(--wb);padding:3vh;max-width:450px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-rotate" style="color:var(--Mora)"></i> Animación Flip</h3>
          <p style="color:var(--tx2);margin-top:1vh">Rotación 3D con perspectiva. Efecto cinematográfico.</p>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> OK</button>
        </div>
      </div>
      <div id="demoAnimZoom" class="wiModal">
        <div class="modalBody mod_anim_zoom" style="background:var(--wb);padding:3vh;max-width:450px">
          <button class="modalX"><i class="fas fa-xmark"></i></button>
          <h3 style="color:var(--tx)"><i class="fas fa-magnifying-glass-plus" style="color:var(--Mora)"></i> Animación Zoom</h3>
          <p style="color:var(--tx2);margin-top:1vh">Zoom desde pequeño. Enfoque y presencia inmediata.</p>
          <button class="mod_btn modalX" style="margin-top:1.5vh"><i class="fas fa-check"></i> OK</button>
        </div>
      </div>
    </div>
    <div class="mod_code_wrap">
      <div class="mod_code_head"><span><i class="fas fa-code"></i> Código</span><span class="mod_lang">CSS</span></div>
      <pre><code class="language-css">${d.animados}</code></pre>
    </div>
  </section>

  <!-- 9. API REFERENCIA -->
  <section class="mod_section" id="mod_api">
    <div class="mod_sec_head" style="--cc:#0EBEFF">
      <div class="mod_sec_ico"><i class="fas fa-code"></i></div>
      <div><h2 class="mod_sec_tit">API Referencia</h2><span class="mod_sec_meta">v10.4 · 3 funciones · Documentación completa</span></div>
    </div>
    <div class="mod_fns">${u.map(m).join(``)}</div>
    <div class="mod_extra_info">
      <h3 style="color:var(--tx);margin-bottom:1.5vh"><i class="fas fa-bolt" style="color:var(--warning)"></i> Características automáticas</h3>
      <div class="mod_info_grid">
        <div class="mod_info_card">
          <i class="fas fa-paintbrush"></i>
          <strong>CSS Auto-inyectado</strong>
          <p>Los estilos del modal se inyectan automáticamente en el &lt;head&gt; la primera vez. No necesitas importar CSS.</p>
        </div>
        <div class="mod_info_card">
          <i class="fas fa-keyboard"></i>
          <strong>Tecla ESC</strong>
          <p>Presionar Escape cierra todos los modales abiertos automáticamente.</p>
        </div>
        <div class="mod_info_card">
          <i class="fas fa-hand-pointer"></i>
          <strong>Click Backdrop</strong>
          <p>Click fuera del modal (en el fondo oscuro) cierra el modal actual.</p>
        </div>
        <div class="mod_info_card">
          <i class="fas fa-crosshairs"></i>
          <strong>Auto Focus</strong>
          <p>Al abrir, el primer input/botón visible recibe el foco automáticamente.</p>
        </div>
        <div class="mod_info_card">
          <i class="fas fa-lock"></i>
          <strong>Scroll Lock</strong>
          <p>El body se bloquea (overflow:hidden) mientras hay un modal abierto.</p>
        </div>
        <div class="mod_info_card">
          <i class="fas fa-layer-group"></i>
          <strong>Multi-modal</strong>
          <p>Puedes tener varios modales. cerrarModal() solo cierra el indicado.</p>
        </div>
      </div>
    </div>
    <div class="mod_code_wrap">
      <div class="mod_code_head"><span><i class="fas fa-code"></i> Atajos integrados</span><span class="mod_lang">JS</span></div>
      <pre><code class="language-js">${d.atajos}</code></pre>
    </div>
  </section>

    </div>
  </div>

  <!-- CTA -->
  <section class="mod_cta">
    <i class="fas fa-window-restore mod_cta_ico"></i>
    <h2>¿Listo para usar modales?</h2>
    <p>Solo necesitas <strong>3 funciones</strong> y el HTML. El CSS se inyecta solo.</p>
    <div class="mod_code_wrap mod_cta_code">
      <pre><code class="language-js">import { abrirModal, cerrarModal, cerrarTodos } from './widev.js';</code></pre>
    </div>
  </section>

</div>`,g=()=>{window.Prism&&Prism.highlightAll(),o(`pre code`),e(document).on(`click.mod`,`[data-open]`,function(){r(e(this).data(`open`))});let l=1,u=()=>{e(`.mod_step_panel`).removeClass(`active`),e(`.mod_step_panel[data-panel="${l}"]`).addClass(`active`),e(`.mod_step_dot`).removeClass(`active done`),e(`.mod_step_dot`).each(function(){let t=+e(this).data(`s`);t<l&&e(this).addClass(`done`),t===l&&e(this).addClass(`active`)}),e(`.mod_wiz_prev`).css(`visibility`,l===1?`hidden`:`visible`),e(`.mod_wiz_next`).html(l===3?`<i class="fas fa-check"></i> Finalizar`:`<i class="fas fa-arrow-right"></i> Siguiente`)};e(document).on(`click.mod`,`.mod_wiz_next`,()=>{l<3?(l++,u()):(t(),i(`¡Wizard completado!`,`success`),l=1,u())}),e(document).on(`click.mod`,`.mod_wiz_prev`,()=>{l>1&&(l--,u())}),e(document).on(`click.mod`,`#btnRegDemo`,function(){n(this),setTimeout(()=>{n(this,!1),t(),i(`¡Registro exitoso!`,`success`)},1500)}),e(document).on(`click.mod`,`#btnContactDemo`,function(){n(this),setTimeout(()=>{n(this,!1),t(),i(`¡Mensaje enviado!`,`success`)},1200)}),e(document).on(`click.mod`,`#btnLoginDemo`,function(){n(this),setTimeout(()=>{n(this,!1),t(),a(`¡Bienvenido!`,`success`)},1500)}),e(document).on(`click.mod`,`#btnDeleteConfirm`,function(){t(),i(`Elemento eliminado`,`success`)}),e(document).on(`click.mod`,`#btnLogoutConfirm`,function(){t(),i(`Sesión cerrada`,`info`)}),e(document).on(`click.mod`,`.mod_side_item`,function(t){t.preventDefault(),e(`.mod_side_item`).removeClass(`active`),e(this).addClass(`active`);let n=e(e(this).attr(`href`));n.length&&e(`html,body`).animate({scrollTop:n.offset().top-80},400)});let d=e(`.mod_section`),f=()=>{let t=e(window).scrollTop()+120;d.each(function(){let n=e(this),r=n.offset().top,i=r+n.outerHeight();if(t>=r&&t<i){let t=n.attr(`id`)?.replace(`mod_`,``);e(`.mod_side_item`).removeClass(`active`),e(`.mod_side_item[data-cat="${t}"]`).addClass(`active`)}})};e(window).on(`scroll.mod`,f),f(),e(`.mod_side_item`).first().addClass(`active`),s(`.mod_section`,null,{anim:`wi_fadeUp`,stagger:120}),s(`.mod_feat`,null,{anim:`wi_fadeUp`,stagger:60}),s(`.mod_info_card`,null,{anim:`wi_fadeUp`,stagger:80}),console.log(`⚡ ${c} v9 · Modales OK`)},_=()=>{e(document).off(`.mod`),e(window).off(`.mod`),t()};export{_ as cleanup,g as init,h as render};