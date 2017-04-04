import React, { Component } from 'react';
import { client } from '../../modules/api-client';
import { browserHistory } from 'react-router';

export default class LoginTest extends React.Component {
	constructor() {
		super();     
		this.state= { 
			username: '',
			password: '',
			error: ''
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleUsernameChange(event){
		this.setState({username: event.target.value}) 
	}
    
	handlePasswordChange(event){
		this.setState({password: event.target.value})
    }
    
	handleLogin(event){  
		event.preventDefault();
		// TODO:(mcervco) Do basic sanitation of params before sending them
		var data = {
			username: this.state.username,
			password: this.state.password
		};
		var self = this;
		// TODO:(mcervco) Prevent multiple attempts at login
		// Wait for request to finish
		client.sessionLogin(data).then((res) => {
			if(res.status == 200 || res.data.status == "success"){
				//browserHistory.push('/chat');
				self.setState({error: "Login successful"});
				return;
			}
		}).catch((err) => {
			var status = err.response.status;
			var data = err.response.data;
			console.log(data);
			if(status == 400){
				self.setState({error: data.results[0]["message"]});
			}
		});
	}
    
    
	render() {
		return (
			<div className="login">
				<div style={{color: '#fff'}}>{this.state.error}</div>
                <form className='loginForm'>
                    <input autoFocus type="text" value={this.state.username} onChange={this.handleUsernameChange} autoComplete="off"  placeholder='Enter UserName'/>
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} autoComplete="off"  placeholder='Enter Password'/>
                    <button onClick={this.handleLogin}>Submit</button>
                </form>
            </div>
        );
    }

}
