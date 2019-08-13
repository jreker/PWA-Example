var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var outputFolder = "./dist"

module.exports = {
  mode: 'development',
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  devServer: {
      contentBase: path.resolve("./dist/"),
      watchContentBase: true,
      port: 80
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Template',
        template: './index.html',
        alwaysWriteToDisk:true
    }),
    new CopyWebpackPlugin([
      {
          from: path.resolve(__dirname, 'manifest.json'), 
          to: path.resolve(__dirname, outputFolder + "/manifest.json")
      },
      { 
          from: path.resolve(__dirname, 'sw.js'), 
          to: path.resolve(__dirname, outputFolder + "/sw.js")
      },
      { 
        from: path.resolve(__dirname, 'images/*'), 
        to: path.resolve(__dirname, outputFolder)
      }
      ])]
};