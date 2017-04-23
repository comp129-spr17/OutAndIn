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
        this.handleFileInput = this.handleFileInput.bind(this);

    }

    componentWillMount(){
        console.log("USERID: " + this.props.userID);
        this.props.getProfile(this.props.userID);
    }
    
     componentDidMount(){
      $('.modal-content').hide();
      // $('.profile-pic-icon').hide();
      // $('.profile-avatar').hover(function(){
      //   $('.profile-pic-icon').show();
      // },function(){
      //   $('.profile-pic-icon').hide();
      // });
    }
    


    
    showModal(){
      $('.modal-content').show();
    }

    hideModal(){
      $('.modal-content').hide();
    }
    
     handleFileInput(e){
      var fileInput = document.getElementById("file-upload");
      fileInput.click();
     }


    render() {
        return (
            <div className="content">
                <Header></Header>
                <div className='profile-container'>
                    <div >
                        <div className='profile-avatar'>
                            <i className = "profile-pic-user fa fa-user-circle-o fa-5x"> </i>
                        </div>
                        <div  >
                            <p className='profile-name' >{this.props.profile.user.name} </p>
                            <p className='profile-handle' > {this.props.profile.user.handle} </p>
                        </div>
                    </div>

                    <div onClick={this.showModal}>
                      <i className = "profile-pic-icon fa fa-camera fa-2x"></i>
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
                
                <div className='modal-container'>
                    <div className="modal-content">
                        <div className="modal-footer">
                          <button type="button" className="btn btn-default">Open Camera</button>
                          <button type="button" className="btn btn-default" onClick={this.handleFileInput} > Choose File </button>
                            <input style={{display: "none"}} id="file-upload" name="file" type="file" onChange={this.handleFileChoosen} />
                          <button type="button" className="btn btn-default" onClick={this.hideModal}>Close</button>
                        </div>
                    </div>
                </div> 
                
            </div>
        );
    }
}