import dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node", // テスト環境では Node.js 環境を使用（process.env にアクセス可能）
    env: dotenv.config({ path: ".env" }).parsed,
    typecheck: {
      enabled: true,
      include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      ignoreSourceErrors: true,
    },
  },
});
