import React, { Component } from 'react';
import { client } from '../../modules/api-client';

export default class UserSearch extends Component {
    constructor() {
        super();
        this.state = {
            friends:[],
            allFriends: [{  //new array.static representation of search. hardcoded for now
                name: 'John Doe',
                avatar: '/img/avatar2.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '12:45 pm'
            },{

                name: 'Jane Doe',
                avatar: '/img/avatar1.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '12:45 pm'
            },{

                name: 'Johnny Doe',
                avatar: '/img/avatar.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '09/11/2001'
            },{

                name: 'John Doe',
                avatar: '/img/avatar2.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '12:45 pm'
            },{

                name: 'John Doe',
                avatar: '/img/avatar3.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '12:45 pm'
            },{

                name: 'John Doe',
                avatar: '/img/avatar1.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '3:15 pm'
            },{
                name: 'Osvaldo Jimenez',
                avatar: '/img/avatar.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '06:17 am'
            },{

                name: 'Ayy LMAO',
                avatar: '/img/avatar3.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '12:45 pm'
            },{

                name: 'John Doe',
                avatar: '/img/avatar1.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '12:45 pm'
            },{

                name: 'John Doe',
                avatar: '/img/avatar.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '09/11/2001'
            },{

                name: 'John Doe',
                avatar: '/img/avatar2.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '12:45 pm'
            },{

                name: 'John Doe',
                avatar: '/img/avatar3.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '12:45 pm'
            },{

                name: 'John Doe',
                avatar: '/img/avatar1.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '3:15 pm'
            },{
                name: 'Donald Trump',
                avatar: '/img/avatar2.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '12:45 pm'
            },{
                name: 'Jill Smith',
                avatar: '/img/avatar2.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '8:45 pm'
            },{
                name: 'Mike Jones',
                avatar: '/img/avatar3.jpg',
                preview: 'Lorem ipsum stuff some preview message',
                timestamp: '04/23/2016'
            }],
            people:[],
            allPeople: [{  //new array.static representation of search. hardcoded for now
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
            }],
            files:[],
            allFiles: [{  //new array.static representation of search. hardcoded for now
                fileName: 'Johns File',
                avatar: '/img/avatar2.jpg',
                icon: '12:45 pm'
            },{
                fileName: 'Osvaldos File',
                avatar: '/img/avatar.jpg',
                icon: '06:17 am'
            },{

                fileName: 'Ayys File',
                avatar: '/img/avatar3.jpg',
                icon: '12:45 pm'
            },{
                fileName: 'Donalds File',
                avatar: '/img/avatar2.jpg',
                icon: '12:45 pm'
            },{
                fileName: 'Jills File',
                avatar: '/img/avatar2.jpg',
                icon: '8:45 pm'
            },{
                fileName: 'Mikes File',
                avatar: '/img/avatar3.jpg',
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

        //client.socketRegisterEvent("usersConnected", this.newUsersConnected);
    }

   searchFriend(event){
        var currVal = $('#input_friend').val(); 
        this.state.friends = [];
        this.state.people=[];
        this.state.files=[];
        if(currVal !=''){  //removed return statement since it was returning nothing when curr val was empty, keeping searches on screen when there was nothing in search inp
            for(var i in this.state.allFriends){
                if(this.state.allFriends[i].name.toLowerCase().indexOf(currVal.toLowerCase())> -1){
                    this.state.friends.push(this.state.allFriends[i]);
                    if(this.state.friends.length >=3)
                        break;
                }
            }

            for(var i in this.state.allPeople){
                if(this.state.allPeople[i].name.toLowerCase().indexOf(currVal.toLowerCase())> -1){
                    this.state.people.push(this.state.allPeople[i]);
                    if(this.state.people.length >=3)
                        break;
                }
            }

            for(var i in this.state.allFiles){
                if(this.state.allFiles[i].fileName.toLowerCase().indexOf(currVal.toLowerCase())> -1){
                    this.state.files.push(this.state.allFiles[i]);
                    if(this.state.files.length >=3)
                        break;
                }
            }

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
            <div className="sidebar-main">
                <div className="sidebar-container">
                    <div className="sidebar-search">
                        <div className="sidebar-search-input">
                            <i className="fa fa-search"></i>
                            <input  onKeyUp={this.searchFriend} id="input_friend" type="text" className="form-group" placeholder="Search for ..."/>
                        </div>
                        <div className="sidebar-search-create-msg">
                            <span><i className="fa fa-pencil-square-o"></i></span>
                        </div>
                    </div>
                    <div className="sidebar-content">
                        <div className='conversationDiv' >
                            <p>Conversation</p>
                            { this.state.friends.map((friend, k) => {
                                return <div className="sidebar-item" key={k}>
                                    <div className="sidebar-chat">
                                        <div className="sidebar-chat-img">
                                            <div className="sidebar-chat-avatar">
                                                <img src={ friend.avatar } alt="Sidebar Chat Image"/>
                                            </div>
                                            <div className="sidebar-chat-status">
                                            </div>
                                        </div>
                                        <div className="sidebar-chat-details">
                                            <div className="sidebar-chat-details-name">
                                                <h4>{ friend.name }</h4>
                                            </div>
                                            <div className="sidebar-chat-details-preview">
                                                <p>{ friend.preview }</p>
                                            </div>
                                        </div>
                                        <div className="sidebar-chat-timestamp">
                                            <span>{ friend.timestamp }</span>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                        <div className='peopleDiv' >
                            <p>People</p>
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
                        <div className='fileDiv' >
                            <p>Files</p>
                            { this.state.files.map((file, k) => {
                                return <div className="sidebar-item" key={k}>
                                    <div className="sidebar-chat">
                                        <div className="sidebar-chat-img">
                                            <div className="sidebar-chat-avatar">
                                                <img src={ file.avatar } alt="Sidebar Chat Image"/>
                                            </div>
                                            <div className="sidebar-chat-status">
                                            </div>
                                        </div>
                                        <div className="sidebar-chat-details">
                                            <div className="sidebar-chat-details-name">
                                                <h4>{ file.fileName }</h4>
                                            </div>
                                        </div>
                                        <div className="sidebar-chat-timestamp">
                                            <span>{ file.icon }</span>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}