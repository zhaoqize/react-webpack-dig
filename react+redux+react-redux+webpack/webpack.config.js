'use strict';

var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry : {
    app:'./app.js'
  },
  output : {
    path : './assert/',
    filename : 'bundle.[hash].js'
  },
  resolve: {
      extensions: ['', '.js', '.jsx','css']
  },
  module: {
      loaders: [{
        test: /\.jsx?$/, 
        loader: 'babel'
      },{
        test: /\.css$/, 
        loader: 'style!css',
        include:[path.join(process.cwd(), './static/css'), 
                 path.join(process.cwd(), './node_modules/antd/lib')]
      },{
        test: /\.less$/,
        loader: 'style!css!less',
        exclude: function(path) {
              var isNpmModule = !!path.match(/node_modules/);
              return isNpmModule;
        },
      },{
        test:/\.(png|jpg)$/,
        loader:'url?limit=555000',
        exclude: function(path) {
              var isNpmModule = !!path.match(/node_modules/);
              return isNpmModule;
        },
      }
      ]
    },
    plugins:[
    //   new webpack.ProvidePlugin({
    //     "React": "react",
    //     "ReactDOM": "react-dom"
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   compress : {
    //     warnings: false
    //   }
    // }),
    new webpack.BannerPlugin((new Date).toLocaleDateString() + ' 打包'),
    //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlwebpackPlugin({
      template:'./temp/index.html',
      filename: 'index.html', 
      inject:'body'
    })
    ]
}
