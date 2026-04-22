import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,a as n,d as r,l as i,s as a}from"./widev-C5mC798j.js";import{t as o}from"./wii-92BiU8Qt.js";var s=()=>r(`wiSmile`),c=[{ico:`fa-keyboard`,txt:`¡Cada tecla que practicas te acerca a la maestría! ⌨️`},{ico:`fa-bolt`,txt:`La velocidad viene con la constancia. ¡Sigue tecleando! ⚡`},{ico:`fa-trophy`,txt:`Los mejores mecanógrafos no nacen, se practican. 🏆`},{ico:`fa-fire`,txt:`¡Tus dedos son más rápidos de lo que crees. Demuéstralo!`},{ico:`fa-star`,txt:`¡Hoy es un gran día para romper tu récord de WPM! 🌟`},{ico:`fa-rocket`,txt:`De 30 a 80 WPM: es solo cuestión de práctica diaria. 🚀`},{ico:`fa-brain`,txt:`¡Tu cerebro y tus dedos son el equipo perfecto! 🧠`},{ico:`fa-chart-line`,txt:`Cada sesión de hoy es el progreso de mañana.`},{ico:`fa-bullseye`,txt:`Precisión primero, velocidad después. Así se domina. 🎯`},{ico:`fa-infinity`,txt:`Sin límites para quien practica con determinación.`}],l=[`Ubica tus dedos índices en <strong>F</strong> y <strong>J</strong> — allí están los relieves de guía.`,`Practica <strong>sin mirar el teclado</strong> desde el primer día. La memoria muscular se construye así.`,`La velocidad es consecuencia de la <strong>precisión</strong>. Primero escribe sin errores.`,`Toma descansos de <strong>5 min cada 25 min</strong>. Tus manos y ojos te lo agradecerán.`,`Mantén la <strong>espalda recta</strong>, codos a 90° y muñecas levemente elevadas.`,`<strong>40 WPM</strong> es el promedio de un principiante; <strong>80+ WPM</strong> ya es nivel profesional.`,`Practica textos variados: números, puntuación y letras especiales mejoran tu polivalencia.`];Array.from({length:45},(e,t)=>t+1);var u={1:`Teclas F y J`,2:`Teclas D y K`,3:`Teclas S y L`,4:`Fila Central Completa`,5:`Primeras Palabras`,6:`Teclas E e I`,7:`Teclas R y U`,8:`Teclas T e Y`,9:`Teclas W y O`,10:`Fila Superior + Central`,11:`Teclas V y B`,12:`Teclas N y M`,13:`Teclas C y coma`,14:`Teclas Z y X`,15:`Todas las filas`,16:`Frases Simples`,17:`Números 1 al 5`,18:`Números 6 al 0`,19:`Todos los números`,20:`Texto Real`,21:`Puntuación Básica`,22:`Mayúsculas con Shift`,23:`Palabras Comunes`,24:`Palabras Comunes II`,25:`Frases del Día`,26:`Párrafo Corto I`,27:`Párrafo Corto II`,28:`Números en Contexto`,29:`Email Profesional`,30:`Velocidad Inicial`,31:`Texto Técnico I`,32:`Texto Técnico II`,33:`Párrafo Largo I`,34:`Acentos y Tilde`,35:`Puntuación Avanzada`,36:`Objetivo: 40 WPM`,37:`Objetivo: 50 WPM`,38:`Objetivo: 60 WPM`,39:`Texto Académico`,40:`Texto Jurídico`,41:`Código de Programación`,42:`Objetivo: 70 WPM`,43:`Velocidad: 80 WPM`,44:`Texto Mixto`,45:`Párrafo de Maestría`},d=()=>{let e=s();if(!e)return`<div class="sm_bv_wrap"><div class="sm_empty">
    <i class="fas fa-lock"></i><p>Sin sesión activa.</p></div></div>`;let t=`${e.nombre||``} ${e.apellidos||``}`.trim()||e.usuario||`—`,l=a(t),d=e.foto||`/typingwii/v17/smile.avif`;(e.tema||`Cielo|#0EBEFF`).split(`|`)[0];let f=c[Math.floor(Math.random()*c.length)],p=r(`wiProgreso`)||{},m=p.leccionesOk||[],h=p.wpmRecord||0,g=p.precisionPct==null?null:p.precisionPct,_=Math.round(m.length/45*100),v=e.claseId||null,y=v?`<span class="sm_clase_chip sm_clase_ok"><i class="fas fa-users"></i> Clase: <b>${v}</b></span>`:`<span class="sm_clase_chip sm_clase_no"><i class="fas fa-user"></i> Sin clase asignada</span>`,b=m.length<45?m.length+1:null,x=[...m].reverse().slice(0,4);return`
  <div class="sm_bv_wrap">

    <!-- ══ HERO ══ -->
    <div class="sm_hero_card_main">
      <div class="sm_hero_glow"></div>
      <div class="sm_hero_avatar_wrap">
        <div class="sm_hero_ring"></div>
        <div class="sm_hero_avatar">
          <img src="${d}" alt="${t}" onerror="this.parentElement.innerHTML='${l}'">
        </div>
      </div>
      <div class="sm_hero_info">
        <p class="sm_hero_saludo">${n()}</p>
        <h1 class="sm_hero_nombre">${t.split(` `)[0]}</h1>
        <div class="sm_hero_tags">
          <span class="sm_hero_tag sm_tag_role"><i class="fas fa-graduation-cap"></i> Estudiante</span>
          <span class="sm_hero_tag"><i class="fas fa-at"></i> ${e.usuario||`—`}</span>
          ${y}
        </div>
      </div>
      <div class="sm_hero_right">
        <div class="sm_date_pill"><i class="fas fa-calendar-day"></i><span>${i()}</span></div>
        <div class="sm_app_pill"><i class="fas fa-keyboard"></i><span>${o}</span></div>
      </div>
    </div>

    <!-- ══ PROGRESO GLOBAL ══ -->
    <div class="sm_prog_card">
      <div class="sm_prog_head">
        <div class="sm_prog_label">
          <i class="fas fa-chart-line" style="color:var(--mco)"></i>
          Progreso general
        </div>
        <div class="sm_prog_pct">${m.length} <span>/ 45 lecciones · ${_}%</span></div>
      </div>
      <div class="sm_prog_track">
        <div class="sm_prog_fill" id="sm_prog_fill" style="width:0%"></div>
      </div>
    </div>

    <!-- ══ KPI STATS ══ -->
    <div class="sm_stats_grid">
      ${[{ico:`fa-graduation-cap`,lbl:`Lecciones`,val:m.length,col:`var(--mco)`,id:`sm_k_lec`},{ico:`fa-bolt`,lbl:`WPM Récord`,val:h||`—`,col:`#f59e0b`,id:`sm_k_wpm`},{ico:`fa-bullseye`,lbl:`Precisión`,val:g==null?`—`:`${g}%`,col:`#22c55e`,id:`sm_k_prec`},{ico:`fa-fire`,lbl:`Racha días`,val:p.rachaDias||0,col:`#ef4444`,id:`sm_k_dia`}].map(e=>`
        <div class="sm_stat_card" id="${e.id}_wrap">
          <div class="sm_stat_ico" style="color:${e.col}"><i class="fas ${e.ico}"></i></div>
          <div class="sm_stat_val" id="${e.id}">${e.val}</div>
          <div class="sm_stat_lbl">${e.lbl}</div>
        </div>`).join(``)}
    </div>

    <!-- ══ MOTIVACIÓN ══ -->
    <div class="sm_mot_card" id="sm_motivacion">
      <div class="sm_mot_ico"><i class="fas ${f.ico}"></i></div>
      <div class="sm_mot_body">
        <div class="sm_mot_title">¡Continúa practicando hoy!</div>
        <div class="sm_mot_txt" id="sm_frase_txt">${f.txt}</div>
      </div>
      <div class="sm_mot_actions">
        <a href="/lecciones" class="sm_btn_primary nv_item" data-page="lecciones">
          <i class="fas fa-keyboard"></i> Practicar
        </a>
        <button class="sm_btn_icon" id="sm_btn_frase" title="Nueva frase">
          <i class="fas fa-arrows-rotate"></i>
        </button>
      </div>
    </div>

    <!-- ══ DOS COLUMNAS: próxima lección + clase ══ -->
    <div class="sm_two_col">

      <!-- Próxima lección -->
      <div class="sm_next_card">
        <div class="sm_section_hdr">
          <div class="sm_section_ico"><i class="fas fa-play"></i></div>
          <span>Próxima lección</span>
        </div>
        ${b?`
          <a class="sm_next_lec nv_item" data-page="leccion${String(b).padStart(2,`0`)}"
            href="/leccion${String(b).padStart(2,`0`)}">
            <div class="sm_next_num">Lección ${String(b).padStart(2,`0`)}</div>
            <div class="sm_next_name">${u[b]||`Lección ${b}`}</div>
            <div class="sm_next_btn"><i class="fas fa-arrow-right"></i></div>
          </a>
        `:`
          <div class="sm_next_done">
            <i class="fas fa-award" style="color:#f59e0b"></i>
            <span>¡Completaste las 45 lecciones! 🏆</span>
          </div>
        `}
      </div>

      <!-- Clase chip -->
      <div class="sm_clase_card">
        <div class="sm_section_hdr">
          <div class="sm_section_ico"><i class="fas fa-users"></i></div>
          <span>Mi Clase</span>
        </div>
        ${v?`
          <div class="sm_clase_info">
            <div class="sm_clase_ico ok"><i class="fas fa-chalkboard-teacher"></i></div>
            <div class="sm_clase_body">
              <div class="sm_clase_cod"><b>Código: ${v}</b></div>
              <div class="sm_clase_sub">Clase activa · Ver detalles</div>
            </div>
            <a class="sm_btn_mini nv_item" data-page="miclase" href="/miclase">
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        `:`
          <div class="sm_clase_info">
            <div class="sm_clase_ico no"><i class="fas fa-user"></i></div>
            <div class="sm_clase_body">
              <div class="sm_clase_cod">Sin clase asignada</div>
              <div class="sm_clase_sub">Únete con un código de instructor</div>
            </div>
            <a class="sm_btn_mini nv_item" data-page="miclase" href="/miclase">
              <i class="fas fa-plus"></i>
            </a>
          </div>
        `}
      </div>

    </div>

    <!-- ══ ACTIVIDAD RECIENTE ══ -->
    <div class="sm_section_hdr">
      <div class="sm_section_ico"><i class="fas fa-clock-rotate-left"></i></div>
      <span>Actividad reciente</span>
      <a href="/progreso" class="sm_see_all nv_item" data-page="progreso">Ver todo <i class="fas fa-arrow-right"></i></a>
    </div>

    <div class="sm_actividad_wrap" id="sm_actividad">
      ${x.length>0?`
        <div class="sm_actividad_grid">
          ${x.map(e=>{let t=r(`wiPrac_${e}`)||{},n=String(e).padStart(2,`0`);return`
              <div class="sm_act_card nv_item" data-page="leccion${n}">
                <div class="sm_act_num">Lec. ${n}</div>
                <div class="sm_act_name">${u[e]||`Lección ${n}`}</div>
                <div class="sm_act_foot">
                  ${t.wpm?`<span class="sm_act_wpm"><i class="fas fa-bolt"></i> ${t.wpm}</span>`:``}
                  ${t.estrellas?`<span class="sm_act_stars">${`★`.repeat(t.estrellas)}</span>`:``}
                  <i class="fas fa-check-circle sm_act_ok"></i>
                </div>
              </div>`}).join(``)}
        </div>
      `:`
        <div class="sm_actividad_empty">
          <i class="fas fa-keyboard"></i>
          <p>Aún no tienes actividad. ¡Comienza tu primera lección!</p>
          <a href="/lecciones" class="sm_btn_primary nv_item" data-page="lecciones" style="font-size:var(--fz_m1);padding:.9vh 2vh">
            <i class="fas fa-play"></i> Empezar ahora
          </a>
        </div>
      `}
    </div>

    <!-- ══ ACCESOS RÁPIDOS ══ -->
    <div class="sm_section_hdr">
      <div class="sm_section_ico"><i class="fas fa-grid-2"></i></div>
      <span>Accesos rápidos</span>
    </div>
    <div class="sm_accesos_grid">
      ${[{page:`lecciones`,ico:`fa-graduation-cap`,color:`var(--mco)`,title:`Lecciones`,sub:`Practica las 45 lecciones progresivas`},{page:`progreso`,ico:`fa-chart-line`,color:`#22c55e`,title:`Mi Progreso`,sub:`WPM récord, precisión y racha`},{page:`certificado`,ico:`fa-certificate`,color:`#f59e0b`,title:`Certificado`,sub:`Descarga tu logro al llegar a 80 WPM`},{page:`miclase`,ico:`fa-users`,color:`#a855f7`,title:`Mi Clase`,sub:`Lecciones asignadas y avisos`},{page:`perfil`,ico:`fa-user`,color:`#0ea5e9`,title:`Mi Perfil`,sub:`Edita tu nombre, foto y tema`},{page:`mensajes`,ico:`fa-comments`,color:`#ec4899`,title:`Mensajes`,sub:`Comunicación con tu instructor`}].map(e=>`
        <a href="/${e.page}" class="sm_acceso_card nv_item" data-page="${e.page}">
          <div class="sm_acceso_ico" style="color:${e.color};background:${e.color}22">
            <i class="fas ${e.ico}"></i>
          </div>
          <div class="sm_acceso_info">
            <div class="sm_acceso_title">${e.title}</div>
            <div class="sm_acceso_sub">${e.sub}</div>
          </div>
          <i class="fas fa-chevron-right sm_acceso_arr"></i>
        </a>`).join(``)}
    </div>

    <!-- ══ TIP DEL DÍA ══ -->
    <div class="sm_tip_card">
      <div class="sm_tip_ico"><i class="fas fa-lightbulb"></i></div>
      <div class="sm_tip_body">
        <div class="sm_tip_label">Consejo del día ⌨️</div>
        <div class="sm_tip_txt" id="sm_tip_txt">
          Ubica tus dedos índices en <strong>F</strong> y <strong>J</strong> — allí están los relieves de guía.
        </div>
      </div>
    </div>

  </div>`},f=()=>{if(!s())return;e(document).off(`.sm_dash`),requestAnimationFrame(()=>{setTimeout(()=>{let t=r(`wiProgreso`)||{},n=Math.round((t.leccionesOk?.length||0)/45*100);e(`#sm_prog_fill`).css(`width`,`${n}%`)},80)});let n=new Date().getDate()%l.length;e(`#sm_tip_txt`).html(l[n]),e(document).on(`click.sm_dash`,`#sm_btn_frase`,function(){let t=c[Math.floor(Math.random()*c.length)],n=e(`#sm_motivacion`);n.addClass(`sm_mot_out`),setTimeout(()=>{e(`#sm_frase_txt`).text(t.txt),n.find(`.sm_mot_ico i`).attr(`class`,`fas ${t.ico}`),n.removeClass(`sm_mot_out`).addClass(`sm_mot_in`),setTimeout(()=>n.removeClass(`sm_mot_in`),350)},240)}),e(document).on(`click.sm_dash`,`.nv_item`,function(n){n.preventDefault();let r=e(this).data(`page`);r&&t(async()=>{let{rutas:e}=await import(`./ruta-jFStfYCH.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/${r}`))})},p=()=>{e(document).off(`.sm_dash`)};export{p as cleanup,f as init,d as render};