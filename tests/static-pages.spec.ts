import { test, expect } from './fixtures/test-fixtures';
import { StaticPagesPage } from './pages/frontend/StaticPagesPage';

test.describe('Frontend - Paginas Estaticas', { tag: ['@static', '@frontend'] }, () => {
  test('FE-STATIC-001 - Nosotros carga correctamente', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoNosotros();
  });

  test('FE-STATIC-002 - Vuelos carga correctamente', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoVuelos();
  });

  test('FE-STATIC-003 - Politicas de Privacidad carga correctamente', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoPoliticasPrivacidad();
  });

  test('FE-STATIC-004 - Terminos y Condiciones carga correctamente', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoTerminosCondiciones();
  });

  test('FE-STATIC-005 - Nuestros Servicios carga correctamente', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoNuestrosServicios();
  });

  test('FE-STATIC-006 - Preguntas Frecuentes carga correctamente', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoPreguntasFrecuentes();
  });

  test('FE-STATIC-007 - FAQ expandir respuesta', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoPreguntasFrecuentes();
    await staticPage.expandFaq();
  });

  test('FE-STATIC-009 - Contacto formulario carga', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoContacto();
  });

  // FE-STATIC-010: Contact form submission - button remains disabled
    // The form validation requires all fields to be filled properly
    test('FE-STATIC-010 - Contacto enviar mensaje', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoContacto();
    await staticPage.fillContactForm('Test', 'User', 'test@example.com', 'Mensaje de automatización', 'Test message');
    await staticPage.clickEnviar();
    await staticPage.expectSuccessMessage();
  });

  // FE-STATIC-011: Email validation - page has different form structure
    // The input locators need to be updated for the correct page
    test('FE-STATIC-011 - Contacto email invalido', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoContacto();
    await staticPage.fillInvalidEmail();
    await staticPage.expectAlertVisible();
  });

  test('FE-STATIC-012 - Contacto mensaje vacio', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.gotoContacto();
    await staticPage.expectEnviarDisabled();
  });
});

test.describe('Frontend - Responsive', { tag: ['@responsive', '@frontend'] }, () => {
  test('FE-RESP-001 - Homepage Mobile 320px', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.setViewport(320, 568);
    await staticPage.gotoHomepage();
    await staticPage.expectHeaderVisible();
  });

  test('FE-RESP-002 - Homepage Mobile 375px', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.setViewport(375, 812);
    await staticPage.gotoHomepage();
    await staticPage.expectHeaderVisible();
  });

  test('FE-RESP-003 - Homepage Tablet 768px', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.setViewport(768, 1024);
    await staticPage.gotoHomepage();
    await staticPage.expectHeaderVisible();
  });

  test('FE-RESP-004 - Homepage Desktop 1920px', async ({ page }) => {
    const staticPage = new StaticPagesPage(page);
    await staticPage.setViewport(1920, 1080);
    await staticPage.gotoHomepage();
    await staticPage.expectHeaderVisible();
  });
});