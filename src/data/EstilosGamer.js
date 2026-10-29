// Espacio invisible oficial de Free Fire (Hangul Filler U+3164)
export const ESPACIO_INVISIBLE = "ㅤ";
// Mapas de fuentes Unicode
const fuentesUnicode = {
  cursiva: {
    a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: '𝑒', f: '𝒻', g: '𝑔', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: '𝑜', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏',
    A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ', J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵'
  },
  gotica: {
    a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷',
    A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ', J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '𝔖', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ'
  },
  negrita: {
    a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
    A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭'
  },
  dobleLinea: {
    a: '𝕒', b: '𝕓', c: '𝕔', d: '𝕕', e: '𝕖', f: '𝕗', g: '𝕘', h: '𝕙', i: '𝕚', j: '𝕛', k: '𝕜', l: '𝕝', m: '𝕞', n: '𝕟', o: '𝔬', p: '𝕡', q: '𝕢', r: '𝕣', s: '𝕤', t: '𝕥', u: '𝕦', v: '𝕧', w: '𝕨', x: '𝕩', y: '𝕪', z: '𝕫',
    A: '𝔸', B: '𝔹', C: 'ℂ', D: '𝔻', E: '𝔼', F: '𝔽', G: '𝔾', H: 'ℍ', I: '𝕀', J: '𝕁', K: '𝕂', L: '𝕃', M: '𝕄', N: 'ℕ', O: '𝕆', P: 'ℙ', Q: 'ℚ', R: 'ℝ', S: '𝕊', T: '𝕋', U: '𝕌', V: '𝕍', W: '𝕎', X: '𝕏', Y: '𝕐', Z: 'ℤ'
  },
  circulado: {
    a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: '⓺', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ',
    A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ', N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ'
  }
};

// Función auxiliar para transformar caracteres de una palabra
export const transformarTexto = (texto, tipoFuente) => {
  const mapa = fuentesUnicode[tipoFuente];
  if (!mapa) return texto;
  return texto.split('').map(char => mapa[char] || char).join('');
};

// Tus formatos combinados con el tipo de fuente desejado
export const estilosGamer = [
  // --- CURSIVA / SCRIPT ---
  { formato: "𝒜{NAME}𝒜", fuente: "cursiva" },
  { formato: "𝓪{NAME}𝓪", fuente: "cursiva" },
  { formato: "𝓐{NAME}𝓐", fuente: "cursiva" },
  { formato: "𝒶{NAME}𝒶", fuente: "cursiva" },
  { formato: "𝒜_{NAME}_𝒯", fuente: "cursiva" },

  // --- NEGRITA (BOLD) ---
  { formato: "mathbf{{NAME}}", fuente: "negrita" },
  { formato: "𝗔{NAME}𝗔", fuente: "negrita" },
  { formato: "𝗮{NAME}𝗮", fuente: "negrita" },
  { formato: "𝐀{NAME}𝐀", fuente: "negrita" },
  { formato: "𝗔{NAME}_YT", fuente: "negrita" },

  // --- GÓTICA / FRACTUR ---
  { formato: "mathfrak{{NAME}}", fuente: "gotica" },
  { formato: "𝔄{NAME}𝔄", fuente: "gotica" },
  { formato: "𝔞{NAME}𝔞", fuente: "gotica" },
  { formato: "𝕬{NAME}𝕬", fuente: "gotica" },
  { formato: "𝔤{NAME}_FF", fuente: "gotica" },

  // --- DOBLE LÍNEA ---
  { formato: "𝔸{NAME}𝔸", fuente: "dobleLinea" },
  { formato: "𝕒{NAME}𝕒", fuente: "dobleLinea" },
  { formato: "𝔸{NAME}_777", fuente: "dobleLinea" },
  { formato: "𝕒{NAME}_999", fuente: "dobleLinea" },

  // --- CIRCULADAS Y CUADRADAS ---
  { formato: "Ⓐ{NAME}Ⓐ", fuente: "circulado" },
  { formato: "ⓐ{NAME}ⓐ", fuente: "circulado" },
  { formato: "🄰{NAME}🄵", fuente: "circulado" },
  { formato: "🄲🄳🄶 {NAME}", fuente: "circulado" },

  // --- CLÁSICOS PRO ---
  { formato: "꧁ঔৣ☬✞{NAME}✞☬ঔৣ꧂", fuente: "gotica" },
  { formato: "亗 {NAME} 亗", fuente: "negrita" },
  { formato: "〆{NAME}✓", fuente: "dobleLinea" },
  { formato: "꧁{NAME}꧂", fuente: "cursiva" },
  { formato: "⚡{NAME}⚡", fuente: "negrita" },
  { formato: "︻╦̵̵͇̿̿̿̿╤──{NAME}", fuente: "gotica" },
  { formato: "『🤖』{NAME}", fuente: "dobleLinea" },
  { formato: "◥ {NAME} ◤", fuente: "negrita" },
  { formato: "V⚚R • {NAME}", fuente: "cursiva" },
  { formato: "i am {NAME}", fuente: "cursiva" },
  { formato: "🥷 {NAME} 🥷", fuente: "gotica" },
  { formato: "×_{NAME}_×", fuente: "dobleLinea" },
  { formato: "꧁💀{NAME}💀꧂", fuente: "gotica" },
  { formato: "鬼 | {NAME}", fuente: "negrita" },
  { formato: "ツ {NAME}", fuente: "cursiva" },
  { formato: "【{NAME}】", fuente: "dobleLinea" },
  { formato: "『{NAME}』", fuente: "negrita" },
  { formato: "⚔️{NAME}⚔️", fuente: "gotica" },
  { formato: "👑{NAME}👑", fuente: "negrita" },
  { formato: "💎{NAME}💎", fuente: "cursiva" },
  { formato: "🚀{NAME}🚀", fuente: "dobleLinea" },
  { formato: "🐺{NAME}_Wolf", fuente: "negrita" },
  { formato: "🐉{NAME}_Dragon", fuente: "gotica" },
  { formato: "▄︻デ┳═ー{NAME}", fuente: "negrita" },
  { formato: "⫷{NAME}⫸", fuente: "dobleLinea" }
];