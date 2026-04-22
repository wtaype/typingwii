// ════════════════════════════════════════════════════════════════════
// teclado.js — TypingWii Pro Shared Components v1.0 (Con Animación de Manos)
// Jesús es mi Señor 🙏
// ════════════════════════════════════════════════════════════════════
import './teclado.css';

// ── FINGER ZONE MAP ─────────────────────────────────────────────────
// lp = left pinky | lr = left ring | lm = left middle | li = left index
// ri = right index | rm = right middle | rr = right ring | rp = right pinky
// th = thumb (space)

const WK_FINGER = {
  // Row 0 — numbers
  '`':'lp','1':'lp','2':'lr','3':'lm','4':'li','5':'li',
  '6':'ri','7':'ri','8':'rm','9':'rr','0':'rp','-':'rp','=':'rp',
  'Backspace':'rp',
  // Row 1 — qwerty
  'Tab':'lp','q':'lp','w':'lr','e':'lm','r':'li','t':'li',
  'y':'ri','u':'ri','i':'rm','o':'rr','p':'rp','[':'rp',']':'rp','\\':'rp',
  // Row 2 — asdf (home row)
  'CapsLock':'lp','a':'lp','s':'lr','d':'lm','f':'li','g':'li',
  'h':'ri','j':'ri','k':'rm','l':'rr','ñ':'rp',"'":'rp','Enter':'rp',
  // Row 3 — zxcv
  'ShiftL':'lp','z':'lp','x':'lr','c':'lm','v':'li','b':'li',
  'n':'ri','m':'ri',',':'rm','.':'rr','/':'rp','ShiftR':'rp',
  // Row 4 — space
  ' ':'th',
};

// Shift character → base key mapping
const WK_SHIFT = {
  '!':'1','@':'2','#':'3','$':'4','%':'5','^':'6','&':'7','*':'8','(':'9',')':'0',
  '_':'-','+':'=','{':'[','}':']','|':'\\',':':';','"':"'",'<':',','>':'.','?':'/',
  'A':'a','B':'b','C':'c','D':'d','E':'e','F':'f','G':'g','H':'h','I':'i','J':'j',
  'K':'k','L':'l','M':'m','N':'n','O':'o','P':'p','Q':'q','R':'r','S':'s','T':'t',
  'U':'u','V':'v','W':'w','X':'x','Y':'y','Z':'z','Ñ':'ñ',
};

const WK_ROWS = [
  [
    ['\`','~|\`','lp',1],['1','!|1','lp',1],['2','@|2','lr',1],['3','#|3','lm',1],
    ['4','$|4','li',1],['5','%|5','li',1],['6','^|6','ri',1],['7','&|7','ri',1],
    ['8','*|8','rm',1],['9','(|9','rr',1],['0',')|0','rp',1],['-','_|-','rp',1],
    ['=','+|=','rp',1],['Backspace','BACKSPACE','rp',2],
  ],
  [
    ['Tab','TAB','lp',1.5],['q','Q','lp',1],['w','W','lr',1],['e','E','lm',1],
    ['r','R','li',1],['t','T','li',1],['y','Y','ri',1],['u','U','ri',1],
    ['i','I','rm',1],['o','O','rr',1],['p','P','rp',1],['[','{|[','rp',1],
    [']','}|]','rp',1],['\\','||\\','rp',1.5],
  ],
  [
    ['CapsLock','CAPS LOCK','lp',1.75],
    ['a','A','lp',1,true],['s','S','lr',1],['d','D','lm',1],
    ['f','F','li',1,true],['g','G','li',1],['h','H','ri',1],
    ['j','J','ri',1,true],['k','K','rm',1],['l','L','rr',1],
    ['ñ','Ñ','rp',1],["'",'"|\'','rp',1],['Enter','ENTER','rp',2.25],
  ],
  [
    ['ShiftL','SHIFT','lp',2.25],['z','Z','lp',1],['x','X','lr',1],
    ['c','C','lm',1],['v','V','li',1],['b','B','li',1],
    ['n','N','ri',1],['m','M','ri',1],[',','<|,','rm',1],['.','>|.','rr',1],
    ['/','?|/','rp',1],['ShiftR','SHIFT','rp',2.75],
  ],
  [
    ['Control','CONTROL','lp',1.5],['Alt','ALT','lr',1.2],['Meta','ALT','lm',1.3],
    [' ','SPACE','th',6],
    ['MetaR','ALT','rm',1.3],['AltR','ALT','rr',1.2],['ControlR','CONTROL','rp','flex'],
  ],
];





// ── WEB AUDIO SOUNDS ────────────────────────────────────────────────
const wiSound = (() => {
  let _ctx = null;
  let _on  = true;

  const ctx = () => {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (_ctx.state === 'suspended') _ctx.resume();
    return _ctx;
  };

  const play = (isOk) => {
    if (!_on) return;
    try {
      const c   = ctx();
      const now = c.currentTime;

      if (isOk) {
        // Soft mechanical click — noise burst + tiny tone
        const buf = c.createBuffer(1, Math.ceil(c.sampleRate * 0.04), c.sampleRate);
        const ch  = buf.getChannelData(0);
        for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ch.length * 0.25));
        const src  = c.createBufferSource(); src.buffer = buf;
        const gain = c.createGain();
        gain.gain.setValueAtTime(0.10, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        src.connect(gain); gain.connect(c.destination); src.start();

        // Tiny tonal ping on top
        const osc  = c.createOscillator();
        const ogn  = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1100, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.055);
        ogn.gain.setValueAtTime(0.04, now);
        ogn.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(ogn); ogn.connect(c.destination);
        osc.start(now); osc.stop(now + 0.07);

      } else {
        // Error buzz — low thud
        const osc  = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
        gain.gain.setValueAtTime(0.13, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain); gain.connect(c.destination);
        osc.start(now); osc.stop(now + 0.16);
      }
    } catch (_) {}
  };

  return {
    correct() { play(true);  },
    error()   { play(false); },
    toggle()  { _on = !_on; return _on; },
    get on()  { return _on; },
  };
})();

// ── KEYBOARD LEGEND ─────────────────────────────────────────────────
const WK_LEGEND = [
  { f: 'lp', label: 'Meñiques' },
  { f: 'lr', label: 'Anulares'  },
  { f: 'lm', label: 'Medios'    },
  { f: 'li', label: 'Índices'   },
  { f: 'th', label: 'Pulgares'  },
];

// ── wiTeclado API ────────────────────────────────────────────────────
export const wiTeclado = (() => {
  let _host = null;       // selector where keyboard is rendered
  let _pressed = [];      // current wk_pressed_* timeout IDs

  // Build key element
  const _keyEl = ([k, label, finger, w, home]) => {
    const isFlex = w === 'flex';
    const isWide = isFlex || w > 1;
    const px     = isFlex ? 'auto' : `calc(${w} * var(--wk-u) + ${w - 1} * var(--wk-gap))`;
    const id     = k === 'ShiftL' ? 'wk_shift_l' : k === 'ShiftR' ? 'wk_shift_r' : '';
    const classes = [
      'wk_key',
      `wk_f_${finger}`,
      isWide ? 'wk_wide' : '',
      home   ? 'wk_home' : '',
      k === ' ' ? 'wk_space' : '',
      label.includes('|') ? 'wk_stacked' : '',
    ].filter(Boolean).join(' ');

    const dataKey = k === 'ShiftL' || k === 'ShiftR' ? 'Shift' : k;
    const style   = isFlex ? `style="flex:1;min-width:0;"` : `style="width:${px};flex-shrink:0;"`;
    const elId    = id ? `id="${id}"` : '';

    let content = label;
    if (label.includes('|')) {
      const [top, bottom] = label.split('|');
      content = `<span>${top}</span><span>${bottom}</span>`;
    }

    return `<div class="${classes}" data-wk="${dataKey}" ${style} ${elId}>${content}</div>`;
  };

  // Build full keyboard HTML
  const _buildHTML = () => {
    const rows = WK_ROWS.map(row =>
      `<div class="wk_row">${row.map(_keyEl).join('')}</div>`
    ).join('');

    return `
    <div class="wk_wrap" id="wk_teclado_inner">
      <div class="wk_header" style="justify-content: center; gap: 2vw;">
        <div class="wk_header_label">
          <i class="fas fa-keyboard"></i> Teclado Profesional
        </div>
        <button class="wk_sound_btn" id="wk_sound_toggle" title="Activar/desactivar sonido">
          <i class="fas fa-volume-high"></i> Sonido
        </button>
      </div>
      <div class="wk_keyboard">${rows}</div>
    </div>`;
  };

  // Normalize a character to the data-wk key
  const _normalize = (char) => {
    if (!char) return null;
    if (char === '\n' || char === 'Enter') return 'Enter';
    if (WK_SHIFT[char]) return WK_SHIFT[char]; // uppercase/symbol → base key
    return char.toLowerCase() !== char ? char.toLowerCase() : char;
  };

  // Check if char needs Shift
  const _needsShift = (char) => {
    if (!char) return false;
    if (WK_SHIFT[char]) return true;
    return char !== char.toLowerCase();
  };

  // Get DOM key(s) for a character
  const _getKeys = (char) => {
    const base = _normalize(char);
    if (!base) return [];
    const keys = [...document.querySelectorAll(`[data-wk="${CSS.escape(base)}"]`)];
    if (_needsShift(char)) {
      keys.push(...document.querySelectorAll('[data-wk="Shift"]'));
    }
    return keys;
  };

  // Clear a class from all wk_keys
  const _clearAll = (cls) => {
    document.querySelectorAll(`.wk_key.${cls}`).forEach(el => el.classList.remove(cls));
  };
  


  return {
    // Render keyboard into a CSS selector
    render(selector) {
      _host = selector;
      const container = document.querySelector(selector);
      if (!container) return;
      container.innerHTML = _buildHTML();

      // Sound toggle button
      document.getElementById('wk_sound_toggle')?.addEventListener('click', () => {
        const on = wiSound.toggle();
        const btn = document.getElementById('wk_sound_toggle');
        if (btn) {
          btn.classList.toggle('wk_muted', !on);
          btn.innerHTML = on
            ? `<i class="fas fa-volume-high"></i> Sonido`
            : `<i class="fas fa-volume-xmark"></i> Mudo`;
        }
      });
    },

    // Flash a key after pressing: correct or error
    press(char, isOk) {
      // Play sound
      isOk ? wiSound.correct() : wiSound.error();

      // Clear previous pressed states
      _pressed.forEach(clearTimeout);
      _pressed = [];
      _clearAll('wk_pressed_ok');
      _clearAll('wk_pressed_err');
      _clearAll('wk_hint');

      const cls = isOk ? 'wk_pressed_ok' : 'wk_pressed_err';
      const keys = _getKeys(char);
      keys.forEach(el => el.classList.add(cls));

      const id = setTimeout(() => {
        keys.forEach(el => el.classList.remove(cls));
      }, 180);
      _pressed.push(id);
    },

    // Show hint for the next key to press
    hint(char) {
      _clearAll('wk_hint');

      if (!char) return;
      const keys = _getKeys(char);
      keys.forEach(el => el.classList.add('wk_hint'));
    },

    // Mark errors on the keyboard for post-lesson feedback
    markErrors(chars) {
      if (!chars) return;
      chars.forEach(char => {
        _getKeys(char).forEach(el => {
          el.style.outline = '2px solid var(--error)';
          el.style.outlineOffset = '1px';
          el.style.backgroundColor = 'color-mix(in srgb, var(--error) 20%, transparent)';
        });
      });
    },

    // Remove all active states
    clear() {
      _clearAll('wk_hint');
      _clearAll('wk_pressed_ok');
      _clearAll('wk_pressed_err');

      _pressed.forEach(clearTimeout);
      _pressed = [];
      document.querySelectorAll('.wk_key').forEach(el => {
        el.style.outline = '';
        el.style.backgroundColor = '';
      });
    },

    // Sound control
    sound: wiSound,
  };
})();
