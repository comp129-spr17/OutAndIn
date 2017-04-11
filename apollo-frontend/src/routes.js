import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Pages
import App from './pages/App';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Higher order component to protect privileged pages
import AuthRequired from './utils/AuthRequired'; 

// Router and the routes that utilize their respective components
export default (
    <Router history={browserHistory} >
        <Route component={App} >
        	<Route component={AuthRequired(Layout)} >
            	<Route path="/" component={Home} />
			</Route>
			<Route path="/login" component={Login} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
);
