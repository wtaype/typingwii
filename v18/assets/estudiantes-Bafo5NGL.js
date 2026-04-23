import"./vendor-BDh6mtVu.js";import{y as e}from"./widev-COmfIAwj.js";import{t}from"./wii-k5y-1NE-.js";var n=[{ico:`fa-bolt`,c:`#0EBEFF`,t:`Aprende más rápido`,d:`Con nuestro método progresivo pasarás de 0 a 60 WPM en semanas. Cada lección construye sobre la anterior.`},{ico:`fa-certificate`,c:`#fd7e14`,t:`Certificado digital`,d:`Al completar cada nivel obtienes un certificado oficial con tu nombre, WPM y fecha. Perfecto para tu portafolio.`},{ico:`fa-chart-line`,c:`#28a745`,t:`Ve tu progreso real`,d:`Historial completo de tus resultados. Gráficas de WPM y precisión lección a lección para que veas tu evolución.`},{ico:`fa-mobile-screen`,c:`#7000FF`,t:`En cualquier dispositivo`,d:`Laptop, tablet o celular. Tu progreso se sincroniza automáticamente. Practica donde y cuando quieras.`},{ico:`fa-gift`,c:`#FF5C69`,t:`100% gratuito`,d:`Sin costos ocultos, sin suscripciones. Accede a todas las lecciones y herramientas completamente gratis.`},{ico:`fa-envelope`,c:`#FFD101`,t:`Apoyo del instructor`,d:`Comunícate directamente con tu profesor desde la plataforma. Recibe feedback personalizado en tiempo real.`}],r=[{n:`01`,ico:`fa-user-plus`,t:`Regístrate gratis`,d:`Crea tu cuenta en menos de 1 minuto. Solo necesitas tu correo y elegir un nombre de usuario.`},{n:`02`,ico:`fa-keyboard`,t:`Elige tu lección`,d:`Empieza desde la lección 1 o desde donde te sientas cómodo. El sistema te guía paso a paso.`},{n:`03`,ico:`fa-fire`,t:`Practica cada día`,d:`15 minutos al día es suficiente. La constancia supera a la intensidad en la mecanografía.`},{n:`04`,ico:`fa-trophy`,t:`Obtén tu certificado`,d:`Al superar la meta de cada nivel, descarga tu certificado digital personalizado.`}],i=[{n:`12`,l:`Lecciones`,ico:`fa-book-open`},{n:`5`,l:`Niveles`,ico:`fa-layer-group`},{n:`70`,l:`WPM posible`,ico:`fa-bolt`},{n:`100%`,l:`Gratis`,ico:`fa-gift`}],a=()=>`
<div class="pu_page est_page">

  <!-- ══ HERO ══ -->
  <section class="pu_hero est_hero">
    <div class="pu_hero_bg">
      <div class="pu_orb pu_orb1" style="background:color-mix(in srgb,#0EBEFF 10%,transparent)"></div>
      <div class="pu_orb pu_orb2" style="background:color-mix(in srgb,#7000FF 8%,transparent)"></div>
    </div>
    <div class="pu_hero_inner">
      <div class="pu_hero_left">
        <div class="pu_badge"><i class="fas fa-graduation-cap"></i> Para estudiantes · ${t}</div>
        <h1 class="pu_h1">
          Domina el teclado y<br>
          <span class="pu_grad">destaca en tu carrera</span>
        </h1>
        <p class="pu_sub">
          Aprende a escribir rápido y sin errores con nuestro método interactivo.
          Practica a tu ritmo, mide tu WPM y obtén certificados digitales
          que demuestran tu habilidad. <strong>¡Es completamente gratis!</strong>
        </p>
        <div class="pu_hero_cta">
          <a href="/registrar" class="pu_btn_main nv_item" data-page="registrar">
            <i class="fas fa-rocket"></i> Empezar gratis ahora
          </a>
          <a href="/comenzar" class="pu_btn_gho nv_item" data-page="comenzar">
            <i class="fas fa-play"></i> Probar sin registrarme
          </a>
        </div>
        <!-- Stats rápidos -->
        <div class="pu_quick_stats">
          ${i.map(e=>`
            <div class="pu_qs">
              <span class="pu_qs_n">${e.n}</span>
              <span class="pu_qs_l"><i class="fas ${e.ico}"></i> ${e.l}</span>
            </div>`).join(`<div class="pu_qs_sep"></div>`)}
        </div>
      </div>
      <div class="pu_hero_right">
        <div class="est_preview_card">
          <div class="est_pc_header">
            <div class="est_pc_dots">
              <span style="background:#FF5F57"></span>
              <span style="background:#FFBD2E"></span>
              <span style="background:#28CA41"></span>
            </div>
            <span class="est_pc_title"><i class="fas fa-keyboard"></i> ${t} · Dashboard</span>
          </div>
          <div class="est_pc_body">
            <div class="est_pc_user">
              <div class="est_pc_avatar"><i class="fas fa-user-graduate"></i></div>
              <div>
                <div class="est_pc_name">Estudiante</div>
                <div class="est_pc_level">Nivel 2 · Consolidación</div>
              </div>
            </div>
            <div class="est_pc_metrics">
              <div class="est_pm" style="--mc:#0EBEFF">
                <div class="est_pm_n">42</div><div class="est_pm_l">WPM</div>
              </div>
              <div class="est_pm" style="--mc:#28a745">
                <div class="est_pm_n">94%</div><div class="est_pm_l">Precisión</div>
              </div>
              <div class="est_pm" style="--mc:#FF5C69">
                <div class="est_pm_n">7</div><div class="est_pm_l">Días racha</div>
              </div>
            </div>
            <div class="est_pc_prog_label">Lección 5 de 12 · 41% completado</div>
            <div class="est_pc_prog_track">
              <div class="est_pc_prog_fill" style="width:41%;background:#0EBEFF"></div>
            </div>
            <div class="est_pc_lec_current">
              <i class="fas fa-play-circle" style="color:#0EBEFF"></i>
              <span>Lección 5: Palabras comunes</span>
            </div>
          </div>
        </div>
        <!-- Floating cards -->
        <div class="est_fc est_fc1">
          <i class="fas fa-fire" style="color:#FF5C69"></i>
          <div><strong>¡Récord!</strong><span>65 WPM hoy</span></div>
        </div>
        <div class="est_fc est_fc2">
          <i class="fas fa-certificate" style="color:#fd7e14"></i>
          <div><strong>Nivel 1</strong><span>Certificado listo</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ BENEFICIOS ══ -->
  <section class="pu_sec">
    <div class="pu_sec_head wi_fadeUp">
      <div class="pu_sec_badge"><i class="fas fa-star"></i> ¿Por qué elegir ${t}?</div>
      <h2 class="pu_sec_h2">Todo lo que <span class="pu_grad">necesitas como estudiante</span></h2>
      <p class="pu_sec_sub">Una plataforma diseñada específicamente para el aprendizaje efectivo de la mecanografía</p>
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

  <!-- ══ CÓMO FUNCIONA ══ -->
  <section class="pu_sec pu_sec_alt">
    <div class="pu_sec_head wi_fadeUp">
      <div class="pu_sec_badge"><i class="fas fa-map"></i> Roadmap</div>
      <h2 class="pu_sec_h2">Tu camino en <span class="pu_grad">4 pasos simples</span></h2>
    </div>
    <div class="pu_pasos_grid">
      ${r.map((e,t)=>`
        <div class="pu_paso wi_fadeUp" style="--d:${t*.1}s">
          <div class="pu_paso_num">${e.n}</div>
          <div class="pu_paso_ico"><i class="fas ${e.ico}"></i></div>
          <h3 class="pu_paso_t">${e.t}</h3>
          <p class="pu_paso_d">${e.d}</p>
          ${t<r.length-1?`<div class="pu_paso_arrow"><i class="fas fa-arrow-right"></i></div>`:``}
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ CTA ══ -->
  <section class="pu_cta_sec wi_fadeUp">
    <div class="pu_cta_card" style="--cta_c:#0EBEFF">
      <div class="pu_cta_orb"></div>
      <div class="pu_cta_inner">
        <div class="pu_cta_txt">
          <div class="pu_cta_ico"><i class="fas fa-graduation-cap"></i></div>
          <h2>¿Listo para comenzar tu camino?</h2>
          <p>Únete a ${t} gratis y transforma tu forma de escribir. Tu primer certificado te espera. 🏆</p>
        </div>
        <div class="pu_cta_btns">
          <a href="/registrar" class="pu_btn_main pu_btn_white nv_item" data-page="registrar">
            <i class="fas fa-user-plus"></i> Crear cuenta gratis
          </a>
          <a href="/lecciones" class="pu_btn_gho pu_btn_white_o nv_item" data-page="lecciones">
            <i class="fas fa-book-open"></i> Ver lecciones
          </a>
        </div>
      </div>
    </div>
  </section>

</div>`,o=[],s=()=>{o=[e(`.pu_bene_card`,null,{anim:`wi_fadeUp`,stagger:80}),e(`.pu_paso`,null,{anim:`wi_fadeUp`,stagger:100}),e(`.wi_fadeUp`,null,{anim:`wi_fadeUp`})],console.log(`🎓 ${t} — Estudiantes listo`)},c=()=>{o.forEach(e=>e?.disconnect?.()),o=[]};export{c as cleanup,s as init,a as render};