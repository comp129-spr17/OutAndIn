import { client } from '../modules/api-client';

// Conversations
export const GET_CHATS = "GET_CHATS";
export const GET_CHATS_SUCCESS = "GET_CHATS_SUCCESS";
export const GET_CHATS_FAILURE = "GET_CHATS_FAILURE";

export const SIDEBAR_FOCUS_CHAT = "SIDEBAR_FOCUS_CHAT";

export const getChats = () => {
	return {
		type: GET_CHATS,
		payload: client.chatsGetAll()
	};
};


export const getChatsSuccess = (conversations) => {
	return {
		type: GET_CHATS_SUCCESS,
		payload: conversations
	};
};

export const getChatsFailure = (error) => {
	return {
		type: GET_CHATS_FAILURE,
		payload: error
	};
};

export const focusChat = (chatID) => {
	return {
		type: SIDEBAR_FOCUS_CHAT,
		payload: chatID
	};
};
