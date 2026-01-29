import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('RSS Feed', () => {
  const distPath = join(process.cwd(), 'dist');
  const rssPath = join(distPath, 'rss.xml');
  let rssContent: string;

  beforeAll(() => {
    // Build the site to generate RSS feed
    execSync('npm run build', { stdio: 'pipe' });

    if (existsSync(rssPath)) {
      rssContent = readFileSync(rssPath, 'utf-8');
    }
  });

  it('generates valid XML', () => {
    expect(rssContent).toBeDefined();
    expect(rssContent).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    expect(rssContent).toContain('<rss');
    expect(rssContent).toContain('</rss>');
  });

  it('includes correct channel metadata', () => {
    expect(rssContent).toContain('<title>Barry Napier</title>');
    expect(rssContent).toContain(
      '<description>Writing about software engineering, AI, and technology.</description>'
    );
    expect(rssContent).toContain('<link>https://bnapier.dev/</link>');
    expect(rssContent).toContain('<language>en-us</language>');
  });

  it('includes all published posts', () => {
    // We have 5 published posts
    expect(rssContent).toContain('Prompting Techniques: A Practical Guide');
    expect(rssContent).toContain('Do We Still Need Figma?');
    expect(rssContent).toContain('Context Engineering: The New Frontier of AI Development');
    expect(rssContent).toContain('Is Your Codebase Ready for AI Agents?');
    expect(rssContent).toContain('Research, Plan, Implement: A Framework for Technical Decisions');
  });

  it('excludes draft posts', () => {
    // Extract all items - count should match published posts (5)
    const itemMatches = rssContent.match(/<item>/g);
    expect(itemMatches).toHaveLength(5);
  });

  it('orders items by date descending', () => {
    // Find the positions of each post title in the RSS feed
    const post0Pos = rssContent.indexOf('Prompting Techniques'); // Jan 27
    const post1Pos = rssContent.indexOf('Do We Still Need Figma'); // Jan 25
    const post2Pos = rssContent.indexOf('Context Engineering'); // Jan 20
    const post3Pos = rssContent.indexOf('Is Your Codebase Ready for AI Agents'); // Jan 15
    const post4Pos = rssContent.indexOf('Research, Plan, Implement'); // Jan 10

    // Most recent should appear first
    expect(post0Pos).toBeLessThan(post1Pos);
    expect(post1Pos).toBeLessThan(post2Pos);
    expect(post2Pos).toBeLessThan(post3Pos);
    expect(post3Pos).toBeLessThan(post4Pos);
  });

  it('sanitizes HTML content', () => {
    // Content should not contain dangerous script tags
    expect(rssContent).not.toContain('<script');
    expect(rssContent).not.toMatch(/<script[^>]*>/);

    // Should contain content (some HTML is allowed)
    expect(rssContent).toContain('<content:encoded>');
  });

  it('includes correct post links', () => {
    expect(rssContent).toContain('/writing/ai-design-systems-figma/');
    expect(rssContent).toContain('/writing/context-engineering/');
    expect(rssContent).toContain('/writing/ai-agent-readiness/');
    expect(rssContent).toContain('/writing/research-plan-implement/');
  });
});
