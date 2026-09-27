/* ============================================================
   Занимашки — генератор SVG-обложек товаров
   Единый фирменный стиль: пастельный градиент, страница тетради
   на пружине, дудлы по теме товара, маркер и звёздочки.
   ============================================================ */

function starPath(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push((cx + rad * Math.cos(a)).toFixed(1) + ',' + (cy + rad * Math.sin(a)).toFixed(1));
  }
  return 'M' + pts.join('L') + 'Z';
}

function starSVG(cx, cy, r, fill, op) {
  return `<path d="${starPath(cx, cy, r)}" fill="${fill}" opacity="${op || 1}"/>`;
}

/* Дудлы по мотиву товара — рисуются на странице тетради */
function motifSVG(motif) {
  const navy = '#1E2A56';
  const coral = '#FF6F61';
  const teal = '#1FC2B1';
  const yellow = '#FFC83D';
  const dash = `fill="none" stroke="${navy}" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="1 9" opacity=".55"`;
  switch (motif) {
    case 'letters':
      return `
        <text x="200" y="268" font-size="92" font-weight="900" fill="none" stroke="${navy}" stroke-width="2.6" stroke-dasharray="7 7" text-anchor="middle" opacity=".8" font-family="Nunito, sans-serif">А</text>
        <path d="M108 292 h70" ${dash}/>
        <path d="M226 292 h66" ${dash}/>
        <text x="118" y="180" font-size="30" font-weight="900" fill="${coral}" opacity=".85" font-family="Nunito, sans-serif">Б</text>
        <text x="270" y="180" font-size="30" font-weight="900" fill="${teal}" opacity=".9" font-family="Nunito, sans-serif">В</text>`;
    case 'numbers':
      return `
        <text x="200" y="282" font-size="84" font-weight="900" fill="none" stroke="${navy}" stroke-width="2.6" stroke-dasharray="7 7" text-anchor="middle" opacity=".8" font-family="Nunito, sans-serif">3</text>
        <text x="120" y="184" font-size="34" font-weight="900" fill="${coral}" font-family="Nunito, sans-serif">1</text>
        <circle cx="152" cy="176" r="7" fill="${teal}"/>
        <circle cx="176" cy="176" r="7" fill="${yellow}"/>
        <circle cx="200" cy="176" r="7" fill="${coral}" opacity=".8"/>
        <text x="256" y="184" font-size="30" font-weight="900" fill="${teal}" font-family="Nunito, sans-serif">+</text>
        <text x="284" y="184" font-size="34" font-weight="900" fill="${navy}" opacity=".75" font-family="Nunito, sans-serif">2</text>`;
    case 'logic':
      return `
        <rect x="112" y="212" width="52" height="52" rx="12" fill="none" stroke="${navy}" stroke-width="3" stroke-dasharray="6 6" opacity=".7"/>
        <rect x="176" y="212" width="52" height="52" rx="12" fill="${yellow}" opacity=".9"/>
        <rect x="240" y="212" width="52" height="52" rx="12" fill="none" stroke="${navy}" stroke-width="3" stroke-dasharray="6 6" opacity=".7"/>
        <path d="M116 292 q22 -18 44 0 t44 0 t44 0 t44 0" fill="none" stroke="${coral}" stroke-width="4" stroke-linecap="round" opacity=".85"/>`;
    case 'penmanship':
      return `
        <path d="M118 236 q24 -34 48 -6 q-40 42 -6 46 q30 4 34 -30" fill="none" stroke="${navy}" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 0" opacity=".8"/>
        <path d="M150 316 h100" fill="none" stroke="${navy}" stroke-width="3" stroke-dasharray="1 9" stroke-linecap="round" opacity=".5"/>
        <path d="M116 292 q22 -18 44 0 t44 0 t44 0 t44 0" fill="none" stroke="${teal}" stroke-width="3.4" stroke-linecap="round" opacity=".75"/>
        <text x="250" y="248" font-size="40" font-weight="900" fill="none" stroke="${coral}" stroke-width="2.4" stroke-dasharray="6 6" font-family="Nunito, sans-serif">Л</text>`;
    case 'world':
      return `
        <circle cx="146" cy="238" r="26" fill="${yellow}" opacity=".95"/>
        <g stroke="${yellow}" stroke-width="4" stroke-linecap="round" opacity=".95">
          <path d="M146 202 v-10"/><path d="M146 274 v10"/><path d="M110 238 h-10"/><path d="M182 238 h10"/>
          <path d="M121 213 l-7 -7"/><path d="M171 263 l7 7"/><path d="M171 213 l7 -7"/><path d="M121 263 l-7 7"/>
        </g>
        <path d="M226 286 q0 -34 30 -44 q30 10 30 44 z" fill="${teal}" opacity=".85"/>
        <rect x="250" y="286" width="12" height="18" rx="4" fill="#8B5A2B" opacity=".8"/>
        <path d="M236 306 q36 14 72 0" fill="none" stroke="${navy}" stroke-width="3" stroke-dasharray="1 9" stroke-linecap="round" opacity=".5"/>`;
    default:
      return '';
  }
}

/* Основная обложка товара: фото (если задано) или SVG-обложка */
function productMedia(p, cssClass) {
  const cls = cssClass ? ` class="${cssClass}"` : '';
  const src = p.photos ? p.photos[0] : p.photo;
  if (src) {
    return `<img${cls} src="${src}" alt="${p.cardTitle} — многоразовые прописи пиши-стирай Занимашки с углублениями и исчезающими чернилами" loading="lazy">`;
  }
  return coverSVG(p);
}

function coverSVG(p) {
  return `<svg viewBox="0 0 400 370" xmlns="http://www.w3.org/2000/svg" role="img"
       aria-label="Занимашки — ${p.cardTitle || p.title}. Многоразовые тетради пиши-стирай, развитие мелкой моторики и подготовка руки к письму">${coverSVGInner(p)}</svg>`;
}

function coverSVGInner(p) {
  const [c1, c2] = p.palette;
  const gid = 'g-' + p.id;
  const isStack = Array.isArray(p.stack) && p.stack.length > 1;

  const stars = [
    starSVG(46, 52, 13, '#FFC83D', .95),
    starSVG(356, 84, 10, '#FF6F61', .8),
    starSVG(368, 300, 13, '#1FC2B1', .8),
    starSVG(34, 316, 9, '#FFAF1E', .85),
    starSVG(318, 26, 7, '#FF6F61', .6),
  ].join('');

  const spring = (x, y, w) => {
    let out = '';
    for (let i = 0; i <= w; i += 22) {
      out += `<circle cx="${x + i}" cy="${y}" r="5" fill="#fff" stroke="#D9DEEE" stroke-width="2"/>`;
    }
    return out;
  };

  let page;
  if (isStack) {
    const n = p.stack.length;
    const pages = p.stack.map((label, i) => {
      const rot = -10 + i * (20 / Math.max(n - 1, 1));
      const dx = -26 + i * (52 / Math.max(n - 1, 1));
      const col = ['#FFFFFF', '#FFF6E3', '#EFFBFA', '#F4F7FF', '#FFF0EC', '#F1FBEF'][i % 6];
      const tcol = i === 0 ? '#1E2A56' : (i % 2 ? '#0EA393' : '#F04E3E');
      return `
        <g transform="translate(${200 + dx} 205) rotate(${rot})">
          <rect x="-88" y="-118" width="176" height="236" rx="16" fill="${col}" stroke="#E3E7F2" stroke-width="2"/>
          ${spring(-66, -104, 132)}
          <text x="0" y="-40" font-size="15" font-weight="900" fill="#FFAF1E" text-anchor="middle" font-family="Nunito, sans-serif">★</text>
          <text x="0" y="2" font-size="26" font-weight="900" fill="${tcol}" text-anchor="middle" font-family="Nunito, sans-serif">${label}</text>
          <path d="M-52 26 h104" stroke="#1E2A56" stroke-width="3" stroke-dasharray="1 8" stroke-linecap="round" opacity=".45" fill="none"/>
          <path d="M-52 48 h74" stroke="#1E2A56" stroke-width="3" stroke-dasharray="1 8" stroke-linecap="round" opacity=".3" fill="none"/>
        </g>`;
    }).join('');
    page = pages;
  } else {
    page = `
      <g transform="translate(200 202) rotate(-5)">
        <rect x="-108" y="-132" width="216" height="264" rx="20" fill="#1E2A56" opacity=".10" transform="translate(8 12)"/>
        <rect x="-108" y="-132" width="216" height="264" rx="20" fill="#fff"/>
        ${spring(-86, -118, 172)}
        <rect x="-64" y="-96" width="128" height="30" rx="15" fill="#fff" stroke="#E8352E" stroke-width="2.4"/>
        <text x="0" y="-75" font-size="15" font-weight="900" fill="#E8352E" text-anchor="middle" letter-spacing="1" font-family="Nunito, sans-serif">ЗАНИМАШКИ</text>
        <text x="0" y="-14" font-size="${p.coverLabel.length > 6 ? 30 : 44}" font-weight="900" fill="#1E2A56" text-anchor="middle" font-family="Nunito, sans-serif">${p.coverLabel}</text>
        <text x="0" y="14" font-size="14" font-weight="800" fill="#66719A" text-anchor="middle" letter-spacing=".5" font-family="Nunito, sans-serif">${p.coverSub || ''}</text>
        ${motifSVG(p.motif)}
      </g>`;
  }

  return `
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="370" fill="url(#${gid})"/>
    <circle cx="24" cy="330" r="60" fill="#fff" opacity=".18"/>
    <circle cx="380" cy="180" r="76" fill="#fff" opacity=".14"/>
    ${stars}
    ${page}
    <g transform="translate(288 322) rotate(24)">
      <rect x="-52" y="-10" width="86" height="20" rx="10" fill="#1E2A56"/>
      <rect x="34" y="-10" width="18" height="20" rx="8" fill="#FF6F61"/>
      <path d="M52 -10 L66 0 L52 10 Z" fill="#F2B9A0"/>
      <rect x="-46" y="-3" width="20" height="6" rx="3" fill="#fff" opacity=".35"/>
    </g>`;
}

/* Маленькая иконка-превью для корзины/мини-блоков */
function coverThumbSVG(p) {
  const [c1, c2] = p.palette;
  const gid = 'gt-' + p.id;
  return `
  <svg viewBox="0 0 400 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Занимашки — ${p.cardTitle || p.title}">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="370" fill="url(#${gid})"/>
    <g transform="translate(200 196) rotate(-5)">
      <rect x="-92" y="-118" width="184" height="236" rx="18" fill="#fff"/>
      ${(() => { let s = ''; for (let i = -66; i <= 66; i += 22) s += `<circle cx="${i}" cy="-104" r="4.5" fill="#fff" stroke="#D9DEEE" stroke-width="2"/>`; return s; })()}
      <rect x="-56" y="-84" width="112" height="26" rx="13" fill="#fff" stroke="#E8352E" stroke-width="2.2"/>
      <text x="0" y="-65" font-size="13" font-weight="900" fill="#E8352E" text-anchor="middle" letter-spacing="1" font-family="Nunito, sans-serif">ЗАНИМАШКИ</text>
      <text x="0" y="10" font-size="${(p.coverLabel || '').length > 6 ? 30 : 44}" font-weight="900" fill="#1E2A56" text-anchor="middle" font-family="Nunito, sans-serif">${p.coverLabel || ''}</text>
      <path d="M-56 40 h112" stroke="#1E2A56" stroke-width="3" stroke-dasharray="1 9" stroke-linecap="round" opacity=".45" fill="none"/>
      <path d="M-56 62 h78" stroke="#1E2A56" stroke-width="3" stroke-dasharray="1 9" stroke-linecap="round" opacity=".3" fill="none"/>
    </g>
    ${starSVG(52, 58, 12, '#FFC83D', .95)}
    ${starSVG(352, 96, 9, '#FF6F61', .8)}
  </svg>`;
}

/* Логотип (variant: 'header' | 'footer') */
function logoSVG(variant = 'header') {
  const badgeCls = variant === 'footer' ? 'logo-badge logo-badge-footer' : 'logo-badge';
  return `
  <a href="index.html" class="logo" aria-label="Занимашки — на главную">
    <img class="${badgeCls}" src="assets/logo.png?v=3" alt="Логотип Занимашки — кот и мышка читают книжку" width="55" height="55">
    <span class="logo-wrap">
      <span class="logo-word">Занимашки</span>
      <span class="logo-sub">развитие детей от 1 до 9 лет</span>
    </span>
  </a>`;
}
