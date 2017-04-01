import React, { PropTypes, Component } from 'react';

export default class Friends extends Component {
    constructor () { 
        super();
        this.state={
            user:{
                name:'Abc',
                handle:'@abc',
                avatar:'/img/avatar1.jpg',
                phoneNumber:'+1-2345678',
                dob:'12-01-2011',
                address:'Here and There',
                friends:['/img/avatar1.jpg','/img/avatar2.jpg','/img/avatar3.jpg']
            }
        }
    }

    render() {
        return (
            <div> 
                <div >
                    <div className='profile-avatar'>
                        <img  src={ this.state.user.avatar } alt="User Image"/>
                    </div>
                    <div  >
                        <p className='profile-name' >{this.state.user.name} </p>
                        <p className='profile-handle' > {this.state.user.handle} </p>
                    </div>
                </div>
                <div className='profile-otherinfo'>
                    <p> Phone : {this.state.user.phoneNumber}  </p>
                    <p> BirthDay : {this.state.user.dob}  </p>
                    <p> Where I Live : {this.state.user.address}  </p>
                    <div>
                        <p>Friends </p>
                        <div className='profile-friendlist'> 
                             { this.state.user.friends.map((friend, k) => {
                                return <img  src={ friend }  key={k} alt="User Image"/>
                             })}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
