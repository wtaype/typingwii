import{t as e}from"./vendor-BDh6mtVu.js";import{S as t,d as n,f as r,y as i}from"./widev-C_asVASQ.js";import{t as a}from"./wii-9R-ZUv6c.js";import{c as o,i as s,p as c,s as l}from"./firebase-sojJ90-r.js";import{n as u}from"./firebase-IxF1L4zF.js";var d=[{n:1,lbl:`Fila Central`,color:`#22c55e`},{n:2,lbl:`Fila Superior`,color:`#0ea5e9`},{n:3,lbl:`Fila Inferior`,color:`#f97316`},{n:4,lbl:`Frases y Números`,color:`#a855f7`},{n:5,lbl:`Intermedio`,color:`#06b6d4`},{n:6,lbl:`Párrafos`,color:`#ec4899`},{n:7,lbl:`Avanzado`,color:`#f59e0b`},{n:8,lbl:`Velocidad`,color:`#10b981`},{n:9,lbl:`Experto`,color:`#ef4444`},{n:10,lbl:`Maestro`,color:`#7c3aed`}],f=[{id:1,n:1,t:`Teclas F y J`,s:`Índices · fila central`},{id:2,n:1,t:`Teclas D y K`,s:`Dedos medios · fila central`},{id:3,n:1,t:`Teclas S y L`,s:`Dedos anulares · fila central`},{id:4,n:1,t:`Fila Central Completa`,s:`A S D F J K L Ñ`},{id:5,n:1,t:`Primeras Palabras`,s:`Palabras con fila central`},{id:6,n:2,t:`Teclas E e I`,s:`Dedos medios · fila superior`},{id:7,n:2,t:`Teclas R y U`,s:`Índices · fila superior`},{id:8,n:2,t:`Teclas T e Y`,s:`Índices al centro superior`},{id:9,n:2,t:`Teclas W y O`,s:`Anulares · fila superior`},{id:10,n:2,t:`Fila Superior + Central`,s:`Q W E R T Y U I O P`},{id:11,n:3,t:`Teclas V y B`,s:`Índices · fila inferior`},{id:12,n:3,t:`Teclas N y M`,s:`Índice derecho · fila inferior`},{id:13,n:3,t:`Teclas C y coma`,s:`Dedos medios · fila inferior`},{id:14,n:3,t:`Teclas Z y X`,s:`Meñique y anular izquierdo`},{id:15,n:3,t:`Todas las filas`,s:`Alfabeto QWERTY completo`},{id:16,n:4,t:`Frases Simples`,s:`Velocidad con precisión`},{id:17,n:4,t:`Números 1 al 5`,s:`Fila numérica · mitad izquierda`},{id:18,n:4,t:`Números 6 al 0`,s:`Fila numérica · mitad derecha`},{id:19,n:4,t:`Todos los números`,s:`Fila numérica completa`},{id:20,n:4,t:`Texto Real`,s:`Práctica con texto natural`},{id:21,n:5,t:`Puntuación Básica`,s:`Punto, coma y dos puntos`},{id:22,n:5,t:`Mayúsculas con Shift`,s:`Shift + tecla = mayúscula`},{id:23,n:5,t:`Palabras Comunes`,s:`Las 50 palabras más usadas`},{id:24,n:5,t:`Palabras Comunes II`,s:`Continuación top palabras`},{id:25,n:5,t:`Frases del Día a Día`,s:`Comunicación cotidiana`},{id:26,n:6,t:`Párrafo Corto I`,s:`Texto continuo sin pausas`},{id:27,n:6,t:`Párrafo Corto II`,s:`Ideas conectadas`},{id:28,n:6,t:`Números en Contexto`,s:`Mezcla de texto y números`},{id:29,n:6,t:`Email Profesional`,s:`Redacción de comunicados`},{id:30,n:6,t:`Velocidad Inicial`,s:`Test de velocidad real`},{id:31,n:7,t:`Texto Técnico I`,s:`Vocabulario especializado`},{id:32,n:7,t:`Texto Técnico II`,s:`Informática y tecnología`},{id:33,n:7,t:`Párrafo Largo I`,s:`Resistencia y concentración`},{id:34,n:7,t:`Acentos y Tilde`,s:`Español con tildes correctas`},{id:35,n:7,t:`Signos de Puntuación`,s:`Puntuación avanzada`},{id:36,n:8,t:`Objetivo: 40 WPM`,s:`Nivel profesional básico`},{id:37,n:8,t:`Objetivo: 50 WPM`,s:`Mecanógrafo competente`},{id:38,n:8,t:`Objetivo: 60 WPM`,s:`Nivel avanzado de escritura`},{id:39,n:9,t:`Texto Académico`,s:`Redacción universitaria`},{id:40,n:9,t:`Texto Jurídico`,s:`Redacción legal y formal`},{id:41,n:9,t:`Código de Programación`,s:`Sintaxis y símbolos técnicos`},{id:42,n:9,t:`Objetivo: 70 WPM`,s:`Experto en mecanografía`},{id:43,n:10,t:`Velocidad: 80 WPM`,s:`Maestro de la mecanografía`},{id:44,n:10,t:`Texto Mixto Complejo`,s:`Letras, números y símbolos`},{id:45,n:10,t:`Párrafo de Maestría`,s:`El texto definitivo`}],p=()=>n(`wiSmile`),m=()=>{let e=p();if(!e)return`<div class="pg_wrap"><div class="pg_empty"><i class="fas fa-lock pg_empty_ico"></i><h3>Sin sesión</h3></div></div>`;let t=n(`wiProgreso`)||{},r=t.leccionesOk||[],i=t.wpmRecord||0,o=t.precisionPct==null?`—`:t.precisionPct,s=t.rachaDias==null?0:t.rachaDias,c=Math.round(r.length/45*100),l=d.map(e=>{let t=f.filter(t=>t.n===e.n).map(e=>e.id).every(e=>r.includes(e));return{...e,done:t}});return`
  <div class="pg_wrap">

    <!-- ══ HERO KPIs ══ -->
    <div class="pg_hero wi_fadeUp">
      <div class="pg_hero_left">
        <div class="pg_hero_badge"><i class="fas fa-chart-line"></i> Mi Progreso</div>
        <h1 class="pg_hero_title">Tu camino a <span>80 WPM</span></h1>
        <p class="pg_hero_sub">${e.nombre||e.usuario} · ${a}</p>
      </div>
      <div class="pg_hero_right">
        ${[{ico:`fa-graduation-cap`,val:r.length,lbl:`Completadas`,color:`var(--mco)`},{ico:`fa-bolt`,val:i||`—`,lbl:`WPM Récord`,color:`#f59e0b`},{ico:`fa-bullseye`,val:o===`—`?`—`:`${o}%`,lbl:`Precisión`,color:`#22c55e`},{ico:`fa-fire`,val:s,lbl:`Racha días`,color:`#ef4444`}].map(e=>`
          <div class="pg_kpi">
            <div class="pg_kpi_ico" style="color:${e.color}"><i class="fas ${e.ico}"></i></div>
            <div class="pg_kpi_val" id="pg_kpi_${e.lbl.replace(/\s/g,`_`).toLowerCase()}">${e.val}</div>
            <div class="pg_kpi_lbl">${e.lbl}</div>
          </div>`).join(``)}
      </div>
    </div>

    <!-- ══ BARRA GLOBAL ══ -->
    <div class="pg_global_card wi_fadeUp">
      <div class="pg_gbar_info">
        <span><i class="fas fa-list-check" style="color:var(--mco)"></i> Progreso general</span>
        <span class="pg_gbar_pct">${r.length} / 45 · <b>${c}%</b></span>
      </div>
      <div class="pg_gbar_track">
        <div class="pg_gbar_fill" id="pg_gbar" style="width:0%"></div>
      </div>
      <div class="pg_nivel_tags">
        ${l.map(e=>`
          <span class="pg_nivel_tag ${e.done?`done`:``}"
            style="color:${e.color};border-color:${e.color}">
            N${e.n} ${e.done?`✓`:``}
          </span>`).join(``)}
      </div>
    </div>

    <!-- ══ HISTORIAL DE LECCIONES ══ -->
    <div class="pg_sec_hdr wi_fadeUp">
      <div class="pg_sec_title"><i class="fas fa-book-open"></i> Historial de lecciones</div>
      <div class="pg_sec_sub" id="pg_hist_sub">Cargando...</div>
    </div>

    <div class="pg_hist_grid" id="pg_hist_grid">
      ${f.map((e,t)=>h(e,r,t)).join(``)}
    </div>

  </div>`};function h(e,t,r){let i=String(e.id).padStart(2,`0`),a=(d.find(t=>t.n===e.n)||{}).color||`var(--mco)`,o=e.id===1||t.includes(e.id-1)||t.includes(e.id),s=t.includes(e.id),c=s?`completada`:o?`disponible`:`bloqueada`,l=s?`✓ Hecha`:o?`Disponible`:`🔒`,u=n(`wiPrac_${e.id}`)||{},f=u.wpm||0,p=u.precision||0,m=u.estrellas||0,h=s?`<div class="pg_hc_stars">${[1,2,3,4,5].map(e=>`<i class="fas fa-star ${e<=m?`on`:``}"></i>`).join(``)}</div>`:``;return`
    <div class="pg_hist_card ${s||o?``:`bloqueada`} wi_fadeUp"
      style="--hc:${a};--d:${r*.02}s"
      data-id="${e.id}" data-page="leccion${i}"
      ${o&&!s?`title="Ir a lección ${i}"`:``}
      ${s?`title="${e.t} · ${f} WPM"`:``}>

      <div class="pg_hc_top">
        <span class="pg_hc_num">Lección ${i}</span>
        <span class="pg_hc_badge ${c}">${l}</span>
      </div>

      <div class="pg_hc_title">${e.t}</div>
      <div class="pg_hc_sub">${e.s}</div>

      ${s?`
        <div class="pg_hc_stats">
          <span class="pg_hc_stat" style="color:${a}"><i class="fas fa-bolt"></i> ${f} WPM</span>
          <span class="pg_hc_stat" style="color:#22c55e"><i class="fas fa-bullseye"></i> ${p}%</span>
        </div>
        ${h}
      `:o?`
        <div class="pg_hc_stats">
          <span class="pg_hc_stat"><i class="fas fa-play"></i> Practicar</span>
        </div>
      `:`
        <div class="pg_hc_stats">
          <span class="pg_hc_stat"><i class="fas fa-lock"></i> Completa la anterior primero</span>
        </div>
      `}
    </div>`}var g=null,_=()=>{let r=p();if(!r)return;requestAnimationFrame(()=>{let t=n(`wiProgreso`)||{},r=Math.round((t.leccionesOk?.length||0)/45*100);e(`#pg_gbar`).css(`width`,`${r}%`)}),g=i(`.wi_fadeUp`,null,{anim:`wi_fadeUp`,stagger:25});let a=((n(`wiProgreso`)||{}).leccionesOk||[]).length;e(`#pg_hist_sub`).text(`${a} de 45 completadas`),e(document).off(`.pg`).on(`click.pg`,`.pg_hist_card:not(.bloqueada)`,function(){let n=e(this).data(`page`);n&&t(async()=>{let{rutas:e}=await import(`./ruta-D7xPJmn7.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/${n}`))}),y(r.usuario)},v=()=>{g?.disconnect?.(),e(document).off(`.pg`)};async function y(i){try{let a=await s(o(c(u,`lecciones`,i,`detalle`),l(`leccionId`)));if(a.empty)return;let d=n(`wiProgreso`)||{},p=new Set(d.leccionesOk||[]),m=0,g=0,_=0;a.forEach(e=>{let t=e.data(),n=t.leccionId;p.add(n),r(`wiPrac_${n}`,{wpm:t.wpm||0,precision:t.precision||0,estrellas:t.estrellas||0,intentos:t.intentos||1},720),m+=t.wpm||0,g+=t.precision||0,_++});let v={...d,leccionesOk:[...p],wpmRecord:d.wpmRecord||0,precisionPct:_>0?Math.round(g/_):0};r(`wiProgreso`,v,24);let y=[...p],b=f.map((e,t)=>h(e,y,t)).join(``);e(`#pg_hist_grid`).html(b);let x=Math.round(y.length/45*100);e(`#pg_gbar`).css(`width`,`${x}%`),e(`#pg_hist_sub`).text(`${y.length} de 45 completadas`),e(`#pg_kpi_completadas`).text(y.length),e(`#pg_kpi_precisión`).text(v.precisionPct?`${v.precisionPct}%`:`—`),e(document).off(`.pg`).on(`click.pg`,`.pg_hist_card:not(.bloqueada)`,function(){let n=e(this).data(`page`);n&&t(async()=>{let{rutas:e}=await import(`./ruta-D7xPJmn7.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/${n}`))}),console.log(`📊 [progreso] ${y.length} lecciones cargadas de lecciones/${i}/detalle`)}catch(e){console.error(`[progreso] Error cargando:`,e)}}export{v as cleanup,_ as init,m as render};