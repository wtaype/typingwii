import{t as e}from"./vendor-BDh6mtVu.js";import{g as t,i as n,y as r}from"./widev-BG17oNzN.js";import{t as i}from"./wii-CH56_JtA.js";var a=()=>`
<div class="con_page">

  <!-- ══ HERO / HEADER ══ -->
  <section class="con_hero">
    <div class="con_hero_bg">
      <div class="con_orb con_orb1"></div>
      <div class="con_orb con_orb2"></div>
    </div>
    <div class="con_hero_body">
      <div class="con_badge"><i class="fas fa-envelope-open-text"></i> Contacto</div>
      <h1 class="con_h1">Estamos aquí para <span class="con_grad">ayudarte</span></h1>
      <p class="con_sub">¿Tienes dudas sobre los planes, problemas técnicos o sugerencias? <br>Nuestro equipo te responderá en menos de 24 horas.</p>
    </div>
  </section>

  <!-- ══ MAIN CONTENT ══ -->
  <section class="con_main">
    <div class="con_container">
      
      <!-- Info Column -->
      <div class="con_info wi_fadeUp">
        <div class="con_card con_info_card">
          <h2 class="con_card_title">Información de contacto</h2>
          <p class="con_card_desc">Usa cualquiera de estos canales para comunicarte directamente con nosotros.</p>
          
          <div class="con_info_list">
            <div class="con_info_item">
              <div class="con_info_ico" style="--ic:#0EBEFF"><i class="fas fa-paper-plane"></i></div>
              <div class="con_info_txt">
                <strong>Correo electrónico</strong>
                <a href="mailto:hola@typingwii.com">hola@typingwii.com</a>
              </div>
            </div>
            
            <div class="con_info_item">
              <div class="con_info_ico" style="--ic:#28a745"><i class="fas fa-comments"></i></div>
              <div class="con_info_txt">
                <strong>WhatsApp Soporte</strong>
                <a href="https://wa.me/51900000000" target="_blank">+51 900 000 000</a>
              </div>
            </div>

            <div class="con_info_item">
              <div class="con_info_ico" style="--ic:#7000FF"><i class="fas fa-headset"></i></div>
              <div class="con_info_txt">
                <strong>Horario de atención</strong>
                <span>Lunes a Viernes: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          <div class="con_social">
            <p>Síguenos en redes sociales:</p>
            <div class="con_social_links">
              <a href="#" class="con_social_link" style="--sc:#1877F2"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="con_social_link" style="--sc:#1DA1F2"><i class="fab fa-twitter"></i></a>
              <a href="#" class="con_social_link" style="--sc:#E4405F"><i class="fab fa-instagram"></i></a>
              <a href="#" class="con_social_link" style="--sc:#0A66C2"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Column -->
      <div class="con_form_wrap wi_fadeUp" style="--d:.15s">
        <div class="con_card con_form_card">
          <h2 class="con_card_title">Envíanos un mensaje</h2>
          <form id="con_form" class="con_form">
            <div class="con_form_grid">
              <div class="con_field">
                <label for="con_nombre">Nombre completo</label>
                <div class="con_input_group">
                  <i class="fas fa-user"></i>
                  <input type="text" id="con_nombre" name="nombre" placeholder="Ej. Wilder Taype" required>
                </div>
              </div>
              
              <div class="con_field">
                <label for="con_email">Correo electrónico</label>
                <div class="con_input_group">
                  <i class="fas fa-envelope"></i>
                  <input type="email" id="con_email" name="email" placeholder="tu@correo.com" required>
                </div>
              </div>
            </div>

            <div class="con_field">
              <label for="con_asunto">Asunto</label>
              <div class="con_input_group">
                <i class="fas fa-tag"></i>
                <select id="con_asunto" name="asunto" required>
                  <option value="" disabled selected>Selecciona un motivo</option>
                  <option value="Soporte técnico">Soporte técnico</option>
                  <option value="Consultas sobre planes">Consultas sobre planes</option>
                  <option value="Empresas / Instituciones">Empresas / Instituciones</option>
                  <option value="Sugerencias">Sugerencias</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div class="con_field">
              <label for="con_mensaje">Mensaje</label>
              <textarea id="con_mensaje" name="mensaje" rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
            </div>

            <button type="submit" class="con_btn_submit" id="con_btn_enviar">
              <i class="fas fa-paper-plane"></i> Enviar mensaje
            </button>
          </form>
        </div>
      </div>

    </div>
  </section>

  <!-- ══ FAQ CTA ══ -->
  <section class="con_faq_cta wi_fadeUp">
    <div class="con_faq_card">
      <div class="con_faq_inner">
        <i class="fas fa-lightbulb"></i>
        <div>
          <h3>¿Buscas respuestas rápidas?</h3>
          <p>Revisa nuestra sección de preguntas frecuentes para resolver dudas comunes al instante.</p>
        </div>
        <a href="/precios" class="con_btn_faq nv_item" data-page="precios">Ver FAQ</a>
      </div>
    </div>
  </section>

</div>
`,o=[],s=()=>{o=[r(`.wi_fadeUp`,null,{anim:`wi_fadeUp`})],e(document).off(`.con`),e(document).on(`submit.con`,`#con_form`,function(r){r.preventDefault();let i=e(`#con_btn_enviar`);t(i,!0,`Enviando...`),setTimeout(()=>{t(i,!1,`Guardado`),n(`¡Mensaje enviado correctamente! Te responderemos pronto.`,`success`),this.reset(),setTimeout(()=>{i.html(`<i class="fas fa-paper-plane"></i> Enviar mensaje`)},2e3)},1500)}),console.log(`✉️ ${i} — Página de contacto lista`)},c=()=>{o.forEach(e=>e?.disconnect?.()),o=[],e(document).off(`.con`)};export{c as cleanup,s as init,a as render};