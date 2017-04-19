import {
	SIDEBAR_GET_CHATS,
	SIDEBAR_GET_CHATS_SUCCESS,
	SIDEBAR_GET_CHATS_FAILURE,
	SIDEBAR_SEARCH,
	SIDEBAR_SEARCH_SUCCESS,
	SIDEBAR_SEARCH_FAILURE,
	SIDEBAR_FOCUS_CHAT
} from '../actions/sidebar';

const INITIAL_STATE = {
	chats: [],
	friends: [],
	people: [],
	files: [],
	searching: false,
	chatFocused: '',
	isLoading: false,
	error: ''
};

export default function(state=INITIAL_STATE, action){
	let error;
	console.log(action);
	switch(action.type){
		// Begin to get conversations for the user and set loading to true
		case SIDEBAR_GET_CHATS:
			return {
				...state,
				chats: [],
				friends: [],
				people: [],
				files: [],
				isLoading: true,
				searching: false
			};
		case SIDEBAR_GET_CHATS_SUCCESS:
			console.log("ACT");
			console.log(action);
			return {
				...state,
				chats: action.payload,
				isLoading: false,
				searching: false
			};
		case SIDEBAR_GET_CHATS_FAILURE:
			error = action.payload || { message: action.payload.message };
			return {
				...state,
				isLoading: false,
				searching: false,
				error: action.payload
			}
		case SIDEBAR_SEARCH: 
			return {
				...state,
				chats: [],
				friends: [],
				people: [],
				files: [],
				isLoading: true,
				searching: true
			};
		case SIDEBAR_SEARCH_SUCCESS:
			return {
				...state,
				friends: action.payload.friends,
				people: action.payload.people,
				files: action.payload.files,
				isLoading: false
			};
		case SIDEBAR_SEARCH_FAILURE:
			return {
				...state,
				error: action.payload,
				isLoading: false
			};
		case SIDEBAR_FOCUS_CHAT:
			return {
				...state,
				chatFocused: action.payload
			};
		default:
			return state;
	}
};
