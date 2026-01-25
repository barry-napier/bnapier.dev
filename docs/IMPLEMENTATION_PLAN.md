# bnapier.dev Implementation Plan

A comprehensive implementation plan for building Barry Napier's personal website and blog.

---

## Executive Summary

This plan outlines the complete implementation of a minimal, text-focused personal website using **Astro 5.x**, **Tailwind CSS 4.x**, **TypeScript**, and **Markdown**. The site will be deployed to **Vercel** and follows the design philosophy of leerob.com - clean, content-first, with no visual clutter.

**Current State:** Empty repository with only a README.md
**Target:** Fully functional personal site with blog at bnapier.dev

---

## Phase Overview

| Phase | Description                | Steps | Complexity |
| ----- | -------------------------- | ----- | ---------- |
| 1     | Project Initialization     | 4     | Low-Medium |
| 1.5   | **Testing Infrastructure** | 3     | Medium     |
| 2     | Design System & Styling    | 2     | Medium     |
| 3     | Content Collections        | 2     | Medium     |
| 4     | Layout System              | 2     | Medium     |
| 5     | Components                 | 4     | Low-Medium |
| 6     | Pages                      | 6     | Low-Medium |
| 7     | RSS & Utilities            | 2     | Low-Medium |
| 8     | Static Assets              | 1     | Low        |
| 9     | Final Polish               | 2     | Low        |
| 10    | Deployment                 | 1     | Low        |

---

## Test-Driven Development (TDD) Strategy

### Philosophy

This project follows a **pragmatic TDD approach** - write tests first where they provide clear value, but don't over-test static content or trivial markup. The testing pyramid guides our effort allocation:

```
        ┌─────────────┐
        │    E2E      │  ← Few, critical user journeys
        │  (Playwright)│
       ┌┴─────────────┴┐
       │  Integration   │  ← Component rendering, content collections
       │   (Vitest)     │
      ┌┴───────────────┴┐
      │      Unit        │  ← Utilities, pure functions, schemas
      │    (Vitest)      │
      └──────────────────┘
```

### Testing Tools

| Tool                    | Purpose                  | Why                                                                   |
| ----------------------- | ------------------------ | --------------------------------------------------------------------- |
| **Vitest**              | Unit & Integration tests | Vite-native, fast, ESM-first, works with Astro's `getViteConfig()`    |
| **Playwright**          | E2E tests                | Cross-browser, reliable, excellent for testing dark mode & navigation |
| **Astro Container API** | Component tests          | Render Astro components in isolation (experimental but stable)        |
| **happy-dom**           | DOM environment          | Lightweight DOM implementation for Vitest                             |

### What to Test (and What Not To)

#### ✅ DO Test

| Layer           | What                       | Example                                                   |
| --------------- | -------------------------- | --------------------------------------------------------- |
| **Unit**        | Utility functions          | `formatDate()`, `slugify()`, `getReadingTime()`           |
| **Unit**        | Content schema validation  | Zod schema rejects invalid frontmatter                    |
| **Integration** | Content collection queries | `getCollection()` returns expected posts                  |
| **Integration** | RSS feed generation        | Valid XML structure, correct items                        |
| **Integration** | Component rendering        | BackLink renders correct href, PostList renders all posts |
| **E2E**         | Critical user journeys     | Homepage → Writing → Post → Back navigation               |
| **E2E**         | Dark mode persistence      | Toggle, refresh, verify state                             |
| **E2E**         | SEO meta tags              | Correct title, description, OG tags per page              |

#### ❌ DON'T Test

- Static prose content (the "Now" page text)
- Tailwind class names (trust the framework)
- Third-party integrations (sitemap generation)
- Visual styling (that's what eyes are for)

### TDD Workflow

For each feature, follow this cycle:

```
1. Write failing test (Red)
   └─→ Test describes expected behavior

2. Write minimal code (Green)
   └─→ Just enough to pass the test

3. Refactor (Refactor)
   └─→ Clean up while tests stay green

4. Commit
   └─→ Atomic commits: "test: add X" then "feat: implement X"
```

**Example: Adding `formatDate` utility**

```bash
# 1. Write the test first
# src/lib/utils.test.ts
test('formatDate returns formatted date string', () => {
  const date = new Date('2025-01-25');
  expect(formatDate(date)).toBe('January 25, 2025');
});

# 2. Run test (fails - function doesn't exist)
npm run test

# 3. Implement the function
# src/lib/utils.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

# 4. Run test (passes)
npm run test

# 5. Commit
git commit -m "test: add formatDate test"
git commit -m "feat: implement formatDate utility"
```

### Test File Structure

```
bnapier.dev/
├── src/
│   ├── lib/
│   │   ├── utils.ts
│   │   └── utils.test.ts          # Unit tests co-located
│   ├── components/
│   │   ├── BackLink.astro
│   │   └── BackLink.test.ts       # Component tests co-located
│   └── pages/
│       └── rss.xml.ts
├── tests/
│   ├── integration/
│   │   ├── content.test.ts        # Content collection tests
│   │   └── rss.test.ts            # RSS feed tests
│   └── e2e/
│       ├── navigation.spec.ts     # User journey tests
│       ├── dark-mode.spec.ts      # Theme persistence tests
│       └── seo.spec.ts            # Meta tag verification
├── vitest.config.ts
└── playwright.config.ts
```

### Configuration Files

#### Vitest Configuration

**File: `vitest.config.ts`**

```typescript
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    // Use happy-dom for faster tests (lighter than jsdom)
    environment: 'happy-dom',

    // Include test files
    include: ['src/**/*.test.ts', 'tests/integration/**/*.test.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      include: ['src/lib/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },

    // Global test utilities
    globals: true,
  },
});
```

#### Playwright Configuration

**File: `playwright.config.ts`**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Reporter
  reporter: process.env.CI ? 'github' : 'list',

  // Shared settings
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewport
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Start dev server before tests
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Sample Tests

#### Unit Test: Utilities

**File: `src/lib/utils.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate, formatDateShort, slugify, getReadingTime } from './utils';

describe('formatDate', () => {
  it('formats date in long format', () => {
    const date = new Date('2025-01-25');
    expect(formatDate(date)).toBe('January 25, 2025');
  });

  it('handles different months correctly', () => {
    const date = new Date('2025-12-01');
    expect(formatDate(date)).toBe('December 1, 2025');
  });
});

describe('formatDateShort', () => {
  it('formats date in short format', () => {
    const date = new Date('2025-01-25');
    expect(formatDateShort(date)).toBe('Jan 25, 2025');
  });
});

describe('slugify', () => {
  it('converts text to URL-safe slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify("What's New?")).toBe('whats-new');
  });

  it('handles multiple spaces', () => {
    expect(slugify('Too   Many   Spaces')).toBe('too-many-spaces');
  });
});

describe('getReadingTime', () => {
  it('calculates reading time for short content', () => {
    const content = 'word '.repeat(200); // 200 words = 1 min
    expect(getReadingTime(content)).toBe('1 min read');
  });

  it('calculates reading time for longer content', () => {
    const content = 'word '.repeat(600); // 600 words = 3 min
    expect(getReadingTime(content)).toBe('3 min read');
  });
});
```

#### Integration Test: Content Collections

**File: `tests/integration/content.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { getCollection } from 'astro:content';

describe('Content Collections', () => {
  let posts: Awaited<ReturnType<typeof getCollection>>;

  beforeAll(async () => {
    posts = await getCollection('writing');
  });

  it('loads writing collection', () => {
    expect(posts).toBeDefined();
    expect(Array.isArray(posts)).toBe(true);
  });

  it('each post has required frontmatter', () => {
    for (const post of posts) {
      expect(post.data.title).toBeDefined();
      expect(post.data.date).toBeInstanceOf(Date);
    }
  });

  it('filters out draft posts when requested', async () => {
    const published = await getCollection('writing', ({ data }) => !data.draft);
    const drafts = posts.filter((p) => p.data.draft);

    expect(published.length).toBe(posts.length - drafts.length);
  });

  it('featured posts are a subset of all posts', async () => {
    const featured = await getCollection('writing', ({ data }) => data.featured);

    expect(featured.length).toBeLessThanOrEqual(posts.length);
    featured.forEach((post) => {
      expect(post.data.featured).toBe(true);
    });
  });
});
```

#### Integration Test: RSS Feed

**File: `tests/integration/rss.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';

describe('RSS Feed', () => {
  it('generates valid RSS XML', async () => {
    // Import the RSS handler
    const { GET } = await import('../../src/pages/rss.xml');

    const response = await GET({
      site: new URL('https://bnapier.dev'),
    } as any);

    const xml = await response.text();

    // Check XML structure
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('<channel>');
    expect(xml).toContain("<title>Barry Napier's Blog</title>");
  });

  it('includes all published posts', async () => {
    const { GET } = await import('../../src/pages/rss.xml');
    const { getCollection } = await import('astro:content');

    const response = await GET({
      site: new URL('https://bnapier.dev'),
    } as any);

    const xml = await response.text();
    const posts = await getCollection('writing', ({ data }) => !data.draft);

    // Each post title should appear in the feed
    for (const post of posts) {
      expect(xml).toContain(`<title>${post.data.title}</title>`);
    }
  });
});
```

#### Component Test: BackLink

**File: `src/components/BackLink.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import BackLink from './BackLink.astro';

describe('BackLink Component', () => {
  it('renders with correct href and label', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(BackLink, {
      props: { href: '/writing', label: 'Writing' },
    });

    expect(result).toContain('href="/writing"');
    expect(result).toContain('Writing');
  });

  it('includes arrow icon', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(BackLink, {
      props: { href: '/', label: 'Home' },
    });

    // SVG arrow should be present
    expect(result).toContain('<svg');
    expect(result).toContain('</svg>');
  });
});
```

#### E2E Test: Navigation Journey

**File: `tests/e2e/navigation.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage to writing to post and back', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Barry Napier/);

    // Navigate to writing
    await page.click('a[href="/writing"]');
    await expect(page).toHaveURL('/writing');
    await expect(page.locator('h1')).toContainText('Writing');

    // Click first post
    const firstPost = page.locator('article a').first();
    const postTitle = await firstPost.textContent();
    await firstPost.click();

    // Verify on post page
    await expect(page.locator('h1')).toContainText(postTitle!);

    // Navigate back
    await page.click('a:has-text("Writing")');
    await expect(page).toHaveURL('/writing');
  });

  test('all main navigation links work', async ({ page }) => {
    const routes = ['/', '/writing', '/projects', '/now'];

    for (const route of routes) {
      await page.goto(route);
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
    }
  });

  test('404 page displays for invalid routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.locator('h1')).toContainText('404');
  });
});
```

#### E2E Test: Dark Mode

**File: `tests/e2e/dark-mode.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('defaults to system preference', async ({ page }) => {
    // Emulate dark mode preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('toggle switches theme', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const toggle = page.locator('#theme-toggle');

    // Get initial state
    const initiallyDark = await html.evaluate((el) => el.classList.contains('dark'));

    // Click toggle
    await toggle.click();

    // Verify theme changed
    if (initiallyDark) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }
  });

  test('persists preference across page reload', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('#theme-toggle');
    const html = page.locator('html');

    // Toggle to dark mode
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');
    await toggle.click();

    // Verify dark class
    const isDark = await html.evaluate((el) => el.classList.contains('dark'));

    // Reload page
    await page.reload();

    // Verify persistence
    const stillDark = await html.evaluate((el) => el.classList.contains('dark'));

    expect(stillDark).toBe(isDark);
  });

  test('persists preference across navigation', async ({ page }) => {
    await page.goto('/');

    // Set to dark
    await page.evaluate(() => localStorage.setItem('theme', 'dark'));
    await page.goto('/');

    // Navigate to another page
    await page.click('a[href="/writing"]');

    // Verify still dark
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });
});
```

#### E2E Test: SEO

**File: `tests/e2e/seo.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test.describe('SEO Meta Tags', () => {
  test('homepage has correct meta tags', async ({ page }) => {
    await page.goto('/');

    // Title
    await expect(page).toHaveTitle('Barry Napier');

    // Meta description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /personal website/i);

    // Open Graph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', 'Barry Napier');

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'website');
  });

  test('blog post has article meta tags', async ({ page }) => {
    // Navigate to a post
    await page.goto('/writing');
    await page.locator('article a').first().click();

    // Should have article type
    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');

    // Should have published time
    const publishedTime = page.locator('meta[property="article:published_time"]');
    await expect(publishedTime).toBeAttached();
  });

  test('canonical URLs are correct', async ({ page }) => {
    const routes = ['/', '/writing', '/projects', '/now'];

    for (const route of routes) {
      await page.goto(route);

      const canonical = page.locator('link[rel="canonical"]');
      const href = await canonical.getAttribute('href');

      expect(href).toContain('bnapier.dev');
      expect(href).toContain(route === '/' ? '' : route);
    }
  });

  test('RSS autodiscovery link exists', async ({ page }) => {
    await page.goto('/');

    const rssLink = page.locator('link[type="application/rss+xml"]');
    await expect(rssLink).toHaveAttribute('href', '/rss.xml');
  });
});
```

### Package.json Test Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest",
    "test:unit": "vitest run --coverage",
    "test:watch": "vitest watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test:unit && npm run build && npm run test:e2e"
  }
}
```

### Test Dependencies to Install

```bash
# Vitest and utilities
npm install -D vitest happy-dom @vitest/coverage-v8

# Playwright
npm install -D @playwright/test
npx playwright install

# Type definitions
npm install -D @types/node
```

### CI/CD Integration

**File: `.github/workflows/test.yml`**

```yaml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run check

      - name: Unit & Integration tests
        run: npm run test:unit

      - name: Build
        run: npm run build

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: E2E tests
        run: npm run test:e2e --project=chromium

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

### TDD by Phase

| Phase   | Tests to Write First                                     |
| ------- | -------------------------------------------------------- |
| **1.5** | Setup test infrastructure, write utility tests (failing) |
| **2**   | No tests needed (styling)                                |
| **3**   | Content schema validation tests                          |
| **4**   | Component render tests for layouts                       |
| **5**   | Component tests for BackLink, PostList                   |
| **6**   | E2E navigation tests                                     |
| **7**   | RSS feed integration tests                               |
| **8**   | No tests needed (static assets)                          |
| **9**   | Run full test suite                                      |
| **10**  | E2E tests in CI pipeline                                 |

---

## Phase 1: Project Initialization and Core Configuration

### Step 1.1: Initialize Astro 5.x Project

**Complexity:** Low
**Dependencies:** None

Create a new Astro project in the existing repository.

```bash
# From /home/user/bnapier.dev
npm create astro@latest . -- --template minimal --typescript strict --no-install
```

**Key Configuration Decisions:**

- Use `--template minimal` for a clean starting point
- Use `--typescript strict` as recommended in Astro 5.x
- The minimal template provides: `astro.config.mjs`, `tsconfig.json`, `package.json`, and basic structure

**Files Created:**

- `astro.config.mjs`
- `tsconfig.json`
- `package.json`
- `src/pages/index.astro`

---

### Step 1.2: Install Dependencies

**Complexity:** Low
**Dependencies:** Step 1.1

```bash
npm install
npm install @tailwindcss/vite tailwindcss
npm install @astrojs/sitemap @astrojs/rss
npm install sanitize-html
npm install -D @types/sanitize-html
```

**Package Breakdown:**

| Package             | Purpose                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `@tailwindcss/vite` | Tailwind 4.x Vite plugin (replaces deprecated @astrojs/tailwind) |
| `tailwindcss`       | Tailwind CSS 4.x core                                            |
| `@astrojs/sitemap`  | Auto-generate sitemap.xml                                        |
| `@astrojs/rss`      | Generate RSS feed                                                |
| `sanitize-html`     | Sanitize HTML content in RSS feed                                |

---

### Step 1.3: Configure Astro

**Complexity:** Medium
**Dependencies:** Step 1.2

**File: `astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bnapier.dev',

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'ayu-dark',
      },
    },
  },
});
```

**Key Decisions:**

1. **Static output mode** (default): Content-focused blog with no dynamic data
2. **Dual Shiki themes**: Supports both light and dark mode syntax highlighting
3. **Tailwind via Vite plugin**: Recommended approach for Tailwind 4.x
4. **No Vercel adapter needed**: Static sites deploy without an adapter

---

### Step 1.4: Configure TypeScript

**Complexity:** Low
**Dependencies:** Step 1.1

**File: `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"]
    }
  }
}
```

---

## Phase 1.5: Testing Infrastructure

### Step 1.5.1: Install Testing Dependencies

**Complexity:** Low
**Dependencies:** Step 1.2

```bash
# Vitest and utilities
npm install -D vitest happy-dom @vitest/coverage-v8

# Playwright
npm install -D @playwright/test
npx playwright install
```

---

### Step 1.5.2: Configure Vitest

**Complexity:** Medium
**Dependencies:** Step 1.5.1

**File: `vitest.config.ts`**

```typescript
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts', 'tests/integration/**/*.test.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/lib/**/*.ts'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
```

**Key Points:**

- Uses `getViteConfig()` from Astro for proper integration
- `happy-dom` is lighter than jsdom
- Coverage thresholds enforce quality

---

### Step 1.5.3: Configure Playwright

**Complexity:** Medium
**Dependencies:** Step 1.5.1

**File: `playwright.config.ts`**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Key Points:**

- Tests across 3 desktop browsers + mobile
- Auto-starts preview server before E2E tests
- Captures traces on failure for debugging

---

## Phase 2: Design System and Styling Foundation

### Step 2.1: Create Global Styles

**Complexity:** Medium
**Dependencies:** Step 1.3

**File: `src/styles/global.css`**

This file establishes:

- CSS custom properties for colors (light/dark modes)
- Typography settings (system font stacks)
- Spacing scale (xs through 3xl)
- Layout constraints (640px max-width)
- Base element styling
- Code block styling with Shiki dual-theme support
- Prose content styling for markdown

**Critical CSS Patterns:**

```css
@import 'tailwindcss';

@theme {
  /* Design tokens registered as Tailwind utilities */
  --color-text: #1a1a1a;
  --color-background: #ffffff;
  --color-accent: #0066cc;
  /* ... etc */
}

.dark {
  /* Dark mode overrides */
  --color-text: #e5e5e5;
  --color-background: #0a0a0a;
  /* ... etc */
}

/* Shiki dual theme support */
.shiki,
.shiki span {
  color: var(--shiki-light) !important;
  background-color: var(--shiki-light-bg) !important;
}

.dark .shiki,
.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}
```

---

### Step 2.2: Create Tailwind Configuration

**Complexity:** Low
**Dependencies:** Step 2.1

**File: `tailwind.config.mjs`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
};
```

**Note:** Tailwind 4.x uses CSS-first configuration. Most customization happens in `global.css` via `@theme`. This file mainly enables `darkMode: 'class'` for manual toggling.

---

## Phase 3: Content Collections Setup

### Step 3.1: Define Content Collections Schema

**Complexity:** Medium
**Dependencies:** Phase 1

**File: `src/content.config.ts`** (Note: Astro 5.x location, not src/content/config.ts)

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
```

**Key Astro 5.x Changes:**

1. File location: `src/content.config.ts`
2. Uses `glob()` loader instead of `type: 'content'`
3. `z.coerce.date()` handles both string and Date inputs

---

### Step 3.2: Create Sample Content

**Complexity:** Low
**Dependencies:** Step 3.1

**Directory:** `src/content/writing/`

Create sample posts with proper frontmatter:

```markdown
---
title: 'Post Title'
date: 2025-01-25
description: 'Brief description'
featured: true
draft: false
---

Content here...
```

Include the three sample posts from the spec:

- `context-engineering.md`
- `ai-agent-readiness.md`
- `research-plan-implement.md`

---

## Phase 4: Layout System

### Step 4.1: Create Base Layout

**Complexity:** Medium
**Dependencies:** Phase 2, Phase 3

**File: `src/layouts/Base.astro`**

Responsibilities:

- HTML document shell
- SEO meta tags (title, description, Open Graph, Twitter)
- RSS autodiscovery link
- Favicon links
- Inline theme initialization script (prevents flash)
- Minimal header with site name and theme toggle
- Footer component slot

**Critical: Theme Initialization Script**

```html
<script is:inline>
  const getTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  const theme = getTheme();
  document.documentElement.classList.toggle('dark', theme === 'dark');
</script>
```

The `is:inline` directive ensures this runs immediately before render.

---

### Step 4.2: Create Post Layout

**Complexity:** Medium
**Dependencies:** Step 4.1

**File: `src/layouts/Post.astro`**

Extends Base layout with:

- Back link to /writing
- Post title as h1
- Formatted publication date
- Prose container for markdown content
- Article semantic markup

---

## Phase 5: Components

### Step 5.1: ThemeToggle Component

**Complexity:** Medium
**Dependencies:** Phase 2

**File: `src/components/ThemeToggle.astro`**

Features:

- Sun/Moon icons (swap visibility based on current theme)
- Click handler toggles `.dark` class on `<html>`
- Persists preference to localStorage
- Listens for system preference changes

---

### Step 5.2: BackLink Component

**Complexity:** Low
**Dependencies:** None

**File: `src/components/BackLink.astro`**

Simple navigational component:

- Arrow icon + label
- Styled as muted text
- Props: `href`, `label`

---

### Step 5.3: PostList Component

**Complexity:** Low
**Dependencies:** Phase 3

**File: `src/components/PostList.astro`**

Features:

- Accepts array of posts
- Displays title and formatted date
- Optional description display
- Responsive layout (stacked on mobile, inline on desktop)

---

### Step 5.4: Footer Component

**Complexity:** Low
**Dependencies:** None

**File: `src/components/Footer.astro`**

Contains:

- Copyright with current year
- Social links (GitHub, Twitter/X, LinkedIn)
- RSS link

---

## Phase 6: Pages

### Step 6.1: Homepage (`/`)

**Complexity:** Medium
**Dependencies:** Phase 4, Phase 5

**File: `src/pages/index.astro`**

Content:

- Personal introduction paragraph
- Featured posts section (filtered by `featured: true`)
- Connect section with social links
- Inline navigation to /writing, /projects, /now

---

### Step 6.2: Writing Index Page (`/writing`)

**Complexity:** Low
**Dependencies:** Phase 4, Phase 5

**File: `src/pages/writing/index.astro`**

Features:

- Back link to home
- Page title and description
- Full post list sorted by date (newest first)
- Filters out drafts

---

### Step 6.3: Individual Post Page (`/writing/[slug]`)

**Complexity:** Medium
**Dependencies:** Phase 3, Phase 4

**File: `src/pages/writing/[...slug].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import Post from '@layouts/Post.astro';

export async function getStaticPaths() {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<Post post={post}>
  <Content />
</Post>
```

**Key Astro 5.x Patterns:**

- `post.id` instead of `post.slug`
- `render(post)` instead of `post.render()`
- `[...slug].astro` for clean URLs

---

### Step 6.4: Projects Page (`/projects`)

**Complexity:** Low
**Dependencies:** Phase 4

**File: `src/pages/projects.astro`**

Static page with:

- Project list (can be hardcoded or from data file)
- Each project: name, description, tech stack, links
- Simple list format (not cards)

---

### Step 6.5: Now Page (`/now`)

**Complexity:** Low
**Dependencies:** Phase 4

**File: `src/pages/now.astro`**

Static page with:

- Last updated date
- Current work section
- Learning section
- Life section
- Link to nownownow.com explanation

---

### Step 6.6: 404 Page

**Complexity:** Low
**Dependencies:** Phase 4

**File: `src/pages/404.astro`**

Simple error page with:

- Large 404 heading
- Brief message
- Link back to home

---

## Phase 7: RSS Feed and Utilities

### Step 7.1: Create RSS Feed Endpoint

**Complexity:** Medium
**Dependencies:** Phase 3

**File: `src/pages/rss.xml.ts`**

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: "Barry Napier's Blog",
    description: 'Thoughts on software development, technology, and more.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || '',
      link: `/writing/${post.id}`,
    })),
    trailingSlash: false,
    customData: `<language>en-us</language>`,
  });
}
```

---

### Step 7.2: Create Utility Functions

**Complexity:** Low
**Dependencies:** None

**File: `src/lib/utils.ts`**

Utilities for:

- `formatDate(date)` - Long format for post pages
- `formatDateShort(date)` - Short format for lists
- `getReadingTime(content)` - Optional reading time estimate
- `slugify(text)` - String to URL-safe slug

---

## Phase 8: Static Assets

### Step 8.1: Create Public Assets

**Complexity:** Low
**Dependencies:** None

**Files to create:**

1. **`public/robots.txt`**

   ```
   User-agent: *
   Allow: /

   Sitemap: https://bnapier.dev/sitemap-index.xml
   ```

2. **`public/favicon.svg`**
   - Simple SVG with "BN" initials on blue background

3. **`public/favicon.ico`**
   - 32x32 ICO for legacy browser support

---

## Phase 9: Final Configuration and Polish

### Step 9.1: Update Package.json

**Complexity:** Low
**Dependencies:** All previous phases

Ensure scripts section includes:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

---

### Step 9.2: Update README

**Complexity:** Low
**Dependencies:** All previous phases

Update README.md with:

- Tech stack overview
- Getting started commands
- Project structure
- Content creation guide
- Deployment info

---

## Phase 10: Deployment Configuration

### Step 10.1: Vercel Configuration

**Complexity:** Low
**Dependencies:** None

**Deployment Steps:**

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Vercel automatically detects Astro and configures build
4. Configure custom domain (bnapier.dev) in Vercel dashboard
5. Enable automatic deployments on push

**Optional: `vercel.json`**

```json
{
  "framework": "astro"
}
```

---

## Implementation Dependency Graph

```
Phase 1: Project Init
    │
    ├── 1.1 Init Astro ─────────────────────────────────┐
    │       │                                           │
    │       v                                           │
    ├── 1.2 Install Dependencies ───────────────────────┤
    │       │                                           │
    │       v                                           │
    ├── 1.3 Configure Astro ────────────────────────────┤
    │       │                                           │
    │       v                                           │
    └── 1.4 Configure TypeScript                        │
            │                                           │
            v                                           │
Phase 1.5: Testing Infrastructure                       │
    │                                                   │
    ├── 1.5.1 Install Test Dependencies                 │
    │       │                                           │
    │       v                                           │
    ├── 1.5.2 Configure Vitest                          │
    │       │                                           │
    │       v                                           │
    └── 1.5.3 Configure Playwright                      │
            │                                           │
            v                                           │
Phase 2: Styling ───────────────────────────────────────┤
    │                                                   │
    ├── 2.1 Global Styles                               │
    │       │                                           │
    │       v                                           │
    └── 2.2 Tailwind Config                             │
            │                                           │
            v                                           │
Phase 3: Content ───────────────────────────────────────┤
    │                                                   │
    ├── 3.1 Content Schema                              │
    │       │                                           │
    │       v                                           │
    └── 3.2 Sample Content                              │
            │                                           │
            v                                           │
Phase 4: Layouts ◄──────────────────────────────────────┤
    │                                                   │
    ├── 4.1 Base Layout                                 │
    │       │                                           │
    │       v                                           │
    └── 4.2 Post Layout ◄────── Phase 5.1 ThemeToggle   │
            │                          │                │
            v                          v                │
Phase 5: Components                                     │
    │                                                   │
    ├── 5.1 ThemeToggle                                 │
    ├── 5.2 BackLink                                    │
    ├── 5.3 PostList                                    │
    └── 5.4 Footer                                      │
            │                                           │
            v                                           │
Phase 6: Pages ◄────────────────────────────────────────┘
    │
    ├── 6.1 Homepage
    ├── 6.2 Writing Index
    ├── 6.3 Post Page
    ├── 6.4 Projects
    ├── 6.5 Now
    └── 6.6 404 Page
            │
            v
Phase 7: RSS & Utils
    │
    ├── 7.1 RSS Feed
    └── 7.2 Utilities
            │
            v
Phase 8: Static Assets
    │
    └── 8.1 Public Assets
            │
            v
Phase 9: Polish
    │
    ├── 9.1 Package.json
    └── 9.2 README
            │
            v
Phase 10: Deployment
    │
    └── 10.1 Vercel Config
```

---

## Testing and Validation Checkpoints

### After Phase 1 (Project Init)

- [ ] `npm run dev` starts without errors
- [ ] TypeScript compilation passes (`npm run check`)
- [ ] Basic Astro page renders at localhost:4321

### After Phase 1.5 (Testing Infrastructure)

- [ ] `npm run test` runs Vitest without errors
- [ ] `npm run test:e2e` runs Playwright without errors
- [ ] Coverage report generates correctly
- [ ] First failing test written for utilities (TDD red phase)

### After Phase 2 (Styling)

- [ ] Tailwind classes apply correctly
- [ ] CSS custom properties work
- [ ] No build warnings for styles

### After Phase 3 (Content)

- [ ] Content collection loads without errors
- [ ] Sample post schema validates
- [ ] `getCollection('writing')` returns posts

### After Phase 4 (Layouts)

- [ ] Base layout renders with SEO tags
- [ ] View page source shows correct meta tags
- [ ] Dark mode class toggle works

### After Phase 5 (Components)

- [ ] Theme toggle persists preference to localStorage
- [ ] BackLink navigates correctly
- [ ] PostList displays posts with dates

### After Phase 6 (Pages)

- [ ] All 5 main routes work (/, /writing, /projects, /now, /404)
- [ ] Dynamic post routes work (/writing/[slug])
- [ ] Navigation between pages functions
- [ ] 404 page shows for invalid routes

### After Phase 7 (RSS & Utils)

- [ ] /rss.xml returns valid XML
- [ ] RSS validates at https://validator.w3.org/feed/
- [ ] Utility functions work correctly

### After Phase 8 (Static Assets)

- [ ] Favicon displays in browser tab
- [ ] robots.txt accessible at /robots.txt

### After Phase 9 (Polish)

- [ ] `npm run build` completes successfully
- [ ] `npm run preview` serves built site
- [ ] No TypeScript errors

### After Phase 10 (Deployment)

- [ ] Site deploys to Vercel
- [ ] Custom domain works
- [ ] HTTPS enabled
- [ ] Sitemap accessible at /sitemap-index.xml

---

## Final File Structure

```
bnapier.dev/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── BackLink.astro
│   │   ├── BackLink.test.ts       # Component test
│   │   ├── Footer.astro
│   │   ├── PostList.astro
│   │   ├── PostList.test.ts       # Component test
│   │   └── ThemeToggle.astro
│   ├── content/
│   │   └── writing/
│   │       ├── context-engineering.md
│   │       ├── ai-agent-readiness.md
│   │       └── research-plan-implement.md
│   ├── layouts/
│   │   ├── Base.astro
│   │   └── Post.astro
│   ├── lib/
│   │   ├── utils.ts
│   │   └── utils.test.ts          # Unit tests
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── index.astro
│   │   ├── now.astro
│   │   ├── projects.astro
│   │   ├── rss.xml.ts
│   │   └── writing/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   └── styles/
│       └── global.css
├── tests/
│   ├── integration/
│   │   ├── content.test.ts        # Content collection tests
│   │   └── rss.test.ts            # RSS feed tests
│   └── e2e/
│       ├── navigation.spec.ts     # User journey tests
│       ├── dark-mode.spec.ts      # Theme persistence tests
│       └── seo.spec.ts            # Meta tag verification
├── .github/
│   └── workflows/
│       └── test.yml               # CI pipeline
├── astro.config.mjs
├── content.config.ts
├── tailwind.config.mjs
├── tsconfig.json
├── vitest.config.ts               # Unit/integration test config
├── playwright.config.ts           # E2E test config
├── package.json
├── vercel.json (optional)
└── README.md
```

---

## Architectural Decisions

| Decision                 | Choice                      | Rationale                                                         |
| ------------------------ | --------------------------- | ----------------------------------------------------------------- |
| **Rendering mode**       | Static (default)            | Content-focused blog with no dynamic data; best performance       |
| **Tailwind integration** | @tailwindcss/vite plugin    | Recommended for Tailwind 4.x; @astrojs/tailwind is deprecated     |
| **Dark mode approach**   | CSS class + localStorage    | Prevents flash; supports both system preference and manual toggle |
| **Content location**     | src/content.config.ts       | Astro 5.x convention (not src/content/config.ts)                  |
| **Post routing**         | [...slug].astro             | Rest parameters for clean URLs without .html extensions           |
| **SEO**                  | Custom meta tags in layout  | Simple approach without additional dependencies                   |
| **Navigation**           | Inline links + back links   | Matches minimal design philosophy (no nav bar)                    |
| **Syntax highlighting**  | Shiki (built-in)            | Zero config, dual theme support, ayu-dark + github-light          |
| **Vercel adapter**       | None                        | Static sites don't need adapter; auto-detected                    |
| **Unit test framework**  | Vitest                      | Vite-native, fast, integrates with Astro via `getViteConfig()`    |
| **E2E test framework**   | Playwright                  | Cross-browser, reliable, built-in web server management           |
| **DOM environment**      | happy-dom                   | Lighter than jsdom, sufficient for component tests                |
| **Test co-location**     | Unit tests alongside source | Easier to maintain, find related tests, TDD workflow              |
| **Component testing**    | Astro Container API         | Official Astro approach for rendering components in tests         |
| **Coverage threshold**   | 80% for utilities           | Pragmatic target; don't test trivial markup                       |

---

## Potential Challenges and Mitigations

| Challenge                        | Mitigation                                                        |
| -------------------------------- | ----------------------------------------------------------------- |
| Tailwind 4.x breaking changes    | Use `@import "tailwindcss"` not `@tailwind` directives            |
| Shiki dual theme CSS             | Use provided CSS pattern with `.dark` class selector              |
| Content Layer API changes        | Use `post.id` not `post.slug`, `render(post)` not `post.render()` |
| Flash of incorrect theme         | Use inline script in `<head>` with `is:inline` directive          |
| RSS full content rendering       | Start with descriptions; add full content later if needed         |
| Astro Container API experimental | API is stable enough for testing; pin Astro version if needed     |
| Vitest + Astro configuration     | Use `getViteConfig()` from Astro, not plain `defineConfig`        |
| E2E tests need built site        | Playwright `webServer` config auto-runs `npm run preview`         |
| Component tests import issues    | Ensure `vitest.config.ts` uses Astro's vite config helper         |
| Flaky dark mode E2E tests        | Clear localStorage in `beforeEach`, use explicit waits            |

---

## Critical Implementation Files

These files are the core of the implementation and require careful attention:

1. **`astro.config.mjs`** - Central configuration for Astro, Tailwind, Shiki themes, and sitemap

2. **`src/content.config.ts`** - Content collections schema using Astro 5.x Content Layer API

3. **`src/layouts/Base.astro`** - Main layout with SEO meta tags and theme initialization

4. **`src/styles/global.css`** - Design system with CSS custom properties and Tailwind 4.x @theme

5. **`src/pages/writing/[...slug].astro`** - Dynamic route demonstrating Astro 5.x patterns

---

## Next Steps

After this plan is approved, implementation should proceed in phase order. Each phase builds on the previous, so completing phases sequentially ensures a stable foundation.

**Recommended implementation approach:**

1. Complete each phase fully before moving to the next
2. Run validation checkpoints after each phase
3. Commit after each phase completion
4. Test both light and dark modes throughout
5. Verify mobile responsiveness at each page completion
