import{t as e}from"./wii-CZYUy4T7.js";import"./vendor-BDh6mtVu.js";import{y as t}from"./widev-C3qELtTZ.js";var n=[{ico:`fa-users-viewfinder`,c:`#0EBEFF`,t:`Monitorea tu clase`,d:`Visualiza en tiempo real el WPM, precisión y lecciones completadas de cada alumno. Todo en un panel centralizado.`},{ico:`fa-paper-plane`,c:`#28a745`,t:`Envía mensajes directos`,d:`Comunícate con cada estudiante desde la plataforma. Envía instrucciones, felicitaciones o correcciones personalizadas.`},{ico:`fa-chart-bar`,c:`#fd7e14`,t:`Reportes de progreso`,d:`Descarga reportes detallados de rendimiento por alumno o por grupo. Útil para evaluaciones y calificaciones.`},{ico:`fa-award`,c:`#7000FF`,t:`Valida logros`,d:`Cada certificado generado por tus alumnos queda registrado. Puedes verificar su autenticidad y validarlos.`},{ico:`fa-list-check`,c:`#FF5C69`,t:`Asigna lecciones`,d:`Define qué lecciones deben completar tus estudiantes y en qué orden. Personaliza el plan de estudio por grupo.`},{ico:`fa-chalkboard-user`,c:`#FFD101`,t:`Perfil de instructor`,d:`Cuenta con perfil de gestor con acceso privilegiado: ves datos de todos tus alumnos sin restricciones.`}],r=[{ico:`fa-clock`,t:`Ahorra tiempo de corrección`,d:`El sistema corrige automáticamente cada error. Tú ves el reporte, no tienes que evaluar manualmente.`},{ico:`fa-fire`,t:`Motiva con métricas reales`,d:`Los alumnos ven su WPM subir lección a lección. La gamificación natural mantiene la motivación alta.`},{ico:`fa-shield-halved`,t:`Datos seguros`,d:`Los datos de tus alumnos están protegidos. Solo tú tienes acceso a los reportes de tu clase.`}],i=[{n:`01`,ico:`fa-id-badge`,t:`Regístrate como gestor`,d:`Solicita acceso de instructor. Nosotros activamos tu perfil con privilegios de gestor.`},{n:`02`,ico:`fa-user-plus`,t:`Registra a tus alumnos`,d:`Los estudiantes se registran solos o tú los invitas. Se vinculan a tu clase automáticamente.`},{n:`03`,ico:`fa-table-list`,t:`Asigna el plan`,d:`Elige las 12 lecciones del plan estándar o personaliza el orden según tu currículo.`},{n:`04`,ico:`fa-magnifying-glass-chart`,t:`Monitorea y evalúa`,d:`Sigue el progreso semanal de cada alumno con reportes descargables para tu portafolio docente.`}],a=()=>`
<div class="pu_page pro_page">

  <!-- ══ HERO ══ -->
  <section class="pu_hero pro_hero">
    <div class="pu_hero_bg">
      <div class="pu_orb pu_orb1" style="background:color-mix(in srgb,#28a745 9%,transparent)"></div>
      <div class="pu_orb pu_orb2" style="background:color-mix(in srgb,#fd7e14 8%,transparent)"></div>
    </div>
    <div class="pu_hero_inner">
      <div class="pu_hero_left">
        <div class="pu_badge" style="color:#28a745;border-color:color-mix(in srgb,#28a745 30%,transparent)">
          <i class="fas fa-chalkboard-teacher"></i> Para profesores e instructores
        </div>
        <h1 class="pu_h1">
          Gestiona el aprendizaje<br>
          <span class="pu_grad" style="background:linear-gradient(135deg,#28a745,#fd7e14);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">de toda tu clase</span>
        </h1>
        <p class="pu_sub">
          ${e} te da las herramientas para que tus alumnos aprendan mecanografía
          de forma autónoma mientras tú monitoreas su progreso en tiempo real.
          <strong>Sin papeleos, sin correcciones manuales.</strong>
        </p>
        <div class="pu_hero_cta">
          <a href="/contacto" class="pu_btn_main nv_item" data-page="contacto"
            style="background:#28a745;box-shadow:0 6px 20px rgba(40,167,69,.3)">
            <i class="fas fa-chalkboard-user"></i> Solicitar acceso de gestor
          </a>
          <a href="/comenzar" class="pu_btn_gho nv_item" data-page="comenzar">
            <i class="fas fa-eye"></i> Ver demo
          </a>
        </div>
        <!-- Ventajas rápidas -->
        <div class="pro_quick_list">
          ${r.map(e=>`
            <div class="pro_ql_item">
              <div class="pro_ql_ico"><i class="fas ${e.ico}"></i></div>
              <div><strong>${e.t}</strong><br><span>${e.d}</span></div>
            </div>`).join(``)}
        </div>
      </div>
      <div class="pu_hero_right">
        <!-- Panel de aula simulado -->
        <div class="pro_panel_card">
          <div class="pro_panel_hdr">
            <i class="fas fa-chart-bar" style="color:#28a745"></i>
            <span>Panel del Instructor</span>
            <span class="pro_online"><i class="fas fa-circle"></i> 8 activos</span>
          </div>
          <div class="pro_panel_body">
            ${[[`Ana García`,78,97,`Nivel 4`],[`Luis Pérez`,52,91,`Nivel 3`],[`María López`,41,88,`Nivel 2`],[`Carlos R.`,35,84,`Nivel 2`],[`Sofia T.`,29,80,`Nivel 1`]].map(([e,t,n,r])=>`
              <div class="pro_student_row">
                <div class="pro_st_avatar"><i class="fas fa-user"></i></div>
                <div class="pro_st_info">
                  <div class="pro_st_name">${e}</div>
                  <div class="pro_st_nv">${r}</div>
                </div>
                <div class="pro_st_wpm" style="color:#28a745">${t}</div>
                <div class="pro_st_prc" style="color:${n>=90?`#28a745`:`#fd7e14`}">${n}%</div>
                <div class="pro_st_bar_w">
                  <div class="pro_st_bar" style="width:${(t/80*100).toFixed(0)}%;background:#28a745"></div>
                </div>
              </div>`).join(``)}
            <div class="pro_panel_foot">
              <span><i class="fas fa-users"></i> 24 estudiantes</span>
              <span><i class="fas fa-bolt" style="color:#fd7e14"></i> Prom. 47 WPM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ FEATURES ══ -->
  <section class="pu_sec">
    <div class="pu_sec_head wi_fadeUp">
      <div class="pu_sec_badge" style="color:#28a745"><i class="fas fa-cubes"></i> Herramientas para instructores</div>
      <h2 class="pu_sec_h2">Gestión <span class="pu_grad" style="background:linear-gradient(135deg,#28a745,#fd7e14);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">completa del aula</span></h2>
      <p class="pu_sec_sub">Todo lo que necesitas para enseñar mecanografía de forma profesional y eficiente</p>
    </div>
    <div class="pu_grid_3">
      ${n.map((e,t)=>`
        <div class="pu_bene_card wi_fadeUp" style="--bc:${e.c};--d:${t*.08}s">
          <div class="pu_bene_ico"><i class="fas ${e.ico}"></i></div>
          <h3 class="pu_bene_t">${e.t}</h3>
          <p class="pu_bene_d">${e.d}</p>
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ CÓMO EMPEZAR ══ -->
  <section class="pu_sec pu_sec_alt">
    <div class="pu_sec_head wi_fadeUp">
      <div class="pu_sec_badge"><i class="fas fa-map"></i> Primeros pasos</div>
      <h2 class="pu_sec_h2">Empieza a <span class="pu_grad" style="background:linear-gradient(135deg,#28a745,#fd7e14);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">enseñar hoy</span></h2>
    </div>
    <div class="pu_pasos_grid">
      ${i.map((e,t)=>`
        <div class="pu_paso wi_fadeUp" style="--d:${t*.1}s;--paso_c:#28a745">
          <div class="pu_paso_num">${e.n}</div>
          <div class="pu_paso_ico" style="background:color-mix(in srgb,#28a745 14%,var(--bg4));color:#28a745"><i class="fas ${e.ico}"></i></div>
          <h3 class="pu_paso_t">${e.t}</h3>
          <p class="pu_paso_d">${e.d}</p>
          ${t<i.length-1?`<div class="pu_paso_arrow"><i class="fas fa-arrow-right"></i></div>`:``}
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ CTA ══ -->
  <section class="pu_cta_sec wi_fadeUp">
    <div class="pu_cta_card" style="--cta_c:#28a745;background:linear-gradient(135deg,#28a745,#1a7a32)">
      <div class="pu_cta_orb"></div>
      <div class="pu_cta_inner">
        <div class="pu_cta_txt">
          <div class="pu_cta_ico"><i class="fas fa-chalkboard-teacher"></i></div>
          <h2>¿Quieres gestionar tu aula con ${e}?</h2>
          <p>Solicita acceso de instructor. Activaremos tu perfil de gestor sin costo alguno. 🎓</p>
        </div>
        <div class="pu_cta_btns">
          <a href="/contacto" class="pu_btn_main pu_btn_white nv_item" data-page="contacto">
            <i class="fas fa-envelope"></i> Contactar ahora
          </a>
          <a href="/lecciones" class="pu_btn_gho pu_btn_white_o nv_item" data-page="lecciones">
            <i class="fas fa-book-open"></i> Ver lecciones
          </a>
        </div>
      </div>
    </div>
  </section>

</div>`,o=[],s=()=>{o=[t(`.pu_bene_card`,null,{anim:`wi_fadeUp`,stagger:80}),t(`.pu_paso`,null,{anim:`wi_fadeUp`,stagger:100}),t(`.wi_fadeUp`,null,{anim:`wi_fadeUp`})],console.log(`🏫 ${e} — Profesores listo`)},c=()=>{o.forEach(e=>e?.disconnect?.()),o=[]};export{c as cleanup,s as init,a as render};