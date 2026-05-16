import { Router } from "express";

export const protectedRouter = Router();

// GET /api/protected/data — example protected resource
protectedRouter.get("/data", (req, res) => {
  const { sub, org_slug, roles, client_id } = req.jwtPayload!;

  res.json({
    message: "Access granted to protected data",
    callerSub: sub,
    callerOrgSlug: org_slug ?? null,
    callerRoles: roles ?? [],
    // For M2M (client_credentials) tokens, sub === client_id.
    isM2M: sub === client_id,
    data: {
      items: ["alpha", "beta", "gamma"],
      total: 3,
    },
  });
});

// GET /api/protected/whoami — echo all JWT claims (useful for debugging)
protectedRouter.get("/whoami", (req, res) => {
  res.json({ claims: req.jwtPayload });
});
