import{t as e}from"./ruta-CdwgGk9K.js";import{t}from"./vendor-BDh6mtVu.js";import{_ as n,n as r,o as i,r as a,y as o}from"./widev-vIOvrNXT.js";import{t as s}from"./wii-DpME_MqB.js";import{a as c,c as l,f as u,i as d,l as f,o as p,t as m,u as h}from"./firebase-D6Mg1KLq.js";import{auth as g,db as _}from"./firebase-C6ZXw370.js";var v=[],y=null,b=null,x=`wi_mensajes_cache`,S=()=>i(`wiSmile`)||{},C=e=>{try{localStorage.setItem(x,JSON.stringify(e))}catch{}},w=()=>{try{return JSON.parse(localStorage.getItem(x)||`[]`)}catch{return[]}},T=()=>{let e=S();if(!e.email)return location.replace(`/`),``;let{nombre:t=``,usuario:r=``,email:i=``}=e,o=t||r||i||g.currentUser?.email||``;return`
  <div class="smile_container">

    <div class="smile_header">
      <div class="header_info">
        <img src="/logo.webp" alt="${s}" class="header_avatar" />
        <div class="header_text">
          <h1>Mis Mensajes</h1>
          <p>${a()} <strong>${o}</strong></p>
        </div>
      </div>
      <div class="header_status">
        <span class="status_dot"></span>
        <span class="status_text">Cargando...</span>
      </div>
    </div>

    <div class="smile_chat" id="smileChat">
      ${A(w())}
    </div>

    <div class="smile_input">
      <div class="input_wrapper">
        <textarea id="nuevoMensaje"
          placeholder="Escribe un mensaje."
          rows="1" maxlength="500"></textarea>
        <span class="char_count" id="charCount">0/500</span>
      </div>
      <button id="btnEnviar" disabled ${n(`Enviar · Enter`)}>
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>

    <div class="modal_overlay" id="modalEliminar">
      <div class="modal_content">
        <i class="fas fa-trash-alt"></i>
        <h3>¿Eliminar mensaje?</h3>
        <p>Esta acción no se puede deshacer</p>
        <div class="modal_actions">
          <button class="btn_cancelar" id="btnCancelar">Cancelar</button>
          <button class="btn_confirmar" id="btnConfirmar">Eliminar</button>
        </div>
      </div>
    </div>

  </div>`},E=()=>{let n=S();if(!n.email)return e.navigate(`/`);let i=n.email||g.currentUser?.email;t(document).on(`input.sm`,`#nuevoMensaje`,function(){t(`#charCount`).text(`${t(this).val().length}/500`),t(`#btnEnviar`).prop(`disabled`,!t(this).val().trim()),t(this).css(`height`,`auto`).css(`height`,Math.min(this.scrollHeight,150)+`px`)}).on(`keydown.sm`,`#nuevoMensaje`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),D(i))}).on(`click.sm`,`#btnEnviar`,()=>D(i)).on(`click.sm`,`.msg_item`,function(e){if(t(e.target).closest(`.btn_delete`).length)return;let n=v.find(e=>e.id===t(this).data(`id`));n&&(o(n.mensaje,this,`¡Copiado! <i class="fas fa-check-circle"></i>`),t(this).addClass(`copied`),setTimeout(()=>t(this).removeClass(`copied`),800))}).on(`click.sm`,`.btn_delete`,function(e){e.stopPropagation(),b=t(this).data(`id`),t(`#modalEliminar`).addClass(`show`)}).on(`click.sm`,`#btnCancelar, #modalEliminar`,e=>{t(e.target).is(`#btnCancelar, #modalEliminar`)&&(t(`#modalEliminar`).removeClass(`show`),b=null)}).on(`click.sm`,`#btnConfirmar`,O),y=d(c(f(_,`wiMensajes`),l(`email`,`==`,i)),{includeMetadataChanges:!1},e=>{v=e.docs.map(e=>({id:e.id,...e.data()})).sort((e,t)=>(t.fecha?.seconds||0)-(e.fecha?.seconds||0)),C(v),t(`#smileChat`).html(A(v)),k(!0)},e=>{console.error(`❌`,e),k(!1);let n=w();n.length?(v=n,t(`#smileChat`).html(A(v)),r(`Caché local 📦`,`warning`,2e3)):t(`#smileChat`).html(j(`fa-wifi-slash`,`Sin conexión`,`Verifica tu internet`))})},D=async e=>{let n=t(`#nuevoMensaje`),i=n.val().trim();if(!i)return;let{usuario:a=``,nombre:o=``}=S(),s=`m${Date.now()}`,c=t(`#btnEnviar`).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-pulse"></i>`);try{await p(h(_,`wiMensajes`,s),{id:s,mensaje:i,email:e,usuario:o||a||e,fecha:u()}),n.val(``).css(`height`,`auto`).trigger(`focus`),t(`#charCount`).text(`0/500`)}catch(e){console.error(`❌`,e),r(`Error al guardar`,`error`)}finally{c.prop(`disabled`,!1).html(`<i class="fas fa-paper-plane"></i>`)}},O=async()=>{if(!b)return;let e=b;b=null,t(`#modalEliminar`).removeClass(`show`),t(`.msg_item[data-id="${e}"]`).addClass(`deleting`);try{await m(h(_,`wiMensajes`,e)),r(`Mensaje eliminado 🗑️`,`success`,1500)}catch(n){console.error(`❌`,n),t(`.msg_item[data-id="${e}"]`).removeClass(`deleting`),r(`Error al eliminar`,`error`)}},k=e=>{t(`.status_dot`).toggleClass(`active`,e).toggleClass(`error`,!e),t(`.status_text`).text(e?`En vivo`:`Desconectado`)},A=e=>e?.length?e.map(e=>`
    <div class="msg_item" data-id="${e.id}" ${n(`Click para copiar`)}>
      <div class="msg_content">
        <p class="msg_texto">${M(e.mensaje).replace(/\n/g,`<br>`)}</p>
        <div class="msg_footer">
          <span class="msg_fecha">${N(e.fecha)}</span>
          <i class="fas fa-check-double msg_check"></i>
        </div>
      </div>
      <button class="btn_delete" data-id="${e.id}" ${n(`Eliminar`)}>
        <i class="fas fa-trash"></i>
      </button>
    </div>`).join(``):j(`fa-comment-dots`,`Sin mensajes aún`,`Escribe tu primer mensaje 👇`),j=(e,t,n)=>`
  <div class="chat_empty">
    <i class="fas ${e}"></i>
    <p>${t}</p><span>${n}</span>
  </div>`,M=e=>String(e||``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`})[e]),N=e=>{if(!e)return`Ahora`;let t=e.toDate?.()||new Date((e.seconds||0)*1e3),n=Date.now()-t,r=~~(n/6e4),i=~~(n/36e5),a=~~(n/864e5);return r<1?`Ahora`:r<60?`${r}m`:i<24?`${i}h`:a<7?`${a}d`:t.toLocaleDateString(`es`,{day:`2-digit`,month:`short`})},P=()=>{y?.(),t(document).off(`.sm`),[v,y,b]=[[],null,null]};export{P as cleanup,E as init,T as render};