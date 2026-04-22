import{t as e}from"./vendor-BDh6mtVu.js";import{i as t,v as n}from"./widev-C_asVASQ.js";/* empty css                */import{n as r}from"./teclado-a2CBtY2h.js";import{n as i,t as a}from"./wiad-8MA5pWRC.js";var o=[{id:1,nivel:`Fácil`,color:`#22c55e`,texto:`El sol sale por las mañanas y nos da mucha alegria. Es un dia muy bonito para caminar por el campo y ver las flores de colores. Los pajaros cantan en los arboles mientras el viento sopla suave.`},{id:2,nivel:`Medio`,color:`#0EBEFF`,texto:`La mecanografia es una habilidad esencial en el mundo digital actual. Escribir con fluidez y sin mirar el teclado permite que nuestras ideas fluyan directamente a la pantalla. Es cuestion de practica y constancia diaria.`},{id:3,nivel:`Difícil`,color:`#f97316`,texto:`La exploracion del cosmos ha revelado misterios inimaginables: desde agujeros negros masivos hasta exoplanetas con atmosferas complejas. El telescopio James Webb captura luz infrarroja a millones de kilometros de distancia.`}],s=[{id:0,lbl:`∞ Sin límite`},{id:30,lbl:`30 seg`},{id:60,lbl:`1 min`},{id:120,lbl:`2 min`},{id:300,lbl:`5 min`}],c={N:0,OK:1,ERR:3},l=60,u=null,d=()=>s.map(e=>`<option value="${e.id}"${e.id===l?` selected`:``}>${e.lbl.replace(` seg`,`s`).replace(` min`,`m`).replace(` Sin límite`,`∞`)}</option>`).join(``);function f(e){let t=Math.floor(e/60),n=e%60;return`${t}:${String(n).padStart(2,`0`)}`}var p=()=>`
<div class="lc_page">

  <!-- LAYOUT: AD | CONTENT | AD -->
  <div class="lc_layout">
    ${a}

    <div class="lc_content">
      <!-- PROGRESS -->
      <div class="lc_prog_track"><div class="lc_prog_fill" id="lc_prog_fill"></div></div>

      <!-- TEXT AREA -->
      <div class="lc_texto_area" id="lc_texto_display" tabindex="0">
        <div class="lc_texto_inner" id="lc_texto_inner"></div>
      </div>

      <!-- BOTTOM: KEYBOARD + STATS -->
      <div class="lc_bottom">
        <div class="lc_kbd_col">
          <div id="lc_teclado"></div>
        </div>
        <div class="lc_side_panel">

          <!-- Header -->
          <div class="lc_sp_header">
            <div class="lc_sp_title"><i class="fas fa-sliders-h"></i> Resultados y Ajustes</div>
            <button class="wk_sound_btn" id="wk_sound_toggle" title="Sonido del teclado"><i class="fas fa-volume-up"></i></button>
          </div>

          <!-- Nivel info box -->
          <div class="lc_sp_info">
            <div class="lc_sp_info_sub">Práctica Libre</div>
            <div class="lc_sp_info_title" id="cz_nivel_label">—</div>
          </div>

          <!-- Stats 2-col: WPM | % -->
          <div class="lc_sp_row2">
            <div class="lc_sp_block lc_sp_wpm">
              <div class="lc_sp_n" id="lc_wpm">0</div>
              <div class="lc_sp_l"><i class="fas fa-bolt"></i> WPM</div>
            </div>
            <div class="lc_sp_block lc_sp_prec">
              <div class="lc_sp_n" id="lc_prec">100</div>
              <div class="lc_sp_l"><i class="fas fa-bullseye"></i> %</div>
            </div>
          </div>

          <!-- Time 2-col: Timer | Select -->
          <div class="lc_sp_timer_row">
            <div class="lc_sp_block lc_sp_time" id="lc_timer_box" ${n(`Tiempo`)}>
              <div class="lc_sp_n" id="lc_secs">1:00</div>
              <div class="lc_sp_l"><i class="fas fa-stopwatch"></i> TIEMPO</div>
            </div>
            <label class="lc_sp_sel" style="flex:1;" ${n(`Establecer límite`)}>
              <select id="lc_sel_tiempo" class="lc_sel">${d()}</select>
            </label>
          </div>

          <div class="lc_sp_sep"></div>

          <!-- Mini counters -->
          <div class="lc_sp_mini">
            <span class="czm ok" title="Aciertos"><i class="fas fa-check"></i> <b id="lc_ok">0</b></span>
            <span class="czm er" title="Errores"><i class="fas fa-xmark"></i> <b id="lc_err">0</b></span>
            <span class="czm wrn" title="Corregidos"><i class="fas fa-rotate-left"></i> <b id="lc_warn">0</b></span>
          </div>



          <!-- Buttons -->
          <div class="lc_sp_btns">
            <button class="lc_sp_btn" id="lc_btn_reintentar"><i class="fas fa-rotate-right"></i> Reiniciar</button>
            <button class="lc_sp_btn lc_btn_ghost" id="lc_btn_next"><i class="fas fa-forward"></i> Siguiente</button>
          </div>
        </div>
      </div>
    </div>

    ${i}
  </div>

</div>
`,m=()=>{r.render(`#lc_teclado`),g(o[0]),e(document).off(`.lck`),e(document).on(`change.lck`,`#lc_sel_tiempo`,function(){u.iniciado||(l=+e(this).val(),g(u.texto))}),e(document).on(`click.lck`,`#lc_btn_next`,()=>{let e=o.filter(e=>!u||e.id!==u.texto.id);g(e[Math.floor(Math.random()*e.length)]||o[0])}),e(document).on(`click.lck`,`#lc_btn_reintentar`,()=>g(u.texto)),e(document).on(`keydown.lck`,e=>{e.key===`Escape`&&(e.preventDefault(),g(u.texto))}),e(document).on(`keydown.lck`,S),e(document).on(`click.lck`,`#wk_sound_toggle`,()=>{let t=r.sound.toggle(),n=e(`#wk_sound_toggle`);n.toggleClass(`wk_muted`,!t),n.find(`i`).attr(`class`,t?`fas fa-volume-up`:`fas fa-volume-xmark`)})},h=()=>{O(),r.clear(),e(document).off(`.lck`),u=null};function g(t){O(),u={texto:t,chars:[],pos:0,iniciado:!1,finalizado:!1,timerID:null,segundos:l,elapsed:0},e(`#cz_nivel_label`).text(t.nivel),e(`#lc_sel_nivel`).val(t.id),e(`#lc_prog_fill`).css({width:`0%`,background:`var(--success)`}),e(`#lc_wpm`).text(0),e(`#lc_prec`).text(100),e(`#lc_ok`).text(0),e(`#lc_err`).text(0),e(`#lc_warn`).text(0),e(`#lc_timer_box`).removeClass(`lc_warn`),_(l),v(t.texto),r.clear();let n=t.texto[0];n&&r.hint(n),setTimeout(()=>e(`#lc_texto_display`).trigger(`focus`),60)}function _(t){e(`#lc_secs`).text(f(t??0))}function v(t){let n=e(`#lc_texto_inner`).empty();u.chars=[];let r=t.split(/( )/),i=null;r.forEach(t=>{if(t===` `){let t=e(`<span class="lc_ch lc_space"> </span>`);n.append(t),u.chars.push({char:` `,$s:t,state:c.N,hadErr:!1}),i=null}else t.length>0&&(i=e(`<span class="lc_word"></span>`),[...t].forEach(t=>{let n=e(`<span class="lc_ch">${t}</span>`);i.append(n),u.chars.push({char:t,$s:n,state:c.N,hadErr:!1})}),n.append(i))}),y(0)}function y(e){u.chars.forEach(e=>e.$s.removeClass(`lc_ch_cur`)),e<u.chars.length&&u.chars[e].$s.addClass(`lc_ch_cur`)}function b(){u.iniciado||u.finalizado||(u.iniciado=!0,u.timerID=setInterval(()=>{u.elapsed++,l===0?_(u.elapsed):(u.segundos--,_(u.segundos),u.segundos<=10&&e(`#lc_timer_box`).addClass(`lc_warn`),u.segundos<=0&&E()),T()},1e3))}var x=new Set(`Shift.CapsLock.Tab.ArrowLeft.ArrowRight.ArrowUp.ArrowDown.Home.End.PageUp.PageDown.Insert.Delete.ContextMenu.F1.F2.F3.F4.F5.F6.F7.F8.F9.F10.F11.F12`.split(`.`));function S(t){if(!u||u.finalizado||x.has(t.key)||t.ctrlKey||t.altKey||t.metaKey||t.key===`Escape`)return;if(t.preventDefault(),u.iniciado||b(),t.key===`Backspace`){C();return}if(u.pos>=u.chars.length)return;let n=u.chars[u.pos],i=n.char===`
`?`Enter`:n.char,a=t.key===i;if(r.press(i,a),n.$s.removeClass(`lc_ch_cur lc_ch_ok lc_ch_warn lc_ch_err lc_ch_shake`),a?(n.state=c.OK,n.hadErr?n.$s.addClass(`lc_ch_warn`):n.$s.addClass(`lc_ch_ok`)):(n.state=c.ERR,n.hadErr=!0,n.$s.addClass(`lc_ch_err lc_ch_shake`),setTimeout(()=>n.$s.removeClass(`lc_ch_shake`),320)),u.pos++,y(u.pos),u.pos<u.chars.length){k();let e=u.chars[u.pos]?.char;e&&r.hint(e===`
`?`Enter`:e)}e(`#lc_prog_fill`).css(`width`,`${u.pos/u.chars.length*100}%`),T(),u.pos>=u.chars.length&&E()}function C(){if(u.pos<=0)return;u.pos--;let e=u.chars[u.pos];e.$s.removeClass(`lc_ch_cur lc_ch_ok lc_ch_err`),e.state=c.N,y(u.pos),T()}function w(){let e=0,t=0,n=0;return u.chars.forEach(r=>{r.state===c.OK?r.hadErr?t++:e++:r.state===c.ERR&&n++}),{ok:e,warn:t,err:n}}function T(){let{ok:t,warn:n,err:r}=w(),i=l===0?u.elapsed:l-u.segundos,a=t+n,o=a+r,s=i>0?Math.round(a/5/(i/60)):0,c=o>0?Math.round(a/o*100):100;e(`#lc_wpm`).text(s),e(`#lc_prec`).text(c),e(`#lc_ok`).text(t),e(`#lc_err`).text(r),e(`#lc_warn`).text(n)}function E(){if(u.finalizado)return;u.finalizado=!0,O();let{ok:e,warn:n,err:i}=w(),a=l===0?u.elapsed:l-u.segundos,o=e+n,s=o+i,c=a>0?Math.round(o/5/(a/60)):o,d=s>0?Math.round(e/s*100):100;r.clear();let f=1;c>=50&&d>=95?f=5:c>=40&&d>=90?f=4:c>=30&&d>=85?f=3:c>=20&&d>=80&&(f=2),D(f);let p=``;p=f===5?`¡Perfecto! ${c} WPM. ¡Eres un maestro de la velocidad! 🚀`:f>=4?`¡Excelente! ${c} WPM. ¡Tu técnica es asombrosa! 🔥`:f>=3?`¡Muy bien! ${c} WPM. ¡Estás progresando rápido! 👏`:f>=2?`¡Bien hecho! ${c} WPM. ¡Sigue practicando! 💪`:`Completado: ${c} WPM. ¡La constancia es la clave! 🐢`,t(p,f>=4?`success`:f>=3?`info`:`warning`,5e3)}function D(t){let n=`
    <div class="lc_res_panel" id="lc_results_ui">
      <div class="lc_stars">${[1,2,3,4,5].map(e=>`<i class="fas fa-star ${e<=t?`lc_star_on`:`lc_star_off`}"></i>`).join(``)}</div>
    </div>
  `;e(`#lc_results_ui`).remove(),e(`.lc_sp_info`).hide(),e(`.lc_side_panel`).prepend(n)}function O(){u?.timerID&&(clearInterval(u.timerID),u.timerID=null)}function k(){let e=document.getElementById(`lc_texto_display`),t=e?.querySelector(`.lc_ch_cur`);if(!e||!t)return;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.bottom>n.bottom-20&&(e.scrollTop+=r.bottom-n.bottom+40)}export{h as cleanup,m as init,p as render};