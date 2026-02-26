---
title: "CAIRN: Building a Personal AI Assistant from Claude Code and Unix Primitives"
date: 2026-02-26
description: "How I replaced a full AI agent platform with Claude Code, bash scripts, cron jobs, and deliberate simplicity."
tags: ["ai", "claude-code", "personal-ai", "unix", "context-engineering"]
featured: true
draft: false
---

# CAIRN: Building a Personal AI Assistant from Claude Code and Unix Primitives

A cairn is a stack of stones placed by hand on hillsides. Simple materials, placed deliberately, built to endure. No mortar, no engineering — just the right stones in the right order.

That's the design philosophy behind my personal AI assistant. The name works on two levels — a cairn is deliberate simplicity, and it sounds like Erin, because this is built in Ireland.

Claude Code is the foundation stone. Bash scripts, cron jobs, LanceDB, markdown files — each one placed with intention. Nothing fancy. Everything functional.

## The Backstory

I ran [OpenClaw](https://openclaw.ai) as my personal AI for 9 days. In that time, my agent handled 77+ distinct tasks across scheduling, email triage, finance tracking, CRM, health monitoring, project building, research, and family logistics. 15 automated checks ran daily. It worked. Really well, actually.

Then Claude Code shipped Remote Control.

That changed the equation.

OpenClaw's core value proposition for me was two things: a messaging interface (talk to your AI from your phone) and autonomous scheduling (the AI does things without you asking). Remote Control gives you messaging natively — your phone talks to Claude Code running on your machine, no middleware required. And autonomous scheduling? That's just a cron job.

The entire platform layer I was depending on collapsed into two things I already had.

## The Architecture

```
Phone
  │
  ▼
Encrypted Bridge (Remote Control)
  │
  ▼
Always-on Mac
  ├── Claude Code CLI
  │   ├── CLAUDE.md (soul + operating instructions)
  │   └── .claude/agents/ (8 subagents)
  │
  ├── MCP Connectors
  │   ├── Gmail
  │   ├── Google Calendar
  │   ├── GitHub
  │   └── Vercel
  │
  ├── tools/ (bash scripts)
  │   ├── banking/
  │   ├── memory/
  │   ├── crm/
  │   ├── rss/
  │   ├── health/
  │   └── utils/
  │
  ├── launchd cron jobs
  ├── LanceDB (vector memory)
  └── Local services
```

Two tool layers. That's it.

**MCP Connectors** handle the services that have them — Gmail, Google Calendar, GitHub, Vercel. These are the "right tool for the job" integrations. Structured APIs, proper auth flows, typed responses.

**Bash scripts** handle everything else — banking (Monzo API), memory management, CRM, RSS monitoring, health tracking, utilities. If an MCP connector doesn't exist, a 50-line bash script probably does the job.

MCP for connectors, scripts for the rest.

## What It Replaces

Everything my OpenClaw setup did:

- **Scheduling & calendar management** — reading, creating, conflict detection
- **Email triage** — scanning inbox, categorising, recommending actions
- **Finance tracking** — Monzo API integration, spending analysis, budget monitoring
- **CRM** — capturing people mentioned in conversation, building contact profiles over time
- **Health monitoring** — workout reminders, habit tracking
- **Project building** — full development workflow with subagents
- **Research** — web search, content summarisation, feed monitoring
- **Family logistics** — shared calendars, reminders, household coordination
- **Morning briefings** — weather, calendar, email summary, blog updates
- **Blog/RSS monitoring** — tracking feeds, surfacing new posts
- **Proactive checks** — 15 daily automated scans across all of the above

77+ tasks across 9 days. All of it maps onto CAIRN's simpler architecture.

## The Directory Structure

```
~/cairn/
├── CLAUDE.md                 # Soul + operating instructions
├── .claude/agents/           # 8 specialized subagents
├── tools/
│   ├── banking/              # Monzo API scripts
│   ├── memory/               # Memory management
│   ├── crm/                  # Contact tracking
│   ├── rss/                  # Feed monitoring
│   ├── health/               # Health & fitness
│   └── utils/                # General utilities
├── memory/
│   ├── lancedb/              # Vector store
│   └── daily/                # Daily markdown logs
├── data/
│   ├── crm/                  # Contact data
│   ├── finance/              # Financial records
│   ├── health/               # Health data
│   └── home/                 # Household info
├── cron/
│   ├── prompts/              # Cron job prompt templates
│   └── plists/               # launchd plist files
├── logs/
└── scripts/
```

Everything is files. Markdown for configuration, bash for tools, JSON for data, SQLite/LanceDB for search. No database servers. No container orchestration. No deployment pipeline. It runs on my Mac.

## Build Order

Five phases over 10 days:

1. **Foundation** — Claude Code + CLAUDE.md + Remote Control bridge. Get the basic conversation loop working.
2. **Memory** — LanceDB vector store + daily markdown logs. The AI needs to remember things across sessions.
3. **Tools** — Bash scripts for each capability domain. Banking, CRM, RSS, health, utils.
4. **Automation** — launchd cron jobs for morning briefings, inbox triage, proactive checks. The AI acts without being asked.
5. **Migration** — Port the 77+ task patterns from OpenClaw. Validate everything works.

Each phase produces something usable. After phase 1, I have a conversational AI. After phase 2, it has memory. After phase 3, it can do things. After phase 4, it does things on its own. After phase 5, it's fully replaced the previous system.

## Why Not OpenClaw?

Let me be clear: OpenClaw is good software. For multi-user messaging, built-in memory compaction, and the social agent network (agents that talk to other agents), it's genuinely better than what I'm building. If you need an AI that multiple people interact with through different channels, use OpenClaw.

But for a single user on a single machine? The math changes.

| OpenClaw | CAIRN |
|----------|-------|
| Gateway daemon | Claude Code CLI |
| Multi-agent routing | Claude Code subagents |
| Heartbeat daemon | `launchd` cron |
| SOUL.md + AGENTS.md | CLAUDE.md |
| Plugin system | MCP connectors + bash |
| Memory compaction service | LanceDB + markdown |

Every row is a simplification. Same capability, fewer moving parts.

Remote Control eliminated the messaging gap. Claude Code's native subagent system replaced multi-agent routing. Cron replaced the heartbeat daemon. A single CLAUDE.md replaced the split soul/agents configuration.

The platform layer was solving problems I no longer have.

## The Philosophy

I've been building software for 17 years. The pattern I keep seeing is: the systems that last are the ones built from simple, well-understood parts. Not because simplicity is a virtue in itself — it's because simple parts fail in predictable ways, and predictable failures are manageable failures.

A cairn doesn't need maintenance. The stones don't rot. They don't need updating. They sit there, doing their job, until someone deliberately moves them.

That's what I want from my personal AI infrastructure. Bash scripts don't have dependency trees. Cron jobs don't have runtime errors. Markdown files don't need migrations. Claude Code's CLAUDE.md is a text file I can read and edit in any editor.

When something breaks — and it will — I want to open a bash script and read 50 lines, not trace a request through three services and a message queue.

Specification over production. Simple materials, deliberately placed. Stones in the right order.

---

*CAIRN is in active development. I'll write more as the build progresses. If you're running Claude Code with Remote Control and want to compare notes, [find me on GitHub](https://github.com/barry-napier).*
