// require.config({
//   paths: {
//     echarts: '../common/js/dist'
//   }
// });

define(function(require, exports, module) {

    // require('echarts/chart/map');

    var mapviewMod = {

        init: function() {
            // var ec = require('echarts');
            var mapId = this.getMapId();
            var dom = document.getElementById(mapId);
            // this.myChart = ec.init(dom).showLoading({effect:'bubble'}).hideLoading();
            this.myChart = echarts.init(dom);
            this.myChart.showLoading();
            this.myChart.hideLoading();
            this.initOpt();
            this.initMapSeries();
            this.getAllStatesInfo('provInfo');
        },
        initOpt: function() {
            this.option = {
                backgroundColor: '#71b7fd',
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                color: ['rgba(30,144,255,1)', 'lime'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: []
            };
        },

        initMapSeries: function() {
            var self = this;
            this.option.series.push({
                name: '长江经济带',
                type: 'map',
                roam: true,
                center: [112, 28],
                zoom: 3,
                mapType: 'china',
                tooltip: {
                    trigger: 'item',
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(100,149,237,1)',
                        borderWidth: 0.5,
                        areaStyle: {
                            color: '#9ec7f3'
                        },
                        label: { show: false, textStyle: { color: '#439f55', fontSize: 12, fontFamily: 'Microsoft YaHei' } }
                    },
                    emphasis: {
                        areaStyle: {
                            color: '#feda9d'
                        },
                        label: { show: true, textStyle: { color: '#439f55', fontSize: 12, fontFamily: 'Microsoft YaHei' } }
                    }
                },
                data: [
                    { name: '江苏', value: 1, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                    { name: '浙江', value: 2, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                    { name: '安徽', value: 3, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                    { name: '江西', value: 4, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                    { name: '湖北', value: 5, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                    { name: '湖南', value: 6, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                    { name: '四川', value: 7, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                    { name: '云南', value: 8, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                    { name: '贵州', value: 9, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                    { name: '上海', value: 10, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                    { name: '重庆', value: 11, itemStyle: { normal: { areaColor: '#b7b433' } }, label: { normal: { show: true, textStyle: { color: '#337ab7' } }, emphasis: { show: true, textStyle: { color: '#439f55' } } } },
                ],

            });
        },
        initMap: function() {
            var option = this.option;
            //  if ($(window).width() <= 1000) {
            //     var loc = option.series[0].mapLocation;
            //     loc.x = -880;
            //     loc.y = -158;
            //     loc.height = 1800;
            //     loc.width = 1800;
            // }
            this.myChart.setOption(option);
        },
        showStasInfo: function(provInfo) {
            var self = this;
            this.option.series[0].tooltip.formatter = function(params) {
                var info = self._getProvInfoByName(provInfo, params.name);
                if (typeof params.value == 'number' && info) {
                    return params.name + '<br/>地理位置：' + info.GEO_LOCATION + '<br/>省会：' + info.CAPITAL +
                        '<br/>面积：' + info.AREA + '<br/>地区：' + info.DISTRICT + '<br/>气候：' + info.CLIMATETYPE;
                } else {
                    return params.name;
                }
            };
           
            this.initMap();
        },
        _getProvInfoByName: function(provInfo, pName) {
            var pInfo = provInfo.filter(function(item) {
                return item.PROVINCE.trim() == pName;
            });
            return pInfo[0];
        },

        getAllStatesInfo: function(tablename) {
            var self = this;
            //var _callback=succ || function (){}; 
            var option = {
                "scriptname": "CJEB.initMap.getStateInfo",
                "tablename": tablename,
            };
            var succ = self.showStasInfo;
            var sqlservice = new gEcnu.WebsqlScript({
                'processCompleted': function(data) {
                    var queryResult = data.queryResult;
                    // console.log(queryResult);
                    util.bindContext(self, succ, queryResult);
                    //_callback(queryResult);
                },
                'processFailed': function() { alert('请求失败'); }
            });
            sqlservice.processAscyn(option);
        },
        getMapId: function() {
            return 'mapview';
        }

    };

    module.exports = mapviewMod;

});
