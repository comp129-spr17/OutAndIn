import React, { Component } from 'react';
import { client } from '../../modules/api-client';

export default class NewMessageModal extends React.Component {
	constructor(){
		super();
		this.state = {
			users: [
				{
					username: "Pranav",
					avatar: "https://api.adorable.io/avatars/50/pranav.png"
				},
				{
					username: "Mark",
					avatar: "https://api.adorable.io/avatars/50/mark.png"
				},
				{
					username: "Larry",
					avatar: "https://api.adorable.io/avatars/50/larry.png"
				}
			]
		};
		console.log("MO");

		this.listItems = this.listItems.bind(this);
	}

	listItems(){
		const items = this.state.users.map((user) =>
			<div className="modal-item">
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
			<div>{items}</div>
		);
	};
	render(){
		return (
			<div id="new-message-modal">
				<div className="new-message-modal-overlay"></div>
				<div id="new-message-modal-container">
					<div className="new-message-modal-title">
						Start a Message
					</div>
					<div id="new-message-modal-search">
						<input type="text" placeholder="Type a name..."/>
					</div>
					<div className="modal-list">
						<this.listItems />
					</div>
					<i className="new-message-modal-confirm fa fa-check-square-o fa-2x"></i>
				</div>
			</div>
		)
	}
}
