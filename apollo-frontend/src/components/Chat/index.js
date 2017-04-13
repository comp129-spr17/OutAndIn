/*
TODO
0 - add user to chat with every other user
1 - side bar show chats
2 - click sidebar elem, chow chats
3 - send message and update chat
*/
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { client } from '../../modules/api-client';

export default class Chat extends Component {
	constructor () { //constructor
		super();
		this.state= { //new object
			error: 1, // username taken error
			inputChatText: '',//text that you type into input box
			userID: -1,
			messageList: [],
			messagesEnd: '',
			activeChatID: 0,
			username:'Malvika',
			messageList: [
				{
					user:'Malvika',
					message:'Hello',
					timeStamp: parseInt(new Date().getTime()/1000)
				},
				{
					user:'Abc',
					message:'Hello',
					timeStamp: parseInt(new Date().getTime()/1000)
				},
				{
					user:'Def',
					message:'I am Def.',
					timeStamp: parseInt(new Date().getTime()/1000)
				},
				{
					user:'Abc',
					message:'LOL good one',
					timeStamp: parseInt(new Date().getTime()/1000)
				}
			],
			//messageList: [],
			messagesEnd: ''
		};

		//bind 'this' referance
		this.userInit = this.userInit.bind(this);

		this.handleChatInpChange = this.handleChatInpChange.bind(this);
		this.handleChatTextSend = this.handleChatTextSend.bind(this);
		this.handleChatDetails = this.handleChatDetails.bind(this);
		this.handleMessageAdd = this.handleMessageAdd.bind(this);
		this.handleUserInit = this.handleUserInit.bind(this);
		this.handleChatFocusUpdate = this.handleChatFocusUpdate.bind(this);

		//add socket event handlers
		// client.eventBusRegisterEvent("chatDetails", this.handleChatDetails);
		// client.eventBusRegisterEvent("userInit", this.handleUserInit);
		client.eventBusRegisterEvent('focusChat', this.handleChatFocusUpdate);

		// client.socketRegisterEvent("messageAdd", this.handleChatFocusUpdate);
	}

	handleChatFocusUpdate(){
		var chatID = localStorage.getItem('focusChat');
		console.log('building msgs: ' + chatID);
		client.chatGetMessage(chatID).then((messages) => {
			//update messagelist
			console.log("msg");
			console.log(messages);
			this.setState({
				messageList: messages.data.results
			});
		}).catch((err) => {
			console.log('err 1');
		});
	}

	userInit(){
		var username = "";
		if(this.state.userID == -1){
			/*
			if(!this.state.error == 1){
				username = prompt(this.state.error + "\n" + "Please enter your name", username); //var person stores user input, which is name
			} else {
				username = prompt("Please enter your name", username); //var person stores user input, which is name
			}
			if(username == null){
				return false;
			}
			*/
			client.userGetMe().then((res) => {
				console.log(res.data.results[0].username);
				client.userInit({username: username}).then((user) =>{
					this.setState({
						userID: user.data.body.id,
						error: user.data.header.code
					});
					localStorage.setItem("userID", user.data.body.id);
					if(user.data.header.code == 0){
						//fine
						//set socket id in server
						client.userSetSocketID({user: this.state.userID});
						client.eventBusDispatchEvent('chatsInitWithUsers');
					} else {
						//username already taken
						console.log('ERR code: ' + res.data.header.code);
						//this.userInit();
					}
					return;
				}).catch((err) =>{
					console.log(err);
				});
			}).catch((err) => {
				console.log("ERROR here: " + JSON.stringify(err));
			});
		}
	}

	handleChatInpChange(event){
		this.setState({inputChatText: event.target.value})  //setting value of this.state.value to what is typed in input box
	}

	handleChatTextSend(event){  	//storing chat in array
		event.preventDefault();
		if(this.state.inputChatText=='') //checking if value is empty
			return;
		client.chatAddMessage(
			localStorage.getItem('focusChat'),
			this.state.inputChatText
		).then((msg) => {
			console.log('msg');
			console.log(msg);
			this.setState({inputChatText: ''});
			this.forceUpdate();
			client.eventBusDispatchEvent("focusChat");
		}).catch((err) => {
			console.log('Err: ' + err);
		});
		//$("html, body").animate({ scrollTop: $(document).height()}, 1000);
	}

	//old
	handleUserInit(msg){
		if(msg.header.code == 0)
		{
			console.log("YEE");
			//get user data
			client.userDetails({id:this.state.userID});
		}
		else
		{
			console.log("SHEE");
			//username already taken
			this.userInit();
		}

		this.setState({
			userID: msg.body.userID,
			error: msg.header.code
		});
	}

	handleChatDetails(msg){
		this.setState({messageList: msg['body']['chat'].messages}); //parsing the server response
	}

	handleMessageAdd(msg) {
		client.chatDetails({
			id: msg['chat']
		});
	}

    render() {
		// Check if the Database is being set up
		// if(this.state.error == 2){
		// 	return(<div>Database Error or currently being set up</div>);
		// } else if(this.state.userID == -1 && this.state.error == 1){
		// 	return (<div>{this.userInit()}</div>);
		// }

		return (
			<div className="content">
				<div className="chat-header"></div>
                <div className="chat-timeline">
                    <div className="div-right">
                        <div className="bubble-dialog">
                            {
								this.state.messageList.map((msg, k) => {
                                	return <ChatDirectionComponent key={k} message={msg} selfname={this.state.userID} />
                            	})
							}
                        </div>
                    </div>
                </div>
                <div className="chat-input">
                    <form className='form' onSubmit={this.handleChatTextSend}>
                       <input autoFocus type="text" value={this.state.inputChatText} onChange={this.handleChatInpChange} autoComplete="off" className='msg' placeholder='Type a message ...'/>
					   <div className="chatIcons">
	 	                   	<img className="chatImage" src = "/img/vid.png"/>
	                    </div>
                    	<div className="chatIcons">
                    		<img className="chatImage" src = "/img/paperclip.png"/>
                    	</div>
                    	<div className="chatIcons">
                    		<img className="chatImage" src = "/img/micicon.png"/>
                    	</div>
                    	<div className="chatIcons">
                    		<img className="chatImage" src = "/img/capture.png"/>
                    	</div> 
					    
					</form>
                </div>
            </div>
     	);
	}
}

class ChatDirectionComponent extends React.Component {
	render() {
		if(this.props.userID==this.props.message.created_by)
			return <FloatRightChatComponent msg={this.props.message} />
		else
			return <FloatLeftChatComponent msg={this.props.message} />
	}
}

class FloatRightChatComponent extends React.Component {
	render() {
		return (
			<div className="bubble-right">
				<span className='msgSender'>{ "\u00a0\u00a0" } </span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timeStamp).fromNow()} </span>
			</div>
		)
	}
}


class FloatLeftChatComponent extends React.Component {
	render() {
		return (
			<div className="bubble-left">
				<span className='msgSender'> { "\u00a0\u00a0" }</span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timeStamp).fromNow()} </span>
			</div>
		)
	}
}
