var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');  // 生成html文件
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var projectName = "cjeb2";
var cjebAssetsFolder = '/assets/' + projectName + '/';
var cjebTemplateFolder = '/template/' + projectName + '/';

// 定义当前是否处于开发debug阶段
var isDebug = JSON.stringify(JSON.parse(process.env.DEBUG || 'false'));

// 根据isDebug变量定义相关config变量
var configVarObj = {};
if(isDebug === 'true') {
    console.log('I am in debuging............');
    configVarObj = {
        htmlPath: 'index.html',  // 定义输出html文件路径
        // devtool: 'cheap-source-map' // 生成sourcemap,便于开发调试
        devtool: 'eval' // 生成sourcemap,便于开发调试
    };
} else {
    console.log('I am in releasing............');
    configVarObj = {
        htmlPath: './template/' + projectName + '/index.html',  // 定义输出html文件路径
        devtool: ''
    };
}

module.exports = {
  context: path.join(__dirname, 'app'),
  // 获取项目入口JS文件
  entry: {
      app: './index.jsx',
      vendors: [
          'react',
          'react-dom',
          'react-router/lib/Router',
          'react-router/lib/browserHistory',
          'jquery'
      ]
  },
  output: {
    // 文件输出目录
    path: path.resolve(__dirname, 'output'),
    // 输出文件名
    filename: cjebAssetsFolder + 'js/[name].min.js?[hash]',
    // cmd、amd异步加载脚本配置名称
    chunkFilename: cjebAssetsFolder + 'js/[name].chunk.js?[hash]',
    publicPath: ''
  },
  module: {
    loaders:[
      {
        test: /\.css$/,
        exclude: /\.useable\.css$/,
        loader: "style-loader!css-loader"
      },
      { 
        test: /\.scss$/, 
        loader: "style!css!sass" },
      {
        test: /\.useable\.css$/,
        exclude: /node_modules/,
        loader: "style-loader/useable!css-loader"
      },
      /*下面两行的作用是分离css*/
      /*{ test: /\.css$/, loader:ExtractTextPlugin.extract("style-loader", "css-loader") },
        { test: /\.scss$/, loader:ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") }, //sass加载器*/
      {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
          test: /\.(png|jpg)$/,
          exclude: /node_modules/,
          loader: 'url?limit=8192'
      }
    ]
  },
  postcss: [
      autoprefixer
  ],
  devtool: configVarObj.devtool,// 生成sourcemap,便于开发调试
  resolve: {
      extensions: ['', '.js', '.jsx', '.json']
  },
  // enable dev server
 /* devServer: {
      historyApiFallback: true,
      hot: false,
      inline: true,
      progress: true,
      // ajax 代理到6000端口
      proxy: {
          '/cjeb2/interface/**': {
              target: 'http://127.0.0.1:6000',
              secure: false
          }
      },
      host: '0.0.0.0'
  },*/
  plugins: [
      new HtmlwebpackPlugin({
          title: 'cjeb2',
          template: path.join(__dirname, './app/index.html'),
          filename: configVarObj.htmlPath,
          minify: {
              minifyJS: true,
              removeComments: true,
              minifyCSS: true
          },
      }),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      }),
      // new ExtractTextPlugin("output/[name].css"),//独立css文件
      new webpack.optimize.CommonsChunkPlugin('vendors', cjebAssetsFolder + 'js/[name].chunk.js?[hash]'),
      new webpack.ProvidePlugin({
         "$": "jquery"
      }),
      //定义全局变量
      new webpack.DefinePlugin({
          __DEV__: isDebug   
      })
  ]
};
