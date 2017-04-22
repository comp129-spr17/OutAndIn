import React, { Component } from 'react';
import { client } from '../../modules/api-client';

export default class NewMessageModal extends React.Component {
	constructor(){
		super();
		this.state = {
			users: []
		};
	}
	render(){
		return (
			<div id="new-message-modal">
				<div className="new-message-modal-overlay"></div>
				<div id="new-message-modal-container">
					<div id="new-message-modal-search">
					<input type="text" placeholder="Type a name..."/>
					</div>
					<i className="new-message-modal-confirm fa fa-check-square-o fa-2x"></i>
				</div>
			</div>
		)
	}
}
