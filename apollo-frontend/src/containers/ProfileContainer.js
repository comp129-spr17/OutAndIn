import Profile from '../components/Profile/index';
import { connect } from 'react-redux';
import {
	getProfile,
	getProfileSuccess,
	getProfileFailure,
	setProfileName,
	setProfileAvatar
} from '../actions/profile';

const mapDispatchToProps = (dispatch) => {
	return {
		getProfile: (userID) =>{
			dispatch(getProfile(userID)).payload.then((res) => {
				if(res.data.errors){
					for(var i in res.data.errors){
						console.log("Error - getProfile: " + res.data.errors[i].message);
						dispatch(getProfileFailure(res.data.errors[i]));
					}
					return;
				}
				dispatch(getProfileSuccess());

				//set user details
				dispatch(setProfileName(res.data.results[0].fullname));
				dispatch(setProfileAvatar(res.data.results[0].avatar));
			}).catch((err) => {
				console.log("Error - getProfile: " + JSON.stringify(err));
				dispatch(getProfileFailure(err));
			});
		}
	};
};

function mapStateToProps(state, ownProps){
	return {
		profile: state.profile
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
