# BlueCollarClose marketing site

Static multi-page site built from the **Marketing Website Build Brief**.

## Pages

| Path | Purpose |
|------|---------|
| `/` | Home — full StoryBrand story |
| `/how-it-works.html` | Product walkthrough (transitional CTA) |
| `/for-reps.html` | Rep privacy promise + Solo |
| `/about.html` | Mission, Omaha, commitments |
| `/early-access.html` | Team + Solo forms |
| `/privacy.html` / `/terms.html` | Placeholders |

## Design

- Tokens from `bcc-platform` design system (light/dark)
- Libre Franklin
- App icon mark (not wordmark text in logo lockup)
- Product screenshots: light/dark pairs under `assets/img/app/`

## Run locally

```bash
python3 -m http.server 4173   # from the repo root
# open http://localhost:4173
```

## Publishing

Publishing is **manual-only** — merging does not deploy. From the Actions tab:

- **Publish bluecollarclose.com** (`deploy.yml`) — deploys `main` to
  **https://bluecollarclose.com** via GitHub Pages; refuses any other ref.
- **Deploy to staging** (`deploy-staging.yml`) — publishes any branch to
  **https://hackberryholdingcompany.github.io/bluecollarclose-staging/** for review
  (subpath-rewritten, noindexed).

`main` is PR-only; the maintainer runs the publish workflow. See `CLAUDE.md` for the
full model.

## Form wiring

Early-access forms (`data-early-access-form`) relay through **FormSubmit** to
bluecollarclose@gmail.com — AJAX post from `site.js` with the plain form `action` as
no-JS fallback, honeypot field for spam. No account or dashboard; submissions exist
only as emails. Swap the endpoint in `site.js` + the form `action`s to move to
Formspree or a real backend later (issue #1).

## Claims discipline

No invented stats, no fabricated testimonials, no pricing. Announced launch date: October 1, 2026 (App Store + Google Play) — no other invented dates. Industry stats on Home include source links.
