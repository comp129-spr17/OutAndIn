import React, { Component } from 'react';
import { client } from '../../modules/api-client';
import { hasClass, removeClass, addClass } from '../../utils/DOMTools';
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

			console.log("uuid: " + user.uuid);

			return (
			<div className="modal-item" onClick={() => _self.selectUser(user)}>
				<div className="modal-item-img">
					<div className="modal-item-avatar">
						<img src={ user.avatar } alt="Modal Image" />
					</div>
					<div className="modal-item-status"></div>
				</div>
				<div className="modal-item-details">
					<div className="modal-item-name">
						<h4>{ user.username }</h4>
					</div>
				</div>
			</div>
			);
		});

		const selected = this.props.modal.selectedUsers.map((user) => 
			<div className="modal-item-selected">
				<div className="modal-item-img">
					<div className="modal-item-avatar">
						<img src={ user.avatar } alt="Modal Image" />
					</div>
					<div className="modal-item-status"></div>
				</div>
				<div className="modal-item-details">
					<div className="modal-item-name">
						<h4>{ user.username }</h4>
					</div>
				</div>
			</div>
		);

		return (
			<div>
				<div>{selected}</div>
				<hr />
				<div>{search}</div>
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
			// Close modal after selecting a user(s) to chat with
			let nmm = document.getElementById("new-message-modal");
			removeClass(nmm, "active");
			
		}else{
			console.log("No users selected");
		}
	}

	render(){
		return (
			<div id="new-message-modal">
				<div className="new-message-modal-overlay"></div>
				<div id="new-message-modal-container">
					<div id="new-message-modal-search">
						<input onKeyUp={this.search} id="input_user" type="text" placeholder="Type a name..."/>
					</div>
					<i className="new-message-modal-confirm fa fa-check-square-o fa-2x" onClick={this.initChat}></i>
					<div className="modal-list">
						<this.listItems />
					</div>
				</div>
			</div>
		)
	}
}
