import Info from '../components/Sidebar/info';
import { connect } from 'react-redux';
import {
	getPeople,
	getPeopleSuccess,
	getPeopleFailure,
	getFiles,
	getFilesSuccess,
	getFilesFailure
} from '../actions/info';

const mapDispatchToProps = (dispatch) => {
	return{
		getPeople: (chatID) => {
			dispatch(getPeople(chatID)).payload.then((res) => {
				console.log("Get People res");
				console.log(res);
				dispatch(getPeopleSuccess(res.data.results));	
			}).catch((err) =>{
				console.log("Error - getPeople: " + JSON.stringify(err));
				dispatch(getPeopleFailure(err));
			});
		},
		getFiles: (chatID) => {
			dispatch(getFiles(chatID)).payload.then((res) => {
				console.log("Get Files res");
				console.log(res);
				dispatch(getFilesSuccess(res.data.results));	
			}).catch((err) =>{
				console.log("Error - getFiles: " + JSON.stringify(err));
				dispatch(getFilesFailure(err));
			});

		}
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		info: state.info,
		sidebar: state.sidebar
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
