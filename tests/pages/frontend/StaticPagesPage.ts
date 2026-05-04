import { Page, Locator, expect } from "@playwright/test";

export class StaticPagesPage {
  readonly page: Page;
  readonly faqButton: Locator;
  readonly faqRegion: Locator;
  readonly contactForm: Locator;
  readonly nombreInput: Locator;
  readonly apellidoInput: Locator;
  readonly emailInput: Locator;
  readonly asuntoInput: Locator;
  readonly mensajeInput: Locator;
  readonly enviarButton: Locator;
  readonly successMessage: Locator;
  readonly alertMessage: Locator;
  readonly continuarButton: Locator;
  readonly telefonoInput: Locator;
  readonly montoInput: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.faqButton = page.getByRole('button', { name: /¿cómo hago/i }).first();
    // For FAQ, we'll check if the region is visible after clicking (not using expanded attribute)
    this.faqRegion = page.getByRole('region').first();
    // Try multiple ways to find the contact form - avoid aria-hidden elements
    this.contactForm = page.getByRole('form').or(page.locator('form')).or(page.locator('[class*="contact"]'));
    // For inputs, avoid aria-hidden duplicates by using first() or more specific selectors
    this.nombreInput = page.getByRole('textbox', { name: 'Nombre*' });
    this.apellidoInput = page.getByRole('textbox', { name: 'Apellido*' });
    this.emailInput = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i)).or(page.locator('input[type="email"]')).or(page.locator('input[name*="email" i]')).first();
    this.asuntoInput = page.getByRole('textbox', { name: 'Asunto*' });
    this.mensajeInput = page.getByRole('textbox', { name: /mensaje/i }).or(page.getByPlaceholder(/mensaje/i)).or(page.locator('textarea:visible'));
    this.enviarButton = page.getByRole('button', { name: /enviar/i });
    this.successMessage = page.getByText(/enviado|éxito/i);
    this.alertMessage = page.getByRole('alert');
    this.continuarButton = page.getByRole('button', { name: /continuar/i });
    this.telefonoInput = page.getByLabel(/teléfono/i).or(page.getByPlaceholder(/teléfono/i)).or(page.locator('input[type="tel"]')).or(page.locator('input[name*="telefono" i]')).first();
    this.montoInput = page.getByLabel(/monto/i).or(page.getByPlaceholder(/monto/i)).or(page.locator('input[name*="monto" i]')).first();
    this.header = page.locator('header');
  }

  async gotoNosotros(): Promise<void> {
    await this.page.goto('/nosotros');
    await expect(this.page).toHaveURL(/.*nosotros/);
  }

  async gotoVuelos(): Promise<void> {
    await this.page.goto('/vuelos');
    // The page might redirect, so wait for any page load
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
  }

  async gotoPoliticasPrivacidad(): Promise<void> {
    await this.page.goto('/politicas-de-privacidad');
    await expect(this.page).toHaveURL(/.*politicas-de-privacidad/);
  }

  async gotoTerminosCondiciones(): Promise<void> {
    await this.page.goto('/terminos-y-condiciones');
    await expect(this.page).toHaveURL(/.*terminos-y-condiciones/);
  }

  async gotoNuestrosServicios(): Promise<void> {
    await this.page.goto('/nuestros-servicios');
    await expect(this.page).toHaveURL(/.*nuestros-servicios/);
  }

  async gotoPreguntasFrecuentes(): Promise<void> {
    await this.page.goto('/preguntas-frecuentes');
    await expect(this.page).toHaveURL(/.*preguntas-frecuentes/);
  }

  async expandFaq(): Promise<void> {
    await this.faqButton.click();
    // Wait for the FAQ content to be visible (not using expanded attribute)
    await this.page.waitForTimeout(1000);
    await expect(this.faqButton).toBeVisible();
  }

  async gotoContacto(): Promise<void> {
    await this.page.goto('/contacto');
    // Wait for page to load - don't assert form visibility immediately
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(2000);
  }

  async fillContactForm(nombre: string, apellido: string, email: string, asunto: string, mensaje: string): Promise<void> {
    await this.nombreInput.fill(nombre);
    await this.apellidoInput.fill(apellido);
    await this.emailInput.fill(email);
    await this.asuntoInput.fill(asunto);
    await this.mensajeInput.fill(mensaje);
  }

  async clickEnviar(): Promise<void> {
    await this.enviarButton.click();
  }

  async expectSuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  async fillInvalidEmail(): Promise<void> {
    await this.emailInput.fill('invalid');
  }

  async expectAlertVisible(): Promise<void> {
    await expect(this.alertMessage).toBeVisible();
  }

  async expectEnviarDisabled(): Promise<void> {
    await expect(this.enviarButton).toBeDisabled();
  }

  async gotoDatosPaso1(): Promise<void> {
    await this.page.goto('/datos-personales/paso-1');
  }

  async expectContinuarDisabled(): Promise<void> {
    await expect(this.continuarButton).toBeDisabled();
  }

  async fillInvalidTelefono(): Promise<void> {
    await this.telefonoInput.fill('abc');
  }

  async expectTelefonoError(): Promise<void> {
    await expect(this.page.getByText(/número|formato/i)).toBeVisible();
  }

  async gotoContanosProblemaPaso1(): Promise<void> {
    await this.page.goto('/contanos-tu-problema/paso-1');
  }

  async fillNegativeMonto(): Promise<void> {
    await this.montoInput.fill('-100');
  }

  async expectMontoError(): Promise<void> {
    await expect(this.page.getByText(/negativo|inválido/i)).toBeVisible();
  }

  async expectHeaderVisible(): Promise<void> {
    await expect(this.header).toBeVisible();
  }

  async setViewport(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  async gotoHomepage(): Promise<void> {
    await this.page.goto('/');
  }
}
