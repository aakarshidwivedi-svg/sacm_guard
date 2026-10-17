# The Manipulation Decoder: Think Before You Click.

## Run locally
    npm install
    cp .env.example .env     # optional: add ANTHROPIC_API_KEY for AI mode
    npm run dev:server       # http://localhost:3001
    npm run dev:client       # http://localhost:5173
    npm test && npm run typecheck

Without an API key the rule-based analyzer is used automatically. Env vars: see `.env.example`.

## Architecture
`server/src`: `schema.ts` (Zod), `rules.ts` (rule engine), `urls.ts` (local URL heuristics, never fetches), `ai.ts` (LLM call, schema-validated, evidence must be a verbatim substring, falls back to rules), `app.ts` (routes, rate limit, validation).
`client/src`: single-page scanner with highlighting, link checks and copyable reply.

## Optional features
- **History/auth (Postgres):** set `DATABASE_URL` and `AUTH_SECRET`, then `npm -w server run migrate`. Accounts use scrypt + HMAC-signed tokens (stored client-side in localStorage). Saved records hold risk level, tactic names, summary and a redacted excerpt only.
- **URL reputation:** set `SAFE_BROWSING_API_KEY` (Google Safe Browsing). Results show separately from local heuristics.
- **E2E:** `npx playwright install chromium && npm run e2e`.

## Status
Nothing here has been installed, type-checked or run (the build sandbox had no network). Run install, `npm test`, `npm run typecheck` and `npm run e2e` and fix what surfaces. Tailwind is used with preflight disabled alongside the legacy CSS; Dashboard uses CSS bars rather than Recharts. Vercel/Render config files are not included (see Deploy).

## Limitations
Scores are estimates. Keyword rules miss novel scams and can false-positive. Absence of warning signs never means a message or link is safe.

## Deploy
Frontend on Vercel (set build to `npm -w client run build`, proxy `/api` to backend). Backend on Render (`npm -w server run build`, start `npm -w server run start`, set env vars).
