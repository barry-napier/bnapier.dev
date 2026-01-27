---
title: 'Prompting Techniques Guide'
date: 2026-01-27
description: 'A practical guide to getting better results from AI assistants. Whether you're new to AI or already using it daily, these techniques will help you work smarter.'
featured: true
draft: false
---

Whether you're new to AI or already using it daily, these techniques will help you work smarter.

## How to Use This Guide

- **New to AI?** Start with the Foundations section
- **Already prompting?** Skip to Intermediate or Advanced techniques
- **Looking for something specific?** Use the quick reference table below

| I want to... | Try this technique |
|--------------|-------------------|
| Get a quick answer | Basic prompting |
| Explore a problem I don't fully understand | Interview |
| Get high-quality creative output | Rubric |
| Explore multiple options before deciding | Multi-draft Synthesis |
| Break down something complex | Decomposition |
| Get consistent, repeatable output | Templating |
| Condense lots of information | Summarisation |
| Just get the work done | Execution mode |
| Challenge my own thinking | Adversarial |

---

## Foundations

### Structuring Your Prompts

Before diving into techniques, a well-structured prompt makes everything work better. Think of it as giving clear instructions to a new team member.

**The core elements:**

```
1. Role      — who should the AI be?
2. Goal      — what does success look like?
3. Task      — what specifically should it do?
4. Context   — what background is relevant?
5. Constraints — what rules or limits apply?
6. Format    — how should the output look?
```

**Example — basic:**
```
Write a project update email.
```

**Example — structured:**
```
You are a project manager writing to senior stakeholders.

Goal: Inform them of project status and get approval for timeline extension.

Task: Write a brief email (under 200 words) covering:
- Current status
- Reason for delay
- Proposed new timeline
- What you need from them

Tone: Professional but direct. No jargon.
```

**Where this helps:**
- Drafting emails and documents
- Preparing presentations
- Writing reports
- Any communication task

---

## Core Techniques

### 1. Interview Technique

**What it is:** Instead of trying to write the perfect prompt yourself, get the AI to ask you questions until it understands what you need.

**When to use it:**
- You have a vague idea but can't articulate it fully
- The task is complex with lots of variables
- You want to uncover requirements you haven't thought of

**The prompt:**
```
Interview me about this project until you fully understand the requirements.

- Ask one question at a time
- Ask probing, non-obvious questions
- Go deep before moving on
- Number options so I can reply with just the number
- Use y/n format for yes/no questions
```

**Where this helps:**
- Scoping new projects
- Writing briefs or specifications
- Preparing for presentations
- Planning events or initiatives
- Defining job roles or processes

**Tip:** You can steer the interview by adding focus areas like "focus on risks and dependencies" or "prioritise budget considerations."

---

### 2. Rubric Technique

**What it is:** Ask the AI to define what "excellent" looks like, then iterate until it meets that standard.

**When to use it:**
- You want high-quality output, not just "good enough"
- Creative or subjective tasks where quality matters
- One-shot deliverables (presentations, proposals, designs)

**The prompt:**
```
Before you begin:
1. Think deeply about what makes an excellent [output type]
2. Create a rubric with 5-7 criteria (keep this internal)
3. Draft your response
4. Evaluate against your rubric
5. If it doesn't hit top marks on all criteria, revise and repeat

Only show me the final output.
```

**Where this helps:**
- Creating presentations
- Writing proposals or pitches
- Designing processes
- Drafting important communications
- Any high-stakes deliverable

**Tip:** You can also provide your own rubric if you have specific quality criteria in mind.

---

### 3. Summarisation Techniques

**What it is:** Different ways to condense information depending on what you need.

**Choose your approach:**

| Technique | Prompt | Best for |
|-----------|--------|----------|
| TL;DR | "Summarise in one sentence" | Quick overview |
| Bullet extraction | "Extract key points as bullets" | Scanning documents |
| BLUF | "Lead with the conclusion, then supporting points" | Executive summaries |
| Action-focused | "What decisions or actions are needed?" | Meeting notes |
| Audience-specific | "Summarise for [role/level]" | Tailoring communication |
| Progressive | "Summarise in 1 sentence, then 1 paragraph, then 1 page" | Layered understanding |
| Delta | "What's new or changed compared to [X]?" | Tracking updates |

**Example — BLUF format:**
```
Summarise this document using BLUF format:

## Bottom Line
[One sentence conclusion]

## Key Points
[3-5 bullets]

## Supporting Detail
[One paragraph of context]
```

**Where this helps:**
- Processing long documents or reports
- Preparing for meetings
- Briefing colleagues or leadership
- Staying on top of industry news
- Reviewing contracts or policies

**Tip:** Combine techniques — "Summarise for a CEO using BLUF format, focus on financial implications."

---

### 4. Templating

**What it is:** Define the exact structure you want, so outputs are consistent and ready to use.

**When to use it:**
- You need repeatable, consistent outputs
- The output needs to fit a specific format
- You want to minimise editing

**Approaches:**

**Fill-in-the-blank:**
```
Use this template:

Subject: [Project Name] — Weekly Update [Date]

Status: [On Track / At Risk / Blocked]

Progress this week:
- [Item 1]
- [Item 2]

Next week:
- [Item 1]
- [Item 2]

Blockers: [None / Description]
```

**Mimic:**
```
Match this format exactly:

[Paste an example of the format you want]

Now create one for [your topic].
```

**Schema enforcement:**
```
Return your response as JSON:

{
  "summary": "string",
  "key_points": ["string"],
  "action_items": ["string"],
  "risks": ["string"]
}
```

**Where this helps:**
- Status reports and updates
- Meeting notes
- Documentation
- Data entry and extraction
- Any recurring deliverable

**Tip:** Save your best templates somewhere you can reuse them.

---

### 5. Execution Mode

**What it is:** When you need the AI to just get work done without constant back-and-forth.

**When to use it:**
- The task is clear and well-defined
- You trust the AI to make reasonable decisions
- You want output, not conversation

**The prompt:**
```
Complete this task fully without asking for clarification.

- Make reasonable assumptions and document them
- If uncertain, choose the most sensible option and proceed
- Only stop when the work is done
```

**More autonomous version:**
```
Act autonomously until the task is complete.

- Do not ask permission — act, then report
- Document decisions as you go
- Only hand back when finished or truly stuck
```

**Where this helps:**
- Drafting first versions of documents
- Research and compilation tasks
- Repetitive or well-defined work
- When you're time-poor and need output fast

**Tip:** Review the output carefully — autonomy trades off against control.

---

## Intermediate Techniques

### 6. Multi-Draft Synthesis

**What it is:** Generate multiple solutions, compare them, then combine the best elements into a superior final answer.

**When to use it:**
- There's no single "right" answer
- You want to avoid settling on the first idea
- Quality matters and you have time to explore options

**The prompt:**
```
Approach this problem three different ways:

1. Generate three distinct solutions
2. Compare the strengths and weaknesses of each
3. Synthesize the best elements into a final answer
```

Or shorter:
```
Give me three different approaches to this. Compare them. Then combine the best parts into a final recommendation.
```

**Where this helps:**
- Strategy and planning
- Creative work (messaging, naming, design)
- Problem-solving with no clear answer
- Proposals or recommendations
- Process improvement

**Tip:** You can push for more diversity by adding "make sure the three approaches are genuinely different, not variations of the same idea."

---

### 7. Chain-of-Thought

**What it is:** Ask the AI to show its reasoning step by step.

**When to use it:**
- Complex problems with multiple factors
- You want to understand the logic, not just the answer
- Debugging or analysis tasks

**The prompt:**
```
Think through this step by step before giving your answer.
```

Or more structured:
```
Work through this problem:

1. First, identify the key factors
2. Then, analyse each factor
3. Consider the tradeoffs
4. Finally, make a recommendation

Show your thinking at each step.
```

**Where this helps:**
- Problem-solving and troubleshooting
- Decision-making
- Analysis and evaluation
- Learning new concepts

---

### 8. Decomposition

**What it is:** Break a big task into smaller, manageable pieces.

**When to use it:**
- The task feels overwhelming
- You need to delegate or distribute work
- You want to track progress incrementally

**The prompt:**
```
Break this task into subtasks:

1. List all the components needed
2. Put them in logical order
3. Identify dependencies
4. Estimate relative effort for each

Then work through them one by one.
```

**Where this helps:**
- Project planning
- Writing long documents
- Process design
- Onboarding and training materials
- Any complex deliverable

---

### 9. Few-Shot (Examples)

**What it is:** Show the AI examples of what you want before asking it to produce something.

**When to use it:**
- The style or format is hard to describe
- You have good examples to work from
- Consistency matters

**The prompt:**
```
Here are two examples of the style I want:

Example 1:
[Paste example]

Example 2:
[Paste example]

Now write one for [your topic] in the same style.
```

**Where this helps:**
- Matching brand voice or tone
- Creating consistent documentation
- Training others on a format
- Any task where "I'll know it when I see it"

**Tip:** Two or three examples usually beats one. Variety helps the AI understand what's consistent vs. what varies.

---

### 10. Persona

**What it is:** Ask the AI to take on a specific role or perspective.

**When to use it:**
- You want a specific expertise or viewpoint
- The tone or approach matters
- You want to simulate a conversation with a particular type of person

**The prompt:**
```
You are a [role] with [X years] of experience in [domain].

Approach this as you would in your professional context.
```

**Examples:**
- "You are a sceptical CFO reviewing this proposal"
- "You are a customer who has never used our product"
- "You are a junior team member asking clarifying questions"

**Where this helps:**
- Testing how different audiences might react
- Getting specialised perspectives
- Role-playing difficult conversations
- Preparing for presentations or pitches

---

## Advanced Techniques

### 11. Reflection

**What it is:** Ask the AI to review and improve its own output.

**When to use it:**
- Quality matters more than speed
- You want to catch errors or gaps
- The first output was okay but not great

**The prompt:**
```
Review your response:

1. What's missing or weak?
2. What assumptions did you make?
3. How could this be clearer or more useful?

Then provide an improved version.
```

**Where this helps:**
- Important documents or communications
- Analysis where accuracy matters
- Any output that will be widely shared

---

### 12. Adversarial / Red Team

**What it is:** Ask the AI to find problems, holes, or weaknesses.

**When to use it:**
- You want to stress-test an idea
- Preparing for tough questions
- Risk assessment

**The prompt:**
```
Act as a critical reviewer. Find the weaknesses in this:

- What could go wrong?
- What am I missing?
- What would a sceptic say?
- Where are the gaps in logic?

Be direct and specific.
```

**Where this helps:**
- Preparing proposals or pitches
- Risk planning
- Pre-mortems
- Strategy review
- Preparing for Q&A

---

### 13. Debate / Steelman

**What it is:** Explore multiple sides of an issue before concluding.

**When to use it:**
- Complex decisions with valid arguments on both sides
- You want to avoid confirmation bias
- Stakeholders have different views

**The prompt:**
```
Before giving a recommendation:

1. Present the strongest case FOR this approach
2. Present the strongest case AGAINST this approach
3. Identify what would need to be true for each to be right
4. Then give your balanced assessment
```

**Where this helps:**
- Strategic decisions
- Policy changes
- Investment or resource allocation
- Any decision with significant tradeoffs

---

### 14. Socratic

**What it is:** Instead of giving answers, the AI asks questions to help you think through something.

**When to use it:**
- You want to develop your own thinking
- Coaching or mentoring situations
- You're not sure what you actually need

**The prompt:**
```
Don't give me answers. Instead, ask me questions that will help me think through this problem myself.

Ask one question at a time. Go deeper based on my responses.
```

**Where this helps:**
- Personal development
- Working through difficult decisions
- Coaching conversations
- Clarifying your own thinking

---

## Combining Techniques

The real power comes from combining techniques. Here are some effective combinations:

**Discovery + Execution:**
```
1. Interview me about this project (Interview)
2. Then complete it without further input (Execution)
```

**Quality-focused delivery:**
```
1. Break this into components (Decomposition)
2. For each, define what excellent looks like (Rubric)
3. Execute and self-evaluate (Reflection)
```

**Decision support:**
```
1. Summarise the situation (BLUF)
2. Present both sides (Debate)
3. Stress-test the options (Adversarial)
4. Make a recommendation (Chain-of-thought)
```

---

## Quick Reference: Job Function Examples

| Function | Useful techniques | Example use |
|----------|------------------|-------------|
| **Project Management** | Decomposition, Templating, Summarisation | Break down project plans, consistent status updates, meeting summaries |
| **Sales** | Persona, Adversarial, Few-shot | Anticipate objections, match successful email styles |
| **Marketing** | Rubric, Interview, Templating | High-quality content, campaign briefs, consistent brand voice |
| **Finance** | Chain-of-thought, Summarisation, Adversarial | Analysis with clear logic, digest long reports, stress-test assumptions |
| **HR** | Interview, Templating, Persona | Job descriptions, consistent documentation, simulate candidate perspective |
| **Engineering** | Decomposition, Reflection, Execution | Break down tasks, review code/designs, generate documentation |
| **Leadership** | BLUF, Debate, Socratic | Executive summaries, balanced decision-making, coaching |
| **Operations** | Templating, Execution, Decomposition | Standard procedures, process documentation, workflow design |

---

## Tips for Better Results

1. **Be specific** — vague input = vague output
2. **Iterate** — your first prompt rarely needs to be your last
3. **Show, don't just tell** — examples beat descriptions
4. **Constrain the output** — length, format, what to include/exclude
5. **State the goal** — what will you do with this output?
6. **Save what works** — build a library of prompts that deliver

---

## Getting Started

Pick one technique that matches a task you do regularly. Try it this week. Refine it. Then add another.

The goal isn't to memorise all of these — it's to have options when the default approach isn't working.

---

## Resources

- [OpenAI Prompt Packs](https://academy.openai.com/public/tags/prompt-packs-6849a0f98c613939acef841c) — ready-to-use prompt templates for common tasks
