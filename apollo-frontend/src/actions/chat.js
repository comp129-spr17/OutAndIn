import { client } from '../modules/api-client';

//actions
const CHAT_GET_MESSAGES = "CHAT_GET_MESSAGES";
const CHAT_GET_MESSAGES_SUCCESS = "CHAT_GET_MESSAGES_SUCCESS";
const CHAT_GET_MESSAGES_FAILURE = "CHAT_GET_MESSAGES_FAILURE";

const CHAT_INPUT_CHANGE = "CHAT_INPUT_CHANGE";

const CHAT_MESSAGE_SEND = "CHAT_MESSAGE_SEND";
const CHAT_MESSAGE_SEND_SUCCESS = "CHAT_MESSAGE_SEND_SUCCESS";
const CHAT_MESSAGE_SEND_FAILURE = "CHAT_MESSAGE_SEND_FAILURE";

export function getMessages(chatID){
	return {
		type: CHAT_GET_MESSAGES,
		payload: client.chatsGetMessage(chatID)
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

export function sendMessage(message){
	return {
		type: CHAT_MESSAGE_SEND,
		payload: message
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
		paylaod: error
	};
};
