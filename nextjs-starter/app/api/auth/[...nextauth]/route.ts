// app/api/auth/[...nextauth]/route.ts
// Auth.js v5 route handler — handles /api/auth/signin, /api/auth/callback, etc.
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
