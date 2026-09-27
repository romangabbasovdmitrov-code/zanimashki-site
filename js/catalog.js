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

  // Ссылки вида catalog.html?type=... ведут к нужному блоку
  const params = new URLSearchParams(location.search);
  const type = params.get('type');
  const map = { propisi: 'b-propisi', razvivashki: 'b-stiray', komplekt: 'b-komplekty', raskraski: 'b-raskraski' };
  if (type && map[type]) {
    setTimeout(() => {
      const el = document.getElementById(map[type]);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }
}
