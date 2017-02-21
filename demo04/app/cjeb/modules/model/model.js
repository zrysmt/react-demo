
define(function (require, exports, module){

	model = {

		init:function(root){
			/*this.year = 2008;
			this.cnty = '中国'; */
			this.show();
		},
		show:function(){
			var dataId = this.getdataId();
			var winclass = this.getwindowclass();
			$('.'+winclass).hide();
			$('#'+dataId).show();
		},
		hide:function(){
			var dataId = this.getdataId();
			$('#'+dataId).hide();
		},
		getdataId:function(){
			return 'datawin';
		},
		getwindowclass:function(){
			return 'window';
		}

	};

	module.exports = model;

});
