import { PasskeyEnrollment } from "@clavex/ui";

export default function Security() {
  return (
    <div>
      <h1>Security</h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Add a passkey to sign in without a password.
      </p>

      <PasskeyEnrollment
        onSuccess={() => alert("Passkey enrolled! Sign in with it next time.")}
        onError={(err) => console.error("Passkey enrollment failed:", err)}
      />
    </div>
  );
}
