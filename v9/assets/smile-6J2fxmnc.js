import{t as e}from"./vendor-BykwZZMm.js";import{d as t,n,o as r,p as i}from"./widev-lipIOncV.js";import{t as a}from"./wii-BjvkTm-Q.js";import{_ as o,d as s,i as c,l,n as u,o as d,u as f}from"./firebase-DxKr4V-p.js";import{n as p,t as m}from"./firebase-CKhCNoOL.js";var h=()=>new Promise(e=>{if(m.currentUser)return e(m.currentUser);let t=o(m,n=>{t(),e(n)})}),g=[],_=null,v=()=>`
  <div class="smile_container">
    <div class="smile_header">
      <div class="header_left">
        <h1><i class="fas fa-inbox"></i> Mis mensajes</h1>
        <p id="smileUser"></p>
      </div>
      <button class="btn_actualizar" id="btnActualizar">
        <i class="fas fa-sync-alt"></i>
        <span>Actualizar</span>
      </button>
    </div>

    <div class="smile_table_wrapper">
      <table class="smile_table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Título</th>
            <th>Para</th>
            <th>Fecha</th>
            <th>Vistas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="smileTableBody">
          <tr><td colspan="6" class="loading_td"><i class="fas fa-spinner fa-pulse"></i> Cargando...</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="modal_overlay" id="modalEliminar">
    <div class="modal_content">
      <div class="modal_icon"><i class="fas fa-trash-alt"></i></div>
      <h3>¿Eliminar mensaje?</h3>
      <p>Esta acción no se puede deshacer</p>
      <div class="modal_actions">
        <button class="btn_modal_cancelar" id="btnCancelar"><i class="fas fa-times"></i> Cancelar</button>
        <button class="btn_modal_eliminar" id="btnConfirmar"><i class="fas fa-trash"></i> Eliminar</button>
      </div>
    </div>
  </div>
`,y=async()=>{if(console.log(`✅ Smile de ${a}`),!await h())return n(`Debes iniciar sesión`,`error`),window.location.hash=`#/auth?mode=login`;let t=r(`wiSmile`);e(`#smileUser`).html(`<i class="fas fa-user"></i> ${t?.usuario||m.currentUser.email} • ${t?.email||m.currentUser.email}`),e(document).on(`click.sm`,`#btnActualizar`,b).on(`click.sm`,`#btnCancelar, #modalEliminar`,t=>e(t.target).is(`#btnCancelar, #modalEliminar`)&&C()).on(`click.sm`,`#btnConfirmar`,w).on(`click.sm`,`.btn_abrir`,t=>window.open(e(t.currentTarget).data(`url`),`_blank`)).on(`click.sm`,`.btn_copiar`,t=>i(e(t.currentTarget).data(`url`),t.currentTarget,`¡Copiado!`)).on(`click.sm`,`.btn_eliminar_msg`,t=>{_=e(t.currentTarget).data(`id`),e(`#modalEliminar`).addClass(`show`)}),await b()};async function b(){let t=m.currentUser?.uid;if(!t)return;let n=e(`#btnActualizar`);n.find(`i`).addClass(`fa-spin`).end().prop(`disabled`,!0),x();try{g=(await c(d(f(p,`wiLoves`),l(`uid`,`==`,t)))).docs.map(e=>({id:e.id,...e.data()})),g.sort((e,t)=>{let n=e.creado?.toDate?.()||e.creado?.seconds?new Date(e.creado.seconds*1e3):new Date(e.creado||0);return(t.creado?.toDate?.()||t.creado?.seconds?new Date(t.creado.seconds*1e3):new Date(t.creado||0))-n}),S(g),console.log(`📬 ${g.length} mensajes`)}catch(t){console.error(`❌`,t),e(`#smileTableBody`).html(`
      <tr><td colspan="6" class="error_td">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Error: ${t.message}</p>
        <button class="btn_reintentar" onclick="location.reload()"><i class="fas fa-redo"></i> Reintentar</button>
      </td></tr>
    `)}finally{n.find(`i`).removeClass(`fa-spin`).end().prop(`disabled`,!1)}}function x(){e(`#smileTableBody`).html([,,,,,].fill(0).map(()=>`
    <tr class="skeleton_row">
      <td><div class="sk_badge"></div></td>
      <td><div class="sk_line sk_title"></div></td>
      <td><div class="sk_line sk_text"></div></td>
      <td><div class="sk_line sk_date"></div></td>
      <td><div class="sk_line sk_vistas"></div></td>
      <td><div class="td_actions">${[,,,].fill(`<div class="sk_btn"></div>`).join(``)}</div></td>
    </tr>
  `).join(``))}function S(n){if(!n.length)return e(`#smileTableBody`).html(`
      <tr><td colspan="6" class="empty_td">
        <div class="empty_icon"><i class="fas fa-inbox"></i></div>
        <h3>No tienes mensajes</h3>
        <p>Crea tu primer mensaje en <a href="#/crear">Crear mensaje</a></p>
      </td></tr>
    `);let r={amor:`fa-heart`,amistad:`fa-user-friends`,saludo:`fa-gift`,declaracion:`fa-comment-dots`,aniversario:`fa-calendar-star`,carta:`fa-envelope`};e(`#smileTableBody`).html(n.map(e=>{let n=e.plantilla||`amor`,i=r[n]||`fa-envelope`,a=T(e.nombre||e.de||`Sin título`),o=T(e.para||`Alguien especial`),s=`${location.origin}/?${e.id}`;return`
      <tr data-id="${e.id}">
        <td><span class="badge_tipo ${n}"><i class="fas ${i}"></i> ${n.charAt(0).toUpperCase()+n.slice(1)}</span></td>
        <td class="td_titulo">${a}</td>
        <td class="td_para">${o}</td>
        <td class="td_fecha">${E(e.creado)}</td>
        <td class="td_vistas">${e.vistas||0}</td>
        <td>
          <div class="td_actions">
            <button class="btn_action btn_abrir" data-url="${s}" ${t(`Abrir`)}><i class="fas fa-external-link-alt"></i></button>
            <button class="btn_action btn_copiar" data-url="${s}" ${t(`Copiar`)}><i class="fas fa-link"></i></button>
            <button class="btn_action btn_eliminar_msg" data-id="${e.id}" ${t(`Eliminar`)}><i class="fas fa-trash-alt"></i></button>
          </div>
        </td>
      </tr>
    `}).join(``))}function C(){_=null,e(`#modalEliminar`).removeClass(`show`)}async function w(){if(!_)return;let t=_;C();try{e(`tr[data-id="${t}"]`).addClass(`removing`),await u(s(p,`wiLoves`,t)),setTimeout(()=>{g=g.filter(e=>e.id!==t),S(g)},300),n(`Mensaje eliminado 🗑️`,`success`)}catch(r){console.error(`❌`,r),e(`tr[data-id="${t}"]`).removeClass(`removing`),n(`Error al eliminar`,`error`)}}var T=e=>e?String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`})[e]):``;function E(e){if(!e)return`Reciente`;let t=e.toDate?.()||(e.seconds?new Date(e.seconds*1e3):new Date(e));if(isNaN(t.getTime()))return`Reciente`;let n=new Date-t,r=Math.floor(n/6e4),i=Math.floor(n/36e5),a=Math.floor(n/864e5);return r<1?`Ahora`:r<60?`${r}m`:i<24?`${i}h`:a<7?`${a}d`:a<30?`${Math.floor(a/7)} sem`:t.toLocaleDateString(`es-ES`,{day:`numeric`,month:`short`,year:`numeric`})}var D=()=>{console.log(`🧹 Smile`),g=[],_=null,e(document).off(`.sm`)};export{D as cleanup,y as init,v as render};