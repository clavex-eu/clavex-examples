import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { ClavexProvider } from "@clavex/nextauth-provider";

export const config: NextAuthConfig = {
  providers: [
    ClavexProvider({
      issuer: process.env.CLAVEX_ISSUER!,
      clientId: process.env.CLAVEX_CLIENT_ID!,
      clientSecret: process.env.CLAVEX_CLIENT_SECRET!,
      // Request offline_access so Auth.js can refresh the token silently.
      scope: "openid email profile offline_access",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // On first sign-in, persist Clavex-specific claims into the JWT.
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        const p = profile as Record<string, unknown> | undefined;
        token.orgId = p?.org_id as string | undefined;
        token.orgSlug = p?.org_slug as string | undefined;
        token.roles = (p?.roles ?? []) as string[];
      }
      return token;
    },
    async session({ session, token }) {
      // Expose Clavex claims on the client-side session object.
      return {
        ...session,
        accessToken: token.accessToken as string | undefined,
        user: {
          ...session.user,
          orgId: token.orgId as string | undefined,
          orgSlug: token.orgSlug as string | undefined,
          roles: (token.roles ?? []) as string[],
        },
      };
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
