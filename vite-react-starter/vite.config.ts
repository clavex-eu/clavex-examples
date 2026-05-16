import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Proxy /clavex-api to the Clavex server during development to avoid CORS
  // issues if your Clavex instance is on a different domain.
  // server: {
  //   proxy: {
  //     "/clavex-api": { target: "https://id.example.com", changeOrigin: true, rewrite: (p) => p.replace(/^\/clavex-api/, "") },
  //   },
  // },
});
