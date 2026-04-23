import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,d as n,s as r,u as i}from"./widev-COmfIAwj.js";import{c as a,d as o,i as s,m as c,p as l,r as u}from"./firebase-sojJ90-r.js";import{n as d}from"./firebase-DsbKBtA3.js";var f=()=>n(`wiSmile`),p=()=>f()?`
  <div class="bq_page">

    <!-- HERO -->
    <div class="bq_hero">
      <div class="bq_hero_orb"></div>
      <div class="bq_hero_left">
        <div class="bq_hero_badge"><i class="fas fa-search"></i> Buscar</div>
        <h1 class="bq_hero_title">Buscar <span>Alumno</span></h1>
        <p class="bq_hero_sub">Encuentra cualquier estudiante por nombre, usuario o email y consulta su progreso completo.</p>
      </div>
    </div>

    <!-- BUSCADOR PRINCIPAL -->
    <div class="bq_search_card">
      <div class="bq_search_row">
        <div class="bq_search_ico"><i class="fas fa-search"></i></div>
        <input id="bq_input" class="bq_search_input" type="text"
          placeholder="Nombre, usuario o email del alumno..."
          autocomplete="off" autocorrect="off" spellcheck="false">
        <button class="bq_search_btn" id="bq_btn_buscar">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <div class="bq_search_tips">
        <span><i class="fas fa-lightbulb"></i> Escribe mínimo 3 caracteres</span>
        <span>·</span>
        <span>Busca por <b>nombre</b>, <b>usuario</b> o <b>email</b></span>
      </div>
    </div>

    <!-- RESULTADOS -->
    <div id="bq_resultados" class="bq_resultados" style="display:none"></div>

    <!-- DETALLE ALUMNO -->
    <div id="bq_detalle" class="bq_detalle" style="display:none"></div>

  </div>`:`<div class="bq_page"><div class="bq_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`,m=()=>{let r=f();if(!r)return;e(document).off(`.bq`);let i=null,a=n(`gsBuscarTerm`);a&&(e(`#bq_input`).val(a),g(a,r),localStorage.removeItem(`gsBuscarTerm`)),e(document).on(`input.bq`,`#bq_input`,function(){clearTimeout(i);let t=e(this).val().trim();if(t.length<3){e(`#bq_resultados, #bq_detalle`).hide().html(``);return}i=setTimeout(()=>g(t,r),500)}),e(document).on(`keydown.bq`,`#bq_input`,function(t){if(t.key===`Enter`){let t=e(this).val().trim();t.length>=3&&g(t,r)}}),e(document).on(`click.bq`,`#bq_btn_buscar`,function(){let t=e(`#bq_input`).val().trim();t.length>=3&&g(t,r)}),e(document).on(`click.bq`,`.bq_result_row`,function(){_(e(this).data(`usuario`),r)}),e(document).on(`click.bq`,`.bq_btn_ir_clase`,function(){let r=e(this).data(`id`);if(!r)return;let{savels:i}=n;t(async()=>{let{savels:e}=await import(`./widev-COmfIAwj.js`).then(e=>e.x);return{savels:e}},[]).then(({savels:e})=>e(`gsClaseActiva`,r,1)),t(async()=>{let{rutas:e}=await import(`./ruta-BTyeG6Yw.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/alumnos`))})},h=()=>{e(document).off(`.bq`)};async function g(t,n){let i=e(`#bq_resultados`).show().html(`
    <div class="bq_loading"><div class="bq_spinner"></div> Buscando...</div>`);e(`#bq_detalle`).hide().html(``);try{let e=t.toLowerCase(),c=await s(a(l(d,`lecciones`),o(`gestor_id`,`==`,n.usuario)));c.empty&&(c=await s(a(l(d,`lecciones`),o(`gestorId`,`==`,n.usuario))));let u=c.docs.map(e=>({usuario:e.id,...e.data()})).filter(t=>{let n=(t.nombre||``).toLowerCase(),r=(t.usuario||``).toLowerCase(),i=(t.email||``).toLowerCase();return n.includes(e)||r.includes(e)||i.includes(e)});if(!u.length){i.html(`
        <div class="bq_empty">
          <i class="fas fa-user-slash"></i>
          <p>No encontramos alumnos con "<b>${t}</b>".</p>
          <small>Solo aparecen alumnos vinculados a tus clases.</small>
        </div>`);return}i.html(`
      <div class="bq_result_hdr">
        <i class="fas fa-users"></i> ${u.length} resultado${u.length===1?``:`s`} encontrado${u.length===1?``:`s`}
      </div>
      <div class="bq_result_list">
        ${u.map(e=>{let t=r(e.nombre||e.usuario||`U`),n=e.completadas?.length||0,i=e.wpmMax||0,a=e.clase_id||e.claseId||null;return`
            <div class="bq_result_row" data-usuario="${e.usuario}">
              <div class="bq_res_av">${t}</div>
              <div class="bq_res_info">
                <div class="bq_res_nombre">${e.nombre||e.usuario||`—`}</div>
                <div class="bq_res_meta">${e.email||``} ${a?`· Clase: ${a}`:``}</div>
              </div>
              <div class="bq_res_stats">
                <span class="bq_chip wpm"><i class="fas fa-bolt"></i> ${i} WPM</span>
                <span class="bq_chip lec"><i class="fas fa-graduation-cap"></i> ${n}/45 Lec</span>
              </div>
              <i class="fas fa-chevron-right bq_res_arr"></i>
            </div>`}).join(``)}
      </div>`)}catch(e){console.error(`[buscar] error:`,e),i.html(`<div class="bq_empty"><i class="fas fa-exclamation-triangle"></i><p>Error al buscar.</p></div>`)}}async function _(t,n){e(`#bq_detalle`).show().html(`
    <div class="bq_loading"><div class="bq_spinner"></div> Cargando detalle...</div>`);try{let n=await u(c(d,`lecciones`,t)),a=n.exists()?{usuario:t,...n.data()}:{usuario:t},o=[];try{o=(await s(l(d,`lecciones`,t,`detalle`))).docs.map(e=>e.data()),o.sort((e,t)=>{let n=e.fecha?.toDate?e.fecha.toDate().getTime():0;return(t.fecha?.toDate?t.fecha.toDate().getTime():0)-n})}catch(e){console.warn(`[buscar] Sin acceso a subcolección detalle`,e)}let f=r(a.nombre||t||`U`),p=a.wpmMax||0,m=a.precision||0,h=a.completadas?.length||0,g=Math.round(h/45*100),_=a.clase_id||a.claseId||null,v=o.length>0?o.map(e=>{let t=e.leccionId||e.nivel||`?`,n=e.fecha?.toDate?i(e.fecha):`—`;return`
            <div class="bq_his_row">
              <span class="bq_his_num">L${String(t).padStart(2,`0`)}</span>
              <span class="bq_his_wpm"><i class="fas fa-bolt"></i> ${e.wpm||0} WPM</span>
              <span class="bq_his_prec"><i class="fas fa-bullseye"></i> ${e.precision||0}%</span>
              <span class="bq_his_stars">${e.estrellas?`★`.repeat(e.estrellas):``}</span>
              <span style="margin-left:auto;color:var(--tx3);font-size:var(--fz_s4)">${n}</span>
            </div>`}).join(``):`<div style="color:var(--tx3);padding:2vh">Sin historial registrado en la subcolección.</div>`;e(`#bq_detalle`).html(`
      <div class="bq_det_card">

        <!-- Header alumno -->
        <div class="bq_det_hdr">
          <div class="bq_det_av">${f}</div>
          <div class="bq_det_info">
            <div class="bq_det_nombre">${a.nombre||t}</div>
            <div class="bq_det_meta">${a.email||t} · ${a.rol||`smile`}</div>
            ${_?`
              <div class="bq_det_clase">
                <i class="fas fa-chalkboard"></i> Clase: <b>${_}</b>
                <button class="bq_btn_mini bq_btn_ir_clase" data-id="${_}">
                  <i class="fas fa-arrow-right"></i> Ver clase
                </button>
              </div>`:`<div class="bq_det_clase" style="color:var(--tx3)"><i class="fas fa-user"></i> Sin clase asignada</div>`}
          </div>
        </div>

        <!-- KPIs -->
        <div class="bq_det_kpis">
          <div class="bq_det_kpi"><div class="bq_dk_val" style="color:var(--mco)">${h}</div><div class="bq_dk_lbl">Lecciones</div></div>
          <div class="bq_det_kpi"><div class="bq_dk_val" style="color:#f59e0b">${p}</div><div class="bq_dk_lbl">WPM Max</div></div>
          <div class="bq_det_kpi"><div class="bq_dk_val" style="color:#22c55e">${m}%</div><div class="bq_dk_lbl">Precisión</div></div>
          <div class="bq_det_kpi"><div class="bq_dk_val">${g}%</div><div class="bq_dk_lbl">Avance</div></div>
        </div>

        <!-- Barra de progreso -->
        <div class="bq_det_prog">
          <div class="bq_prog_track">
            <div class="bq_prog_fill" style="width:${g}%"></div>
          </div>
          <span>${h} de 45 lecciones completadas</span>
        </div>

        <!-- Historial reciente (Subcolección) -->
        <div class="bq_det_sec"><i class="fas fa-clock-rotate-left"></i> Historial detallado de lecciones</div>
        <div class="bq_his_list">${v}</div>

      </div>`)}catch(t){console.error(`[buscar] detalle:`,t),e(`#bq_detalle`).html(`<div class="bq_empty"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar detalle.</p></div>`)}}export{h as cleanup,m as init,p as render};