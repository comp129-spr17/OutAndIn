import {
	//actions
	INFO_GET_PEOPLE,
	INFO_GET_PEOPLE_SUCCESS,
	INFO_GET_PEOPLE_FAILURE,
	INFO_GET_FILES,
	INFO_GET_FILES_SUCCESS,
	INFO_GET_FILES_FAILURE
} from '../actions/info';

const INITIAL_STATE = {
	people: [],
	files: []
};

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case INFO_GET_PEOPLE:
			return {
				...state
			};
			break;
		case INFO_GET_PEOPLE_SUCCESS:
			return {
				...state,
				people: action.payload
			};
			break;
		case INFO_GET_PEOPLE_FAILURE:
			return {
				...state,
				err: action.payload
			};
			break;
		case INFO_GET_FILES:
			return {
				...state
			};
			break;
		case INFO_GET_FILES_SUCCESS:
			return {
				...state,
				files: action.payload
			};
			break;
		case INFO_GET_FILES_FAILURE:
			return {
				...state,
				err: err
			};
			break;
		default:
			return state;
			break;
	}
};
