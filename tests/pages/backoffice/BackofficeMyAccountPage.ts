import { Page, Locator, expect } from "@playwright/test";
import { URLS, TIMEOUTS } from "../../config/constants";

export class BackofficeMyAccountPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly editButton: Locator;
  readonly passwordEditButton: Locator;
  readonly nameInput: Locator;
  readonly surnameInput: Locator;
  readonly documentNumberInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      name: /Datos personales|Mi cuenta/i,
    });

    // Personal info article - identified by heading text
    const personalInfoArticle = page
      .locator("article")
      .filter({
        has: page.getByText(/Datos personales|Información personal/i, {
          exact: false,
        }),
      })
      .first();

    // Edit button = pencil icon (4th button on page)
    this.editButton = page.getByRole("button").nth(4);
    this.passwordEditButton = page
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .nth(2);

    // Inputs by name attribute
    this.nameInput = page.locator('input[name="name"]');
    this.surnameInput = page.locator('input[name="surname"]');
    this.documentNumberInput = page.locator('input[name="documentNumber"]');
    this.emailInput = page.locator('input[name="customerEmail"]');
    this.phoneInput = page.locator('input[name="phoneNumber"]');

    // Password fields
    this.currentPasswordInput = page.getByRole('textbox', { name: 'Contraseña actual:*' });
    this.newPasswordInput = page.getByRole('textbox', { name: 'Nueva contraseña:*', exact: true });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Repetir nueva contraseña:*' });

    // Save/Cancel buttons (only visible in edit mode)
    this.saveButton = page
      .getByRole("button", { name: /guardar|save/i })
      .first();
    this.cancelButton = page
      .getByRole("button", { name: /cancelar|cancel/i })
      .first();
  }

  async goto(): Promise<void> {
    await this.page.goto(URLS.BACKOFFICE_MY_ACCOUNT);
    await this.page.waitForTimeout(TIMEOUTS.SHORT);
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout: TIMEOUTS.LONG });
  }

  async clickEditButton(): Promise<void> {
    // In read mode, the pencil button should be visible
    await this.editButton.waitFor({
      state: "visible",
      timeout: TIMEOUTS.MEDIUM,
    });
    await this.editButton.click();

    // Wait for edit mode - save button becomes visible
    await this.saveButton.waitFor({
      state: "visible",
      timeout: TIMEOUTS.MEDIUM,
    });
    await this.page.waitForTimeout(1500);
  }

  async isInEditMode(): Promise<boolean> {
    try {
      await this.saveButton.waitFor({ state: "visible", timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async ensureReadMode(): Promise<void> {
    const inEdit = await this.isInEditMode();
    if (inEdit) {
      await this.clickCancelButton();
    }
  }

  private async removeReadonly(selector: string): Promise<void> {
    await this.page.evaluate((sel) => {
      const inputs = document.querySelectorAll(sel);
      inputs.forEach((input) => {
        input.removeAttribute("readonly");
        input.removeAttribute("aria-readonly");
        (input as HTMLInputElement).readOnly = false;
      });
    }, selector);
  }

  async fillName(name: string): Promise<void> {
    await this.removeReadonly('input[name="name"]');
    await this.nameInput.clear();
    await this.nameInput.fill(name);
  }

  async fillSurname(surname: string): Promise<void> {
    await this.removeReadonly('input[name="surname"]');
    await this.surnameInput.clear();
    await this.surnameInput.fill(surname);
  }

  async fillDocumentNumber(number: string): Promise<void> {
    await this.removeReadonly('input[name="documentNumber"]');
    await this.documentNumberInput.clear();
    await this.documentNumberInput.fill(number);
  }

  async fillEmail(email: string): Promise<void> {
    const isDisabled = await this.emailInput.isDisabled();
    if (!isDisabled) {
      await this.removeReadonly('input[name="customerEmail"]');
      await this.emailInput.clear();
      await this.emailInput.fill(email);
    }
  }

  async fillPhoneNumber(phone: string): Promise<void> {
    const isDisabled = await this.phoneInput.isDisabled();
    if (!isDisabled) {
      await this.removeReadonly('input[name="phoneNumber"]');
      await this.phoneInput.clear();
      await this.phoneInput.fill(phone);
    }
  }

  async fillAllRequiredFields(): Promise<void> {
    // Remove readonly from all fields
    await this.removeReadonly('input[name="name"]');
    await this.removeReadonly('input[name="surname"]');
    await this.removeReadonly('input[name="documentNumber"]');
    await this.removeReadonly('input[name="phoneNumber"]');

    // Fill required fields
    await this.nameInput.fill("Catalina");
    await this.surnameInput.fill("Liste");
    await this.documentNumberInput.fill("12345678");

    // Fill phone if enabled
    const isPhoneDisabled = await this.phoneInput.isDisabled();
    if (!isPhoneDisabled) {
      await this.phoneInput.fill("1191234567");
    }
  }

  async clickSaveButton(): Promise<void> {
    // Wait for save button to be enabled
    await this.saveButton.waitFor({
      state: "visible",
      timeout: TIMEOUTS.MEDIUM,
    });
    await this.page.waitForTimeout(1000);

    // Click save
    await this.saveButton.click();

    // Wait for save to complete - back to read mode
    await this.editButton.waitFor({ state: "visible", timeout: TIMEOUTS.LONG });
    await this.page.waitForTimeout(TIMEOUTS.MEDIUM);
  }

  async editNameAndSave(name: string): Promise<void> {
    await this.clickEditButton();
    await this.fillName(name);
    await this.clickSaveButton();
  }

  async editSurnameAndSave(surname: string): Promise<void> {
    await this.clickEditButton();
    await this.fillSurname(surname);
    await this.clickSaveButton();
  }

  async editDocumentAndSave(document: string): Promise<void> {
    await this.clickEditButton();
    await this.fillDocumentNumber(document);
    await this.clickSaveButton();
  }

  async editEmailIfEnabled(email: string): Promise<void> {
    await this.clickEditButton();
    const isEmailDisabled = await this.emailInput.isDisabled();
    if (!isEmailDisabled) {
      await this.fillEmail(email);
      await this.clickSaveButton();
    }
  }

  async editPhoneIfEnabled(phone: string): Promise<void> {
    await this.clickEditButton();
    const isPhoneDisabled = await this.phoneInput.isDisabled();
    if (!isPhoneDisabled) {
      await this.fillPhoneNumber(phone);
      await this.clickSaveButton();
    }
  }

  async editAllPersonalData(
    name: string,
    surname: string,
    document: string,
  ): Promise<void> {
    await this.clickEditButton();
    await this.fillName(name);
    await this.fillSurname(surname);
    await this.fillDocumentNumber(document);
    await this.clickSaveButton();
  }

  async triggerRequiredFieldValidation(): Promise<void> {
    await this.clickEditButton();
    await this.page.waitForTimeout(1000);

    // Clear name field
    await this.nameInput.click();
    await this.page.keyboard.press("Control+A");
    await this.page.keyboard.press("Backspace");
    await this.nameInput.blur();

    // Clear surname field
    await this.surnameInput.click();
    await this.page.keyboard.press("Control+A");
    await this.page.keyboard.press("Backspace");
    await this.surnameInput.blur();

    await this.page.waitForTimeout(1000);

    // Click save to trigger validation display
    //await this.saveButton.click();
    await this.page.waitForTimeout(2000);
  }

  async hasValidationErrors(): Promise<boolean> {
    const errorVisible = await this.page
      .locator("text=/requerido|required|ingresá|obligatorio/i")
      .first()
      .isVisible();
    return errorVisible;
  }

  async clickCancelButton(): Promise<void> {
    await this.cancelButton.click({ force: true });
    await this.page.waitForTimeout(TIMEOUTS.SHORT);
  }

  async expectSuccessMessage(): Promise<void> {
    // Success is indicated by returning to read mode (edit button visible)
    await this.editButton.waitFor({ state: "visible", timeout: TIMEOUTS.LONG });
  }

  async fillCurrentPassword(password: string): Promise<void> {
    await this.currentPasswordInput.fill(password);
  }

  async fillNewPassword(password: string): Promise<void> {
    await this.newPasswordInput.fill(password);
  }

  async fillConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    // Click the password edit button first
    await this.passwordEditButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.passwordEditButton.click();
    await this.page.waitForTimeout(1000);

    // Fill the 3 password fields
    await this.fillCurrentPassword(currentPassword);
    await this.fillNewPassword(newPassword);
    await this.fillConfirmPassword(newPassword);
    await this.clickSaveButton();
  }
}
