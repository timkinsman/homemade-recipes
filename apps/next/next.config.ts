import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  // https://vanilla-extract.style/documentation/integrations/next/
  transpilePackages: ["@homemade-recipes/ui"],
};

export default withVanillaExtract(nextConfig);
