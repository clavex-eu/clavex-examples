# clavex-examples

Working starter kits for the [Clavex Identity Platform](https://clavex.io).

| Starter | Stack | Auth pattern |
|---|---|---|
| [`nextjs-starter`](./nextjs-starter) | Next.js 14 App Router | Auth.js v5 + `@clavex/nextauth-provider` · passkey enroll · org switcher |
| [`vite-react-starter`](./vite-react-starter) | Vite + React | `@clavex/react` · PKCE SPA · passkey login |
| [`express-api`](./express-api) | Express + TypeScript | M2M `client_credentials` · JWKS JWT verification |

All starters boot in 3 commands. Every env var is documented in `.env.example`.

## Prerequisites

- A running Clavex instance (cloud or [self-hosted](https://clavex.io/docs/quickstart))
- Node.js ≥ 18
- An org slug + OIDC client credentials (run `npx create-clavex-app` to generate them automatically)

## Documentation

- [Quickstart](https://clavex.io/docs/quickstart)
- [SDK reference](https://clavex.io/docs/sdk)
- [API reference](https://clavex.io/docs/api)
