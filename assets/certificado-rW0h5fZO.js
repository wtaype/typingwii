import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,d as n}from"./widev-BVXcYvSP.js";import{t as r}from"./wii-9R-ZUv6c.js";var i=45,a=80,o=()=>n(`wiSmile`),s=()=>{let e=o();if(!e)return`<div class="cert_page">
    <div class="cert_hero"><div class="cert_hero_orb"></div>
      <div class="cert_hero_left">
        <div class="cert_hero_badge"><i class="fas fa-certificate"></i> Certificado</div>
        <h1 class="cert_hero_title">Tu <span>Certificado</span></h1>
        <p class="cert_hero_sub">Inicia sesión para ver tu estado.</p>
      </div>
    </div></div>`;let t=n(`wiProgreso`)||{},r=t.leccionesOk||[],s=t.wpmRecord||0,c=r.length,l=c>=i,u=s>=a,d=l&&u;return`${e.nombre||``} ${e.apellidos||``}`.trim()||e.usuario,`
  <div class="cert_page">

    <!-- HERO -->
    <div class="cert_hero">
      <div class="cert_hero_orb"></div>
      <div class="cert_hero_left">
        <div class="cert_hero_badge"><i class="fas fa-certificate"></i> Certificado</div>
        <h1 class="cert_hero_title">Tu <span>Certificado</span> de Mecanografía</h1>
        <p class="cert_hero_sub">${d?`🎉 ¡Felicitaciones! Has cumplido todos los requisitos.`:`Completa los requisitos para desbloquear tu certificado.`}</p>
      </div>
      <div class="cert_hero_ico">
        <i class="fas ${d?`fa-award`:`fa-lock`}"></i>
      </div>
    </div>

    <!-- REQUISITOS -->
    <div class="cert_req_card">
      <div class="cert_req_title"><i class="fas fa-clipboard-check"></i> Requisitos para certificar</div>
      <div class="cert_req_list">

        <!-- Requisito 1: Lecciones -->
        <div class="cert_req_item ${l?`ok`:`no`}">
          <div class="cert_req_ico">
            <i class="fas ${l?`fa-check`:`fa-graduation-cap`}"></i>
          </div>
          <div class="cert_req_body">
            <div class="cert_req_lbl">Completar las 45 lecciones</div>
            <div class="cert_req_sub">${l?`¡Todas las lecciones completadas!`:`Te faltan ${i-c} lección${i-c===1?``:`es`} por completar.`}</div>
            <div class="cert_req_bar_wrap">
              <div class="cert_req_bar_fill" id="cert_bar_lec"
                style="width:${Math.min(c/i*100,100)}%"></div>
            </div>
          </div>
          <div class="cert_req_val">
            ${c}<small>/ ${i}</small>
          </div>
        </div>

        <!-- Requisito 2: WPM -->
        <div class="cert_req_item ${u?`ok`:`no`}">
          <div class="cert_req_ico">
            <i class="fas ${u?`fa-check`:`fa-bolt`}"></i>
          </div>
          <div class="cert_req_body">
            <div class="cert_req_lbl">Alcanzar mínimo ${a} WPM</div>
            <div class="cert_req_sub">${u?`¡Excelente! Tu récord es de ${s} WPM. 🚀`:`Tu récord actual es ${s||0} WPM. Te faltan ${a-s} WPM más.`}</div>
            <div class="cert_req_bar_wrap">
              <div class="cert_req_bar_fill" id="cert_bar_wpm"
                style="width:${Math.min(s/a*100,100)}%"></div>
            </div>
          </div>
          <div class="cert_req_val">
            ${s||0}<small>WPM</small>
          </div>
        </div>

      </div>
    </div>

    <!-- MENSAJE ORIENTADOR o VISTA PREVIA -->
    ${d?`
      <div class="cert_preview_wrap">
        <div class="cert_canvas_frame">
          <canvas id="cert_canvas" width="1200" height="848"></canvas>
        </div>
        <div class="cert_download_row">
          <button class="cert_dl_btn primary" id="cert_dl_png">
            <i class="fas fa-download"></i> Descargar PNG
          </button>
          <button class="cert_dl_btn ghost" id="cert_compartir">
            <i class="fas fa-share-alt"></i> Compartir
          </button>
        </div>
      </div>
    `:`
      <div class="cert_tip">
        <i class="fas fa-lightbulb"></i>
        <span>
          ${l?`Practica en modo libre para mejorar tu WPM en <a class="nv_item" href="/comenzar" data-page="comenzar">Comenzar</a>.`:`Practica más lecciones en <a class="nv_item" href="/lecciones" data-page="lecciones">Lecciones</a> para avanzar.`}
        </span>
      </div>
    `}

  </div>`},c=()=>{let s=o();if(!s)return;let c=n(`wiProgreso`)||{},l=c.leccionesOk||[],d=c.wpmRecord||0,f=l.length>=i&&d>=a;e(document).off(`.cert`),e(document).on(`click.cert`,`.nv_item`,function(n){n.preventDefault();let r=e(this).data(`page`);r&&t(async()=>{let{rutas:e}=await import(`./ruta-CS1Lu3Aw.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/${r}`))}),f&&(u(`${s.nombre||``} ${s.apellidos||``}`.trim()||s.usuario||`Estudiante`,d,new Date().toLocaleDateString(`es-PE`,{day:`2-digit`,month:`long`,year:`numeric`})),e(document).on(`click.cert`,`#cert_dl_png`,()=>{let e=document.getElementById(`cert_canvas`);if(!e)return;let t=document.createElement(`a`);t.download=`certificado-typingwii-${s.usuario}.png`,t.href=e.toDataURL(`image/png`),t.click()}),e(document).on(`click.cert`,`#cert_compartir`,async()=>{let e=document.getElementById(`cert_canvas`);if(e)try{e.toBlob(async e=>{let t=new File([e],`certificado-typingwii.png`,{type:`image/png`});navigator.canShare?.({files:[t]})?await navigator.share({title:`Mi certificado de ${r}`,files:[t]}):document.getElementById(`cert_dl_png`)?.click()},`image/png`)}catch(e){e.name!==`AbortError`&&console.error(`[cert] Error compartir:`,e)}}))},l=()=>{e(document).off(`.cert`)};function u(e,t,n){let i=document.getElementById(`cert_canvas`);if(!i)return;let a=1200;i.width=a,i.height=848;let o=i.getContext(`2d`),s=o.createLinearGradient(0,0,a,848);s.addColorStop(0,`#0f172a`),s.addColorStop(.45,`#1e1b4b`),s.addColorStop(1,`#0f172a`),o.fillStyle=s,o.fillRect(0,0,a,848),o.fillStyle=`rgba(255,255,255,.025)`;for(let e=20;e<a;e+=30)for(let t=20;t<848;t+=30)o.beginPath(),o.arc(e,t,1.5,0,Math.PI*2),o.fill();d(o,20,20,a-40,808,18,`rgba(245,158,11,.4)`,1.5),d(o,32,32,a-64,784,12,`rgba(245,158,11,.15)`,1),p(o,50,50,60),p(o,a-50,50,60,!0),p(o,50,798,60,!1,!0),p(o,a-50,798,60,!0,!0),o.textAlign=`center`,o.fillStyle=`#f59e0b`,o.font=`bold 22px "Segoe UI", Arial, sans-serif`,o.letterSpacing=`8px`,o.fillText(`⌨ TYPINGWII`,a/2,100),o.letterSpacing=`0`,f(o,a/2,115,220),o.fillStyle=`#fff`,o.font=`bold 58px "Georgia", serif`,o.fillText(`CERTIFICADO`,a/2,195),o.fillStyle=`rgba(255,255,255,.55)`,o.font=`italic 22px "Georgia", serif`,o.fillText(`DE MECANOGRAFÍA PROFESIONAL`,a/2,232),o.fillStyle=`rgba(255,255,255,.5)`,o.font=`18px "Segoe UI", Arial, sans-serif`,o.fillText(`Se certifica que`,a/2,295);let c=o.createLinearGradient(a/2-300,0,a/2+300,0);c.addColorStop(0,`#fcd34d`),c.addColorStop(.5,`#fff`),c.addColorStop(1,`#fcd34d`),o.fillStyle=c,o.font=`bold 52px "Georgia", serif`,a-160;let l=52;for(;o.measureText(e).width>1040&&l>28;)l-=2,o.font=`bold ${l}px "Georgia", serif`;o.fillText(e,a/2,365),f(o,a/2,385,350,`rgba(245,158,11,.3)`),o.fillStyle=`rgba(255,255,255,.6)`,o.font=`18px "Segoe UI", Arial, sans-serif`,o.fillText(`ha completado exitosamente el programa de mecanografía de`,a/2,430),o.fillStyle=`#f59e0b`,o.font=`bold 22px "Segoe UI", Arial, sans-serif`,o.fillText(`${r} — 45 Lecciones Progresivas`,a/2,462),a/2-200,a/2,a/2+200,m(o,400,545,`${t}`,`WPM Alcanzados`),m(o,600,545,`45`,`Lecciones`),m(o,800,545,`10`,`Niveles`),o.strokeStyle=`rgba(245,158,11,.2)`,o.lineWidth=1,o.beginPath(),o.moveTo(80,620),o.lineTo(a-80,620),o.stroke(),o.textAlign=`center`,o.fillStyle=`rgba(255,255,255,.4)`,o.font=`16px "Segoe UI", Arial, sans-serif`,o.fillText(`Emitido el ${n}`,a/2,660),h(o,a/2-160,710,`🏆`,`Maestro`),h(o,a/2,710,`⌨️`,`Mecanografía`),h(o,a/2+160,710,`⭐`,`80+ WPM`),o.fillStyle=`rgba(255,255,255,.25)`,o.font=`13px "Segoe UI", Arial, sans-serif`,o.fillText(`typingwii.com`,a/2,820)}function d(e,t,n,r,i,a,o,s){e.strokeStyle=o,e.lineWidth=s,e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.quadraticCurveTo(t+r,n,t+r,n+a),e.lineTo(t+r,n+i-a),e.quadraticCurveTo(t+r,n+i,t+r-a,n+i),e.lineTo(t+a,n+i),e.quadraticCurveTo(t,n+i,t,n+i-a),e.lineTo(t,n+a),e.quadraticCurveTo(t,n,t+a,n),e.closePath(),e.stroke()}function f(e,t,n,r,i=`#f59e0b`){let a=e.createLinearGradient(t-r,n,t+r,n);a.addColorStop(0,`transparent`),a.addColorStop(.3,i),a.addColorStop(.7,i),a.addColorStop(1,`transparent`),e.strokeStyle=a,e.lineWidth=1.5,e.beginPath(),e.moveTo(t-r,n),e.lineTo(t+r,n),e.stroke()}function p(e,t,n,r,i=!1,a=!1){e.save(),e.translate(t,n),i&&e.scale(-1,1),a&&e.scale(1,-1),e.strokeStyle=`rgba(245,158,11,.45)`,e.lineWidth=1.5,e.beginPath(),e.moveTo(0,0),e.lineTo(r,0),e.moveTo(0,0),e.lineTo(0,r),e.moveTo(8,8),e.lineTo(r*.5,8),e.moveTo(8,8),e.lineTo(8,r*.5),e.stroke(),e.fillStyle=`#f59e0b`,e.beginPath(),e.arc(8,8,4,0,Math.PI*2),e.fill(),e.restore()}function m(e,t,n,r,i){e.textAlign=`center`;let a=e.createLinearGradient(t-40,n-50,t+40,n);a.addColorStop(0,`#fcd34d`),a.addColorStop(1,`#f59e0b`),e.fillStyle=a,e.font=`bold 48px "Georgia", serif`,e.fillText(r,t,n),e.fillStyle=`rgba(255,255,255,.5)`,e.font=`15px "Segoe UI", Arial, sans-serif`,e.letterSpacing=`3px`,e.fillText(i.toUpperCase(),t,n+28),e.letterSpacing=`0`}function h(e,t,n,r,i){e.textAlign=`center`,e.font=`26px serif`,e.fillText(r,t,n),e.fillStyle=`rgba(255,255,255,.35)`,e.font=`13px "Segoe UI", Arial, sans-serif`,e.fillText(i,t,n+22)}export{l as cleanup,c as init,s as render};