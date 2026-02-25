---
title: 'Context Engineering: The Boring Skill That Makes AI Agents Actually Work'
description: 'How structured context — KB workflows, agent files, and skill definitions — turns unreliable AI agents into dependable systems. Lessons from ETH Zurich, Vercel, and building my own orchestrator.'
date: 2026-02-24
featured: false
draft: true
tags: ['ai', 'context-engineering', 'agents', 'software-engineering']
---

Everyone's building AI agents. Most of them are terrible.

Not because the models are bad — they're extraordinary. But because we keep throwing unstructured prompts at them and wondering why the output is inconsistent. We've got Formula 1 engines bolted to shopping trolley frames.

The fix isn't better models. It's better context. And I mean _structured_ context — the kind you'd be embarrassed to call exciting but that changes everything about reliability.

## What Context Engineering Actually Is

Context engineering is the discipline of designing the information environment an AI agent operates in. Not prompt engineering (writing clever one-shot instructions), but the systematic architecture of _everything_ the agent knows, when it knows it, and how that knowledge is structured.

Think of it this way: prompt engineering is writing a good email to a contractor. Context engineering is writing the contractor's entire onboarding pack — org chart, coding standards, project history, decision records, escalation paths, and the "here's how we actually do things" doc that nobody writes but everyone needs.

The difference matters because agents aren't one-shot. They run multi-step workflows, make decisions, use tools, and produce artifacts. A well-crafted prompt gets you a good first response. Well-engineered context gets you a reliable _system_.

## The Evidence Is Piling Up

### ETH Zurich: Structure Beats Intelligence

Researchers at ETH Zurich demonstrated something that should reshape how we think about AI agents: structured context — clear task decomposition, explicit constraints, and well-defined output formats — improved agent task completion rates more reliably than model upgrades alone.

The implication is counterintuitive. We spend millions scaling models from 70B to 400B parameters, hunting for that next capability jump. Meanwhile, a well-structured AGENTS.md file achieves comparable reliability gains for free.

It's the software engineering equivalent of discovering that writing good requirements matters more than hiring 10x developers. We knew this. We just forgot it applied to AI too.

### Vercel: 100% Pass Rate Through Context, Not Magic

Vercel's AI SDK team achieved a 100% pass rate on their evaluation suite. Not by using a secret model or exotic fine-tuning — by obsessively engineering the context their agents consumed.

Every tool had precise descriptions. Every workflow had explicit constraints. The agent's "world" was so well-defined that correct behaviour became the path of least resistance. The model didn't need to be brilliant; it just needed to follow well-structured instructions in a well-structured environment.

This is context engineering in production. It's not glamorous. It's filing systems and naming conventions and output specs. But it _works_.

### My Own System: Gates, Briefs, and Receipts

I've been building a personal AI orchestrator — a system where a primary agent classifies requests, writes structured briefs, delegates to sub-agents, and reviews their output before responding. Think of it as a management layer for AI agents.

The core insight that made it work wasn't any clever prompting trick. It was files.

**Gate files** define what the orchestrator is allowed to do at each stage. Before every request, it reads the classification gate. The gate file lists allowed actions, forbidden actions, and prerequisites. The agent doesn't _remember_ its principles — it reads them from disk every time. This eliminates drift.

**Briefs** are structured task definitions: objective, constraints, context files, input paths, output spec, authority tier. A sub-agent receiving a brief knows exactly what "done" looks like. No ambiguity. No "interpret my vague request creatively."

**Skill files** are reusable playbooks. Each skill has a SKILL.md that defines when it applies, what tools it uses, and how to execute. The orchestrator pattern-matches incoming requests against skill descriptions and loads the right playbook. The agent doesn't need to figure out _how_ to check the weather or manage calendar events — it reads the skill file and follows it.

**Receipts** close the loop: status, confidence score, outputs produced, decisions made, assumptions stated. The orchestrator reviews receipts before synthesising a response. Low confidence? Reject and retry. Assumptions wrong? Flag and re-brief.

The result: an agent system that's auditable, debuggable, and — critically — _consistent_. Not because the model is deterministic (it isn't), but because the context constrains it so tightly that the variance in behaviour is tiny.

## Why This Matters Now

We're at an inflection point. Models are good enough for most agent tasks. The bottleneck has shifted from _capability_ to _reliability_. And reliability is an engineering problem, not a research problem.

Context engineering is how you solve it. Specifically:

**1. Disk over chat.** Anything the agent needs to know should be in a file, not in a conversation history that gets truncated. Files are versioned, reviewable, and persistent. Chat is ephemeral.

**2. Structure over prose.** An output spec that says "return a JSON object with fields X, Y, Z" beats "give me a good summary" every time. Agents follow structure. They wander through prose.

**3. Constraints over capabilities.** Telling an agent what it _can't_ do is often more valuable than telling it what it can. "Never push to main. Never skip tests. Never send external messages without confirmation." Boundaries create reliability.

**4. Read over remember.** Don't trust the agent's "memory" of instructions from 50 messages ago. Make it re-read the relevant file at the point of decision. It's slower. It's dramatically more reliable.

**5. Briefs over requests.** "Fix the bug" is a request. A brief with the bug description, reproduction steps, affected files, test expectations, and output format is context engineering. The second one gets fixed correctly on the first attempt.

## The Uncomfortable Truth

Context engineering isn't fun. It's writing documentation, defining schemas, maintaining file structures, and thinking carefully about information architecture. It's the stuff most engineers skip because it feels like overhead.

But here's the thing: with AI agents, the context _is_ the product. The model is commodity infrastructure. What you wrap around it — the gates, the briefs, the skill files, the knowledge bases — that's where the differentiation lives.

We spent 20 years learning that software architecture matters more than clever code. We're about to learn the same lesson for AI systems, except the architecture isn't in code — it's in context.

The teams that figure this out first will build agents that actually work. Everyone else will keep writing blog posts about how AI "isn't ready yet."

It's ready. Your context isn't.
