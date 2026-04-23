import"./vendor-BDh6mtVu.js";import{y as e}from"./widev-Rm_DE4JR.js";import{t}from"./wii-k5y-1NE-.js";var n=[{ico:`fa-bullseye`,c:`#0EBEFF`,t:`Aprendizaje enfocado`,d:`Creemos que la mecanografía debe aprenderse de forma estructurada, eliminando distracciones para centrarse en la memoria muscular.`},{ico:`fa-universal-access`,c:`#28a745`,t:`Accesibilidad`,d:`Diseñamos herramientas que cualquiera, desde un niño hasta un profesional, pueda usar sin barreras técnicas ni costos.`},{ico:`fa-microchip`,c:`#fd7e14`,t:`Innovación constante`,d:`Usamos tecnología de punta para medir cada pulsación y ofrecer métricas precisas que ayuden al usuario a mejorar.`},{ico:`fa-heart`,c:`#FF5C69`,t:`Pasión por la educación`,d:`TypingWii nació de la necesidad de mejorar las habilidades digitales en un mundo cada vez más conectado.`}],r=[{n:`+50K`,l:`Palabras escritas`,ico:`fa-keyboard`},{n:`100%`,l:`Gratuito`,ico:`fa-gift`},{n:`+12`,l:`Lecciones guiadas`,ico:`fa-book`},{n:`24/7`,l:`Disponibilidad`,ico:`fa-cloud`}],i=()=>`
<div class="ac_page">

  <!-- ══ HERO ══ -->
  <section class="ac_hero">
    <div class="ac_hero_bg">
      <div class="ac_orb ac_orb1"></div>
      <div class="ac_orb ac_orb2"></div>
    </div>
    <div class="ac_hero_inner">
      <div class="ac_badge"><i class="fas fa-info-circle"></i> Acerca de nosotros</div>
      <h1 class="ac_h1">Transformando la forma en que el mundo <span class="ac_grad">escribe</span></h1>
      <p class="ac_sub">En ${t}, nuestra misión es empoderar a estudiantes y profesionales con la habilidad digital más fundamental: la mecanografía rápida y precisa.</p>
    </div>
  </section>

  <!-- ══ HISTORIA / MISION ══ -->
  <section class="ac_sec">
    <div class="ac_mision_grid">
      <div class="ac_mision_img wi_fadeUp">
        <div class="ac_img_card">
          <i class="fas fa-quote-left"></i>
          <p>La mecanografía no es solo escribir rápido, es liberar tu mente para que tus dedos sigan el ritmo de tus pensamientos.</p>
          <div class="ac_img_author">
            <div class="ac_author_av">WT</div>
            <div>
              <strong>Wilder Taype</strong>
              <span>Fundador de ${t}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ac_mision_txt wi_fadeUp" style="--d:.15s">
        <div class="ac_sec_badge"><i class="fas fa-rocket"></i> Nuestra historia</div>
        <h2 class="ac_sec_h2">¿Qué es <span class="ac_grad">${t}</span>?</h2>
        <p class="ac_sec_p">
          ${t} nació como un proyecto personal para resolver una necesidad común: la falta de plataformas profesionales, gratuitas y divertidas para aprender mecanografía en español. 
          <br><br>
          Lo que comenzó como una herramienta simple para amigos, se ha convertido en una plataforma robusta utilizada por estudiantes, profesores y empresas que buscan mejorar su productividad diaria.
        </p>
        <div class="ac_mision_stats">
          ${r.map(e=>`
            <div class="ac_ms">
              <span class="ac_ms_n">${e.n}</span>
              <span class="ac_ms_l">${e.l}</span>
            </div>`).join(``)}
        </div>
      </div>
    </div>
  </section>

  <!-- ══ VALORES ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head wi_fadeUp">
      <div class="ac_sec_badge"><i class="fas fa-star"></i> Nuestros valores</div>
      <h2 class="ac_sec_h2">Lo que nos <span class="ac_grad">impulsa cada día</span></h2>
      <p class="ac_sec_sub">Principios que guían cada línea de código y cada lección que diseñamos.</p>
    </div>
    <div class="ac_grid_2">
      ${n.map((e,t)=>`
        <div class="ac_valor_card wi_fadeUp" style="--vc:${e.c};--d:${t*.1}s">
          <div class="ac_v_ico"><i class="fas ${e.ico}"></i></div>
          <div class="ac_v_txt">
            <h3>${e.t}</h3>
            <p>${e.d}</p>
          </div>
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ VISION ══ -->
  <section class="ac_sec">
    <div class="ac_vision_card wi_fadeUp">
      <div class="ac_vision_txt">
        <div class="ac_sec_badge" style="color:#fff;border-color:rgba(255,255,255,.3)"><i class="fas fa-eye"></i> Nuestra Visión</div>
        <h2 class="ac_vision_h2">Ser la plataforma líder en <span class="ac_vision_grad">capacitación digital</span> del Perú para el 2026.</h2>
        <p class="ac_vision_p">Queremos que cada aula y cada empresa tenga acceso a herramientas de primer nivel para cerrar la brecha digital.</p>
        <div class="ac_vision_item">
          <i class="fas fa-check-circle"></i>
          <span>Impactar a más de 100,000 estudiantes.</span>
        </div>
        <div class="ac_vision_item">
          <i class="fas fa-check-circle"></i>
          <span>Expandir nuestro catálogo a mecanografía técnica y de código.</span>
        </div>
      </div>
      <div class="ac_vision_icon">
        <i class="fas fa-earth-americas"></i>
      </div>
    </div>
  </section>

  <!-- ══ CTA FINAL ══ -->
  <section class="ac_cta_sec wi_fadeUp">
    <div class="ac_cta_card">
      <div class="ac_cta_orb"></div>
      <div class="ac_cta_inner">
        <div class="ac_cta_ico"><i class="fas fa-keyboard"></i></div>
        <div class="ac_cta_txt">
          <h2>¿Listo para mejorar tu velocidad?</h2>
          <p>Únete a miles de personas que ya están escribiendo como expertos en ${t}.</p>
        </div>
        <div class="ac_cta_btns">
          <a href="/comenzar" class="ac_btn_pri nv_item" data-page="comenzar">
            <i class="fas fa-play"></i> Probar gratis
          </a>
          <a href="/registrar" class="ac_btn_gho nv_item" data-page="registrar">
            <i class="fas fa-user-plus"></i> Crear cuenta
          </a>
        </div>
      </div>
    </div>
  </section>

</div>`,a=[],o=()=>{a=[e(`.wi_fadeUp`,null,{anim:`wi_fadeUp`}),e(`.ac_valor_card`,null,{anim:`wi_fadeUp`,stagger:100})],console.log(`ℹ️ ${t} — Acerca de listo`)},s=()=>{a.forEach(e=>e?.disconnect?.()),a=[]};export{s as cleanup,o as init,i as render};