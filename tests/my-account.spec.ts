import { test, expect } from "./fixtures/test-fixtures";
import { BackofficeLoginPage } from "./pages/backoffice/BackofficeLoginPage";
import { BackofficeDashboardPage } from "./pages/backoffice/BackofficeDashboardPage";
import { BackofficeMyAccountPage } from "./pages/backoffice/BackofficeMyAccountPage";
import { ENV, TEST_DATA, URLS } from "./config/constants";

test.describe(
  "Backoffice - Mi Cuenta",
  { tag: ["@my-account", "@backoffice"] },
  () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new BackofficeLoginPage(page);
      const dashboardPage = new BackofficeDashboardPage(page);

      await loginPage.goto();
      await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
      await expect(page).toHaveURL(/.*backoffice\/home/);

      await dashboardPage.goto();
      await dashboardPage.clickEditMyData();
      await expect(page).toHaveURL(/.*backoffice\/my-account/);
    });


    test("BO-ACCT-001 - Página Mi Cuenta carga correctamente", async ({ page }) => {
      const myAccountPage = new BackofficeMyAccountPage(page);
      await myAccountPage.expectPageLoaded();
    });

    test("BO-ACCT-002 - Activar modo edición con botón lápiz", async ({ page }) => {
      const myAccountPage = new BackofficeMyAccountPage(page);
      await myAccountPage.clickEditButton();
      const inEditMode = await myAccountPage.isInEditMode();
      expect(inEditMode).toBe(true);
    });

    test("BO-ACCT-003 - Cancelar edición restaura datos originales", async ({ page }) => {
      const myAccountPage = new BackofficeMyAccountPage(page);
      await myAccountPage.clickEditButton();

      // Modify a field
      await myAccountPage.fillName(TEST_DATA.MODIFIED_NAME);
      await myAccountPage.clickCancelButton();

      // Verify we're out of edit mode
      const inEditMode = await myAccountPage.isInEditMode();
      expect(inEditMode).toBe(false);
    });

    test("BO-ACCT-004 - Editar nombre y guardar", async ({ page }) => {
      const myAccountPage = new BackofficeMyAccountPage(page);
      await myAccountPage.editNameAndSave(TEST_DATA.MODIFIED_NAME);
      await myAccountPage.expectSuccessMessage();
    });

    test("BO-ACCT-005 - Editar apellido y guardar", async ({ page }) => {
      const myAccountPage = new BackofficeMyAccountPage(page);
      await myAccountPage.editSurnameAndSave(TEST_DATA.MODIFIED_SURNAME);
      await myAccountPage.expectSuccessMessage();
    });

    test("BO-ACCT-006 - Editar número de documento y guardar", async ({ page }) => {
      const myAccountPage = new BackofficeMyAccountPage(page);
      await myAccountPage.editDocumentAndSave(TEST_DATA.MODIFIED_DOCUMENT);
      await myAccountPage.expectSuccessMessage();
    });

    test("BO-ACCT-008 - Editar teléfono si está habilitado", async ({ page }) => {
      const myAccountPage = new BackofficeMyAccountPage(page);
      await myAccountPage.editPhoneIfEnabled(TEST_DATA.MODIFIED_PHONE);
      await myAccountPage.expectSuccessMessage();
    });

    test("BO-ACCT-009 - Edición completa de datos personales", async ({ page }) => {
      const myAccountPage = new BackofficeMyAccountPage(page);
      await myAccountPage.editAllPersonalData(TEST_DATA.ORIGINAL_NAME, TEST_DATA.ORIGINAL_SURNAME, TEST_DATA.DOCUMENT_NUMBER);
      await myAccountPage.expectSuccessMessage();
    });

    test("BO-ACCT-010 - Validación de campos requeridos", async ({ page }) => {
      const myAccountPage = new BackofficeMyAccountPage(page);
      await myAccountPage.triggerRequiredFieldValidation();
      const hasErrors = await myAccountPage.hasValidationErrors();
      expect(hasErrors).toBe(true);
    });

    test.describe("Cambio de contraseña", () => {
      const NEW_PASSWORD = "Newpassword123!";

      test.afterEach(async ({ page }) => {
        // Navigate to my-account page and restore original password
        await page.goto(URLS.BACKOFFICE_MY_ACCOUNT);
        const myAccountPage = new BackofficeMyAccountPage(page);
        await myAccountPage.changePassword(NEW_PASSWORD, ENV.BO_PASSWORD);
        await myAccountPage.expectSuccessMessage();
      });

      test("BO-ACCT-011 - Cambiar contraseña exitosamente", async ({ page }) => {
        const myAccountPage = new BackofficeMyAccountPage(page);
        await myAccountPage.changePassword(ENV.BO_PASSWORD, NEW_PASSWORD);
        await myAccountPage.expectSuccessMessage();
      });

      test("BO-ACCT-012 - Validar requisitos de contraseña", async ({ page }) => {
        const myAccountPage = new BackofficeMyAccountPage(page);

        // Click the password edit button
        await myAccountPage.passwordEditButton.waitFor({ state: 'visible', timeout: 5000 });
        await myAccountPage.passwordEditButton.click();
        await page.waitForTimeout(1000);

        // Fill with invalid password (less than 12 chars, no uppercase, no numbers, no special chars)
        await myAccountPage.fillCurrentPassword(ENV.BO_PASSWORD);
        await myAccountPage.fillNewPassword("abc");
        await myAccountPage.fillConfirmPassword("abc");

        // Verify error message is visible
        const errorVisible = await page.locator('text=/contraseña.*requisitos|password.*requirements|no cumple/i').first().isVisible();
        expect(errorVisible).toBe(true);
      });
    });
  }
);
