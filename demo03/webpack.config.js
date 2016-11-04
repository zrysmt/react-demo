var webpack = require('webpack');

module.exports = {
    /*entry:{
        page: "./src/app.js"
    },*/
    //修改entry
    entry: [
        "webpack-dev-server/client?http://127.0.0.1:3000",
        "webpack/hot/only-dev-server",
        "./src/app.js"
    ],
    output: {
        path: __dirname,
        filename: "build/bundle.js",
        publicPath: "/build"
    },
    module: {
        loaders: [
            // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },//支持es6
            // {test:/\.js?$/,exclude: /node_modules/,loader:'jsx-loader?harmony'},//支持react
            // {test:/\.js?$/,exclude: /node_modules/,loader:'babel?presets[]=react,presets[]=es2015'},//同时支持es6 react或者
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015', 'react'] } }, //同时支持es6 react
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: "style!css!sass" }, //sass加载器
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx','.json']
    },
    plugins: [
        new webpack.NoErrorsPlugin(), //允许错误不打断程序
        new webpack.HotModuleReplacementPlugin() //webpack热替换插件
    ],
    devtool: 'source-map'
};
