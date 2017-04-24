import React, { Component } from 'react'; 
import { Link } from 'react-router';
import { client } from '../../modules/api-client';

var jwt_decode = require('jwt-decode');

export default class Header extends Component { 
    constructor(){
		super();
		this.logout = this.logout.bind(this);
		this.handleUserProfile = this.handleUserProfile.bind(this);
	}

	logout(e){
		e.preventDefault();
		var self = this;
		client.sessionLogout().then((res) => {
			localStorage.removeItem("token");
			window.location.href = "/";
		}).catch((err) => {
			try {
				if(err.response.status == 401){
					localStorage.removeItem("token");
					window.location.href = "/";
					return;
				}
				alert("Logout failed. Looks like a server problem. Let us know!");
			} catch(err){
				alert("Logout failed. Is your Internet connection online?");
			}
		});
	} 

	handleUserProfile(){
		let id = jwt_decode(localStorage.getItem('token')).uid;
		window.location = "/profile/" + id;	
	}

	render(){
        return (
            <div className="header">
                <div className="logo-container">
					<Link to="/"><img className="logo" src="/img/logo.png" alt="Apollo Logo"/></Link>
                </div>
                <div className="info-container">
                    <div className="info-links">
                        <span><i className="fa fa-sign-out" onClick={this.logout}></i></span>
                    </div>
                    <div className="info-user" onClick={this.handleUserProfile}>
                        <div className="info-img">
                            <img src="/img/avatar.jpg" className="info-avatar"/>
                            <span className="info-status"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
