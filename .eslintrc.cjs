require("@nayhoo/eslint-config/patch");

module.exports = {
  extends: "@nayhoo/eslint-config",
  parserOptions: { tsconfigRootDir: __dirname },
  ignorePatterns: ["node_modules", "dist"],
};
