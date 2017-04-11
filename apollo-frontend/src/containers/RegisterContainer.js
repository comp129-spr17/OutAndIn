import Register from '../components/Register/index';
import { connect } from 'react-redux';
import { registerUser, registerUserSuccess, registerUserFailure, registerSetEmail, registerSetFullname, registerSetUsername, registerSetPassword } from '../actions/register';

const mapDispatchToProps = (dispatch) => {
	return {
		registerUser: (formValues) => {
			let res = dispatch(registerUser(formValues))
			res.payload.then((results) => {
				dispatch(registerUserSuccess(results.data));
				localStorage.setItem("token", results.data["results"][0]["token"]);
			}).catch((err) => {
				dispatch(registerUserFailure("ERROR"));
			});
		},
		setUsername: (value) => {
			dispatch(registerSetUsername(value))
		},
		setPassword: (value) => {
			dispatch(registerSetPassword(value))
		},
		setEmail: (value) => {
			dispatch(registerSetEmail(value))	
		},
		setFullname: (value) => {
			dispatch(registerSetFullname(value))
		}
	};
};

function mapStateToProps(state, ownProps){
	return {
		register: state.register
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
