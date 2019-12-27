import typescript from "rollup-plugin-typescript2";
import transformPaths from "@zerollup/ts-transform-paths";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  external: Object.keys(pkg.peerDependencies || {}),
  plugins: [
    typescript({
      tsconfig: "./tsconfig.dist.json",
      transformers: [service => transformPaths(service.getProgram())],
      typescript: require("typescript")
    })
  ],
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ]
};
