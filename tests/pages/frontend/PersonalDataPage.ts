import { Page, Locator, expect } from "@playwright/test";

export class PersonalDataPage {
  readonly page: Page;
  
  // Tracking section
  readonly emailInput: Locator;
  readonly telefonoInput: Locator;
  readonly buscarButton: Locator;
  readonly notFoundError: Locator;
  readonly claimsListContainer: Locator;
  
  // Personal data step 1
  readonly nombreInput: Locator;
  readonly apellidoInput: Locator;
  readonly emailPaso1Input: Locator;
  readonly telefonoPaso1Input: Locator;
  readonly tipoDocumentoSelect: Locator;
  readonly paisSelect: Locator;
  readonly continuarButton: Locator;
  readonly alertMessage: Locator;
  
  // Personal data step 2
  readonly metodoPreferidoSelect: Locator;
  readonly terminosCheckbox: Locator;
  
  // Problem description
  readonly descripcionTextarea: Locator;
  readonly montoInput: Locator;
  
  // Confirmation
  readonly claimNumber: Locator;
  readonly claimStatus: Locator;
  readonly seguirLink: Locator;
  readonly nuevoReclamoButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Tracking
    this.emailInput = page.getByLabel(/email/i);
    this.telefonoInput = page.getByLabel(/teléfono/i);
    this.buscarButton = page.getByRole('button', { name: /buscar/i });
    this.notFoundError = page.getByText(/no encontrado/i);
    this.claimsListContainer = page.locator('[data-testid="claims-list"]');
    
    // Personal data step 1
    this.nombreInput = page.getByLabel(/nombre/i);
    this.apellidoInput = page.getByLabel(/apellido/i);
    this.emailPaso1Input = page.getByLabel(/email/i);
    this.telefonoPaso1Input = page.getByLabel(/teléfono/i);
    this.tipoDocumentoSelect = page.getByLabel(/tipo de documento/i);
    this.paisSelect = page.getByLabel(/país/i);
    this.continuarButton = page.getByRole('button', { name: /continuar/i });
    this.alertMessage = page.getByRole('alert');
    
    // Personal data step 2
    this.metodoPreferidoSelect = page.getByLabel(/método preferido/i);
    this.terminosCheckbox = page.getByLabel(/términos/i);
    
    // Problem description
    this.descripcionTextarea = page.getByLabel(/descripción/i);
    this.montoInput = page.getByLabel(/monto/i);
    
    // Confirmation
    this.claimNumber = page.locator('[data-testid="claim-number"]');
    this.claimStatus = page.locator('[data-testid="claim-status"]');
    this.seguirLink = page.getByRole('link', { name: /seguir|track/i });
    this.nuevoReclamoButton = page.getByRole('button', { name: /nuevo reclamo/i });
  }

  // Tracking methods
  async gotoTracking(): Promise<void> {
    await this.page.goto('/mis-reclamos/ingresar');
    await expect(this.page).toHaveURL(/.*mis-reclamos\/ingresar/);
  }

  async searchByEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.buscarButton.click();
    await expect(this.page).toHaveURL(/.*mis-reclamos\/buscar/);
  }

  async searchByPhone(phone: string): Promise<void> {
    await this.telefonoInput.fill(phone);
    await this.buscarButton.click();
    await expect(this.page).toHaveURL(/.*mis-reclamos\/buscar/);
  }

  async expectNotFound(): Promise<void> {
    await expect(this.notFoundError).toBeVisible();
  }

  async expectClaimsListVisible(): Promise<void> {
    await expect(this.claimsListContainer).toBeVisible();
  }

  // Personal data step 1 methods
  async gotoDatosPaso1(): Promise<void> {
    await this.page.goto('/datos-personales/paso-1');
    await expect(this.page).toHaveURL(/.*datos-personales\/paso-1/);
  }

  async fillNombre(nombre: string): Promise<void> {
    await this.nombreInput.fill(nombre);
    await expect(this.nombreInput).toHaveValue(nombre);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailPaso1Input.fill(email);
    await expect(this.emailPaso1Input).toHaveValue(email);
  }

  async fillTelefono(telefono: string): Promise<void> {
    await this.telefonoPaso1Input.fill(telefono);
    await expect(this.telefonoPaso1Input).toHaveValue(telefono);
  }

  async selectTipoDocumento(tipo: string): Promise<void> {
    await this.tipoDocumentoSelect.selectOption(tipo);
    await expect(this.tipoDocumentoSelect).toHaveValue(tipo);
  }

  async selectPais(pais: string): Promise<void> {
    await this.paisSelect.selectOption(pais);
    await expect(this.paisSelect).toHaveValue(pais);
  }

  async clickContinuar(): Promise<void> {
    await this.continuarButton.click();
  }

  async expectAlertVisible(): Promise<void> {
    await expect(this.alertMessage).toBeVisible();
  }

  async expectContinuarDisabled(): Promise<void> {
    await expect(this.continuarButton).toBeDisabled();
  }

  // Personal data step 2 methods
  async gotoDatosPaso2(): Promise<void> {
    await this.page.goto('/datos-personales/paso-2');
    await expect(this.page).toHaveURL(/.*datos-personales\/paso-2/);
  }

  async selectMetodoPreferido(metodo: string): Promise<void> {
    await this.metodoPreferidoSelect.selectOption(metodo);
  }

  async checkTerminos(): Promise<void> {
    await this.terminosCheckbox.check();
    await expect(this.terminosCheckbox).toBeChecked();
  }

  // Problem description methods
  async gotoProblemaPaso1(): Promise<void> {
    await this.page.goto('/contanos-tu-problema/paso-1');
    await expect(this.page).toHaveURL(/.*contanos-tu-problema\/paso-1/);
  }

  async fillDescripcion(descripcion: string): Promise<void> {
    await this.descripcionTextarea.fill(descripcion);
    await expect(this.descripcionTextarea).toHaveValue(descripcion);
  }

  async fillMonto(monto: string): Promise<void> {
    await this.montoInput.fill(monto);
    await expect(this.montoInput).toHaveValue(monto);
  }

  // Confirmation methods
  async gotoConfirmation(): Promise<void> {
    await this.page.goto('/confirmation');
    await expect(this.page).toHaveURL(/.*confirmation/);
  }

  async expectClaimNumberVisible(): Promise<void> {
    await expect(this.claimNumber).toBeVisible();
  }

  async expectClaimStatusVisible(): Promise<void> {
    await expect(this.claimStatus).toBeVisible();
  }

  async expectSeguimientoVisible(): Promise<void> {
    await expect(this.seguirLink).toBeVisible();
  }

  async clickNuevoReclamo(): Promise<void> {
    await this.nuevoReclamoButton.click();
    await expect(this.page).toHaveURL(/.*\/$/);
  }
}
