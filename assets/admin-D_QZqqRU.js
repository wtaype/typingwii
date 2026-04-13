import{t as e}from"./wii-CZYUy4T7.js";import{t}from"./vendor-BDh6mtVu.js";import{a as n,d as r,f as i,n as a,y as o}from"./widev-C3qELtTZ.js";import{c as s,d as c,f as l,n as u}from"./firebase-By6_FWdI.js";import{db as d}from"./firebase-CiL2SFsg.js";var f=()=>r(`wiSmile`),p=`amUsersTotal`,m=`amUsersPro`,h=`amLessonsTotal`,g=`amOrgsTotal`,_=()=>f()?`
  <div class="am_page" id="am_root">
    
    <!-- ══ BACKGROUND ══ -->
    <div class="am_orb am_orb1"></div>
    <div class="am_orb am_orb2"></div>

    <!-- ══ COMPACT HERO ══ -->
    <div class="am_hero">
      <div class="am_hero_inner wi_fadeUp">
        <div class="am_hero_ico"><i class="fas fa-crown"></i></div>
        <div class="am_hero_txt">
          <div class="am_hero_top">${n()} 👋</div>
          <h1 class="am_h1">Centro de Control</h1>
          <p class="am_sub">Administración maestra de la plataforma ${e}.</p>
        </div>
        <div class="am_hero_btn_wrap">
          <button class="am_btn_sync" id="am_btn_refresh">
            <i class="fas fa-rotate"></i> <span>Consultar Ahora</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ══ MASTER KPIs ══ -->
    <div class="am_grid_4">
      <div class="am_kpi wi_fadeUp" style="--d:.05s">
        <div class="am_kpi_head">
          <div class="am_ki_ico" style="--c:#0EBEFF"><i class="fas fa-users"></i></div>
          <span class="am_ki_label">Usuarios</span>
        </div>
        <div class="am_ki_val" id="am_n_total">—</div>
        <div class="am_ki_trend"><i class="fas fa-arrow-trend-up"></i> Total registrados</div>
      </div>

      <div class="am_kpi wi_fadeUp" style="--d:.1s">
        <div class="am_kpi_head">
          <div class="am_ki_ico" style="--c:#37dd7a"><i class="fas fa-star"></i></div>
          <span class="am_ki_label">Suscripciones</span>
        </div>
        <div class="am_ki_val" id="am_n_pro">—</div>
        <div class="am_ki_trend"><i class="fas fa-circle-check"></i> Planes Pro con acceso</div>
      </div>

      <div class="am_kpi wi_fadeUp" style="--d:.15s">
        <div class="am_kpi_head">
          <div class="am_ki_ico" style="--c:#fd7e14"><i class="fas fa-book-open"></i></div>
          <span class="am_ki_label">Lecciones</span>
        </div>
        <div class="am_ki_val" id="am_n_les">—</div>
        <div class="am_ki_trend"><i class="fas fa-layer-group"></i> Contenido publicado</div>
      </div>

      <div class="am_kpi wi_fadeUp" style="--d:.2s">
        <div class="am_kpi_head">
          <div class="am_ki_ico" style="--c:#7000FF"><i class="fas fa-school"></i></div>
          <span class="am_ki_label">Escuelas</span>
        </div>
        <div class="am_ki_val" id="am_n_org">—</div>
        <div class="am_ki_trend"><i class="fas fa-building-columns"></i> Organizaciones B2B</div>
      </div>
    </div>

    <!-- ══ ACCIONES MAESTRAS ══ -->
    <div class="am_section_header wi_fadeUp" style="--d:.25s">
      <h2 class="am_sec_h2">Gestión de Plataforma</h2>
    </div>

    <div class="am_actions_grid">
      <a href="/personas" class="am_act_card nv_item wi_fadeUp" data-page="personas" style="--d:.3s">
        <div class="am_act_ico" style="--bc:rgba(254,65,59,.1);--c:#fe413b"><i class="fas fa-user-gear"></i></div>
        <div class="am_act_info">
          <strong>Usuarios Globales</strong>
          <span>Moderación y perfiles de usuario</span>
        </div>
        <i class="fas fa-arrow-right am_act_arr"></i>
      </a>

      <a href="/roles" class="am_act_card nv_item wi_fadeUp" data-page="roles" style="--d:.35s">
        <div class="am_act_ico" style="--bc:rgba(255,200,0,.12);--c:#d4a700"><i class="fas fa-pen-nib"></i></div>
        <div class="am_act_info">
          <strong>Editor de Contenido</strong>
          <span>Gestionar lecciones y niveles</span>
        </div>
        <i class="fas fa-arrow-right am_act_arr"></i>
      </a>

      <a href="/subir" class="am_act_card nv_item wi_fadeUp" data-page="subir" style="--d:.4s">
        <div class="am_act_ico" style="--bc:rgba(55,161,221,.1);--c:#37A1DD"><i class="fas fa-file-contract"></i></div>
        <div class="am_act_info">
          <strong>Contratos B2B</strong>
          <span>Gestión de escuelas y licencias</span>
        </div>
        <i class="fas fa-arrow-right am_act_arr"></i>
      </a>
      
      <div class="am_act_card wi_fadeUp" style="--d:.45s">
         <div class="am_act_ico" style="--bc:rgba(112,0,255,.1);--c:#7000FF"><i class="fas fa-terminal"></i></div>
         <div class="am_act_info">
           <strong>Caché de Sistema</strong>
           <span>Estado de las consultas manuales</span>
         </div>
      </div>
    </div>

    <!-- ══ INFO COMPACTA ══ -->
    <div class="am_banner wi_fadeUp" style="--d:.5s">
      <div class="am_banner_ico"><i class="fas fa-shield-halved"></i></div>
      <div class="am_banner_txt">
        <strong>Seguridad & Eficiencia Firestore</strong>
        <p>Los indicadores usan caché manual infinita para optimizar recursos. Actualiza solo si es estrictamente necesario.</p>
      </div>
    </div>

  </div>`:`<div class="am_empty">Sin sesión administrativa.</div>`,v=()=>{o(`.wi_fadeUp`,null,{anim:`wi_fadeUp`}),b(!1),y()};function y(){t(document).off(`.am`).on(`click.am`,`#am_btn_refresh`,function(){b(!0)})}async function b(e=!1){let n=r(p),o=r(m),f=r(h),_=r(g);if(!e&&Number.isFinite(n)){x(`#am_n_total`,n),x(`#am_n_pro`,o),x(`#am_n_les`,f),x(`#am_n_org`,_);return}let v=t(`#am_btn_refresh`),y=v.html();v.html(`<i class="fas fa-spinner fa-spin"></i>`).prop(`disabled`,!0);try{let[t,r,v]=await Promise.all([u(l(d,`smiles`)),u(s(l(d,`smiles`),c(`estado`,`==`,`activo`))),u(l(d,`empresas`))]);n=t.data().count,o=r.data().count,f=12,_=v.data().count,i(p,n,87600),i(m,o,87600),i(h,f,87600),i(g,_,87600),x(`#am_n_total`,n),x(`#am_n_pro`,o),x(`#am_n_les`,f),x(`#am_n_org`,_),e&&a(`Base de datos sincronizada`,`success`)}catch(e){console.warn(e),a(`Error al sincronizar`,`error`)}finally{v.html(y).prop(`disabled`,!1)}}function x(e,n){let r=t(e);if(!r.length)return;let i=parseInt(n,10)||0;r.text(`0`);let a=0,o=Math.max(1,Math.ceil(i/40)),s=setInterval(()=>{a=Math.min(a+o,i),r.text(a),a>=i&&clearInterval(s)},25)}var S=()=>{t(document).off(`.am`)};export{S as cleanup,v as init,_ as render};