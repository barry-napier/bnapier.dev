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
