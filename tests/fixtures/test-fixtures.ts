import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { HomePage } from '../pages/frontend/HomePage';
import { BackofficeLoginPage } from '../pages/backoffice/BackofficeLoginPage';
import { BackofficeDashboardPage } from '../pages/backoffice/BackofficeDashboardPage';
import { ClaimsListPage } from '../pages/backoffice/ClaimsListPage';
import { ClaimDetailPage } from '../pages/backoffice/ClaimDetailPage';
import { ClaimTrackingPage } from '../pages/frontend/ClaimTrackingPage';
import { PersonalDataPage } from '../pages/frontend/PersonalDataPage';
import { StaticPagesPage } from '../pages/frontend/StaticPagesPage';
import { BackofficeMessagesPage } from '../pages/backoffice/BackofficeMessagesPage';

const boUsername = process.env.BO_USERNAME || 'catalina.liste+admin@qubikcommerce.com';
const boPassword = process.env.BO_PASSWORD || 'Pruebatest1!';

export interface TestFixtures {
  homePage: HomePage;
  backofficeLoginPage: BackofficeLoginPage;
  backofficeDashboardPage: BackofficeDashboardPage;
  claimsListPage: ClaimsListPage;
  claimDetailPage: ClaimDetailPage;
  claimTrackingPage: ClaimTrackingPage;
  personalDataPage: PersonalDataPage;
  staticPagesPage: StaticPagesPage;
  backofficeMessagesPage: BackofficeMessagesPage;
  authenticatedPage: Page;
}

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  backofficeLoginPage: async ({ page }, use) => {
    await use(new BackofficeLoginPage(page));
  },

  backofficeDashboardPage: async ({ page }, use) => {
    await use(new BackofficeDashboardPage(page));
  },

  claimsListPage: async ({ page }, use) => {
    await use(new ClaimsListPage(page));
  },

  claimDetailPage: async ({ page }, use) => {
    await use(new ClaimDetailPage(page));
  },

  claimTrackingPage: async ({ page }, use) => {
    await use(new ClaimTrackingPage(page));
  },

  personalDataPage: async ({ page }, use) => {
    await use(new PersonalDataPage(page));
  },

  staticPagesPage: async ({ page }, use) => {
    await use(new StaticPagesPage(page));
  },

  backofficeMessagesPage: async ({ page }, use) => {
    await use(new BackofficeMessagesPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new BackofficeLoginPage(page);
    await loginPage.goto();
    await loginPage.login(boUsername, boPassword);
    await use(page);
  },
});

export { expect };

export async function loginAsAdmin(page: Page) {
  const loginPage = new BackofficeLoginPage(page);
  await loginPage.goto();
  await loginPage.login(boUsername, boPassword);
}
