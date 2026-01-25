# bnapier.dev Implementation Plan

A comprehensive implementation plan for building Barry Napier's personal website and blog.

---

## Executive Summary

This plan outlines the complete implementation of a minimal, text-focused personal website using **Astro 5.x**, **Tailwind CSS 4.x**, **TypeScript**, and **Markdown**. The site will be deployed to **Vercel** and follows the design philosophy of leerob.com - clean, content-first, with no visual clutter.

**Current State:** Empty repository with only a README.md
**Target:** Fully functional personal site with blog at bnapier.dev

---

## Phase Overview

| Phase | Description | Steps | Complexity |
|-------|-------------|-------|------------|
| 1 | Project Initialization | 4 | Low-Medium |
| 2 | Design System & Styling | 2 | Medium |
| 3 | Content Collections | 2 | Medium |
| 4 | Layout System | 2 | Medium |
| 5 | Components | 4 | Low-Medium |
| 6 | Pages | 6 | Low-Medium |
| 7 | RSS & Utilities | 2 | Low-Medium |
| 8 | Static Assets | 1 | Low |
| 9 | Final Polish | 2 | Low |
| 10 | Deployment | 1 | Low |

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

| Package | Purpose |
|---------|---------|
| `@tailwindcss/vite` | Tailwind 4.x Vite plugin (replaces deprecated @astrojs/tailwind) |
| `tailwindcss` | Tailwind CSS 4.x core |
| `@astrojs/sitemap` | Auto-generate sitemap.xml |
| `@astrojs/rss` | Generate RSS feed |
| `sanitize-html` | Sanitize HTML content in RSS feed |

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

  integrations: [
    sitemap(),
  ],

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
@import "tailwindcss";

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
.shiki, .shiki span {
  color: var(--shiki-light) !important;
  background-color: var(--shiki-light-bg) !important;
}

.dark .shiki, .dark .shiki span {
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
title: "Post Title"
date: 2025-01-25
description: "Brief description"
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
  const posts = (await getCollection('writing', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

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
│   │   ├── Footer.astro
│   │   ├── PostList.astro
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
│   │   └── utils.ts
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
├── astro.config.mjs
├── content.config.ts
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── vercel.json (optional)
└── README.md
```

---

## Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Rendering mode** | Static (default) | Content-focused blog with no dynamic data; best performance |
| **Tailwind integration** | @tailwindcss/vite plugin | Recommended for Tailwind 4.x; @astrojs/tailwind is deprecated |
| **Dark mode approach** | CSS class + localStorage | Prevents flash; supports both system preference and manual toggle |
| **Content location** | src/content.config.ts | Astro 5.x convention (not src/content/config.ts) |
| **Post routing** | [...slug].astro | Rest parameters for clean URLs without .html extensions |
| **SEO** | Custom meta tags in layout | Simple approach without additional dependencies |
| **Navigation** | Inline links + back links | Matches minimal design philosophy (no nav bar) |
| **Syntax highlighting** | Shiki (built-in) | Zero config, dual theme support, ayu-dark + github-light |
| **Vercel adapter** | None | Static sites don't need adapter; auto-detected |

---

## Potential Challenges and Mitigations

| Challenge | Mitigation |
|-----------|------------|
| Tailwind 4.x breaking changes | Use `@import "tailwindcss"` not `@tailwind` directives |
| Shiki dual theme CSS | Use provided CSS pattern with `.dark` class selector |
| Content Layer API changes | Use `post.id` not `post.slug`, `render(post)` not `post.render()` |
| Flash of incorrect theme | Use inline script in `<head>` with `is:inline` directive |
| RSS full content rendering | Start with descriptions; add full content later if needed |

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
