import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,d as n,f as r}from"./widev-BFyzE1uG.js";import{t as i}from"./wii-92BiU8Qt.js";import{c as a,i as o,p as s,s as c}from"./firebase-sojJ90-r.js";import{n as l}from"./firebase-BVXQ9QC5.js";var u=[{n:1,lbl:`Fila Central`,color:`#22c55e`},{n:2,lbl:`Fila Superior`,color:`#0ea5e9`},{n:3,lbl:`Fila Inferior`,color:`#f97316`},{n:4,lbl:`Frases y Números`,color:`#a855f7`},{n:5,lbl:`Intermedio`,color:`#06b6d4`},{n:6,lbl:`Párrafos`,color:`#ec4899`},{n:7,lbl:`Avanzado`,color:`#f59e0b`},{n:8,lbl:`Velocidad`,color:`#10b981`},{n:9,lbl:`Experto`,color:`#ef4444`},{n:10,lbl:`Maestro`,color:`#7c3aed`}],d=[{id:1,n:1,t:`Teclas F y J`,s:`Índices · fila central`},{id:2,n:1,t:`Teclas D y K`,s:`Dedos medios · fila central`},{id:3,n:1,t:`Teclas S y L`,s:`Dedos anulares · fila central`},{id:4,n:1,t:`Fila Central Completa`,s:`A S D F J K L Ñ`},{id:5,n:1,t:`Primeras Palabras`,s:`Palabras con fila central`},{id:6,n:2,t:`Teclas E e I`,s:`Dedos medios · fila superior`},{id:7,n:2,t:`Teclas R y U`,s:`Índices · fila superior`},{id:8,n:2,t:`Teclas T e Y`,s:`Índices al centro superior`},{id:9,n:2,t:`Teclas W y O`,s:`Anulares · fila superior`},{id:10,n:2,t:`Fila Superior + Central`,s:`Q W E R T Y U I O P`},{id:11,n:3,t:`Teclas V y B`,s:`Índices · fila inferior`},{id:12,n:3,t:`Teclas N y M`,s:`Índice derecho · fila inferior`},{id:13,n:3,t:`Teclas C y coma`,s:`Dedos medios · fila inferior`},{id:14,n:3,t:`Teclas Z y X`,s:`Meñique y anular izquierdo`},{id:15,n:3,t:`Todas las filas`,s:`Alfabeto QWERTY completo`},{id:16,n:4,t:`Frases Simples`,s:`Velocidad con precisión`},{id:17,n:4,t:`Números 1 al 5`,s:`Fila numérica · mitad izquierda`},{id:18,n:4,t:`Números 6 al 0`,s:`Fila numérica · mitad derecha`},{id:19,n:4,t:`Todos los números`,s:`Fila numérica completa`},{id:20,n:4,t:`Texto Real`,s:`Práctica con texto natural`},{id:21,n:5,t:`Puntuación Básica`,s:`Punto, coma y dos puntos`},{id:22,n:5,t:`Mayúsculas con Shift`,s:`Shift + tecla = mayúscula`},{id:23,n:5,t:`Palabras Comunes`,s:`Las 50 palabras más usadas`},{id:24,n:5,t:`Palabras Comunes II`,s:`Continuación top palabras`},{id:25,n:5,t:`Frases del Día a Día`,s:`Comunicación cotidiana`},{id:26,n:6,t:`Párrafo Corto I`,s:`Texto continuo sin pausas`},{id:27,n:6,t:`Párrafo Corto II`,s:`Ideas conectadas`},{id:28,n:6,t:`Números en Contexto`,s:`Mezcla de texto y números`},{id:29,n:6,t:`Email Profesional`,s:`Redacción de comunicados`},{id:30,n:6,t:`Velocidad Inicial`,s:`Test de velocidad real`},{id:31,n:7,t:`Texto Técnico I`,s:`Vocabulario especializado`},{id:32,n:7,t:`Texto Técnico II`,s:`Informática y tecnología`},{id:33,n:7,t:`Párrafo Largo I`,s:`Resistencia y concentración`},{id:34,n:7,t:`Acentos y Tilde`,s:`Español con tildes correctas`},{id:35,n:7,t:`Signos de Puntuación`,s:`Puntuación avanzada`},{id:36,n:8,t:`Objetivo: 40 WPM`,s:`Nivel profesional básico`},{id:37,n:8,t:`Objetivo: 50 WPM`,s:`Mecanógrafo competente`},{id:38,n:8,t:`Objetivo: 60 WPM`,s:`Nivel avanzado de escritura`},{id:39,n:9,t:`Texto Académico`,s:`Redacción universitaria`},{id:40,n:9,t:`Texto Jurídico`,s:`Redacción legal y formal`},{id:41,n:9,t:`Código de Programación`,s:`Sintaxis y símbolos técnicos`},{id:42,n:9,t:`Objetivo: 70 WPM`,s:`Experto en mecanografía`},{id:43,n:10,t:`Velocidad: 80 WPM`,s:`Maestro de la mecanografía`},{id:44,n:10,t:`Texto Mixto Complejo`,s:`Letras, números y símbolos`},{id:45,n:10,t:`Párrafo de Maestría`,s:`El texto definitivo`}],f=()=>n(`wiSmile`),p=()=>{let e=f();if(!e)return`
    <div class="pg_wrap">
      <div class="pg_empty">
        <i class="fas fa-lock pg_empty_ico"></i>
        <h3>Sin sesión activa</h3>
        <p>Inicia sesión para ver tu progreso.</p>
      </div>
    </div>`;let t=n(`wiProgreso`)||{},r=t.leccionesOk||[],a=t.wpmRecord||0,o=t.precisionPct==null?null:t.precisionPct,s=t.rachaDias==null?0:t.rachaDias,c=Math.round(r.length/45*100),l=u.map(e=>{let t=d.filter(t=>t.n===e.n).map(e=>e.id),n=t.length>0&&t.every(e=>r.includes(e));return{...e,done:n}}),p=[{id:`pg_k_lec`,ico:`fa-graduation-cap`,val:r.length,lbl:`Completadas`,col:`var(--mco)`},{id:`pg_k_wpm`,ico:`fa-bolt`,val:a||`—`,lbl:`WPM Récord`,col:`#f59e0b`},{id:`pg_k_prec`,ico:`fa-bullseye`,val:o==null?`—`:`${o}%`,lbl:`Precisión`,col:`#22c55e`},{id:`pg_k_dia`,ico:`fa-fire`,val:s,lbl:`Racha días`,col:`#ef4444`}];return`
  <div class="pg_wrap">

    <!-- ══ HERO ══ -->
    <div class="pg_hero">
      <div class="pg_hero_left">
        <div class="pg_hero_badge"><i class="fas fa-chart-line"></i> Mi Progreso</div>
        <h1 class="pg_hero_title">Tu camino a <span>80 WPM</span></h1>
        <p class="pg_hero_sub">${e.nombre||e.usuario} · ${i}</p>
      </div>
      <div class="pg_hero_kpis">
        ${p.map(e=>`
          <div class="pg_kpi">
            <div class="pg_kpi_ico" style="color:${e.col}"><i class="fas ${e.ico}"></i></div>
            <div class="pg_kpi_val" id="${e.id}">${e.val}</div>
            <div class="pg_kpi_lbl">${e.lbl}</div>
          </div>`).join(``)}
      </div>
    </div>

    <!-- ══ BARRA GLOBAL ══ -->
    <div class="pg_global_card">
      <div class="pg_gbar_info">
        <span><i class="fas fa-list-check" style="color:var(--mco)"></i> Progreso general</span>
        <span class="pg_gbar_pct" id="pg_gbar_txt">${r.length} / 45 · <b>${c}%</b></span>
      </div>
      <div class="pg_gbar_track">
        <div class="pg_gbar_fill" id="pg_gbar" style="width:0%"></div>
      </div>
      <div class="pg_nivel_tags">
        ${l.map(e=>`
          <span class="pg_nivel_tag ${e.done?`done`:``}"
            style="color:${e.color};border-color:${e.color}">
            N${e.n}${e.done?` ✓`:``}
          </span>`).join(``)}
      </div>
    </div>

    <!-- ══ HISTORIAL ══ -->
    <div class="pg_sec_hdr">
      <div class="pg_sec_title"><i class="fas fa-book-open"></i> Historial de lecciones</div>
      <div class="pg_sec_sub" id="pg_sub">${r.length} de 45 completadas</div>
    </div>

    <div class="pg_hist_grid" id="pg_hist_grid">
      ${d.map(e=>m(e,r)).join(``)}
    </div>

  </div>`};function m(e,t){let r=String(e.id).padStart(2,`0`),i=(u.find(t=>t.n===e.n)||{}).color||`var(--mco)`,a=t.includes(e.id),o=e.id===1||t.includes(e.id-1)||a,s=a&&n(`wiPrac_${e.id}`)||{},c=s.wpm||0,l=s.precision||0,d=s.estrellas||0,f=a?`<i class="fas fa-check"></i> ${c?c+` WPM`:`Hecha`}`:o?`<i class="fas fa-play"></i> Practicar`:`<i class="fas fa-lock"></i> Bloqueada`,p=a?`completada`:o?`disponible`:`bloqueada`,m=a&&d>0?`<div class="pg_hc_stars">${[1,2,3,4,5].map(e=>`<i class="fas fa-star ${e<=d?`on`:``}"></i>`).join(``)}</div>`:``;return`
    <div class="pg_hist_card ${a?`pg_done`:``} ${o?``:`pg_lock`}"
      style="--hc:${i}"
      data-page="leccion${r}"
      ${o?`title="Ir a lección ${r}"`:`title="Completa la lección anterior primero"`}>

      <div class="pg_hc_top">
        <span class="pg_hc_num">Lección ${r}</span>
        <span class="pg_hc_badge ${p}">${f}</span>
      </div>

      <div class="pg_hc_title">${e.t}</div>
      <div class="pg_hc_sub">${e.s}</div>

      ${a?`
        <div class="pg_hc_stats">
          <span class="pg_hc_stat" style="color:${i}"><i class="fas fa-bolt"></i> ${c} WPM</span>
          <span class="pg_hc_stat" style="color:#22c55e"><i class="fas fa-bullseye"></i> ${l}%</span>
        </div>
        ${m}
      `:`
        <div class="pg_hc_stats">
          <span class="pg_hc_stat" style="color:var(--tx3)">${f}</span>
        </div>
      `}
    </div>`}var h=()=>{let r=f();r&&(requestAnimationFrame(()=>{setTimeout(()=>{let t=n(`wiProgreso`)||{},r=Math.round((t.leccionesOk?.length||0)/45*100);e(`#pg_gbar`).css(`width`,`${r}%`)},50)}),e(document).off(`.pg`),e(document).on(`click.pg`,`.pg_hist_card:not(.pg_lock)`,function(){let n=e(this).data(`page`);n&&t(async()=>{let{rutas:e}=await import(`./ruta-BIDGd8j4.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/${n}`))}),_(r.usuario))},g=()=>{e(document).off(`.pg`)};async function _(i){try{let u=await o(a(s(l,`lecciones`,i,`detalle`),c(`leccionId`)));if(u.empty)return;let f=n(`wiProgreso`)||{},p=new Set(f.leccionesOk||[]),h=0,g=0,_=0,v=f.wpmRecord||0;u.forEach(e=>{let t=e.data(),n=t.leccionId;if(!n)return;p.add(n);let i=t.wpm||0;i>v&&(v=i),r(`wiPrac_${n}`,{wpm:i,precision:t.precision||0,estrellas:t.estrellas||0,intentos:t.intentos||1},720),h+=i,g+=t.precision||0,_++});let y=[...p],b=_>0?Math.round(g/_):0;r(`wiProgreso`,{...f,leccionesOk:y,wpmRecord:v,precisionPct:b},24);let x=Math.round(y.length/45*100);e(`#pg_gbar`).css(`width`,`${x}%`),e(`#pg_gbar_txt`).html(`${y.length} / 45 · <b>${x}%</b>`),e(`#pg_sub`).text(`${y.length} de 45 completadas`),e(`#pg_k_lec`).text(y.length),e(`#pg_k_wpm`).text(v||`—`),e(`#pg_k_prec`).text(b?`${b}%`:`—`),e(`#pg_hist_grid`).html(d.map(e=>m(e,y)).join(``)),e(document).off(`.pg`).on(`click.pg`,`.pg_hist_card:not(.pg_lock)`,function(){let n=e(this).data(`page`);n&&t(async()=>{let{rutas:e}=await import(`./ruta-BIDGd8j4.js`).then(e=>e.n);return{rutas:e}},[]).then(({rutas:e})=>e.navigate(`/${n}`))}),console.log(`📊 [progreso] ${y.length} lecciones · WPM max ${v}`)}catch(e){console.error(`[progreso] Error sync:`,e)}}export{g as cleanup,h as init,p as render};