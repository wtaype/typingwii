import{t as e}from"./wii-CZYUy4T7.js";import{t}from"./vendor-BDh6mtVu.js";import{i as n,v as r}from"./widev-CFII55yl.js";var i=[{id:1,nivel:`Fácil`,color:`#22c55e`,ico:`fa-seedling`,texto:`El sol sale por las mañanas y nos da mucha alegria. Es un dia muy bonito para caminar por el campo y ver las flores de colores. Los pajaros cantan en los arboles mientras el viento sopla suave.

Me gusta mucho leer libros de aventuras y viajes espaciales. Poder imaginar mundos diferentes es algo que me hace muy feliz. Siempre llevo una libreta para escribir mis ideas y pensamientos.

Mañana iremos a la playa con toda la familia a jugar con la arena. Llevaremos comida rica y mucha agua fresca para pasar el calor. Nada es mejor que estar juntos y pasar momentos divertidos.`},{id:2,nivel:`Medio`,color:`#0EBEFF`,ico:`fa-keyboard`,texto:`La mecanografía es una habilidad esencial en el mundo digital actual. Escribir con fluidez y sin mirar el teclado permite que nuestras ideas fluyan directamente a la pantalla. Es cuestión de práctica y constancia diaria.

El aprendizaje de esta técnica requiere paciencia y una postura correcta frente al computador. Mantener la espalda recta y las manos en la posición base es fundamental para evitar la fatiga y mejorar la precisión a largo plazo.

Con el tiempo, notarás cómo tu velocidad aumenta significativamente y cometes menos errores. La satisfacción de completar un texto largo en pocos minutos es una gran recompensa para cualquier estudiante o profesional moderno.`},{id:3,nivel:`Difícil`,color:`#f97316`,ico:`fa-bolt`,texto:`La exploración del cosmos ha revelado misterios inimaginables: desde agujeros negros masivos hasta exoplanetas con atmósferas complejas (H2O, CH4). El telescopio James Webb, operando a 1.5 millones de km, captura luz infrarroja ancestral.

En el ámbito de la computación cuántica, el entrelazamiento y la superposición permiten procesar algoritmos a una escala exponencial. Los "qubits" no se limitan a 0 o 1, sino que existen en estados probabilísticos altamente inestables y prometedores.

El desafío de la humanidad radica en equilibrar el progreso tecnológico con la preservación del ecosistema global. ¿Lograremos mitigar el impacto del CO2 antes de alcanzar el punto de no retorno? La ciencia y la ética deben caminar juntas.`}],a=[{id:0,lbl:`∞ Sin límite`},{id:30,lbl:`30 segundos`},{id:60,lbl:`1 minuto`},{id:120,lbl:`2 minutos`},{id:300,lbl:`5 minutos`}],o={NEUTRAL:0,CORRECT:1,CORRECTED:2,ERROR:3},s=60,c=l(i[0]);function l(e){return{texto:e,chars:[],pos:0,iniciado:!1,finalizado:!1,timerID:null,segundos:s,elapsed:0}}var u=()=>`
<div class="cz_page">

  <!-- ══ HEADER CONTROL BAR ══ -->
  <div class="cz_ctrl_bar">
    <div class="cz_ctrl_brand">
      <div class="cz_ctrl_icon"><i class="fas fa-keyboard"></i></div>
      <div>
        <div class="cz_ctrl_title">Práctica de Mecanografía</div>
        <div class="cz_ctrl_sub">${e}</div>
      </div>
    </div>

    <!-- SELECTS -->
    <div class="cz_ctrl_selects">
      <div class="cz_sel_wrap">
        <i class="fas fa-layer-group cz_sel_ico"></i>
        <select id="cz_sel_nivel" class="cz_select">${i.map(e=>`<option value="${e.id}">${e.ico.includes(`seedling`)?`🌱`:e.ico.includes(`keyboard`)?`⌨️`:e.ico.includes(`bolt`)?`⚡`:e.ico.includes(`fire`)?`🔥`:`🏆`} ${e.nivel}</option>`).join(``)}</select>
      </div>
      <div class="cz_sel_wrap">
        <i class="fas fa-clock cz_sel_ico"></i>
        <select id="cz_sel_tiempo" class="cz_select">${a.map(e=>`<option value="${e.id}"${e.id===60?` selected`:``}>${e.lbl}</option>`).join(``)}</select>
      </div>
    </div>

    <!-- LIVE STATS -->
    <div class="cz_ctrl_stats">
      <div class="cz_stat_pill cz_sp_wpm" ${r(`Palabras por minuto`)}>
        <i class="fas fa-bolt"></i>
        <span id="cz_wpm">0</span>
        <small>WPM</small>
      </div>
      <div class="cz_stat_pill cz_sp_prec" ${r(`Precisión`)}>
        <i class="fas fa-bullseye"></i>
        <span id="cz_prec">100</span>
        <small>%</small>
      </div>
      <div class="cz_stat_pill cz_sp_timer cz_hstat_timer" id="cz_timer_box" ${r(`Tiempo restante`)}>
        <i class="fas fa-clock" id="cz_timer_ico"></i>
        <span id="cz_secs">—</span>
        <small id="cz_secs_lbl">seg</small>
      </div>
      <button class="cz_btn_restart" id="cz_btn_restart" ${r(`Reiniciar · Esc`)}>
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>
  </div>

  <!-- ══ PROGRESS INDICATORS ══ -->
  <div class="cz_progress_bar_wrap">
    <div class="cz_pb_label">
      <div class="cz_nivel_chip" id="cz_nivel_chip">
        <i class="fas ${i[0].ico}"></i>
        <span>${i[0].nivel}</span>
      </div>
      <div class="cz_pb_mini_stats">
        <span class="cz_pb_ms cz_pb_suc" ${r(`Aciertos`)}><i class="fas fa-check"></i> <b id="cz_cnt_suc">0</b></span>
        <span class="cz_pb_ms cz_pb_cor" ${r(`Corregidos`)}><i class="fas fa-rotate-right"></i> <b id="cz_cnt_inf">0</b></span>
        <span class="cz_pb_ms cz_pb_war" ${r(`Pendientes de corregir`)}><i class="fas fa-triangle-exclamation"></i> <b id="cz_cnt_war">0</b></span>
        <span class="cz_pb_ms cz_pb_err" ${r(`Errores sin corregir`)}><i class="fas fa-xmark"></i> <b id="cz_cnt_err">0</b></span>
      </div>
      <div class="cz_char_count">
        <span id="cz_pos">0</span><span class="cz_char_sep">/</span><span id="cz_total">${i[0].texto.length}</span>
        <small>chars</small>
      </div>
    </div>
    <div class="cz_prog_track">
      <div class="cz_prog_fill" id="cz_prog_fill" style="width:0%;background:${i[0].color}"></div>
    </div>
  </div>

  <!-- ══ TYPING AREA ══ -->
  <div class="cz_typing_wrap">
    <div class="cz_texto_area" id="cz_texto_display" tabindex="0">
      <!-- Hint overlay -->
      <div class="cz_hint_overlay" id="cz_hint">
        <div class="cz_hint_inner">
          <i class="fas fa-hand-pointer cz_hint_ico"></i>
          <p>Haz clic aquí o comienza a escribir</p>
          <p><strong>para iniciar el test</strong></p>
          <div class="cz_hint_keys">
            <kbd>Esc</kbd> <span>reiniciar</span>
            <span class="cz_hk_sep">·</span>
            <kbd>↑↓</kbd> <span>cambiar nivel</span>
          </div>
        </div>
      </div>
      <!-- Chars -->
      <div class="cz_texto_inner" id="cz_texto_inner"></div>
    </div>

    <!-- RESULT PANEL (absoluto sobre el área) -->
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
    </div>
  </div>

</div>`,d=()=>{p(i[0]),t(document).off(`.czk`),t(document).on(`change.czk`,`#cz_sel_nivel`,function(){let e=i.find(e=>e.id===+t(this).val());e&&p(e)}),t(document).on(`change.czk`,`#cz_sel_tiempo`,function(){c.iniciado||(s=+t(this).val(),m(),p(c.texto))}),t(document).on(`click.czk`,`#cz_btn_restart, #cz_btn_reintentar`,()=>p(c.texto)),t(document).on(`click.czk`,`#cz_btn_siguiente`,()=>{p(i.find(e=>e.id===c.texto.id+1)||i[0])}),t(document).on(`click.czk`,`#cz_texto_display`,()=>{t(`#cz_texto_display`).trigger(`focus`),!c.iniciado&&!c.finalizado&&_()}),t(document).on(`keydown.czk`,e=>{if(e.key===`Escape`&&(e.preventDefault(),p(c.texto)),!c.iniciado&&(e.key===`ArrowUp`||e.key===`ArrowDown`)){let n=i.findIndex(e=>e.id===c.texto.id),r=e.key===`ArrowDown`?i[Math.min(n+1,i.length-1)]:i[Math.max(n-1,0)];r&&r.id!==c.texto.id&&(t(`#cz_sel_nivel`).val(r.id),p(r))}}),t(document).on(`keydown.czk`,`#cz_texto_display`,y)},f=()=>{T(),t(document).off(`.czk`)};function p(e){T(),c=l(e),t(`#cz_sel_nivel`).val(e.id);let n=e.color;t(`#cz_nivel_chip`).html(`<i class="fas ${e.ico}"></i> <span>${e.nivel}</span>`).css({color:n,borderColor:n}),t(`#cz_prog_fill`).css({width:`0%`,background:n}),t(`#cz_pos`).text(0),t(`#cz_total`).text(e.texto.length),t(`#cz_wpm`).text(0),t(`#cz_prec`).text(100),t(`#cz_timer_box`).removeClass(`cz_warn`),m(),h(e.texto),t(`#cz_result_panel`).removeClass(`cz_result_visible`),t(`#cz_hint`).show(),C(),setTimeout(()=>t(`#cz_texto_display`).trigger(`focus`),60)}function m(e=null){if(s===0)t(`#cz_timer_ico`).attr(`class`,`fas fa-infinity`),t(`#cz_secs`).text(e===null?0:e),t(`#cz_secs_lbl`).text(`seg`);else{t(`#cz_timer_ico`).attr(`class`,`fas fa-clock`);let n=e===null?s:e;t(`#cz_secs`).text(n),t(`#cz_secs_lbl`).text(`seg`)}}function h(e){let n=t(`#cz_texto_inner`).empty();c.chars=[],[...e].forEach((e,r)=>{let i=t(`<span class="cz_ch" data-i="${r}">${e===` `?`\xA0`:e}</span>`);n.append(i),c.chars.push({char:e,$sp:i,state:o.NEUTRAL,hadError:!1})}),g(0)}function g(e){c.chars.forEach(e=>e.$sp.removeClass(`cz_ch_cursor`)),e<c.chars.length&&c.chars[e].$sp.addClass(`cz_ch_cursor`)}function _(){c.iniciado||c.finalizado||(c.iniciado=!0,t(`#cz_hint`).hide(),c.timerID=setInterval(()=>{c.elapsed++,s===0?m(c.elapsed):(c.segundos--,m(c.segundos),c.segundos<=10&&t(`#cz_timer_box`).addClass(`cz_warn`),c.segundos<=0&&w(`tiempo`)),S()},1e3))}var v=new Set(`Shift.CapsLock.Tab.ArrowLeft.ArrowRight.ArrowUp.ArrowDown.Home.End.PageUp.PageDown.Insert.Delete.ContextMenu.F1.F2.F3.F4.F5.F6.F7.F8.F9.F10.F11.F12`.split(`.`));function y(e){if(c.finalizado||v.has(e.key)||e.ctrlKey||e.altKey||e.metaKey)return;if(e.preventDefault(),c.iniciado||_(),e.key===`Backspace`){b();return}if(c.pos>=c.chars.length)return;let n=c.chars[c.pos],r=n.char===`
`?`Enter`:n.char,i=e.key===r;n.$sp.removeClass(`cz_ch_cursor cz_ch_correct cz_ch_corrected cz_ch_error cz_ch_had_error cz_ch_shake`),i?(n.state=n.hadError?o.CORRECTED:o.CORRECT,n.$sp.addClass(n.state===o.CORRECT?`cz_ch_correct`:`cz_ch_corrected`)):(n.state=o.ERROR,n.hadError=!0,n.$sp.addClass(`cz_ch_error cz_ch_shake`),setTimeout(()=>n.$sp.removeClass(`cz_ch_shake`),350)),c.pos++,g(c.pos),c.pos<c.chars.length&&E(),t(`#cz_prog_fill`).css(`width`,`${c.pos/c.chars.length*100}%`),t(`#cz_pos`).text(c.pos),S(),c.pos>=c.chars.length&&w(`completado`)}function b(){if(c.pos<=0)return;c.pos--;let e=c.chars[c.pos];e.$sp.removeClass(`cz_ch_cursor cz_ch_correct cz_ch_corrected cz_ch_error cz_ch_had_error`),e.state=o.NEUTRAL,e.hadError&&e.$sp.addClass(`cz_ch_had_error`),g(c.pos),t(`#cz_prog_fill`).css(`width`,`${c.pos/c.chars.length*100}%`),t(`#cz_pos`).text(c.pos),S()}function x(){let e=0,t=0,n=0,r=0;return c.chars.forEach(i=>{i.state===o.CORRECT?e++:i.state===o.CORRECTED?t++:i.state===o.ERROR?r++:i.hadError&&i.state===o.NEUTRAL&&n++}),{suc:e,inf:t,war:n,err:r}}function S(){let e=x(),n=s===0?c.elapsed:s-c.segundos,r=e.suc+e.inf,i=r+e.err,a=n>0?Math.round(r/5/(n/60)):0,o=i>0?Math.round(r/i*100):100;t(`#cz_wpm`).text(a),t(`#cz_prec`).text(o),C(e)}function C(e=null){let n=e||x();t(`#cz_cnt_suc`).text(n.suc),t(`#cz_cnt_inf`).text(n.inf),t(`#cz_cnt_war`).text(n.war),t(`#cz_cnt_err`).text(n.err)}function w(e){if(c.finalizado)return;c.finalizado=!0,T();let r=x(),i=s===0?c.elapsed:s-c.segundos,a=r.suc+r.inf,o=a+r.err,l=i>0?Math.round(a/5/(i/60)):a,u=o>0?Math.round(a/o*100):100,d=`🌱`,f=`¡Sigue practicando!`;l>=60?(d=`🚀`,f=`¡Velocidad de experto!`):l>=40?(d=`⭐`,f=`¡Muy buen resultado!`):l>=25&&(d=`💪`,f=`¡Vas muy bien!`);let p=e===`completado`?`¡Completaste el texto en ${i} segundos! 🎉`:`Tiempo agotado · Llegaste al carácter ${c.pos}/${c.chars.length}`,m=c.texto.color;t(`#cz_res_header`).css(`background`,`linear-gradient(135deg, ${m}dd, ${m}88)`),t(`#cz_res_emoji`).text(d),t(`#cz_res_titulo`).text(f),t(`#cz_res_msg`).text(p),D(t(`#cz_r_wpm`),l),D(t(`#cz_r_prec`),u,`%`),t(`#cz_r_tiempo`).text(`${i}s`),D(t(`#cz_r_suc`),r.suc),D(t(`#cz_r_inf`),r.inf),t(`#cz_r_err`).text(r.err),t(`#cz_result_panel`).addClass(`cz_result_visible`),l>=40&&n(`¡${l} WPM! 🚀 ¡Excelente!`,`success`,3e3)}function T(){c.timerID&&(clearInterval(c.timerID),c.timerID=null)}function E(){let e=document.getElementById(`cz_texto_display`),t=e?.querySelector(`.cz_ch_cursor`);if(!e||!t)return;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.bottom>n.bottom-20&&(e.scrollTop+=r.bottom-n.bottom+40)}function D(e,t,n=``){let r=0,i=Math.max(1,Math.ceil(t/30)),a=setInterval(()=>{r=Math.min(r+i,t),e.text(r+n),r>=t&&clearInterval(a)},28)}export{f as cleanup,d as init,u as render};