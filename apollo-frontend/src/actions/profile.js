import { client } from '../modules/api-client';

//actions
export const PROFILE_GET_USER = "PROFILE_GET_USER";
export const PROFILE_GET_USER_SUCCESS = "PROFILE_GET_USER_SUCCESS";
export const PROFILE_GET_USER_FAILURE = "PROFILE_GET_USER_FAILURE";

export const PROFILE_SET_NAME = "PROFILE_SET_NAME";
export const PROFILE_SET_AVATAR = "PROFILE_SET_AVATAR";

export function getProfile(userID){
	return {
		type: PROFILE_GET_USER,
		payload: client.userGetProfile(userID)
	};
};

export function getProfileSuccess(user){
	return {
		type: PROFILE_GET_USER_SUCCESS,
		payload: user
	};
};

export function getProfileFailure(error){
	return {
		type: PROFILE_GET_USER_FAILURE,
		payload: error
	};
};

export function setProfileName(name){
	return {
		type: PROFILE_SET_NAME,
		payload: name
	};
};

export function setProfileAvatar(avatar){
	return {
		type: PROFILE_SET_AVATAR,
		payload: avatar
	};
};

