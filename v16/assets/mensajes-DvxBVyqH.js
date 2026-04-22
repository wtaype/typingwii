import{t as e}from"./vendor-BDh6mtVu.js";import{a as t,b as n,d as r,i,v as a}from"./widev-wm2uL2fS.js";import{t as o}from"./wii-9R-ZUv6c.js";import{a as s,c,d as l,f as u,h as d,i as f,l as p,p as m,t as h}from"./firebase-CcmtvWrk.js";import{db as g}from"./firebase-C1IGFCyV.js";var _=[],v=null,y=!1,b=null,x=null,S=`wi_mensajes_cache`,C=50,w=()=>r(`wiSmile`)||{},T=e=>{try{localStorage.setItem(S,JSON.stringify(e))}catch{}},E=()=>{try{return JSON.parse(localStorage.getItem(S)||`[]`)}catch{return[]}},D=()=>{let e=document.getElementById(`wmChat`);e&&requestAnimationFrame(()=>e.scrollTop=e.scrollHeight)},O=()=>{let e=w();if(!e.email)return location.replace(`/`),``;let n=e.nombre||e.usuario||e.email,r=e.foto||`/typingwii/v16/smile.avif`,[i]=(e.tema||`Cielo|#0EBEFF`).split(`|`);return`
  <div class="wm_wrap_outer">

    <!-- ── HEADER ────────────────────────────────────── -->
    <div class="wm_header">
      <div class="wm_header_left">
        <div class="wm_hdr_avatar_wrap">
          <img class="wm_hdr_avatar"
            src="${r}" alt="${n}"
            onerror="this.src='/typingwii/v16/smile.avif'">
          <span class="wm_hdr_online"></span>
        </div>
        <div class="wm_hdr_info">
          <h1 class="wm_hdr_title">${o} · Mensajes</h1>
          <p class="wm_hdr_sub">${t()}<strong>${n}</strong></p>
        </div>
      </div>
      <div class="wm_status" id="wm_status">
        <span class="wm_dot"></span>
        <span class="wm_dotxt">Conectando...</span>
      </div>
    </div>

    <!-- ── ZONA DE CHAT ──────────────────────────────── -->
    <div class="wm_chat" id="wmChat">${L(E(),e)}</div>

    <!-- ── INPUT ─────────────────────────────────────── -->
    <div class="wm_input_bar">
      <img class="wm_input_avatar"
        src="${r}" alt="${n}"
        onerror="this.src='/typingwii/v16/smile.avif'">
      <div class="wm_input_wrap">
        <textarea
          id="wmNuevo"
          placeholder="Escribe un mensaje... (Enter para enviar)"
          rows="1" maxlength="500"></textarea>
        <span class="wm_count" id="wmCount">0/500</span>
      </div>
      <button id="wmEnviar" disabled class="wm_send_btn" ${a(`Enviar (Enter)`)}>
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

  </div>`},k=()=>{z();let t=w();if(!t.email)return;let r=t.email;e(document).on(`input.wm`,`#wmNuevo`,function(){let t=e(this).val().length;e(`#wmCount`).text(`${t}/500`),e(`#wmEnviar`).prop(`disabled`,!e(this).val().trim()),e(this).css(`height`,`auto`).css(`height`,Math.min(this.scrollHeight,150)+`px`)}).on(`keydown.wm`,`#wmNuevo`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),j(r))}).on(`click.wm`,`#wmEnviar`,()=>j(r)).on(`click.wm`,`.wm_item`,function(t){if(e(t.target).closest(`.wm_del`).length)return;let r=_.find(t=>t.id===e(this).data(`id`));r&&(n(r.mensaje,this,`¡Copiado!`),e(this).addClass(`copied`),setTimeout(()=>e(this).removeClass(`copied`),800))}).on(`click.wm`,`.wm_del`,function(t){t.stopPropagation(),v=e(this).data(`id`),e(`#wmEliminar`).addClass(`show`)}).on(`click.wm`,`#wmCancel, #wmEliminar`,t=>{e(t.target).is(`#wmCancel, #wmEliminar`)&&(e(`#wmEliminar`).removeClass(`show`),v=null)}).on(`click.wm`,`#wmConfirm`,M),A(r,!0),b=setInterval(()=>!document.hidden&&A(r,!0),3e4),x=()=>!document.hidden&&A(r,!0),document.addEventListener(`visibilitychange`,x),D()},A=async(t,n=!1)=>{try{_=(await f(c(u(g,`wiMensajes`),l(`email`,`==`,t),s(C)))).docs.map(e=>({id:e.id,...e.data()})).sort((e,t)=>(e.fecha?.seconds||0)-(t.fecha?.seconds||0)),T(_),e(`#wmChat`).html(L(_,w())),N(!0),D()}catch(t){if(console.error(`[mensajes]`,t),N(!1),!n){let t=E();t.length?(_=t,e(`#wmChat`).html(L(_,w())),i(`Mostrando caché local 📦`,`warning`,2e3)):e(`#wmChat`).html(R(`fa-wifi-slash`,`Sin conexión`,`Verifica tu internet e intenta de nuevo.`))}}},j=t=>{if(y)return;let n=e(`#wmNuevo`),r=n.val().trim();if(!r)return;y=!0;let a=w(),o=`m${Date.now()}`,s={id:o,mensaje:r,email:t,usuario:a.nombre||a.usuario||t,foto:a.foto||``,fecha:{seconds:Date.now()/1e3}};_.push(s),T(_),e(`#wmChat`).html(L(_,a)),D(),n.val(``).css(`height`,`auto`).trigger(`focus`),e(`#wmCount`).text(`0/500`),e(`#wmEnviar`).prop(`disabled`,!0),p(m(g,`wiMensajes`,o),{id:o,mensaje:r,email:t,usuario:a.nombre||a.usuario||t,foto:a.foto||``,fecha:d()}).then(()=>N(!0)).catch(t=>{console.error(`[mensajes] send:`,t),_=_.filter(e=>e.id!==o),T(_),e(`#wmChat`).html(L(_,w())),i(`Error al guardar el mensaje`,`error`)}).finally(()=>{y=!1})},M=()=>{if(!v)return;let t=v;v=null,e(`#wmEliminar`).removeClass(`show`);let n=[..._];_=_.filter(e=>e.id!==t),T(_),e(`.wm_item[data-id="${t}"]`).addClass(`deleting`),setTimeout(()=>e(`#wmChat`).html(L(_,w())),280),h(m(g,`wiMensajes`,t)).then(()=>i(`Mensaje eliminado 🗑️`,`success`,1500)).catch(t=>{console.error(`[mensajes] delete:`,t),_=n,T(_),e(`#wmChat`).html(L(_,w())),i(`Error al eliminar`,`error`)})},N=t=>{e(`.wm_dot`).removeClass(`active error`).addClass(t?`active`:`error`),e(`.wm_dotxt`).text(t?`Online`:`Offline`)},P=e=>{if(!e)return`Hoy`;let t=e.toDate?.()||new Date((e.seconds||0)*1e3),n=new Date;n.setHours(0,0,0,0);let r=new Date(n);return r.setDate(r.getDate()-1),t>=n?`Hoy`:t>=r?`Ayer`:t.toLocaleDateString(`es-PE`,{day:`numeric`,month:`long`})},F=e=>e?(e.toDate?.()||new Date((e.seconds||0)*1e3)).toLocaleTimeString(`es-PE`,{hour:`2-digit`,minute:`2-digit`}):`Ahora`,I=e=>String(e||``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`})[e]),L=(e,t={})=>{if(!e?.length)return R(`fa-comment-dots`,`¡Tu buzón está vacío!`,`Escribe tu primer mensaje y aparecerá aquí 👇`);let n=`/typingwii/v16/smile.avif`;t.foto;let r=``;return e.map(e=>{let t=P(e.fecha),i=t===r?``:`<div class="wm_sep"><span>${t}</span></div>`;r=t;let o=e.foto||n;return`${i}
    <div class="wm_item" data-id="${e.id}" ${a(`Click para copiar`)}>
      <img class="wm_bubble_avatar"
        src="${o}" alt="${I(e.usuario||``)}"
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
      <button class="wm_del" data-id="${e.id}" ${a(`Eliminar`)}>
        <i class="fas fa-trash"></i>
      </button>
    </div>`}).join(``)},R=(e,t,n)=>`
  <div class="wm_empty">
    <i class="fas ${e}"></i>
    <p>${t}</p>
    <span>${n}</span>
  </div>`,z=()=>{clearInterval(b),b=null,x&&=(document.removeEventListener(`visibilitychange`,x),null),e(document).off(`.wm`),_=[],v=null,y=!1};export{z as cleanup,k as init,O as render};