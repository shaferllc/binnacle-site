# binnacle-site

Binnacle's website: a Keel app on dply Edge (Workers runtime).

- `/` marketing · `/buy` → Lemon Squeezy checkout (`LEMONSQUEEZY_CHECKOUT_URL`) · `/download` → newest DMG
- `/appcast.xml` Sparkle feed built from `src/data/releases.ts`
- DMGs live in `public/download/`, images in `public/img/`

Release: notarize the DMG in `../../desktop/binnacle` (`NOTARY_PROFILE=… ./make-app.sh --dmg`), copy it to
`public/download/`, run Sparkle's `sign_update` on it, add the signature/length to `releases.ts`, deploy.

Dev: `npm install && npx wrangler dev`.
