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
			window.location.href = '/';
		}
	}

	componentWillUpdate(prop, state){
		document.getElementById('error-message').innerHTML = '';
		if (prop.register.error){
			var errors = prop.register.error;
			for (var i in errors){
				console.log(errors[i]);

				//add style and message
				document.getElementById(errors[i].property_name + '-input').style.borderColor = "#EC644B";
				document.getElementById('error-message').innerHTML += errors[i].message + '<br />';
			}
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
									<div id="error-message"></div>
                                    <form className='loginForm'>
                                        <p>Email</p>
                                        <input id="email-input" autoFocus type="text" value={this.props.register.credentials.email} onChange={this.handleEmailChange} autoComplete="off"/>
                                        <p>Full Name</p>
                                        <input id="fullname-input" type="text" value={this.props.register.credentials.fullname} onChange={this.handleFullnameChange} autoComplete="off"/>
                                        <p>Username</p>
                                        <input id="username-input" type="text" value={this.props.register.credentials.username} onChange={this.handleUsernameChange} autoComplete="off"/>
                                        <p>Password</p>
                                        <input id="password-input" type="password" value={this.props.register.credentials.password} onChange={this.handlePasswordChange} autoComplete="off"/>
                                        <hr></hr>
                                        <button onClick={this.handleRegister}>Register</button>
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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired
};

Register.contextTypes = {
	router: PropTypes.object
};

export default Register;
