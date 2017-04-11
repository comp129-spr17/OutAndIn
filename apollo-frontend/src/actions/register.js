import { client } from '../modules/api-client';

// Log in user
export const REGISTER_USER= "REGISTER_USER";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const REGISTER_USER_SET_CREDENTIALS_EMAIL = "REGISTER_USER_SET_CREDENTIALS_EMAIL";
export const REGISTER_USER_SET_CREDENTIALS_FULLNAME = "REGISTER_USER_SET_CREDENTIALS_FULLNAME";
export const REGISTER_USER_SET_CREDENTIALS_USERNAME = "REGISTER_USER_SET_CREDENTIALS_USERNAME";
export const REGISTER_USER_SET_CREDENTIALS_PASSWORD = "REGISTER_USER_SET_CREDENTIALS_PASSWORD";

// Register actions
export function registerUser(formValues){
	const request = client.sessionRegister(formValues);

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
export function registerSetEmail(email){
	return {
		type: REGISTER_USER_SET_CREDENTIALS_EMAIL,
		payload: email
	};
};

export function registerSetFullname(fullname){
	return {
		type: REGISTER_USER_SET_CREDENTIALS_FULLNAME,
		payload: fullname
	};
};

export function registerSetUsername(username){
	return {
		type: REGISTER_USER_SET_CREDENTIALS_USERNAME,
		payload: username
	};
};

export function registerSetPassword(password){
	return {
		type: REGISTER_USER_SET_CREDENTIALS_PASSWORD,
		payload: password
	};
};

