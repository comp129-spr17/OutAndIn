import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Chat from './components/Chat';
import Login from './components/Login';
import Home from './components/Home';
import SockTest from './components/SockTest';
import NotFound from './components/NotFound';
import Blank from './components/Layouts/Blank';
import Main from './components/Layouts/Main';


export default (
    <Router history={browserHistory} >
        <Route component={Main} >
            <Route path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/chat" component={Chat} />
            <Route path="/sockTest" component={SockTest} />
        </Route>
        <Route component={Blank} >
            <Route path="/login" component={Login} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
);
