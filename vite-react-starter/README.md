# vite-react-starter

Vite + React SPA starter using [`@clavex/react`](https://clavex.io/docs/sdk/react) with PKCE authorization code flow.

**Features:** sign-in/out · protected routes · passkey login · passkey enrollment · user profile

## Quickstart

```bash
cp .env.example .env.local   # fill in your Clavex credentials
npm install
npm run dev                  # http://localhost:5173
```

## Environment variables

| Variable | Description |
|---|---|
| `VITE_CLAVEX_URL` | OIDC issuer — `https://<your-domain>/<org-slug>` |
| `VITE_CLAVEX_CLIENT_ID` | Public client ID (authorization_code + PKCE) |

No client secret — this is a browser SPA using PKCE.

## Project structure

```
src/
  main.tsx          ClavexProvider (zero-config, reads VITE_* env vars)
  App.tsx           React Router — public + protected routes
  pages/
    Home.tsx        Landing page with sign-in button + passkey login
    Dashboard.tsx   Protected — user profile + org info
    Security.tsx    Protected — passkey enrollment
    Callback.tsx    OIDC redirect callback handler
  components/
    ProtectedRoute.tsx   Redirect to home if not signed in
```

## Docs

- [@clavex/react SDK](https://clavex.io/docs/sdk/react)
- [PKCE flow](https://clavex.io/docs/oidc/pkce)
- [Passkeys](https://clavex.io/docs/passkeys)
