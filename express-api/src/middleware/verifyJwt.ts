import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
import type { Request, Response, NextFunction } from "express";

// Augment Express request to carry the verified JWT payload downstream.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      jwtPayload?: JWTPayload & {
        org_id?: string;
        org_slug?: string;
        roles?: string[];
        client_id?: string;
      };
    }
  }
}

const issuer = process.env.CLAVEX_ISSUER;
if (!issuer) throw new Error("CLAVEX_ISSUER env var is required");

// JWKS is fetched once and cached by jose — automatic key rotation is handled
// transparently (jose re-fetches when it encounters an unknown kid).
const JWKS = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "missing_token", message: "Authorization: Bearer <token> required" });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      // Reject tokens issued by any other Clavex org or instance.
      issuer,
      // Optionally restrict to a specific audience:
      // audience: process.env.API_AUDIENCE,
    });

    req.jwtPayload = payload as Request["jwtPayload"];
    next();
  } catch (err) {
    res.status(401).json({
      error: "invalid_token",
      message: err instanceof Error ? err.message : String(err),
    });
  }
}
