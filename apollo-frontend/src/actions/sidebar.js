import { client } from '../modules/api-client';

// Conversations
export const FETCH_CONVERSATIONS = "FETCH_CONVERSATIONS";
export const FETCH_CONVERSATIONS_SUCCESS = "FETCH_CONVERSATIONS_SUCCESS";
export const FETCH_CONVERSATIONS_FAILURE = "FETCH_CONVERSATIONS_FAILURE";

export const fetchConversations = () => {
	return {
		type: FETCH_CONVERSATIONS,
		payload: client.chatsGetAll()
	};
};


export const fetchConversationsSuccess = (conversations) => {
	return {
		type: FETCH_CONVERSATIONS_SUCCESS,
		payload: conversations
	};
};

export const fetchConversationsFailure = (error) => {
	return {
		type: FETCH_CONVERSATIONS_FAILURE,
		payload: error
	};
};
