import { client } from '../modules/api-client';

//actions
export const CHAT_GET_MESSAGES = "CHAT_GET_MESSAGES";
export const CHAT_GET_MESSAGES_SUCCESS = "CHAT_GET_MESSAGES_SUCCESS";
export const CHAT_GET_MESSAGES_FAILURE = "CHAT_GET_MESSAGES_FAILURE";

export const CHAT_INPUT_CHANGE = "CHAT_INPUT_CHANGE";

export const CHAT_MESSAGE_SEND = "CHAT_MESSAGE_SEND";
export const CHAT_MESSAGE_SEND_SUCCESS = "CHAT_MESSAGE_SEND_SUCCESS";
export const CHAT_MESSAGE_SEND_FAILURE = "CHAT_MESSAGE_SEND_FAILURE";

export function getMessages(chatID){
	return {
		type: CHAT_GET_MESSAGES,
		payload: client.chatGetMessage(chatID)
	};
};

export function getMessagesSuccess(messages){
	return {
		type: CHAT_GET_MESSAGES_SUCCESS,
		payload: messages
	};
};

export function getMessagesFailure(error){
	return {
		type: CHAT_GET_MESSAGES_FAILURE,
		payload: error
	};
};

export function inputChange(value){
	return {
		type: CHAT_INPUT_CHANGE,
		payload: value
	};
};

export function sendMessage(chatID, message){
	return {
		type: CHAT_MESSAGE_SEND,
		payload: client.chatAddMessage(chatID, message)
	};
};

export function sendMessageSuccess(value){
	return {
		type: CHAT_MESSAGE_SEND_SUCCESS,
		payload: value
	}
};

export function sendMessageFailure(error){
	return {
		type: CHAT_MESSAGE_SEND_FAILURE,
		payload: error
	};
};
