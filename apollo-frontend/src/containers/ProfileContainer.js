import Profile from '../components/Profile/index';
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps){
	return {
		profile: state.profile
	};
}

export default connect(mapStateToProps, null)(Profile);