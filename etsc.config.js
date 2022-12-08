module.exports = {
  esbuild: {
    minify: false,
    target: "es2020",
    outdir: "./dist"
  },
  prebuild: async () => {
    console.log("prebuild");
    const rimraf = (await import("rimraf")).default;
    rimraf.sync("./dist"); // clean up dist folder
  },
  postbuild: async () => {
    console.log("postbuild");
    const cpy = (await import("cpy")).default;
    await cpy(
      [
        "src/**/*.graphql", // Copy all .graphql files
        "!src/**/*.{tsx,ts,js,jsx}", // Ignore already built files
        "src/**/*.json",
        "src/**/*.hbs"
      ],
      "dist/src"
    );
  },
};
