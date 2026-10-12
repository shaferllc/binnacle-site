# binnacle-site

Binnacle's website: a Keel app on dply Edge (Workers runtime).

- `/` marketing · `/buy` → shafer.llc/account/buy/binnacle (Stripe Checkout; shafer.llc issues the license) · `/download` → dl.shafer.llc/binnacle/Binnacle.dmg (R2)
- `/appcast.xml` → dl.shafer.llc/binnacle/appcast.xml. Images live in `public/img/`.

Release: from the app repo, `NOTARY_PROFILE=… ./make-app.sh --dmg` then
`scripts/publish-downloads.sh "What changed"`. It signs the DMG for Sparkle and uploads the DMG
and the feed to R2. Bump `version` in `src/config.ts` and deploy the site.

Dev: `npm install && npx wrangler dev`.
