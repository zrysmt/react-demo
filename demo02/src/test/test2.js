/**
 * 默认的属性
 * defaultProps
 */
import React from 'react';
import ReactDOM from 'react-dom';

class MyTitle extends React.Component{
	propTypes:{
		title:React.PropTypes.string.isRequired,
	}  


	/*getDefaultProps(){
		return {
			title:"默认的标题"
		};
	}*///React.createClass使用

	static get defaultProps() {
		return {
			title:"默认的标题"
		};
	}
	render(){
		return <h1> {this.props.title} </h1>;
	}
}

// var data = 123;

ReactDOM.render(
	<MyTitle />,
	document.getElementById("title")
)