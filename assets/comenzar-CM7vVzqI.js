import{t as e}from"./vendor-BDh6mtVu.js";import{i as t}from"./widev-F0AC6vIN.js";/* empty css                */import{n}from"./teclado-CKOmsOTo.js";import{n as r,t as i}from"./wiad-BcmiD7Tc.js";var a=[{id:1,nivel:`Fácil`,color:`#22c55e`,texto:`El sol sale por las mañanas y nos da mucha alegria. Es un dia muy bonito para caminar por el campo y ver las flores de colores. Los pajaros cantan en los arboles mientras el viento sopla suave.`},{id:2,nivel:`Medio`,color:`#0EBEFF`,texto:`La mecanografia es una habilidad esencial en el mundo digital actual. Escribir con fluidez y sin mirar el teclado permite que nuestras ideas fluyan directamente a la pantalla. Es cuestion de practica y constancia diaria.`},{id:3,nivel:`Difícil`,color:`#f97316`,texto:`La exploracion del cosmos ha revelado misterios inimaginables: desde agujeros negros masivos hasta exoplanetas con atmosferas complejas. El telescopio James Webb captura luz infrarroja a millones de kilometros de distancia.`}],o=[{id:0,lbl:`∞ Sin límite`},{id:30,lbl:`30 seg`},{id:60,lbl:`1 min`},{id:120,lbl:`2 min`},{id:300,lbl:`5 min`}],s={N:0,OK:1,ERR:3},c=60,l=null,u=()=>o.map(e=>`<option value="${e.id}"${e.id===c?` selected`:``}>${e.lbl}</option>`).join(``),d=()=>`
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
          <div class="lc_sp_block lc_sp_wpm">
            <div class="lc_sp_n" id="lc_wpm">0</div>
            <div class="lc_sp_l"><i class="fas fa-bolt"></i> WPM</div>
          </div>
          <div class="lc_sp_block lc_sp_prec">
            <div class="lc_sp_n" id="lc_prec">100</div>
            <div class="lc_sp_l"><i class="fas fa-bullseye"></i> %</div>
          </div>
          <div class="lc_sp_block lc_sp_time" id="lc_timer_box">
            <div class="lc_sp_n" id="lc_secs">—</div>
            <div class="lc_sp_l"><i class="fas fa-clock"></i> seg</div>
          </div>
          <div class="lc_sp_sep"></div>
          <div class="lc_sp_mini">
            <span class="czm ok"><i class="fas fa-check"></i> <b id="lc_ok">0</b></span>
            <span class="czm er"><i class="fas fa-xmark"></i> <b id="lc_err">0</b></span>
          </div>
          <label class="lc_sp_sel"><i class="fas fa-clock"></i>
            <select id="lc_sel_tiempo" class="lc_sel">${u()}</select>
          </label>
          <button class="lc_sp_btn" id="lc_btn_next"><i class="fas fa-forward"></i> Siguiente</button>
          <button class="lc_sp_btn" id="lc_btn_reintentar" style="margin-top: 5px;"><i class="fas fa-redo"></i> Reiniciar</button>
        </div>
      </div>
    </div>

    ${r}
  </div>

</div>
`,f=()=>{n.render(`#lc_teclado`),m(a[0]),e(document).off(`.lck`),e(document).on(`change.lck`,`#lc_sel_tiempo`,function(){l.iniciado||(c=+e(this).val(),m(l.texto))});let t=()=>{let e=a.filter(e=>!l||e.id!==l.texto.id);m(e[Math.floor(Math.random()*e.length)]||a[0])};e(document).on(`click.lck`,`#lc_btn_next`,t),e(document).on(`click.lck`,`#lc_btn_reintentar`,()=>m(l.texto)),e(document).on(`click.lck`,`#lc_btn_siguiente`,()=>{t()}),e(document).on(`keydown.lck`,e=>{e.key===`Escape`&&(e.preventDefault(),m(l.texto))}),e(document).on(`keydown.lck`,b)},p=()=>{T(),n.clear(),e(document).off(`.lck`),l=null};function m(t){T(),l={texto:t,chars:[],pos:0,iniciado:!1,finalizado:!1,timerID:null,segundos:c,elapsed:0},e(`#lc_prog_fill`).css({width:`0%`,background:t.color}),e(`#lc_wpm`).text(0),e(`#lc_prec`).text(100),e(`#lc_ok`).text(0),e(`#lc_err`).text(0),e(`#lc_timer_box`).removeClass(`lc_warn`),h(),g(t.texto),n.clear();let r=t.texto[0];r&&n.hint(r),setTimeout(()=>e(`#lc_texto_display`).trigger(`focus`),60)}function h(t=null){c===0?e(`#lc_secs`).text(t??0):e(`#lc_secs`).text(t??c)}function g(t){let n=e(`#lc_texto_inner`).empty();l.chars=[];let r=t.split(/( )/),i=null;r.forEach(t=>{if(t===` `){let t=e(`<span class="lc_ch lc_space"> </span>`);n.append(t),l.chars.push({char:` `,$s:t,state:s.N,hadErr:!1}),i=null}else t.length>0&&(i=e(`<span class="lc_word"></span>`),[...t].forEach(t=>{let n=e(`<span class="lc_ch">${t}</span>`);i.append(n),l.chars.push({char:t,$s:n,state:s.N,hadErr:!1})}),n.append(i))}),_(0)}function _(e){l.chars.forEach(e=>e.$s.removeClass(`lc_ch_cur`)),e<l.chars.length&&l.chars[e].$s.addClass(`lc_ch_cur`)}function v(){l.iniciado||l.finalizado||(l.iniciado=!0,l.timerID=setInterval(()=>{l.elapsed++,c===0?h(l.elapsed):(l.segundos--,h(l.segundos),l.segundos<=10&&e(`#lc_timer_box`).addClass(`lc_warn`),l.segundos<=0&&w()),C()},1e3))}var y=new Set(`Shift.CapsLock.Tab.ArrowLeft.ArrowRight.ArrowUp.ArrowDown.Home.End.PageUp.PageDown.Insert.Delete.ContextMenu.F1.F2.F3.F4.F5.F6.F7.F8.F9.F10.F11.F12`.split(`.`));function b(t){if(!l||l.finalizado||y.has(t.key)||t.ctrlKey||t.altKey||t.metaKey||t.key===`Escape`)return;if(t.preventDefault(),l.iniciado||v(),t.key===`Backspace`){x();return}if(l.pos>=l.chars.length)return;let r=l.chars[l.pos],i=r.char===`
`?`Enter`:r.char,a=t.key===i;if(n.press(i,a),r.$s.removeClass(`lc_ch_cur lc_ch_ok lc_ch_err lc_ch_shake`),a?(r.state=s.OK,r.$s.addClass(`lc_ch_ok`)):(r.state=s.ERR,r.hadErr=!0,r.$s.addClass(`lc_ch_err lc_ch_shake`),setTimeout(()=>r.$s.removeClass(`lc_ch_shake`),320)),l.pos++,_(l.pos),l.pos<l.chars.length){E();let e=l.chars[l.pos]?.char;e&&n.hint(e===`
`?`Enter`:e)}e(`#lc_prog_fill`).css(`width`,`${l.pos/l.chars.length*100}%`),C(),l.pos>=l.chars.length&&w()}function x(){if(l.pos<=0)return;l.pos--;let e=l.chars[l.pos];e.$s.removeClass(`lc_ch_cur lc_ch_ok lc_ch_err`),e.state=s.N,_(l.pos),C()}function S(){let e=0,t=0;return l.chars.forEach(n=>{n.state===s.OK?e++:n.state===s.ERR&&t++}),{ok:e,cor:0,err:t}}function C(){let{ok:t,cor:n,err:r}=S(),i=c===0?l.elapsed:c-l.segundos,a=t+n,o=a+r,s=i>0?Math.round(a/5/(i/60)):0,u=o>0?Math.round(a/o*100):100;e(`#lc_wpm`).text(s),e(`#lc_prec`).text(u),e(`#lc_ok`).text(t),e(`#lc_err`).text(r)}function w(){if(l.finalizado)return;l.finalizado=!0,T();let{ok:e,cor:r,err:i}=S(),a=c===0?l.elapsed:c-l.segundos,o=e+r,s=o+i,u=a>0?Math.round(o/5/(a/60)):o;s>0&&Math.round(o/s*100),n.clear(),u>=40&&t(`¡${u} WPM! 🚀`,`success`,3e3)}function T(){l?.timerID&&(clearInterval(l.timerID),l.timerID=null)}function E(){let e=document.getElementById(`lc_texto_display`),t=e?.querySelector(`.lc_ch_cur`);if(!e||!t)return;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.bottom>n.bottom-20&&(e.scrollTop+=r.bottom-n.bottom+40)}export{p as cleanup,f as init,d as render};