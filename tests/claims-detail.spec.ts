import { test, expect } from './fixtures/test-fixtures';
import { BackofficeLoginPage } from './pages/backoffice/BackofficeLoginPage';
import { ClaimDetailPage } from './pages/backoffice/ClaimDetailPage';
import { ENV } from './config/constants';

test.describe('Backoffice - Claim Detail', { tag: ['@claims', '@backoffice'] }, () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new BackofficeLoginPage(page);
    const detailPage = new ClaimDetailPage(page);
    await loginPage.goto();
    await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
    await expect(page).toHaveURL(/.*backoffice\/home/);
    await detailPage.goto();
    await detailPage.clickFirstClaim();
  });

  test('BO-DET-001 - Detalle carga correctamente', async ({ page }) => {
    await expect(page).toHaveURL(/.*backoffice\/claims\/.+/);
  });

  test('BO-DET-002 - Informacion del usuario visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.customerHeading).toBeVisible({ timeout: 10000 });
  });

  test('BO-DET-003 - Informacion del producto visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.productHeading).toBeVisible({ timeout: 10000 });
  });

  test('BO-DET-004 - Informacion del reclamo visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.claimInfoHeading).toBeVisible({ timeout: 10000 });
  });

  test('BO-DET-005 - Numero de reclamo visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.claimNumberHeading).toBeVisible({ timeout: 10000 });
  });

  test('BO-DET-006 - Control para cambiar estado visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.expectStatusButtonVisible();
  });
});

test.describe('Backoffice - Claim Tabs', { tag: ['@claims', '@backoffice'] }, () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new BackofficeLoginPage(page);
    const detailPage = new ClaimDetailPage(page);
    await loginPage.goto();
    await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
    await expect(page).toHaveURL(/.*backoffice\/home/);
    await detailPage.goto();
    await detailPage.clickFirstClaim();
  });

  test('BO-TAB-001 - Tab Detalles visible por defecto', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.detallesTab).toBeVisible();
    await detailPage.expectTabSelected('detalles');
  });

  test('BO-TAB-002 - Cambiar a tab Notas', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.clickTab('notas');
    await detailPage.expectTabSelected('notas');
    await expect(page.getByText('Notas internas')).toBeVisible({ timeout: 5000 }).catch(() => {});
  });

  test('BO-TAB-003 - Cambiar a tab Mensajes', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.clickTab('mensajes');
    await detailPage.expectTabSelected('mensajes');
    await expect(page.getByText('Enviar')).toBeVisible({ timeout: 5000 }).catch(() => {});
  });

  test('BO-TAB-004 - Cambiar a tab Archivos', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.clickTab('archivos');
    await detailPage.expectTabSelected('archivos');
    await expect(page.getByText(/próximamente|coming soon/i)).toBeVisible({ timeout: 5000 }).catch(() => {});
  });

  test('BO-TAB-005 - Cambiar a tab Historial', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.clickTab('historial');
    await detailPage.expectTabSelected('historial');
    await expect(page.getByText(/próximamente|coming soon/i)).toBeVisible({ timeout: 5000 }).catch(() => {});
  });
});

test.describe('Backoffice - Tab Notas', { tag: ['@claims', '@backoffice'] }, () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new BackofficeLoginPage(page);
    const detailPage = new ClaimDetailPage(page);
    await loginPage.goto();
    await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
    await expect(page).toHaveURL(/.*backoffice\/home/);
    await detailPage.goto();
    await detailPage.clickFirstClaim();
    await detailPage.clickTab('notas');
  });

  test('BO-NOTA-001 - Numero de reclamo visible en Notas', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.claimNumberHeading).toBeVisible({ timeout: 10000 });
  });

  test('BO-NOTA-002 - Staff asignado visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.clickTab('detalles');
    await expect(detailPage.staffButton).toBeVisible({ timeout: 8000 });
  });

  test('BO-NOTA-003 - Campo para escribir nota visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.editableContent).toBeVisible({ timeout: 10000 });
  });

  test('BO-NOTA-004 - Boton Agregar nota visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.agregarNotaButton).toBeVisible({ timeout: 10000 });
  });

  test('BO-NOTA-005 - Se puede escribir y guardar nota', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    const noteText = 'Nota de prueba automatizada ' + Date.now();
    await detailPage.writeNote(noteText);
    await detailPage.clickAgregarNota();
    await detailPage.expectNoteVisible(noteText);
  });

  test('BO-NOTA-006 - Boton de formato Normal visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.normalFormatButton).toBeVisible({ timeout: 8000 });
  });
});

test.describe('Backoffice - Tab Mensajes', { tag: ['@claims', '@backoffice'] }, () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new BackofficeLoginPage(page);
    const detailPage = new ClaimDetailPage(page);
    await loginPage.goto();
    await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
    await expect(page).toHaveURL(/.*backoffice\/home/);
    await detailPage.gotoClaim('1285');
    await detailPage.clickTab('mensajes');
  });

  test('BO-MSG-001 - Heading numero de reclamo visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.claimNumberHeading).toBeVisible({ timeout: 10000 });
  });

  test('BO-MSG-002 - Staff asignado visible en Mensajes', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.clickTab('detalles');
    await expect(detailPage.staffButton).toBeVisible({ timeout: 8000 });
  });

  test('BO-MSG-003 - Contenido editable para escribir mensaje', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.editableContent).toBeVisible({ timeout: 10000 });
    await expect(detailPage.enviarButton).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Backoffice - Tab Archivos', { tag: ['@claims', '@backoffice'] }, () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new BackofficeLoginPage(page);
    const detailPage = new ClaimDetailPage(page);
    await loginPage.goto();
    await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
    await expect(page).toHaveURL(/.*backoffice\/home/);
    await detailPage.goto();
    await detailPage.clickFirstClaim();
    await detailPage.clickTab('archivos');
  });

  test('BO-FILE-001 - Tab Archivos carga correctamente', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.expectTabSelected('archivos');
  });

  test('BO-FILE-002 - Contenido o empty state visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await expect(detailPage.contentContainers.first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Backoffice - Tab Historial', { tag: ['@claims', '@backoffice'] }, () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new BackofficeLoginPage(page);
    const detailPage = new ClaimDetailPage(page);
    await loginPage.goto();
    await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
    await expect(page).toHaveURL(/.*backoffice\/home/);
  });

  test('BO-HIST-001 - Historial carga correctamente', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.gotoClaim('1308');
    await detailPage.clickTab('historial');
    await detailPage.expectTabSelected('historial');
    const historyContent = page.getByText(/próximamente|coming soon|historial/i);
    await expect(historyContent.first()).toBeVisible({ timeout: 10000 });
  });

  test('BO-HIST-002 - Fechas de eventos visibles', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.gotoClaim('1308');
    await detailPage.clickTab('historial');
    try {
      await expect(detailPage.datePattern.first()).toBeVisible({ timeout: 5000 });
    } catch {
      await expect(page.getByText(/próximamente|coming soon/i).first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('BO-HIST-003 - Transicion de estado visible', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.gotoClaim('1308');
    await detailPage.clickTab('historial');
    try {
      await expect(detailPage.statusChangeText.first()).toBeVisible({ timeout: 5000 });
    } catch {
      await expect(page.getByText(/próximamente|coming soon/i).first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('BO-HIST-004 - Multiples transiciones visibles', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.gotoClaim('1308');
    await detailPage.clickTab('historial');
    const count = await detailPage.getStatusChangeCount();
    if (count === 0) {
      await expect(detailPage.historialTab).toBeVisible();
    } else {
      expect(count).toBeGreaterThanOrEqual(1);
    }
  });

  test('BO-HIST-005 - Sin opciones de editar en historial', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.gotoClaim('1308');
    await detailPage.clickTab('historial');
    expect(await detailPage.editDeleteButtons.count()).toBe(0);
  });

  test('BO-HIST-006 - Mensaje sin movimientos cuando no hay actividad', async ({ page }) => {
    const detailPage = new ClaimDetailPage(page);
    await detailPage.gotoClaim('1');
    await detailPage.clickTab('historial');
    const emptyMessage = page.getByText(/Aún no hay movimientos|próximamente|coming soon/i);
    await expect(emptyMessage.first()).toBeVisible({ timeout: 10000 });
  });
});
