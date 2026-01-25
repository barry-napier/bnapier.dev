---
title: "Is Your Codebase Ready for AI Agents?"
date: 2025-01-15
description: "A comprehensive framework for evaluating and improving your codebase's readiness for AI agent-assisted development, with detailed criteria across 9 pillars."
featured: true
draft: false
---

AI agents are no longer a distant future—they're here, writing code, executing tasks, and interacting with our systems. But most codebases weren't designed with AI agents in mind. As these tools become more prevalent, the question isn't whether to prepare for them, but how to systematically evaluate and improve your readiness.

This article presents a comprehensive Agent Readiness Assessment framework—a structured approach to evaluating your codebase across nine pillars of engineering excellence.

## The Assessment Framework

The framework operates across four evaluation phases, examining your codebase against criteria organized into maturity levels:

| Level | Name | Description |
|-------|------|-------------|
| 1 | Functional | Basic tooling exists—linting, types, tests, README |
| 2 | Documented | AGENTS.md, pre-commit hooks, environment templates, issue templates |
| 3 | Standardized | Strict mode, CI/CD, coverage thresholds, CODEOWNERS, E2E tests |
| 4 | Optimized | Tracing, health checks, SAST, parallel tests, feature flags |

Each level builds on the previous. You can't achieve Level 3 without passing at least 80% of Level 2 criteria. This gating ensures foundational practices are in place before advancing.

## The Nine Pillars

### Pillar 1: Style & Validation

Consistent code style isn't just aesthetics—it's how AI agents learn to write code that fits your codebase.

**Level 1 Criteria:**
- **L1-SV-01: Linter Configured** — ESLint, Biome, Pylint, RuboCop, or golangci-lint
- **L1-SV-02: Type Checker Enabled** — TypeScript with strict mode, mypy, or Pyright
- **L1-SV-03: Code Formatter Configured** — Prettier, Biome, Black, or rustfmt

**Level 2 Criteria:**
- **L2-SV-04: Pre-commit Hooks** — Husky, pre-commit, or lefthook configured
- **L2-SV-05: Lint Command in Scripts** — `npm run lint` or equivalent documented

**Level 3 Criteria:**
- **L3-SV-06: Strict TypeScript Mode** — All strict flags enabled: `strict`, `noImplicitAny`, `strictNullChecks`, `noImplicitReturns`
- **L3-SV-07: Framework-Specific Strict Mode** — Angular `strictTemplates`, React strict mode, etc.
- **L3-SV-08: ESLint Extends Recommended** — Using `eslint:recommended` and framework-specific configs
- **L3-SV-09: Lint Runs in CI** — Automated enforcement on every PR
- **L3-SV-10: Framework ESLint Configured** — Angular ESLint, eslint-plugin-react, etc.

```typescript
// tsconfig.json - Agent-friendly TypeScript config
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Pillar 2: Build System

A predictable build system is essential for agents to verify their changes work correctly.

**Level 1 Criteria:**
- **L1-BS-01: Build Command Exists** — `npm run build`, `make build`, or implicit `cargo build`
- **L1-BS-02: Dependencies Pinned** — Lockfile present (package-lock.json, yarn.lock, pnpm-lock.yaml)

**Level 2 Criteria:**
- **L2-BS-03: Build Documented** — README or AGENTS.md explains how to build
- **L2-BS-04: Dev Command Exists** — `scripts.dev`, `scripts.start`, or `scripts.serve`

**Level 3 Criteria:**
- **L3-BS-05: CI/CD Configured** — GitHub Actions, GitLab CI, Jenkins, or equivalent
- **L3-BS-06: Build Runs in CI** — Automated build verification on every commit
- **L3-BS-07: Cache Enabled in CI** — Dependency caching for faster builds

**Level 4 Criteria:**
- **L4-BS-08: Build Budgets Configured** — Size limits and performance budgets enforced

### Pillar 3: Testing

Tests are how agents verify their changes don't break existing functionality. Without them, agents are flying blind.

**Level 1 Criteria:**
- **L1-TS-01: Unit Tests Exist** — At least 5 test files (`.spec.ts`, `.test.ts`, `_test.go`, etc.)
- **L1-TS-02: Test Runner Configured** — Jest, Vitest, Karma, pytest, or equivalent
- **L1-TS-03: Test Command Exists** — `npm test` or equivalent documented

**Level 2 Criteria:**
- **L2-TS-04: Tests Documented** — README explains how to run tests
- **L2-TS-05: Test Watch Available** — `test:watch` script for rapid feedback

**Level 3 Criteria:**
- **L3-TS-06: Integration Tests Exist** — Tests in `integration/` or `e2e/` directories
- **L3-TS-07: E2E Tests Configured** — Playwright or Cypress with test files
- **L3-TS-08: Coverage Configured** — Coverage reporting enabled
- **L3-TS-09: Coverage Threshold >= 70%** — Minimum coverage enforced
- **L3-TS-10: Tests Run in CI** — Automated test execution on every PR

**Level 4 Criteria:**
- **L4-TS-11: Parallel Tests Enabled** — Tests run concurrently for faster feedback

### Pillar 4: Documentation

Documentation serves dual audiences: human developers and AI agents. Both need clear, structured information.

**Level 1 Criteria:**
- **L1-DC-01: README Exists** — README.md present
- **L1-DC-02: README Has Content** — More than 100 characters of useful information

**Level 2 Criteria:**
- **L2-DC-03: AGENTS.md Exists** — AI agent-specific documentation
- **L2-DC-04: CONTRIBUTING.md Exists** — Contribution guidelines documented
- **L2-DC-05: Installation Documented** — Getting started instructions present

**Level 3 Criteria:**
- **L3-DC-06: AGENTS.md Has Commands** — Build, test, and lint commands in code blocks
- **L3-DC-07: AGENTS.md Has Architecture** — Project structure documented
- **L3-DC-08: ADRs Exist** — Architecture Decision Records in `docs/adr/`
- **L3-DC-09: Changelog Maintained** — CHANGELOG.md updated recently

The AGENTS.md file is crucial for AI agents. Here's a minimal template:

```markdown
# AGENTS.md

## Build
\`\`\`bash
npm run build
\`\`\`

## Test
\`\`\`bash
npm test
\`\`\`

## Lint
\`\`\`bash
npm run lint
\`\`\`

## Architecture
- `/src/components` - React components
- `/src/lib` - Utility functions
- `/src/pages` - Route handlers
```

### Pillar 5: Development Environment

Reproducible environments mean agents can set up and work in your codebase reliably.

**Level 1 Criteria:**
- **L1-DE-01: Runtime Version Specified** — `.nvmrc`, `.node-version`, `.tool-versions`, or `engines` field

**Level 2 Criteria:**
- **L2-DE-02: Environment Template Exists** — `.env.example` with required variables
- **L2-DE-03: IDE Settings Shared** — `.vscode/settings.json` or `.editorconfig`

**Level 3 Criteria:**
- **L3-DE-04: Devcontainer Configured** — `.devcontainer/devcontainer.json` present
- **L3-DE-05: Devcontainer Has Setup** — `postCreateCommand` for automatic setup
- **L3-DE-06: Docker Support** — Dockerfile or docker-compose.yml present
- **L3-DE-07: Setup Script Exists** — `make setup` or `scripts/setup.sh`

### Pillar 6: Debugging & Observability

When things go wrong, agents need visibility into what happened and why.

**Level 1 Criteria:**
- **L1-DO-01: Logging Exists** — Basic console logging or logging library used

**Level 2 Criteria:**
- **L2-DO-02: Logging Library Used** — Pino, Winston, Bunyan, or equivalent

**Level 3 Criteria:**
- **L3-DO-03: Structured Logging** — JSON-formatted log output
- **L3-DO-04: Error Tracking Integration** — Sentry, Bugsnag, or Rollbar configured

**Level 4 Criteria:**
- **L4-DO-05: Distributed Tracing** — OpenTelemetry or equivalent
- **L4-DO-06: Health Endpoints** — `/health` or `/ready` endpoints present

### Pillar 7: Security

Security practices protect against both human and agent-introduced vulnerabilities.

**Level 1 Criteria:**
- **L1-SC-01: No Secrets in Code** — No hardcoded API keys, AWS keys, or private keys
- **L1-SC-02: Gitignore Configured** — `.env` and `node_modules` excluded

**Level 2 Criteria:**
- **L2-SC-03: SECURITY.md Exists** — Security policy documented
- **L2-SC-04: License File Exists** — LICENSE file present

**Level 3 Criteria:**
- **L3-SC-05: CODEOWNERS Defined** — CODEOWNERS file present
- **L3-SC-06: CODEOWNERS Covers Critical Paths** — Source and CI files protected
- **L3-SC-07: Secret Scanning Configured** — Gitleaks, TruffleHog, or CI scanning
- **L3-SC-08: Dependency Scanning Configured** — Dependabot, Renovate, or Snyk

**Level 4 Criteria:**
- **L4-SC-09: SAST Enabled** — CodeQL, SonarQube, or Semgrep in CI
- **L4-SC-10: Container Scanning** — Trivy, Grype, or Snyk container scanning

### Pillar 8: Task Discovery

Structured task management helps agents understand what work needs to be done and how to approach it.

**Level 2 Criteria:**
- **L2-TD-01: Issue Templates Exist** — `.github/ISSUE_TEMPLATE/` configured
- **L2-TD-02: Bug Report Template** — Structured bug reporting
- **L2-TD-03: Feature Request Template** — Structured feature requests

**Level 3 Criteria:**
- **L3-TD-04: PR Template Exists** — `.github/PULL_REQUEST_TEMPLATE.md`
- **L3-TD-05: PR Template Has Checklist** — Checkbox items for verification

### Pillar 9: Product & Experimentation

Advanced teams enable controlled experimentation and data-driven decisions.

**Level 3 Criteria:**
- **L3-PE-01: Analytics Instrumented** — Segment, Amplitude, GA4, Mixpanel, or PostHog
- **L3-PE-02: Feature Flags Available** — LaunchDarkly, Unleash, Split, or Flagsmith

**Level 4 Criteria:**
- **L4-PE-03: A/B Testing Framework** — Experiment framework configured

## Scoring Methodology

Calculate your score for each level:

```
Level N Score = (PASS count / (PASS + FAIL count)) × 100
```

Framework-specific criteria (like Angular strict templates) are marked N/A for other project types and excluded from calculations.

**Gating rules:**
- Level 2 unlocks when Level 1 ≥ 80%
- Level 3 unlocks when Level 2 ≥ 80%
- Level 4 unlocks when Level 3 ≥ 80%

Your current level is the highest unlocked level where you achieve ≥ 80% pass rate.

## The Assessment Report

When you run a full assessment, generate a structured report like this:

```json
{
  "repository": "my-project",
  "evaluatedAt": "2025-01-15T10:00:00Z",
  "projectType": "node",
  "currentLevel": 2,
  "currentLevelName": "Documented",
  "overallScore": "32/52",
  "levels": {
    "level1": { "passed": 8, "total": 10, "percentage": 80, "status": "COMPLETE" },
    "level2": { "passed": 12, "total": 15, "percentage": 80, "status": "COMPLETE" },
    "level3": { "passed": 10, "total": 20, "percentage": 50, "status": "IN_PROGRESS" },
    "level4": { "passed": 2, "total": 7, "percentage": 29, "status": "LOCKED" }
  },
  "pillars": {
    "styleValidation": { "passed": 6, "total": 10, "percentage": 60 },
    "buildSystem": { "passed": 5, "total": 8, "percentage": 63 },
    "testing": { "passed": 7, "total": 11, "percentage": 64 },
    "documentation": { "passed": 5, "total": 9, "percentage": 56 },
    "devEnvironment": { "passed": 4, "total": 7, "percentage": 57 },
    "observability": { "passed": 2, "total": 6, "percentage": 33 },
    "security": { "passed": 5, "total": 10, "percentage": 50 },
    "taskDiscovery": { "passed": 3, "total": 5, "percentage": 60 },
    "experimentation": { "passed": 0, "total": 3, "percentage": 0 }
  },
  "topRecommendations": [
    "1. Create AGENTS.md documenting core commands",
    "2. Enable TypeScript strict mode in tsconfig.json",
    "3. Add pre-commit hooks with Husky",
    "4. Configure coverage thresholds >= 70%",
    "5. Add CODEOWNERS file for critical paths"
  ]
}
```

## Quick Wins for Each Level

### Reaching Level 1 (Functional)
1. Add ESLint with a recommended config
2. Enable TypeScript strict mode
3. Configure Prettier for formatting
4. Write at least 5 unit tests
5. Create a README with basic instructions

### Reaching Level 2 (Documented)
1. Create AGENTS.md with build/test/lint commands
2. Set up Husky for pre-commit hooks
3. Add `.env.example` for environment variables
4. Create issue templates in `.github/ISSUE_TEMPLATE/`
5. Document installation steps in README

### Reaching Level 3 (Standardized)
1. Configure all TypeScript strict flags
2. Set up GitHub Actions for CI/CD
3. Add E2E tests with Playwright or Cypress
4. Configure coverage thresholds at 70%+
5. Create CODEOWNERS for critical paths

### Reaching Level 4 (Optimized)
1. Add OpenTelemetry for distributed tracing
2. Implement `/health` endpoints
3. Enable CodeQL or SonarQube scanning
4. Configure parallel test execution
5. Integrate a feature flag system

## Running Your Own Assessment

To evaluate your repository, examine each criterion methodically:

1. **Phase 1: Project Detection** — Identify project type (Node, Python, Go, etc.)
2. **Phase 2: Criteria Evaluation** — Check each criterion, noting PASS/FAIL/N/A with evidence
3. **Phase 3: Level Calculation** — Calculate percentages and apply gating rules
4. **Phase 4: Generate Report** — Output structured findings and recommendations

For each criterion, provide specific evidence:
- PASS: "Found `.eslintrc.js` at project root"
- FAIL: "No coverage threshold configured in jest.config.js"
- N/A: "Angular-specific criterion, project is Node/Express"

## Looking Ahead

The shift toward agent-ready codebases isn't just about accommodating AI tools—it's about good engineering practice. The same qualities that make code accessible to AI agents make it more maintainable, testable, and understandable for human developers too.

Start with Level 1 fundamentals. They're quick wins that immediately improve your development workflow. Then work through Level 2 documentation—especially AGENTS.md—to give AI agents the context they need. By Level 3, you'll have a standardized, well-tested codebase that any agent can work with confidently.

The teams that invest in agent readiness now will find themselves working more effectively with AI tools as they continue to evolve.
