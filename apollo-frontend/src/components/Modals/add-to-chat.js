import React, { Component } from 'react';
import { client } from '../../modules/api-client';

export default class AddtoChatModal extends React.Component {
	constructor(){
		super();
		this.state = {
			users: []
		};
	}
	render(){
		return (
			<div id="add-to-chat-modal">
				<div className="new-message-modal-overlay"></div>
				<div id="new-message-modal-container">
					<input type="text" placeholder="Type friends name"/>
				</div>
			</div>
		)
	}
}
