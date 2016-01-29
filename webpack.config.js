var path = require("path");
var webpack = require("webpack");

module.exports = {
  devTool: "source-map",
  entry: [ "./src/index.js" ],
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  modules: {
    loaders: [
      { test: /\.js$/, loader: "babel", include: path.join(__dirname, "./src") }
    ]
  }
}