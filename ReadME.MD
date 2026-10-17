### Hi, I'm Konstantin.

I build complex infrastructure for businesses that can't afford to get it wrong. Payments, GDPR, data isolation, compliance — the stuff most developers avoid.

AI-native product leader, formerly at [N26](https://n26.com) and [Urban Sports Club](https://urbansportsclub.com). Building [OneSomatic](https://onesomatic.com), software for somatic practitioners in Germany and the US, and [Is AI Conscious Yet?](https://isaiconsciousyet.com).

Based in Central New York. More at [kkauf.com](https://kkauf.com).

---

#### This repo

Source code for my personal site. Vanilla HTML/CSS/JS built with [Eleventy](https://www.11ty.dev/).

The blog was unpublished and removed from public Git history on September 23,
2026. A private local archive preserves the originals. The `blog/` directory is
Git-ignored and excluded from Eleventy output in `.eleventy.js`. Builds clear `_site` first so
previously generated articles cannot be deployed. A root `404.html` ensures
removed URLs return a not-found response on Cloudflare Pages.

```bash
npm install && npm run dev
```
