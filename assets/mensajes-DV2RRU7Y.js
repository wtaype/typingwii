import{t as e}from"./wii-CZYUy4T7.js";import{t}from"./vendor-BDh6mtVu.js";import{a as n,b as r,d as i,i as a,v as o}from"./widev-C3qELtTZ.js";import{a as s,c,d as l,f as u,h as d,i as f,l as p,p as m,t as h}from"./firebase-By6_FWdI.js";import{db as g}from"./firebase-CiL2SFsg.js";var _=[],v=null,y=!1,b=null,x=null,S=`wi_mensajes_cache`,C=50,w=()=>i(`wiSmile`)||{},T=e=>{try{localStorage.setItem(S,JSON.stringify(e))}catch{}},E=()=>{try{return JSON.parse(localStorage.getItem(S)||`[]`)}catch{return[]}},D=()=>{let e=document.getElementById(`wmChat`);e&&requestAnimationFrame(()=>e.scrollTop=e.scrollHeight)},O=()=>{let t=w();if(!t.email)return location.replace(`/`),``;let r=t.nombre||t.usuario||t.email,i=t.foto||`/typingwii/smile.avif`,[a]=(t.tema||`Cielo|#0EBEFF`).split(`|`);return`
  <div class="wm_wrap_outer">

    <!-- ── HEADER ────────────────────────────────────── -->
    <div class="wm_header">
      <div class="wm_header_left">
        <div class="wm_hdr_avatar_wrap">
          <img class="wm_hdr_avatar"
            src="${i}" alt="${r}"
            onerror="this.src='/typingwii/smile.avif'">
          <span class="wm_hdr_online"></span>
        </div>
        <div class="wm_hdr_info">
          <h1 class="wm_hdr_title">${e} · Mensajes</h1>
          <p class="wm_hdr_sub">${n()}<strong>${r}</strong></p>
        </div>
      </div>
      <div class="wm_status" id="wm_status">
        <span class="wm_dot"></span>
        <span class="wm_dotxt">Conectando...</span>
      </div>
    </div>

    <!-- ── ZONA DE CHAT ──────────────────────────────── -->
    <div class="wm_chat" id="wmChat">${L(E(),t)}</div>

    <!-- ── INPUT ─────────────────────────────────────── -->
    <div class="wm_input_bar">
      <img class="wm_input_avatar"
        src="${i}" alt="${r}"
        onerror="this.src='/typingwii/smile.avif'">
      <div class="wm_input_wrap">
        <textarea
          id="wmNuevo"
          placeholder="Escribe un mensaje... (Enter para enviar)"
          rows="1" maxlength="500"></textarea>
        <span class="wm_count" id="wmCount">0/500</span>
      </div>
      <button id="wmEnviar" disabled class="wm_send_btn" ${o(`Enviar (Enter)`)}>
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>

    <!-- ── MODAL ELIMINAR ────────────────────────────── -->
    <div class="wm_modal" id="wmEliminar">
      <div class="wm_modal_body">
        <div class="wm_modal_ico"><i class="fas fa-trash-alt"></i></div>
        <h3>¿Eliminar mensaje?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div class="wm_modal_acts">
          <button class="wm_cancel" id="wmCancel">Cancelar</button>
          <button class="wm_confirm" id="wmConfirm">
            <i class="fas fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>

  </div>`},k=()=>{z();let e=w();if(!e.email)return;let n=e.email;t(document).on(`input.wm`,`#wmNuevo`,function(){let e=t(this).val().length;t(`#wmCount`).text(`${e}/500`),t(`#wmEnviar`).prop(`disabled`,!t(this).val().trim()),t(this).css(`height`,`auto`).css(`height`,Math.min(this.scrollHeight,150)+`px`)}).on(`keydown.wm`,`#wmNuevo`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),j(n))}).on(`click.wm`,`#wmEnviar`,()=>j(n)).on(`click.wm`,`.wm_item`,function(e){if(t(e.target).closest(`.wm_del`).length)return;let n=_.find(e=>e.id===t(this).data(`id`));n&&(r(n.mensaje,this,`¡Copiado!`),t(this).addClass(`copied`),setTimeout(()=>t(this).removeClass(`copied`),800))}).on(`click.wm`,`.wm_del`,function(e){e.stopPropagation(),v=t(this).data(`id`),t(`#wmEliminar`).addClass(`show`)}).on(`click.wm`,`#wmCancel, #wmEliminar`,e=>{t(e.target).is(`#wmCancel, #wmEliminar`)&&(t(`#wmEliminar`).removeClass(`show`),v=null)}).on(`click.wm`,`#wmConfirm`,M),A(n,!0),b=setInterval(()=>!document.hidden&&A(n,!0),3e4),x=()=>!document.hidden&&A(n,!0),document.addEventListener(`visibilitychange`,x),D()},A=async(e,n=!1)=>{try{_=(await f(c(u(g,`wiMensajes`),l(`email`,`==`,e),s(C)))).docs.map(e=>({id:e.id,...e.data()})).sort((e,t)=>(e.fecha?.seconds||0)-(t.fecha?.seconds||0)),T(_),t(`#wmChat`).html(L(_,w())),N(!0),D()}catch(e){if(console.error(`[mensajes]`,e),N(!1),!n){let e=E();e.length?(_=e,t(`#wmChat`).html(L(_,w())),a(`Mostrando caché local 📦`,`warning`,2e3)):t(`#wmChat`).html(R(`fa-wifi-slash`,`Sin conexión`,`Verifica tu internet e intenta de nuevo.`))}}},j=e=>{if(y)return;let n=t(`#wmNuevo`),r=n.val().trim();if(!r)return;y=!0;let i=w(),o=`m${Date.now()}`,s={id:o,mensaje:r,email:e,usuario:i.nombre||i.usuario||e,foto:i.foto||``,fecha:{seconds:Date.now()/1e3}};_.push(s),T(_),t(`#wmChat`).html(L(_,i)),D(),n.val(``).css(`height`,`auto`).trigger(`focus`),t(`#wmCount`).text(`0/500`),t(`#wmEnviar`).prop(`disabled`,!0),p(m(g,`wiMensajes`,o),{id:o,mensaje:r,email:e,usuario:i.nombre||i.usuario||e,foto:i.foto||``,fecha:d()}).then(()=>N(!0)).catch(e=>{console.error(`[mensajes] send:`,e),_=_.filter(e=>e.id!==o),T(_),t(`#wmChat`).html(L(_,w())),a(`Error al guardar el mensaje`,`error`)}).finally(()=>{y=!1})},M=()=>{if(!v)return;let e=v;v=null,t(`#wmEliminar`).removeClass(`show`);let n=[..._];_=_.filter(t=>t.id!==e),T(_),t(`.wm_item[data-id="${e}"]`).addClass(`deleting`),setTimeout(()=>t(`#wmChat`).html(L(_,w())),280),h(m(g,`wiMensajes`,e)).then(()=>a(`Mensaje eliminado 🗑️`,`success`,1500)).catch(e=>{console.error(`[mensajes] delete:`,e),_=n,T(_),t(`#wmChat`).html(L(_,w())),a(`Error al eliminar`,`error`)})},N=e=>{t(`.wm_dot`).removeClass(`active error`).addClass(e?`active`:`error`),t(`.wm_dotxt`).text(e?`Online`:`Offline`)},P=e=>{if(!e)return`Hoy`;let t=e.toDate?.()||new Date((e.seconds||0)*1e3),n=new Date;n.setHours(0,0,0,0);let r=new Date(n);return r.setDate(r.getDate()-1),t>=n?`Hoy`:t>=r?`Ayer`:t.toLocaleDateString(`es-PE`,{day:`numeric`,month:`long`})},F=e=>e?(e.toDate?.()||new Date((e.seconds||0)*1e3)).toLocaleTimeString(`es-PE`,{hour:`2-digit`,minute:`2-digit`}):`Ahora`,I=e=>String(e||``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`})[e]),L=(e,t={})=>{if(!e?.length)return R(`fa-comment-dots`,`¡Tu buzón está vacío!`,`Escribe tu primer mensaje y aparecerá aquí 👇`);let n=`/typingwii/smile.avif`;t.foto;let r=``;return e.map(e=>{let t=P(e.fecha),i=t===r?``:`<div class="wm_sep"><span>${t}</span></div>`;r=t;let a=e.foto||n;return`${i}
    <div class="wm_item" data-id="${e.id}" ${o(`Click para copiar`)}>
      <img class="wm_bubble_avatar"
        src="${a}" alt="${I(e.usuario||``)}"
        onerror="this.src='${n}'">
      <div class="wm_bubble_wrap">
        <div class="wm_bubble">
          <p class="wm_txt">${I(e.mensaje).replace(/\n/g,`<br>`)}</p>
          <div class="wm_foot">
            <span class="wm_time">${F(e.fecha)}</span>
            <i class="fas fa-check-double wm_check"></i>
          </div>
        </div>
      </div>
      <button class="wm_del" data-id="${e.id}" ${o(`Eliminar`)}>
        <i class="fas fa-trash"></i>
      </button>
    </div>`}).join(``)},R=(e,t,n)=>`
  <div class="wm_empty">
    <i class="fas ${e}"></i>
    <p>${t}</p>
    <span>${n}</span>
  </div>`,z=()=>{clearInterval(b),b=null,x&&=(document.removeEventListener(`visibilitychange`,x),null),t(document).off(`.wm`),_=[],v=null,y=!1};export{z as cleanup,k as init,O as render};