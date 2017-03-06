import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Chat from './components/Chat';
import Home from './components/Home';
import SockTest from './components/SockTest'
import NotFound from './components/NotFound';

export default (
    <Route path="/" component={App} >
    	<IndexRoute component={Home} />
			<Route path="/home" component={Home} />
			<Route path="/chat" component={Chat} />
			<Route path="/sockTest" component={SockTest} />
    	<Route path="*" component={NotFound} />
    </Route>
);
