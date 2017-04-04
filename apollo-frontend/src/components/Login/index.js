import React, { Component } from 'react';


export default class Login extends React.Component {
    constructor() {
        super();
        
        this.state= { 
	 		username: '',
	 		password: ''
        };
	    this.handleUserNameChange = this.handleUserNameChange.bind(this);
	    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    
     handleUserNameChange(event){
        this.setState({username: event.target.username}) 
        this.setState({password: event.target.password})
    }
    
     handlePasswordChange(event){
        this.setState({password: event.target.password})
    }
    
    handleSignUp(event){  
		event.preventDefault();
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
                                    <form className='loginForm'>
                                        <p>Username</p>
                                        <input autoFocus type="text" value={this.state.username} onChange={this.handleUserNameChange} autoComplete="off"/>
                                        <p>Password</p>
                                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} autoComplete="off"/>
                                        <hr></hr>
                                        <button onClick={this.handleSignUp}>Login</button>
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
