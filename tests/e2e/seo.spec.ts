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

  test('writing page has correct meta tags', async ({ page }) => {
    await page.goto('/writing');

    await expect(page).toHaveTitle(/Writing/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
  });

  test('blog post has correct meta tags', async ({ page }) => {
    await page.goto('/writing/context-engineering');

    // Title should include post title
    await expect(page).toHaveTitle(/Context Engineering/);

    // OG tags for social sharing
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Context Engineering/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');
  });

  test('each page has canonical URL', async ({ page }) => {
    await page.goto('/writing');

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /\/writing/);
  });

  test('RSS autodiscovery link exists', async ({ page }) => {
    await page.goto('/');

    const rssLink = page.locator('link[type="application/rss+xml"]');
    await expect(rssLink).toHaveAttribute('href', '/rss.xml');
  });
});
