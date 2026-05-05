import { test, expect } from "./fixtures/test-fixtures";
import { BackofficeLoginPage } from "./pages/backoffice/BackofficeLoginPage";
import { BackofficeMessagesPage } from "./pages/backoffice/BackofficeMessagesPage";
import { ENV } from "./config/constants";

test.describe(
  "Backoffice - Messages",
  { tag: ["@messages", "@backoffice"] },
  () => {
    let messagesPage: BackofficeMessagesPage;

    test.beforeEach(async ({ page }) => {
      const loginPage = new BackofficeLoginPage(page);
      messagesPage = new BackofficeMessagesPage(page);
      await loginPage.goto();
      await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
      await expect(page).toHaveURL(/.*backoffice\/home/, { timeout: 30000 });
      await messagesPage.goto();
      await messagesPage.expectPageLoaded();
    });

    test("BO-MSG-001 - Página de mensajes carga correctamente", async ({
      page,
    }) => {
      await messagesPage.expectPageLoaded();
    });

    test("BO-MSG-002 - Lista de mensajes se muestra", async ({ page }) => {
      // Validate the scrollable container with messages exists
      await expect(messagesPage.messagesList).toBeVisible({ timeout: 15000 });
    });

    test("BO-MSG-003 - Hay mensajes en la lista", async ({ page }) => {
      await messagesPage.expectMessageItemsVisible();
    });

    test("BO-MSG-004 - Buscador de mensajes visible", async ({ page }) => {
      await messagesPage.expectSearchInputVisible();
    });

    test("BO-MSG-006 - Tab Todos es visible", async ({ page }) => {
      await expect(messagesPage.tabAll).toBeVisible({ timeout: 10000 });
    });

    test("BO-MSG-007 - Tab No leídos es visible", async ({ page }) => {
      await expect(messagesPage.tabUnread).toBeVisible({ timeout: 10000 });
    });

    test("BO-MSG-008 - Tab Sin responder es visible", async ({ page }) => {
      await expect(messagesPage.tabUnanswered).toBeVisible({ timeout: 10000 });
    });

    test("BO-MSG-013 - Botón de filtros visible", async ({ page }) => {
      await messagesPage.expectFilterButtonVisible();
    });

    test("BO-MSG-014 - Abrir filtros funciona", async ({ page }) => {
      await messagesPage.openFilters();
    });

    test("BO-MSG-009 - Click en mensaje muestra detalle", async ({ page }) => {
      // Wait for message items to be visible
      await expect(messagesPage.messageItems.first()).toBeVisible({
        timeout: 15000,
      });
      // Get count of message items
      const count = await messagesPage.messageItems.count();
      expect(count).toBeGreaterThan(0);
      // Click first message
      await messagesPage.clickFirstMessage();
      // Validate detail panel is visible
      await messagesPage.expectMessageDetailVisible();
    });

    test("BO-MSG-015 - Enviar mensaje con éxito", async ({ page }) => {
      // Click on claim #1694 specifically
      const claimButton = messagesPage.messageItems.filter({
        hasText: "#1694",
      });
      await expect(claimButton).toBeVisible({ timeout: 15000 });
      await claimButton.click();
      await messagesPage.expectMessageDetailVisible();
      // Write a test message
      await messagesPage.editorContent.click();
      await messagesPage.editorContent.fill("Mensaje de prueba automatizada");
      await page.waitForTimeout(1000);
      // Send the message
      await messagesPage.sendButton.click();
      await page.waitForTimeout(2000);
      // Validate the message was sent (should appear in the messages list)
      await expect(page.getByTitle("Enviado")).toBeVisible({ timeout: 10000 });
    });

    test("BO-MSG-017 - Navegar a detalle desde mensaje", async ({ page }) => {
      await messagesPage.clickFirstMessage();
      await messagesPage.expectMessageDetailVisible();
      await messagesPage.clickViewClaimButton();
      await page.waitForTimeout(2000);
    });
  },
);
