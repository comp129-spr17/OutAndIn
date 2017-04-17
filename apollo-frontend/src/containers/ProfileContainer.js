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
			let res = dispatch(getProfile(userID));
			res.payload.then((user) => {
				//TODO
				//ERROR checking	
				//SET PROFILE
			}).catch((err) => {
				
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
