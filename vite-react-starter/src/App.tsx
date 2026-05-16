import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUser } from "@clavex/react";
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";
import Security from "./pages/Security.js";
import Callback from "./pages/Callback.js";
import ProtectedRoute from "./components/ProtectedRoute.js";

function Navbar() {
  const { user, isSignedIn } = useUser();
  const { signOut } = { signOut: () => {} }; // replaced below

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
      <a href="/" style={{ fontWeight: 700, textDecoration: "none", color: "inherit" }}>
        My App
      </a>
      <div style={{ flex: 1 }} />
      {isSignedIn && (
        <>
          <a href="/dashboard" style={{ textDecoration: "none", color: "#4b5563", fontSize: "0.9rem" }}>
            Dashboard
          </a>
          <a href="/security" style={{ textDecoration: "none", color: "#4b5563", fontSize: "0.9rem" }}>
            Security
          </a>
          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{user?.email}</span>
        </>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/security"
            element={
              <ProtectedRoute>
                <Security />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
