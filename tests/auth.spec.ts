import { test, expect } from "./fixtures/test-fixtures";
import { BackofficeLoginPage } from "./pages/backoffice/BackofficeLoginPage";
import { ENV } from "./config/constants";

test.describe(
  "Backoffice - Authentication",
  { tag: ["@auth", "@backoffice"] },
  () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new BackofficeLoginPage(page);
      await loginPage.goto();
    });

    test("BO-AUTH-001 - Login carga correctamente", async ({ page }) => {
      const loginPage = new BackofficeLoginPage(page);
      await loginPage.expectLoginFormVisible();
    });

    test("BO-AUTH-002 - Login exitoso redirige a home", async ({ page }) => {
      const loginPage = new BackofficeLoginPage(page);
      await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
      await expect(page).toHaveURL(/.*backoffice\/home/);
    });

    test("BO-AUTH-003 - Credenciales invalidas muestran error", async ({
      page,
    }) => {
      const loginPage = new BackofficeLoginPage(page);
      await loginPage.login("invalid@test.com", "wrongpass");
      await expect(loginPage.alertMessage).toBeVisible();
    });
  },
);
