import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/components/button.tsx",
    "src/components/flex.tsx",
    "src/components/grid.tsx",
    "src/theme/index.ts",
    "src/utils/index.ts",
  ],
  sourcemap: true,
  outDir: "dist",
  format: ["esm", "cjs"],
  esbuildPlugins: [vanillaExtractPlugin()],
  dts: true,
});
