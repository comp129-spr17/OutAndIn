import React, { Component } from 'react';
import ProfileContainer from '../containers/ProfileContainer';

class Profile extends Component {
	render(){
		return (
			<ProfileContainer userID={this.props.params.id}/>
		);
	}
}

export default Profile;
