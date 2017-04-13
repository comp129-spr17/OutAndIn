import React, { PropTypes, Component } from 'react';

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
 render() {
        return (
            <div className="content">
         <Header></Header>
                <div className='profile-container'> 
                    <div >
                        <div className='profile-avatar'>
                            <img  src={ this.props.profile.avatar } alt="User Image"/>
                        </div>
                        <div  >
                            <p className='profile-name' >{this.props.profile.name} </p>
                            <p className='profile-handle' > {this.props.profile.handle} </p>
                        </div>
                    </div>
                    <div className='profile-otherinfo'>
                        <p> Phone : {this.props.profile.phoneNumber}  </p>
                        <p> Birthday : {this.props.profile.dob}  </p>
                        <p> Where I Live : {this.props.profile.address}  </p>
                        <div>
                            <p>Friends </p>
                            <div className='profile-friendlist'> 
                                 { this.props.profile.friends.map((friend, k) => {
                                    return <img  src={ friend }  key={k} alt="User Image"/>
                                 })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}