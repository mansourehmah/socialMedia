import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://qbc11-front-next.liara.run",
        changeOrigin: true,
        secure: true,
        // تا کوکی سشن روی localhost در dev قابل استفاده باشد اگر سرور Domain دامنهٔ Liara را ست کرده باشد
        cookieDomainRewrite: "",
      },
    },
  },
});
