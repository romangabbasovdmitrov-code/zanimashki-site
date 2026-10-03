/* ============================================================
   Занимашки — общая логика: шапка, подвал, хелперы
   ============================================================ */

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
    </div>
  </article>`;
}

/* ---------- Шапка ---------- */
const NAV = [
  { href: 'index.html', label: 'Главная', page: 'home' },
  { href: 'catalog.html', label: 'Каталог', page: 'catalog' },
  { href: 'about.html', label: 'О бренде', page: 'about' },
  { href: 'contacts.html', label: 'Контакты', page: 'contacts' },
];

function renderHeader() {
  const page = document.body.dataset.page || '';
  const hostEl = document.getElementById('app-header');
  if (!hostEl) return;
  hostEl.innerHTML = `
  <div class="topbar">
    <div class="topbar-in">
      <span class="dot"></span>
      <span>Официальный магазин «Занимашки» · Быстрая доставка по всей России — от 1 дня</span>
    </div>
  </div>
  <header class="header">
    <div class="header-in">
      ${logoSVG()}
      <nav class="nav" aria-label="Основная навигация">
        ${NAV.map(n => `<a href="${n.href}" class="${page === n.page ? 'active' : ''}">${n.label}</a>`).join('')}
      </nav>
      <div class="header-actions">
        <button class="burger" id="burger" aria-label="Меню" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h12"/></svg>
        </button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu">
      ${NAV.map(n => `<a href="${n.href}" class="${page === n.page ? 'active' : ''}">${n.label}</a>`).join('')}
    </div>
  </header>`;

  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
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
          <p class="footer-about">Официальный магазин бренда «Занимашки» — многоразовые развивающие тетради, прописи пиши-стирай и раскраски для детей от 1 до 7 лет.</p>
          <p class="footer-about" style="margin-top:20px">Автор и правообладатель — <span class="nobr">ИП&nbsp;Габбасов&nbsp;Р.Р.</span><br>ИНН 507802319077<br>ОГРНИП 321508100484134</p>
        </div>
        <div>
          <h4>Каталог</h4>
          <ul class="footer-links">
            <li><a href="catalog.html">Все товары</a></li>
            <li><a href="catalog.html?type=propisi">Прописи</a></li>
            <li><a href="catalog.html?type=razvivashki">Развивашки</a></li>
            <li><a href="catalog.html?type=komplekt">Комплекты</a></li>
            <li><a href="catalog.html?type=raskraski">Раскраска</a></li>
          </ul>
        </div>
        <div>
          <h4>Покупателям</h4>
          <ul class="footer-links">
            <li><a href="about.html">О бренде</a></li>
            <li><a href="contacts.html">Контакты</a></li>
          </ul>
        </div>
        <div class="footer-contacts">
          <h4>Контакты</h4>
          <p><a href="mailto:${BRAND.email}">${BRAND.email}</a></p>
          <p>Адрес для корреспонденции:<br>141800, № а/я 636, ИП Габбасов Р.Р</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-in">
        <span>© ${year} «Занимашки». Все права защищены.</span>
        <span>Быстрая доставка по всей России. От 1 дня.</span>
      </div>
    </div>
  </footer>`;
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

/* ---------- Инициализация ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initReveal();
  if (typeof pageInit === 'function') pageInit();
});
