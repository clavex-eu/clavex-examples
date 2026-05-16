import { useEffect } from "react";
import { useHandleRedirectCallback } from "@clavex/react";
import { useNavigate } from "react-router-dom";

/**
 * Callback page — handles the OIDC redirect after sign-in.
 *
 * Clavex redirects to <origin>/callback?code=...&state=... after the user
 * authenticates. This page exchanges the code for tokens and restores the
 * user's previous location (stored in appState during signIn).
 */
export default function Callback() {
  const { handleRedirectCallback } = useHandleRedirectCallback();
  const navigate = useNavigate();

  useEffect(() => {
    handleRedirectCallback()
      .then((appState) => {
        const returnTo = (appState as { returnTo?: string } | undefined)?.returnTo ?? "/dashboard";
        navigate(returnTo, { replace: true });
      })
      .catch((err) => {
        console.error("[@clavex/react] redirect callback failed:", err);
        navigate("/", { replace: true });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p style={{ color: "#6b7280" }}>Completing sign in…</p>;
}
