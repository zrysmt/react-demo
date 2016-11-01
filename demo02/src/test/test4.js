/**
 * this.state
 */
import React from 'react';
import ReactDOM from 'react-dom';

class LikeButton  extends React.Component{
	/*getInitialState(){
		return {liked:false};
	}*/
	constructor(props){
		super(props);

		this.state = {
			liked:false
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		this.setState({liked:!this.state.liked});
	}
	render(){
		var text = this.state.liked ? 'like' : 'haven\'t liked';
    	return (
    	  <p onClick={this.handleClick}>
    	    You {text} this. Click to toggle.
    	  </p>
    	);
	}
}

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);