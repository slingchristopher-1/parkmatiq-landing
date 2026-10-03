# ParkMatiq landing page

One self-contained HTML file. Collects email addresses to gauge how many people
want the app before it launches.

## Build

`template.html` is the source. The build inlines the DM Sans and DM Mono web
fonts as data URIs, so the published page loads nothing from Google — the brand
book treats that as a privacy rule, not a preference.

```bash
npm install
npm run build     # → index.html (standalone) and artifact.html (body only)
```

- `index.html` — complete document, what Pages publishes.
- `artifact.html` — the same page without the document skeleton, for pasting
  somewhere that supplies its own.

Both are generated. Edit `template.html`, never the output.

## Collecting addresses

The sign-up form validates and confirms on screen but **posts nowhere**. Set
`ENDPOINT` near the bottom of `template.html` to your mail provider's URL
(Mailchimp, Buttondown, Formspark) and rebuild:

```js
var ENDPOINT = null;   // ← your endpoint here
```

Until then it collects nothing.

## A/B testing

The two elements worth testing are marked in a comment at the top of
`template.html`: the headline and the CTA label, each with a variant B.

## What the page claims

The copy follows the app's actual failsafe, which is deliberately asymmetric:

- ignore the start prompts → **no session starts**, so you cannot be charged by accident
- ignore the stop prompts → **the session keeps running**, so you cannot be fined by accident

Keep it in step with `src/core/autopilot.js` in the app repo. If that rule
changes, this page is wrong until it changes too.

The market figures in the "Waarom nu" band come from the June 2026 parking-app
market research in the shared drive.
