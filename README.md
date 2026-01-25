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

## Development

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed implementation strategy.

## License

MIT
