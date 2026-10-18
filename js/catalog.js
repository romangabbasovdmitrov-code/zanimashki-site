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

  // Ссылки вида catalog.html?type=... показывают страницу только с этим блоком
  const params = new URLSearchParams(location.search);
  const type = params.get('type');
  const map = { propisi: 'b-propisi', stiray: 'b-stiray', razvivashki: 'b-stiray', komplekt: 'b-komplekty', komplekty: 'b-komplekty', raskraski: 'b-raskraski' };
  if (type && map[type]) {
    const sec = document.getElementById(map[type]);
    // скрыть остальные блоки каталога
    document.querySelectorAll('.catalog-block').forEach(b => { if (b !== sec) b.style.display = 'none'; });
    // скрыть подарочную плашку и плитки-подарки
    document.querySelectorAll('.cta-panel, .block-nav').forEach(el => { el.style.display = 'none'; });
    const picks = document.getElementById('gift-picks');
    if (picks) picks.style.display = 'none';
    // кнопка возврата ко всему каталогу
    const back = document.createElement('div');
    back.style.margin = '0 0 18px';
    back.innerHTML = '<a class="btn btn-ghost" href="catalog.html">← Показать весь каталог</a>';
    if (sec && sec.parentNode) sec.parentNode.insertBefore(back, sec);
    if (sec) sec.scrollIntoView({ block: 'start' });
  }
}
