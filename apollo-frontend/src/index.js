import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import router from './routes';
const store = configureStore();

render(
    <Provider store={store} >
        { router } 
    </Provider>,
    document.getElementById('apollo')
);
