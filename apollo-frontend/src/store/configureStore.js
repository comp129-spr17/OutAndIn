import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import reducers from '../reducers';
import promise from 'redux-promise-middleware';

export default function configureStore(){
    return createStore(
        reducers,
        {},
        applyMiddleware(logger, thunk, promise())
    );
}
