import{t as e}from"./vendor-BDh6mtVu.js";import{i as t}from"./widev-BG17oNzN.js";/* empty css                */import{n}from"./teclado-Dy0XPorW.js";import{n as r,t as i}from"./wiad-BcmiD7Tc.js";var a=[{id:1,nivel:`Fácil`,color:`#22c55e`,texto:`El sol sale por las mañanas y nos da mucha alegria. Es un dia muy bonito para caminar por el campo y ver las flores de colores. Los pajaros cantan en los arboles mientras el viento sopla suave.`},{id:2,nivel:`Medio`,color:`#0EBEFF`,texto:`La mecanografia es una habilidad esencial en el mundo digital actual. Escribir con fluidez y sin mirar el teclado permite que nuestras ideas fluyan directamente a la pantalla. Es cuestion de practica y constancia diaria.`},{id:3,nivel:`Difícil`,color:`#f97316`,texto:`La exploracion del cosmos ha revelado misterios inimaginables: desde agujeros negros masivos hasta exoplanetas con atmosferas complejas. El telescopio James Webb captura luz infrarroja a millones de kilometros de distancia.`}],o=[{id:0,lbl:`∞ Sin límite`},{id:30,lbl:`30 seg`},{id:60,lbl:`1 min`},{id:120,lbl:`2 min`},{id:300,lbl:`5 min`}],s={N:0,OK:1,ERR:3},c=60,l=null,u=()=>a.map(e=>`<option value="${e.id}">${e.nivel}</option>`).join(``),d=()=>o.map(e=>`<option value="${e.id}"${e.id===c?` selected`:``}>${e.lbl}</option>`).join(``),f=()=>`
<div class="lc_page">

  <!-- LAYOUT: AD | CONTENT | AD -->
  <div class="lc_layout">
    ${i}

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
          <div class="lc_sp_block lc_sp_time" id="lc_timer_box">
            <div class="lc_sp_n" id="lc_secs">—</div>
            <div class="lc_sp_l"><i class="fas fa-stopwatch"></i> seg</div>
          </div>

          <div class="lc_sp_sep"></div>

          <!-- Mini counters -->
          <div class="lc_sp_mini">
            <span class="czm ok" title="Aciertos"><i class="fas fa-check"></i> <b id="lc_ok">0</b></span>
            <span class="czm er" title="Errores"><i class="fas fa-xmark"></i> <b id="lc_err">0</b></span>
            <span class="czm wrn" title="Corregidos"><i class="fas fa-rotate-left"></i> <b id="lc_warn">0</b></span>
          </div>

          <div class="lc_sp_sep"></div>

          <!-- Tiempo select -->
          <label class="lc_sp_sel"><i class="fas fa-clock"></i>
            <select id="lc_sel_tiempo" class="lc_sel">${d()}</select>
          </label>

          <!-- Nivel select -->
          <label class="lc_sp_sel"><i class="fas fa-layer-group"></i>
            <select id="lc_sel_nivel" class="lc_sel">${u()}</select>
          </label>

          <!-- Buttons -->
          <div class="lc_sp_btns">
            <button class="lc_sp_btn" id="lc_btn_reintentar"><i class="fas fa-rotate-right"></i> Reiniciar</button>
            <button class="lc_sp_btn lc_btn_ghost" id="lc_btn_next"><i class="fas fa-forward"></i> Siguiente</button>
          </div>
        </div>
      </div>
    </div>

    ${r}
  </div>

</div>
`,p=()=>{n.render(`#lc_teclado`),h(a[0]),e(document).off(`.lck`),e(document).on(`change.lck`,`#lc_sel_tiempo`,function(){l.iniciado||(c=+e(this).val(),h(l.texto))}),e(document).on(`change.lck`,`#lc_sel_nivel`,function(){h(a.find(t=>t.id===+e(this).val())||a[0])}),e(document).on(`click.lck`,`#lc_btn_next`,()=>{let e=a.filter(e=>!l||e.id!==l.texto.id);h(e[Math.floor(Math.random()*e.length)]||a[0])}),e(document).on(`click.lck`,`#lc_btn_reintentar`,()=>h(l.texto)),e(document).on(`keydown.lck`,e=>{e.key===`Escape`&&(e.preventDefault(),h(l.texto))}),e(document).on(`keydown.lck`,x),e(document).on(`click.lck`,`#wk_sound_toggle`,()=>{let t=n.sound.toggle(),r=e(`#wk_sound_toggle`);r.toggleClass(`wk_muted`,!t),r.find(`i`).attr(`class`,t?`fas fa-volume-up`:`fas fa-volume-xmark`)})},m=()=>{E(),n.clear(),e(document).off(`.lck`),l=null};function h(t){E(),l={texto:t,chars:[],pos:0,iniciado:!1,finalizado:!1,timerID:null,segundos:c,elapsed:0},e(`#cz_nivel_label`).text(t.nivel),e(`#lc_sel_nivel`).val(t.id),e(`#lc_prog_fill`).css({width:`0%`,background:`var(--success)`}),e(`#lc_wpm`).text(0),e(`#lc_prec`).text(100),e(`#lc_ok`).text(0),e(`#lc_err`).text(0),e(`#lc_warn`).text(0),e(`#lc_timer_box`).removeClass(`lc_warn`),g(),_(t.texto),n.clear();let r=t.texto[0];r&&n.hint(r),setTimeout(()=>e(`#lc_texto_display`).trigger(`focus`),60)}function g(t=null){c===0?e(`#lc_secs`).text(t??0):e(`#lc_secs`).text(t??c)}function _(t){let n=e(`#lc_texto_inner`).empty();l.chars=[];let r=t.split(/( )/),i=null;r.forEach(t=>{if(t===` `){let t=e(`<span class="lc_ch lc_space"> </span>`);n.append(t),l.chars.push({char:` `,$s:t,state:s.N,hadErr:!1}),i=null}else t.length>0&&(i=e(`<span class="lc_word"></span>`),[...t].forEach(t=>{let n=e(`<span class="lc_ch">${t}</span>`);i.append(n),l.chars.push({char:t,$s:n,state:s.N,hadErr:!1})}),n.append(i))}),v(0)}function v(e){l.chars.forEach(e=>e.$s.removeClass(`lc_ch_cur`)),e<l.chars.length&&l.chars[e].$s.addClass(`lc_ch_cur`)}function y(){l.iniciado||l.finalizado||(l.iniciado=!0,l.timerID=setInterval(()=>{l.elapsed++,c===0?g(l.elapsed):(l.segundos--,g(l.segundos),l.segundos<=10&&e(`#lc_timer_box`).addClass(`lc_warn`),l.segundos<=0&&T()),w()},1e3))}var b=new Set(`Shift.CapsLock.Tab.ArrowLeft.ArrowRight.ArrowUp.ArrowDown.Home.End.PageUp.PageDown.Insert.Delete.ContextMenu.F1.F2.F3.F4.F5.F6.F7.F8.F9.F10.F11.F12`.split(`.`));function x(t){if(!l||l.finalizado||b.has(t.key)||t.ctrlKey||t.altKey||t.metaKey||t.key===`Escape`)return;if(t.preventDefault(),l.iniciado||y(),t.key===`Backspace`){S();return}if(l.pos>=l.chars.length)return;let r=l.chars[l.pos],i=r.char===`
`?`Enter`:r.char,a=t.key===i;if(n.press(i,a),r.$s.removeClass(`lc_ch_cur lc_ch_ok lc_ch_warn lc_ch_err lc_ch_shake`),a?(r.state=s.OK,r.hadErr?r.$s.addClass(`lc_ch_warn`):r.$s.addClass(`lc_ch_ok`)):(r.state=s.ERR,r.hadErr=!0,r.$s.addClass(`lc_ch_err lc_ch_shake`),setTimeout(()=>r.$s.removeClass(`lc_ch_shake`),320)),l.pos++,v(l.pos),l.pos<l.chars.length){D();let e=l.chars[l.pos]?.char;e&&n.hint(e===`
`?`Enter`:e)}e(`#lc_prog_fill`).css(`width`,`${l.pos/l.chars.length*100}%`),w(),l.pos>=l.chars.length&&T()}function S(){if(l.pos<=0)return;l.pos--;let e=l.chars[l.pos];e.$s.removeClass(`lc_ch_cur lc_ch_ok lc_ch_err`),e.state=s.N,v(l.pos),w()}function C(){let e=0,t=0,n=0;return l.chars.forEach(r=>{r.state===s.OK?r.hadErr?t++:e++:r.state===s.ERR&&n++}),{ok:e,warn:t,err:n}}function w(){let{ok:t,warn:n,err:r}=C(),i=c===0?l.elapsed:c-l.segundos,a=t+n,o=a+r,s=i>0?Math.round(a/5/(i/60)):0,u=o>0?Math.round(a/o*100):100;e(`#lc_wpm`).text(s),e(`#lc_prec`).text(u),e(`#lc_ok`).text(t),e(`#lc_err`).text(r),e(`#lc_warn`).text(n)}function T(){if(l.finalizado)return;l.finalizado=!0,E();let{ok:e,cor:r,err:i}=C(),a=c===0?l.elapsed:c-l.segundos,o=e+r,s=o+i,u=a>0?Math.round(o/5/(a/60)):o;s>0&&Math.round(o/s*100),n.clear(),u>=40&&t(`¡${u} WPM! 🚀`,`success`,3e3)}function E(){l?.timerID&&(clearInterval(l.timerID),l.timerID=null)}function D(){let e=document.getElementById(`lc_texto_display`),t=e?.querySelector(`.lc_ch_cur`);if(!e||!t)return;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.bottom>n.bottom-20&&(e.scrollTop+=r.bottom-n.bottom+40)}export{m as cleanup,p as init,f as render};