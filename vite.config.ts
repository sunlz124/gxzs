import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    assetsDir: "static", // 资源放到 dist/static 目录
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 react 相关库拆分成单独的 chunk
          react: ["react", "react-dom", "react-router-dom"],
          antd: ["antd"],
          // tailwind: ["@tailwindcss/vite"],
          icons: ["@ant-design/icons"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: "0.0.0.0", // 监听所有网络接口
    port: 5173, // 可选：指定端口
  },
  css: {
    devSourcemap: true, // 启用 CSS Source Maps
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // @ 代表 src 目录
      "@components": path.resolve(__dirname, "src/components"), // @components 代表 src/components 目录
      "@utils": path.resolve(__dirname, "src/utils"), // @utils 代表 src/utils 目录
    },
  },
});
