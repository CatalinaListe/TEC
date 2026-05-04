import { Page, Locator, expect } from "@playwright/test";

/**
 * Helper for handling email and OTP in tests without relying on external services like temp-mail.io
 * In dev environment, the OTP is logged by the server, so we use a fixed email pattern
 * and poll the API or use alternative methods to retrieve the OTP.
 */
export class TestEmailHelper {
  private readonly _page: Page;
  private static emailCounter = 0;

  constructor(page: Page) {
    this._page = page;
  }

  private get page(): Page {
    return this._page;
  }

  /**
   * Generates a unique test email using a timestamp-based approach
   * This creates a predictable email that we can use for testing
   */
  static generateTestEmail(): string {
    const timestamp = Date.now();
    TestEmailHelper.emailCounter++;
    // Using a format that's clearly identifiable as a test email
    return `test-${timestamp}-${TestEmailHelper.emailCounter}@testdomain.com`;
  }

  /**
   * Gets the OTP code for a given email by polling the API
   * In dev environment, we can try to get the OTP from the API
   * Note: This requires a test endpoint or database access
   */
  async getOTPForEmail(email: string, timeout: number = 60000): Promise<string> {
    // In dev environment with MAILING_ENABLED=false, the OTP is still generated
    // but we need to retrieve it. Options:
    // 1. Add a test endpoint to the API that returns the OTP for a given email
    // 2. Query the database directly
    // 3. Parse server logs (complex)
    
    // For now, we'll implement option 1 by calling a hypothetical endpoint
    // If this endpoint doesn't exist, we'll need to add it to the backend
    
    const startTime = Date.now();
    const apiBaseUrl = process.env.API_BASE_URL || 'https://api.dev-tecorresponde.k8s.qubikcommerce.com';
    
    while (Date.now() - startTime < timeout) {
      try {
        const response = await this.page.request.get(
          `${apiBaseUrl}/test/otp?email=${encodeURIComponent(email)}`,
          { timeout: 5000 }
        );
        
        if (response.ok()) {
          const data = await response.json();
          if (data.otp) {
            return data.otp;
          }
        }
      } catch (e) {
        // Endpoint might not exist yet, continue polling
      }
      
      // Wait before next attempt
      await this.page.waitForTimeout(2000);
    }
    
    throw new Error(`Timeout waiting for OTP for email: ${email}. Consider adding a test endpoint to retrieve OTP codes.`);
  }

  /**
   * Alternative approach: Use a fixed OTP for testing
   * This requires backend changes to accept a fixed OTP in test environments
   */
  static getFixedOTP(): string {
    return '123456';
  }

  /**
   * Fills the OTP input field
   */
  async fillOTP(otp: string): Promise<void> {
    const otpInput = this.page.getByRole("textbox");
    await otpInput.fill(otp);
  }
}
