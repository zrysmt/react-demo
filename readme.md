---
title: 一步一步进入React的世界（React+Webpack+ES6组合配置）
tags:    
- React
- Webpack    
categories: 前端技术
---


看了很多博客，大都是把配置文件一笔带过，或者干脆不给出配置文件，然而环境搭建对于新手来说是既困难又重要，显然网络上的博客不利于新手开始学习。
BZ打算从从头开始，一步一步配置webpack，能够使用ES6+React组合开发，废话少说让我们一起来开始Webpack+ES6+React之旅。


> 可以在我的[github](https://github.com/zrysmt/react-demo) 中clone或者fork，本博文对应demo01
  https://github.com/zrysmt/react-demo


当然你也可以使用本博文最后总结的部分或者从我的[github](https://github.com/zrysmt/react-demo)中获得，全部安装插件`npm install`,然后执行`webpack`就可以编译了。
- 使用命令`npm init`新建包管理文件
- 在项目根目录下新增`webpack.config.js`文件，它的基本结构是：


```javascript
var webpack = require('webpack');
module.exports = {
entry:{
page: "./src/app.js"
},
    output: {
        path: './build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test:/\.js$/,exclude: /node_modules/,loader:''},//加载器在这里
//下面我们会在这里增加
        ]
    }
};
```
# 1.支持es6
```bash
 npm i --save-dev babel-core babel-loader babel-preset-es2015
```
webpack.config.js
```javascript
{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
```
.babelrc
```javascript
{
  "presets": [
    "es2015"
  ]
}
```
入口app.js,es6语法
```javascript
var p = require("./es6test/es6test1.js")
```
```javascript
//es6test1.js
import Point from './es6test2';
let p = new Point(1,2);
console.log(p.toString()); 
//es6test2.js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }


  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
export default Point; 
```


# 2. 支持React语法
```javascript
{test:/\.jsx$/,exclude: /node_modules/,loader:'jsx-loader?harmony'}
```


入口文件app.js
```javascript
var React = require('react');
var ReactDOM = require('react-dom');


var HelloMessage = React.createClass({
   render: function() {
     return <h1>Hello {this.props.name}</h1>;
  }
});


ReactDOM.render( <HelloMessage name="John" />,
   document.getElementById('example')
);
```
# 3. React和es6同时支持
- 安装


```bash
 npm i --save-dev babel-preset-react
```
注意：.babelrc文件和上面的是一样也是必须的。
webpack.config.js
```javascript
{test:/\.jsx?$/,exclude: /node_modules/,loader: 'babel', query: {presets: ['es2015', 'react']}},
//同时支持es6 react 或者下面的写法都可以
{test:/\.jsx?$/,exclude: /node_modules/,loader:'babel?presets[]=react,presets[]=es2015'},
//同时支持es6 react
```
使用React，es6语法
```javascript
import React from 'react';
import ReactDOM from 'react-dom';


class HelloMessage extends React.Component {
    render() {
        return <h1> Hello { this.props.name } </h1>;
    }
}
ReactDOM.render( <HelloMessage name="zry" />,
   document.getElementById('example')
);
```
# 4. 其余配置
## css/sass
- 安装
```bash
npm i --save-dev  style-loader  css-loader sass-loader  node-sass
```
- webpack.config.js
```javascript
{ test: /\.css$/, loader: "style!css" },
{ test: /\.scss$/, loader: "style!css!sass" }, //sass加载器
```
使用很简单
```javascript
import "./home/home.css";
import "./home/home.scss";
```


# 5. 基本功能配置总结：
package.json
```javascript
{
  "name": "react-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --hot --progress --colors",
    "build": "webpack --progress --colors"
  },
  "repository": {
    "type": "git",
    "url": "zry"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.18.0",
    "babel-loader": "^6.2.7",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "css-loader": "^0.25.0",
    "jsx-loader": "^0.13.2",
    "node-sass": "^3.10.1",
    "react": "^15.3.2",
    "react-dom": "^15.3.2",
    "sass-loader": "^4.0.2",
    "style-loader": "^0.13.1",
    "webpack": "^1.13.3"
  }
}
```
webpack.config.js
```javascript
var webpack = require('webpack');


module.exports = {
entry:{
page: "./src/app.js"
},
    output: {
        path: './build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },//支持es6
            // {test:/\.jsx?$/,exclude: /node_modules/,loader:'jsx-loader?harmony'},//支持react
            // {test:/\.jsx?$/,exclude: /node_modules/,loader:'babel?presets[]=react,presets[]=es2015'},//同时支持es6 react或者
            {test:/\.jsx?$/,exclude: /node_modules/,loader: 'babel', query: {presets: ['es2015', 'react']}},//同时支持es6 react
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: "style!css!sass" }, //sass加载器
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'source-map'
};
```
别忘了.babelrc文件
```javascript
{
  "presets": [
    "es2015"
  ]
}
```
# 6. React支持热插拔
使用 react 编写代码时，能让修改的部分自动刷新。但这和自动刷新网页是不同的，因为 hot-loader 并不会刷新网页，而仅仅是替换你修改的部分
- 安装
```bash
npm i --save-dev react-hot-loader webpack-dev-server
```
- 修改.babelrc
```javascript
{
  "presets": [
    "es2015"
  ],
  "plugins":["react-hot-loader/babel"]
}
```
- 修改webpack.config.js
```javascript
var webpack = require('webpack');


module.exports = {
    //修改：entry
    entry: [
        "webpack-dev-server/client?http://127.0.0.1:3000",
        "webpack/hot/only-dev-server",
        "./src/app.js"
    ],
//修改：output
    output: {
        path: __dirname,
        filename: "build/bundle.js",
        publicPath: "/build"
    },
    module: {
        loaders: [
            // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },//支持es6
            // {test:/\.jsx?$/,exclude: /node_modules/,loader:'jsx-loader?harmony'},//支持react
            // {test:/\.jsx?$/,exclude: /node_modules/,loader:'babel?presets[]=react,presets[]=es2015'},//同时支持es6 react或者
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015', 'react'] } }, //同时支持es6 react
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: "style!css!sass" }, //sass加载器
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    plugins: [
        new webpack.NoErrorsPlugin(), //允许错误不打断程序
        new webpack.HotModuleReplacementPlugin() //增加：webpack热替换插件
    ],
    devtool: 'source-map'
};
```
- 增加server.js文件
```javascript
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000, 'localhost', function(err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://localhost:3000/')
});


```
如何使用？--在命令行中
```bash
webpack   //最好先编译一次
node server.js  //启动node服务
```
在浏览器输入`localhost:3000`即可查看结果，我们修改css文件，保存之后网页会自动刷新显示在浏览器上。


> 可以在我的[github](https://github.com/zrysmt/react-demo)  https://github.com/zrysmt/react-demo中clone或者fork，本博文对应demo01


参考阅读：
- [react-facebook官网](https://facebook.github.io/react/docs/hello-world.html)
- [react中文版-极客学院](http://wiki.jikexueyuan.com/project/react/)
- [React 入门实例教程--阮一峰](http://www.ruanyifeng.com/blog/2015/03/react.html)
- [【译】 在 React.js 中使用 ES6+](http://www.open-open.com/lib/view/open1442217632805.html)
- [React.js中常用的ES6写法总结](http://blog.csdn.net/haoshidai/article/details/52244620)
- [使用 react-hot-loader](https://segmentfault.com/a/1190000004660311)