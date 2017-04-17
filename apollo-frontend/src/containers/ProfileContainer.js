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
				//TODO
				//ERROR checking	
				//SET PROFILE
				if(res.data.errors){
					for(var i in res.data.errors){
						console.log("ERROR - getProfile: " + res.data.errors[0].message);
					}
					return;
				}
				dispatch(setProfileName(res.data.results[0].fullname));
				dispatch(setProfileAvatar(res.data.results[0].avatar));
			}).catch((err) => {
				console.log("ERROR - getProfile: " + err);
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
