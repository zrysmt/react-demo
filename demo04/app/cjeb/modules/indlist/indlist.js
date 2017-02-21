define(function(require, exports, module) {

    indlist = {

        init: function(root) {
            var indtab = $(root).attr('tab');
            this.tab = indtab;
            this.show();
            this.addIndOpt(root);
        },
        show: function() {
            var mapId = this.getMapId();
            var indId = this.getindId();
            var windowclass = this.getwindowclass();
            $('#' + mapId + ',.' + windowclass).hide();
            $('#' + indId).parent().show().parent().show();
        },
        hide: function() {
            var indId = this.getindId();
            $('#' + indId).hide();
        },
        _fillOpt: function(rst, flag) {
            var self = this;
            var indmenuId = self.getindMenuId();
            var listboxId = self.getlistboxId();
            $('#' + indmenuId).children().remove();
            var ofrag = document.createDocumentFragment();
            var odiv = document.createElement('div');
            odiv.className = 'optItem';
            var oimg = document.createElement('img');
            oimg.className = 'optImg';
            oimg.src = 'modules/indlist/imgs/wired.png';
            var odiv2 = document.createElement('div');
            odiv2.className = 'optTxt';
            var initInd = rst[0].IND;
            var lastind = flag ? rst[0].IND2 : '';
            for (var i = 0, len = rst.length; i < len; i++) {
                var ind = $.trim(rst[i].IND);
                var div = odiv.cloneNode(true);
                var div2 = odiv2.cloneNode(true);
                var img = oimg.cloneNode(true);
                if (!flag) {
                    div2.innerHTML = ind;
                    div2.title = ind;
                } else {
                    var ind2 = rst[i].IND2;
                    var tab = rst[i].TAB;
                    var unit = '(' + rst[i].UNIT + ')';
                    if (ind == initInd && i != 0) {
                        img.style.top = '5px';
                        div.className = 'optItem2';
                        div2.innerHTML = ind2;
                        div2.title = ind2;
                        if (ind2 == lastind) {
                            div2.innerHTML += unit;
                            div2.title += unit;
                        }
                        div2.setAttribute('tab', tab);
                    } else {
                        initInd = ind;
                        div2.innerHTML = ind;
                        div2.title = ind;
                        div2.className = 'optTxt_disint';
                        div.appendChild(img);
                        div.appendChild(div2);
                        ofrag.appendChild(div);
                        var div = odiv.cloneNode(true);
                        var div2 = odiv2.cloneNode(true);
                        var img = oimg.cloneNode(true);
                        img.style.top = '5px';
                        div.className = 'optItem2';
                        div2.innerHTML = ind2;
                        div2.title = ind2;
                        if (i < len - 1 && ind2 == rst[i + 1].IND2) {
                            div2.innerHTML += unit;
                            div2.title += unit;
                        }
                        div2.setAttribute('tab', tab);
                    }
                    lastind = ind2;
                }
                if (i == 0) $(div2).addClass('select');
                div.appendChild(img);
                div.appendChild(div2);
                ofrag.appendChild(div);
            }
            $('#' + indmenuId).append(ofrag);
            $('#' + listboxId).perfectScrollbar('update');
        },
        addIndOpt: function(root) {
            var self = this;
            var ind = $(root).text();
            var tab = 'cjeb_ind';
            var field = "LEV3 as ind";
            var filter = "lev2 = '" + ind + "'";
            var option = {
                "scriptname": "CJEB.indlist.getIndOpt",
                "field": field,
                "tablename": tab,
                "filter": filter
            };
           /* var flag = $(root).hasClass('multilevel');
            if (flag) {
                option.scriptname = "CJEB.indlist.getIndOpt_2";
                option.filter += "AND UNIT<>'现价本币'";
            }*/
            var succ = self._fillOpt;
            var sqlservice = new gEcnu.WebsqlScript({
                'processCompleted': function(data) {
                    var queryResult = data.queryResult;
                    util.bindContext(self, succ, queryResult/*, flag*/);
                },
                'processFailed': function() { alert('请求失败'); }
            });
            sqlservice.processAscyn(option);
        },
        getMapId: function() {
            return 'mapview';
        },
        getindId: function() {
            return 'indlist';
        },
        getindMenuId: function() {
            return 'indmenu';
        },
        getlistboxId: function() {
            return 'listbox';
        },
        getwindowclass: function() {
            return 'window';
        }

    };

    $('#indmenu').on('click', '.optTxt', function() {
        $('#indmenu .optTxt').removeClass('select');
        $(this).addClass('select');
        var type = $('#subTab .select').eq(0).attr('type');
        var ind = $(this).text();
        var tab = indlist.tab;
        if ($(this).parent().hasClass('optItem2')) tab = $(this).attr('tab');
        indlist.ind = ind;
        indlist.trigger('indclick', ind, tab, type);
    });

    $('#listbox').perfectScrollbar();

    module.exports = indlist;

});
