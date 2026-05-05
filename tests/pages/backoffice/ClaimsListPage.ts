import { Page, Locator, expect } from "@playwright/test";
import { URLS } from "../../config/constants";

export class ClaimsListPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly claimsTableRows: Locator;
  readonly exportButton: Locator;
  readonly pagination: Locator;
  readonly estadoTabs: Locator;
  readonly rechazadosButton: Locator;
  readonly finalizadosButton: Locator;
  readonly canceladosButton: Locator;
  readonly reclamosButton: Locator;
  readonly searchResult: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder(/buscar|nro|Reclamo/i).or(page.locator('input[type="search"]'));
    this.claimsTableRows = page.locator('table tbody tr');
    this.exportButton = page.getByRole('button', { name: /Exportar/i });
    this.pagination = page.locator('select');
    this.estadoTabs = page.locator('a').filter({ hasText: /Reconfirmar|Revisar|Iniciados|Aprobados|Rechazados|Finalizados|Cancelados/i }).or(page.locator('button').filter({ hasText: /Reconfirmar|Revisar|Iniciados|Aprobados|Rechazados|Finalizados|Cancelados/i }));
    this.rechazadosButton = page.getByRole('button', { name: /Rechazados/i });
    this.finalizadosButton = page.getByRole('button', { name: /Finalizados/i });
    this.canceladosButton = page.getByRole('button', { name: /Cancelados/i });
    this.reclamosButton = page.getByRole('button', { name: /Reclamos/i });
    this.searchResult = page.locator('table tbody').getByText('');
    this.noResultsMessage = page.getByText(/sin resultados|no hay|no se encontró|not found/i);
  }

  async goto(): Promise<void> {
    await this.page.goto(URLS.BACKOFFICE_CLAIMS);
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 }).catch(() => {});
  }

  async expectListLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*backoffice\/claims/);
  }

  async expectClaimsVisible(): Promise<void> {
    await expect(this.claimsTableRows.first()).toBeVisible({ timeout: 15000 });
  }

  async expectSearchInputVisible(): Promise<void> {
    await expect(this.searchInput.first()).toBeVisible({ timeout: 10000 });
  }

  async expectExportButtonVisible(): Promise<void> {
    await expect(this.exportButton).toBeVisible({ timeout: 10000 });
  }

  async searchByNumber(claimNumber: string): Promise<void> {
    await this.searchInput.fill(claimNumber);
    await this.searchInput.press('Enter');
    await this.page.waitForTimeout(3000);
  }

  async expectSearchResult(claimNumber: string): Promise<void> {
    const result = this.page.locator('table tbody').getByText(claimNumber);
    await expect(result.first()).toBeVisible({ timeout: 10000 });
  }

  async expectNoResults(): Promise<void> {
    await expect(this.noResultsMessage).toBeVisible({ timeout: 10000 });
  }

  async expectEstadoTabsVisible(): Promise<void> {
    const count = await this.estadoTabs.count();
    expect(count).toBeGreaterThan(0);
  }

  async filterByStatus(status: 'Rechazados' | 'Finalizados' | 'Cancelados' | 'Reclamos'): Promise<void> {
    // The status filters are links, not buttons
    const linkMap = {
      'Rechazados': this.page.getByRole('link', { name: /Rechazados/i }),
      'Finalizados': this.page.getByRole('link', { name: /Finalizados/i }),
      'Cancelados': this.page.getByRole('link', { name: /Cancelados/i }),
      'Reclamos': this.page.getByRole('link', { name: /Reclamos/i }).first()
    };
    await linkMap[status].click();
    await this.page.waitForTimeout(2000);
  }

  async expectPaginationVisible(): Promise<void> {
    await expect(this.pagination).toBeVisible({ timeout: 10000 });
  }

  async changePageSize(size: string): Promise<void> {
    await this.pagination.selectOption(size);
    await this.page.waitForTimeout(1000);
  }
}