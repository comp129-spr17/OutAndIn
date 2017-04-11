import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Register extends React.Component {
	constructor() {
		super();
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleFullnameChange = this.handleFullnameChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}


	componentWillMount(){
		console.log("yo");	
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.register.isAuthenticated){
			this.context.router.push("/");
		}
	}

	handleEmailChange(event){
		this.props.setEmail(event.target.value);
	}

	handleFullnameChange(event){
		this.props.setFullname(event.target.value);
	}

	handleUsernameChange(event){
		this.props.setUsername(event.target.value);
	}
	
	handlePasswordChange(event){
		this.props.setPassword(event.target.value);
	}

	handleRegister(event){  
		event.preventDefault();
		this.props.registerUser(this.props.register.credentials);
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
									<div>{this.props.register.error}</div>
                                    <form className='loginForm'>
                                        <p>Email</p>
                                        <input autoFocus type="text" value={this.props.register.credentials.email} onChange={this.handleEmailChange} autoComplete="off"/>
                                        <p>Full Name</p>
                                        <input autoFocus type="text" value={this.props.register.credentials.fullname} onChange={this.handleFullnameChange} autoComplete="off"/>
                                        <p>Username</p>
                                        <input autoFocus type="text" value={this.props.register.credentials.username} onChange={this.handleUsernameChange} autoComplete="off"/>
                                        <p>Password</p>
                                        <input type="password" value={this.props.register.credentials.password} onChange={this.handlePasswordChange} autoComplete="off"/>
                                        <hr></hr>
                                        <button onClick={this.handleRegister}>Register</button>
                                    </form>
                                    <div className="login-actions-forgot-password">
                                        <a href = "">Forgot your password?</a>
                                    </div>
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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired
};

Register.contextTypes = {
	router: PropTypes.object
};

export default Register;
