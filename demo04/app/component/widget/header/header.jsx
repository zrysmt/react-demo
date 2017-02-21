import React from 'react';
import {Link} from 'react-router';

import gConfig from '../../common/gConfig';

let config = new gConfig();
const menuLis = config.getMenuLis();
const siteObj = config.getSiteObj();

import './menu.scss';

class MenuLi extends React.Component{
	render(){
		let title = this.props.title,
		    enTitle = this.props.enTitle,
			enTitleLower = enTitle.toLowerCase(),
		    linkTo = enTitle == "home"?"/":"/"+enTitleLower,
		    onlyActiveOnIndexBool = enTitle == "home"?true:false,
		    activeClass = enTitle == "home"?"":"active";
		return (
			<li >
				<Link to={linkTo}  activeClassName={activeClass} onlyActiveOnIndex={onlyActiveOnIndexBool}>
					{title}
				</Link>
			</li>
		);
	}
}

class MenuUl extends React.Component{
	render(){
		const listItems = menuLis.map((menuLi) => {
		    return <MenuLi title={menuLi.title} enTitle={menuLi.enTitle} key={menuLi.title}/>
		});
		return( 
			<ul id="menu">
				{listItems}
			</ul>
		);	
	}
} 

class Header extends React.Component{
	render(){
		return(
			<div id="header">
				<div className="h-l-title">{siteObj.title}</div>
				<MenuUl/>
				<div className="h-r-usr">ZhaoRuyi</div>			
			</div>
		)
	}
}


export default Header;