import { test, expect } from './fixtures/test-fixtures';

test.describe('Frontend - Homepage', { tag: ['@homepage', '@frontend'] }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('FE-HOME-001 - Homepage carga correctamente', async ({ homePage }) => {
    await expect(homePage.page).toHaveURL(/.*\/$/);
  });

  test('FE-HOME-002 - Elementos del header visibles', async ({ homePage }) => {
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.navigation).toBeVisible();
  });

  test('FE-HOME-003 - Elementos del footer visibles', async ({ homePage }) => {
    await expect(homePage.footer).toBeVisible();
  });

  test('FE-HOME-004 - Boton Iniciar Reclamo funcional', async ({ homePage }) => {
    await homePage.clickIniciarReclamo();
    await expect(homePage.page).toHaveURL(/.*mis-reclamos\/ingresar|login|auth/);
  });

  test('FE-HOME-005 - Banner de servicios visible', async ({ homePage }) => {
    await expect(homePage.servicesSection).toBeVisible();
  });

  test('FE-HOME-010 - Video player carga correctamente', async ({ homePage }) => {
    await expect(homePage.videoPlayer).toBeAttached();
  });
});