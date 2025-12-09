---
title: Software Engineering is Dead. Long live Software Engineering.
layout: layouts/post.njk
tags: post
date: 2025-12-09
description: "AI coding tools make software engineers superfluous. I argue that, at the same time, we need them more than ever."

---

Back in December 2024, I had finally recruited a former colleague and friend of mine, a software engineer, to collaborate with me on startup projects.

This was not the first time we had talked about this, and they said, "just hit me up when you have an idea." I had a brilliant idea! To build an app that would enable people to stay on top of their personal goals with OKRs, down to the daily items that would help them push their goals.

Right, you've probably heard that one before... Not a particularly original idea. But then again, every idea is original if you give it your own twist. Infuse it with your own "Why," as Simon Sinek would put it.

So I went ahead and started mocking up in Figma. I'd need to do user interviews next, to understand people's habits and preferences. And then we could build this. It would take minimal overhead to run, distribution via App Store, brilliant. If it doesn't work out, onto the next idea! 

But my friend was not ready to go there with me. Too much risk involved in putting in all this work upfront for an uncertain idea. They bailed on me. Years of friendship gone. They ghosted me.

I realized that waiting for a technical co-founder was just me procrastinating out of fear, thinking I'd need another person to start validating a business idea. So the least I could do would be to build a landing page, do user interviews, validate demand. And use a SaaS to distribute my courses. No engineer needed!

So I thought about how to pursue my "Why" in another way. One that would require less software and more execution. Maybe teaching! That's what I did in my last job; I built an academy from scratch with minimal help. *Kaufmann Academy* was born. 

I figured I could teach people how to validate ideas with Product Management and Lean Startup techniques. I wanted to stay away from the corporate world and enable those that are dearest to me: entrepreneurs. Specifically those who don't (get to) attend Y Combinator with their business ideas. Not disruptive enough. No way to make 1000x return on that investment (Peter Thiel's investment thesis in his seminal book *Zero To One*: competition is for losers; you need to build a monopoly).

The problem: I had no credibility. I turned on my internal sales and discovery machine and talked to dozens of entrepreneurs in different areas. Built a website. Ran ads. Lean experimentation. Exactly the stuff I wanted to sell in my courses. But people asked me: "How can you teach me how to validate an idea if you've never successfully run a business?" Accelerators told me: this is a very hard market. "We're competing over talent for the accelerator program, even though we're paying them money to be here and invest in their business!"

That was a punch in the gut. But much-needed feedback.

I shut down *Kaufmann Academy* two weeks later (we'll talk about my unusual naming process another time).

## The game changer

There was something that stayed with me long after shutting down my Academy project: I had learned to use Codeium / Windsurf IDE. It's much like Cursor, a tool much more known, but I just prefer Windsurf due to its superior pricing for my specific use-cases.

I started to code basic websites years ago, took courses on Codecademy and so on, even considered joining a 4-year coding bootcamp (Codam in Amsterdam) in order to learn to code. This was usually when I felt stuck and frustrated with my job as a Product Manager. 

It sure is frustrating sometimes to sit on the sidelines, shout commands at Software Engineers—and the best I could do in a technical meeting was to moderate the discussion and give emotional support. I was not technical enough to take the notes or spell even the word *Kotlin* or *JSON* correctly.

But surely that started to change after a couple of years on the job. I moved onto more technical roles, where I thrived, being analytical and curious about technology. And so when I sat down in front of my computer to build a landing page for *Kaufmann Academy*, I had a choice: get frustrated about how to get this or that box to align with that element in Squarespace or something, or code it myself, and learn something in the process.

Not for the first time I decided: I'll do it myself. The harder path will get easier eventually.

And boy did it get easier! 

## Enter the Product Engineer

![Generated Image December 09, 2025 - 10_23AM](generated-image-dec-09-10-23am.jpeg)

The term "Product Engineer" has been around for a while—popularized by companies like Linear and PostHog to describe developers who care deeply about the product "why," not just the code "how." But AI has changed the game. It hasn't just optimized that role; it has democratized it.

When I started to build *Kaufmann Health*, the question of whether to build a landing page in anything but my own code did not even cross my mind. I had learned by now how to build a basic responsive web app using React, and learned that Next.js was a thing, and how it would enable me to build even more and even better.

I still don't know how to set up a project in Next.js or React or anything. And that's okay. Because there's an LLM with me every step of the way. 

I know basic architectural patterns, I know how to deploy a web app with Netlify or Cloudflare Pages, and learned quickly to do the same with Vercel. I know I need a database in my app, and I know to tell the LLM I'm using not to go crazy with perfecting my database schema when I will change it every week. 

I have an idea of the pros and cons of NoSQL vs. something like a Postgres DB, and I know that environment variables should not be committed to my GitHub repo. 

I know how to firefight when things go wrong. 

I know how to test the app I am building.

I know how to monitor my app and make product decisions.

And when I want to build a new feature, I settle in for a longer session with Claude to write requirements, brainstorm edge-cases and acceptance criteria, and ultimately give well-scoped tickets to my engineering friend in Windsurf. ChatGPT was long the best coding friend I had, because the general-purpose OpenAI models (ironically, I barely ever used the ones optimized for coding, Codex) were best for understanding product requirements and executing on those end to end.

Claude Opus 4.5 is a different beast. It understands product. It understands testing what it makes. It interacts poorly with Windsurf unfortunately, compared to the ChatGPT models (like it won't use todo lists unless explicitly prompted to do so, does not follow the instructions context as well), but it's just so superior at building products and coding that it just one-shots things. It's amazing.

I'm still dealing with a bit of a turbulent engineer who is not to be fully trusted. And yet, there's been one consistent trend in 2025: LLMs are getting **f'ing good at this stuff**.

So good, that I don't need my human software engineering friend anymore to validate a product idea and build a **fully functional app** to match you with a therapist, with e-mail and SMS verification, transactional emails, cron jobs, database, algorithms, GDPR-compliant, magic link implementation, and more.

## Long live Software Engineering

![Generated Image December 09, 2025 - 10_24AM](generated-image-dec-09-10-24am.jpeg)

But there's a problem, and the critical reader will have had it in mind since reading the first sentence of this essay: "he's going to need proper Software Engineers soon." And that's absolutely correct.

But maybe not for just the reasons you're thinking.

I am convinced LLMs are going to get so good at coding you won't effectively need a Software Engineer anymore for simple to moderately complex projects. For a bank like Mercury in the United States (amazing product!) or N26 in Europe, there's no way around having dedicated Software Engineering teams. There's too much at stake, too much complexity, too much regulatory and security complexity. That is not to say that, a few years down the road, AIs won't be able to one-shot a banking backend. I just don't think you'd want them to.

For apps like *Kaufmann Health*, which are not revolutionary in terms of their technical features at all (in startups, we've *been there, done that* many times over), I'm convinced we can get **very far** with LLMs alone. 

But things are going to get more difficult for my business soon enough: say I wanted to build a service to reconcile bookings on the platform with invoices we sent. Things are starting to be very high stakes. Or security and data privacy. We're good for now, but as the app matures and expands its feature-set, do I feel comfortable handing this off to an LLM?

The answer is **a very firm no**. 

There's one extra reason that I've been feeling all along as a solopreneur, and that might ultimately drive me to hire a small Product Team down the line: **cognitive load** and **context switching**.

In an average week, I am dealing with: user feedback, sales, marketing / ads, software engineering, and operations. Every other week, finance and business development. **There is no way any one person is equally good with all of these issues**.

While AI removes the barrier to writing code, it drastically increases the mental toll of jumping between roles. You are the PM, the QA, and the Dev all in the span of an hour.

In the context of a company, you might think you can replace all Product Teams (Designer, Product Manager, Software Engineer—maybe separate for web, iOS/Android and backend!) with single Product Engineers. And that's the trend some companies are going towards.

Say you had dedicated designers and a marketing team only. A single human Product Engineer is dealing with: user feedback and interviews, refining requirements, monitoring business metrics, setting targets for business metrics, data analysis, software engineering, security, infrastructure, and so on. 

**I am not convinced any single person can stay sane and be an expert in all of these domains**.

And science tends to agree: **diverse teams make better decisions than individuals**. 

## Living on borrowed time

So as I build my company solo, I feel I am living on borrowed time. There is only so much time I can sustain this. I know I am taking shortcuts in some domains. I know I am failing my users in some way by doing everything all at once.

This is possible for low-complexity products. The complexity at which one is able to do this increases over time, as tools become more powerful.

But there's always a point at which one needs to delegate—whether the Product Engineer in a cutting-edge company, or a solo entrepreneur bootstrapping a company (if it turns out to gain traction).

![Generated Image December 09, 2025 - 10_26AM](generated-image-dec-09-10-26am.jpeg)