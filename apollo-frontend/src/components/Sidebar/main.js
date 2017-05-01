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
			console.log('TARGET');
			console.log(target);
			if(hasClass(target, 'new-message-modal-overlay')){
				//close modal
				var el = document.getElementById('new-message-modal');
				removeClass(el, 'active');
			}
		}, false);

		this.props.getChats();

		//check for focused chat
		var focusChatString = localStorage.getItem("focus");
		localStorage.removeItem("focus");
		if(focusChatString){
			this.props.focusChat(JSON.parse(focusChatString));
		}
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
		//get user profile
		window.location = "/profile/" + userID;
	}

	chatSelect(chat){
		var loc = window.location.pathname;

		if(loc == '/'){
			this.props.focusChat(chat);
		}else{
			localStorage.setItem('focus', JSON.stringify(chat));
			window.location = '/';
		}
	}

	handleChatAdded(){
		console.log("Chat added");
		if($('#input_friend').val() == ''){
			this.props.getChats();
		}
	}

	toggleNewMessageModal(e){
		e.preventDefault();
		var el = document.getElementById('new-message-modal');
		addClass(el, "active");
		client.eventBusDispatchEvent('modal');
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
								return 	<div className="sidebar-item" onClick={() => this.chatSelect(chat)} key={k}>
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
                        <div className='peopleDiv' >
							{ this.props.sidebar.searching ? (<h4>People</h4>) : ''}
                            { this.props.sidebar.people.map((p, k) => {
                                return <div className="sidebar-item" key={k} onClick={() => this.friendSelect(p.uuid)}>
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
                                                <h4>{ p.username }</h4>
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
							{ this.props.sidebar.searching ? (<h4>Files</h4>) : '' }
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
