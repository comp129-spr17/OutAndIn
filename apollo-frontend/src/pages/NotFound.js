import React, { Component } from 'react';

class NotFound extends Component {
	render(){
		// Check if user is authenticated
		// If they are, render with the main layout
		// If not, then render directly without the main layout
		return (
			<div>
				Not Found
			</div>
		);
	}
}

export default NotFound;
