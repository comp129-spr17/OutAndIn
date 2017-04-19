import Sidebar from '../components/Sidebar/main';
import { connect } from 'react-redux';
import {
	getChats,
	getChatsSuccess,
	getChatsFailure,
	search,
	searchSuccess,
	searchFailure,
	focusChat
} from '../actions/sidebar';

const mapDispatchToProps = (dispatch) =>{
	return {
		getChats: () => {
			dispatch(getChats()).payload.then((res) => {
				if(res.data.errors){
					for(var i in res.data.errors){
						console.log("Errors - getChats: " + res.data.errors[i].message);
						dispatch(getChatsFailure(res.data.errors[i]));
					}
					return;
				}
				console.log("Set chats");
				console.log(res);
				dispatch(getChatsSuccess(res.data.results));
			}).catch((err) => {
				console.log("Error - getChats: "  + JSON.stringify(err));
				dispatch(getChatsFailure(err));
			});
		},
		search: (query) => {
			dispatch(search(query)).payload.then((res) => {
				if(res.data.errors){
					for(var i in res.data.errors){
						console.log("Error - search: " + res.data.errors[i].message);
						dispatch(searchFailure(res.data.errors[i]));
					}
					return;
				}
				dispatch(searchSuccess(res.data.results[0]));
			}).catch((err) => {
				console.log("Errors - search: " + JSON.stringify(err));
				dispatch(searchFailure(err));
			});
		},
		focusChat: (chatID) =>{
			dispatch(focusChat(chatID));
		}
	};
};

const mapStateToProps = (state, ownProps) =>{
	
	return {
		sidebar: state.sidebar
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
