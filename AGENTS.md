# kkauf

kkauf.com: Eleventy site on git-connected Cloudflare Pages. Delivery rules: `~/.agents/skills/delivery/SKILL.md`. This file adds only what is special here.

- Deploy: push `main` (Pages builds it).
- Commit hook (`.githooks/pre-commit`, `git config core.hooksPath .githooks`): `~/github/Kaufmann.Earth/scripts/canon-check.py --surfaces kkauf,cv-fulltime` blocks a commit when the site copy or the full-time CV source drifts from `public-profile/canon.md`.
- After every publish: `python3 ~/github/Kaufmann.Earth/scripts/canon-check.py --live --linkedin <snapshot.md>` (see Kaufmann.Earth AGENTS.md).
- CV PDF: `files/konstantin-kaufmann-cv.pdf` = the full-time CV (AI Product Lead).
