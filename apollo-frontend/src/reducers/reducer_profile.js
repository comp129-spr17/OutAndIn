import {
	PROFILE_GET_USER,
	PROFILE_GET_USER_SUCCESS,
	PROFILE_GET_USER_FAILURE,
	PROFILE_SET_NAME,
	PROFILE_SET_AVATAR
} from '../actions/profile';


// const INITIAL_STATE = {
// 	user: {
// 		name: '',
// 		avatar: ''
// 	},
// 	loading: false,
// 	error: ''
// };

const INITIAL_STATE = {
    name:'Abc',
    handle:'@abc',
    avatar:'/img/avatar1.jpg',
    phoneNumber:'+1-2345678',
    dob:'12-01-2011',
    address:'Here and There',
    friends:['/img/avatar1.jpg','/img/avatar2.jpg','/img/avatar3.jpg']
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