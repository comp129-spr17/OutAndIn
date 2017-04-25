import {
	PROFILE_GET_USER,
	PROFILE_GET_USER_SUCCESS,
	PROFILE_GET_USER_FAILURE,
	PROFILE_SET_NAME,
	PROFILE_SET_AVATAR
} from '../actions/profile';


const INITIAL_STATE = {
	//use this object instead
	user: {
		name: '',
		avatar: '',
		handle: '',
		phoneNunber: '(123)456-7890',
		dob: '7/11/1997',
		address: 'Here and there'
	}	
};

export default function(state = INITIAL_STATE, action){
	let user;
	switch (action.type){
		case PROFILE_GET_USER:
			return {
				...state,
				isLoading: true,
				error: ''
			};
			break;
		case PROFILE_GET_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: ''
			};
			break;
		case PROFILE_GET_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload
			};
			break;
		case PROFILE_SET_NAME:
			user = state.user;
			user.name = action.payload;
			return {
				...state,
				user
			};
			break;
		case PROFILE_SET_AVATAR:
			user = state.user;
			user.avatar = action.payload;
			return {
				...state,
				user
			};
			break;
		default:
			return state;
			break;
	}	
	return state;
};
