//  canvas height divided by 15, widith divided by 10
// may want to do some kind of checks and forced dimension errors perhaps


// "start": "webpack-dev-server --open --config ./webpack.config.js --mode development"

var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "/dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  plugins: [new HtmlWebpackPlugin({ template: "index.html", inject: true })]
};
