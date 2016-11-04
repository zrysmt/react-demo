import React from 'react';
// import ReactDOM from 'react-dom';
import {Link} from 'react-router';
class MenuLi extends React.Component{
	render(){
		let linkTo = this.props.name =="Home"?"/":"/"+this.props.name;
		let activeClass = this.props.name =="Home"?"":"active";
		return (
			<li>
				<Link to={linkTo}  activeClassName={activeClass}>
					{this.props.name}
				</Link>
			</li>
		);
	}
}

export default MenuLi;