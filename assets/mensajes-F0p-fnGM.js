import{t as e}from"./vendor-BykwZZMm.js";import{d as t,n,o as r,p as i,r as a}from"./widev-xCaicnMn.js";import{t as o}from"./wii-BjvkTm-Q.js";import{t as s}from"./ruta-Ck6o1HPb.js";import{a as c,d as l,i as u,l as d,m as f,n as p,o as m,s as h,u as g}from"./firebase-DxKr4V-p.js";import{n as _,t as v}from"./firebase-CKhCNoOL.js";var y=[],b=null,x=!1,S=null,C=null,w=`wi_mensajes_cache`,T=50,E=()=>r(`wiSmile`)||{},D=e=>{try{localStorage.setItem(w,JSON.stringify(e))}catch{}},O=()=>{try{return JSON.parse(localStorage.getItem(w)||`[]`)}catch{return[]}},k=()=>{let e=document.getElementById(`wmChat`);e&&requestAnimationFrame(()=>e.scrollTop=e.scrollHeight)},A=()=>{let e=E();if(!e.email)return location.replace(`/`),``;let n=e.nombre||e.usuario||e.email||v.currentUser?.email||``;return`
  <div class="wm_container">
    <div class="wm_header">
      <div class="wm_info">
        <img src="/smile.avif" alt="${o}" class="wm_avatar" />
        <div class="wm_text">
          <h1>Mis Mensajes</h1>
          <p>${a()} <strong>${n}</strong></p>
        </div>
      </div>
      <div class="wm_status">
        <span class="wm_dot"></span>
        <span class="wm_dotxt">Conectando...</span>
      </div>
    </div>

    <div class="wm_chat" id="wmChat">${R(O())}</div>

    <div class="wm_input">
      <div class="wm_wrap">
        <textarea id="wmNuevo" placeholder="Escribe un mensaje." rows="1" maxlength="500"></textarea>
        <span class="wm_count" id="wmCount">0/500</span>
      </div>
      <button id="wmEnviar" disabled ${t(`Enviar · Enter`)}><i class="fas fa-paper-plane"></i></button>
    </div>

    <div class="wm_modal" id="wmEliminar">
      <div class="wm_modal_body">
        <i class="fas fa-trash-alt"></i>
        <h3>¿Eliminar mensaje?</h3>
        <p>Esta acción no se puede deshacer</p>
        <div class="wm_modal_acts">
          <button class="wm_cancel" id="wmCancel">Cancelar</button>
          <button class="wm_confirm" id="wmConfirm">Eliminar</button>
        </div>
      </div>
    </div>
  </div>`},j=()=>{V();let t=E();if(!t.email)return s.navigate(`/`);let n=t.email||v.currentUser?.email;e(document).on(`input.wm`,`#wmNuevo`,function(){e(`#wmCount`).text(`${e(this).val().length}/500`),e(`#wmEnviar`).prop(`disabled`,!e(this).val().trim()),e(this).css(`height`,`auto`).css(`height`,Math.min(this.scrollHeight,150)+`px`)}).on(`keydown.wm`,`#wmNuevo`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),N(n))}).on(`click.wm`,`#wmEnviar`,()=>N(n)).on(`click.wm`,`.wm_item`,function(t){if(e(t.target).closest(`.wm_del`).length)return;let n=y.find(t=>t.id===e(this).data(`id`));n&&(i(n.mensaje,this,`¡Copiado! <i class="fas fa-check-circle"></i>`),e(this).addClass(`copied`),setTimeout(()=>e(this).removeClass(`copied`),800))}).on(`click.wm`,`.wm_del`,function(t){t.stopPropagation(),b=e(this).data(`id`),e(`#wmEliminar`).addClass(`show`)}).on(`click.wm`,`#wmCancel, #wmEliminar`,t=>{e(t.target).is(`#wmCancel, #wmEliminar`)&&(e(`#wmEliminar`).removeClass(`show`),b=null)}).on(`click.wm`,`#wmConfirm`,P),M(n,!0),S=setInterval(()=>!document.hidden&&M(n,!0),3e4),C=()=>{!document.hidden&&M(n,!0)},document.addEventListener(`visibilitychange`,C),k()},M=async(t,r=!1)=>{try{y=(await u(m(g(_,`wiMensajes`),d(`email`,`==`,t),c(T)))).docs.map(e=>({id:e.id,...e.data()})).sort((e,t)=>(e.fecha?.seconds||0)-(t.fecha?.seconds||0)),D(y),e(`#wmChat`).html(R(y)),F(!0),k()}catch(t){if(console.error(`❌`,t),F(!1),!r){let t=O();t.length?(y=t,e(`#wmChat`).html(R(y)),n(`Caché local 📦`,`warning`,2e3)):e(`#wmChat`).html(z(`fa-wifi-slash`,`Sin conexión`,`Verifica tu internet`))}}},N=t=>{if(x)return;let r=e(`#wmNuevo`),i=r.val().trim();if(!i)return;x=!0;let{usuario:a=``,nombre:o=``}=E(),s=`m${Date.now()}`,c={id:s,mensaje:i,email:t,usuario:o||a||t,fecha:{seconds:Date.now()/1e3}};y.push(c),D(y),e(`#wmChat`).html(R(y)),k(),r.val(``).css(`height`,`auto`).trigger(`focus`),e(`#wmCount`).text(`0/500`),e(`#wmEnviar`).prop(`disabled`,!0),h(l(_,`wiMensajes`,s),{id:s,mensaje:i,email:t,usuario:o||a||t,fecha:f()}).then(()=>{F(!0)}).catch(t=>{console.error(`❌`,t),y=y.filter(e=>e.id!==s),D(y),e(`#wmChat`).html(R(y)),n(`Error al guardar`,`error`)}).finally(()=>{x=!1})},P=()=>{if(!b)return;let t=b;b=null,e(`#wmEliminar`).removeClass(`show`);let r=[...y];y=y.filter(e=>e.id!==t),D(y),e(`.wm_item[data-id="${t}"]`).addClass(`deleting`),setTimeout(()=>{e(`#wmChat`).html(R(y))},250),p(l(_,`wiMensajes`,t)).then(()=>n(`Eliminado 🗑️`,`success`,1200)).catch(t=>{console.error(`❌`,t),y=r,D(y),e(`#wmChat`).html(R(y)),n(`Error al eliminar`,`error`)})},F=t=>{e(`.wm_dot`).removeClass(`active error`).addClass(t?`active`:`error`),e(`.wm_dotxt`).text(t?`Online`:`Offline`)},I=e=>{if(!e)return`Hoy`;let t=e.toDate?.()||new Date((e.seconds||0)*1e3),n=new Date,r=new Date(n);return n.setHours(0,0,0,0),r.setDate(r.getDate()-1),r.setHours(0,0,0,0),t>=n?`Hoy`:t>=r?`Ayer`:t.toLocaleDateString(`es`,{day:`numeric`,month:`long`})},L=e=>e?(e.toDate?.()||new Date((e.seconds||0)*1e3)).toLocaleTimeString(`es`,{hour:`2-digit`,minute:`2-digit`}):`Ahora`,R=e=>{if(!e?.length)return z(`fa-comment-dots`,`Sin mensajes aún`,`Escribe tu primer mensaje 👇`);let n=``;return e.map(e=>{let r=I(e.fecha),i=r===n?``:`<div class="wm_sep"><span>${r}</span></div>`;return n=r,`${i}<div class="wm_item" data-id="${e.id}" ${t(`Click para copiar`)}>
      <div class="wm_bubble">
        <p class="wm_txt">${B(e.mensaje).replace(/\n/g,`<br>`)}</p>
        <div class="wm_foot"><span class="wm_time">${L(e.fecha)}</span><i class="fas fa-check-double wm_check"></i></div>
      </div>
      <button class="wm_del" data-id="${e.id}" ${t(`Eliminar`)}><i class="fas fa-trash"></i></button>
    </div>`}).join(``)},z=(e,t,n)=>`<div class="wm_empty"><i class="fas ${e}"></i><p>${t}</p><span>${n}</span></div>`,B=e=>String(e||``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`})[e]),V=()=>{clearInterval(S),S=null,C&&=(document.removeEventListener(`visibilitychange`,C),null),e(document).off(`.wm`),[y,b,x]=[[],null,!1]};export{V as cleanup,j as init,A as render};