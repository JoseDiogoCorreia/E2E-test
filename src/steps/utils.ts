import { Page } from 'playwright';

export async function expectElementById(page: Page, id: string): Promise<string | null> {
  await page.waitForSelector(`#${id}`, { timeout: 30000 }); // Wait up to 30 seconds
  const element = await page.$(`#${id}`);
  if (element === null) {
    throw new Error(`Element with ID ${id} not found`);
  }
  const elementText = await element.textContent();
  return elementText;
}

export async function fillInputById(page: Page, id: string, value: string): Promise<void> {
  await page.fill(`#${id}`, value);
}

export async function clickButtonById(page: Page, id: string): Promise<void> {
  await page.click(`#${id}`);
}

export async function takeScreenshot(page: Page, attach: (arg1: Buffer, arg2: string) => void): Promise<void> {
  const screenshot = await page.screenshot();
  attach(screenshot, 'image/png');
}

export async function requestOtpCode(
  page: Page,
  buttonId: string,
  waitBeforeClickMs: number = 0
): Promise<string> {
  if (waitBeforeClickMs > 0) {
    await page.waitForTimeout(waitBeforeClickMs);
  }

  const responsePromise = page.waitForResponse(
    response => response.url().includes('/api/global/otp-send'),
    { timeout: 30000 }
  );

  await page.waitForSelector(`#${buttonId}`, { timeout: 30000 });
  await clickButtonById(page, buttonId);

  const response = await responsePromise;
  if (!response.ok()) {
    throw new Error(`OTP request failed with status ${response.status()}`);
  }

  const responseText = await response.text();
  let responseBody;
  try {
    responseBody = JSON.parse(responseText);
  } catch {
    throw new Error('Response is not valid JSON');
  }

  if (!responseBody.code) {
    throw new Error('OTP code not found in response');
  }

  return responseBody.code;
}
