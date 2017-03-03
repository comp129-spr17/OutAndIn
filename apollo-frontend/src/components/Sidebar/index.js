import React, { Component } from 'react'; 

export default class Sidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            friends: ['friend', 'friend2']
        };
    }

    render() {
        return (
            <div className="sidebar">
        	    {this.state.friends.map((friend, k) => { 
                			return <div className="sidebar-container" key={k}> <img className="img-circle" src="https://www.abeautifulsite.net/content/uploads/2014/08/rounded-image-250x250.png"/> <p className="sidebar-name"> {friend} </p> </div>
	    			})
        		}
            </div>
        );
    }
}
