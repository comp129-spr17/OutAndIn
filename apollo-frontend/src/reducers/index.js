import { combineReducers } from 'redux';
import login from './reducer_login';
import register from './reducer_register';
import sidebar from './reducer_sidebar';
import profile from './reducer_profile';
import chat from './reducer_chat';
import modal from './reducer_modal';
import info from './reducer_info';

export default combineReducers({
	login,
	sidebar,
	register,
	profile,
	chat,
	modal,
	info
});
