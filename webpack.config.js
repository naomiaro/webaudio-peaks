const createVariants = require("parallel-webpack").createVariants;
const TerserPlugin = require("terser-webpack-plugin");

function createConfig(options) {
  return {
    entry: __dirname + "/index.js",
    output: {
      path: __dirname + "/dist",
      filename:
        "webaudio-peaks." +
        options.target +
        (options.minified ? ".min" : "") +
        ".js",
      library: {
        name: "WebaudioPeaks",
        type: options.target,
      },
    },
    optimization: {
      minimize: options.minified,
      minimizer: [new TerserPlugin()],
    },
    mode: "production",
  };
}

module.exports = createVariants(
  {
    minified: [true, false],
    target: ["var", "commonjs2", "umd", "amd"],
  },
  createConfig
);
