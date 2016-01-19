var webpack = require("webpack");
var createVariants = require('parallel-webpack').createVariants;

function createConfig(options) {
  var plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ];
  if (options.minified) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }));
  }

  return {
    entry: __dirname + "/index.js",
    output: {
      path:  __dirname + "/dist",
      filename: 'webaudio-peaks.' +
        options.target +
        (options.minified ? '.min' : '')
        + '.js',
      library: 'webaudioPeaks',
      libraryTarget: options.target
    },
    plugins: plugins
  };
}

module.exports = createVariants({
  minified: [true, false],
  target: ['var', 'commonjs2', 'umd', 'amd']
}, createConfig);