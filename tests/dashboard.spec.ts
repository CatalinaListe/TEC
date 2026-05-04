import { test, expect } from "./fixtures/test-fixtures";
import { BackofficeLoginPage } from "./pages/backoffice/BackofficeLoginPage";
import { BackofficeDashboardPage } from "./pages/backoffice/BackofficeDashboardPage";

const TEST_USER = {
  email: "catalina.liste+admin@qubikcommerce.com",
  password: "Pruebatest1!",
};

test.describe(
  "Backoffice - Dashboard",
  { tag: ["@dashboard", "@backoffice"] },
  () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new BackofficeLoginPage(page);
      const dashboardPage = new BackofficeDashboardPage(page);
      await loginPage.goto();
      await loginPage.login(TEST_USER.email, TEST_USER.password);
      await expect(page).toHaveURL(/.*backoffice\/home/, { timeout: 30000 });
      await dashboardPage.goto();
    });

    test("BO-DASH-001 - Dashboard carga correctamente", async ({ page }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.expectDashboardLoaded();
    });

    test("BO-DASH-002 - Resumen general del sistema visible", async ({
      page,
    }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.expectResumenVisible();
    });

    test("BO-DASH-003 - Menu de navegacion visible", async ({ page }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.expectNavVisible();
    });

    test("BO-DASH-004 - Nombre de usuario logueado visible", async ({
      page,
    }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.expectUsuarioVisible();
    });

    test("BO-DASH-005 - Tarjetas de reclamos con cantidad visibles", async ({
      page,
    }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.expectClaimCardsVisible();
    });

    test("BO-DASH-006 - Click en tarjeta navega a lista", async ({ page }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.clickCardByText("Rechazados");
      await dashboardPage.expectReclamosHeadingVisible();
    });

    test("BO-DASH-007 - Seccion Mis Datos visible", async ({ page }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.expectMisDatosVisible();
    });

    test("BO-DASH-008 - Grafica de reclamos visible", async ({ page }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.expectGraficaVisible();
    });

    test("BO-DASH-009 - Seccion Ultimos Reclamos visible", async ({ page }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.expectUltimosReclamosVisible();
    });

    test("BO-DASH-010 - Boton Ver todo navega a lista", async ({ page }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.clickVerTodo(1);
      await dashboardPage.expectReclamosHeadingVisible();
    });

    test("BO-DASH-011 - Seccion Mensajes sin leer visible", async ({
      page,
    }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.expectMensajesSinLeerVisible();
    });

    test("BO-DASH-012 - Contador de mensajes sin leer visible", async ({
      page,
    }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.expectContadorMensajesVisible();
    });

    test("BO-DASH-013 - Boton Ver todo en Mensajes navega a lista", async ({
      page,
    }) => {
      const dashboardPage = new BackofficeDashboardPage(page);
      await dashboardPage.clickVerTodoMensajes();
      await dashboardPage.expectMensajesVisible();
    });
  },
);
