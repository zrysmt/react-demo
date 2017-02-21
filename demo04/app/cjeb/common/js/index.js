//sea.js配置
seajs.config({
    'base': './modules/'
});

//esl.js配置  
// require.config({
//   baseUrl: './modules/',
// });  

define(function(require) {

    //统一引进子模块的脚本
    require('menubar/menubar');
    var Eventful = require('mixin/Eventful');
    var navMod = require('nav/nav');
    var mapviewMod = require('mapview/mapview');
    var menuListMod = require('menubar/menubar');
    var subTitleMod = require('subTitle/subTitle');
    var indlistMod = require('indlist/indlist');
    var intermapMod = require('intermap/intermap'); //交互地图模块
    var chartsMod = require('charts/charts');
    var modelMod = require('model/model');
    var datamgrMod = require('datamgr/datamgr');
    //[mixin 将src的方法全部给dests中的js文件，或者说是继承]
    util.mixin(
        [
            menuListMod,
            subTitleMod,
            indlistMod,
            intermapMod,
            chartsMod,
            modelMod,
            datamgrMod
        ],
        Eventful
    );

    menuListMod.addCustomEvt.on('menuclick', menuListMod_menuclick);
    subTitleMod.addCustomEvt.on('yearOrcntyClick', subTitleMod_yearOrcntyClick);
    // subTitleMod.addCustomEvt.on('modelclick', modelMod_modelclick);
    indlistMod.addCustomEvt.on('indclick', indlistMod_indclick);
    chartsMod.addCustomEvt.on('initbox', chartsMod_initbox);
    datamgrMod.addCustomEvt.on('initbox', datamgrMod_initbox);
    // chartsMod.addCustomEvt.on('getDBData', chartsMod_getDBData);

    navMod.init(); //主要是登录和注册
    mapviewMod.init();

    var gl_ind, gl_year, gl_cnty, gl_tab;

    //点击菜单menu
    function menuListMod_menuclick(obj, ind, tab) {
        gl_ind = ind;
        gl_tab = tab;
        gl_year = $(obj).text() == '水资源' ? 2012 : 2008;
        gl_cnty = '上海市';
        subTitleMod.init(obj);//子标题
        indlistMod.init(obj);//左边指标初始化
        // chartsMod.init(obj); 
        intermapMod.init(obj); //默认第一个绘制，初始化
        // intermapMod.renderInteractMap(gl_tab,gl_tab,gl_year);
    }

    function subTitleMod_yearOrcntyClick(year_cnty, type) {
        if (type == 'line') {
            gl_cnty = year_cnty;
        } else {
            gl_year = year_cnty;
        }
        if ($('#mainwin').is(':hidden')) chartsMod.show();
        if (type == 'intermap') {
            // console.log('选择年份');
            intermapMod.renderInteractMap(gl_tab, gl_ind, year_cnty);
            // intermapMod.init();
        } else if (type == 'datamgr') {
            datamgrMod.init(gl_tab,year_cnty);
        } else {
            chartsMod.addval2chart(gl_ind, year_cnty, gl_tab, type);
        }
    }

    function indlistMod_indclick(indName, tab, type) {
        gl_ind = indName;
        gl_tab = tab;
        var year_cnty = type == 'line' ? gl_cnty : gl_year;
        if (type == 'intermap') {
            intermapMod.renderInteractMap(gl_tab, gl_ind, year_cnty);
        } else {
            chartsMod.addval2chart(indName, year_cnty, tab, type);
        }
    }

    function chartsMod_initbox(type) {
        subTitleMod.initbox(type);
    }
    
    function datamgrMod_initbox(type){
        subTitleMod.initbox(type);
    }
    // function modelMod_modelclick() {
    //     modelMod.init(); //模型暂时不做
    // }


});
