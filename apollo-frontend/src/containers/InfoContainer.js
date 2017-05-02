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
