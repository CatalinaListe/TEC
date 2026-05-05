import { test, expect } from './fixtures/test-fixtures';
import { BackofficeLoginPage } from './pages/backoffice/BackofficeLoginPage';
import { BackofficeMessagesPage } from './pages/backoffice/BackofficeMessagesPage';
import { ClaimDetailPage } from './pages/backoffice/ClaimDetailPage';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { ENV } from './config/constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Backoffice - Upload File from Messages', { tag: ['@messages', '@files', '@backoffice'] }, () => {
  let messagesPage: BackofficeMessagesPage;
  let detailPage: ClaimDetailPage;
  const testFileName = 'test-file.pdf';
  const testFilePath = path.join(__dirname, testFileName);

  test.beforeAll(async () => {
    // Create a minimal PDF file to upload
    // PDF header: %PDF-1.4, with minimal content
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
100 700 Td
(Este es un archivo de prueba) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000214 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
297
%%EOF`;
    fs.writeFileSync(testFilePath, pdfContent);
  });

  test.afterAll(async () => {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  test.beforeEach(async ({ page }) => {
    const loginPage = new BackofficeLoginPage(page);
    messagesPage = new BackofficeMessagesPage(page);
    detailPage = new ClaimDetailPage(page);
    await loginPage.goto();
    await loginPage.login(ENV.BO_USERNAME, ENV.BO_PASSWORD);
    await expect(page).toHaveURL(/.*backoffice\/home/, { timeout: 30000 });
  });

  test('BO-MSG-UPLOAD-001 - Subir archivo desde Mensajes y verificar en Archivos', async ({ page }) => {
    // 1. Go to Messages
    await messagesPage.goto();
    await messagesPage.expectPageLoaded();

    // 2. Click on claim #1694
    const claimButton = messagesPage.messageItems.filter({ hasText: '#1694' });
    const count = await claimButton.count();
    
    if (count > 0) {
      await claimButton.click();
    } else {
      await messagesPage.clickFirstMessage();
    }
    
    await messagesPage.expectMessageDetailVisible();

    // 3. Set the file input directly (react-dropzone creates hidden input)
    // The MessageAttachments component uses react-dropzone
    // We need to find the hidden file input and set files directly
    const fileInput = page.locator('input[type="file"][hidden]').or(page.locator('input[type="file"]')).first();
    
    // Wait for input to be present
    await fileInput.waitFor({ state: 'attached', timeout: 5000 });
    await fileInput.setInputFiles(testFilePath);
    await page.waitForTimeout(3000);

    // 5. Verify file appears in attachment area
    console.log('Checking if file appears in attachment area...');
    const attachmentVisible = page.getByText('test-file.pdf').or(page.locator('[class*="attachment"]')).first();
    const isAttachmentVisible = await attachmentVisible.isVisible({ timeout: 5000 }).catch(() => false);
    console.log('Attachment visible before sending:', isAttachmentVisible);

    // 6. Send the message with the attachment
    await messagesPage.editorContent.click();
    await messagesPage.editorContent.fill('Mensaje con archivo adjunto - prueba automatizada');
    await page.waitForTimeout(1000);
    await messagesPage.sendButton.click();
    await page.waitForTimeout(5000);

    // 7. Verify the message appears in the messages list
    await expect(page.getByText('Mensaje con archivo adjunto - prueba automatizada').first()).toBeVisible({ timeout: 10000 });

    // 8. Go to Claim Detail > Files tab
    await page.goto('/backoffice/claims/1694');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // 9. Click on Files tab
    await detailPage.clickTab('archivos');
    await page.waitForTimeout(3000);
    
    // 10. Verify the uploaded file is visible in the Files tab
    await expect(page.getByText('test-file.pdf').first()).toBeVisible({ timeout: 15000 });
  });
});
