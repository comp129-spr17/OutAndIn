import { client } from '../modules/api-client';

export const MODAL_SEARCH = "MODAL_SEARCH";
export const MODAL_SEARCH_SUCCESS = "MODAL_SEARCH_SUCCESS";
export const MODAL_SEARCH_FAILURE = "MODAL_SEARCH_FAILURE";

export const MODAL_USER_SELECT = "MODAL_USER_SELECT";

export const MODAL_CHAT_INIT = "MODAL_CHAT_INIT";
export const MODAL_CHAT_INIT_SUCCESS = "MODAL_CHAT_INIT_SUCCESS";
export const MODAL_CHAT_INIT_FAILURE = "MODAL_CHAT_INIT_FAILURE";

export const getSearch = (query) => {
	return {
		type: MODAL_SEARCH,
		payload: client.search(query)
	};
};

export const getSearchSuccess = (results) => {
	return {
		type: MODAL_SEARCH_SUCCESS,
		payload: results.people
	};
};

export const getSearchFailure = (err) =>{
	return {
		type: MODAL_SEARCH_FAILURE,
		payload: err
	};
};

export const userSelect = (userID) =>{
	return {
		type: MODAL_USER_SELECT,
		payload: userID
	};
};

export const chatInit = (users) => {
	return {
		type: MODAL_CHAT_INIT,
		payload: client.chatsInit(users)
	};
};

export const chatInitSuccess = (chatID) =>{
	return {
		type: MODAL_CHAT_INIT_SUCCESS,
		payload: chatID
	};
};

export const chatInitFailure = (err) =>{
	return {
		type: MODAL_CHAT_INIT_FAILURE,
		payload: err
	};
};
