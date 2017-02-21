let util = {
	/**
	 * [adapt 屏幕自适应]
	 * @param  {Number} designWidth [标准设计稿尺寸]
	 * @param  {Number} rem2px      [标准设计稿下1rem等于多少px]
	 * @return {[null]}             []
	 */
	adapt(designWidth = 640,rem2px = 100){
		let doc = window.document,
		d = doc.createElement('div');
		d.style.width ='1rem';
		d.style.display = 'none';
		let head = doc.getElementsByTagName('head')[0];
		head.appendChild(d);
		let defaultFontSize = parseFloat(window.getComputedStyle(d,null).getPropertyValue('width'));
		d.remove();
		doc.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px /defaultFontSize * 100 +'%';
		let st = doc.createElement('style');
		let portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((window.innerWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
  		let landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
  		st.innerHTML = portrait + landscape;
  		head.appendChild(st);
    },
    /**
     * [debounce 防反跳]
     * @param  {[Function]} func      [防反跳的函数]
     * @param  {[Number]} threshold [时间间隔]
     * @param  {[Boolean]} execAsap  [是否立即执行，true立即执行，默认为false]
     * @param  {[Function]} fun       [如果存在，一定会执行的函数]
     * @return {[null]}          
     */
    debounce(func, threshold = 100, execAsap = false, fun){
    	let timeout;
    	return function debounced(){
    		let self = this, args = arguments;
    		function delayed(){
    			if(!execAsap) func.apply(self,args);
    			timeout = null;
    		}

    		if(timeout){
    			clearTimeout(timeout);
    		}else if(execAsap){
    			 func.apply(self,args);
    		}
    		timeout = setTimeout(delayed,threshold);
    		
    		if(fun) fun.apply(self,args);
    	}
    },
    /**
     * [debounceAdapt 动态计算媒体查询]
     * @param  {Number} designWidth [标准设计稿尺寸]
	 * @param  {Number} rem2px      [标准设计稿下1rem等于多少px]
	 * @return {[null]}             []
     */
    debounceAdapt(designWidth = 640,rem2px = 100) {
    	this.adapt(designWidth,rem2px);//屏幕自适应处理
		window.onresize = this.debounce(() => {
			this.adapt(designWidth,rem2px);
		},200,false);
    }
    
}


export default util;