import Sidebar from '../components/Sidebar/main';
import { connect } from 'react-redux';
import {
	getChats,
	getChatsSuccess,
	getChatsFailure,
	focusChat
} from '../actions/sidebar';

const mapDispatchToProps = (dispatch) =>{
	return {
		getChats: () => {
			dispatch(getChats()).then((res) => {
				if(res.data.errors){
					for(var i in res.data.errors){
						console.log("Errors - getChats: " + res.data.errors[i].message);
						dispatch(getChatsFailure(res.data.errors[i]));
					}
					return;
				}
				dispatch(getChatsSuccess(res.data.results));
			}).catch((err) => {
				console.log("Error - getChats: "  + JSON.stringify(err));
				dispatch(getChatsFailure(err));
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
