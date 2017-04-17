import React, { Component } from 'react'; 

var jwt_decode = require('jwt-decode');

export default class Header extends Component { 
    constructor(){
		super();

		this.handleUserProfile = this.handleUserProfile.bind(this);
	}

	handleUserProfile(){
		let id = jwt_decode(localStorage.getItem('token')).uid;
		window.location = "profile/" + id;	
	}

	render(){
        return (
            <div className="header">
                <div className="logo-container">
                    <img className="logo" src="/img/logo.png" alt="Apollo Logo"/>
                </div>
                <div className="info-container">
                    <div className="info-links">
                        <span><a href=""><i className="fa fa-user"></i></a></span>
                        <span><a href=""><i className="fa fa-cog"></i></a></span>
                        <span><a href=""><i className="fa fa-sign-out"></i></a></span>
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
