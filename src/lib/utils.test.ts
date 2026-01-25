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

  it('calculates reading time for long content', () => {
    const content = 'word '.repeat(600); // 600 words = 3 min
    expect(getReadingTime(content)).toBe('3 min read');
  });

  it('rounds up to nearest minute', () => {
    const content = 'word '.repeat(250); // 250 words = 2 min (rounded up)
    expect(getReadingTime(content)).toBe('2 min read');
  });
});
