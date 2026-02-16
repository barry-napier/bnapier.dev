---
title: 'The AI Engineer Roadmap: A Quick Summary'
date: 2026-01-29
description: "A concise, fun summary of Matt Pocock's AI Hero roadmap — everything you need to know about becoming an AI Engineer, from LLM basics to building agents with the Vercel AI SDK."
featured: true
draft: false
tags: ['ai', 'ai-engineering', 'vercel', 'learning']
---

Matt Pocock's [AI Hero](https://www.aihero.dev/ai-engineer-roadmap) site lays out a clear path from "what even is an LLM?" to "I just built an agent that does my job." Here's the whole thing distilled down so you can sound smart at your next standup.

## What Is an AI Engineer?

An [AI Engineer](https://www.aihero.dev/what-is-an-ai-engineer) is a software developer who builds apps powered by AI models — mostly through APIs, not by training models from scratch. That's the ML Engineer's problem. The AI Engineer's job is to take these powerful models and wire them into real products that actually work reliably at scale.

The barrier to entry? Lower than you think. If you can build a web app, you can build an AI app.

## LLM Fundamentals: The Mental Model

An LLM is essentially a [massive compressed file](https://www.aihero.dev/what-is-an-llm) — picture a 1TB zip of the internet's knowledge. You feed it tokens, it predicts what comes next. Simple concept, wild results.

The key mindset shift: you're no longer writing deterministic code where input A always gives output B. You're working with [probabilistic systems](https://www.aihero.dev/the-ai-engineer-mindset) that are inherently unpredictable. Embrace the chaos.

## What Can You Actually Build?

[Quite a lot](https://www.aihero.dev/what-are-llms-used-for), it turns out:

- **Text generation** — the obvious one
- **Retrieval (RAG)** — connect LLMs to your own data sources for answers grounded in reality
- **Agents** — systems that take actions in the world, call APIs, and interact with other services
- **Structured data extraction** — pull formatted data out of messy PDFs, emails, and documents

## Choosing Your Model

Before you reach for GPT-4o out of habit, Pocock suggests asking [five key questions](https://www.aihero.dev/how-to-choose-an-llm). The big tension is the **context window** — every model has a limit on how much text it can process at once, and managing that limit is a constant battle. Patterns like chunking in RAG exist specifically to squeeze more signal into less space.

## 17 Techniques to Level Up Your App

The [techniques guide](https://www.aihero.dev/how-to-improve-your-llm-powered-app) is the real goldmine, ordered from simple to advanced:

1. **Prompt engineering basics** — be clear, direct, specific
2. **Role-based prompting** — give the LLM a persona
3. **XML tags** — structure your prompts (popularized by Anthropic)
4. **Prefilling responses** — constrain the output format tightly
5. **Chain-of-thought** — make the model think step-by-step for complex reasoning
6. **Multishot prompting** — show examples of what you want
7. **Fine-tuning** — adapt a base model to your specific domain
8. **LLM routing** — send different queries to different models
9. **Tool calling** — let the LLM invoke APIs and databases
10. **Evaluator-optimizer workflows** — build feedback loops that self-improve

...and more. The advice: start at the top, work your way down. Don't reach for fine-tuning when better prompts would do the trick.

## The Vercel AI SDK: Where Theory Meets Code

Once you've got the concepts down, the roadmap points you to the [Vercel AI SDK tutorial](https://www.aihero.dev/vercel-ai-sdk-tutorial) to get hands-on. The [AI SDK](https://www.aihero.dev/what-is-the-ai-sdk) is a free, open-source TypeScript toolkit with three parts:

- **AI SDK Core** — backend work in Node/Deno/Bun
- **AI SDK UI** — frontend hooks and components
- **AI SDK RSC** — React Server Components integration

The killer feature? It [future-proofs your stack](https://www.aihero.dev/vercel-ai-sdk) by wrapping all major LLM providers behind a unified API. Switch from OpenAI to Anthropic with a single line change.

### Highlights from the SDK tutorials:

- **[Structured outputs](https://www.aihero.dev/structured-outputs-with-vercel-ai-sdk)** — define a Zod schema, get formatted data back. No more parsing nightmares.
- **[Tool calling](https://www.aihero.dev/tool-calls-with-vercel-ai-sdk)** — define tools with Zod schemas and async execute functions. Call APIs, write to databases, do anything.
- **[Streaming](https://www.aihero.dev/streaming-objects-with-vercel-ai-sdk)** — swap `generateObject` for `streamObject` and watch partial results flow in real-time.
- **[Agents](https://www.aihero.dev/agents-with-vercel-ai-sdk)** — the LLM calls tools, sees results, decides what to do next. Set `maxSteps` and let it loop. This is what Anthropic calls "agents."
- **[PDF extraction](https://www.aihero.dev/structured-data-from-pdfs-with-vercel-ai-sdk)** — one of the most powerful practical use cases: turning unstructured documents into clean, typed data.

## The Bottom Line

The AI Engineer Roadmap boils down to this progression:

1. **Understand** how LLMs work (compressed knowledge, probabilistic outputs, token limits)
2. **Pick** the right model for your use case
3. **Improve** your results with prompting techniques before reaching for heavier tools
4. **Build** real apps using the Vercel AI SDK with streaming, structured outputs, tools, and agents
5. **Evaluate** your system with evals and feedback loops — because vibes-based testing doesn't scale

The full [AI SDK v5 Crash Course](https://www.aihero.dev/workshops/ai-sdk-v5-crash-course) includes 89 videos across 57 exercises and 10 modules if you want to go deep.

Whether you're a frontend dev curious about AI or a backend engineer ready to build agents, this roadmap gives you the vocabulary, the mental models, and the practical toolkit to get started. No PhD required.
