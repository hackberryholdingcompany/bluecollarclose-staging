# CLAUDE.md — bluecollarclose-marketing

The public marketing site for BlueCollarClose, live at **https://bluecollarclose.com**.
Plain static HTML/CSS/JS at the **repo root** — no framework, no build step. Keep it that
way; introducing a framework, build tool, or dependency needs maintainer approval first
(see bcc-platform `handbook/tool-selection.md` — the same criteria apply here).

## Publishing model — read before touching main

- **Publishing is manual-only.** Merging to `main` does NOT deploy. The maintainer
  publishes by running `.github/workflows/deploy.yml` ("Publish bluecollarclose.com")
  from the Actions tab; it refuses to run from any ref but `main`. `main` remains
  branch-protected (PR-only, admins included) and **only the maintainer merges or runs
  the publish workflow**. Agents: open PRs, never merge them, never dispatch either
  deploy workflow yourself.
- **Staging previews:** `.github/workflows/deploy-staging.yml` ("Deploy to staging",
  also manual-only) publishes any branch to
  https://hackberryholdingcompany.github.io/bluecollarclose-staging/ for review before
  merge. It rewrites root-absolute URLs for the subpath and noindexes every page; auth
  is the `STAGING_DEPLOY_KEY` secret (a write deploy key scoped to the
  `bluecollarclose-staging` repo).
- Work on branches (`feature/<slug>` / `bugfix/<slug>`), reference a GitHub issue in
  every PR, and keep docs in the same commit as the change (bcc-platform norms apply).
- DNS lives at Namecheap (apex A records + `www` CNAME → `hackberryholdingcompany.github.io`);
  the custom domain + HTTPS are configured in the repo's Pages settings, not in files here.

## Develop

```bash
python3 -m http.server 4173   # from the repo root; open http://localhost:4173
```

On the Mac Studio, `demobot4` / `demobot4-alt` open a session in this checkout
(bcc-platform `jt_swarm/mac/demobot-launcher.zsh`, slot 4).

## Content rules

- **Claims discipline:** no invented stats, no fabricated testimonials, no pricing.
  The announced launch date is **October 1, 2026** (App Store + Google Play, set by the
  maintainer 2026-08-25); don't invent any other dates. Industry stats keep their
  source links.
- Design tokens mirror the bcc-platform design system (light/dark); typeface Libre
  Franklin; the logo lockup uses the app icon mark, not wordmark text.
- `privacy.html` / `terms.html` are placeholders — flag, don't invent legal text.
- Early-access forms (`data-early-access-form`) relay via FormSubmit to
  bluecollarclose@gmail.com (no account; submissions arrive as email). A real backend
  remains tracked in issue #1's follow-ups.
