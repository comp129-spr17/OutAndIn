import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import Chat from './components/Chat';
import Home from './components/Home';
import NotFound from './components/NotFound';

const Routes = (props) => (
  	<Router {...props}>
		<Route path="/" component={App} />
		<Route path="/home" component={Home} />
		<Route path="/chat" component={Chat} /> 
		<Route path="*" component={NotFound} />
   	</Router>
);

export default Routes;
