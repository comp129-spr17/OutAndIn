import { client } from '../modules/api-client';

// Conversations
export const SIDEBAR_GET_CHATS = "SIDEBAR_GET_CHATS";
export const SIDEBAR_GET_CHATS_SUCCESS = "SIDEBAR_GET_CHATS_SUCCESS";
export const SIDEBAR_GET_CHATS_FAILURE = "SIDEBAR_GET_CHATS_FAILURE";

export const SIDEBAR_SEARCH = "SIDEBAR_SEARCH";
export const SIDEBAR_SEARCH_SUCCESS = "SIDEBAR_SEARCH_SUCCESS";
export const SIDEBAR_SEARCH_FAILURE = "SIDEBAR_SEARCH_FAILURE";

export const SIDEBAR_FOCUS_CHAT = "SIDEBAR_FOCUS_CHAT";

export const getChats = () => {
	return {
		type: SIDEBAR_GET_CHATS,
		payload: client.chatsGetAll()
	};
};

export const getChatsSuccess = (chats) => {
	return {
		type: SIDEBAR_GET_CHATS_SUCCESS,
		payload: chats
	};
};

export const getChatsFailure = (error) => {
	return {
		type: SIDEBAR_GET_CHATS_FAILURE,
		payload: error
	};
};

export const search = (query) => {
	return {
		type: SIDEBAR_SEARCH,
		payload: client.search(query)
	};
};

export const searchSuccess = (results) => {
	return {
		type: SIDEBAR_SEARCH_SUCCESS,
		payload: results
	};
};

export const searchFailure = (error) => {
	return {
		type: SIDEBAR_SEARCH_FAILURE,
		payload: error
	};
};

export const focusChat = (chatID) => {
	return {
		type: SIDEBAR_FOCUS_CHAT,
		payload: chatID
	};
};
