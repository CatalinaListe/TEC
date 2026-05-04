import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly navigation: Locator;
  readonly iniciarReclamoButton: Locator;
  readonly servicesSection: Locator;
  readonly testimonialsSection: Locator;
  readonly newsletterEmailInput: Locator;
  readonly subscribeButton: Locator;
  readonly videoPlayer: Locator;
  readonly footer: Locator;
  readonly cookieBanner: Locator;
  readonly acceptCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('a[href="/"]').first();
    this.navigation = page.getByRole('navigation').first();
    this.iniciarReclamoButton = page.getByRole('button', { name: /reclamo|claim/i }).first();
    this.servicesSection = page.locator('section').filter({ hasText: /servicio/i }).first();
    this.testimonialsSection = page.locator('section').filter({ hasText: /testimonio/i }).first();
    this.newsletterEmailInput = page.getByPlaceholder(/email|newsletter/i).first();
    this.subscribeButton = page.getByRole('button', { name: /suscribir|subscribe/i }).first();
    this.videoPlayer = page.locator('video').first();
    this.footer = page.locator('footer').first();
    this.cookieBanner = page.locator('[class*="cookie"], [id*="cookie"], [class*=" Cookie"]').first();
    this.acceptCookiesButton = page.getByRole('button', { name: /aceptar|accept|ok|entendido/i }).first();
  }

  async goto() {
    await this.page.goto('/');
    await this.acceptCookies();
  }

  async acceptCookies() {
    try {
      if (await this.cookieBanner.isVisible({ timeout: 3000 })) {
        await this.acceptCookiesButton.click();
      }
    } catch {}
  }

  async clickIniciarReclamo() {
    await this.iniciarReclamoButton.click();
  }

  async subscribeNewsletter(email: string) {
    await this.newsletterEmailInput.fill(email);
    await this.subscribeButton.click();
  }

  async expectSuccessMessage() {
    await expect(this.page.getByText(/éxito|confirmado|suscrito|gracias/i)).toBeVisible();
  }

  async expectErrorMessage() {
    await expect(this.page.getByRole('alert')).toBeVisible();
  }
}