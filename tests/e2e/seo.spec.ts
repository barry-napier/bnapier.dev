import { test, expect } from '@playwright/test';

test.describe('SEO Meta Tags', () => {
  test('homepage has correct meta tags', async ({ page }) => {
    await page.goto('/');

    // Title
    await expect(page).toHaveTitle('Barry Napier');

    // Description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /Personal website and blog/i);
  });

  test.skip('writing page has correct meta tags', async ({ page }) => {
    await page.goto('/writing');

    await expect(page).toHaveTitle(/Writing/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
  });

  test.skip('blog post has correct meta tags', async ({ page }) => {
    await page.goto('/writing/building-in-public');

    // Title should include post title
    await expect(page).toHaveTitle(/Building in Public/);

    // OG tags for social sharing
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Building in Public/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');
  });

  test.skip('each page has canonical URL', async ({ page }) => {
    await page.goto('/writing');

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /bnapier\.dev\/writing/);
  });
});
