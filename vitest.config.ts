import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    typecheck: {
      enabled: true,
      include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      ignoreSourceErrors: true,
    },
  },
});
