import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Chat from './components/Chat';
import Login from './components/Login';
import Landing from './components/Landing';
import Home from './components/Home';
import SockTest from './components/SockTest';
import NotFound from './components/NotFound';
import Blank from './components/Layouts/blank';
import Main from './components/Layouts/main';
import Profile from './components/Profile';
import UserSearch from './components/UserSearch';
import ReduxTest from './containers/user';
import Registration from '.components/Registration';

 

export default (
    <Router history={browserHistory} >
        <Route component={Main} >
            <Route path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/chat" component={Chat} />
            <Route path="/sockTest" component={SockTest} />
            <Route path="/profile" component={Profile} />
            <Route path="/usersearch" component={UserSearch} />
        </Route>
        <Route component={Blank} >
            <Route path="/redux" component={ReduxTest} />
            <Route path="/login" component={Login} />
            <Route path="/landing" component={Landing} />
            <Route path="/registration" component={Registration} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
);
