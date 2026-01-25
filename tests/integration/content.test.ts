import { describe, it } from 'vitest';

describe('Content Collections', () => {
  describe('posts collection', () => {
    it.todo('returns all published posts');
    it.todo('filters out draft posts in production');
    it.todo('sorts posts by date descending');
  });

  describe('post schema validation', () => {
    it.todo('validates required frontmatter fields');
    it.todo('rejects posts without title');
    it.todo('rejects posts without date');
    it.todo('accepts posts with optional description');
  });
});
