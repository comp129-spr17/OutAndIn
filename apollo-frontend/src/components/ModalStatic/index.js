import React, { Component } from 'react';
import { client } from '../../modules/api-client';
import Modal from 'react-modal';


export default class ModalStatic extends Component {
    constructor() {
        super();
        this.state = {
            people:[],
            allPeople: [{ 
                name: 'John1 Doe1',
                avatar: '/img/avatar2.jpg',
                handle: '@John',
                icon: '12:45 pm'
            },{
                name: 'Osvaldo1 Jimenez1',
                avatar: '/img/avatar.jpg',
                handle: '@Osvaldo1',
                icon: '06:17 am'
            },{

                name: 'Ayy1 LMAO1',
                avatar: '/img/avatar3.jpg',
                handle: '@Ayy1',
                icon: '12:45 pm'
            },{
                name: 'Donald1 Trump1',
                avatar: '/img/avatar2.jpg',
                handle: '@Donald1',
                icon: '12:45 pm'
            },{
                name: 'Jill1 Smith1',
                avatar: '/img/avatar2.jpg',
                handle: '@Jill1',
                icon: '8:45 pm'
            },{
                name: 'Mike1 Jones1',
                avatar: '/img/avatar3.jpg',
                handle: '@Mike1',
                icon: '04/23/2016'
            }]
        };


        // $(document).ready(function(){
        //     $('.sidebar-content').niceScroll({
        //         cursorcolor:"#ccc"
        //     });
        //});

        this.newUsersConnected = this.newUsersConnected.bind(this);
        this.searchFriend = this.searchFriend.bind(this);
        this.state.people=this.state.allPeople;

        //client.socketRegisterEvent("usersConnected", this.newUsersConnected);
    }

   searchFriend(event){
        var currVal = $('#input_friend').val(); 
        this.state.people=[];
        if(currVal !=''){  //removed return statement since it was returning nothing when curr val was empty, keeping searches on screen when there was nothing in search inp
            for(var i in this.state.allPeople){
                if(this.state.allPeople[i].name.toLowerCase().indexOf(currVal.toLowerCase())> -1){
                    this.state.people.push(this.state.allPeople[i]);
                    if(this.state.people.length >=3)
                        break;
                }
            }

        }
        else{
            this.state.people=this.state.allPeople;
        }
        this.forceUpdate();

    }

    newUsersConnected(){
        client.userGetUsers().then((users) => {
            var friends = [];
            for(var user in users.data.body.list){
                var rn = Math.floor(Math.random() * 3) + 1;
                console.log(users.data.body.list[user].username);
                friends.push({
                    name: users.data.body.list[user].username,
                    avatar: '/img/avatar'+rn+'.jpg',
                    preview: 'Lorem ipsum stuff some preview message',
                    timestamp: '11/09/2911'
                });
            }
            this.setState({friends: friends});
        }).catch((err) => {
            console.log(err); 
        }); 
    }

    render() {
        return (
            <Modal
                isOpen={true}
                contentLabel=''
                  style={
                            { 
                                overlay: {
                                    position: 'fixed',
                                    top               : 0,
                                    left              : 0,
                                    right             : 0,
                                    bottom            : 0,
                                    backgroundColor   : 'rgba(102, 102, 102, 0.74902)',

                                },
                                content: {
                                    border: '0',
                                    borderRadius: '4px',
                                    bottom: 'auto',
                                    left: '40%',
                                    padding: '2rem',
                                    position: 'fixed',
                                    right: 'auto',
                                    top: '20%', 
                                    width: '300px',
                                    height:'550px'
                                  }
                            }
                        }

                >
                <div className='modal-header'>
                    <p className='modal-header-left'> Start a New Message </p>
                    <p className='modal-header-right'>X </p>
                </div>

                <div className="modal-main">
                    <div className="sidebar-container">
                        <div className="sidebar-search">
                            <div className="sidebar-search-input">
                                <i className="fa fa-search"></i>
                                <input  onKeyUp={this.searchFriend} id="input_friend" type="text" className="form-group" placeholder="Search for ..."/>
                            </div>
                        </div>
                        <div className="sidebar-content">
                            { this.state.people.map((p, k) => {
                                return <div className="sidebar-item" key={k}>
                                    <div className="sidebar-chat">
                                        <div className="sidebar-chat-img">
                                            <div className="sidebar-chat-avatar">
                                                <img src={ p.avatar } alt="Sidebar Chat Image"/>
                                            </div>
                                            <div className="sidebar-chat-status">
                                            </div>
                                        </div>
                                        <div className="sidebar-chat-details">
                                            <div className="sidebar-chat-details-name">
                                                <h4>{ p.name }</h4>
                                            </div>
                                            <div className="sidebar-chat-details-preview">
                                                <p>{ p.handle }</p>
                                            </div>
                                        </div>
                                        <div className="sidebar-chat-timestamp">
                                            <span>{ p.icon }</span>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}