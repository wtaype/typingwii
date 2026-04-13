import './acerca.css';
import $ from 'jquery';

var features = [
  { i: 'fa-heart', t: 'Hecho con amor', d: 'Cada detalle esta pensado para que tu mensaje sea especial e inolvidable' },
  { i: 'fa-palette', t: '6 plantillas unicas', d: 'Amor, amistad, aniversario, carta, declaracion y saludo con disenos exclusivos' },
  { i: 'fa-music', t: 'Musica incluida', d: 'Agrega musica de fondo para hacer tu mensaje aun mas emotivo' },
  { i: 'fa-bolt', t: 'Rapido y facil', d: 'Crea y envia tu mensaje en menos de 1 minuto sin registrarte' },
  { i: 'fa-cloud', t: 'En la nube', d: 'Con cuenta Smile tus mensajes se guardan para siempre en la nube' },
  { i: 'fa-share-nodes', t: 'Comparte donde quieras', d: 'WhatsApp, Telegram o cualquier red social con un solo click' },
  { i: 'fa-lock', t: 'Links privados', d: 'Solo quien tenga el enlace puede ver tu mensaje. Seguro y personal' },
  { i: 'fa-mobile-screen', t: '100% responsive', d: 'Se ve perfecto en celular, tablet y computadora' }
];

var team = [
  { n: 'Lovewi Team', r: 'Desarrollo', i: 'fa-code', d: 'Creado con pasion para conectar corazones a traves de la tecnologia' }
];

export var render = function() {
  var featHTML = '';
  for (var i = 0; i < features.length; i++) {
    var f = features[i];
    featHTML += '<div class="ac_feat" style="--delay:' + (i * 0.08) + 's">' +
      '<div class="ac_feat_icono"><i class="fas ' + f.i + '"></i></div>' +
      '<h3>' + f.t + '</h3>' +
      '<p>' + f.d + '</p>' +
    '</div>';
  }

  var teamHTML = '';
  for (var j = 0; j < team.length; j++) {
    var t = team[j];
    teamHTML += '<div class="ac_team_card">' +
      '<div class="ac_team_avatar"><i class="fas ' + t.i + '"></i></div>' +
      '<h3>' + t.n + '</h3>' +
      '<span class="ac_team_rol">' + t.r + '</span>' +
      '<p>' + t.d + '</p>' +
    '</div>';
  }

  return '<div class="acerca">' +

    '<div class="ac_hero">' +
      '<div class="ac_hero_contenido">' +
        '<div class="ac_logo_grande">&#128140;</div>' +
        '<h1 class="ac_titulo">Lovewi</h1>' +
        '<p class="ac_tagline">Mensajes que tocan el corazon</p>' +
        '<p class="ac_desc">Lovewi es una plataforma gratuita para crear y enviar mensajes personalizados con plantillas hermosas, musica y animaciones.</p>' +
        '<div class="ac_hero_stats">' +
          '<div class="stat"><i class="fas fa-palette"></i> 6 plantillas</div>' +
          '<div class="stat"><i class="fas fa-heart"></i> 100% gratis</div>' +
          '<div class="stat"><i class="fas fa-bolt"></i> Sin registro</div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div class="ac_seccion">' +
      '<div class="ac_sec_header">' +
        '<span class="ac_sec_icono"><i class="fas fa-star"></i></span>' +
        '<h2>Que hace especial a <span class="gradiente">Lovewi</span>?</h2>' +
        '<p>Todo lo que necesitas para expresar lo que sientes</p>' +
      '</div>' +
      '<div class="ac_feat_grid">' + featHTML + '</div>' +
    '</div>' +

    '<div class="ac_seccion ac_como">' +
      '<div class="ac_sec_header">' +
        '<span class="ac_sec_icono"><i class="fas fa-route"></i></span>' +
        '<h2>Como <span class="gradiente">funciona</span>?</h2>' +
        '<p>3 pasos simples para emocionar a alguien</p>' +
      '</div>' +
      '<div class="ac_pasos">' +
        '<div class="ac_paso"><div class="ac_paso_num">1</div><div class="ac_paso_icono"><i class="fas fa-pen-fancy"></i></div><h3>Escribe</h3><p>Elige plantilla, escribe tu mensaje y personaliza como quieras</p></div>' +
        '<div class="ac_paso_linea"><i class="fas fa-chevron-right"></i></div>' +
        '<div class="ac_paso"><div class="ac_paso_num">2</div><div class="ac_paso_icono"><i class="fas fa-cloud-arrow-up"></i></div><h3>Genera</h3><p>Guarda en la nube y obtiene un enlace unico para compartir</p></div>' +
        '<div class="ac_paso_linea"><i class="fas fa-chevron-right"></i></div>' +
        '<div class="ac_paso"><div class="ac_paso_num">3</div><div class="ac_paso_icono"><i class="fas fa-paper-plane"></i></div><h3>Envia</h3><p>Comparte por WhatsApp, Telegram o donde prefieras</p></div>' +
      '</div>' +
    '</div>' +

    '<div class="ac_seccion">' +
      '<div class="ac_sec_header">' +
        '<span class="ac_sec_icono"><i class="fas fa-users"></i></span>' +
        '<h2>Nuestro <span class="gradiente">equipo</span></h2>' +
      '</div>' +
      '<div class="ac_team">' + teamHTML + '</div>' +
    '</div>' +

    '<div class="ac_cta">' +
      '<div class="ac_cta_contenido">' +
        '<span class="ac_cta_icono">&#128140;</span>' +
        '<h2>Listo para emocionar a alguien?</h2>' +
        '<p>Crea tu primer mensaje en menos de 1 minuto</p>' +
        '<div class="ac_cta_btns">' +
          '<a href="/crear" class="ac_cta_btn"><i class="fas fa-wand-magic-sparkles"></i> Crear mensaje</a>' +
          '<a href="/ejemplos" class="ac_cta_btn2"><i class="fas fa-lightbulb"></i> Ver ejemplos</a>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div class="ac_footer_extra">' +
      '<p>Lovewi v10 &middot; Hecho con <i class="fas fa-heart" style="color:var(--mco)"></i> &middot; 2025-2026</p>' +
    '</div>' +

  '</div>';
};

export var init = function() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  $('.ac_feat, .ac_paso, .ac_team_card, .ac_seccion').each(function() { obs.observe(this); });
};

export var cleanup = function() {};