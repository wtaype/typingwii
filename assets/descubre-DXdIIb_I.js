import{t as e}from"./vendor-BDh6mtVu.js";import{_ as t,b as n,v as r,y as i}from"./widev-vIOvrNXT.js";import{n as a,o,t as s}from"./wii-DpME_MqB.js";var c=[{num:`7`,label:`Módulos`,icon:`fa-layer-group`,color:`#0EBEFF`},{num:`6`,label:`Vistas únicas`,icon:`fa-eye`,color:`#7000FF`},{num:`100%`,label:`Gratis`,icon:`fa-heart`,color:`#FF5C69`},{num:n(),label:`Actualizado`,icon:`fa-calendar-check`,color:`#29C72E`}],l=[{icon:`fa-calendar-week`,color:`#0EBEFF`,label:`Horario`,desc:`Calendario semanal visual`,url:`/horario`},{icon:`fa-folder-open`,color:`#FF5C69`,label:`Tareas`,desc:`Tablero Kanban Scrum`,url:`/tareas`},{icon:`fa-rocket`,color:`#29C72E`,label:`Planes`,desc:`Metas y proyectos`,url:`/planes`},{icon:`fa-table-cells`,color:`#7000FF`,label:`Semanal`,desc:`7 días de un vistazo`,url:`/semanal`},{icon:`fa-calendar-days`,color:`#FFB800`,label:`Mes`,desc:`Calendario mensual`,url:`/mes`},{icon:`fa-trophy`,color:`#FF8C00`,label:`Logros`,desc:`XP y reconocimientos`,url:`/logros`},{icon:`fa-circle-info`,color:`#A855F7`,label:`Acerca`,desc:`Sobre Winwii`,url:`/acerca`}],u=[{icon:`fa-calendar-week`,color:`Cielo`,titulo:`Horario Visual Inteligente`,desc:`Organiza tu semana con un calendario de arrastrar y soltar. Bloques de tiempo claros, colores por tipo de actividad y sincronización en tiempo real.`},{icon:`fa-folder-open`,color:`Dulce`,titulo:`Tareas Estilo Scrum`,desc:`Un tablero Kanban profesional con 4 columnas: Pendiente, En Progreso, Revisión y Hecho. Mueve tus tareas con fluidez total.`},{icon:`fa-rocket`,color:`Paz`,titulo:`Metas con Seguimiento`,desc:`Define planes, establece pasos y mide tu avance. Indicadores de progreso visuales que te muestran qué tan cerca estás de tus objetivos.`},{icon:`fa-table-cells`,color:`Mora`,titulo:`Vista Semanal 7 Días`,desc:`Tu semana completa en una sola pantalla. Compara la carga por día, identifica días libres y distribuye actividades con inteligencia.`},{icon:`fa-calendar-days`,color:`Cielo`,titulo:`Calendario Mensual`,desc:`Navega por cualquier mes del año. Agrega eventos con categoría, color y prioridad. Tu agenda mensual siempre organizada.`},{icon:`fa-trophy`,color:`Dulce`,titulo:`Sistema de Logros & XP`,desc:`Registra tus éxitos, gana XP y sube de nivel. Insignias automáticas, timeline de logros y estadísticas de tu progreso personal.`}],d=[{num:`1`,icon:`fa-calendar-week`,titulo:`Organiza tu horario`,desc:`Agrega tus actividades semanales con el calendario visual y gestiona tu tiempo al detalle.`},{num:`2`,icon:`fa-list-check`,titulo:`Gestiona tus tareas`,desc:`Crea, prioriza y mueve tareas en tu tablero Kanban. De pendiente a completado con un clic.`},{num:`3`,icon:`fa-trophy`,titulo:`Registra tus logros`,desc:`Celebra cada éxito, acumula XP y construye tu historial de productividad personal.`}],f=[{avatar:`👩‍💼`,nombre:`Ana Rodríguez`,rol:`Project Manager`,texto:`El tablero Kanban de Winwii es exactamente lo que necesitaba. Simple, elegante y sincronizado con la nube.`,estrellas:5},{avatar:`👨‍🎓`,nombre:`Luis Paredes`,rol:`Estudiante de Ingeniería`,texto:`Uso el módulo de Semanal para distribuir mis estudios. Ver los 7 días juntos me ayuda a balancear perfectamente.`,estrellas:5},{avatar:`👩‍💻`,nombre:`Valeria Castro`,rol:`Diseñadora Freelance`,texto:`El sistema de logros con XP me mantiene motivada. Es como un juego de productividad que funciona de verdad.`,estrellas:5},{avatar:`👨‍🏢`,nombre:`Rodrigo Huanca`,rol:`Emprendedor`,texto:`Organizo mis proyectos con Planes y mis reuniones con el Horario. Todo integrado y con un diseño increíble.`,estrellas:5}],p=[{icon:`fab fa-js`,label:`JavaScript ES6+`,color:`#FFB800`},{icon:`fab fa-css3-alt`,label:`CSS3 Moderno`,color:`#0EBEFF`},{icon:`fab fa-html5`,label:`HTML5`,color:`#FF5C69`},{icon:`fas fa-fire`,label:`Firebase`,color:`#FF8C00`},{icon:`fas fa-bolt`,label:`Vite`,color:`#7000FF`},{icon:`fas fa-mobile-screen`,label:`Responsive`,color:`#29C72E`}],m=()=>`
<div class="dc_wrap">

  <!-- ══ HERO ══ -->
  <section class="dc_hero">
    <div class="dc_hero_orb dc_orb1"></div>
    <div class="dc_hero_orb dc_orb2"></div>
    <div class="dc_hero_orb dc_orb3"></div>
    <div class="dc_hero_body">
      <div class="dc_hero_logo">
        <img src="/typingwii/logo.webp" alt="${s}" loading="lazy">
      </div>
      <div class="dc_hero_badge"><i class="fas fa-calendar-check"></i> Planificador Semanal Profesional</div>
      <h1 class="dc_hero_tit">${s}</h1>
      <p class="dc_hero_sub">
        Organiza tu semana como un <strong>verdadero profesional</strong>.
        Horario visual, tareas Kanban, metas con seguimiento y un sistema de logros
        con <strong>XP</strong>. Todo gratis, todo tuyo.
      </p>
      <div class="dc_hero_stats">
        ${c.map(e=>`
          <div class="dc_stat" style="--sc:${e.color}">
            <i class="fas ${e.icon}" style="color:${e.color}"></i>
            <strong>${e.num}</strong>
            <span>${e.label}</span>
          </div>`).join(``)}
      </div>
      <div class="dc_hero_btns">
        <a href="/horario" class="dc_btn_p dc_btn_glow"><i class="fas fa-calendar-week"></i> Ver mi semana</a>
        <button class="dc_btn_s" id="dc_compartir"><i class="fas fa-share-nodes"></i> Compartir</button>
      </div>
      <div class="dc_hero_scroll"><i class="fas fa-chevron-down"></i></div>
    </div>
  </section>

  <!-- ══ COUNTER BAND ══ -->
  <div class="dc_counter_band">
    <div class="dc_counter_item">
      <span class="dc_counter_num" data-target="7">0</span>
      <p>Módulos de organización</p>
    </div>
    <div class="dc_counter_sep"></div>
    <div class="dc_counter_item">
      <span class="dc_counter_num" data-target="100">0</span><span>%</span>
      <p>Gratis para siempre</p>
    </div>
    <div class="dc_counter_sep"></div>
    <div class="dc_counter_item">
      <span class="dc_counter_num" data-target="5">0</span>
      <p>Temas de color</p>
    </div>
    <div class="dc_counter_sep"></div>
    <div class="dc_counter_item">
      <span class="dc_counter_num" data-target="4">0</span>
      <p>Dispositivos sincronizados</p>
    </div>
  </div>

  <!-- ══ MÓDULOS ══ -->
  <section class="dc_sec">
    <div class="dc_sec_head">
      <div class="dc_sec_badge"><i class="fas fa-layer-group"></i> Módulos</div>
      <h2 class="dc_sec_tit">Explora por <span class="dc_grad">módulo</span></h2>
      <p class="dc_sec_sub">7 herramientas de organización diseñadas para tu vida diaria y profesional</p>
    </div>
    <div class="dc_cat_grid">
      ${l.map(e=>`
        <a href="${e.url}" class="dc_cat_card wi_fadeUp" style="--cc:${e.color}">
          <div class="dc_cat_ico"><i class="fas ${e.icon}"></i></div>
          <div class="dc_cat_info">
            <strong>${e.label}</strong>
            <span>${e.desc}</span>
          </div>
          <div class="dc_cat_arr"><i class="fas fa-arrow-right"></i></div>
        </a>`).join(``)}
    </div>
  </section>

  <!-- ══ BENEFICIOS ══ -->
  <section class="dc_sec dc_sec_alt">
    <div class="dc_sec_head">
      <div class="dc_sec_badge"><i class="fas fa-star"></i> Beneficios</div>
      <h2 class="dc_sec_tit">Herramientas reales para <span class="dc_grad">tu productividad</span></h2>
      <p class="dc_sec_sub">Cada módulo resuelve un problema real de organización personal y profesional</p>
    </div>
    <div class="dc_feat_grid">
      ${u.map(e=>`
        <div class="dc_feat_card wi_fadeUp dc_color_${e.color.toLowerCase()}">
          <div class="dc_feat_ico"><i class="fas ${e.icon}"></i></div>
          <h3>${e.titulo}</h3>
          <p>${e.desc}</p>
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ CÓMO FUNCIONA ══ -->
  <section class="dc_sec">
    <div class="dc_sec_head">
      <div class="dc_sec_badge"><i class="fas fa-route"></i> Cómo funciona</div>
      <h2 class="dc_sec_tit">3 pasos para <span class="dc_grad">dominar tu semana</span></h2>
      <p class="dc_sec_sub">Sin curva de aprendizaje. Comienza a organizarte desde el primer minuto</p>
    </div>
    <div class="dc_pasos">
      ${d.map((e,t)=>`
        <div class="dc_paso wi_fadeUp">
          <div class="dc_paso_num">${e.num}</div>
          <div class="dc_paso_ico"><i class="fas ${e.icon}"></i></div>
          <h3>${e.titulo}</h3>
          <p>${e.desc}</p>
        </div>
        ${t<d.length-1?`<div class="dc_paso_sep"><i class="fas fa-chevron-right"></i></div>`:``}`).join(``)}
    </div>
  </section>

  <!-- ══ TESTIMONIOS ══ -->
  <section class="dc_sec dc_sec_alt">
    <div class="dc_sec_head">
      <div class="dc_sec_badge"><i class="fas fa-comments"></i> Testimonios</div>
      <h2 class="dc_sec_tit">Lo que dicen quienes ya <span class="dc_grad">organizan mejor</span></h2>
      <p class="dc_sec_sub">Personas reales que transformaron su productividad con Winwii</p>
    </div>
    <div class="dc_test_grid">
      ${f.map(e=>`
        <div class="dc_test_card wi_fadeUp">
          <div class="dc_test_stars">${`<i class="fas fa-star"></i>`.repeat(e.estrellas)}</div>
          <p class="dc_test_txt">"${e.texto}"</p>
          <div class="dc_test_autor">
            <span class="dc_test_avatar">${e.avatar}</span>
            <div>
              <strong>${e.nombre}</strong>
              <span>${e.rol}</span>
            </div>
          </div>
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ TECNOLOGÍA ══ -->
  <section class="dc_sec">
    <div class="dc_sec_head">
      <div class="dc_sec_badge"><i class="fas fa-code"></i> Stack técnico</div>
      <h2 class="dc_sec_tit">Construido con <span class="dc_grad">lo mejor</span></h2>
      <p class="dc_sec_sub">Tecnología moderna para una experiencia rápida y confiable</p>
    </div>
    <div class="dc_tech_grid">
      ${p.map(e=>`
        <div class="dc_tech_item wi_fadeUp" style="--tc:${e.color}">
          <i class="${e.icon}" style="color:${e.color}"></i>
          <span>${e.label}</span>
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ CTA FINAL ══ -->
  <section class="dc_cta_sec">
    <div class="dc_cta_wrap wi_fadeUp">
      <div class="dc_cta_glow"></div>
      <div class="dc_cta_particles">
        ${Array.from({length:6}).map(()=>`<span class="dc_particle"></span>`).join(``)}
      </div>
      <div class="dc_cta_inner">
        <span class="dc_cta_emoji">📅</span>
        <h2>¿Listo para organizar<br>tu semana como un pro?</h2>
        <p>Empieza gratis ahora mismo. Sin registro obligatorio.</p>
        <div class="dc_cta_chips">
          ${l.slice(0,6).map(e=>`
            <a href="${e.url}" class="dc_chip" style="--cc:${e.color}" ${t(e.desc)}>
              <i class="fas ${e.icon}"></i> ${e.label}
            </a>`).join(``)}
        </div>
        <div class="dc_cta_btns">
          <a href="/horario" class="dc_btn_p dc_btn_lg dc_btn_glow"><i class="fas fa-calendar-week"></i> Ver mi semana</a>
          <button class="dc_btn_s dc_btn_lg" id="dc_compartir2"><i class="fas fa-share-nodes"></i> Compartir</button>
        </div>
        <p class="dc_footer_txt">
          ${s} v9 · Hecho con <i class="fas fa-heart"></i> por
          <a href="${o}" target="_blank" rel="noopener">${a}</a> · ${n()}
        </p>
      </div>
    </div>
  </section>

</div>`,h=()=>{e(`.dc_counter_num`).each(function(){let t=e(this),n=+t.data(`target`),r=null,i=e=>{r||=e;let a=Math.min((e-r)/1800,1),o=1-(1-a)**3;t.text(Math.floor(o*n).toLocaleString()),a<1&&requestAnimationFrame(i)};requestAnimationFrame(i)})},g=()=>{r(`.dc_cat_card`,null,{anim:`wi_fadeUp`,stagger:60}),r(`.dc_feat_card`,null,{anim:`wi_fadeUp`,stagger:80}),r(`.dc_paso`,null,{anim:`wi_fadeUp`,stagger:120}),r(`.dc_tech_item`,null,{anim:`wi_fadeUp`,stagger:60}),r(`.dc_test_card`,null,{anim:`wi_fadeUp`,stagger:80}),r(`.dc_cta_wrap`,null,{anim:`wi_fadeUp`});let t=e(`.dc_counter_band`)[0];if(t){let e=new IntersectionObserver(([t])=>{t.isIntersecting&&(h(),e.disconnect())},{threshold:.3});e.observe(t)}let a=e=>{let t=`https://winwii.web.app/`;navigator.share?navigator.share({title:s,text:`📅 ${s} — Planificador Semanal Profesional`,url:t}).catch(()=>{}):i(t,e,`¡Link copiado! ✨`)};e(`#dc_compartir`).on(`click`,function(){a(this)}),e(`#dc_compartir2`).on(`click`,function(){a(this)}),console.log(`🔍 ${s} v9 · Descubre ${n()}`)},_=()=>{e(`#dc_compartir, #dc_compartir2`).off(`click`),console.log(`🧹 Descubre`)};export{_ as cleanup,g as init,m as render};