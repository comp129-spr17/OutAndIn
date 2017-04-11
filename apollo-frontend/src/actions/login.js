import { client } from '../modules/api-client';

// Log in user
export const LOGIN_USER= "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

// Set input values
export const LOGIN_SET_CREDENTIALS_USERNAME = "LOGIN_SET_CREDENTIALS_USERNAME";
export const LOGIN_SET_CREDENTIALS_PASSWORD = "LOGIN_SET_CREDENTIALS_PASSWORD";

// Log in actions
export function loginUser(formValues){
	const request = client.sessionLogin(formValues);

	return {
		type: LOGIN_USER,
		payload: request
	}
};

export function loginUserSuccess(user){
	return {
		type: LOGIN_USER_SUCCESS,
		payload: user
	};
};

export function loginUserFailure(error){
	return {
		type: LOGIN_USER_FAILURE,
		payload: error
	};
};

export function loginSetUsername(username){
	return {
		type: LOGIN_SET_CREDENTIALS_USERNAME,
		payload: username
	};
};

export function loginSetPassword(password){
	return {
		type: LOGIN_SET_CREDENTIALS_PASSWORD,
		payload: password
	};
};

