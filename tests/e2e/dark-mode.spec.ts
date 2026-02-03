import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('defaults to dark mode', async ({ page }) => {
    // Site defaults to dark mode regardless of system preference
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
    await expect(html).not.toHaveClass(/light/);
  });

  test('can toggle to light mode and back', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const toggle = page.locator('#theme-toggle');

    // Initial state (dark)
    await expect(html).toHaveClass(/dark/);

    // Click toggle to enable light mode
    await toggle.click();
    await expect(html).toHaveClass(/light/);
    await expect(html).not.toHaveClass(/dark/);

    // Click again to toggle back to dark
    await toggle.click();
    await expect(html).toHaveClass(/dark/);
    await expect(html).not.toHaveClass(/light/);
  });

  test('persists light mode preference across page loads', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('#theme-toggle');

    // Enable light mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/light/);

    // Navigate to another page
    await page.goto('/writing');

    // Light mode should persist
    await expect(page.locator('html')).toHaveClass(/light/);
  });

  test('persists theme preference after browser refresh', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('#theme-toggle');

    // Enable light mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/light/);

    // Refresh the page
    await page.reload();

    // Light mode should persist via localStorage
    await expect(page.locator('html')).toHaveClass(/light/);
  });
});
