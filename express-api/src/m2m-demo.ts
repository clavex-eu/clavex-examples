/**
 * m2m-demo.ts — demonstrates the full machine-to-machine (M2M) auth flow:
 *
 *   1. Service requests a token from Clavex using client_credentials grant
 *   2. Token is used to call a protected endpoint on this API
 *
 * Run:  npm run demo
 */

const issuer = process.env.CLAVEX_ISSUER;
const clientId = process.env.CLAVEX_M2M_CLIENT_ID;
const clientSecret = process.env.CLAVEX_M2M_CLIENT_SECRET;
const apiBase = `http://localhost:${process.env.PORT ?? 3001}`;

if (!issuer || !clientId || !clientSecret) {
  console.error("Missing CLAVEX_ISSUER, CLAVEX_M2M_CLIENT_ID or CLAVEX_M2M_CLIENT_SECRET in .env");
  process.exit(1);
}

// ── Step 1: Obtain an access token via client_credentials ─────────────────────

console.log("Step 1 — requesting access token from Clavex…");

const tokenRes = await fetch(`${issuer}/token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope: "openid",
  }),
});

if (!tokenRes.ok) {
  const body = await tokenRes.text();
  console.error(`Token request failed (${tokenRes.status}): ${body}`);
  process.exit(1);
}

const { access_token, expires_in, token_type } = (await tokenRes.json()) as {
  access_token: string;
  expires_in: number;
  token_type: string;
};

console.log(`  ✔ Got ${token_type} token (expires in ${expires_in}s)\n`);

// ── Step 2: Call a protected API endpoint ────────────────────────────────────

console.log("Step 2 — calling protected endpoint…");

const dataRes = await fetch(`${apiBase}/api/protected/data`, {
  headers: { Authorization: `Bearer ${access_token}` },
});

if (!dataRes.ok) {
  const body = await dataRes.text();
  console.error(`API call failed (${dataRes.status}): ${body}`);
  process.exit(1);
}

const data = await dataRes.json();
console.log("  ✔ Response from /api/protected/data:");
console.log(JSON.stringify(data, null, 4));

// ── Step 3: Inspect JWT claims ────────────────────────────────────────────────

console.log("\nStep 3 — fetching /whoami to inspect JWT claims…");

const whoamiRes = await fetch(`${apiBase}/api/protected/whoami`, {
  headers: { Authorization: `Bearer ${access_token}` },
});

const whoami = await whoamiRes.json();
console.log("  ✔ JWT claims seen by the API:");
console.log(JSON.stringify(whoami, null, 4));
