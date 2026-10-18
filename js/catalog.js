/* ============================================================
   Занимашки — каталог из 4 блоков
   ============================================================ */

const CATALOG_BLOCKS = {
  propisi: ['propisi-bukvy-s-uglubleniyami', 'propisi-trenazher-pocherk', 'propisi-cifry-schet'],
  stiray: ['razvivashki-veselye-bukvy-cifry', 'razvivashki-logika-vnimanie', 'razvivashki-mir-vokrug', 'pishi-stiray-pervye-slova'],
  komplekty: ['komplekt-pervye-propisi', 'komplekt-polnyy-kurs-pisma', 'komplekt-gotovimsya-k-shkole'],
  raskraski: ['raskraska-bolshaya'],
};

// Возрастные наборы с плашек главной (catalog.html?set=...)
const AGE_SETS = {
  '1-4': {
    age: '1–4 года', title: 'Первые занимашки',
    desc: 'Линии, узоры, штриховки. Развиваем мышление, интерес, хват пальчиками и мелкую моторику.',
    ids: ['razvivashki-veselye-bukvy-cifry', 'razvivashki-logika-vnimanie', 'razvivashki-mir-vokrug', 'komplekt-pervye-propisi'],
  },
  '4-6': {
    age: '4–6 лет', title: 'Подготовка к школе',
    desc: 'Буквы и цифры с углублениями, счёт, логика и внимание — по программе будущего первоклассника, но в игровой форме.',
    ids: ['pishi-stiray-pervye-slova', 'propisi-trenazher-pocherk', 'propisi-cifry-schet', 'komplekt-polnyy-kurs-pisma'],
  },
  '6-8': {
    age: '6–8 лет', title: 'Красивый почерк: постановка и исправление',
    desc: 'Ставим правильный наклон и соединения букв, повышаем скорость письма, тренируем логику, память и внимание школьника.',
    ids: ['propisi-bukvy-s-uglubleniyami'],
  },
};

function renderCatalogBlocks() {
  Object.entries(CATALOG_BLOCKS).forEach(([block, ids]) => {
    const grid = document.querySelector(`[data-block="${block}"]`);
    if (!grid) return;
    grid.innerHTML = ids
      .map(id => { const p = findProduct(id); return p ? productCard(p) : ''; })
      .join('');
  });
  initReveal();
}

// Страница возрастного набора: скрываем общие блоки и показываем только набор
function renderAgeSet(cfg) {
  document.querySelectorAll('.catalog-block, .cta-panel, .block-nav').forEach(el => { el.style.display = 'none'; });
  const introHead = document.querySelector('.container > .section-head');
  if (introHead) introHead.style.display = 'none';
  const picks = document.getElementById('gift-picks');
  if (picks) picks.style.display = 'none';

  const back = document.createElement('div');
  back.style.margin = '0 0 18px';
  back.innerHTML = '<a class="btn btn-ghost" href="catalog.html">← Показать весь каталог</a>';

  const head = document.createElement('div');
  head.className = 'section-head';
  head.style.marginTop = '26px';
  head.innerHTML = `
    <div class="p-type">${cfg.age}</div>
    <h1 class="h2">${cfg.title}</h1>
    <p>${cfg.desc}</p>`;

  const grid = document.createElement('div');
  grid.className = 'products-grid';
  grid.style.marginBottom = '48px';
  grid.innerHTML = cfg.ids.map(id => { const p = findProduct(id); return p ? productCard(p) : ''; }).join('');

  const main = document.querySelector('main .container') || document.querySelector('main');
  if (main) {
    main.insertBefore(grid, main.firstChild);
    main.insertBefore(head, main.firstChild);
    main.insertBefore(back, main.firstChild);
  }
  document.title = cfg.title + ' · ' + cfg.age + ' — Занимашки';
  initReveal();
}

function pageInit() {
  renderCatalogBlocks();

  const params = new URLSearchParams(location.search);

  // catalog.html?set=... — страница возрастного набора с плашки главной
  const cfg = AGE_SETS[params.get('set')];
  if (cfg) { renderAgeSet(cfg); return; }

  // Ссылки вида catalog.html?type=... ведут к нужному блоку
  const type = params.get('type');
  const map = { propisi: 'b-propisi', razvivashki: 'b-stiray', komplekt: 'b-komplekty', raskraski: 'b-raskraski' };
  if (type && map[type]) {
    setTimeout(() => {
      const el = document.getElementById(map[type]);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }
}
