import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,hashHistory,IndexRedirect} from 'react-router';

import './components/global/global.scss';

import Nav from './components/global/menu';
import Home from './components/home/home';
import Story from './components/story/story';


class App extends React.Component{
	render(){
		return(
			<div>	
				<Nav/>
				{this.props.children}
			</div>				
		)
	}
}

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="/Story" component={Story}/>
		</Route>
	</Router>
	),document.body
);

