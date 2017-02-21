
define(function (require, exports, module){

	var menuList = {

		init:function(root){
			this.show(root);
			this.adjustAlign(root);
		},

		show:function(root){
			var mapId = this.getMapId();
			// $('#'+mapId).css('zIndex','-1');
			$(root).find('.menuList').show();
		},
		hide:function(){
			var mapId = this.getMapId();
			var menuClass = this.getMenuClass();
			$('#'+mapId).css('zIndex','inherit');
			$('.'+menuClass).hide();
		},

		adjustAlign:function(root){
			var boxLft = root.offsetLeft;
			var txtLft = root.childNodes[1].offsetLeft;
			$(root).find('li').css('textIndent',txtLft - boxLft);
		},

		getMapId:function(){
			return 'mapview';
		},
		getpopwinId:function(){
			return 'popwinDiv';
		},
		getMenuClass:function(){
			return 'menuList';
		}

	};

	$('#menu .menu').hover(function() {
        var root = this;
        $('#menu .menu').removeClass('menuhov');
        $(this).addClass('menuhov');
        menuList.init(root);
        var container = $(this).children('.menuList');
        util.mouseoverList(340,container); 
    }, function() {
        menuList.hide();
        $(this).removeClass('menuhov');
        $('.sub_menu_ul').css('top',0);
    });

	$('#menu .toTopli').mousemove(function(){
        $(this).parent().css('top',0);
    });

	$('#menu').on('click','li',function(){
        var self = this;
        var ind = $(this).attr('initInd');
        var tab = $(this).attr('tab');
        $('#menu .menu').removeClass('menusel');
        $(this).parent().parent().parent().addClass('menusel');
        console.log(ind,tab);
        menuList.trigger('menuclick',self,ind,tab);
    });

    $('#home').on('click',function(){
    	if($(this).hasClass('menusel')) return;
    	var popwinId = menuList.getpopwinId();
    	var mapId = menuList.getMapId();
    	$('#menu .menu').removeClass('menusel');
    	$(this).addClass('menusel');
    	$('#'+popwinId).hide();
    	$('#'+mapId).show();
    });

    module.exports = menuList;

});
