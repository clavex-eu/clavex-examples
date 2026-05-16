import express from "express";
import { publicRouter } from "./routes/public.js";
import { protectedRouter } from "./routes/protected.js";
import { verifyJwt } from "./middleware/verifyJwt.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json());

// ── Public routes — no auth required ─────────────────────────────────────────
app.use("/api/public", publicRouter);

// ── Protected routes — valid Clavex JWT required ──────────────────────────────
app.use("/api/protected", verifyJwt, protectedRouter);

app.listen(port, () => {
  console.log(`express-api listening on http://localhost:${port}`);
  console.log(`  GET /api/public/health      — no auth`);
  console.log(`  GET /api/protected/data     — requires Bearer token`);
  console.log(`  GET /api/protected/whoami   — echoes JWT claims`);
  console.log(`\nRun \`npm run demo\` in another terminal to see the M2M flow.`);
});
