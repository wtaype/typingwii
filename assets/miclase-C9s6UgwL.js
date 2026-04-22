import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,d as n,f as r,i}from"./widev-BVXcYvSP.js";import{f as a,g as o,m as s,r as c,u as l}from"./firebase-sojJ90-r.js";import{n as u}from"./firebase-IxF1L4zF.js";var d=()=>n(`wiSmile`),f=`wiClaseData`,p={1:`Teclas F y J`,2:`Teclas D y K`,3:`Teclas S y L`,4:`Fila Central Completa`,5:`Primeras Palabras`,6:`Teclas E e I`,7:`Teclas R y U`,8:`Teclas T e Y`,9:`Teclas W y O`,10:`Fila Superior + Central`,11:`Teclas V y B`,12:`Teclas N y M`,13:`Teclas C y coma`,14:`Teclas Z y X`,15:`Todas las filas`,16:`Frases Simples`,17:`Números 1 al 5`,18:`Números 6 al 0`,19:`Todos los números`,20:`Texto Real`,21:`Puntuación Básica`,22:`Mayúsculas con Shift`,23:`Palabras Comunes`,24:`Palabras Comunes II`,25:`Frases del Día a Día`,26:`Párrafo Corto I`,27:`Párrafo Corto II`,28:`Números en Contexto`,29:`Email Profesional`,30:`Velocidad Inicial`,31:`Texto Técnico I`,32:`Texto Técnico II`,33:`Párrafo Largo I`,34:`Acentos y Tilde`,35:`Signos de Puntuación`,36:`Objetivo: 40 WPM`,37:`Objetivo: 50 WPM`,38:`Objetivo: 60 WPM`,39:`Texto Académico`,40:`Texto Jurídico`,41:`Código de Programación`,42:`Objetivo: 70 WPM`,43:`Velocidad: 80 WPM`,44:`Texto Mixto Complejo`,45:`Párrafo de Maestría`},m={1:`#22c55e`,2:`#22c55e`,3:`#22c55e`,4:`#16a34a`,5:`#16a34a`,6:`#0ea5e9`,7:`#0ea5e9`,8:`#0ea5e9`,9:`#0284c7`,10:`#0284c7`,11:`#f97316`,12:`#f97316`,13:`#f97316`,14:`#ea580c`,15:`#ea580c`,16:`#a855f7`,17:`#a855f7`,18:`#a855f7`,19:`#9333ea`,20:`#9333ea`,21:`#06b6d4`,22:`#06b6d4`,23:`#06b6d4`,24:`#0891b2`,25:`#0891b2`,26:`#ec4899`,27:`#ec4899`,28:`#ec4899`,29:`#db2777`,30:`#db2777`,31:`#f59e0b`,32:`#f59e0b`,33:`#d97706`,34:`#d97706`,35:`#b45309`,36:`#10b981`,37:`#10b981`,38:`#059669`,39:`#ef4444`,40:`#ef4444`,41:`#dc2626`,42:`#dc2626`,43:`#7c3aed`,44:`#7c3aed`,45:`#6d28d9`},h=()=>{let e=d();return e?e.claseId?`
  <div class="mc_page" id="mc_page">
    <div class="mc_loading" id="mc_main_content">
      <div class="mc_loading_spinner"></div>
      <span>Cargando tu clase...</span>
    </div>
  </div>`:g():`<div class="mc_page"><div class="mc_loading">
    <div class="mc_loading_spinner"></div></div></div>`};function g(){return`
  <div class="mc_page">

    <!-- HERO -->
    <div class="mc_hero">
      <div class="mc_hero_orb"></div>
      <div class="mc_hero_left">
        <div class="mc_hero_badge"><i class="fas fa-users"></i> Mi Clase</div>
        <h1 class="mc_hero_title">Únete a una <span>clase</span></h1>
        <p class="mc_hero_sub">Conecta con tu instructor para acceder a lecciones asignadas, avisos y seguimiento de tu progreso.</p>
      </div>
    </div>

    <!-- JOIN WIDGET -->
    <div class="mc_join_wrap">
      <div class="mc_join_hero">
        <div class="mc_join_ico"><i class="fas fa-chalkboard-teacher"></i></div>
        <h2 class="mc_join_title">¿Tienes un código de clase?</h2>
        <p class="mc_join_sub">Tu instructor te habrá dado un código de 6 caracteres. Ingrésalo para unirte y acceder a tus lecciones asignadas.</p>
      </div>

      <!-- Input código -->
      <div class="mc_code_form">
        <div class="mc_code_label"><i class="fas fa-key" style="color:var(--mco)"></i> Código de clase</div>
        <div class="mc_code_row">
          <input id="mc_code_input" class="mc_code_input"
            type="text" maxlength="6" placeholder="ABC123"
            autocomplete="off" spellcheck="false">
          <button id="mc_btn_join" class="mc_code_btn" disabled>
            <i class="fas fa-arrow-right"></i> Unirme
          </button>
        </div>
        <div class="mc_code_msg" id="mc_code_msg"></div>
      </div>

      <!-- Divider -->
      <div class="mc_or_div" style="max-width:480px;width:100%">— o continúa —</div>

      <!-- Modo personal -->
      <div class="mc_personal_card">
        <div class="mc_personal_ico"><i class="fas fa-user-check"></i></div>
        <div class="mc_personal_info">
          <div class="mc_personal_title">Modo personal</div>
          <div class="mc_personal_sub">Practica sin clase. Accede a todas las 45 lecciones a tu ritmo sin instructor.</div>
        </div>
      </div>
    </div>

  </div>`}function _(e,t){let r=d();r?.nombre||r?.usuario;let i=e.id||`—`,a=e.nombre||`Clase ${i}`,o=e.gestorNombre||e.gestorId||`Instructor`,s=o.charAt(0).toUpperCase(),c=e.leccionesAsignadas||[],l=e.avisos||[],u=e.estudiantes||[],f=c.length,h=c.filter(e=>t.includes(e)).length;return`
  <div class="mc_page">

    <!-- HERO -->
    <div class="mc_hero">
      <div class="mc_hero_orb"></div>
      <div class="mc_hero_left">
        <div class="mc_hero_badge"><i class="fas fa-users"></i> Mi Clase</div>
        <h1 class="mc_hero_title">${a}</h1>
        <p class="mc_hero_sub">${h} de ${f} lecciones completadas · ${f>0?Math.round(h/f*100):0}% avance</p>
      </div>
      <div class="mc_code_badge">
        <div class="mc_code_big" id="mc_copy_code" title="Copiar código">${i}</div>
        <div class="mc_code_lbl"><i class="fas fa-copy"></i> Copiar código</div>
      </div>
    </div>

    <!-- INFO ROW -->
    <div class="mc_info_row">
      ${[{ico:`fa-graduation-cap`,color:`var(--mco)`,bg:`color-mix(in srgb,var(--mco) 12%,transparent)`,lbl:`Lecciones asignadas`,val:`${f}`},{ico:`fa-check-circle`,color:`#22c55e`,bg:`color-mix(in srgb,#22c55e 12%,transparent)`,lbl:`Completadas`,val:`${h}`},{ico:`fa-users`,color:`#a855f7`,bg:`color-mix(in srgb,#a855f7 12%,transparent)`,lbl:`Compañeros`,val:`${u.length}`}].map(e=>`
        <div class="mc_info_card">
          <div class="mc_ic_ico" style="background:${e.bg};color:${e.color}"><i class="fas ${e.ico}"></i></div>
          <div class="mc_ic_body">
            <div class="mc_ic_lbl">${e.lbl}</div>
            <div class="mc_ic_val">${e.val}</div>
          </div>
        </div>`).join(``)}
    </div>

    <!-- GESTOR -->
    <div class="mc_sec_hdr"><i class="fas fa-chalkboard-teacher"></i> Instructor</div>
    <div class="mc_gestor_card">
      <div class="mc_gestor_av">${s}</div>
      <div class="mc_gestor_info">
        <div class="mc_gestor_nombre">${o}</div>
        <div class="mc_gestor_sub"><i class="fas fa-envelope"></i> ${e.gestorEmail||`Instructor registrado`}</div>
      </div>
      <div class="mc_gestor_badge"><i class="fas fa-star"></i> Instructor</div>
    </div>

    <!-- AVISOS -->
    <div class="mc_sec_hdr">
      <i class="fas fa-bell"></i> Avisos de clase
      <span class="mc_sec_count">${l.length}</span>
    </div>
    ${l.length>0?`
      <div class="mc_avisos_list">
        ${l.slice().reverse().map(e=>`
          <div class="mc_aviso_card ${e.tipo||`info`}">
            <div class="mc_aviso_ico">
              <i class="fas ${e.tipo===`urgente`?`fa-exclamation-triangle`:e.tipo===`tarea`?`fa-tasks`:`fa-info-circle`}"></i>
            </div>
            <div class="mc_aviso_body">
              <div class="mc_aviso_tit">${e.titulo||`Aviso`}</div>
              <div class="mc_aviso_txt">${e.mensaje||``}</div>
              ${e.fecha?`<div class="mc_aviso_fecha"><i class="fas fa-clock"></i> ${C(e.fecha)}</div>`:``}
            </div>
          </div>`).join(``)}
      </div>
    `:`
      <div class="mc_avisos_empty">
        <i class="fas fa-bell-slash"></i>
        <p>Sin avisos por ahora. Tu instructor publicará novedades aquí.</p>
      </div>
    `}

    <!-- LECCIONES ASIGNADAS -->
    <div class="mc_sec_hdr">
      <i class="fas fa-graduation-cap"></i> Lecciones asignadas
      <span class="mc_sec_count">${h}/${f}</span>
    </div>
    ${c.length>0?`
      <div class="mc_lecs_grid">
        ${c.map(e=>{let r=String(e).padStart(2,`0`),i=t.includes(e),a=n(`wiPrac_${e}`)||{};return`
            <a class="mc_lec_card nv_item" data-page="leccion${r}" href="/leccion${r}"
              style="--lc:${m[e]||`var(--mco)`}">
              <div class="mc_lec_top">
                <span class="mc_lec_num">Lección ${r}</span>
                ${i?`<span class="mc_lec_ok"><i class="fas fa-check"></i> Hecha</span>`:``}
              </div>
              <div class="mc_lec_name">${p[e]||`Lección ${r}`}</div>
              ${i&&a.wpm?`<div class="mc_lec_wpm"><i class="fas fa-bolt"></i> ${a.wpm} WPM</div>`:``}
            </a>`}).join(``)}
      </div>
    `:`
      <div class="mc_avisos_empty">
        <i class="fas fa-list"></i>
        <p>Tu instructor aún no ha asignado lecciones.</p>
      </div>
    `}

    <!-- COMPAÑEROS -->
    ${u.length>1?`
      <div class="mc_sec_hdr">
        <i class="fas fa-user-friends"></i> Compañeros
        <span class="mc_sec_count">${u.length}</span>
      </div>
      <div class="mc_members_grid">
        ${u.slice(0,20).map((e,t)=>{let n=(e.nombre||e).charAt(0).toUpperCase(),r=[`#22c55e`,`#0ea5e9`,`#f97316`,`#a855f7`,`#ec4899`,`#f59e0b`,`#06b6d4`];return`
            <div class="mc_member_chip">
              <div class="mc_member_av" style="background:${r[t%r.length]}">${n}</div>
              ${e.nombre||e}
            </div>`}).join(``)}
        ${u.length>20?`<div class="mc_member_chip" style="color:var(--tx3)">+${u.length-20} más</div>`:``}
      </div>
    `:``}

    <!-- SALIR CLASE -->
    <div style="display:flex;justify-content:flex-end;padding-top:1vh">
      <button id="mc_btn_salir" class="mc_code_btn" style="background:var(--bg4);color:var(--tx3);padding:1.1vh 2vw;font-size:var(--fz_m1)">
        <i class="fas fa-sign-out-alt"></i> Salir de esta clase
      </button>
    </div>

  </div>`}var v=async()=>{let t=d();if(t){if(e(document).off(`.mc`),!t.claseId){b();return}await x(t.claseId)}},y=()=>{e(document).off(`.mc`)};function b(){let n=e(`#mc_code_input`),i=e(`#mc_btn_join`),f=e(`#mc_code_msg`);n.on(`input.mc`,function(){let t=e(this).val().toUpperCase().replace(/[^A-Z0-9]/g,``);e(this).val(t),i.prop(`disabled`,t.length<6),f.text(``).removeClass(`ok error`),n.removeClass(`ok error`)}),i.on(`click.mc`,async function(){let e=n.val().toUpperCase().trim();if(!(e.length<6)){i.prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Verificando...`),f.text(``).removeClass(`ok error`);try{let p=await c(s(u,`clases`,e));if(!p.exists()){n.addClass(`error`),f.addClass(`error`).html(`<i class="fas fa-times-circle"></i> Código incorrecto. Verifica con tu instructor.`),i.prop(`disabled`,!1).html(`<i class="fas fa-arrow-right"></i> Unirme`);return}let m=d();await l(s(u,`smiles`,m.usuario),{claseId:e,gestorId:p.data().gestorId||null}),await l(s(u,`lecciones`,m.usuario),{clase_id:e,gestor_id:p.data().gestorId||null}).catch(()=>{}),await l(s(u,`clases`,e),{estudiantes:a({usuario:m.usuario,nombre:m.nombre||m.usuario,email:m.email||``}),updatedAt:o()}),r(`wiSmile`,{...m,claseId:e,gestorId:p.data().gestorId||null},7),n.addClass(`ok`),f.addClass(`ok`).html(`<i class="fas fa-check-circle"></i> ¡Bienvenido a la clase!`),setTimeout(()=>{t(async()=>{let{rutas:e}=await import(`./ruta-CS1Lu3Aw.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/miclase`))},1200)}catch(e){console.error(`[miclase] Error al unirse:`,e),f.addClass(`error`).html(`<i class="fas fa-exclamation-triangle"></i> Error al conectar. Intenta de nuevo.`),i.prop(`disabled`,!1).html(`<i class="fas fa-arrow-right"></i> Unirme`)}}}),n.on(`keydown.mc`,function(e){e.key===`Enter`&&!i.prop(`disabled`)&&i.trigger(`click`)}),e(document).on(`click.mc`,`.nv_item`,function(n){n.preventDefault();let r=e(this).data(`page`);r&&t(async()=>{let{rutas:e}=await import(`./ruta-CS1Lu3Aw.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/${r}`))})}async function x(a){try{n(f);let i=await c(s(u,`clases`,a));if(!i.exists()){r(`wiSmile`,{...d(),claseId:null,gestorId:null},7),e(`#mc_main_content`).html(g().replace(`<div class="mc_page">`,``));return}let o={id:a,...i.data()};r(f,o,1);let l=_(o,(n(`wiProgreso`)||{}).leccionesOk||[]);t(async()=>{let{wiFade:e}=await import(`./rutadev-DePFb1Uw.js`).then(e=>e.t);return{wiFade:e}},[]).then(({wiFade:e})=>{e(`#mc_page`,l.replace(`<div class="mc_page">`,``).replace(`</div>`,``))}).catch(()=>{document.getElementById(`mc_page`).innerHTML=l}),S(o)}catch(e){console.error(`[miclase] Error cargando clase:`,e),i(`Error al cargar tu clase`,`warning`)}}function S(n){e(document).on(`click.mc`,`#mc_copy_code`,async function(){try{await navigator.clipboard.writeText(n.id),i(`Código ${n.id} copiado`,`success`,2500)}catch{i(`Tu código: ${n.id}`,`info`,3e3)}}),e(document).on(`click.mc`,`.mc_lec_card, .nv_item`,function(n){n.preventDefault();let r=e(this).data(`page`);r&&t(async()=>{let{rutas:e}=await import(`./ruta-CS1Lu3Aw.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/${r}`))}),e(document).on(`click.mc`,`#mc_btn_salir`,async function(){if(!confirm(`¿Seguro que quieres salir de esta clase? Perderás acceso a las lecciones asignadas.`))return;let e=d();try{await l(s(u,`smiles`,e.usuario),{claseId:null,gestorId:null}),await l(s(u,`lecciones`,e.usuario),{clase_id:null,gestor_id:null}).catch(()=>{}),r(`wiSmile`,{...e,claseId:null,gestorId:null},7),i(`Has salido de la clase`,`info`),t(async()=>{let{rutas:e}=await import(`./ruta-CS1Lu3Aw.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/miclase`))}catch{i(`Error al salir. Intenta de nuevo.`,`warning`)}})}function C(e){return e?(e.toDate?e.toDate():new Date(e)).toLocaleDateString(`es-PE`,{day:`2-digit`,month:`short`,year:`numeric`}):``}export{y as cleanup,v as init,h as render};