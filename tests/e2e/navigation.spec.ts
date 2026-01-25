import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('homepage loads and displays name', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Barry Napier');
  });

  test.skip('can navigate from homepage to writing page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/writing"]');
    await expect(page).toHaveURL('/writing');
    await expect(page.locator('h1')).toContainText('Writing');
  });

  test.skip('can navigate from post back to writing list', async ({ page }) => {
    await page.goto('/writing/building-in-public');
    await page.click('text=← Back');
    await expect(page).toHaveURL('/writing');
  });

  test.skip('can navigate to projects page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/projects"]');
    await expect(page).toHaveURL('/projects');
  });

  test.skip('can navigate to now page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/now"]');
    await expect(page).toHaveURL('/now');
  });
});
