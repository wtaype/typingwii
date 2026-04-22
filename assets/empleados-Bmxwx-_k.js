import{t as e}from"./vendor-BDh6mtVu.js";import{d as t,i as n,s as r}from"./widev-BVXcYvSP.js";import{c as i,d as a,i as o,p as s}from"./firebase-sojJ90-r.js";import{n as c}from"./firebase-IxF1L4zF.js";var l=()=>t(`wiSmile`),u=()=>l()?`
  <div class="ep_page">

    <!-- HERO CORPORATIVO PRO -->
    <div class="ep_hero">
      <div class="ep_hero_left">
        <div class="ep_hero_icon"><i class="fas fa-building"></i></div>
        <div class="ep_hero_txt">
          <div class="ep_badge"><i class="fas fa-users"></i> Panel Empresarial</div>
          <h1 class="ep_hero_title">Gestión de Equipo</h1>
          <p class="ep_hero_sub">Administra y evalúa el entrenamiento de tus colaboradores.</p>
        </div>
      </div>
      <div class="ep_hero_actions">
        <button class="ep_btn_primary" id="ep_btn_invitar">
          <i class="fas fa-user-plus"></i> Añadir Colaborador
        </button>
      </div>
    </div>

    <!-- CONTROLES -->
    <div class="ep_controls">
      <div class="ep_tabs">
        <button class="ep_tab active" data-f="todos">Todos</button>
        <button class="ep_tab" data-f="activos">Activos</button>
        <button class="ep_tab" data-f="inactivos">Inactivos</button>
      </div>
      <div class="ep_search">
        <i class="fas fa-search"></i>
        <input type="text" id="ep_search_inp" placeholder="Buscar por nombre o correo...">
      </div>
    </div>

    <!-- GRID DE EMPLEADOS -->
    <div class="ep_grid" id="ep_grid">
      <div class="ep_empty" style="grid-column: 1 / -1">
        <i class="fas fa-spinner fa-spin"></i><p>Cargando nómina...</p>
      </div>
    </div>

    <!-- CONTENEDOR MODALES -->
    <div id="ep_modales"></div>

  </div>`:`<div class="ep_page"><div class="ep_empty"><i class="fas fa-lock"></i><p>Sin sesión corporativa.</p></div></div>`,d=[],f=[],p=async()=>{let t=l();if(!t)return;e(document).off(`.ep`),await h(t),e(document).on(`click.ep`,`.ep_tab`,function(){e(`.ep_tab`).removeClass(`active`),e(this).addClass(`active`),g()});let n;e(document).on(`input.ep`,`#ep_search_inp`,function(){clearTimeout(n),n=setTimeout(()=>g(),300)}),e(document).on(`click.ep`,`.ep_modal_close, .ep_btn_cancel`,_),e(document).on(`click.ep`,`.ep_modal_bg`,t=>{e(t.target).hasClass(`ep_modal_bg`)&&_()}),e(document).on(`click.ep`,`#ep_btn_invitar`,y),e(document).on(`click.ep`,`.ep_btn_ver`,function(){let t=e(this).data(`u`),n=d.find(e=>e.usuario===t);n&&v(n)})},m=()=>{e(document).off(`.ep`)};async function h(t){try{let e=await o(i(s(c,`lecciones`),a(`empresa_id`,`==`,t.usuario)));e.empty&&(e=await o(i(s(c,`lecciones`),a(`gestor_id`,`==`,t.usuario)))),d=e.docs.map(e=>({usuario:e.id,...e.data()}));let n=await o(i(s(c,`clases`),a(`empresa_id`,`==`,t.usuario)));n.empty&&(n=await o(i(s(c,`clases`),a(`gestor_id`,`==`,t.usuario)))),f=n.docs.map(e=>({id:e.id,...e.data()})),g()}catch(t){console.error(`[empleados] Error:`,t),e(`#ep_grid`).html(`<div class="ep_empty" style="grid-column: 1 / -1"><i class="fas fa-exclamation-triangle"></i><p>Error de conexión al servidor.</p></div>`)}}function g(){let t=e(`.ep_tab.active`).data(`f`),n=e(`#ep_search_inp`).val().trim().toLowerCase(),i=d;if(t===`activos`&&(i=i.filter(e=>(e.completadas?.length||0)>0)),t===`inactivos`&&(i=i.filter(e=>!e.completadas?.length)),n&&(i=i.filter(e=>{let t=(e.nombre||``).toLowerCase(),r=(e.email||``).toLowerCase();return t.includes(n)||r.includes(n)})),!i.length){e(`#ep_grid`).html(`
      <div class="ep_empty" style="grid-column: 1 / -1">
        <i class="fas fa-folder-open"></i><p>No se encontraron colaboradores.</p>
      </div>`);return}let a=i.map(e=>{let t=e.nombre||e.usuario||`—`,n=r(t),i=e.equipo_id||e.clase_id||e.claseId||`General`,a=e.completadas?.length||0,o=e.wpmMax||0,s=e.precision||0,c=Math.round(a/45*100),l=a>0;return`
      <div class="ep_card">
        <div class="ep_card_badge ${l?`act`:`inact`}">${l?`Activo`:`Inactivo`}</div>
        <div class="ep_avatar">${n}</div>
        <div class="ep_card_nombre">${t}</div>
        <div class="ep_card_email">${e.email||e.usuario}</div>
        <div class="ep_card_equipo"><i class="fas fa-layer-group"></i> ${i}</div>
        
        <div class="ep_prog_wrap">
          <div class="ep_prog_txt"><span>Avance</span> <span>${c}%</span></div>
          <div class="ep_prog_bar"><div class="ep_prog_fill" style="width:${c}%"></div></div>
        </div>

        <div class="ep_card_stats">
          <div class="ep_stat">
            <div class="ep_stat_val" style="color:#f59e0b"><i class="fas fa-bolt"></i> ${o}</div>
            <div class="ep_stat_lbl">WPM</div>
          </div>
          <div class="ep_stat">
            <div class="ep_stat_val" style="color:#22c55e"><i class="fas fa-bullseye"></i> ${s}%</div>
            <div class="ep_stat_lbl">Precisión</div>
          </div>
        </div>

        <button class="ep_btn_ver" data-u="${e.usuario}"><i class="fas fa-eye"></i> Ver Detalle</button>
      </div>`}).join(``);e(`#ep_grid`).html(a)}function _(){e(`#ep_modales`).html(``)}function v(t){let n=t.nombre||t.usuario,i=t.completadas?.length||0,a=Math.round(i/45*100);e(`#ep_modales`).html(`
    <div class="ep_modal_bg">
      <div class="ep_modal_card">
        <div class="ep_modal_hdr">
          <h3 class="ep_modal_title"><i class="fas fa-id-badge"></i> Ficha del Colaborador</h3>
          <button class="ep_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="ep_modal_body">
          <div style="display:flex;align-items:center;gap:2.5vh">
            <div class="ep_avatar" style="margin:0;width:8vh;height:8vh;font-size:3vh">${r(n)}</div>
            <div>
              <h2 style="margin:0;font-size:var(--fz_l1);font-weight:900;color:var(--tx)">${n}</h2>
              <div style="color:var(--tx3);font-size:var(--fz_m1);margin-top:.5vh">${t.email||t.usuario}</div>
            </div>
          </div>
          
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:1.5vh;margin-top:2vh">
            <div style="background:var(--bg4);border:1px solid var(--brd);border-radius:1.5vh;padding:2vh;text-align:center">
              <div style="font-size:var(--fz_l1);font-weight:900;color:var(--mco);line-height:1">${i}</div>
              <div style="font-size:var(--fz_s4);font-weight:700;color:var(--tx3);margin-top:.8vh;text-transform:uppercase">Lecciones</div>
            </div>
            <div style="background:var(--bg4);border:1px solid var(--brd);border-radius:1.5vh;padding:2vh;text-align:center">
              <div style="font-size:var(--fz_l1);font-weight:900;color:#f59e0b;line-height:1">${t.wpmMax||0}</div>
              <div style="font-size:var(--fz_s4);font-weight:700;color:var(--tx3);margin-top:.8vh;text-transform:uppercase">WPM Máx</div>
            </div>
            <div style="background:var(--bg4);border:1px solid var(--brd);border-radius:1.5vh;padding:2vh;text-align:center">
              <div style="font-size:var(--fz_l1);font-weight:900;color:#22c55e;line-height:1">${t.precision||0}%</div>
              <div style="font-size:var(--fz_s4);font-weight:700;color:var(--tx3);margin-top:.8vh;text-transform:uppercase">Precisión</div>
            </div>
          </div>

          <div class="ep_field" style="margin-top:2vh">
            <div style="display:flex;justify-content:space-between;font-size:var(--fz_s4);font-weight:700;color:var(--tx3);margin-bottom:.8vh">
              <span>Progreso del Curso</span><span>${a}%</span>
            </div>
            <div style="width:100%;height:1.5vh;background:var(--brd);border-radius:10vh;overflow:hidden">
              <div style="height:100%;background:var(--mco);width:${a}%;border-radius:10vh"></div>
            </div>
          </div>
        </div>
        <div class="ep_modal_foot">
          <button class="ep_btn_cancel">Cerrar</button>
        </div>
      </div>
    </div>`)}function y(){let t=f.map(e=>`<option value="${e.id}">${e.nombre||e.id}</option>`).join(``);e(`#ep_modales`).html(`
    <div class="ep_modal_bg">
      <div class="ep_modal_card">
        <div class="ep_modal_hdr">
          <h3 class="ep_modal_title"><i class="fas fa-user-plus"></i> Registrar Colaborador</h3>
          <button class="ep_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="ep_modal_body">
          <div class="ep_field">
            <label>Correo corporativo</label>
            <input type="email" id="ep_inv_eml" class="ep_input" placeholder="ejemplo@empresa.com">
          </div>
          <div class="ep_field">
            <label>Nombre completo</label>
            <input type="text" id="ep_inv_nom" class="ep_input" placeholder="Nombre y Apellido">
          </div>
          <div class="ep_field">
            <label>Asignar a Departamento</label>
            <select id="ep_inv_eq" class="ep_input">
              <option value="">(General)</option>
              ${t}
            </select>
          </div>
        </div>
        <div class="ep_modal_foot">
          <button class="ep_btn_cancel">Cancelar</button>
          <button class="ep_btn_save" id="ep_save_invitar"><i class="fas fa-check"></i> Enviar Invitación</button>
        </div>
      </div>
    </div>`),e(document).off(`click.ep2`,`#ep_save_invitar`).on(`click.ep2`,`#ep_save_invitar`,function(){let t=e(`#ep_inv_eml`).val().trim(),r=e(`#ep_inv_nom`).val().trim();if(!t||!r){n(`El correo y nombre son obligatorios`,`warning`);return}n(`Invitación enviada a ${t} exitosamente`,`success`),_()})}export{m as cleanup,p as init,u as render};