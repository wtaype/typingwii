import{t as e}from"./rolldown-runtime-lhHHWwHU.js";var t=e({wiTeclado:()=>a}),n={"!":`1`,"@":`2`,"#":`3`,$:`4`,"%":`5`,"^":`6`,"&":`7`,"*":`8`,"(":`9`,")":`0`,_:`-`,"+":`=`,"{":`[`,"}":`]`,"|":`\\`,":":`;`,'"':`'`,"<":`,`,">":`.`,"?":`/`,A:`a`,B:`b`,C:`c`,D:`d`,E:`e`,F:`f`,G:`g`,H:`h`,I:`i`,J:`j`,K:`k`,L:`l`,M:`m`,N:`n`,O:`o`,P:`p`,Q:`q`,R:`r`,S:`s`,T:`t`,U:`u`,V:`v`,W:`w`,X:`x`,Y:`y`,Z:`z`,Ñ:`ñ`},r=[[[`Escape`,`Esc`,`lp`,1],[`F1`,`F1`,`lp`,1],[`F2`,`F2`,`lr`,1],[`F3`,`F3`,`lm`,1],[`F4`,`F4`,`li`,1],[`F5`,`F5`,`li`,1],[`F6`,`F6`,`ri`,1],[`F7`,`F7`,`ri`,1],[`F8`,`F8`,`rm`,1],[`F9`,`F9`,`rr`,1],[`F10`,`F10`,`rp`,1],[`F11`,`F11`,`rp`,1],[`F12`,`F12`,`rp`,1],[`F13`,`F13`,`rp`,1],[`F14`,`F14`,`rp`,1]],[["`","~|`",`lp`,1],[`1`,`!|1`,`lp`,1],[`2`,`@|2`,`lr`,1],[`3`,`#|3`,`lm`,1],[`4`,`$|4`,`li`,1],[`5`,`%|5`,`li`,1],[`6`,`^|6`,`ri`,1],[`7`,`&|7`,`ri`,1],[`8`,`*|8`,`rm`,1],[`9`,`(|9`,`rr`,1],[`0`,`)|0`,`rp`,1],[`-`,`_|-`,`rp`,1],[`=`,`+|=`,`rp`,1],[`Backspace`,`BACKSPACE`,`rp`,2]],[[`Tab`,`TAB`,`lp`,1.5],[`q`,`Q`,`lp`,1],[`w`,`W`,`lr`,1],[`e`,`E`,`lm`,1],[`r`,`R`,`li`,1],[`t`,`T`,`li`,1],[`y`,`Y`,`ri`,1],[`u`,`U`,`ri`,1],[`i`,`I`,`rm`,1],[`o`,`O`,`rr`,1],[`p`,`P`,`rp`,1],[`[`,`{|[`,`rp`,1],[`]`,`}|]`,`rp`,1],[`\\`,`||\\`,`rp`,1.5]],[[`CapsLock`,`CAPS LOCK`,`lp`,1.75],[`a`,`A`,`lp`,1,!0],[`s`,`S`,`lr`,1],[`d`,`D`,`lm`,1],[`f`,`F`,`li`,1,!0],[`g`,`G`,`li`,1],[`h`,`H`,`ri`,1],[`j`,`J`,`ri`,1,!0],[`k`,`K`,`rm`,1],[`l`,`L`,`rr`,1],[`ñ`,`Ñ`,`rp`,1],[`'`,`"|'`,`rp`,1],[`Enter`,`ENTER`,`rp`,2.25]],[[`ShiftL`,`SHIFT`,`lp`,2.25],[`z`,`Z`,`lp`,1],[`x`,`X`,`lr`,1],[`c`,`C`,`lm`,1],[`v`,`V`,`li`,1],[`b`,`B`,`li`,1],[`n`,`N`,`ri`,1],[`m`,`M`,`ri`,1],[`,`,`<|,`,`rm`,1],[`.`,`>|.`,`rr`,1],[`/`,`?|/`,`rp`,1],[`ShiftR`,`SHIFT`,`rp`,2.75]],[[`Control`,`Ctrl`,`lp`,1.5],[`Meta`,`Win`,`lp`,1.2],[`Alt`,`Alt`,`th`,1.3],[` `,`SPACE`,`th`,6],[`AltR`,`Alt Gr`,`th`,1.3],[`MetaR`,`Win`,`rp`,1.2],[`ContextMenu`,`Menu`,`rp`,1.2],[`ControlR`,`Ctrl`,`rp`,`flex`]]],i=(()=>{let e=null,t=!0,n=()=>(e||=new(window.AudioContext||window.webkitAudioContext),e.state===`suspended`&&e.resume(),e),r=e=>{if(t)try{let t=n(),r=t.currentTime;if(e){let e=t.createBuffer(1,Math.ceil(t.sampleRate*.04),t.sampleRate),n=e.getChannelData(0);for(let e=0;e<n.length;e++)n[e]=(Math.random()*2-1)*Math.exp(-e/(n.length*.25));let i=t.createBufferSource();i.buffer=e;let a=t.createGain();a.gain.setValueAtTime(.1,r),a.gain.exponentialRampToValueAtTime(.001,r+.04),i.connect(a),a.connect(t.destination),i.start();let o=t.createOscillator(),s=t.createGain();o.type=`sine`,o.frequency.setValueAtTime(1100,r),o.frequency.exponentialRampToValueAtTime(750,r+.055),s.gain.setValueAtTime(.04,r),s.gain.exponentialRampToValueAtTime(.001,r+.06),o.connect(s),s.connect(t.destination),o.start(r),o.stop(r+.07)}else{let e=t.createOscillator(),n=t.createGain();e.type=`sawtooth`,e.frequency.setValueAtTime(140,r),e.frequency.exponentialRampToValueAtTime(80,r+.12),n.gain.setValueAtTime(.13,r),n.gain.exponentialRampToValueAtTime(.001,r+.14),e.connect(n),n.connect(t.destination),e.start(r),e.stop(r+.16)}}catch{}};return{correct(){r(!0)},error(){r(!1)},toggle(){return t=!t,t},get on(){return t}}})(),a=(()=>{let e=[],t=([e,t,n,r,i])=>{let a=r===`flex`,o=a||r>1,s=a?`auto`:`calc(${r} * var(--wk-u) + ${r-1} * var(--wk-gap))`,c=e===`ShiftL`?`wk_shift_l`:e===`ShiftR`?`wk_shift_r`:``,l=[`wk_key`,`wk_f_${n}`,o?`wk_wide`:``,i?`wk_home`:``,e===` `?`wk_space`:``,t.includes(`|`)?`wk_stacked`:``].filter(Boolean).join(` `),u=e===`ShiftL`||e===`ShiftR`?`Shift`:e,d=a?`style="flex:1;min-width:0;"`:`style="width:${s};flex-shrink:0;"`,f=c?`id="${c}"`:``,p=t;if(t.includes(`|`)){let[e,n]=t.split(`|`);p=`<span>${e}</span><span>${n}</span>`}return`<div class="${l}" data-wk="${u}" ${d} ${f}>${p}</div>`},a=()=>{let e=`
      <div class="wk_wrap">
        <div class="wk_keyboard">
    `;return r.forEach(n=>{e+=`<div class="wk_row">`,n.forEach(n=>{e+=t(n)}),e+=`</div>`}),e+=`</div>${o()}</div>`,e},o=()=>`
<svg class="wk_hands" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <g id="wk_hand_l" stroke-linecap="round" stroke-linejoin="round">
      <!-- Finger outlines -->
      <g stroke="#c4976d" stroke-width="70" fill="none">
        <path d="M 150,230 L 130,140" />
        <path d="M 220,210 L 200,90" />
        <path d="M 290,200 L 280,70" />
        <path d="M 360,200 L 350,100" />
        <path d="M 380,260 L 460,260" />
      </g>
      <!-- Finger fills -->
      <g stroke="#e8c39e" stroke-width="60" fill="none">
        <path d="M 150,230 L 130,140" />
        <path d="M 220,210 L 200,90" />
        <path d="M 290,200 L 280,70" />
        <path d="M 360,200 L 350,100" />
        <path d="M 380,260 L 460,260" />
      </g>
      
      <!-- Palm -->
      <path d="M 110,230 C 200,180 300,180 400,240 C 420,260 420,300 420,300 L 110,300 Z" fill="#e8c39e" stroke="#c4976d" stroke-width="10" />
      <path d="M 110,230 C 200,180 300,180 400,240 C 420,260 420,300 420,300 L 110,300 Z" fill="#e8c39e" stroke="none" />
      
      <!-- Nails -->
      <g stroke="none" opacity="0.95">
        <ellipse cx="130" cy="145" rx="14" ry="18" fill="#ef4444" transform="rotate(-10 130 145)" />
        <ellipse cx="200" cy="95" rx="15" ry="20" fill="#f97316" transform="rotate(-5 200 95)" />
        <ellipse cx="280" cy="75" rx="16" ry="21" fill="#22c55e" />
        <ellipse cx="350" cy="105" rx="15" ry="20" fill="#3b82f6" />
        <ellipse cx="455" cy="260" rx="15" ry="20" fill="#3b82f6" transform="rotate(80 455 260)" />
      </g>
    </g>
  </defs>
  <use href="#wk_hand_l" x="10" y="20" />
  <use href="#wk_hand_l" transform="translate(990, 20) scale(-1, 1)" />
</svg>
  `,s=e=>e?e===`
`||e===`Enter`?`Enter`:n[e]?n[e]:e.toLowerCase()===e?e:e.toLowerCase():null,c=e=>e?n[e]?!0:e!==e.toLowerCase():!1,l=e=>{let t=s(e);if(!t)return[];let n=[...document.querySelectorAll(`[data-wk="${CSS.escape(t)}"]`)];return c(e)&&n.push(...document.querySelectorAll(`[data-wk="Shift"]`)),n},u=e=>{document.querySelectorAll(`.wk_key.${e}`).forEach(t=>t.classList.remove(e))};return{render(e){let t=document.querySelector(e);t&&(t.innerHTML=a(),document.getElementById(`wk_sound_toggle`)?.addEventListener(`click`,()=>{let e=i.toggle(),t=document.getElementById(`wk_sound_toggle`);t&&(t.classList.toggle(`wk_muted`,!e),t.innerHTML=e?`<i class="fas fa-volume-high"></i> Sonido`:`<i class="fas fa-volume-xmark"></i> Mudo`)}))},press(t,n){n?i.correct():i.error(),e.forEach(clearTimeout),e=[],u(`wk_pressed_ok`),u(`wk_pressed_err`),u(`wk_hint`);let r=n?`wk_pressed_ok`:`wk_pressed_err`,a=l(t);a.forEach(e=>e.classList.add(r));let o=setTimeout(()=>{a.forEach(e=>e.classList.remove(r))},180);e.push(o)},hint(e){u(`wk_hint`),e&&l(e).forEach(e=>e.classList.add(`wk_hint`))},markErrors(e){e&&e.forEach(e=>{l(e).forEach(e=>{e.style.outline=`2px solid var(--error)`,e.style.outlineOffset=`1px`,e.style.backgroundColor=`color-mix(in srgb, var(--error) 20%, transparent)`})})},clear(){u(`wk_hint`),u(`wk_pressed_ok`),u(`wk_pressed_err`),e.forEach(clearTimeout),e=[],document.querySelectorAll(`.wk_key`).forEach(e=>{e.style.outline=``,e.style.backgroundColor=``})},sound:i}})();export{a as n,t};