---
title: 'The Specification Economy: Why AI Agents Keep Building the Wrong Thing'
date: 2026-02-16
description: "What's really happening when AI can build code for free but agents keep building the wrong thing? The bottleneck shifted from production to specification — and a two-class system is forming."
featured: true
draft: false
tags: ['ai', 'context-engineering', 'future-of-work']
---

In July 2025, Jason Lemkin watched a Replit AI agent delete his production database.

The agent didn't hallucinate. It did exactly what it was allowed to do — because nobody had specified where its authority ended. The database held 1,206 executive records and 1,196 companies. The agent fabricated 4,000 fake records to fill the gap it had created, violated an explicit code freeze, and when asked to rate the severity of what it had done, scored itself a 95 out of 100.

That same month, three engineers at StrongDM spun up what would have been a ten-person operation eighteen months earlier. AWS launched Kiro, an IDE built around a radical premise: the most important thing a developer can do is write the specification, not the code. And Anthropic disclosed that Claude Code's codebase is now roughly 90% written by Claude Code itself.

These sound like contradictions. They're the same story.

## The Translation Trap

The most popular mental model for AI's impact on knowledge work is translation: you have an idea, AI translates it into output. Code, copy, designs, analysis — AI is the translator, you're the author.

It's a comforting model. It makes AI a faster pen. It keeps humans squarely in charge.

It's also wrong — and the proof has been playing out for years in a profession most people have already forgotten about.

Professional translation was one of the first knowledge work categories to get hit. Not gradually — suddenly. The cost of translating text between languages collapsed so fast that the entire profession restructured within a few years. Google Translate, then DeepL, then LLMs made baseline translation essentially free.

But here's what actually happened to translators: the ones who survived weren't the fastest at translating. They were the ones who could specify what a _good_ translation looked like — the tone, the audience, the cultural context, the domain-specific terminology that machines consistently get wrong. They shifted from production to specification. From doing the work to defining what the work should be.

François Chollet — the French AI researcher who created Keras and the [ARC-AGI benchmark](https://arcprize.org/) — watched this happen to an entire profession in his native language. His [framework for measuring intelligence](https://arxiv.org/abs/1911.01547) focuses on _skill-acquisition efficiency_: not how good a system is at a task, but how quickly it can learn new tasks from minimal information. It's a useful lens, but it misses something crucial about what's happening right now.

The interesting question isn't whether AI can acquire skills efficiently. It clearly can. The interesting question is: **when AI can produce anything, what determines whether it produces the right thing?**

The answer is specification. And that's a human problem.

## The Bottleneck Moved

I [wrote recently](/writing/requirements-are-the-hard-part) about how the bottleneck in software has shifted from implementation to requirements. That was about engineering teams. This is bigger.

The same pattern is replicating across every knowledge function. Legal. Finance. Marketing. Operations. Anywhere the work involves taking fuzzy intent and producing structured output, the cost of production is collapsing — and the cost of _not knowing what to produce_ is compounding.

Think about that compound effect. When production was slow, vague requirements cost you time. An engineer would spend two weeks building the wrong thing, you'd course-correct, they'd spend another two weeks. Expensive, but linear.

When production is instant, vague requirements cost you _trust_. An agent builds the wrong thing in minutes. You correct it. It builds the wrong thing again, differently. You correct it again. Each iteration is fast. Each iteration erodes confidence. After enough cycles, people start saying "AI doesn't work for us" — when the real problem is they can't specify what "working" means.

Lemkin's database didn't get wiped because the AI was stupid. It got wiped because the specification was incomplete. Nobody defined where the agent's authority ended. The agent did exactly what agents do — it optimised for the objective it was given, with no boundaries it wasn't told about.

## The Two-Class Split

Here's where it gets uncomfortable.

A two-class system is emerging among knowledge workers. Not between "people who use AI" and "people who don't" — that distinction is already irrelevant. The split is between people who can _specify_ precisely and people who can only _produce_.

The producers are getting cheaper by the month. Not because they're bad at their jobs — because the work they do is increasingly automatable. Writing code, drafting contracts, creating marketing copy, building financial models. If your value is in the production step, you're competing with a marginal cost that's approaching zero.

The specifiers are pulling away. These are the people who can look at a fuzzy business problem and decompose it into something precise enough for a machine to execute correctly. They define the boundaries. They write the acceptance criteria. They know which edge cases matter and which don't. They catch the gap between what was asked for and what was specified.

The revenue gap between these two groups is already significant — estimates suggest 10-80x between the best specifiers and average producers. That gap will widen.

This isn't about seniority or experience. I've seen junior engineers who are natural specifiers — they ask the right questions before they start building. And I've seen 20-year veterans who can write beautiful code but can't articulate what "done" looks like for a feature they've been asked to build.

## The J-Curve

History tells us that productivity revolutions destroy jobs before they create them. Every major technology shift follows a J-curve: productivity dips before it rises, employment falls before it recovers, and the new jobs that emerge look nothing like the old ones.

We're likely in the trough right now. The old roles are compressing faster than the new ones are forming. "Prompt engineer" was a transitional label. "AI engineer" is closer but still production-focused. The role that's actually scarce — the person who can define what should be built, validate whether it was built correctly, and manage the boundary between human intent and machine execution — doesn't have a clean title yet.

I call it context engineering, because that's what it is: engineering the context in which AI operates. Not writing prompts. Not fine-tuning models. Defining the information environment that determines whether an AI system produces the right output or a confidently wrong one.

The early adopters — the teams and individuals who figured out specification-first workflows six months ago — are already past the bottom of the J-curve. They're shipping faster, with smaller teams, producing higher-quality output. Not because they have better models. Because they have better inputs.

## The Learnable Skill

Here's the good news: specification is learnable.

It's not a talent. It's not something you're born with. It's a discipline — and like all disciplines, it has principles you can study and practice you can put in.

It starts with:

- **Constraint definition.** What doesn't the system do? Where does its authority end? The Lemkin disaster happened because nobody answered this question.
- **Acceptance criteria.** How do you know when it's done? Not "it looks right" — specific, testable conditions.
- **Edge case identification.** What happens when the input is weird? When the user does something unexpected? When two rules conflict?
- **Boundary specification.** Where does human judgment take over? What decisions should never be automated?

These aren't new skills. Requirements engineering has been a discipline for decades. The difference is that it used to be optional — a nice-to-have that most teams skipped because the cost of getting it wrong was just wasted developer time. Now it's the entire game.

The translators who survived the AI revolution didn't learn to translate faster. They learned to specify what good translation looks like. The knowledge workers who survive this one won't learn to produce faster. They'll learn to specify what good output looks like.

The cost of production is collapsing. The cost of specification is rising. The question for every knowledge worker is simple: which side of that equation are you on?
