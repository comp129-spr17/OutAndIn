import { combineReducers } from 'redux';
import login from './reducer_login';
import register from './reducer_register';
import sidebar from './reducer_sidebar';
import profile from './reducer_profile';
import chat from './reducer_chat';

export default combineReducers({
	login,
	sidebar,
	register,
	profile,
	chat
});
