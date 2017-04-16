import {
	PROFILE_GET_USER,
	PROFILE_GET_USER_SUCCESS,
	PROFILE_GET_USER_FAILURE,
	PROFILE_SET_NAME,
	PROFILE_SET_AVATAR
} from '../actions/profile';


const INITIAL_STATE = {
	user: {
		name: '',
		avatar: ''
	},
	loading: false,
	error: ''
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
			user.name = action.payload.name;
			return {
				...state,
				user
			};
			break;
		case PROFILE_SET_AVATAR:
			user.avatar = actionpayload.avatar;
			return {
				...state,
				user
			};
			break;

	}	
	return state;
};

