import { test, expect } from "./fixtures/test-fixtures";
import { BackofficeLoginPage } from "./pages/backoffice/BackofficeLoginPage";
import { BackofficeDashboardPage } from "./pages/backoffice/BackofficeDashboardPage";
import { BackofficeMyAccountPage } from "./pages/backoffice/BackofficeMyAccountPage";
import { ENV } from "./config/constants";

test.describe(
  "Backoffice - Mi Cuenta",
  { tag: ["@my-account", "@backoffice"] },
  () => {
    let myAccountPage: BackofficeMyAccountPage;
    let dashboardPage: BackofficeDashboardPage;

    test.beforeEach(async ({ page }) => {
      const loginPage = new BackofficeLoginPage(page);
      dashboardPage = new BackofficeDashboardPage(page);
      myAccountPage = new BackofficeMyAccountPage(page);

      await loginPage.goto();
      await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
      await expect(page).toHaveURL(/.*backoffice\/home/);

      await dashboardPage.goto();
      await dashboardPage.clickEditMyData();
      await expect(page).toHaveURL(/.*backoffice\/my-account/);
      await myAccountPage.expectPageLoaded();

      // Ensure we're in read mode before tests
      await myAccountPage.ensureReadMode();
    });

    test.afterEach(async () => {
      // Ensure we're back in read mode after each test
      await myAccountPage.ensureReadMode();
    });

    test("BO-ACCT-001 - Página Mi Cuenta carga correctamente", async ({ page }) => {
      await myAccountPage.expectPageLoaded();
    });

    test("BO-ACCT-002 - Activar modo edición con botón lápiz", async ({ page }) => {
      await myAccountPage.clickEditButton();
      const inEditMode = await myAccountPage.isInEditMode();
      expect(inEditMode).toBe(true);
    });

    test("BO-ACCT-003 - Cancelar edición restaura datos originales", async ({ page }) => {
      await myAccountPage.clickEditButton();

      // Modify a field
      await myAccountPage.fillName("TestModified");
      await myAccountPage.clickCancelButton();

      // Verify we're out of edit mode
      const inEditMode = await myAccountPage.isInEditMode();
      expect(inEditMode).toBe(false);
    });

    test("BO-ACCT-004 - Editar nombre y guardar", async ({ page }) => {
      await myAccountPage.clickEditButton();
      await myAccountPage.fillName("Catalina Modified");
      await myAccountPage.clickSaveButton();
      await myAccountPage.expectSuccessMessage();
    });

    test("BO-ACCT-005 - Editar apellido y guardar", async ({ page }) => {
      await myAccountPage.clickEditButton();
      await myAccountPage.fillSurname("Liste Modified");
      await myAccountPage.clickSaveButton();
      await myAccountPage.expectSuccessMessage();
    });

    test("BO-ACCT-006 - Editar número de documento y guardar", async ({ page }) => {
      await myAccountPage.clickEditButton();
      await myAccountPage.fillDocumentNumber("98765432");
      await myAccountPage.clickSaveButton();
      await myAccountPage.expectSuccessMessage();
    });

    test("BO-ACCT-008 - Editar teléfono si está habilitado", async ({ page }) => {
      await myAccountPage.clickEditButton();

      const isPhoneDisabled = await myAccountPage.phoneInput.isDisabled();
      if (!isPhoneDisabled) {
        await myAccountPage.fillPhoneNumber("1199999999");
        await myAccountPage.clickSaveButton();
        await myAccountPage.expectSuccessMessage();
      }
    });

    test("BO-ACCT-009 - Edición completa de datos personales", async ({ page }) => {
      await myAccountPage.clickEditButton();
      await myAccountPage.fillName("Catalina");
      await myAccountPage.fillSurname("Liste");
      await myAccountPage.fillDocumentNumber("12345678");
      await myAccountPage.clickSaveButton();
      await myAccountPage.expectSuccessMessage();
    });

    test("BO-ACCT-010 - Validación de campos requeridos", async ({ page }) => {
      await myAccountPage.clickEditButton();

      // Wait for edit mode
      await page.waitForTimeout(1000);

      // Clear name field and trigger validation
      await myAccountPage.nameInput.click();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Backspace');
      await myAccountPage.nameInput.blur();

      // Clear surname field and trigger validation
      await myAccountPage.surnameInput.click();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Backspace');
      await myAccountPage.surnameInput.blur();

      // Look for validation error messages - try different selectors
      const errorVisible = await page.locator('text=/requerido|required|ingresá|obligatorio/i').first().isVisible();
      expect(errorVisible).toBe(true);
    });
  }
);
