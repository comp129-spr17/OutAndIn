import {
	FETCH_CONVERSATIONS,
	FETCH_CONVERSATIONS_SUCCESS,
	FETCH_CONVERSATIONS_FAILURE
} from '../actions/sidebar';

const INITIAL_STATE = {
	conversationsList: {
		conversations: [],
		error: null,
		loading: false
	}
};

export default function(state=INITIAL_STATE, action){
	let error;
	switch(action.type){
		// Begin to get conversations for the user and set loading to true
		case FETCH_CONVERSATIONS:
			return {
				...state,
				conversationsList: { 
					conversations: [], 
					error: null, 
					loading: true
				} 
			};
		case FETCH_CONVERSATIONS_SUCCESS:
			return {
				...state,
				conversationsList: {
					conversations: action.payload,
					error: null,
					loading: false
				}
			};
		case FETCH_CONVERSATIONS_FAILURE:
			error = action.payload || { message: action.payload.message };
			return {
				...state,
				conversationsList: {
					conversations: [],
					error: error,
					loading: false
				}
			}
		default:
			return state;
	}
}
