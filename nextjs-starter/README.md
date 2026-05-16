# nextjs-starter

Next.js 14 App Router starter wired to Clavex via [Auth.js v5](https://authjs.dev) (`next-auth`).

**Features:** sign-in/out · protected routes · passkey enrollment · org switcher · access token forwarding to API routes

## Quickstart

```bash
cp .env.example .env.local   # fill in your Clavex credentials
npm install
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable | Description |
|---|---|
| `CLAVEX_ISSUER` | OIDC issuer — `https://<your-domain>/<org-slug>` |
| `CLAVEX_CLIENT_ID` | Confidential client ID (for Auth.js server-side session) |
| `CLAVEX_CLIENT_SECRET` | Client secret — never exposed to the browser |
| `NEXTAUTH_SECRET` | Random 32+ char string (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_CLAVEX_URL` | Same as `CLAVEX_ISSUER` — used by `@clavex/react` client widgets |
| `NEXT_PUBLIC_CLAVEX_CLIENT_ID` | Public OIDC client ID (no secret) — for passkey enrollment widget |

> **Two clients?**  Auth.js uses a *confidential* client (secret kept server-side).
> The passkey enrollment widget (`@clavex/ui`) runs in the browser and uses a separate *public* client
> (authorization_code + PKCE, no secret). Create both in the Clavex admin dashboard.

## Project structure

```
app/
  layout.tsx          Root layout — SessionProvider + ClavexProvider
  page.tsx            Public home page
  dashboard/page.tsx  Protected — shows session claims
  security/page.tsx   Protected — passkey enrollment + org switcher
  api/auth/[...nextauth]/route.ts   Auth.js route handler
components/
  Providers.tsx       Client-side provider wrapper
  Navbar.tsx          Sign-out button + org switcher
auth.ts               NextAuth config + Clavex provider
middleware.ts         Route protection
```

## Docs

- [Auth.js + Clavex](https://clavex.io/docs/integrations/nextauth)
- [Passkey enrollment](https://clavex.io/docs/passkeys)
- [Organization switcher](https://clavex.io/docs/orgs)
