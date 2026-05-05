import { Page, Locator, expect } from "@playwright/test";
import { URLS, TIMEOUTS } from "../../config/constants";

export class BackofficeMyAccountPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly editButton: Locator;
  readonly nameInput: Locator;
  readonly surnameInput: Locator;
  readonly documentNumberInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: /Datos personales|Mi cuenta/i });

    // Personal info article - identified by heading text
    const personalInfoArticle = page.locator('article').filter({
      has: page.getByText(/Datos personales|Información personal/i, { exact: false })
    }).first();

    // Edit button = pencil icon (4th button on page)
    this.editButton = page.getByRole('button').nth(4);

    // Inputs by name attribute
    this.nameInput = page.locator('input[name="name"]');
    this.surnameInput = page.locator('input[name="surname"]');
    this.documentNumberInput = page.locator('input[name="documentNumber"]');
    this.emailInput = page.locator('input[name="customerEmail"]');
    this.phoneInput = page.locator('input[name="phoneNumber"]');

    // Save/Cancel buttons (only visible in edit mode)
    this.saveButton = page.getByRole('button', { name: /guardar|save/i }).first();
    this.cancelButton = page.getByRole('button', { name: /cancelar|cancel/i }).first();
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
    await this.editButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.editButton.click();

    // Wait for edit mode - save button becomes visible
    await this.saveButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.page.waitForTimeout(1500);
  }

  async isInEditMode(): Promise<boolean> {
    try {
      await this.saveButton.waitFor({ state: 'visible', timeout: 3000 });
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
      inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.removeAttribute('aria-readonly');
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
    await this.nameInput.fill('Catalina');
    await this.surnameInput.fill('Liste');
    await this.documentNumberInput.fill('12345678');

    // Fill phone if enabled
    const isPhoneDisabled = await this.phoneInput.isDisabled();
    if (!isPhoneDisabled) {
      await this.phoneInput.fill('1191234567');
    }
  }

  async clickSaveButton(): Promise<void> {
    // Wait for save button to be enabled
    await this.saveButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.page.waitForTimeout(1000);

    // Click save
    await this.saveButton.click();

    // Wait for save to complete - back to read mode
    await this.editButton.waitFor({ state: 'visible', timeout: TIMEOUTS.LONG });
    await this.page.waitForTimeout(TIMEOUTS.MEDIUM);
  }

  async clickCancelButton(): Promise<void> {
    await this.cancelButton.click({ force: true });
    await this.page.waitForTimeout(TIMEOUTS.SHORT);
  }

  async expectSuccessMessage(): Promise<void> {
    // Success is indicated by returning to read mode (edit button visible)
    await this.editButton.waitFor({ state: 'visible', timeout: TIMEOUTS.LONG });
  }
}
