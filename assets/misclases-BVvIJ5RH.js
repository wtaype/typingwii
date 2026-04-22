import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,d as n,f as r,i}from"./widev-BVXcYvSP.js";import{c as a,d as o,g as s,i as c,l,m as u,p as d,t as f}from"./firebase-sojJ90-r.js";import{n as p}from"./firebase-IxF1L4zF.js";var m=()=>n(`wiSmile`),h=`gsClases`,g=[`#6366f1`,`#0ea5e9`,`#22c55e`,`#f59e0b`,`#ec4899`,`#a855f7`,`#ef4444`,`#06b6d4`],_=()=>m()?`
  <div class="mc_page">

    <!-- HERO -->
    <div class="mc_hero">
      <div class="mc_hero_orb"></div>
      <div class="mc_hero_left">
        <div class="mc_hero_badge"><i class="fas fa-chalkboard-teacher"></i> Gestión de Clases</div>
        <h1 class="mc_hero_title">Mis <span>Clases</span></h1>
        <p class="mc_hero_sub">Crea y administra tus aulas. Asigna lecciones y monitorea el avance de tus alumnos.</p>
      </div>
      <button class="mc_btn_new" id="mc_btn_nueva">
        <i class="fas fa-plus"></i> Nueva Clase
      </button>
    </div>

    <!-- KPIs -->
    <div class="mc_kpis_row" id="mc_kpis">
      ${[{id:`mc_k_clases`,ico:`fa-chalkboard`,col:`var(--mco)`,lbl:`Mis Clases`,val:`—`},{id:`mc_k_alumnos`,ico:`fa-users`,col:`#22c55e`,lbl:`Total Alumnos`,val:`—`},{id:`mc_k_activas`,ico:`fa-circle`,col:`#f59e0b`,lbl:`Clases Activas`,val:`—`}].map(e=>`
        <div class="mc_kpi_card">
          <div class="mc_kpi_ico" style="color:${e.col}"><i class="fas ${e.ico}"></i></div>
          <div class="mc_kpi_val" id="${e.id}">${e.val}</div>
          <div class="mc_kpi_lbl">${e.lbl}</div>
        </div>`).join(``)}
    </div>

    <!-- LISTA DE CLASES -->
    <div class="mc_sec_hdr">
      <i class="fas fa-chalkboard"></i> Mis clases
      <span class="mc_sec_count" id="mc_count">—</span>
    </div>
    <div class="mc_clases_grid" id="mc_grid">
      ${v(3)}
    </div>

    <!-- MODAL NUEVA CLASE -->
    <div class="mc_modal_bg" id="mc_modal" style="display:none">
      <div class="mc_modal_card">
        <div class="mc_modal_hdr">
          <h3 id="mc_modal_title"><i class="fas fa-plus"></i> Nueva Clase</h3>
          <button class="mc_modal_close" id="mc_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="mc_modal_body">
          <div class="mc_field">
            <label>Nombre de la clase</label>
            <input id="mc_inp_nombre" type="text" class="mc_input" placeholder="Ej: Computación 3ro A">
          </div>
          <div class="mc_field">
            <label>Descripción (opcional)</label>
            <input id="mc_inp_desc" type="text" class="mc_input" placeholder="Ej: Turno mañana">
          </div>
          <div class="mc_field">
            <label>Código de clase</label>
            <div class="mc_code_row">
              <input id="mc_inp_codigo" type="text" class="mc_input mono" maxlength="6" placeholder="AUTO">
              <button class="mc_code_gen" id="mc_gen_codigo"><i class="fas fa-dice"></i></button>
            </div>
            <small style="color:var(--tx3);margin-top:.4vh;display:block">El alumno usará este código para unirse</small>
          </div>
        </div>
        <div class="mc_modal_foot">
          <button class="mc_btn_cancel" id="mc_modal_cancel">Cancelar</button>
          <button class="mc_btn_save" id="mc_modal_save"><i class="fas fa-save"></i> Guardar Clase</button>
        </div>
      </div>
    </div>

  </div>`:`<div class="mc_page"><div class="mc_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`;function v(e){return Array.from({length:e},()=>`
    <div class="mc_clase_card mc_skeleton">
      <div class="mc_sk_head"></div>
      <div class="mc_sk_line"></div>
      <div class="mc_sk_line mc_sk_sm"></div>
    </div>`).join(``)}function y(e,t){let n=g[t%g.length],r=e._countAlumnos||0,i=e.leccionesAsignadas?.length||0,a=e.avisos?.length||0;return`
    <div class="mc_clase_card" style="--cc:${n}" data-id="${e.id}">
      <div class="mc_clase_bar"></div>
      <div class="mc_clase_top">
        <div class="mc_clase_ico"><i class="fas fa-chalkboard-teacher"></i></div>
        <div class="mc_clase_cod">${e.id}</div>
      </div>
      <div class="mc_clase_nombre">${e.nombre||`Sin nombre`}</div>
      ${e.descripcion?`<div class="mc_clase_desc">${e.descripcion}</div>`:``}
      <div class="mc_clase_stats">
        <span><i class="fas fa-users"></i> ${r} Alumnos</span>
        <span><i class="fas fa-graduation-cap"></i> ${i} Asignadas</span>
        <span><i class="fas fa-bell"></i> ${a} Avisos</span>
      </div>
      <div class="mc_clase_foot">
        <button class="mc_cl_btn primary mc_ir_clase" data-id="${e.id}" title="Ver alumnos">
          <i class="fas fa-users"></i> Ver alumnos
        </button>
        <button class="mc_cl_btn ghost mc_edit_clase" data-id="${e.id}" title="Editar">
          <i class="fas fa-pen"></i>
        </button>
        <button class="mc_cl_btn danger mc_del_clase" data-id="${e.id}" title="Eliminar">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`}var b=async()=>{let t=m();t&&(e(document).off(`.mc`),await S(t),w(t))},x=()=>{e(document).off(`.mc`)};async function S(t){try{let e=await c(a(d(p,`clases`),o(`gestor_id`,`==`,t.usuario)));e.empty&&(e=await c(a(d(p,`clases`),o(`gestorId`,`==`,t.usuario))));let n=e.docs.map(e=>({id:e.id,...e.data()})),i=await c(a(d(p,`lecciones`),o(`gestor_id`,`==`,t.usuario)));i.empty&&(i=await c(a(d(p,`lecciones`),o(`gestorId`,`==`,t.usuario))));let s=i.docs.map(e=>e.data());n.forEach(e=>{e._countAlumnos=s.filter(t=>t.clase_id===e.id||t.claseId===e.id).length}),r(h,n,1),C(n)}catch(t){console.error(`[misclases] Error:`,t),e(`#mc_grid`).html(`<div class="mc_empty_card"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar clases.</p></div>`)}}function C(t){let n=t.length,r=t.reduce((e,t)=>e+(t._countAlumnos||0),0),i=t.filter(e=>e.activa!==!1).length;if(e(`#mc_k_clases`).text(n),e(`#mc_k_alumnos`).text(r),e(`#mc_k_activas`).text(i),e(`#mc_count`).text(n),!n){e(`#mc_grid`).html(`
      <div class="mc_empty_card">
        <i class="fas fa-chalkboard"></i>
        <p>Aún no tienes clases. ¡Crea la primera!</p>
      </div>`);return}e(`#mc_grid`).html(t.map((e,t)=>y(e,t)).join(``))}function w(n){let a=e(`#mc_modal`),o=()=>{e(`#mc_inp_nombre,#mc_inp_desc`).val(``),e(`#mc_inp_codigo`).val(T()),a.fadeIn(200)},c=()=>a.fadeOut(180);e(document).on(`click.mc`,`#mc_btn_nueva`,o),e(document).on(`click.mc`,`#mc_modal_close, #mc_modal_cancel`,c),e(document).on(`click.mc`,`#mc_modal_bg`,t=>{e(t.target).is(`#mc_modal`)&&c()}),e(document).on(`click.mc`,`#mc_gen_codigo`,()=>e(`#mc_inp_codigo`).val(T())),e(document).on(`click.mc`,`#mc_modal_save`,async()=>{let t=e(`#mc_inp_nombre`).val().trim(),r=e(`#mc_inp_desc`).val().trim(),a=e(`#mc_inp_codigo`).val().trim().toUpperCase();if(!t){i(`Ingresa un nombre para la clase`,`warning`);return}if(a.length<4){i(`El código debe tener al menos 4 caracteres`,`warning`);return}let o=e(`#mc_modal_save`).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Guardando...`);try{await l(u(p,`clases`,a),{nombre:t,descripcion:r||``,gestor_id:n.usuario,gestorId:n.usuario,gestorEmail:n.email||``,gestorNombre:n.nombre||n.nombres||n.usuario,leccionesAsignadas:[],avisos:[],activa:!0,creadoAt:s()}),i(`Clase "${t}" creada con código ${a}`,`success`),c(),await S(n)}catch(e){console.error(`[misclases] Error creando:`,e),i(`Error al crear la clase`,`error`)}o.prop(`disabled`,!1).html(`<i class="fas fa-save"></i> Guardar Clase`)}),e(document).on(`click.mc`,`.mc_ir_clase`,function(){r(`gsClaseActiva`,e(this).data(`id`),1),t(async()=>{let{rutas:e}=await import(`./ruta-CS1Lu3Aw.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/alumnos`))}),e(document).on(`click.mc`,`.mc_del_clase`,async function(){let t=e(this).data(`id`);if(confirm(`¿Eliminar la clase "${t}"? Esta acción no se puede deshacer y desvinculará a los alumnos de esta clase.`))try{await f(u(p,`clases`,t)),i(`Clase eliminada`,`info`),await S(n)}catch{i(`Error al eliminar`,`error`)}})}function T(){return Array.from({length:6},()=>`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`[Math.floor(Math.random()*32)]).join(``)}export{x as cleanup,b as init,_ as render};