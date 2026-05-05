import { Page, Locator, expect } from "@playwright/test";
import { URLS } from "../../config/constants";

export class BackofficeMessagesPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly filterButton: Locator;
  readonly messagesList: Locator;
  readonly messageItems: Locator;
  readonly emptyStateMessage: Locator;
  readonly messageDetail: Locator;
  readonly sendButton: Locator;
  readonly editorContent: Locator;
  readonly tabAll: Locator;
  readonly tabUnread: Locator;
  readonly tabUnanswered: Locator;
  readonly viewClaimButton: Locator;
  readonly filterPopover: Locator;
  readonly fileInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Search input - HeroUI Input component with proper placeholder
    this.searchInput = page.getByRole('textbox', { name: /buscar/i }).or(
      page.locator('input[placeholder*="buscar"]')
    );

    // Filter button - button with name "Filtros" (from translationCommon('filters'))
    // This is a HeroUI Button inside BackofficeMessagesFilters component
    this.filterButton = page.getByRole('button', { name: /filtros/i }).or(
      page.locator('button').filter({ hasText: /filtros/i })
    ).first();

    // Messages list container - the scrollable div containing message items
    this.messagesList = page.locator('div.scrollbar-primary.flex-1.overflow-y-auto').first();

    // Message items - buttons with data-react-aria-pressable="true" inside the messages list
    // These are the Card components with isPressable prop from HeroUI
    // We scope to the messages list to avoid matching other pressable buttons (like filter button)
    this.messageItems = this.messagesList.locator('button[data-react-aria-pressable="true"]');

    // Empty state
    this.emptyStateMessage = page.locator('[class*="BackofficeMessagesEmpty"]').or(
      page.getByText(/no hay|sin resultados/i)
    );

    // Message detail panel - the send button or editor indicates the panel is visible
    // We look for the form containing the send button, which is in the detail panel
    this.messageDetail = page.locator('form').filter({ has: page.getByRole('button', { name: /enviar/i }) }).first();

    // Send button - submit button in the form with "Enviar" text
    // Located inside the message detail form
    this.sendButton = this.messageDetail.locator('form button[type="submit"]').or(
      page.getByRole('button', { name: /enviar/i })
    );

    // Rich text editor - contenteditable div inside the detail view
    this.editorContent = page.locator('[contenteditable="true"]').first();

    // Tabs - HeroUI Tabs with data-key attribute
    this.tabAll = page.locator('[data-key="ALL"]');
    this.tabUnread = page.locator('[data-key="UNREAD"]');
    this.tabUnanswered = page.locator('[data-key="UNANSWERED"]');

    // View claim button - icon-only button inside message detail with aria-label
    // The aria-label is "Ver detalle del reclamo" (from BackofficeMessagesDetail.json)
    this.viewClaimButton = this.page.getByRole('button', { name: /ver detalle del reclamo/i }).first();

    // File input for attachments
    this.fileInput = page.locator('input[type="file"]').first();
  }

  async goto(): Promise<void> {
    await this.page.goto(URLS.BACKOFFICE_MESSAGES);
    await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
    // Wait for the page to be fully loaded with messages
    await this.messageItems.first().waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*backoffice\/messages/);
  }

  async expectMessagesListVisible(): Promise<void> {
    await expect(this.messagesList).toBeVisible({ timeout: 15000 });
  }

  async expectMessageItemsVisible(): Promise<void> {
    // Wait for message items to be visible
    await expect(this.messageItems.first()).toBeVisible({ timeout: 15000 });
    // Validate that there are message items in the list
    const count = await this.messageItems.count();
    expect(count).toBeGreaterThan(0);
  }

  async clickMessageByClaim(claimNumber: string): Promise<void> {
    // Click on a specific message by claim number
    const claimButton = this.messageItems.filter({ hasText: claimNumber });
    await expect(claimButton).toBeVisible({ timeout: 15000 });
    await claimButton.click();
    // Wait for the detail panel to appear
    await this.sendButton.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }

  async clickFirstMessage(): Promise<void> {
    // Wait for message items to be visible before clicking
    await expect(this.messageItems.first()).toBeVisible({ timeout: 15000 });
    await this.messageItems.first().click();
    // Wait for the detail panel to appear - look for the send button or editor
    await this.sendButton.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }

  async expectMessageDetailVisible(): Promise<void> {
    // The detail view is visible when either the editor or send button is present
    // Use a more specific selector for the message detail container
    await expect(this.messageDetail).toBeVisible({ timeout: 10000 });
  }

  async searchMessage(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForTimeout(3000);
  }

  async expectSearchInputVisible(): Promise<void> {
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
  }

  async expectFilterButtonVisible(): Promise<void> {
    await expect(this.filterButton).toBeVisible({ timeout: 10000 });
  }

  async openFilters(): Promise<void> {
    // Click the filter button to open the popover
    await this.filterButton.click();
    // Wait for the popover to appear
    // HeroUI Popover renders content in a portal, so we need to look at the page level
    // The popover should contain filter form elements
    // Wait for the popover content - it may have a class containing "popover" or role "dialog"
    const popover = this.page.locator('[role="dialog"], .popover, [data-slot="popover-content"]').first();
    // Wait for any filter form element to be visible
    await expect(popover.getByText(/Nº Reclamo|Usuario/i)).toBeVisible({ timeout: 5000 });
  }

  async expectTabsVisible(): Promise<void> {
    await expect(this.page.getByRole('tab', { name: /todos/i })).toBeVisible({ timeout: 10000 });
    await expect(this.page.getByRole('tab', { name: /no leídos|unread/i })).toBeVisible({ timeout: 10000 });
    await expect(this.page.getByRole('tab', { name: /sin responder|unanswered/i })).toBeVisible({ timeout: 10000 });
  }

  async clickTabUnread(): Promise<void> {
    await this.page.getByText(/no leídos|unread/i).first().click();
    await this.page.waitForTimeout(2000);
  }

  async clickTabUnanswered(): Promise<void> {
    await this.page.getByText(/sin responder|unanswered/i).first().click();
    await this.page.waitForTimeout(2000);
  }

  async expectSendButtonEnabled(): Promise<void> {
    await expect(this.sendButton.first()).toBeEnabled({ timeout: 10000 });
  }

  async expectEmptyState(): Promise<void> {
    await expect(this.emptyStateMessage.first()).toBeVisible({ timeout: 10000 });
  }

  async clickViewClaimButton(): Promise<void> {
    // The view claim button is an icon-only button with aria-label in BackofficeMessagesDetail
    // It uses PiEye icon and has aria-label from translation('viewClaimDetail')
    await expect(this.viewClaimButton).toBeVisible({ timeout: 5000 });
    await this.viewClaimButton.click();
    // Wait for navigation to the claim detail page
    await this.page.waitForURL(/.*backoffice\/claims\/.*/, { timeout: 10000 });
  }

  async uploadFile(filePath: string): Promise<void> {
    // Upload a file using the file input
    const fileInput = this.page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(2000);
  }

  async expectFileVisible(fileName: string): Promise<void> {
    // Verify the uploaded file is visible in the message
    await expect(this.page.getByText(fileName)).toBeVisible({ timeout: 10000 });
  }
}
