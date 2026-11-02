# Dependency maintenance — 2026-11-02

Updated all examples within their existing major dependency lines. Replaced floating SDK `latest` references with explicit compatible release ranges and added one package-lock.json per example. NextAuth beta.32 is pinned. No application credentials or environment files are committed.

Express: production build passes; npm audit reports no findings.

Vite/React: production build passes after correcting existing SDK hook usage (isLoaded instead of isLoading; useHandleRedirectCallback returns the callback directly) and removing an unused placeholder. The latest compatible Vite 5 release still has 1 high and 3 moderate dependency findings; the suggested fix requires a Vite major upgrade.

Next.js: updated to the latest Next 14 patch, 14.2.35. Its build still fails because the currently published Clavex NextAuth provider declares a readonly checks tuple, while NextAuth expects a mutable checks array. The SDK repository's build passing alone does not validate consumer integration. A provider typing correction and release are required before this example can build against the published package. The build also warns about Auth.js/Jose APIs in the Edge runtime; runtime integration has not been validated. npm audit still reports 1 critical, 4 high and 16 moderate dependency findings, including Next 14; the recommended Next 16 migration is intentionally deferred because it is a breaking upgrade. This example is not ready to recommend for production.

No login, token exchange or integration request was sent to the live Clavex deployment. Builds are local checks, not an end-to-end authentication validation.
