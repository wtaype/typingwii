import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,d as n,f as r,i}from"./widev-BVXcYvSP.js";import{c as a,d as o,g as s,i as c,l,m as u,p as d,t as f}from"./firebase-sojJ90-r.js";import{n as p}from"./firebase-IxF1L4zF.js";var m=()=>n(`wiSmile`),h=[`#38bdf8`,`#8b5cf6`,`#10b981`,`#f59e0b`,`#ec4899`,`#f43f5e`,`#14b8a6`],g=()=>m()?`
  <div class="eqp_page">

    <!-- HERO CORPORATIVO PRO -->
    <div class="eqp_hero">
      <div class="eqp_hero_left">
        <div class="eqp_hero_icon"><i class="fas fa-sitemap"></i></div>
        <div class="eqp_hero_txt">
          <div class="eqp_badge"><i class="fas fa-building"></i> Panel Empresarial</div>
          <h1 class="eqp_hero_title">Departamentos</h1>
          <p class="eqp_hero_sub">Organiza a tus colaboradores en equipos y gestiona su entrenamiento.</p>
        </div>
      </div>
      <div class="eqp_hero_actions">
        <button class="eqp_btn_primary" id="eqp_btn_nuevo">
          <i class="fas fa-plus"></i> Nuevo Departamento
        </button>
      </div>
    </div>

    <!-- GRID DE EQUIPOS -->
    <div class="eqp_grid" id="eqp_grid">
      <div class="eqp_empty" style="grid-column: 1 / -1">
        <i class="fas fa-spinner fa-spin"></i><p>Cargando departamentos...</p>
      </div>
    </div>

    <!-- CONTENEDOR MODALES -->
    <div id="eqp_modales"></div>

  </div>`:`<div class="eqp_page"><div class="eqp_empty"><i class="fas fa-lock"></i><p>Sin sesión corporativa.</p></div></div>`,_=[],v=[],y=async()=>{let n=m();n&&(e(document).off(`.eqp`),await x(n),e(document).on(`click.eqp`,`.eqp_modal_close, .eqp_btn_cancel`,C),e(document).on(`click.eqp`,`.eqp_modal_bg`,t=>{e(t.target).hasClass(`eqp_modal_bg`)&&C()}),e(document).on(`click.eqp`,`#eqp_btn_nuevo`,()=>w(n)),e(document).on(`click.eqp`,`.eqp_btn_del`,async function(){let t=e(this).data(`id`);if(confirm(`¿Eliminar el departamento "${t}"? Los colaboradores quedarán sin asignar.`))try{await f(u(p,`clases`,t)),i(`Departamento eliminado`,`info`),await x(n)}catch{i(`Error al eliminar`,`error`)}}),e(document).on(`click.eqp`,`.eqp_btn_ver`,function(){r(`gsClaseActiva`,e(this).data(`id`),1),t(async()=>{let{rutas:e}=await import(`./ruta-CS1Lu3Aw.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/empleados`))}))},b=()=>{e(document).off(`.eqp`)};async function x(t){try{let e=await c(a(d(p,`clases`),o(`empresa_id`,`==`,t.usuario)));e.empty&&(e=await c(a(d(p,`clases`),o(`gestor_id`,`==`,t.usuario)))),_=e.docs.map(e=>({id:e.id,...e.data()}));let n=await c(a(d(p,`lecciones`),o(`empresa_id`,`==`,t.usuario)));n.empty&&(n=await c(a(d(p,`lecciones`),o(`gestor_id`,`==`,t.usuario)))),v=n.docs.map(e=>e.data()),_.forEach(e=>{let t=v.filter(t=>t.equipo_id===e.id||t.clase_id===e.id||t.claseId===e.id);e._totales=t.length,e._activos=t.filter(e=>(e.completadas?.length||0)>0).length}),S()}catch(t){console.error(`[equipos] Error:`,t),e(`#eqp_grid`).html(`<div class="eqp_empty" style="grid-column: 1 / -1"><i class="fas fa-exclamation-triangle"></i><p>Error de conexión.</p></div>`)}}function S(){if(!_.length){e(`#eqp_grid`).html(`
      <div class="eqp_empty" style="grid-column: 1 / -1">
        <i class="fas fa-layer-group"></i><p>No has creado ningún departamento aún.</p>
      </div>`);return}let t=_.map((e,t)=>`
      <div class="eqp_card" style="--cc:${h[t%h.length]}">
        <div class="eqp_card_top">
          <div class="eqp_card_icon"><i class="fas fa-users"></i></div>
          <div class="eqp_card_cod">${e.id}</div>
        </div>
        <h3 class="eqp_card_nombre">${e.nombre||`Departamento`}</h3>
        <div class="eqp_card_desc">${e.descripcion||`Sin descripción corporativa asignada.`}</div>
        
        <div class="eqp_card_stats">
          <div class="eqp_stat">
            <i class="fas fa-user-tie"></i>
            <div>${e._totales} <span>Miembros</span></div>
          </div>
          <div class="eqp_stat">
            <i class="fas fa-bolt"></i>
            <div>${e._activos} <span>Activos</span></div>
          </div>
        </div>

        <div class="eqp_card_foot">
          <button class="eqp_btn_sec eqp_btn_ver" data-id="${e.id}">
            <i class="fas fa-eye"></i> Colaboradores
          </button>
          <button class="eqp_btn_ico danger eqp_btn_del" data-id="${e.id}" title="Eliminar departamento">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`).join(``);e(`#eqp_grid`).html(t)}function C(){e(`#eqp_modales`).html(``)}function w(t){let n=T();e(`#eqp_modales`).html(`
    <div class="eqp_modal_bg">
      <div class="eqp_modal_card">
        <div class="eqp_modal_hdr">
          <h3 class="eqp_modal_title"><i class="fas fa-sitemap"></i> Nuevo Departamento</h3>
          <button class="eqp_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="eqp_modal_body">
          <div class="eqp_field">
            <label>Nombre del Departamento</label>
            <input type="text" id="eqp_inp_nom" class="eqp_input" placeholder="Ej: Ventas, Soporte, IT...">
          </div>
          <div class="eqp_field">
            <label>Descripción / Responsable</label>
            <input type="text" id="eqp_inp_desc" class="eqp_input" placeholder="Ej: Equipo de atención al cliente">
          </div>
          <div class="eqp_field">
            <label>Código Interno de Acceso</label>
            <div class="eqp_code_row">
              <input type="text" id="eqp_inp_cod" class="eqp_input mono" maxlength="6" value="${n}">
              <button class="eqp_btn_gen" id="eqp_gen_cod" title="Generar código aleatorio"><i class="fas fa-dice"></i></button>
            </div>
            <small style="color:var(--tx3);margin-top:0.4vh">Con este código los colaboradores podrán auto-asignarse.</small>
          </div>
        </div>
        <div class="eqp_modal_foot">
          <button class="eqp_btn_cancel">Cancelar</button>
          <button class="eqp_btn_save" id="eqp_save_nuevo"><i class="fas fa-save"></i> Guardar Departamento</button>
        </div>
      </div>
    </div>`),e(document).off(`click.eqp2`,`#eqp_gen_cod`).on(`click.eqp2`,`#eqp_gen_cod`,()=>{e(`#eqp_inp_cod`).val(T())}),e(document).off(`click.eqp2`,`#eqp_save_nuevo`).on(`click.eqp2`,`#eqp_save_nuevo`,async function(){let n=e(`#eqp_inp_nom`).val().trim(),r=e(`#eqp_inp_desc`).val().trim(),a=e(`#eqp_inp_cod`).val().trim().toUpperCase();if(!n){i(`El nombre es requerido`,`warning`);return}if(a.length<4){i(`El código debe tener 4 caracteres o más`,`warning`);return}let o=e(this).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Guardando...`);try{await l(u(p,`clases`,a),{nombre:n,descripcion:r,empresa_id:t.usuario,gestor_id:t.usuario,creadoAt:s(),activa:!0}),i(`Departamento registrado con éxito`,`success`),C(),await x(t)}catch{i(`Error al guardar`,`error`),o.prop(`disabled`,!1).html(`<i class="fas fa-save"></i> Guardar Departamento`)}})}function T(){return Array.from({length:6},()=>`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`[Math.floor(Math.random()*32)]).join(``)}export{b as cleanup,y as init,g as render};