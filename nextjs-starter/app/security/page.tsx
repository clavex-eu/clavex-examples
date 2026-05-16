import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PasskeyEnrollment } from "@clavex/ui";

export default async function SecurityPage() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div>
      <h1>Security</h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Add a passkey so you can sign in without a password next time.
      </p>

      {/*
       * PasskeyEnrollment is a client component from @clavex/ui.
       * It uses the usePasskey() hook from @clavex/react, which is powered
       * by the <ClavexProvider> added in components/Providers.tsx.
       *
       * The PKCE flow for passkey registration runs entirely in the browser
       * using the public OIDC client (NEXT_PUBLIC_CLAVEX_CLIENT_ID).
       */}
      <PasskeyEnrollment
        title="Add a passkey"
        description="Sign in faster with biometrics or a security key — no password required."
        onSuccess={() => {
          // In a Client Component you'd show a toast here.
          // Server components can't use react-hot-toast, so we log instead.
          console.log("Passkey enrolled!");
        }}
      />
    </div>
  );
}
