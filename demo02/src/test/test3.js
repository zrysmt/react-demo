/**
 * 与真实的DOM交互
 * ref的使用
 */
import React from 'react';
import ReactDOM from 'react-dom';

class MyInput extends React.Component{
	constructor(props){
		super(props);
		console.log(this);
		
		this.handleClick = this.handleClick.bind(this);
		//or <input type="button" value="Focus" onClick={this.handleClick.bind(this)}/>
	}
	handleClick(){
		console.log(this);
		this.refs.myTextInput.focus();
	}

	render(){
		return (
			<div>
				<input type="text" ref="myTextInput"/>
				<input type="button" value="Focus" onClick={this.handleClick}/>
			</div>
		);
	}
}

ReactDOM.render(
	<MyInput/>,
	document.getElementById('example')
);