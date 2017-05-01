import {
	MODAL_SEARCH,
	MODAL_SEARCH_SUCCESS,
	MODAL_SEARCH_FAILURE,
	MODAL_USER_SELECT,
	MODAL_CHAT_INIT,
	MODAL_CHAT_INIT_SUCCESS,
	MODAL_CHAT_INIT_FAILURE,
	MODAL_ADD_PEOPLE,
	MODAL_ADD_PEOPLE_SUCCESS,
	MODAL_ADD_PEOPLE_FAILURE
} from '../actions/modal';

const INITIAL_STATE = {
	users: [],
	selectedUsers: [],
	err: {}
};

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case MODAL_SEARCH:
			return {
				...state,
				users: []
			};
			break;
		case MODAL_SEARCH_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				users: action.payload
			};
			break;
		case MODAL_SEARCH_FAILURE:
			return {
				...state,
				err: action.payload
			};
			break;
		case MODAL_USER_SELECT:
			let selected = state.selectedUsers;
			selected.push(action.payload);
			return {
				...state,
				selectedUsers: selected
			};
			break;
		case MODAL_CHAT_INIT:
			return {
				...state,
				users: [],
				selectedUsers: []
			};
			break;
		case MODAL_CHAT_INIT_SUCCESS:
			return {
				...state
			};
			break;
		case MODAL_CHAT_INIT_FAILURE:
			return {
				...state
			};
			break;
		case MODAL_ADD_PEOPLE:
			return {
				...state
			}
			break;
		case MODAL_ADD_PEOPLE_SUCCESS:
			return {
				...state
			}
			break;
		case MODAL_ADD_PEOPLE_FAILURE:
			return {
				...state,
				err:action.payload
			}
			break;
		default:
			return state;
			break;
	}
};
