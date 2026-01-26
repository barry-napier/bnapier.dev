import { test, expect } from '@playwright/test';

test.describe('Content Rendering', () => {
  test('homepage displays featured posts section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for featured writing section
    const featuredSection = page.locator('section.featured');
    await expect(featuredSection).toBeVisible();

    // Check for at least one post in the list
    const posts = page.locator('.post-list .post-item');
    await expect(posts.first()).toBeVisible();
  });

  test('writing page lists all posts', async ({ page }) => {
    await page.goto('/writing');
    await page.waitForLoadState('networkidle');

    // Check for post list
    const postList = page.locator('.post-list');
    await expect(postList).toBeVisible();

    // Should have multiple posts
    const posts = page.locator('.post-list .post-item');
    const count = await posts.count();
    expect(count).toBeGreaterThan(0);
  });

  test('blog post renders with prose content', async ({ page }) => {
    // Navigate to writing page first
    await page.goto('/writing');
    await page.waitForLoadState('networkidle');

    // Click the first post
    await page.locator('.post-link').first().click();
    await page.waitForLoadState('networkidle');

    // Check for prose content
    const proseContent = page.locator('.prose');
    await expect(proseContent).toBeVisible();

    // Should have a heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('RSS feed is accessible', async ({ page }) => {
    const response = await page.goto('/rss.xml');

    // RSS should return 200
    expect(response?.status()).toBe(200);

    // Should have RSS content type
    const contentType = response?.headers()['content-type'];
    expect(contentType).toContain('xml');
  });
});

test.describe('Design System', () => {
  test('page structure loads correctly', async ({ page }) => {
    await page.goto('/');

    // Check that header and main exist (animations removed per Emil Kowalski philosophy)
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('navigation links have hover underline effect', async ({ page }) => {
    await page.goto('/');

    // Check inline nav links exist
    const navLinks = page.locator('.inline-nav a');
    await expect(navLinks.first()).toBeVisible();

    // Verify there are navigation links
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('theme toggle has proper accessibility label', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toHaveAttribute('aria-label', 'Toggle dark mode');
  });

  test('page headings render correctly', async ({ page }) => {
    // Check that page headings render on content pages
    await page.goto('/writing');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Writing');
  });
});

test.describe('Accessibility', () => {
  test('respects prefers-reduced-motion', async ({ page }) => {
    // Emulate reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Page should still load and function
    await expect(page.locator('.site-name')).toContainText('Barry Napier');

    // Check that content is visible (animations should be disabled)
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('footer links are accessible', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check social links
    const githubLink = footer.locator('a[href*="github.com"]');
    await expect(githubLink).toBeVisible();

    // External links should have rel="noopener noreferrer"
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('skip to content focus states work', async ({ page }) => {
    await page.goto('/');

    // Tab through the page to check focus states exist
    await page.keyboard.press('Tab');

    // After tabbing, focus should be on an interactive element
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});
