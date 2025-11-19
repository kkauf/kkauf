---
title: How NOT to launch a product (A PM's perspective)
layout: layouts/post.njk
tags: post
date: 2025-11-19
permalink: "/blog/how-not-to-launch-a-product/"
---

# How NOT to launch a product (A PM's perspective)

Yesterday, I was genuinely excited when Gemini 3 Pro ("Preview") dropped.

The last few iterations of LLMs have been overly focused on coding as a siloed skill. But Erik Schluntz from Anthropic put it best in a recent interview:

> "So we really see coding as a very **fundamental skill** for an agent that's going to have a lot of **spillover effect** to be able to make Claude great at all sorts of things. And sort of like train on the hardest thing first and then everything else will become easy."

Gemini 3 actually pulled that exact quote for me from the video source:  
{% image "blog/posts/Screenshot 2025-11-19 at 09.07.10.png", "Screenshot from Gemini 3 showing the Erik Schluntz quote", "(min-width: 40em) 720px, 100vw", [600, 900, 1200] %}

It’s amazing where we are now. We finally have a model that has graduated beyond just coding—which, let's be honest, was mostly just structured regurgitation of patterns—into a true reasoning frontier.

**Why this matters to me**  
For a Product Manager, this shift is existential. In my time at N26 and Urban Sports Club, or even during my own startup attempts here in Germany, my job was defined by the "hand-off." I’d spend days defining requirements, hand them to engineering, and wait three weeks for a deliverable.

The emergence of these models has completely changed my career trajectory. I’m no longer just defining the "what"; I’m building it. I’ve gone from delivering in three weeks (via a team) to delivering in three days (by myself).

That is why I was so excited when I realized Google had also silently launched **Google Antigravity**, its new "agent-first" IDE.

**The Context: Why Antigravity matters**  
The announcement of Antigravity explains the chaos of last summer. When Google acqui-hired the Windsurf (Codeium) team back in July, I was hopeful. I had preferred Windsurf over Cursor, but after the team was split up and the product went to Cognition, it stalled. The "hardcore mode" culture there resulted in bugs and feature bloat (like "Code Maps") rather than core improvements.

Antigravity was supposed to be the answer. It represents a paradigm shift that I’ve been waiting for:

- **Cursor/Windsurf:** The AI is a Co-pilot. I type, it suggests. 
- **Antigravity:** The Agent is the Pilot. I assign a high-level task ("Refactor the auth module"), and it navigates the codebase and terminal to execute it.

**The Launch: Shit Parfait**  
On paper, this is the future of my workflow. In practice, the launch yesterday (November 18) was a disaster.

It started with a complete "shadow drop"—overshadowed entirely by the Gemini 3 release. While influencers like Theo.gg were dropping videos, the actual product was broken for the rest of us. Enterprise workspaces were locked out by auth bugs. Personal accounts hit 404 errors. It took the team hours to deploy a fix.

When I finally got access, I ignored the UI glitches (which were severe) because the core engine was singing. I was converting a project from React to NextJS, and Gemini 3 was handling the refactoring, running tests, and fixing errors autonomously. It was the "3 days to 3 hours" promise coming true.

And then, this message appeared:  
{% image "blog/posts/Pasted image 20251119092148.png", "Quota limit exceeded error message screenshot", "(min-width: 40em) 720px, 100vw", [600, 900, 1200] %}

**The Dead End**  
"Model quota limit exceeded."

I’m a product person. I understand unit economics. I am happy to pay for value. I went immediately to the upgrade page, credit card in hand, ready to buy a Team or Pro plan.

And that is when I found the critical failure in this launch:  
{% image "blog/posts/Screenshot 2025-11-19 at 09.22.35.png", "Antigravity pricing page screenshot showing no paid plans", "(min-width: 40em) 720px, 100vw", [600, 900, 1200] %}

The Antigravity team decided to launch without any payments integration.

- **Individual plan:** $0/month.
- **Team/Enterprise:** "Coming Soon."
- **Quota:** Extremely low, with no way to increase it.

The pricing page claims "Unlimited Command requests" and "Generous rate limits," but the reality is that I was blocked after 20 minutes of work.

**Conclusion**  
I am trying to understand the goal here. They built an incredible engine (Gemini 3) and put it in a forward-thinking chassis (Antigravity), but they forgot the fuel tank.

By blocking users from upgrading, they haven't just annoyed us; they've made the tool useless for professional work. I can't build if I get locked out halfway through a refactor.

It feels like they are already preparing this product for the Google Graveyard before it even lived.

I’ll be back to using Windsurf until Google figures out if they actually want us to use this product. Or until the other tools copy what Windsurf did?