---
title: 'Requirements Are the Hard Part Now'
date: 2026-02-03
description: "Code generation is solved. The bottleneck has moved upstream. The teams winning with AI aren't better at prompting—they're better at knowing what to build."
featured: true
draft: false
tags: ['ai', 'context-engineering', 'requirements', 'software-engineering']
---

Chamath Palihapitiya [dropped a truth bomb](https://x.com/chamath/status/2018532243497783365) this week:

> "It doesn't matter how fast your code is generated if the requirements are unclear. Shit in == shit out."

This isn't a hot take. It's the new reality.

We solved code generation. Cursor, Claude Code, Copilot—they all write code fast enough. The bottleneck isn't typing anymore. It moved upstream, to the part we were never very good at: knowing exactly what to build.

## The Inversion

For decades, the hard part of software was implementation. Requirements were messy, sure, but you'd figure it out as you went. The code was the slow part. The expensive part.

AI inverted this.

Now implementation is cheap. You can generate a working feature in minutes. But if your requirements are vague, you'll generate the wrong feature in minutes. Then regenerate it. Then regenerate it again. Each iteration fast, each iteration wrong.

The teams struggling with AI aren't struggling because the tools are bad. They're struggling because they're feeding garbage in and expecting gold out.

## Vibe Coding Has Limits

The term "vibe coding" emerged to describe the new workflow: describe what you want in natural language, let AI figure out the details. It's liberating. It's fast. It works—for a while.

But vibes don't scale.

As [one developer put it](https://x.com/martin745943021/status/2016555218734109105):

> "Vibe coding feels good. But sometimes it means: no structure, messy code, skipped fundamentals, 'I'll fix it later' bugs. The vibe helps you start. Discipline helps you finish."

The architectural decisions you skip early compound into chaos later. AI will happily generate spaghetti if you don't tell it not to. It doesn't know your system's constraints. It doesn't know your team's conventions. It only knows what you told it—and you probably didn't tell it enough.

## The Discipline Layer

This is why tools are emerging that sit _before_ the coding agent.

Chamath's Software Factory isn't a code generator. It's a requirements scrutiniser. It captures what you're building, forces you to make architectural decisions explicit, and coordinates teams—all before any code gets written.

The pitch: "It doesn't matter how fast a coding agent can generate code if the user has not clearly defined what to build."

Kiro takes a similar approach. Instead of jumping straight to code, it generates specs first: user stories with acceptance criteria, architecture documents with API contracts, implementation roadmaps. Your AI goes from "vibe coding" to structured engineering.

[Jim Manico](https://x.com/manicode/status/2015097918504538614) nailed the mindset shift:

> "AI coding is no longer about generation of code with AI. It is about engineering a control system in which models operate inside well-defined constraints, fed by machine-readable requirements, gated by tests, and continuously corrected through enforced rules."

The teams succeeding aren't "better at prompting." They have better system prompts, better requirements extraction, proper task sizing, and extensive test coverage. They're treating AI as an engineering discipline, not a magic wand.

## Spec-Driven Development

Karpathy recently endorsed what he called ["spec-driven development"](https://x.com/karpathy/status/2015887154132746653)—the logical endpoint of the declarative trend. Instead of telling AI _how_ to build something, you tell it _what_ to build. But that "what" has to be precise.

This means:

- Writing down what your AI should know (context files, AGENTS.md)
- Defining what it should do (skills, tool access)
- Specifying what you're building (implementation plans, acceptance criteria)

The upfront investment pays off. You stop explaining the same context repeatedly. You stop correcting the same misunderstandings. The AI has what it needs to deliver what you actually want.

## The New Skill Set

If requirements are the hard part now, then requirements engineering becomes the critical skill.

This isn't what most developers trained for. We learned to think in code. We learned to figure things out by building. The messy middle was where the real work happened.

Now the real work happens before the middle. It happens in:

- **Clarity of intent**: Can you describe what you want precisely enough that a machine understands it?
- **Constraint specification**: What are the boundaries? What doesn't the system do?
- **Acceptance criteria**: How do you know when it's done? What does "working" mean?
- **Architectural decisions**: What patterns? What tradeoffs? What's the shape of the solution?

These are the new high-value skills. The teams investing here are shipping faster and with fewer iterations than teams that jump straight to prompting.

## The Uncomfortable Truth

Here's the part nobody wants to hear: most requirements are unclear because teams avoid making tradeoffs.

[As one commenter noted](https://x.com/AdiUdupa/status/2018534446761431216): "Shit in, shit out is true; but most requirements are unclear because teams avoid making tradeoffs."

Vague requirements aren't an accident. They're a coping mechanism. If you don't specify exactly what you want, you don't have to commit to what you're _not_ building. You preserve optionality. You defer hard decisions.

AI doesn't let you do that anymore. It needs specifics. It will fill in the gaps with its own assumptions—and those assumptions are probably wrong.

The discipline of writing clear requirements is really the discipline of making decisions. What exactly are we building? What exactly are we not building? What tradeoffs are we making?

These questions were always important. Now they're unavoidable.

## What This Means

If you're struggling with AI-assisted development, the fix probably isn't a better model or a smarter prompt. It's better inputs.

Before your next feature:

1. Write down what "done" looks like
2. List what the feature explicitly doesn't do
3. Specify the constraints (performance, security, compatibility)
4. Make the architectural decisions before generating code

Yes, this takes time. But it takes less time than iterating on wrong implementations. And it produces better results than any amount of prompt engineering.

Code generation is solved. Requirements are the hard part now. The teams that figure this out first will ship circles around everyone else.
