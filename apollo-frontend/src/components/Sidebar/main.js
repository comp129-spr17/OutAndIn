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
		this.handleChatInit = this.handleChatInit.bind(this);
		this.focusChat = this.focusChat.bind(this);

        client.socketRegisterEvent("chatsListUpdate", this.newUsersConnected);
		client.eventBusRegisterEvent('chatsInitWithUsers', this.handleChatInit);
    }

    newUsersConnected(){
        client.chatGetAllByUser({id: localStorage.getItem('userID')}).then((chats) => {
            var friends = [];
			for(var c in chats.data.body.chatIDs){
				client.chatGetChatDetails({id: chats.data.body.chatIDs[c].chat_id}).then((chat) =>{
					var rn = Math.floor(Math.random() * 3) + 1;
					friends.push({
						name: chat.data.body.chat.name,
						id: chat.data.body.chat.uuid,
						avatar: '/img/avatar'+rn+'.jpg',
						preview: 'Lorem ipsum stuff some preview message',
						timestamp: '11/09/2911'
					});
					this.setState({friends: friends});
				}).catch((err) =>{
					console.log('ERR: friends');
				});
			}
        }).catch((err) => {
            console.log('Err: by user'+ err);
        });
    }

	handleChatInit(){
		console.log('handling init');
		//get all users
		client.usersGetAll().then((users) => {
			//create chat per user
			console.log('GOT USERS');
			var list = users.data.body.list;
			for(var i in list){
				if(list[i].uuid != localStorage.getItem('userID')){
					client.chatInit().then((chat) =>{
						//add self
						client.chatAddUser({
							chatID: chat.data.body.chatID,
							userID: localStorage.getItem('userID')
						}).then((userAdd)=>{
							console.log('added me');
							console.log(userAdd);
						}).catch((err) =>{
							console.log('ERR: add me' + JSON.stringify(err));
						});

						//add other user
						client.chatAddUser({
							chatID: chat.data.body.chatID,
							userID: list[i].uuid
						}).then((userAdd)=>{
							console.log('added other');
							console.log(userAdd);
						}).catch((err) =>{
							console.log('ERR: add other' + JSON.stringify(err));
						});

					}).catch((err) =>{
						console.log('ERR: init chat ' + JSON.stringify(err));
					});
				}
			}
		}).catch((err) => {
			console.log('ERR: get users ' + JSON.stringify(err));
		});
	}

	focusChat(chatID){
		localStorage.setItem('chatFocused', chatID);
		client.eventBusDispatchEvent('chatFocusedUpdate');
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
                            return <div className="sidebar-item" key={k} onClick={() => this.focusChat(friend.id)}>
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
