import Chat from '../components/Chat/index';
import { connect } from 'react-redux';
import {
	getMessages,
	getMessagesSuccess,
	getMessagesFailure,
	inputChange,
	sendMessage,
	sendMessageSuccess,
	sendMessageFailure
} from '../actions/chat';

const mapDispatchToProps = (dispatch) =>{
	return {
		getMessages: (chatID) =>{
			dispatch(getMessages(chatID)).payload.then((res) => {
				if(res.data.errors){
					for(var i in res.data.errors){
						console.log("Error - getMessages: " + res.data.errors[i].message);
						dispatch(getMessagesFailure(res.data.errors[i]));
					}
					return;
				}
				dispatch(getMessagesSuccess(res.data.results));
			}).catch((err) => {
				console.log("Error - getMessages: " + JSON.stringify(err));
				dispatch(getMessagesFailure(res.data.errors[i]));
			});
		},
		inputChange: (text) =>{
			console.log("Input");
			dispatch(inputChange(text));
		},
		sendMessage: (message) =>{
			dispatch(sendMessage(message)).payload.then((res) => {
				if(res.data.errors){
					for(var i in res.data.errors){
						console.log("Error - sendMessage: " + res.data.errors[i].message);
						dispatch(sendMessageFailure(res.data.errors[i]));
					}
					return;
				}
				dispatch(sendMessageSuccess());
			}).catch((err) => {
				console.log("Error - sendMessage: " + JSON.stringify(err));
				dispatch(sendMessageFailure(err));
			});
		}
	};
};

function mapStateToProps(state, ownProps){
	return {
		chat: state.chat,
		sidebar.state.sidebar
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
