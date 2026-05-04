import { Page, Locator, expect } from "@playwright/test";

export class ClaimDetailPage {
  readonly page: Page;
  readonly claimsTableRows: Locator;
  readonly customerHeading: Locator;
  readonly productHeading: Locator;
  readonly claimInfoHeading: Locator;
  readonly claimNumberHeading: Locator;
  readonly statusButton: Locator;
  readonly detallesTab: Locator;
  readonly notasTab: Locator;
  readonly mensajesTab: Locator;
  readonly archivosTab: Locator;
  readonly historialTab: Locator;
  readonly staffButton: Locator;
  readonly editableContent: Locator;
  readonly agregarNotaButton: Locator;
  readonly normalFormatButton: Locator;
  readonly enviarButton: Locator;
  readonly closeDrawerButton: Locator;
  readonly contentContainers: Locator;
  readonly datePattern: Locator;
  readonly statusChangeText: Locator;
  readonly editDeleteButtons: Locator;
  readonly emptyHistoryMessage: Locator;
  readonly claimNumberInNotas: Locator;

  constructor(page: Page) {
    this.page = page;
    // Claims list - table rows
    this.claimsTableRows = page.locator('table tbody tr');
    // Headings in the detail panel - these are in DetailSection components
    this.customerHeading = page.getByRole('heading', { name: 'Datos del usuario' });
    this.productHeading = page.getByRole('heading', { name: 'Datos del producto' });
    this.claimInfoHeading = page.getByRole('heading', { name: 'Información del reclamo' });
    // Claim number in header - from BackofficeClaimDetailContainer
    this.claimNumberHeading = page.getByRole('heading', { name: /Nº Reclamo:/i }).or(page.locator('h1:has-text("Nº Reclamo:")'));
    // Status button - the status is displayed as a Chip component (HeroUI)
    // The Chip renders as a button element with the status text
    // Looking at the actual rendered HTML structure
    this.statusButton = page.locator('button:has(span), .heroui-chip, [class*="Chip"]').first();
    // Tabs - using data-key attribute from HeroUI Tabs
    this.detallesTab = page.locator('[data-key="details"]');
    this.notasTab = page.locator('[data-key="notes"]');
    this.mensajesTab = page.locator('[data-key="chat"]');
    this.archivosTab = page.locator('[data-key="files"]');
    this.historialTab = page.locator('[data-key="history"]');
    // Staff/assign button - looks for the team section or assigned staff
    this.staffButton = page.getByText('Equipo asignado al reclamo').or(page.getByText('Asignado a:'));
    // Rich text editor - the BackofficeRichTextEditor uses contenteditable
    this.editableContent = page.locator('[contenteditable="true"]').first();
    // Add note button - from BackofficeClaimNotes component
    this.agregarNotaButton = page.getByRole('button', { name: 'Agregar nota' }).or(page.getByText('Agregar nota'));
    // Normal format button - in the rich text editor toolbar
    this.normalFormatButton = page.getByRole('button', { name: 'Normal' }).or(page.locator('button:has-text("Normal")'));
    // Send button - for messages
    this.enviarButton = page.getByRole('button', { name: /Enviar/i }).or(page.getByText('Enviar'));
    // Close drawer button (X button) - not applicable for this page (it's a full page, not a drawer)
    this.closeDrawerButton = page.locator('button[aria-label="Close"]').or(page.locator('button:has([class*="close"])')).first();
    // Content containers
    this.contentContainers = page.locator('main, [class*="flex-col"], .lg\\:scrollbar-primary');
    // Date pattern for history - matches DD/MM/YYYY or DD/MM/YY
    this.datePattern = page.getByText(/\d{1,2}\/\d{1,2}\/\d{2,4}/);
    // Status change text pattern
    this.statusChangeText = page.getByText(/cambió el estado de|cambió el estado/i);
    // Edit/Delete buttons - should not exist in history
    this.editDeleteButtons = page.getByRole('button', { name: /editar|eliminar|borrar/i });
    // Empty history message
    this.emptyHistoryMessage = page.getByText(/Aún no hay movimientos registrados/i);
    // Claim number in notas tab - same as claimNumberHeading
    this.claimNumberInNotas = page.getByRole('heading', { name: /Nº Reclamo:/i }).or(page.locator('h1:has-text("Nº Reclamo:")'));
  }

  async goto(): Promise<void> {
    await this.page.goto('/backoffice/claims');
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.page.waitForTimeout(2000);
  }

  async clickFirstClaim(): Promise<void> {
    // Wait for the table to load before clicking
    await this.claimsTableRows.first().waitFor({ state: 'visible', timeout: 15000 });
    await this.claimsTableRows.first().click();
    // Wait for navigation to detail page
    await this.page.waitForURL(/.*backoffice\/claims\/.+/, { timeout: 15000 });
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.page.waitForTimeout(2000);
  }

  async gotoClaim(claimId: string): Promise<void> {
    await this.page.goto(`/backoffice/claims/${claimId}`);
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.page.waitForTimeout(2000);
  }

  async clickTab(tabName: 'detalles' | 'notas' | 'mensajes' | 'archivos' | 'historial'): Promise<void> {
    const tabKeyMap = {
      detalles: 'details',
      notas: 'notes',
      mensajes: 'chat',
      archivos: 'files',
      historial: 'history'
    };
    const tab = this.page.locator(`[data-key="${tabKeyMap[tabName]}"]`);
    await tab.click();
    // Wait for tab content to load
    await this.page.waitForTimeout(1500);
  }

  async expectTabSelected(tabName: 'detalles' | 'notas' | 'mensajes' | 'archivos' | 'historial'): Promise<void> {
    const tabKeyMap = {
      detalles: 'details',
      notas: 'notes',
      mensajes: 'chat',
      archivos: 'files',
      historial: 'history'
    };
    const tab = this.page.locator(`[data-key="${tabKeyMap[tabName]}"]`);
    // HeroUI Tabs use aria-selected attribute
    await expect(tab).toHaveAttribute('aria-selected', 'true');
  }

  async writeNote(text: string): Promise<void> {
    // Focus the editable content and type
    await this.editableContent.first().click();
    await this.page.keyboard.type(text);
  }

  async clickAgregarNota(): Promise<void> {
    await this.agregarNotaButton.click();
    await this.page.waitForTimeout(2000);
  }

  async expectNoteVisible(text: string): Promise<void> {
    await expect(this.page.getByText(text, { exact: false }).first()).toBeVisible({ timeout: 10000 });
  }

  async writeMessage(text: string): Promise<void> {
    // Focus the editable content and type
    await this.editableContent.first().click();
    await this.page.keyboard.type(text);
  }

  async clickEnviar(): Promise<void> {
    await this.enviarButton.click();
    await this.page.waitForTimeout(3000);
  }

  async expectMessageVisible(text: string): Promise<void> {
    await expect(this.page.getByText(text, { exact: false }).first()).toBeVisible({ timeout: 10000 });
  }

  async closeDrawer(): Promise<void> {
    // This page doesn't use a drawer, it's a full page
    // Go back to claims list
    await this.page.goBack();
    await this.page.waitForTimeout(1000);
  }

  async expectDrawerNotVisible(): Promise<void> {
    // Not applicable for full page view
    await expect(this.page.getByText('Detalles')).not.toBeVisible({ timeout: 5000 });
  }

  async expectStatusButtonVisible(): Promise<void> {
    // The status is displayed as a Chip component with role="button"
    await expect(this.statusButton.first()).toBeVisible({ timeout: 10000 });
  }

  async expectFileVisible(fileName: string): Promise<void> {
    // Verify a file is visible in the Files tab
    await expect(this.page.getByText(fileName, { exact: false }).first()).toBeVisible({ timeout: 10000 });
  }

  async expectClaimsLoaded(): Promise<void> {
    await expect(this.claimsTableRows.first()).toBeVisible({ timeout: 15000 });
  }

  async getStatusChangeCount(): Promise<number> {
    return await this.statusChangeText.count();
  }
}
