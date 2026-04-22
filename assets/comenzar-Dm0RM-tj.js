import{t as e}from"./vendor-BDh6mtVu.js";import{i as t}from"./widev-BeM_WIdv.js";/* empty css                */import{n}from"./teclado-LeFZfFqu.js";var r=[{id:1,nivel:`Fácil`,color:`#22c55e`,texto:`El sol sale por las mañanas y nos da mucha alegria. Es un dia muy bonito para caminar por el campo y ver las flores de colores. Los pajaros cantan en los arboles mientras el viento sopla suave.`},{id:2,nivel:`Medio`,color:`#0EBEFF`,texto:`La mecanografia es una habilidad esencial en el mundo digital actual. Escribir con fluidez y sin mirar el teclado permite que nuestras ideas fluyan directamente a la pantalla. Es cuestion de practica y constancia diaria.`},{id:3,nivel:`Difícil`,color:`#f97316`,texto:`La exploracion del cosmos ha revelado misterios inimaginables: desde agujeros negros masivos hasta exoplanetas con atmosferas complejas. El telescopio James Webb captura luz infrarroja a millones de kilometros de distancia.`}],i=[{id:0,lbl:`∞ Sin límite`},{id:30,lbl:`30 seg`},{id:60,lbl:`1 min`},{id:120,lbl:`2 min`},{id:300,lbl:`5 min`}],a={N:0,OK:1,ERR:3},o=60,s=null,c=()=>i.map(e=>`<option value="${e.id}"${e.id===o?` selected`:``}>${e.lbl}</option>`).join(``),l=()=>`
<div class="lc_page">

  <!-- LAYOUT: AD | CONTENT | AD -->
  <div class="lc_layout">
    <div class="lc_ad_side lc_ad_l">
      <div class="lc_ad_box"><i class="fas fa-rectangle-ad"></i><span>Publicidad</span><small>160×600</small></div>
    </div>

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
            <select id="lc_sel_tiempo" class="lc_sel">${c()}</select>
          </label>
          <button class="lc_sp_btn" id="lc_btn_next"><i class="fas fa-forward"></i> Siguiente</button>
        </div>
      </div>
    </div>

    <div class="lc_ad_side lc_ad_r">
      <div class="lc_ad_box"><i class="fas fa-rectangle-ad"></i><span>Publicidad</span><small>160×600</small></div>
    </div>
  </div>

</div>
`,u=()=>{n.render(`#lc_teclado`),f(r[0]),e(document).off(`.lck`),e(document).on(`change.lck`,`#lc_sel_tiempo`,function(){s.iniciado||(o=+e(this).val(),f(s.texto))});let t=()=>{let e=r.filter(e=>!s||e.id!==s.texto.id);f(e[Math.floor(Math.random()*e.length)]||r[0])};e(document).on(`click.lck`,`#lc_btn_next`,t),e(document).on(`click.lck`,`#lc_btn_reintentar`,()=>f(s.texto)),e(document).on(`click.lck`,`#lc_btn_siguiente`,()=>{t()}),e(document).on(`keydown.lck`,e=>{e.key===`Escape`&&(e.preventDefault(),f(s.texto))}),e(document).on(`keydown.lck`,v)},d=()=>{C(),n.clear(),e(document).off(`.lck`),s=null};function f(t){C(),s={texto:t,chars:[],pos:0,iniciado:!1,finalizado:!1,timerID:null,segundos:o,elapsed:0},e(`#lc_prog_fill`).css({width:`0%`,background:t.color}),e(`#lc_wpm`).text(0),e(`#lc_prec`).text(100),e(`#lc_ok`).text(0),e(`#lc_err`).text(0),e(`#lc_timer_box`).removeClass(`lc_warn`),p(),m(t.texto),n.clear();let r=t.texto[0];r&&n.hint(r),setTimeout(()=>e(`#lc_texto_display`).trigger(`focus`),60)}function p(t=null){o===0?e(`#lc_secs`).text(t??0):e(`#lc_secs`).text(t??o)}function m(t){let n=e(`#lc_texto_inner`).empty();s.chars=[];let r=t.split(/( )/),i=null;r.forEach(t=>{if(t===` `){let t=e(`<span class="lc_ch lc_space"> </span>`);n.append(t),s.chars.push({char:` `,$s:t,state:a.N,hadErr:!1}),i=null}else t.length>0&&(i=e(`<span class="lc_word"></span>`),[...t].forEach(t=>{let n=e(`<span class="lc_ch">${t}</span>`);i.append(n),s.chars.push({char:t,$s:n,state:a.N,hadErr:!1})}),n.append(i))}),h(0)}function h(e){s.chars.forEach(e=>e.$s.removeClass(`lc_ch_cur`)),e<s.chars.length&&s.chars[e].$s.addClass(`lc_ch_cur`)}function g(){s.iniciado||s.finalizado||(s.iniciado=!0,s.timerID=setInterval(()=>{s.elapsed++,o===0?p(s.elapsed):(s.segundos--,p(s.segundos),s.segundos<=10&&e(`#lc_timer_box`).addClass(`lc_warn`),s.segundos<=0&&S()),x()},1e3))}var _=new Set(`Shift.CapsLock.Tab.ArrowLeft.ArrowRight.ArrowUp.ArrowDown.Home.End.PageUp.PageDown.Insert.Delete.ContextMenu.F1.F2.F3.F4.F5.F6.F7.F8.F9.F10.F11.F12`.split(`.`));function v(t){if(!s||s.finalizado||_.has(t.key)||t.ctrlKey||t.altKey||t.metaKey||t.key===`Escape`)return;if(t.preventDefault(),s.iniciado||g(),t.key===`Backspace`){y();return}if(s.pos>=s.chars.length)return;let r=s.chars[s.pos],i=r.char===`
`?`Enter`:r.char,o=t.key===i;if(n.press(i,o),r.$s.removeClass(`lc_ch_cur lc_ch_ok lc_ch_err lc_ch_shake`),o?(r.state=a.OK,r.$s.addClass(`lc_ch_ok`)):(r.state=a.ERR,r.hadErr=!0,r.$s.addClass(`lc_ch_err lc_ch_shake`),setTimeout(()=>r.$s.removeClass(`lc_ch_shake`),320)),s.pos++,h(s.pos),s.pos<s.chars.length){w();let e=s.chars[s.pos]?.char;e&&n.hint(e===`
`?`Enter`:e)}e(`#lc_prog_fill`).css(`width`,`${s.pos/s.chars.length*100}%`),x(),s.pos>=s.chars.length&&S()}function y(){if(s.pos<=0)return;s.pos--;let e=s.chars[s.pos];e.$s.removeClass(`lc_ch_cur lc_ch_ok lc_ch_err`),e.state=a.N,h(s.pos),x()}function b(){let e=0,t=0;return s.chars.forEach(n=>{n.state===a.OK?e++:n.state===a.ERR&&t++}),{ok:e,cor:0,err:t}}function x(){let{ok:t,cor:n,err:r}=b(),i=o===0?s.elapsed:o-s.segundos,a=t+n,c=a+r,l=i>0?Math.round(a/5/(i/60)):0,u=c>0?Math.round(a/c*100):100;e(`#lc_wpm`).text(l),e(`#lc_prec`).text(u),e(`#lc_ok`).text(t),e(`#lc_err`).text(r)}function S(){if(s.finalizado)return;s.finalizado=!0,C();let{ok:e,cor:r,err:i}=b(),a=o===0?s.elapsed:o-s.segundos,c=e+r,l=c+i,u=a>0?Math.round(c/5/(a/60)):c;l>0&&Math.round(c/l*100),n.clear(),u>=40&&t(`¡${u} WPM! 🚀`,`success`,3e3)}function C(){s?.timerID&&(clearInterval(s.timerID),s.timerID=null)}function w(){let e=document.getElementById(`lc_texto_display`),t=e?.querySelector(`.lc_ch_cur`);if(!e||!t)return;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.bottom>n.bottom-20&&(e.scrollTop+=r.bottom-n.bottom+40)}export{d as cleanup,u as init,l as render};