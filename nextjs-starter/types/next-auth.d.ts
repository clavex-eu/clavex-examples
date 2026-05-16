import { DefaultSession } from "next-auth";

// Extend the built-in session/JWT types with Clavex-specific fields.
declare module "next-auth" {
  interface Session {
    /** Raw Clavex access token — forward to your own API routes as Bearer. */
    accessToken?: string;
    user: {
      orgId?: string;
      orgSlug?: string;
      roles: string[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    orgId?: string;
    orgSlug?: string;
    roles?: string[];
  }
}
