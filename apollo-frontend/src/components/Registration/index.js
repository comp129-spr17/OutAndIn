import React, { Component } from 'react';


export default class Registration extends React.Component {
    constructor() {
        super();

        this.state= { 
            email: '',
            fullName: '',
            username: '',
            password: '',
            tAndC: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleTAndCChange = this.handleTAndCChange.bind(this);
    }
    
     handleEmailChange(event){
        this.setState({email: event.target.email})
        this.setState({fullName: event.target.fullName})
        this.setState({username: event.target.username}) 
        this.setState({password: event.target.password})
     }

     handleFullNameChange(event){
        this.setState({fullName: event.target.fullName})
        this.setState({username: event.target.username}) 
        this.setState({password: event.target.password})
     }

     handleUsernameChange(event){
        this.setState({username: event.target.username}) 
        this.setState({password: event.target.password})
    }
    
     handlePasswordChange(event){
        this.setState({password: event.target.password})
    }
    handleTAndCChange(event){
        this.setState({tAndC: event.target.tAndC})
    }
    handleSignUp(event){  
        event.preventDefault();
    }
    
    
    render() {
        return (
 <div className="Registration">
                <div className="registration-overlay"></div>
                <div className="registration-container">
                    <div className="registration-form-container">
                        <div className="registration-form">
                                            <div className="registration-brand-container">
                        <div className="registration-logo">
                             <img src="/img/logo.png"/>
                        </div>
                        <div className="registration-logo-name">
                            <span>Apollo</span>
                        </div>
                    </div>            
                            <div className="registration-actions-container">
                                <div className="registration-actions">
                                    <form className='registrationForm'>
                                        <p>Email</p>
                                        <input autoFocus type="text" value={this.state.email} onChange={this.handleEmailChange} autoComplete="off"/>
                                        <p>Full Name</p>
                                        <input type="text" value={this.state.fullName} onChange={this.handleFullNameChange} autoComplete="off"/>
                                        <p>Username</p>
                                        <input type="text" value={this.state.username} onChange={this.handleUserNameChange} autoComplete="off"/>
                                        <p>Password</p>
                                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} autoComplete="off"/>
                                        <hr></hr>
                                        <label><input id = "TandC" type="checkbox" value={this.state.tAndC} onChange={this.handleTAndCChange}/>I agree to the terms and conditions of this service </label>
                                        <button onClick={this.handleSignUp}>Register</button>
                                    </form>
                                </div>
                            </div>
                            <div className="registration-footer">
                                Apollo © 2017
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
