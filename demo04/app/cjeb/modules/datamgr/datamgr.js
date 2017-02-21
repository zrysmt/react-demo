define(function(require, exports, module) {
    var datamgr = {
        init: function(table, cnty_year) {
            this.table = table;
            var toType = $('.toggle_datamgr').attr('to');
            var type = 'yearTab';
            if (toType == 'cityTab') {
                this.year = cnty_year;
                type = 'yearTab';
            } else if (toType == 'yearTab') {
                cnty_year = cnty_year ? cnty_year : '上海市';
                this.cnty = cnty_year;
                type = 'cityTab';
            }
            // console.info(cnty_year);
            this.show();
            this.getFieldsDef(table, cnty_year, type);
        },
        show: function() {
            var datamgrId = this.getdatamgrId();
            var winclass = this.getwindowclass();
            var footId = this.getFootId();
            $('.' + winclass).hide();
            $('#' + datamgrId).show();

            /*初始化显示是时间选择？还是城市选择*/
            var toType = $('.toggle_datamgr').attr('to');
            var sub_year_cntyId = this.getsubyearcntyId();
            var cnty = this.cnty || '上海市',
                year = this.year || 2008;
            switch (toType) {
                case 'yearTab':
                    this.trigger('initbox', '城市');
                    $('#' + sub_year_cntyId).attr('type', '城市').text(cnty).prev().text('城 市:');
                    break;
                case 'cityTab':
                    this.trigger('initbox', '年份');
                    $('#' + sub_year_cntyId).attr('type', '年份').text(year + '年').prev().text('年 份：');
                    break;
            }
        },
        hide: function() {
            var datamgrId = this.getdatamgrId();
            $('#' + datamgrId).hide();
        },
        initDataTable: function(fieldsData, data) {
            var tData = [];
            var thName = [];
            var len = fieldsData.length;
            thName.push({ title: 'ID', data: 'ID' });
            for (var i = 0; i < len; i++) {
                if (!fieldsData[i].UNIT||fieldsData[i].UNIT=='null') {
                    thName.push({ title: fieldsData[i].FIELDREALNAME, data: fieldsData[i].FIELDREALNAME });
                } else {
                    thName.push({ title: fieldsData[i].FIELDREALNAME + '(' + fieldsData[i].UNIT + ')', data: fieldsData[i].FIELDREALNAME + '(' + fieldsData[i].UNIT + ')' });
                }
            }
            for (var j = 0; j < data.length; j++) {
                var obj = '{';
                var index = 0;
                var datajk='';
                for (var k in data[j]) {
                    datajk = data[j][k]&&data[j][k]!='null'?data[j][k]:'';
                    obj += '"' + thName[index].data + '":"' + datajk + '",';
                    index++;
                }
                obj = obj.slice(0, -1) + '}';
                tData.push(JSON.parse(obj));
            }

            // $('#datamgr_table').DataTable({}).destroy();
            var table = $('#datamgr_table').DataTable({
                language: {
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上页",
                        "sNext": "下页",
                        "sLast": "末页"
                    },
                    "oAria": {
                        "sSortAscending": ": 以升序排列此列",
                        "sSortDescending": ": 以降序排列此列"
                    }
                },
                dom: 'Bflrtip', //B指的是button
                buttons: ['excel', 'pdf'],
                data: tData,
                columns: thName,
                "destroy": true
            });
            table.on('draw', function() {
                // var h = $('.maintenance').height();
                // $('#foot').css('top', h + 240);
                $('#foot').css('z-index', '-1');
                $('#dash_line').css('z-index', '-1');
            });

        },
        _getTableData: function(fieldsData, cnty_year, table, type) {
            var self = this;
            var filter = '';
            if (type == 'yearTab') {
                filter = "V4 =" + cnty_year;
            } else {
                filter = "V2 ='" + cnty_year + "'";
            }
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    if (data.length && data.length !== 0) {
                        self.initDataTable(fieldsData, data);
                    } else {
                        util.showTipWin('暂未提供数据');
                        $('#datamgr_table').DataTable({ data: {}, "destroy": true });
                    }
                },
                'processFailed': function() {
                    console.error('query error');
                }
            });
            var sql = {
                'lyr': table,
                'fields': '*',
                'filter': filter
            };
            sqlservice.processAscyn("SQLQUERY", "CJEB", sql);
        },
        getFieldsDef: function(table, cnty_year, type) {
            var self = this;
            self.tab = table;
            var tab = 'fieldsdef';
            var filter = " tabname = '" + table + "'";
            var succ = self._getTableData;
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    if (data.length && data.length !== 0) {
                        util.bindContext(self, succ, data, cnty_year, table, type);
                    } else {
                        util.showTipWin('暂未提供数据');
                        $('#datamgr_table').DataTable({ data: {}, "destroy": true });
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
        toggle4table: function(root) {
            var toType = $(root).attr('to');
            var boxId = this.getyear_cnty_boxId();
            var subTabId = this.getsubTabId();
            $('#' + boxId).css('left', 'initial');
            var width_box = $('#' + boxId).css('width');
            var sub_year_cntyId = this.getsubyearcntyId();
            var cnty = this.cnty || '上海市',
                year = this.year || 2008;
            var boxDom = document.getElementById(boxId);
            var left_box = boxDom.offsetLeft;
            switch (toType) {
                case 'cityTab':
                    this.trigger('initbox', '城市');
                    $('#' + sub_year_cntyId).attr({ 'type': '城市', 'rember': 'city' }).text(cnty).prev().text('城 市:');
                    $('#' + boxId).css('width', 0).animate({ width: width_box });
                    $(root).attr({ 'title': '切换回按照年份查看', 'to': 'yearTab' }).css('background', 'url(modules/charts/imgs/arrow_left.png) no-repeat');
                    // $('#' + subTabId).children('.select').eq(0).attr('type', 'datamgr');
                    break;
                case 'yearTab':
                    this.trigger('initbox', '年份');
                    $('#' + sub_year_cntyId).attr({ 'type': '年份', 'rember': 'year' }).text(year + '年').prev().text('年 份：');
                    $('#' + boxId).css({ 'left': left_box, 'width': 0 }).animate({ width: width_box });
                    $(root).attr({ 'title': '切换至历年变化折线图', 'to': 'cityTab' }).css('background', 'url(modules/charts/imgs/arrow_right.png) no-repeat');
                    // $('#' + subTabId).children('.select').eq(0).attr('type', 'datamgr');
                    break;
            }
        },
        getdatamgrId: function() {
            return 'datawin';
        },
        getwindowclass: function() {
            return 'window';
        },
        getyear_cnty_boxId: function() {
            return 'year_cnty_box';
        },
        getsubyearcntyId: function() {
            return 'sub_year_cnty';
        },
        getsubTabId: function() {
            return 'subTab';
        },
        getFootId: function() {
            return 'foot';
        }

    };

    $('.toggle_datamgr').on('click', function() {
        var table = datamgr.table;
        var year = datamgr.year;
        var cnty = datamgr.cnty;
        var toType = $(this).attr('to');

        datamgr.toggle4table(this, toType);

        switch (toType) {
            case 'cityTab':
                datamgr.init(table, cnty);
                break;
            case 'yearTab':
                datamgr.init(table, year);
                break;
        }
    });

    module.exports = datamgr;

});
