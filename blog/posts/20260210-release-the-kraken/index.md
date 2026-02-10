---
title: Release the Kraken
layout: layouts/post.njk
tags: post
date: 2026-02-10
description: "I didn't write this blog post. Claude did. Here's what that means—and why Claude Code is far more than a coding tool."
---

**I didn't write this.**

A couple of months ago, in "Guilty as Charged," I made a point about writing my own words. About skin in the game. About the cliff jump of putting your unpolished thoughts out there, rather than having an AI iron over the nuances of your personality.

I meant every word of it. And yet here we are.

This blog post was written by Claude—specifically, Claude Opus 4.6, running in Claude Code, Anthropic's command-line agent. Not because I've abandoned my principles, but because *this particular article* is about what Claude Code can do. And what better way to demonstrate that than to let it speak for itself?

Think of this as a controlled experiment. I'm reviewing every word. I'm steering the structure, the tone, the points I want to make. But the typing? That's Claude. Let's see if you can tell.

## What is Kraken Mode?

In my day-to-day work building Kaufmann Health—a therapist matching platform I'm bootstrapping solo—I use Claude Code for *everything*. Not just writing code. Everything.

I call it **Kraken Mode**.

Picture this: I sit down at my terminal, type "release the kraken," and Claude loads my full business context. Revenue metrics from Supabase. Ad performance from Google Ads. Active decisions from Google Drive. Therapist pipeline status. It pulls all of this in, orients itself, and asks: "What do you want to work on?"

From that single terminal window, I can:

- **Run SQL queries** against my production database to debug a booking issue
- **Pull KPI dashboards** from Metabase via its API, parsed into readable markdown
- **Write a QA testing guide** and upload it to Google Drive so my team can access it
- **Analyze Google Ads spend** and adjust campaign configurations
- **Refactor a React component** and run the tests to make sure it works
- **Draft an email** to a therapist partner and review it before sending

All without switching tools. All from one conversation.

The name "Kraken" stuck because that's what it feels like—tentacles reaching into every corner of the business simultaneously. SQL here, a doc there, a code fix over there. One brain, many arms.

{% image "blog/posts/20260210-release-the-kraken/kraken-workspace.jpeg", "Solarpunk illustration of a man at a terminal with luminous tentacles connecting to databases, dashboards, and documents", "(min-width: 40em) 720px, 100vw", [600, 900, 1200] %}

## SQL Every Morning

Here's a thing that surprises people: I don't open Metabase most mornings. I open my terminal.

"How many bookings came in yesterday?" Claude runs the query. "Show me failed lead alerts in the last 24 hours." Query. "What's the conversion rate from directory visit to booking this week?" Query, calculation, summary.

Previously, I'd spend 20 minutes navigating Metabase dashboards, cross-referencing filters, getting confused about which date range I was looking at. Now it's a conversation. I ask a question, I get an answer, I ask a follow-up. The database is just *there*, like a colleague who memorized all the numbers.

And when something looks off—say bookings dipped on Tuesday—I can immediately go deeper. "Show me the event log for Tuesday. Were there errors? Was the cron job running?" Claude checks. If there's a bug, we fix it. Right there. Same session.

## The Metabase Hack (Claude's Idea, Not Mine)

This one still amazes me.

I used to spend *hours* building Metabase dashboards. Getting the SQL right, formatting the visualizations, debugging why a LEFT JOIN was inflating my counts. Metabase is a great tool, but the feedback loop was painfully slow for someone who doesn't live in SQL every day.

Then Claude suggested something I would never have thought of: **use the Metabase API directly**, pull the query results, and render them as markdown tables in the terminal.

We built a small integration. Claude hits the Metabase API, executes saved questions, and formats the results as clean markdown with headers and context. No browser needed. No clicking through dashboards. Just: "Show me the KPI overview" and an instant table with all the metrics.

I went from hours of dashboard building to seconds of asking.

## The Context Problem (and Why It Nearly Drove Me Insane)

Here's the thing nobody talks about with AI tools: **context is everything, and most setups give you none.**

For months, I was stuck on Claude Desktop—Anthropic's chat app—trying to figure out how to give Claude the context of our conversation. Every new session started from zero. Who is my wife? That's Katherine. How much recurring revenue do we have? Am I at zero, 50, or 500 dollars? How many therapists are on the platform? What did we decide last week about the pricing model?

Every. Single. Time.

And it's not just about convenience. I *need* Claude to push back on me. My global instructions say: challenge my assumptions aggressively, give me confidence levels, call out procrastination disguised as planning, tell me when I'm wrong. That's useless if Claude doesn't know the facts. You can't push back on someone's revenue assumptions if you don't know their revenue.

I thought about building custom skills to compress context. I tried uploading markdown files to Claude Desktop's project knowledge. You know what happened? It was stale by the next day. Definitely by the next week. Then I'd have to rewrite the context, re-upload it, delete the old document. Repeat. It was maddening.

## The Breakthrough: rclone and Google Drive

The solution was **rclone**—an open-source tool that syncs with cloud storage from the command line.

I won't lie: setting it up was a *pain*. It took hours. The Google Drive OAuth flow is its own adventure. On macOS, it needs Full Disk Access permissions, which had me restarting my Mac in safe mode to grant. Not fun.

But it was **so worth it**.

Here's what rclone unlocked: Claude Code can now **read and write to Google Drive** directly from the terminal. When I need to update a QA testing guide after shipping a new feature, I tell Claude: "Update the QA guide to reflect the new booking confirmation flow." It pulls the current doc, edits it, converts it to a native Google Doc (using `pandoc` and rclone's `--drive-import-formats`), and uploads it. My team sees the update in their Drive. Done.

But the real breakthrough was bigger than team documents.

I realized that Google Drive could be the **bridge between Claude Code and Claude Desktop**. Claude Desktop has a Google Drive MCP integration—it can search and read native Google Docs. So I designed a system:

1. All important context lives on Google Drive as **native Google Docs** (not uploaded `.docx` or `.md` files—those aren't searchable by the MCP)
2. There's an "active context" document that describes the current state of the business: revenue, pipeline, open decisions, recent changes
3. That document links to deeper docs when Claude needs more detail on a specific topic
4. In Claude Desktop's project instructions, I simply write: "Access Google Drive and look for the active context file in the AI Context folder"

That's it. Now when I sit down at my terminal, Claude Code already knows what happened yesterday via its `CLAUDE.md` files and memory. When I open Claude Desktop on my phone on the go, it pulls the same context from Google Drive. Cross-device, always up to date. No more re-uploading stale markdown files.

**Context is infrastructure.** It's not about which AI tool you use. It's about how you organize your information so that *any* tool can pick it up and be useful immediately.

{% image "blog/posts/20260210-release-the-kraken/context-layers.jpeg", "Solarpunk illustration of floating platforms connected by bridges and vines, representing layered context architecture", "(min-width: 40em) 720px, 100vw", [600, 900, 1200] %}

## The CLAUDE.md Hierarchy

Claude Code reads `CLAUDE.md` files automatically when it starts a session—think of them like configuration files, but for AI behavior. I've built a layered hierarchy:

- **Global** (`~/.claude/CLAUDE.md`): Who I am, how Claude should respond, decision autonomy rules
- **Project** (`project/CLAUDE.md`): Tech stack, patterns, commands for that specific codebase
- **Local** (`CLAUDE.local.md`): Private integrations, API configs, lookup tables (gitignored)
- **Memory** (`memory/MEMORY.md`): Learnings that persist across sessions—things Claude discovered and wrote down for next time

Each layer stays focused. The global file doesn't know about Supabase table schemas. The project file doesn't know about my communication preferences. The memory file captures things like "iCloud folders break `ls` commands—use direct file paths instead" (a real one that cost me an hour).

This hierarchy means Claude Code loads into a session already knowing the project, the patterns, and the hard-won lessons from previous sessions. It's not starting from zero. It's continuing.

And then there are **skills**—reusable command packages that extend what Claude Code can do. Claude Desktop has skills too, but honestly, they're limited. In Claude Code? Skills are a different beast. I didn't think an AI-generated `.docx` or an Excel spreadsheet could look *this* good. There are skills for creating slide decks, generating PDFs, building entire web apps with proper UI design. The ecosystem is wild.

## If You Want to Set This Up

This article isn't just me showing off. If you're building something—solo or with a small team—and you want this kind of workflow, here's the practical path:

1. **Start with CLAUDE.md files.** This is free and immediate. Create a `CLAUDE.md` in your project root telling Claude about your stack, your patterns, your preferences. Create a global one at `~/.claude/CLAUDE.md` with how you want Claude to behave. This alone is a massive upgrade.

2. **Set up rclone for Google Drive.** Yes, it's painful. Budget a few hours. You'll need to create a Google Cloud project, set up OAuth credentials, and grant Full Disk Access on macOS. Follow the rclone docs carefully. The payoff is that Claude Code can read and write your team's shared documents.

3. **Design your context for cross-tool access.** If you use Claude Desktop too, make sure your key documents are native Google Docs (not uploaded files). Write project instructions in Claude Desktop that point to your active context file on Drive. Now both tools share the same brain.

4. **Build incrementally.** Don't try to set up everything at once. Start with `CLAUDE.md`, add Google Drive when you need shared docs, add Metabase integration when you're tired of clicking through dashboards. Each layer compounds.

## A Word on Open Claw (and Security)

There are open-source projects trying to replicate what Claude Code does—agentic AI with full terminal access. Some are impressive. I'd recommend holding off.

When you give an AI agent access to your terminal, your database, your file system, your Google Drive—you're handing it the keys to everything. Claude Code handles this with a permission system: it asks before running destructive commands, it respects `.gitignore` for sensitive files, it has clear boundaries around what it can do autonomously versus what needs confirmation.

The open-source alternatives? Not always so careful. I've seen setups where the agent has unrestricted `sudo` access, can push to production without review, can read and transmit environment variables containing API keys. The speed is intoxicating. The risk is real.

This matters especially in healthcare. My database has real patient-adjacent data. My API keys control real services. A rogue agent—or even a well-meaning agent with a hallucination—could cause real harm.

If you want significant productivity gains, Claude Code is the way to go. The permission model isn't a limitation—it's what makes the whole thing viable for real work.

## The Meta Point

So here we are. Claude wrote this blog post. You've been reading its words for the last few minutes.

Was it obvious? Probably, in places. Claude tends to be more structured than I am. More even-keeled. It doesn't misspell "atop of" or write "nouances" (both real Konstantin-isms from previous posts). It doesn't go on tangents about cliff jumping or South Park.

But here's what matters: every claim in this article is accurate. Every workflow described is real. The Metabase hack, the Google Drive pipeline, the CLAUDE.md hierarchy, the daily SQL—this is my actual workflow, right now, as I build Kaufmann Health.

Claude didn't make this up. It *knows* this, because it lives inside this system. It reads the instruction files. It runs the queries. It writes the docs. It even generated the illustrations for this post—via Google's Imagen API, called from the terminal, using my custom Solarpunk style prompt. The Kraken's tentacles reach far.

I still believe in writing your own words. I still believe in the cliff jump. But sometimes the most honest thing you can do is let the tool demonstrate itself—and be transparent about it.

This is what Claude Code actually is: not a coding assistant. **A business operating system that happens to be really good at code.**

Release the kraken.
