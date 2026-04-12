import './ejemplos.css';
import $ from 'jquery';
import { plantillas, nombres, categorias } from '../parametros.js';

const esc = (s) => (s || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const pool = {
  Amor: [
    { de: 'Carlos', para: 'Maria', msg: 'Cada dia a tu lado es un regalo que atesoro. Eres la razon de mi sonrisa mas sincera' },
    { de: 'Sofia', para: 'Daniel', msg: 'No sabia que existia un amor asi hasta que te encontre. Gracias por hacerme tan feliz' },
    { de: 'Andres', para: 'Valentina', msg: 'Eres mi persona favorita en este mundo. Te amo mas de lo que las palabras pueden expresar' },
    { de: 'Luna', para: 'Mateo', msg: 'Contigo aprendi que el amor verdadero no se busca, simplemente llega y lo cambia todo' }
  ],
  Amistad: [
    { de: 'Ana', para: 'Lucia', msg: 'Gracias por ser la amiga que todos quisieran tener. Nuestra amistad dura para siempre' },
    { de: 'Pedro', para: 'Juan', msg: 'Hermano de otra madre. Gracias por las risas, los consejos y por bancarte mis locuras' },
    { de: 'Camila', para: 'Renata', msg: 'No importa la distancia ni el tiempo, nuestra amistad siempre sera especial' },
    { de: 'Diego', para: 'Tomas', msg: 'Los mejores recuerdos de mi vida los tengo contigo. Gracias por ser un amigo increible' }
  ],
  Aniversario: [
    { de: 'Roberto', para: 'Elena', msg: 'Un anio mas juntos y cada dia te elijo de nuevo. Feliz aniversario mi amor' },
    { de: 'Mariana', para: 'Sebastian', msg: '365 dias mas de risas, aventuras y amor infinito. Que vengan muchos mas' },
    { de: 'Felipe', para: 'Isabella', msg: 'Hoy celebro el mejor dia de mi vida: el dia que decidimos estar juntos' },
    { de: 'Valeria', para: 'Nicolas', msg: 'Cada mes a tu lado es un capitulo hermoso. Feliz aniversario amor mio' }
  ],
  Carta: [
    { de: 'Gabriel', para: 'Alejandra', msg: 'Querida mia, escribo estas lineas porque hay sentimientos que necesitan mas que una simple frase' },
    { de: 'Fernanda', para: 'Miguel', msg: 'Mi querido Miguel, esta carta lleva guardada todo lo que mi corazon siente por ti' },
    { de: 'Joaquin', para: 'Paulina', msg: 'Cada palabra de esta carta lleva un pedazo de mi alma. Ojala puedas sentir todo lo que siento' },
    { de: 'Clara', para: 'Emilio', msg: 'Querido Emilio, si pudiera escribir todo lo que significas necesitaria un libro entero' }
  ],
  Declaracion: [
    { de: 'Martin', para: 'Catalina', msg: 'Llevaba tiempo queriendo decirte esto: me gustas mucho. Me darias la oportunidad de hacerte feliz?' },
    { de: 'Isabela', para: 'Rodrigo', msg: 'No puedo seguir callando lo que siento. Cada vez que te veo mi corazon se acelera. Me encantas' },
    { de: 'Tomas', para: 'Daniela', msg: 'Se que es un mensaje, pero es el mas sincero que he escrito. Me enamore de ti' },
    { de: 'Camila', para: 'Santiago', msg: 'Hoy decidi ser valiente y decirte lo que siento. Eres la persona mas especial que he conocido' }
  ],
  Saludo: [
    { de: 'Amor', para: 'Sol', msg: 'Buenos dias hermosa, que tu dia este lleno de sonrisas y bendiciones. Mereces lo mejor del mundo' },
    { de: 'Tu amiga', para: 'Estrella', msg: 'Buenas noches amiga, descansa bonito. Maniana sera un dia increible, lo presiento' },
    { de: 'Mama', para: 'Hijita', msg: 'Buenos dias mi amor, recuerda que eres fuerte, valiente y capaz de lograr todo lo que te propongas' },
    { de: 'Tu novio', para: 'Princesa', msg: 'Buenas noches mi vida, que suenies con cosas bonitas. Te mando un abrazo enorme' }
  ]
};

const getMsgs = (n) => pool[n] || [{ de: 'Lovewi', para: 'Tu', msg: plantillas[n].ej }];

const card = (n, m, i) => {
  var p = plantillas[n];
  return '<div class="ej_card" style="--delay:' + (i * 0.08) + 's">' +
    '<div class="ej_card_accent" style="background:' + p.b + '"></div>' +
    '<div class="ej_card_body">' +
      '<div class="ej_card_cab">' +
        '<span class="ej_card_emoji">' + p.e + '</span>' +
        '<span class="ej_card_tipo">' + n + '</span>' +
      '</div>' +
      '<p class="ej_card_msg">' + m.msg + '</p>' +
      '<div class="ej_card_meta">' +
        '<span class="ej_card_de"><i class="fas fa-user"></i> ' + m.de + '</span>' +
        '<span class="ej_card_para"><i class="fas fa-heart"></i> ' + m.para + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="ej_card_footer">' +
      '<button class="ej_btn_copiar" data-msg="' + esc(m.msg) + '"><i class="fas fa-copy"></i></button>' +
      '<a class="ej_btn_usar" href="/crear" data-pl="' + n + '" data-msg="' + esc(m.msg) + '" data-de="' + esc(m.de) + '" data-para="' + esc(m.para) + '"><i class="fas fa-paper-plane"></i> Usar</a>' +
      '<button class="ej_btn_ver" data-pl="' + n + '" data-de="' + esc(m.de) + '" data-para="' + esc(m.para) + '" data-msg="' + esc(m.msg) + '"><i class="fas fa-eye"></i></button>' +
    '</div>' +
  '</div>';
};

const seccion = (n) => {
  var p = plantillas[n];
  var msgs = getMsgs(n);
  var cards = '';
  for (var i = 0; i < msgs.length; i++) cards += card(n, msgs[i], i);

  return '<div class="ej_seccion" data-cat="' + p.k + '">' +
    '<div class="ej_sec_header">' +
      '<div class="ej_sec_icono" style="background:' + p.b + '"><i class="fas ' + p.i + '"></i></div>' +
      '<div class="ej_sec_info">' +
        '<h2>' + p.e + ' ' + n + '</h2>' +
        '<span class="ej_sec_badge">' + p.k + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="ej_sec_grid">' + cards + '</div>' +
  '</div>';
};

export var render = function() {
  var cats = categorias();
  var noms = nombres();
  var filtros = '<button class="ej_filtro active" data-cat="Todas"><i class="fas fa-border-all"></i> Todas</button>';
  for (var i = 0; i < cats.length; i++) {
    filtros += '<button class="ej_filtro" data-cat="' + cats[i] + '"><i class="fas fa-tag"></i> ' + cats[i] + '</button>';
  }
  var secciones = '';
  for (var j = 0; j < noms.length; j++) secciones += seccion(noms[j]);

  return '<div class="ejemplos">' +
    '<div class="ej_hero">' +
      '<div class="ej_hero_contenido">' +
        '<h1 class="ej_titulo"><i class="fas fa-lightbulb"></i> <span class="gradiente">Inspiracion</span> para tu mensaje</h1>' +
        '<p class="ej_subtitulo">Descubre ejemplos reales por categoria. Copia, edita y envia el que mas te guste.</p>' +
        '<div class="ej_stats">' +
          '<div class="stat"><i class="fas fa-pen-fancy"></i> ' + noms.length + ' plantillas</div>' +
          '<div class="stat"><i class="fas fa-tags"></i> ' + cats.length + ' categorias</div>' +
          '<div class="stat"><i class="fas fa-bolt"></i> Listos para usar</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="ej_body">' +
      '<div class="ej_filtros">' + filtros + '</div>' +
      '<div class="ej_lista" id="ejLista">' + secciones + '</div>' +
    '</div>' +
    '<div class="ej_cta">' +
      '<div class="ej_cta_contenido">' +
        '<span class="ej_cta_icono">&#10024;</span>' +
        '<h2>Te gusto alguno?</h2>' +
        '<p>Personalizalo con tu nombre y envialo a esa persona especial</p>' +
        '<a href="/crear" class="ej_cta_btn"><i class="fas fa-wand-magic-sparkles"></i> Crear mi mensaje</a>' +
      '</div>' +
    '</div>' +
  '</div>';
};

export var init = function() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  $('.ej_card, .ej_seccion').each(function() { obs.observe(this); });

  $(document).on('click.ej', '.ej_filtro', function() {
    var cat = $(this).data('cat');
    $('.ej_filtro').removeClass('active');
    $(this).addClass('active');
    $('.ej_seccion').each(function() {
      var show = cat === 'Todas' || $(this).data('cat') === cat;
      $(this).stop()[show ? 'slideDown' : 'slideUp'](300);
    });
  });

  $(document).on('click.ej', '.ej_btn_copiar', function() {
    var msg = $(this).data('msg');
    var $i = $(this).find('i');
    navigator.clipboard.writeText(msg).then(function() {
      $i.removeClass('fa-copy').addClass('fa-check');
      setTimeout(function() { $i.removeClass('fa-check').addClass('fa-copy'); }, 1500);
    });
  });

  $(document).on('click.ej', '.ej_btn_usar', function(e) {
    e.preventDefault();
    sessionStorage.setItem('wiPlantilla', $(this).data('pl'));
    sessionStorage.setItem('wiMsg', $(this).data('msg'));
    sessionStorage.setItem('wiDe', $(this).data('de'));
    sessionStorage.setItem('wiPara', $(this).data('para'));
    history.pushState({}, '', '/crear');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  $(document).on('click.ej', '.ej_btn_ver', function() {
    var n = $(this).data('pl');
    var p = plantillas[n];
    var url = location.origin + '/?' + n + '&de=' + encodeURIComponent($(this).data('de')) + '&para=' + encodeURIComponent($(this).data('para')) + '&msg=' + encodeURIComponent($(this).data('msg'));
    if (p.mu) url += '&musica=' + encodeURIComponent(p.mu);
    window.open(url, '_blank');
  });
};

export var cleanup = function() { $(document).off('.ej'); };