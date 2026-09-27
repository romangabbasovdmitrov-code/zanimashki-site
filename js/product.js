/* ============================================================
   Занимашки — страница товара
   ============================================================ */

/* Мини-инфографика 1: пиши → стирай → снова */
function infoSteraseSVG(p) {
  const [c1, c2] = p.palette;
  return `
  <svg viewBox="0 0 400 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Пиши — стирай — занимайся снова: многоразовые тетради Занимашки">
    <defs><linearGradient id="is-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="400" height="370" fill="url(#is-g)"/>
    <text x="200" y="66" font-size="24" font-weight="900" fill="#1E2A56" text-anchor="middle" font-family="Nunito, sans-serif">Пиши → стирай → снова</text>
    <g transform="translate(84 170)">
      <rect x="-52" y="-66" width="104" height="132" rx="14" fill="#fff"/>
      <path d="M-34 -30h68M-34 -6h68M-34 18h44" stroke="#1FC2B1" stroke-width="5" stroke-linecap="round"/>
      <text x="0" y="52" font-size="15" font-weight="800" fill="#1E2A56" text-anchor="middle" font-family="Nunito, sans-serif">писали</text>
    </g>
    <path d="M152 170h88" stroke="#1E2A56" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 10" opacity=".5"/>
    <g transform="translate(316 170)">
      <rect x="-52" y="-66" width="104" height="132" rx="14" fill="#fff"/>
      <path d="M-34 -30h68" stroke="#E3E7F2" stroke-width="5" stroke-linecap="round"/>
      <path d="M-34 -6h68" stroke="#E3E7F2" stroke-width="5" stroke-linecap="round"/>
      <g transform="translate(-6 40) rotate(-18)"><rect x="-26" y="-8" width="40" height="16" rx="8" fill="#FF6F61"/><rect x="14" y="-8" width="12" height="16" rx="5" fill="#1E2A56"/></g>
      <text x="0" y="-84" font-size="15" font-weight="800" fill="#1E2A56" text-anchor="middle" font-family="Nunito, sans-serif"> </text>
      <text x="0" y="52" font-size="15" font-weight="800" fill="#1E2A56" text-anchor="middle" font-family="Nunito, sans-serif">стёрли</text>
    </g>
    <text x="200" y="330" font-size="17" font-weight="800" fill="#0EA393" text-anchor="middle" font-family="Nunito, sans-serif">Чернила исчезают за несколько часов</text>
    ${starSVG(52, 320, 12, '#FFC83D')}
    ${starSVG(350, 60, 10, '#FF6F61', .8)}
  </svg>`;
}

/* Мини-инфографика 2: углублённый контур */
function infoGrooveSVG(p) {
  const [c1, c2] = p.palette;
  return `
  <svg viewBox="0 0 400 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Буквы с углублениями — рука движется по правильной траектории, подготовка руки к письму">
    <defs><linearGradient id="ig-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>
    <rect width="400" height="370" fill="url(#ig-g)"/>
    <text x="200" y="64" font-size="24" font-weight="900" fill="#1E2A56" text-anchor="middle" font-family="Nunito, sans-serif">Контур с углублением</text>
    <g transform="translate(200 200)">
      <rect x="-120" y="-90" width="240" height="200" rx="18" fill="#fff"/>
      <text x="0" y="42" font-size="120" font-weight="900" fill="none" stroke="#1E2A56" stroke-width="3" stroke-dasharray="8 8" text-anchor="middle" opacity=".85" font-family="Nunito, sans-serif">А</text>
      <circle cx="-62" cy="30" r="11" fill="#FF6F61"/>
      <path d="M-62 30 q30 -66 62 -60 q34 8 52 60" fill="none" stroke="#FF6F61" stroke-width="7" stroke-linecap="round" stroke-dasharray="1 16"/>
    </g>
    <text x="200" y="336" font-size="16.5" font-weight="800" fill="#0EA393" text-anchor="middle" font-family="Nunito, sans-serif">Ручка движется точно по желобку</text>
    ${starSVG(48, 84, 12, '#FFC83D')}
    ${starSVG(356, 300, 10, '#1FC2B1', .85)}
  </svg>`;
}

/* Мини-инфографика 3: что в комплекте */
function infoKitSVG(p) {
  const [c1, c2] = p.palette;
  return `
  <svg viewBox="0 0 400 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Что в комплекте: многоразовая тетрадь, ручка с исчезающими чернилами, маркер в подарок">
    <defs><linearGradient id="ik-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="400" height="370" fill="url(#ik-g)"/>
    <text x="200" y="60" font-size="24" font-weight="900" fill="#1E2A56" text-anchor="middle" font-family="Nunito, sans-serif">Что в комплекте</text>
    <g transform="translate(130 190) rotate(-6)">
      <rect x="-70" y="-88" width="140" height="176" rx="14" fill="#fff"/>
      ${(() => { let s = ''; for (let i = -50; i <= 50; i += 20) s += `<circle cx="${i}" cy="-74" r="4.5" fill="#fff" stroke="#D9DEEE" stroke-width="2"/>`; return s; })()}
      <rect x="-44" y="-58" width="88" height="22" rx="11" fill="#fff" stroke="#E8352E" stroke-width="2"/>
      <text x="0" y="-42" font-size="11" font-weight="900" fill="#E8352E" text-anchor="middle" font-family="Nunito, sans-serif">ЗАНИМАШКИ</text>
      <path d="M-40 -10h80M-40 12h56" stroke="#1E2A56" stroke-width="3" stroke-dasharray="1 8" stroke-linecap="round" opacity=".5"/>
    </g>
    <g transform="translate(292 176) rotate(14)">
      <rect x="-64" y="-9" width="104" height="18" rx="9" fill="#1E2A56"/>
      <rect x="40" y="-9" width="16" height="18" rx="7" fill="#FF6F61"/>
      <path d="M56 -9 L70 0 L56 9 Z" fill="#F2B9A0"/>
    </g>
    <text x="292" y="222" font-size="13.5" font-weight="800" fill="#1E2A56" text-anchor="middle" font-family="Nunito, sans-serif">ручка с исчезающими чернилами</text>
    <text x="130" y="308" font-size="13.5" font-weight="800" fill="#1E2A56" text-anchor="middle" font-family="Nunito, sans-serif">многоразовая тетрадь</text>
    <text x="200" y="344" font-size="15" font-weight="800" fill="#0EA393" text-anchor="middle" font-family="Nunito, sans-serif">+ запасные стержни и насадка-хват</text>
    ${starSVG(46, 110, 11, '#FFC83D')}
    ${starSVG(360, 92, 9, '#FF6F61', .8)}
  </svg>`;
}

function renderProductPage() {
  const params = new URLSearchParams(location.search);
  const p = findProduct(params.get('id'));
  const root = document.getElementById('p-content');

  if (!p) {
    document.getElementById('p-breadcrumbs').innerHTML = `
      <ol><li><a href="index.html">Главная</a></li><li class="sep">/</li>
      <li><a href="catalog.html">Каталог</a></li><li class="sep">/</li>
      <li class="cur">Товар не найден</li></ol>`;
    root.innerHTML = `
      <div class="catalog-empty" style="margin:40px 0 80px">
        <b>Товар не найден</b>
        <p>Возможно, ссылка устарела. Посмотрите весь каталог — там точно есть что-то интересное.</p>
        <a class="btn btn-teal" href="catalog.html">В каталог</a>
      </div>`;
    return;
  }

  document.getElementById('p-breadcrumbs').innerHTML = `
    <ol>
      <li><a href="index.html">Главная</a></li><li class="sep">/</li>
      <li><a href="catalog.html">Каталог</a></li><li class="sep">/</li>
      <li><a href="catalog.html?type=${p.type}">${TYPE_LABELS[p.type]}</a></li><li class="sep">/</li>
      <li class="cur">${p.cardTitle}</li>
    </ol>`;

  const photos = p.photos || (p.photo ? [p.photo] : null);
  const gallery = photos
    ? photos.map((src, i) => ({ key: 'p' + i, label: 'Фото ' + (i + 1), html: `<img src="${src}" alt="${p.cardTitle} — фото ${i + 1}">` }))
    : [
        { key: 'cover', label: 'Обложка товара', html: coverSVG(p) },
        { key: 'stearase', label: 'Как работает пиши-стирай', html: infoSteraseSVG(p) },
        { key: 'groove', label: 'Углублённый контур', html: infoGrooveSVG(p) },
        { key: 'kit', label: 'Комплектация', html: infoKitSVG(p) },
      ];
  const portrait = photos ? ' portrait' : '';

  root.innerHTML = `
  <div class="product-top">
    <div class="product-gallery">
      <div class="product-main-img${portrait}" id="p-main-img">
        <div id="viewer-slide">${gallery[0].html}</div>
        <button class="viewer-arrow prev" id="v-prev" aria-label="Предыдущее фото"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
        <button class="viewer-arrow next" id="v-next" aria-label="Следующее фото"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>
      </div>
      <div class="product-thumbs${portrait}" id="p-thumbs">
        ${gallery.map((g, i) => `<button class="th ${i === 0 ? 'on' : ''}" data-img="${g.key}" aria-label="${g.label}">${g.html}</button>`).join('')}
      </div>
    </div>
    <div class="product-info">
      <div class="p-type">${TYPE_LABELS[p.type]} · возраст ${p.ageLabel}</div>
      <h1>${p.title}</h1>
      <div class="product-meta">
        <div class="p-rating">${starsSVG(p.rating)}<b>${p.rating.toFixed(1)}</b><span>· ${p.reviews.toLocaleString('ru-RU')} отзывов на Ozon</span></div>
        <div class="q"><b>✓</b> Бренд проверен</div>
      </div>
      <div class="buy-box">
        <div class="row-prices">
          <span class="p-price">${money(p.price)}</span>
          <span class="p-old">${money(p.oldPrice)}</span>
          <span class="p-disc">−${discount(p)}%</span>
        </div>
        <div class="save-note">Вы экономите ${money(p.oldPrice - p.price)}</div>
        <div class="bonus">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7a4.95 4.95 0 1 0-7-7l-7 7v7h7z"/><path d="M16 5a3 3 0 0 1 3 3"/></svg>
          Маркер (ручка с исчезающими чернилами) — в подарок
        </div>
        <div class="buy-row">
          <div class="qty" aria-label="Количество">
            <button type="button" id="qty-minus" aria-label="Уменьшить">−</button>
            <input id="qty-input" value="1" inputmode="numeric" aria-label="Количество товара">
            <button type="button" id="qty-plus" aria-label="Увеличить">+</button>
          </div>
          <button class="btn btn-primary btn-lg" id="p-add" data-add="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.6"/><circle cx="19" cy="21" r="1.6"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6"/></svg>
            В корзину
          </button>
        </div>
        <a class="btn btn-ghost buy-ozon" href="${BRAND.ozonUrl}" target="_blank" rel="noopener">Купить на Ozon</a>
      </div>
      <div class="delivery-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        <div>
          <b>Доставка со складов Ozon — быстро и надёжно</b>
          <span>Курьером или в пункт выдачи по всей России, обычно уже завтра. Оплата при получении или онлайн. Возврат в течение 7 дней.</span>
        </div>
      </div>
      <ul class="product-features">
        ${p.bullets.map(b => `<li><span class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>${b}</li>`).join('')}
      </ul>
    </div>
  </div>

  <div class="p-sections">
    <section class="p-section">
      <h2>Описание</h2>
      <div class="prose">${p.full.map(t => `<p>${t}</p>`).join('')}</div>
    </section>

    <section class="p-section">
      <h2>Характеристики</h2>
      <table class="specs-table">
        ${p.specs.map(s => `<tr><td>${s[0]}</td><td>${s[1]}</td></tr>`).join('')}
      </table>
    </section>

    <section class="p-section">
      <h2>${p.learning.title}</h2>
      <div class="learning-box">
        <div>
          <h3>Возраст</h3>
          <p style="font-size:15.5px; color:var(--ink); font-weight:600">${p.learning.ages}</p>
        </div>
        <div>
          <h3>Чему учит</h3>
          <ul class="product-features" style="margin:0">
            ${p.learning.skills.map(s => `<li><span class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>${s}</li>`).join('')}
          </ul>
        </div>
      </div>
    </section>

    <section class="p-section">
      <h2>Отзывы покупателей</h2>
      <div class="reviews-grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
        ${REVIEWS.slice(0, 3).map(r => `
        <article class="review-card" style="box-shadow:none; border:1px solid var(--line)">
          <div class="review-top">
            <span class="review-ava" style="background:${r.color}">${r.name[0]}</span>
            <div><div class="review-name">${r.name}</div><div class="review-src">${r.meta}</div></div>
          </div>
          ${starsSVG(r.rating)}
          <p class="review-text">${r.text}</p>
          <div class="review-bottom"><span class="review-verdict">✓ Покупка на Ozon</span></div>
        </article>`).join('')}
      </div>
      <p style="margin-top:20px; font-size:14px; font-weight:700; color:var(--muted)">
        Ещё больше отзывов — <a href="${BRAND.ozonUrl}" target="_blank" rel="noopener" style="color:#005BFF">в официальном магазине на Ozon</a> (рейтинг ${BRAND.ozonRating}).
      </p>
    </section>

    <section class="p-section" style="background:transparent; box-shadow:none; padding:0">
      <h2 style="margin-bottom:26px">С этим товаром часто берут</h2>
      <div class="products-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
        ${PRODUCTS.filter(x => x.id !== p.id).sort((a, b) => b.reviews - a.reviews).slice(0, 4).map(x => productCard(x)).join('')}
      </div>
    </section>
  </div>`;

  /* Просмотрщик: единый для всех товаров — стрелки + миниатюры */
  const mainImg = document.getElementById('p-main-img');
  const slide = document.getElementById('viewer-slide');
  const imgs = Object.fromEntries(gallery.map(g => [g.key, g.html]));
  const keys = gallery.map(g => g.key);
  let cur = 0;

  function show(i) {
    cur = (i + gallery.length) % gallery.length;
    slide.innerHTML = imgs[keys[cur]];
    document.querySelectorAll('#p-thumbs .th').forEach((t, ti) => t.classList.toggle('on', ti === cur));
  }

  document.querySelectorAll('#p-thumbs .th').forEach((th, ti) => {
    th.addEventListener('click', () => show(ti));
  });
  document.getElementById('v-prev').addEventListener('click', () => show(cur - 1));
  document.getElementById('v-next').addEventListener('click', () => show(cur + 1));

  /* Количество */
  const qtyInput = document.getElementById('qty-input');
  const addBtn = document.getElementById('p-add');
  document.getElementById('qty-minus').addEventListener('click', () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    qtyInput.value = Math.min(99, parseInt(qtyInput.value) + 1);
  });
  addBtn.addEventListener('click', () => {
    const q = Math.max(1, parseInt(qtyInput.value) || 1);
    cartAdd(p.id, q);
    toast('Добавлено в корзину: ' + p.cardTitle + (q > 1 ? ' × ' + q : ''));
  });

  /* JSON-LD товара */
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    description: p.short,
    brand: { '@type': 'Brand', name: 'Занимашки' },
    sku: p.id,
    category: TYPE_LABELS[p.type],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: String(p.rating), bestRating: '5', ratingCount: String(p.reviews) },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: String(p.price),
      availability: 'https://schema.org/InStock',
      url: 'https://zanimashki.ru/product.html?id=' + p.id,
    },
    review: REVIEWS.slice(0, 3).map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
      reviewBody: r.text,
    })),
  });
  document.head.appendChild(ld);
}

function pageInit() {
  renderProductPage();
  initReveal();
}
