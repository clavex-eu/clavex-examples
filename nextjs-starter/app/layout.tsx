import type { Metadata } from "next";
import { auth } from "@/auth";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Clavex Next.js Starter",
  description: "Next.js 14 App Router starter with Clavex identity",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the session server-side and pass it to the client SessionProvider
  // to avoid a flash of unauthenticated content on first render.
  const session = await auth();

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <Providers session={session}>
          <Navbar />
          <main style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
