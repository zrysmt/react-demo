/**
 * 交互地图模块,第一个模块
 * by zry
 * 2016-07-15
 */
define(function(require, exports, module) {
    var dataStorage = require('../../common/js/dataStorage');
    var intermap = {
        init: function(root) {
            // console.log(root);
            var initInd, indtab, indName;
            if (root) {
                initInd = $(root).attr('initInd'); //指标
                indtab = $(root).attr('tab'); //数据表
                indName = $(root).text();
            }
            var year = 2008;
            this.cnty = '上海市';
            console.log(initInd, indtab, indName);
            this.renderInteractMap(indtab, initInd, year);
        },
        initOpt: function() {
            this.option = {
                backgroundColor: '#404a59',
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                title: [{
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                }, {
                    id: 'statistic',
                    right: 120,
                    top: 40,
                    width: 100,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    }
                }],
                toolbox: {
                    iconStyle: {
                        normal: {
                            borderColor: '#fff'
                        },
                        emphasis: {
                            borderColor: '#b1e4ff'
                        }
                    }
                },
                brush: {
                    outOfBrush: {
                        color: '#abc'
                    },
                    brushStyle: {
                        borderWidth: 2,
                        color: 'rgba(0,0,0,0.2)',
                        borderColor: 'rgba(0,0,0,0.5)',
                    },
                    seriesIndex: [0, 1],
                    throttleType: 'debounce',
                    throttleDelay: 300,
                    geoIndex: 0
                },
                geo: {
                    map: 'china',
                    left: '10',
                    right: '35%',
                    center: [112, 28],
                    zoom: 2,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#ccc'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    right: 40,
                    top: 100,
                    bottom: 40,
                    width: '30%'
                },
                xAxis: {
                    type: 'value',
                    scale: true,
                    position: 'top',
                    boundaryGap: false,
                    splitLine: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { margin: 2, textStyle: { color: '#aaa' } },
                },
                yAxis: {
                    type: 'category',
                    nameGap: 26,
                    axisLine: { show: false, lineStyle: { color: '#ddd' } },
                    axisTick: { show: false, lineStyle: { color: '#ddd' } },
                    axisLabel: { interval: 0, textStyle: { color: '#ddd' } },
                    data: []
                },
                series: []
            };
        },
        initOptSeries: function(convertedData,unit) {
            var self = this;
            var maxVal = 1;
            var valArray = [];
            unit = unit&&unit!='null'?unit:'';
            this.initOpt();//option
            if(convertedData.length!=0){
                for (var i = 0; i < convertedData[0].length; i++) {
                    if(convertedData[0][i].value[2]) valArray.push(convertedData[0][i].value[2]);
                }
                maxVal = Math.max.apply(null, valArray);
            }
            this.option.series.push({
                // name: '长江经济带城市',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertedData[0],
                symbolSize: function(val) {
                    val[2] = val[2]?val[2]:0;
                    // console.log(Math.max((val[2] / maxVal) * 20, 8));
                    var rtnVal = (val[2] / maxVal) * 30?Math.max((val[2] / maxVal) * 30,2):0;
                    // console.log(rtnVal);
                    return rtnVal;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            }, {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertedData[1],
                symbolSize: function(val) {
                    val[2] = val[2]?val[2]:0;
                    return (val[2] / maxVal) * 20;
                },
                showEffectOn: 'emphasis',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }, {
                id: 'bar1',
                zlevel: 2,
                type: 'bar',
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                },
                data: []
            });


            self.myChart.on('brushselected', renderBrushed);

            //this.myChart.setOption(self.option);

            setTimeout(function() {
                self.myChart.dispatchAction({
                    type: 'brush',
                    areas: [{
                        geoIndex: 0,
                        brushType: 'polygon',
                        coordRange: [
                            [119.72, 34.85],
                            [119.68, 34.85],
                            [119.5, 34.84],
                            [119.19, 34.77],
                            [118.76, 34.63],
                            [118.6, 34.6],
                            [118.46, 34.6],
                            [118.33, 34.57],
                            [118.05, 34.56],
                            [117.6, 34.56],
                            [117.41, 34.56],
                            [117.25, 34.56],
                            [117.11, 34.56],
                            [117.02, 34.56],
                            [117, 34.56],
                            [116.94, 34.56],
                            [116.94, 34.55],
                            [116.9, 34.5],
                            [116.88, 34.44],
                            [116.88, 34.37],
                            [116.88, 34.33],
                            [116.88, 34.24],
                            [116.92, 34.15],
                            [116.98, 34.09],
                            [117.05, 34.06],
                            [117.19, 33.96],
                            [117.29, 33.9],
                            [117.43, 33.8],
                            [117.49, 33.75],
                            [117.54, 33.68],
                            [117.6, 33.65],
                            [117.62, 33.61],
                            [117.64, 33.59],
                            [117.68, 33.58],
                            [117.7, 33.52],
                            [117.74, 33.5],
                            [117.74, 33.46],
                            [117.8, 33.44],
                            [117.82, 33.41],
                            [117.86, 33.37],
                            [117.9, 33.3],
                            [117.9, 33.28],
                            [117.9, 33.27],
                            [118.09, 32.97],
                            [118.21, 32.7],
                            [118.29, 32.56],
                            [118.31, 32.5],
                            [118.35, 32.46],
                            [118.35, 32.42],
                            [118.35, 32.36],
                            [118.35, 32.34],
                            [118.37, 32.24],
                            [118.37, 32.14],
                            [118.37, 32.09],
                            [118.44, 32.05],
                            [118.46, 32.01],
                            [118.54, 31.98],
                            [118.6, 31.93],
                            [118.68, 31.86],
                            [118.72, 31.8],
                            [118.74, 31.78],
                            [118.76, 31.74],
                            [118.78, 31.7],
                            [118.82, 31.64],
                            [118.82, 31.62],
                            [118.86, 31.58],
                            [118.86, 31.55],
                            [118.88, 31.54],
                            [118.88, 31.52],
                            [118.9, 31.51],
                            [118.91, 31.48],
                            [118.93, 31.43],
                            [118.95, 31.4],
                            [118.97, 31.39],
                            [118.97, 31.37],
                            [118.97, 31.34],
                            [118.97, 31.27],
                            [118.97, 31.21],
                            [118.97, 31.17],
                            [118.97, 31.12],
                            [118.97, 31.02],
                            [118.97, 30.93],
                            [118.97, 30.87],
                            [118.97, 30.85],
                            [118.95, 30.8],
                            [118.95, 30.77],
                            [118.95, 30.76],
                            [118.93, 30.7],
                            [118.91, 30.63],
                            [118.91, 30.61],
                            [118.91, 30.6],
                            [118.9, 30.6],
                            [118.88, 30.54],
                            [118.88, 30.51],
                            [118.86, 30.51],
                            [118.86, 30.46],
                            [118.72, 30.18],
                            [118.68, 30.1],
                            [118.66, 30.07],
                            [118.62, 29.91],
                            [118.56, 29.73],
                            [118.52, 29.63],
                            [118.48, 29.51],
                            [118.44, 29.42],
                            [118.44, 29.32],
                            [118.43, 29.19],
                            [118.43, 29.14],
                            [118.43, 29.08],
                            [118.44, 29.05],
                            [118.46, 29.05],
                            [118.6, 28.95],
                            [118.64, 28.94],
                            [119.07, 28.51],
                            [119.25, 28.41],
                            [119.36, 28.28],
                            [119.46, 28.19],
                            [119.54, 28.13],
                            [119.66, 28.03],
                            [119.78, 28],
                            [119.87, 27.94],
                            [120.03, 27.86],
                            [120.17, 27.79],
                            [120.23, 27.76],
                            [120.3, 27.72],
                            [120.42, 27.66],
                            [120.52, 27.64],
                            [120.58, 27.63],
                            [120.64, 27.63],
                            [120.77, 27.63],
                            [120.89, 27.61],
                            [120.97, 27.6],
                            [121.07, 27.59],
                            [121.15, 27.59],
                            [121.28, 27.59],
                            [121.38, 27.61],
                            [121.56, 27.73],
                            [121.73, 27.89],
                            [122.03, 28.2],
                            [122.3, 28.5],
                            [122.46, 28.72],
                            [122.5, 28.77],
                            [122.54, 28.82],
                            [122.56, 28.82],
                            [122.58, 28.85],
                            [122.6, 28.86],
                            [122.61, 28.91],
                            [122.71, 29.02],
                            [122.73, 29.08],
                            [122.93, 29.44],
                            [122.99, 29.54],
                            [123.03, 29.66],
                            [123.05, 29.73],
                            [123.16, 29.92],
                            [123.24, 30.02],
                            [123.28, 30.13],
                            [123.32, 30.29],
                            [123.36, 30.36],
                            [123.36, 30.55],
                            [123.36, 30.74],
                            [123.36, 31.05],
                            [123.36, 31.14],
                            [123.36, 31.26],
                            [123.38, 31.42],
                            [123.46, 31.74],
                            [123.48, 31.83],
                            [123.48, 31.95],
                            [123.46, 32.09],
                            [123.34, 32.25],
                            [123.22, 32.39],
                            [123.12, 32.46],
                            [123.07, 32.48],
                            [123.05, 32.49],
                            [122.97, 32.53],
                            [122.91, 32.59],
                            [122.83, 32.81],
                            [122.77, 32.87],
                            [122.71, 32.9],
                            [122.56, 32.97],
                            [122.38, 33.05],
                            [122.3, 33.12],
                            [122.26, 33.15],
                            [122.22, 33.21],
                            [122.22, 33.3],
                            [122.22, 33.39],
                            [122.18, 33.44],
                            [122.07, 33.56],
                            [121.99, 33.69],
                            [121.89, 33.78],
                            [121.69, 34.02],
                            [121.66, 34.05],
                            [121.64, 34.08]
                        ]
                    }]
                });
            }, 0);


            function renderBrushed(params) {
                // console.log(params);
                var mainSeries = params.batch[0].selected[0];

                var selectedItems = [];
                var categoryData = [];
                var barData = [];
                var maxBar = 30;
                var sum = 0;
                var count = 0;

                for (var i = 0; i < mainSeries.dataIndex.length; i++) {
                    var rawIndex = mainSeries.dataIndex[i];
                    var dataItem = convertedData[0][rawIndex];
                    var pmValue = dataItem.value[2]?dataItem.value[2]:0;
                    sum += parseFloat(pmValue);
                    count++;

                    selectedItems.push(dataItem);
                }
                selectedItems.sort(function(a, b) {
                    return a.value[2] - b.value[2];
                });

                for (var j = 0; j < Math.min(selectedItems.length, maxBar); j++) {
                    categoryData.push(selectedItems[j].name);
                    barData.push(selectedItems[j].value[2]);
                }

                self.myChart.setOption({ //修改部分option
                    yAxis: {
                        data: categoryData,
                        name: '单位: '+unit,
                    },
                    xAxis: {
                        axisLabel: { show: !!count }
                    },
                    title: {
                        id: 'statistic',
                        text: count ? '平均: ' + (sum / count).toFixed(4) : ''
                    },
                    series: {
                        id: 'bar1',
                        data: barData
                    }
                });
            }
        },
        initChart: function() {
            var option = this.option;
            this.myChart.clear();
            // console.log(this.myChart.getOption());
            if (option && typeof option === "object") {
                this.myChart.setOption(option, true);//不跟之前设置的option进行合并
            }
            // console.log(this.myChart.getOption());
        },

        useData2InitChart: function(geoCoordMap, data,unit) {
            var convertData = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            convertedData = [
                convertData(data),
                convertData(data.sort(function(a, b) {
                    return b.value - a.value;
                }).slice(0, 6))
            ];

            var thmmapId = this.getchartId();
            var dom = document.getElementById(thmmapId);
            this.myChart = echarts.init(dom);
            this.myChart.showLoading();
            this.myChart.hideLoading();
            this.initOptSeries(convertedData,unit);

            this.initChart();
        },
        _parseCitysData: function(cityLocData, ind, fldArr, unit, cityValRst) {
            // console.log(cityLocData);
            // console.log(cityValRst);
            var geoCoordMap = '{';
            for (var i = 0, len = cityLocData.length; i < len; i++) {
                geoCoordMap += '"' + cityLocData[i].CITYNAME + '":[' + cityLocData[i].LNG + ',' + cityLocData[i].LAT + '],';
            }
            geoCoordMap = JSON.parse(geoCoordMap.slice(0, -1) + '}');
            // console.log(geoCoordMap);

            var citysVal = [];

            for (var j = 0; j < cityValRst.length; j++) {
                var oneCityObj = {};
                oneCityObj.name = cityValRst[j]['[' + fldArr[0] + ']'];
                oneCityObj.value = cityValRst[j]['[' + fldArr[1] + ']'];
                citysVal.push(oneCityObj);
            }
            // console.log(citysVal);
            if(this.callbackFuc){//有回掉函数，只是取得数据即可
                this.callbackFuc(geoCoordMap, citysVal);
                return;
            }
            dataStorage.geoCoordMap = geoCoordMap;
            dataStorage.citysVal = citysVal;
            this.useData2InitChart(geoCoordMap, citysVal,unit);
        },
        _queryAllCitysLatlng: function(cityValRst, ind, fldArr, unit) {
            var self = this;
            var succ = self._parseCitysData;
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    // console.log(data); //回调函数里返回数据
                    if (data.length && data.length !== 0) {
                        util.bindContext(self, succ, data, ind, fldArr, unit, cityValRst);
                    }
                },
                'processFailed': function() {
                    console.log('query error');
                }
            });
            var sql = {
                'lyr': 't_allCitys',
                'fields': '*',
                // 'filter': 'id=2'
            };
            sqlservice.processAscyn("SQLQUERY", "CJEB", sql);
        },
        _reqData: function(rst, ind, year, table) {
            // console.log(rst);
            var self = this;
            var fldArr = ['V2', rst[0].FIELD];
            // console.log(fldArr);
            var flds = util.fldsArrTostring(fldArr);
            var filter = "V4 =" + year;
            var unit = rst[0].UNIT;
            var succ = self._queryAllCitysLatlng;
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    if (data.length && data.length !== 0) {
                        // console.log(data);
                        util.bindContext(self, succ, data, ind, fldArr, unit);
                    }
                },
                'processFailed': function() {
                    console.log('query error');
                }
            });
            var sql = {
                'lyr': table,
                'fields': flds,
                'filter': filter
            };
            sqlservice.processAscyn("SQLQUERY", "CJEB", sql);
        },
        /**
         * [renderInteractMap 渲染专题图的函数 其实它差不多相当于本模块的入口函数]
         * @param  {[type]} table [description]
         * @param  {[type]} ind   [description]
         * @param  {[type]} year  [description]
         * @return {[type]}       [description]
         */
        renderInteractMap: function(table, ind, year) {
            // console.log('renderInteractMap' + ' table:' + table + ' ind: ' + ind + ' year: ' + year);
            //隐藏youce箭头
            if($('#toggle_logo').is(':visible')){
                $('#toggle_logo').css('display', 'none');
            }
            var self = this;
            self.ind = ind, self.tab = table;
            var tab = 'fieldsdef';
            var filter = "fieldRealname like '%" + ind + "%'";
            filter += " AND tabname like '%" + table + "%'";
            console.log(filter);
            var succ = self._reqData;
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    console.log(data);
                    if (data.length && data.length !== 0) {
                        util.bindContext(self, succ, data, ind, year, table);
                    }
                },
                'processFailed': function() {
                    console.log('query error');
                }
            });
            var sql = {
                'lyr': tab,
                'fields': '*',
                'filter': filter
            };
            sqlservice.processAscyn("SQLQUERY", "CJEB", sql);
        },
        getDBData:function(table, ind, year,callback){
            this.callbackFuc = callback;
            this.renderInteractMap(table, ind, year);
        },

        getchartwinId: function() {
            return 'chartwin';
        },
        getchartId: function() {
            return 'chartPool';
        },
        getyear_cnty_boxId: function() {
            return 'year_cnty_box';
        },
        getmainboxId: function() {
            return 'mainbox';
        },
        getsubyearcntyId: function() {
            return 'sub_year_cnty';
        }
    };

    module.exports = intermap;
});
