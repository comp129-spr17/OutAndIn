import React, { Component } from 'react';
import { client } from '../../modules/api-client';

export default class SockTest extends React.Component {
    constructor() {
        super();
        this.state = {
        };

		this.username = '';
		this.userId = -1;
		this.users = [];
		this.chats = [];

		this.handleInitUser = this.handleInitUser.bind(this);
		this.handleDetailUser = this.handleDetailUser.bind(this);
		this.handleInitChat = this.handleInitChat.bind(this);
		this.handleDetailChat = this.handleDetailChat.bind(this);
		this.handleMessageAdd = this.handleMessageAdd.bind(this);
		this.handleUserIDList = this.handleUserIDList.bind(this);

		this.initUser = this.initUser.bind(this);
		this.detailsUser = this.detailsUser.bind(this);
		this.initChat = this.initChat.bind(this);
		this.detailsChat = this.detailsChat.bind(this);
		this.addMessage = this.addMessage.bind(this);

		client.socketRegisterEvent('userInit', this.handleInitUser);
		client.socketRegisterEvent('userDetails', this.handleDetailUser);
		client.socketRegisterEvent('chatInit', this.handleInitChat);
		client.socketRegisterEvent('chatDetails', this.handleDetailChat);
		client.socketRegisterEvent('userListUpdate', this.handleUserIDList);
		client.socketRegisterEvent('messageAdd', this.handleMessageAdd);


	}

	handleInitUser(res){
		this.userId = res['details']['userID'];
		console.log("Set id: " + res['details']['userID']);
	}

	handleDetailUser(res){
		//is user
		if(res.body.user.id == userId)
		{
			this.username = res.body.user.name;
			return;
		}

		//already regitered
		for(var u in this.users)
		{
			if(u.id == res.body.user.id)
			{
				u.name = res.body.user.name;
				return;
			}
		}

		//new
		this.users.push(res.body.user);

		console.log(JSON.stringify(this.user));
	}

	handleInitChat(res){
		console.log(JSON.stringify(res));
	}

	handleDetailChat(res){

	}

	handleMessageAdd(res){

	}

	handleUserIDList(res){
		this.users = res.details.userIDList;
		console.log(JSON.stringify(this.users));
		console.log("ID: " + this.userId);

		if(this.userId == -1)
			return;

		if(res.code == 2)
		{
			//create chats
			for(var u in this.users)
			{
				if(this.users[u].id != this.userId)
				{
					this.initChat(this.username + ' : ' + this.users[u].name, this.users[u].id);
				}
			}
		}
	}

	initUser(){
		var name = 'user-' + new Date().getTime().toString();
		client.userInit({name: name });
		this.setState({username: name});
	}

	initChat(name, toUser){
		client.chatInit({
			name: name,
			users: [this.userId, toUser]
		});
	}

	detailsUser(id)
	{
		client.userDetails({id: id});
	}

	detailsChat(id)
	{
		client.chatDetails({id: id});
	}

	addMessage(message, chatID)
	{
		client.messageAdd({
			chatId: chatID,
			fromUser: this.userId,
			message: message
		});
	}

    render() {
        return (<div><button onClick={this.initUser}>Init User</button></div>);
    }
}
