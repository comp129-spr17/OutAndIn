import React, { Component } from 'react';


export default class Registration extends React.Component {
    constructor() {
        super();
        
		this.state= {
			email: '',
			fullname: '',
	 		username: '',
	 		password: ''
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleFullnameChange = this.handleFullnameChange.bind(this);
	    this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
    }
    
    handleEmailChange(event){
        this.setState({email: event.target.value}) 
    }
    
    handleFullnameChange(event){
        this.setState({fullname: event.target.value})
    }
    
    handleUsernameChange(event){
        this.setState({username: event.target.value})
	}

    handlePasswordChange(event){
        this.setState({password: event.target.value})
	}

    handleSignUp(event){  
		event.preventDefault();
		console.log(this.state);
    }
    
    
    render() {
        return (
            <div className="Registration">
                <form className='registrationForm'>
                    <input autoFocus type="text" value={this.state.email} onChange={this.handleEmailChange} autoComplete="off"  placeholder='Enter Email'/>
                    <input autoFocus type="text" value={this.state.fullname} onChange={this.handleFullnameChange} autoComplete="off"  placeholder='Enter Fullname'/>
                    <input type="password" value={this.state.username} onChange={this.handleUsernameChange} autoComplete="off"  placeholder='Enter Username'/>
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} autoComplete="off"  placeholder='Enter Password'/>
                    <button onClick={this.handleSignUp}>Submit</button>
                </form>
            </div>
        );
    }
}
