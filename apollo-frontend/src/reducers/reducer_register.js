import {
	REGISTER_USER,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SET_CREDENTIALS_EMAIL,
	REGISTER_USER_SET_CREDENTIALS_FULLNAME,
	REGISTER_USER_SET_CREDENTIALS_USERNAME, 
	REGISTER_USER_SET_CREDENTIALS_PASSWORD 
} from '../actions/register';

const INITIAL_STATE = {
	credentials: {
		username: '',
		password: '',
		email: '',
		fullname: ''
	},
	inputErrors: {
		username: '',
		password: ''
	},
	isAuthenticated: false,
	error: '',
	loading: false
};

export default function(state = INITIAL_STATE, action){
	let credentials;
	switch(action.type){
		// Registering the user
		case REGISTER_USER:
			return {
				...state,
				isAuthenticated: false,
				error: '',
				loading: true
			};
		// Return the authenticated user
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				error: '',
				loading: false
			};
		// Return the login error messages
		case REGISTER_USER_FAILURE:
			return {
				...state,
				isAuthenticated: false,
				error: action.payload,
				loading: false
			};
		case REGISTER_USER_SET_CREDENTIALS_EMAIL:
			credentials = state.credentials;
			credentials.email = action.payload;
			return {
				...state,
				credentials,
				isAuthenticated: false,
				error: '',
				loading: false
			};
		case REGISTER_USER_SET_CREDENTIALS_FULLNAME:
			credentials = state.credentials;
			credentials.fullname = action.payload;
			return {
				...state,
				credentials,
				isAuthenticated: false,
				error: '',
				loading: false
			};
		case REGISTER_USER_SET_CREDENTIALS_USERNAME:
			credentials = state.credentials;
			credentials.username = action.payload;
			return {
				...state,
				credentials,
				isAuthenticated: false,
				error: '',
				loading: false
			};
		case REGISTER_USER_SET_CREDENTIALS_PASSWORD:
			credentials = state.credentials;
			credentials.password = action.payload;
			return {
				...state,
				credentials,
				isAuthenticated: false,
				error: '',
				loading: false
			};
		default:
			return state;
	}
};

