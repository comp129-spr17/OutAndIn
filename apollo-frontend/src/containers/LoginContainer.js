import Login from '../components/Login/index';
import { connect } from 'react-redux';
import { loginUser, loginUserSuccess, loginUserFailure, loginSetUsername, loginSetPassword } from '../actions/login';

const mapDispatchToProps = (dispatch) => {
	return {
		loginUser: (formValues) => {
			let res = dispatch(loginUser(formValues))
			res.payload.then((results) => {
				dispatch(loginUserSuccess(results.data));
				localStorage.setItem("token", results.data["results"][0]["token"]);
			}).catch((err) => {
				dispatch(loginUserFailure(err.response.data.errors[0]["message"]));
			});
		},
		setUsername: (value) => {
			dispatch(loginSetUsername(value))
		},
		setPassword: (value) => {
			dispatch(loginSetPassword(value))
		}
	};
};

function mapStateToProps(state, ownProps){
	return {
		login: state.login
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
