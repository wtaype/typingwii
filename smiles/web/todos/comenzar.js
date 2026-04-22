import '../lecciones/leccion.css';
import $ from 'jquery';
import { Notificacion, wiTip } from '../../widev.js';
import { wiTeclado } from '../lecciones/teclado.js';
import { adLeft, adRight } from '../lecciones/wiad.js';

const TEXTOS = [
  { id:1, nivel:'Fácil',   color:'#22c55e', texto:`El sol sale por las mañanas y nos da mucha alegria. Es un dia muy bonito para caminar por el campo y ver las flores de colores. Los pajaros cantan en los arboles mientras el viento sopla suave.` },
  { id:2, nivel:'Medio',   color:'#0EBEFF', texto:`La mecanografia es una habilidad esencial en el mundo digital actual. Escribir con fluidez y sin mirar el teclado permite que nuestras ideas fluyan directamente a la pantalla. Es cuestion de practica y constancia diaria.` },
  { id:3, nivel:'Difícil', color:'#f97316', texto:`La exploracion del cosmos ha revelado misterios inimaginables: desde agujeros negros masivos hasta exoplanetas con atmosferas complejas. El telescopio James Webb captura luz infrarroja a millones de kilometros de distancia.` },
];
const TIEMPOS = [{id:0,lbl:'∞ Sin límite'},{id:30,lbl:'30 seg'},{id:60,lbl:'1 min'},{id:120,lbl:'2 min'},{id:300,lbl:'5 min'}];
const ST = {N:0,OK:1,ERR:3};

let tiempoSel=60, E=null;
function _newE(t){ return {texto:t,chars:[],pos:0,iniciado:false,finalizado:false,timerID:null,segundos:tiempoSel,elapsed:0}; }

const nivelOpts = () => TEXTOS.map(t=>`<option value="${t.id}">${t.nivel}</option>`).join('');
const tiempoOpts = () => TIEMPOS.map(t=>`<option value="${t.id}"${t.id===tiempoSel?' selected':''}>${t.lbl}</option>`).join('');

export const render = () => `
<div class="lc_page">

  <!-- LAYOUT: AD | CONTENT | AD -->
  <div class="lc_layout">
    ${adLeft}

    <div class="lc_content">
      <!-- PROGRESS -->
      <div class="lc_prog_track"><div class="lc_prog_fill" id="lc_prog_fill"></div></div>

      <!-- TEXT AREA -->
      <div class="lc_texto_area" id="lc_texto_display" tabindex="0">
        <div class="lc_texto_inner" id="lc_texto_inner"></div>
      </div>

      <!-- BOTTOM: KEYBOARD + STATS -->
      <div class="lc_bottom">
        <div class="lc_kbd_col">
          <div id="lc_teclado"></div>
        </div>
        <div class="lc_side_panel">
          <div class="lc_sp_block lc_sp_wpm">
            <div class="lc_sp_n" id="lc_wpm">0</div>
            <div class="lc_sp_l"><i class="fas fa-bolt"></i> WPM</div>
          </div>
          <div class="lc_sp_block lc_sp_prec">
            <div class="lc_sp_n" id="lc_prec">100</div>
            <div class="lc_sp_l"><i class="fas fa-bullseye"></i> %</div>
          </div>
          <div class="lc_sp_block lc_sp_time" id="lc_timer_box">
            <div class="lc_sp_n" id="lc_secs">—</div>
            <div class="lc_sp_l"><i class="fas fa-clock"></i> seg</div>
          </div>
          <div class="lc_sp_sep"></div>
          <div class="lc_sp_mini">
            <span class="czm ok"><i class="fas fa-check"></i> <b id="lc_ok">0</b></span>
            <span class="czm er"><i class="fas fa-xmark"></i> <b id="lc_err">0</b></span>
          </div>
          <label class="lc_sp_sel"><i class="fas fa-clock"></i>
            <select id="lc_sel_tiempo" class="lc_sel">${tiempoOpts()}</select>
          </label>
          <button class="lc_sp_btn" id="lc_btn_next"><i class="fas fa-forward"></i> Siguiente</button>
          <button class="lc_sp_btn" id="lc_btn_reintentar" style="margin-top: 5px;"><i class="fas fa-redo"></i> Reiniciar</button>
        </div>
      </div>
    </div>

    ${adRight}
  </div>

</div>
`;

export const init = () => {
  wiTeclado.render('#lc_teclado');
  _reset(TEXTOS[0]);
  $(document).off('.lck');

  $(document).on('change.lck','#lc_sel_tiempo', function(){
    if(E.iniciado) return;
    tiempoSel=+$(this).val(); _reset(E.texto);
  });
  const _resetRandomText = () => {
    const others = TEXTOS.filter(t => !E || t.id !== E.texto.id);
    const next = others[Math.floor(Math.random() * others.length)] || TEXTOS[0];
    _reset(next);
  };
  $(document).on('click.lck','#lc_btn_next', _resetRandomText);
  $(document).on('click.lck','#lc_btn_reintentar', ()=>_reset(E.texto));
  $(document).on('click.lck','#lc_btn_siguiente', ()=>{ _resetRandomText(); });
  $(document).on('keydown.lck', e=>{ if(e.key==='Escape'){e.preventDefault();_reset(E.texto);} });
  // Start typing on ANY keydown (no click needed)
  $(document).on('keydown.lck', _onKey);
};

export const cleanup = () => { _clearTimer(); wiTeclado.clear(); $(document).off('.lck'); E=null; };

function _reset(t) {
  _clearTimer();
  E={texto:t,chars:[],pos:0,iniciado:false,finalizado:false,timerID:null,segundos:tiempoSel,elapsed:0};

  $('#lc_prog_fill').css({width:'0%',background:t.color});
  $('#lc_wpm').text(0); $('#lc_prec').text(100);
  $('#lc_ok').text(0); $('#lc_err').text(0);
  $('#lc_timer_box').removeClass('lc_warn');
  _timerHUD();
  _renderChars(t.texto);
  wiTeclado.clear();
  const f=t.texto[0]; if(f) wiTeclado.hint(f);
  setTimeout(()=>$('#lc_texto_display').trigger('focus'),60);
}
function _timerHUD(e=null){
  if(tiempoSel===0){$('#lc_secs').text(e??0);}
  else{$('#lc_secs').text(e??tiempoSel);}
}
function _renderChars(txt){
  const $in=$('#lc_texto_inner').empty(); E.chars=[];
  const parts = txt.split(/( )/);
  let $word = null;
  parts.forEach(p => {
    if (p === ' ') {
      const $s=$(`<span class="lc_ch lc_space"> </span>`);
      $in.append($s); E.chars.push({char:' ',$s,state:ST.N,hadErr:false});
      $word = null;
    } else if (p.length > 0) {
      $word = $('<span class="lc_word"></span>');
      [...p].forEach(ch => {
        const $s=$(`<span class="lc_ch">${ch}</span>`);
        $word.append($s); E.chars.push({char:ch,$s,state:ST.N,hadErr:false});
      });
      $in.append($word);
    }
  });
  _setCur(0);
}
function _setCur(p){ E.chars.forEach(c=>c.$s.removeClass('lc_ch_cur')); if(p<E.chars.length)E.chars[p].$s.addClass('lc_ch_cur'); }

function _arrancar(){
  if(E.iniciado||E.finalizado)return;
  E.iniciado=true;
  E.timerID=setInterval(()=>{
    E.elapsed++;
    if(tiempoSel===0){_timerHUD(E.elapsed);}
    else{E.segundos--;_timerHUD(E.segundos);if(E.segundos<=10)$('#lc_timer_box').addClass('lc_warn');if(E.segundos<=0)_terminar();}
    _recalc();
  },1000);
}

const SKIP=new Set(['Shift','CapsLock','Tab','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown','Insert','Delete','ContextMenu','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12']);

function _onKey(e){
  if(!E||E.finalizado||SKIP.has(e.key)||e.ctrlKey||e.altKey||e.metaKey)return;
  if(e.key==='Escape')return;
  e.preventDefault();
  if(!E.iniciado)_arrancar();
  if(e.key==='Backspace'){_back();return;}
  if(E.pos>=E.chars.length)return;
  const c=E.chars[E.pos], key=c.char==='\n'?'Enter':c.char, ok=e.key===key;
  wiTeclado.press(key,ok);
  c.$s.removeClass('lc_ch_cur lc_ch_ok lc_ch_err lc_ch_shake');
  if(ok){c.state=ST.OK;c.$s.addClass('lc_ch_ok');}
  else{c.state=ST.ERR;c.hadErr=true;c.$s.addClass('lc_ch_err lc_ch_shake');setTimeout(()=>c.$s.removeClass('lc_ch_shake'),320);}
  E.pos++;
  _setCur(E.pos);
  if(E.pos<E.chars.length){
    _scrollCur();
    const n=E.chars[E.pos]?.char;
    if(n) wiTeclado.hint(n==='\n'?'Enter':n);
  }
  $('#lc_prog_fill').css('width',`${(E.pos/E.chars.length)*100}%`);
  _recalc();
  if(E.pos>=E.chars.length)_terminar();
}
function _back(){
  if(E.pos<=0)return; E.pos--;
  const c=E.chars[E.pos]; c.$s.removeClass('lc_ch_cur lc_ch_ok lc_ch_err'); c.state=ST.N;
  _setCur(E.pos); _recalc();
}
function _counts(){let ok=0,cor=0,err=0;E.chars.forEach(c=>{if(c.state===ST.OK)ok++;else if(c.state===ST.ERR)err++;});return{ok,cor,err};}
function _recalc(){
  const{ok,cor,err}=_counts(), t=tiempoSel===0?E.elapsed:(tiempoSel-E.segundos), g=ok+cor, tot=g+err;
  const wpm=t>0?Math.round((g/5)/(t/60)):0, prec=tot>0?Math.round((g/tot)*100):100;
  $('#lc_wpm').text(wpm);$('#lc_prec').text(prec);$('#lc_ok').text(ok);$('#lc_err').text(err);
}
function _terminar(){
  if(E.finalizado)return; E.finalizado=true; _clearTimer();
  const{ok,cor,err}=_counts(), t=tiempoSel===0?E.elapsed:(tiempoSel-E.segundos), g=ok+cor, tot=g+err;
  const wpm=t>0?Math.round((g/5)/(t/60)):g, prec=tot>0?Math.round((g/tot)*100):100;
  wiTeclado.clear();
  if(wpm>=40)Notificacion(`¡${wpm} WPM! 🚀`,'success',3000);
}
function _clearTimer(){if(E?.timerID){clearInterval(E.timerID);E.timerID=null;}}
function _scrollCur(){
  const a=document.getElementById('lc_texto_display'),c=a?.querySelector('.lc_ch_cur');
  if(!a||!c)return;
  const ar=a.getBoundingClientRect(),cr=c.getBoundingClientRect();
  if(cr.bottom>ar.bottom-20)a.scrollTop+=cr.bottom-ar.bottom+40;
}
