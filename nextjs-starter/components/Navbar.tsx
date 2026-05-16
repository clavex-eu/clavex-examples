"use client";
import { signOut, useSession } from "next-auth/react";
import { OrganizationSwitcher } from "@clavex/ui";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.75rem 1.5rem",
        borderBottom: "1px solid #e5e7eb",
        fontFamily: "sans-serif",
      }}
    >
      <Link href="/" style={{ fontWeight: 700, textDecoration: "none", color: "inherit" }}>
        My App
      </Link>

      <div style={{ flex: 1 }} />

      {session ? (
        <>
          <Link href="/dashboard" style={{ textDecoration: "none", color: "#4b5563" }}>
            Dashboard
          </Link>
          <Link href="/security" style={{ textDecoration: "none", color: "#4b5563" }}>
            Security
          </Link>

          {/* Org switcher — fetches memberships from Clavex and redirects on select */}
          <OrganizationSwitcher />

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              padding: "0.375rem 0.875rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              background: "white",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Sign out
          </button>
        </>
      ) : null}
    </nav>
  );
}
