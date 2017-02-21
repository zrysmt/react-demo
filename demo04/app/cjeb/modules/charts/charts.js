/**
 * 专题地图 图表展示
 * by zry
 */

define(function(require, exports, module) {

    var dataStorage = require('../../common/js/dataStorage');

    var charts = {

        init: function(root) { //暂时不需要
            // var ec = require('echarts');
            // var initInd = $(root).attr('initInd');
            // var indtab = $(root).attr('tab');
            // var thmmapId = this.getchartId();
            // var dom = document.getElementById(thmmapId);
            // var type = 'theme';
            // var indName = $(root).text();
            // var year = indName == '水资源' ? 2012 : 2008;
            // this.cnty = '上海';
            // this.myChart = echarts.init(dom);
            // this.myChart.showLoading();
            // this.myChart.hideLoading();
            // this.initOpt();
            // this.addval2chart(initInd, year, indtab, type);
        },
        initOpt: function() {
            var self = this;
            this.thm = {};
            this.chart = {};
            this.thm.option = { //专题图的配置
                backgroundColor: '#fff',
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                title: {
                    x: 'center',
                    y: 'top'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    textStyle: { fontFamily: 'Microsoft YaHei' },
                    feature: {
                        /* myTool_isNameShow: {
                             show: true,
                             title: '显示城市名',
                             icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                             onclick: function() {
                                 if(self.thm.option.series[0].itemStyle.normal.label.show){
                                     self.thm.option.series[0].itemStyle.normal.label.show = false;
                                 }else{
                                     self.thm.option.series[0].itemStyle.normal.label.show = true;
                                 }
                                 self.myChart.setOption(self.option);
                             }
                         },*/
                        dataView: { show: true, readOnly: true },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                visualMap: {
                    text: ['高', '低'],
                    realtime: false,
                    calculable: true,
                    zlevel:99
                    // inRange: {
                    //     color: ['lightskyblue', 'yellow', 'orangered']
                    // }
                },
                series: [{
                        id: 'thmmap',
                        // type: 'map',
                        // mapType: 'china',
                        roam: true,
                        center: [109.5, 28],
                        zoom: 5,
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
                        zlevel: 9
                    }

                ]
            };

            this.chart.option = {
                backgroundColor: '#fff',
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                title: {
                    //text: '',
                    x: 'center',
                    y: 'top'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'left',
                    y: '12',
                    textStyle: {
                        color: '#333333',
                        fontFamily: 'Microsoft YaHei'
                    },
                    data: []
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    feature: {
                        magicType: { show: true, type: ['line', 'bar'] }, //'stack','tiled'
                        dataZoom: { show: true },
                        dataView: { show: true },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#333333',
                            fontFamily: 'Microsoft YaHei'
                        }
                    },
                    data: []
                }],
                yAxis: [{
                    logLabelBase: 10,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#333333',
                            fontFamily: 'Microsoft YaHei'
                        }
                    }
                }],
                series: [{
                    type: '',
                    data: [],
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }]
            };
        },
        initScatterOpt: function(geoCoordMap, data, ind, unit) {
            var self = this;
            this.scatter = {};
            var array = [];
            var maxVal = 1;
            var legendData = ind + '(' + unit + ')';
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
            if (data.length != 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].value) array.push(data[i].value);
                }
                maxVal = Math.max.apply(null, array);
            }
            this.scatter.option = {
                backgroundColor: '#fff',
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                title: {
                    x: 'center',
                    y: 'top'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                legend: {
                    orient: 'vertical',
                    y: 'top',
                    x: 'right',
                    data: [legendData],
                    textStyle: {
                        color: '#337AB7'
                    }
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    textStyle: { fontFamily: 'Microsoft YaHei' },
                    feature: {
                        dataView: { show: true, readOnly: true },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                geo: {
                    map: 'china',
                    center: [109.5, 28],
                    zoom: 3,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#eee',
                            borderColor: 'rgba(100,149,237,1)',
                            borderWidth: 0.5
                        },
                        emphasis: {
                            areaColor: '#feda9d'
                        }
                    }
                },
                series: [{
                    name: legendData,
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function(val) {
                        val[2] = val[2] ? val[2] : 0;
                        if (val[2])
                            return Math.max((val[2] / maxVal) * 25, 6);
                        // return 15;

                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
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
                }]
            };
            this.scatter.option.tooltip.formatter = function(params) {
                // console.log(params);
                if (typeof params.value[2] == 'number' && !isNaN(params.value[2])) {
                    if (params.value[2] != '') {
                        var value = (params.value[2].toFixed(2) + '').split('.');
                        var decimal = value[1] ? '.' + value[1][0] + value[1][1] : '';
                        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + decimal;
                        return ind + '(' + unit + ')' + '<br/>' + params.name + ' : ' + value;
                    } else {
                        return params.name + '：-';
                    }
                } else {
                    return params.name;
                }
            };
            this.initChart('scatter');
        },
        initChart: function(type) {
            var self = this;
            if (type == 'theme') {
                var option1 = this.thm.option;
                //自己修改的json数据
                $.get('./common/jslib/publib/echarts/cjeb_china.json', function(cjebJson) {
                    echarts.registerMap('cjeb', cjebJson);

                    self.myChart.setOption({
                        series: {
                            id: 'thmmap',
                            type: 'map',
                            map: 'cjeb'
                        }
                    });
                    if (option1 && typeof option1 === "object") {
                        self.myChart.setOption(option1);
                    }
                });
            } else if (type == 'scatter') {
                var option2 = this.scatter.option;
                this.myChart.setOption(option2);

            } else {
                var option3 = this.chart.option;
                this.myChart.setOption(option3);
            }
        },
        show: function() {
            var mainId = this.getmainwinId();
            var winclass = this.getwinclass();
            $('.' + winclass).hide();
            $('#' + mainId).show();
        },
        hide: function() {
            var mainId = this.getmainwinId();
            $('#' + mainId).hide();
        },
        arrowshow: function(type) {
            var arrowId = this.getarrowId();
            if (type == 'theme') {
                $('#' + arrowId).attr({ 'title': '切换至散点图', 'to': 'scatter' }).css('background', 'url(modules/charts/imgs/arrow_right.png) no-repeat').show('slow');
            } else {
                $('#' + arrowId).attr({ 'title': '切换至历年变化折线图', 'to': 'line' }).css('background', 'url(modules/charts/imgs/arrow_right.png) no-repeat').show('slow');
            }
        },
        arrowhide: function() {
            var arrowId = this.getarrowId();
            $('#' + arrowId).hide('slow');
        },
        _adjustMap4lowres: function() {
            var self = this;
            var option = self.thm.option;
            if ($(window).width() <= 1200) {
                option.visualMap.itemHeight = 8;
                // var loc = option.series[0].mapLocation;
                // loc.x = -440;
                // loc.y = -40;
                // loc.height = 1000;
                // loc.width = 1000;
            }
        },
        _getmin4thm: function(val) {
            var value = (val + '').split('.');
            var min = value[0];
            if (min.length > 2 || (min.length == 2 && min[0] != '-')) {
                var tmp = min[2] == 9 ? '-' + (parseInt(min[1]) + 1) + '0' : '-' + min[1] + (parseInt(min[2]) + 1);
                min = min[0] == '-' ? tmp * Math.pow(10, min.length - 3) : (min[0] + min[1]) * Math.pow(10, min.length - 2);
            } else {
                min = min[0] == '-' ? -10 : 0;
            }
            return min;
        },
        _getmax4thm: function(val) {
            var value = (val + '').split('.');
            var max = value[0];
            if (max.length > 2 || (max.length == 2 && max[0] != '-')) {
                var tmp = max[1] == 9 ? (parseInt(max[0]) + 1) + '0' : max[0] + (parseInt(max[1]) + 1);
                max = max[0] == '-' ? ('-' + max[1] + max[2]) * Math.pow(10, max.length - 3) : tmp * Math.pow(10, max.length - 2);
            } else {
                max = max[0] == '-' ? 0 : 10;
            }
            return max;
        },

        /**
         * [_proRst4map 专题地图]
         * @param  {[Object]} rst  [数据库查询(字段查询)结果:queryResult]
         * @param  {[type]} ind  [description]
         * @param  {[type]} karr [description]
         * @param  {[type]} unit [description]
         * @param  {[String]} type [theme或者其它]
         * @return {[type]}      [description]
         */
        _proRst4map: function(rst, ind, karr, unit, type) {
            var self = this;
            // var option = type == "theme" ? self.thm.option : self.scatter.option;
            var option = self.thm.option;
            var v_inx = karr[1];
            var data = [],
                value = [];
            var units = unit&&unit!="null" ? '(' + unit + ')' : '';
            for (var j = 0; j < rst.length; j++) {
                var obj = {};
                obj.name = rst[j]['V2']; //城市名
                if (obj.name === '上海市') {
                    obj.name = '上海';
                } else if (obj.name === '重庆市') {
                    obj.name = '重庆';
                }
                var val = rst[j][v_inx];
                obj.value = val; //指标的值
                // console.log(val);
                if (val != '') value.push(val);
                var s = obj.name;
                data.push(obj);
            }
            var otherProv = [{ name: '河南', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '河北', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '陕西', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '广东', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '广西', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '山东', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '山西', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '北京', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '天津', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '黑龙江', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '吉林', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '辽宁', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '新疆', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '内蒙古', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '西藏', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '青海', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '甘肃', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '宁夏', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '福建', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '台湾', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '海南', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
                { name: '南海诸岛', itemStyle: { normal: { areaColor: '#fff' } }, label: { normal: { show: false, textStyle: { color: '#337ab7' } } } },
            ];
            /*option.series[0].name = ind + units;
            option.legend.data[0] = option.series[0].name;*/
            if (type == "theme") {
                [].push.apply(data, otherProv);
                // console.log(data);
                option.series[0].data = data;
                option.series[0].name = ind;
                if (value.length != 0) {
                    var min = util.minval(value),
                        max = util.maxval(value);
                    // option.visualMap.inRange.color = ['#F08080', '#f1f075', '#8acff2'];
                    option.visualMap.min = self._getmin4thm(min);
                    option.visualMap.max = self._getmax4thm(max);
                } else {
                    // option.visualMap.inRange.color = ['#e5e5e5', '#e5e5e5', '#e5e5e5'];
                    option.visualMap.min = 0;
                    option.visualMap.max = 0;

                    util.showTipWin('暂未提供数据');
                }
            }
            option.tooltip.formatter = function(params) {
                // console.log(params);
                if (typeof params.value == 'number' && !isNaN(params.value)) {
                    if (params.value != '') {
                        var value = (params.value.toFixed(2) + '').split('.');
                        var decimal = value[1] ? '.' + value[1][0] + value[1][1] : '';
                        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + decimal;
                        return ind + units + '<br/>' + params.name + ' : ' + value;
                    } else {
                        return params.name + '：-';
                    }
                } else {
                    return params.name;
                }
            };
            self._adjustMap4lowres();
            self.initChart(type);
        },
        _proRst4chart: function(rst, ind, karr, unit, type) {

            var self = this;
            var option = self.chart.option;
            var k_inx = 'V2';
            // var magicType = ['bar'];
            if (type == 'line') {
                k_inx = 'V4';
                // rst.reverse();
                // magicType.unshift('line');
            }
            var v_inx = karr[1];
            var data = [],
                tmpArr = [],
                valueArr = [];
            var units = unit ? '(' + unit + ')' : '';
            for (var j = 0; j < rst.length; j++) {
                tmpArr.push(rst[j][k_inx]);
                var val = rst[j][v_inx] == '' ? '-' : rst[j][v_inx];
                if (val != '-') valueArr.push(val);
                data.push(val);
            }
            option.yAxis[0].type = 'value';
            option.xAxis[0].data = tmpArr;
            option.series[0].type = type;
            option.series[0].data = data;
            option.series[0].name = option.legend.data[0] = ind + units;
            // option.toolbox.feature.magicType.type = magicType;
            var max = util.maxval(valueArr),
                min = util.minval(valueArr),
                logval = Math.pow(10, 9);
            if (max >= logval || min <= -logval) option.yAxis[0].type = 'log';
            if (valueArr.length == 0) util.showTipWin('暂未提供数据');
            option.tooltip.formatter = function(params) {
                if (!params || params.length == 0) return;
                var params = params[0];
                if (params.value != '-' && params.value) {
                    var value = ((params.value-0).toFixed(2) + '').split('.');
                    var decimal = value[1] ? '.' + value[1][0] + value[1][1] : '';
                    value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + decimal;
                    return params.name + ' : ' + value;
                } else {
                    return params.name + '：-';
                }
            };
            self.initChart('chart');
        },
        _parseCitysData: function(cityLocData, ind, fldArr, unit, cityValRst) {
            // console.log(cityLocData);
            // console.log(cityValRst);
            // console.log(fldArr);
            var geoCoordMap = '{';
            for (var i = 0, len = cityLocData.length; i < len; i++) {
                geoCoordMap += '"' + cityLocData[i].CITYNAME + '":[' + cityLocData[i].LNG + ',' + cityLocData[i].LAT + '],';
            }
            geoCoordMap = JSON.parse(geoCoordMap.slice(0, -1) + '}');
            // console.log(geoCoordMap);

            var citysVal = [];
            var valj;
            for (var j = 0; j < cityValRst.length; j++) {
                var oneCityObj = {};
                valj = cityValRst[j][fldArr[1]];
                if (!valj || valj == 'null') {
                    valj = 0;
                }
                // console.info(valj);
                oneCityObj.name = cityValRst[j][fldArr[0]];
                oneCityObj.value = valj;
                citysVal.push(oneCityObj);
            }
            // console.log(citysVal);

            this.initScatterOpt(geoCoordMap, citysVal, ind, unit);
        },
        _queryAllCitysLatlng: function(cityValRst, ind, fldArr, unit) {
            var self = this;
            var succ = self._parseCitysData;
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    // console.log(data); 
                    if (data.length && data.length !== 0) {
                        util.bindContext(self, succ, data, ind, fldArr, unit, cityValRst);
                    }
                },
                'processFailed': function() {
                    console.error('query error');
                }
            });
            var sql = {
                'lyr': 't_allCitys',
                'fields': '*',
                // 'filter': 'id=2'
            };
            sqlservice.processAscyn("SQLQUERY", "CJEB", sql);
        },
        _reqData: function(rst, ind, year_cnty, tab, type) {
            var self = this;
            console.log(rst);
            var fldArr = ['V2', rst[0].FIELD];
            var filter;
            if (type == 'line') {
                fldArr[0] = 'V4';
                filter = "V2 = '" + year_cnty + "'";
            } else {
                filter = "V4 ='" + year_cnty + "'";
            }
            // console.log(filter);

            var unit = rst[0].UNIT;
            var flds = util.fldsArrTostring(fldArr);
            var option = {
                "scriptname": "CJEB.charts.getIndValue",
                "field": flds,
                "tablename": tab,
                "filter": filter
            };
            var succ;
            if (type === 'theme' /*|| type === 'scatter'*/ ) {
                succ = self._proRst4map;
            } else if (type === 'scatter') {
                succ = self._queryAllCitysLatlng;
            } else if (type === 'bar' || type === 'line') {
                succ = self._proRst4chart;
            }

            var sqlservice = new gEcnu.WebsqlScript({
                'processCompleted': function(data) {
                    var queryResult = data.queryResult;
                    // console.log(queryResult);
                    util.bindContext(self, succ, queryResult, ind, fldArr, unit, type);
                },
                'processFailed': function() { alert('请求失败'); }
            });
            sqlservice.processAscyn(option);
        },
        addval2chart: function(ind, year_cnty, table, type) {
            var self = this;
            var thmmapId = this.getchartId();
            var dom = document.getElementById(thmmapId);
            this.myChart = echarts.init(dom);
            this.myChart.showLoading();
            this.myChart.hideLoading();
            if (type === 'scatter') {
                /* console.log('======'+type);
                 var callbackFuc = this.initScatterOpt(dataStorage.geoCoordMap, dataStorage.citysVal);
                 // charts.trigger('getDBData', callbackFuc);
                 self.initChart('scatter');*/
            } else {
                this.initOpt();
            }

            // console.log(ind + ' ' + year_cnty + ' ' + table + ' ' + type);
            if (type == 'line') {
                self.cnty = year_cnty || '上海市';
                if (!year_cnty) year_cnty = '上海市';
            } else {
                self.year = year_cnty || '2008';
                if (!year_cnty) year_cnty = '2008';
                // if (type == 'bar') {
                //     self.arrowshow();
                // } else {
                //     self.arrowhide();
                // }
            }
            if (type === 'bar' || type === 'theme') {
                self.arrowshow(type);
            }
            self.ind = ind, self.tab = table;
            var tab = 'fieldsdef'; //查询出表中每列代表的含义
            var filter = "fieldRealname like '%" + ind + "%'";
            filter += "AND tabname like '%" + table + "%'";
            var option = {
                "scriptname": "CJEB.charts.getIndFld",
                "ind": ind,
                "tablename": tab,
                "filter": filter
            };
            if (ind.indexOf("(") > 0) { //指标中有'()'的情况
                var indArr = ind.split('(');
                ind = indArr[0];
                var unit = indArr[1].substring(0, indArr[1].length - 1);
                option.filter = "fieldRealname like '%" + ind + "%' AND tabname like '%" + table + "%' AND unit = '" + unit + "'";
            }

            var succ = self._reqData;
            var sqlservice = new gEcnu.WebsqlScript({
                'processCompleted': function(data) {
                    if(data&&data.queryResult.length!== 0){

                    }
                    var queryResult = data.queryResult;
                    util.bindContext(self, succ, queryResult, ind, year_cnty, table, type);
                },
                'processFailed': function() { alert('请求失败'); }
            });
            sqlservice.processAscyn(option);
        },
        toggle4chart: function(root) {
            var toType = $(root).attr('to');
            var chartId = this.getchartId();
            var boxId = this.getyear_cnty_boxId();
            var subTabId = this.getsubTabId();
            $('#' + chartId).css('left', 'initial');
            $('#' + boxId).css('left', 'initial');
            var width_ct = $('#' + chartId).css('width');
            var width_box = $('#' + boxId).css('width');
            var sub_year_cntyId = this.getsubyearcntyId();
            var cnty = this.cnty,
                year = this.year;
            var chartDom = document.getElementById(chartId);
            var boxDom = document.getElementById(boxId);
            var left_ct = chartDom.offsetLeft;
            var left_box = boxDom.offsetLeft;
            switch (toType) {
                case 'line':
                    this.trigger('initbox', '城市');
                    // $('#' + chartId).css('width', 0).animate({ width: width_ct });
                    $('#' + boxId).css('width', 0).animate({ width: width_box });
                    $(root).attr({ 'title': '切换回柱状图', 'to': 'bar' }).css('background', 'url(modules/charts/imgs/arrow_left.png) no-repeat');
                    $('#' + sub_year_cntyId).attr('type', '城市').text(cnty).prev().text('城 市:');
                    $('#' + subTabId).children('.select').eq(0).attr('type', 'line');
                    break;
                case 'bar':
                    this.trigger('initbox', '年份');
                    $('#' + boxId).css({ 'left': left_box, 'width': 0 }).animate({ width: width_box });
                    $(root).attr({ 'title': '切换至历年变化折线图', 'to': 'line' }).css('background', 'url(modules/charts/imgs/arrow_right.png) no-repeat');
                    $('#' + sub_year_cntyId).attr('type', '年份').text(year + '年').prev().text('年 份：');
                    $('#' + subTabId).children('.select').eq(0).attr('type', 'bar');
                    break;
                case 'theme':
                    this.trigger('initbox', '年份');
                    $(root).attr({ 'title': '切换至散点专题图', 'to': 'scatter' }).css('background', 'url(modules/charts/imgs/arrow_right.png) no-repeat');
                    $('#' + sub_year_cntyId).attr('type', '年份').text(year + '年').prev().text('年 份：');
                    $('#' + subTabId).children('.select').eq(0).attr('type', 'theme');
                    break;
                case 'scatter':
                    this.trigger('initbox', '年份');
                    $(root).attr({ 'title': '切换至颜色专题图', 'to': 'theme' }).css('background', 'url(modules/charts/imgs/arrow_left.png) no-repeat');
                    $('#' + sub_year_cntyId).attr('type', '年份').text(year + '年').prev().text('年 份：');
                    $('#' + subTabId).children('.select').eq(0).attr('type', 'scatter');
                    break;
            }

        },
        getMapId: function() {
            return 'mapview';
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
        },
        getarrowId: function() {
            return 'toggle_logo';
        },
        getsubTabId: function() {
            return 'subTab';
        },
        getmainwinId: function() {
            return 'mainwin';
        },
        getwinclass: function() {
            return 'window';
        }

    };

    $('.toggle_logo').on('click', function() {
        var ind = charts.ind;
        var tab = charts.tab;
        var year = charts.year;
        var cnty = charts.cnty;
        var toType = $(this).attr('to');
        charts.toggle4chart(this);

        switch (toType) {
            case 'line':
                charts.addval2chart(ind, cnty, tab, toType);
                break;
            case 'bar':
            case 'scatter':
            case 'theme':
                charts.addval2chart(ind, year, tab, toType);
                break;
        }
    });

    module.exports = charts;

});
