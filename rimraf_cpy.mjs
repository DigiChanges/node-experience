import rimraf from "rimraf";
console.log("prebuild");
rimraf.sync("./dist");

console.log("postbuild");
import cpy from "cpy";
cpy([
        "src/**/*.graphql", // Copy all .graphql files
        "!src/**/*.{ts,js}", // Ignore already built files
        "src/**/*.json",
        "src/**/*.hbs"],
      "dist/src"
);
