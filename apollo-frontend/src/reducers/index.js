import { combineReducers } from 'redux';
import login from './reducer_login';
import register from './reducer_register';
import sidebar from './reducer_sidebar';

export default combineReducers({
	login,
	sidebar,
	register,
});
