import {
	GET_CHATS,
	GET_CHATS_SUCCESS,
	GET_CHATS_FAILURE,
	SIDEBAR_FOCUS_CHAT
} from '../actions/sidebar';

const INITIAL_STATE = {
	conversationsList: {
		conversations: [],
		error: null,
		loading: false
	},
	chatFocused: ''
};

export default function(state=INITIAL_STATE, action){
	let error;
	switch(action.type){
		// Begin to get conversations for the user and set loading to true
		case GET_CHATS:
			return {
				...state,
				conversationsList: { 
					conversations: [], 
					error: null, 
					loading: true
				} 
			};
		case GET_CHATS_SUCCESS:
			return {
				...state,
				conversationsList: {
					conversations: action.payload,
					error: null,
					loading: false
				}
			};
		case GET_CHATS_FAILURE:
			error = action.payload || { message: action.payload.message };
			return {
				...state,
				conversationsList: {
					conversations: [],
					error: error,
					loading: false
				}
			}
		case SIDEBAR_FOCUS_CHAT:
			return {
				...state,
				chatFocused: action.payload
			};
		default:
			return state;
	}
}
