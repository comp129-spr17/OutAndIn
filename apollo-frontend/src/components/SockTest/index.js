import React, { Component } from 'react';
import { client } from '../../modules/api-client';

export default class SockTest extends React.Component {
    constructor() {
        super();
        this.state = {
			username: '',
			userId: -1,
			users: [],
			chats: []
        };

		this.handleInitUser = this.handleInitUser.bind(this);
		this.initUser = this.initUser.bind(this);

	}

	handleInitUser(res){
		this.setState({userId: res['body']['userID']});
	}

	handleDetailUser(res){

	}

	handleInitChat(res){

	}

	handleDetailChat(res){

	}

	handleMessageAdd(res){

	}

	handleUserIDList(res){

	}

	initUser(){
		var name = 'user' + new Date().toString();
		client.userInit({name: name });
		this.setState({username: name});
	}

	initChat(name, toUser){
		client.chatInit({
			name: name,
			users: [this.state.userId, toUser]
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
			fromUser: this.state.userId,
			message: message
		});
	}

    render() {
        return (<div><h3></h3></div>);
    }
}
