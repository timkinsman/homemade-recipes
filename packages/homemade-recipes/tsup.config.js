import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/homemadeRecipeRuntime.ts",
    "src/injectAdditionalCssRuntime.ts",
  ],
  sourcemap: true,
  outDir: "dist",
  format: ["esm", "cjs"],
  esbuildPlugins: [vanillaExtractPlugin()],
  dts: true,
});
