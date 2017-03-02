import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './pages/Home';
import Chat from './components/Chat';
import NotFound from './components/NotFound';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={Home} />
		<Route path="/chat" component={Chat} /> 
        <Route path="*" component={NotFound} />
    </Route>
);
