const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env => ({
  entry: './src/cjs/entry.js',
  mode: "production",
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Add this line to get the ./dist/build.js.map file
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
        // extractComment=false to prevent the generation of License.txt
        new TerserPlugin({extractComments: false})
    ],
  }
});
