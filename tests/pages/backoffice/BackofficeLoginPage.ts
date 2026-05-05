import { Page, Locator, expect } from "@playwright/test";
import { URLS } from "../../config/constants";

export class BackofficeLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("Correo electrónico");
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.forgotPasswordLink = page.getByText("¿Olvidaste tu contraseña?");
    this.errorMessage = page.getByRole("alert", {
      name: "El correo y la contraseña no",
    });
    this.loadingIndicator = page.locator(
      '.loading, [class*="loading"], .spinner',
    );
  }

  async goto() {
    await this.page.goto(URLS.BACKOFFICE_LOGIN);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    // Esperar a que el botón esté habilitado
    await this.submitButton.waitFor({ state: "visible", timeout: 5000 });

    // Hacer click y esperar o bien a home o a que aparezca un error
    await Promise.all([
      this.submitButton.click(),
      this.page
        .waitForFunction(
          () => {
            return (
              window.location.href.includes("/home") ||
              document.querySelector('[role="alert"]') !== null ||
              document.querySelector(".loading") !== null
            );
          },
          { timeout: 45000 },
        )
        .catch(() => {}),
    ]);
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  get alertMessage(): Locator {
    return this.page.getByRole("alert", { name: "El correo y la contraseña no" });
  }
}
