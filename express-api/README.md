# express-api

Express + TypeScript API starter demonstrating machine-to-machine (M2M) authentication with Clavex.

**Features:**
- `verifyJwt` middleware — validates Clavex access tokens via JWKS (no shared secret)
- `client_credentials` grant — how a backend service obtains a token
- Demo client — shows the full M2M call cycle end-to-end

## Quickstart

```bash
cp .env.example .env        # fill in your Clavex credentials
npm install
npm run dev                 # http://localhost:3001
```

## Try it

```bash
# In a second terminal — get a token and call the protected endpoint
npm run demo
```

## Environment variables

| Variable | Description |
|---|---|
| `CLAVEX_ISSUER` | OIDC issuer — `https://<your-domain>/<org-slug>` |
| `CLAVEX_M2M_CLIENT_ID` | Machine-to-machine client ID (client_credentials grant) |
| `CLAVEX_M2M_CLIENT_SECRET` | M2M client secret |
| `PORT` | API port (default: 3001) |

## How it works

```
Service A                    Clavex                       Service B (this API)
   |                            |                               |
   |── POST /token ─────────────>|                               |
   |   grant_type=client_creds   |                               |
   |<── access_token ────────────|                               |
   |                            |                               |
   |── GET /api/protected/data ──────────────────────────────────>|
   |   Authorization: Bearer <token>                             |
   |                            |<── GET /.well-known/jwks.json ─|
   |                            |── JWKS ────────────────────────>|
   |                            |   (cached after first request)  |
   |<── 200 { data: ... } ──────────────────────────────────────--|
```

## Docs

- [M2M / client_credentials](https://clavex.io/docs/oidc/client-credentials)
- [JWT verification](https://clavex.io/docs/tokens/verify)
