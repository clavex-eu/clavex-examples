import { useUser, useSignIn, usePasskey } from "@clavex/react";

export default function Home() {
  const { isSignedIn, isLoading } = useUser();
  const { signIn } = useSignIn();
  const { authenticate: passkeyLogin, isSupported: passkeySupported } = usePasskey();

  if (isLoading) return <p style={{ color: "#6b7280" }}>Loading…</p>;

  if (isSignedIn) {
    return (
      <div>
        <h1>You&apos;re signed in!</h1>
        <p>
          <a href="/dashboard" style={{ color: "#7c3aed" }}>Go to dashboard →</a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        Vite + React + Clavex
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        PKCE SPA · passkey login · zero-config
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 280 }}>
        {/* Standard OIDC sign-in — opens Clavex login page */}
        <button
          onClick={() => signIn()}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Sign in with Clavex
        </button>

        {/* Passkey login — WebAuthn conditional UI (no OIDC redirect) */}
        {passkeySupported && (
          <button
            onClick={() => passkeyLogin()}
            style={{
              padding: "0.75rem 1.5rem",
              background: "white",
              color: "#374151",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            🔑 Sign in with passkey
          </button>
        )}
      </div>
    </div>
  );
}
