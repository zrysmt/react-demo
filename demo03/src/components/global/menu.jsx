import React from 'react';
import ReactDOM from 'react-dom';

import MenuLi from './menuLi';

import './menu.scss';

let menuLis = ["Home","Story","Travel","TimeLine","Future"];

class MenuUl extends React.Component{
	render(){
		return(
			<ul>
			{
				menuLis.map(function(menuLi) {
				    return <MenuLi name={menuLi}/>
				})
			}
			</ul>
		);	
	}
} 

class Nav extends React.Component{
	render(){
		return(
			<nav>
				<div id="menu">
					<MenuUl/>			
				</div>
			</nav>
		)
	}
}


export default Nav;