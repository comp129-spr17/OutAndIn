import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			credentials: {
				username: '',
				password: ''
			},
			inputErrors: {
				username: "",
				password: ""
			}
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}


	componentWillMount(){
		console.log("yo");	
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.login.isAuthenticated){
			this.context.router.push("/");
		}
	}

	handleUsernameChange(event){
		this.props.setUsername(event.target.value);
	}

	handlePasswordChange(event){
		this.props.setPassword(event.target.value);
	}

	handleLogin(event){  
		event.preventDefault();
		this.props.loginUser(this.props.login.credentials);
	}

	render() {
        return (
 			<div className="login">
                <div className="login-overlay"></div>
                <div className="login-container">
                    <div className="login-form-container">
                        <div className="login-form">
                                            <div className="login-brand-container">
                        <div className="login-logo">
                             <img src="/img/logo.png"/>
                        </div>
                        <div className="login-logo-name">
                            <span>Apollo</span>
                        </div>
                    </div>            
                            <div className="login-actions-container">
								<div className="login-actions">
									<div style={{paddingTop: "15px"}} >{this.props.login.error}</div>
                                    <form className='loginForm'>
                                        <p>Username</p>
                                        <input autoFocus type="text" value={this.props.login.credentials.username} onChange={this.handleUsernameChange} autoComplete="off"/>
                                        <p>Password</p>
                                        <input type="password" value={this.props.login.credentials.password} onChange={this.handlePasswordChange} autoComplete="off"/>
                                        <hr></hr>
                                        <button onClick={this.handleLogin}>Login</button>
                                    </form>
                                </div>
                            </div>
                            <div className="login-footer">
                                Apollo © 2017
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired
};

Login.contextTypes = {
	router: PropTypes.object
};

export default Login;
