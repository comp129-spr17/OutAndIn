import React, { Component } from 'react';
import { client } from '../../modules/api-client';

export default class SidebarMain extends Component {
    constructor() {
        super();
        this.state = {
            friends: []
        };
        $(document).ready(function(){
            $('.sidebar-content').niceScroll({
                cursorcolor:"#ccc"
            });
        });

        this.newUsersConnected = this.newUsersConnected.bind(this);
        client.socketRegisterEvent("usersConnected", this.newUsersConnected);
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
                            <input type="text" className="form-group" placeholder="Search for ..."/>
                        </div>
                        <div className="sidebar-search-create-msg">
                            <span><i className="fa fa-pencil-square-o"></i></span>
                        </div>
                    </div>
                    <div className="sidebar-content">
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
                </div>
            </div>
        );
    }
}
