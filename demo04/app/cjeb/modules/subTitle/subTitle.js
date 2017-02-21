
define(function (require, exports, module){

	var subTitle = {

		init:function(root){
			this.year = $(root).text()=='水资源'?2012:2008;
			this.cnty = '上海市'; 
			this.changeTitle(root);
			this.initbox('年份');
			this.highlight4thm();
			this.show();
		},
		show:function(){
			var mapId = this.getMapId();
			var subTitId = this.getsubId();
			$('#'+mapId).hide();
			$('#'+subTitId).show();
		},
		hide:function(){
			var subTitId = this.getsubId();
			$('#'+subTitId).hide();
		},
		highlight4thm:function(){
			var subTabClass = this.getsubTabclass();
			$('.'+subTabClass).removeClass('select').first().addClass('select');
		},
		changeTitle:function(root){
			var subTxtId = this.getsubTxtId();
			var indName = $(root).text();
			var parentInd = $(root).parent().parent().prev().text();
			$('#'+subTxtId).children('span').text(parentInd+'-'+indName);
		},
		initbox:function(type){
			var boxId = this.getyear_cnty_boxId();
			var titleId = this.getsubyear_cntyId();//id='sub_year_cnty'
			$('#'+boxId).show();
			$('#'+titleId).attr('type',type);
			this.closebox(type);
		},
		openbox:function(type){
			var subyear_cntyId = this.getsubyear_cntyId();
			var mainId = this.getmainboxId();
			var listId = type=='年份'?this.getyearlistId():this.getcntylistId();
			$('#'+mainId).addClass('boxclk').children('.TriDwn').addClass('triclk');
			$('#'+listId).slideDown('fast');
			$('#'+subyear_cntyId).text('').prev().text('选择'+type);
		},
		closebox:function(type){
			var subyear_cntyId = this.getsubyear_cntyId();
			var mainId = this.getmainboxId();
			var listclass = this.getyearcntylistclass();
			var year = this.year;
			var cnty = this.cnty;
			$('#'+mainId).removeClass('boxclk').children('.TriDwn').removeClass('triclk');
			$('.'+listclass).slideUp('fast');
			if(type=='年份'){
				$('#'+subyear_cntyId).text(year+'年').prev().text('年 份：');
			}else{
				var len = cnty.length;
				var state = len>5?'城市:':(len==5 && $(window).width()<=1200)?'城市:':'城 市：';
				$('#'+subyear_cntyId).text(cnty).prev().text(state);
			}
		},
		normalSty:function(){
			var listDiv = this.getlistDivclass();
			var listClass = this.getlistclass();
			var TriRgtClass = this.getTriRgtclass();
			$('.'+listDiv).hide();
			$('.'+listClass).removeClass('menuHov');
			$('.'+TriRgtClass).removeClass('triHov');
		},
		hoverSty:function(root){
			var listClass = this.getlistclass();
			var TriRgtClass = this.getTriRgtclass();
			$('.'+listClass).removeClass('menuHov');
			$('.'+TriRgtClass).removeClass('triHov');
			$(root).addClass('menuHov').children('.TriRgt').addClass('triHov').next().show();
		},
		getMapId:function(){
			return 'mapview';
		},
		getsubId:function(){
			return 'subTitle';
		},
		getsubTxtId:function(){
			return 'subTxt';
		},
		getyear_cnty_boxId:function(){
			return 'year_cnty_box';
		},
		getsubyear_cntyId:function(){
			return 'sub_year_cnty';
		},
		getyearlistId:function(){
			return 'yearlist';
		},
		getcntylistId:function(){
			return 'cntylist';
		},
		getmainboxId:function(){
			return 'mainbox';
		},
		getlistclass:function(){
			return 'sub_year_cnty_list';
		},
		getTriRgtclass:function(){
			return 'TriRgt';
		},
		getsubTabclass:function(){
			return 'subTab';
		},
		getsubyearulclass:function(){
			return 'sub_year_cnty_ul';
		},
		getyearcntylistclass:function(){
			return 'year_cnty_list';
		},
		getlistDivclass:function(){
			return 'listDiv';
		}

	};

	$('#mainbox').on('click',function(){
		var titleId = subTitle.getsubyear_cntyId();
		var yearlistId = subTitle.getyearlistId();
		var cntylistId = subTitle.getcntylistId();
		var type = $('#'+titleId).attr('type');
		if($('#'+yearlistId).is(':hidden') && $('#'+cntylistId).is(':hidden')){
			subTitle.openbox(type);
		}else{
			subTitle.closebox(type);
		}
	});

	$('.sub_year_cnty_list').hover(function(){
		subTitle.hoverSty(this);
		var container = $(this).children('.listDiv');
        util.mouseoverList(300,container);
	},function(){
		subTitle.normalSty();
		$('.sub_year_cnty_ul').css('top',0);
	});

	$('#year_cnty_box .toTopli').mousemove(function(){
        $(this).parent().css('top',0);
    });

	$('#yearlist').on('click','.year_cnty_Item',function(){
		var type = $('#subTab .select').eq(0).attr('type');
		// console.log(type);
		if(type=='line') type = 'bar';
		var flag = '年份';
		var year = $(this).text();
		year = year.substring(0,year.length-1);
		subTitle.year = year;
		subTitle.closebox(flag);

		subTitle.trigger('yearOrcntyClick',year,type);
	});

	$('#cntylist').on('click','.year_cnty_Item',function(){
		var type = $('#subTab .select').eq(0).attr('type');
		var flag = '城市';
		var cnty = $(this).text();
		subTitle.cnty = cnty;
		subTitle.closebox(flag);
		subTitle.trigger('yearOrcntyClick',cnty,type);
	});

	$('#subTab').on('click','.subTab',function(){
		if($(this).hasClass('select')) return;
		$('.subTab').removeClass('select');
		$(this).addClass('select');
		var year = subTitle.year;
		var cnty = subTitle.cnty;
		var subYearcntyId = subTitle.getsubyear_cntyId();
		// if(('#'+mainboxId).attr('type')=='城市'){
		if($('#'+subYearcntyId).attr('rember')=='city'){
			cnty_year = cnty;
		}else{
			cnty_year = year;
		}
		var type = '年份';
		switch($(this).text()){
			case '交互地图':
				subTitle.initbox(type);
				// subTitle.trigger('intermapclick',year,'intermap');
				subTitle.trigger('yearOrcntyClick',year,'intermap');
				break;
			case '专题地图':
				subTitle.initbox(type);
				subTitle.trigger('yearOrcntyClick',year,'theme');
				break;
			case '图表展示':
				// $(this).attr('type','bar');
				subTitle.initbox(type);
				subTitle.trigger('yearOrcntyClick',year,'bar');
				break;
			case '数据管理':
				subTitle.initbox(type);
				subTitle.trigger('yearOrcntyClick',cnty_year,'datamgr');
				break;
		}
	});

	module.exports = subTitle;

});
