---
title: The frontier shifts again (and why I was wrong)
layout: layouts/post.njk
tags: post
date: 2025-11-26
description: "The vendor lock-in trap and a new workflow for Product Management."
---

## The vendor lock-in trap

Last week, I wrote about the disastrous launch of Google’s Antigravity IDE. I was frustrated by the usage limits and the pricing errors. But in hindsight, I was frustrated by the wrong thing. The bugs will be fixed. The pricing will be sorted.

The real problem is **vendor lock-in**, which is deadly when the technological frontier shifts on a weekly basis.

I was ready to go all-in on Google's ecosystem. But then, almost on cue, Anthropic dropped **Claude Opus 4.5**.

## Opus 4.5 changes the calculus

I’ve been coding with Opus 4.5 for the last few days, and "lit" doesn’t quite cover it. It is a massive step function improvement over Sonnet 4.5.

We are currently living through a chaotic timeline:

1. **Gemini 3 Pro** drops (huge context window, great reasoning).
2. **ChatGPT 5.1** arrives (with so many "o-series" variations that I’ve lost track of which one is for reasoning and which is for speed, not to mention Codex variants and Max versions).
3. **Claude Opus 4.5** releases and seemingly reclaims the coding throne.

{% image "blog/posts/52303b11db76017fd0c2f73c7fafa5c752515979-2600x2236.webp", "Chart comparing AI model capabilities", "(min-width: 40em) 720px, 100vw", [600, 900, 1200] %}

The fatal flaw of Google Antigravity is that it tethers you to the Google ecosystem. Sure, they currently let you toggle on Claude Sonnet, but let’s be real: Google will always optimize the UX for Gemini. They have no incentive to make their competitors shine.

Compare this to **Windsurf** or **Cursor**. These tools are model-agnostic. If OpenAI ships a dud and Anthropic ships a god-model, I can switch my backend in a dropdown menu and keep working. In a world of perfect competition, being able to arbitrage intelligence models is the only way to stay efficient.

## The danger of the "Walled Garden"

I am genuinely anxious about a future where LLMs lose their neutrality.

We are already seeing this in e-commerce. If you ask Amazon's Rufus AI for a product recommendation, is it giving you the *best* product, or the product with the highest margin for Amazon? The algorithm is inevitably biased toward "Fulfilled by Amazon" or sponsored listings.

I worry Google Antigravity is the first step toward that same bias in software development. Will the IDE one day suggest a Google Cloud function over a simpler Vercel deployment because it "hallucinated" that it was the better architecture?

Right now, the AI market feels like perfect competition. But if the interface (the IDE) and the intelligence (the Model) are owned by the same company, that competition disappears. We need to keep our tools modular to keep them honest.

## The "PM Commit": A new workflow

But the shifting frontier isn't just about which model I use; it’s about *how* I work.

Two years ago, the Product Manager's job was an exercise in patience. We wrote elaborate requirements, handed them off to engineering, and then watched their blood pressure spike while we tapped our feet waiting for a deliverable.

That era is over.

With tools like Claude Opus 4.5, the PM is no longer just the architect of the "What"; we are the drafters of the "How."

I see a new workflow emerging—let’s call it the **"PM Commit."**

1. **The PM** writes the requirements and uses an agentic IDE to build the functional prototype or feature. We don't just write the ticket; we write the first draft of the code.
2. **The Engineer** steps in for high-level review, security (SecOps), and architectural alignment.

Let me be clear: I am not advocating for PMs to go rogue in the codebase. I am advocating for a true hand-in-hand workflow.

Gone are the days of a PM sitting idle, wishing for a minor UI overhaul or a copy change that is blocked because the devs are busy with backend migrations. In this new world, the PM executes the "last mile" of the product. We are the first to touch the codebase with well-defined requirements, and the engineers ensure it scales.

This requires a fundamental shift in how we teach Product Management. We aren't just "CEOs of the product" anymore; we are the hands-on builders of it.