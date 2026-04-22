import{t as e}from"./vendor-BDh6mtVu.js";import{y as t}from"./widev-C_asVASQ.js";import{t as n}from"./wii-9R-ZUv6c.js";var r=[{id:`free`,ico:`fa-seedling`,lbl:`Gratis`,precio:`$0`,periodo:`para siempre`,desc:`Perfecto para estudiantes que quieren aprender mecanografía sin ningún compromiso.`,color:`#28a745`,highlight:!1,cta_txt:`Empezar gratis`,cta_ico:`fa-rocket`,cta_href:`/registrar`,cta_page:`registrar`,items:[{ok:!0,txt:`12 lecciones completas`},{ok:!0,txt:`Test de mecanografía libre`},{ok:!0,txt:`Estadísticas básicas (WPM, %)`},{ok:!0,txt:`Certificado digital por nivel`},{ok:!0,txt:`6 temas de color`},{ok:!0,txt:`Acceso desde cualquier dispositivo`},{ok:!1,txt:`Panel de gestor`},{ok:!1,txt:`Soporte prioritario`},{ok:!1,txt:`Historial avanzado (90 días)`},{ok:!1,txt:`Módulo de mensajes`}]},{id:`pro`,ico:`fa-bolt`,lbl:`Pro`,precio:`$9`,periodo:`por mes`,desc:`Para estudiantes y profesores que quieren sacar el máximo provecho de la plataforma.`,color:`#0EBEFF`,highlight:!0,badge:`Más popular`,cta_txt:`Obtener Pro`,cta_ico:`fa-star`,cta_href:`/registrar`,cta_page:`registrar`,items:[{ok:!0,txt:`Todo lo del plan Gratis`},{ok:!0,txt:`Panel de gestor de estudiantes`},{ok:!0,txt:`Historial avanzado de 90 días`},{ok:!0,txt:`Módulo de mensajes con alumnos`},{ok:!0,txt:`Reportes de progreso en PDF`},{ok:!0,txt:`Soporte por correo (24h)`},{ok:!0,txt:`Hasta 30 estudiantes por cuenta`},{ok:!0,txt:`Lecciones personalizadas`},{ok:!0,txt:`Certificado con logo propio`},{ok:!1,txt:`API empresarial`}]},{id:`enterprise`,ico:`fa-building`,lbl:`Empresas`,precio:`A medida`,periodo:`contactar`,desc:`Para instituciones educativas, empresas y organizaciones con necesidades a escala.`,color:`#7000FF`,highlight:!1,cta_txt:`Contactar ahora`,cta_ico:`fa-envelope`,cta_href:`/contacto`,cta_page:`contacto`,items:[{ok:!0,txt:`Todo lo del plan Pro`},{ok:!0,txt:`Usuarios y estudiantes ilimitados`},{ok:!0,txt:`API de integración empresarial`},{ok:!0,txt:`SSO / Active Directory`},{ok:!0,txt:`Panel corporativo multigrupo`},{ok:!0,txt:`SLA garantizado`},{ok:!0,txt:`Gerente de cuenta dedicado`},{ok:!0,txt:`Capacitación inicial incluida`},{ok:!0,txt:`Reportes ejecutivos avanzados`},{ok:!0,txt:`Soporte prioritario 24/7`}]}],i=[{q:`¿El plan gratis tiene algún límite de tiempo?`,a:`No. El plan Gratis es para siempre. Puedes acceder a las 12 lecciones, el test de mecanografía y los certificados sin límite de tiempo ni tarjeta de crédito.`},{q:`¿Puedo cambiar de plan en cualquier momento?`,a:`Sí. Puedes pasar al plan Pro cuando quieras y volver al plan Gratis si lo deseas. No hay penalidades ni contratos mínimos.`},{q:`¿El plan Pro es por alumno o por cuenta?`,a:`El plan Pro es por cuenta de instructor. Con $9/mes puedes gestionar hasta 30 estudiantes desde un solo panel.`},{q:`¿Qué métodos de pago aceptan?`,a:`Aceptamos tarjetas de crédito/débito (Visa, Mastercard, Amex) y PayPal. Para el plan Empresas también aceptamos transferencia bancaria.`},{q:`¿Cómo funciona el plan Empresas?`,a:`Contáctanos y te preparamos una propuesta personalizada según el número de usuarios, integraciones requeridas y SLA que necesites.`}],a=()=>`
<div class="prc_page">

  <!-- ══ HERO ══ -->
  <div class="prc_hero">
    <div class="prc_hero_bg">
      <div class="prc_orb prc_orb1"></div>
      <div class="prc_orb prc_orb2"></div>
    </div>
    <div class="prc_hero_body">
      <div class="prc_badge"><i class="fas fa-tags"></i> Planes y precios</div>
      <h1 class="prc_h1">
        Elige el plan que<br>
        <span class="prc_grad">mejor te funciona</span>
      </h1>
      <p class="prc_sub">
        Comienza gratis. Actualiza cuando lo necesites.
        Sin contratos, sin sorpresas. <strong>Cancela cuando quieras.</strong>
      </p>
      <!-- Toggle mensual/anual (visual decorativo) -->
      <div class="prc_toggle_wrap">
        <span class="prc_tog_lbl prc_tog_act">Mensual</span>
        <div class="prc_toggle" id="prc_toggle">
          <div class="prc_tog_ball" id="prc_tog_ball"></div>
        </div>
        <span class="prc_tog_lbl" id="prc_tog_anual">
          Anual <span class="prc_save_badge">Ahorra 20%</span>
        </span>
      </div>
    </div>
  </div>

  <!-- ══ PLANES GRID ══ -->
  <div class="prc_planes_grid">
    ${r.map((e,t)=>`
      <div class="prc_plan wi_fadeUp ${e.highlight?`prc_plan_hl`:``}"
        style="--pc:${e.color};--d:${t*.13}s">

        <!-- Popular badge -->
        ${e.badge?`<div class="prc_popular_badge">${e.badge}</div>`:``}

        <!-- Header -->
        <div class="prc_plan_hdr">
          <div class="prc_plan_ico"><i class="fas ${e.ico}"></i></div>
          <div class="prc_plan_lbl">${e.lbl}</div>
        </div>

        <!-- Precio -->
        <div class="prc_precio_wrap">
          <div class="prc_precio" id="prc_precio_${e.id}">${e.precio}</div>
          <div class="prc_periodo">${e.periodo}</div>
        </div>
        <p class="prc_plan_desc">${e.desc}</p>

        <!-- CTA -->
        <a href="${e.cta_href}" class="prc_cta_btn nv_item" data-page="${e.cta_page}"
          ${e.highlight?``:`style="background:var(--bg4);color:var(--tx1);border:2px solid var(--brd)"`}>
          <i class="fas ${e.cta_ico}"></i> ${e.cta_txt}
        </a>

        <!-- Features -->
        <div class="prc_divider"></div>
        <ul class="prc_features">
          ${e.items.map(e=>`
            <li class="prc_feat_item ${e.ok?``:`prc_feat_off`}">
              <i class="fas ${e.ok?`fa-check`:`fa-minus`}"></i>
              <span>${e.txt}</span>
            </li>`).join(``)}
        </ul>
      </div>`).join(``)}
  </div>

  <!-- ══ GARANTÍA ══ -->
  <div class="prc_garantia_strip wi_fadeUp">
    <div class="prc_garantia_item">
      <i class="fas fa-shield-halved"></i>
      <div><strong>Sin riesgos</strong><span>Cancela cuando quieras</span></div>
    </div>
    <div class="prc_garantia_sep"></div>
    <div class="prc_garantia_item">
      <i class="fas fa-credit-card"></i>
      <div><strong>Sin tarjeta</strong><span>El plan gratis no requiere datos de pago</span></div>
    </div>
    <div class="prc_garantia_sep"></div>
    <div class="prc_garantia_item">
      <i class="fas fa-lock"></i>
      <div><strong>Datos seguros</strong><span>SSL · Pagos encriptados</span></div>
    </div>
    <div class="prc_garantia_sep"></div>
    <div class="prc_garantia_item">
      <i class="fas fa-headset"></i>
      <div><strong>Soporte real</strong><span>Respondemos en menos de 24 horas</span></div>
    </div>
  </div>

  <!-- ══ COMPARACIÓN (tabla) ══ -->
  <div class="prc_compare_sec wi_fadeUp">
    <div class="prc_sec_head">
      <div class="prc_sec_badge"><i class="fas fa-table"></i> Comparación detallada</div>
      <h2 class="prc_sec_h2">¿Qué incluye <span class="prc_grad">cada plan?</span></h2>
    </div>
    <div class="prc_table_wrap">
      <table class="prc_table">
        <thead>
          <tr>
            <th class="prc_th_feat">Característica</th>
            <th style="--thc:#28a745"><i class="fas fa-seedling"></i> Gratis</th>
            <th class="prc_th_hl" style="--thc:#0EBEFF"><i class="fas fa-bolt"></i> Pro</th>
            <th style="--thc:#7000FF"><i class="fas fa-building"></i> Empresas</th>
          </tr>
        </thead>
        <tbody>
          ${[[`Lecciones completas`,`✅`,`✅`,`✅`],[`Test de mecanografía`,`✅`,`✅`,`✅`],[`Certificados digitales`,`✅`,`✅`,`✅`],[`Estadísticas WPM / %`,`✅`,`✅`,`✅`],[`Historial de resultados`,`7 días`,`90 días`,`Ilimitado`],[`Estudiantes por cuenta`,`—`,`30`,`Ilimitado`],[`Panel de gestor`,`❌`,`✅`,`✅`],[`Mensajes con alumnos`,`❌`,`✅`,`✅`],[`Reportes PDF`,`❌`,`✅`,`✅`],[`Soporte`,`—`,`Email 24h`,`Prioritario 24/7`],[`Certificado con logo propio`,`❌`,`✅`,`✅`],[`API empresarial`,`❌`,`❌`,`✅`],[`SLA garantizado`,`❌`,`❌`,`✅`]].map((e,t)=>`
            <tr class="${t%2==0?`prc_tr_even`:``}">
              <td class="prc_td_feat">${e[0]}</td>
              <td class="prc_td">${e[1]}</td>
              <td class="prc_td prc_td_hl">${e[2]}</td>
              <td class="prc_td">${e[3]}</td>
            </tr>`).join(``)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- ══ FAQ ══ -->
  <div class="prc_faq_sec">
    <div class="prc_sec_head wi_fadeUp">
      <div class="prc_sec_badge"><i class="fas fa-circle-question"></i> Preguntas frecuentes</div>
      <h2 class="prc_sec_h2">Todo lo que debes <span class="prc_grad">saber</span></h2>
    </div>
    <div class="prc_faq_list">
      ${i.map((e,t)=>`
        <div class="prc_faq_item wi_fadeUp" style="--d:${t*.07}s" data-faq="${t}">
          <div class="prc_faq_q">
            <span>${e.q}</span>
            <i class="fas fa-chevron-down prc_faq_arr"></i>
          </div>
          <div class="prc_faq_a">${e.a}</div>
        </div>`).join(``)}
    </div>
  </div>

  <!-- ══ CTA FINAL ══ -->
  <div class="prc_cta_final wi_fadeUp">
    <div class="prc_cta_card">
      <div class="prc_cta_orb"></div>
      <div class="prc_cta_inner">
        <div class="prc_cta_ico"><i class="fas fa-rocket"></i></div>
        <div class="prc_cta_txt">
          <h2>¿Sigues con dudas? Hablemos.</h2>
          <p>Contáctanos y te ayudamos a elegir el plan ideal para ti o tu institución. Sin presión.</p>
        </div>
        <div class="prc_cta_btns">
          <a href="/registrar" class="prc_btn_pri nv_item" data-page="registrar">
            <i class="fas fa-rocket"></i> Empezar gratis
          </a>
          <a href="/contacto" class="prc_btn_gho nv_item" data-page="contacto">
            <i class="fas fa-envelope"></i> Contactar
          </a>
        </div>
      </div>
    </div>
  </div>

</div>`,o=[],s=!1,c=()=>{o=[t(`.prc_plan`,null,{anim:`wi_fadeUp`,stagger:130}),t(`.prc_faq_item`,null,{anim:`wi_fadeUp`,stagger:70}),t(`.wi_fadeUp`,null,{anim:`wi_fadeUp`})],e(document).off(`.prc`),e(document).on(`click.prc`,`#prc_toggle, .prc_tog_lbl`,()=>{s=!s,e(`#prc_tog_ball`).toggleClass(`prc_tog_on`,s),e(`#prc_tog_anual`).toggleClass(`prc_tog_act`,s),e(`.prc_tog_lbl`).first().toggleClass(`prc_tog_act`,!s);let t=e(`#prc_precio_pro`);t.addClass(`prc_precio_flip`).text(s?`$7.20`:`$9`).one(`animationend`,()=>t.removeClass(`prc_precio_flip`))}),e(document).on(`click.prc`,`.prc_faq_item`,function(){let t=e(this),n=t.hasClass(`prc_faq_open`);e(`.prc_faq_item`).removeClass(`prc_faq_open`),n||t.addClass(`prc_faq_open`)}),console.log(`💳 ${n} — Precios listo`)},l=()=>{o.forEach(e=>e?.disconnect?.()),o=[],e(document).off(`.prc`)};export{l as cleanup,c as init,a as render};