import React, { Component } from 'react';


export default class Profile extends React.Component {
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
                <form className='loginForm'>
                    <input autoFocus type="text" value={this.state.username} onChange={this.handleUserNameChange} autoComplete="off"  placeholder='Enter UserName'/>
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} autoComplete="off"  placeholder='Enter Password'/>
                    <button onClick={this.handleSignUp}>Submit</button>
                </form>
            
            
            </div>
        );
    }

}
