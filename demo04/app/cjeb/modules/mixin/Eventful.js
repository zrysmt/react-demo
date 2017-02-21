
define(function (require, exports, module){

	var Eventful = {
		//添加自定义事件
		addCustomEvt:{
			_events:{},
			on: function (evtname,callback) { //绑定自定义事件
				var cb = arguments.length > 1 ? arguments[1] : function (){};
				if(!this._events[evtname]){
					this._events[evtname] = [cb];
				}else{
					this._events[evtname].push(cb);
				} 
			},
			off: function (evtname) { //解绑自定义事件
				if(this._events[evtname]){
					delete this._events[evtname];
				}
			}
		},
		trigger: function (evtName) { //触发自定义事件
    		var callbackArr = this.addCustomEvt._events[evtName];
    		var args = Array.prototype.slice.call(arguments, 1);
    		for(var i=0,len=callbackArr.length;i<len;i++){
    			var fun = callbackArr[i];
    			fun.apply(null,args);
    		}
		}
	}

	module.exports = Eventful;
});
