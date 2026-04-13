import{t as e}from"./wii-B0uic5Eu.js";import{t}from"./vendor-BDh6mtVu.js";import{i as n,v as r}from"./widev-B0iVgeqT.js";var i=[{id:1,nivel:`Fácil`,color:`#28a745`,ico:`fa-seedling`,texto:`El sol sale cada mañana y nos da luz y calor. El agua del mar es azul y fría. Los niños van a la escuela a aprender y jugar con sus amigos. La vida es bella cuando tienes salud y amor en el corazón.`},{id:2,nivel:`Básico`,color:`#0EBEFF`,ico:`fa-keyboard`,texto:`La tecnología ha cambiado la forma en que vivimos y trabajamos. Las computadoras nos permiten comunicarnos con personas de todo el mundo en cuestión de segundos. El internet es una herramienta poderosa para el conocimiento.`},{id:3,nivel:`Intermedio`,color:`#fd7e14`,ico:`fa-bolt`,texto:`La mecanografía es una habilidad esencial en el mundo moderno. Escribir rápido y con precisión te permite ser más productivo en tu trabajo diario. Practica todos los días y verás cómo mejoras tu velocidad notablemente.`},{id:4,nivel:`Avanzado`,color:`#7000FF`,ico:`fa-fire`,texto:`El universo se expande a una velocidad asombrosa desde el Big Bang hace aproximadamente trece mil millones de años. Los científicos estudian las galaxias, los planetas y las estrellas para comprender mejor el cosmos y nuestra existencia.`},{id:5,nivel:`Experto`,color:`#FF5C69`,ico:`fa-trophy`,texto:`César Vallejo, nacido en Santiago de Chuco en 1892, es considerado uno de los más grandes poetas de la lengua española. Su obra Trilce revolucionó la poesía vanguardista latinoamericana con versos de profunda emotividad humana.`}],a=[{id:0,ico:`fa-infinity`,lbl:`∞`,sub:`Sin límite`},{id:60,ico:`fa-clock`,lbl:`1`,sub:`1 minuto`},{id:120,ico:`fa-clock`,lbl:`2`,sub:`2 minutos`},{id:300,ico:`fa-clock`,lbl:`5`,sub:`5 minutos`}],o={NEUTRAL:0,CORRECT:1,CORRECTED:2,ERROR:3},s=60,c=l(i[0]);function l(e){return{texto:e,chars:[],pos:0,iniciado:!1,finalizado:!1,timerID:null,segundos:s,elapsed:0}}var u=()=>`
<div class="cz_page">

  <!-- HUD BAR -->
  <div class="cz_hud_bar">
    <div class="cz_hud_brand">
      <div class="cz_hud_logo"><i class="fas fa-keyboard"></i></div>
      <div>
        <div class="cz_hud_title">Práctica de Mecanografía</div>
        <div class="cz_hud_sub">${e}</div>
      </div>
    </div>
    <div class="cz_hud_stats">
      <div class="cz_hstat" id="cz_wpm_box" ${r(`Palabras por minuto`)}>
        <i class="fas fa-bolt"></i>
        <span id="cz_wpm">0</span><small>WPM</small>
      </div>
      <div class="cz_hstat" id="cz_prec_box" ${r(`Precisión`)}>
        <i class="fas fa-bullseye"></i>
        <span id="cz_prec">100</span><small>%</small>
      </div>
      <div class="cz_hstat cz_hstat_timer" id="cz_timer_box" ${r(`Tiempo`)}>
        <i class="fas fa-clock" id="cz_timer_ico"></i>
        <span id="cz_secs">—</span><small id="cz_secs_lbl">seg</small>
      </div>
      <button class="cz_btn_restart" id="cz_btn_restart" ${r(`Reiniciar · Esc`)}>
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>
  </div>

  <!-- LAYOUT 2 COLUMNAS -->
  <div class="cz_layout">

    <!-- ── SIDEBAR ── -->
    <aside class="cz_sidebar">

      <!-- NIVELES -->
      <div class="cz_side_label"><i class="fas fa-layer-group"></i> Nivel</div>
      <div class="cz_modos_list">
        ${i.map(e=>`
          <button class="cz_modo_btn${e.id===1?` active`:``}"
            data-id="${e.id}" style="--tc:${e.color}">
            <span class="cz_modo_ico"><i class="fas ${e.ico}"></i></span>
            <span class="cz_modo_txt">${e.nivel}</span>
            <span class="cz_modo_arr"><i class="fas fa-chevron-right"></i></span>
          </button>`).join(``)}
      </div>

      <div class="cz_side_divider"></div>

      <!-- TIEMPO -->
      <div class="cz_side_label"><i class="fas fa-clock"></i> Tiempo</div>
      <div class="cz_tiempos_list">
        ${a.map(e=>`
          <button class="cz_tiempo_btn${e.id===60?` active`:``}"
            data-dur="${e.id}">
            <i class="fas ${e.ico} cz_tpo_ico"></i>
            <span class="cz_tpo_n">${e.lbl}</span>
            <span class="cz_tpo_sub">${e.sub}</span>
          </button>`).join(``)}
      </div>

      <div class="cz_side_divider"></div>

      <!-- LEYENDA -->
      <div class="cz_side_label"><i class="fas fa-circle-info"></i> Leyenda</div>
      <div class="cz_legend">
        <div class="cz_leg_item">
          <span class="cz_leg_dot" style="background:var(--success)"></span>
          <span>Aciertos</span>
        </div>
        <div class="cz_leg_item">
          <span class="cz_leg_dot" style="background:var(--info,#37a1dd)"></span>
          <span>Corregidos</span>
        </div>
        <div class="cz_leg_item">
          <span class="cz_leg_dot" style="background:var(--warning)"></span>
          <span>Error corregido</span>
        </div>
        <div class="cz_leg_item">
          <span class="cz_leg_dot" style="background:var(--error)"></span>
          <span>Sin corregir</span>
        </div>
      </div>

      <div class="cz_side_divider"></div>
      <div class="cz_side_tip">
        <i class="fas fa-lightbulb"></i>
        <span>Presiona <kbd>Esc</kbd> para reiniciar</span>
      </div>
    </aside>

    <!-- ── ÁREA PRINCIPAL ── -->
    <div class="cz_main">

      <!-- Info bar -->
      <div class="cz_text_bar">
        <div class="cz_nivel_badge" id="cz_nivel_badge"
          style="color:${i[0].color};border-color:${i[0].color}">
          <i class="fas ${i[0].ico}"></i> ${i[0].nivel}
        </div>
        <div class="cz_prog_track">
          <div class="cz_prog_fill" id="cz_prog_fill"
            style="width:0%;background:${i[0].color}"></div>
        </div>
        <div class="cz_char_count">
          <span id="cz_pos">0</span><span class="cz_char_sep">/</span><span id="cz_total">${i[0].texto.length}</span>
        </div>
      </div>

      <!-- Zona de typing (con overlay de resultado encima) -->
      <div class="cz_typing_wrap">
        <!-- Área de texto -->
        <div class="cz_texto_area" id="cz_texto_display" tabindex="0">
          <div class="cz_hint_overlay" id="cz_hint">
            <div class="cz_hint_inner">
              <i class="fas fa-hand-pointer cz_hint_ico"></i>
              <p>Haz clic aquí o comienza a escribir</p>
              <p><strong>para iniciar el test</strong></p>
            </div>
          </div>
          <div class="cz_texto_inner" id="cz_texto_inner"></div>
        </div>

        <!-- ═══ RESULTADO ═══ (se muestra sobre el área cuando termina) -->
        <div class="cz_result_panel" id="cz_result_panel">
          <div class="cz_result_header" id="cz_res_header">
            <div class="cz_res_emoji" id="cz_res_emoji">🏆</div>
            <div>
              <h2 class="cz_res_titulo" id="cz_res_titulo">¡Excelente!</h2>
              <p class="cz_res_msg" id="cz_res_msg"></p>
            </div>
          </div>

          <div class="cz_res_grid">
            <div class="cz_res_stat cz_rs_wpm">
              <div class="cz_rs_n" id="cz_r_wpm">0</div>
              <div class="cz_rs_l"><i class="fas fa-bolt"></i> WPM</div>
            </div>
            <div class="cz_res_stat cz_rs_prec">
              <div class="cz_rs_n" id="cz_r_prec">0%</div>
              <div class="cz_rs_l"><i class="fas fa-bullseye"></i> Precisión</div>
            </div>
            <div class="cz_res_stat cz_rs_tiempo">
              <div class="cz_rs_n" id="cz_r_tiempo">0s</div>
              <div class="cz_rs_l"><i class="fas fa-stopwatch"></i> Tiempo</div>
            </div>
            <div class="cz_res_stat cz_rs_suc">
              <div class="cz_rs_n" id="cz_r_suc">0</div>
              <div class="cz_rs_l"><i class="fas fa-check"></i> Aciertos</div>
            </div>
            <div class="cz_res_stat cz_rs_inf">
              <div class="cz_rs_n" id="cz_r_inf">0</div>
              <div class="cz_rs_l"><i class="fas fa-rotate-right"></i> Corregidos</div>
            </div>
            <div class="cz_res_stat cz_rs_err">
              <div class="cz_rs_n" id="cz_r_err">0</div>
              <div class="cz_rs_l"><i class="fas fa-xmark"></i> Errores</div>
            </div>
          </div>

          <div class="cz_res_btns">
            <button class="cz_btn_pri" id="cz_btn_reintentar">
              <i class="fas fa-rotate-right"></i> Intentar de nuevo
            </button>
            <button class="cz_btn_gho" id="cz_btn_siguiente">
              <i class="fas fa-forward-step"></i> Siguiente nivel
            </button>
          </div>
        </div><!-- /cz_result_panel -->
      </div><!-- /cz_typing_wrap -->

      <!-- Live bar stats -->
      <div class="cz_live_bar">
        <div class="cz_lv cz_lv_suc" ${r(`Aciertos — correcto a la primera`)}>
          <i class="fas fa-check"></i>
          <span id="cz_cnt_suc">0</span>
          <small>Aciertos</small>
        </div>
        <div class="cz_lv cz_lv_inf" ${r(`Corregidos — error corregido con backspace`)}>
          <i class="fas fa-rotate-right"></i>
          <span id="cz_cnt_inf">0</span>
          <small>Corregidos</small>
        </div>
        <div class="cz_lv cz_lv_war" ${r(`Error corregido — borrado pendiente de reescribir`)}>
          <i class="fas fa-triangle-exclamation"></i>
          <span id="cz_cnt_war">0</span>
          <small>Pendientes</small>
        </div>
        <div class="cz_lv cz_lv_err" ${r(`Errores sin corregir aún`)}>
          <i class="fas fa-xmark"></i>
          <span id="cz_cnt_err">0</span>
          <small>Sin corregir</small>
        </div>
      </div>

    </div><!-- /cz_main -->
  </div><!-- /cz_layout -->
</div>`,d=()=>{p(i[0]),t(document).off(`.czk`),t(document).on(`click.czk`,`.cz_modo_btn`,function(){let e=i.find(e=>e.id===+t(this).data(`id`));e&&p(e)}),t(document).on(`click.czk`,`.cz_tiempo_btn`,function(){c.iniciado||(s=+t(this).data(`dur`),t(`.cz_tiempo_btn`).removeClass(`active`),t(this).addClass(`active`),m(),p(c.texto))}),t(document).on(`click.czk`,`#cz_btn_restart, #cz_btn_reintentar`,()=>p(c.texto)),t(document).on(`click.czk`,`#cz_btn_siguiente`,()=>{p(i.find(e=>e.id===c.texto.id+1)||i[0])}),t(document).on(`click.czk`,`#cz_texto_display`,()=>{t(`#cz_texto_display`).trigger(`focus`),!c.iniciado&&!c.finalizado&&_()}),t(document).on(`keydown.czk`,e=>{e.key===`Escape`&&p(c.texto)}),t(document).on(`keydown.czk`,`#cz_texto_display`,y)},f=()=>{T(),t(document).off(`.czk`)};function p(e){T(),c=l(e),t(`.cz_modo_btn`).removeClass(`active`),t(`.cz_modo_btn[data-id="${e.id}"]`).addClass(`active`);let n=e.color;t(`#cz_nivel_badge`).html(`<i class="fas ${e.ico}"></i> ${e.nivel}`).css({color:n,borderColor:n}),t(`#cz_prog_fill`).css({width:`0%`,background:n}),t(`#cz_pos`).text(0),t(`#cz_total`).text(e.texto.length),t(`#cz_wpm`).text(0),t(`#cz_prec`).text(100),t(`#cz_timer_box`).removeClass(`cz_warn`),m(),h(e.texto),t(`#cz_result_panel`).removeClass(`cz_result_visible`),t(`#cz_hint`).show(),C(),setTimeout(()=>t(`#cz_texto_display`).trigger(`focus`),60)}function m(e=null){if(s===0)t(`#cz_timer_ico`).attr(`class`,`fas fa-infinity`),t(`#cz_secs`).text(e===null?0:e),t(`#cz_secs_lbl`).text(`seg`);else{t(`#cz_timer_ico`).attr(`class`,`fas fa-clock`);let n=e===null?s:e;t(`#cz_secs`).text(n),t(`#cz_secs_lbl`).text(`seg`)}}function h(e){let n=t(`#cz_texto_inner`).empty();c.chars=[],[...e].forEach((e,r)=>{let i=t(`<span class="cz_ch" data-i="${r}">${e===` `?`\xA0`:e}</span>`);n.append(i),c.chars.push({char:e,$sp:i,state:o.NEUTRAL,hadError:!1})}),g(0)}function g(e){c.chars.forEach(e=>e.$sp.removeClass(`cz_ch_cursor`)),e<c.chars.length&&c.chars[e].$sp.addClass(`cz_ch_cursor`)}function _(){c.iniciado||c.finalizado||(c.iniciado=!0,t(`#cz_hint`).hide(),c.timerID=setInterval(()=>{c.elapsed++,s===0?m(c.elapsed):(c.segundos--,m(c.segundos),c.segundos<=10&&t(`#cz_timer_box`).addClass(`cz_warn`),c.segundos<=0&&w(`tiempo`)),S()},1e3))}var v=new Set(`Shift.CapsLock.Tab.Enter.ArrowLeft.ArrowRight.ArrowUp.ArrowDown.Home.End.PageUp.PageDown.Insert.Delete.ContextMenu.F1.F2.F3.F4.F5.F6.F7.F8.F9.F10.F11.F12`.split(`.`));function y(e){if(c.finalizado||v.has(e.key)||e.ctrlKey||e.altKey||e.metaKey)return;if(e.preventDefault(),c.iniciado||_(),e.key===`Backspace`){b();return}if(c.pos>=c.chars.length)return;let n=c.chars[c.pos],r=e.key===n.char;n.$sp.removeClass(`cz_ch_cursor cz_ch_correct cz_ch_corrected cz_ch_error cz_ch_had_error cz_ch_shake`),r?(n.state=n.hadError?o.CORRECTED:o.CORRECT,n.$sp.addClass(n.state===o.CORRECT?`cz_ch_correct`:`cz_ch_corrected`)):(n.state=o.ERROR,n.hadError=!0,n.$sp.addClass(`cz_ch_error cz_ch_shake`),setTimeout(()=>n.$sp.removeClass(`cz_ch_shake`),350)),c.pos++,g(c.pos),c.pos<c.chars.length&&E(),t(`#cz_prog_fill`).css(`width`,`${c.pos/c.chars.length*100}%`),t(`#cz_pos`).text(c.pos),S(),c.pos>=c.chars.length&&w(`completado`)}function b(){if(c.pos<=0)return;c.pos--;let e=c.chars[c.pos];e.$sp.removeClass(`cz_ch_cursor cz_ch_correct cz_ch_corrected cz_ch_error cz_ch_had_error`),e.state=o.NEUTRAL,e.hadError&&e.$sp.addClass(`cz_ch_had_error`),g(c.pos),t(`#cz_prog_fill`).css(`width`,`${c.pos/c.chars.length*100}%`),t(`#cz_pos`).text(c.pos),S()}function x(){let e=0,t=0,n=0,r=0;return c.chars.forEach(i=>{i.state===o.CORRECT?e++:i.state===o.CORRECTED?t++:i.state===o.ERROR?r++:i.hadError&&i.state===o.NEUTRAL&&n++}),{suc:e,inf:t,war:n,err:r}}function S(){let e=x(),n=s===0?c.elapsed:s-c.segundos,r=e.suc+e.inf,i=r+e.err,a=n>0?Math.round(r/5/(n/60)):0,o=i>0?Math.round(r/i*100):100;t(`#cz_wpm`).text(a),t(`#cz_prec`).text(o),C(e)}function C(e=null){let n=e||x();t(`#cz_cnt_suc`).text(n.suc),t(`#cz_cnt_inf`).text(n.inf),t(`#cz_cnt_war`).text(n.war),t(`#cz_cnt_err`).text(n.err)}function w(e){if(c.finalizado)return;c.finalizado=!0,T();let r=x(),i=s===0?c.elapsed:s-c.segundos,a=r.suc+r.inf,o=a+r.err,l=i>0?Math.round(a/5/(i/60)):a,u=o>0?Math.round(a/o*100):100,d=`🌱`,f=`¡Sigue practicando!`;l>=60?(d=`🚀`,f=`¡Velocidad de experto!`):l>=40?(d=`⭐`,f=`¡Muy buen resultado!`):l>=25&&(d=`💪`,f=`¡Vas muy bien!`);let p=e===`completado`?`¡Completaste el texto en ${i} segundos! 🎉`:`Tiempo agotado · Llegaste al carácter ${c.pos}/${c.chars.length}`,m=c.texto.color;t(`#cz_res_header`).css(`background`,m),t(`#cz_res_emoji`).text(d),t(`#cz_res_titulo`).text(f),t(`#cz_res_msg`).text(p),D(t(`#cz_r_wpm`),l),D(t(`#cz_r_prec`),u,`%`),t(`#cz_r_tiempo`).text(`${i}s`),D(t(`#cz_r_suc`),r.suc),D(t(`#cz_r_inf`),r.inf),t(`#cz_r_err`).text(r.err),t(`#cz_result_panel`).addClass(`cz_result_visible`),l>=40&&n(`¡${l} WPM! 🚀 ¡Excelente!`,`success`,3e3)}function T(){c.timerID&&(clearInterval(c.timerID),c.timerID=null)}function E(){let e=document.getElementById(`cz_texto_display`),t=e?.querySelector(`.cz_ch_cursor`);if(!e||!t)return;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.bottom>n.bottom-20&&(e.scrollTop+=r.bottom-n.bottom+40)}function D(e,t,n=``){let r=0,i=Math.max(1,Math.ceil(t/30)),a=setInterval(()=>{r=Math.min(r+i,t),e.text(r+n),r>=t&&clearInterval(a)},28)}export{f as cleanup,d as init,u as render};