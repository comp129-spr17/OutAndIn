import React, { Component } from 'react';
import { client } from '../../modules/api-client';

var jwt_decode = require("jwt-decode");

export default class NewMessageModal extends React.Component {
	constructor(){
		super();

		this.listItems = this.listItems.bind(this);
		this.selectUser = this.selectUser.bind(this);
		this.search = this.search.bind(this);
		this.initChat = this.initChat.bind(this);
	}

	selectUser(user){
		//check if user is already selected
		for(var i in this.props.modal.selectedUsers){
			if(user.uuid == this.props.modal.selectedUsers[i].uuid){
				//already exists
				return;
			}
		}

		this.props.userSelect(user);
	}

	search(){
		let val = $("#input_user").val();
		if(val != ''){
			this.props.getSearch(val);
		}
	}

	listItems(){
		var _self = this;
		const search = this.props.modal.users.map(function(user){
			if(user.uuid == jwt_decode(localStorage.getItem('token')).uid){
				return '';
			}

			return (
				<div className="new-message-modal-users-item" onClick={() => _self.selectUser(user)}>
					<div className="new-message-modal-users-item-image">
						<div className="modal-item-avatar">
							<img src={ user.avatar } alt="Modal Image" />
						</div>
						<div className="modal-item-status"></div>
					</div>
					<div className="modal-item-details">
						<div className="new-message-modal-users-item-name">
							<h4>{ user.username }</h4>
						</div>
					</div>
				</div>
			);
		});

		const selected = this.props.modal.selectedUsers.map((user) =>
			<div className="new-message-modal-users-item">
				<div className="new-message-modal-users-item-image">
					<div className="new-message-modal-users-item-avatar">
						<img src={ user.avatar } alt="Modal Image" />
					</div>
					<div className="modal-item-status"></div>
				</div>
				<div className="new-message-modal-users-item-details">
					<div className="new-message-modal-users-item-name">
						<h4>{ user.username }</h4>
					</div>
				</div>
			</div>
		);

		return (
			<div>
				<div className="new-message-modal-users-selected-container">
					<div className="new-message-modal-users-selected-header">
						Selected
					</div>
					<div className="new-message-modal-users-selected-list">
						{selected}
					</div>
				</div>
				<div className="new-message-modal-users-found-container">
					<div className="new-message-modal-users-found-header">
						Users Found
					</div>
					<div className="new-message-modal-users-found-list">
						{search}
					</div>
				</div>
			</div>
		);
	};

	initChat(){
		let u = [];
		for(var i in this.props.modal.selectedUsers){
			u.push(this.props.modal.selectedUsers[i].uuid);
		}
		
		if(u.length != 0){
			console.log("U");
			console.log(u);
			this.props.chatInit(u);
		}else{
			console.log("No users selected");
		}
	}

	render(){
		return (
			<div id="new-message-modal">
				<div className="new-message-modal-overlay"></div>
				<div id="new-message-modal-container">
					<div className="new-message-modal-header">
						Create a chat
					</div>
					<div className="new-message-modal-search-container">
						<div id="new-message-modal-search">
							<input onKeyUp={this.search} id="input_user" type="text" className="form-control" placeholder="Type a name..."/>
							<button className="btn btn-sm btn-success">Start Chat</button>
						</div>
					</div>
					<div className="new-message-model-users-container">
						<this.listItems />
					</div>
				</div>
			</div>
		)
	}
}
