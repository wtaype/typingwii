import{t as e}from"./vendor-BDh6mtVu.js";import{d as t,i as n}from"./widev-CCD3iiJo.js";import{c as r,d as i,i as a,p as o}from"./firebase-sojJ90-r.js";import{n as s}from"./firebase-C4aBgM1z.js";var c=()=>t(`wiSmile`),l=()=>c()?`
  <div class="rp_page">

    <!-- HERO CORPORATIVO PRO -->
    <div class="rp_hero">
      <div class="rp_hero_left">
        <div class="rp_hero_icon"><i class="fas fa-chart-pie"></i></div>
        <div class="rp_hero_txt">
          <div class="rp_badge"><i class="fas fa-building"></i> Analítica Empresarial</div>
          <h1 class="rp_hero_title">Reportes de Rendimiento</h1>
          <p class="rp_hero_sub">Visualiza el impacto del entrenamiento en tiempo real.</p>
        </div>
      </div>
      <div class="rp_hero_actions">
        <button class="rp_btn_export" id="rp_btn_exportar">
          <i class="fas fa-file-csv"></i> Descargar CSV
        </button>
      </div>
    </div>

    <!-- MAIN DASHBOARD (Manejado por JS) -->
    <div id="rp_dashboard">
      <div class="rp_empty" style="padding:15vh 0"><i class="fas fa-spinner fa-spin"></i><p>Procesando métricas...</p></div>
    </div>

  </div>`:`<div class="rp_page"><div class="rp_empty"><i class="fas fa-lock"></i><p>Sin sesión corporativa.</p></div></div>`,u=[],d=async()=>{let t=c();t&&(e(document).off(`.rp`),await p(t),e(document).on(`click.rp`,`#rp_btn_exportar`,()=>h()))},f=()=>{e(document).off(`.rp`)};async function p(t){try{let e=await a(r(o(s,`lecciones`),i(`empresa_id`,`==`,t.usuario)));e.empty&&(e=await a(r(o(s,`lecciones`),i(`gestor_id`,`==`,t.usuario)))),u=e.docs.map(e=>({usuario:e.id,...e.data()}));let n=await a(r(o(s,`clases`),i(`empresa_id`,`==`,t.usuario)));n.empty&&(n=await a(r(o(s,`clases`),i(`gestor_id`,`==`,t.usuario)))),n.docs.map(e=>({id:e.id,...e.data()})),m()}catch(t){console.error(`[reportes] Error:`,t),e(`#rp_dashboard`).html(`<div class="rp_empty"><i class="fas fa-exclamation-triangle"></i><p>Error procesando datos analíticos.</p></div>`)}}function m(){let t=u.length;if(!t){e(`#rp_dashboard`).html(`
      <div class="rp_empty">
        <i class="fas fa-chart-bar"></i><p>No hay datos suficientes para generar reportes.</p>
        <small>Agrega colaboradores a tu panel.</small>
      </div>`);return}let n=u.filter(e=>(e.completadas?.length||0)>0),r=n.map(e=>e.wpmMax||0),i=n.map(e=>e.precision||0),a=n.length?Math.round(r.reduce((e,t)=>e+t,0)/n.length):0,o=n.length?Math.round(i.reduce((e,t)=>e+t,0)/n.length):0,s=n.reduce((e,t)=>e+(t.completadas?.length||0),0),c={};n.forEach(e=>{let t=e.equipo_id||e.clase_id||e.claseId||`General`;c[t]||(c[t]={wpm:0,c:0}),c[t].wpm+=e.wpmMax||0,c[t].c++});let l=Object.keys(c).map(e=>({nombre:e,avg:Math.round(c[e].wpm/c[e].c)})).sort((e,t)=>t.avg-e.avg).slice(0,5),d=l.length?Math.max(...l.map(e=>e.avg)):1,f=[`#3b82f6`,`#10b981`,`#f59e0b`,`#8b5cf6`,`#ec4899`],p=l.length?l.map((e,t)=>{let n=Math.round(e.avg/d*100),r=f[t%f.length];return`
      <div class="rp_bar_row">
        <div class="rp_bar_info"><span>${e.nombre}</span> <span class="rp_bar_val" style="color:${r}">${e.avg} WPM</span></div>
        <div class="rp_bar_track"><div class="rp_bar_fill" style="width:${n}%;background:linear-gradient(90deg, ${r}, color-mix(in srgb, ${r} 60%, transparent))"></div></div>
      </div>`}).join(``):`<div class="rp_empty" style="padding:2vh"><p>Sin actividad registrada</p></div>`,m=[...n].sort((e,t)=>(t.wpmMax||0)-(e.wpmMax||0)).slice(0,5),h=m.length?m.map((e,t)=>{let n=t===0?`gold`:t===1?`silver`:t===2?`bronze`:``,r=n?``:t+1;return`
      <div class="rp_rank_item">
        <div class="rp_rank_pos ${n}">${n?`<i class="fas fa-medal"></i>`:r}</div>
        <div class="rp_rank_info">
          <div class="rp_rank_nom">${e.nombre||e.usuario}</div>
          <div class="rp_rank_meta">${e.equipo_id||e.clase_id||e.claseId||`General`}</div>
        </div>
        <div class="rp_rank_stat">${e.wpmMax||0} WPM</div>
      </div>`}).join(``):`<div class="rp_empty" style="padding:2vh"><p>Sin actividad registrada</p></div>`;e(`#rp_dashboard`).html(`
    
    <!-- KPIs -->
    <div class="rp_kpi_grid" style="margin-bottom:3vh">
      <div class="rp_kpi_card" style="--kc:#0ea5e9">
        <div class="rp_kpi_icon"><i class="fas fa-users"></i></div>
        <div class="rp_kpi_val">${t}</div>
        <div class="rp_kpi_lbl">Total Colaboradores</div>
      </div>
      <div class="rp_kpi_card" style="--kc:#f59e0b">
        <div class="rp_kpi_icon"><i class="fas fa-bolt"></i></div>
        <div class="rp_kpi_val">${a}</div>
        <div class="rp_kpi_lbl">WPM Promedio</div>
      </div>
      <div class="rp_kpi_card" style="--kc:#22c55e">
        <div class="rp_kpi_icon"><i class="fas fa-bullseye"></i></div>
        <div class="rp_kpi_val">${o}%</div>
        <div class="rp_kpi_lbl">Precisión Media</div>
      </div>
      <div class="rp_kpi_card" style="--kc:#8b5cf6">
        <div class="rp_kpi_icon"><i class="fas fa-check-circle"></i></div>
        <div class="rp_kpi_val">${s}</div>
        <div class="rp_kpi_lbl">Lecciones Completadas</div>
      </div>
    </div>

    <!-- CHARTS -->
    <div class="rp_dash_grid">
      
      <!-- Chart: Velocidad por Equipo -->
      <div class="rp_panel">
        <div class="rp_panel_hdr">
          <h2 class="rp_panel_title"><i class="fas fa-chart-bar"></i> Rendimiento por Departamento</h2>
        </div>
        <div class="rp_bars">${p}</div>
      </div>

      <!-- Ranking: Top Talent -->
      <div class="rp_panel">
        <div class="rp_panel_hdr">
          <h2 class="rp_panel_title"><i class="fas fa-crown"></i> Top Talent (WPM)</h2>
        </div>
        <div class="rp_rank_list">${h}</div>
      </div>

    </div>
  `)}function h(){if(!u.length){n(`No hay datos para exportar`,`warning`);return}let e=[`Usuario`,`Nombre`,`Email`,`Departamento`,`Lecciones_Completadas`,`WPM_Max`,`Precision`],t=u.map(e=>[e.usuario,e.nombre||``,e.email||``,e.equipo_id||e.clase_id||e.claseId||`General`,e.completadas?.length||0,e.wpmMax||0,e.precision||0]),r=`data:text/csv;charset=utf-8,`+[e.join(`,`),...t.map(e=>e.map(e=>`"${e}"`).join(`,`))].join(`
`),i=encodeURI(r),a=document.createElement(`a`);a.setAttribute(`href`,i),a.setAttribute(`download`,`Reporte_TypingWii_${new Date().getTime()}.csv`),document.body.appendChild(a),a.click(),document.body.removeChild(a),n(`Reporte exportado exitosamente`,`success`)}export{f as cleanup,d as init,l as render};