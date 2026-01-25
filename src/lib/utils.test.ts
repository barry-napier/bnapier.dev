import { describe, it, expect } from 'vitest';
// These imports will fail until utils.ts is implemented (TDD red phase)
// import { formatDate, formatDateShort, slugify, getReadingTime } from './utils';

describe('formatDate', () => {
  it.todo('formats date in long format');
  it.todo('handles different months correctly');
});

describe('formatDateShort', () => {
  it.todo('formats date in short format');
});

describe('slugify', () => {
  it.todo('converts text to URL-safe slug');
  it.todo('removes special characters');
  it.todo('handles multiple spaces');
});

describe('getReadingTime', () => {
  it.todo('calculates reading time for short content');
  it.todo('calculates reading time for long content');
  it.todo('rounds up to nearest minute');
});
