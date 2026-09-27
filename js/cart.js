/* ============================================================
   Занимашки — корзина и оформление заказа
   ============================================================ */

function renderCart() {
  const root = document.getElementById('cart-root');
  const items = cartItems();

  if (!items.length) {
    root.innerHTML = `
      <div class="cart-empty" style="background:#fff; border-radius:var(--radius-xl); box-shadow:var(--shadow-s); margin-bottom:80px">
        <div class="big-ic">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.6"/><circle cx="19" cy="21" r="1.6"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6"/></svg>
        </div>
        <b>В корзине пока пусто</b>
        <p>Выберите многоразовые тетради «Занимашки» — маркер идёт в подарок к каждой.</p>
        <a class="btn btn-primary btn-lg" href="catalog.html">Перейти в каталог</a>
      </div>`;
    return;
  }

  root.innerHTML = `
  <div class="cart-layout">
    <div class="cart-items" id="cart-items">
      ${items.map(({ p, qty }) => `
      <div class="cart-item" data-id="${p.id}">
        <a class="ci-img" href="product.html?id=${p.id}" aria-label="${p.cardTitle}">${coverThumbSVG(p)}</a>
        <div>
          <a class="ci-title" href="product.html?id=${p.id}">${p.cardTitle}</a>
          <div class="ci-age">${TYPE_LABELS[p.type]} · ${p.ageLabel} · маркер в подарок</div>
          <div class="qty" aria-label="Количество">
            <button type="button" data-dec="${p.id}" aria-label="Уменьшить количество">−</button>
            <input value="${qty}" inputmode="numeric" aria-label="Количество" data-qty="${p.id}">
            <button type="button" data-inc="${p.id}" aria-label="Увеличить количество">+</button>
          </div>
        </div>
        <div class="ci-right">
          <span class="ci-price">${money(p.price * qty)}</span>
          ${qty > 1 ? `<span style="font-size:13px; font-weight:700; color:var(--muted)">${money(p.price)} × ${qty}</span>` : ''}
          <button class="ci-remove" data-remove="${p.id}">Удалить</button>
        </div>
      </div>`).join('')}
    </div>

    <aside class="cart-summary">
      <h3>Ваш заказ</h3>
      <div class="cs-row"><span>Товары (${cartCount()})</span><b>${money(cartOldTotal())}</b></div>
      <div class="cs-row" style="color:var(--coral-2)"><span>Скидка</span><b>−${money(cartOldTotal() - cartTotal())}</b></div>
      <div class="cs-row"><span>Маркер в подарок</span><b style="color:var(--teal-2)">0 ₽</b></div>
      <div class="cs-total"><span>Итого</span><b>${money(cartTotal())}</b></div>
      <div class="cs-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        Доставка осуществляется со складов Ozon — быстро и надёжно. Стоимость доставки рассчитается при оформлении.
      </div>
      <button class="btn btn-primary btn-lg" id="checkout-btn">Оформить заказ</button>
      <div class="cs-ozon">Также можно заказать <a href="${BRAND.ozonUrl}" target="_blank" rel="noopener">на Ozon</a></div>
    </aside>
  </div>`;

  /* Кнопки количества и удаления */
  root.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.inc; const c = cartGet(); cartSetQty(id, c[id] + 1); refresh();
  }));
  root.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.dec; const c = cartGet(); cartSetQty(id, c[id] - 1); refresh();
  }));
  root.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => {
    cartRemove(b.dataset.remove); refresh(); toast('Товар удалён из корзины');
  }));

  document.getElementById('checkout-btn').addEventListener('click', renderCheckout);
}

function refresh() {
  renderCart();
  updateCartBadge();
}

function renderCheckout() {
  const root = document.getElementById('cart-root');
  root.innerHTML = `
  <div class="cart-layout" style="grid-template-columns:1fr">
    <div class="cart-summary" style="position:static; max-width:760px">
      <h3>Оформление заказа</h3>
      <form class="form-grid" id="order-form" style="margin-bottom:22px">
        <div class="field"><label for="f-name">Ваше имя</label><input id="f-name" required placeholder="Как к вам обращаться"></div>
        <div class="field"><label for="f-phone">Телефон</label><input id="f-phone" required type="tel" placeholder="+7 (___) ___-__-__"></div>
        <div class="field full"><label for="f-city">Город доставки</label><input id="f-city" required placeholder="Например, Москва"></div>
        <div class="field full"><label for="f-comment">Комментарий к заказу</label><textarea id="f-comment" placeholder="Удобная дата доставки, пожелания по комплектации"></textarea></div>
      </form>
      <div class="cs-total" style="margin-top:0"><span>К оплате</span><b>${money(cartTotal())}</b></div>
      <div class="cs-note" style="margin-top:12px">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        Заказ отправляется в обработку и доставляется со складов Ozon. Оплата при получении или онлайн.
      </div>
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:6px">
        <button class="btn btn-primary btn-lg" id="order-submit" style="flex:1; min-width:220px">Подтвердить заказ</button>
        <button class="btn btn-ghost btn-lg" id="order-back">Вернуться в корзину</button>
      </div>
    </div>
  </div>`;

  document.getElementById('order-back').addEventListener('click', renderCart);
  document.getElementById('order-submit').addEventListener('click', () => {
    const form = document.getElementById('order-form');
    if (!form.reportValidity()) return;
    cartClear();
    root.innerHTML = `
      <div class="form-success" style="margin-bottom:80px">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
        <b>Заказ принят!</b>
        <p>Спасибо! Менеджер «Занимашек» свяжется с вами для подтверждения, а заказ отправится со склада Ozon — обычно доставка занимает 1–2 дня.</p>
        <div style="margin-top:26px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap">
          <a class="btn btn-teal" href="catalog.html">Продолжить покупки</a>
          <a class="btn btn-ghost" href="${BRAND.ozonUrl}" target="_blank" rel="noopener">Наш магазин на Ozon</a>
        </div>
      </div>`;
    updateCartBadge();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function pageInit() {
  renderCart();
}
