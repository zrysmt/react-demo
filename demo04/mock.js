/**
 * @file mock
 * @author .....
 */

var fs = require('fs');

var path = require('path');

var express = require('express');


var app = express();

var port = 6000;

var pathes = __dirname.split(path.sep);

pathes.pop();

app.get('/', function (req, res) {
    res.send('server ok!');
});

// ========================================= 接口配置 begin
(function () {
    var readFile = function (file) {
        return JSON.parse(fs.readFileSync('./mock/' + file, 'utf-8'));
    };
    // mock1
    app.get('/agri/interface/home', function (req, res) {
        res.json(readFile('home/home.json'));
    });
    app.get('/agri/interface/detail', function (req, res) {
        res.json(readFile('detail/detail.json'));
    });

})();
// ========================================= 接口配置 end

app.use(express.static(pathes.join(path.sep)));

// 监听端口
app.listen(port);

console.log('成功启动：' + port);