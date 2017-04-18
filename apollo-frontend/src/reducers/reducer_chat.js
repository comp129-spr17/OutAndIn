import {
	//actions
	CHAT_GET_MESSAGES
} from '../actions/chat';

const INITIAL_STATE = {
	
};

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		
		default:
			console.log('Error - invalid action: ' + action.type);
			return state;
			break;
	}
}
