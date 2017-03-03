import React, { Component } from 'react'; 

export default class Header extends Component { 
    render(){
        return (
            <div className="header">
                <div className="logo-container">
                    <img className="logo" src="/img/logo.png" alt="Apollo Logo"/>
                </div>
            </div>
        )
    }
}
