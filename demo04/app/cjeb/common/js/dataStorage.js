/**
 * 暂时存储数据，提供后来使用
 */
define(function(require,exports,module){
	var dataStor = [];
	var dataStorage = {
		geoCoordMap:'',
		citysVal:'',
		// setData:function(key,value){
		// 	var obj = {};
		// 	obj.name = key;
		// 	obj.value = value;
		// 	dataStor.push(obj);
		// },
		// getData:function(key){
		// 	for (var i = 0; i < dataStor.length; i++) {
		// 		dataStor[i];
		// 	}
		// },
	};

	module.exports = dataStorage;
});