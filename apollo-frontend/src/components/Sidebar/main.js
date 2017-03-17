import React, { Component } from 'react';
import { client } from '../../modules/api-client';

export default class SidebarMain extends Component {
    constructor() {
        super();
        this.state = {
            friends: [{
                name: 'John Doe',
                avatar: '/img/avatar2.jpg',
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
            }]
        };
        $(document).ready(function(){
            $('.sidebar-content').niceScroll({
                cursorcolor:"#ccc"
            });
        });
		this.handleChatInit = this.handleChatInit.bind(this);
		this.handleUserInit = this.handleUserInit.bind(this);
		this.handleUserDetails = this.handleUserDetails.bind(this);

		client.socketRegisterEvent("userInit", this.handleUserInit);
		client.socketRegisterEvent("userDetails", this.handleUserDetails);
		client.socketRegisterEvent("chatInit", this.handleChatInit);
    }

    handleUserInit(res){
        // Check if an error occured
        if(res["code"] == 0) {
			//success
	        var username = res["details"]["username"];
	        this.setState({username: username, error: 0});
        }
		else if(res["code"] == 1 || res["code"] == 2)
		{
			//username taken
			this.setState({username: '', error: res["code"]});

			//output error
			console.log("ERRORS: code - " + res['code'] + ' message - ' + res['message']);

			return;
		}
    }

	handleUserDetails(msg){

	}

	handleChatInit(msg){

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
