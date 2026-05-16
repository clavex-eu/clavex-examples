import { auth } from "@/auth";
import { signIn } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  if (session) {
    return (
      <div>
        <h1>Welcome back, {session.user.name?.split(" ")[0]}!</h1>
        <p style={{ color: "#6b7280" }}>
          Org: <strong>{session.user.orgSlug ?? "—"}</strong>
          {session.user.roles.length > 0 && (
            <> · Roles: <strong>{session.user.roles.join(", ")}</strong></>
          )}
        </p>
        <p>
          <a href="/dashboard" style={{ color: "#7c3aed" }}>Go to dashboard →</a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        Next.js + Clavex Starter
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Auth.js v5 · passkey enrollment · org switcher
      </p>
      <form
        action={async () => {
          "use server";
          await signIn("clavex");
        }}
      >
        <button
          type="submit"
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
      </form>
    </div>
  );
}
