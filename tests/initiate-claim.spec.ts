import { test, expect } from "./fixtures/test-fixtures";
import {
  IniciarReclamoAerolineasPage,
  BASE_URL,
} from "./pages/frontend/InitiateClaimPage";
import { TempMailPage } from "./helpers/TempMailHelper";

test.describe(
  "Frontend - Iniciar Reclamo Aerolineas",
  { tag: ["@aerolineas", "@frontend"] },
  () => {
    test("FE-AERO-001 - Iniciar reclamo y terminarlo con opcion aerolineas y vuelos", async ({
      page,
      context,
    }) => {
      const aeroPage = new IniciarReclamoAerolineasPage(page);
      const tempMailPage = new TempMailPage(await context.newPage());

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

      await expect(page).toHaveURL(`${BASE_URL}/datos-personales/paso-2`);

      await aeroPage.completarDatosPersonales();
      await aeroPage.clickContinuar();
      await aeroPage.expectGraciasMessage();
    });

    test("FE-OTRO-002 - Iniciar reclamo y terminarlo con opcion Otros", async ({
      page,
      context,
    }) => {
      const aeroPage = new IniciarReclamoAerolineasPage(page);

      // Paso 0: Seleccionar "Otros"
      await aeroPage.goto();
      await aeroPage.selectOtros();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      // Paso 1: Validar recaptcha y completar datos (category + companyName)
      await aeroPage.validateReCaptchaStep1();
      await aeroPage.completeOtrosStep1();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      // Paso 2: Completar datos de titularidad
      await aeroPage.completeOtrosStep2();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      // Contanos tu problema: Completar descripción y ubicación
      await aeroPage.completeContanosProblemaStep1();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      const tempMailPage = new TempMailPage(await context.newPage());
      await tempMailPage.goto();
      const email = await tempMailPage.getEmail();

      await aeroPage.fillEmailOtro(email);
      await aeroPage.clickEnviarOtro();
      await tempMailPage.findTeCorrespondeEmail();
      const codigo = await tempMailPage.getConfirmationCode();
      await tempMailPage.close();

      await aeroPage.fillCodigoOtro(codigo);
      await aeroPage.completarDatosPersonales();
      await aeroPage.clickContinuar();
      await aeroPage.expectGraciasMessage();
    });

    test("FE-AERO-004 - Validar error en vuelos: aeropuertos iguales", async ({
      page,
    }) => {
      const aeroPage = new IniciarReclamoAerolineasPage(page);

      await aeroPage.goto();
      await aeroPage.selectAerolineasVuelos();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      await aeroPage.validateReCaptchaStep1();
      // Seleccionar mismo aeropuerto para origen y llegada
      await aeroPage.origenInput.click();
      await aeroPage.origenInput.fill("Buenos Aires");
      await page.waitForTimeout(1000);
      await aeroPage.option.click();
      await aeroPage.llegadaInput.click();
      await aeroPage.llegadaInput.fill("Buenos Aires");
      await page.waitForTimeout(1000);
      await aeroPage.option.click();
      // Validar error de aeropuertos duplicados
      await expect(aeroPage.aeropuertosIgualesError).toBeVisible();
    });

    test("FE-AERO-006 - Validar error en vuelos: email inválido", async ({
      page,
      context,
    }) => {
      const aeroPage = new IniciarReclamoAerolineasPage(page);

      await aeroPage.goto();
      await aeroPage.selectAerolineasVuelos();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      await aeroPage.validateReCaptchaStep1();
      await aeroPage.completeFlightDetails();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);
      await aeroPage.completePassengerDetails();

      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(`${BASE_URL}/datos-personales/paso-1`);

      // Ingresar email inválido usando el selector correcto
      await aeroPage.fillEmailOtro("emailinvalido");
      // Presionar Tab para trigger blur y validación
      await aeroPage.emailInput.press('Tab');
      // Validar mensaje de error de formato inválido
      await expect(aeroPage.emailError).toBeVisible({ timeout: 10000 });
    });

    test("FE-AERO-009 - Validar error en Otros: empresa con menos de 3 caracteres", async ({
      page,
    }) => {
      const aeroPage = new IniciarReclamoAerolineasPage(page);

      await aeroPage.goto();
      await aeroPage.selectOtros();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      await aeroPage.validateReCaptchaStep1();
      // Seleccionar rubro pero empresa con menos de 3 caracteres
      await aeroPage.tipoReclamoSelect.click();
      await page.waitForTimeout(1000);
      await aeroPage.option.click();
      await page.waitForTimeout(1000);
      await aeroPage.empresaInput.fill("AD");

      // Validar mensaje de error usando el locator proporcionado
      await expect(aeroPage.empresaCaracteresError).toBeVisible();
    });

    test("FE-AERO-011 - Validar error en Otros: teléfono inválido en datos personales", async ({
      page,
      context,
    }) => {
      const aeroPage = new IniciarReclamoAerolineasPage(page);

      await aeroPage.goto();
      await aeroPage.selectOtros();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      await aeroPage.validateReCaptchaStep1();
      await aeroPage.completeOtrosStep1();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      await aeroPage.completeOtrosStep2();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      await aeroPage.completeContanosProblemaStep1();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      const tempMailPage = new TempMailPage(await context.newPage());
      await tempMailPage.goto();
      const email = await tempMailPage.getEmail();

      await aeroPage.fillEmailOtro(email);
      await aeroPage.clickEnviarOtro();

      await tempMailPage.findTeCorrespondeEmail();
      const codigo = await tempMailPage.getConfirmationCode();
      await tempMailPage.close();

      await aeroPage.fillCodigoOtro(codigo);

      // Completar datos personales con teléfono inválido
      await aeroPage.completarDatosPersonales();
      await aeroPage.fillTelefonoInvalido();

      await expect(aeroPage.telefonoInvalidoError).toBeVisible();
    });

    test("FE-AERO-013 - Validar error: OTP inválido", async ({
      page,
    }) => {
      const aeroPage = new IniciarReclamoAerolineasPage(page);

      await aeroPage.goto();
      await aeroPage.selectOtros();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      await aeroPage.validateReCaptchaStep1();
      await aeroPage.completeOtrosStep1();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      await aeroPage.completeOtrosStep2();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      await aeroPage.completeContanosProblemaStep1();
      await aeroPage.clickContinuar();
      await page.waitForTimeout(5000);

      await aeroPage.fillEmailOtro("testuser@testuser.com");
      await aeroPage.clickEnviarOtro();

      // Ingresar código OTP inválido
      await aeroPage.fillCodigoOtro("000000");

      await expect(aeroPage.codigoInvalidoError).toBeVisible();
    });
  },
);
