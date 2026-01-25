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
