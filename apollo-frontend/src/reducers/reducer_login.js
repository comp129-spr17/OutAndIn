import {
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_SET_CREDENTIALS_USERNAME,
	LOGIN_SET_CREDENTIALS_PASSWORD
} from '../actions/login';

const INITIAL_STATE = {
	credentials: {
		username: '',
		password: ''
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
		// Logging in the user
		case LOGIN_USER:
			return {
				...state,
				isAuthenticated: false,
				error: '',
				loading: true
			};
		// Return the authenticated user
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				error: '',
				loading: false
			};
		// Return the login error messages
		case LOGIN_USER_FAILURE:
			return {
				...state,
				isAuthenticated: false,
				error: action.payload,
				loading: false
			};
		case LOGIN_SET_CREDENTIALS_USERNAME:
			credentials = state.credentials;
			credentials.username = action.payload;
			return {
				...state,
				credentials,
				isAuthenticated: false,
				error: '',
				loading: false
			};
		case LOGIN_SET_CREDENTIALS_PASSWORD:
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

