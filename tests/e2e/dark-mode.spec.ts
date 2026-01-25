import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('defaults to system preference (light)', async ({ page }) => {
    // Emulate light mode preference
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);
  });

  test('defaults to system preference (dark)', async ({ page }) => {
    // Emulate dark mode preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('can toggle dark mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    const html = page.locator('html');
    const toggle = page.locator('#theme-toggle');

    // Initial state (light)
    await expect(html).not.toHaveClass(/dark/);

    // Click toggle to enable dark mode
    await toggle.click();
    await expect(html).toHaveClass(/dark/);

    // Click again to toggle back to light
    await toggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test('persists dark mode preference across page loads', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    const toggle = page.locator('#theme-toggle');

    // Enable dark mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Navigate to another page
    await page.goto('/writing');

    // Dark mode should persist
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('persists dark mode preference after browser refresh', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    const toggle = page.locator('#theme-toggle');

    // Enable dark mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Refresh the page
    await page.reload();

    // Dark mode should persist via localStorage
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
