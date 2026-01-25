# bnapier.dev

Personal website and blog for Barry Napier.

## Tech Stack

- **Framework:** [Astro 5.x](https://astro.build)
- **Styling:** [Tailwind CSS 4.x](https://tailwindcss.com)
- **Language:** TypeScript
- **Content:** Markdown
- **Hosting:** [Vercel](https://vercel.com)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run check
```

## Project Structure

```
bnapier.dev/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── content/         # Markdown content (blog posts)
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utility functions
│   ├── pages/           # Route pages
│   └── styles/          # Global styles
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json
```

## Creating Content

Add new blog posts to `src/content/writing/` as Markdown files with frontmatter:

```markdown
---
title: "Your Post Title"
date: 2025-01-25
description: "A brief description for SEO and post lists."
featured: false
draft: false
---

Your content here...
```

**Frontmatter fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `date` | date | Yes | Publication date (YYYY-MM-DD) |
| `description` | string | No | Brief description for SEO |
| `featured` | boolean | No | Show on homepage (default: false) |
| `draft` | boolean | No | Hide from production (default: false) |

## Testing

```bash
# Run unit and integration tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests (requires build first)
npm run build && npm run test:e2e
```

## Deployment

The site is configured for static deployment on [Vercel](https://vercel.com).

1. Push code to GitHub
2. Connect the repository to Vercel
3. Vercel auto-detects Astro and configures the build
4. Configure custom domain in Vercel dashboard

**Environment:** No environment variables required for static site.

## Development

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed implementation strategy.

## License

MIT
