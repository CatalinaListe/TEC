import { Page, Locator, expect } from "@playwright/test";

/**
 * Helper for temporary email services
 * Uses a more reliable approach with retry logic
 */
export class TempMailPage {
  private readonly _page: Page;
  private readonly maxRetries = 3;

  constructor(page: Page) {
    this._page = page;
  }

  private get page(): Page {
    return this._page;
  }

  get emailInput(): Locator {
    return this.page.getByRole("textbox", { name: "Sus emails temporales" });
  }

  get emailList(): Locator {
    return this.page.getByRole("listitem");
  }

  get emailContent(): Locator {
    return this.page.locator("td").getByText(/\d{2}/).first();
  }

  async goto(): Promise<void> {
    // Try temp-mail.io with retry logic
    let lastError: Error | null = null;
    
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        await this.page.goto("https://temp-mail.io/es/10minutemail", { 
          timeout: 30000,
          waitUntil: 'domcontentloaded'
        });
        
        // Wait for page to be ready
        await this.page.waitForTimeout(3000);
        
        // Check if the page loaded correctly
        const emailInputVisible = await this.emailInput.isVisible({ timeout: 10000 }).catch(() => false);
        if (emailInputVisible) {
          return;
        }
      } catch (e) {
        lastError = e as Error;
        console.log(`Attempt ${i + 1} failed, retrying...`);
        await this.page.waitForTimeout(5000);
      }
    }
    
    throw new Error(`Failed to load temp-mail.io after ${this.maxRetries} attempts. Last error: ${lastError && lastError.message ? lastError.message : 'Unknown error'}`);
  }

  async getEmail(): Promise<string> {
    // Wait for email to be generated
    await this.page.waitForTimeout(2000);
    
    // Try to get email with retry
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        await expect(this.emailInput).toHaveValue(/.+/, { timeout: 10000 });
        const email = await this.emailInput.inputValue();
        if (email && email.includes('@')) {
          return email;
        }
      } catch (e) {
        if (i === this.maxRetries - 1) throw e;
        await this.page.waitForTimeout(3000);
      }
    }
    
    throw new Error('Failed to get email from temp-mail.io');
  }

  async findTeCorrespondeEmail(): Promise<void> {
    // Wait for emails to load
    await this.page.waitForTimeout(5000);
    
    // Try multiple times to find the TeCorresponde email
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        // Refresh the email list by reloading the page
        if (attempt > 0) {
          await this.page.reload({ waitUntil: 'domcontentloaded' });
          await this.page.waitForTimeout(3000);
        }
        
        // Wait for email list to load
        await this.emailList.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
        
        // Try to find the TeCorresponde email (case insensitive)
        const teCorrespondeEmail = this.emailList.filter({ hasText: /TeCorresponde/i });
        
        // Wait for the email to appear
        const count = await teCorrespondeEmail.count();
        if (count > 0) {
          await teCorrespondeEmail.first().click();
          await this.emailContent.waitFor({ state: "visible", timeout: 10000 });
          return;
        }
        
        // If not found, wait and retry
        console.log(`Attempt ${attempt + 1}: TeCorresponde email not found, waiting...`);
        await this.page.waitForTimeout(10000);
        
      } catch (e) {
        console.log(`Error on attempt ${attempt + 1}:`, e);
        if (attempt === 5) throw e;
      }
    }
    
    throw new Error('Failed to find TeCorresponde email in temp-mail.io after multiple attempts');
  }

  async getConfirmationCode(): Promise<string> {
    const code = await this.emailContent.innerText();
    // The code should be 6 digits
    const match = code.match(/(\d{6})/);
    if (match) {
      return match[1];
    }
    return code.trim();
  }

  async close(): Promise<void> {
    await this.page.close();
  }
}