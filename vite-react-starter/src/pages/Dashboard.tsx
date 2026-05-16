import { useUser, useOrg, useSignOut } from "@clavex/react";
import { OrganizationSwitcher } from "@clavex/ui";

export default function Dashboard() {
  const { user } = useUser();
  const { org } = useOrg();
  const { signOut } = useSignOut();

  return (
    <div>
      <h1>Dashboard</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", color: "#6b7280", marginBottom: "0.75rem" }}>
          User profile
        </h2>
        <pre
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1rem",
            fontSize: "0.875rem",
          }}
        >
          {JSON.stringify(
            {
              id: user?.id,
              name: user?.name,
              email: user?.email,
              orgSlug: org?.slug,
              orgId: org?.id,
              roles: user?.roles,
              acr: user?.acr,
            },
            null,
            2,
          )}
        </pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", color: "#6b7280", marginBottom: "0.75rem" }}>
          Switch organisation
        </h2>
        <OrganizationSwitcher />
      </section>

      <button
        onClick={() => signOut()}
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.375rem",
          background: "white",
          cursor: "pointer",
          fontSize: "0.875rem",
        }}
      >
        Sign out
      </button>
    </div>
  );
}
