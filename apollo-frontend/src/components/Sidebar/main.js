import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { client } from '../../modules/api-client';
import { hasClass, addClass, removeClass } from '../../utils/DOMTools';

export default class Sidebar extends Component {
    constructor() {
        super();
		this.state = {
			chats: [],
			friends: [],
			people: [],
			files: [],
			newMessageModalState: 0
		};
		//this.newUsersConnected = this.newUsersConnected.bind(this);
		this.search = this.search.bind(this);
		this.toggleNewMessageModal = this.toggleNewMessageModal.bind(this);
		this.handleChatAdded = this.handleChatAdded.bind(this);
		// Close New Message Modal if you click off the modal
		client.socketRegisterEvent('chatAdded', this.handleChatAdded);

	}

	componentDidMount(){
		var self = this;
		var parent = document.getElementById("new-message-modal-container");
		document.body.addEventListener("click", function(e) {
			var target = e.target || e.srcElement;
			var state = false;
			var node = target.parentNode;
			while (node != null) {
				if(node == parent) {
					state = true;
					break;
				}
				node = node.parentNode;
			}	  
			if(target !== parent && !state) {
				if(self.state.newMessageModalState == 1){
					var el = document.getElementById('new-message-modal');
					removeClass(el, "active");
					self.setState({newMessageModalState: 0});
				}
			}
		}, false);

		this.props.getChats();
	}

	search(e){
        var curVal = $('#input_friend').val();
        if(curVal != ''){  
			//removed return statement since it was returning nothing when curr val was empty,
			//keeping searches on screen when there was nothing in search inp
			
			this.props.search(curVal);
        }else{
			this.props.getChats();
		}
	}

	friendSelect(userID){
		//request to make new chat
		client.chatsInit(userID).then((res) => {
			console.log(res);
			localStorage.setItem("focusChat", res.data.results[0].chatID);
			client.eventBusDispatchEvent("focusChat");

		}).catch((err) =>{
			console.log("Err: " + JSON.stringify(err));
		});
		$('#input_friend').val('');
		this.props.getChats();
	}

	chatSelect(chatID){
		this.props.focusChat(chatID);
		//localStorage.setItem("focusChat", chatID);
		client.eventBusDispatchEvent("focusChat");
	}

	handleChatAdded(){
		console.log("Chat added");
		if($('#input_friend').val() == ''){
			this.props.getChats();
		}
	}

	
	toggleNewMessageModal(e){
		e.preventDefault();
		if(this.state.newMessageModalState == 0){
			var el = document.getElementById('new-message-modal');
			addClass(el, "active");
			this.setState({newMessageModalState: 1});
		} else {
			var el = document.getElementById('new-message-modal');
			removeClass(el, "active");
			this.setState({newMessageModalState: 0});
		}
	}
	//old
	displayChats(){
		client.chatsGetAll().then((query) => {
				console.log(query);
				var chats = [];
				var chatsList = query.data.results;
				for(var i in chatsList){
					chats.push({
						name: chatsList[i].name,
						avatar:  chatsList[i].avatar,
						timestamp: "4/12/2017",
						preview: "abcd",
						id:  chatsList[i].uuid
					});
				}
				this.setState({
					chats: chats,
					friends: [],
					people: [],
					files: []
				});
			}).catch((err) =>{
				console.log("ERR: " + JSON.stringify(err));
			});

	}

    render() {
        return (
            <div className="sidebar-main">
                <div className="sidebar-container">
                    <div className="sidebar-search">
                        <div className="sidebar-search-input">
                            <i className="fa fa-search"></i>
                            <input  onKeyUp={this.search} id="input_friend" type="text" className="form-group" placeholder="Search for ..."/>
                        </div>
                        <div className="sidebar-search-create-msg">
                            <span onClick={this.toggleNewMessageModal}><i className="fa fa-pencil-square-o"></i></span>
                        </div>
                    </div>
                    <div className="sidebar-content">
						<div className='conversationDiv'>
							{this.props.sidebar.chats.map((chat, k) =>{
								return 	<div className="sidebar-item" onClick={() => this.chatSelect(chat.uuid)} key={k}>
                                    <div className="sidebar-chat">
                                        <div className="sidebar-chat-img">
                                            <div className="sidebar-chat-avatar">
                                                <img src={ chat.avatar } alt="Sidebar Chat Image"/>
                                            </div>
                                            <div className="sidebar-chat-status">
                                            </div>
                                        </div>
                                        <div className="sidebar-chat-details">
                                            <div className="sidebar-chat-details-name">
                                                <h4>{ chat.name }</h4>
                                            </div>
                                            <div className="sidebar-chat-details-preview">
                                                <p>{ chat.preview }</p>
                                            </div>
                                        </div>
                                        <div className="sidebar-chat-timestamp">
                                            <span>{ chat.timestamp }</span>
                                        </div>
                                    </div>
                                </div>
							  
							})}
						</div>
                        <div className='conversationDiv' >
							{ this.props.sidebar.searching ? (<p>Conversation</p>) : '' }
                            { this.props.sidebar.friends.map((friend, k) => {
                                return <div className="sidebar-item" onClick={() => this.friendSelect(friend.uuid)} key={k}>
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
                                                <h4>{ friend.username }</h4>
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
							{ this.props.sidebar.searching ? (<p>People</p>) : ''}
                            { this.props.sidebar.people.map((p, k) => {
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
							{ this.props.sidebar.searching ? (<p>Files</p>) : '' }
                            { this.props.sidebar.files.map((file, k) => {
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
