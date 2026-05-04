import { test, expect } from './fixtures/test-fixtures';
import { BackofficeLoginPage } from './pages/backoffice/BackofficeLoginPage';
import { ClaimsListPage } from './pages/backoffice/ClaimsListPage';

const TEST_USER = {
  email: 'catalina.liste+admin@qubikcommerce.com',
  password: 'Pruebatest1!',
};

test.describe('Backoffice - Claims List', { tag: ['@claims', '@backoffice'] }, () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new BackofficeLoginPage(page);
    const claimsListPage = new ClaimsListPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await expect(page).toHaveURL(/.*backoffice\/home/, { timeout: 30000 });
    await claimsListPage.goto();
  });

  test('BO-CLAIM-001 - Lista de reclamos carga correctamente', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.expectListLoaded();
  });

  test('BO-CLAIM-002 - Hay reclamos en la lista', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.expectClaimsVisible();
  });

  test('BO-CLAIM-003 - Buscador de reclamos visible', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.expectSearchInputVisible();
  });

  test('BO-CLAIM-004 - Boton Exportar visible', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.expectExportButtonVisible();
  });

  test('BO-CLAIM-005 - Buscar reclamo por numero', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.searchByNumber('1308');
    await claimsListPage.expectSearchResult('1308');
  });

  test('BO-CLAIM-006 - Buscar reclamo inexistente muestra mensaje', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.searchInput.fill('RECLAMO-INEXISTENTE-999999');
    await claimsListPage.searchInput.press('Enter');
    await page.waitForTimeout(3000);
    await claimsListPage.expectNoResults();
  });

  test('BO-CLAIM-007 - Filtros por estado visibles', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.expectEstadoTabsVisible();
  });

  test('BO-CLAIM-008 - Filtro Rechazados muestra reclamos', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.filterByStatus('Rechazados');
    await claimsListPage.expectClaimsVisible();
  });

  test('BO-CLAIM-009 - Filtro Finalizados muestra reclamos', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.filterByStatus('Finalizados');
    await claimsListPage.expectClaimsVisible();
  });

  test('BO-CLAIM-010 - Filtro Cancelados muestra reclamos', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.filterByStatus('Cancelados');
    await claimsListPage.expectClaimsVisible();
  });

  test('BO-CLAIM-011 - Volver a Todos muestra reclamos', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.filterByStatus('Reclamos');
    await claimsListPage.expectClaimsVisible();
  });

  test('BO-CLAIM-012 - Paginador visible', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.expectPaginationVisible();
  });

  test('BO-CLAIM-013 - Cambiar cantidad de resultados por pagina', async ({ page }) => {
    const claimsListPage = new ClaimsListPage(page);
    await claimsListPage.expectPaginationVisible();
    await claimsListPage.changePageSize('10');
  });
});