import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { client } from '../../modules/api-client';

export default class UserSearch extends Component {
    constructor() {
        super();
		this.state = {
			newMessageModalState: 0,
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
		this.toggleNewMessageModal = this.toggleNewMessageModal.bind(this);
		this.hasClass = this.hasClass.bind(this);
		this.addClass = this.addClass.bind(this);
		this.removeClass = this.removeClass.bind(this);
		//client.socketRegisterEvent("usersConnected", this.newUsersConnected);
		// Close New Message Modal if you click off the modal
	}
	hasClass(el, className) {
	  if (el.classList)
		return el.classList.contains(className)
	  else
		return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
	}

	addClass(el, className) {
	  if (el.classList)
		el.classList.add(className)
	  else if (!hasClass(el, className)) el.className += " " + className
	}

	removeClass(el, className) {
	  if (el.classList)
		el.classList.remove(className)
	  else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
		el.className=el.className.replace(reg, ' ')
	  }
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
					self.removeClass(el, "active");
					self.setState({newMessageModalState: 0});
				}
			}
		}, false);	
	}

	searchFriend(e){
        var currVal = $('#input_friend').val(); 
        if(currVal != ''){  
			//removed return statement since it was returning nothing when curr val was empty,
			//keeping searches on screen when there was nothing in search inp
			
			client.search(currVal).then((query) =>{
				var searchList = query.data.results;
				var friends = [];

				console.log("q: " + JSON.stringify(searchList));
				for(var i in searchList){
					var ico = "img/avatar" + Math.floor(Math.random() * 3) + '.png';

					friends.push({
						name: searchList[i].username,
						avatar: ico,
						timestamp: "4/12/2017",
						preview: 'abcd',
						id: searchList[i].uuid
					});	
				}
				this.setState({
					friends: friends
				});
			}).catch((err) =>{
				console.log("ERR: " + JSON.stringify(err));
			});
        }else{
			this.setState({
				friends: []
			});
		}
	}
	
	toggleNewMessageModal(e){
		e.preventDefault();
		if(this.state.newMessageModalState == 0){
			var el = document.getElementById('new-message-modal');
			this.addClass(el, "active");
			this.setState({newMessageModalState: 1});
		} else {
			var el = document.getElementById('new-message-modal');
			this.removeClass(el, "active");
			this.setState({newMessageModalState: 0});
		}
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
            //this.setState({friends: friends});
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
                            <span onClick={this.toggleNewMessageModal}><i className="fa fa-pencil-square-o"></i></span>
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
