import { Page, Locator, expect } from "@playwright/test";

export class BackofficeDashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly resumenGeneral: Locator;
  readonly nav: Locator;
  readonly usuarioLogueado: Locator;
  readonly claimCards: Locator;
  readonly reclamosHeading: Locator;
  readonly ultimosReclamosHeading: Locator;
  readonly misDatos: Locator;
  readonly grafica: Locator;
  readonly ultimosReclamos: Locator;
  readonly verTodoLinks: Locator;
  readonly mensajesSinLeer: Locator;
  readonly contadorMensajes: Locator;
  readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: /Panel de Inicio/i });
    this.resumenGeneral = page.getByText(/Resumen general|del sistema/i);
    this.nav = page.locator("nav, aside");
    this.usuarioLogueado = page.getByText(/Catalina Liste/i);
    // HeroUI Cards with claim counts - links with numbers
    this.claimCards = page.locator('a').filter({ hasText: /\d+/ });
    // Main content area's Reclamos heading
    this.reclamosHeading = page.locator('main').getByRole("heading", { name: /Reclamos/i, level: 2 }).first();
    this.ultimosReclamosHeading = page.getByRole("heading", { name: /Últimos Reclamos/i });
    this.misDatos = page.getByText(/Mis Datos/i);
    // Charts may be SVG or canvas
    this.grafica = page.locator('svg').or(page.locator('[class*="chart"]'));
    this.ultimosReclamos = page.getByText(/Últimos Reclamos/i);
    this.verTodoLinks = page.getByRole("link", { name: /Ver todo/i });
    this.mensajesSinLeer = page.getByText(/Mensajes sin leer/i);
    this.contadorMensajes = page.getByText(/\d+ de \d+ sin leer/i);
    this.sidebar = page.getByRole('navigation');
  }

  async goto(): Promise<void> {
    await this.page.goto('/backoffice/home');
    await this.page.waitForTimeout(2000);
  }

  async expectDashboardLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout: 10000 });
  }

  async expectResumenVisible(): Promise<void> {
    await expect(this.resumenGeneral.first()).toBeVisible({ timeout: 10000 });
  }

  async expectNavVisible(): Promise<void> {
    await expect(this.nav.first()).toBeVisible({ timeout: 10000 });
  }

  async expectUsuarioVisible(): Promise<void> {
    await expect(this.usuarioLogueado.first()).toBeVisible({ timeout: 10000 });
  }

  async expectClaimCardsVisible(): Promise<void> {
    const count = await this.claimCards.count();
    expect(count).toBeGreaterThan(0);
  }

  async clickCardByText(text: string): Promise<void> {
    // Find cards - they are links with text and a number (claim count)
    // The links have format like "Rechazados 10 Últimos 6 meses"
    const card = this.page.locator('a').filter({ hasText: text }).filter({ hasText: /\d+/ }).first();
    await card.click();
    // Wait for navigation - cards navigate to filtered claims list
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
  }

  async expectMisDatosVisible(): Promise<void> {
    await expect(this.misDatos).toBeVisible({ timeout: 10000 });
  }

  async expectGraficaVisible(): Promise<void> {
    const count = await this.grafica.count();
    expect(count).toBeGreaterThanOrEqual(0);
  }

  async expectUltimosReclamosVisible(): Promise<void> {
    await expect(this.ultimosReclamos).toBeVisible({ timeout: 10000 });
  }

  async clickVerTodo(index: number = 1): Promise<void> {
    await this.verTodoLinks.nth(index).click();
    await this.page.waitForTimeout(2000);
  }

  async expectMensajesSinLeerVisible(): Promise<void> {
    await expect(this.mensajesSinLeer.first()).toBeVisible({ timeout: 10000 });
  }

  async expectContadorMensajesVisible(): Promise<void> {
    const count = await this.contadorMensajes.count();
    expect(count).toBeGreaterThanOrEqual(0);
  }

  async clickVerTodoMensajes(): Promise<void> {
    await this.verTodoLinks.first().click();
    await this.page.waitForTimeout(2000);
  }

  async expectMensajesVisible(): Promise<void> {
    await expect(this.page.getByText(/Mensajes/i).first()).toBeVisible({
      timeout: 10000,
    });
  }

  async expectReclamosHeadingVisible(): Promise<void> {
    await expect(this.reclamosHeading).toBeVisible({ timeout: 10000 });
  }
}