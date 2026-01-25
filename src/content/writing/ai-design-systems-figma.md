---
title: 'Do We Still Need Figma?'
date: 2025-01-25
description: "AI tools don't generate mockups—they eliminate the need for mockups entirely. As high-fidelity prototypes emerge directly from code, the traditional design workflow faces an existential question."
featured: true
draft: false
---

Here's a question that would have been heresy two years ago: what if we stopped designing in Figma altogether?

I shipped a feature last week in 30 minutes using AI-assisted coding. The same feature would have taken half a day through the traditional workflow—Figma mockup, design review, developer handoff, implementation, "that's not quite right" feedback, iteration. Instead, I described what I wanted, generated working code, and iterated on something real.

This isn't a thought experiment anymore. It's happening.

## The Two Sources of Truth Problem

Design systems were supposed to solve this. We'd maintain a single source of truth—design tokens, component libraries, documentation—and both designers and developers would work from it. In practice, we ended up with two sources of truth: the Figma library and the code implementation. They'd drift apart. Someone would update one and forget the other. Handoff became an exercise in translation, and translation always loses something.

AI collapses this. When you can generate production-ready React components from a description, there's no handoff because there's nothing to hand off. The code _is_ the design. The prototype _is_ the product.

## What AI Actually Does to Design

The tools have matured faster than most of us expected:

**v0** turns plain English into production-ready React components with Tailwind. You can upload a Figma screenshot and get working code. The output is clean enough that migration is trivial—no vendor lock-in, just standard React.

**Lovable** hit $20M ARR in two months. It's the fastest-growing European startup in history. Why? Because it takes you from prototype to production app with backend integration and GitHub sync. It's not generating mockups; it's generating products.

**Bolt.new** runs full Node.js environments in the browser. I've watched non-technical founders go from idea to working prototype in under 30 minutes.

**Claude Artifacts** lets you generate and run applications mid-conversation. Sketch something on paper, describe it, and get an interactive prototype you can publish and test with real users.

These tools don't simulate products. They build them.

Figma simulates a button. AI builds a button that actually works—with hover states, click handlers, loading states, error handling, and accessibility attributes. Which one do you want to spend your time on?

## The Satisfaction Gap

Figma's own 2025 AI report reveals something interesting. Developers report 82% satisfaction with AI tools and 68% say AI improves their work quality. Designers? 69% satisfaction, and only 54% feel AI improves quality.

Only 31% of designers use AI in their core design work, compared to 59% of developers using AI for core development.

There's a satisfaction gap, and it's growing. Developers have embraced AI because it makes them faster and better at their jobs. Many designers are still figuring out where they fit.

## What Teams Are Actually Doing

Linear's founding designer admitted their Figma files are "pretty messy" and they don't follow a strict design system. They use Figma "more as a sketch to build the final product in code." Code is truth. Figma is exploration.

Cursor's head of design put it simply: "Designing with code lets us really interact with the app. It just feels a lot more real than some picture in Figma."

When I joined Booking.com in 2019, coding wasn't optional for UX designers—it was required. You couldn't get hired without it. That seemed extreme at the time. Now it looks prescient.

The pattern emerging at companies like Linear, Vercel, Cursor, and xAI is the **design engineer**—designers who build and ship, not just push pixels. There's never been a better time to collapse the talent stack.

## The Case for Keeping Figma

I'm not here to tell you Figma is dead. That's reductive, and the reality is more nuanced.

Figma still wins at exploration. When you're early in the process and need to think through twenty variations quickly, a visual tool with infinite canvas is hard to beat. AI is fast at generating _a_ solution, but exploring possibility space still benefits from the immediacy of visual manipulation.

Collaboration is another strength. Design systems at scale—like Grammarly's, which saves teams 25% of their work week—depend on shared visual language and review processes that Figma handles well.

And there's the judgment question. AI boosts efficiency, but fewer than half of designers say it makes them _better_ at their jobs. Efficiency is useful, but good design still relies on judgment, taste, and context. AI doesn't have taste. It has patterns.

Dylan Field, Figma's CEO, frames it this way: "In a world where software is growing exponentially, design is the differentiator." As execution becomes commoditized, strategic design decisions matter more, not less.

## Design Tokens: The Real Bridge

The W3C Design Tokens Community Group just released the first stable specification (2025.10)—a vendor-neutral format for sharing design decisions across tools and platforms.

This is the real infrastructure play. Design tokens don't care whether you're working in Figma or code. They're the abstraction layer that lets both approaches coexist.

Figma's MCP integration now connects design files directly to development tools like VS Code, turning variables and tokens into live, accessible data. AI can read your design system, generate components that conform to it, and validate consistency automatically.

The future isn't Figma vs. code. It's tokens as the source of truth, with both visual tools and AI consuming them.

## The Question We Should Be Asking

"Do we still need Figma?" is the wrong question. The better question: **How does our workflow change when execution is cheap?**

When generating a polished UI takes minutes instead of days, the bottleneck shifts. Exploration becomes cheaper. Iteration becomes faster. But someone still needs to decide _what to build_ and _why it matters_.

The value is moving up the stack. Execution is losing its monopoly on worth. Variations are infinite, and polished UI is no longer rare. What's rare is knowing which variation is right.

85% of designers and developers say learning to work with AI will be essential to their future success. That's not a threat to design—it's an invitation to focus on what only humans can do: understanding users, making judgment calls, and defining what success looks like.

## My Take

I still use Figma. But I use it differently now.

For exploration and early ideation, Figma's infinite canvas is unmatched. For communicating intent to stakeholders who aren't technical, visual mockups still work better than descriptions. For maintaining a design system at scale, the collaboration features earn their keep.

But for prototyping? For testing ideas? For shipping features? I'm going straight to code more often than not. The feedback loop is tighter. The output is real. And I'm not maintaining two sources of truth anymore.

The tools aren't competing. They're specializing. Figma is becoming the place where you think. Code—increasingly AI-generated—is where you build.

The designers who thrive will be the ones who can do both.
