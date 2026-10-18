/* ============================================================
   Занимашки — каталог из 4 блоков
   ============================================================ */

const CATALOG_BLOCKS = {
  propisi: ['propisi-bukvy-s-uglubleniyami', 'propisi-trenazher-pocherk', 'propisi-cifry-schet'],
  stiray: ['razvivashki-veselye-bukvy-cifry', 'razvivashki-logika-vnimanie', 'razvivashki-mir-vokrug', 'pishi-stiray-pervye-slova'],
  komplekty: ['komplekt-pervye-propisi', 'komplekt-polnyy-kurs-pisma', 'komplekt-gotovimsya-k-shkole'],
  raskraski: ['raskraska-bolshaya'],
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

function pageInit() {
  renderCatalogBlocks();

  const params = new URLSearchParams(location.search);

  // catalog.html?set=... — страницы возрастных наборов с цветных плашек главной
  const AGE_SETS = {
    '1-4': {
      age: '1–4 года', title: 'Первые занимашки',
      ids: ['razvivashki-veselye-bukvy-cifry', 'razvivashki-logika-vnimanie', 'razvivashki-mir-vokrug', 'komplekt-pervye-propisi'],
    },
    '4-6': {
      age: '4–6 лет', title: 'Подготовка к школе',
      ids: ['pishi-stiray-pervye-slova', 'propisi-trenazher-pocherk', 'propisi-cifry-schet', 'komplekt-polnyy-kurs-pisma'],
    },
    '6-8': {
      age: '6–8 лет', title: 'Красивый почерк: постановка и исправление',
      ids: ['propisi-bukvy-s-uglubleniyami'],
    },
  };

  const set = params.get('set');
  const cfg = set && AGE_SETS[set];
  if (cfg) {
    document.querySelectorAll('.catalog-block, .cta-panel, .block-nav').forEach(el => { el.style.display = 'none'; });
    const picks = document.getElementById('gift-picks');
    if (picks) picks.style.display = 'none';
    const sec = document.createElement('section');
    sec.className = 'catalog-block';
    sec.innerHTML = `
      <div class="section-head">
        <div class="p-type">${cfg.age}</div>
        <h2 class="h2">${cfg.title}</h2>
      </div>
      <div class="products-grid">${cfg.ids.map(id => { const p = findProduct(id); return p ? productCard(p) : ''; }).join('')}</div>`;
    const first = document.querySelector('.catalog-block');
    if (first && first.parentNode) {
      const back = document.createElement('div');
      back.style.margin = '0 0 18px';
      back.innerHTML = '<a class="btn btn-ghost" href="catalog.html">← Показать весь каталог</a>';
      first.parentNode.insertBefore(back, first);
      first.parentNode.insertBefore(sec, first);
    }
    initReveal();
    return;
  }

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
