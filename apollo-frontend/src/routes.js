import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Chat from './components/Chat';
import Login from './components/Login';
import LoginTest from './components/LoginTest';
import Landing from './components/Landing';
import Home from './components/Home';
import SockTest from './components/SockTest';
import NotFound from './components/NotFound';
import Blank from './components/Layouts/blank';
import Main from './components/Layouts/main';
import Profile from './components/Profile';
import ReduxTest from './containers/user';
import Registration from './components/Registration';
import RegistrationTest from './components/RegistrationTest';
import ModalStatic from './components/ModalStatic';

export default (
    <Router history={browserHistory} >
        <Route component={Main} >
            <Route path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/chat" component={Chat} />
            <Route path="/sockTest" component={SockTest} />
            <Route path="/profile" component={Profile} />
        </Route>
        <Route component={Blank} >
            <Route path="/redux" component={ReduxTest} />
			<Route path="/login" component={Login} />
			<Route path="/loginTest" component={LoginTest} />
            <Route path="/landing" component={Landing} />
            <Route path="/register" component={Registration} />
            <Route path="/registerTest" component={RegistrationTest} />
            <Route path="/modalstatic" component={ModalStatic} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
);
