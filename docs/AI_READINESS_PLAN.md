# AI Agent Readiness Implementation Plan

> A comprehensive roadmap to bring bnapier.dev to Level 4 (Optimized) AI Agent Readiness

## Current Assessment

Based on the [AI Agent Readiness Framework](/writing/ai-agent-readiness), here's the current state:

| Level | Status | Score | Gate Status |
|-------|--------|-------|-------------|
| Level 1 (Functional) | Partial | 70% | IN PROGRESS |
| Level 2 (Documented) | Partial | 50% | BLOCKED |
| Level 3 (Standardized) | Partial | 60% | BLOCKED |
| Level 4 (Optimized) | Minimal | 10% | LOCKED |

**Current Level: 1 (Functional)** - Need 80% to unlock Level 2

### Strengths
- TypeScript strict mode enabled via `astro/tsconfigs/strict`
- Comprehensive test suite (Unit, Integration, E2E)
- 80% coverage thresholds configured
- Full CI/CD pipeline with GitHub Actions
- Good README documentation

### Critical Gaps
- No linter (ESLint/Biome)
- No formatter (Prettier/Biome)
- No pre-commit hooks
- No AGENTS.md
- No runtime version pinning
- No issue/PR templates

---

## Implementation Roadmap

### Phase 1: Achieve Level 1 (Functional) - 100%

**Goal:** Pass all Level 1 criteria to unlock Level 2

#### 1.1 Style & Validation (L1-SV-01 to L1-SV-03)

##### Install and Configure ESLint + Prettier

```bash
# Install dependencies
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-astro
npm install -D prettier prettier-plugin-astro prettier-plugin-tailwindcss
```

**Create `eslint.config.js`:**
```javascript
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.astro'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
```

**Create `.prettierrc`:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

**Create `.prettierignore`:**
```
dist/
.astro/
node_modules/
package-lock.json
coverage/
playwright-report/
```

**Add scripts to `package.json`:**
```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.ts,.astro",
    "lint:fix": "eslint . --ext .js,.ts,.astro --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

##### Verify TypeScript Strict Mode (L1-SV-02)
- **Status:** PASS - Already using `astro/tsconfigs/strict`

#### 1.2 Build System (L1-BS-01 to L1-BS-02)

##### Verify Build Commands (L1-BS-01)
- **Status:** PASS - `npm run build` exists

##### Verify Dependencies Pinned (L1-BS-02)
- **Status:** PASS - `package-lock.json` present

#### 1.3 Testing (L1-TS-01 to L1-TS-03)

##### Verify Unit Tests Exist (L1-TS-01)
- **Status:** PASS - 5+ test files present

##### Verify Test Runner (L1-TS-02)
- **Status:** PASS - Vitest configured

##### Verify Test Command (L1-TS-03)
- **Status:** PASS - `npm test` exists

#### 1.4 Documentation (L1-DC-01 to L1-DC-02)

##### Verify README (L1-DC-01, L1-DC-02)
- **Status:** PASS - README.md with comprehensive content

#### 1.5 Development Environment (L1-DE-01)

##### Add Runtime Version File

**Create `.nvmrc`:**
```
20
```

**Create `.node-version`:**
```
20
```

#### 1.6 Debugging & Observability (L1-DO-01)

##### Basic Logging
- **Status:** PASS - Console logging exists in development

#### 1.7 Security (L1-SC-01 to L1-SC-02)

##### Verify No Secrets in Code (L1-SC-01)
- **Status:** PASS - No hardcoded secrets detected

##### Verify .gitignore (L1-SC-02)
- **Status:** PASS - Comprehensive .gitignore

---

### Phase 2: Achieve Level 2 (Documented) - 80%+

**Goal:** Pass 80% of Level 2 criteria to unlock Level 3

#### 2.1 Style & Validation (L2-SV-04 to L2-SV-05)

##### Install Pre-commit Hooks (L2-SV-04)

```bash
npm install -D husky lint-staged
npx husky init
```

**Create `.husky/pre-commit`:**
```bash
npx lint-staged
```

**Create `.lintstagedrc.json`:**
```json
{
  "*.{js,ts,astro}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

##### Document Lint Command (L2-SV-05)
- **Status:** Will be PASS after adding `npm run lint`

#### 2.2 Build System (L2-BS-03 to L2-BS-04)

##### Document Build Process (L2-BS-03)
- **Status:** PASS - README documents build

##### Verify Dev Command (L2-BS-04)
- **Status:** PASS - `npm run dev` exists

#### 2.3 Testing (L2-TS-04 to L2-TS-05)

##### Document Tests (L2-TS-04)
- **Status:** PASS - README documents testing

##### Verify Test Watch (L2-TS-05)
- **Status:** PASS - `npm run test:watch` exists

#### 2.4 Documentation (L2-DC-03 to L2-DC-05)

##### Create AGENTS.md (L2-DC-03)

**Create `AGENTS.md`:**
```markdown
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
title: "Post Title"           # Required
date: 2025-01-15              # Required, YYYY-MM-DD
description: "Short summary"   # Required, for SEO
featured: false               # Optional, highlights on homepage
draft: false                  # Optional, excludes from production
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
1. Type checking (`astro check`)
2. Unit tests with coverage
3. E2E tests on Chromium
4. Production build verification

## Common Issues

### Build Fails
- Run `npm run check` to see TypeScript errors
- Check for missing frontmatter in content files

### Tests Fail
- Run `npm run test:watch` to debug
- E2E tests need `npm run build` first

### Style Issues
- Run `npm run lint:fix && npm run format`
```

##### Create CONTRIBUTING.md (L2-DC-04)

**Create `CONTRIBUTING.md`:**
```markdown
# Contributing to bnapier.dev

Thank you for your interest in contributing!

## Getting Started

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Visit `http://localhost:4321`

## Development Workflow

### Before Making Changes
```bash
git checkout -b feature/your-feature
```

### Code Quality
```bash
npm run lint        # Check for issues
npm run format      # Format code
npm run check       # TypeScript check
```

### Testing
```bash
npm test            # Unit tests
npm run test:e2e    # E2E tests (requires build)
```

### Commit Guidelines
- Use clear, descriptive commit messages
- Reference issues when applicable
- Keep commits focused and atomic

## Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all checks pass
4. Request review

## Code Style

- TypeScript strict mode
- Prettier for formatting
- ESLint for linting
- Tailwind CSS for styling

## Questions?

Open an issue or reach out directly.
```

##### Verify Installation Documented (L2-DC-05)
- **Status:** PASS - README has getting started

#### 2.5 Development Environment (L2-DE-02 to L2-DE-03)

##### Create Environment Template (L2-DE-02)

**Create `.env.example`:**
```bash
# Environment Variables
# Copy to .env.local for local development

# Optional: Analytics (not currently used)
# PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Contact form (not currently used)
# PUBLIC_CONTACT_FORM_ENDPOINT=https://...
```

##### Create IDE Settings (L2-DE-03)

**Create `.vscode/settings.json`:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

**Create `.vscode/extensions.json`:**
```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss"
  ]
}
```

**Create `.editorconfig`:**
```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

#### 2.6 Security (L2-SC-03 to L2-SC-04)

##### Create SECURITY.md (L2-SC-03)

**Create `SECURITY.md`:**
```markdown
# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public issue
2. Email security concerns directly
3. Include details about the vulnerability
4. Allow reasonable time for response

## Security Measures

This site implements:
- Content Security Policy headers
- HTML sanitization for RSS feeds
- No user authentication or data storage
- Static site generation (no server-side vulnerabilities)

## Dependencies

Dependencies are reviewed regularly. We use:
- `npm audit` for vulnerability scanning
- Dependabot for automated updates (coming soon)
```

##### Add LICENSE (L2-SC-04)

**Create `LICENSE`:**
```
MIT License

Copyright (c) 2025 Barry Napier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

#### 2.7 Task Discovery (L2-TD-01 to L2-TD-03)

##### Create Issue Templates (L2-TD-01 to L2-TD-03)

**Create `.github/ISSUE_TEMPLATE/bug_report.md`:**
```markdown
---
name: Bug Report
about: Report a bug or issue
title: '[BUG] '
labels: bug
assignees: ''
---

## Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14]

## Screenshots
If applicable, add screenshots.

## Additional Context
Any other context about the problem.
```

**Create `.github/ISSUE_TEMPLATE/feature_request.md`:**
```markdown
---
name: Feature Request
about: Suggest an idea or enhancement
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

## Problem Statement
What problem does this solve?

## Proposed Solution
How would you like this to work?

## Alternatives Considered
Other approaches you've thought about.

## Additional Context
Any other information or mockups.
```

**Create `.github/ISSUE_TEMPLATE/config.yml`:**
```yaml
blank_issues_enabled: true
contact_links:
  - name: Questions
    url: https://github.com/barry-napier/bnapier.dev/discussions
    about: Ask questions in Discussions
```

---

### Phase 3: Achieve Level 3 (Standardized) - 80%+

**Goal:** Pass 80% of Level 3 criteria to unlock Level 4

#### 3.1 Style & Validation (L3-SV-06 to L3-SV-10)

##### Verify Strict TypeScript (L3-SV-06)
- **Status:** PASS - Using `astro/tsconfigs/strict`

##### Framework Strict Mode (L3-SV-07)
- **Status:** N/A - Astro doesn't have additional strict modes

##### ESLint Recommended (L3-SV-08)
- **Status:** Will be PASS after ESLint setup

##### Lint in CI (L3-SV-09)

**Update `.github/workflows/ci.yml`** to add lint job:
```yaml
lint:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    - run: npm ci
    - run: npm run lint
    - run: npm run format:check
```

#### 3.2 Build System (L3-BS-05 to L3-BS-07)

##### CI/CD Configured (L3-BS-05)
- **Status:** PASS - GitHub Actions configured

##### Build in CI (L3-BS-06)
- **Status:** PASS - Build job exists

##### Cache in CI (L3-BS-07)
- **Status:** PASS - npm cache enabled

#### 3.3 Testing (L3-TS-06 to L3-TS-10)

##### Integration Tests (L3-TS-06)
- **Status:** PASS - `tests/integration/` exists

##### E2E Tests (L3-TS-07)
- **Status:** PASS - Playwright configured

##### Coverage Configured (L3-TS-08)
- **Status:** PASS - v8 coverage enabled

##### Coverage Threshold (L3-TS-09)
- **Status:** PASS - 80% threshold set

##### Tests in CI (L3-TS-10)
- **Status:** PASS - Tests run in workflow

#### 3.4 Documentation (L3-DC-06 to L3-DC-09)

##### AGENTS.md Has Commands (L3-DC-06)
- **Status:** Will be PASS after creating AGENTS.md

##### AGENTS.md Has Architecture (L3-DC-07)
- **Status:** Will be PASS after creating AGENTS.md

##### ADRs Exist (L3-DC-08)

**Create `docs/adr/0001-use-astro-for-static-site.md`:**
```markdown
# ADR 0001: Use Astro for Static Site Generation

## Status
Accepted

## Context
Need a framework for a personal website/blog that:
- Supports Markdown content
- Has excellent performance
- Minimal JavaScript by default
- Good developer experience

## Decision
Use Astro 5.x as the static site generator.

## Consequences
- **Positive:** Zero JS by default, content collections, great DX
- **Positive:** Excellent build performance
- **Negative:** Smaller ecosystem than Next.js
- **Negative:** Less suited for highly interactive apps
```

**Create `docs/adr/0002-testing-strategy.md`:**
```markdown
# ADR 0002: Testing Strategy

## Status
Accepted

## Context
Need a testing strategy that provides confidence without over-engineering.

## Decision
- **Unit tests:** Vitest for utility functions
- **Integration tests:** Vitest for content processing
- **E2E tests:** Playwright for user flows
- **Coverage target:** 80% for src/lib/

## Consequences
- **Positive:** Fast unit tests, realistic E2E tests
- **Positive:** Catches regressions effectively
- **Negative:** E2E tests slower to run
```

##### Create CHANGELOG.md (L3-DC-09)

**Create `CHANGELOG.md`:**
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- AI Agent Readiness implementation plan

## [1.0.0] - 2025-01-15

### Added
- Initial website launch
- Blog with AI readiness, Figma, and context engineering articles
- Dark mode support with system preference detection
- RSS feed generation
- SEO optimization with meta tags
- E2E test suite with Playwright
- Unit tests with Vitest
- CI/CD pipeline with GitHub Actions
```

#### 3.5 Development Environment (L3-DE-04 to L3-DE-07)

##### Create Devcontainer (L3-DE-04, L3-DE-05)

**Create `.devcontainer/devcontainer.json`:**
```json
{
  "name": "bnapier.dev",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "astro-build.astro-vscode",
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint",
        "bradlc.vscode-tailwindcss"
      ],
      "settings": {
        "editor.formatOnSave": true
      }
    }
  },
  "postCreateCommand": "npm install",
  "forwardPorts": [4321],
  "remoteUser": "node"
}
```

##### Docker Support (L3-DE-06) - Optional for static site

**Create `Dockerfile`:**
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

##### Setup Script (L3-DE-07)

**Create `scripts/setup.sh`:**
```bash
#!/usr/bin/env bash
set -e

echo "Setting up bnapier.dev development environment..."

# Check Node version
required_node="20"
current_node=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$current_node" -lt "$required_node" ]; then
  echo "Error: Node.js $required_node+ required (found v$current_node)"
  exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm ci

# Setup git hooks
echo "Setting up git hooks..."
npx husky install

# Verify setup
echo "Verifying setup..."
npm run check
npm test

echo "Setup complete! Run 'npm run dev' to start."
```

#### 3.6 Debugging & Observability (L3-DO-03, L3-DO-04)
- **Status:** N/A for static site - no server-side logging needed

#### 3.7 Security (L3-SC-05 to L3-SC-08)

##### Create CODEOWNERS (L3-SC-05, L3-SC-06)

**Create `.github/CODEOWNERS`:**
```
# Default owner
* @barry-napier

# Critical paths
/.github/ @barry-napier
/src/ @barry-napier
*.config.* @barry-napier
```

##### Secret Scanning (L3-SC-07) - GitHub has built-in scanning

##### Dependency Scanning (L3-SC-08)

**Create `.github/dependabot.yml`:**
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
    commit-message:
      prefix: "deps"
```

#### 3.8 Task Discovery (L3-TD-04, L3-TD-05)

##### Create PR Template (L3-TD-04, L3-TD-05)

**Create `.github/PULL_REQUEST_TEMPLATE.md`:**
```markdown
## Summary
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring
- [ ] Other

## Testing
- [ ] Unit tests pass (`npm test`)
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] Tested locally

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed changes
- [ ] Updated documentation if needed
- [ ] No breaking changes (or documented)
```

---

### Phase 4: Achieve Level 4 (Optimized)

**Goal:** Implement advanced practices for optimal AI agent collaboration

#### 4.1 Build System (L4-BS-08)
- **Bundle Budgets:** Not applicable for Astro static site (already optimized)

#### 4.2 Testing (L4-TS-11)
- **Status:** PASS - Playwright runs parallel by default

#### 4.3 Debugging & Observability (L4-DO-05, L4-DO-06)

##### Health Endpoints (L4-DO-06)
For static sites, this is N/A. If deploying to a platform with edge functions:

```typescript
// src/pages/api/health.ts (if using Astro SSR)
export async function GET() {
  return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

#### 4.4 Security (L4-SC-09, L4-SC-10)

##### Enable CodeQL Scanning (L4-SC-09)

**Create `.github/workflows/codeql.yml`:**
```yaml
name: CodeQL

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1' # Weekly on Monday

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: javascript-typescript
      - uses: github/codeql-action/analyze@v3
```

#### 4.5 Product & Experimentation (L4-PE-03)
- **Status:** Optional for personal blog

---

## Implementation Priority

### Immediate (Week 1) - Unlock Level 2
1. [ ] Install ESLint + Prettier
2. [ ] Create `.nvmrc` and `.node-version`
3. [ ] Create `AGENTS.md`
4. [ ] Create `.env.example`
5. [ ] Create `.vscode/settings.json` and `.editorconfig`

### Short-term (Week 2) - Complete Level 2
6. [ ] Set up Husky + lint-staged
7. [ ] Create `CONTRIBUTING.md`
8. [ ] Create `SECURITY.md` and `LICENSE`
9. [ ] Create issue templates
10. [ ] Create PR template

### Medium-term (Week 3) - Achieve Level 3
11. [ ] Add lint job to CI
12. [ ] Create ADR documents
13. [ ] Create `CHANGELOG.md`
14. [ ] Create devcontainer
15. [ ] Create `CODEOWNERS`
16. [ ] Configure Dependabot

### Long-term (Week 4+) - Reach Level 4
17. [ ] Add CodeQL scanning
18. [ ] Review and optimize

---

## Files to Create Summary

| File | Purpose | Level |
|------|---------|-------|
| `eslint.config.js` | Linting configuration | L1 |
| `.prettierrc` | Formatting configuration | L1 |
| `.prettierignore` | Formatting exclusions | L1 |
| `.nvmrc` | Node version | L1 |
| `.node-version` | Node version (alt) | L1 |
| `AGENTS.md` | AI agent documentation | L2 |
| `CONTRIBUTING.md` | Contribution guide | L2 |
| `.env.example` | Environment template | L2 |
| `.vscode/settings.json` | IDE settings | L2 |
| `.vscode/extensions.json` | IDE extensions | L2 |
| `.editorconfig` | Editor config | L2 |
| `.lintstagedrc.json` | Pre-commit config | L2 |
| `SECURITY.md` | Security policy | L2 |
| `LICENSE` | MIT license | L2 |
| `.github/ISSUE_TEMPLATE/bug_report.md` | Bug template | L2 |
| `.github/ISSUE_TEMPLATE/feature_request.md` | Feature template | L2 |
| `.github/ISSUE_TEMPLATE/config.yml` | Template config | L2 |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR template | L3 |
| `.github/CODEOWNERS` | Code ownership | L3 |
| `.github/dependabot.yml` | Dependency updates | L3 |
| `docs/adr/0001-use-astro-for-static-site.md` | Architecture decision | L3 |
| `docs/adr/0002-testing-strategy.md` | Testing decision | L3 |
| `CHANGELOG.md` | Version history | L3 |
| `.devcontainer/devcontainer.json` | Dev container | L3 |
| `Dockerfile` | Container build | L3 |
| `scripts/setup.sh` | Setup automation | L3 |
| `.github/workflows/codeql.yml` | Security scanning | L4 |

---

## Expected Outcome

After implementing this plan:

| Level | Before | After |
|-------|--------|-------|
| Level 1 | 70% | 100% |
| Level 2 | 50% | 100% |
| Level 3 | 60% | 95% |
| Level 4 | 10% | 70% |

**Final Assessment: Level 3 (Standardized)** with strong progress toward Level 4.

This codebase will be fully ready for AI agent collaboration, with clear documentation, automated quality checks, and comprehensive testing.
