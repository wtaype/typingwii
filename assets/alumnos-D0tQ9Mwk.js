import{t as e}from"./vendor-BDh6mtVu.js";import{d as t,i as n,s as r,u as i}from"./widev-BVXcYvSP.js";import{c as a,d as o,f as s,i as c,m as l,p as u,u as d}from"./firebase-sojJ90-r.js";import{n as f}from"./firebase-IxF1L4zF.js";var p=()=>t(`wiSmile`),m=()=>p()?`
  <div class="al_page">

    <!-- HERO -->
    <div class="al_hero">
      <div class="al_hero_orb"></div>
      <div class="al_hero_left">
        <div class="al_hero_badge"><i class="fas fa-users"></i> Alumnos</div>
        <h1 class="al_hero_title">Gestión de <span>Estudiantes</span></h1>
        <p class="al_hero_sub">Supervisa el progreso, asigna lecciones y envía avisos a tu clase.</p>
      </div>
      <div class="al_hero_actions">
        <button class="al_btn_primary" id="al_btn_asignar">
          <i class="fas fa-tasks"></i> Asignar Lecciones
        </button>
        <button class="al_btn_ghost" id="al_btn_aviso">
          <i class="fas fa-bullhorn"></i> Enviar Aviso
        </button>
      </div>
    </div>

    <!-- FILTROS -->
    <div class="al_filtros" id="al_filtros">
      <button class="al_filtro active" data-f="todos">Todos</button>
      <button class="al_filtro" data-f="activos">Con Actividad</button>
      <button class="al_filtro" data-f="inactivos">Sin Actividad</button>
    </div>

    <!-- TABLA DE ALUMNOS -->
    <div class="al_table_wrap">
      <table class="al_table">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Clase</th>
            <th>Progreso Global</th>
            <th>Estadísticas</th>
            <th>Última Actividad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody id="al_table_body">
          <tr><td colspan="6"><div class="al_loading"><div class="al_spinner"></div> Cargando alumnos...</div></td></tr>
        </tbody>
      </table>
    </div>

    <!-- MODALES (SE INYECTAN EN JS) -->
    <div id="al_modales"></div>

  </div>`:`<div class="al_page"><div class="al_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`,h=async()=>{let t=p();t&&(e(document).off(`.al`),await y(t),e(document).on(`click.al`,`.al_filtro`,function(){e(`.al_filtro`).removeClass(`active`),e(this).addClass(`active`),b()}),e(document).on(`click.al`,`.al_modal_close, .al_btn_cancel`,S),e(document).on(`click.al`,`.al_modal_bg`,t=>{e(t.target).hasClass(`al_modal_bg`)&&S()}))},g=()=>{e(document).off(`.al`)},_=[],v=[];async function y(n){try{let r=await c(a(u(f,`clases`),o(`gestor_id`,`==`,n.usuario)));r.empty&&(r=await c(a(u(f,`clases`),o(`gestorId`,`==`,n.usuario)))),v=r.docs.map(e=>({id:e.id,...e.data()}));let i=await c(a(u(f,`lecciones`),o(`gestor_id`,`==`,n.usuario)));i.empty&&(i=await c(a(u(f,`lecciones`),o(`gestorId`,`==`,n.usuario)))),_=i.docs.map(e=>({usuario:e.id,...e.data()}));let s=t(`gsClaseActiva`);s&&(_=_.filter(e=>e.clase_id===s||e.claseId===s),localStorage.removeItem(`gsClaseActiva`),e(`#al_filtros`).prepend(`<button class="al_filtro active" data-f="clase">Clase: ${s}</button>`)),b(),x(n)}catch(t){console.error(`[alumnos] Error:`,t),e(`#al_table_body`).html(`<tr><td colspan="6"><div class="al_empty"><i class="fas fa-exclamation-triangle"></i><p>Error cargando datos.</p></div></td></tr>`)}}function b(){let t=e(`.al_filtro.active`).data(`f`),n=_;if(t===`activos`&&(n=_.filter(e=>(e.completadas?.length||0)>0)),t===`inactivos`&&(n=_.filter(e=>!e.completadas?.length)),!n.length){e(`#al_table_body`).html(`
      <tr><td colspan="6">
        <div class="al_empty"><i class="fas fa-user-slash"></i><p>No se encontraron alumnos.</p></div>
      </td></tr>`);return}let a=n.map(e=>{let t=e.nombre||e.usuario||`—`,n=r(t),a=e.completadas?.length||0,o=e.wpmMax||0,s=e.precision||0,c=Math.round(a/45*100),l=e.ultPractica?.toDate?i(e.ultPractica):`Sin registro`,u=e.clase_id||e.claseId||`Sin clase`;return`
      <tr class="al_row">
        <td>
          <div class="al_alumno_cell">
            <div class="al_av">${n}</div>
            <div>
              <div class="al_nombre">${t}</div>
              <div class="al_email">${e.email||e.usuario}</div>
            </div>
          </div>
        </td>
        <td>
          <span style="font-weight:700;color:var(--tx3);font-size:var(--fz_s4)">${u}</span>
        </td>
        <td>
          <div class="al_prog">
            <div class="al_prog_bar"><div class="al_prog_fill" style="width:${c}%"></div></div>
            <span>${a}/45</span>
          </div>
        </td>
        <td>
          <div style="display:flex;gap:.8vh">
            <span class="al_badge wpm"><i class="fas fa-bolt"></i> ${o}</span>
            <span class="al_badge prec"><i class="fas fa-bullseye"></i> ${s}%</span>
          </div>
        </td>
        <td><span class="al_fecha">${l}</span></td>
        <td>
          <button class="al_btn_det al_ver_detalle" data-u="${e.usuario}" title="Ver detalle">
            <i class="fas fa-eye"></i>
          </button>
        </td>
      </tr>`}).join(``);e(`#al_table_body`).html(a)}function x(t){e(document).on(`click.al`,`.al_ver_detalle`,function(){let t=e(this).data(`u`),n=_.find(e=>e.usuario===t);n&&C(n)}),e(document).on(`click.al`,`#al_btn_asignar`,()=>{if(!v.length){n(`No tienes clases creadas aún.`,`warning`);return}w()}),e(document).on(`click.al`,`#al_btn_aviso`,()=>{if(!v.length){n(`No tienes clases creadas aún.`,`warning`);return}T()}),e(document).on(`click.al`,`#al_save_asignar`,async function(){let t=e(`#al_sel_clase`).val(),r=[];if(e(`.al_lec_chk input:checked`).each(function(){r.push(Number(e(this).val()))}),!r.length){n(`Selecciona al menos una lección`,`warning`);return}let i=e(this).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i>`);try{await d(l(f,`clases`,t),{leccionesAsignadas:r}),n(`Asignadas ${r.length} lecciones a la clase ${t}`,`success`),S()}catch{n(`Error al asignar`,`error`)}i.prop(`disabled`,!1).html(`Guardar Cambios`)}),e(document).on(`click.al`,`#al_save_aviso`,async function(){let t=e(`#al_aviso_clase`).val(),r=e(`#al_aviso_tipo`).val(),i=e(`#al_aviso_tit`).val().trim(),a=e(`#al_aviso_msg`).val().trim();if(!i||!a){n(`Completa título y mensaje`,`warning`);return}let o={id:Date.now().toString(),tipo:r,titulo:i,mensaje:a,fecha:new Date().toISOString()},c=e(this).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i>`);try{await d(l(f,`clases`,t),{avisos:s(o)}),n(`Aviso enviado`,`success`),S()}catch{n(`Error al enviar`,`error`)}c.prop(`disabled`,!1).html(`Enviar Aviso`)})}function S(){e(`#al_modales`).html(``)}function C(t){let n=t.nombre||t.usuario||`—`,i=r(n),a=t.completadas||[],o=t.wpmMax||0,s=t.precision||0,c=Array.from({length:45},(e,t)=>{let n=a.includes(t+1);return`<div class="al_lec_chip ${n?`ok`:`no`}">${n?`<i class="fas fa-check"></i>`:``} Lec ${t+1}</div>`}).join(``);e(`#al_modales`).html(`
    <div class="al_modal_bg">
      <div class="al_modal_card">
        <div class="al_modal_hdr">
          <div class="al_modal_av">${i}</div>
          <div style="flex:1">
            <h3 class="al_modal_nombre">${n}</h3>
            <div class="al_modal_sub">${t.email||t.usuario} · Clase: ${t.clase_id||t.claseId||`N/A`}</div>
          </div>
          <button class="al_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="al_modal_stats">
          <div class="al_det_kpi"><div class="al_det_kv" style="color:var(--mco)">${a.length}/45</div><div class="al_det_kl">Lecciones</div></div>
          <div class="al_det_kpi"><div class="al_det_kv" style="color:#f59e0b">${o}</div><div class="al_det_kl">WPM Max</div></div>
          <div class="al_det_kpi"><div class="al_det_kv" style="color:#22c55e">${s}%</div><div class="al_det_kl">Precisión</div></div>
        </div>
        <div class="al_modal_lecs">
          <h4 style="margin:0 0 1vh;font-size:var(--fz_m1);color:var(--tx)">Progreso por lección</h4>
          <div class="al_lecs_chips">${c}</div>
        </div>
      </div>
    </div>`)}function w(){let t=Array.from({length:45},(e,t)=>`
    <label class="al_lec_chk">
      <input type="checkbox" value="${t+1}">
      <span>Lección ${t+1}</span>
    </label>`).join(``);e(`#al_modales`).html(`
    <div class="al_modal_bg">
      <div class="al_modal_card">
        <div class="al_modal_hdr">
          <h3><i class="fas fa-tasks"></i> Asignar Lecciones</h3>
          <button class="al_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div style="padding:2.5vh">
          <div class="al_field" style="margin-bottom:2vh">
            <label>Selecciona la clase</label>
            <select class="al_input" id="al_sel_clase">
              ${v.map(e=>`<option value="${e.id}">${e.id} - ${e.nombre}</option>`).join(``)}
            </select>
          </div>
          <div class="al_field">
            <label>Selecciona las lecciones obligatorias</label>
            <div class="al_lecs_pick">${t}</div>
          </div>
        </div>
        <div class="al_modal_foot">
          <button class="al_btn_cancel">Cancelar</button>
          <button class="al_btn_save" id="al_save_asignar">Guardar Cambios</button>
        </div>
      </div>
    </div>`)}function T(){e(`#al_modales`).html(`
    <div class="al_modal_bg">
      <div class="al_modal_card">
        <div class="al_modal_hdr">
          <h3><i class="fas fa-bullhorn"></i> Enviar Aviso</h3>
          <button class="al_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div style="padding:2.5vh;display:flex;flex-direction:column;gap:1.5vh">
          <div class="al_field">
            <label>Clase destino</label>
            <select class="al_input" id="al_aviso_clase">
              ${v.map(e=>`<option value="${e.id}">${e.id} - ${e.nombre}</option>`).join(``)}
            </select>
          </div>
          <div class="al_field">
            <label>Tipo de aviso</label>
            <select class="al_input" id="al_aviso_tipo">
              <option value="info">Información general</option>
              <option value="tarea">Recordatorio de tarea</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>
          <div class="al_field">
            <label>Título del aviso</label>
            <input type="text" class="al_input" id="al_aviso_tit" placeholder="Ej: Práctica obligatoria">
          </div>
          <div class="al_field">
            <label>Mensaje</label>
            <textarea class="al_input al_textarea" id="al_aviso_msg" placeholder="Escribe el mensaje detallado..."></textarea>
          </div>
        </div>
        <div class="al_modal_foot">
          <button class="al_btn_cancel">Cancelar</button>
          <button class="al_btn_save" id="al_save_aviso">Enviar Aviso</button>
        </div>
      </div>
    </div>`)}export{g as cleanup,h as init,m as render};