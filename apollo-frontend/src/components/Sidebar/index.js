import React, { Component } from 'react';

export default class Sidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            friends: [{name:'Friend1',profile_src:'',few_chat_text:''},
                {name:'Friend2',profile_src:'',few_chat_text:''}
            ]
        };

		this.handleChatInit = this.handleChatInit.bind(this);
		this.handleUserInit = this.handleUserInit.bind(this);
		this.handleUserDetails = this.handleUserDetails.bind(this);
		this.promptForUsername = this.promptForUsername.bind(this);

		client.socketRegisterEvent("userInit", this.handleUserInit);
		client.socketRegisterEvent("userDetails", this.handleUserDetails);
		client.socketRegisterEvent("chatInit", this.handleChatInit);
    }

    handleUserInit(res){
        // Check if an error occured
        if(res["code"] == 0) {
			//success
	        var username = res["details"]["username"];
	        this.setState({username: username, error: 0});
        }
		else if(res["code"] == 1 || res["code"] == 2)
		{
			//username taken
			this.setState({username: '', error: res["code"]});

			//output error
			console.log("ERRORS: code - " + res['code'] + ' message - ' + res['message']);

			return;
		}
    }

	handleUserDetails(msg){

	}

	handleChatInit(msg){

	}

    render() {


        return (
            <div className="sidebar">
        	    {this.state.friends.map((friend, k) => {
                			return <div className="sidebar-container" key={k}> <img className="img-circle" src="https://www.abeautifulsite.net/content/uploads/2014/08/rounded-image-250x250.png"/> <p className="sidebar-name"> {friend.name} </p> </div>
	    			})
        		}
            </div>
        );
    }
}
