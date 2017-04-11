import { client } from '../modules/api-client';

// Log in user
export const REGISTER_USER= "REGISTER_USER";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

// Register actions
export function registerUser(formValues){
	const request = client.sessionLogin(formValues);

	return {
		type: REGISTER_USER,
		payload: request
	}
};

export function registerUserSuccess(user){
	return {
		type: REGISTER_USER_SUCCESS,
		payload: user
	};
};

export function registerUserFailure(error){
	return {
		type: REGISTER_USER_FAILURE,
		payload: error
	};
};

export function registerSetUsername(username){
	return {
		type: REGISTER_SET_CREDENTIALS_USERNAME,
		payload: username
	};
};

export function registerSetPassword(password){
	return {
		type: REGISTER_SET_CREDENTIALS_PASSWORD,
		payload: password
	};
};

