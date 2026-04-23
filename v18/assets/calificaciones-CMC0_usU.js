import{t as e}from"./vendor-BDh6mtVu.js";import{d as t,s as n}from"./widev-COmfIAwj.js";import{c as r,d as i,i as a,p as o}from"./firebase-sojJ90-r.js";import{n as s}from"./firebase-DsbKBtA3.js";var c=()=>t(`wiSmile`),l=()=>c()?`
  <div class="cl_page">

    <!-- HERO -->
    <div class="cl_hero">
      <div class="cl_hero_orb"></div>
      <div class="cl_hero_left">
        <div class="cl_hero_badge"><i class="fas fa-chart-bar"></i> Calificaciones</div>
        <h1 class="cl_hero_title">Ranking <span>Académico</span></h1>
        <p class="cl_hero_sub">Visualiza el rendimiento global y el podio de tus estudiantes según su velocidad, precisión o avance.</p>
      </div>
      <div class="cl_hero_actions">
        <select id="cl_sel_clase" class="cl_select">
          <option value="all">Cargando clases...</option>
        </select>
      </div>
    </div>

    <!-- KPIs -->
    <div class="cl_kpis_row">
      <div class="cl_kpi">
        <div class="cl_kpi_ico" style="color:var(--mco)"><i class="fas fa-users"></i></div>
        <div class="cl_kpi_val" id="cl_k_total">—</div>
        <div class="cl_kpi_lbl">Total Alumnos</div>
      </div>
      <div class="cl_kpi">
        <div class="cl_kpi_ico" style="color:#f59e0b"><i class="fas fa-bolt"></i></div>
        <div class="cl_kpi_val" id="cl_k_wpm">—</div>
        <div class="cl_kpi_lbl">WPM Promedio</div>
      </div>
      <div class="cl_kpi">
        <div class="cl_kpi_ico" style="color:#22c55e"><i class="fas fa-bullseye"></i></div>
        <div class="cl_kpi_val" id="cl_k_prec">—</div>
        <div class="cl_kpi_lbl">Precisión Prom.</div>
      </div>
      <div class="cl_kpi">
        <div class="cl_kpi_ico" style="color:#ec4899"><i class="fas fa-crown"></i></div>
        <div class="cl_kpi_val" id="cl_k_top">—</div>
        <div class="cl_kpi_lbl">Top WPM</div>
      </div>
    </div>

    <!-- FILTROS ORDEN -->
    <div class="cl_filtros" id="cl_filtros">
      <button class="cl_filtro active" data-ord="wpm">Mejor WPM</button>
      <button class="cl_filtro" data-ord="lec">Más Lecciones</button>
      <button class="cl_filtro" data-ord="prec">Mejor Precisión</button>
    </div>

    <!-- LISTA RANKING -->
    <div class="cl_ranking_wrap">
      <div id="cl_ranking" class="cl_ranking_list">
        <div class="cl_loading"><div class="cl_spinner"></div> Calculando ranking...</div>
      </div>
    </div>

  </div>`:`<div class="cl_page"><div class="cl_empty"><i class="fas fa-lock"></i><p>Sin sesión.</p></div></div>`,u=[],d=[],f=async()=>{let t=c();t&&(e(document).off(`.cl`),await m(t),e(document).on(`change.cl`,`#cl_sel_clase`,()=>h()),e(document).on(`click.cl`,`.cl_filtro`,function(){e(`.cl_filtro`).removeClass(`active`),e(this).addClass(`active`),h()}))},p=()=>{e(document).off(`.cl`)};async function m(t){try{let n=await a(r(o(s,`clases`),i(`gestor_id`,`==`,t.usuario)));n.empty&&(n=await a(r(o(s,`clases`),i(`gestorId`,`==`,t.usuario)))),d=n.docs.map(e=>({id:e.id,...e.data()}));let c=d.map(e=>`<option value="${e.id}">${e.id} - ${e.nombre}</option>`).join(``);e(`#cl_sel_clase`).html(`<option value="all">Todas mis clases</option>${c}`);let l=await a(r(o(s,`lecciones`),i(`gestor_id`,`==`,t.usuario)));l.empty&&(l=await a(r(o(s,`lecciones`),i(`gestorId`,`==`,t.usuario)))),u=l.docs.map(e=>({usuario:e.id,...e.data(),wpm:e.data().wpmMax||0,prec:e.data().precision||0,lecs:e.data().completadas?.length||0})),h()}catch(t){console.error(`[calificaciones] Error:`,t),e(`#cl_ranking`).html(`<div class="cl_empty"><i class="fas fa-exclamation-triangle"></i><p>Error cargando datos.</p></div>`)}}function h(){let t=e(`#cl_sel_clase`).val(),r=e(`.cl_filtro.active`).data(`ord`),i=u;t!==`all`&&(i=i.filter(e=>e.clase_id===t||e.claseId===t));let a=i.length;if(!a){e(`#cl_k_total`).text(0),e(`#cl_k_wpm`).text(`—`),e(`#cl_k_prec`).text(`—`),e(`#cl_k_top`).text(`—`),e(`#cl_ranking`).html(`<div class="cl_empty"><i class="fas fa-chart-line"></i><p>No hay alumnos en esta clase.</p></div>`);return}let o=Math.round(i.reduce((e,t)=>e+t.wpm,0)/a),s=Math.round(i.reduce((e,t)=>e+t.prec,0)/a),c=Math.max(...i.map(e=>e.wpm),0);e(`#cl_k_total`).text(a),e(`#cl_k_wpm`).text(o||`—`),e(`#cl_k_prec`).text(s?s+`%`:`—`),e(`#cl_k_top`).text(c||`—`),i.sort((e,t)=>r===`wpm`?t.wpm-e.wpm:r===`lec`?t.lecs-e.lecs:r===`prec`?t.prec-e.prec:0);let l=[`#f59e0b`,`#94a3b8`,`#b45309`],d=i.map((e,r)=>{let i=r<3,a=i?l[r]:`transparent`,o=e.nombre||e.usuario||`—`,s=Math.round(e.lecs/45*100);return`
      <div class="cl_rank_row ${i?`podio`:``}" style="--pc:${a}">
        <div class="cl_rank_pos ${i?`top`:``}" style="${i?`color:${a}`:``}">
          ${i?`<i class="fas fa-${r===0?`trophy`:`medal`}"></i>`:r+1}
        </div>
        <div class="cl_rank_av" style="${i?`border-color:${a}`:``}">${n(o)}</div>
        <div class="cl_rank_info">
          <div class="cl_rank_nombre">${o}</div>
          <div class="cl_rank_meta">
            ${t===`all`&&(e.clase_id||e.claseId)?`<span><i class="fas fa-chalkboard"></i> ${e.clase_id||e.claseId}</span>`:``}
            <span>${e.email||e.usuario}</span>
          </div>
        </div>
        <div class="cl_rank_prog">
          <div class="cl_prog_bar"><div class="cl_prog_fill" style="width:${s}%"></div></div>
          <span>${e.lecs}/45</span>
        </div>
        <div class="cl_rank_stats">
          <div class="cl_rs"><div class="cl_rs_val" style="color:#f59e0b">${e.wpm}</div><div class="cl_rs_lbl">WPM</div></div>
          <div class="cl_rs"><div class="cl_rs_val" style="color:#22c55e">${e.prec}%</div><div class="cl_rs_lbl">Prec</div></div>
        </div>
      </div>`}).join(``);e(`#cl_ranking`).html(d)}export{p as cleanup,f as init,l as render};