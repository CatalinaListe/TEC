import { Page, Locator, expect } from "@playwright/test";
import { URLS } from "../../config/constants";

export class ClaimTrackingPage {
  readonly page: Page;
  readonly volverAlInicioButton: Locator;
  readonly seguirReclamoButton: Locator;
  readonly reclamosLink: Locator;
  readonly claimNumberInput: Locator;
  readonly buscarButton: Locator;
  readonly claimNotFoundError: Locator;
  readonly invalidNumberError: Locator;
  readonly claimNumberColumn: Locator;
  readonly claimsTableRows: Locator;
  readonly threeDotsButton: Locator;
  readonly verDetalleMenuItem: Locator;
  readonly detallesDrawer: Locator;
  readonly closeDrawerButton: Locator;
  readonly estadoCell: Locator;
  readonly pagoColumn: Locator;
  readonly pagoCell: Locator;
  readonly datosPersonalesLink: Locator;
  readonly editarButton: Locator;
  readonly nombreInput: Locator;
  readonly apellidoInput: Locator;
  readonly telefonoInput: Locator;
  readonly guardarButton: Locator;
  readonly datosPersonalesHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.volverAlInicioButton = page.getByRole("button", { name: /Volver al inicio/i });
    this.seguirReclamoButton = page.getByRole("button", { name: "Seguir reclamo" });
    this.reclamosLink = page.getByRole("link", { name: "Reclamos" });
    this.claimNumberInput = page.getByRole("textbox", { name: "Número de reclamo" });
    this.buscarButton = page.getByRole("button", { name: "Buscar" });
    this.claimNotFoundError = page.getByText("No encontramos el reclamo N°");
    this.invalidNumberError = page.getByText("Ingresá un número de 1 a 10 dígitos.");
    this.claimNumberColumn = page.getByText("Nº Reclamo");
    this.claimsTableRows = page.locator("table tbody tr");
    this.threeDotsButton = page.locator("table tbody tr").first().locator("td").last().getByRole("button").first();
    this.verDetalleMenuItem = page.getByRole("menuitem", { name: /Ver detalle/i });
    this.detallesDrawer = page.getByText("Detalles");
    // Fix close button - use the "Cerrar" button text (Spanish for "Close")
    this.closeDrawerButton = page.getByRole("button", { name: "Cerrar" });
    this.estadoCell = page.locator("table tbody tr").first().locator("td").nth(3);
    this.pagoColumn = page.locator("th").getByText("Pago");
    this.pagoCell = page.locator("table tbody tr").first().locator("td").nth(4);
    this.datosPersonalesLink = page.getByRole("link", { name: "Datos personales" });
    this.editarButton = page.getByRole('button', { name: 'Editar' });
    this.nombreInput = page.getByRole('textbox', { name: 'Nombre: *' });
    this.apellidoInput = page.getByRole('textbox', { name: 'Apellido: *' });
    this.telefonoInput = page.getByRole('textbox', { name: 'Télefono o Celular: *' });
    this.guardarButton = page.getByRole('button', { name: 'Guardar' });
    this.datosPersonalesHeading = page.getByRole("heading", { name: "Datos personales" });
  }

  async gotoSearch(): Promise<void> {
    await this.page.goto(URLS.FRONTEND_SEARCH);
    await this.page.waitForTimeout(3000);
  }

  async gotoListado(): Promise<void> {
    await this.page.goto(URLS.FRONTEND_LIST);
    await this.page.waitForTimeout(3000);
  }

  async searchClaim(claimNumber: string): Promise<void> {
    await this.claimNumberInput.fill(claimNumber);
    await this.page.waitForTimeout(1000);
    await this.buscarButton.click();
    await this.page.waitForTimeout(3000);
  }

  async searchClaimInvalid(input: string): Promise<void> {
    await this.claimNumberInput.fill(input);
    await this.page.waitForTimeout(1000);
  }

  async expectClaimNotFound(claimNumber: string): Promise<void> {
    await expect(this.page.getByText(`No encontramos el reclamo N° ${claimNumber}`)).toBeVisible({ timeout: 10000 });
  }

  async expectInvalidNumberError(): Promise<void> {
    await expect(this.invalidNumberError).toBeVisible({ timeout: 10000 });
  }

  async expectClaimsListVisible(): Promise<void> {
    await expect(this.claimNumberColumn).toBeVisible();
    const rowCount = await this.claimsTableRows.count();
    expect(rowCount).toBeGreaterThan(0);
  }

  async clickThreeDotsMenu(): Promise<void> {
    await this.threeDotsButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickVerDetalle(): Promise<void> {
    await this.verDetalleMenuItem.click();
    await this.page.waitForTimeout(3000);
  }

  async expectDrawerVisible(): Promise<void> {
    await expect(this.detallesDrawer).toBeVisible({ timeout: 10000 });
  }

  async closeDrawer(): Promise<void> {
    await this.closeDrawerButton.click();
    await this.page.waitForTimeout(1000);
  }

  async expectDrawerNotVisible(): Promise<void> {
    await expect(this.detallesDrawer).not.toBeVisible({
      timeout: 5000,
    });
  }

  async expectEstadoVisible(): Promise<void> {
    const text = await this.estadoCell.textContent();
    expect(text && text.trim().length).toBeGreaterThan(0);
  }

  async expectPagoColumnVisible(): Promise<void> {
    await expect(this.pagoColumn).toBeVisible();
  }

  async expectPagoCellVisible(): Promise<void> {
    const text = await this.pagoCell.textContent();
    expect(text && text.trim().length).toBeGreaterThan(0);
  }

  async clickDatosPersonales(): Promise<void> {
    await this.datosPersonalesLink.click();
    await this.page.waitForTimeout(3000);
  }

  async clickEditar(): Promise<void> {
    await this.editarButton.click();
    await this.page.waitForTimeout(1000);
  }

  async editPersonalData(nombre: string, apellido: string, telefono: string): Promise<void> {
    await expect(this.nombreInput).toBeEditable();
    await this.nombreInput.fill(nombre);
    await expect(this.apellidoInput).toBeEditable();
    await this.apellidoInput.fill(apellido);
    await expect(this.telefonoInput).toBeEditable();
    await this.telefonoInput.fill(telefono);
    await this.guardarButton.click();
  }

  async expectEmptyMessage(): Promise<boolean> {
    return await this.page.getByText("No hay reclamos para mostrar.").isVisible().catch(() => false);
  }

  async expectGraciasMessage(): Promise<void> {
    await expect(this.page.getByText("¡Muchas gracias por tu reclamo!")).toBeVisible();
  }

  async clickReclamosLink(): Promise<void> {
    await this.page.getByRole("link", { name: "Reclamos" }).click();
  }
}
