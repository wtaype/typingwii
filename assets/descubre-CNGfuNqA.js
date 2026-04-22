import"./vendor-BDh6mtVu.js";import{y as e}from"./widev-BVXcYvSP.js";import{t}from"./wii-9R-ZUv6c.js";var n=[{n:`Cielo`,c:`#0EBEFF`,d:`Inspirado en la calma del horizonte digital.`},{n:`Bosque`,c:`#28a745`,d:`Tonos naturales para una concentración total.`},{n:`Fuego`,c:`#FF5C69`,d:`Energía pura para los que buscan velocidad récord.`},{n:`Mora`,c:`#7000FF`,d:`Sofisticación y elegancia en cada pulsación.`},{n:`Ocaso`,c:`#fd7e14`,d:`Calidez para sesiones de práctica nocturnas.`},{n:`Noche`,c:`#24292e`,d:`Contraste perfecto para el modo oscuro real.`}],r=[{ico:`fa-gauge-high`,t:`Velocidad Real`,d:`Calculamos tus WPM (Palabras por minuto) de forma bruta y neta con precisión milimétrica.`},{ico:`fa-bullseye`,t:`Precisión Inteligente`,d:`No solo contamos errores, analizamos qué letras te cuestan más para sugerirte prácticas.`},{ico:`fa-keyboard`,t:`Visual Typing`,d:`Teclado virtual dinámico que te guía sobre qué dedo usar en cada momento.`},{ico:`fa-chart-line`,t:`Gráficas de Progreso`,d:`Visualiza tu evolución a lo largo de los días con reportes automáticos.`},{ico:`fa-shield-halved`,t:`Sin Distracciones`,d:`Interfaz minimalista diseñada para que solo existas tú y el texto frente a ti.`},{ico:`fa-cloud-arrow-up`,t:`Sincronización Pro`,d:`Tus récords se guardan en la nube para que compitas contigo mismo donde sea.`}],i=()=>`
<div class="des_page">

  <!-- ══ HERO ══ -->
  <section class="des_hero">
    <div class="des_hero_bg">
      <div class="des_orb des_orb1"></div>
      <div class="des_orb des_orb2"></div>
    </div>
    <div class="des_hero_inner">
      <div class="des_badge"><i class="fas fa-sparkles"></i> Descubre TypingWii</div>
      <h1 class="des_h1">Mucho más que un <br><span class="des_grad">test de velocidad</span></h1>
      <p class="des_sub">Explora las herramientas diseñadas para convertirte en un maestro de la mecanografía moderna.</p>
    </div>
  </section>

  <!-- ══ ENGINE SHOWCASE ══ -->
  <section class="des_sec">
    <div class="des_engine_wrap">
      <div class="des_engine_txt wi_fadeUp">
        <div class="des_sec_badge"><i class="fas fa-microchip"></i> El Corazón del Sistema</div>
        <h2 class="des_sec_h2">Tecnología <span class="des_grad">TypingCore</span></h2>
        <p class="des_sec_p">Nuestro motor de mecanografía no duerme. Captura más de 10 eventos por segundo para darte un feedback instantáneo de lo que está pasando en tus dedos.</p>
        <div class="des_engine_stats">
          <div class="des_es"><span><i class="fas fa-bolt"></i> 0ms</span> Latencia</div>
          <div class="des_es"><span><i class="fas fa-check"></i> 100%</span> Precisión</div>
        </div>
      </div>
      <div class="des_engine_vis wi_fadeUp" style="--d:.15s">
        <!-- Decoración visual de teclas -->
        <div class="des_keys_grid">
          <div class="des_key">Q</div><div class="des_key des_key_act">W</div><div class="des_key">E</div>
          <div class="des_key">A</div><div class="des_key">S</div><div class="des_key">D</div>
        </div>
        <div class="des_vis_label">Entrada en tiempo real activada</div>
      </div>
    </div>
  </section>

  <!-- ══ FEATURES GRID ══ -->
  <section class="des_sec des_sec_alt">
    <div class="des_sec_head wi_fadeUp">
      <div class="des_sec_badge"><i class="fas fa-wand-magic-sparkles"></i> Potencia pura</div>
      <h2 class="des_sec_h2">Diseñado para la <span class="des_grad">excelencia</span></h2>
      <p class="des_sec_sub">Hemos empaquetado todo lo que necesitas en una interfaz limpia y potente.</p>
    </div>
    <div class="des_grid_3">
      ${r.map((e,t)=>`
        <div class="des_feat_card wi_fadeUp" style="--d:${t*.08}s">
          <div class="des_feat_ico"><i class="fas ${e.ico}"></i></div>
          <h3>${e.t}</h3>
          <p>${e.d}</p>
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ TEMAS SHOWCASE ══ -->
  <section class="des_sec">
    <div class="des_sec_head wi_fadeUp">
      <div class="des_sec_badge"><i class="fas fa-palette"></i> Personalización</div>
      <h2 class="des_sec_h2">Tu espacio, <span class="des_grad">tu estilo</span></h2>
      <p class="des_sec_sub">Elige entre 6 temas exclusivos diseñados para reducir la fatiga visual y mejorar tu flujo.</p>
    </div>
    <div class="des_temas_grid">
      ${n.map((e,t)=>`
        <div class="des_tema_card wi_fadeUp" style="--tc:${e.c};--d:${t*.1}s">
          <div class="des_tema_dot"></div>
          <strong>${e.n}</strong>
          <span>${e.d}</span>
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ MODOS DE PRÁCTICA ══ -->
  <section class="des_sec">
    <div class="des_modos_card wi_fadeUp">
      <div class="des_modos_txt">
        <h2 class="des_sec_h2" style="color:#fff">Diversidad de <span style="color:#fff;text-decoration:underline">práctica</span></h2>
        <p style="color:rgba(255,255,255,.8)">No te limites a palabras comunes. Amplía tu vocabulario técnico y gramatical.</p>
        <div class="des_m_list">
          <div class="des_m_item"><i class="fas fa-code"></i> <span><strong>Código:</strong> Practica con sintaxis real (JS, Python, HTML).</span></div>
          <div class="des_m_item"><i class="fas fa-book"></i> <span><strong>Literatura:</strong> Practica con fragmentos de libros clásicos.</span></div>
          <div class="des_m_item"><i class="fas fa-brain"></i> <span><strong>Zen:</strong> Modo infinito sin presión de tiempo.</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ CTA FINAL ══ -->
  <section class="des_cta_sec wi_fadeUp">
    <div class="des_cta_card">
      <div class="des_cta_orb"></div>
      <div class="des_cta_inner">
        <div class="des_cta_ico"><i class="fas fa-compass"></i></div>
        <div class="des_cta_txt">
          <h2>¿Listo para empezar tu viaje?</h2>
          <p>La mejor forma de descubrir ${t} es sentándote frente al teclado.</p>
        </div>
        <div class="des_cta_btns">
          <a href="/comenzar" class="des_btn_pri nv_item" data-page="comenzar">
            <i class="fas fa-rocket"></i> Empezar ahora
          </a>
          <a href="/registrar" class="des_btn_gho nv_item" data-page="registrar">
            <i class="fas fa-user-plus"></i> Crear cuenta
          </a>
        </div>
      </div>
    </div>
  </section>

</div>`,a=[],o=()=>{a=[e(`.wi_fadeUp`,null,{anim:`wi_fadeUp`}),e(`.des_feat_card`,null,{anim:`wi_fadeUp`,stagger:80}),e(`.des_tema_card`,null,{anim:`wi_fadeUp`,stagger:100})],console.log(`✨ ${t} — Descubre listo`)},s=()=>{a.forEach(e=>e?.disconnect?.()),a=[]};export{s as cleanup,o as init,i as render};