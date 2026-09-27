/* ============================================================
   Занимашки — общая логика: шапка, подвал, корзина, хелперы
   ============================================================ */

/* ---------- Корзина (localStorage) ---------- */
const CART_KEY = 'zanimashki_cart_v1';

function cartGet() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    // Чистим несуществующие товары
    const clean = {};
    Object.keys(raw).forEach(id => { if (findProduct(id)) clean[id] = raw[id]; });
    return clean;
  } catch (e) { return {}; }
}
function cartSet(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); }
function cartCount() { const c = cartGet(); return Object.values(c).reduce((s, n) => s + n, 0); }
function cartAdd(id, qty) {
  qty = qty || 1;
  const c = cartGet();
  c[id] = (c[id] || 0) + qty;
  cartSet(c);
}
function cartSetQty(id, qty) {
  const c = cartGet();
  if (qty <= 0) delete c[id]; else c[id] = qty;
  cartSet(c);
}
function cartRemove(id) { const c = cartGet(); delete c[id]; cartSet(c); }
function cartClear() { cartSet({}); }
function cartItems() {
  const c = cartGet();
  return Object.keys(c).map(id => ({ p: findProduct(id), qty: c[id] })).filter(x => x.p);
}
function cartTotal() { return cartItems().reduce((s, x) => s + x.p.price * x.qty, 0); }
function cartOldTotal() { return cartItems().reduce((s, x) => s + x.p.oldPrice * x.qty, 0); }

/* ---------- Форматирование ---------- */
function money(n) { return n.toLocaleString('ru-RU') + ' ₽'; }
function discount(p) { return Math.round((1 - p.price / p.oldPrice) * 100); }

function starsSVG(rating) {
  const full = Math.round(rating);
  let out = '<span class="stars" aria-hidden="true">';
  for (let i = 1; i <= 5; i++) {
    const col = i <= full ? '#FFAF1E' : '#E3E7F2';
    out += `<svg viewBox="0 0 24 24" fill="${col}"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>`;
  }
  return out + '</span>';
}

/* ---------- Карточка товара ---------- */
function productCard(p) {
  return `
  <article class="p-card reveal">
    <div class="p-media">
      <a href="product.html?id=${p.id}" aria-label="Открыть карточку: ${p.cardTitle}">${productMedia(p)}</a>
    </div>
    <div class="p-body">
      <div class="p-type">${TYPE_LABELS[p.type]} · ${p.ageLabel}</div>
      <a class="p-title-link" href="product.html?id=${p.id}"><h3 class="p-title">${p.cardTitle}</h3></a>
      <div class="p-rating">${starsSVG(p.rating)}<b>${p.rating.toFixed(1)}</b><span>· ${p.reviews.toLocaleString('ru-RU')} отзывов</span></div>
      <div class="p-footer">
        <div class="p-prices">
          <span class="p-price">${money(p.price)}</span>
          <span class="p-old">${money(p.oldPrice)}</span>
          <span class="p-disc">−${discount(p)}%</span>
        </div>
        <div class="p-actions">
          <button class="p-to-cart" data-add="${p.id}" aria-label="Добавить в корзину: ${p.cardTitle}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.6"/><circle cx="19" cy="21" r="1.6"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6"/></svg>
            В корзину
          </button>
          <a class="p-fav" href="product.html?id=${p.id}" aria-label="Подробнее: ${p.cardTitle}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </article>`;
}

/* ---------- Шапка ---------- */
const NAV = [
  { href: 'index.html', label: 'Главная', page: 'home' },
  { href: 'catalog.html', label: 'Каталог', page: 'catalog' },
  { href: 'about.html', label: 'О бренде', page: 'about' },
  { href: 'delivery.html', label: 'Доставка и оплата', page: 'delivery' },
  { href: 'contacts.html', label: 'Контакты', page: 'contacts' },
];

function renderHeader() {
  const page = document.body.dataset.page || '';
  const cartEl = document.getElementById('app-header');
  if (!cartEl) return;
  cartEl.innerHTML = `
  <div class="topbar">
    <div class="topbar-in">
      <span class="dot"></span>
      <span>Официальный магазин «Занимашки» · Доставка со складов Ozon по всей России — от 1 дня</span>
    </div>
  </div>
  <header class="header">
    <div class="header-in">
      ${logoSVG()}
      <nav class="nav" aria-label="Основная навигация">
        ${NAV.map(n => `<a href="${n.href}" class="${page === n.page ? 'active' : ''}">${n.label}</a>`).join('')}
      </nav>
      <div class="header-actions">
        <a class="cart-btn" href="cart.html" aria-label="Корзина">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.6"/><circle cx="19" cy="21" r="1.6"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6"/></svg>
          <span class="txt">Корзина</span>
          <span class="cart-count hidden" id="cart-count">0</span>
        </a>
        <button class="burger" id="burger" aria-label="Меню" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h12"/></svg>
        </button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu">
      ${NAV.map(n => `<a href="${n.href}" class="${page === n.page ? 'active' : ''}">${n.label}</a>`).join('')}
      <a href="cart.html">Корзина</a>
    </div>
  </header>`;
  updateCartBadge();

  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
}

function updateCartBadge() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const n = cartCount();
  el.textContent = n;
  el.classList.toggle('hidden', n === 0);
}

/* ---------- Подвал ---------- */
function renderFooter() {
  const el = document.getElementById('app-footer');
  if (!el) return;
  const year = new Date().getFullYear();
  el.innerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-in">
        <div>
          ${logoSVG('footer')}
          <p class="footer-about">Официальный магазин бренда «Занимашки» — многоразовые развивающие тетради, прописи пиши-стирай и раскраски для детей от 1 до 9 лет.</p>
          <p class="footer-about" style="margin-top:20px">Автор и правообладатель — <span class="nobr">ИП&nbsp;Габбасов&nbsp;Р.Р.</span><br>ИНН 507802319077<br>ОГРНИП 321508100484134</p>
        </div>
        <div>
          <h4>Каталог</h4>
          <ul class="footer-links">
            <li><a href="catalog.html">Все товары</a></li>
            <li><a href="catalog.html?type=propisi">Прописи</a></li>
            <li><a href="catalog.html?type=razvivashki">Развивашки</a></li>
            <li><a href="catalog.html?type=komplekt">Комплекты</a></li>
            <li><a href="catalog.html?age=3-4">От 1 до 4 лет</a></li>
            <li><a href="catalog.html?age=5-6">От 5 до 6 лет</a></li>
            <li><a href="catalog.html?age=7-9">От 7 до 9 лет</a></li>
          </ul>
        </div>
        <div>
          <h4>Покупателям</h4>
          <ul class="footer-links">
            <li><a href="about.html">О бренде</a></li>
            <li><a href="delivery.html">Доставка и оплата</a></li>
            <li><a href="delivery.html#faq">Частые вопросы</a></li>
            <li><a href="contacts.html">Контакты</a></li>
            <li><a href="${BRAND.ozonUrl}" target="_blank" rel="noopener">Мы на Ozon</a></li>
          </ul>
        </div>
        <div class="footer-contacts">
          <h4>Контакты</h4>
          <p><a href="mailto:${BRAND.email}">${BRAND.email}</a></p>
          <p>Адрес для корреспонденции:<br>141800, № а/я 636, ИП Габбасов Р.Р</p>
          <a class="footer-ozon" href="${BRAND.ozonUrl}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#1E2A56"/></svg>
            Рейтинг на Ozon — ${BRAND.ozonRating}
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-in">
        <span>© ${year} «Занимашки». Все права защищены.</span>
        <span>Доставка осуществляется со складов Ozon. Быстро и надёжно.</span>
      </div>
    </div>
  </footer>`;
}

/* ---------- Тост ---------- */
let toastTimer = null;
function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg><span></span>`;
    document.body.appendChild(el);
  }
  el.querySelector('span').textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ---------- Появление при скролле ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .12 });
  els.forEach(e => io.observe(e));
}

/* ---------- Добавление в корзину (делегирование) ---------- */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-add]');
  if (!btn) return;
  e.preventDefault();
  const id = btn.getAttribute('data-add');
  const p = findProduct(id);
  cartAdd(id, 1);
  toast('Добавлено в корзину: ' + (p ? p.cardTitle : 'товар'));
});

/* ---------- Инициализация ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initReveal();
  if (typeof pageInit === 'function') pageInit();
});
