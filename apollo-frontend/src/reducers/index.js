import { combineReducers } from 'redux';
import login from './reducer_login';
import sidebar from './reducer_sidebar';

export default combineReducers({
	login,
	sidebar
});
