import React from 'react';
import ReactDOM from 'react-dom';

class RButton extends React.Component{
	handleClick(){
		alert("点击");
	}
	render(){
		return (
			<input type="button" value="click me" onClick={this.handleClick} />
		);
	}
}

ReactDOM.render(
    <RButton/>,
	document.getElementById('example')
);