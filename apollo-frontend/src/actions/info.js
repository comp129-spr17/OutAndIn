import { client } from '../modules/api-client';

//actions
export const INFO_GET_PEOPLE = "INFO_GET_PEOPLE";
export const INFO_GET_PEOPLE_SUCCESS = "INFO_GET_PEOPLE_SUCCESS";
export const INFO_GET_PEOPLE_FAILURE = "INFO_GET_PEOPLE_FAILURE";

export const INFO_GET_FILES = "INFO_GET_FILES";
export const INFO_GET_FILES_SUCCESS = "INFO_GET_FILES_SUCCESS";
export const INFO_GET_FILES_FAILURE = "INFO_GET_FILES_FAILURE";

export const getPeople = (chatID) =>{
	return {
		type: INFO_GET_PEOPLE,
		payload: client.chatGetPeople(chatID)
	};
};

export const getPeopleSuccess = (people) => {
	return {
		type: INFO_GET_PEOPLE_SUCCESS,
		payload: people
	};
};

export const getPeopleFailure = (err) =>{
	return {
		type: INFO_GET_PEOPLE_FAILURE,
		payload: err 
	};
};

export const getFiles = (chatID) =>{
	return {
		type: INFO_GET_FILES,
		payload: client.chatGetFiles(chatID)
	};
};

export const getFilesSuccess = (files) =>{
	return {
		type: INFO_GET_FILES_SUCCESS,
		payload: files
	};
};

export const getFilesFailure = (err) =>{
	return {
		type: INFO_GET_FILES_FAILURE,
		payload: err
	};
};


