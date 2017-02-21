import React from 'react';
import {Route,IndexRoute} from 'react-router';

import Home from './page/home/home';
import Indview from './page/indview/indview';
import Makemap from './page/makemap/makemap';
import Mapmod from './page/mapmod/mapmod';

class App extends React.Component{
	render(){
		return(
			<div id="react-page">	
				{this.props.children}
			</div>				
		)
	}
}

let routes = (
	<Route  path="/" component={App}>
		<IndexRoute component={Home}/>
		<Route path="/indview" component={Indview}/>
		<Route path="/makemap" component={Makemap}/>
		<Route path="/mapmod" component={Mapmod}/>
	</Route>
);

export default routes;