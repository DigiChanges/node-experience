const esbuildPluginTsc = require("esbuild-plugin-tsc");

module.exports = {
  outDir: "./dist",
  esbuild: {
    minify: false,
    target: "es2019",
    plugins: [esbuildPluginTsc()],
  },
  assets: {
    baseDir: "src",
    outDir: "./dist/src",
    filePatterns: ["**/*.json", "**/*.hbs"],
  },
};
