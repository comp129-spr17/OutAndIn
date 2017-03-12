import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import router from './routes';

render(
    router,
    document.getElementById('apollo')
);
