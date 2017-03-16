import React, { Component } from 'react';
import { client } from '../../modules/api-client';

export default class Sidebar extends React.Component {
    constructor() {
        super();
        this.state = {
			username: '',
			userID: -1,
            friends: []
        };

		this.userIDList = this.userIDList.bind(this);

		this.handleUserInit = this.handleUserInit.bind(this);
		this.handleUserIDList = this.handleUserIDList.bind(this);
		this.handleChatInit = this.handleChatInit.bind(this);
		this.handleUserDetails = this.handleUserDetails.bind(this);

		client.socketRegisterEvent("userInit", this.handleUserInit);
		client.socketRegisterEvent("userIDList", this.handleUserIDList);
		client.socketRegisterEvent("userDetails", this.handleUserDetails);
		client.socketRegisterEvent("chatInit", this.handleChatInit);
    }

	userIDList(){
		client.userIDList({});
	}

	handleUserInit(msg){
		console.log("User code: " + msg.header.code);
		if(msg.header.code == 0)
			this.setState({userID: msg.body.userID});
	}

	handleUserIDList(msg){
		console.log("List: " + JSON.stringify(msg.body.userIDList));
		for(var i in msg.body.userIDList)
		{
			console.log("Details send: " + msg.body.userIDList[i]);
			client.userDetails({
				id: msg.body.userIDList[i]
			});
		}
	}

	handleUserDetails(msg){
		var user = msg.body.user;
		console.log("User: " + JSON.stringify(msg.body.user));
		console.log("Code: " + JSON.stringify(msg.header.code));
		if(msg.header.code == 0){
			//success
			if(this.state.userID == user.id){
				this.setState({
					username: msg.body.user.name,
				});
				console.log("MEE: " + this.state.username + "\n\tID: " + user.id);
				return;
			}else{
				for(var u in this.state.friends){
					if(this.state.friends[u].id == user.id)
					{
						//user already collected
						//set user data
						this.state.friends[u] = user

						//set state event
						this.setState({
							friends: this.state.friends
						});

						return;
					}
				}
				//new user
				//add new user
				this.state.friends.push(user);

				//set state event
				this.setState({
					friends:this.state.friends
				});
			}
		}
	}

	handleChatInit(msg){

	}

    render() {
        return (
            <div className="sidebar">
        	    {this.state.friends.map((friend, k) => {
                		return <div className="sidebar-container" key={k}>
									<img className="img-circle" src="https://www.abeautifulsite.net/content/uploads/2014/08/rounded-image-250x250.png"/>
									<p className="sidebar-name"> {friend.name} </p>
								</div>
	    		})}
				<button onClick={this.userIDList}>Get Users</button>
            </div>
        );
    }
}
