import {
	//actions
	CHAT_GET_MESSAGES,
	CHAT_GET_MESSAGES_SUCCESS,
	CHAT_GET_MESSAGES_FAILURE,
	CHAT_INPUT_CHANGE,
	CHAT_MESSAGE_SEND,
	CHAT_MESSAGE_SEND_SUCCESS,
	CHAT_MESSAGE_SEND_FAILURE
} from '../actions/chat';

const INITIAL_STATE = {
	inputText: '',
	messages: [],
	isLoading: false,
	needUpdate: false,
	error: {}
};

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case CHAT_GET_MESSAGES:
			return{
				...state,
				isLoading: true
			};
			break;
		case CHAT_GET_MESSAGES_SUCCESS:
			return{
				...state,
				isLoading: false,
				needUpdate: false,
				messages: action.payload
			};
			break;
		case CHAT_GET_MESSAGES_FAILURE:
			return{
				...state,
				isLoading: false,
				error: action.payload
			};
			break;
		case CHAT_INPUT_CHANGE:
			return {
				...state,
				inputText: action.payload
			};
			break;
		case CHAT_MESSAGE_SEND:
			return {
				...state
			};
			break;
		case CHAT_MESSAGE_SEND_SUCCESS:
			return {
				...state,
				needUpdate: true
			};
			break;
		case CHAT_MESSAGE_SEND_FAILURE:
			return {
				...state,
				error: action.payload
			};
			break;
		default:
			return state;
			break;
	}
}
