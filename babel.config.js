module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "14.21" } }],
    "@babel/preset-typescript",
  ],
  overrides: [
    {
      include: ["./packages/homemade-recipes"],
      presets: [["@babel/preset-env", { targets: { esmodules: true } }]],
    },
  ],
};
