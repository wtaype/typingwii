import{t as e}from"./wii-CZYUy4T7.js";import{t}from"./vendor-BDh6mtVu.js";import{a as n,d as r,l as i,s as a}from"./widev-C3qELtTZ.js";var o=()=>r(`wiSmile`),s=[{ico:`fa-keyboard`,txt:`¡Cada tecla que practicas te acerca a la maestría! ⌨️`},{ico:`fa-bolt`,txt:`¡La velocidad viene con la constancia. ¡Sigue tecleando! ⚡`},{ico:`fa-trophy`,txt:`¡Los mejores mecanógrafos no nacen, se practican! 🏆`},{ico:`fa-fire`,txt:`¡Tus dedos son más rápidos de lo que crees. ¡Demuéstralo!`},{ico:`fa-star`,txt:`¡Hoy es un gran día para romper tu récord de WPM! 🌟`},{ico:`fa-rocket`,txt:`¡De 30 a 80 WPM: es solo cuestión de práctica diaria! 🚀`},{ico:`fa-brain`,txt:`¡Tu cerebro y tus dedos son el equipo perfecto! 🧠`},{ico:`fa-chart-line`,txt:`¡Cada sesión de hoy es el progreso de mañana!`},{ico:`fa-infinity`,txt:`¡Sin límites para quien practica con determinación!`},{ico:`fa-bullseye`,txt:`¡Precisión primero, velocidad después. Así se domina! 🎯`}],c=[{href:`/lecciones`,page:`lecciones`,ico:`fa-graduation-cap`,color:`var(--mco)`,title:`Mis Lecciones`,sub:`Practica y avanza en mecanografía`},{href:`/progreso`,page:`progreso`,ico:`fa-chart-line`,color:`#28a745`,title:`Mi Progreso`,sub:`WPM, precisión y racha diaria`},{href:`/certificado`,page:`certificado`,ico:`fa-certificate`,color:`#fd7e14`,title:`Certificado`,sub:`Descarga tu logro de mecanografía`},{href:`/contacto`,page:`contacto`,ico:`fa-envelope`,color:`#37a1dd`,title:`Contacto`,sub:`Escribe a tu instructor`}],l=()=>{let t=o();if(!t)return`
    <div class="sm_wrap">
      <div class="sm_empty">
        <i class="fas fa-lock"></i>
        <p>Sin sesión activa.</p>
      </div>
    </div>`;let l=`${t.nombre||``} ${t.apellidos||``}`.trim()||t.usuario||`—`,u=a(l),d=t.foto||`/typingwii/smile.avif`,[f]=(t.tema||`Cielo|#0EBEFF`).split(`|`),p=s[Math.floor(Math.random()*s.length)],m=r(`wiProgreso`)||{},h=m.wpmRecord||`—`,g=m.precisionPct==null?`—`:`${m.precisionPct}%`,_=m.rachaDias==null?`—`:m.rachaDias,v=m.leccionesOk==null?`—`:m.leccionesOk;return`
  <div class="sm_bv_wrap">

    <!-- ── HERO BIENVENIDA ────────────────────────────── -->
    <div class="sm_hero_wrap">
      <div class="sm_hero_card_main">

        <div class="sm_hero_avatar_wrap">
          <div class="sm_hero_ring"></div>
          <div class="sm_hero_avatar">
            <img src="${d}" alt="${l}"
              onerror="this.parentElement.innerHTML='${u}'">
          </div>
        </div>

        <div class="sm_hero_info">
          <p class="sm_hero_saludo">${n()}</p>
          <h1 class="sm_hero_nombre">${l}</h1>
          <div class="sm_hero_tags">
            <span class="sm_hero_tag sm_tag_tema" style="--tc: var(--${f}, #0EBEFF)">
              <i class="fas fa-circle"></i> ${f}
            </span>
            <span class="sm_hero_tag">
              <i class="fas fa-at"></i> ${t.usuario||`—`}
            </span>
            <span class="sm_hero_tag sm_tag_role">
              <i class="fas fa-graduation-cap"></i> Estudiante
            </span>
          </div>
        </div>

        <div class="sm_hero_right">
          <div class="sm_date_pill">
            <i class="fas fa-calendar-day"></i>
            <span>${i()}</span>
          </div>
          <div class="sm_app_pill">
            <i class="fas fa-keyboard"></i>
            <span>${e}</span>
          </div>
        </div>

      </div>
    </div>

    <!-- ── STATS ─────────────────────────────────────── -->
    <div class="sm_stats_grid">
      ${[{ico:`fa-keyboard`,lbl:`Lecciones`,val:v,id:`sm_stat_lec`,col:`var(--mco)`},{ico:`fa-bolt`,lbl:`WPM Récord`,val:h,id:`sm_stat_wpm`,col:`#fd7e14`},{ico:`fa-bullseye`,lbl:`Precisión`,val:g,id:`sm_stat_prec`,col:`#28a745`},{ico:`fa-fire`,lbl:`Racha (días)`,val:_,id:`sm_stat_racha`,col:`#FFD101`}].map(e=>`
        <div class="sm_stat_card">
          <div class="sm_stat_ico" style="color: ${e.col}">
            <i class="fas ${e.ico}"></i>
          </div>
          <div class="sm_stat_val" id="${e.id}">${e.val}</div>
          <div class="sm_stat_lbl">${e.lbl}</div>
        </div>`).join(``)}
    </div>

    <!-- ── MOTIVACIÓN ────────────────────────────────── -->
    <div class="sm_mot_card" id="sm_motivacion">
      <div class="sm_mot_ico"><i class="fas ${p.ico}"></i></div>
      <div class="sm_mot_body">
        <div class="sm_mot_title">¡Continúa practicando hoy!</div>
        <div class="sm_mot_txt" id="sm_frase_txt">${p.txt}</div>
      </div>
      <div class="sm_mot_actions">
        <a href="/lecciones" class="sm_btn_primary nv_item" data-page="lecciones">
          <i class="fas fa-keyboard"></i> Practicar ahora
        </a>
        <button class="sm_btn_icon" id="sm_btn_frase" title="Nueva frase">
          <i class="fas fa-arrows-rotate"></i>
        </button>
      </div>
    </div>

    <!-- ── ACCESOS RÁPIDOS ───────────────────────────── -->
    <div class="sm_section_hdr">
      <div class="sm_section_ico"><i class="fas fa-grid-2"></i></div>
      <span>Accesos rápidos</span>
    </div>

    <div class="sm_accesos_grid">
      ${c.map(e=>`
        <a href="${e.href}" class="sm_acceso_card nv_item" data-page="${e.page}">
          <div class="sm_acceso_ico" style="color: ${e.color}; background: ${e.color}22">
            <i class="fas ${e.ico}"></i>
          </div>
          <div class="sm_acceso_info">
            <div class="sm_acceso_title">${e.title}</div>
            <div class="sm_acceso_sub">${e.sub}</div>
          </div>
          <i class="fas fa-chevron-right sm_acceso_arr"></i>
        </a>`).join(``)}
    </div>

    <!-- ── PROGRESO SEMANAL (placeholder animado) ─────── -->
    <div class="sm_section_hdr">
      <div class="sm_section_ico"><i class="fas fa-chart-line"></i></div>
      <span>Actividad reciente</span>
      <a href="/progreso" class="sm_see_all nv_item" data-page="progreso">
        Ver todo <i class="fas fa-arrow-right"></i>
      </a>
    </div>

    <div class="sm_actividad_wrap" id="sm_actividad">
      <div class="sm_actividad_empty">
        <i class="fas fa-chart-bar"></i>
        <p>Aún no hay actividad registrada.</p>
        <a href="/lecciones" class="sm_btn_primary nv_item" data-page="lecciones" style="font-size: var(--fz_m1); padding: 1vh 2vh;">
          <i class="fas fa-play"></i> Comenzar primera lección
        </a>
      </div>
    </div>

    <!-- ── TIP DEL DÍA ──────────────────────────────── -->
    <div class="sm_tip_card">
      <div class="sm_tip_ico"><i class="fas fa-lightbulb"></i></div>
      <div class="sm_tip_body">
        <div class="sm_tip_label">Consejo del día ⌨️</div>
        <div class="sm_tip_txt" id="sm_tip_txt">
          Usa los dedos correctos para cada tecla. La postura QWERTY ubica tus dedos índices en <strong>F</strong> y <strong>J</strong> como punto de partida.
        </div>
      </div>
    </div>

  </div>`},u=[`Usa los dedos correctos para cada tecla. La postura QWERTY ubica tus dedos índices en <strong>F</strong> y <strong>J</strong> como punto de partida.`,`Practica sin mirar el teclado desde el primer día. El mecanógrafo experto nunca mira las teclas.`,`La velocidad es consecuencia de la precisión. Primero escribe sin errores, la velocidad vendrá sola.`,`Toma descansos de 5 minutos cada 25 minutos de práctica. Tus manos y ojos te lo agradecerán.`,`Mantén una postura correcta: espalda recta, codos a 90°, muñecas levemente elevadas.`,`¡40 WPM es el promedio de un mecanógrafo principiante; 80+ WPM ya te hace profesional!`,`Practica textos variados: números, puntuación y letras especiales. La variedad entrena mejor.`],d=()=>{if(!o())return;t(document).off(`.sm_dash`);let e=new Date().getDate()%u.length;t(`#sm_tip_txt`).html(u[e]),t(document).on(`click.sm_dash`,`#sm_btn_frase`,function(){let e=s[Math.floor(Math.random()*s.length)],n=t(`#sm_motivacion`);n.addClass(`sm_mot_out`),setTimeout(()=>{t(`#sm_frase_txt`).text(e.txt),n.find(`.sm_mot_ico i`).attr(`class`,`fas ${e.ico}`),n.removeClass(`sm_mot_out`).addClass(`sm_mot_in`),setTimeout(()=>n.removeClass(`sm_mot_in`),350)},240)}),p()},f=()=>{t(document).off(`.sm_dash`)};function p(){let e=r(`wiProgreso`);e&&(e.leccionesOk!=null&&t(`#sm_stat_lec`).text(e.leccionesOk),e.wpmRecord&&t(`#sm_stat_wpm`).text(e.wpmRecord),e.precisionPct!=null&&t(`#sm_stat_prec`).text(`${e.precisionPct}%`),e.rachaDias!=null&&t(`#sm_stat_racha`).text(e.rachaDias))}export{f as cleanup,d as init,l as render};