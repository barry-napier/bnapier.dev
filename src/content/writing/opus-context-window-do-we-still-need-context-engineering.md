---
title: 'One Million Tokens: Do We Still Need Context Engineering?'
date: 2026-02-06
description: 'Claude Opus 4.6 ships with a 1M token context window that actually works. But the case for context engineering is stronger than ever.'
featured: true
draft: false
tags: ['ai', 'context-engineering', 'anthropic']
---

Anthropic released [Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6) on February 5, and the headline number is hard to ignore: a one-million-token context window. That's roughly 750,000 words, 1,500 pages, or 30,000 lines of code in a single prompt. For the first time, an Opus-class model can ingest an entire codebase, a full legal discovery set, or a year's worth of financial filings and reason over them in one pass.

The immediate reaction on X was predictable. If the context window is big enough to hold everything, why bother with retrieval pipelines, chunking strategies, or any of the careful context management we've spent the last two years building? Is context engineering dead?

No. But the question is worth taking seriously, because the answer is more nuanced than "just throw everything in."

## What Actually Changed

Previous Opus models topped out at 200K tokens. More importantly, they struggled to use that full window effectively. The [Chroma Research context rot study](https://research.trychroma.com/context-rot) from July 2025 tested 18 models and found universal degradation as context length increased — even on simple retrieval tasks. Information buried in the middle of long contexts was effectively invisible.

Opus 4.6 represents a genuine shift. On the MRCR v2 benchmark — an eight-needle retrieval test across one million tokens — it scores 76%, compared to 18.5% for its predecessor Sonnet 4.5 and 26.3% for Google's Gemini 3 Pro. Anthropic calls this "a qualitative shift in how much context a model can actually use while maintaining peak performance."

That's not marketing spin. A 76% hit rate on eight needles scattered across a million tokens is a meaningful capability that didn't exist six months ago. It means you can load a large document set and have reasonable confidence the model will find what it needs.

But 76% is not 100%. And that gap is where context engineering lives.

## The Lost-in-the-Middle Problem Hasn't Vanished

The foundational research here is [Liu et al., 2023](https://arxiv.org/abs/2307.03172), published in the Transactions of the Association for Computational Linguistics. The finding was a U-shaped performance curve: models attend well to content at the beginning and end of input but degrade significantly when key information sits in the middle. This is linked to how rotary positional embeddings (RoPE) bias attention toward nearby and recent tokens.

Opus 4.6 has clearly improved on this. But improved is not solved. At 256K tokens, it scores 93% on MRCR v2. At 1M tokens, that drops to 76%. That 17-point gap means that roughly one in four pieces of information in a long context will be missed. For a research assistant summarizing a report, that might be acceptable. For a financial compliance agent that cannot miss a single disclosure, it is not.

The [NoLiMa benchmark](https://arxiv.org/abs/2502.05167) from LMU Munich and Adobe Research reinforced this in early 2025: even reasoning-focused models suffered major performance drops as context length increased, especially for tasks requiring more than simple keyword matching.

The practical takeaway is counterintuitive: the models that handle long contexts best are also the models that benefit most from not being forced to use them unnecessarily.

## The Economics Are Brutal

Context window size is a capability. Pricing is a constraint. And the economics of long-context inference create a strong incentive for context engineering regardless of what the benchmarks say.

Opus 4.6 pricing for requests under 200K tokens: $5 per million input tokens, $25 per million output tokens. For requests exceeding 200K tokens, a premium tier kicks in: $10 per million input, $37.50 per million output. That's a 2x multiplier on input and 1.5x on output.

Self-attention in transformers scales quadratically with sequence length. Doubling the token count doesn't double compute — it can quadruple it. Every token you add to context costs money, adds latency, and competes with every other token for the model's attention.

[Laurent Kubaski's analysis](https://medium.com/@laurentkubaski/rag-is-not-dead-the-4-factors-to-consider-before-using-large-prompts-c5ba30407e74) puts it starkly: a RAG-based query can cost $0.00008, while the equivalent long-context query costs $0.10 — a 1,250x difference. At scale, that's not a rounding error. It's a business decision.

A focused 300-token context often outperforms an unfocused 113,000-token context. This was Anthropic's own finding in their [context engineering guide for agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). The company that builds the million-token model is also telling you not to use all million tokens unless you have to.

## What the Industry Is Saying

The term "context engineering" has replaced "prompt engineering" in serious AI development discourse. The shift traces back to [Tobi Lutke](https://x.com/tobi/status/1935533422589399127) in June 2025: "I really like the term 'context engineering' over prompt engineering. It describes the core skill better: the art of providing all the context for the task to be plausibly solvable by the LLM."

[Andrej Karpathy](https://x.com/karpathy/status/1937902205765607626) amplified it with a useful mental model: think of the LLM as a CPU and the context window as RAM. The engineer's job is like an operating system — loading working memory with precisely the right code and data for the next step. "Too much or too irrelevant context and the LLM costs might go up and performance might come down," he warned. "Doing this well is highly non-trivial."

This framing is important because it reframes the question. The debate isn't "big context vs. context engineering." It's about what you load into context and how you manage it — regardless of how large the window is.

[LangChain's 2025 State of Agent Engineering report](https://blog.langchain.com/context-engineering-for-agents/) found that 57% of organizations now have AI agents in production, but 32% cite quality as the top barrier. Most failures traced to poor context management — not model capability. The models are good enough. The context isn't.

## When to Skip the Retrieval Stack

There are clear cases where a million-token context window genuinely simplifies things.

If your entire knowledge base fits in 200K–1M tokens, skip retrieval. No vector databases, no chunking pipelines, no re-ranking models. Load the data directly and use [prompt caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) to reduce cost on repeated queries against the same corpus. This is a legitimate architecture simplification for smaller, static datasets.

IBM researcher Pin-Yu Chen has argued that RAG inherently involves information loss through the retrieval and chunking process. With a large enough window, "you can throw in all the documents you want the model to process" without lossy intermediate steps. For tasks where completeness matters more than precision — say, comparing all clauses in a contract set — this is compelling.

The Opus 4.6 release also introduces server-side [context compaction](https://docs.anthropic.com/en/docs/build-with-claude/context-windows#context-compaction-beta) in beta. When a conversation approaches the context window limit, the API automatically summarizes earlier parts into a condensed block. This enables effectively infinite conversations for agentic workflows without the developer building custom summarization logic.

For codebases under 30,000 lines, internal documentation sets, or single-session research tasks, the "just load it all" approach is now a valid starting point.

## When Context Engineering Still Wins

But there are equally clear cases where context engineering remains essential — and these cases are more common in production.

**Scale beyond the window.** Enterprise knowledge bases are measured in terabytes, not tokens. Even 10M token windows (Llama 4 is already there) only see a fraction of the data. You need retrieval to find the right fraction.

**Real-time data.** A million-token window cannot hold the entire internet or stay current. For real-time updates — stock prices, breaking news, user-specific activity — retrieval is the only option.

**Privacy and data isolation.** Enterprise agents need access to data that is user-specific. Email content must be isolated per user. Customer data must not leak between tenants. This is fundamentally a retrieval problem that context windows don't address.

**Cost discipline at scale.** If you're running thousands of queries per hour, the difference between a 2,000-token retrieval context and a 500,000-token full-load context is the difference between a manageable API bill and an infrastructure crisis.

**Precision over recall.** RAG with re-ranking can surface the three most relevant paragraphs from a million-page corpus. A million-token window can hold maybe a thousand of those pages and hopes the model finds the right ones. For high-stakes applications — medical, legal, financial — precision matters more than coverage.

**Multi-agent architectures.** Anthropic's own research found that many agents with isolated, focused contexts outperformed single-agent implementations. Each subagent gets a narrow, curated context window allocated to its specific subtask. This is context engineering by design — the opposite of "dump everything in one window."

## Context Rot Is Real and Measured

The Chroma Research team coined "context rot" to describe the systematic degradation of model output quality as input length grows. Their findings deserve attention:

- Performance grows increasingly unreliable as input length increases, across all 18 models tested
- The type of irrelevant content matters — some noise degrades performance more than others
- As the similarity between the needle and the haystack decreases, performance degrades more steeply with length
- Claude models decayed the slowest, but none were immune

This aligns with what production teams report. Developer forums describe significant quality degradation after using as little as 15–20% of the advertised context window on some models. The gap between advertised capacity and usable capacity remains one of the least discussed problems in LLM deployment.

Opus 4.6 narrows that gap considerably. But it doesn't close it. And pretending it does — by loading everything into context without thought — is a recipe for the kind of silent quality degradation that's hardest to debug.

## The Emerging Consensus

The discourse across X, industry blogs, and research papers converges on a clear position: **context engineering and large context windows are complementary, not competing, approaches.**

Anthropic itself ships compaction, context editing, and agentic memory features alongside the larger window. Their September 2025 engineering blog explicitly states that "even as capabilities scale, treating context as a precious, finite resource will remain central to building reliable, effective agents."

The pattern that's emerging in 2026 looks like this:

1. **Start simple.** If your data fits in 200K tokens, load it directly. Don't build infrastructure you don't need yet.
2. **Add retrieval when scale demands it.** When the data exceeds the window, introduce RAG — but modern, agentic RAG with query reformulation, not naive retrieve-and-append.
3. **Use compaction for long-running agents.** Let the model manage its own memory for multi-step workflows rather than building custom summarization.
4. **Engineer context at every level.** Even within a million-token window, what you put first, what you put last, and how you structure the middle all affect output quality.
5. **Monitor costs relentlessly.** The premium pricing tier is a signal. Anthropic is telling you that using the full window has real costs and should be a deliberate choice, not a default.

## What This Means for Engineers

Context engineering hasn't been made obsolete by larger context windows. It's been promoted. The discipline is evolving from "how do I fit relevant information into a limited window" to "how do I manage an information ecosystem across models, agents, and sessions."

The engineer who treats a million-token context window as permission to stop thinking about context will build slower, more expensive, less reliable systems than the engineer who treats it as one more tool in a context engineering toolkit.

Andrej Karpathy's operating system analogy holds. The RAM got bigger. That doesn't mean you stop managing memory.

---

**Sources:**

- [Introducing Claude Opus 4.6 — Anthropic](https://www.anthropic.com/news/claude-opus-4-6)
- [Effective Context Engineering for AI Agents — Anthropic Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Context Rot — Chroma Research](https://research.trychroma.com/context-rot)
- [Lost in the Middle: How Language Models Use Long Contexts — Liu et al.](https://arxiv.org/abs/2307.03172)
- [Context Engineering for Agents — LangChain](https://blog.langchain.com/context-engineering-for-agents/)
- [Context Engineering — Simon Willison](https://simonwillison.net/2025/jun/27/context-engineering/)
- [Andrej Karpathy on Context Engineering — X](https://x.com/karpathy/status/1937902205765607626)
- [Tobi Lutke on Context Engineering — X](https://x.com/tobi/status/1935533422589399127)
- [Claude Opus 4.6 Benchmarks — Vellum](https://www.vellum.ai/blog/claude-opus-4-6-benchmarks)
- [RAG is Not Dead: The 4 Factors to Consider — Laurent Kubaski](https://medium.com/@laurentkubaski/rag-is-not-dead-the-4-factors-to-consider-before-using-large-prompts-c5ba30407e74)
- [Context Engineering for Coding Agents — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html)
- [The Context Window Problem — Factory.ai](https://factory.ai/news/context-window-problem)
- [NoLiMa: Long-Context Evaluation Beyond Literal Matching — arXiv](https://arxiv.org/abs/2502.05167)
- [Context Windows — Claude API Docs](https://docs.anthropic.com/en/docs/build-with-claude/context-windows)
