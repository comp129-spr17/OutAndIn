import React, { PropTypes, Component } from 'react';
import { client } from '../../modules/api-client';

class Header extends Component{
    render() {
        return (
                <div className='profile-header'>
                    <h3>My Profile</h3>
                </div>
            );
    }
}


export default class Profile extends Component {
    constructor(){
        super();
    }
    
    componentWillMount(){
        console.log("USERID: " + this.props.userID);
        this.props.getProfile(this.props.userID);
    }

    render() {
        return (
            <div className="content">
                <Header></Header>
                <div className='profile-container'> 
                    <div >
                        <div className='profile-avatar'>
                            <img  src={ this.props.profile.user.avatar } alt="User Image"/>
                        </div>
                        <div  >
                            <p className='profile-name' >{this.props.profile.user.name} </p>
                            <p className='profile-handle' > {this.props.profile.user.handle} </p>
                        </div>
                    </div>
                        
                    <div >
                    <img className='change-image'  src = "/img/capture.png"/>
                     </div>
                    
                    <div className='profile-otherinfo'>
                        <p> Phone : {this.props.profile.user.phoneNumber}  </p>
                        <p> Birthday : {this.props.profile.user.dob}  </p>
                        <p> Where I Live : {this.props.profile.user.address}  </p>
                        <div>
                            <p>Friends </p>
                            <div className='profile-friendlist'> 
                                { this.props.profile.friends.map((friend, k) => {
                                     return <img  src={ friend }  key={k} alt="User Image"/>
                                })}
                            </div>
                        </div>
                        
                        <div>
                            <button className='change-info-button'>Change info </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}