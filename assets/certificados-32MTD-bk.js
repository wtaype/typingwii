import{t as e}from"./vendor-BDh6mtVu.js";import{d as t,i as n,s as r}from"./widev-Rm_DE4JR.js";import{t as i}from"./wii-k5y-1NE-.js";import{c as a,d as o,i as s,p as c}from"./firebase-sojJ90-r.js";import{n as l}from"./firebase-DsbKBtA3.js";var u=()=>t(`wiSmile`),d=45,f=80,p=()=>u()?`
  <div class="ct_page">

    <!-- HERO CORPORATIVO PRO -->
    <div class="ct_hero">
      <div class="ct_hero_left">
        <div class="ct_hero_icon"><i class="fas fa-award"></i></div>
        <div class="ct_hero_txt">
          <div class="ct_badge"><i class="fas fa-building"></i> Panel Empresarial</div>
          <h1 class="ct_hero_title">Certificaciones</h1>
          <p class="ct_hero_sub">Genera y descarga los diplomas oficiales de mecanografía de tu equipo.</p>
        </div>
      </div>
      <div class="ct_hero_stats" id="ct_hero_stats">
        <div class="ct_h_stat"><div class="ct_h_val">-</div><div class="ct_h_lbl">Elegibles</div></div>
      </div>
    </div>

    <!-- GRID DE EMPLEADOS -->
    <div class="ct_grid" id="ct_grid">
      <div class="ct_empty" style="grid-column: 1 / -1">
        <i class="fas fa-spinner fa-spin"></i><p>Buscando candidatos...</p>
      </div>
    </div>

    <!-- CONTENEDOR MODALES -->
    <div id="ct_modales"></div>

  </div>`:`<div class="ct_page"><div class="ct_empty"><i class="fas fa-lock"></i><p>Sin sesión corporativa.</p></div></div>`,m=[],h=async()=>{let t=u();t&&(e(document).off(`.ct`),await _(t),e(document).on(`click.ct`,`.ct_modal_close`,_cerrarModales),e(document).on(`click.ct`,`.ct_modal_bg`,t=>{e(t.target).hasClass(`ct_modal_bg`)&&_cerrarModales()}),e(document).on(`click.ct`,`.ct_btn.descargar`,function(){let t=e(this).data(`u`),n=m.find(e=>e.usuario===t);n&&y(n)}),e(document).on(`click.ct`,`#ct_btn_dl_canvas`,function(){let t=document.getElementById(`ct_canvas`),r=e(this).data(`nom`).replace(/[^a-z0-9]/gi,`_`).toLowerCase();if(!t)return;let i=document.createElement(`a`);i.download=`Certificado_TypingWii_${r}.png`,i.href=t.toDataURL(`image/png`),i.click(),n(`Descarga iniciada`,`success`)}))},g=()=>{e(document).off(`.ct`)};async function _(t){try{let e=await s(a(c(l,`lecciones`),o(`empresa_id`,`==`,t.usuario)));e.empty&&(e=await s(a(c(l,`lecciones`),o(`gestor_id`,`==`,t.usuario)))),m=e.docs.map(e=>({usuario:e.id,...e.data()})),v()}catch(t){console.error(`[cert] Error:`,t),e(`#ct_grid`).html(`<div class="ct_empty" style="grid-column: 1 / -1"><i class="fas fa-exclamation-triangle"></i><p>Error de conexión.</p></div>`)}}function v(){if(!m.length){e(`#ct_grid`).html(`
      <div class="ct_empty" style="grid-column: 1 / -1">
        <i class="fas fa-folder-open"></i><p>No hay colaboradores registrados.</p>
      </div>`);return}let t=0,n=m.map(e=>{let n=e.nombre||e.usuario||`—`,i=r(n),a=e.equipo_id||e.clase_id||e.claseId||`General`,o=e.completadas?.length||0,s=e.wpmMax||0,c=Math.min(o/d*100,100),l=Math.min(s/f*100,100),u=Math.round((c+l)/2),p=o>=d&&s>=f;return p&&t++,`
      <div class="ct_card ${p?`ok`:`locked`}">
        <div class="ct_card_badge ${p?`ok`:`no`}">
          ${p?`<i class="fas fa-check-circle"></i> Aprobado`:`<i class="fas fa-lock"></i> Entrenando`}
        </div>
        
        <div class="ct_avatar">${p?`🏆`:i}</div>
        <div class="ct_nom">${n}</div>
        <div class="ct_dep"><i class="fas fa-building"></i> ${a}</div>

        <div class="ct_prog">
          <div class="ct_p_info"><span>Req: 45 Lecs & ${f} WPM</span> <span>${u}%</span></div>
          <div class="ct_p_trk"><div class="ct_p_fil" style="width:${u}%"></div></div>
        </div>

        <button class="ct_btn ${p?`descargar`:`bloqueado`}" data-u="${e.usuario}" ${p?``:`disabled`}>
          ${p?`<i class="fas fa-print"></i> Ver Diploma`:`<i class="fas fa-times-circle"></i> No Elegible`}
        </button>
      </div>`}).join(``);e(`#ct_grid`).html(n),e(`#ct_hero_stats`).html(`
    <div class="ct_h_stat"><div class="ct_h_val">${t}</div><div class="ct_h_lbl">Certificados</div></div>
    <div class="ct_h_stat"><div class="ct_h_val">${m.length}</div><div class="ct_h_lbl">Total</div></div>
  `)}function y(t){let n=t.nombre||t.usuario,r=t.wpmMax||0,i=new Date().toLocaleDateString(`es-PE`,{day:`2-digit`,month:`long`,year:`numeric`});t.ultPractica?.toDate&&(i=t.ultPractica.toDate().toLocaleDateString(`es-PE`,{day:`2-digit`,month:`long`,year:`numeric`})),e(`#ct_modales`).html(`
    <div class="ct_modal_bg">
      <div class="ct_modal_wrap">
        <div class="ct_modal_head">
          <h3><i class="fas fa-certificate"></i> Vista Previa del Certificado</h3>
          <button class="ct_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="ct_canvas_frame">
          <canvas id="ct_canvas" width="1200" height="848"></canvas>
        </div>
        <div class="ct_modal_foot">
          <button class="ct_btn_dl" id="ct_btn_dl_canvas" data-nom="${n}">
            <i class="fas fa-download"></i> Descargar Imagen (PNG)
          </button>
        </div>
      </div>
    </div>`),setTimeout(()=>b(n,r,i),100)}function b(e,t,n){let r=document.getElementById(`ct_canvas`);if(!r)return;let a=1200,o=r.getContext(`2d`),s=o.createLinearGradient(0,0,a,848);s.addColorStop(0,`#0f172a`),s.addColorStop(.45,`#1e1b4b`),s.addColorStop(1,`#0f172a`),o.fillStyle=s,o.fillRect(0,0,a,848),o.fillStyle=`rgba(255,255,255,.025)`;for(let e=20;e<a;e+=30)for(let t=20;t<848;t+=30)o.beginPath(),o.arc(e,t,1.5,0,Math.PI*2),o.fill();x(o,20,20,a-40,808,18,`rgba(245,158,11,.4)`,1.5),x(o,32,32,a-64,784,12,`rgba(245,158,11,.15)`,1),C(o,50,50,60),C(o,a-50,50,60,!0),C(o,50,798,60,!1,!0),C(o,a-50,798,60,!0,!0),o.textAlign=`center`,o.fillStyle=`#f59e0b`,o.font=`bold 22px "Segoe UI", Arial, sans-serif`,o.letterSpacing=`8px`,o.fillText(`⌨ TYPINGWII`,a/2,100),o.letterSpacing=`0`,S(o,a/2,115,220),o.fillStyle=`#fff`,o.font=`bold 58px "Georgia", serif`,o.fillText(`CERTIFICADO`,a/2,195),o.fillStyle=`rgba(255,255,255,.55)`,o.font=`italic 22px "Georgia", serif`,o.fillText(`DE MECANOGRAFÍA PROFESIONAL`,a/2,232),o.fillStyle=`rgba(255,255,255,.5)`,o.font=`18px "Segoe UI", Arial, sans-serif`,o.fillText(`Se certifica que`,a/2,295);let c=o.createLinearGradient(a/2-300,0,a/2+300,0);c.addColorStop(0,`#fcd34d`),c.addColorStop(.5,`#fff`),c.addColorStop(1,`#fcd34d`),o.fillStyle=c;let l=52;for(o.font=`bold ${l}px "Georgia", serif`;o.measureText(e).width>a-160&&l>28;)l-=2,o.font=`bold ${l}px "Georgia", serif`;o.fillText(e,a/2,365),S(o,a/2,385,350,`rgba(245,158,11,.3)`),o.fillStyle=`rgba(255,255,255,.6)`,o.font=`18px "Segoe UI", Arial, sans-serif`,o.fillText(`ha completado exitosamente el programa de mecanografía de`,a/2,430),o.fillStyle=`#f59e0b`,o.font=`bold 22px "Segoe UI", Arial, sans-serif`,o.fillText(`${i} Empresarial — 45 Lecciones`,a/2,462),w(o,a/2-200,545,`${t}`,`WPM Alcanzados`),w(o,a/2,545,`45`,`Lecciones`),w(o,a/2+200,545,`10`,`Niveles`),o.strokeStyle=`rgba(245,158,11,.2)`,o.lineWidth=1,o.beginPath(),o.moveTo(80,620),o.lineTo(a-80,620),o.stroke(),o.textAlign=`center`,o.fillStyle=`rgba(255,255,255,.4)`,o.font=`16px "Segoe UI", Arial, sans-serif`,o.fillText(`Emitido el ${n}`,a/2,660),T(o,a/2-160,710,`🏆`,`Certificado`),T(o,a/2,710,`⌨️`,`Mecanografía`),T(o,a/2+160,710,`⭐`,`80+ WPM`),o.fillStyle=`rgba(255,255,255,.25)`,o.font=`13px "Segoe UI", Arial, sans-serif`,o.fillText(`typingwii.com`,a/2,820)}function x(e,t,n,r,i,a,o,s){e.strokeStyle=o,e.lineWidth=s,e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.quadraticCurveTo(t+r,n,t+r,n+a),e.lineTo(t+r,n+i-a),e.quadraticCurveTo(t+r,n+i,t+r-a,n+i),e.lineTo(t+a,n+i),e.quadraticCurveTo(t,n+i,t,n+i-a),e.lineTo(t,n+a),e.quadraticCurveTo(t,n,t+a,n),e.closePath(),e.stroke()}function S(e,t,n,r,i=`#f59e0b`){let a=e.createLinearGradient(t-r,n,t+r,n);a.addColorStop(0,`transparent`),a.addColorStop(.3,i),a.addColorStop(.7,i),a.addColorStop(1,`transparent`),e.strokeStyle=a,e.lineWidth=1.5,e.beginPath(),e.moveTo(t-r,n),e.lineTo(t+r,n),e.stroke()}function C(e,t,n,r,i=!1,a=!1){e.save(),e.translate(t,n),i&&e.scale(-1,1),a&&e.scale(1,-1),e.strokeStyle=`rgba(245,158,11,.45)`,e.lineWidth=1.5,e.beginPath(),e.moveTo(0,0),e.lineTo(r,0),e.moveTo(0,0),e.lineTo(0,r),e.moveTo(8,8),e.lineTo(r*.5,8),e.moveTo(8,8),e.lineTo(8,r*.5),e.stroke(),e.fillStyle=`#f59e0b`,e.beginPath(),e.arc(8,8,4,0,Math.PI*2),e.fill(),e.restore()}function w(e,t,n,r,i){e.textAlign=`center`;let a=e.createLinearGradient(t-40,n-50,t+40,n);a.addColorStop(0,`#fcd34d`),a.addColorStop(1,`#f59e0b`),e.fillStyle=a,e.font=`bold 48px "Georgia", serif`,e.fillText(r,t,n),e.fillStyle=`rgba(255,255,255,.5)`,e.font=`15px "Segoe UI", Arial, sans-serif`,e.letterSpacing=`3px`,e.fillText(i.toUpperCase(),t,n+28),e.letterSpacing=`0`}function T(e,t,n,r,i){e.textAlign=`center`,e.font=`26px serif`,e.fillText(r,t,n),e.fillStyle=`rgba(255,255,255,.35)`,e.font=`13px "Segoe UI", Arial, sans-serif`,e.fillText(i,t,n+22)}export{g as cleanup,h as init,p as render};