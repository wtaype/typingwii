import"./wii-CZYUy4T7.js";import{t as e}from"./vendor-BDh6mtVu.js";import{a as t,d as n,f as r,l as i,r as a,s as o,t as s,u as c,y as l}from"./widev-CFII55yl.js";import{a as u,c as d,d as f,f as p,i as m,n as h,o as g,s as _}from"./firebase-By6_FWdI.js";import{db as v}from"./firebase-CiL2SFsg.js";var y=()=>n(`wiSmile`),b=`gsTotalEstudiantes`,x=`gsMetricas`,S=`gsRecientes`,C=`gsRealTime`,w={practicasSub:null,feedSub:null},T=async()=>{let e=y();return e?`
  <div class="gs_page" id="gs_root">
    
    <!-- ══ BACKGROUND ORBS ══ -->
    <div class="gs_orb gs_orb1"></div>
    <div class="gs_orb gs_orb2"></div>

    <!-- ══ HERO / HEADER ══ -->
    <div class="gs_hero">
      <div class="gs_hero_main">
        <div class="gs_user_info">
          <div class="gs_avatar">${o(e.nombres||``)}</div>
          <div>
            <div class="gs_saludo">${t()}</div>
            <h1 class="gs_nombre">${a(e.nombres||`Instructor`)}</h1>
            <div class="gs_tags">
              <span class="gs_tag"><i class="fas fa-chalkboard-user"></i> Gestor de Aula</span>
              <span class="gs_tag"><i class="fas fa-school"></i> ${s(e.empresa||`TypingWii`)}</span>
            </div>
          </div>
        </div>
        <div class="gs_hero_side">
          <div class="gs_fecha">
            <i class="fas fa-calendar-day"></i>
            <span>${i()}</span>
          </div>
          <div class="gs_rt_wrap">
             <label class="gs_switch" title="Monitoreo en tiempo real">
               <input type="checkbox" id="gs_rt_toggle">
               <span class="gs_slider"></span>
             </label>
             <span class="gs_rt_txt">En vivo</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ DASHBOARD KPIs ══ -->
    <div class="gs_kpi_grid">
      
      <div class="gs_kpi gs_kpi_blue wi_fadeUp">
        <div class="gs_kpi_ico"><i class="fas fa-users"></i></div>
        <div class="gs_kpi_data">
          <div class="gs_kpi_num" id="gs_cnt_est">
            ${n(b)??`<i class="fas fa-spinner fa-spin"></i>`}
          </div>
          <div class="gs_kpi_lbl">Estudiantes</div>
        </div>
      </div>

      <div class="gs_kpi gs_kpi_orange wi_fadeUp" style="--d:.1s">
        <div class="gs_kpi_ico"><i class="fas fa-keyboard"></i></div>
        <div class="gs_kpi_data">
          <div class="gs_kpi_num" id="gs_cnt_prac">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div class="gs_kpi_lbl">Prácticas hoy</div>
        </div>
        <div class="gs_kpi_pulse" id="gs_pulse_prac"></div>
      </div>

      <div class="gs_kpi gs_kpi_green wi_fadeUp" style="--d:.2s">
        <div class="gs_kpi_ico"><i class="fas fa-award"></i></div>
        <div class="gs_kpi_data">
          <div class="gs_kpi_num" id="gs_cnt_cert">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div class="gs_kpi_lbl">Retos cumplidos</div>
        </div>
      </div>

      <div class="gs_kpi gs_kpi_purple wi_fadeUp" style="--d:.3s">
        <div class="gs_kpi_ico"><i class="fas fa-tachometer-alt"></i></div>
        <div class="gs_kpi_data">
          <div class="gs_kpi_num" id="gs_cnt_avg">--</div>
          <div class="gs_kpi_lbl">Promedio WPM</div>
        </div>
      </div>

    </div>

    <!-- ══ ACCIONES RÁPIDAS ══ -->
    <div class="gs_actions">
      <h2 class="gs_sec_h2">Acciones Rápidas</h2>
      <div class="gs_action_grid">
        <a href="/aprobar" class="gs_action_card nv_item" data-page="aprobar">
          <div class="gs_ac_ico ac_yellow"><i class="fas fa-user-graduate"></i></div>
          <div class="gs_ac_txt">
            <strong>Gestión de Alumnos</strong>
            <span>Control de accesos y perfiles</span>
          </div>
          <i class="fas fa-chevron-right gs_ac_arr"></i>
        </a>

        <a href="/buscar" class="gs_action_card nv_item" data-page="buscar">
          <div class="gs_ac_ico ac_blue"><i class="fas fa-magnifying-glass"></i></div>
          <div class="gs_ac_txt">
            <strong>Buscador de Notas</strong>
            <span>Historial detallado por estudiante</span>
          </div>
          <i class="fas fa-chevron-right gs_ac_arr"></i>
        </a>

        <a href="/equipo" class="gs_action_card nv_item" data-page="equipo">
          <div class="gs_ac_ico ac_green"><i class="fas fa-users-gear"></i></div>
          <div class="gs_ac_txt">
            <strong>Configuración de Aula</strong>
            <span>Docentes y grupos asignados</span>
          </div>
          <i class="fas fa-chevron-right gs_ac_arr"></i>
        </a>

        <button class="gs_action_card" id="gs_refresh">
          <div class="gs_ac_ico ac_purple"><i class="fas fa-sync-alt"></i></div>
          <div class="gs_ac_txt">
            <strong>Sincronizar Datos</strong>
            <span>Actualizar ahora desde la nube</span>
          </div>
        </button>
      </div>
    </div>

    <!-- ══ ACTIVIDAD RECIENTE ══ -->
    <div class="gs_feed_sec">
      <div class="gs_feed_hdr">
        <h2 class="gs_sec_h2"><i class="fas fa-bolt"></i> Prácticas Recientes</h2>
        <span class="gs_feed_count" id="gs_feed_num">...</span>
      </div>
      <div id="gs_feed" class="gs_feed_list">
        <div class="gs_loading"><i class="fas fa-spinner fa-spin"></i> Cargando actividad...</div>
      </div>
    </div>

  </div>`:`<div class="gs_wrap"><div class="gs_empty"><i class="fas fa-lock"></i><p>Sin sesión activa.</p></div></div>`},E=async()=>{if(!y())return;l(`.wi_fadeUp`,null,{anim:`wi_fadeUp`});let t=n(C)===!0;e(`#gs_rt_toggle`).prop(`checked`,t),t&&(O(),j()),await D(),e(document).off(`.gs`).on(`change.gs`,`#gs_rt_toggle`,function(){let t=e(this).is(`:checked`);r(C,t,24*365),t?(O(),j()):(w.practicasSub?.(),w.practicasSub=null,w.feedSub?.(),w.feedSub=null)}),e(document).on(`click.gs`,`#gs_refresh`,async function(){let t=e(this);t.find(`i`).addClass(`fa-spin`),localStorage.removeItem(x),localStorage.removeItem(b),localStorage.removeItem(S),await D(!0),t.find(`i`).removeClass(`fa-spin`)})};async function D(t=!1){let n=[k(t),A(t)];e(`#gs_rt_toggle`).is(`:checked`)||n.push(M(t)),await Promise.all(n)}function O(){w.practicasSub?.(),w.practicasSub=g(d(p(v,`solicitudes`),f(`estado`,`==`,`pendiente`)),t=>{let n=t.size;e(`#gs_cnt_prac`).text(n),n>0?e(`#gs_pulse_prac`).addClass(`activo`):e(`#gs_pulse_prac`).removeClass(`activo`)})}async function k(t=!1){if(!t){let t=n(x);if(t){e(`#gs_cnt_cert`).text(t.cert),e(`#gs_cnt_avg`).text(t.avg);return}}try{let t=new Date;t.setHours(0,0,0,0);let n=await m(d(p(v,`solicitudes`),f(`historial.histCreada`,`>=`,t))),i=0;n.forEach(e=>{e.data().estado===`aprobado`&&i++}),e(`#gs_cnt_cert`).text(i),e(`#gs_cnt_avg`).text(`42`),r(x,{cert:i,avg:42},1/12)}catch(e){console.error(e)}}async function A(t=!1){if(!t){let t=n(b);if(t){e(`#gs_cnt_est`).text(t);return}}try{let t=(await h(d(p(v,`smiles`),f(`estado`,`==`,`activo`)))).data().count;e(`#gs_cnt_est`).text(t),r(b,t,4)}catch{e(`#gs_cnt_est`).text(`—`)}}function j(){w.feedSub?.(),w.feedSub=g(d(p(v,`solicitudes`),_(`historial.histCreada`,`desc`),u(10)),e=>{N(e.docs.map(e=>({id:e.id,...e.data()})))})}async function M(e=!1){if(!e){let e=n(S);if(e){N(e);return}}try{let e=(await m(d(p(v,`solicitudes`),_(`historial.histCreada`,`desc`),u(10)))).docs.map(e=>({id:e.id,...e.data()}));N(e),r(S,e,1/12)}catch(e){console.error(e)}}function N(t){if(e(`#gs_feed_num`).text(`${t.length} hoy`),!t.length){e(`#gs_feed`).html(`<div class="gs_empty"><i class="fas fa-inbox"></i><p>Sin actividad reciente.</p></div>`);return}let n=t.map(e=>{let t=e.smile||{},n=e.solicitud||{},r=e.estado||`pendiente`,i=o(t.nombres||`E`),a=Math.floor(Math.random()*30+35),l=Math.floor(Math.random()*8+92);return`
      <div class="gs_feed_item gs_st_${r}">
        <div class="gs_item_av">${i}</div>
        <div class="gs_item_main">
          <div class="gs_item_top">
            <strong>${s(t.nombres||`Estudiante`)}</strong>
            <span class="gs_item_tag">${n.titulo||`Mecanografía Básica`}</span>
          </div>
          <div class="gs_item_stats">
             <span><i class="fas fa-bolt"></i> ${a} WPM</span>
             <span><i class="fas fa-bullseye"></i> ${l}% Precisión</span>
             <span class="gs_item_time">${c(e.historial?.histCreada)}</span>
          </div>
        </div>
        <div class="gs_item_badge ${r}">${r===`aprobado`?`Cumplido`:`En proceso`}</div>
      </div>
    `}).join(``);e(`#gs_feed`).html(n)}var P=()=>{w.practicasSub?.(),w.feedSub?.(),e(document).off(`.gs`)};export{P as cleanup,E as init,T as render};