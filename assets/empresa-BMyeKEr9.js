import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,a as n,d as r,f as i,l as a,r as o,s,t as c,u as l}from"./widev-BFyzE1uG.js";import"./wii-92BiU8Qt.js";import{a as u,c as d,d as f,i as p,p as m,s as h}from"./firebase-sojJ90-r.js";import{n as g}from"./firebase-BVXQ9QC5.js";var _=()=>r(`wiSmile`),v=`epTotalEmpleados`,y=`epTotalEquipos`,b=`epMetricas`,x=`epFeed`,S=async()=>{let e=_();if(!e)return`<div class="epd_page"><div class="epd_empty"><i class="fas fa-lock"></i><p>Sin sesión activa.</p></div></div>`;let t=o(e.nombres||e.nombre||`Administrador`),i=s(e.nombres||e.nombre||``),l=e.foto||null,u=c(e.empresa||`TypingWii`),d=r(v)??`—`,f=r(y)??`—`,p=r(b)||{wpm:`—`,cert:`—`};return`
  <div class="epd_page">

    <!-- HERO PRO -->
    <div class="epd_hero">
      <div class="epd_hero_left">
        <div class="epd_avatar_wrap">
          <div class="epd_avatar_glow"></div>
          <div class="epd_avatar">
            ${l?`<img src="${l}" alt="${t}" onerror="this.parentElement.innerHTML='${i}'">`:i}
          </div>
        </div>
        <div class="epd_hero_txt">
          <p class="epd_saludo">${n()}</p>
          <h1 class="epd_nombre">${t.split(` `)[0]}</h1>
          <div class="epd_tags">
            <span class="epd_tag"><i class="fas fa-crown"></i> Admin. Corporativo</span>
            <span class="epd_tag"><i class="fas fa-building"></i> ${u}</span>
          </div>
        </div>
      </div>
      <div class="epd_hero_right">
        <div class="epd_date"><i class="fas fa-calendar-alt"></i> ${a()}</div>
      </div>
    </div>

    <!-- KPI GRID -->
    <div class="epd_kpi_grid">
      <div class="epd_kpi_card" style="--kc:#38bdf8">
        <div class="epd_kpi_icon"><i class="fas fa-user-tie"></i></div>
        <div class="epd_kpi_val" id="epd_k_emp">${d}</div>
        <div class="epd_kpi_lbl">Colaboradores Totales</div>
      </div>
      <div class="epd_kpi_card" style="--kc:#8b5cf6">
        <div class="epd_kpi_icon"><i class="fas fa-sitemap"></i></div>
        <div class="epd_kpi_val" id="epd_k_eqp">${f}</div>
        <div class="epd_kpi_lbl">Departamentos Activos</div>
      </div>
      <div class="epd_kpi_card" style="--kc:#f59e0b">
        <div class="epd_kpi_icon"><i class="fas fa-bolt"></i></div>
        <div class="epd_kpi_val" id="epd_k_wpm">${p.wpm}</div>
        <div class="epd_kpi_lbl">WPM Corporativo</div>
      </div>
      <div class="epd_kpi_card" style="--kc:#10b981">
        <div class="epd_kpi_icon"><i class="fas fa-award"></i></div>
        <div class="epd_kpi_val" id="epd_k_cert">${p.cert}</div>
        <div class="epd_kpi_lbl">Personal Certificado</div>
      </div>
    </div>

    <!-- ACCESOS GRID -->
    <h2 class="epd_sec_title"><i class="fas fa-layer-group"></i> Módulos Corporativos</h2>
    <div class="epd_acc_grid">
      ${[{page:`empleados`,ico:`fa-id-badge`,color:`#38bdf8`,tit:`Colaboradores`,sub:`Gestión de nómina`},{page:`equipos`,ico:`fa-users-gear`,color:`#8b5cf6`,tit:`Departamentos`,sub:`Organización de áreas`},{page:`reportes`,ico:`fa-chart-pie`,color:`#f59e0b`,tit:`Analítica`,sub:`Métricas y estadísticas`},{page:`certificados`,ico:`fa-certificate`,color:`#10b981`,tit:`Certificados`,sub:`Diplomas oficiales`},{page:`mensajes`,ico:`fa-envelope-open-text`,color:`#ec4899`,tit:`Comunicados`,sub:`Avisos internos`},{page:`perfil`,ico:`fa-building-user`,color:`#64748b`,tit:`Perfil`,sub:`Configuración corporativa`}].map(e=>`
        <a href="/${e.page}" class="epd_acc_card nv_item" data-page="${e.page}" style="--ac:${e.color}">
          <div class="epd_acc_icon"><i class="fas ${e.ico}"></i></div>
          <div class="epd_acc_info">
            <div class="epd_acc_tit">${e.tit}</div>
            <div class="epd_acc_sub">${e.sub}</div>
          </div>
          <i class="fas fa-arrow-right epd_acc_arr"></i>
        </a>
      `).join(``)}
    </div>

    <!-- FEED RECIENTE -->
    <div class="epd_feed_wrap">
      <div class="epd_feed_hdr">
        <h2 class="epd_feed_title"><i class="fas fa-satellite-dish"></i> Actividad Reciente</h2>
        <button class="epd_feed_btn" id="epd_btn_sync"><i class="fas fa-sync-alt"></i> Actualizar</button>
      </div>
      <div id="epd_feed_body">
        <div class="epd_empty"><i class="fas fa-spinner fa-spin"></i><p>Sincronizando entrenamientos...</p></div>
      </div>
    </div>

  </div>`},C=async()=>{let n=_();n&&(e(document).off(`.epd`),await T(n),e(document).on(`click.epd`,`.nv_item`,function(n){n.preventDefault();let r=e(this).data(`page`);r&&t(async()=>{let{rutas:e}=await import(`./ruta-BIDGd8j4.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/${r}`))}),e(document).on(`click.epd`,`#epd_btn_sync`,async function(){let t=e(this).find(`i`).addClass(`fa-spin`);[v,y,b,x].forEach(e=>localStorage.removeItem(e)),await T(n,!0),setTimeout(()=>t.removeClass(`fa-spin`),500)}))},w=()=>{e(document).off(`.epd`)};async function T(e,t=!1){await Promise.all([E(e,t),D(e,t)])}async function E(t,n){if(!(!n&&r(v)!=null))try{let n=await p(d(m(g,`lecciones`),f(`empresa_id`,`==`,t.usuario)));n.empty&&(n=await p(d(m(g,`lecciones`),f(`gestor_id`,`==`,t.usuario))));let r=n.docs.map(e=>e.data()),a=r.length,o=r.map(e=>e.wpmMax||0),s=a>0?Math.round(o.reduce((e,t)=>e+t,0)/a):0,c=r.filter(e=>(e.completadas?.length||0)>=45&&(e.wpmMax||0)>=80).length,l=await p(d(m(g,`clases`),f(`empresa_id`,`==`,t.usuario)));l.empty&&(l=await p(d(m(g,`clases`),f(`gestor_id`,`==`,t.usuario))));let u=l.size;i(v,a,2),i(y,u,2),i(b,{wpm:s,cert:c},2),e(`#epd_k_emp`).text(a),e(`#epd_k_eqp`).text(u),e(`#epd_k_wpm`).text(s||`—`),e(`#epd_k_cert`).text(c)}catch(e){console.error(`[empresa] KPI Error`,e)}}async function D(e,t){if(!t){let e=r(x);if(e?.length){O(e);return}}try{let t=await p(d(m(g,`lecciones`),f(`empresa_id`,`==`,e.usuario),h(`ultPractica`,`desc`),u(10)));t.empty&&(t=await p(d(m(g,`lecciones`),f(`gestor_id`,`==`,e.usuario),h(`ultPractica`,`desc`),u(10))));let n=t.docs.map(e=>({usuario:e.id,...e.data()}));i(x,n,1/12),O(n)}catch{try{let t=await p(d(m(g,`lecciones`),f(`empresa_id`,`==`,e.usuario),u(10)));t.empty&&(t=await p(d(m(g,`lecciones`),f(`gestor_id`,`==`,e.usuario),u(10)))),O(t.docs.map(e=>({usuario:e.id,...e.data()})))}catch{O([])}}}function O(t){if(!t.length){e(`#epd_feed_body`).html(`
      <div class="epd_empty">
        <i class="fas fa-ghost"></i>
        <p>No hay actividad registrada aún.</p>
      </div>`);return}let n=t.map(e=>{let t=e.nombre||e.usuario||`—`;return`
      <div class="epd_feed_item">
        <div class="epd_fi_av">${s(t)}</div>
        <div class="epd_fi_main">
          <div class="epd_fi_head">
            <span class="epd_fi_nom">${t}</span>
            <span class="epd_fi_dep"><i class="fas fa-building"></i> ${e.equipo_id||e.clase_id||e.claseId||`General`}</span>
          </div>
          <div class="epd_fi_metrics">
            <div class="epd_fi_met w"><i class="fas fa-bolt"></i> ${e.wpmMax||0} WPM</div>
            <div class="epd_fi_met p"><i class="fas fa-bullseye"></i> ${e.precision||0}%</div>
          </div>
        </div>
        <div class="epd_fi_time">${e.ultPractica?.toDate?l(e.ultPractica):`Reciente`}</div>
      </div>`}).join(``);e(`#epd_feed_body`).html(`<div class="epd_feed_list">${n}</div>`)}export{w as cleanup,C as init,S as render};