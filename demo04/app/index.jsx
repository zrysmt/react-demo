import React from 'react';
import ReactDOM from 'react-dom';
import {Router,browserHistory} from 'react-router';

import routes from './routes';
import util from './common/util';

import './component/common/global.scss';

// util.debounceAdapt();
util.adapt(640,100);//自动计算出来媒体查询


ReactDOM.render((
	<Router history={browserHistory} routes={routes}>
	</Router>
	),document.getElementById("react-root")
);

