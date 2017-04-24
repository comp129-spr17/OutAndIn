import Modal from "../components/Modals/new-message";
import { connect } from 'react-redux';
import {
	getSearch,
	getSearchSuccess,
	getSearchFailure,
	userSelect,
	chatInit,
	chatInitSuccess,
	chatInitFailure
} from '../actions/modal';


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
			dispatch(chatInit(users)).then((res) => {
				
			}).catch((err) =>{
				
			});
		}
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		modal: state.modal
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
