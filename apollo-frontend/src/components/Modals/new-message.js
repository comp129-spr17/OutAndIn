import React, { Component } from 'react';

export default class NewMessageModal extends React.Component {
	render(){
		return (
			<div id="new-message-modal">
				<div className="new-message-modal-overlay"></div>
				<div id="new-message-modal-container"></div>
			</div>
		)
	}
}
