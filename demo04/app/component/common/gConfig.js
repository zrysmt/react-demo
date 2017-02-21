/**
 * 全局的配置信息
 */

// nav的菜单
const menuLis = [
	{id:1,title:"首页",enTitle:"home"},
	{id:2,title:"指标预览",enTitle:"indview"},
	{id:3,title:"综合制图",enTitle:"makemap"},
	{id:4,title:"地图模块",enTitle:"mapmod"}
];
const siteObj = {
	title:'"长江经济带"数据库平台'
};
class gConfig{
	getMenuLis(){
		return menuLis;
	}
	getSiteObj(){
		return siteObj;
	}
}

export default gConfig;