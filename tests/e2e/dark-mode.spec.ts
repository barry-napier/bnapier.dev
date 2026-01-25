import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test.skip('defaults to system preference', async ({ page }) => {
    await page.goto('/');
    // Check that dark mode follows system preference
    const html = page.locator('html');
    // This will depend on test browser's color scheme preference
    await expect(html).toBeVisible();
  });

  test.skip('can toggle dark mode', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');

    // Initial state (assuming light)
    await expect(html).not.toHaveClass(/dark/);

    // Click toggle
    await page.click('[data-theme-toggle]');
    await expect(html).toHaveClass(/dark/);

    // Click again to toggle back
    await page.click('[data-theme-toggle]');
    await expect(html).not.toHaveClass(/dark/);
  });

  test.skip('persists dark mode preference across page loads', async ({ page }) => {
    await page.goto('/');

    // Enable dark mode
    await page.click('[data-theme-toggle]');
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Navigate to another page
    await page.goto('/writing');

    // Dark mode should persist
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test.skip('persists dark mode preference after browser refresh', async ({ page }) => {
    await page.goto('/');

    // Enable dark mode
    await page.click('[data-theme-toggle]');
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Refresh the page
    await page.reload();

    // Dark mode should persist via localStorage
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
