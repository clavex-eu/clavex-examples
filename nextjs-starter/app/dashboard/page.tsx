import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div>
      <h1>Dashboard</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", color: "#6b7280", marginBottom: "0.5rem" }}>
          Session claims
        </h2>
        <pre
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1rem",
            fontSize: "0.875rem",
            overflow: "auto",
          }}
        >
          {JSON.stringify(
            {
              name: session.user.name,
              email: session.user.email,
              orgSlug: session.user.orgSlug,
              orgId: session.user.orgId,
              roles: session.user.roles,
              hasAccessToken: Boolean(session.accessToken),
            },
            null,
            2,
          )}
        </pre>
      </section>

      <section>
        <h2 style={{ fontSize: "1rem", color: "#6b7280", marginBottom: "0.5rem" }}>
          Forwarding the access token to your own API
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
          {`// In an API route or Server Action:
const session = await auth();
const response = await fetch("https://your-api.example.com/data", {
  headers: { Authorization: \`Bearer \${session?.accessToken}\` },
});`}
        </pre>
      </section>
    </div>
  );
}
