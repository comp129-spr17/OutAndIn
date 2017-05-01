import Modal from "../components/Modals/new-message";
import { connect } from 'react-redux';
import {
	getSearch,
	getSearchSuccess,
	getSearchFailure,
	userSelect,
	chatInit,
	chatInitSuccess,
	chatInitFailure,
	peopleAdd,
	peopleAddSuccess,
	peopleAddFailure
} from '../actions/modal';
import {
	focusChat
} from '../actions/sidebar';

const mapDispatchToProps = (dispatch) => {
	return {
		getSearch: (query) =>{
			dispatch(getSearch(query)).payload.then((res) =>{
				if(res.data.errors){
					for(var i in res.data.errors){
						console.log("Errors - getSearch: " + res.data.errors[i].message);
						dispatch(getSearchFailure(res.data.errors[i]));
					}
					return;
				}
				dispatch(getSearchSuccess(res.data.results[0]));
			}).catch((err) => {
				console.log("Error - getSearch: " + JSON.stringify(err));
				dispatch(getSearchFailure(err));
			});
		},
		userSelect: (userID) => {
			dispatch(userSelect(userID));
		},
		chatInit:(users) =>{
			dispatch(chatInit(users)).payload.then((res) => {
				if(res.data.errors){
					for(var i in res.data.errors){
						console.log("Errors - chatInit: " + res.data.errors[i].message);
						dispatch(chatInitFailure(res.data.errors[i]));
					}
					return;
				}
				
				console.log("RES");
				console.log(res);
				dispatch(chatInitSuccess(res.data.results[0].chatID));
				dispatch(focusChat(res.data.results[0].chatID));
			}).catch((err) =>{
				console.log("Error - chatInit: " + JSON.stringify(err));
				dispatch(chatInitFailure(err));
			});
		},
		addPeople: (chat, users) => {
			dispatch(peopleAdd(chat, users)).payload.then((res)=> {
				dispatch(peopleAddSuccess(res.data.results));
			}).catch((err) => {
				console.log("Error - addPeople: " + JSON.stringify(err));
				dispatch(peopleAddFailure(err));
			});
		}
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		modal: state.modal,
		sidebar: state.sidebar
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
