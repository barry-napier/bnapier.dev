---
title: 'The AI Code Review Loop'
date: 2026-02-03
description: 'A new workflow is emerging: AI reviewing AI-generated code before humans ever see it. This changes everything about how we think about code review.'
featured: true
draft: false
---

We spent years optimising code review. Smaller PRs. Better tooling. Clearer guidelines. Review checklists. The goal was always the same: reduce the cognitive load on human reviewers so they could focus on what matters—architecture, logic, edge cases.

Then AI started writing code, and the bottleneck shifted.

The problem isn't human reviewers anymore. It's the quality of AI-generated code hitting their queue. And a new workflow is emerging to fix it: AI reviewing AI code before humans ever see it.

## The Slop Problem

AI writes fast. Really fast. But speed has a cost.

Anyone who's used Cursor, Claude Code, or Copilot has seen the patterns: comments explaining obvious code, defensive programming that defends against nothing, type coercion that papers over design problems, and that particular brand of verbosity that screams "I was generated, not written."

The industry has a word for this: slop.

Slop isn't broken code. It works. It passes tests. But it accumulates. Each unnecessary null check, each redundant comment, each over-engineered abstraction adds friction. Code review becomes archaeology—sifting through generated debris to find the actual logic.

Lee Robinson from Vercel [recently shared](https://x.com/leerob/status/2018456023145820461) a workflow that addresses this directly:

> Before pushing a PR, ask the agent to break your changes into a series of commits for easier review. You can even stack skills like:
>
> 1. /code-review
> 2. /simplify
> 3. /deslop
> 4. /commit-pr

This isn't just a productivity hack. It's a fundamental shift in how we think about AI-assisted development.

## The Stack

Let's break down what each step actually does.

### /code-review — The Adversarial Pass

The first step is asking AI to review its own work, but with a different persona: the skeptical senior engineer.

This isn't as paradoxical as it sounds. When you generate code, the AI is optimising for "solve the problem." When you ask it to review, it's optimising for "find issues." Different objectives surface different concerns.

The review pass catches:

- Logic errors the generation pass missed
- Security issues (SQL injection, XSS, auth bypasses)
- Performance problems (N+1 queries, unnecessary re-renders)
- Violations of patterns established elsewhere in the codebase

One developer [put it well](https://x.com/RoyalB88/status/2016195321139696071): "It's remarkably good at catching 'oh wait, I forgot to handle the null case' before you even open a PR."

### /simplify — The Reduction Pass

AI tends toward verbosity. It's trained on millions of examples, and those examples include a lot of enterprise code with every pattern under the sun.

The simplify pass asks a simple question: can we get the same result with less code?

This often reveals that the generated solution was solving a more complex problem than you actually have. Three helper functions collapse into one. An abstraction layer disappears because you're only ever going to have one implementation. Defensive code goes away because the types already guarantee safety.

The result isn't just fewer lines—it's clearer intent.

### /deslop — The Cleanup Pass

This is where you strip the AI fingerprints. The telltale signs that code was generated rather than written:

- Comments that explain what the code does instead of why
- Overly defensive try/catch blocks around code that can't fail
- Type assertions that exist because the AI wasn't sure, not because they're necessary
- Logging statements sprinkled everywhere "just in case"
- Magic numbers accompanied by comments explaining they're magic numbers

The goal is code that looks like a human wrote it thoughtfully, not code that looks like a human prompted for it quickly.

### /commit-pr — The Structure Pass

Finally, break the changes into logical commits. This serves two purposes:

1. **Easier review**: Reviewers can step through changes incrementally
2. **Better git history**: Each commit tells a coherent story

AI is surprisingly good at this. It can identify which changes are refactoring, which are new features, which are bug fixes, and structure commits accordingly.

## The Meta-Question

Here's what's interesting: if AI can review code, simplify it, clean it up, and structure it for review—what exactly is the human reviewer's job?

The answer: judgment.

AI can identify patterns. It can flag potential issues. It can even fix many of them. What it can't do is understand context that lives outside the codebase:

- Business constraints that make "suboptimal" code the right choice
- Team dynamics that favour certain patterns over others
- Long-term architectural vision that this change might conflict with
- Intuition about what's going to cause problems six months from now

The human reviewer's job shifts from "find bugs" to "apply judgment." That's a better use of human attention.

## The Tooling Landscape

This workflow started with Cursor's custom commands, but it's spreading fast.

CodeRabbit [just launched](https://x.com/coderabbitai/status/2018363134206177370) a plugin for Claude Code that reviews code as you write it. The pitch: catch issues before you even create a PR.

Multiple teams are building in-IDE review tools that run immediately after AI generates code. The goal is the same: create a quality gate between generation and commit.

Santiago Valdarrama [outlined eight rules](https://x.com/svpino) for improving AI coding agents, including dependency checks, security scanning, and architecture validation. These rules work across Claude Code, Cursor, and VS Code.

The pattern emerging is clear: don't trust AI-generated code by default. Validate it with AI before validating it with humans.

## Making It Work

If you want to adopt this workflow, start simple:

**1. Add a review step to your flow**

Before you commit anything AI-generated, ask the AI to review it. Use a different prompt than you used to generate. Be specific about what you want checked.

**2. Create project rules**

Document your patterns. Your naming conventions. Your architectural boundaries. AI follows rules better than it infers patterns.

As [one developer noted](https://x.com/AShah460/status/1994565176507642315): "Once your app grows beyond a few pages and >5K LOC, start asking the model to document project-level rules around patterns." These rules load into the system prompt for all future work.

**3. Timebox the cleanup**

The /simplify and /deslop passes can become perfectionist rabbit holes. Set a limit. Two passes maximum. Ship good enough, not perfect.

**4. Review the reviews**

At least initially, check what the AI flagged versus what you would have flagged. Calibrate your prompts based on false positives and misses.

## The Bigger Picture

This workflow is a stopgap. It exists because AI-generated code isn't good enough to trust directly, but it's too useful to abandon.

The interesting question is what happens as models improve. Does the review loop tighten until it's milliseconds of self-correction during generation? Does it expand into full-blown multi-agent systems where specialist AIs handle review, security, and architecture?

For now, the practical answer is: AI writes code, AI reviews code, humans apply judgment. It's not the final form of AI-assisted development, but it's a better workflow than what most teams are doing today.

The code review process we spent years optimising? It's time to optimise it again.
