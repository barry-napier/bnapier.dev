---
title: "Do AGENTS.md Files Actually Help? The Data Says It's Complicated"
date: 2026-02-23
description: 'Two studies reach opposite conclusions about AGENTS.md files. One says they barely help and increase costs. The other says they hit 100% pass rates. Both are right — and the tension tells us something important about context engineering.'
featured: true
draft: false
tags: ['ai', 'agentic-coding', 'context-engineering', 'agents-md']
---

I work with AGENTS.md files every day. As an AI Context Engineer at Aflac, crafting and maintaining these files is literally part of my job. So when two studies dropped within weeks of each other — one saying context files barely help, the other saying they're essential — I paid attention.

The truth is more interesting than either headline suggests.

## The study that says they don't work

Researchers at ETH Zurich built [AGENTbench](https://arxiv.org/html/2602.11988), a benchmark of 138 tasks drawn from 12 real repositories that already had developer-committed AGENTS.md files. They tested Claude Code, Codex, and Qwen Code across these tasks with and without context files.

The results were underwhelming:

- **Developer-written context files**: +4% improvement
- **LLM-generated context files** (via `/init` commands): -3% — actually _worse_
- **Both approaches**: 20%+ increase in token costs

Four percent. That's the payoff for all that careful documentation. And if you let the model generate its own context file? You're paying more for worse results.

The researchers' recommendation was blunt: keep context files minimal. Stick to tooling requirements and specific commands. Don't describe your codebase architecture — the model can figure that out on its own.

## The study that says they're essential

Then Vercel published [their own evaluation](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals), testing something different: Next.js 16 APIs that didn't exist in any model's training data. Brand new APIs. Zero prior knowledge.

They compared three approaches:

| Approach                       | Pass Rate |
| ------------------------------ | --------- |
| Baseline (no help)             | 53%       |
| Skills (invoked on demand)     | 53%       |
| Skills + explicit instructions | 79%       |
| AGENTS.md docs index (8KB)     | **100%**  |

Read that again. Skills — the tool-use approach where the model actively retrieves documentation when it thinks it needs it — performed _identically_ to having no help at all. 53%. The model didn't know what it didn't know, so it never asked for help.

But an 8KB compressed docs index sitting passively in the context? Perfect score.

The key insight: **passive context beats active retrieval**. When information is just _there_, the model uses it. When it has to decide to go look for it, it often doesn't — because it doesn't realise it's missing something.

## Both studies are right

These aren't contradictory findings. They're measuring completely different things.

The ETH study tested tasks where the model already had relevant training data. The repos were established. The patterns were familiar. In that world, an AGENTS.md file that describes your architecture is just restating things the model can already infer from reading the code. You're adding noise, not signal.

The Vercel study tested tasks where the model had _zero_ prior knowledge. Next.js 16 APIs weren't in any training set. Without the docs index, the model was guessing. With it, the model had everything it needed right there in context.

The distinction isn't "do context files work?" It's "what are you putting in them?"

## What actually belongs in an AGENTS.md

After months of writing and iterating on these files, here's what I've learned: the useful stuff falls into a few categories.

### 1. Corrections — things the model will get wrong

This is the highest-value content. If your project uses a non-standard pattern, or if there's a common approach that specifically doesn't work in your codebase, say so.

```markdown
## Testing

- Do NOT use `jest`. This project uses `vitest` with the config in `vitest.config.ts`.
- Always run `pnpm test` not `npm test`. The npm scripts are broken.
- Integration tests require `docker compose up -d` first.
```

The model has strong priors about how things "should" work. When your project deviates, you need to override those priors explicitly.

### 2. Guardrails — things the model should never do

```markdown
## Rules

- Never push to main. Always use feature branches.
- Never modify files in `src/generated/`. These are auto-generated from the schema.
- Do not install new dependencies without asking first.
```

These aren't things the model would discover by reading code. They're organisational decisions that exist outside the codebase.

### 3. Pointers — where to find things, not what they contain

This is what Vercel got right. Their AGENTS.md wasn't a documentation dump. It was an 8KB _index_ — compressed pointers to where the real documentation lives.

```markdown
## Key docs

- API routes: see docs/api-routes.md
- Auth flow: see docs/auth.md
- Database migrations: see docs/migrations.md
```

You're not duplicating information. You're giving the model a map. Huge difference.

### 4. Non-obvious commands

```markdown
## Development

- `pnpm dev` — starts the dev server on port 3000
- `pnpm db:migrate` — run this after pulling if you see schema errors
- `pnpm generate` — regenerates GraphQL types (run after schema changes)
```

This aligns with what the ETH researchers recommended. Commands and tooling are genuinely useful because they're project-specific and not discoverable from code alone.

## What doesn't belong

The ETH study's -3% finding for LLM-generated context files makes perfect sense when you think about what `/init` produces. It generates a comprehensive description of the codebase: directory structure, technology stack, architecture overview.

All of which the model can determine by... reading the code.

You're burning tokens on information the model would have gathered anyway, and worse, you're potentially anchoring it to a stale description when the code itself is the source of truth.

**Don't put in your AGENTS.md:**

- Architecture descriptions the model can infer
- File-by-file documentation
- Technology stack listings
- Things that are obvious from `package.json` or `pyproject.toml`
- General best practices the model already knows

If you wouldn't need to tell a competent new hire because they'd figure it out in the first hour of reading code — don't tell the model either.

## The meta-lesson: context engineering is a skill

There's an emerging discipline here that doesn't have a settled name yet, though "context engineering" is gaining traction. It's about managing what information models receive — and crucially, what they _don't_.

The ETH study proves that more context ≠ better results. Stuffing everything you know into a file actively degrades performance and increases costs.

The Vercel study proves that the _right_ context at the _right_ time is transformative. A well-curated 8KB index outperformed every other approach by a massive margin.

This is a familiar pattern if you've worked in any information-heavy discipline. The skill isn't in having information. It's in curating it. Knowing what to include, what to leave out, and how to structure what remains.

## My current approach

For what it's worth, here's roughly how I structure AGENTS.md files now:

1. **Commands first** — how to build, test, lint, deploy. The non-obvious stuff.
2. **Corrections second** — where this project diverges from what the model expects.
3. **Guardrails third** — things that must never happen, regardless of the task.
4. **Pointers last** — where to find docs for specific domains, not the docs themselves.

Everything else? Leave it out. Let the model read the code. That's what it's good at.

The files I've seen fail are the ones that try to be comprehensive. The ones that succeed are the ones that are _selective_. They contain the 5% of information that the model can't get anywhere else, and they leave out the 95% that it can.

## Where this goes next

The AGENTbench benchmark is a good start, but it's measuring the wrong thing for most real-world use cases. Few teams are writing context files to help with tasks the model can already do. They're writing them for the weird stuff — the internal tools, the custom frameworks, the undocumented APIs.

I'd love to see a study that tests context files specifically on tasks involving proprietary or novel codebases. My prediction: the results would look a lot more like Vercel's 100% than ETH's 4%.

Until then, the practical advice is simple: write less, but write the right things. Your AGENTS.md should be a correction layer, not a description layer. It should contain what the model gets wrong, not what it can figure out.

And for the love of all that is holy, don't let the model write its own context file. That -3% finding should haunt every `/init` command.
