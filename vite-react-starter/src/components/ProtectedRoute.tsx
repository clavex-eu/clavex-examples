import { useUser } from "@clavex/react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <p style={{ color: "#6b7280" }}>Loading…</p>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
