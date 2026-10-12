# binnacle-site

Binnacle's website: a Keel app on dply Edge (Workers runtime).

- `/` marketing · `/buy` → shafer.llc/account/buy/binnacle (Stripe Checkout; shafer.llc issues the license) · `/download` → dl.shafer.llc/binnacle/Binnacle.dmg (R2)
- `/appcast.xml` → dl.shafer.llc/binnacle/appcast.xml. Images live in `public/img/`.

Release: bump `VERSION` in the app repo, commit and push, then run Shipyard's
`~/Projects/Apps/desktop/shipyard/ship.sh ~/Projects/Apps/desktop/binnacle`. It builds, signs,
notarizes, creates the GitHub release with the Sparkle feed, and `scripts/publish-downloads.sh`
copies it to R2. Bump `version` in `src/config.ts` and deploy the site.

Dev: `npm install && npx wrangler dev`.
