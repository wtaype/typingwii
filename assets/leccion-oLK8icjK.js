import{t as e}from"./vendor-BDh6mtVu.js";import{S as t,i as n,v as r}from"./widev-BeM_WIdv.js";/* empty css                */import{n as i}from"./teclado-LeFZfFqu.js";var a={NEUTRAL:0,OK:1,ERR:3},o=null,s=null;function c(e){return{chars:[],pos:0,iniciado:!1,finalizado:!1,timerID:null,elapsed:0}}var l=e=>String(e).padStart(2,`0`),u={1:`#22c55e`,2:`#16a34a`,3:`#0ea5e9`,4:`#0284c7`,5:`#f97316`,6:`#ea580c`,7:`#a855f7`,8:`#9333ea`,9:`#ef4444`,10:`#dc2626`},d={1:`Principiante`,2:`Principiante+`,3:`Elemental`,4:`Elemental+`,5:`Intermedio`,6:`Intermedio+`,7:`Avanzado`,8:`Avanzado+`,9:`Experto`,10:`Maestro`},f=()=>{if(!s)return`<div class="ad_empty"><i class="fas fa-book-open"></i><p>Lección no encontrada.</p></div>`;let{id:e,titulo:t,subtitulo:n=``,nivel:i=1,teclasPracticar:a=[],descripcion:o=``}=s,c=l(e),f=u[i]||u[1];d[i];let p=e<100?e+1:null;return`
<div class="lc_page">

  <!-- LAYOUT: AD | CONTENT | AD -->
  <div class="lc_layout">
    <div class="lc_ad_side lc_ad_l">
      <div class="lc_ad_box"><i class="fas fa-rectangle-ad"></i><span>Publicidad</span><small>160×600</small></div>
    </div>

    <div class="lc_content">


      <!-- PROGRESS -->
      <div class="lc_prog_track"><div class="lc_prog_fill" id="lc_pr_fill" style="background:${f}"></div></div>


      <!-- TEXT AREA -->
      <div class="lc_texto_area" id="lc_texto_display" tabindex="0">

        <!-- Texto -->
        <div class="lc_texto_inner" id="lc_texto_inner"></div>
      </div>

      <!-- BOTTOM: KEYBOARD + STATS -->
      <div class="lc_bottom">
        <div class="lc_kbd_col">
          <div id="lc_teclado"></div>
        </div>
        <div class="lc_side_panel">
          <div class="lc_sp_info" style="text-align:center; margin-bottom:1vh; background:var(--bg4); border:1px solid var(--brd); border-radius:1.2vh; padding:1.2vh;">
            <div style="font-size:var(--fz_s4); color:var(--tx3); text-transform:uppercase; font-weight:800; letter-spacing:.1em; margin-bottom:.4vh;">Lección ${c}</div>
            <div style="font-size:var(--fz_m2); font-weight:800; color:var(--tx1); line-height:1.2;">${t}</div>
          </div>
          <div class="lc_sp_block lc_sp_wpm" ${r(`Palabras por minuto`)}>
            <div class="lc_sp_n" id="lc_wpm">0</div>
            <div class="lc_sp_l"><i class="fas fa-bolt"></i> WPM</div>
          </div>
          <div class="lc_sp_block lc_sp_prec" ${r(`Precisión`)}>
            <div class="lc_sp_n" id="lc_prec">100</div>
            <div class="lc_sp_l"><i class="fas fa-bullseye"></i> %</div>
          </div>
          <div class="lc_sp_block lc_sp_time" id="lc_timer_box" ${r(`Tiempo transcurrido`)}>
            <div class="lc_sp_n" id="lc_secs">0</div>
            <div class="lc_sp_l"><i class="fas fa-stopwatch"></i> seg</div>
          </div>
          <div class="lc_sp_sep"></div>
          <div class="lc_sp_mini">
            <span class="lcm ok" ${r(`Aciertos`)}><i class="fas fa-check"></i> <b id="lc_cnt_ok">0</b></span>
            <span class="lcm er" ${r(`Errores`)}><i class="fas fa-xmark"></i> <b id="lc_cnt_err">0</b></span>
          </div>
          <div class="lc_sp_sep"></div>
          <div class="lc_sp_sel" style="display:flex;justify-content:center;cursor:default;">
             <span id="lc_pos">0</span><span style="opacity:.4;margin:0 .25vh">/</span><span id="lc_total">0</span><small style="margin-left:5px">chars</small>
          </div>
          <div style="display:flex; gap: .5vh; margin-top: auto;">
             <button class="lc_sp_btn" id="lc_btn_ant" style="flex:1; padding:1vh 0; font-size:var(--fz_m1); margin-top:0; border-radius:1vh; box-shadow:none; background:var(--bg4); border:1px solid var(--brd); color:var(--tx1);" ${e<=1?`disabled`:``}><i class="fas fa-chevron-left"></i></button>
             <button class="lc_sp_btn" id="lc_btn_restart" style="flex:2; padding:1vh 0; font-size:var(--fz_m1); margin-top:0; border-radius:1vh;"><i class="fas fa-rotate-right"></i> Reiniciar</button>
             <button class="lc_sp_btn" id="lc_btn_sig" style="flex:1; padding:1vh 0; font-size:var(--fz_m1); margin-top:0; border-radius:1vh; box-shadow:none; background:var(--bg4); border:1px solid var(--brd); color:var(--tx1);" ${p?``:`disabled`}><i class="fas fa-chevron-right"></i></button>
          </div>
          <button class="lc_sp_btn" id="lc_btn_volver" style="background:var(--bg4); border:1px solid var(--brd); color:var(--tx1); box-shadow:none; padding:1vh 0; margin-top:.5vh; font-size:var(--fz_m1); border-radius:1vh;"><i class="fas fa-th-list"></i> Todas las lecciones</button>
        </div>
      </div>
    </div>

    <div class="lc_ad_side lc_ad_r">
      <div class="lc_ad_box"><i class="fas fa-rectangle-ad"></i><span>Publicidad</span><small>160×600</small></div>
    </div>
  </div>

</div>
`},p=()=>{if(!s)return;let r=u[s.nivel]||u[1];i.render(`#lc_teclado`),s.teclasPracticar?.length&&setTimeout(()=>{s.teclasPracticar.forEach(e=>{document.querySelectorAll(`[data-wk="${e.toLowerCase()}"]`).forEach(e=>e.style.cssText+=`;outline:2px solid var(--mco);outline-offset:1px;`)})},200),g(),e(document).off(`.lck`),e(document).on(`click.lck`,`#lc_btn_restart, #lc_btn_reintentar`,()=>g()),e(document).on(`click.lck`,`#lc_btn_sig`,()=>{let e=String(s.id+1).padStart(2,`0`);t(()=>import(`./leccion`+e+`.js`).then(e=>{s=e.data,h()}),[]).catch(()=>n(`Lección no disponible aún`,`info`))}),e(document).on(`click.lck`,`#lc_btn_ant`,()=>{if(s.id<=1)return;let e=String(s.id-1).padStart(2,`0`);t(()=>import(`./leccion`+e+`.js`).then(e=>{s=e.data,h()}),[]).catch(()=>n(`Lección no disponible`,`warning`))}),e(document).on(`click.lck`,`#lc_btn_volver`,()=>{t(async()=>{let{rutas:e}=await import(`./ruta-mfhKqqmU.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/lecciones`))}),e(document).on(`click.lck`,`#lc_texto_display`,()=>{e(`#lc_texto_display`).trigger(`focus`),!o.iniciado&&!o.finalizado&&y()}),e(document).on(`keydown.lck`,e=>{e.key===`Escape`&&(e.preventDefault(),g())}),e(document).on(`keydown.lck`,`#lc_texto_display`,x),e(`#lc_pr_fill`).css(`background`,r)},m=()=>{D(),i.clear(),e(document).off(`.lck`),o=null};function h(){m();let e=f();t(async()=>{let{wiFade:e}=await import(`./rutadev-DePFb1Uw.js`).then(e=>e.t);return{wiFade:e}},[]).then(({wiFade:t})=>{t(`#wimain`,e).then(()=>{p();let e=l(s.id);document.title=`Lección ${e} — ${s.titulo} · TypingWii`,history.pushState({ruta:`/leccion${e}`},``,`/leccion${e}`)})})}function g(){D(),o=c(s.texto),e(`#lc_wpm`).text(0),e(`#lc_prec`).text(100),e(`#lc_secs`).text(0),e(`#lc_timer_box`).removeClass(`lc_warn`),e(`#lc_pr_fill`).css(`width`,`0%`),e(`#lc_pos`).text(0),e(`#lc_total`).text(s.texto.length),T({ok:0,err:0}),_(s.texto),i.clear();let t=s.texto[0];t&&i.hint(t===`
`?`Enter`:t),setTimeout(()=>e(`#lc_texto_display`).trigger(`focus`),60)}function _(t){let n=e(`#lc_texto_inner`).empty();o.chars=[];let r=t.split(/( )/),i=null;r.forEach(t=>{if(t===` `){let t=e(`<span class="lc_ch lc_space"> </span>`);n.append(t),o.chars.push({char:` `,$s:t,state:a.NEUTRAL,hadErr:!1}),i=null}else t.length>0&&(i=e(`<span class="lc_word"></span>`),[...t].forEach(t=>{let n=e(`<span class="lc_ch">${t}</span>`);i.append(n),o.chars.push({char:t,$s:n,state:a.NEUTRAL,hadErr:!1})}),n.append(i))}),v(0)}function v(e){o.chars.forEach(e=>e.$s.removeClass(`lc_ch_cur`)),e<o.chars.length&&o.chars[e].$s.addClass(`lc_ch_cur`)}function y(){o.iniciado||o.finalizado||(o.iniciado=!0,o.timerID=setInterval(()=>{o.elapsed++,e(`#lc_secs`).text(o.elapsed),w()},1e3))}var b=new Set(`Shift.CapsLock.Tab.ArrowLeft.ArrowRight.ArrowUp.ArrowDown.Home.End.PageUp.PageDown.Insert.Delete.ContextMenu.F1.F2.F3.F4.F5.F6.F7.F8.F9.F10.F11.F12`.split(`.`));function x(t){if(o.finalizado||b.has(t.key)||t.ctrlKey||t.altKey||t.metaKey)return;if(t.preventDefault(),o.iniciado||y(),t.key===`Backspace`){S();return}if(o.pos>=o.chars.length)return;let n=o.chars[o.pos],r=n.char===`
`?`Enter`:n.char,s=t.key===r;if(i.press(r,s),n.$s.removeClass(`lc_ch_cur lc_ch_ok lc_ch_err lc_ch_shake`),s?(n.state=a.OK,n.$s.addClass(`lc_ch_ok`)):(n.state=a.ERR,n.hadErr=!0,n.$s.addClass(`lc_ch_err lc_ch_shake`),setTimeout(()=>n.$s.removeClass(`lc_ch_shake`),300)),o.pos++,v(o.pos),o.pos<o.chars.length){O();let e=o.chars[o.pos]?.char;e&&i.hint(e===`
`?`Enter`:e)}e(`#lc_pr_fill`).css(`width`,`${o.pos/o.chars.length*100}%`),e(`#lc_pos`).text(o.pos),w(),o.pos>=o.chars.length&&E()}function S(){if(o.pos<=0)return;o.pos--;let t=o.chars[o.pos];t.$s.removeClass(`lc_ch_cur lc_ch_ok lc_ch_err`),t.state=a.NEUTRAL,v(o.pos),e(`#lc_pr_fill`).css(`width`,`${o.pos/o.chars.length*100}%`),e(`#lc_pos`).text(o.pos),w()}function C(){let e=0,t=0;return o.chars.forEach(n=>{n.state===a.OK?e++:n.state===a.ERR&&t++}),{ok:e,err:t}}function w(){let{ok:t,err:n}=C(),r=o.elapsed,i=t,a=i+n,s=r>0?Math.round(i/5/(r/60)):0,c=a>0?Math.round(i/a*100):100;e(`#lc_wpm`).text(s),e(`#lc_prec`).text(c),T({ok:t,err:n})}function T(t=null){let{ok:n,err:r}=t||C();e(`#lc_cnt_ok`).text(n),e(`#lc_cnt_err`).text(r)}function E(){if(o.finalizado)return;o.finalizado=!0,D();let{ok:e,err:t}=C(),r=o.elapsed,a=e;a+t;let s=r>0?Math.round(a/5/(r/60)):a;i.clear(),s>=40&&n(`¡${s} WPM! 🚀 ¡Lección superada!`,`success`,3e3)}function D(){o?.timerID&&(clearInterval(o.timerID),o.timerID=null)}function O(){let e=document.getElementById(`lc_texto_display`),t=e?.querySelector(`.lc_ch_cur`);if(!e||!t)return;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.bottom>n.bottom-20&&(e.scrollTop+=r.bottom-n.bottom+40)}var k=e=>{s=e};export{m as cleanup,p as init,f as render,k as setData};