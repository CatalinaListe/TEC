import { test, expect } from "./fixtures/test-fixtures";
import { IniciarReclamoAerolineasPage } from "./pages/frontend/InitiateClaimPage";
import { TempMailPage } from "./helpers/TempMailHelper";
import { ClaimTrackingPage } from "./pages/frontend/ClaimTrackingPage";
import { URLS } from "./config/constants";

test.describe("Seguimiento de reclamo", () => {
  let trackingPage: ClaimTrackingPage;

  test.beforeEach(async ({ page, context }) => {
    const aeroPage = new IniciarReclamoAerolineasPage(page);
    const tempMailPage = new TempMailPage(await context.newPage());
    trackingPage = new ClaimTrackingPage(page);

    await aeroPage.goto();
    await aeroPage.selectAerolineasVuelos();
    await aeroPage.clickContinuar();
    await page.waitForTimeout(5000);

    await expect(page).toHaveURL(/.*\/vuelos\/paso-1/);

    await aeroPage.validateReCaptchaStep1();
    await aeroPage.completeFlightDetails();
    await aeroPage.clickContinuar();
    await page.waitForTimeout(5000);
    await aeroPage.completePassengerDetails();

    await tempMailPage.goto();
    const email = await tempMailPage.getEmail();

    await aeroPage.fillEmailYEnviar(email);
    await tempMailPage.findTeCorrespondeEmail();
    const codigo = await tempMailPage.getConfirmationCode();
    await tempMailPage.close();

    await aeroPage.fillCodigoEmail(codigo);

    await expect(page).toHaveURL(`${URLS.BASE}/datos-personales/paso-2`);

    await aeroPage.completarDatosPersonales();
    await aeroPage.clickContinuar();
    await trackingPage.expectGraciasMessage();
    await trackingPage.volverAlInicioButton.click();
    await trackingPage.seguirReclamoButton.click();
  });

  test("FE-SEG-001 - Validar que el usuario pueda ingresar al seguimiento de reclamo", async ({
    page,
  }) => {
    await expect(page).toHaveURL(/.*mis-reclamos\/buscar/);
    await trackingPage.clickReclamosLink();
  });

  test("FE-SEG-004 - Validar error: reclamo inexistente", async ({ page }) => {
    const trackingPage = new ClaimTrackingPage(page);
    await trackingPage.gotoSearch();
    await trackingPage.searchClaim("99999999");
    await trackingPage.expectClaimNotFound("99999999");
  });

  test("FE-SEG-005 - Validar error: formato inválido en número de reclamo", async ({
    page,
  }) => {
    const trackingPage = new ClaimTrackingPage(page);
    await trackingPage.gotoSearch();
    await trackingPage.searchClaimInvalid("0");
    await trackingPage.expectInvalidNumberError();
  });

  test("FE-SEG-006 - Validar listado de reclamos muestra columnas y datos", async ({
    page,
  }) => {
    const trackingPage = new ClaimTrackingPage(page);
    await trackingPage.gotoListado();
    await trackingPage.expectClaimsListVisible();
  });

  test("FE-SEG-007 - Validar ver detalle de reclamo via menú tres puntitos", async ({
    page,
  }) => {
    const trackingPage = new ClaimTrackingPage(page);
    await trackingPage.gotoListado();

    const emptyMessage = await trackingPage.expectEmptyMessage();

    if (!emptyMessage) {
      await trackingPage.clickThreeDotsMenu();
      await trackingPage.clickVerDetalle();
      await trackingPage.expectDrawerVisible();
      await trackingPage.closeDrawer();
      await trackingPage.expectDrawerNotVisible();
    }
  });

  test("FE-SEG-008 - Validar estados de reclamo visibles en listado", async ({
    page,
  }) => {
    const trackingPage = new ClaimTrackingPage(page);
    await trackingPage.gotoListado();

    const emptyMessage = await trackingPage.expectEmptyMessage();

    if (!emptyMessage) {
      await trackingPage.expectEstadoVisible();
    }
  });

  test("FE-SEG-009 - Validar estados de pago en listado", async ({ page }) => {
    const trackingPage = new ClaimTrackingPage(page);
    await trackingPage.gotoListado();
    await trackingPage.expectPagoColumnVisible();

    const emptyMessage = await trackingPage.expectEmptyMessage();

    if (!emptyMessage) {
      await trackingPage.expectPagoCellVisible();
    }
  });

  test("FE-SEG-010 - Validar edicion de datos personales", async ({ page }) => {
    const trackingPage = new ClaimTrackingPage(page);
    await trackingPage.clickDatosPersonales();
    await expect(trackingPage.datosPersonalesHeading).toBeVisible();
    await trackingPage.clickEditar();
    await trackingPage.editPersonalData('NuevoNombre', 'NuevoApellido', '1197654321');
  });
});
