---
title: "Research, Plan, Implement: A Framework for Technical Decisions"
date: 2025-01-10
description: "A systematic approach to making technical decisions that balances thoroughness with pragmatism."
featured: false
draft: false
---

Technical decisions compound. A choice made early in a project echoes through every subsequent line of code. Yet we often make these decisions too quickly, relying on familiarity or trends rather than systematic analysis.

Over the years, I've developed a simple framework that helps navigate technical decisions: Research, Plan, Implement. It's not revolutionary, but it's effective.

## Research: Understand the Landscape

Before committing to any direction, invest time in understanding your options. This doesn't mean exhaustive analysis—it means sufficient analysis.

### Define the Problem Clearly

Many technical decisions go wrong because they solve the wrong problem. Before researching solutions, articulate:

- What specific problem are you solving?
- What constraints exist (time, budget, team skills)?
- What does success look like?

### Survey the Options

Cast a wide net initially. Look at:

- Established solutions in the space
- Emerging alternatives
- The "do nothing" option (often undervalued)

### Evaluate Trade-offs

Every technical choice involves trade-offs. Make them explicit:

| Option | Pros | Cons | Risk Level |
|--------|------|------|------------|
| Option A | Fast to implement | Limited scalability | Low |
| Option B | Scales well | Learning curve | Medium |
| Option C | Industry standard | Over-engineered for our needs | Medium |

### Prototype When Uncertain

If the decision has high stakes and you're uncertain, build a small prototype. A day of prototyping can save weeks of wrong-direction development.

## Plan: Design Before Building

With research complete, resist the urge to jump into code. Planning doesn't mean writing lengthy documents—it means thinking through the implementation before starting.

### Map the Dependencies

Identify what depends on what. This reveals:

- The natural order of implementation
- Potential blockers
- Opportunities for parallel work

### Identify Risks Early

Every plan has weak points. Explicitly identify:

- Technical unknowns
- External dependencies
- Skills gaps

Address high-risk items first when possible.

### Define Milestones

Break the work into verifiable checkpoints. Each milestone should be:

- Demonstrable (you can show progress)
- Testable (you can verify correctness)
- Valuable (it contributes to the goal)

### Document Decisions

Write down key decisions and their rationale. Future-you (or your teammates) will thank present-you when questions arise about why things were built a certain way.

## Implement: Execute with Discipline

With research done and a plan in place, implementation becomes more straightforward. But discipline still matters.

### Start with the Core

Begin with the essential functionality. Avoid the temptation to build nice-to-have features before the must-have ones work.

### Iterate in Small Steps

Large commits are hard to review and harder to debug. Work in small, focused increments that can be verified independently.

### Validate Continuously

Don't wait until the end to test. Validate as you go:

- Run tests frequently
- Get feedback early
- Check against milestones

### Adjust the Plan

No plan survives contact with reality unchanged. When you learn something new:

- Update the plan
- Communicate changes
- Document why the plan changed

## Applying the Framework

This framework scales. For a small decision (which library to use), the research phase might take an hour. For a large decision (which architecture to adopt), it might take a week.

The key is proportionality: invest effort matching the decision's impact. Don't spend a week researching a logging library. Don't spend an hour researching your database architecture.

## The Meta-Lesson

The framework itself is less important than the discipline it represents: slow down before speeding up. The time invested in research and planning is almost always recovered—and then some—during implementation.

The best technical decisions I've made came from following this pattern. The worst came from skipping steps.
