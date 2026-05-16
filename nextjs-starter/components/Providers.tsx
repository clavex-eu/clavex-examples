"use client";
// Providers.tsx — client component that wraps children in Auth.js SessionProvider
// and @clavex/react ClavexProvider (for PasskeyEnrollment + OrganizationSwitcher).
import { SessionProvider } from "next-auth/react";
import { ClavexProvider } from "@clavex/react";
import "@clavex/ui/styles.css";
import type { Session } from "next-auth";

export function Providers({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      {/*
       * ClavexProvider reads NEXT_PUBLIC_CLAVEX_URL + NEXT_PUBLIC_CLAVEX_CLIENT_ID
       * from env vars automatically — no props required (zero-config).
       * It powers the PasskeyEnrollment and OrganizationSwitcher UI widgets.
       */}
      <ClavexProvider>{children}</ClavexProvider>
    </SessionProvider>
  );
}
