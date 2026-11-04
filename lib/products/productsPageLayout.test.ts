import assert from 'node:assert/strict';

interface ProductsPageLayoutModule {
  isCompactBrandOverviewPage(input: {
    brand: string | null | undefined;
    category?: string;
    catalogView?: boolean;
  }): boolean;
}

const moduleUrl = new URL('./productsPageLayout.ts', import.meta.url).href;
const { isCompactBrandOverviewPage } = await import(moduleUrl) as ProductsPageLayoutModule;

assert.equal(
  isCompactBrandOverviewPage({ brand: 'wago' }),
  true,
  'The WAGO brand overview should use the compact header layout',
);

assert.equal(
  isCompactBrandOverviewPage({ brand: 'ifm' }),
  true,
  'The IFM brand overview should use the compact header layout',
);

assert.equal(
  isCompactBrandOverviewPage({ brand: 'lenze' }),
  true,
  'The Lenze brand overview should use the compact header layout',
);

assert.equal(
  isCompactBrandOverviewPage({ brand: 'wago', category: 'Bornes sur rail' }),
  false,
  'WAGO category pages should keep the standard header layout',
);

assert.equal(
  isCompactBrandOverviewPage({ brand: 'wago', catalogView: true }),
  false,
  'The general catalog view should keep its standard header layout',
);
