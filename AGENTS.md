# AGENTS.md

This file provides context for AI agents working with this codebase.

## Project Overview

Personal website and blog built with Astro, featuring writing about software engineering, AI, and design systems.

## Tech Stack

- **Framework:** Astro 5.x (Static Site Generator)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4.x
- **Testing:** Vitest (unit/integration), Playwright (E2E)
- **Deployment:** Vercel

## Commands

### Development

```bash
npm run dev        # Start dev server at localhost:4321
npm run preview    # Preview production build
```

### Build

```bash
npm run build      # Production build to dist/
npm run check      # TypeScript type checking
```

### Testing

```bash
npm test           # Run unit tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run with coverage report
npm run test:e2e   # Run Playwright E2E tests
```

### Code Quality

```bash
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format with Prettier
npm run format:check # Check formatting
```

## Architecture

```
src/
├── components/    # Reusable Astro components
│   ├── BackLink.astro
│   ├── Footer.astro
│   ├── PostList.astro
│   └── ThemeToggle.astro
├── content/       # Content collections (Markdown)
│   └── writing/   # Blog posts
├── layouts/       # Page layouts
│   ├── Base.astro # Main layout with head, nav, footer
│   └── Post.astro # Blog post layout
├── lib/           # Utility functions
│   └── utils.ts   # Date formatting, slugify, reading time
├── pages/         # File-based routing
│   ├── index.astro
│   ├── 404.astro
│   ├── now.astro
│   ├── projects.astro
│   ├── rss.xml.ts
│   └── writing/
└── styles/
    └── global.css # Design tokens & Tailwind utilities

tests/
├── integration/   # API and data integration tests
└── e2e/          # Playwright browser tests
```

## Content Schema

Blog posts in `src/content/writing/` use this frontmatter:

```yaml
---
title: 'Post Title' # Required
date: 2025-01-15 # Required, YYYY-MM-DD
description: 'Short summary' # Required, for SEO
featured: false # Optional, highlights on homepage
draft: false # Optional, excludes from production
---
```

## Key Patterns

### Adding a New Blog Post

1. Create `src/content/writing/your-post-slug.md`
2. Add required frontmatter (title, date, description)
3. Write content in Markdown
4. Run `npm run build` to verify

### Adding a New Component

1. Create in `src/components/`
2. Use `.astro` extension
3. Import in layouts/pages as needed
4. Add tests if component has logic

### Modifying Styles

- Global tokens in `src/styles/global.css`
- Use Tailwind classes inline
- Dark mode: use `dark:` prefix or CSS variables

## Testing Guidelines

- **Unit tests:** Test pure functions in `src/lib/`
- **Integration tests:** Test content processing, RSS generation
- **E2E tests:** Test user flows, navigation, accessibility

Coverage target: 80% for `src/lib/**/*.ts`

## CI/CD

GitHub Actions runs on every PR:

1. Linting (`npm run lint`)
2. Format check (`npm run format:check`)
3. Type checking (`astro check`)
4. Unit tests with coverage
5. E2E tests on Chromium
6. Production build verification

## Common Issues

### Build Fails

- Run `npm run check` to see TypeScript errors
- Check for missing frontmatter in content files

### Tests Fail

- Run `npm run test:watch` to debug
- E2E tests need `npm run build` first

### Style Issues

- Run `npm run lint:fix && npm run format`
