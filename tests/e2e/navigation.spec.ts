import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('homepage loads and displays name', async ({ page }) => {
    await page.goto('/');
    // Name appears in header site-name, not as h1 to avoid duplication
    await expect(page.locator('.site-name')).toContainText('Barry Napier');
  });

  test('can navigate from homepage to writing page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/writing"]');
    await expect(page).toHaveURL('/writing');
    await expect(page.locator('h1')).toContainText('Writing');
  });

  test('can navigate from writing to a post and back', async ({ page }) => {
    await page.goto('/writing');

    // Click the first post link
    const firstPostLink = page.locator('.post-card').first();
    await firstPostLink.click();

    // Verify we're on a post page (URL contains /writing/)
    await expect(page).toHaveURL(/\/writing\/.+/);

    // Click back link to return to writing list
    await page.click('a:has-text("Back to writing")');
    await expect(page).toHaveURL('/writing');
  });

  test('can navigate to projects page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/projects"]');
    await expect(page).toHaveURL('/projects');
    await expect(page.locator('h1')).toContainText('Projects');
  });

  test('can navigate to now page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/now"]');
    await expect(page).toHaveURL('/now');
    await expect(page.locator('h1')).toContainText('Now');
  });

  test('404 page displays for invalid routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.locator('h1')).toContainText('404');
  });
});
