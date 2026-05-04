import { Page, Locator, expect } from "@playwright/test";

const BASE_URL = "https://front.dev-tecorresponde.k8s.qubikcommerce.com";

export class IniciarReclamoAerolineasPage {
  private readonly _page: Page;

  constructor(page: Page) {
    this._page = page;
  }

  private get page(): Page {
    return this._page;
  }

  get baseUrl(): string {
    return BASE_URL;
  }

  get selectTipoReclamo(): Locator {
    return this.page.getByRole("button", {
      name: /Seleccioná una opción Tipo de/i,
    });
  }

  get optionAerolineasVuelos(): Locator {
    return this.page.getByRole("option", { name: /Aerolíneas y vuelos/i });
  }

  get optionOtros(): Locator {
    return this.page.getByRole("option", { name: /Otros/i });
  }

  get continuarButton(): Locator {
    return this.page.getByRole("button", { name: "Continuar" });
  }

  get reCaptchaContainer(): Locator {
    return this.page.locator(`iframe[title="reCAPTCHA"]`);
  }

  get origenInput(): Locator {
    return this.page.getByRole("combobox", { name: "Aeropuerto de origen" });
  }

  get llegadaInput(): Locator {
    return this.page.getByRole("combobox", { name: "Aeropuerto de llegada" });
  }

  get option(): Locator {
    return this.page.getByRole("option").first();
  }

  get nombreInput(): Locator {
    return this.page.getByRole("textbox", { name: "Nombre*" });
  }

  get apellidoInput(): Locator {
    return this.page.getByRole("textbox", { name: "Apellido*" });
  }

  get siLabel(): Locator {
    return this.page.locator("label").filter({ hasText: "Si" });
  }

  get aerolineaInput(): Locator {
    return this.page.getByRole("combobox", { name: "Aerolínea" });
  }

  get numeroVueloInput(): Locator {
    return this.page.getByRole("textbox", { name: "123" });
  }

  get fechaVueloInput(): Locator {
    return this.page.getByRole("textbox", {
      name: "Fecha original del vuelo*",
    });
  }

  get primerDiaCalendario(): Locator {
    return this.page
      .locator("button.rounded-full.text-sm")
      .filter({ hasText: /^\d{1,2}$/ })
      .first();
  }

  get aplicarButton(): Locator {
    return this.page.getByRole("button", { name: "Aplicar" });
  }

  get demoraLabel(): Locator {
    return this.page
      .locator("label")
      .filter({ hasText: "Demoras o cancelaciones" });
  }

  get menosDe3HorasLabel(): Locator {
    return this.page.locator("label").filter({ hasText: "Menos de 3 horas" });
  }

  get emailInput(): Locator {
    return this.page.getByRole("textbox", { name: "Teléfono o e-mail" });
  }

  get enviarButton(): Locator {
    return this.page.getByRole("button", { name: "Enviar" });
  }

  get codigoEmailInput(): Locator {
    return this.page.getByRole("textbox");
  }

  get nombrePaso2Input(): Locator {
    return this.page.getByRole("textbox", { name: "Nombre: *" });
  }

  get apellidoPaso2Input(): Locator {
    return this.page.getByRole("textbox", { name: "Apellido: *" });
  }

  get tipoDocumentoButton(): Locator {
    return this.page.getByRole("button", { name: "DNI / CUIT / Pasaporte" });
  }

  get numeroDocumentoInput(): Locator {
    return this.page.locator('input[name="documentNumber"]');
  }

  get telefonoInput(): Locator {
    return this.page.getByRole("textbox", { name: "Télefono o Celular: *" });
  }

  get terminosCheckbox(): Locator {
    return this.page.getByRole("checkbox", {
      name: "Entiendo que el proceso tiene",
    });
  }

  get confirmarButton(): Locator {
    return this.page.getByRole("button", { name: "Confirmar" });
  }

  get tipoReclamoSelect(): Locator {
    return this.page.getByRole("button", {
      name: /Seleccioná una opción Elegí/i,
    });
  }

  get empresaInput(): Locator {
    return this.page.getByRole("textbox", {
      name: "Empresa o entidad a reclamar:*",
    });
  }

  async goto(): Promise<void> {
    await this.page.goto(`${BASE_URL}/iniciar-reclamo/paso-0`);
    await this.page.waitForTimeout(3000);
  }

  async gotoPaso1(): Promise<void> {
    await this.page.goto(`${BASE_URL}/vuelos/paso-1`);
    await this.page.waitForTimeout(3000);
  }

  async selectAerolineasVuelos(): Promise<void> {
    await this.selectTipoReclamo.click();
    await this.page.waitForTimeout(500);
    await this.optionAerolineasVuelos.click();
    await this.page.waitForTimeout(500);
  }

  async selectOtros(): Promise<void> {
    await this.selectTipoReclamo.click();
    await this.page.waitForTimeout(500);
    await this.optionOtros.click();
    await this.page.waitForTimeout(500);
  }

  async completeOtrosStep1(): Promise<void> {
    await this.page.waitForTimeout(2000);
    // Seleccionar categoría (rubro)
    await this.tipoReclamoSelect.click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole("option").first().click();
    await this.page.waitForTimeout(1000);
    // Llenar empresa
    await this.empresaInput.fill("ADU.SA");
    await this.page.waitForTimeout(500);
    // Verificar que el botón Continuar esté habilitado
    await this.continuarButton.waitFor({ state: "visible", timeout: 5000 });
  }

  async clickContinuar(): Promise<void> {
    await this.page.waitForTimeout(2000);
    // Esperar a que el botón esté habilitado
    await this.continuarButton.waitFor({ state: "visible", timeout: 10000 });
    // Verificar si el botón está deshabilitado
    const isDisabled = await this.continuarButton.getAttribute("disabled");
    if (isDisabled !== null) {
      // Si está deshabilitado, esperar a que se habilite
      await this.page.waitForFunction(
        (button) =>
          !button.hasAttribute("disabled") &&
          !button.hasAttribute("data-disabled"),
        await this.continuarButton.elementHandle(),
      );
    }
    await this.continuarButton.click();
  }

  async validateReCaptchaStep1(): Promise<void> {
    await this.reCaptchaContainer.waitFor({ state: "visible" });
    await this.page.mouse.move(800, 315);
    await this.page.waitForTimeout(1000);
    await this.page.mouse.click(800, 315);
    await this.page.waitForTimeout(5000);
  }

  async completeFlightDetails(): Promise<void> {
    await this.page.waitForTimeout(3000);
    await this.origenInput.click();
    await this.origenInput.fill("Buenos Aires");
    await this.page.waitForTimeout(1000);
    await this.option.click();
    await this.llegadaInput.click();
    await this.llegadaInput.fill("Madrid");
    await this.page.waitForTimeout(1000);
    await this.option.click();
    await this.page.waitForTimeout(1000);
  }

  async completePassengerDetails(): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.nombreInput.fill("Test");
    await this.apellidoInput.fill("User");
    await this.siLabel.click();
    await this.page.waitForTimeout(3000);
    await this.aerolineaInput.waitFor({ state: "visible" });
    await this.aerolineaInput.click();
    await this.aerolineaInput.fill("Aerolineas Argentinas");
    await this.page.waitForTimeout(1500);
    await this.option.click();
    await this.page.waitForTimeout(1000);
    await this.numeroVueloInput.fill("123");
    await this.page.waitForTimeout(1000);
    await this.fechaVueloInput.waitFor({ state: "visible" });
    await this.fechaVueloInput.click();
    await this.page.waitForTimeout(1500);
    await this.primerDiaCalendario.waitFor({ state: "visible" });
    await this.primerDiaCalendario.click();
    await this.page.waitForTimeout(500);
    await this.aplicarButton.click();
    await this.page.waitForTimeout(1000);
    await this.continuarButton.click();
    await this.page.waitForTimeout(2000);
    await this.demoraLabel.click();
    await this.page.waitForTimeout(500);
    await this.menosDe3HorasLabel.click();
    await this.page.waitForTimeout(500);
    await this.continuarButton.click();
    await this.page.waitForTimeout(2000);
  }

  async fillEmailYEnviar(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(1000);
    await this.enviarButton.click();
    await this.page.waitForTimeout(10000);
  }

  async fillCodigoEmail(codigo: string): Promise<void> {
    await this.codigoEmailInput.fill(codigo);
    await this.continuarButton.click();
  }

  async completarDatosPersonales(): Promise<void> {
    await this.page.waitForTimeout(3000);
    await this.nombrePaso2Input.fill("Test");
    await this.apellidoPaso2Input.fill("User");
    await this.tipoDocumentoButton.click();
    await this.page.waitForTimeout(500);
    await this.page
      .locator('div[role="option"], li, [role="listbox"] > *')
      .filter({ hasText: "DNI" })
      .first()
      .click();
    await this.page.waitForTimeout(500);
    await this.numeroDocumentoInput.fill("12345678");
    await this.telefonoInput.fill("1191234567");
    await this.terminosCheckbox.click();
    await this.confirmarButton.click();
  }

  // Métodos para flujo "Otros"

  get isClaimUserHolderNoLabel(): Locator {
    return this.page
      .getByRole("radiogroup", { name: /¿Sos el titular/i })
      .getByText("Si", { exact: true });
  }

  get ownerNameInput(): Locator {
    return this.page.getByRole("textbox", {
      name: /Nombre y apellido del titular/i,
    });
  }

  get claimUserUsesProductSiRadio(): Locator {
    // Buscar el segundo radiogroup y luego el radio "Sí"
    return this.page
      .getByRole("radiogroup", { name: /¿Utilizás el producto o servicio?/i })
      .getByRole("radio", { name: "Si" });
  }

  async completeOtrosStep2(): Promise<void> {
    await this.page.waitForTimeout(2000);

    // Verificar si el campo de nombre del titular ya está visible
    // (si "No" está seleccionado, el campo debería estar visible)
    const isOwnerNameVisible = await this.ownerNameInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (!isOwnerNameVisible) {
      // Si no está visible, hacer clic en "No" para el titular
      await this.isClaimUserHolderNoLabel.click({ force: true });
      await this.page.waitForTimeout(1000);
    }

    // Esperar a que aparezca el campo de nombre del titular
    await this.ownerNameInput.waitFor({ state: "visible", timeout: 5000 });

    // Llenar nombre del titular
    await this.ownerNameInput.fill("Juan Perez");
    await this.page.waitForTimeout(500);

    // Seleccionar "Sí" para "¿Utilizás el producto o servicio?"
    await this.claimUserUsesProductSiRadio.click({ force: true });
    await this.page.waitForTimeout(500);
  }

  get descripcionInput(): Locator {
    return this.page.getByRole("textbox", {
      name: "Explícanos qué pasó en orden",
    });
  }

  get locationButton(): Locator {
    return this.page.getByRole("button", {
      name: "Seleccioná una provincia ¿En qué provincia está ubicado tu domicilio?*",
    });
  }

  async completeContanosProblemaStep1(): Promise<void> {
    await this.page.waitForTimeout(2000);

    // Llenar descripción del problema
    await this.descripcionInput.waitFor({ state: "visible", timeout: 5000 });
    await this.descripcionInput.fill(
      "Compré un celular hace dos semanas y desde el primer día no funciona correctamente. La pantalla se apaga sola y la batería dura muy poco. Ya intenté cargarlo varias veces pero sigue igual. Quiero que me lo cambien por uno nuevo o me devuelvan el dinero.\n\nPodés sumar más info para que entendamos mejor tu caso:\n- Yo tengo domicilio en CABA.\n- Fecha del incidente: 15/04/2026.\n- Número de reclamo previo: REC-2026-001234.",
    );
    await this.page.waitForTimeout(1000);

    // Seleccionar provincia (es un combobox/button)
    await this.locationButton.click();
    await this.page.waitForTimeout(1000);

    // Buscar "Buenos Aires" en las opciones (usar exact: true para evitar ambigüedad)
    await this.page
      .getByRole("option", { name: "Buenos Aires", exact: true })
      .click();
    await this.page.waitForTimeout(1000);

    await this.page
      .getByRole("button", {
        name: "Seleccioná una provincia ¿En qué provincia tiene domicilio la empresa a la que",
      })
      .click();
    await this.page.waitForTimeout(1000);
    await this.page
      .getByRole("option", { name: "Buenos Aires", exact: true })
      .click();
    await this.page.waitForTimeout(500);
  }

  get emailError(): Locator {
    return this.page.getByText("Por favor ingresá un formato válido.");
  }

  get aeropuertosIgualesError(): Locator {
    return this.page.getByText("El aeropuerto de origen y");
  }

  get empresaCaracteresError(): Locator {
    return this.page
      .locator("div")
      .filter({ hasText: /^Ingresá entre 3 y 30 caracteres\.$/ })
      .first();
  }

  get telefonoInvalidoError(): Locator {
    return this.page.getByText("Número de teléfono inválido.");
  }

  get codigoInvalidoError(): Locator {
    return this.page.getByText("El código ingresado es incorrecto");
  }

  async fillEmailOtro(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(1000);
  }

  async clickEnviarOtro(): Promise<void> {
    await this.enviarButton.click();
    await this.page.waitForTimeout(10000);
  }

  async fillCodigoOtro(codigo: string): Promise<void> {
    await this.codigoEmailInput.fill(codigo);
    await this.continuarButton.click();
    await this.page.waitForTimeout(3000);
  }

  async fillTelefonoInvalido(): Promise<void> {
    const telefonoInput = this.page.getByRole("textbox", {
      name: "Télefono o Celular: *",
    });
    await telefonoInput.clear();
    // Use an invalid phone number (too short, letters, etc.)
    await telefonoInput.fill("abc");
  }

  async expectGraciasMessage(): Promise<void> {
    await expect(this.page.getByText("¡Muchas gracias por tu reclamo!")).toBeVisible();
  }
}

export { BASE_URL };
